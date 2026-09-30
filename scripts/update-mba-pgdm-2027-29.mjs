import fs from 'fs';
import path from 'path';

const postsDir = path.join(process.cwd(), 'posts');
const collegesDir = path.join(process.cwd(), 'colleges');

console.log('--- Starting MBA & PGDM 2027-29 Batch & Slug Update ---');

// 1. Identification logic
function isMbaPgdmPost(filename, content) {
  const fLower = filename.toLowerCase();
  const cLower = content.toLowerCase();

  // Exclusions
  if (
    fLower.includes('duolingo') ||
    fLower.includes('ielts') ||
    fLower.includes('toefl') ||
    fLower.includes('hiring-') ||
    fLower.includes('job-') ||
    fLower.includes('internship-') ||
    fLower.includes('up-board') ||
    fLower.includes('digital-empire') ||
    fLower.includes('tax-return') ||
    fLower.includes('branded-app') ||
    fLower.includes('gst-invoicing')
  ) {
    return false;
  }
  if ((fLower.includes('btech') || fLower.includes('engineering') || fLower.includes('mtech')) && !fLower.includes('mba') && !fLower.includes('pgdm')) {
    return false;
  }
  if ((fLower.includes('mbbs') || fLower.includes('medical') || fLower.includes('neet-')) && !fLower.includes('mba')) {
    return false;
  }
  if ((fLower.includes('llb') || fLower.includes('clat') || fLower.includes('ailet')) && !fLower.includes('mba')) {
    return false;
  }
  if ((fLower.includes('mca') || fLower.includes('nimcet')) && !fLower.includes('mba')) {
    return false;
  }
  if (fLower.includes('bba-') && !fLower.includes('mba') && !fLower.includes('pgdm') && !fLower.includes('cat') && !fLower.includes('ipm')) {
    return false;
  }

  if (
    fLower.includes('mba') ||
    fLower.includes('pgdm') ||
    fLower.includes('cat-') ||
    fLower.includes('xat-') ||
    fLower.includes('cmat-') ||
    fLower.includes('mat-') ||
    fLower.includes('snap-') ||
    fLower.includes('nmat-') ||
    fLower.includes('iim') ||
    fLower.includes('bschool') ||
    fLower.includes('b-school') ||
    fLower.includes('gdpi') ||
    fLower.includes('direct-admission')
  ) {
    return true;
  }

  if (cLower.includes('mba') || cLower.includes('pgdm') || cLower.includes('iim ') || cLower.includes('business school') || cLower.includes('cat 202')) {
    return true;
  }

  return false;
}

function getNewFilename(file) {
  let newName = file;

  // 1. Explicit batch: 2026-28, 2025-27, 2026-2028, 2025-2027, 2027-28
  newName = newName.replace(/2026[-–—]28/g, '2027-29');
  newName = newName.replace(/2025[-–—]27/g, '2027-29');
  newName = newName.replace(/2026[-–—]2028/g, '2027-29');
  newName = newName.replace(/2025[-–—]2027/g, '2027-29');
  newName = newName.replace(/2027[-–—]28/g, '2027-29');

  // 2. Admission suffix: -admission-2026.md, -admission-2025.md
  newName = newName.replace(/-admission-202[56]\.md$/i, '-admission-2027-29.md');
  newName = newName.replace(/-admissions-202[56]\.md$/i, '-admissions-2027-29.md');

  // 3. Direct admission: direct-admission-*-2026.md -> direct-admission-*-2027-29.md
  if (newName.startsWith('direct-admission-') && /-202[56]\.md$/i.test(newName)) {
    newName = newName.replace(/-202[56]\.md$/i, '-2027-29.md');
  }

  // 4. Top/Best MBA / PGDM lists
  if (
    newName.includes('top-mba') ||
    newName.includes('top-pgdm') ||
    newName.includes('best-mba') ||
    newName.includes('best-pgdm') ||
    newName.includes('mba-colleges-') ||
    newName.includes('pgdm-colleges-')
  ) {
    newName = newName.replace(/-202[56]\.md$/i, '-2027-29.md');
  }

  // 5. MBA Cutoffs & Percentiles
  if (newName.includes('cutoff') || newName.includes('cut-off') || newName.includes('percentile')) {
    newName = newName.replace(/-202[56]\.md$/i, '-2027-29.md');
  }

  // 6. USP of MBA colleges
  if (newName.startsWith('usp-of-') && /-202[56]\.md$/i.test(newName)) {
    newName = newName.replace(/-202[56]\.md$/i, '-2027-29.md');
  }

  // 7. MBA Comparisons
  if (newName.includes('-vs-') && /-202[56]\.md$/i.test(newName)) {
    newName = newName.replace(/-202[56]\.md$/i, '-2027-29.md');
  }

  // 8. MBA College Reviews: -review-2026.md / -review-2025.md
  if (/-review-202[56]\.md$/i.test(newName)) {
    newName = newName.replace(/-review-202[56]\.md$/i, '-review-2027-29.md');
  }

  // 9. General MBA/PGDM suffix -2026.md / -2025.md
  if (/-202[56]\.md$/i.test(newName)) {
    newName = newName.replace(/-202[56]\.md$/i, '-2027-29.md');
  }

  return newName;
}

