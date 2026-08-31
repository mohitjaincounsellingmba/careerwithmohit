# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/inquiry-otp.spec.ts >> Inquiry Form Full OTP Verification Flow
- Location: tests/inquiry-otp.spec.ts:3:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=VERIFY MOBILE NUMBER').first()
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('text=VERIFY MOBILE NUMBER').first()

```

```yaml
- banner:
  - link "CareerWithMohit Logo":
    - /url: /
    - img
    - text: Career With Mohit
  - navigation:
    - link "Home":
      - /url: /
    - link "About":
      - /url: /about/
    - link "Blog":
      - /url: /blog/
    - button "Admissions"
  - textbox "Search site content":
    - /placeholder: Search...
  - button "Search"
  - link "Call":
    - /url: tel:+919560020771
- button "Close Pop-up"
- heading "Ready to Level Up?" [level=2]
- paragraph: Share your details and let our experts guide your career journey.
- text: Full Name *
- textbox "Full Name * Full Name *":
  - /placeholder: Your Full Name
- text: Phone / WhatsApp Number *
- textbox "Phone / WhatsApp Number * Phone / WhatsApp Number *":
  - /placeholder: WhatsApp Number
- text: Email Address *
- textbox "Email Address * Email Address *":
  - /placeholder: alex@example.com
- text: Current Location
- textbox "Current Location Current Location":
  - /placeholder: e.g. New Delhi
- text: Preferred Study Location
- textbox "Preferred Study Location Preferred Study Location":
  - /placeholder: e.g. Bangalore, Mumbai
- text: Budget Range
- combobox "Budget Range Budget Range":
  - option "Select Budget" [selected]
  - option "0-5 lacs"
  - option "5 to 10 lacs"
  - option "10 lacs and above"
- text: Course Interest
- combobox "Course Interest Course Interest":
  - option "MBA" [selected]
  - option "PGDM"
  - option "BBA"
  - option "BCA"
  - option "BTech"
  - option "Online MBA"
  - option "Abroad Education"
  - option "Online BBA"
  - option "MCA"
  - option "MBBS"
  - option "M.Tech"
  - option "LLB"
  - option "LLM"
- text: Message / Additional Details (Optional)
- textbox "Message / Additional Details (Optional) Message / Additional Details (Optional)":
  - /placeholder: Tell us more about your career goals or specific questions...
- button "Submit Inquiry"
- text: 🔒 100% Free & Confidential • Direct Guidance by Mohit Jain AI
- paragraph: Free Unique Feature
- paragraph: Instant AI College Matcher & 50% Scholarship Check 🎓
- button "Dismiss message"
- button "Open AI Education Consultant": "1"
- main:
  - heading "Start Your Admission Journey" [level=1]
  - paragraph: Get a Free Profile Evaluation for the 2027-29 session. Connect with Mohit Jain to navigate top-tier MBA and BTech admissions.
  - heading "Submit Your Admission Inquiry Form" [level=2]
  - text: Full Name *
  - textbox "Your Full Name": Mohit Jain Test User
  - text: Phone / WhatsApp Number *
  - textbox "WhatsApp Number": "9876543210"
  - text: Email Address *
  - textbox "alex@example.com": mohit.test@gmail.com
  - text: Current Location
  - textbox "e.g. New Delhi"
  - text: Preferred Study Location
  - textbox "e.g. Bangalore, Mumbai"
  - text: Budget Range
  - combobox:
    - option "Select Budget" [selected]
    - option "0-5 lacs"
    - option "5 to 10 lacs"
    - option "10 lacs and above"
  - text: Course Interest
  - combobox:
    - option "MBA" [selected]
    - option "PGDM"
    - option "BBA"
    - option "BCA"
    - option "BTech"
    - option "Online MBA"
    - option "Abroad Education"
    - option "Online BBA"
    - option "MCA"
    - option "MBBS"
    - option "M.Tech"
    - option "LLB"
    - option "LLM"
  - text: Message / Additional Details (Optional)
  - textbox "Tell us more about your career goals or specific questions..."
  - button "Processing Request..." [disabled]
  - text: 🔒 100% Free & Confidential • Direct Guidance by Mohit Jain
  - heading "Expert Admission Support" [level=3]
  - paragraph: Get 1-on-1 guidance for CAT, MAH CET, and CMAT based admissions from industry veterans.
  - heading "24h Response Guarantee" [level=3]
  - paragraph: We prioritize your career. Expect a detailed callback or email within one business day.
  - heading "Direct Admission Path" [level=3]
  - paragraph: Expertise in Management Quota, NRI seats, and profile-based admissions for top B-schools.
  - heading "Frequently Asked Questions" [level=2]
  - heading "How does the 2027 admission guidance process work?" [level=4]
  - paragraph: Once you submit the form, we evaluate your profile (CAT/CET scores, academics, budget). We then match you with top-tier colleges like JBIMS, NMIMS, or SIBM and guide you through the GDPI and seat allotment rounds.
  - heading "Can I get help with Management Quota or NRI Seats?" [level=4]
  - paragraph: Yes, we specialize in helping students navigate Institutional Quota and NRI seats for high-demand courses like MBA and BTech in Bangalore, Mumbai, and Pune.
  - heading "Is my profile evaluation really free?" [level=4]
  - paragraph: Yes! Your first preliminary evaluation where we discuss your scores and potential college list is completely free of charge.
