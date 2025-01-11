import {expect, test} from '@playwright/test';
import { text } from 'stream/consumers';



test("@WCN Testing after all network calls are made",async ({page})=>{
    const email = "anshika@gmail.com"
    const productName = 'LG Refrigerator'
    const products = page.locator('.card-body');
    // Perform sign in
    await page.goto("https://rahulshettyacademy.com/client")
    await page.getByPlaceholder("email@example.com").fill('anshika@gmail.com')
    await page.getByPlaceholder("enter your passsword").fill('Iamking@000')
    await page.getByRole('button',{name: 'Login'}).click()
    await page.locator('.card-body b').first().waitFor()
    
    await page.locator('.card-body').filter({hasText: productName}).nth(1).getByRole('button', {name: "Add to Cart"}).click();
    // Going to Cart
    await page.getByRole('listitem').getByRole('button',{name: 'Cart'}).click();
    // Wait for element to be visible
    await page.locator("div li").first().waitFor();
    expect(page.getByText(productName)).toBeVisible();
    await page.getByRole('button',{name: "Checkout"}).click();
    // Type Letter by letter
    await page.locator("[placeholder*='Country']").pressSequentially('ind')
    await page.getByRole('button',{name: "India"}).nth(1).click();
    //Submit button
    await page.getByText('PLACE ORDER').click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})