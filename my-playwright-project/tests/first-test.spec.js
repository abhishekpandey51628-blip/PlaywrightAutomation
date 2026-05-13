// const { test, expect } = require('@playwright/test');
// test('my very first Playwright test', async ({ page }) => {
// // Navigate to a URL
// await page.goto('https://playwright.dev');
// // Check the page title
// await expect(page).toHaveTitle(/Playwright/);
// // Click the "Get started" link
// await page.getByRole('link', { name: 'Get started' }).click();
// // Verify we are on the installation page
// await expect(page).toHaveURL(/.*intro/);
// })


const { test, expect } = require('@playwright/test');

test('Google test', async ({ page }) => {
  await page.goto('https://google.com');

  await expect(page).toHaveTitle(/Google/);
});