import {test, expect} from '@playwright/test';
test("Login Logout",async({page})=>{
    await page.goto("https://oams.cqtestga.com/login")
    await page.fill("#_r_1_","arun.goyat@gmail.com")
    await page.fill("#_r_2_","Arun@123");
    await page.locator(".css-fdxuhg").click();
    await expect(page).toHaveTitle("OAMS");
    await expect(page).toHaveURL("https://oams.cqtestga.com/dashboard");
    await page.locator(".css-q7mezt").first().click();
    await page.locator(".css-1tetkx2").click();
});