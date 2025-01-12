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

### How to use Async/await in playwright correctly

Using `async` and `await` correctly in Playwright is essential for handling asynchronous operations effectively. Here are some key points and examples to help you understand how to use them:

1. **Understanding `async` and `await`**:
   - The `async` keyword is used to declare an asynchronous function. This means the function will return a promise.
   - The `await` keyword is used to pause the execution of an `async` function until the promise is resolved.

2. **Basic Example**:
   ```javascript
   const { chromium } = require('playwright');

   (async () => {
       const browser = await chromium.launch();
       const page = await browser.newPage();
       await page.goto('https://example.com');
       const title = await page.title();
       console.log(title);
       await browser.close();
   })();
   ```
   In this example, `await` is used to wait for the browser to launch, a new page to open, the page to navigate to a URL, and the title to be retrieved.

3. **Handling Errors**:
   - Use `try...catch` blocks to handle errors in asynchronous functions.
   ```javascript
   (async () => {
       try {
           const browser = await chromium.launch();
           const page = await browser.newPage();
           await page.goto('https://example.com');
           const title = await page.title();
           console.log(title);
           await browser.close();
       } catch (error) {
           console.error('Error:', error);
       }
   })();
   ```

4. **Waiting for Elements**:
   - Use `await` to wait for elements to be available before interacting with them.
   ```javascript
   await page.waitForSelector('input#username');
   await page.fill('input#username', 'myUsername');
   ```

5. **Common Pitfalls**:
   - **Forgetting to use `await`**: This can lead to unexpected behavior as the code may proceed before the promise is resolved.
   - **Overusing `await`**: Using `await` unnecessarily can slow down your tests. Only use it when you need to wait for a promise to resolve.

Here's a more comprehensive example:
```javascript
const { chromium } = require('playwright');

(async () => {
    try {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto('https://example.com');

        // Wait for an element to be available
        await page.waitForSelector('input#username');
        await page.fill('input#username', 'myUsername');

        // Perform other actions
        await page.click('button#submit');
        const response = await page.waitForResponse(response => response.url().includes('submit') && response.status() === 200);
        console.log('Form submitted successfully:', response.ok());

        await browser.close();
    } catch (error) {
        console.error('Error:', error);
    }
})();
```

### Handling Child Window and Tabs with Playwright by switching browser context

Handling child windows and tabs in Playwright involves using browser contexts to manage multiple windows or tabs. Here are the steps to handle them effectively:

1. **Opening a New Window or Tab**:
   - Use `context.newPage()` to create a new tab within the same browser context.
   ```javascript
   const { chromium } = require('playwright');

   (async () => {
       const browser = await chromium.launch();
       const context = await browser.newContext();
       const page = await context.newPage();
       await page.goto('https://example.com');

       // Open a new tab
       const newPage = await context.newPage();
       await newPage.goto('https://example.com/new-tab');

       await browser.close();
   })();
   ```

2. **Handling New Windows or Tabs Opened by Actions**:
   - Use the `page.waitForEvent('popup')` method to handle new windows or tabs opened by user actions.
   ```javascript
   const { chromium } = require('playwright');

   (async () => {
       const browser = await chromium.launch();
       const context = await browser.newContext();
       const page = await context.newPage();
       await page.goto('https://example.com');

       // Click a link that opens a new window
       const [newPage] = await Promise.all([
           context.waitForEvent('page'),
           page.click('a[target="_blank"]') // This should trigger the new tab/window
       ]);

       await newPage.waitForLoadState();
       console.log('New page URL:', newPage.url());

       await browser.close();
   })();
   ```

3. **Switching Between Windows or Tabs**:
   - Use the `context.pages()` method to get all open pages (tabs/windows) and switch between them.
   ```javascript
   const { chromium } = require('playwright');

   (async () => {
       const browser = await chromium.launch();
       const context = await browser.newContext();
       const page = await context.newPage();
       await page.goto('https://example.com');

       // Open a new tab
       const newPage = await context.newPage();
       await newPage.goto('https://example.com/new-tab');

       // Get all open pages
       const pages = context.pages();
       console.log('Number of open pages:', pages.length);

       // Switch to the new tab
       await pages[1].bringToFront();
       console.log('Switched to new tab URL:', pages[1].url());

       await browser.close();
   })();
   ```

