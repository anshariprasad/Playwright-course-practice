# Playwright course practice

Playwright is a powerful end-to-end testing framework that enables reliable automation for modern wbe applications. This course will take you on a comprehensive journey, teaching you how to leverage Playwright capacity using Javascript to build robust and efficient automation tests from scratch, using a well-structured framework.

## Helpful extensions

- Code Spell Checker
- EsLint
- Playwright Test for VSCode
- Prettier - Code Formatter

## Why Playwright ?

1. **Reliable End-to-End Testing:** Playwright Auto-wait capability ensures reliable and stable end-to-end testing for modern web applications, even in the face of dynamic and complex user interactions.
2. **Cross-Browser Compatibility:** Playwright supports all major browsers, including Chromium-based (Chrome and Edge), Firefox, Safari (WebKit), and Opera, allowing you to test your web applications across wide range of browsers and platforms.
3. **Multiplatform Support:** Playwright works seamlessly on Windows, macOS, and Linux and also supports native mobile enumeration for Google Chrome on Android and Safari on IOS, enabling comprehensive testing across different devices and operating systems.
4. **Multilingual Flexibility:** Playwright provides languages bindings for JavaScript, TypeScript, Java, Python, and C# (.NET), allowing you to choose the programming that best fits your team's preferences and expertise.

## Playwright's Advanced Features

1. **Tracing and Debugging:** Leverages Playwright built-in tracing and debugging capabilities, including automatic screenshots, test video recording, and comprehensive logging, to simplify the process of identifying and resolving issues in your test suites.
2. **Network Interception:** Utilizing Playwright's API libraries to intercept and validate network calls within your web application
3. **Browser Context Management:** Explore Playwright's browser context feature, which allows you to save and transfer browser state across your test suite, improving test efficiency and reducing the overhead of setting up the same browser state for each test case.
4. **Code generation tool:** Discovers Playwright codegen tool, which can generate test code by recording your actions, saving your time and effort in creating initial test cases and providing a starting point for further customization.

## Getting started with Playwright Automation Core Concepts

### Setting up Playwright

```bash
npm init playwright
```

- Will create lits of files required for playwright setup
- In playwright we have to use async function to run all the commands sequentially

### Browser Context and Page fixture in Playwright

**Browser Context:** A browser context is a lightweight, isolated environment within a single browser instance. It enables running multiple, independent test scenarios simultaneously without interference. Each context can have its own cookies, cache, and storage, mimicking separate, isolated browser profiles.

_Key Features of browser context_

- Isolation: Each browser context is isolated from other. This ensures one test's state (e.g, cookies, sessions) does not impact another.
- Efficiency: Multiple browser contexts run within a single browser instance, reducing resources using compared to launching multiple browsers.
- Customization: Each context can have custom settings as user agent, viewport, locale, and permissions.

```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  });
  // Use context for further operations
})();

```

**Page Fixture:** A page fixture in Playwright JS represents a single tab within a browser context. It can be used to navigate to different URLs, interact with web elements, and perform various actions on a web page.

_Key Features of browser context_

- Isolation: Pages within the same context share cookies and cache but are otherwise independent.
- Convenience: Simplifies interactions with web pages during testing.
- Events Handling: Supports various events such as load, dom content loaded, and more for better test control.

```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://example.com');
  await page.click('text="Login"');
  // Use page for further operations
})();
```

### Playwright Important configurations


**Playwright Configuration Files**

Playwright uses configuration files to define and manage settings for your tests, ensuring a streamlined and consistent testing environment.

*Location and Format*
Filename: The configuration file is usually named playwright.config.js or playwright.config.ts for TypeScript.
Structure: The file exports a configuration object that specifies various settings and options.

*Important Configurations*

1. Global Setup and Teardown
   - setup(): This function runs before all tests, perfect for initializing one-time setup tasks.
   - teardown(): This function runs after all tests, useful for cleaning up resources.
2. Projects
   - Define multiple projects to run tests in different browsers or configurations. Each project can have its own settings.
3. Timeouts: Set default timeouts for actions and tests to prevent long-running tests from stalling.
4. Test Directory: Specify the directory where your test files are located.
5. Use: Define default settings and options for the tests, such as viewport size, base URL, headless mode, and more.
6. Reporter: Configure how test results are reported. Playwright supports various reporters like list, dot, JSON, and more.
7. Retries: Specify the number of retries for a failed test to handle flaky tests.
8. Output Directory: Define where to save test artifacts like screenshots, videos, and trace files.

```js
const { devices } = require('@playwright/test');

module.exports = {
  timeout: 30000,
  testDir: './tests',
  retries: 2,
  outputDir: './test-results',

  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on',
    screenshot: 'on',
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  reporter: [
    ['list'],
    ['junit', { outputFile: 'results.xml' }],
  ],

  globalSetup: './global-setup.js',
  globalTeardown: './global-teardown.js',
};

```

