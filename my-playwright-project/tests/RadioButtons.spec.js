 const {test, expect}=require('@playwright/test');

 test('Handle Radio Button',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');


    //Inputbox - firstname
    await page.locator("#male").check();    //male
//    await page.check("#male");
    await expect(await page.locator("#male")).toBeChecked();
    await expect(await page.locator("#male").isChecked()).toBeTruthy();

    await expect(await page.locator("#female").isChecked()).toBeFalsy();



    await page.waitForTimeout(5000);  //pausing code

    

 })