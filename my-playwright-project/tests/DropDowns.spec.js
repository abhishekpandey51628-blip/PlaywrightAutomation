const {test, expect}=require("@playwright/test");

test("Drop Down",async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    // Multiple ways to select option from the dropdown

    await page.locator("#country").selectOption({label:'India'})

    const options=await page.$$('#country option');
    console.log("Number of options: ",options.length);

    await expect(options.length).toBe(10);

    // check the presence of value in the dropdown
    // const content=await page.locator("#country").textContent();
    // await expect(content.includes('India')).toBeTruthy();

    // check presence of value in the dropdown 
    const options = await page.$$('#country option');
    let status=false;
    for(const option of options){
        console.log(await option.textContent)
    }
    await page.waitForTimeout(5000);
});