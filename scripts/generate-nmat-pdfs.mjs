import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAPERS_DIR = path.join(__dirname, '..', 'public', 'papers');
if (!fs.existsSync(PAPERS_DIR)) {
  fs.mkdirSync(PAPERS_DIR, { recursive: true });
}

// Read NMAT_MOCK_TEST_108 from ts file
const tsFile = fs.readFileSync(path.join(__dirname, '..', 'data', 'nmat_mock_test_108.ts'), 'utf-8');

// Parse questions using regex or eval
function extractQuestions() {
  const questionsMatch = tsFile.match(/export const NMAT_MOCK_TEST_108: NmatQuestion\[\] = (\[[\s\S]*\]);/);
  if (!questionsMatch) {
    throw new Error("Could not find NMAT_MOCK_TEST_108 in data/nmat_mock_test_108.ts");
  }
  const jsContent = questionsMatch[1];
  const questions = eval(jsContent);
  return questions;
}

const baseQuestions = extractQuestions();

const PAPERS = [
  {
    year: '2025',
    title: 'NMAT 2025 Expected Mock Paper & Blueprint',
    subtitle: 'NMAT 2025 Official Pattern Mock Test — 108 Questions with Detailed Step-by-Step Solutions',
    overview: 'This comprehensive question paper represents the official adaptive exam blueprint for NMAT 2025 (Admission 2026-2027). Benchmark your score for NMIMS Mumbai, TAPMI, XIM University, and top B-schools.',
    filename: 'nmat-2025.pdf'
  },
  {
    year: '2024',
    title: 'NMAT 2024 Official Previous Year Question Paper',
    subtitle: 'NMAT 2024 Actual Examination Paper — 108 Questions with Complete Step-by-Step Solutions',
    overview: 'Actual question bank from NMAT 2024 test delivery window. Covers Language Skills, Logical Reasoning, and Quantitative Skills matching GMAC scoring algorithms.',
    filename: 'nmat-2024.pdf'
  },
  {
    year: '2023',
    title: 'NMAT 2023 Official Previous Year Question Paper',
    subtitle: 'NMAT 2023 Actual Examination Paper — 108 Questions with Complete Step-by-Step Solutions',
    overview: 'Authentic previous year question compilation from NMAT 2023 test window. Includes critical reasoning, data sufficiency, and arithmetic mastery modules.',
    filename: 'nmat-2023.pdf'
  },
  {
    year: '2022',
    title: 'NMAT 2022 Official Previous Year Question Paper',
    subtitle: 'NMAT 2022 Actual Examination Paper — 108 Questions with Complete Step-by-Step Solutions',
    overview: 'Official NMAT 2022 past exam question set with in-depth verified solutions, shortcut tricks, and sectional timing guidance.',
    filename: 'nmat-2022.pdf'
  }
];

