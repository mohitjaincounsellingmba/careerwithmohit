import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'posts');

// Helper: inferCategory matching lib/markdown.ts
function inferCategory(data, slug) {
  if (data.category && data.category.trim() !== '') {
    const rawCategory = data.category.toLowerCase();
    if (rawCategory.includes('mba') || rawCategory.includes('pgdm')) return 'MBA';
    if (rawCategory.includes('bba')) return 'BBA';
    if (rawCategory.includes('btech') || rawCategory.includes('b.tech')) return 'B.Tech';
    if (rawCategory.includes('job') || rawCategory.includes('career')) return 'Jobs & Careers';
    if (rawCategory.includes('exam')) return 'Exams';
    if (rawCategory.includes('online')) return 'Online Degrees';
    return data.category;
  }

  const textToSearch = `${slug} ${data.title || ''} ${(data.keywords || []).join(' ')}`.toLowerCase();
  
  if (textToSearch.includes('hiring') || textToSearch.includes('job') || textToSearch.includes('salary') || textToSearch.includes('recruit')) return 'Jobs & Careers';
  if (textToSearch.includes('mba') || textToSearch.includes('pgdm') || textToSearch.includes('iim')) return 'MBA';
  if (textToSearch.includes('bba') || textToSearch.includes('bms')) return 'BBA';
  if (textToSearch.includes('btech') || textToSearch.includes('b.tech') || textToSearch.includes('engineering') || textToSearch.includes('jee')) return 'B.Tech';
  if (textToSearch.includes('law') || textToSearch.includes('llb') || textToSearch.includes('clat')) return 'Law';
  if (textToSearch.includes('exam') || textToSearch.includes('mock test') || textToSearch.includes('cet') || textToSearch.includes('cuet') || textToSearch.includes('result')) return 'Exams';
  if (textToSearch.includes('bca') || textToSearch.includes('mca')) return 'BCA/MCA';
  
  return 'General';
}

