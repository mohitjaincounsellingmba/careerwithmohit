const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('shiksha.html', 'utf8');
const $ = cheerio.load(html);

// Check if it's an access denied page
if ($('title').text().includes('Access Denied') || $('title').text().includes('Captcha')) {
    console.log("Access Denied or Captcha page.");
}

console.log("Title: ", $('title').text());

const colleges = [];

// Try to find college cards
// The class names might vary, but we can look for links or specific structures
$('div, section').each((i, el) => {
    const text = $(el).text();
    if (text.includes('Fee') && text.includes('LPA')) {
        // This might be a college card
        // We'll just try to print some text to see the structure
    }
});

// A better way is just to dump the text content of the body to see if it loaded properly
fs.writeFileSync('shiksha_text.txt', $('body').text().replace(/\s+/g, ' '));
console.log("Saved text content to shiksha_text.txt");