// 2. Build slug mapping and perform file renames
const postFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
const slugMapping = new Map(); // oldSlug -> newSlug

postFiles.forEach(file => {
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  if (isMbaPgdmPost(file, content)) {
    const newFile = getNewFilename(file);
    if (newFile !== file) {
      const oldSlug = file.replace(/\.md$/, '');
      const newSlug = newFile.replace(/\.md$/, '');
      slugMapping.set(oldSlug, newSlug);

      const newPath = path.join(postsDir, newFile);
      fs.renameSync(filePath, newPath);
    }
  }
});

console.log(`Renamed ${slugMapping.size} post files to 2027-29 slugs!`);

// 3. Update content of ALL post files in posts/
function updatePostContent(content, isMba) {
  let updated = content;

  if (isMba) {
    // 1. Batch replacements
    updated = updated.replace(/2026\s*[-–—]\s*2028/g, '2027–2029');
    updated = updated.replace(/2026\s*[-–—]\s*28/g, '2027–29');
    updated = updated.replace(/2025\s*[-–—]\s*2027/g, '2027–2029');
    updated = updated.replace(/2025\s*[-–—]\s*27/g, '2027–29');
    updated = updated.replace(/2027\s*[-–—]\s*28/g, '2027–29');

    // 2. Admission replacements in titles, headings, and text
    updated = updated.replace(/(MBA|PGDM|Management|B-School)\s+(Admission|Admissions|Batch|Intake)\s+(?:2025|2026)/gi, '$1 $2 2027–2029');
    updated = updated.replace(/(Admission|Admissions|Batch|Intake)\s+(?:2025|2026)\s+(for\s+MBA|for\s+PGDM)/gi, '$1 2027–2029 $2');
    updated = updated.replace(/for\s+(?:the\s+)?2026\s+(?:batch|session|intake)/gi, 'for the 2027–2029 intake');
    updated = updated.replace(/for\s+(?:the\s+)?2026-28\s+(?:batch|session|intake)/gi, 'for the 2027–2029 batch');
    updated = updated.replace(/for\s+(?:the\s+)?2025-27\s+(?:batch|session|intake)/gi, 'for the 2027–2029 batch');

    // 3. Review 2026 / 2025 in Title or H1
    updated = updated.replace(/(Review|Fees|Cutoff|Placements)\s+202[56]/gi, '$1 2027–29');
    updated = updated.replace(/(\b(?:MBA|PGDM)\b.*?)\s+202[56](\b)/gi, '$1 2027–29$2');

    // 4. Update keywords
    const kwMatch = updated.match(/^keywords:\s*(\[.*?\])/m);
    if (kwMatch) {
      let kwStr = kwMatch[1];
      if (!kwStr.includes('2027-29') && !kwStr.includes('2027–2029')) {
        const extraKws = ' "MBA Admission 2027-29", "PGDM Admissions 2027", "Direct MBA Admission 2027", "MBA Fees & Placement 2027"';
        let newKwStr = kwStr.replace(/\]$/, `,${extraKws}]`);
        updated = updated.replace(kwMatch[0], `keywords: ${newKwStr}`);
      }
    }

    // 5. Update Fee Table Headers
    updated = updated.replace(/Total\s+Fees?\s+\(202[56][-–—]202[78]\)/gi, 'Total Fees (2027–29)');
    updated = updated.replace(/Total\s+Fees?\s+\(202[56][-–—][0-9]{2}\)/gi, 'Total Fees (2027–29)');
    updated = updated.replace(/Fees?\s+\(202[56]\)/gi, 'Fees (2027–29)');

    // 6. WhatsApp CTA
    updated = updated.replace(/MBA[\/%]PGDM\s+(?:2026|2026-2028|2026-28|2025-27)\s+Admission\s+Guidance/gi, 'MBA/PGDM 2027-2029 Admission Guidance');
  }

  // Replace all old internal links with new slug links
  slugMapping.forEach((newSlug, oldSlug) => {
    const oldLinkRegex = new RegExp(`(/blog/)${oldSlug}(\\b|/|"|'|\\))`, 'g');
    updated = updated.replace(oldLinkRegex, `$1${newSlug}$2`);
  });

  return updated;
}

const currentPostFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
let updatedPostsCount = 0;

