import {test,expect} from '@playwright/test'

test("Iframes using playwright", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#display-text')).toBeHidden();
    page.on('dialog', dialog => dialog.accept());
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click({delay:1000});
    const textCheck = await framePage.locator('.text h2').textContent();
    textCheck.split(" ")[1];
    console.log(textCheck);
})

test("Automate Java/Javascript Alert", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://google.com");
    await page.goBack();
    await page.goForward();
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#display-text')).toBeHidden();
    await page.pause();
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    // Hovering over an element
    await page.locator('#mousehover').hover();
})


test("Popup validations", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://google.com");
    await page.goBack();
    await page.goForward();
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#display-text')).toBeHidden();

})