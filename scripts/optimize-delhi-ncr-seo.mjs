import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'posts');

// Cities and regions
const LOCATIONS = {
  noida: ['noida', 'greater noida'],
  gurgaon: ['gurgaon', 'gurugram'],
  ghaziabad: ['ghaziabad'],
  faridabad: ['faridabad'],
  delhi: ['delhi', 'ncr', 'ggsipu', 'ipu', 'janakpuri', 'kalkaji', 'rohini', 'vips', 'fms del']
};

// Colleges/institutes index specifically in Delhi NCR
const LOCAL_COLLEGES = [
  'ggsipu', 'ipu', 'bimtech', 'bennett', 'lloyd', 'gniot', 'galgotias', 'sharda', 'jims', 
  'fore school', 'fostiima', 'meri janakpuri', 'vips', 'kiet', 'akgec', 'gl bajaj', 
  'accurate greater noida', 'gd goenka', 'bml munjal', 'great lakes gurgaon', 'imr gurgaon', 
  'jiit', 'fms delhi', 'iim rohtak', 'msi delhi', 'dtu delhi', 'sscbs', 'christ university delhi', 
  'imrt', 'akemi Pune vs riim vs isms', 'accurate group', 'jamia hamdard'
];

function detectGeoFocus(title, content, keywords, slug) {
  const text = `${title} ${(keywords || []).join(' ')} ${slug}`.toLowerCase();
  
  const hasWord = (str, word) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    return regex.test(str);
  };

  // Specific match Noida
  if (LOCATIONS.noida.some(keyword => hasWord(text, keyword)) || hasWord(text, 'bimtech') || hasWord(text, 'gniot') || hasWord(text, 'galgotias') || hasWord(text, 'sharda') || hasWord(text, 'lloyd') || hasWord(text, 'accurate') || hasWord(text, 'gl bajaj') || text.includes('amity noida')) {
    return { isDelhiNcr: true, city: 'Noida', term: 'Noida, Greater Noida, Delhi NCR' };
  }
  
  // Specific match Gurgaon
  if (LOCATIONS.gurgaon.some(keyword => hasWord(text, keyword)) || text.includes('great lakes gurgaon') || hasWord(text, 'bml munjal') || hasWord(text, 'gd goenka') || text.includes('altera institute')) {
    return { isDelhiNcr: true, city: 'Gurgaon', term: 'Gurgaon, Delhi NCR' };
  }

  // Specific match Ghaziabad
  if (LOCATIONS.ghaziabad.some(keyword => hasWord(text, keyword)) || text.includes('its ghaziabad') || text.includes('ims ghaziabad')) {
    return { isDelhiNcr: true, city: 'Ghaziabad', term: 'Ghaziabad, Delhi NCR' };
  }

  // Specific match Faridabad
  if (LOCATIONS.faridabad.some(keyword => hasWord(text, keyword))) {
    return { isDelhiNcr: true, city: 'Faridabad', term: 'Faridabad, Delhi NCR' };
  }

  // General Delhi / GGSIPU / NCR
  if (LOCATIONS.delhi.some(keyword => hasWord(text, keyword)) || LOCAL_COLLEGES.some(college => hasWord(text, college))) {
    return { isDelhiNcr: true, city: 'Delhi', term: 'Delhi NCR' };
  }

  return { isDelhiNcr: false };
}

function runGeoSeoOptimization() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error('❌ posts directory not found!');
    return;
  }

  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
  console.log(`🔍 Scanning ${files.length} blogs for Delhi NCR Geo SEO focus...`);

  let optimizedCount = 0;

  files.forEach(file => {
    const filePath = path.join(POSTS_DIR, file);
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(rawContent);
    const slug = file.replace('.md', '');

    const geo = detectGeoFocus(
      parsed.data.title || '',
      parsed.content || '',
      parsed.data.keywords || [],
      slug
    );

    if (geo.isDelhiNcr) {
      let changed = false;

      // 1. Enrich Keywords
      if (!parsed.data.keywords) {
        parsed.data.keywords = [];
      }
      
      const targetKeywords = [
        `${geo.city} Colleges`,
        `Best Colleges in ${geo.city}`,
        `${geo.city} Admissions 2026`,
        `Direct Admission in ${geo.city}`,
        'Delhi NCR Colleges',
        'Best Colleges in Delhi NCR',
        'Direct Admission Delhi NCR',
        'Delhi NCR College Counselling'
      ];

      targetKeywords.forEach(kw => {
        if (!parsed.data.keywords.includes(kw)) {
          parsed.data.keywords.push(kw);
          changed = true;
        }
      });

      // Ensure location tags are added in frontmatter if not present
      if (!parsed.data.location || parsed.data.location !== geo.city) {
        parsed.data.location = geo.city;
        changed = true;
      }

      // 2. Enrich Description for Local Context
      let desc = parsed.data.description || '';
      if (!desc || desc.trim() === '' || desc.startsWith('Discover rankings, direct admission')) {
        const locationPrefix = `Discover rankings, direct admission, fees, and placement reports for top colleges in ${geo.term}. `;
        desc = `${locationPrefix}Get details on top colleges under GGSIPU, DU, and private universities in Delhi NCR, curated by Mohit Jain.`.slice(0, 160);
        parsed.data.description = desc;
        changed = true;
      }

      if (changed) {
        const updatedFileContent = matter.stringify(parsed.content, parsed.data);
        fs.writeFileSync(filePath, updatedFileContent, 'utf8');
        optimizedCount++;
        console.log(`✅ Geo-Optimized [${geo.city}]: ${file}`);
      }
    }
  });

  console.log(`\n--- Delhi NCR Geo SEO Summary ---`);
  console.log(`Total files scanned: ${files.length}`);
  console.log(`Files geo-optimized/updated: ${optimizedCount}`);
  console.log(`---------------------------------\n`);
}

runGeoSeoOptimization();