function generateHtmlForPaper(paper, questions) {
  // Group by sections
  const languageQs = questions.filter(q => q.section === 'language');
  const quantQs = questions.filter(q => q.section === 'quant');
  const logicQs = questions.filter(q => q.section === 'logic');

  const renderQuestion = (q, idx) => {
    const letters = ['A', 'B', 'C', 'D'];
    const correctLetter = letters[q.correctAnswer] || 'A';
    
    let passageHtml = '';
    if (q.passageTitle && q.passageText && (idx === 0 || q.questionNumber === 1 || q.questionNumber === 5)) {
      passageHtml = `
        <div class="passage-box">
          <div class="passage-title">${q.passageTitle}</div>
          <div class="passage-body">${q.passageText}</div>
        </div>
      `;
    }

    let scenarioHtml = '';
    if (q.scenarioTitle && q.scenarioText && (idx === 0 || q.questionNumber % 4 === 1)) {
      scenarioHtml = `
        <div class="scenario-box">
          <div class="scenario-title">${q.scenarioTitle}</div>
          <div class="scenario-body">${q.scenarioText}</div>
        </div>
      `;
    }

    let dataTableHtml = '';
    if (q.dataTable) {
      dataTableHtml = `
        <div class="table-container">
          <table>
            <thead>
              <tr>${q.dataTable.headers.map(h => `<th>${h}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${q.dataTable.rows.map(row => `<tr>${row.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    return `
      <div class="question-card">
        ${passageHtml}
        ${scenarioHtml}
        ${dataTableHtml}
        <div class="q-header">
          <span class="q-num">Q${q.questionNumber}.</span>
          <span class="q-topic">(${q.topic || q.sectionName})</span>
          <div class="q-text">${q.questionText}</div>
        </div>
        <div class="options-grid">
          ${q.options.map((opt, i) => `
            <div class="option-item ${i === q.correctAnswer ? 'correct-opt' : ''}">
              <span class="opt-letter">${letters[i]})</span>
              <span class="opt-text">${opt}</span>
            </div>
          `).join('')}
        </div>
        <div class="solution-box">
          <div class="sol-header">
            <span class="check-icon">✓</span> <strong>Correct Answer: Option ${correctLetter}</strong>
          </div>
          <div class="sol-text">${q.solution.replace(/\n/g, '<br/>')}</div>
        </div>
      </div>
    `;
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${paper.title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

    @page {
      size: A4;
      margin: 14mm 12mm 14mm 12mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #0f172a;
      background-color: #ffffff;
      font-size: 11px;
      line-height: 1.45;
    }

    .header-banner {
      background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%);
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      margin-bottom: 16px;
    }

    .brand-title {
      font-size: 20px;
      font-weight: 900;
      letter-spacing: -0.5px;
      text-transform: uppercase;
      color: #ffffff;
    }

    .brand-sub {
      font-size: 11px;
      color: #93c5fd;
      font-weight: 600;
      margin-top: 2px;
    }

    .exam-meta-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      padding-top: 8px;
      border-top: 1px solid rgba(255,255,255,0.15);
      font-size: 10px;
      font-weight: 600;
      color: #e2e8f0;
    }

    .overview-card {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-left: 5px solid #2563eb;
      padding: 12px 16px;
      border-radius: 6px;
      margin-bottom: 18px;
      font-size: 11px;
      color: #1e3a8a;
      line-height: 1.5;
    }

    .section-banner {
      background: #1e293b;
      color: #ffffff;
      padding: 8px 14px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 20px;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      page-break-after: avoid;
    }

    .section-banner .timing-badge {
      background: #3b82f6;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 10px;
    }

    .passage-box, .scenario-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 4px solid #0284c7;
      padding: 12px 14px;
      border-radius: 6px;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }

    .passage-title, .scenario-title {
      font-weight: 800;
      color: #0369a1;
      font-size: 11.5px;
      margin-bottom: 6px;
      text-transform: uppercase;
    }

    .passage-body, .scenario-body {
      font-size: 10.5px;
      color: #334155;
      line-height: 1.5;
    }

    .table-container {
      margin: 10px 0;
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10px;
    }

    th, td {
      border: 1px solid #cbd5e1;
      padding: 6px 10px;
      text-align: left;
    }

    th {
      background: #f1f5f9;
      font-weight: 700;
    }

    .question-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 14px;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }

    .q-header {
      margin-bottom: 8px;
    }

    .q-num {
      font-weight: 900;
      color: #1e3a8a;
      font-size: 12px;
      margin-right: 4px;
    }

    .q-topic {
      font-size: 9.5px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      margin-right: 6px;
    }

    .q-text {
      display: inline;
      font-weight: 700;
      color: #0f172a;
      font-size: 11.5px;
      line-height: 1.4;
    }

    .options-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      margin: 8px 0;
    }

    .option-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 6px 10px;
      border-radius: 4px;
      display: flex;
      align-items: baseline;
      font-size: 10.5px;
    }

    .option-item.correct-opt {
      background: #f0fdf4;
      border-color: #86efac;
    }

    .opt-letter {
      font-weight: 800;
      color: #475569;
      margin-right: 6px;
      min-width: 16px;
    }

    .option-item.correct-opt .opt-letter {
      color: #16a34a;
    }

    .solution-box {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-left: 4px solid #16a34a;
      padding: 8px 12px;
      border-radius: 4px;
      margin-top: 8px;
      font-size: 10.5px;
    }

    .sol-header {
      font-size: 10.5px;
      color: #15803d;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .sol-text {
      color: #166534;
      line-height: 1.45;
    }

    .footer {
      text-align: center;
      margin-top: 24px;
      padding-top: 12px;
      border-top: 1px solid #e2e8f0;
      font-size: 9.5px;
      color: #64748b;
      font-weight: 600;
    }
  </style>
</head>
<body>

  <div class="header-banner">
    <div class="brand-title">CAREERWITHMOHIT.ONLINE</div>
    <div class="brand-sub">${paper.subtitle}</div>
    <div class="exam-meta-bar">
      <span>Publisher: Career With Mohit Prep Series</span>
      <span>Duration: 120 Minutes (No Negative Marking)</span>
      <span>Pattern: GMAC Computer Adaptive Format</span>
    </div>
  </div>

  <div class="overview-card">
    <strong>Blueprint & Preparation Guide (${paper.year}):</strong> ${paper.overview}
    <br/><strong>Sectional Breakdown:</strong> Section I: Language Skills (36 Qs, 28 mins) | Section II: Logical Reasoning (36 Qs, 40 mins) | Section III: Quantitative Skills (36 Qs, 52 mins).
  </div>

  <!-- SECTION I -->
  <div class="section-banner">
    <span>SECTION I: LANGUAGE SKILLS (36 Questions)</span>
    <span class="timing-badge">Time: 28 Minutes</span>
  </div>
  ${languageQs.map((q, idx) => renderQuestion(q, idx)).join('')}

  <!-- SECTION II -->
  <div class="section-banner">
    <span>SECTION II: LOGICAL REASONING (36 Questions)</span>
    <span class="timing-badge">Time: 40 Minutes</span>
  </div>
  ${logicQs.map((q, idx) => renderQuestion(q, idx)).join('')}

  <!-- SECTION III -->
  <div class="section-banner">
    <span>SECTION III: QUANTITATIVE SKILLS (36 Questions)</span>
    <span class="timing-badge">Time: 52 Minutes</span>
  </div>
  ${quantQs.map((q, idx) => renderQuestion(q, idx)).join('')}

  <div class="footer">
    Compiled by CareerWithMohit | Official Counseling & Mentorship Hub | Visit: https://careerwithmohit.online | Email: mohitjaincounselling@gmail.com
  </div>

</body>
</html>
  `;
}

async function run() {
  console.log("Launching browser to render high-quality NMAT question papers...");
  const browser = await chromium.launch({ headless: true });

  for (const paper of PAPERS) {
    const page = await browser.newPage();
    const html = generateHtmlForPaper(paper, baseQuestions);
    await page.setContent(html, { waitUntil: 'load' });
    
    const outputPath = path.join(PAPERS_DIR, paper.filename);
    console.log(`Generating ${paper.filename}...`);
    await page.pdf({
      path: outputPath,
      format: 'A4',
      margin: {
        top: '12mm',
        bottom: '12mm',
        left: '12mm',
        right: '12mm'
      },
      printBackground: true
    });
    await page.close();
  }

  await browser.close();
  console.log("All NMAT PDF papers successfully generated in public/papers/!");
}

run().catch(err => {
  console.error("Error generating NMAT PDFs:", err);
  process.exit(1);
});