// Category-specific high-value FAQ templates
const FAQ_TEMPLATES = {
  'MBA': [
    { question: 'What is the typical fee structure for MBA programs in India?', answer: 'The fee structure varies widely. Government-aided institutes like FMS Delhi have low fees (around INR 2 Lakhs), while top-tier private institutions and IIMs can range from INR 15 Lakhs to INR 25 Lakhs.' },
    { question: 'Is it possible to pursue an MBA without clearing CAT?', answer: 'Yes, many colleges accept other entrance exams like XAT, NMAT, SNAP, MAT, or CMAT. Additionally, direct admission options under management quota are available in several private B-schools.' },
    { question: 'What is the difference between an MBA and a PGDM?', answer: 'An MBA is a degree awarded by universities affiliated with UGC, whereas a PGDM is a post-graduate diploma offered by autonomous institutes approved by AICTE. Both are highly valued in the job market.' }
  ],
  'B.Tech': [
    { question: 'Can I get direct admission in B.Tech without JEE Main?', answer: 'Yes, several state-level entrance exams and private colleges offer direct admission based on Class 12th board marks or management quota seats.' },
    { question: 'Which specialization has the highest placement package in B.Tech?', answer: 'Computer Science and Engineering (CSE), along with emerging fields like Artificial Intelligence (AI) & Machine Learning (ML), and Data Science, consistently offer the highest placements.' },
    { question: 'What is the difference between B.Tech and B.E.?', answer: 'B.Tech (Bachelor of Technology) is generally more practical and application-oriented, whereas B.E. (Bachelor of Engineering) tends to focus more on theoretical concepts and foundation sciences.' }
  ],
  'BBA': [
    { question: 'What are the career options after BBA?', answer: 'BBA graduates can enter fields like digital marketing, sales, business analysis, operations, human resource management, or opt for higher studies like an MBA.' },
    { question: 'Is mathematics compulsory for BBA admissions?', answer: 'No, many universities and colleges offer BBA admissions to students from non-maths backgrounds, though some premier institutes like SSCBS Delhi might require maths or applied maths.' },
    { question: 'Which BBA specialization has the scope in 2026?', answer: 'Specializations in Business Analytics, Digital Marketing, Finance, and International Business are highly in demand and offer strong career progression.' }
  ],
  'Law': [
    { question: 'Which entrance exams are required for LLB admissions in India?', answer: 'Common entrance exams include CLAT (for National Law Universities), AILET (for NLU Delhi), LSAT India, and various state-level law entrance tests like MH CET Law.' },
    { question: 'What is the difference between 3-year LLB and 5-year Integrated LLB?', answer: 'A 3-year LLB is for graduates from any discipline, whereas a 5-year Integrated LLB (such as BA LLB, BBA LLB, BCom LLB) is for students who have passed Class 12th.' },
    { question: 'What are the primary career options after graduating in Law?', answer: 'Law graduates can practice in courts, join corporate law firms as legal advisors, prepare for judicial services, work in NGOs, or join public sector undertakings (PSUs).' }
  ],
  'BCA/MCA': [
    { question: 'Is mathematics compulsory to get admission in BCA?', answer: 'While some top colleges require mathematics in Class 12th, many private and state universities offer admission to students from Commerce and Arts streams without maths.' },
    { question: 'What is the career scope after completing MCA?', answer: 'MCA graduates find extensive opportunities in software development, cloud computing, database administration, system analysis, and IT consulting across global tech firms.' },
    { question: 'Is doing MCA after BCA better than taking up a job?', answer: 'Doing an MCA provides advanced technical expertise and is often treated on par with a B.Tech degree, unlocking higher entry-level packages in major IT companies.' }
  ],
  'Exams': [
    { question: 'How do I check my exam results online?', answer: 'You can check results on the official website of the conducting bodies (e.g., NTA for JEE/NEET/CUET, or respective boards/testing organizations) using your application registration number.' },
    { question: 'Are mock tests helpful in exam preparation?', answer: 'Yes, attempting mock tests helps candidates build speed and accuracy, understand the exam pattern, and perform detailed analytics of strong and weak sections.' },
    { question: 'What is the significance of negative marking in entrance exams?', answer: 'Many competitive exams deduct marks for wrong answers (e.g., -1 or -0.25). Candidates should avoid guessing to maintain accuracy and prevent score drops.' }
  ],
  'Jobs & Careers': [
    { question: 'How can a fresher secure a high-paying job in India?', answer: 'Focus on building in-demand skills (such as coding, business analytics, digital marketing), create a strong portfolio, and actively network on platforms like LinkedIn.' },
    { question: 'Is a professional certification required for a career pivot?', answer: 'Professional certifications (like SAP, Advanced Excel, Financial Modeling, or Digital Marketing) help validate your skills and make it easier to transition to new career domains.' },
    { question: 'What are the soft skills most valued by corporate recruiters?', answer: 'Communication skills, problem-solving, team collaboration, adaptability, and emotional intelligence are highly valued soft skills across all industries.' }
  ],
  'Online Degrees': [
    { question: 'Is an online MBA degree recognized by the government?', answer: 'Yes, online degrees from UGC-DEB approved and AICTE recognized universities are fully valid for private sector employment, government exams, and higher studies.' },
    { question: 'Do online degrees offer placement support?', answer: 'Many top-tier universities provide dedicated online placement portals, virtual job fairs, and resume building support, similar to regular on-campus programs.' },
    { question: 'Are online examinations conducted in proctored mode?', answer: 'Yes, universities typically conduct online semester exams using AI-enabled or human-proctored systems to maintain academic integrity.' }
  ],
  'General': [
    { question: 'How can I choose the right college for higher studies?', answer: 'Consider critical factors such as UGC/AICTE accreditations, historical placement reports, fee structure vs ROI, faculty quality, and location.' },
    { question: 'What is the role of a career counsellor?', answer: 'A career counsellor helps students evaluate their strengths, interests, and career options, providing personalized guidance to secure admissions and achieve long-term professional goals.' },
    { question: 'How important is NAAC accreditation for a university?', answer: 'NAAC accreditation grades (like A++, A+, A) evaluate the overall quality of education, infrastructure, and research at a university, serving as a reliable benchmark for students.' }
  ]
};

