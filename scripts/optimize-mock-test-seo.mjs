import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'posts');

// Exam configuration mappings
const EXAM_TOOL_LINKS = {
  cat: { link: '/cat-mock-test', questions: '68 Questions', time: '120 Mins', name: 'CAT 2026' },
  nmat: { link: '/nmat-mock-test', questions: '108 Questions', time: '120 Mins', name: 'NMAT 2026' },
  xat: { link: '/xat-mock-test', questions: '95 Questions', time: '210 Mins', name: 'XAT 2027' },
  snap: { link: '/snap-mock-test', questions: '60 Questions', time: '60 Mins', name: 'SNAP 2026' },
  mat: { link: '/mat-mock-test', questions: '150 Questions', time: '120 Mins', name: 'MAT 2026' },
  atma: { link: '/atma-mock-test', questions: '180 Questions', time: '180 Mins', name: 'ATMA 2026' },
  gmat: { link: '/gmat-mock-test', questions: '64 Questions', time: '135 Mins', name: 'GMAT Focus' },
  ielts: { link: '/ielts-mock-test', questions: '80 Questions', time: '165 Mins', name: 'IELTS Academic' },
  duolingo: { link: '/duolingo-mock-test', questions: 'Adaptive', time: '60 Mins', name: 'Duolingo English Test' },
  jee_main: { link: '/tools/jee-main-mock-test', questions: '90 Questions', time: '180 Mins', name: 'JEE Main 2026' },
  jee_advanced: { link: '/tools/jee-advanced-mock-test', questions: '54 Questions', time: '180 Mins', name: 'JEE Advanced 2026' },
  bitsat: { link: '/tools/bitsat-mock-test', questions: '130 Questions', time: '180 Mins', name: 'BITSAT 2026' },
  neet: { link: '/tools/mock-test/neet', questions: '200 Questions', time: '200 Mins', name: 'NEET UG 2026' },
  clat: { link: '/tools/mock-test/clat', questions: '120 Questions', time: '120 Mins', name: 'CLAT 2026' },
  ssc_cgl: { link: '/tools/govt-exams-mock-test', questions: '100 Questions', time: '60 Mins', name: 'SSC CGL 2026' },
  default: { link: '/mock-tests', questions: 'Full-Length', time: 'Timed Exam', name: 'Free Mock Test' }
};

