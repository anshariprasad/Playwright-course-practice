import {test} from '@playwright/test'



test("Browser Context Playwright tests", async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
})


test("Page Playwright tets", async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
})

