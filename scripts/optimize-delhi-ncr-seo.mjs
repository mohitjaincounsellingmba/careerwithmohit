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
  const text = `${title} ${content} ${(keywords || []).join(' ')} ${slug}`.toLowerCase();
  
  // Specific match Noida
  if (LOCATIONS.noida.some(keyword => text.includes(keyword)) || text.includes('bimtech') || text.includes('gniot') || text.includes('galgotias') || text.includes('sharda') || text.includes('lloyd') || text.includes('accurate') || text.includes('gl bajaj') || text.includes('amity noida')) {
    return { isDelhiNcr: true, city: 'Noida', term: 'Noida, Greater Noida, Delhi NCR' };
  }
  
  // Specific match Gurgaon
  if (LOCATIONS.gurgaon.some(keyword => text.includes(keyword)) || text.includes('great lakes gurgaon') || text.includes('bml munjal') || text.includes('gd goenka') || text.includes('altera institute')) {
    return { isDelhiNcr: true, city: 'Gurgaon', term: 'Gurgaon, Delhi NCR' };
  }

  // Specific match Ghaziabad
  if (LOCATIONS.ghaziabad.some(keyword => text.includes(keyword)) || text.includes('its ghaziabad') || text.includes('ims ghaziabad')) {
    return { isDelhiNcr: true, city: 'Ghaziabad', term: 'Ghaziabad, Delhi NCR' };
  }

  // Specific match Faridabad
  if (LOCATIONS.faridabad.some(keyword => text.includes(keyword))) {
    return { isDelhiNcr: true, city: 'Faridabad', term: 'Faridabad, Delhi NCR' };
  }

  // General Delhi / GGSIPU / NCR
  if (LOCATIONS.delhi.some(keyword => text.includes(keyword)) || LOCAL_COLLEGES.some(college => text.includes(college))) {
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
      const containsGeo = desc.toLowerCase().includes('delhi') || 
                          desc.toLowerCase().includes('noida') || 
                          desc.toLowerCase().includes('gurgaon') || 
                          desc.toLowerCase().includes('gurugram') || 
                          desc.toLowerCase().includes('ghaziabad') ||
                          desc.toLowerCase().includes('ncr');

      if (!containsGeo) {
        const collegeName = parsed.data.title || slug.replace(/-/g, ' ');
        const locationPrefix = `Discover rankings, direct admission, fees, and placement reports for top colleges in ${geo.term}. `;
        
        if (desc.trim() !== '') {
          // Prepend or adjust description
          desc = `${locationPrefix}${desc}`;
        } else {
          desc = `${locationPrefix}Get details on top colleges under GGSIPU, DU, and private universities in Delhi NCR, curated by Mohit Jain.`;
        }

        // Limit description to 160 characters for clean SEO snippet
        if (desc.length > 160) {
          desc = desc.substring(0, 157) + '...';
        }

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
