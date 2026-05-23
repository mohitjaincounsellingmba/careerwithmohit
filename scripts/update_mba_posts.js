const fs = require('fs');
const path = require('path');

// Load Shiksha data
const shikshaPath = path.join(__dirname, '..', 'shiksha_mba_data.json');
let shikshaData = {};
try {
  shikshaData = JSON.parse(fs.readFileSync(shikshaPath, 'utf8'));
} catch (e) {
  console.error('Failed to read shiksha_mba_data.json', e);
  process.exit(1);
}

// Helper: flatten all college entries into a map by name (lowercase)
const collegeMap = {};
const categories = Object.keys(shikshaData);
categories.forEach(cat => {
  const arr = shikshaData[cat];
  if (Array.isArray(arr)) {
    arr.forEach(col => {
      if (col.name) {
        collegeMap[col.name.toLowerCase()] = col;
      }
    });
  }
});

const postsDir = path.join(__dirname, '..', 'posts');
const postFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

let updatedCount = 0;
postFiles.forEach(file => {
  const fullPath = path.join(postsDir, file);
  let content = fs.readFileSync(fullPath, 'utf8');
  let original = content;

  // For each college name present in the file, replace fee and placement values
  Object.keys(collegeMap).forEach(colName => {
    if (content.toLowerCase().includes(colName)) {
      const col = collegeMap[colName];
      // Replace Fees line
      if (col.fees) {
        const feeRegex = new RegExp(`(Fees\s*[:=]\s*)([₹\d,.]+)`, 'gi');
        content = content.replace(feeRegex, `$1${col.fees}`);
      }
      // Replace Avg Placement line (could be Avg Placement, Avg Salary, etc.)
      if (col.avgPlacement) {
        const placementRegex = new RegExp(`(Avg(?:\s+Placement|\s+Salary)?\s*[:=]\s*)([₹\d,.]+)`, 'gi');
        content = content.replace(placementRegex, `$1${col.avgPlacement}`);
      }
    }
  });

  // Append citation if not present
  if (!content.includes('Source: Shiksha.com')) {
    content += '\n\nSource: Shiksha.com';
  }

  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf8');
    updatedCount++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Total files updated: ${updatedCount}`);
