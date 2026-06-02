import { test, expect } from '@playwright/test';

test.describe('Compare Flow & Student Reviews E2E', () => {
  
  test('should allow selecting colleges, showing drawer, and navigating to compare page', async ({ page }) => {
    // Navigate to directory
    await page.goto('http://localhost:3000/colleges');
    await page.waitForLoadState('networkidle');

    // Click "Compare" toggle on first two college cards
    const compareButtons = page.locator('button:has-text("Compare")');
    await expect(compareButtons.first()).toBeVisible({ timeout: 10000 });

    // Select first college
    await compareButtons.nth(0).click();
    
    // Select second college
    await compareButtons.nth(1).click();

    // Verify floating drawer appears
    const drawer = page.locator('h4:has-text("Compare Colleges")');
    await expect(drawer).toBeVisible();

    // Verify "2 of 4 selected" message
    const selectedCountText = page.locator('p:has-text("selected")');
    await expect(selectedCountText).toContainText('2 of 4');

    // Click "Compare Now" button inside the drawer
    const compareNowBtn = page.locator('button:has-text("Compare Now")');
    await expect(compareNowBtn).toBeEnabled();
    await compareNowBtn.click();

    // Verify navigation to the compare route
    await page.waitForURL(/\/colleges\/compare\?slugs=.+/);
    await page.waitForLoadState('networkidle');

    // Verify comparison table loaded
    const comparisonHeader = page.locator('h3:has-text("Evaluating")');
    await expect(comparisonHeader).toBeVisible();

    // Verify side-by-side headers are rendered
    const viewProfileButtons = page.locator('a:has-text("View Profile")');
    const btnCount = await viewProfileButtons.count();
    expect(btnCount).toBeGreaterThanOrEqual(2);
  });

  test('should render reviews tab and display verified reviews on details page', async ({ page }) => {
    // Navigate directly to a college detail page (e.g. iit-delhi or first college slug)
    await page.goto('http://localhost:3000/colleges/iit-delhi');
    await page.waitForLoadState('networkidle');

    // Find and click the "Reviews" tab button
    const reviewsTab = page.locator('button:has-text("Reviews")');
    await expect(reviewsTab).toBeVisible({ timeout: 10000 });
    await reviewsTab.click();

    // Verify "Verified Student Reviews" section is now active/visible
    const reviewsHeader = page.locator('h2:has-text("Verified Student Reviews")');
    await expect(reviewsHeader).toBeVisible();

    // Verify rating breakdown board is visible
    const breakdownHeader = page.locator('h4:has-text("Rating Breakdown")');
    await expect(breakdownHeader).toBeVisible();

    // Verify list of reviews is populated with verified badge
    const verifiedBadge = page.locator('span:has-text("Verified Student")').first();
    await expect(verifiedBadge).toBeVisible();
  });

});
