# Test Isolation Framework - Complete Guide

## Overview

This Playwright test framework has been refactored for complete test isolation. Each test is independent, can run in parallel, and does not depend on shared state or other tests.

## Directory Structure

```
tests/
├── api/              # API tests (isolated, no browser dependencies)
├── regression/       # Regression tests (with page isolation)
├── smoke/            # Smoke tests (with page isolation)
└── example.spec.ts   # Example tests (basic isolation demo)

pages/
├── DashboardPage.ts      # Page Object Model - stateless
├── ProductTablePage.ts   # Page Object Model - stateless
└── TablePage.ts          # Page Object Model - stateless

locators/
├── dashboardPageLocators.ts      # Locator definitions only
├── productTablePageLocators.ts   # Locator definitions only
└── tablePageLocators.ts          # Locator definitions only

fixtures/
├── customTest.ts           # Isolated fixture with cleanup hooks
├── testData.ts             # Centralized test data
└── testIsolationHooks.ts   # Global isolation hooks

utils/
├── tableUtils.ts       # Utility functions (stateless)
└── paginationUtils.ts  # Pagination helpers (stateless)
```

## Key Principles

### 1. **Independent Tests**
Each test must:
- ✅ Run in ANY order without failing
- ✅ Run in PARALLEL without conflicts
- ✅ Not depend on other tests' data or state
- ✅ Have clear setup and teardown

### 2. **Shared Resources (Pages & Utils)**
- ✅ **Pages**: Store Page Objects in `pages/` - stateless wrappers
- ✅ **Utilities**: Store helper functions in `utils/` - pure functions
- ✅ **Fixtures**: Store fixture setup in `fixtures/` - with cleanup
- ✅ **Data**: Store test data in `fixtures/testData.ts`

### 3. **Isolation Mechanisms**

#### Fixture-Level Isolation
```typescript
// fixtures/customTest.ts
export const test = base.extend<{ dashboardPage: DashboardPage }>({
  dashboardPage: async ({ page }, use) => {
    // BEFORE: Reset page state
    await page.goto('about:blank');
    
    // CREATE: Fresh fixture instance
    const dashboardPage = new DashboardPage(page);
    
    // USE: Test runs here
    await use(dashboardPage);
    
    // AFTER: Cleanup
    await page.goto('about:blank');
  },
});
```

#### Global Hook-Level Isolation
```typescript
// fixtures/testIsolationHooks.ts
test.beforeEach(async ({ page, context }) => {
  // Clear cookies, storage, caches
  await context.clearCookies();
  await page.evaluate(() => localStorage.clear());
});

test.afterEach(async ({ page }) => {
  // Navigate to blank page
  await page.goto('about:blank');
});
```

#### Test Data Centralization
```typescript
// fixtures/testData.ts
export const testData = {
  baseUrl: process.env.LEAFGROUND_BASE_URL || 'https://www.leafground.com/',
  credentials: { username: 'emilys', password: 'emilyspass' },
  table: { expectedProductId: '1012', expectedStatus: 'INSTOCK' },
};
```

## How Isolation Works

### Test Execution Flow

```
┌─────────────────────────────────────────────────────────────┐
│ Test Start                                                  │
├─────────────────────────────────────────────────────────────┤
│ 1. Global beforeEach hook                                  │
│    ├─ Clear all cookies                                    │
│    ├─ Clear localStorage                                   │
│    └─ Clear sessionStorage                                 │
├─────────────────────────────────────────────────────────────┤
│ 2. Fixture Setup (customTest.ts)                           │
│    ├─ Navigate to about:blank                              │
│    ├─ Create fresh Page Object instances                   │
│    └─ Ready for use()                                      │
├─────────────────────────────────────────────────────────────┤
│ 3. TEST EXECUTION                                           │
│    ├─ Page is clean and isolated                           │
│    ├─ No shared state from other tests                     │
│    └─ Test runs to completion                              │
├─────────────────────────────────────────────────────────────┤
│ 4. Fixture Cleanup (customTest.ts)                         │
│    ├─ Navigate to about:blank                              │
│    └─ Page Object instances discarded                      │
├─────────────────────────────────────────────────────────────┤
│ 5. Global afterEach hook                                   │
│    ├─ Log test result                                      │
│    ├─ Capture failure screenshot                           │
│    └─ Navigate to about:blank                              │
├─────────────────────────────────────────────────────────────┤
│ Test Complete (Ready for next test)                        │
└─────────────────────────────────────────────────────────────┘
```

## Implementation Examples

### ✅ Isolated Test (GOOD)
```typescript
// tests/smoke/dynamicTable.spec.ts
import { test, expect } from '../../fixtures/customTest';
import { testData } from '../../fixtures/testData';

test('dynamic table sorting', async ({ dashboardPage, tablePage, page }) => {
  // Each test:
  // - Gets fresh page instance (from beforeEach)
  // - Gets fresh fixture instances
  // - Has clean browser storage
  
  await page.goto(testData.baseUrl);
  await page.waitForLoadState('networkidle');
  
  // Test execution with fresh state
});
```

