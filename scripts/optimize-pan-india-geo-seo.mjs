import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'posts');
const COLLEGES_DIR = path.join(process.cwd(), 'colleges');

// Comprehensive Pan-India Geo Locations Mapping
const GEO_LOCATIONS = [
  {
    city: 'Delhi NCR',
    state: 'Delhi NCR',
    keywords: ['delhi', 'ncr', 'noida', 'greater noida', 'gurgaon', 'gurugram', 'ghaziabad', 'faridabad', 'ggsipu', 'ipu', 'vips', 'fms delhi', 'dtu delhi', 'sscbs', 'bimtech', 'bennett', 'sharda', 'galgotias', 'gniot', 'lloyd', 'gd goenka', 'bml munjal', 'fore school', 'fostiima', 'meri janakpuri', 'kiet', 'akgec', 'gl bajaj', 'accurate greater noida', 'great lakes gurgaon', 'imr gurgaon', 'jiit', 'iim rohtak', 'msi delhi', 'christ university delhi', 'jamia hamdard']
  },
  {
    city: 'Mumbai',
    state: 'Maharashtra',
    keywords: ['mumbai', 'navi mumbai', 'thane', 'jbims', 'spjimr', 'nmims mumbai', 'welingkar mumbai', 'sies mumbai', 'nl dalmia', 'kj somaiya', 'bitsom', 'ies mcrc', 'met mumbai', 'chetana mumbai', 'universal ai', 'atlas skilltech', 'st xaviers mumbai', 'mithibai', 'js kothari', 'simsree']
  },
  {
    city: 'Pune',
    state: 'Maharashtra',
    keywords: ['pune', 'sibm pune', 'scmhrd', 'pumba', 'iiebm', 'riim pune', 'akemi pune', 'isms pune', 'kirloskar pune', 'lexicon mile', 'surya datta', 'dy patil pune', 'mit wpu', 'flame university', 'balaji pune', 'bschool pune', 'pibm pune']
  },
  {
    city: 'Bangalore',
    state: 'Karnataka',
    keywords: ['bangalore', 'bengaluru', 'iim bangalore', 'christ university bangalore', 'sibm bangalore', 'jagsom bangalore', 'xime bangalore', 'gibs bangalore', 'isme bangalore', 'isbr bangalore', 'alliance university', 'pes university', 'rvim', 'msrim', 'acharya bangalore', 'presidency university bangalore', 'jain university', 'kristu jayanti', 'mount carmel']
  },
  {
    city: 'Hyderabad',
    state: 'Telangana',
    keywords: ['hyderabad', 'secunderabad', 'isb hyderabad', 'ipe hyderabad', 'siva sivani', 'vishwa vishwani', 'imt hyderabad', 'woxsen university', 'icfai hyderabad', 'gitam hyderabad', 'badruka school', 'anurag university']
  },
  {
    city: 'Chennai',
    state: 'Tamil Nadu',
    keywords: ['chennai', 'coimbatore', 'great lakes chennai', 'doms iit madras', 'loyola chennai', 'mcc chennai', 'srm university', 'vit chennai', 'crescent school', 'rajalakshmi', 'thiagarajar', 'tsm madurai', 'amrita coimbatore']
  },
  {
    city: 'Kolkata',
    state: 'West Bengal',
    keywords: ['kolkata', 'iim calcutta', 'imi kolkata', 'globsyn', 'biibs', 'eiilm', 'iem kolkata', 'heritage business school', 'praxis kolkata', 'nshm kolkata', 'iq city uwsb', 'jis university']
  },
  {
    city: 'Jaipur',
    state: 'Rajasthan',
    keywords: ['jaipur', 'kota', 'udaipur', 'mnit jaipur', 'jaipuria jaipur', 'tapmi jaipur', 'fms irm jaipur', 'apex jaipur', 'poddar jaipur', 'poornima jaipur', 'jecrc jaipur', 'manipal jaipur', 'iihmr jaipur']
  },
  {
    city: 'Dehradun',
    state: 'Uttarakhand',
    keywords: ['dehradun', 'roorkee', 'upes dehradun', 'doon business school', 'graphic era', 'uttaranchal university', 'quantum roorkee', 'rit roorkee']
  },
  {
    city: 'Ahmedabad',
    state: 'Gujarat',
    keywords: ['ahmedabad', 'vadodara', 'surat', 'iim ahmedabad', 'irma anand', 'nirma university', 'shanti business school', 'edii ahmedabad', 'amity ahmedabad']
  },
  {
    city: 'Chandigarh',
    state: 'Punjab',
    keywords: ['chandigarh', 'mohali', 'ludhiana', 'isb mohali', 'ubc chandigarh', 'chitkara university', 'lpu', 'lovely professional university', 'thapar university']
  }
];

function detectLocation(text, slug) {
  const haystack = `${text} ${slug}`.toLowerCase();
  
  for (const loc of GEO_LOCATIONS) {
    for (const kw of loc.keywords) {
      const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(haystack)) {
        return loc;
      }
    }
  }
  return null;
}

function processDirectory(dirPath, isCollege = false) {
  if (!fs.existsSync(dirPath)) return 0;
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
  let updatedCount = 0;

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    const slug = file.replace('.md', '');
    
    const title = parsed.data.title || parsed.data.seo_title || '';
    const keywords = parsed.data.keywords || [];
    const content = parsed.content || '';
    
    const loc = detectLocation(`${title} ${keywords.join(' ')} ${content.slice(0, 1000)}`, slug);
    
    if (loc) {
      let changed = false;
      
      // Update location & state tags
      if (!parsed.data.location || parsed.data.location !== loc.city) {
        parsed.data.location = loc.city;
        changed = true;
      }
      if (!parsed.data.state || parsed.data.state !== loc.state) {
        parsed.data.state = loc.state;
        changed = true;
      }
      
      // Enrich keywords array
      if (!Array.isArray(parsed.data.keywords)) {
        parsed.data.keywords = [];
      }
      
      const geoKeywords = [
        `${loc.city} Colleges`,
        `Best Colleges in ${loc.city}`,
        `Top Colleges in ${loc.city} 2026`,
        `${loc.city} Direct Admission 2026`,
        `Colleges in ${loc.state}`,
        `${loc.city} Career Counselling`
      ];
      
      geoKeywords.forEach(kw => {
        if (!parsed.data.keywords.includes(kw)) {
          parsed.data.keywords.push(kw);
          changed = true;
        }
      });
      
      // Enrich meta description with regional GEO context if needed
      let desc = parsed.data.description || parsed.data.seo_description || '';
      if (!desc || desc.length < 50) {
        desc = `Comprehensive guide to top colleges in ${loc.city}, ${loc.state}. Check fees, cutoffs, placements, NIRF ranking & direct admission options for 2026.`;
        parsed.data.description = desc;
        changed = true;
      }
      
      if (changed) {
        const updatedContent = matter.stringify(parsed.content, parsed.data);
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        updatedCount++;
      }
    }
  });

  return updatedCount;
}

console.log('======================================================');
console.log('🚀 Starting Pan-India GEO SEO Optimization Engine...');
console.log('======================================================\n');

const updatedBlogs = processDirectory(POSTS_DIR, false);
console.log(`✅ Geo-Optimized ${updatedBlogs} blog posts across major Indian educational hubs.`);

const updatedColleges = processDirectory(COLLEGES_DIR, true);
console.log(`✅ Geo-Optimized ${updatedColleges} college review files across major Indian educational hubs.`);

console.log('\n✨ Pan-India GEO SEO Optimization complete!');