## Learning Playwright Inspectors, Trace Viewers and Code Gen

### Playwright Inspector and how it is helpful for debugging

The Playwright Inspector is a powerful GUI tool designed to help you debug your Playwright scripts interactively. Here are some key features and how they can assist you in debugging:

1. **Step Through Tests**:
   - You can step through your tests line by line, which allows you to see exactly what is happening at each step. This is useful for identifying where things might be going wrong.

2. **Live Edit Locators**:
   - The Inspector allows you to edit locators on the fly. This means you can adjust your selectors and see the changes in real-time, helping you fine-tune your scripts without restarting the test.

3. **Pick Locators**:
   - You can use the Inspector to pick locators directly from the web page. This feature simplifies the process of identifying the correct elements to interact with in your tests.

4. **Actionability Logs**:
   - The Inspector provides detailed logs of actions performed during the test. This includes information about whether elements were visible, enabled, and ready for interaction, which helps in diagnosing issues related to element state.

5. **Record and Replay**:
   - One of the standout features is the ability to record and replay user interactions. This allows you to reproduce bugs and see how your web application behaves in different scenarios, making it easier to identify and fix issues.

6. **Run in Debug Mode**:
   - You can run your tests in debug mode using the `--debug` flag. This opens the Inspector and configures Playwright for debugging, such as launching browsers in headed mode and setting the default timeout to zero.

Here's a simple example of how to use the Playwright Inspector:
```javascript
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://example.com');

    // Open the Playwright Inspector
    await page.pause();

    // Perform actions
    await page.click('text=More information');
    await page.fill('input[name="q"]', 'Playwright Inspector');
    await page.press('input[name="q"]', 'Enter');

    await browser.close();
})();
```

### Codegen tool to record and playback with generated automated scripts

The Playwright Codegen tool is a powerful feature that helps you generate test scripts by recording your interactions with a web application. Here's how it works and how you can use it to perform playback with automated scripts:

#### What is Playwright Codegen?

Playwright Codegen is a test recorder tool that captures user interactions with a web application and automatically generates the corresponding code. This code can be used as a starting point for your automated tests. It simplifies the process of writing tests by providing a visual way to record actions and generate code.

#### How to Use Playwright Codegen

1. **Launching Codegen**:
   - You can start the Codegen tool using the command line:
     ```bash
     npx playwright codegen https://example.com
     ```
   - This command opens two windows: a browser window where you interact with the website and the Playwright Inspector window where you can see the generated code.

2. **Recording Actions**:
   - Interact with the web application in the browser window. Playwright will record your actions (clicks, inputs, navigations, etc.) and generate the corresponding code in the Inspector window.
   - You can add assertions by selecting the appropriate icon in the Inspector toolbar and clicking on elements in the browser window.

3. **Generating Locators**:
   - The Codegen tool automatically generates locators for elements based on roles, text, and test IDs, ensuring that the locators are resilient and unique.

