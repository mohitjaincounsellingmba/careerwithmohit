import { test, expect } from '@playwright/test';

test('home page search redirects and filters colleges', async ({ page }) => {
  // Go to home page
  await page.goto('http://localhost:3000/');

  // Locate the home search input
  const searchInput = page.getByPlaceholder('Search colleges...');
  await expect(searchInput).toBeVisible({ timeout: 10000 });

  // Type a query that should filter results, e.g., "IIT"
  await searchInput.fill('IIT');
  // Submit the form (press Enter)
  await searchInput.press('Enter');

  // Wait for navigation to /colleges
  await page.waitForURL(/\/colleges/);

  // Ensure the results header is visible
  const header = page.getByRole('heading', { name: /Top Colleges in India/ });
  await expect(header).toBeVisible({ timeout: 10000 });

  // Extract the count
  const countText = await header.textContent();
  const match = countText?.match(/(\d+) Found/);
  const count = match ? parseInt(match[1]) : 0;

  // Expect that the filtered count is less than total (assuming total > 200)
  expect(count).toBeLessThan(200);
});
