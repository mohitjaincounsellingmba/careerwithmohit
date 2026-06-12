const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'sheet.html'), 'utf8');

const blocks = html.split(/<div\s+class="question-pnl"/i);
console.log("Full HTML of Block 1:");
console.log(blocks[1]);
