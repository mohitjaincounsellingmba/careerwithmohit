import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function generatePdf() {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MBA Campus Placement Selection Process & Questions</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

    @page {
      size: A4;
      margin: 16mm 14mm 16mm 14mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1e293b;
      background-color: #ffffff;
      font-size: 11.5px;
      line-height: 1.45;
    }

    .page {
      page-break-after: always;
      position: relative;
      min-height: 1000px;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    /* Header */
    .top-badge {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #2563eb;
      margin-bottom: 4px;
    }

    .main-title {
      font-size: 24px;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.5px;
      line-height: 1.2;
      margin-bottom: 4px;
    }

    .sub-title {
      font-size: 12px;
      color: #64748b;
      font-weight: 600;
      margin-bottom: 14px;
    }

    /* Overview Box */
    .overview-box {
      background: #eff6ff;
      border-left: 4px solid #2563eb;
      padding: 10px 14px;
      border-radius: 0 8px 8px 0;
      margin-bottom: 16px;
      font-size: 11px;
      color: #334155;
      line-height: 1.45;
    }

    .overview-box strong {
      color: #1e3a8a;
    }

    /* Section Banner */
    .section-banner {
      background: #0f172a;
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 8px 14px;
      border-radius: 6px;
      margin-top: 14px;
      margin-bottom: 12px;
    }

    /* Company Container */
    .company-block {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      margin-bottom: 14px;
      overflow: hidden;
    }

    .company-header {
      background: #f8fafc;
      padding: 8px 14px;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .company-name {
      font-size: 13px;
      font-weight: 800;
      color: #0f172a;
    }

    .company-roles {
      font-size: 10.5px;
      font-weight: 500;
      color: #64748b;
    }

    /* Table */
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
    }

    th {
      background: #f1f5f9;
      color: #475569;
      text-align: left;
      font-size: 9.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 6px 12px;
      border-bottom: 1px solid #cbd5e1;
    }

    td {
      padding: 8px 12px;
      vertical-align: top;
      border-bottom: 1px solid #f1f5f9;
    }

    tr:last-child td {
      border-bottom: none;
    }

    .col-round {
      width: 22%;
    }

    .col-desc {
      width: 38%;
      color: #334155;
      line-height: 1.4;
    }

    .col-questions {
      width: 40%;
      color: #0f172a;
    }

    .round-badge {
      display: inline-block;
      font-size: 8.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 2px 6px;
      border-radius: 4px;
      margin-bottom: 3px;
    }

    .badge-blue { background: #dbeafe; color: #1e40af; }
    .badge-purple { background: #f3e8ff; color: #6b21a8; }
    .badge-emerald { background: #d1fae5; color: #065f46; }
    .badge-amber { background: #fef3c7; color: #92400e; }
    .badge-slate { background: #e2e8f0; color: #334155; }

    .round-title {
      font-size: 11px;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.3;
    }

    ul.q-list {
      list-style-type: none;
      padding-left: 0;
    }

    ul.q-list li {
      position: relative;
      padding-left: 12px;
      margin-bottom: 4px;
      line-height: 1.35;
      font-size: 10.5px;
    }

    ul.q-list li:last-child {
      margin-bottom: 0;
    }

    ul.q-list li::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #2563eb;
      font-weight: bold;
      font-size: 13px;
      line-height: 1;
    }

    /* Rules box */
    .rules-card {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 10px;
      padding: 14px 18px;
      margin-top: 16px;
    }

    .rules-header {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 800;
      color: #1e40af;
      margin-bottom: 8px;
    }

    .rules-list {
      list-style: none;
      padding: 0;
    }

    .rules-list li {
      font-size: 11px;
      color: #1e293b;
      margin-bottom: 8px;
      line-height: 1.45;
    }

    .rules-list li strong {
      color: #0f172a;
    }

    .footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 9px;
      color: #94a3b8;
      font-weight: 600;
      border-top: 1px solid #f1f5f9;
      padding-top: 8px;
    }
  </style>
</head>
<body>

  <!-- PAGE 1 -->
  <div class="page">
    <div class="top-badge">CAREER WITH MOHIT • MASTER GUIDE</div>
    <h1 class="main-title">MBA Campus Placement Selection Process & Questions</h1>
    <div class="sub-title">Top Recruiters Selection Rounds, Industry Expectations & Real Interview Questions</div>

    <div class="overview-box">
      <strong>Overview:</strong> Yeh guide MBA students ke liye design ki gayi hai jisse top-tier companies (BIG 4, BFSI, Tech, FMCG, Marketing & Consulting) ke recruitment process, filtering rounds aur actual interview questions ko step-by-step samjha ja sake.
    </div>

    <div class="section-banner">1. BIG 4 & CONSULTING FIRMS (EY, Deloitte, PwC, KPMG)</div>

    <!-- EY -->
    <div class="company-block">
      <div class="company-header">
        <span class="company-name">EY (Ernst & Young)</span>
        <span class="company-roles">Roles: Business Consulting, Assurance, Valuation, Tax Advisory</span>
      </div>
      <table>
        <thead>
          <tr>
            <th class="col-round">Selection Round</th>
            <th class="col-desc">Round Description & Process</th>
            <th class="col-questions">Frequently Asked Questions / Topics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span class="round-badge badge-blue">Round 1</span>
              <div class="round-title">Online Aptitude & Case Assessment</div>
            </td>
            <td class="col-desc">Numerical reasoning, verbal ability, logical puzzles aur short business scenario questions. Time management critical hota hai.</td>
            <td>
              <ul class="q-list">
                <li>Data interpretation graphs based on revenue/expenses.</li>
                <li>Logical deduction & syllogism questions.</li>
                <li>Scenario-based ethical judgement questions.</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <span class="round-badge badge-purple">Round 2</span>
              <div class="round-title">Group Discussion / Case Study GD</div>
            </td>
            <td class="col-desc">8-10 students ka group. Ek business case snippet ya current economic issue diya jata hai (10 mins reading + 15 mins discussion).</td>
            <td>
              <ul class="q-list">
                <li>"Should Indian companies focus on EV transition right now?"</li>
                <li>Case: A retail firm facing 15% revenue drop—suggest turn-around strategy.</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <span class="round-badge badge-emerald">Round 3</span>
              <div class="round-title">Technical Interview</div>
            </td>
            <td class="col-desc">Domain knowledge check. Finance/Consulting frameworks, accounting standards aur guesstimates par focus.</td>
            <td>
              <ul class="q-list">
                <li>"Walk me through the 3 Financial Statements and how they connect."</li>
                <li>"How do you value a tech startup with negative cash flows?"</li>
                <li>Guesstimate: "Estimate the market size of coffee shops in Gurgaon."</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <span class="round-badge badge-amber">Round 4</span>
              <div class="round-title">Partner / HR Round</div>
            </td>
            <td class="col-desc">Fitment test, long-term alignment, stress handling aur CV verification. Partner directly interviewer hote hain.</td>
            <td>
              <ul class="q-list">
                <li>"Why EY and why Consulting over industry roles?"</li>
                <li>"Tell me about a time you managed a conflict in a team project."</li>
                <li>"Are you comfortable with extensive client travel and 60+ hr work weeks?"</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Deloitte Part 1 -->
    <div class="company-block">
      <div class="company-header">
        <span class="company-name">Deloitte</span>
        <span class="company-roles">Roles: Advisory, Strategy & Operations, Financial Risk</span>
      </div>
      <table>
        <thead>
          <tr>
            <th class="col-round">Selection Round</th>
            <th class="col-desc">Round Description & Process</th>
            <th class="col-questions">Frequently Asked Questions / Topics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span class="round-badge badge-blue">Round 1</span>
              <div class="round-title">AMCAT / Online Assessment</div>
            </td>
            <td class="col-desc">Quants, Logical Reasoning, English Comprehension aur Personality test (Versant test for communication in some profiles).</td>
            <td>
              <ul class="q-list">
                <li>Speed-distance-time, probability, profit & loss.</li>
                <li>Email writing/correction and situational behavior scenarios.</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <span class="round-badge badge-purple">Round 2</span>
              <div class="round-title">Jam Session / GD</div>
            </td>
            <td class="col-desc">Just-a-Minute (JAM) or case discussion. Quick thinking, structured speech aur clear pronunciation evaluate hota hai.</td>
            <td>
              <ul class="q-list">
                <li>"Impact of AI on mid-level management jobs."</li>
                <li>"Gig economy vs Traditional employment."</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer">
      <span>Career with Mohit • Placement Recruitment Playbook</span>
      <span>Page 1 of 4</span>
    </div>
  </div>

  <!-- PAGE 2 -->
  <div class="page">
    <!-- Deloitte Part 2 -->
    <div class="company-block" style="margin-top: 6px;">
      <div class="company-header">
        <span class="company-name">Deloitte (Continued)</span>
        <span class="company-roles">Roles: Advisory, Strategy & Operations, Financial Risk</span>
      </div>
      <table>
        <thead>
          <tr>
            <th class="col-round">Selection Round</th>
            <th class="col-desc">Round Description & Process</th>
            <th class="col-questions">Frequently Asked Questions / Topics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span class="round-badge badge-emerald">Round 3</span>
              <div class="round-title">Technical & Case Interview</div>
            </td>
            <td class="col-desc">Live case solving + resume deep dive. Business framework (MECE, 4P, SWOT) apply karne ki capacity dekhte hain.</td>
            <td>
              <ul class="q-list">
                <li>"Our client is a telecom operator losing market share to Jio. Framework batayein strategy ka."</li>
                <li>"Explain WACC and NPV in simple terms."</li>
                <li>"What was your role in your MBA internship project?"</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <span class="round-badge badge-amber">Round 4</span>
              <div class="round-title">Director / HR Round</div>
            </td>
            <td class="col-desc">Cultural fit, behavioral questions aur career goals discussion.</td>
            <td>
              <ul class="q-list">
                <li>"Where do you see yourself 3 years after joining Deloitte?"</li>
                <li>"Describe a situation where you had to work with a difficult manager."</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PwC & KPMG -->
    <div class="company-block">
      <div class="company-header">
        <span class="company-name">PwC & KPMG</span>
        <span class="company-roles">Roles: Deals Advisory, Management Consulting, Risk & Governance</span>
      </div>
      <table>
        <thead>
          <tr>
            <th class="col-round">Selection Round</th>
            <th class="col-desc">Round Description & Process</th>
            <th class="col-questions">Frequently Asked Questions / Topics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span class="round-badge badge-blue">Round 1</span>
              <div class="round-title">Cognitive Test</div>
            </td>
            <td class="col-desc">Aptitude test including data interpretation and business communication exercises.</td>
            <td>
              <ul class="q-list">
                <li>Financial ratio calculations based on sample tables.</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <span class="round-badge badge-emerald">Round 2</span>
              <div class="round-title">Technical & Domain Round</div>
            </td>
            <td class="col-desc">In-depth domain questions, balance sheet analysis, valuation techniques and industry macro trends.</td>
            <td>
              <ul class="q-list">
                <li>"What is Enterprise Value vs Equity Value?"</li>
                <li>"How does working capital impact company cash flows?"</li>
                <li>"Explain the impact of RBI repo rate hike on banking sector."</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <span class="round-badge badge-amber">Round 3</span>
              <div class="round-title">Partner / Senior Director HR</div>
            </td>
            <td class="col-desc">Behavioral assessment, ethical dilemma tests and commitment evaluation.</td>
            <td>
              <ul class="q-list">
                <li>"If a client demands an unethical adjustment in report, how will you handle it?"</li>
                <li>"Why did you choose your specific MBA specialization?"</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section-banner">2. BANKING & FINANCIAL SERVICES (JP Morgan, ICICI, HDFC, Axis)</div>

    <!-- JP Morgan & Goldman Sachs -->
    <div class="company-block">
      <div class="company-header">
        <span class="company-name">JP Morgan Chase & Co. / Goldman Sachs</span>
        <span class="company-roles">Roles: Investment Banking Analyst, Wealth Management, Risk</span>
      </div>
      <table>
        <thead>
          <tr>
            <th class="col-round">Selection Round</th>
            <th class="col-desc">Round Description & Process</th>
            <th class="col-questions">Frequently Asked Questions / Topics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span class="round-badge badge-blue">Round 1</span>
              <div class="round-title">Online HireVue / Technical Test</div>
            </td>
            <td class="col-desc">Video interview + online financial modeling / quantitative aptitude test.</td>
            <td>
              <ul class="q-list">
                <li>Recorded video questions on motivation and business awareness.</li>
                <li>Advanced quants, statistics, and financial math.</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <span class="round-badge badge-emerald">Round 2</span>
              <div class="round-title">Technical Interview (Round 1 & 2)</div>
            </td>
            <td class="col-desc">Heavy financial concepts, DCF modeling, LBO basics, corporate finance principles.</td>
            <td>
              <ul class="q-list">
                <li>"Walk me through a DCF model step-by-step."</li>
                <li>"If Depreciation increases by $10, how does it affect 3 financial statements?"</li>
                <li>"What are the main drivers of M&A success?"</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <span class="round-badge badge-amber">Round 3</span>
              <div class="round-title">Fitment & Senior Leadership</div>
            </td>
            <td class="col-desc">High-pressure culture fit test, attention to detail and market orientation.</td>
            <td>
              <ul class="q-list">
                <li>"What is happening in global bond markets today?"</li>
                <li>"Pitch me a stock or company that is currently undervalued."</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer">
      <span>Career with Mohit • Placement Recruitment Playbook</span>
      <span>Page 2 of 4</span>
    </div>
  </div>

  <!-- PAGE 3 -->
  <div class="page">
    <!-- Indian Commercial Banks -->
    <div class="company-block" style="margin-top: 6px;">
      <div class="company-header">
        <span class="company-name">Indian Commercial Banks (ICICI Bank, HDFC Bank, Axis Bank)</span>
        <span class="company-roles">Roles: Relationship Manager, Corporate Banking, Product Manager</span>
      </div>
      <table>
        <thead>
          <tr>
            <th class="col-round">Selection Round</th>
            <th class="col-desc">Round Description & Process</th>
            <th class="col-questions">Frequently Asked Questions / Topics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span class="round-badge badge-blue">Round 1</span>
              <div class="round-title">Online Psychometric & Aptitude</div>
            </td>
            <td class="col-desc">Sales aptitude, customer orientation, logical reasoning and numerical speed test.</td>
            <td>
              <ul class="q-list">
                <li>Basic financial calculations, interest rates, currency conversions.</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <span class="round-badge badge-purple">Round 2</span>
              <div class="round-title">Group Discussion (GD)</div>
            </td>
            <td class="col-desc">Caselet on customer acquisition or financial products selling strategy.</td>
            <td>
              <ul class="q-list">
                <li>"Digital Banking vs Branch Banking: Future of Retail Banking."</li>
                <li>"How to sell insurance products to rural population?"</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <span class="round-badge badge-emerald">Round 3</span>
              <div class="round-title">Personal Interview (PI)</div>
            </td>
            <td class="col-desc">Sales orientation, product knowledge, stress handling, location flexibility.</td>
            <td>
              <ul class="q-list">
                <li>"Sell this credit card / mutual fund product to me in 2 minutes."</li>
                <li>"What is NPA, CRR, SLR, and Repo Rate?"</li>
                <li>"Are you comfortable with aggressive sales targets?"</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section-banner">3. MARKETING, FMCG & E-COMMERCE (HUL, P&G, Amazon, Asian Paints)</div>

    <!-- FMCG & Retail Giants -->
    <div class="company-block">
      <div class="company-header">
        <span class="company-name">FMCG & Retail Giants (HUL, P&G, Asian Paints, Marico)</span>
        <span class="company-roles">Roles: Area Sales Manager (ASM), Brand Manager</span>
      </div>
      <table>
        <thead>
          <tr>
            <th class="col-round">Selection Round</th>
            <th class="col-desc">Round Description & Process</th>
            <th class="col-questions">Frequently Asked Questions / Topics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span class="round-badge badge-blue">Round 1</span>
              <div class="round-title">Shortlisting / Online Simulation</div>
            </td>
            <td class="col-desc">CV shortlisting based on marketing projects, live brand games / interactive simulations.</td>
            <td>
              <ul class="q-list">
                <li>Brand budget allocation games & decision-making tests.</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <span class="round-badge badge-purple">Round 2</span>
              <div class="round-title">Group Activity / Live Simulation</div>
            </td>
            <td class="col-desc">Group is given a new product launch challenge (Pricing, Distribution channel, Promotion strategy).</td>
            <td>
              <ul class="q-list">
                <li>"Design a marketing strategy to launch organic tea in Tier-2 Indian cities."</li>
                <li>"How will you handle distributor conflicts in trade channels?"</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <span class="round-badge badge-emerald">Round 3</span>
              <div class="round-title">Technical Marketing PI</div>
            </td>
            <td class="col-desc">Deep-dive into 4Ps, STP framework, digital marketing metrics and summer internship project.</td>
            <td>
              <ul class="q-list">
                <li>"Explain your Summer Internship Project (SIP) - what was the exact ROI?"</li>
                <li>"Difference between Trade Marketing and Brand Marketing?"</li>
                <li>"What is CAC, LTV, ROAS, and Conversion Funnel in Digital Ads?"</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <span class="round-badge badge-amber">Round 4</span>
              <div class="round-title">Leadership Fitment</div>
            </td>
            <td class="col-desc">Field readiness check, willingness to work in rural/tier-3 regions for channel sales.</td>
            <td>
              <ul class="q-list">
                <li>"Why do you want to work in sales when you have an MBA degree?"</li>
                <li>"How will you manage a team of distributors older than you?"</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- E-Commerce & Tech Sales Part 1 -->
    <div class="company-block">
      <div class="company-header">
        <span class="company-name">E-Commerce & Tech Sales (Amazon, Flipkart, PhonePe)</span>
        <span class="company-roles">Roles: Program Manager, Category Manager, Business Development</span>
      </div>
      <table>
        <thead>
          <tr>
            <th class="col-round">Selection Round</th>
            <th class="col-desc">Round Description & Process</th>
            <th class="col-questions">Frequently Asked Questions / Topics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span class="round-badge badge-blue">Round 1</span>
              <div class="round-title">Online Analytical & Writing Test</div>
            </td>
            <td class="col-desc">Case analysis, data interpretation and short essay writing (Amazon Leadership Principles alignment).</td>
            <td>
              <ul class="q-list">
                <li>Analytical questions based on Excel datasets.</li>
                <li>Situational essay on 'Customer Obsession' and 'Ownership'.</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer">
      <span>Career with Mohit • Placement Recruitment Playbook</span>
      <span>Page 3 of 4</span>
    </div>
  </div>

  <!-- PAGE 4 -->
  <div class="page">
    <!-- E-Commerce & Tech Sales Part 2 -->
    <div class="company-block" style="margin-top: 6px;">
      <div class="company-header">
        <span class="company-name">E-Commerce & Tech Sales (Continued)</span>
        <span class="company-roles">Roles: Program Manager, Category Manager, Business Development</span>
      </div>
      <table>
        <thead>
          <tr>
            <th class="col-round">Selection Round</th>
            <th class="col-desc">Round Description & Process</th>
            <th class="col-questions">Frequently Asked Questions / Topics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span class="round-badge badge-emerald">Round 2 & 3</span>
              <div class="round-title">Loop Interviews (Technical + Behavioral)</div>
            </td>
            <td class="col-desc">Rigorous behavioral interview using STAR method + Category growth case studies.</td>
            <td>
              <ul class="q-list">
                <li>"Give an example where you took a decision based on data vs intuition."</li>
                <li>"How would you grow the Electronics category revenue by 25% on Festive Sale?"</li>
                <li>"Tell me about a time you failed and what you learned."</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Top 5 Rules Box -->
    <div class="rules-card">
      <div class="rules-header">
        <span>💡</span>
        <span>Career with Mohit — Top 5 Preparation Rules for MBA Placements:</span>
      </div>
      <ul class="rules-list">
        <li><strong>• 1. Master Your SIP (Summer Internship Project):</strong> 80% technical questions in PI revolve around your 8-week internship project. Know numbers, impact, and methodology by heart.</li>
        <li><strong>• 2. Crack Guesstimates & Frameworks:</strong> Practice MECE, 4P, 3C, and Porter's 5 Forces. Practice 2-3 guesstimates daily out loud.</li>
        <li><strong>• 3. Prepare STAR Stories:</strong> Keep 5 stories ready using (Situation, Task, Action, Result) for behavioral rounds (Leadership, Conflict, Failure, Overachieving).</li>
        <li><strong>• 4. Read Business Headlines Daily:</strong> Stay updated with RBI policies, Big Tech trends, M&As, and Union Budget highlights.</li>
        <li><strong>• 5. Perfect your "Tell Me About Yourself":</strong> Pitch yourself in 90 seconds connecting your past background + MBA learning + future aspirations with the target role.</li>
      </ul>
    </div>

    <div class="footer">
      <span>Career with Mohit • Placement Recruitment Playbook</span>
      <span>Page 4 of 4</span>
    </div>
  </div>

</body>
</html>
  `;

  await page.setContent(htmlContent, { waitUntil: 'networkidle' });

  const outputDir = path.join(process.cwd(), 'public', 'downloads');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const pdfPaths = [
    path.join(outputDir, 'mba-campus-placement-interview-guide.pdf'),
    path.join(outputDir, 'mba-campus-placement-selection-process-questions.pdf'),
    path.join(outputDir, 'mba-campus-placement-process-and-interview-questions.pdf'),
  ];

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '16mm',
      bottom: '16mm',
      left: '14mm',
      right: '14mm',
    }
  });

  for (const p of pdfPaths) {
    fs.writeFileSync(p, pdfBuffer);
    console.log(`Generated PDF at: ${p} (${pdfBuffer.length} bytes)`);
  }

  await browser.close();
}

generatePdf().catch(err => {
  console.error(err);
  process.exit(1);
});