- contentinfo:
  - img
  - heading "Ready to Elevate Your Career?" [level=2]
  - paragraph: Get expert guidance for Admissions 2027, Mock Tests, and Career Roadmaps tailored just for you.
  - link "Get Started Now":
    - /url: /inquiry/
  - link "CareerWithMohit Logo":
    - /url: /
    - img
    - text: Career With Mohit Admissions & 10x Career Hub
  - paragraph: Your ultimate destination for Admissions 2027, career counselling, and premium education roadmaps. We help you build a 10x career.
  - link "Instagram":
    - /url: https://www.instagram.com/careerwithmohit.online/
  - link "LinkedIn":
    - /url: https://www.linkedin.com/company/career-with-mohit
  - link "Facebook":
    - /url: https://www.facebook.com/profile.php?id=61575525271998
  - link "YouTube":
    - /url: https://www.youtube.com/@careerwithmohit.online
  - link "+91 95600 20771":
    - /url: tel:+919560020771
  - link "info@careerwithmohit.online":
    - /url: mailto:info@careerwithmohit.online
  - heading "Quick Links" [level=3]
  - list:
    - listitem:
      - link "Top Colleges":
        - /url: /colleges/
    - listitem:
      - link "Top Tier MBA":
        - /url: /top-tier-mba-colleges/
    - listitem:
      - link "Latest News":
        - /url: /blog/
    - listitem:
      - link "All Tools":
        - /url: /tools/
    - listitem:
      - link "Counselling":
        - /url: /services/
    - listitem:
      - link "Sell Coaching Online":
        - /url: /sell-your-coaching-online/
    - listitem:
      - link "Partner With Us":
        - /url: /partner-with-us/
    - listitem:
      - link "Backlink Collab":
        - /url: /backlink-collaboration/
    - listitem:
      - link "Contact Us":
        - /url: /inquiry/
    - listitem:
      - link "About Mohit":
        - /url: /about/
  - heading "Predictors" [level=3]
  - list:
    - listitem:
      - link "CAT 2026 Score Calculator":
        - /url: /tools/cat-score-calculator/
    - listitem:
      - link "Sept MAT Score Calculator":
        - /url: /tools/mat-score-calculator/
    - listitem:
      - link "XAT 2027 Calculator":
        - /url: /tools/xat-score-calculator-2027/
    - listitem:
      - link "JEE Main Predictor":
        - /url: /calculator/jee-main-2026/
    - listitem:
      - link "CUET PG Tool":
        - /url: /calculator/cuet-pg-2026/
    - listitem:
      - link "CUET UG Predictor":
        - /url: /calculator/cuet-ug-2026/
    - listitem:
      - link "MHCET MBA 2027":
        - /url: /calculator/mhcet-mba-2026/
    - listitem:
      - link "B.Tech Predictor":
        - /url: /tools/btech-college-predictor/
  - heading "Resources" [level=3]
  - list:
    - listitem:
      - link "Free Starter Kit New":
        - /url: /starter-kit/
    - listitem:
      - link "Free File Converter Free":
        - /url: /tools/file-converter/
    - listitem:
      - link "Mock Test Hub Popular":
        - /url: /mock-tests/
    - listitem:
      - link "Free CAT 2026 Mock Test":
        - /url: /tools/cat-mock-test/
    - listitem:
      - link "Free JEE Mock 2027":
        - /url: /tools/jee-main-mock-test/
    - listitem:
      - link "PYQ Papers":
        - /url: /previous-year-papers/
    - listitem:
      - link "Online Degrees":
        - /url: /online-degree-certification/
    - listitem:
      - link "Abroad Education New":
        - /url: /abroad-education/
    - listitem:
      - link "Certifications":
        - /url: /certifications/
    - listitem:
      - link "Academic Calculators Tools":
        - /url: /tools/academic-calculators/
    - listitem:
      - link "Roadmap Calculator New":
        - /url: /calculator/career-roadmap/
    - listitem:
      - link "Jobs":
        - /url: /jobs/
  - text: © 2026 CareerWithMohit. All rights reserved.
  - link "Privacy Policy":
    - /url: /privacy/
  - link "Terms of Service":
    - /url: /terms/
  - paragraph: Built for 10x Career Growth
