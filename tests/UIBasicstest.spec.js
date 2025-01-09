import {expect, test} from '@playwright/test'
import { log } from 'console';





test("Waiting for message to display and create assertion", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    console.log(await page.title());
    // Perform sign in
    await Promise.all([
        page.locator("#username").fill('rahulshetty'),
        page.locator("[type='password']").fill('learning'),
        page.locator('#signInBtn').click(),
    ])
    const message = await page.locator('[style*=block]').textContent();
    const firstElementUsingFirst = await page.locator('.card-body a').first();
    const firstElementUsingNth = await page.locator('.card-body a').nth(0).textContent();
    // Accessing multiple elements from page
    const allTitles = await page.locator('.card-body a').allTextContents();
})


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