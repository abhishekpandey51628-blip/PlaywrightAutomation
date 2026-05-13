 const {test, expect}=require('@playwright/test');

 test('Handle Inputbox',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');


    //Inputbox - firstname
    await expect(await page.locator('#name')).toBeVisible();
    await expect(await page.locator('#name')).toBeEmpty();
    await expect(await page.locator('#name')).toBeEditable();
    await expect(await page.locator('#name')).toBeEnabled();
    

    await page.locator("#name").fill('John');

    await page.waitForTimeout(5000);  //pausing code

    

 })