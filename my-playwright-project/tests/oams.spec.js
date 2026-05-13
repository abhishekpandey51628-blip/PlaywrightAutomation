import {test, expect} from "@playwright/test";

test("Oams Test",async({page})=>{
    await page.goto("https://oams.cqtestga.com/login");

    await page.locator("#_r_1_").fill("arun.goyat@gmail.com");
    await page.locator("#_r_2_").fill("Arun@123");
    await page.getByText("Login").click();
    await expect(page).toHaveURL("https://oams.cqtestga.com/dashboard");
    await expect(page).toHaveTitle("OAMS");
    const logoElement=await page.locator(".css-ih464s");
    await expect(logoElement).toBeVisible();
    
    const searchCampaign=await page.locator("#_r_q_");
    await expect(searchCampaign).toBeEnabled();
    // except(locator).toBeChecked()     Radio/Checkbox is checked

    const LeadcheckBoxButton=await page.locator('input[type="checkbox"]').first();
    await LeadcheckBoxButton.check();
    await expect(LeadcheckBoxButton).toBeChecked();

    //6) expect(locator).toHaveAttribute()  Element has attribute
    const reqButton=await page.locator('#register-button');
    await expect(reqButton).toHaveAttribute('type','submit');

    // 7) expect(locator).toHaveText()     Element matches text
    await expect(await page.locator('.css-12aamap')).toHaveText('Dashboard')   //Full Text


    // 8) expect(locator).toContainText()   Element contains text
    await expect(await page.locator('.css-12aamap')).toHaveText('Dashboard')  //Partial Text

    // 9) expect(locator).toHaveValue(value)  Input has a value
    const emailInput=await page.locator('#_r_1_');
    await emailInput.fill('arun.goyat@gmail.com');
    await expect(emailInput).toHaveValue('arun.goyat@gmail.com');

    // 10) expect(locator).toHaveCount()   List of elements has given length



}) 