// Granular FAQs mapping
const DETAILED_FAQS = {
  afcat: [
    { question: "What is the exam pattern for AFCAT 2026?", answer: "AFCAT 2026 is an online computer-based exam consisting of 100 questions carrying 300 marks. The sections include General Awareness, Verbal Ability in English, Numerical Ability, Reasoning, and Military Aptitude." },
    { question: "Is there negative marking in the AFCAT exam?", answer: "Yes, AFCAT has a negative marking scheme. Candidates get +3 marks for each correct answer and -1 mark for each incorrect answer. Unattempted questions carry zero marks." },
    { question: "What is a good score to clear the AFCAT cutoff?", answer: "A score of 150-165 out of 300 is usually the cutoff to clear the online written exam. To ensure a place in the final merit list after SSB, a score of 180+ is highly recommended." }
  ],
  bitsat: [
    { question: "Is there a bonus section in the BITSAT exam?", answer: "Yes, if a candidate answers all 130 questions of the BITSAT exam (without skipping) and has time remaining, they can attempt 12 bonus questions (4 each in Physics, Chemistry, and Mathematics)." },
    { question: "What is a good score in BITSAT 2026?", answer: "A score above 270+ (out of 390) is generally safe for securing admission into top branches at BITS Pilani campus, whereas 240+ can fetch you branches at Goa and Hyderabad campuses." },
    { question: "Are English and Logical Reasoning important for BITSAT?", answer: "Yes, English Proficiency and Logical Reasoning account for 30 questions (90 marks) out of the total 130 questions. This section is often the differentiator for high-percentile scores." }
  ],
  cat: [
    { question: "What is the pattern of the CAT 2026 exam?", answer: "CAT 2026 is a 120-minute computer-based test with 3 sections: VARC (24 questions), DILR (20 questions), and Quantitative Ability (22 questions)." },
    { question: "Is there negative marking in CAT 2026?", answer: "Yes, there is a penalty of -1 mark for each incorrect multiple-choice question (MCQ). However, there is no negative marking for non-MCQs (TITA questions)." },
    { question: "What is a good score in CAT to get into top IIMs?", answer: "A raw score of 85+ (out of 198) is typically required to secure a 99+ percentile, which is the benchmark for getting call letters from the top 3 IIMs (A, B, C)." }
  ],
  nmat: [
    { question: "What is the pattern of NMAT 2026?", answer: "NMAT consists of 108 questions to be answered in 120 minutes. The sections are Language Skills (36 Qs, 28 mins), Quantitative Skills (36 Qs, 52 mins), and Logical Reasoning (36 Qs, 40 mins)." },
    { question: "Is there negative marking in the NMAT exam?", answer: "No, NMAT does not have negative marking. This makes it unique, allowing students to attempt all questions." },
    { question: "Which colleges accept NMAT scores?", answer: "The primary college is NMIMS (Mumbai, Bengaluru, Hyderabad). Other top colleges include SPJIMR, ISB, VIT University, and XIMB." }
  ],
  snap: [
    { question: "What is the exam pattern for SNAP 2026?", answer: "SNAP 2026 is a 60-minute speed test consisting of 60 questions across General English (15 Qs), Analytical & Logical Reasoning (25 Qs), and Quantitative & Data Sufficiency (20 Qs)." },
    { question: "Is there negative marking in SNAP 2026?", answer: "Yes, each correct answer awards +1 mark and every wrong response deducts 0.25 marks." },
    { question: "What score is needed for SIBM Pune in SNAP?", answer: "A score of 42-44+ out of 60 (98.5+ percentile) is generally needed to receive a call for GE-PI-WAT from SIBM Pune." }
  ],
  xat: [
    { question: "What is unique about the XAT exam?", answer: "XAT includes a mandatory Decision Making section and an Essay Writing component, evaluating analytical skills for leadership programs at XLRI." },
    { question: "Is there negative marking for unattempted questions in XAT?", answer: "Yes, in XAT, a minor penalty of -0.10 marks per question applies if more than 8 consecutive questions are left unattempted." },
    { question: "What is the target percentile for XLRI Jamshedpur?", answer: "For BM (Business Management), a percentile of 96+ is required for male candidates and 93+ for female candidates." }
  ],
  jee_main: [
    { question: "What is the marking scheme for JEE Main 2026?", answer: "JEE Main features +4 marks for correct answers and -1 mark for incorrect answers across both MCQs and Numerical questions." },
    { question: "How many questions must be answered in JEE Main?", answer: "Candidates answer 75 out of 90 questions (25 each in Physics, Chemistry, and Mathematics)." },
    { question: "What percentile is safe for NIT Computer Science?", answer: "A percentile of 99.5+ (200+ raw score out of 300) is required for top NIT Computer Science branches." }
  ],
  neet: [
    { question: "What is the total duration and marks for NEET UG 2026?", answer: "NEET UG is 200 minutes long (3 hrs 20 mins) carrying 720 total marks across Physics, Chemistry, Botany, and Zoology." },
    { question: "Is there negative marking in NEET?", answer: "Yes, correct answers award +4 marks and wrong answers deduct -1 mark." },
    { question: "What score is required for AIIMS Delhi?", answer: "A score of 705-715+ out of 720 (AIR under 50) is typically needed for general category admission to AIIMS Delhi." }
  ],
  fallback: [
    { question: "Are these mock tests free to attempt?", answer: "Yes, all mock tests on CareerWithMohit are 100% free with no hidden charges, registration fees, or credit card requirements." },
    { question: "Do I get a detailed scorecard after submission?", answer: "Yes, immediately upon submitting your mock test, you will receive an in-depth scorecard showing your section-wise marks, accuracy rate, and estimated percentile." },
    { question: "Can I attempt these mock tests on mobile devices?", answer: "Yes, all our online mock tests are fully responsive and optimized for mobile, tablet, and desktop practice." }
  ]
};

function mapSlugToExam(slug) {
  const s = slug.toLowerCase();
  if (s.includes('cat')) return 'cat';
  if (s.includes('nmat')) return 'nmat';
  if (s.includes('xat')) return 'xat';
  if (s.includes('snap')) return 'snap';
  if (s.includes('mat')) return 'mat';
  if (s.includes('atma')) return 'atma';
  if (s.includes('gmat')) return 'gmat';
  if (s.includes('ielts')) return 'ielts';
  if (s.includes('duolingo')) return 'duolingo';
  if (s.includes('jee-main')) return 'jee_main';
  if (s.includes('jee-advanced')) return 'jee_advanced';
  if (s.includes('bitsat')) return 'bitsat';
  if (s.includes('neet')) return 'neet';
  if (s.includes('clat')) return 'clat';
  if (s.includes('ssc-cgl')) return 'ssc_cgl';
  return 'default';
}

