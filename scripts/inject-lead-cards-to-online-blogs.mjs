import fs from 'fs';
import path from 'path';

const POSTS_DIR = path.join(process.cwd(), 'posts');

function injectLeadCards() {
  console.log('🔍 Scanning posts for Online Degree & MBA Lead Card injection...');

  if (!fs.existsSync(POSTS_DIR)) {
    console.error('❌ Posts directory not found!');
    return;
  }

  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
  let updatedCount = 0;
  let skippedCount = 0;

  files.forEach(file => {
    const isOnline = file.includes('online') || 
                     file.includes('distance') || 
                     file.includes('executive-mba') || 
                     file.includes('university') ||
                     file.includes('mba');

    if (!isOnline) {
      skippedCount++;
      return;
    }

    const filePath = path.join(POSTS_DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if the file already has InquiryCard
    if (content.includes('[InquiryCard')) {
      skippedCount++;
      return;
    }

    const cardSnippet = `\n\n[InquiryCard title="Get Free Online Degree & University Guidance 2026" description="Compare top UGC-DEB approved online universities (fees, NAAC A+ grade, EMI options) with expert counselor Mohit Jain." cta="Get Free Counselling" type="admission"]\n\n`;

    // Try to insert after the first H2 section, or append before backlink/bottom
    const h2Match = content.indexOf('## ');
    if (h2Match !== -1) {
      // Find end of first H2 section (next paragraph or next heading)
      const nextH2 = content.indexOf('## ', h2Match + 3);
      if (nextH2 !== -1) {
        content = content.slice(0, nextH2) + cardSnippet + content.slice(nextH2);
      } else {
        content += cardSnippet;
      }
    } else {
      content += cardSnippet;
    }

    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`✅ Lead Card Injected: ${file}`);
  });

  console.log('\n--- SUMMARY ---');
  console.log(`Total Files Scanned: ${files.length}`);
  console.log(`Files Updated with Lead Card: ${updatedCount}`);
  console.log(`Files Skipped: ${skippedCount}`);
  console.log('---------------');
}

injectLeadCards();
