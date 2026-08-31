import { test, expect } from '@playwright/test';

test('Inquiry Form Full OTP Verification Flow', async ({ page }) => {
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

  // 1. Verify OTP screen
  await expect(page.locator('text=VERIFY MOBILE NUMBER').first()).toBeVisible({ timeout: 15000 });
  await expect(page.locator('text=+91 9876543210').first()).toBeVisible();

  // 2. Read Mock OTP code if present
  const mockOtpEl = page.locator('text=Mock OTP Code:').first();
  const hasMock = await mockOtpEl.isVisible().catch(() => false);
  const otpCode = hasMock ? (await mockOtpEl.textContent() || '').replace(/\D/g, '').slice(0, 4) : '1234';

  console.log(`Typing OTP code: ${otpCode}`);

  for (let i = 0; i < otpCode.length; i++) {
    await page.locator(`#otp-box-${i}`).first().fill(otpCode[i]);
  }

  // 3. Click Verify OTP
  await page.locator('button:has-text("Verify OTP & Submit Inquiry")').first().click({ force: true });

  // 4. Verify Success screen
  await expect(page.locator('text=We Received Your Request!').first()).toBeVisible({ timeout: 15000 });
  await expect(page.locator('text=CALLBACK REQUESTED').first()).toBeVisible();
  await expect(page.locator('text=Instant WhatsApp Chat').first()).toBeVisible();

  console.log('🎉 PLAYWRIGHT TEST SUCCESS: Verified full flow from Form Submit -> OTP Entry -> Callback Requested!');
});
