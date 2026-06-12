const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function run() {
    const url = 'https://cdn3.digialm.com//per/g28/pub/2083/touchstone/AssessmentQPHTMLMode1//2083O2642/2083O2642S16D21002/17791793295663714/UP140201369_2083O2642S16D21002E1.html';
    const browser = await chromium.launch({ 
        headless: true,
        args: [
            '--disable-blink-features=AutomationControlled'
        ]
    });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        viewport: { width: 1280, height: 800 }
    });
    const page = await context.newPage();
    console.log("Navigating to URL...");
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    console.log("Response status:", response.status());
    await page.waitForTimeout(5000); // Wait 5 seconds for page rendering
    const html = await page.content();
    const dest = path.join(__dirname, 'sheet.html');
    fs.writeFileSync(dest, html, 'utf8');
    console.log(`Saved HTML to ${dest} successfully! size: ${fs.statSync(dest).size} bytes`);
    await browser.close();
}

run().catch(console.error);
