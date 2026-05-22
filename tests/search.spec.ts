import { test, expect } from '@playwright/test';

test('search bar logs input and filters results', async ({ page }) => {
  // Navigate to the local dev server
  await page.goto('http://localhost:3000/colleges');

  // Capture console messages
  const messages: string[] = [];
  page.on('console', msg => {
    messages.push(msg.text());
  });

  // Ensure page is fully loaded before interacting
  await page.waitForLoadState('networkidle');
  const searchInput = await page.getByPlaceholder('Search colleges by name, courses, or exams...').first();
  await expect(searchInput).toBeVisible({ timeout: 10000 });

  // Type a query
  await searchInput.fill('engineering');

  // Wait a short while for UI update
  await page.waitForTimeout(500);

  // Verify that console logged the input change
  const logged = messages.find(m => m.includes('Search input changed:'));
  expect(logged).toBeTruthy();

  // Verify that the results count displayed has changed (less than total)
  const resultHeader = page.getByRole('heading', { name: /Top Colleges in India/ });
  await expect(resultHeader).toBeVisible({ timeout: 10000 });
  const countText = await resultHeader.textContent();
  // Extract number from text
  const match = countText?.match(/(\d+) Found/);
  const count = match ? parseInt(match[1], 10) : 0;
  expect(count).toBeLessThan(200); // assuming total > 200
});
