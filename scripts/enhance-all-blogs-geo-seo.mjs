import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'posts');

function cleanText(text) {
  if (!text) return '';
  return text.replace(/[#*`_>\[\]]/g, '').replace(/\s+/g, ' ').trim();
}

function inferCategory(data, slug, content) {
  const current = (data.category || '').toLowerCase();
  const text = `${slug} ${data.title || ''} ${(data.keywords || []).join(' ')} ${content.slice(0, 1000)}`.toLowerCase();

  if (current.includes('mbbs') || current.includes('medical') || text.includes('mbbs') || text.includes('neet ug') || text.includes('medical college')) return 'Medical/MBBS';
  if (current.includes('online') || text.includes('online mba') || text.includes('online degree') || text.includes('ugc-deb') || text.includes('distance education')) return 'Online Degrees';
  if (current.includes('abroad') || text.includes('study abroad') || text.includes('ielts') || text.includes('duolingo') || text.includes('gmat focus') || text.includes('toefl')) return 'Study Abroad';
  if (current.includes('btech') || current.includes('b.tech') || current.includes('engineering') || text.includes('btech') || text.includes('b.tech') || text.includes('jee main') || text.includes('engineering college')) return 'B.Tech';
  if (current.includes('bba') || text.includes('bba') || text.includes('bms admission') || text.includes('cuet bba')) return 'BBA';
  if (current.includes('bca') || current.includes('mca') || text.includes('bca ') || text.includes('mca admission')) return 'BCA/MCA';
  if (current.includes('law') || current.includes('llb') || text.includes('clat') || text.includes('llb') || text.includes('nlu ')) return 'Law';
  if (current.includes('exam') || text.includes('mock test') || text.includes('cat 2026') || text.includes('xat 2027') || text.includes('nmat 2026') || text.includes('snap 2026') || text.includes('cmat') || text.includes('mat exam') || text.includes('atma exam') || text.includes('score vs percentile')) return 'Exams';
  if (current.includes('job') || current.includes('career') || current.includes('hiring') || text.includes('hiring') || text.includes('salary package') || text.includes('internship') || text.includes('resume') || text.includes('stipend')) return 'Jobs & Careers';
  if (current.includes('certif') || text.includes('certification') || text.includes('excel') || text.includes('python') || text.includes('digital marketing')) return 'Certifications & Skills';
  if (current.includes('mba') || current.includes('pgdm') || text.includes('mba') || text.includes('pgdm') || text.includes('b-school') || text.includes('iim ')) return 'MBA';

  return 'Career Advisory';
}

function generateTakeawayBlock(data, category, content) {
  const title = cleanText(data.title);
  const desc = cleanText(data.description || content.slice(0, 200));

  // Extract fee if mentioned
  const feeMatch = content.match(/₹\s*[\d.]+\s*(?:Lakhs?|LPA|k|Crore)/i) || content.match(/INR\s*[\d.]+\s*(?:Lakhs?|LPA)/i);
  const feeText = feeMatch ? feeMatch[0] : null;

  // Extract salary/package if mentioned
  const salaryMatch = content.match(/(?:average|highest|median)\s*(?:package|salary|ctc)\s*(?:of|is|stands at)?\s*₹?\s*[\d.]+\s*(?:LPA|Lakhs?)/i);
  const salaryText = salaryMatch ? salaryMatch[0] : null;

  let line1 = `**Strategic Focus & Core Value**: ${desc.slice(0, 110)}...`;
  let line2 = `**Target Audience & Eligibility**: Ideal for aspiring candidates aiming for 2026–2027 admissions, entrance test readiness, and corporate career acceleration.`;
  let line3 = `**Expert Verdict & ROI**: Evaluated by Mohit Jain (IIM-B & FMS Delhi certified mentor) for transparent fee-to-placement value and proven career roadmap outcomes.`;

  if (category === 'MBA') {
    line1 = `**2027 Admission & Program Focus**: Comprehensive review covering curriculum, accreditations (AICTE/UGC/AIU), and selection criteria.`;
    line2 = feeText || salaryText
      ? `**Fee & Placement Benchmarks**: ${[feeText ? `Estimated fee: ${feeText}` : '', salaryText ? `Audited placement: ${salaryText}` : ''].filter(Boolean).join(' | ')}.`
      : `**Fee & Placement ROI**: Evaluated against median domestic CTC benchmarks and industry recruitment trends.`;
    line3 = `**Eligibility & Selection**: Valid score in CAT/XAT/NMAT/SNAP/MAT/CMAT or institutional GD-PI profile evaluation.`;
  } else if (category === 'B.Tech') {
    line1 = `**Engineering Program Focus**: Core engineering branches (CSE, AI/ML, Data Science, ECE) curriculum and laboratory infrastructure audit.`;
    line2 = `**Admission Pathways**: Merit-based counselling via JEE Main, state CETs, or direct institutional quota seats.`;
    line3 = `**Industry Placements**: Top tech recruiters, coding culture, and highest vs. median placement salary trends.`;
  } else if (category === 'BBA' || category === 'BCA/MCA') {
    line1 = `**Undergraduate Professional Roadmap**: Early career foundation, practical project work, and skill certification alignment.`;
    line2 = `**Eligibility Criteria**: Minimum 50% in 10+2 (CBSE/ISC/State Board) with entrance tests (CUET/IPU CET/NPAT) or direct merit.`;
    line3 = `**Career & Higher Study Pathways**: Direct corporate campus placements or foundation for top-tier MBA/MCA programs.`;
  } else if (category === 'Online Degrees') {
    line1 = `**UGC-DEB Recognition**: 100% legally valid online degree equivalent to regular campus degree under UGC regulations 2020.`;
    line2 = `**Flexibility & LMS**: AI-enabled interactive LMS, recorded lectures, live weekend doubt sessions, and proctored online exams.`;
    line3 = `**Corporate & Govt Eligibility**: Eligible for UPSC, SSC, banking exams, top MNC corporate promotions, and global WES credential evaluation.`;
  } else if (category === 'Exams') {
    line1 = `**Exam Strategy & Pattern**: Verified section-wise weightage, syllabus breakdown, scoring blueprint, and difficulty analysis.`;
    line2 = `**Target Score & Percentile**: Score vs percentile matrix, safe sectional cutoffs for premier institutes, and negative marking strategy.`;
    line3 = `**Free Mock Test Practice**: Attempt full-length timed CBT mock tests on CareerWithMohit to boost test-taking speed and accuracy.`;
  } else if (category === 'Jobs & Careers' || category === 'Certifications & Skills') {
    line1 = `**High-Impact Skillset**: Practical competencies, industry-standard tools, and verified project experience in high demand.`;
    line2 = `**Hiring & Stipend Trends**: Verified recruiter hiring criteria, interview rounds, and competitive entry-level packages.`;
    line3 = `**Career Acceleration**: Direct applicability to resumes, ATS score enhancement, and 1-on-1 career guidance.`;
  } else if (category === 'Medical/MBBS' || category === 'Study Abroad') {
    line1 = `**Global & National Recognition**: NMC/WHO/UGC recognized universities with clinical training and modern campus facilities.`;
    line2 = `**Admission & Visa Process**: Step-by-step documentation, eligibility scores (NEET/IELTS/DET), and transparent fee schedules.`;
    line3 = `**Licensing & Career Opportunities**: Preparation pathways for NEXT/FMGE and international residency or practice licenses.`;
  }

  return `> 💡 **Key Takeaways (Direct AI Answer Summary)**
> - ${line1}
> - ${line2}
> - ${line3}`;
}

function processAllPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  console.log(`Starting comprehensive enhancement of ${files.length} blog posts...`);

  let updatedCount = 0;
  let fixedTitlesCount = 0;
  let categoryUpdatedCount = 0;
  let takeawaysInjectedCount = 0;

  files.forEach(file => {
    const filePath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    const data = parsed.data || {};
    let content = parsed.content || '';
    const slug = file.replace('.md', '');
    let modified = false;

    // 1. Fix Short / Broken Titles
    if (file === 'why-never-join-isms-pune-honest-review-2026.md' && data.title === 'ISMS PUNE REVIEW') {
      data.title = 'ISMS Pune PGDM Review 2027: Fees, Cutoff, Placements & Honest Reality Check';
      modified = true;
      fixedTitlesCount++;
    } else if (file === 'why-never-join-xime-kochi-honest-review-2026.md' && data.title === 'XIME KOCHI REVIEW') {
      data.title = 'XIME Kochi PGDM Review 2027: Fees, Cutoff, Placements & Honest Reality Check';
      modified = true;
      fixedTitlesCount++;
    }

    // 2. Standardize Category
    const newCategory = inferCategory(data, slug, content);
    if (!data.category || data.category !== newCategory) {
      data.category = newCategory;
      modified = true;
      categoryUpdatedCount++;
    }

    // 3. Ensure Year Modifiers in Description
    if (data.description) {
      if (!data.description.includes('2026') && !data.description.includes('2027') && !data.description.includes('2025')) {
        data.description = `${data.description.replace(/\.$/, '')} for 2026-2027 admissions & career guidance.`;
        modified = true;
      }
    }

    // 4. Inject Key Takeaways if missing
    const hasTakeaways = content.includes('Key Takeaways') || content.includes('Direct AI Answer Summary') || content.includes('💡');
    if (!hasTakeaways) {
      const takeawayBlock = generateTakeawayBlock(data, newCategory, content);
      
      // Insert after H1 title if present, otherwise at the start of content
      const h1Match = content.match(/^#\s+[^\n]+\n+/m);
      if (h1Match) {
        const index = h1Match.index + h1Match[0].length;
        content = content.slice(0, index) + takeawayBlock + '\n\n' + content.slice(index);
      } else {
        content = takeawayBlock + '\n\n' + content;
      }
      modified = true;
      takeawaysInjectedCount++;
    }

    if (modified) {
      const updatedMarkdown = matter.stringify(content, data);
      fs.writeFileSync(filePath, updatedMarkdown, 'utf8');
      updatedCount++;
    }
  });

  console.log(`\n========================================================`);
  console.log(`🎉 ENHANCEMENT COMPLETE:`);
  console.log(`Total Posts Processed: ${files.length}`);
  console.log(`Total Posts Modified: ${updatedCount}`);
  console.log(`Titles Fixed: ${fixedTitlesCount}`);
  console.log(`Categories Updated/Standardized: ${categoryUpdatedCount}`);
  console.log(`GEO Key Takeaways Injected: ${takeawaysInjectedCount}`);
  console.log(`========================================================\n`);
}

processAllPosts();
