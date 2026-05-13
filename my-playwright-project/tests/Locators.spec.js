import {test, expect } from "@playwright/test";

test('Locators',async({page})=>{
    await page.goto("https://demoblaze.com/index.html");
    // click on login button  -property
    // this is first approach 
    //await page.locator("id=login2").click(); 
    // this is second approach
    await page.click("id=login2");
    //provide username -- CSS
    //await page.locator('#loginusername').fill("pavanol")
    await page.fill('#loginusername','pavanol')

    // await page.type('#loginusername');

    //provide password --CSS
    await page.fill("input[id='loginpassword']",'test@123');

    //click on login button --XPath
    await page.click("//button[normalize-space()='Log in']");

    // verify logout link presence -XPath
    const logoutlink =await page.locator("//a[normalize-space()='Log out']");

    await expect(logoutlink).toBeVisible();

    await page.close();

});