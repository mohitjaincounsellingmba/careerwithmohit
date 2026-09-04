import { test, expect } from '@playwright/test';

test('Inquiry Form Direct Submission Flow Without OTP', async ({ page }) => {
  // Listen to console logs
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));

  await page.goto('http://localhost:3000/inquiry/');
  await page.waitForTimeout(1000);

  // Fill in the form fields by placeholder
  await page.getByPlaceholder('Your Full Name').first().fill('Mohit Jain Test User');
  await page.getByPlaceholder('WhatsApp Number').first().fill('9876543210');
  await page.getByPlaceholder('alex@example.com').first().fill('mohit.test@gmail.com');

  // Submit the form
  const submitButton = page.locator('button[type="submit"]:has-text("Submit Inquiry"), button[type="submit"]:has-text("Request B-School Callback")').first();
  await submitButton.click({ force: true });

  // Verify Direct Success screen without OTP verification step
  await expect(page.locator('text=We Received Your Request!').first()).toBeVisible({ timeout: 15000 });
  await expect(page.locator('text=CALLBACK REQUESTED').first()).toBeVisible();
  await expect(page.locator('text=Instant WhatsApp Chat').first()).toBeVisible();

  console.log('🎉 PLAYWRIGHT TEST SUCCESS: Verified direct submission from Form Submit -> Callback Requested without OTP!');
});
