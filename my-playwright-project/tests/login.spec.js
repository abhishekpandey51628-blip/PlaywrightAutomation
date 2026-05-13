import { test, expect } from '@playwright/test';

test('Login test practice', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/login');

  // Fill username
  await page.locator('#username').fill('tomsmith');

  // Fill password
  await page.locator('#password').fill('SuperSecretPassword!');

  // Click login
  await page.locator('button[type="submit"]').click();

  // Verify success
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

});