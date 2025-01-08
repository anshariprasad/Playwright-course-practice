import {expect, test} from '@playwright/test'
import { log } from 'console';



test("Browser Context Playwright tests", async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    console.log(await page.title());
    await page.locator("#username").fill('learning')
})


test("Page Playwright tets", async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
})


test("Assertions with Google", async ({page})=>{
    await page.goto("https://google.com")
    // Get title - assertion 
    console.log(await page.title());
    await expect(page).toHaveTitle("Google")
})


test("Browser Context Playwright tests with selectors", async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    console.log(await page.title());
})