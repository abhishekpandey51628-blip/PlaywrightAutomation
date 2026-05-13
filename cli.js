const readline = require('readline');

const AGENT_URL = ("https://n1508xefvqkkp0peo7q73d4t.r2.netlify.cqtestga.com").replace(/\/$/, "");
const TIMEOUT_MS = Number(process.env.AGENT_TIMEOUT_MS) || 60_000;

async function fetchJSON(path, init = {}) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
        const res = await fetch(`${AGENT_URL}${path}`, { ...init, signal: ctrl.signal });
        const text = await res.text();
        let body;
        try {
            body = text ? JSON.parse(text) : {};
        } catch {
            body = { error: text };
        }
        return { ok: res.ok, status: res.status, body };
    } finally {
        clearTimeout(t);
    }
}

async function healthCheck() {
    try {
        const { ok, status } = await fetchJSON("/health");
        if (!ok) throw new Error(`status ${status}`);
    } catch (err) {
        const reason = err.name === "AbortError" ? `timeout after ${TIMEOUT_MS}ms` : err.message;
        process.stderr.write(`could not reach agent at ${AGENT_URL}: ${reason}\n`);
        process.exit(1);
    }
}

async function ask(message) {
    try {
        const { ok, status, body } = await fetchJSON("/query", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ message }),
        });
        if (!ok) return `server error ${status}: ${body?.error ?? "unknown"}`;
        return body?.reply ?? "(empty reply)";
    } catch (err) {
        if (err.name === "AbortError") return `timed out after ${TIMEOUT_MS}ms`;
        return `connection failed: ${err.message}`;
    }
}

async function main() {
    await healthCheck();
    process.stdout.write(`connected to ${AGENT_URL}\n`);
    process.stdout.write("Type a query and press enter. Ctrl+C to exit.\n");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "query> ",
    });
    rl.prompt();

    rl.on("line", async (line) => {
        const message = line.trim();
        if (!message) {
            rl.prompt();
            return;
        }
        const reply = await ask(message);
        process.stdout.write(`\n${reply}\n\n`);
        rl.prompt();
    });

    rl.on("close", () => process.exit(0));
}

main().catch((err) => {
    process.stderr.write(`startup failed: ${err.message}\n`);
    process.exit(1);
});
