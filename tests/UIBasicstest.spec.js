import {expect, test} from '@playwright/test'
import { text } from 'stream/consumers';


test("@Child window handling", async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    const documentLink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), //listen for new page pending, reject, fulfilled
        documentLink.click()
    ])
    const pageText = await newPage.locator(".red").textContent();
    const arrayText = pageText.split('@')
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator('#username').fill(domain)
    
})


test("@UI control", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    const userName = page.locator('#username')
    const signIn = page.locator('#signInBtn')
    const documentLink = page.locator("[href*='document-request']")
    const dropdown = page.locator('select.form-control')
    // Clicking a Select Dropdown
    await dropdown.selectOption('consult');
    // Clicking a radio button
    await page.locator(".radiotextsty").last().click();
    await page.locator('#okayBtn').click();
    // Assert Radio button 
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    // Working with checkbox
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy()
    // Checking Blinking Text
    await expect(documentLink).toHaveAttribute('class','blinkingText')
})


test("Waiting for message to display and create assertion", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    console.log(await page.title());
    // Perform sign in
    await Promise.all([
        page.locator("#username").fill('rahulshetty'),
        page.locator("[type='password']").fill('learning'),
        page.locator('#signInBtn').click(),
    ])
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