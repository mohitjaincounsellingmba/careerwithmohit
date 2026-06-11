const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function run() {
    const url = 'https://cdn3.digialm.com//per/g28/pub/2083/touchstone/AssessmentQPHTMLMode1//2083O2642/2083O2642S16D21002/17791793295663714/UP140201369_2083O2642S16D21002E1.html';
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    console.log("Navigating to URL...");
    await page.goto(url, { waitUntil: 'networkidle' });
    console.log("Page loaded. Extracting HTML...");
    const html = await page.content();
    const dest = path.join(__dirname, 'sheet.html');
    fs.writeFileSync(dest, html, 'utf8');
    console.log(`Saved HTML to ${dest} successfully! size: ${fs.statSync(dest).size} bytes`);
    await browser.close();
}

run().catch(console.error);
