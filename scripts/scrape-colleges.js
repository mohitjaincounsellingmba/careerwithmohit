#!/usr/bin/env node

/**
 * ============================================================
 * scrape-colleges.js — CareerWithMohit College Data Pipeline
 * ============================================================
 *
 * WHAT IT DOES:
 *  1. Reads college-seed-data.json (curated data: fees, placements, exams)
 *  2. Optionally fetches live NIRF ranking data from nirf.ac.in (govt open data)
 *  3. Generates/updates .md files in the /colleges/ directory
 *     matching your existing frontmatter format
 *
 * USAGE:
 *   node scripts/scrape-colleges.js              → from seed data only (safe, fast)
 *   node scripts/scrape-colleges.js --nirf       → also fetch live NIRF rankings
 *   node scripts/scrape-colleges.js --update     → update existing files too
 *   node scripts/scrape-colleges.js --slug iit-delhi  → only process one college
 *
 * ============================================================
 */

const fs   = require('fs');
const path = require('path');

// ─── Config ───────────────────────────────────────────────
const COLLEGES_DIR  = path.join(__dirname, '..', 'colleges');
const SEED_FILE     = path.join(__dirname, 'college-seed-data.json');
const NIRF_API_URL  = 'https://www.nirfindia.org/Home/DownloadRanking'; // NIRF public endpoint

// Parse CLI flags
const args       = process.argv.slice(2);
const FETCH_NIRF = args.includes('--nirf');
const UPDATE_ALL = args.includes('--update');
const SLUG_ONLY  = args.includes('--slug') ? args[args.indexOf('--slug') + 1] : null;

// ─── Colours for terminal output ─────────────────────────
const c = {
  green:  (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red:    (s) => `\x1b[31m${s}\x1b[0m`,
  cyan:   (s) => `\x1b[36m${s}\x1b[0m`,
  bold:   (s) => `\x1b[1m${s}\x1b[0m`,
  dim:    (s) => `\x1b[2m${s}\x1b[0m`,
};

// ─── Helpers ──────────────────────────────────────────────

/** Convert a college name to a URL-friendly slug */
function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[()&]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Wrap an array in YAML block sequence format */
function yamlArray(arr) {
  if (!arr || arr.length === 0) return '[]';
  return '[' + arr.map(v => `"${v}"`).join(', ') + ']';
}

/** Build markdown content from a college object */
function buildMarkdown(college) {
  const name             = college.name;
  const slug             = college.slug || toSlug(name);
  const location         = college.location         || 'India';
  const category         = college.category         || 'Engineering';
  const type             = college.type             || 'Institute';
  const courses          = college.courses          || [];
  const established      = college.established      || 0;
  const ownership        = college.ownership        || 'Private';
  const ranking          = college.ranking          || 'Top Ranked';
  const fees             = college.fees             || 'TBA';
  const avg_placement    = college.avg_placement    || 'Not Disclosed';
  const highest          = college.highest_placement || 'Not Disclosed';
  const lowest           = college.lowest_placement  || 'Not Disclosed';
  const exams            = college.exams            || [];
  const website          = college.website          || '';
  const brochure_url     = college.brochure_url     || '';
  const about            = college.about            || `${name} is a leading institution offering quality education in ${category}.`;
  const placement_detail = college.placement_detail || 'Placement data not available.';
  const admission        = college.admission        || 'Contact admissions office for details.';
  const cutoff           = college.cutoff           || 'Not Disclosed';
  const courses_detail   = college.courses_detail   || [];

  // Build courses & fees section
  const coursesSection = courses_detail.length > 0
    ? courses_detail.map(c => `- **${c.name}**: ${c.specialization || ''} | ${c.duration} | ${c.fee}`).join('\n')
    : `- **${courses.join(', ')}**: Fee: ${fees}`;

  const logoPath = `/colleges/${slug}-logo.webp`;

  return `---
name: "${name.replace(/"/g, '\\"')}"
logo: "${logoPath}"
location: "${location}"
category: "${category}"
type: "${type}"
courses: ${yamlArray(courses)}
established: ${established}
ownership: "${ownership}"
ranking: "${ranking}"
fees: "${fees}"
avg_placement: "${avg_placement}"
highest_placement: "${highest}"
lowest_placement: "${lowest}"
exams: ${yamlArray(exams)}
brochure_url: "${brochure_url}"
website: "${website}"
---

### About ${name}
${about}

### Courses & Fees
${coursesSection}

### Placements
${placement_detail}
- **Average Package**: ${avg_placement}
- **Highest Package**: ${highest}

### Admission & Cutoff
${admission}
- **Cutoff**: ${cutoff}
`;
}

// ─── NIRF Scraper (optional) ──────────────────────────────

/**
 * Fetches and parses NIRF ranking data.
 * NIRF provides open downloadable CSV data, so no scraping needed.
 * Returns a Map: college name → { rank, score }
 */
async function fetchNIRFRankings() {
  console.log(c.cyan('\n📡 Fetching NIRF rankings…'));

  const nirfCategories = [
    { label: 'Management', url: 'https://www.nirfindia.org/2024/ManagementRanking.html' },
    { label: 'Engineering', url: 'https://www.nirfindia.org/2024/EngineeringRanking.html' },
    { label: 'University',  url: 'https://www.nirfindia.org/2024/UniversityRanking.html' },
  ];

  const rankings = new Map();

  for (const cat of nirfCategories) {
    try {
      const res = await fetch(cat.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html',
        }
      });

      if (!res.ok) {
        console.log(c.yellow(`  ⚠  Could not fetch NIRF ${cat.label}: HTTP ${res.status}`));
        continue;
      }

      const html = await res.text();

      // Parse ranking table rows — NIRF uses <tr> rows with rank and name
      const rowRegex = /<tr[^>]*>[\s\S]*?<\/tr>/gi;
      const rows = html.match(rowRegex) || [];

      let rankNum = 0;
      for (const row of rows) {
        // Extract rank number
        const rankMatch = row.match(/<td[^>]*>\s*(\d+)\s*<\/td>/);
        // Extract institute name (typically in a link)
        const nameMatch = row.match(/title="([^"]+)"|<a[^>]*>([^<]+)<\/a>/);

        if (rankMatch && nameMatch) {
          rankNum++;
          const rank  = rankMatch[1];
          const iname = (nameMatch[1] || nameMatch[2] || '').trim();
          if (iname) {
            rankings.set(iname.toLowerCase(), {
              rank: parseInt(rank),
              category: cat.label,
            });
          }
        }
      }

      console.log(c.green(`  ✓ Parsed NIRF ${cat.label}: ${rankNum} entries`));
      // Polite delay between requests
      await new Promise(r => setTimeout(r, 1500));

    } catch (err) {
      console.log(c.yellow(`  ⚠  NIRF ${cat.label} fetch failed: ${err.message}`));
    }
  }

  console.log(c.green(`  📊 Total NIRF entries loaded: ${rankings.size}`));
  return rankings;
}