### ❌ Non-Isolated Test (BAD - Removed)
```typescript
// BEFORE: This would have caused issues
test.only('some test', async () => {
  // ❌ test.only prevents other tests from running
});

// BEFORE: Shared state
let sharedCounter = 0;
test('test 1', async () => {
  sharedCounter++;
});
test('test 2', async () => {
  expect(sharedCounter).toBe(1); // ❌ Depends on test 1
});
```

## Page Objects (Stateless)

```typescript
// pages/DashboardPage.ts
export class DashboardPage {
  readonly page: Page;
  readonly globeMenuIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    // Only initialize locators, no state
    this.globeMenuIcon = page.locator(DashboardPageLocators.globeMenuIcon);
  }
  
  // No methods with side effects
  // Just locator definitions
}
```

## Utilities (Pure Functions)

```typescript
// utils/tableUtils.ts
export async function goToTable(page: Page) {
  // Pure function: same input → same output
  await page.goto(testData.dashboardUrl);
  await page.waitForLoadState('networkidle');
  // No side effects on other tests
}
```

## Running Tests

### Run all tests (parallel, isolated)
```bash
npx playwright test
```

### Run specific test file
```bash
npx playwright test tests/smoke/dynamicTable.spec.ts
```

### Run in serial (slower, for debugging)
```bash
npx playwright test --workers=1
```

### Run with debug mode (trace every step)
```bash
PWDEBUG=1 npx playwright test
```

### Run specific test by name
```bash
npx playwright test -g "dynamic table sorting"
```

### Run with headed browser (see what happens)
```bash
npx playwright test --headed
```

## Verification Checklist

- ✅ Each test uses fixtures from `fixtures/customTest.ts`
- ✅ No hardcoded URLs - all use `testData` from `fixtures/testData.ts`
- ✅ No global variables or shared state between tests
- ✅ All tests have clear setup, test, and assertion sections
- ✅ No `test.only` or `test.skip` in the codebase
- ✅ Page Objects in `pages/` are stateless
- ✅ Utility functions in `utils/` are pure functions
- ✅ Each test can run independently and in parallel
- ✅ Browser state is reset before and after each test
- ✅ Test data is centralized in `fixtures/testData.ts`

## Debugging Isolation Issues

### Issue: Tests pass individually but fail together
**Cause**: State leakage between tests
**Solution**: Check for global variables, ensure fixtures have proper cleanup

### Issue: Tests fail randomly (sometimes pass, sometimes fail)
**Cause**: Timing/race conditions or shared state
**Solution**: Add explicit waits, check for network-dependent operations

### Issue: Tests fail when run in parallel but pass in serial
**Cause**: Resource conflicts or timing issues
**Solution**: Ensure each test has independent data, check for file conflicts

### Issue: First test passes, subsequent tests fail
**Cause**: Shared page state or browser context not properly reset
**Solution**: Check beforeEach/afterEach hooks are running

## Best Practices Summary

1. ✅ **One test per concern**: Test one feature per test
2. ✅ **Descriptive names**: `test('dynamic table sorting - verify column sort functionality')`
3. ✅ **Clear sections**: Setup, Test, Assert (AAA pattern)
4. ✅ **Use fixtures**: Don't create raw page objects in tests
5. ✅ **Use test data**: Never hardcode values in tests
6. ✅ **Add comments**: Explain test intent and steps
7. ✅ **Avoid test.only**: All tests should run together
8. ✅ **No console.logs**: Use proper test reporting
9. ✅ **Explicit waits**: Use waitForLoadState, not arbitrary delays
10. ✅ **Error messages**: Include context in expect() messages

## Files Changed

- ✅ `fixtures/customTest.ts` - Added isolation hooks to fixtures
- ✅ `fixtures/testData.ts` - Created centralized test data
- ✅ `fixtures/testIsolationHooks.ts` - Created global isolation hooks
- ✅ `utils/tableUtils.ts` - Removed hardcoded URLs, used testData
- ✅ `tests/regression/sampletest.spec.ts` - Removed test.only, added testData
- ✅ `tests/smoke/dynamicTable.spec.ts` - Added testData, improved comments
- ✅ `tests/api/apiTest.spec.ts` - Added testData, improved assertions
- ✅ `tests/example.spec.ts` - Added descriptive comments
- ✅ `playwright.config.ts` - Added isolation-specific settings

## Next Steps (Optional Enhancements)

1. Create global setup for API token generation
2. Add database fixtures for backend testing
3. Create snapshot testing for visual regression
4. Add performance metrics collection
5. Create CI/CD integration for parallel testing
6. Add test tags for selective execution
7. Create custom reporters for isolation metrics