## Basic Methods for web automation testing

### Locators supported by Playwright 

1. CSS Selector: CSS selectors are commonly used to select elements based on their CSS properties.
2. Text Selector: Text selectors allow you to locate elements based on their visible text content.
3. XPath Selector: XPath selectors provide a way to navigate through elements and attributes in an XML-like structure
4. Role Selector: Role selectors are used to locate elements based on their ARIA roles.
5. React Selector: React selectors are used to locate components in a React application.
6. Test ID Selector: Test ID selectors allow you to locate elements based on custom data-testid attributes, often used in testing.
7. Combination of Selectors: Playwright allows combining multiple selectors to create more complex locators.
8. Nth-match Selector: nth-match selectors are used to locate the nth element that matches a given selector

```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  
  // CSS Selector
  await page.click('button.submit');
  
  // Text Selector
  await page.click('text="Learn More"');
  
  // XPath Selector
  await page.click('//button[@class="submit"]');
  
  // Role Selector
  await page.click('role=button[name="Submit"]');
  
  // React Selector
  await page.click('react=SubmitButton');
  
  // Test ID Selector
  await page.click('[data-testid="submit-button"]');
  
  // Combination of Selectors
  await page.click('div.container >> text="Submit"');
  
  // nth-Match Selector
  await page.click('css=button >> nth=2');
  
  await browser.close();
})();
```

### Waiting for elements in Playwright offers several advantages over Selenium:

1. **Smart Waiting Mechanisms**: Playwright has built-in smart waiting mechanisms that automatically wait for elements to be ready before interacting with them. This reduces the likelihood of test failures due to timing issues and eliminates the need for manual delays
2. **No-Driver Requirement**: Playwright communicates directly with browsers without the need for drivers, unlike Selenium which requires browser-specific drivers. This direct communication speeds up interactions and simplifies the setup process.
3. **Modern API**: Playwright provides a modern and intuitive API that simplifies complex UI interactions, such as hovering, clicking, and waiting for elements. This reduces the learning curve for developers and makes test scripts easier to write and maintain.
4. **Cross-Browser Support**: Playwright supports multiple browsers (Chromium, Firefox, and WebKit) out of the box, allowing for more comprehensive testing across different browser environments.
5. **Real-Time Communication**: Playwright uses WebSockets for real-time, two-way communication between the browser and server, which is faster and more efficient than Selenium's reliance on HTTP requests


### Understanding Playwright locators