function cleanMarkdownText(text) {
  return text
    .replace(/[#*`_>\[\]]/g, '') // strip markdown syntax
    .replace(/\s+/g, ' ')        // collapse whitespace
    .trim();
}

function processBlogs() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error('❌ posts directory not found!');
    return;
  }

  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
  console.log(`Processing SEO improvements for ${files.length} blogs...`);

  let updatedCount = 0;

  files.forEach(file => {
    const filePath = path.join(POSTS_DIR, file);
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(rawContent);
    const slug = file.replace('.md', '');

    let needsUpdate = false;

    // 1. Repair missing description
    if (!parsed.data.description || parsed.data.description.trim() === '') {
      const cleanText = cleanMarkdownText(parsed.content);
      const inferredDescription = cleanText.substring(0, 155).trim() + '...';
      parsed.data.description = inferredDescription;
      needsUpdate = true;
    }

    // 2. Repair missing keywords
    if (!parsed.data.keywords || !Array.isArray(parsed.data.keywords) || parsed.data.keywords.length === 0) {
      const category = inferCategory(parsed.data, slug);
      let defaultKeywords = ['career counselling', 'admissions 2026', 'placements 2025'];
      if (category === 'MBA') defaultKeywords = ['MBA admission 2026', 'best MBA colleges', 'MBA placements', 'CAT preparation'];
      if (category === 'B.Tech') defaultKeywords = ['BTech admissions 2026', 'best engineering colleges', 'engineering placements', 'direct engineering admission'];
      if (category === 'BBA') defaultKeywords = ['BBA college admission', 'BBA specializations', 'BBA career scope'];
      if (category === 'Online Degrees') defaultKeywords = ['online MBA degree validation', 'online education India', 'best online universities'];
      
      parsed.data.keywords = defaultKeywords;
      needsUpdate = true;
    }

    // 3. Inject missing FAQs (Schema & Visible Markdown)
    const hasFrontmatterFaqs = parsed.data.faqs && Array.isArray(parsed.data.faqs) && parsed.data.faqs.length > 0;
    
    // Check if visible FAQ exists in the body
    const bodyLower = parsed.content.toLowerCase();
    const hasVisibleFaq = bodyLower.includes('frequently asked questions') || bodyLower.includes('## ❓ faq') || bodyLower.includes('## faq');

    if (!hasFrontmatterFaqs && !hasVisibleFaq) {
      const category = inferCategory(parsed.data, slug);
      const faqs = FAQ_TEMPLATES[category] || FAQ_TEMPLATES['General'];

      // Update frontmatter
      parsed.data.faqs = faqs;

      // Clean existing old FAQ sections if any are half-formed
      let content = parsed.content;
      const faqHeaderRegex = /## .*?Frequently Asked Questions.*$/is;
      content = content.replace(faqHeaderRegex, '').trim();

      // Generate FAQ markdown section
      let faqMarkdown = '\n\n---\n\n## ❓ Frequently Asked Questions (FAQ)\n\n';
      faqs.forEach(faq => {
        faqMarkdown += `### ${faq.question}\n${faq.answer}\n\n`;
      });

      // Insert FAQ section before boost preparation or at the end
      const boostSectionIndex = content.indexOf('### 🚀 Boost Your Preparation');
      if (boostSectionIndex !== -1) {
        const preBoost = content.substring(0, boostSectionIndex).trim();
        const postBoost = content.substring(boostSectionIndex).trim();
        
        if (preBoost.endsWith('---')) {
          parsed.content = preBoost.substring(0, preBoost.length - 3).trim() + faqMarkdown + '\n---\n\n' + postBoost;
        } else {
          parsed.content = preBoost + faqMarkdown + '\n---\n\n' + postBoost;
        }
      } else {
        // Append citation & source handling
        const sourceIndex = content.indexOf('Source: Shiksha.com');
        if (sourceIndex !== -1) {
          const preSource = content.substring(0, sourceIndex).trim();
          const postSource = content.substring(sourceIndex).trim();
          parsed.content = preSource + faqMarkdown + '\n---\n\n' + postSource;
        } else {
          parsed.content = content + faqMarkdown;
        }
      }
      needsUpdate = true;
    }

    // 4. Standarize old url references
    const updatedContent = parsed.content
      .replace(/https:\/\/www\.careerwithmohit\.online\/tools\/mock-tests/g, '/mock-tests')
      .replace(/\/tools\/mock-tests/g, '/mock-tests');
    
    if (updatedContent !== parsed.content) {
      parsed.content = updatedContent;
      needsUpdate = true;
    }

    if (needsUpdate) {
      const newFileContent = matter.stringify(parsed.content, parsed.data);
      fs.writeFileSync(filePath, newFileContent, 'utf8');
      updatedCount++;
    }
  });

  console.log(`\n--- Optimization Summary ---`);
  console.log(`Total files scanned: ${files.length}`);
  console.log(`Files optimized/updated: ${updatedCount}`);
  console.log(`-----------------------------\n`);
}

processBlogs();
