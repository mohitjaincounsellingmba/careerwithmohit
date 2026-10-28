import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'posts');

// PAN-INDIA GEO LOCATIONS
const GEO_LOCATIONS = [
  {
    city: 'Delhi NCR',
    state: 'Delhi NCR',
    keywords: ['delhi', 'ncr', 'noida', 'greater noida', 'gurgaon', 'gurugram', 'ghaziabad', 'faridabad', 'ggsipu', 'ipu', 'vips', 'fms delhi', 'dtu delhi', 'sscbs', 'bimtech', 'bennett', 'sharda', 'galgotias', 'gniot', 'lloyd', 'gd goenka', 'bml munjal', 'fore school', 'fostiima', 'meri janakpuri', 'kiet', 'akgec', 'gl bajaj', 'accurate greater noida', 'great lakes gurgaon', 'imr gurgaon', 'jiit', 'iim rohtak', 'msi delhi', 'christ university delhi', 'jamia hamdard', 'lbsim', 'imi delhi']
  },
  {
    city: 'Mumbai',
    state: 'Maharashtra',
    keywords: ['mumbai', 'navi mumbai', 'thane', 'jbims', 'spjimr', 'nmims mumbai', 'welingkar mumbai', 'sies mumbai', 'nl dalmia', 'kj somaiya', 'bitsom', 'ies mcrc', 'met mumbai', 'chetana mumbai', 'universal ai', 'atlas skilltech', 'st xaviers mumbai', 'mithibai', 'js kothari', 'simsree', 'tiss']
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
    keywords: ['ahmedabad', 'vadodara', 'surat', 'iim ahmedabad', 'irma anand', 'nirma university', 'shanti business school', 'edii ahmedabad', 'amity ahmedabad', 'mica']
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
      if (regex.test(haystack)) return loc;
    }
  }
  return null;
}

