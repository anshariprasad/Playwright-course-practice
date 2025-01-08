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