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

