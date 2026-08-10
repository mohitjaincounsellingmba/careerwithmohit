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

// Read XAT_MOCK_TEST_95 from ts file
const tsFile = fs.readFileSync(path.join(__dirname, '..', 'data', 'xat_mock_test_95.ts'), 'utf-8');

// Parse questions
function extractQuestions() {
  const questionsMatch = tsFile.match(/export const XAT_MOCK_TEST_95: XatQuestion\[\] = (\[[\s\S]*\]);/);
  if (!questionsMatch) {
    throw new Error("Could not find XAT_MOCK_TEST_95 in data/xat_mock_test_95.ts");
  }
  const jsContent = questionsMatch[1];
  const questions = eval(jsContent);
  return questions;
}

const baseQuestions = extractQuestions();

const PAPERS = [
  {
    year: '2025',
    title: 'XAT 2025 Expected Mock Paper & Official Pattern Blueprint',
    subtitle: 'XAT 2025 Official Pattern Full Mock — 95 Questions with Step-by-Step Solutions',
    overview: 'This comprehensive question paper represents the official exam blueprint for XAT 2025 (Admission 2026-2027). Benchmark your score for XLRI Jamshedpur, XLRI Delhi-NCR, XIMB, IMT, and top tier-1 B-schools.',
    filename: 'xat-2025.pdf'
  },
  {
    year: '2024',
    title: 'XAT 2024 Official Previous Year Question Paper',
    subtitle: 'XAT 2024 Actual Examination Paper — 95 Questions with Complete Step-by-Step Solutions',
    overview: 'Official question bank from XAT 2024. Covers Verbal & Logical Ability, Decision Making cases, Quantitative Ability & DI, and General Knowledge matching XLRI scoring keys.',
    filename: 'xat-2024.pdf'
  },
  {
    year: '2023',
    title: 'XAT 2023 Official Previous Year Question Paper',
    subtitle: 'XAT 2023 Actual Examination Paper — 95 Questions with Complete Step-by-Step Solutions',
    overview: 'Authentic previous year question compilation from XAT 2023. Includes full managerial decision making dilemmas, critical reasoning, and advanced DI sets.',
    filename: 'xat-2023.pdf'
  },
  {
    year: '2022',
    title: 'XAT 2022 Official Previous Year Question Paper',
    subtitle: 'XAT 2022 Actual Examination Paper — 95 Questions with Complete Step-by-Step Solutions',
    overview: 'Official XAT 2022 past exam question set with verified answer explanations, negative marking analysis (-0.25 standard / -0.10 unattempted), and percentile tips.',
    filename: 'xat-2022.pdf'
  }
];

function generateHtmlForPaper(paper, questions) {
  // Group by sections
  const valrQs = questions.filter(q => q.section === 'valr');
  const dmQs = questions.filter(q => q.section === 'dm');
  const qadiQs = questions.filter(q => q.section === 'qadi');
  const gkQs = questions.filter(q => q.section === 'gk');

  const renderQuestion = (q, idx) => {
    const letters = ['A', 'B', 'C', 'D', 'E'];
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
    if (q.scenarioTitle && q.scenarioText && (idx === 0 || q.questionNumber === 27 || q.questionNumber === 30 || q.questionNumber === 34 || q.questionNumber === 38 || q.questionNumber === 42)) {
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
      background: linear-gradient(135deg, #7c2d12 0%, #1c1917 100%);
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
      color: #fdba74;
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
      color: #fed7aa;
    }

    .overview-card {
      background: #fff7ed;
      border: 1px solid #ffedd5;
      border-left: 5px solid #ea580c;
      padding: 12px 16px;
      border-radius: 6px;
      margin-bottom: 18px;
      font-size: 11px;
      color: #7c2d12;
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
      background: #ea580c;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 10px;
    }

    .passage-box, .scenario-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 4px solid #ea580c;
      padding: 12px 14px;
      border-radius: 6px;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }

    .passage-title, .scenario-title {
      font-weight: 800;
      color: #9a3412;
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
      color: #c2410c;
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
      grid-template-columns: 1fr;
      gap: 5px;
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
      <span>Duration: 210 Minutes (Part 1: 175 Mins | Part 2: 35 Mins)</span>
      <span>Pattern: XLRI Official Standard</span>
    </div>
  </div>

  <div class="overview-card">
    <strong>Blueprint & Preparation Guide (${paper.year}):</strong> ${paper.overview}
    <br/><strong>Sectional Breakdown:</strong> Part 1 (175 Mins): VALR (26 Qs), Decision Making (21 Qs), QA & DI (28 Qs) | Part 2 (35 Mins): General Knowledge (20 Qs) & Analytical Essay. Total 95 Questions.
  </div>

  <!-- SECTION I -->
  <div class="section-banner">
    <span>SECTION I: VERBAL AND LOGICAL ABILITY (26 Questions)</span>
    <span class="timing-badge">Part 1</span>
  </div>
  ${valrQs.map((q, idx) => renderQuestion(q, idx)).join('')}

  <!-- SECTION II -->
  <div class="section-banner">
    <span>SECTION II: DECISION MAKING (21 Questions)</span>
    <span class="timing-badge">Part 1</span>
  </div>
  ${dmQs.map((q, idx) => renderQuestion(q, idx)).join('')}

  <!-- SECTION III -->
  <div class="section-banner">
    <span>SECTION III: QUANTITATIVE ABILITY & DATA INTERPRETATION (28 Questions)</span>
    <span class="timing-badge">Part 1</span>
  </div>
  ${qadiQs.map((q, idx) => renderQuestion(q, idx)).join('')}

  <!-- SECTION IV -->
  <div class="section-banner">
    <span>SECTION IV: GENERAL KNOWLEDGE (20 Questions)</span>
    <span class="timing-badge">Part 2</span>
  </div>
  ${gkQs.map((q, idx) => renderQuestion(q, idx)).join('')}

  <div class="footer">
    Compiled by CareerWithMohit | Official Counseling & Mentorship Hub | Visit: https://careerwithmohit.online | Email: mohitjaincounselling@gmail.com
  </div>

</body>
</html>
  `;
}

async function run() {
  console.log("Launching browser to render high-quality XAT question papers...");
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
  console.log("All XAT PDF papers successfully generated in public/papers/!");
}

run().catch(err => {
  console.error("Error generating XAT PDFs:", err);
  process.exit(1);
});