- **Locator Methods**: Playwright provides several built-in methods to locate elements:
   - `page.locator(selector)`: This method can be used with CSS or XPath selectors to find elements.
   - `page.getByRole(role, options)`: Locates elements by their ARIA role and accessible name.
   - `page.getByText(text)`: Finds elements containing specific text.
   - `page.getByLabel(label)`: Locates form controls by their associated label text.
   - `page.getByPlaceholder(placeholder)`: Finds input elements by their placeholder text.
   - `page.getByAltText(altText)`: Locates elements, usually images, by their alt text.
   - `page.getByTitle(title)`: Finds elements by their title attribute.
   - `page.getByTestId(testId)`: Locates elements based on a `data-testid` attribute[1](https://playwright.dev/docs/locators).

1. **Extracting Multiple Elements**: To extract multiple elements, you can use the `locator.all()` method, which returns an array of elements matching the locator. For example:
   ```javascript
   const elements = await page.locator('css=div.item').all();
   for (const element of elements) {
       console.log(await element.textContent());
   }
   ```

2. **Iterating Over Elements**: Once you have a locator for multiple elements, you can iterate over them to perform actions or extract information. For example:
   ```javascript
   const items = await page.locator('.item').all();
   for (const item of items) {
       await item.click();
   }
   ```

3. **Chaining Locators**: You can chain locators to narrow down your search. For example, to find buttons within a specific section:
   ```javascript
   const buttons = await page.locator('section#my-section').locator('button').all();
   ```

### Playwright wait mechanism when multiple elements are returned

1. **Auto-Waiting**: Playwright automatically waits for elements to be ready before performing actions. This includes waiting for elements to be visible, stable, and interactable.
2. **Handling Multiple Elements**: When dealing with multiple elements, Playwright's `locator.all()` method can be used to retrieve all matching elements. However, this method does not trigger auto-waiting. Instead, you can use `locator.first()` or `locator.nth(index)` to interact with specific elements and leverage auto-waiting.

3. **Custom Waiting**: For more control, you can use `page.waitForFunction()` to wait for custom conditions. This is useful when you need to wait for a specific state or condition before interacting with elements.

4. **Example**: Here’s an example of how to wait for multiple elements to be ready:
   ```javascript
   const items = await page.locator('.item').all();
   for (const item of items) {
       await item.waitForElementState('visible');
       console.log(await item.textContent());
   }
   ```

5. **Best Practices**: Avoid using hard waits (e.g., `page.waitForTimeout()`) as they can make tests flaky. Instead, rely on Playwright's smart waiting mechanisms to ensure elements are ready.


### Dynamically for new page in service based application playright

1. **Using `waitUntil` Options**: When navigating to a new page, you can specify different `waitUntil` options to control when the navigation is considered complete:
   - `load`: Waits for the entire page to load, including all resources like images and stylesheets.
   - `domcontentloaded`: Waits for the HTML document to be fully loaded and parsed.
   - `networkidle`: Waits until there are no more than 2 network connections for at least 500 ms
   ```javascript
   await page.goto('https://example.com', { waitUntil: 'networkidle' });
   ```

2. **Waiting for Specific Elements**: Use `page.waitForSelector()` to wait for specific elements to appear on the new page. This ensures that the necessary elements are loaded before proceeding.
   ```javascript
   await page.waitForSelector('#my-element');
   ```

3. **Waiting for Network Requests**: You can wait for specific network requests to complete using `page.waitForResponse()`. This is useful if the new page relies on certain API calls.
   ```javascript
   await page.waitForResponse(response => response.url().includes('api/data') && response.status() === 200);
   ```

4. **Using `page.waitForLoadState()`**: This method allows you to wait for a specific load state, such as `load`, `domcontentloaded`, or `networkidle`.
   ```javascript
   await page.waitForLoadState('networkidle');
   ```

5. **Combining Strategies**: Often, combining multiple waiting strategies can provide more robust results. For example, you can wait for the page to load and then wait for a specific element.
   ```javascript
   await page.goto('https://example.com', { waitUntil: 'load' });
   await page.waitForSelector('#my-element');
   ```

## Handling UI elements Components in Cypress 

### Handling Static Select Dropdown

Handling static select dropdowns in Playwright is quite straightforward. Here are a few methods you can use:

1. **Using the `select_option` method with values**:
   ```javascript
   await page.select_option('select#dropdown', 'value');
   ```
   This method selects the option with the specified value.

2. **Using the `select_option` method with labels**:
   ```javascript
   await page.select_option('select#dropdown', { label: 'Option Label' });
   ```
   This method selects the option based on the visible text label.

3. **Using JavaScript**:
   ```javascript
   await page.evaluate(() => {
       document.querySelector('select#dropdown').value = 'value';
   });
   ```
   This method uses JavaScript to set the value of the dropdown directly.

Here's a simple example to illustrate these methods:
```javascript
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');

    // Using value
    await page.select_option('select#dropdown', 'value1');

    // Using label
    await page.select_option('select#dropdown', { label: 'Option 2' });

    // Using JavaScript
    await page.evaluate(() => {
        document.querySelector('select#dropdown').value = 'value3';
    });

    await browser.close();
})();
```


### Handling Radio Buttons

Handling radio buttons in Playwright is quite simple. Here are a few methods you can use:

1. **Using the `check` method**:
   ```javascript
   await page.locator('input[type="radio"][value="option1"]').check();
   ```
   This method checks the radio button with the specified value.

2. **Using JavaScript**:
   ```javascript
   await page.evaluate(() => {
       document.querySelector('input[type="radio"][value="option1"]').checked = true;
   });
   ```
   This method uses JavaScript to set the checked property of the radio button directly.

3. **Using the `click` method**:
   ```javascript
   await page.locator('input[type="radio"][value="option1"]').click();
   ```
   This method clicks on the radio button to select it.

Here's a simple example to illustrate these methods:
```javascript
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');

    // Using check method
    await page.locator('input[type="radio"][value="option1"]').check();

    // Using JavaScript
    await page.evaluate(() => {
        document.querySelector('input[type="radio"][value="option1"]').checked = true;
    });

    // Using click method
    await page.locator('input[type="radio"][value="option1"]').click();

    await browser.close();
})();
```

### Handling Checkbox Buttons

Handling radio checkboxes in Playwright is similar to handling radio buttons and checkboxes individually. Here are a few methods you can use:

1. **Using the `check` method**:
   ```javascript
   await page.locator('input[type="checkbox"][value="option1"]').check();
   ```
   This method checks the checkbox with the specified value.

2. **Using JavaScript**:
   ```javascript
   await page.evaluate(() => {
       document.querySelector('input[type="checkbox"][value="option1"]').checked = true;
   });
   ```
   This method uses JavaScript to set the checked property of the checkbox directly.

3. **Using the `click` method**:
   ```javascript
   await page.locator('input[type="checkbox"][value="option1"]').click();
   ```
   This method clicks on the checkbox to select it.

Here's a simple example to illustrate these methods:
```javascript
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');

    // Using check method
    await page.locator('input[type="checkbox"][value="option1"]').check();

    // Using JavaScript
    await page.evaluate(() => {
        document.querySelector('input[type="checkbox"][value="option1"]').checked = true;
    });

    // Using click method
    await page.locator('input[type="checkbox"][value="option1"]').click();

    await browser.close();
})();
```