currentPostFiles.forEach(file => {
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const isMba = isMbaPgdmPost(file, content);
  const updated = updatePostContent(content, isMba);

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf8');
    updatedPostsCount++;
  }
});

console.log(`Updated content and internal links in ${updatedPostsCount} post files.`);

// 4. Update content in colleges/
const collegeFiles = fs.readdirSync(collegesDir).filter(f => f.endsWith('.md'));
let updatedCollegesCount = 0;

collegeFiles.forEach(file => {
  const filePath = path.join(collegesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Batch replacements
  content = content.replace(/2026\s*[-–—]\s*2028/g, '2027–2029');
  content = content.replace(/2026\s*[-–—]\s*28/g, '2027–29');
  content = content.replace(/2025\s*[-–—]\s*2027/g, '2027–2029');
  content = content.replace(/2025\s*[-–—]\s*27/g, '2027–29');
  content = content.replace(/2027\s*[-–—]\s*28/g, '2027–29');

  content = content.replace(/MBA\s+admission\s+202[56]/gi, 'MBA admission 2027-29');
  content = content.replace(/PGDM\s+admission\s+202[56]/gi, 'PGDM admission 2027-29');
  content = content.replace(/Direct\s+Admission\s+202[56]/gi, 'Direct Admission 2027-29');
  content = content.replace(/Top\s+Colleges.*?202[56]/gi, (m) => m.replace(/202[56]/, '2027-29'));

  // Replace old blog links with new slugs
  slugMapping.forEach((newSlug, oldSlug) => {
    const oldLinkRegex = new RegExp(`(/blog/)${oldSlug}(\\b|/|"|'|\\))`, 'g');
    content = content.replace(oldLinkRegex, `$1${newSlug}$2`);
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCollegesCount++;
  }
});

console.log(`Updated ${updatedCollegesCount} college files in colleges/ directory.`);

// 5. Update code files in app/, components/, data/, lib/, scripts/
function walkAndReplaceLinks(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === '.git' || file === 'out' || file === 'posts' || file === 'colleges') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkAndReplaceLinks(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.json') || file.endsWith('.mjs')) {
      if (file === 'views.json' || file === 'package-lock.json') continue; // handled separately
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;

      slugMapping.forEach((newSlug, oldSlug) => {
        const oldLinkRegex = new RegExp(`(/blog/)${oldSlug}(\\b|/|"|'|\\))`, 'g');
        content = content.replace(oldLinkRegex, `$1${newSlug}$2`);
      });

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

['app', 'components', 'data', 'lib', 'scripts'].forEach(d => {
  if (fs.existsSync(path.join(process.cwd(), d))) {
    walkAndReplaceLinks(path.join(process.cwd(), d));
  }
});

console.log('Replaced all updated blog links across app/, components/, data/, lib/, and scripts/.');

// 6. Update public/_redirects
const redirectsPath = path.join(process.cwd(), 'public', '_redirects');
let existingRedirects = fs.existsSync(redirectsPath) ? fs.readFileSync(redirectsPath, 'utf8') : '';
const existingLines = new Set(existingRedirects.split('\n').map(l => l.trim()).filter(Boolean));

const newRedirectLines = [];
slugMapping.forEach((newSlug, oldSlug) => {
  if (oldSlug !== newSlug) {
    const line1 = `/blog/${oldSlug} /blog/${newSlug} 301`;
    const line2 = `/blog/${oldSlug}/ /blog/${newSlug} 301`;
    if (!existingLines.has(line1)) {
      newRedirectLines.push(line1);
      existingLines.add(line1);
    }
    if (!existingLines.has(line2)) {
      newRedirectLines.push(line2);
      existingLines.add(line2);
    }
  }
});

if (newRedirectLines.length > 0) {
  const appended = existingRedirects.endsWith('\n')
    ? existingRedirects + newRedirectLines.join('\n') + '\n'
    : existingRedirects + '\n' + newRedirectLines.join('\n') + '\n';
  fs.writeFileSync(redirectsPath, appended, 'utf8');
  console.log(`Added ${newRedirectLines.length} 301 redirects to public/_redirects!`);
}

// 7. Update data/views.json
const viewsPath = path.join(process.cwd(), 'data', 'views.json');
if (fs.existsSync(viewsPath)) {
  const views = JSON.parse(fs.readFileSync(viewsPath, 'utf8'));
  slugMapping.forEach((newSlug, oldSlug) => {
    if (views[oldSlug] !== undefined) {
      views[newSlug] = views[oldSlug];
    }
  });
  fs.writeFileSync(viewsPath, JSON.stringify(views, null, 2), 'utf8');
  console.log('Updated data/views.json with mapped view counts.');
}

console.log('--- Batch & Slug Update Completed Successfully! ---');