function optimizePosts() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md') && (f.includes('mock-test') || f.includes('mock')));
  console.log(`Found ${files.length} mock test posts to optimize for Fast SEO.`);

  let count = 0;
  const currentDate = '2026-08-22';

  files.forEach(file => {
    const filePath = path.join(POSTS_DIR, file);
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(rawContent);

    const slug = file.replace('.md', '');
    const examKey = mapSlugToExam(slug);
    const examConfig = EXAM_TOOL_LINKS[examKey] || EXAM_TOOL_LINKS.default;
    const faqs = DETAILED_FAQS[examKey] || DETAILED_FAQS.fallback;

    // 1. Refresh date tag to current 2026 date for high sitemap priority
    parsed.data.date = currentDate;

    // 2. High CTR Meta Title
    const originalTitle = parsed.data.title || '';
    if (!originalTitle.includes('2026') && !originalTitle.includes('2027')) {
      parsed.data.title = `Free ${examConfig.name} Mock Test 2026: Full CBT Practice Paper with Solutions`;
    }

    // 3. High Converting Meta Description
    if (!parsed.data.description || parsed.data.description.length < 50) {
      parsed.data.description = `Attempt 100% free full-length ${examConfig.name} 2026 CBT Mock Test online. Practice authentic questions with sectional timers, instant percentile calculation, and complete step-by-step solutions by experts.`;
    }

    // 4. Keywords
    if (!parsed.data.keywords) parsed.data.keywords = [];
    const targetKeywords = [
      `free ${examConfig.name.toLowerCase()} mock test 2026`,
      `${examConfig.name.toLowerCase()} practice paper online`,
      `${examConfig.name.toLowerCase()} score vs percentile`,
      'free mock test series 2026',
      'online exam preparation 2026'
    ];
    targetKeywords.forEach(kw => {
      if (!parsed.data.keywords.includes(kw)) {
        parsed.data.keywords.push(kw);
      }
    });

    // 5. FAQs in frontmatter
    parsed.data.faqs = faqs;

    let content = parsed.content;

    // Clean hardcoded domain URLs to relative internal links
    content = content.replace(/https:\/\/www\.careerwithmohit\.online\/tools\/cat-mock-test/g, '/cat-mock-test');
    content = content.replace(/https:\/\/www\.careerwithmohit\.online\/tools\/nmat-mock-test/g, '/nmat-mock-test');
    content = content.replace(/https:\/\/www\.careerwithmohit\.online\/tools\/mock-test\//g, '/tools/mock-test/');
    content = content.replace(/https:\/\/www\.careerwithmohit\.online\/mock-tests/g, '/mock-tests');
    content = content.replace(/\/tools\/mock-tests/g, '/mock-tests');

    // Clean old FAQ blocks to re-render cleanly
    content = content.replace(/## .*?Frequently Asked Questions.*$/is, '').trim();

    // Inject MockTestCard shortcode if not already present
    if (!content.includes('[MockTestCard')) {
      const mockCardSnippet = `\n\n[MockTestCard title="Free ${examConfig.name} Full CBT Mock Test 2026" link="${examConfig.link}" questions="${examConfig.questions}" time="${examConfig.time}"]\n\n`;
      const firstHeaderIndex = content.indexOf('\n\n');
      if (firstHeaderIndex !== -1) {
        content = content.substring(0, firstHeaderIndex) + mockCardSnippet + content.substring(firstHeaderIndex).trim();
      } else {
        content = mockCardSnippet + content;
      }
    }

    // Append standard FAQ section
    let faqMarkdown = '\n\n---\n\n## ❓ Frequently Asked Questions (FAQ)\n\n';
    faqs.forEach(faq => {
      faqMarkdown += `### ${faq.question}\n${faq.answer}\n\n`;
    });

    const boostIndex = content.indexOf('### 🚀 Boost Your Preparation');
    if (boostIndex !== -1) {
      content = content.substring(0, boostIndex).trim() + faqMarkdown + '\n---\n\n' + content.substring(boostIndex).trim();
    } else {
      content = content + faqMarkdown + '\n---\n\n### 🚀 Boost Your Preparation\n\nLooking for more test prep resources? **[Explore Our 50+ Free Online Mock Test Series](/mock-tests)** or check out **[Previous Year Question Papers](/previous-year-papers)** with step-by-step solutions.\n';
    }

    // Write back optimized file
    const newContent = matter.stringify(content, parsed.data);
    fs.writeFileSync(filePath, newContent);
    count++;
  });

  console.log(`✅ Successfully optimized ${count} mock test blog posts with 2026 dates, MockTestCards, relative links, and Quiz FAQs!`);
}

optimizePosts();