- alert
- iframe
- iframe
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Inquiry Form Full OTP Verification Flow', async ({ page }) => {
  4  |   // Listen to console logs
  5  |   page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  6  | 
  7  |   await page.goto('http://localhost:3000/inquiry/');
  8  |   await page.waitForTimeout(1000);
  9  | 
  10 |   // Fill in the form fields by placeholder
  11 |   await page.getByPlaceholder('Your Full Name').first().fill('Mohit Jain Test User');
  12 |   await page.getByPlaceholder('WhatsApp Number').first().fill('9876543210');
  13 |   await page.getByPlaceholder('alex@example.com').first().fill('mohit.test@gmail.com');
  14 | 
  15 |   // Submit the form
  16 |   const submitButton = page.locator('button[type="submit"]:has-text("Submit Inquiry"), button[type="submit"]:has-text("Request B-School Callback")').first();
  17 |   await submitButton.click({ force: true });
  18 | 
  19 |   // 1. Verify OTP screen
> 20 |   await expect(page.locator('text=VERIFY MOBILE NUMBER').first()).toBeVisible({ timeout: 15000 });
     |                                                                   ^ Error: expect(locator).toBeVisible() failed
  21 |   await expect(page.locator('text=+91 9876543210').first()).toBeVisible();
  22 | 
  23 |   // 2. Read Mock OTP code if present
  24 |   const mockOtpEl = page.locator('text=Mock OTP Code:').first();
  25 |   const hasMock = await mockOtpEl.isVisible().catch(() => false);
  26 |   const otpCode = hasMock ? (await mockOtpEl.textContent() || '').replace(/\D/g, '').slice(0, 4) : '1234';
  27 | 
  28 |   console.log(`Typing OTP code: ${otpCode}`);
  29 | 
  30 |   for (let i = 0; i < otpCode.length; i++) {
  31 |     await page.locator(`#otp-box-${i}`).first().fill(otpCode[i]);
  32 |   }
  33 | 
  34 |   // 3. Click Verify OTP
  35 |   await page.locator('button:has-text("Verify OTP & Submit Inquiry")').first().click({ force: true });
  36 | 
  37 |   // 4. Verify Success screen
  38 |   await expect(page.locator('text=We Received Your Request!').first()).toBeVisible({ timeout: 15000 });
  39 |   await expect(page.locator('text=CALLBACK REQUESTED').first()).toBeVisible();
  40 |   await expect(page.locator('text=Instant WhatsApp Chat').first()).toBeVisible();
  41 | 
  42 |   console.log('🎉 PLAYWRIGHT TEST SUCCESS: Verified full flow from Form Submit -> OTP Entry -> Callback Requested!');
  43 | });
  44 | 
```