import {expect, test} from '@playwright/test';
import { text } from 'stream/consumers';

test("@WC Testing after all network calls are made",async ({page})=>{
    const email = "anshika@gmail.com"
    const productName = 'LG Refrigerator'
    const products = page.locator('.card-body');
    // Perform sign in
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").fill('anshika@gmail.com')
    await page.locator("#userPassword").fill('Iamking@000')
    await page.locator("[value='Login']").click()
    await page.locator('.card-body b').first().waitFor()
    const titles = await page.locator('.card-body b').allTextContents();
    // Waiting for all network calls to complete
    const count = await products.count();
    for(let i=0;i<count;i++){
        if(await products.nth(i).locator('b').textContent() === productName){
            // Add to Cart
            await products.nth(i).locator('text=Add to Cart').click()
            break;
        }                          
    }
    // Going to Cart
    await page.locator("[routerlink*='cart']").click();
    // Wait for element to be visible
    await page.locator("div li").first().waitFor();
    const bool = page.locator("h3:has-text('LG Refrigerator')").isVisible()
    expect(bool).toBeTruthy()
    await page.locator("text=Checkout").click()
    // Type Letter by letter
    await page.pause()
    await page.locator("[placeholder*='Country']").pressSequentially('ind')
    // Entering Shipping Location
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    // Choose the correct options
    let optionsCount = await dropdown.locator("button").count();
    console.log(optionsCount);
    for(let i=0;i< optionsCount;++i){
        let text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India"){
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.")
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    // Finding Order in order history page
    page.locator("button[routerlink*='myorders']").click();
    const rows = await page.locator('tbody tr');
    for(let i=0;i<await rows.count();i++){
        let rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderID.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator('.col-text').textContent();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();
})