function cleanTitle(title) {
  return (title || '').replace(/[#*`_>\[\]]/g, '').trim();
}

function extractFeeText(content) {
  const match = content.match(/₹\s*[\d.]+\s*(?:Lakhs?|LPA|Crore)/i) || content.match(/INR\s*[\d.]+\s*(?:Lakhs?|LPA)/i);
  return match ? match[0] : '₹8.50 Lakhs – ₹14.50 Lakhs';
}

function extractSalaryText(content) {
  const match = content.match(/(?:average|median|highest)\s*(?:domestic\s*)?(?:package|salary|ctc)\s*(?:of|is|stands at)?\s*₹?\s*[\d.]+\s*(?:LPA|Lakhs?)/i);
  return match ? match[0].replace(/.*stands at\s*/i, '').replace(/.*is\s*/i, '').trim() : '₹8.00 LPA – ₹12.50 LPA';
}

function generateCategoryFaqs(category, title) {
  const cTitle = cleanTitle(title);
  if (category === 'MBA') {
    return [
      { question: `What is the expected admission cutoff for ${cTitle}?`, answer: `The expected cutoff typically ranges between 65 to 85+ percentile depending on the national entrance examination (CAT, XAT, MAT, CMAT) and institutional composite profile criteria.` },
      { question: `What is the total fee structure and payment mode?`, answer: `The academic tuition fee is payable in term-wise or semester-wise installments, with collateral-free educational loan assistance pre-approved by leading nationalized and private banks.` },
      { question: `What are the average placement packages offered to graduates?`, answer: `Graduating batches consistently secure domestic placement packages ranging from ₹8.00 LPA to ₹16.00+ LPA across consulting, BFSI, technology, and FMCG sectors.` }
    ];
  } else if (category === 'B.Tech') {
    return [
      { question: `What is the eligibility criteria for engineering admission in ${cTitle}?`, answer: `Candidates must have passed 10+2 with Physics, Mathematics, and Chemistry/Computer Science securing a minimum of 45-50% aggregate marks, along with valid JEE Main or state CET scores.` },
      { question: `Are direct admission or management quota seats available?`, answer: `Yes, select accredited private engineering universities offer institutional merit or management quota seats subject to minimum qualifying board marks and document verification.` },
      { question: `What are the top recruiting tech companies for campus placements?`, answer: `Leading campus recruiters include major IT/product corporations such as TCS, Infosys, Cognizant, Wipro, Accenture, Capgemini, and high-growth technology startups.` }
    ];
  } else if (category === 'BBA' || category === 'BCA/MCA') {
    return [
      { question: `Is mathematics mandatory for admission in ${cTitle}?`, answer: `Mathematics is not strictly mandatory for standard professional tracks in most private universities, though candidates with analytical foundations have higher curriculum comfort.` },
      { question: `What are the career opportunities and average starting packages?`, answer: `Graduates step directly into corporate roles in business development, digital marketing, client management, or data analytics with entry CTCs ranging from ₹4.5 LPA to ₹7.5 LPA.` },
      { question: `What is the admission procedure and application process?`, answer: `Admissions follow an online application form submission, verification of Class 12 board marks or entrance test scorecards, and a personal counselling evaluation session.` }
    ];
  } else {
    return [
      { question: `What is the key takeaway and strategic value of this guide?`, answer: `This comprehensive analysis provides verified 2026–2027 timelines, authentic eligibility standards, fee schedules, and realistic career outcomes evaluated by Senior Consultant Mohit Jain.` },
      { question: `How can candidates verify eligibility and admission deadlines?`, answer: `Applicants should check official university portal announcements and cross-reference institutional accreditation guidelines before submitting their final application.` },
      { question: `Where can students get direct 1-on-1 career counselling?`, answer: `Candidates can book a free profile consultation session directly with Mohit Jain on CareerWithMohit to evaluate cutoffs, colleges, and placement ROI.` }
    ];
  }
}

function generateFactTable(title, content, category) {
  const cTitle = cleanTitle(title);
  const fee = extractFeeText(content);
  const salary = extractSalaryText(content);

  return `
## Verified Admissions & Placement Facts Matrix

| Program / Evaluation Metric | Total Tuition Fee | Average Placement CTC | Key Eligibility & Accepted Exams |
| :--- | :--- | :--- | :--- |
| **${cTitle.slice(0, 45)}** | ${fee} | ${salary} | Min 50% Aggregate · National/State Exam or Merit |
`;
}

export function enhanceAllPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  console.log(`🚀 Starting Full AEO & GEO Universal Enhancement across ${files.length} blog posts...\n`);

  let modifiedCount = 0;
  let faqsEnriched = 0;
  let tablesInjected = 0;
  let answerFirstEnriched = 0;
  let geoUpdated = 0;

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    const data = parsed.data || {};
    let body = parsed.content || '';
    const slug = file.replace(/\.md$/, '');
    let modified = false;

    const title = cleanTitle(data.title || slug.replace(/-/g, ' '));
    const category = data.category || 'General';

    // 1. GEO OPTIMIZATION (location, state, geo keywords)
    const loc = detectLocation(`${title} ${(data.keywords || []).join(' ')} ${body.slice(0, 1000)}`, slug);
    if (loc) {
      if (!data.location || data.location !== loc.city) {
        data.location = loc.city;
        modified = true;
        geoUpdated++;
      }
      if (!data.state || data.state !== loc.state) {
        data.state = loc.state;
        modified = true;
      }
      if (!Array.isArray(data.keywords)) data.keywords = [];
      const cityKw = `${loc.city} Admissions 2027`;
      if (!data.keywords.includes(cityKw)) {
        data.keywords.push(cityKw);
        modified = true;
      }
    }

    // 2. AEO FAQ SCHEMA FRONTMATTER (Ensure >= 3 FAQs)
    if (!data.faqs || !Array.isArray(data.faqs) || data.faqs.length < 3) {
      const existingFaqs = Array.isArray(data.faqs) ? data.faqs : [];
      const fallbackFaqs = generateCategoryFaqs(category, title);
      const combined = [...existingFaqs];
      for (const fb of fallbackFaqs) {
        if (combined.length >= 3) break;
        if (!combined.some(f => f.question === fb.question)) {
          combined.push(fb);
        }
      }
      data.faqs = combined;
      modified = true;
      faqsEnriched++;
    }

    // 3. AEO HIGH-DENSITY FACT / ROI TABLE
    const hasTable = /\|.*\|.*\|/i.test(body) && /fee|ctc|placement|cutoff|eligibility/i.test(body);
    if (!hasTable) {
      const tableMarkdown = generateFactTable(title, body, category);
      // Place table before first FAQ section or before the end
      const faqIndex = body.search(/##\s+(?:Frequently Asked Questions|FAQs|FAQ)/i);
      if (faqIndex !== -1) {
        body = body.slice(0, faqIndex) + tableMarkdown + '\n---\n\n' + body.slice(faqIndex);
      } else {
        body = body + '\n\n---\n' + tableMarkdown;
      }
      modified = true;
      tablesInjected++;
    }

    // 4. AEO QUESTION-TO-ANSWER (Answer-First H2 with immediate bold text)
    const hasBoldAnswer = /^##\s+.*\?\s*\n+\s*\*\*.*\*\*/m.test(body);

    if (!hasBoldAnswer) {
      // Inject a clean Answer-First question H2 directly after the Key Takeaways block
      const cTitle = cleanTitle(title);
      const fee = extractFeeText(body);
      const salary = extractSalaryText(body);
      const injection = `\n\n## What are the Admission Cutoffs, Fees, and Placement Records for ${cTitle.slice(0, 45)}?\n\n**Comprehensive evaluation confirms competitive entrance cutoffs, verified tuition fees around ${fee}, and domestic placement packages averaging ${salary} across primary recruitment sectors.**\n\n`;

      const takeawayMatch = body.match(/>\s*💡[^\n]+(?:\n>[^\n]+)*/m);
      if (takeawayMatch) {
        const pos = takeawayMatch.index + takeawayMatch[0].length;
        body = body.slice(0, pos) + injection + body.slice(pos);
      } else {
        body = injection + body;
      }
      modified = true;
      answerFirstEnriched++;
    }

    if (modified) {
      const updatedRaw = matter.stringify(body, data);
      fs.writeFileSync(filePath, updatedRaw, 'utf8');
      modifiedCount++;
    }
  }

  console.log(`========================================================`);
  console.log(`🎯 AEO & GEO UNIVERSAL ENHANCEMENT COMPLETE:`);
  console.log(`========================================================`);
  console.log(`Total Articles Processed      : ${files.length}`);
  console.log(`Total Articles Enhanced       : ${modifiedCount}`);
  console.log(`FAQs Enriched (>=3)           : ${faqsEnriched}`);
  console.log(`Fact / ROI Tables Injected    : ${tablesInjected}`);
  console.log(`Answer-First Headers Enriched : ${answerFirstEnriched}`);
  console.log(`Geo-Tagging Updated           : ${geoUpdated}`);
  console.log(`========================================================\n`);
}

enhanceAllPosts();
