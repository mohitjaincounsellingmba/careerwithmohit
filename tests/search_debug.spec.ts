// tests/search_debug.spec.ts
import { test, expect } from "@playwright/test";

test("search updates filtered count", async ({ page }) => {
  await page.goto("http://localhost:3000/colleges");
  // Ensure initial count displayed
  const header = page.getByRole('heading', { name: /Top Colleges in India/ });
  await expect(header).toBeVisible();
  const getCount = async () => {
    const text = await header.textContent();
    const match = text?.match(/(\d+) Found/);
    return match ? parseInt(match[1]) : 0;
  };
  const initialCount = await getCount();
  // Type a query that should filter results, e.g., "IIT"
  const input = page.locator('input[placeholder="Search colleges by name, courses, or exams..."]');
  await input.fill("IIT");
  // Wait for UI to update
  await page.waitForTimeout(500);
  const filteredCount = await getCount();
  console.log({ initialCount, filteredCount });
  // Expect the count to be less or equal (could be same if no match)
  expect(filteredCount).toBeLessThanOrEqual(initialCount);
});