/** Try to match a college to NIRF data by fuzzy name match */
function matchNIRF(college, nirfMap) {
  if (!nirfMap || nirfMap.size === 0) return null;

  const slug = college.slug || toSlug(college.name);
  const nameLower = college.name.toLowerCase();

  // Direct lookup
  if (nirfMap.has(nameLower)) return nirfMap.get(nameLower);

  // Partial match — try first 3 significant words
  const words = nameLower.split(/\s+/).filter(w => w.length > 3).slice(0, 3);
  for (const [key, val] of nirfMap) {
    if (words.every(w => key.includes(w))) return val;
  }

  return null;
}

// ─── Main ─────────────────────────────────────────────────

async function main() {
  console.log(c.bold('\n🎓 CareerWithMohit — College Data Pipeline\n'));
  console.log(c.dim(`  Mode: ${UPDATE_ALL ? 'Update all' : 'Skip existing'} | NIRF: ${FETCH_NIRF ? 'Enabled' : 'Disabled'}`));
  if (SLUG_ONLY) console.log(c.dim(`  Filter: Only processing "${SLUG_ONLY}"`));
  console.log('');

  // 1. Load seed data
  if (!fs.existsSync(SEED_FILE)) {
    console.error(c.red(`✗ Seed file not found: ${SEED_FILE}`));
    process.exit(1);
  }

  let colleges;
  try {
    colleges = JSON.parse(fs.readFileSync(SEED_FILE, 'utf8'));
    console.log(c.green(`✓ Loaded ${colleges.length} colleges from seed data`));
  } catch (e) {
    console.error(c.red(`✗ Failed to parse seed data: ${e.message}`));
    process.exit(1);
  }

  // 2. Optionally fetch NIRF rankings
  let nirfMap = null;
  if (FETCH_NIRF) {
    nirfMap = await fetchNIRFRankings();
  }

  // 3. Ensure colleges directory exists
  if (!fs.existsSync(COLLEGES_DIR)) {
    fs.mkdirSync(COLLEGES_DIR, { recursive: true });
    console.log(c.green(`✓ Created directory: colleges/`));
  }

  // 4. Process each college
  let created = 0, updated = 0, skipped = 0, errors = 0;

  for (const college of colleges) {
    try {
      const slug = college.slug || toSlug(college.name);

      // Apply slug filter if provided
      if (SLUG_ONLY && slug !== SLUG_ONLY) continue;

      const filePath = path.join(COLLEGES_DIR, `${slug}.md`);
      const exists   = fs.existsSync(filePath);

      // Skip existing unless --update flag is set
      if (exists && !UPDATE_ALL) {
        skipped++;
        console.log(c.dim(`  – skip  ${slug}.md (already exists)`));
        continue;
      }

      // Enrich with NIRF data if available
      if (nirfMap) {
        const nirfData = matchNIRF(college, nirfMap);
        if (nirfData && !college.ranking.includes('NIRF')) {
          college.ranking = `#${nirfData.rank} (NIRF ${nirfData.category} 2024)`;
          console.log(c.cyan(`  ↑ NIRF enriched: ${college.name} → ${college.ranking}`));
        }
      }

      // Build and write markdown
      const content = buildMarkdown(college);
      fs.writeFileSync(filePath, content, 'utf8');

      if (exists) {
        updated++;
        console.log(c.yellow(`  ↻ update ${slug}.md`));
      } else {
        created++;
        console.log(c.green(`  + create ${slug}.md`));
      }

    } catch (err) {
      errors++;
      console.error(c.red(`  ✗ Error: ${college.name}: ${err.message}`));
    }
  }

  // 5. Summary
  console.log(c.bold(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✅ Done!
  Created : ${c.green(created)}
  Updated : ${c.yellow(updated)}
  Skipped : ${c.dim(skipped)}
  Errors  : ${errors > 0 ? c.red(errors) : errors}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`));

  if (created + updated === 0 && skipped > 0) {
    console.log(c.yellow('\n  Tip: All files already exist. Run with --update to overwrite them.'));
  }

  console.log(c.dim(`\n  Colleges directory: ${COLLEGES_DIR}\n`));
}

main().catch(err => {
  console.error(c.red(`\n✗ Fatal error: ${err.message}`));
  process.exit(1);
});
