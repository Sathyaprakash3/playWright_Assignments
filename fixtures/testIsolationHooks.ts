/**
 * Test Isolation Configuration and Hooks
 * 
 * This module provides built-in hooks for test isolation at the global level
 * Ensures every test starts fresh and cleans up properly
 */

import { test } from '@playwright/test';

/**
 * Global beforeEach hook - runs before every test
 * Clears browser cache, storage, and cookies for isolation
 */
test.beforeEach(async ({ page, context }) => {
  // Clear all cookies from context
  await context.clearCookies();
  
  // Clear local storage
  await page.evaluate(() => {
    localStorage.clear();
  });
  
  // Clear session storage
  await page.evaluate(() => {
    sessionStorage.clear();
  });
  
  // Log test start for debugging
  console.log(`\n[TEST START] - ${new Date().toISOString()}`);
});

/**
 * Global afterEach hook - runs after every test
 * Performs cleanup and generates logs for isolation verification
 */
test.afterEach(async ({ page }, testInfo) => {
  // Capture final page state if test failed
  if (testInfo.status === 'failed') {
    console.log(`\n[TEST FAILED] - ${testInfo.title}`);
    console.log(`Error: ${testInfo.error?.message || 'Unknown error'}`);
    
    // Capture screenshot of failure
    const screenshot = await page.screenshot({ path: `test-results/${testInfo.title}-failed.png` });
    console.log(`Screenshot saved: test-results/${testInfo.title}-failed.png`);
  } else {
    console.log(`\n[TEST PASSED] - ${testInfo.title}`);
  }
  
  // Navigate to blank page to ensure full cleanup
  await page.goto('about:blank');
  
  // Log test end for debugging
  console.log(`[TEST END] - ${new Date().toISOString()}\n`);
});

/**
 * Test isolation best practices and guidelines:
 * 
 * 1. INDEPENDENT TESTS
 *    - Each test should be able to run in ANY order
 *    - Each test should be able to run in PARALLEL
 *    - No test should depend on another test's data or state
 * 
 * 2. SHARED RESOURCES (Pages, Utilities)
 *    - Store in 'pages/' directory as Page Objects
 *    - Store in 'utils/' directory with exported functions
 *    - Use fixtures in 'fixtures/' directory
 *    - All should be stateless or reset-able
 * 
 * 3. TEST DATA
 *    - Centralize in 'fixtures/testData.ts'
 *    - Use environment variables for sensitive data
 *    - Use unique IDs for each test's data (timestamps, UUIDs)
 *    - Never hard-code test data in test files
 * 
 * 4. SETUP & TEARDOWN
 *    - Use beforeEach/afterEach hooks globally
 *    - Use test.beforeAll/test.afterAll for fixture setup only
 *    - Always clean up browser state (storage, cookies)
 *    - Reset page to 'about:blank' after each test
 * 
 * 5. FIXTURE USAGE
 *    - Use custom test fixtures in 'fixtures/customTest.ts'
 *    - Fixtures should wrap cleanup in use() callback
 *    - Each fixture should reset its state before use
 *    - Avoid global state in fixtures
 * 
 * 6. PAGE OBJECTS
 *    - Should only contain locators, no state
 *    - Should initialize locators in constructor
 *    - Should be lightweight wrappers around Page
 *    - Should not perform navigation or assertions
 * 
 * 7. UTILITIES
 *    - Should be pure functions or stateless
 *    - Should use testData for configuration
 *    - Should not perform assertions
 *    - Should return data, not side effects
 * 
 * 8. DEBUGGING TEST ISOLATION ISSUES
 *    - If tests pass individually but fail together: state leakage issue
 *    - If tests fail randomly: timing/race condition issue
 *    - If tests fail in order: dependency issue
 *    - Enable debug mode: PWDEBUG=1 npx playwright test
 */

export const testIsolationConfig = {
  description: 'Global test isolation configuration',
  hooks: {
    beforeEach: 'Clears storage, cookies, and resets browser state',
    afterEach: 'Navigates to blank page and logs test results',
  },
  bestPractices: [
    'Each test must be independent',
    'Use centralized test data (testData.ts)',
    'Store shared resources in pages/ and utils/',
    'Reset page state after each test',
    'Use fixtures for test setup',
    'Avoid test.only and test.skip',
    'Use descriptive test names with comments',
  ],
};