4. **Saving the Script**:
   - Once you have recorded the necessary actions, you can stop the recording and save the generated script. The script can be exported in various languages supported by Playwright (JavaScript, TypeScript, Python, C#, etc.).

#### Example of a Generated Script

Here's an example of what a generated script might look like:
```javascript
const { test, expect } = require('@playwright/test');

test('example test', async ({ page }) => {
    await page.goto('https://example.com');
    await page.click('text=More information');
    await page.fill('input[name="q"]', 'Playwright Codegen');
    await page.press('input[name="q"]', 'Enter');
    await expect(page).toHaveURL('https://example.com/search?q=Playwright+Codegen');
});
```

#### Performing Playback with Automated Scripts

1. **Running the Script**:
   - You can run the generated script using the Playwright test runner:
     ```bash
     npx playwright test path/to/your/test-file.spec.js
     ```

2. **Debugging and Enhancing**:
   - You can use the Playwright Inspector to debug and enhance your scripts. Add more assertions, handle dynamic content, and refine locators as needed.

3. **Integrating with CI/CD**:
   - Once your scripts are ready, you can integrate them into your CI/CD pipeline to run automated tests as part of your build and deployment process.

#### Benefits of Using Playwright Codegen

- **Quick Start**: Easily generate test scripts without writing code from scratch.
- **Accurate Locators**: Automatically generates resilient locators.
- **Interactive Debugging**: Use the Inspector to debug and refine your tests.
- **Cross-Browser Testing**: Generated scripts can be run across different browsers supported by Playwright.


 ### Detailed View of Test Traces, HTML reports, logs and Screenshots for test results 

 Understanding test traces, HTML reports, logs, and screenshots is crucial for effectively analyzing and debugging your Playwright test results. Here's a breakdown of each component and how they can help:

### Test Traces
- **What They Are**: Test traces provide a detailed record of the actions performed during a test, including network requests, console logs, and DOM snapshots.
- **How They Help**: Traces allow you to replay the test step-by-step, making it easier to identify where and why a test failed. They provide a comprehensive view of the test execution, helping you understand the sequence of events and interactions.

### HTML Reports
- **What They Are**: HTML reports are visual representations of your test results, typically generated at the end of a test run.
- **How They Help**: These reports provide a summary of the test execution, including pass/fail rates, test durations, and detailed information about each test case. HTML reports are easy to share with team members and stakeholders, offering a clear overview of the test outcomes.

### Logs
- **What They Are**: Logs capture detailed information about the test execution, including errors, warnings, and other relevant messages.
- **How They Help**: Logs are essential for diagnosing issues, as they provide context about what happened during the test. They can help you pinpoint the exact moment and reason for a failure, making it easier to debug and fix problems.

### Screenshots
- **What They Are**: Screenshots capture the visual state of the application at specific points during the test.
- **How They Help**: Screenshots are invaluable for visual verification and debugging. They allow you to see what the application looked like at the time of a failure, helping you understand layout issues, visual bugs, or unexpected changes in the UI.

### Example of Using These Tools in Playwright

Here's an example of how you can generate and use these tools in Playwright:

```javascript
const { test, expect } = require('@playwright/test');

test('example test with trace, logs, and screenshots', async ({ page }) => {
    // Start tracing before the test
    await page.tracing.start({ screenshots: true, snapshots: true });

    try {
        await page.goto('https://example.com');
        await page.click('text=More information');
        await page.fill('input[name="q"]', 'Playwright');
        await page.press('input[name="q"]', 'Enter');

        // Take a screenshot
        await page.screenshot({ path: 'screenshot.png' });

        // Add an assertion
        await expect(page).toHaveURL('https://example.com/search?q=Playwright');
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        // Stop tracing and save the trace file
        await page.tracing.stop({ path: 'trace.zip' });
    }
});
```

### Benefits of Using These Tools
- **Enhanced Debugging**: Traces, logs, and screenshots provide a comprehensive view of the test execution, making it easier to identify and fix issues.
- **Better Reporting**: HTML reports offer a clear and concise summary of test results, which is useful for communicating with team members and stakeholders.
- **Improved Test Coverage**: By analyzing traces and logs, you can ensure that your tests cover all necessary scenarios and edge cases.


## Playwright Unique Locators and Smart Testing and Test Runner usage

### Understanding Playwright getByLabel syntax

The `getByLabel` method in Playwright is a powerful locator that allows you to find form control elements based on the text of their associated labels. This method is particularly useful for ensuring your tests are both readable and maintainable, as it leverages the visible text labels that users interact with.

#### How `getByLabel` Works

The `getByLabel` method can locate input elements by:
- The text of the associated `<label>` element.
- The `aria-labelledby` attribute.
- The `aria-label` attribute.

#### Usage Example

Here's a simple example to illustrate how you can use `getByLabel` in your Playwright scripts:

```javascript
const { test, expect } = require('@playwright/test');

test('example test using getByLabel', async ({ page }) => {
    await page.goto('https://example.com');

    // Locate input by label text and fill it
    await page.getByLabel('Username').fill('myUsername');
    await page.getByLabel('Password').fill('myPassword');

    // Submit the form
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Verify the result
    await expect(page.getByText('Welcome, myUsername!')).toBeVisible();
});
```

#### Benefits of Using `getByLabel`

1. **Readability**: Using labels makes your tests more readable and easier to understand, as they reflect the actual text users see on the page.
2. **Maintainability**: If the structure of your HTML changes but the labels remain the same, your tests are less likely to break.
3. **Accessibility**: Leveraging labels ensures that your tests are aligned with accessibility best practices, as labels are crucial for screen readers and other assistive technologies.

#### When to Use `getByLabel`

- **Form Inputs**: Ideal for locating text inputs, checkboxes, radio buttons, and other form controls.
- **Accessibility**: Ensures that your tests are robust and accessible, as labels are a key part of accessible web design.

By using `getByLabel`, you can create more intuitive and resilient tests that closely mimic how users interact with your application.



 ### Understanding Playwright UI

 Playwright UI Mode is a graphical user interface that enhances your testing experience by providing a comprehensive way to explore, run, and debug your tests. Here are some key features and how they can help you:

#### Key Features of Playwright UI Mode

1. **Test Exploration and Execution**:
   - **Test Sidebar**: All test files are loaded into a sidebar where you can expand each file and describe block to individually run, view, watch, and debug each test.
   - **Run Tests**: You can run all tests, a single test file, a block of tests, or an individual test by clicking the corresponding triangle icon next to them.

2. **Filtering Tests**:
   - **Filter by Text or Tags**: You can filter tests by text, tags, or by their status (passed, failed, skipped).
   - **Filter by Projects**: If you have multiple projects configured in your `playwright.config` file, you can filter tests by project.

3. **Time Travel Debugging**:
   - **Timeline View**: See a timeline of your test with different colors highlighting navigation and actions. Hover over each action to see an image snapshot of what was happening during that step.
   - **Action Details**: Click on an action to inspect and debug it, and see what happened before and after the action.

4. **DOM Inspection**:
   - **Pop Out DOM Snapshot**: You can pop out the DOM snapshot into its own window for a better debugging experience. This allows you to inspect the HTML, CSS, console logs, and more.
   - **Pick Locator**: Use the pick locator button to hover over the DOM snapshot and see the locator for each element. You can modify the locator in the playground and see if it matches any elements in the DOM snapshot.

5. **Watch Mode**:
   - **Automatic Re-run**: Automatically re-run tests when files change, providing instant feedback on your changes.

#### How to Use Playwright UI Mode

To open UI Mode, run the following command in your terminal:
```bash
npx playwright test --ui
```
This command will launch the Playwright Test Runner in UI Mode, displaying a list of all your test files in the sidebar.

#### Example Commands

Here are some example commands to run tests in different modes:
- **Run tests in UI Mode**:
  ```bash
  npx playwright test --ui
  ```
- **Run tests in headed mode**:
  ```bash
  npx playwright test --headed
  ```
- **Run tests in debug mode**:
  ```bash
  npx playwright test --debug
  ```

#### Benefits of Using Playwright UI Mode

- **Enhanced Debugging**: Provides a visual and interactive way to debug your tests, making it easier to identify and fix issues.
- **Better Test Management**: Allows you to filter, run, and manage tests more efficiently.
- **Improved Developer Experience**: Offers tools like time travel debugging and DOM inspection to enhance your overall testing workflow.

Using Playwright UI Mode can significantly improve your ability to write, debug, and maintain your automated tests.

### Understanding Get by Role

The `getByRole` method in Playwright is a powerful locator that allows you to find elements based on their ARIA roles, which are used to define the purpose of elements in web applications. This method is particularly useful for ensuring your tests are both robust and accessible.

### How `getByRole` Works

The `getByRole` method locates elements by their role attribute, which is defined by the WAI-ARIA (Web Accessibility Initiative – Accessible Rich Internet Applications) specification. This method can also match elements based on their accessible name, which is the text that screen readers use to describe the element.

### Usage Example

Here's a simple example to illustrate how you can use `getByRole` in your Playwright scripts:

```javascript
const { test, expect } = require('@playwright/test');

test('example test using getByRole', async ({ page }) => {
    await page.goto('https://example.com');

    // Locate a button by its role and accessible name
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Locate a checkbox by its role and accessible name
    await page.getByRole('checkbox', { name: 'Subscribe' }).check();

    // Locate a heading by its role and accessible name
    await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
});
```

### Benefits of Using `getByRole`

1. **Accessibility**: Ensures that your tests are aligned with accessibility best practices, as ARIA roles are crucial for screen readers and other assistive technologies.
2. **Readability**: Using roles and accessible names makes your tests more readable and easier to understand, as they reflect the actual purpose of the elements.
3. **Resilience**: Tests are less likely to break if the structure of your HTML changes but the roles and names remain the same.

### When to Use `getByRole`

- **Buttons**: Locate buttons by their role and accessible name.
- **Checkboxes**: Locate checkboxes by their role and accessible name.
- **Headings**: Locate headings by their role and accessible name.
- **Links**: Locate links by their role and accessible name.

### Advanced Usage

The `getByRole` method supports various options to fine-tune your locators:
- **`checked`**: Match checkboxes or radio buttons that are checked.
- **`disabled`**: Match elements that are disabled.
- **`expanded`**: Match elements that are expanded.
- **`level`**: Match headings by their level (e.g., `h1`, `h2`).
- **`name`**: Match elements by their accessible name, which can be a string or a regular expression.

Here's an example with advanced options:
```javascript
await page.getByRole('button', { name: /submit/i, disabled: true }).click();
```

### Understanding getByText

The `getByText` method in Playwright is a convenient locator that allows you to find elements based on their text content. This method is particularly useful for locating elements that display specific text, making your tests more readable and maintainable.

### How `getByText` Works

The `getByText` method locates elements by their visible text content. It matches the exact text or a substring of the text within the element. This method is case-insensitive and trims whitespace, making it flexible for various scenarios.

### Usage Example

Here's a simple example to illustrate how you can use `getByText` in your Playwright scripts:

```javascript
const { test, expect } = require('@playwright/test');

test('example test using getByText', async ({ page }) => {
    await page.goto('https://example.com');

    // Locate an element by its text content and click on it
    await page.getByText('More information').click();

    // Verify that an element with specific text is visible
    await expect(page.getByText('Welcome to Example.com')).toBeVisible();
});
```

### Benefits of Using `getByText`

1. **Readability**: Using text content makes your tests more readable and easier to understand, as they reflect the actual text users see on the page.
2. **Maintainability**: If the structure of your HTML changes but the text remains the same, your tests are less likely to break.
3. **Flexibility**: The method is case-insensitive and trims whitespace, making it adaptable to various text formats.

### When to Use `getByText`

- **Links**: Locate links by their visible text.
- **Buttons**: Locate buttons by their text content.
- **Headings and Paragraphs**: Locate headings, paragraphs, or any other elements by their text.

### Advanced Usage

The `getByText` method supports various options to fine-tune your locators:
- **Exact Match**: Use the `exact` option to match the exact text.
- **Regular Expressions**: Use regular expressions to match patterns in the text.

Here's an example with advanced options:
```javascript
// Exact match
await page.getByText('Submit', { exact: true }).click();

// Regular expression match
await page.getByText(/submit/i).click();
```

### Understanding getByPlaceholder

The `getByPlaceholder` method in Playwright is a useful locator that allows you to find input elements based on their placeholder text. This method is particularly helpful for locating form fields where the placeholder text provides a hint about the expected input.

### How `getByPlaceholder` Works

The `getByPlaceholder` method locates input elements by their `placeholder` attribute. This is especially useful for input fields like text boxes, search fields, email fields, and password fields that have placeholder text to guide users.

### Usage Example

Here's a simple example to illustrate how you can use `getByPlaceholder` in your Playwright scripts:

```javascript
const { test, expect } = require('@playwright/test');

test('example test using getByPlaceholder', async ({ page }) => {
    await page.goto('https://example.com');

    // Locate an input field by its placeholder text and fill it
    await page.getByPlaceholder('Enter your username').fill('myUsername');
    await page.getByPlaceholder('Enter your password').fill('myPassword');

    // Submit the form
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Verify the result
    await expect(page.getByText('Welcome, myUsername!')).toBeVisible();
});
```

### Benefits of Using `getByPlaceholder`

1. **Readability**: Using placeholder text makes your tests more readable and easier to understand, as they reflect the actual hints users see on the page.
2. **Maintainability**: If the structure of your HTML changes but the placeholder text remains the same, your tests are less likely to break.
3. **Flexibility**: The method is straightforward and can be used in various scenarios where placeholder text is present.

### When to Use `getByPlaceholder`

- **Form Inputs**: Ideal for locating text inputs, search fields, email fields, and password fields by their placeholder text.
- **Guided Inputs**: Useful for fields where the placeholder text provides guidance on the expected input.

### Advanced Usage

The `getByPlaceholder` method can be combined with other locators to narrow down your search:
```javascript
// Locate an input field within a specific form by its placeholder text
await page.locator('form#login').getByPlaceholder('Enter your username').fill('myUsername');
```

Using `getByPlaceholder` can significantly improve the readability and robustness of your Playwright tests


### Situations where getByLabel can be used in Edit Box


The `getByLabel` method is particularly useful for entering data in edit boxes (input fields) in various scenarios. Here are some common situations where `getByLabel` can be effectively used:

#### 1. **Login Forms**
- **Scenario**: Entering a username and password in a login form.
- **Example**:
  ```javascript
  await page.getByLabel('Username').fill('myUsername');
  await page.getByLabel('Password').fill('myPassword');
  ```

#### 2. **Registration Forms**
- **Scenario**: Filling out a registration form with multiple fields like name, email, and password.
- **Example**:
  ```javascript
  await page.getByLabel('First Name').fill('John');
  await page.getByLabel('Last Name').fill('Doe');
  await page.getByLabel('Email').fill('john.doe@example.com');
  await page.getByLabel('Password').fill('securePassword123');
  ```

#### 3. **Search Fields**
- **Scenario**: Entering a search query in a search field.
- **Example**:
  ```javascript
  await page.getByLabel('Search').fill('Playwright tutorials');
  ```

#### 4. **Contact Forms**
- **Scenario**: Filling out a contact form with fields like name, email, and message.
- **Example**:
  ```javascript
  await page.getByLabel('Name').fill('Jane Doe');
  await page.getByLabel('Email').fill('jane.doe@example.com');
  await page.getByLabel('Message').fill('I would like to know more about your services.');
  ```

#### 5. **Profile Update Forms**
- **Scenario**: Updating user profile information such as address, phone number, and bio.
- **Example**:
  ```javascript
  await page.getByLabel('Address').fill('123 Main St, Springfield');
  await page.getByLabel('Phone Number').fill('123-456-7890');
  await page.getByLabel('Bio').fill('Software developer with a passion for open-source projects.');
  ```

#### 6. **Feedback Forms**
- **Scenario**: Providing feedback or comments in a feedback form.
- **Example**:
  ```javascript
  await page.getByLabel('Feedback').fill('Great service! Keep up the good work.');
  ```

#### 7. **Subscription Forms**
- **Scenario**: Entering an email address to subscribe to a newsletter.
- **Example**:
  ```javascript
  await page.getByLabel('Email Address').fill('subscriber@example.com');
  ```

Using `getByLabel` in these scenarios ensures that your tests are both readable and maintainable, as they leverage the visible text labels that users interact with. This method also aligns with accessibility best practices, making your tests more robust and user-friendly.


 ### Handling Calender or date picker based assertions

 Handling calendar-based tasks in Playwright involves interacting with date pickers and calendar widgets. Here are some common approaches and examples to help you automate these interactions:

#### 1. **Selecting a Date from a Calendar Widget**

If the calendar widget is a standard HTML element, you can interact with it directly by clicking on the date elements. Here's an example:

```javascript
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');

    // Open the calendar widget
    await page.click('input#date-picker');

    // Select a specific date
    await page.click('text=15'); // Assuming the date is visible as text

    await browser.close();
})();
```

#### 2. **Filling a Date Input Field**

If the date picker is an input field with a date type, you can fill it directly:

```javascript
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');

    // Fill the date input field
    await page.fill('input[type="date"]', '2025-01-11');

    await browser.close();
})();
```

#### 3. **Handling Complex Calendar Widgets**

For more complex calendar widgets, you might need to navigate through months or years to select a date. Here's an example of how to handle such a scenario:

```javascript
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');

    // Open the calendar widget
    await page.click('input#date-picker');

    // Navigate to the desired month and year
    await page.click('button[aria-label="Next Month"]'); // Adjust the selector as needed

    // Select the desired date
    await page.click('text=15'); // Assuming the date is visible as text

    await browser.close();
})();
```

#### 4. **Using Date Libraries**

You can also use date libraries like `date-fns` or `moment` to manipulate dates and format them as needed for your tests:

```javascript
const { chromium } = require('playwright');
const { format } = require('date-fns');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');

    // Get today's date in the desired format
    const today = format(new Date(), 'yyyy-MM-dd');

    // Fill the date input field
    await page.fill('input[type="date"]', today);

    await browser.close();
})();
```

