import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURATION ---
const NICHE_WEBSITE_URL = 'https://www.careerwithmohit.online/tools/mock-tests'; // Default placeholder, user can update
const ANCHOR_TEXT = 'Explore Our Premium MBA Mock Test Series 2026';
const SECTION_TITLE = '🚀 Boost Your Preparation';
// ---------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const POSTS_DIR = path.join(process.cwd(), 'posts');

function automateBacklinks() {
  console.log('🔍 Scanning blog posts for backlink injection...');

  if (!fs.existsSync(POSTS_DIR)) {
    console.error('❌ Posts directory not found!');
    return;
  }

  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
  let updatedCount = 0;
  let skippedCount = 0;

  files.forEach(file => {
    const filePath = path.join(POSTS_DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if the link already exists
    if (content.includes(NICHE_WEBSITE_URL)) {
      skippedCount++;
      return;
    }

    // Prepare the backlink section
    const backlinkSection = `
---

### ${SECTION_TITLE}

Looking for more resources? **[${ANCHOR_TEXT}](${NICHE_WEBSITE_URL})** to get real-time exam experience and detailed performance analytics.

---
`;

    // Append to the end of the file
    content += backlinkSection;

    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`✅ Updated: ${file}`);
  });

  console.log('\n--- SUMMARY ---');
  console.log(`Total Files Scanned: ${files.length}`);
  console.log(`Files Updated: ${updatedCount}`);
  console.log(`Files Skipped (Already linked): ${skippedCount}`);
  console.log('---------------');
}

automateBacklinks();
