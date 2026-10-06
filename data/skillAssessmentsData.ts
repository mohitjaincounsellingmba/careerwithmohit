export interface Question {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0-indexed: 0, 1, 2, 3
  explanation: string;
}

export interface SpecializationDomain {
  id: string; // slug
  name: string;
  shortTitle: string;
  category: "Core MBA" | "Emerging Tech MBA" | "Sectoral MBA";
  badgeColor: string;
  accentColor: string;
  iconName: string;
  certificateTitle: string;
  description: string;
  avgSalary: string;
  topRecruiters: string[];
  keyCompetencies: string[];
  syllabus: string[];
  passingScore: number; // 12.0 marks out of 20 (60%)
  totalQuestions: number; // 20
  timeLimitMinutes: number; // 25
  negativeMarking: number; // -0.33 or -0.5
  questions: Question[];
}

export const CERTIFICATE_SIGNATORY = {
  name: "Mohit Jain",
  role: "Founder & Chief Career Mentor",
  credentials: "MBA Admissions & Career Strategist | Ex-Industry Consultant",
  organization: "CareerWithMohit Accreditation Council"
};

export const MBA_SPECIALIZATIONS: SpecializationDomain[] = [
  // =========================================================================
  // 1. HUMAN RESOURCE MANAGEMENT (HR) - 20 High-Yield MBA Questions
  // =========================================================================
  {
    id: "human-resource",
    name: "MBA Human Resource Management (Strategic HRM & People Analytics)",
    shortTitle: "Human Resource",
    category: "Core MBA",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    accentColor: "from-rose-500 to-pink-600",
    iconName: "Users",
    certificateTitle: "Executive Certification in Strategic Human Resource Management & HR Analytics",
    description: "Evaluates mastery in Strategic Talent Acquisition, Competency Mapping, Mercer 3P Compensation, Labor Codes 2020, 9-Box Talent Grid, POSH compliance, and Predictive People Analytics.",
    avgSalary: "₹12 - 24 LPA",
    topRecruiters: ["Deloitte", "HUL", "Tata Sons", "Aditya Birla Group", "ITC", "Accenture Strategy", "Wipro"],
    keyCompetencies: [
      "Strategic Talent Acquisition & Sourcing",
      "Compensation & Benefits (Mercer 3P)",
      "HR Analytics & Attrition Modeling",
      "Labor Codes 2020 & Industrial Relations",
      "9-Box Matrix & 360° Performance Appraisal"
    ],
    syllabus: [
      "Talent Acquisition & Competency-Based Interviewing",
      "Job Evaluation (Hay Guide Chart-Profile Method)",
      "Total Rewards, ESOPs & Broadbanding",
      "Labor Law Reforms, POSH & Compliance Audit",
      "HR Metrics: Cost-per-Hire, eNPS, Yield Ratios & Cohort Attrition"
    ],
    passingScore: 12.0,
    totalQuestions: 20,
    timeLimitMinutes: 25,
    negativeMarking: 0.33,
    questions: [
      {
        id: 1,
        question: "In the 9-Box Talent Assessment Matrix used by HR leaders, an employee located in the 'Top-Right' box represents which profile?",
        options: [
          "High Potential, Low Performance (Dilemma/Rough Diamond)",
          "High Potential, High Performance (Star/Future Leader)",
          "Low Potential, High Performance (Workhorse/Solid Performer)",
          "Medium Potential, Low Performance (Underperformer)"
        ],
        correctAnswer: 1,
        explanation: "In the 9-Box Grid (assessing Potential on the Y-axis and Performance on the X-axis), the top-right quadrant identifies 'High Potential, High Performance' individuals (Stars/Key Succession Candidates) targeted for fast-track leadership."
      },
      {
        id: 2,
        question: "Under the Mercer 3P Compensation Framework, what do the 3 Ps stand for?",
        options: [
          "People, Process, Profitability",
          "Pay for Position, Pay for Person, Pay for Performance",
          "Payroll, Pension, Perks",
          "Planning, Productivity, Promotion"
        ],
        correctAnswer: 1,
        explanation: "The Mercer 3P framework structures total compensation around Pay for Position (job evaluation), Pay for Person (competency and skill proficiency), and Pay for Performance (variable incentives and KPI achievement)."
      },
      {
        id: 3,
        question: "How is the Compa-Ratio (Comparative Ratio) calculated to evaluate compensation competitiveness within an organization?",
        options: [
          "(Annual Base Salary / Total CTC) × 100",
          "(Actual Employee Salary / Midpoint of Salary Band) × 100",
          "(Variable Incentive / Fixed Base Pay) × 100",
          "(Employee Salary / Highest Market Percentile) × 100"
        ],
        correctAnswer: 1,
        explanation: "Compa-Ratio = (Actual Salary / Salary Band Midpoint) × 100. A ratio of 100% signifies exact alignment with market median, below 100% indicates underpayment relative to range midpoint, and above 100% indicates premium placement."
      },
      {
        id: 4,
        question: "According to the Kirkpatrick 4-Level Model for evaluating Learning & Development (L&D), what is evaluated at Level 3?",
        options: [
          "Reaction (Learner satisfaction & engagement feedback)",
          "Learning (Acquisition of knowledge, skills, and attitudes)",
          "Behavior (Application of learning on the actual job/transfer)",
          "Results (Bottom-line business impact, ROI, and KPI changes)"
        ],
        correctAnswer: 2,
        explanation: "Kirkpatrick's 4 levels are: Level 1 - Reaction, Level 2 - Learning, Level 3 - Behavior (measuring on-the-job behavioral changes/transfer of training), and Level 4 - Results (business impact)."
      },
      {
        id: 5,
        question: "Under the Code on Wages 2020 in India, what is the statutory ceiling for allowances in the total compensation structure to prevent wage depression?",
        options: [
          "Allowances cannot exceed 30% of total remuneration",
          "Allowances cannot exceed 50% of total remuneration",
          "Allowances cannot exceed 65% of total remuneration",
          "There is no statutory cap on allowances"
        ],
        correctAnswer: 1,
        explanation: "Under the Code on Wages 2020, if specified allowances exceed 50% of total remuneration, the excess amount is deemed as 'Wages' for computing PF, Gratuity, and other statutory benefits."
      },
      {
        id: 6,
        question: "What does the Recruitment Yield Ratio measure in talent acquisition?",
        options: [
          "The percentage of candidates who clear background verification",
          "The percentage of applicants moving from one stage of the recruitment funnel to the next",
          "The ratio of external hires to internal promotions",
          "The total recruitment budget spent divided by gross hires"
        ],
        correctAnswer: 1,
        explanation: "Yield ratios track recruitment funnel conversion efficiency (e.g., Applicants to Shortlisted, Interviews to Offers Extended, Offers to Joining)."
      },
      {
        id: 7,
        question: "Which of the following describes the 'Halo Effect' cognitive bias during a structured performance appraisal interview?",
        options: [
          "Rating an employee harshly based on their single recent mistake right before review cycle",
          "Allowing one exceptionally positive characteristic or accomplishment to positively inflate ratings across all competencies",
          "Rating all employees as average to avoid conflict",
          "Evaluating an employee favorably because they share similar educational or regional backgrounds"
        ],
        correctAnswer: 1,
        explanation: "The Halo Effect occurs when a manager's positive perception of one trait (e.g., charismatic communication) unduly elevates ratings across unrelated dimensions (e.g., technical execution, compliance)."
      },
      {
        id: 8,
        question: "In predictive HR analytics, which statistical modeling technique is most commonly used to predict employee voluntary attrition probability (0 or 1)?",
        options: [
          "Simple Linear Regression",
          "Binary Logistic Regression / Random Forest Classifier",
          "Time Series ARIMA Forecasting",
          "Principal Component Analysis without target labels"
        ],
        correctAnswer: 1,
        explanation: "Binary Logistic Regression models the log-odds of a binary categorical event (Attrition: Yes/No = 1/0) using predictors like tenure, compensation compa-ratio, manager changes, and promotion velocity."
      },
      {
        id: 9,
        question: "What is the primary objective of a 'Broadbanding' salary structure in modern agile organizations?",
        options: [
          "To enforce rigid 20-grade hierarchical pay scales",
          "To collapse numerous narrow salary grades into fewer, wider pay bands for career flexibility",
          "To eliminate all variable incentive pay",
          "To mandate identical pay across all regional office tiers"
        ],
        correctAnswer: 1,
        explanation: "Broadbanding reduces bureaucratic pay grades into fewer, expansive bands (e.g., Band 1: Associate to Senior Associate), facilitating cross-functional lateral moves without requiring formal title promotions."
      },
      {
        id: 10,
        question: "Under the POSH Act 2013 in India, an Internal Committee (IC) must be constituted by any workplace employing at least how many employees?",
        options: [
          "5 or more employees",
          "10 or more employees",
          "20 or more employees",
          "50 or more employees"
        ],
        correctAnswer: 1,
        explanation: "Section 4 of the Prevention of Sexual Harassment (POSH) Act, 2013 mandates that every employer with 10 or more employees must constitute an Internal Committee (IC) headed by a senior female presiding officer."
      },
      {
        id: 11,
        question: "In the context of Organizational Development, what are the three stages of Kurt Lewin's classic Change Management Model?",
        options: [
          "Initiate, Execute, Terminate",
          "Unfreeze, Change (Transition), Refreeze",
          "Plan, Do, Check, Act",
          "Diagnose, Prescribe, Intervene"
        ],
        correctAnswer: 1,
        explanation: "Lewin's 3-stage model consists of Unfreezing (breaking existing inertia and creating urgency), Changing/Transition (implementing new processes and behaviors), and Refreezing (institutionalizing changes into culture)."
      },
      {
        id: 12,
        question: "What does employee 'eNPS' (Employee Net Promoter Score) measure, and what is its formula?",
        options: [
          "Percentage of Promoters minus Percentage of Detractors on willingness to recommend the company as a great place to work",
          "Average performance rating divided by annual retention rate",
          "Total headcount multiplied by engagement index score",
          "Number of internal referrals divided by total vacancies"
        ],
        correctAnswer: 0,
        explanation: "eNPS = % Promoters (scores 9-10) minus % Detractors (scores 0-6) on the single standard question: 'On a scale of 0 to 10, how likely are you to recommend our organization as a place to work?'"
      },
      {
        id: 13,
        question: "The Hay Group Guide Chart-Profile Method evaluates jobs across which three core universal factors?",
        options: [
          "Attendance, Punctuality, Loyalty",
          "Know-How, Problem Solving, Accountability",
          "Age, Seniority, Academic Degree",
          "Revenue Contribution, Budget Size, Team Count"
        ],
        correctAnswer: 1,
        explanation: "The Hay Job Evaluation methodology objectively benchmarks organizational roles across Know-How (practical/technical skills), Problem Solving (analytical thinking within context), and Accountability (discretionary impact)."
      },
      {
        id: 14,
        question: "What is an Assessment Centre primarily used for in strategic talent management?",
        options: [
          "Conducting online multiple-choice knowledge quizzes",
          "Evaluating multiple candidates across standardized behavioral simulations, case presentations, and role-plays with multiple trained assessors",
          "Automating monthly payroll calculations",
          "Conducting exit interviews for departing employees"
        ],
        correctAnswer: 1,
        explanation: "Assessment Centers deploy multiple standardized behavioral exercises (in-basket tests, leaderless group discussions, business simulations) evaluated by multiple trained raters to measure leadership competencies."
      },
      {
        id: 15,
        question: "How is the 'Cost-per-Hire' (CPH) calculated based on ISO/ANSI HR benchmarking standards?",
        options: [
          "(Total Internal Recruiting Costs + Total External Recruiting Costs) / Total Number of Hires in a given period",
          "Total Annual Payroll / Total Headcount",
          "Average First-Year Base Salary of newly joined employees",
          "Agency placement commission percentage divided by tenure"
        ],
        correctAnswer: 0,
        explanation: "CPH = (Internal Costs like recruiter salaries and interview time + External Costs like job board ads, headhunter fees, and campus recruitment drives) / Total Hires."
      },
      {
        id: 16,
        question: "In behavioral competency modeling, what does the 'STAR' interviewing technique stand for?",
        options: [
          "Skills, Tasks, Aptitude, Readiness",
          "Situation, Task, Action, Result",
          "Strategy, Timeline, Allocation, Return",
          "Standard, Target, Assessment, Review"
        ],
        correctAnswer: 1,
        explanation: "The STAR methodology structures competency questions by probing candidate's past behavior: Situation (context), Task (objective/challenge), Action (specific steps taken), and Result (measurable outcome)."
      },
      {
        id: 17,
        question: "What is the key difference between a 'Job Description' (JD) and a 'Job Specification' (JS)?",
        options: [
          "JD is for white-collar jobs, while JS is strictly for factory labor",
          "JD describes tasks, duties, and responsibilities of the role; JS outlines qualifications, skills, and behavioral attributes required from the human candidate",
          "JD defines compensation bands, while JS outlines company history",
          "There is no difference; they are interchangeable legal terms"
        ],
        correctAnswer: 1,
        explanation: "Job Description (JD) focuses on the job duties, reporting hierarchy, and working conditions. Job Specification (JS) focuses on the person profile: minimum education, experience, technical proficiencies, and competencies."
      },
      {
        id: 18,
        question: "Under the Industrial Disputes Act (and Industrial Relations Code 2020), what is the threshold of workers above which an establishment requires prior government permission before retrenchment or lay-off?",
        options: [
          "50 workers",
          "100 workers (raised to 300 under new Code)",
          "500 workers",
          "1000 workers"
        ],
        correctAnswer: 1,
        explanation: "Under the classic Industrial Disputes Act 1947, Chapter V-B applied to establishments with 100+ workers. The Industrial Relations Code 2020 updated this threshold to 300 workers for seeking prior government permission."
      },
      {
        id: 19,
        question: "In compensation design, what is an 'ESOP Cliff' period?",
        options: [
          "The maximum date by which vested options must be exercised before expiry",
          "The mandatory minimum waiting period (typically 1 year) before the first tranche of stock options begins vesting",
          "The discount percentage offered on market strike price",
          "The buyback penalty imposed if an executive resigns"
        ],
        correctAnswer: 1,
        explanation: "An ESOP Cliff is the minimum initial qualifying service period (standard 12 months) before an employee earns the legal right to vest any portion of their granted employee stock option pool."
      },
      {
        id: 20,
        question: "What does 'Human Resource Accounting' (HRA) seek to quantify in corporate financial reporting?",
        options: [
          "Total administrative expenses incurred by the HR department",
          "The economic valuation and capitalized asset worth of an organization's human capital investment",
          "TDS deductions on monthly executive salary slips",
          "Overtime claims submitted by factory labor"
        ],
        correctAnswer: 1,
        explanation: "Human Resource Accounting (pioneered by Flamholtz and Likert) treats human capital as valuable intellectual assets rather than mere operating expenses, measuring investments in recruitment, training, and replacement value."
      }
    ]
  },

  // =========================================================================
  // 2. FINANCE & CORPORATE BANKING - 20 High-Yield MBA Questions
  // =========================================================================
  {
    id: "finance",
    name: "MBA Finance, Corporate Valuation & Investment Banking",
    shortTitle: "Finance",
    category: "Core MBA",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    accentColor: "from-amber-500 to-yellow-600",
    iconName: "TrendingUp",
    certificateTitle: "Executive Certification in Corporate Finance, Valuation & Investment Banking",
    description: "Evaluates proficiency in DCF Valuation, WACC, Capital Budgeting, Financial Statement Modeling (3-Statement), M&A accretion/dilution, CAPM, and Derivatives Risk Management.",
    avgSalary: "₹15 - 32 LPA",
    topRecruiters: ["Goldman Sachs", "JP Morgan", "Morgan Stanley", "Nomura", "Barclays", "Kotak Mahindra Capital", "ICICI Securities"],
    keyCompetencies: [
      "DCF, LBO & Relative Enterprise Valuation",
      "WACC & Capital Structure (MM Propositions)",
      "3-Statement Integrated Financial Modeling",
      "Portfolio Theory & CAPM Beta Unlevering",
      "Derivatives, Swaps & FX Hedging"
    ],
    syllabus: [
      "Free Cash Flow to Firm (FCFF) vs FCFE Modeling",
      "Cost of Capital (Ke, Kd & Tax Shield Optimization)",
      "M&A Synergy Valuation & Accretion/Dilution Analysis",
      "DuPont 5-Step Return on Equity (ROE) Decomposition",
      "Working Capital Cash Conversion Cycle (CCC) & Liquidity"
    ],
    passingScore: 12.0,
    totalQuestions: 20,
    timeLimitMinutes: 25,
    negativeMarking: 0.33,
    questions: [
      {
        id: 1,
        question: "In a Discounted Cash Flow (DCF) model, which discount rate must be applied to Free Cash Flow to Firm (FCFF)?",
        options: [
          "Cost of Equity (Ke) derived via CAPM",
          "Weighted Average Cost of Capital (WACC)",
          "Pre-Tax Cost of Debt (Kd)",
          "Risk-Free Treasury Bond Yield (Rf)"
        ],
        correctAnswer: 1,
        explanation: "FCFF represents un-levered cash flows available to all capital providers (equity holders + debt holders). Therefore, it must be discounted using the blended Weighted Average Cost of Capital (WACC)."
      },
      {
        id: 2,
        question: "How is Enterprise Value (EV) calculated starting from Equity Value (Market Capitalization)?",
        options: [
          "EV = Market Cap + Total Debt + Minority Interest + Preferred Stock - Cash & Cash Equivalents",
          "EV = Market Cap - Total Debt + Cash & Cash Equivalents",
          "EV = Market Cap + EBITDA - Working Capital",
          "EV = Total Assets - Total Liabilities"
        ],
        correctAnswer: 0,
        explanation: "Enterprise Value reflects the total operational value of a company: Equity Value + Net Debt (Total Debt - Cash & Cash Equivalents) + Minority Interest + Preferred Stock."
      },
      {
        id: 3,
        question: "What happens to the Beta (β) of a firm when it increases its financial leverage (Debt/Equity ratio), assuming asset risk is constant?",
        options: [
          "Equity Beta decreases due to tax deductions",
          "Equity Beta increases according to the Hamada equation",
          "Equity Beta remains unchanged because operational risk is constant",
          "Equity Beta becomes negative"
        ],
        correctAnswer: 1,
        explanation: "By Hamada's Equation: βL = βU × [1 + (1 - T) × (D/E)]. Increasing financial debt (D/E) amplifies the financial risk borne by equity holders, systematically increasing the Levered Beta (βL)."
      },
      {
        id: 4,
        question: "In the 5-Step Extended DuPont Analysis, what are the five decomposed components of Return on Equity (ROE)?",
        options: [
          "Revenue, COGS, Gross Profit, Operating Expenses, Net Income",
          "Tax Burden × Interest Burden × Operating Margin × Asset Turnover × Financial Leverage",
          "Current Ratio × Quick Ratio × Debt-to-Equity × WACC × Beta",
          "EBITDA × PE Multiple × Price-to-Book × Dividend Yield × Payout"
        ],
        correctAnswer: 1,
        explanation: "Extended 5-Step DuPont breaks ROE into: (Net Income/EBT) × (EBT/EBIT) × (EBIT/Sales) × (Sales/Assets) × (Assets/Equity), isolating tax efficiency, interest burden, operating profitability, asset efficiency, and financial leverage."
      },
      {
        id: 5,
        question: "Under the Capital Asset Pricing Model (CAPM), what is the formula for calculating the Expected Return on Equity [E(Re)]?",
        options: [
          "E(Re) = Rf + β × [E(Rm) - Rf]",
          "E(Re) = Rf + [E(Rm) / β]",
          "E(Re) = Dividends / Share Price + Growth Rate",
          "E(Re) = WACC × (1 - Tax Rate)"
        ],
        correctAnswer: 0,
        explanation: "CAPM states: Expected Return = Risk-Free Rate (Rf) + Equity Beta (β) × Equity Risk Premium [E(Rm) - Rf]."
      },
      {
        id: 6,
        question: "How is the Cash Conversion Cycle (CCC) calculated in working capital management?",
        options: [
          "Days Sales Outstanding (DSO) + Days Inventory Outstanding (DIO) - Days Payable Outstanding (DPO)",
          "DSO - DIO + DPO",
          "Current Assets / Current Liabilities",
          "Net Income / Average Working Capital"
        ],
        correctAnswer: 0,
        explanation: "CCC = DSO (days to collect receivables) + DIO (days inventory sits on shelf) - DPO (days to pay suppliers). A lower or negative CCC implies superior operational liquidity."
      },
      {
        id: 7,
        question: "In an M&A transaction, when is an acquisition considered 'Accretive' to the buyer's Earnings Per Share (EPS)?",
        options: [
          "When the Target company's P/E ratio is lower than the Acquirer's P/E ratio in an all-stock deal",
          "When the Target company has higher revenue than the Acquirer",
          "When the Acquirer pays a 50% cash premium over target share price",
          "When the post-merger net debt increases by more than 20%"
        ],
        correctAnswer: 0,
        explanation: "In an all-stock transaction, an acquisition is accretive (post-deal EPS > pre-deal EPS) when the Acquirer trades at a higher P/E multiple than the Target (i.e., Target P/E < Acquirer P/E)."
      },
      {
        id: 8,
        question: "According to the Modigliani-Miller Theorem with Corporate Taxes (Proposition II), what is the impact of higher debt on the firm's WACC?",
        options: [
          "WACC increases monotonically due to bankruptcy hazard",
          "WACC decreases continuously as leverage rises due to the interest tax shield",
          "WACC remains strictly constant regardless of tax shields",
          "WACC drops to zero immediately when debt exceeds equity"
        ],
        correctAnswer: 1,
        explanation: "With corporate taxes and no bankruptcy costs, interest on debt is tax-deductible, creating an interest tax shield (T × Debt) that systematically lowers the blended WACC as debt leverage increases."
      },
      {
        id: 9,
        question: "What is the primary difference between Free Cash Flow to Firm (FCFF) and Free Cash Flow to Equity (FCFE)?",
        options: [
          "FCFF includes dividend payments, while FCFE excludes them",
          "FCFF is before debt service (EBIT × (1-T)), whereas FCFE is calculated after interest payments and net debt borrowings/repayments",
          "FCFE is always larger than FCFF for a levered firm",
          "There is no difference in unlevered entities"
        ],
        correctAnswer: 1,
        explanation: "FCFF = EBIT(1-T) + D&A - Capex - ΔNWC (available to debt + equity holders). FCFE = Net Income + D&A - Capex - ΔNWC + Net Borrowing (available exclusively to common shareholders)."
      },
      {
        id: 10,
        question: "When evaluating mutually exclusive capital projects with unequal lifespans, which capital budgeting metric is best suited to compare them?",
        options: [
          "Standard Internal Rate of Return (IRR)",
          "Equivalent Annual Annuity (EAA) or Replacement Chain Method",
          "Payback Period",
          "Accounting Rate of Return (ARR)"
        ],
        correctAnswer: 1,
        explanation: "Equivalent Annual Annuity (EAA) converts the project's total NPV into an annualized constant cash flow over its specific economic life, enabling objective comparison across unequal horizons."
      },
      {
        id: 11,
        question: "What does the 'Yield Curve Inversion' (e.g., 2-Year US Treasury yield exceeding 10-Year Treasury yield) historically indicate?",
        options: [
          "A rapid impending economic boom and runaway GDP growth",
          "A market signal predicting an impending macroeconomic slowdown or recession",
          "Immediate hyperinflation in commodity markets",
          "A sudden collapse in corporate tax rates"
        ],
        correctAnswer: 1,
        explanation: "An inverted yield curve reflects investor expectations of future central bank rate cuts and slower economic growth, serving as one of the most reliable leading indicators of economic recession."
      },
      {
        id: 12,
        question: "In Options Pricing, what does the Greek 'Delta' (Δ) measure?",
        options: [
          "The rate of change of option price with respect to changes in the underlying asset's price",
          "The rate of change of option price with respect to time decay (Theta)",
          "The sensitivity of Delta to underlying asset price movements (Gamma)",
          "The sensitivity of option price to changes in implied volatility (Vega)"
        ],
        correctAnswer: 0,
        explanation: "Delta (Δ) measures the expected change in option premium for a $1/₹1 move in the underlying asset price (ranging from 0 to +1 for call options and 0 to -1 for put options)."
      },
      {
        id: 13,
        question: "How does a ₹100 increase in Depreciation expense affect the 3 financial statements assuming a 30% corporate tax rate?",
        options: [
          "Net Income down ₹70; Operating Cash Flow up ₹30; Cash up ₹30 and PP&E down ₹100 on Balance Sheet",
          "Net Income down ₹100; Cash down ₹30; PP&E down ₹100",
          "Net Income up ₹30; Cash unchanged; PP&E down ₹100",
          "Operating Cash Flow down ₹70; Net Income up ₹100"
        ],
        correctAnswer: 0,
        explanation: "Income Statement: Operating Income drops ₹100, Net Income drops ₹70 (due to 30% tax savings). Cash Flow: Net Income -₹70 + Non-cash Depr +₹100 = Cash Flow from Ops +₹30. Balance Sheet: Cash +₹30, PP&E -₹100 (Total Assets -₹70), Retained Earnings -₹70 (Balanced)."
      },
      {
        id: 14,
        question: "What is the key limitation of Internal Rate of Return (IRR) when evaluating non-conventional cash flow streams (cash flows changing signs multiple times)?",
        options: [
          "IRR cannot be computed in Excel",
          "It can produce Multiple IRRs or no real mathematical solution",
          "IRR always underestimates project profitability compared to Payback",
          "IRR automatically assumes zero reinvestment rate"
        ],
        correctAnswer: 1,
        explanation: "Descartes' Rule of Signs dictates that if cash flows change algebraic sign more than once (e.g., - + -), polynomial equations yield multiple internal rates of return, making NPV the superior decision criterion."
      },
      {
        id: 15,
        question: "What is an 'Interest Rate Swap' (IRS) primarily used for by corporate treasuries?",
        options: [
          "To exchange fixed-rate interest cash flows for floating-rate (e.g., SOFR/MIBOR) cash flows without exchanging principal",
          "To swap equity shares for corporate debentures",
          "To eliminate foreign currency translation risk on exports",
          "To bypass central bank reserve repo requirements"
        ],
        correctAnswer: 0,
        explanation: "An Interest Rate Swap is a derivative contract where two parties exchange interest rate cash flows based on a specified notional principal to hedge interest rate volatility or optimize funding costs."
      },
      {
        id: 16,
        question: "In valuation multiples, why is EV/EBITDA preferred over Price/Earnings (P/E) when comparing companies with vastly different debt structures or capital intensity?",
        options: [
          "P/E is always negative for profitable companies",
          "EV/EBITDA is capital-structure neutral and independent of debt leverage, depreciation policies, and tax jurisdictions",
          "EBITDA includes non-operating investment gains",
          "EV/EBITDA cannot be distorted by inventory valuation"
        ],
        correctAnswer: 1,
        explanation: "EV/EBITDA evaluates core operational enterprise earnings before the distortions of interest expenses (capital structure/leverage), tax regimes, and non-cash depreciation accounting conventions."
      },
      {
        id: 17,
        question: "What is the primary condition for an asset market to satisfy 'Semi-Strong Form' Market Efficiency under the Efficient Market Hypothesis (EMH)?",
        options: [
          "Stock prices reflect only past historical price and trading volume data",
          "Stock prices rapidly and accurately incorporate all publicly available information (financial statements, news, macroeconomic data)",
          "Stock prices reflect even private, confidential insider information",
          "Technical analysis consistently generates abnormal alpha returns"
        ],
        correctAnswer: 1,
        explanation: "Semi-Strong EMH asserts that all publicly available information is instantaneously priced into securities, rendering fundamental financial statement analysis incapable of generating sustained risk-adjusted alpha."
      },
      {
        id: 18,
        question: "How is the 'Gordon Growth Model' terminal value calculated in a multi-stage DCF model?",
        options: [
          "Terminal Value = [FCFF(n+1)] / (WACC - g)",
          "Terminal Value = FCFF(n) × WACC × g",
          "Terminal Value = Net Income / (Cost of Debt + g)",
          "Terminal Value = Total Assets × Terminal EBITDA Multiple"
        ],
        correctAnswer: 0,
        explanation: "Gordon Growth Terminal Value = [FCFF at year n × (1 + g)] / (WACC - g), where g is the perpetual terminal growth rate (which cannot exceed long-term GDP growth)."
      },
      {
        id: 19,
        question: "What is 'Debt Service Coverage Ratio' (DSCR) and why do commercial banks monitor it before sanctioning term loans?",
        options: [
          "DSCR = (Net Operating Income / Total Debt Service); it measures the firm's operational capacity to service interest and principal debt obligations",
          "DSCR = (Total Debt / Equity); it measures leverage",
          "DSCR = (Cash / Current Liabilities); it measures quick liquidity",
          "DSCR = (Gross Revenue / Annual Interest); it measures margin buffer"
        ],
        correctAnswer: 0,
        explanation: "DSCR = Net Operating Income / (Principal Repayments + Interest). A DSCR > 1.5 indicates sufficient operating cash buffer to comfortably service debt covenants without default risk."
      },
      {
        id: 20,
        question: "In credit risk modeling, what does the Altman Z-Score formula predict?",
        options: [
          "The probability of corporate bankruptcy / insolvency within 2 years",
          "The exact daily stock return volatility",
          "The fair value price of convertible bonds",
          "The optimal dividend payout ratio"
        ],
        correctAnswer: 0,
        explanation: "Edward Altman's Z-Score is a multivariate linear discriminant formula combining working capital, retained earnings, EBIT, equity market value, and sales ratios to predict financial distress/bankruptcy likelihood."
      }
    ]
  },

  // =========================================================================
  // 3. MARKETING MANAGEMENT - 20 High-Yield MBA Questions
  // =========================================================================
  {
    id: "marketing",
    name: "MBA Strategic Marketing & Brand Leadership",
    shortTitle: "Marketing",
    category: "Core MBA",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    accentColor: "from-blue-500 to-cyan-600",
    iconName: "Megaphone",
    certificateTitle: "Executive Certification in Strategic Marketing & Brand Management",
    description: "Evaluates mastery in Brand Equity (Keller's CBBE), STP Framework, CLV/CAC Economics, Van Westendorp Pricing, Ansoff Growth Matrix, and Omnichannel FMCG Go-to-Market.",
    avgSalary: "₹14 - 28 LPA",
    topRecruiters: ["HUL", "Procter & Gamble", "Nestlé", "Marico", "Mondelez", "ITC", "PepsiCo", "L'Oréal"],
    keyCompetencies: [
      "Brand Equity & Keller's CBBE Pyramid",
      "STP Framework & Behavioral Segmentation",
      "Pricing Strategies (Van Westendorp & Skimming)",
      "Customer Lifetime Value (CLV) Modeling",
      "Omnichannel FMCG Route-to-Market (RTM)"
    ],
    syllabus: [
      "Customer-Based Brand Equity (Salience, Resonance & Imagery)",
      "Segment Attractiveness & Positioning Maps (Perceptual Mapping)",
      "Ansoff Matrix & BCG Growth-Share Portfolio Dynamics",
      "Price Elasticity of Demand & Trade Promotion Margins",
      "Consumer Decision Journey (CDJ) & Omnichannel Touchpoints"
    ],
    passingScore: 12.0,
    totalQuestions: 20,
    timeLimitMinutes: 25,
    negativeMarking: 0.33,
    questions: [
      {
        id: 1,
        question: "At the pinnacle (top level) of Kevin Lane Keller's Customer-Based Brand Equity (CBBE) Pyramid, what exists?",
        options: [
          "Brand Salience (Awareness)",
          "Brand Performance & Imagery",
          "Brand Judgments & Feelings",
          "Brand Resonance (Active loyalty, attachment, and community)"
        ],
        correctAnswer: 3,
        explanation: "Keller's CBBE pyramid ascends from Salience (Identity) -> Performance/Imagery (Meaning) -> Judgments/Feelings (Response) -> Brand Resonance (intense psychological bond, community, and active repeat advocacy)."
      },
      {
        id: 2,
        question: "How is Customer Lifetime Value (CLV) fundamentally calculated for a subscription or recurring business?",
        options: [
          "CLV = (Average Order Value × Purchase Frequency × Gross Margin %) / Churn Rate",
          "CLV = Total Marketing Budget / Total New Leads",
          "CLV = Gross Revenue × Total Customers",
          "CLV = Customer Acquisition Cost × Return on Ad Spend"
        ],
        correctAnswer: 0,
        explanation: "CLV = (Average Revenue Per User × Gross Margin %) / Churn Rate. A healthy unit economic benchmark requires CLV : CAC to exceed 3:1."
      },
      {
        id: 3,
        question: "In the Ansoff Matrix, which growth strategy involves selling existing products into completely new geographic or demographic markets?",
        options: [
          "Market Penetration",
          "Market Development",
          "Product Development",
          "Conglomerate Diversification"
        ],
        correctAnswer: 1,
        explanation: "The Ansoff Matrix identifies: Existing Product + Existing Market = Market Penetration; Existing Product + New Market = Market Development; New Product + Existing Market = Product Development; New Product + New Market = Diversification."
      },
      {
        id: 4,
        question: "What is the primary purpose of a 'Perceptual Map' (Positioning Map) in strategic marketing?",
        options: [
          "To plot physical GPS distribution warehouse locations",
          "To visually map consumer perceptions of competing brands along two key evaluative purchase dimensions (e.g., Price vs Quality)",
          "To calculate raw inventory turnover in retail outlets",
          "To track social media follower growth month-over-month"
        ],
        correctAnswer: 1,
        explanation: "Perceptual mapping displays the relative positioning of competing brands along dimensions relevant to target consumers (e.g., Taste vs Nutrition, Economy vs Luxury) to identify market whitespace."
      },
      {
        id: 5,
        question: "What is the difference between 'Price Skimming' and 'Penetration Pricing' for a new product launch?",
        options: [
          "Price skimming sets a high initial price to capture consumer surplus from early adopters before lowering it; penetration pricing sets a low initial price to rapidly gain market share",
          "Price skimming is illegal under antitrust laws, while penetration is mandatory",
          "Price skimming is strictly for B2B products, while penetration is for luxury goods",
          "There is no difference in pricing mechanics"
        ],
        correctAnswer: 0,
        explanation: "Price Skimming (e.g., Apple iPhone launches) targets price-insensitive innovators at a premium. Penetration Pricing (e.g., Reliance Jio launch) uses ultra-low prices to build mass scale and lock-in distribution network effects."
      },
      {
        id: 6,
        question: "What does the 'Van Westendorp Price Sensitivity Meter' evaluate through its four survey questions?",
        options: [
          "The acceptable price range, Point of Marginal Cheapness, and Point of Marginal Expensiveness",
          "The exact production cost of goods sold (COGS)",
          "The competitor's wholesale distributor discount structure",
          "The impact of inflation on raw materials"
        ],
        correctAnswer: 0,
        explanation: "Van Westendorp asks consumers 4 questions: At what price is it too cheap (suspicious quality), cheap (bargain), expensive (still consider), and too expensive (out of consideration), determining the Indifference and Optimal Price Points."
      },
      {
        id: 7,
        question: "In FMCG Route-to-Market distribution, what is the role of a 'Super Stockist' or 'C&F (Carrying & Forwarding) Agent'?",
        options: [
          "Selling directly to end retail consumers at MRP",
          "Handling regional warehousing, inventory logistics, and supplying to primary distributors on behalf of the manufacturer",
          "Designing consumer advertising TV commercials",
          "Conducting competitor market research surveys"
        ],
        correctAnswer: 1,
        explanation: "In Indian FMCG distribution: Company -> C&F Agent / Super Stockist (warehousing & consignment) -> Primary Distributor -> Wholesaler/Sub-stockist -> Retailer/Kirana -> End Consumer."
      },
      {
        id: 8,
        question: "In the BCG Growth-Share Matrix, a business unit with High Market Share in a Low-Growth Industry is classified as a:",
        options: [
          "Star",
          "Cash Cow",
          "Question Mark (Problem Child)",
          "Dog"
        ],
        correctAnswer: 1,
        explanation: "Cash Cows generate substantial cash surpluses with minimal reinvestment needs, which corporations harvest to fund Stars and high-potential Question Marks."
      },
      {
        id: 9,
        question: "What does 'Points-of-Parity' (POPs) versus 'Points-of-Difference' (PODs) mean in brand positioning?",
        options: [
          "POPs are mandatory associations required to be considered a legitimate player in the category; PODs are unique, compelling attributes that distinguish the brand from competitors",
          "POPs are retail discounts; PODs are wholesale margins",
          "POPs relate to physical packaging; PODs relate to brand logo colors",
          "POPs are negative reviews; PODs are positive reviews"
        ],
        correctAnswer: 0,
        explanation: "Category POPs represent baseline table-stakes features needed to enter consumer consideration (e.g., a bank app must be secure), whereas PODs are unique brand advantages (e.g., instant 5-second loan sanction)."
      },
      {
        id: 10,
        question: "If the Price Elasticity of Demand for a premium coffee brand is -2.5, what happens to Total Revenue if the price is increased by 10%?",
        options: [
          "Total Revenue will increase by 25%",
          "Total Revenue will decrease because quantity demanded drops by 25% (elastic demand)",
          "Total Revenue remains strictly unchanged",
          "Total Revenue increases by 10%"
        ],
        correctAnswer: 1,
        explanation: "With Price Elasticity of -2.5 (|Ed| > 1, highly elastic), a 10% price hike causes a 25% drop in volume demanded (-2.5 × 10%), resulting in a net decrease in Total Revenue."
      },
      {
        id: 11,
        question: "What does the 'Net Promoter Score' (NPS) methodology classify as 'Passives'?",
        options: [
          "Respondents giving a score of 9 or 10",
          "Respondents giving a score of 7 or 8 (satisfied but unenthusiastic, vulnerable to competitors)",
          "Respondents giving a score of 0 to 6",
          "Customers who have never purchased the brand"
        ],
        correctAnswer: 1,
        explanation: "NPS categorizes respondents into Promoters (9-10), Passives (7-8), and Detractors (0-6). NPS = % Promoters minus % Detractors."
      },
      {
        id: 12,
        question: "In the 7Ps Extended Marketing Mix for Services (Booms & Bitner), what are the 3 additional Ps beyond Product, Price, Place, and Promotion?",
        options: [
          "People, Process, Physical Evidence",
          "Packaging, PR, Profit",
          "Production, Policy, Procurement",
          "Partnerships, Positioning, Platforms"
        ],
        correctAnswer: 0,
        explanation: "Services marketing extends the traditional 4Ps to 7Ps by adding People (service personnel), Process (customer journey delivery flow), and Physical Evidence (tangible cues, ambiances, facilities)."
      },
      {
        id: 13,
        question: "What is 'Cannibalization' in multi-brand portfolio management?",
        options: [
          "Acquiring a hostile competing brand and shutting it down",
          "A situation where a company's newly launched product steals sales and market share from its own existing product line rather than competitors",
          "Exporting counterfeit goods into secondary gray markets",
          "Offering 1+1 free promotional discounts"
        ],
        correctAnswer: 1,
        explanation: "Cannibalization occurs when a new product launch (e.g., Diet Coke) draws volume away from the firm's established core brands (e.g., Classic Coca-Cola) without expanding net category share."
      },
      {
        id: 14,
        question: "In consumer psychology, what is the 'Decoy Effect' (Asymmetric Dominance) in pricing strategy?",
        options: [
          "Pricing items at .99 to seem cheaper",
          "Introducing a third, less attractive option that is completely dominated by one choice to steer consumers toward the higher-margin target option",
          "Matching competitor prices automatically with price guarantees",
          "Offering hidden discount coupons on checkout"
        ],
        correctAnswer: 1,
        explanation: "The Decoy Effect (e.g., Economist Small: $59, Large: $125, Medium Print-only: $120) makes the expensive target option look like immense value by asymmetrically dominating the inferior decoy."
      },
      {
        id: 15,
        question: "What is 'Trade Promotion' versus 'Consumer Promotion' in FMCG marketing?",
        options: [
          "Trade promotion offers margins, display allowances, and volume rebates to retailers/distributors; Consumer promotion offers coupons, contests, and price-offs directly to end shoppers",
          "Trade promotion is strictly digital, while consumer promotion is print only",
          "Trade promotion is for export markets only",
          "There is no distinction in brand budgets"
        ],
        correctAnswer: 0,
        explanation: "Trade Promotions push products through distributor/retailer channels via B2B incentives. Consumer Promotions pull shoppers into stores via direct discounts, BOGO, and sampling."
      },
      {
        id: 16,
        question: "In market research, what is 'Conjoint Analysis' primarily used to determine?",
        options: [
          "How consumers value different individual product attributes and feature trade-offs (e.g., Brand vs Price vs Battery Life)",
          "The annual tax rate for multinational advertising agencies",
          "The physical tensile strength of product packaging",
          "The exact click-through rate on Google banner ads"
        ],
        correctAnswer: 0,
        explanation: "Conjoint Analysis simulates real-world purchase decisions by presenting multi-attribute trade-offs, calculating individual part-worth utilities for pricing, brand name, and feature configurations."
      },
      {
        id: 17,
        question: "What is the 'Line Extension' strategy in brand management?",
        options: [
          "Applying an established brand name to a totally unrelated product category",
          "Introducing new flavors, package sizes, colors, or formulations within an existing product category under the same brand name",
          "Creating an unbranded private label for budget discount stores",
          "Shutting down low-margin production lines"
        ],
        correctAnswer: 1,
        explanation: "Line Extension stays within the current category (e.g., Maggi introduces Atta Noodles or Special Masala). Brand Extension enters new categories (e.g., Maggi introduces Soups or Sauces)."
      },
      {
        id: 18,
        question: "What does 'Share of Voice' (SOV) measure in marketing communications?",
        options: [
          "The brand's advertising spend or media impressions as a percentage of total advertising spend across the entire competitive category",
          "The volume level of audio radio advertisements",
          "The percentage of employees advocating the brand on LinkedIn",
          "The number of customer service phone calls handled"
        ],
        correctAnswer: 0,
        explanation: "SOV = (Brand Ad Spend or Impressions / Total Category Ad Spend) × 100. Empirical marketing research shows that maintaining an Excess Share of Voice (ESOV > Market Share) drives long-term market share growth."
      },
      {
        id: 19,
        question: "In B2B industrial marketing, what is the 'DMU' (Decision Making Unit)?",
        options: [
          "A robotic packaging arm in an automated warehouse",
          "The collection of individuals who participate in the organizational buying decision (Initiator, User, Influencer, Decider, Buyer, Gatekeeper)",
          "A mathematical formula for calculating factory depreciation",
          "The primary distribution truck delivery unit"
        ],
        correctAnswer: 1,
        explanation: "B2B purchasing involves a multi-stakeholder Buying Center / DMU: Initiators, Users (daily operators), Influencers (technical specs), Deciders (financial sign-off), Buyers (contract negotiators), and Gatekeepers."
      },
      {
        id: 20,
        question: "What is 'Category Captaincy' in modern retail and supermarket trade?",
        options: [
          "When a leading manufacturer (e.g., P&G or HUL) collaborates with the retailer to manage and optimize the entire product category's shelf layout and assortment",
          "The senior-most cashier managing billing queues",
          "The single highest-selling SKU in a store",
          "A government inspector enforcing maximum retail prices"
        ],
        correctAnswer: 0,
        explanation: "A Category Captain is an industry-leading vendor trusted by retail chains to design planograms, optimize shelf space, and analyze shopper category analytics for mutual revenue maximization."
      }
    ]
  },

  // =========================================================================
  // 4. DIGITAL MARKETING & GROWTH - 20 High-Yield MBA Questions
  // =========================================================================
  {
    id: "digital-marketing",
    name: "MBA Digital Marketing, Growth & MarTech Analytics",
    shortTitle: "Digital Marketing",
    category: "Emerging Tech MBA",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    accentColor: "from-purple-500 to-indigo-600",
    iconName: "Zap",
    certificateTitle: "Executive Certification in Digital Marketing, Growth Engineering & Performance Media",
    description: "Evaluates expertise in Performance Advertising (Google & Meta Ads), Technical SEO Architecture, GA4 Event Models, ROAS/CAC Economics, Attribution Modeling, and CRM Automation.",
    avgSalary: "₹12 - 25 LPA",
    topRecruiters: ["Amazon", "Google", "Flipkart", "Nykaa", "Zomato", "Swiggy", "Performics", "GroupM"],
    keyCompetencies: [
      "Performance Media & ROAS Optimization",
      "Technical SEO & Crawl Budget Architecture",
      "GA4 Event Schema & Funnel Analytics",
      "Multi-Touch Attribution Modeling",
      "Marketing Automation & RFM CRM Retention"
    ],
    syllabus: [
      "Auction Bidding (tCPA, tROAS & Quality Score Mechanics)",
      "Technical Search & Semantic Structured Data (JSON-LD)",
      "Data-Driven Attribution vs Last-Non-Direct Click",
      "Conversion Rate Optimization (CRO) & A/B Testing Significance",
      "Customer Data Platforms (CDP) & Lifecycle Retention Funnels"
    ],
    passingScore: 12.0,
    totalQuestions: 20,
    timeLimitMinutes: 25,
    negativeMarking: 0.33,
    questions: [
      {
        id: 1,
        question: "In Google Search Ads auctions, what components determine the 'Ad Rank' formula?",
        options: [
          "Ad Rank = Max CPC Bid × Quality Score (+ expected impact of ad assets/extensions)",
          "Ad Rank = Total Monthly Budget divided by Website Page Speed",
          "Ad Rank = Number of Organic Backlinks × Domain Authority",
          "Ad Rank = Historical CTR only"
        ],
        correctAnswer: 0,
        explanation: "Google determines Search position via Ad Rank = f(Max CPC Bid, Quality Score [comprising Expected CTR, Ad Relevance, and Landing Page Experience], and Ad Extensions Impact)."
      },
      {
        id: 2,
        question: "How is 'ROAS' (Return on Ad Spend) calculated in performance marketing campaigns?",
        options: [
          "ROAS = (Total Revenue Generated from Ads / Total Ad Spend)",
          "ROAS = (Net Profit - Ad Spend) / Impressions",
          "ROAS = (Click Through Rate / Cost Per Click) × 100",
          "ROAS = (Customer Lifetime Value / Total Leads)"
        ],
        correctAnswer: 0,
        explanation: "ROAS = Gross Revenue Generated from Ads / Ad Spend. For instance, generating ₹5,00,000 revenue on a ₹1,00,000 ad spend yields a 5.0x (or 500%) ROAS."
      },
      {
        id: 3,
        question: "What is the primary difference between Google Universal Analytics (UA) and Google Analytics 4 (GA4)?",
        options: [
          "UA was based on sessions and pageviews, whereas GA4 uses a flexible, event-based data model tracking cross-platform interactions",
          "GA4 only tracks mobile apps and cannot track web domains",
          "UA had no cookies, while GA4 requires third-party tracking cookies for all events",
          "GA4 completely removes conversion tracking"
        ],
        correctAnswer: 0,
        explanation: "GA4 replaced UA's legacy session/hit model with an event-driven paradigm where every interaction (page_view, scroll, click, purchase) is recorded as an independent event with customizable parameters."
      },
      {
        id: 4,
        question: "In Technical SEO, what is the primary purpose of a 'Canonical Tag' (rel=\"canonical\")?",
        options: [
          "To block search engine crawlers from indexing the entire website",
          "To tell search engines which URL represents the authoritative master version when duplicate or near-identical content exists across multiple URLs",
          "To speed up CSS stylesheet rendering on mobile devices",
          "To automatically generate Google Sitelinks in search results"
        ],
        correctAnswer: 1,
        explanation: "Canonical tags prevent duplicate content dilution (e.g., parameterized sorting/filter URLs) by explicitly directing search bots to the singular master URL for ranking consolidation."
      },
      {
        id: 5,
        question: "In Multi-Touch Attribution, why is 'Last-Click Attribution' often criticized for misallocating marketing budgets?",
        options: [
          "It assigns 100% of conversion credit to the final touchpoint, ignoring top-of-funnel awareness channels like Display, Video, and Upper-Funnel Search",
          "It over-rewards TV commercials at the expense of email newsletters",
          "It calculates negative conversion rates for organic search",
          "It cannot be measured in digital analytics platforms"
        ],
        correctAnswer: 0,
        explanation: "Last-Click ignores upper and middle-funnel discovery channels that introduced the brand to the user, falsely giving all credit to branded search or direct navigation touchpoints."
      },
      {
        id: 6,
        question: "In A/B testing for Conversion Rate Optimization (CRO), what does reaching a 95% 'Statistical Significance' (p-value < 0.05) mean?",
        options: [
          "There is a 95% conversion rate on the landing page",
          "There is less than a 5% probability that the observed performance difference between Variant A and Variant B occurred purely by random chance",
          "95% of test visitors completed a purchase",
          "The test has been running for 95 consecutive days"
        ],
        correctAnswer: 1,
        explanation: "A p-value < 0.05 indicates strong evidence against the null hypothesis, meaning there is less than a 5% chance the observed conversion uplift was a random statistical fluke."
      },
      {
        id: 7,
        question: "What does the 'Robots.txt' file accomplish for web search engine spiders?",
        options: [
          "It provides instructions to web crawlers regarding which URL paths they are disallowed or permitted to crawl",
          "It encrypts user credit card transactions with SSL",
          "It translates web page text into multiple foreign languages",
          "It enforces password security on user login pages"
        ],
        correctAnswer: 0,
        explanation: "Robots.txt specifies crawling rules using Disallow/Allow directives to manage crawl budget and prevent search engine bots from scraping private server directories."
      },
      {
        id: 8,
        question: "In Meta Ads (Facebook/Instagram), what is the function of a 'Lookalike Audience' (LAL)?",
        options: [
          "Targeting people who have identical usernames to existing customers",
          "Using machine learning to find new users whose demographic and behavioral patterns closely mirror a high-value custom source seed audience (e.g., top 10% lifetime spenders)",
          "Re-targeting visitors who abandoned their shopping cart in the last 24 hours",
          "Sending direct WhatsApp messages to competitor followers"
        ],
        correctAnswer: 1,
        explanation: "Lookalike Audiences leverage Meta's graph algorithms to identify prospective users in a target country who share deep behavioral and intent similarities with your seed customer list."
      },
      {
        id: 9,
        question: "In Email Marketing, what is the difference between 'Hard Bounce' and 'Soft Bounce'?",
        options: [
          "Hard bounce is a permanent delivery failure (e.g., invalid/non-existent email address); soft bounce is a temporary delivery failure (e.g., full mailbox or server timeout)",
          "Hard bounce is from corporate domains, soft bounce is from Gmail",
          "Hard bounce means the user marked spam, soft bounce means they opened it",
          "There is no difference in email deliverability metrics"
        ],
        correctAnswer: 0,
        explanation: "Hard bounces indicate permanent delivery issues and should be pruned immediately to protect sender IP reputation. Soft bounces are temporary server glitches that can be retried."
      },
      {
        id: 10,
        question: "What are Google's 'Core Web Vitals' metrics focused on evaluating for user experience and SEO ranking?",
        options: [
          "Total Word Count, Keyword Density, and Meta Description Length",
          "LCP (Largest Contentful Paint), INP (Interaction to Next Paint), and CLS (Cumulative Layout Shift)",
          "Domain Age, Alexa Rank, and Server IP Address",
          "Number of outbound affiliate links"
        ],
        correctAnswer: 1,
        explanation: "Google's Core Web Vitals measure loading speed (LCP < 2.5s), interactive responsiveness (INP < 200ms), and visual stability (CLS < 0.1)."
      },
      {
        id: 11,
        question: "What is 'Programmatic Advertising' and how does 'Real-Time Bidding' (RTB) operate within it?",
        options: [
          "Manual telephone negotiation of billboard hoardings",
          "Automated, algorithmic buying and selling of digital ad impressions in millisecond auctions across Ad Exchanges, DSPs, and SSPs as a web page loads",
          "Printing physical coupon codes in newspapers",
          "Writing custom code for email HTML templates"
        ],
        correctAnswer: 1,
        explanation: "Programmatic RTB executes instant auctions via Demand Side Platforms (DSPs) bidding on Supply Side Platform (SSP) inventory across ad networks in under 100 milliseconds."
      },
      {
        id: 12,
        question: "What is 'RFM Segmentation' used for in CRM and Lifecycle Marketing?",
        options: [
          "Reach, Frequency, Monetization for TV broadcast ads",
          "Recency, Frequency, Monetary value analysis to segment customers into Champions, Loyalists, At-Risk, and Churned cohorts",
          "Radio Frequency Modulation for wireless beacons",
          "Return on Fixed Marketing for budget audits"
        ],
        correctAnswer: 1,
        explanation: "RFM scoring evaluates how recently a customer purchased (R), how often they buy (F), and how much they spend (M) to design personalized re-engagement CRM campaigns."
      },
      {
        id: 13,
        question: "What does 'Target CPA' (tCPA) bidding strategy in Google Ads do?",
        options: [
          "It guarantees that every website visitor will make a purchase",
          "It uses Smart Bidding algorithms to automatically set auction bids to capture as many conversions as possible at or near the target cost-per-action specified",
          "It keeps cost-per-click strictly at zero",
          "It only bids on competitors' branded keywords"
        ],
        correctAnswer: 1,
        explanation: "tCPA uses auction-time machine learning signals (device, location, intent, time of day) to modulate bids dynamically aiming to achieve the advertiser's target acquisition cost."
      },
      {
        id: 14,
        question: "In Content Marketing, what does the 'Pillar-Cluster' (Topic Cluster) SEO model involve?",
        options: [
          "Publishing duplicate blog articles with single keyword variations",
          "Creating a comprehensive core Pillar Page on a broad topic hyperlinked to multiple detailed sub-topic Cluster articles forming a strong semantic internal linking network",
          "Hiding keyword text in white font on a white background",
          "Purchasing automated backlinks from link farms"
        ],
        correctAnswer: 1,
        explanation: "The Topic Cluster model organizes website architecture into authoritative hub Pillar pages interlinked symmetrically with supporting cluster posts to signal deep topical authority to search engines."
      },
      {
        id: 15,
        question: "What is 'Schema Markup' (JSON-LD structured data) on web pages?",
        options: [
          "A standardized code vocabulary that helps search engines understand page context and generate Rich Snippets (e.g., star ratings, FAQs, product prices, breadcrumbs)",
          "A JavaScript library for tracking mouse cursor heatmaps",
          "A firewall that blocks distributed denial of service (DDoS) attacks",
          "A styling framework to replace CSS"
        ],
        correctAnswer: 0,
        explanation: "Schema.org structured data (embedded as JSON-LD) provides explicit semantic clues to search engines to render rich SERP enhancements (FAQ accordions, star reviews, product prices)."
      },
      {
        id: 16,
        question: "How is 'Blended CAC' (Customer Acquisition Cost) calculated for a high-growth D2C startup?",
        options: [
          "Blended CAC = Total Marketing & Sales Expenses (Paid Ads + Salaries + Tools + Agencies) / Total New Customers Acquired across ALL channels (Organic + Paid)",
          "Blended CAC = Ad Spend on Google Ads / Paid Google Conversions",
          "Blended CAC = Total Revenue / Total Visits",
          "Blended CAC = Average Order Value × Repeat Rate"
        ],
        correctAnswer: 0,
        explanation: "Blended CAC captures true business reality by dividing total fully-loaded marketing overhead across all acquired customers, complementing channel-specific paid CAC metrics."
      },
      {
        id: 17,
        question: "What is 'Lead Scoring' in B2B MarTech automation platforms like HubSpot or Marketo?",
        options: [
          "Assigning numerical points to prospects based on implicit behavior (e.g., visiting pricing page, downloading whitepaper) and explicit demographic fit to identify Sales-Qualified Leads (SQLs)",
          "Rating sales representatives based on their cold calling volume",
          "Calculating the financial credit score of website visitors",
          "Counting the total number of form fields on a landing page"
        ],
        correctAnswer: 0,
        explanation: "Lead scoring ranks prospects by assigning positive points for high-intent actions (viewing enterprise pricing, requesting a demo) to route sales-ready leads to SDRs automatically."
      },
      {
        id: 18,
        question: "What does 'Server-Side Tagging' (e.g., via Meta Conversions API / CAPI) solve in digital advertising?",
        options: [
          "It bypasses browser ad blockers, cookie deprecation, and iOS 14+ tracking restrictions by transmitting conversion data directly from the cloud server to the ad platform",
          "It completely removes the need for web hosting servers",
          "It guarantees 100% organic search engine ranking",
          "It eliminates the cost of digital ad spend"
        ],
        correctAnswer: 0,
        explanation: "Server-side tracking (CAPI) sends conversion events from web servers rather than client browsers, recovering data lost to ad blockers, network dropouts, and browser cookie restrictions."
      },
      {
        id: 19,
        question: "What is the primary formula for 'Click-Through Rate' (CTR)?",
        options: [
          "CTR = (Total Clicks / Total Impressions) × 100",
          "CTR = (Total Conversions / Total Clicks) × 100",
          "CTR = (Total Cost / Total Clicks)",
          "CTR = (Revenue / Cost) × 100"
        ],
        correctAnswer: 0,
        explanation: "CTR = (Clicks / Impressions) × 100. High CTR reflects resonant creative messaging and precise audience targeting in search and social campaigns."
      },
      {
        id: 20,
        question: "In growth marketing, what does the 'North Star Metric' (NSM) represent?",
        options: [
          "The single key metric that best captures the core value your product delivers to customers and most directly correlates with sustainable long-term business growth",
          "The total number of registered accounts created since company inception",
          "The daily social media impressions count",
          "The annual tax refund received by the company"
        ],
        correctAnswer: 0,
        explanation: "A North Star Metric (e.g., Spotify: Time Spent Listening; Airbnb: Nights Booked) aligns product, marketing, and engineering teams around delivering authentic recurring user value."
      }
    ]
  },

  // =========================================================================
  // 5. OPERATIONS & LOGISTICS MANAGEMENT - 20 High-Yield MBA Questions
  // =========================================================================
  {
    id: "operation-and-logistic",
    name: "MBA Operations, Logistics & Supply Chain Excellence",
    shortTitle: "Operations & Logistics",
    category: "Core MBA",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    accentColor: "from-emerald-500 to-teal-600",
    iconName: "Truck",
    certificateTitle: "Executive Certification in Supply Chain Management, Logistics & Operational Excellence",
    description: "Evaluates competence in Supply Chain Architecture, Bullwhip Mitigation, Lean Six Sigma DMAIC, EOQ & Safety Stock Formulas, Bottleneck Management (TOC), and Warehouse Logistics.",
    avgSalary: "₹13 - 26 LPA",
    topRecruiters: ["Amazon Operations", "DHL", "Maersk", "Tata Steel", "L&T", "Procter & Gamble SCM", "Schneider Electric"],
    keyCompetencies: [
      "Supply Chain Architecture & Bullwhip Effect",
      "Lean Six Sigma DMAIC & CPK Process Capability",
      "EOQ, Safety Stock & Reorder Point Calculations",
      "Theory of Constraints (TOC) & Little's Law",
      "Warehouse Logistics & Cross-Docking Operations"
    ],
    syllabus: [
      "Economic Order Quantity (EOQ) with Quantity Discounts",
      "Safety Stock Modeling under Lead Time & Demand Uncertainty",
      "Statistical Process Control (SPC) Charts & Defect PPM",
      "ABC-XYZ Inventory Matrix & Vendor-Managed Inventory (VMI)",
      "Multi-Modal Freight Logistics & Cold Chain Operations"
    ],
    passingScore: 12.0,
    totalQuestions: 20,
    timeLimitMinutes: 25,
    negativeMarking: 0.33,
    questions: [
      {
        id: 1,
        question: "What is the classic mathematical formula for Economic Order Quantity (EOQ)?",
        options: [
          "EOQ = √[(2 × D × S) / H], where D = Annual Demand, S = Ordering Cost per order, H = Holding Cost per unit per year",
          "EOQ = (D × S × H) / 2",
          "EOQ = (Annual Demand / 365) × Lead Time",
          "EOQ = Reorder Point + Safety Stock"
        ],
        correctAnswer: 0,
        explanation: "EOQ minimizes total inventory costs by equating annual ordering costs with annual holding costs: EOQ = √[(2 × Annual Demand × Ordering Cost) / Holding Cost]."
      },
      {
        id: 2,
        question: "What is the 'Bullwhip Effect' in supply chain management?",
        options: [
          "A progressive amplification of demand variability as one moves upstream from the final consumer to the raw material manufacturer",
          "A sudden collapse in international freight shipping rates",
          "The speed at which automated warehouse robots move boxes",
          "A method for disciplining factory labor"
        ],
        correctAnswer: 0,
        explanation: "The Bullwhip Effect occurs when small fluctuations in consumer demand trigger increasingly volatile demand forecasts upstream due to order batching, price fluctuations, rationing, and lead-time lags."
      },
      {
        id: 3,
        question: "In Six Sigma methodology, what is the maximum permissible defect rate for a process operating at 6-Sigma quality level?",
        options: [
          "3.4 Defects Per Million Opportunities (DPMO)",
          "66 Defects Per Million Opportunities",
          "300 Defects Per Million Opportunities",
          "3.4% of total production volume"
        ],
        correctAnswer: 0,
        explanation: "A process with 6-sigma capability (accounting for a standard 1.5-sigma long-term mean shift) produces no more than 3.4 DPMO (99.99966% defect-free yield)."
      },
      {
        id: 4,
        question: "According to 'Little's Law' in queuing theory and operations, what is the relationship between Work-in-Process (L), Throughput Rate (λ), and Cycle Time (W)?",
        options: [
          "L = λ × W (WIP = Throughput × Flow Time)",
          "L = λ / W",
          "L = W / λ",
          "L = λ + W"
        ],
        correctAnswer: 0,
        explanation: "Little's Law proves that the average number of items in a stationary queueing system (L) equals the average arrival/throughput rate (λ) multiplied by average time spent in the system (W)."
      },
      {
        id: 5,
        question: "In Goldratt's Theory of Constraints (TOC), what is the first fundamental step in the 5 Focusing Steps?",
        options: [
          "Identify the system's constraint (the bottleneck)",
          "Exploit the system's constraint",
          "Subordinate everything else to the constraint",
          "Elevate the system's constraint"
        ],
        correctAnswer: 0,
        explanation: "TOC's 5 Focusing Steps: 1. Identify the constraint; 2. Exploit the constraint; 3. Subordinate everything else; 4. Elevate the constraint; 5. Prevent inertia from becoming the new constraint."
      },
      {
        id: 6,
        question: "In warehouse logistics, what does 'Cross-Docking' mean?",
        options: [
          "Transferring inbound shipments directly from receiving trucks to outbound delivery trucks with minimal or zero intermediate storage time",
          "Stacking wooden shipping pallets in a cross pattern",
          "Docking cargo container ships across two parallel berths",
          "Storing hazardous chemical goods in quarantined warehouses"
        ],
        correctAnswer: 0,
        explanation: "Cross-docking eliminates put-away and picking labor by routing incoming goods directly from receiving docks to outbound transit bays, drastically reducing holding costs and lead times."
      },
      {
        id: 7,
        question: "What is the difference between Process Capability Index 'Cp' and Process Capability Index 'Cpk'?",
        options: [
          "Cp measures process spread relative to specification limits without considering process centering, while Cpk accounts for both process spread and mean centering",
          "Cp is for continuous variables; Cpk is for binary pass/fail attributes",
          "Cp is used in finance; Cpk is used in logistics",
          "There is no mathematical difference"
        ],
        correctAnswer: 0,
        explanation: "Cp = (USL - LSL) / 6σ measures potential capability regardless of centering. Cpk = min[(USL - μ)/3σ, (μ - LSL)/3σ] reflects actual process performance accounting for mean deviation."
      },
      {
        id: 8,
        question: "In Lean Manufacturing, which of the following is NOT one of the classic 7 Wastes (Muda)?",
        options: [
          "Overproduction",
          "Waiting / Idle Time",
          "Kaizen Continuous Improvement",
          "Excess Transportation"
        ],
        correctAnswer: 2,
        explanation: "The 7 classic Lean Wastes (TIMWOOD) are: Transportation, Inventory, Motion, Waiting, Overproduction, Over-processing, and Defects. Kaizen is a continuous improvement philosophy, not a waste."
      },
      {
        id: 9,
        question: "How is 'Safety Stock' mathematically computed when both daily demand and supplier lead times follow normal distributions?",
        options: [
          "Safety Stock = Z × √[(Average Lead Time × σ_demand²) + (Average Demand² × σ_lead_time²)]",
          "Safety Stock = Annual Demand × Z-score",
          "Safety Stock = (Max Demand - Min Demand) / 2",
          "Safety Stock = EOQ / Lead Time Days"
        ],
        correctAnswer: 0,
        explanation: "Safety stock accounts for the combined variance in daily demand and supplier delivery lead times using the standard convolution formula weighted by the required service-level Z-score."
      },
      {
        id: 10,
        question: "In the ABC Inventory Classification based on Pareto's 80/20 principle, 'Category A' items typically represent:",
        options: [
          "About 10-20% of total inventory SKU count, but account for 70-80% of total annual consumption dollar value",
          "About 80% of total SKU count, but account for 10% of total dollar value",
          "Items with zero shelf-life expiration risk",
          "Damaged goods pending return to vendor"
        ],
        correctAnswer: 0,
        explanation: "Category A items represent high-value/critical SKUs (15-20% volume, ~80% spend) requiring tight perpetual inventory control. Category C items represent low-value bulk items (50% volume, ~5% spend)."
      },
      {
        id: 11,
        question: "What is the primary concept behind a 'Kanban' pull-system in Toyota Production System (TPS)?",
        options: [
          "Production is authorized only when downstream processes consume materials, signaled via visual cards/containers to prevent overproduction",
          "Producing at maximum factory speed regardless of warehouse inventory levels",
          "Relying entirely on manual pencil-and-paper spreadsheets",
          "Outsourcing all production to overseas third-party vendors"
        ],
        correctAnswer: 0,
        explanation: "Kanban uses visual pull signals to authorize upstream production only when downstream demand creates a consumption trigger, strictly enforcing Just-in-Time (JIT) flow."
      },
      {
        id: 12,
        question: "What is the formula for 'Overall Equipment Effectiveness' (OEE) in plant operations?",
        options: [
          "OEE = Availability × Performance × Quality",
          "OEE = Total Units Produced / Total Machine Hours",
          "OEE = (Revenue - Operating Cost) / Asset Value",
          "OEE = Machine Uptime % + Maintenance Budget"
        ],
        correctAnswer: 0,
        explanation: "OEE combines Availability (operating time vs planned time) × Performance (actual run rate vs ideal design speed) × Quality (good defect-free units vs total units produced)."
      },
      {
        id: 13,
        question: "In Supply Chain Risk Management, what does 'Dual Sourcing' (or Multi-Sourcing) achieve?",
        options: [
          "Mitigating supply disruption risk and preventing supplier monopolistic hold-up by procuring critical components from two or more independent vendors",
          "Paying double invoice prices for faster shipping",
          "Ordering identical parts from the same vendor twice a day",
          "Eliminating all quality inspection requirements"
        ],
        correctAnswer: 0,
        explanation: "Dual sourcing reduces geopolitical and operational disruption risks by splitting component allocations (e.g., 70/30) between primary and secondary qualified suppliers."
      },
      {
        id: 14,
        question: "In Project Management, what defines the 'Critical Path' in a PERT/CPM network diagram?",
        options: [
          "The longest sequence of dependent activities in the project network, having Zero Total Float (slack), which dictates the minimum possible project completion time",
          "The path containing the most expensive hardware tasks",
          "The shortest path through the network",
          "The path with the highest number of junior resources"
        ],
        correctAnswer: 0,
        explanation: "The Critical Path has zero slack/float. Any delay in an activity on the critical path directly postpones the final project completion deadline."
      },
      {
        id: 15,
        question: "What is 'Vendor-Managed Inventory' (VMI)?",
        options: [
          "The buyer takes complete ownership of manufacturing the vendor's goods",
          "The upstream supplier monitors the customer's inventory levels and assumes full responsibility for generating replenishment purchase orders to maintain agreed stock levels",
          "The vendor leases retail shelf space without supplying physical products",
          "A government-run agricultural buffer warehouse"
        ],
        correctAnswer: 1,
        explanation: "In VMI partnerships, the vendor accesses real-time point-of-sale data and manages restocking decisions directly, dampening the bullwhip effect and optimizing supply chain coordination."
      },
      {
        id: 16,
        question: "What does 'SMED' (Single-Minute Exchange of Dies) in Lean manufacturing aim to accomplish?",
        options: [
          "Reducing machine changeover / tooling setup time to under 10 minutes (single digit minutes) to enable smaller batch sizes and agile mixed-model production",
          "Replacing metal machine dies with plastic single-use dies",
          "Mandating 10-minute worker lunch breaks",
          "Eliminating preventative machine maintenance"
        ],
        correctAnswer: 0,
        explanation: "SMED (developed by Shigeo Shingo) separates internal setup (done while machine stopped) from external setup (done while machine running), slashing setup downtime to enable rapid batch switching."
      },
      {
        id: 17,
        question: "What is the difference between 'Third-Party Logistics' (3PL) and 'Fourth-Party Logistics' (4PL)?",
        options: [
          "3PL provides execution-level physical transportation and warehousing assets; 4PL acts as a neutral non-asset-based integrator managing multiple 3PLs, technology, and end-to-end supply chain strategy",
          "3PL is for sea freight; 4PL is for air freight",
          "3PL is domestic; 4PL is strictly international",
          "There is no difference; 4PL is just marketing jargon"
        ],
        correctAnswer: 0,
        explanation: "3PLs provide tactical logistics execution (trucks, warehouses). 4PLs serve as lead logistics architects overseeing the client's entire supply chain ecosystem, technology stack, and 3PL networks."
      },
      {
        id: 18,
        question: "What is the primary role of a 'Poka-Yoke' device in quality control systems?",
        options: [
          "A fail-safe mechanism or visual physical design that prevents human error from occurring or immediately highlights an operational defect",
          "A statistical control chart displayed in manager cabins",
          "A high-speed conveyor belt sensor",
          "A financial bonus awarded for zero absenteeism"
        ],
        correctAnswer: 0,
        explanation: "Poka-Yoke (mistake-proofing, e.g., a SIM card tray that only fits in one orientation) prevents operator errors before they can translate into defective products."
      },
      {
        id: 19,
        question: "In cold chain logistics for pharmaceuticals and perishable food, what is a 'Temperature Excursion'?",
        options: [
          "An event where temperature-sensitive products are exposed to temperatures outside their validated storage tolerance range (e.g., 2°C to 8°C)",
          "A routine defrosting cycle scheduled by the warehouse manager",
          "Shipping goods to tropical export destinations",
          "An increase in outdoor ambient weather temperature"
        ],
        correctAnswer: 0,
        explanation: "Temperature excursions occur when cold-chain biologics/vaccines deviate from prescribed thermal bands, requiring stability batch testing or quarantined destruction."
      },
      {
        id: 20,
        question: "How is 'Inventory Turnover Ratio' (ITR) calculated and what does a high ITR indicate?",
        options: [
          "ITR = (Cost of Goods Sold / Average Inventory); a higher ratio indicates efficient inventory velocity, strong sales demand, and minimal working capital tied up in stock",
          "ITR = (Total Sales / Net Profit); indicates high operating leverage",
          "ITR = (Ending Inventory / Total Assets); indicates capital intensity",
          "ITR = (Warehouse Square Footage / Total Pallets)"
        ],
        correctAnswer: 0,
        explanation: "ITR = COGS / Average Inventory. A higher turnover indicates that the enterprise converts inventory into cash rapidly, reducing holding costs, obsolescence, and working capital strain."
      }
    ]
  },

  // =========================================================================
  // 6. FINTECH (FINANCIAL TECHNOLOGY) - 20 High-Yield MBA Questions
  // =========================================================================
  {
    id: "fintech",
    name: "MBA FinTech, Digital Banking & Algorithmic Finance",
    shortTitle: "FinTech",
    category: "Emerging Tech MBA",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    accentColor: "from-cyan-500 to-blue-600",
    iconName: "Cpu",
    certificateTitle: "Executive Certification in Financial Technology, Digital Banking & Web3 Finance",
    description: "Evaluates mastery in UPI/IMPS Payment Rails, Account Aggregator (AA) Framework, Open Banking APIs, Alternative Credit Underwriting, RegTech AML/KYC, and Algorithmic Trading Systems.",
    avgSalary: "₹16 - 35 LPA",
    topRecruiters: ["Razorpay", "PhonePe", "Paytm", "Cred", "Pine Labs", "JPMorgan Chase FinTech", "Zerodha", "Groww"],
    keyCompetencies: [
      "UPI 2.0, NPCI Rails & ISO 20022 Protocols",
      "Account Aggregator (AA) Ecosystem & Open Banking",
      "Alternative Credit Scoring & Cashflow Underwriting",
      "RegTech, AML/KYC & Fraud Risk Engines",
      "Algorithmic Execution (TWAP/VWAP) & Smart Contracts"
    ],
    syllabus: [
      "Payment Gateway Architectures, Tokenization & MDR Economics",
      "LendingTech: BNPL, FLDG Regulations & Bureau Pulls",
      "Neo-Banking & Banking-as-a-Service (BaaS) Co-Branding",
      "Blockchain Consensus Protocols, Smart Contracts & DeFi Mechanics",
      "Algorithmic Order Types, Low-Latency Infra & Backtesting"
    ],
    passingScore: 12.0,
    totalQuestions: 20,
    timeLimitMinutes: 25,
    negativeMarking: 0.33,
    questions: [
      {
        id: 1,
        question: "In India's Unified Payments Interface (UPI) ecosystem managed by NPCI, what role does the 'PSP' (Payment Service Provider) bank play?",
        options: [
          "It holds the user's primary bank account and processes balance debits",
          "It connects third-party TPAP apps (e.g., PhonePe, Google Pay) to the central NPCI switch and manages virtual payment addresses (@upi)",
          "It manufactures POS hardware terminals for kirana stores",
          "It sets statutory credit card interest rates"
        ],
        correctAnswer: 1,
        explanation: "TPAPs (Third Party Application Providers) cannot connect directly to NPCI; they must route transactions through sponsor PSP Banks (e.g., Axis, HDFC, ICICI, YES Bank) that interface with NPCI's core switch."
      },
      {
        id: 2,
        question: "What is the primary function of the 'Account Aggregator' (AA) framework regulated by the Reserve Bank of India (RBI)?",
        options: [
          "Consolidating multiple bank debts into a single high-interest loan",
          "Enabling seamless, encrypted, consent-based financial data sharing between Financial Information Providers (FIPs) and Financial Information Users (FIUs) without storing client data",
          "Automating stock market day trading orders",
          "Printing physical paper bank passbooks"
        ],
        correctAnswer: 1,
        explanation: "The RBI Account Aggregator framework provides a data-blind, digital consent architecture allowing citizens to securely share bank statements, GST returns, and investments with lenders in real-time."
      },
      {
        id: 3,
        question: "What does 'Card Tokenization' (mandated by RBI) replace to protect consumer payment credentials during e-commerce checkout?",
        options: [
          "It replaces the actual 16-digit Card Primary Account Number (PAN) with a unique, encrypted surrogate token specific to the merchant and device",
          "It replaces debit cards with physical gold coins",
          "It eliminates the need for 2-Factor OTP Authentication",
          "It converts fiat currency into cryptocurrency tokens"
        ],
        correctAnswer: 0,
        explanation: "Tokenization prevents merchants from storing raw 16-digit card numbers and CVVs on their servers, generating a device/merchant-scoped token to neutralize card data breach hazards."
      },
      {
        id: 4,
        question: "In Alternative Credit Underwriting for micro-MSMEs and thin-file borrowers, which data source is most heavily leveraged instead of traditional CIBIL scores?",
        options: [
          "GST invoice filing velocity, UPI digital transaction cashflow, and utility bill payment history",
          "Physical land deed documents only",
          "Social media follower counts and selfie photos",
          "College graduation degree grade point average"
        ],
        correctAnswer: 0,
        explanation: "Cashflow-based lending utilizes daily digital revenue footprints (GST filings, Account Aggregator bank streams, POS terminal batches) to underwrite creditworthiness for unbanked micro-enterprises."
      },
      {
        id: 5,
        question: "What does 'MDR' (Merchant Discount Rate) represent in payment processing economics?",
        options: [
          "The percentage fee charged to a merchant by the acquiring bank and payment gateway for processing electronic transactions (debit/credit cards)",
          "The annual interest rate charged on unpaid credit card balances",
          "The discount offered to shoppers on festive sales",
          "The foreign exchange currency conversion markup"
        ],
        correctAnswer: 0,
        explanation: "MDR is split among the Acquiring Bank, Payment Gateway, Card Network (Visa/Mastercard/RuPay), and Issuing Bank to cover processing infrastructure, fraud risk, and interchange costs."
      },
      {
        id: 6,
        question: "Under RBI's Digital Lending Guidelines, what is the regulatory stance on 'First Loss Default Guarantees' (FLDG) between FinTechs and regulated lending partners?",
        options: [
          "FinTechs can provide unlimited 100% FLDG without capital reserves",
          "FLDG is capped at a maximum of 5% of the total loan portfolio backed by explicit bank guarantees or fixed deposits",
          "FLDG is strictly banned under all circumstances with zero exceptions",
          "FLDG can only be settled in foreign currencies"
        ],
        correctAnswer: 1,
        explanation: "RBI's June 2023 circular legalized Default Loss Guarantees (DGL) up to a strict cap of 5% of the outstanding loan portfolio, backed by escrowed deposits or bank guarantees to maintain systemic stability."
      },
      {
        id: 7,
        question: "What is a 'Neobank' and how does it typically operate legally in jurisdictions like India without a direct digital banking license?",
        options: [
          "Operating as an unregulated shadow bank issuing physical fiat banknotes",
          "Operating as a front-end digital customer experience and API platform partnering with a licensed, regulated sponsor bank (Banking-as-a-Service model)",
          "Operating strictly as an offshore cryptocurrency exchange",
          "Operating as a peer-to-peer pawn shop"
        ],
        correctAnswer: 1,
        explanation: "Indian neobanks (e.g., Jupiter, Fi) operate through co-branded partnerships with regulated commercial banks (e.g., Federal Bank, SBM), leveraging BaaS APIs for accounts, cards, and regulatory compliance."
      },
      {
        id: 8,
        question: "In Algorithmic Trading, what is the objective of a 'VWAP' (Volume-Weighted Average Price) execution algorithm?",
        options: [
          "Executing a massive institutional order gradually throughout the trading day in proportion to historical volume distribution to minimize market impact and price slippage",
          "Maximizing high-frequency arbitrage across cryptocurrency exchanges",
          "Automatically shorting the market whenever a technical indicator crosses zero",
          "Buying stocks strictly at the day's absolute lowest opening price"
        ],
        correctAnswer: 0,
        explanation: "VWAP slices large institutional block orders into dynamic child orders matching the market's historical intraday volume profile, avoiding market disruption and execution slippage."
      },
      {
        id: 9,
        question: "What is a 'Smart Contract' in blockchain architectures like Ethereum?",
        options: [
          "A legal PDF document signed with Adobe digital signature",
          "A self-executing, deterministic computer program deployed on a decentralized blockchain ledger that automatically enforces agreement terms when predefined conditions are met",
          "A government-approved employment contract for software developers",
          "An AI-powered chatbot answering customer support queries"
        ],
        correctAnswer: 1,
        explanation: "Smart contracts execute immutable bytecode automatically when triggered by on-chain state transactions, eliminating counterparty intermediary risk in decentralized applications."
      },
      {
        id: 10,
        question: "What is 'ISO 20022' in international cross-border payments and banking messaging systems?",
        options: [
          "A global, rich XML/JSON data messaging standard replacing legacy SWIFT MT text formats to improve transaction metadata, compliance tracking, and STP rates",
          "A mandatory ISO standard for factory machinery safety",
          "A protocol for minting non-fungible tokens (NFTs)",
          "An encryption algorithm for mobile SIM cards"
        ],
        correctAnswer: 0,
        explanation: "ISO 20022 provides a structured, extensible universal messaging standard containing rich remit data, purpose codes, and Ultimate Debtor/Creditor fields for frictionless global settlements."
      },
      {
        id: 11,
        question: "In RegTech and Anti-Money Laundering (AML), what is a 'Suspicious Transaction Report' (STR)?",
        options: [
          "A mandatory compliance report filed by financial institutions with the Financial Intelligence Unit (FIU-IND) when a transaction is suspected of involving criminal proceeds or lacks economic rationale",
          "A daily profit and loss statement sent to shareholders",
          "A report detailing credit card rewards redemption points",
          "A list of software bugs found in mobile banking apps"
        ],
        correctAnswer: 0,
        explanation: "Under the Prevention of Money Laundering Act (PMLA), regulated entities must file STRs with FIU-IND upon detecting unusual behavioral patterns, rapid layerings, or unexplained high-velocity funds."
      },
      {
        id: 12,
        question: "What does 'e-KYC' via Aadhaar accomplish for instant digital customer onboarding?",
        options: [
          "Verifying candidate college credentials through DigiLocker",
          "Authenticating customer demographic identity and verified residential address via UIDAI OTP or biometric handshake in real-time, fulfilling regulatory CDD requirements",
          "Granting an instant pre-approved personal loan",
          "Checking the customer's international passport visa status"
        ],
        correctAnswer: 1,
        explanation: "Aadhaar e-KYC securely transfers digitally signed XML packets containing verified identity and address proofs directly from UIDAI servers, slashing customer onboarding time from days to seconds."
      },
      {
        id: 13,
        question: "What is the primary difference between 'Central Bank Digital Currency' (CBDC / e-Rupee) and traditional commercial bank digital balances?",
        options: [
          "CBDC is a direct sovereign liability of the central bank (digital cash bearer instrument), whereas commercial bank balances are private liabilities of the respective banking institution",
          "CBDC charges 18% GST on every transaction",
          "CBDC can only be used to purchase gold",
          "Commercial bank deposits are backed by physical bitcoins"
        ],
        correctAnswer: 0,
        explanation: "CBDC (Digital Rupee / e₹) represents sovereign fiat currency directly on the Reserve Bank's balance sheet, eliminating commercial bank credit risk and supporting offline programmable utility."
      },
      {
        id: 14,
        question: "In Buy-Now-Pay-Later (BNPL) business models, how do providers primarily generate revenue if consumer loans are advertised as zero-interest?",
        options: [
          "Merchant Commission Fees (typically 2% to 6% per transaction) and consumer late payment penalties",
          "Selling user personal data to third-party ad brokers",
          "Charging monthly app subscription membership fees",
          "Investing user deposits in international real estate"
        ],
        correctAnswer: 0,
        explanation: "BNPL providers earn substantial Merchant Discount Fees (merchants willingly pay 2-6% to boost checkout conversion rates and basket sizes) complemented by late fees on overdue repayment installments."
      },
      {
        id: 15,
        question: "What is 'Order Book Spoofing' in high-frequency algorithmic market surveillance?",
        options: [
          "An illegal market manipulation tactic of placing large fake non-bona-fide buy/sell orders to create false market depth illusions and canceling them immediately before execution",
          "Printing false broker trade confirmations",
          "Trading stocks without having a registered Demat account",
          "Shorting stocks during extended corporate earnings blackouts"
        ],
        correctAnswer: 0,
        explanation: "Spoofing creates artificial supply/demand visual pressure in Level 2 order books to manipulate security prices for predatory algorithmic fills on the opposite side before canceling the phantom orders."
      },
      {
        id: 16,
        question: "What is 'Open Banking' and how does it empower FinTech innovation?",
        options: [
          "Opening bank branches 24 hours a day on weekends",
          "A regulatory and architectural framework requiring traditional banks to expose standardized Open APIs allowing authorized third-party FinTechs to build bespoke financial services upon consumer consent",
          "Making all private customer bank balance records completely public on the internet",
          "Removing all banking transaction processing fees"
        ],
        correctAnswer: 1,
        explanation: "Open Banking (e.g., UK PSD2 and India's API ecosystem) breaks down bank data silos, allowing fintechs to initiate payments and aggregate financial histories securely via RESTful APIs."
      },
      {
        id: 17,
        question: "In WealthTech, what is a 'Robo-Advisor'?",
        options: [
          "A human telemarketer calling consumers to sell mutual funds",
          "An automated digital platform that constructs and rebalances personalized investment portfolios based on mathematical algorithms and risk questionnaires with minimal human intervention",
          "A humanoid robot sitting in physical bank branches",
          "An automated software bot that hacks competitor hedge funds"
        ],
        correctAnswer: 1,
        explanation: "Robo-advisors (e.g., Betterment, Zerodha Coin) deploy Modern Portfolio Theory (MPT) algorithms to automatically allocate, harvest tax losses, and rebalance low-cost index ETF portfolios."
      },
      {
        id: 18,
        question: "What is 'Settlement Risk' (or Herstatt Risk) in high-value interbank payments?",
        options: [
          "The risk that one counterparty fails to deliver on a transaction settlement obligation after the other party has already irrevocably transferred its agreed funds/securities",
          "The risk that the payment app's server runs out of disk space",
          "The risk that currency exchange rates stay constant for too long",
          "The risk of counterfeit physical banknotes being deposited"
        ],
        correctAnswer: 0,
        explanation: "Herstatt risk occurs in non-synchronized cross-border settlements across different time zones where Party A delivers currency before receiving Party B's counter-leg, solved via PvP (Payment versus Payment) systems."
      },
      {
        id: 19,
        question: "What is the primary role of a 'Payment Aggregator' (PA) vs a 'Payment Gateway' (PG) under RBI licensing?",
        options: [
          "A PG provides only the technology software pipe for transaction transmission, while a PA handles funds flow by pooling merchant settlements in an escrow account before routing payouts",
          "A PG issues physical credit cards, while a PA issues loans",
          "A PA is for international transactions only; a PG is for domestic",
          "There is no legal difference under RBI regulations"
        ],
        correctAnswer: 0,
        explanation: "Payment Gateways deliver purely technological encryption software. Payment Aggregators (licensed under RBI circulars) collect and pool customer payments in nodal/escrow accounts before clearing merchant payouts."
      },
      {
        id: 20,
        question: "In decentralized finance (DeFi), what is an 'Automated Market Maker' (AMM) protocol (e.g., Uniswap)?",
        options: [
          "A protocol that uses mathematical liquidity pool invariant formulas (e.g., x × y = k) rather than traditional centralized limit order books to price and trade crypto assets",
          "An automated telephone stockbroker service",
          "A government-run commodity exchange",
          "A system that automatically buys corporate bonds at maturity"
        ],
        correctAnswer: 0,
        explanation: "AMMs replace order books with smart-contract liquidity pools where algorithmic mathematical formulas (Constant Product: x × y = k) determine asset swap prices based on relative token ratios."
      }
    ]
  },

  // =========================================================================
  // 7. AGRI BUSINESS MANAGEMENT - 20 High-Yield MBA Questions
  // =========================================================================
  {
    id: "agri-business",
    name: "MBA Agri-Business Management & Commodity Trading",
    shortTitle: "Agri Business",
    category: "Sectoral MBA",
    badgeColor: "bg-lime-500/20 text-lime-300 border-lime-500/30",
    accentColor: "from-lime-500 to-green-600",
    iconName: "Wheat",
    certificateTitle: "Executive Certification in Agri-Business Management, Supply Chains & Commodity Markets",
    description: "Evaluates mastery in Agri-Commodity Derivatives (NCDEX Hedging), Farm-to-Fork Cold Chain Networks, Agritech Precision Farming, Rural FMCG Distribution, and Priority Sector Agri-Financing.",
    avgSalary: "₹10 - 22 LPA",
    topRecruiters: ["ITC Agri-Business (e-Choupal)", "Mahindra Agri", "Godrej Agrovet", "UPL", "Bayer CropScience", "Cargill", "Olam International"],
    keyCompetencies: [
      "Agri-Commodity Hedging & NCDEX Basis Risk",
      "Farm-to-Fork Cold Chain & Post-Harvest Losses",
      "Precision Agritech, Drone IoT & Remote Sensing",
      "Rural Marketing, FMCG Route-to-Market & Retail",
      "Agri-Credit, Priority Sector Lending & KCC Underwriting"
    ],
    syllabus: [
      "Commodity Futures Contracts, Spot-Futures Arbitrage & Basis Risk",
      "Post-Harvest Loss Mitigation, Controlled Atmosphere (CA) Storages",
      "Contract Farming Models, Farmer Producer Organizations (FPOs)",
      "Agri-Input Marketing (Pesticides, Seeds & Micro-Irrigation GTM)",
      "APMC Act Reforms, e-NAM Integration & Food Processing Economics"
    ],
    passingScore: 12.0,
    totalQuestions: 20,
    timeLimitMinutes: 25,
    negativeMarking: 0.33,
    questions: [
      {
        id: 1,
        question: "On agricultural commodity exchanges like NCDEX, what does 'Basis' represent?",
        options: [
          "Basis = Spot Cash Market Price minus Futures Price for the deliverable commodity",
          "Basis = Total Annual Farm Subsidies / Production Acreage",
          "Basis = Transport Freight Cost per metric ton",
          "Basis = The Minimum Support Price set by the Commission for Agricultural Costs and Prices"
        ],
        correctAnswer: 0,
        explanation: "Basis = Spot Price - Futures Price. Basis risk arises when the relationship between local physical spot prices and futures contract settlement prices fluctuates unexpectedly during a hedge."
      },
      {
        id: 2,
        question: "What is an 'FPO' (Farmer Producer Organization) and its primary economic advantage for smallholder farmers?",
        options: [
          "A private corporate entity that forcibly acquires agricultural land",
          "A producer collective registered as a legal company that aggregates smallholder farmers to achieve economies of scale in input procurement, credit access, and collective crop bargaining",
          "A government body that fixes daily wholesale vegetable retail prices",
          "A labor union for agricultural tractor drivers"
        ],
        correctAnswer: 1,
        explanation: "FPOs aggregate fragmented small and marginal farmers, enabling them to bulk-purchase fertilizers/seeds at wholesale rates, invest in shared post-harvest infrastructure, and negotiate directly with institutional buyers."
      },
      {
        id: 3,
        question: "What is the primary role of 'e-NAM' (National Agriculture Market) launched by the Government of India?",
        options: [
          "An online pan-India electronic trading portal that networks existing physical APMC mandis to facilitate unified competitive price discovery for agricultural commodities",
          "A mobile app for booking international vacation flights for farmers",
          "An automated system for spraying chemical fertilizers via satellite",
          "A retail grocery delivery platform for urban luxury consumers"
        ],
        correctAnswer: 0,
        explanation: "e-NAM integrates physical state APMC markets into a common digital trading platform, promoting transparent electronic bidding, assaying-based pricing, and online payment settlements across state borders."
      },
      {
        id: 4,
        question: "In post-harvest supply chains, what is 'Controlled Atmosphere' (CA) storage primarily used for in extending the shelf-life of fruits like apples?",
        options: [
          "Artificially inflating prices by locking warehouse doors",
          "Precisely regulating temperature, humidity, oxygen, carbon dioxide, and nitrogen levels to slow down the natural respiration and ripening rate of the fruit",
          "Irradiating agricultural produce with high-dose radioactive isotopes",
          "Deep freezing fruit at -40°C until it turns into solid ice"
        ],
        correctAnswer: 1,
        explanation: "CA storage reduces O2 levels (to ~1-2%) and increases CO2 levels in temperature-controlled chambers, suppressing ethylene production and extending apple shelf-life up to 10-12 months."
      },
      {
        id: 5,
        question: "What does 'Minimum Support Price' (MSP) announced by the Government of India on recommendation of CACP guarantee?",
        options: [
          "The maximum price a private exporter is allowed to charge for agricultural goods",
          "A price safety net guaranteeing government procurement of notified crops if open market prices fall below the announced floor price",
          "A mandatory 50% discount on retail consumer food prices",
          "A statutory bonus paid to agricultural machinery dealers"
        ],
        correctAnswer: 1,
        explanation: "MSP provides an assured procurement floor price (benchmark A2+FL or C2 cost formula) for ~23 mandated agricultural crops to protect farmers against sudden harvest price crashes."
      },
      {
        id: 6,
        question: "What is 'Contract Farming' and how does it benefit agri-processing corporations like PepsiCo or ITC?",
        options: [
          "Renting government land to construct chemical fertilizer factories",
          "A forward agreement between farmers and a processing firm where farmers produce specific crop varieties under agreed quality parameters and the firm guarantees buyback at predetermined prices",
          "Purchasing agricultural commodity futures on international exchanges",
          "Hiring daily wage laborers to work in urban retail supermarkets"
        ],
        correctAnswer: 1,
        explanation: "Contract farming provides food processors with consistent, high-grade raw material supplies (e.g., specialized chip-grade potatoes for Lay's) while insulating farmers against market price volatility."
      },
      {
        id: 7,
        question: "In Rural Marketing, what does 'Haat' or 'Jatra' represent in the distribution landscape?",
        options: [
          "Traditional periodic rural village markets and pilgrim gatherings where rural consumers assemble weekly to purchase groceries, agri-inputs, and lifestyle products",
          "A luxury urban shopping mall",
          "A government agricultural tax collection office",
          "An agricultural irrigation canal network"
        ],
        correctAnswer: 0,
        explanation: "Rural haats (periodic markets) serve as critical community purchase nodes for FMCG and agri-input brands to conduct sampling, brand activations, and cash-and-carry retail distribution."
      },
      {
        id: 8,
        question: "What is 'Precision Agriculture' powered by Agritech IoT and drone remote sensing?",
        options: [
          "Using uniform blanket chemical fertilizer sprays across entire agricultural districts",
          "Leveraging GPS guidance, drone multispectral imagery, and soil IoT sensors to apply water, fertilizers, and pesticides with site-specific precision based on crop health zones",
          "Replacing all agricultural crops with synthetic lab-grown food",
          "Manual hand-weeding by agricultural labor"
        ],
        correctAnswer: 1,
        explanation: "Precision farming utilizes NDVI vegetation indices, satellite telemetry, and variable-rate applicators to target exact nutrient deficiencies, cutting input costs while boosting crop yields."
      },
      {
        id: 9,
        question: "Under RBI's Priority Sector Lending (PSL) norms, domestic commercial banks are mandated to allocate what percentage of their Adjusted Net Bank Credit (ANBC) to the Agriculture sector?",
        options: [
          "5% of ANBC",
          "10% of ANBC",
          "18% of ANBC (with a sub-target of 10% for Small and Marginal Farmers)",
          "30% of ANBC"
        ],
        correctAnswer: 2,
        explanation: "RBI mandates that 18% of total ANBC must be lent to Agriculture, ensuring credit flow to crop production, farm mechanization, agri-infrastructure, and micro-irrigation systems."
      },
      {
        id: 10,
        question: "What is the 'Kisan Credit Card' (KCC) scheme designed to provide to farmers?",
        options: [
          "An international luxury credit card for shopping in foreign airports",
          "A flexible, single-window institutional credit facility providing affordable short-term credit for crop cultivation, post-harvest expenses, and farm asset maintenance",
          "A debit card for purchasing railway train tickets",
          "A card for booking subsidized movie cinema tickets"
        ],
        correctAnswer: 1,
        explanation: "KCC offers revolving crop loan limits based on cropping pattern and land holding with subsidized interest subvention rates (net ~4% upon prompt repayment) to eliminate reliance on informal moneylenders."
      },
      {
        id: 11,
        question: "What is 'Hydroponics' in protected greenhouse cultivation?",
        options: [
          "Growing crops in soil-less nutrient-rich water solutions under controlled environmental parameters",
          "Cultivating crops on ocean floating barges",
          "Flooding agricultural fields with deep river water during monsoons",
          "Storing harvested grains in underwater airtight tanks"
        ],
        correctAnswer: 0,
        explanation: "Hydroponics eliminates soil-borne pathogens and saves up to 90% water by delivering precision mineral nutrients directly to plant root systems in recirculating aquatic systems."
      },
      {
        id: 12,
        question: "What is the primary operational cause of 'Post-Harvest Losses' in India's horticultural value chain (fruits and vegetables)?",
        options: [
          "Lack of refrigerated farm-gate pack-houses, broken cold chain transit, and poor packaging causing physiological decay and mechanical damage",
          "Excessive availability of cold storage warehouses across rural districts",
          "Strict government price caps on retail market sales",
          "Over-consumption of fruits by retail store workers"
        ],
        correctAnswer: 0,
        explanation: "India loses ~15-25% of fresh horticultural produce post-harvest due to missing pre-cooling facilities, rough road handling, ambient non-insulated transit, and absence of primary processing infrastructure."
      },
      {
        id: 13,
        question: "What does the 'Warehouse Receipts Act' (WDRA) facilitate for farmers holding harvested produce in registered warehouses?",
        options: [
          "Electronic Negotiable Warehouse Receipts (e-NWRs) that can be pledged with commercial banks as collateral for post-harvest pledge financing to avoid distress selling",
          "Free railway transport passes for grain trucks",
          "Mandatory destruction of grain stocks after 30 days",
          "Tax exemption certificates for foreign multinational exporters"
        ],
        correctAnswer: 0,
        explanation: "e-NWRs issued by WDRA-accredited warehouses allow farmers to safely store produce during post-harvest price dips, obtain immediate 70-75% bank loans against the receipt, and sell when prices rebound."
      },
      {
        id: 14,
        question: "What is 'Micro-Irrigation' (Drip and Sprinkler systems) and why is it subsidized under the PMKSY scheme?",
        options: [
          "It delivers water and dissolved fertilizers (fertigation) directly to plant root zones with 90%+ water efficiency, dramatically reducing water table depletion compared to flood irrigation",
          "It sprays artificial rain using chemical cloud seeding airplanes",
          "It uses micro-sized water molecules created in chemical laboratories",
          "It replaces river water with expensive purified bottled mineral water"
        ],
        correctAnswer: 0,
        explanation: "Drip irrigation prevents evaporative and percolation runoff losses, maximizing 'More Crop Per Drop' while lowering weed growth and energy consumption."
      },
      {
        id: 15,
        question: "In agricultural trade, what is a 'Sanitary and Phytosanitary' (SPS) measure under WTO rules?",
        options: [
          "Regulations and quarantine measures applied to protect human, animal, or plant health from pests, toxins, food additives, and disease-causing organisms in imported agri-produce",
          "A statutory import tariff duty on electronic consumer gadgets",
          "A requirement that all agricultural export shipments must be transported by air",
          "A restriction on foreign direct investment in retail banking"
        ],
        correctAnswer: 0,
        explanation: "SPS agreements allow countries to enforce rigorous quarantine protocols (e.g., maximum pesticide residue limits, fumigation standards) to prevent transboundary pest and bio-hazard entry."
      },
      {
        id: 16,
        question: "What is the core value proposition of ITC's pioneering 'e-Choupal' rural initiative?",
        options: [
          "Setting up rural internet kiosks that deliver real-time localized weather forecasts, mandi market price transparent discovery, and direct farm-gate procurement bypassing intermediary commissions",
          "Providing free television sets to all rural farming households",
          "Constructing chemical fertilizer manufacturing plants in village panchayats",
          "Running an online casino for agricultural commodities"
        ],
        correctAnswer: 0,
        explanation: "e-Choupal eliminated exploitative intermediary layers by placing internet-enabled kiosks run by local sanchalaks, empowering farmers with transparent price discovery and direct delivery to ITC processing hubs."
      },
      {
        id: 17,
        question: "What is 'Food Processing Value Addition' and why is it prioritized under the PM Formalisation of Micro food processing Enterprises (PMFME) scheme?",
        options: [
          "Converting raw perishable agri-commodities into shelf-stable, packaged, branded consumer food products (e.g., tomatoes to puree, milk to cheese) to capture higher margins",
          "Adding artificial chemical colorings to raw fruits",
          "Imposing high luxury sales taxes on restaurant dining",
          "Exporting unprocessed raw grains at lowest global spot prices"
        ],
        correctAnswer: 0,
        explanation: "Value addition transforms farm produce into value-added culinary products, multiplying farm gate realization, reducing post-harvest waste, and fostering rural manufacturing employment."
      },
      {
        id: 18,
        question: "What is 'Pradhan Mantri Fasal Bima Yojana' (PMFBY)?",
        options: [
          "A comprehensive yield and weather-based crop insurance scheme providing financial coverage against non-preventable natural risks (drought, flood, pests) at low uniform farmer premiums (1.5-2%)",
          "A life insurance scheme for tractor mechanics",
          "A health insurance policy for farm livestock animals",
          "A pension fund for retired agricultural university professors"
        ],
        correctAnswer: 0,
        explanation: "PMFBY subsidizes crop insurance premiums (farmers pay only 2% for Kharif, 1.5% for Rabi, 5% for commercial/horticultural crops) with government covering balance actuarial premium costs."
      },
      {
        id: 19,
        question: "In poultry and dairy agribusiness, what is 'Vertical Integration' (e.g., Suguna Foods model)?",
        options: [
          "The integrator company supplies day-old chicks, feed, medicines, and technical guidance to contract farmers, and buys back live broilers based on Feed Conversion Ratio (FCR) performance",
          "Building multi-story vertical chicken coops on skyscrapers",
          "Selling milk directly from cows to urban households without pasteurization",
          "Importing frozen chicken exclusively from foreign countries"
        ],
        correctAnswer: 0,
        explanation: "Contract broiler integration (the Suguna model) centralizes high-tech breeding, feed mills, processing, and distribution while insulating small contract farmers from feed price and mortality market volatility."
      },
      {
        id: 20,
        question: "What is 'Organic Certification' (e.g., NPOP / Jaivik Bharat) and what does it certify?",
        options: [
          "It certifies that the agricultural produce was grown without synthetic chemical pesticides, inorganic fertilizers, GMOs, or heavy metal contamination under audited traceability standards",
          "It certifies that the produce was grown using automated robotic tractors",
          "It certifies that the crop was harvested during a full moon night",
          "It certifies that the product has zero calories"
        ],
        correctAnswer: 0,
        explanation: "India's National Programme for Organic Production (NPOP) and Jaivik Bharat logo verify that farm management adheres strictly to organic soil health protocols without synthetic agrochemicals."
      }
    ]
  },

  // =========================================================================
  // 8. HEALTHCARE & HOSPITAL MANAGEMENT - 20 High-Yield MBA Questions
  // =========================================================================
  {
    id: "healthcare",
    name: "MBA Healthcare & Hospital Administration",
    shortTitle: "Healthcare",
    category: "Sectoral MBA",
    badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    accentColor: "from-teal-500 to-emerald-600",
    iconName: "HeartPulse",
    certificateTitle: "Executive Certification in Healthcare Administration & Health Systems Management",
    description: "Evaluates competence in Hospital Operations, NABH/JCI Accreditation Standards, Revenue Cycle Management (RCM), Ayushman Bharat (PM-JAY), ABDM FHIR Interoperability, and Clinical Governance.",
    avgSalary: "₹11 - 24 LPA",
    topRecruiters: ["Apollo Hospitals", "Max Healthcare", "Fortis Healthcare", "Manipal Hospitals", "Narayana Health", "Medanta", "PwC Healthcare"],
    keyCompetencies: [
      "Hospital Operational Metrics (ALOS, BOR & Turnaround)",
      "NABH 5th Edition & JCI Patient Safety Standards",
      "Revenue Cycle Management (RCM) & TPA Adjudication",
      "Ayushman Bharat (PM-JAY) & Package Costing",
      "ABDM Digital Health Architecture & FHIR Standards"
    ],
    syllabus: [
      "Bed Occupancy Rate (BOR), Average Length of Stay (ALOS) & OT Utilization",
      "Hospital Infection Control (HIC), Bio-Medical Waste Management Rules 2016",
      "Health Insurance TPAs, Cashless Hospitalization & Claim Denials",
      "Clinical Audits, Sentinel Event Reporting & Patient Safety Goals (IPSG)",
      "Activity-Based Costing (ABC) for Diagnostic & Surgical Packages"
    ],
    passingScore: 12.0,
    totalQuestions: 20,
    timeLimitMinutes: 25,
    negativeMarking: 0.33,
    questions: [
      {
        id: 1,
        question: "How is the Bed Occupancy Rate (BOR) calculated in hospital operations benchmarking?",
        options: [
          "BOR = (Total Inpatient Bed Days Occupied / Total Available Bed Days in a given period) × 100",
          "BOR = (Total Outpatient Consultations / Total Beds) × 100",
          "BOR = (Total Emergency Room Admissions / Total Discharges) × 100",
          "BOR = (Total ICU Beds / Total General Ward Beds) × 100"
        ],
        correctAnswer: 0,
        explanation: "BOR = (Total Inpatient Bed Days Realized / Total Available Bed Days) × 100. Target operational efficiency for tertiary multi-specialty hospitals typically hovers around 75% - 85%."
      },
      {
        id: 2,
        question: "In hospital administration, how is the Average Length of Stay (ALOS) calculated and why is lowering ALOS clinically significant?",
        options: [
          "ALOS = (Total Inpatient Days of Care / Total Number of Discharges and Deaths); lowering ALOS without compromising clinical outcomes increases bed turnover and reduces nosocomial infection risks",
          "ALOS = (Total ICU Admissions / Total Surgeries); indicates surgical complexity",
          "ALOS = (Total ER Wait Time in Minutes / Total Patients)",
          "ALOS = (Total Staff Onboarding Days / Total Nurses)"
        ],
        correctAnswer: 0,
        explanation: "ALOS measures average inpatient duration. Clinical pathways and fast-track rehabilitation optimize ALOS, unlocking bed capacity and lowering hospital-acquired infection risks."
      },
      {
        id: 3,
        question: "Under the Bio-Medical Waste Management Rules 2016 in India, which color-coded category bin is strictly designated for human anatomical waste, soiled dressings, and discarded cotton swabs?",
        options: [
          "Yellow Bin",
          "Red Bin",
          "Blue Box / Pouch",
          "White Translucent Container"
        ],
        correctAnswer: 0,
        explanation: "Yellow bins are strictly for incinerable waste (human tissues, soiled linen, expired medicines). Red bins are for recyclable contaminated plastics (IV tubes, catheters). White is for sharps. Blue is for glassware."
      },
      {
        id: 4,
        question: "What is the primary objective of NABH (National Accreditation Board for Hospitals & Healthcare Providers) accreditation?",
        options: [
          "Establishing and evaluating rigorous standards for patient safety, infection control, clinical governance, and continuous healthcare quality improvement",
          "Fixing standardized daily doctor consultation fees",
          "Issuing medical licenses to practicing surgeons",
          "Regulating the retail price of pharmaceutical drugs"
        ],
        correctAnswer: 0,
        explanation: "NABH (under the Quality Council of India) sets stringent continuous compliance standards covering Patient Centered Standards (Access, Assessment, Care, Medication) and Management Standards (Infection Control, Safety, Governance)."
      },
      {
        id: 5,
        question: "In healthcare Revenue Cycle Management (RCM), what does 'Denial Management' focus on?",
        options: [
          "Denying admission to uninsured emergency patients",
          "Analyzing, appealing, and rectifying health insurance / TPA claim rejections due to coding errors, missing pre-authorizations, or medical necessity queries to recover hospital revenue",
          "Denying leave requests submitted by hospital nursing staff",
          "Refusing to buy medical equipment from unaccredited vendors"
        ],
        correctAnswer: 1,
        explanation: "Denial Management identifies root causes behind insurer claim rejections (incorrect ICD-10/CPT coding, missing documentation, late filing), resubmitting clean appeals to maximize cash flow."
      },
      {
        id: 6,
        question: "Under the Ayushman Bharat PM-JAY (Pradhan Mantri Jan Arogya Yojana) scheme, what is the annual health insurance coverage provided per eligible family?",
        options: [
          "₹50,000 per family per year",
          "₹5,00,000 (5 Lakhs) per family per year for secondary and tertiary inpatient hospitalization care",
          "₹1,00,000 per family per year",
          "₹20,00,000 per family per year"
        ],
        correctAnswer: 1,
        explanation: "PM-JAY provides cashless and paperless hospitalization coverage of up to ₹5,00,000 per family per annum across empanelled public and private hospitals for over 12 crore poor and vulnerable families."
      },
      {
        id: 7,
        question: "What does 'ABDM' (Ayushman Bharat Digital Mission) and the 'ABHA' (Ayushman Bharat Health Account) ID establish?",
        options: [
          "A unified digital health ecosystem where citizens have a 14-digit unique health account ID allowing consent-based electronic health record (EHR) portability across disparate clinics and diagnostic labs",
          "A bank account for receiving government cash stipends",
          "A mobile app for ordering prescription glasses",
          "A database of medical malpractice court lawsuits"
        ],
        correctAnswer: 0,
        explanation: "ABHA IDs link diagnostic lab reports, clinical prescriptions, and discharge summaries into a standardized digital locker, leveraging FHIR interoperability standards across India's healthcare network."
      },
      {
        id: 8,
        question: "What is a 'Sentinel Event' in hospital quality and patient safety protocols?",
        options: [
          "An unanticipated event in a healthcare setting resulting in death or serious physical or psychological injury (e.g., wrong-site surgery, infant abduction) that triggers immediate Root Cause Analysis (RCA)",
          "A scheduled clinical audit conducted by the medical superintendent",
          "A hospital celebration commemorating World Health Day",
          "The daily handover shift report between ICU nurses"
        ],
        correctAnswer: 0,
        explanation: "Sentinel events are severe medical errors signaling urgent need for systemic investigation (RCA) and corrective actions to prevent recurrence, as mandated by NABH and JCI."
      },
      {
        id: 9,
        question: "What is the 'Hospital Infection Control' (HIC) rate metric 'CAUTI'?",
        options: [
          "Catheter-Associated Urinary Tract Infection",
          "Central Air Conditioning Unit Total Inspection",
          "Cardiovascular Acute Unit Treatment Index",
          "Clinical Audit Utilization Tracking Indicator"
        ],
        correctAnswer: 0,
        explanation: "CAUTI is a prominent hospital-acquired infection (HAI) tracked alongside CLABSI (Central Line Bloodstream Infection) and VAP (Ventilator-Associated Pneumonia) to gauge clinical hygiene excellence."
      },
      {
        id: 10,
        question: "In hospital financial management, what is 'Activity-Based Costing' (ABC) used for?",
        options: [
          "Allocating hospital indirect overheads (OT nursing, sterile processing, HVAC, depreciation) to specific clinical procedures and patient treatments based on actual resource consumption",
          "Calculating the hourly wage rate of cafeteria staff",
          "Tracking patient steps walked in post-operative physiotherapy",
          "Computing corporate income tax returns"
        ],
        correctAnswer: 0,
        explanation: "ABC tracks true procedure costs (e.g., CABG open heart surgery vs Laparoscopic Cholecystectomy) by assigning overheads across specific operational cost drivers rather than arbitrary blanket percentage markups."
      },
      {
        id: 11,
        question: "What is the primary role of a 'TPA' (Third-Party Administrator) in the health insurance ecosystem?",
        options: [
          "An intermediary licensed by IRDAI that processes cashless hospital pre-authorizations, medical claim document verifications, and hospital network empanelment on behalf of insurance companies",
          "A government department that inspects hospital kitchen food hygiene",
          "A private equity firm that buys struggling hospital chains",
          "A medical college that trains nurse anesthetists"
        ],
        correctAnswer: 0,
        explanation: "TPAs act as operational liaisons between insurers, policyholders, and empanelled network hospitals, adjudicating cashless hospitalization requests and managing claim settlements."
      },
      {
        id: 12,
        question: "Under the Clinical Establishments (Registration and Regulation) Act, what is mandated regarding emergency medical care?",
        options: [
          "All registered clinical establishments must provide immediate emergency medical treatment and stabilization to anyone suffering from acute trauma/emergency condition without insisting on pre-payment",
          "Hospitals must verify credit card limits before admitting road accident victims",
          "Private hospitals are exempt from treating emergency patients",
          "Emergency treatment can only be provided during regular daytime OPD hours"
        ],
        correctAnswer: 0,
        explanation: "The Clinical Establishments Act legally mandates that hospitals must immediately stabilize emergency trauma and life-threatening patients before initiating financial billing discussions."
      },
      {
        id: 13,
        question: "What is 'Telemedicine' regulated under the National Medical Commission (NMC) Telemedicine Practice Guidelines?",
        options: [
          "The delivery of healthcare services, clinical consultations, diagnosis, and prescription of approved medications using digital information and communication technologies (video/audio/chat)",
          "Selling generic pharmaceuticals through automated vending machines",
          "Broadcasting live surgeries on cable television channels",
          "Providing medical advice exclusively to foreign patients"
        ],
        correctAnswer: 0,
        explanation: "NMC guidelines authorize registered medical practitioners (RMPs) to consult, diagnose, and prescribe categorized medications (List A, B, C) via encrypted telemedicine channels adhering to patient privacy protocols."
      },
      {
        id: 14,
        question: "In hospital materials management, what is the 'Two-Bin System' used in nursing medication stations?",
        options: [
          "A simple visual Kanban inventory control method where stock is used from the first bin, and reaching the second reserve bin immediately triggers replenishment ordering",
          "A waste segregation system for plastic bottles and paper cups",
          "A storage system separating expensive medications from cheap ones",
          "A filing cabinet for storing physical patient medical records"
        ],
        correctAnswer: 0,
        explanation: "The two-bin system prevents ward stockouts: nurses draw supplies from Bin 1; when empty, it moves to the reorder tray while supplies are drawn from Bin 2 during replenishment cycle."
      },
      {
        id: 15,
        question: "What does 'Triage' in emergency department (ED) administration achieve?",
        options: [
          "The systematic clinical sorting and prioritization of incoming emergency patients based on medical acuity and urgency of care needed (e.g., Red: Immediate life-threat; Yellow: Urgent; Green: Non-urgent)",
          "Collecting hospital registration fees from arriving ambulance patients",
          "Allocating parking spaces for visiting doctors",
          "Sterilizing surgical instruments in central sterile supply"
        ],
        correctAnswer: 0,
        explanation: "Emergency triage (e.g., Manchester Triage or ESI) ensures that critical life-threatening conditions (cardiac arrest, severe polytrauma) receive instant resuscitation ahead of minor ambulatory complaints."
      },
      {
        id: 16,
        question: "What is 'Medical Tourism' (Medical Value Travel) and what makes accredited Indian hospitals attractive destinations globally?",
        options: [
          "Traveling abroad to attend medical academic conferences",
          "International patients traveling to accredited tertiary hospitals in India to receive complex surgical procedures (organ transplants, oncology, cardiac) at a fraction of Western costs with zero waiting times",
          "Sending hospital doctors on sponsored vacation tours",
          "Importing second-hand medical diagnostic scanners from overseas"
        ],
        correctAnswer: 1,
        explanation: "India's Medical Value Travel sector thrives on JCI-accredited tertiary infrastructure, globally trained clinicians, English-speaking staff, and high-quality outcomes at 70-80% lower costs than US/UK."
      },
      {
        id: 17,
        question: "What is the primary function of the 'CSSD' (Central Sterile Supply Department) in a modern multi-specialty hospital?",
        options: [
          "The centralized facility responsible for cleaning, decontaminating, inspecting, packaging, sterilizing (autoclave/ETO/plasma), and issuing sterile surgical instrument trays to Operation Theatres",
          "Managing employee monthly salary payroll and benefits",
          "Preparing central dining meals for inpatient wards",
          "Generating monthly patient billing invoices"
        ],
        correctAnswer: 0,
        explanation: "CSSD maintains surgical sterility across all Operation Theatres and procedural suites, utilizing rigorous biological spore indicator testing to prevent post-operative surgical site infections (SSI)."
      },
      {
        id: 18,
        question: "What is 'Case Mix Index' (CMI) in hospital clinical analytics?",
        options: [
          "A relative value metric quantifying the average clinical complexity, diagnostic severity, and resource intensity of patients treated in a hospital",
          "The ratio of male patients to female patients treated",
          "The total number of different medication brands stocked in the pharmacy",
          "The percentage of international patients admitted"
        ],
        correctAnswer: 0,
        explanation: "A higher CMI reflects a patient population with complex multi-morbidities requiring intensive diagnostics, advanced surgical interventions, and higher hospital resource allocation."
      },
      {
        id: 19,
        question: "What does the 'World Health Organization (WHO) Surgical Safety Checklist' mandate before surgical incision ('Time Out')?",
        options: [
          "A formal pause where the entire surgical team verbally confirms correct patient identity, surgical procedure, anatomical site marking, anticipated critical events, and antibiotic prophylaxis administration",
          "Signing the hospital financial liability bond",
          "Testing the operating theatre room lighting",
          "Calling the patient's family members into the OT room"
        ],
        correctAnswer: 0,
        explanation: "The WHO 3-phase checklist (Sign In, Time Out, Sign Out) drastically reduces perioperative mortality and surgical site errors by enforcing structured team cross-checks before knife-to-skin."
      },
      {
        id: 20,
        question: "What is 'Health Technology Assessment' (HTA) used for by healthcare policymakers and hospital leaders?",
        options: [
          "The systematic evaluation of properties, clinical efficacy, safety, cost-effectiveness, and ethical/social consequences of medical devices, drugs, and health interventions to inform capital procurement and policy decisions",
          "Checking internet bandwidth speed in hospital offices",
          "Testing mobile smartphone battery life",
          "Conducting background checks on biomedical engineers"
        ],
        correctAnswer: 0,
        explanation: "HTA evaluates whether an expensive new technology (e.g., robotic surgical systems, proton beam therapy) delivers sufficient incremental clinical value (QALY gains) to justify its high capital investment."
      }
    ]
  },

  // =========================================================================
  // 9. PHARMA MANAGEMENT - 20 High-Yield MBA Questions
  // =========================================================================
  {
    id: "pharma",
    name: "MBA Pharmaceutical Management & Life Sciences Strategy",
    shortTitle: "Pharma",
    category: "Sectoral MBA",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    accentColor: "from-indigo-500 to-purple-600",
    iconName: "Pill",
    certificateTitle: "Executive Certification in Pharmaceutical Management & Regulatory Strategy",
    description: "Evaluates mastery in Global Regulatory Affairs (USFDA 21 CFR, ANDA, Paragraph IV), Pharma Brand Strategy, Clinical Trial Phases I-IV, DPCO Pricing, and Biologics Cold-Chain Logistics.",
    avgSalary: "₹12 - 25 LPA",
    topRecruiters: ["Sun Pharma", "Dr. Reddy's Laboratories", "Cipla", "Lupin", "Torrent Pharma", "Novartis", "Pfizer", "Abbott"],
    keyCompetencies: [
      "Global Regulatory Filings (USFDA ANDA vs NDA)",
      "Hatch-Waxman Act, Paragraph IV & Patent Cliffs",
      "Clinical Trials Phase I-IV & ICH-GCP Guidelines",
      "Pharma Brand Detailing & Key Opinion Leader (KOL) Strategy",
      "DPCO (Drug Price Control Order) & NLEM Regulations"
    ],
    syllabus: [
      "Abbreviated New Drug Application (ANDA) & Bioequivalence (BE) Studies",
      "Hatch-Waxman 180-Day Generic Exclusivity & Patent Litigation",
      "USFDA Form 483, Warning Letters & Good Manufacturing Practices (cGMP)",
      "Pharma Sales Force Effectiveness (SFE), Detailing Index & Prescription Share",
      "Pharmacovigilance (PV), Adverse Drug Reaction (ADR) Reporting & Signal Detection"
    ],
    passingScore: 12.0,
    totalQuestions: 20,
    timeLimitMinutes: 25,
    negativeMarking: 0.33,
    questions: [
      {
        id: 1,
        question: "Under the US Hatch-Waxman Act, what is an 'ANDA' (Abbreviated New Drug Application) and what must a generic manufacturer prove?",
        options: [
          "An application to market a generic drug by demonstrating that it is bioequivalent and therapeutically equivalent to the innovator Reference Listed Drug (RLD) without repeating expensive clinical safety trials",
          "An application to sell chemical fertilizers in agricultural markets",
          "A patent filing for a completely novel active chemical molecule",
          "An application to import raw packaging material from foreign countries"
        ],
        correctAnswer: 0,
        explanation: "ANDA allows generic drug manufacturers to rely on the innovator's established safety and efficacy data, proving only Bioequivalence (within 80%-125% pharmacokinetic 90% CI for AUC and Cmax)."
      },
      {
        id: 2,
        question: "What is the lucrative reward for a generic pharmaceutical company that successfully files a 'Paragraph IV Certification' under the Hatch-Waxman Act?",
        options: [
          "180-day market exclusivity as the sole generic competitor against the brand-name innovator drug",
          "A permanent 20-year monopoly on global sales",
          "Complete exemption from US corporate taxes for 5 years",
          "Free advertising broadcast on US national television"
        ],
        correctAnswer: 0,
        explanation: "First-to-file generic applicants with Paragraph IV certifications (asserting the brand's patent is invalid or not infringed) earn 180 days of exclusive generic marketing rights, generating massive launch revenues."
      },
      {
        id: 3,
        question: "In Clinical Trial Development (Phase I to IV), what is the primary objective of a 'Phase I' clinical study?",
        options: [
          "Evaluating drug safety, tolerability, pharmacokinetics (PK), and Maximum Tolerated Dose (MTD) in a small cohort (20-80) of healthy human volunteers",
          "Demonstrating therapeutic efficacy in thousands of diseased patients",
          "Conducting post-marketing safety surveillance after commercial drug launch",
          "Designing consumer advertising packaging boxes"
        ],
        correctAnswer: 0,
        explanation: "Phase I evaluates human safety, metabolic pathways, and safe dosage ranges. Phase II tests proof of concept/efficacy in target patients. Phase III confirms efficacy in large randomized cohorts. Phase IV is post-marketing surveillance."
      },
      {
        id: 4,
        question: "What is a 'USFDA Form 483' issued to a pharmaceutical manufacturing facility?",
        options: [
          "A formal notice issued by FDA investigators at the conclusion of an on-site inspection detailing observed non-compliance with Current Good Manufacturing Practice (cGMP) regulations",
          "An official certificate of excellence awarding clean factory approval",
          "An import license permitting immediate shipping of drugs to the United States",
          "A tax invoice for inspection travel expenses"
        ],
        correctAnswer: 0,
        explanation: "Form 483 lists objectionable conditions observed by FDA inspectors regarding data integrity, contamination control, or quality systems, which must be comprehensively resolved within 15 working days to avoid Warning Letters."
      },
      {
        id: 5,
        question: "What does the 'DPCO' (Drug Price Control Order) enforced by NPPA (National Pharmaceutical Pricing Authority) in India regulate?",
        options: [
          "It caps the ceiling prices of essential medicines listed under the National List of Essential Medicines (NLEM) based on simple market-average pricing formulas",
          "It mandates that all medicines must be exported overseas",
          "It regulates the salaries of medical sales representatives",
          "It sets statutory hospital room rent charges"
        ],
        correctAnswer: 0,
        explanation: "NPPA regulates ceiling prices of essential schedule drugs listed in NLEM using market-based pricing (average price to retailer of all brands with >= 1% market share + 16% retailer margin)."
      },
      {
        id: 6,
        question: "In Pharmaceutical Sales Force Effectiveness (SFE), what does 'Doctor Detailing' mean?",
        options: [
          "The structured scientific presentation delivered by a Medical Representative (MR) to a practicing physician detailing clinical efficacy, safety profiles, and prescribing indications of the pharmaceutical brand",
          "Cleaning and detailing the doctor's personal automobile",
          "Auditing the doctor's annual income tax statements",
          "Checking the hospital's pharmacy inventory balance sheet"
        ],
        correctAnswer: 0,
        explanation: "Doctor detailing leverages scientific visual aids (LBLs, iPad interactive detailing) to educate prescribing physicians on mechanism of action, clinical trial results, and patient dosage regimens."
      },
      {
        id: 7,
        question: "What is a 'Biosimilar' drug and how does it differ from a traditional small-molecule generic drug?",
        options: [
          "A biological medicinal product highly similar to an approved Reference Biologic in structure, purity, and clinical efficacy, but not an identical generic replica due to complex protein manufacturing in living cell lines",
          "An identical chemical copy synthesized in a simple chemical reactor",
          "A herbal homeopathic remedy sold without prescription",
          "A synthetic vitamin tablet"
        ],
        correctAnswer: 0,
        explanation: "Biologics (monoclonal antibodies, vaccines) are large, complex proteins grown in living host systems. Biosimilars demonstrate no clinically meaningful differences compared to the reference biological originator."
      },
      {
        id: 8,
        question: "What is 'Pharmacovigilance' (PV) and 'Signal Detection' in life sciences companies?",
        options: [
          "The science and activities relating to the detection, assessment, understanding, and prevention of Adverse Drug Reactions (ADRs) and long-term drug safety issues across the product lifecycle",
          "Hiring private security guards to protect pharmaceutical warehouses",
          "Tracking competitor pricing promotions in retail chemist shops",
          "Monitoring the speed of delivery trucks using GPS"
        ],
        correctAnswer: 0,
        explanation: "Pharmacovigilance monitors global post-marketing safety databases (e.g., FDA FAERS) to identify emergent adverse event signals and update product warning labels or initiate drug recalls."
      },
      {
        id: 9,
        question: "What is a 'Patent Cliff' in the global pharmaceutical industry?",
        options: [
          "A steep revenue collapse experienced by an innovator pharma company when the 20-year patent protection on its blockbuster drug expires, triggering rapid loss of market share to low-cost generic entrants",
          "A physical cliff near patent office headquarters",
          "A legal restriction banning the patenting of all medical inventions",
          "A sudden increase in corporate patent application filing fees"
        ],
        correctAnswer: 0,
        explanation: "Upon patent expiry, generic alternatives enter at 80-90% discounted prices, capturing up to 80-90% of the blockbuster's volume within 6-12 months (e.g., Lipitor, Humira patent cliffs)."
      },
      {
        id: 10,
        question: "In pharmaceutical marketing strategy, who is a 'KOL' (Key Opinion Leader)?",
        options: [
          "A prominent, highly respected medical academic physician or clinical researcher whose published research, conference presentations, and peer influence shape prescribing behaviors across the broader medical community",
          "The chief procurement officer of a retail pharmacy chain",
          "The senior-most sales representative in an assigned territory",
          "A government pharmaceutical drug inspector"
        ],
        correctAnswer: 0,
        explanation: "KOLs (leading medical specialists, department heads) are engaged through Advisory Boards, Continuing Medical Education (CME) programs, and clinical trial steering committees to build scientific credibility."
      },
      {
        id: 11,
        question: "What is the 'Orange Book' published by the USFDA?",
        options: [
          "An official publication listing Approved Drug Products with Therapeutic Equivalence Evaluations, active patents, and regulatory market exclusivity periods",
          "A recipe book for flavoring pediatric syrup medications",
          "A directory of telephone numbers of pharmaceutical sales managers",
          "A list of banned toxic chemical pesticides"
        ],
        correctAnswer: 0,
        explanation: "The FDA Orange Book identifies Reference Listed Drugs (RLDs), generic therapeutic equivalence codes (e.g., AB rating), and valid patent expiration dates essential for ANDA filing strategies."
      },
      {
        id: 12,
        question: "What does 'Good Clinical Practice' (ICH-GCP) guidelines establish for clinical trials?",
        options: [
          "An international ethical and scientific quality standard for designing, conducting, recording, and reporting human clinical trials to protect trial subjects' rights and ensure credible data integrity",
          "A guideline for setting doctor consultation fees",
          "A dress code policy for hospital laboratory technicians",
          "A checklist for cleaning operating theatre floors"
        ],
        correctAnswer: 0,
        explanation: "ICH-GCP ensures that clinical trials adhere to the Declaration of Helsinki (informed consent, Institutional Review Board approval) and produce robust, audit-proof clinical evidence."
      },
      {
        id: 13,
        question: "What is an 'API' (Active Pharmaceutical Ingredient) in drug manufacturing terminology?",
        options: [
          "The biologically active chemical substance or molecule in a finished pharmaceutical dosage form responsible for producing direct therapeutic pharmacological effects",
          "A software interface for ordering medicines online",
          "The inactive filler starch or binding sugar used in tablets",
          "The plastic blister packaging film"
        ],
        correctAnswer: 0,
        explanation: "The API is the core medicinal chemical (e.g., Paracetamol active molecule), which is combined with inactive excipients (binders, disintegrants, colorings) to manufacture finished dosage Formulations."
      },
      {
        id: 14,
        question: "What is 'Serialization and Track-and-Trace' (e.g., 2D DataMatrix barcode) mandated on export pharmaceutical packaging?",
        options: [
          "Assigning unique, serialized 2D barcodes to individual medicine packs to enable end-to-end supply chain verification, combat counterfeit drugs, and facilitate rapid batch recalls",
          "Printing colorful advertisements on medication boxes",
          "Numbering manufacturing factory rooms sequentially",
          "Tracking employee attendance in pharmaceutical plants"
        ],
        correctAnswer: 0,
        explanation: "Global serialization regulations (e.g., US DSCSA, EU FMD) require unique unit-level identifiers (GTIN, Serial Number, Batch, Expiry) to verify genuine provenance across wholesale distributor handovers."
      },
      {
        id: 15,
        question: "In pharmaceutical market research, what does the 'Prescription Share' (Share of Prescriptions / SoP) metric indicate?",
        options: [
          "The brand's total written prescriptions as a percentage of total prescriptions written across all competing drugs within the therapeutic category in a specified territory",
          "The total number of paper prescription pads printed by a clinic",
          "The profit margin shared between doctors and retail chemists",
          "The percentage of prescriptions written with blue ink pens"
        ],
        correctAnswer: 0,
        explanation: "Prescription Share (audited via panels like IQVIA / Pharmarack) reflects physician brand preference and brand market share dynamics across cardiology, diabetology, oncology, etc."
      },
      {
        id: 16,
        question: "What is the primary role of an 'Institutional Review Board' (IRB) / Independent Ethics Committee (IEC)?",
        options: [
          "An independent committee of medical professionals and non-scientific members tasked with reviewing, approving, and monitoring clinical trial protocols to protect the rights, safety, and well-being of human participants",
          "A committee that audits hospital corporate balance sheets",
          "A board that negotiates doctor annual salary increments",
          "A panel that selects pharmaceutical TV advertising commercials"
        ],
        correctAnswer: 0,
        explanation: "IRB/IEC review is mandatory before any clinical trial can enroll patients, ensuring informed consent is obtained and risk-benefit ratios are ethically sound."
      },
      {
        id: 17,
        question: "What is an 'Evergreening' strategy in pharmaceutical patent portfolio management?",
        options: [
          "Extending legal monopoly protection on an aging drug by patenting incremental modifications (new salt forms, polymorphs, sustained-release formulations, combinations) to delay generic competition",
          "Planting green trees around pharmaceutical manufacturing facilities",
          "Using organic packaging materials for medicine bottles",
          "Selling generic medicines in green-colored boxes"
        ],
        correctAnswer: 0,
        explanation: "Evergreening seeks secondary patents on minor drug formulation changes. In India, Section 3(d) of the Patents Act strictly restricts patenting new forms of known substances unless they demonstrate significantly enhanced therapeutic efficacy."
      },
      {
        id: 18,
        question: "What is a 'CRO' (Contract Research Organization) in the biopharmaceutical industry?",
        options: [
          "A specialized company providing outsourced clinical trial management, protocol design, biostatistical analysis, and regulatory filing services to sponsor pharma companies",
          "A government department regulating corporate retail prices",
          "A commercial bank financing pharmaceutical factory construction",
          "A legal firm specializing in employment disputes"
        ],
        correctAnswer: 0,
        explanation: "Pharma sponsors partner with CROs (e.g., IQVIA, Syneos, Veeda) to manage multi-center global clinical trials across diverse hospital sites efficiently without maintaining massive in-house clinical trial staff."
      },
      {
        id: 19,
        question: "In pharmaceutical product management, what is a 'Black Box Warning' (Boxed Warning) on a drug package insert?",
        options: [
          "The strictest safety warning mandated by the USFDA appearing prominently on prescription drug labeling to alert prescribers to serious, potentially life-threatening adverse risks",
          "A label indicating the product must be stored in a dark room",
          "A decorative black graphic border around brand logo packaging",
          "A notice that the product is imported from an overseas factory"
        ],
        correctAnswer: 0,
        explanation: "A Boxed Warning (highlighted with a heavy black border) is the highest regulatory alert for severe clinical risks (e.g., increased cardiovascular events, suicidality risks, hepatic toxicity)."
      },
      {
        id: 20,
        question: "What is 'Formulation Development' (F&D) in pharmaceutical R&D labs?",
        options: [
          "The process of blending the Active Pharmaceutical Ingredient (API) with compatible excipients and polymers to produce a stable, bioavailable final dosage form (tablet, capsule, injectable, transdermal patch)",
          "Writing legal contracts for clinical trial investigators",
          "Calculating the retail profit margin percentage for distributors",
          "Designing corporate company logos and letterheads"
        ],
        correctAnswer: 0,
        explanation: "F&D scientists design the physical drug matrix (dissolution kinetics, pharmacokinetic bioavailability, chemical stability, particle size) to ensure optimal therapeutic drug delivery in human biological systems."
      }
    ]
  },

  // =========================================================================
  // 10. BUSINESS ANALYTICS & DECISION SCIENCES - 20 High-Yield MBA Questions
  // =========================================================================
  {
    id: "business-analytics",
    name: "MBA Business Analytics & Enterprise Decision Sciences",
    shortTitle: "Business Analytics",
    category: "Emerging Tech MBA",
    badgeColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    accentColor: "from-violet-500 to-purple-600",
    iconName: "BarChart3",
    certificateTitle: "Executive Certification in Business Analytics & Enterprise Data Intelligence",
    description: "Evaluates mastery in Predictive Machine Learning Models, SQL for Decision Support, Executive BI Dashboards (Tableau/Power BI), A/B Testing & Causal Inference, and Customer Churn Analytics.",
    avgSalary: "₹14 - 30 LPA",
    topRecruiters: ["Mu Sigma", "Fractal Analytics", "EXL Service", "Tiger Analytics", "Amazon Analytics", "McKinsey QuantumBlack", "Bain Vector"],
    keyCompetencies: [
      "Predictive Modeling, Logistic Regression & Tree Ensembles",
      "Advanced SQL, CTEs & Window Functions for Business",
      "Executive Data Storytelling (Power BI & Tableau)",
      "A/B Testing, Hypothesis Testing & Power Analysis",
      "Customer Churn, CLV & Cohort Survival Analytics"
    ],
    syllabus: [
      "Type I & Type II Decision Errors, Confusion Matrix & ROC-AUC",
      "SQL Window Functions (ROW_NUMBER, RANK, DENSE_RANK & LEAD/LAG)",
      "A/B Testing Minimum Detectable Effect (MDE) & P-Value Calibration",
      "Supervised vs Unsupervised ML (K-Means Clustering & Random Forest)",
      "Cohort Heatmaps, Churn Probability & Survival Hazard Models"
    ],
    passingScore: 12.0,
    totalQuestions: 20,
    timeLimitMinutes: 25,
    negativeMarking: 0.33,
    questions: [
      {
        id: 1,
        question: "In predictive analytics and hypothesis testing, what constitutes a 'Type I Error' versus a 'Type II Error'?",
        options: [
          "Type I Error is a False Positive (rejecting a true null hypothesis); Type II Error is a False Negative (failing to reject a false null hypothesis)",
          "Type I Error is a mathematical rounding mistake; Type II Error is a missing database row",
          "Type I Error occurs in training data; Type II Error occurs in test data",
          "Type I Error is always harmless; Type II Error is always fatal"
        ],
        correctAnswer: 0,
        explanation: "Type I (α) is a False Positive (e.g., convicting an innocent person / declaring an ineffective marketing campaign a success). Type II (β) is a False Negative (e.g., failing to detect a fraudulent transaction)."
      },
      {
        id: 2,
        question: "In Advanced SQL for business analysis, what is the key difference between RANK() and DENSE_RANK() window functions when evaluating tied values?",
        options: [
          "RANK() skips subsequent rank numbers after a tie (e.g., 1, 2, 2, 4), while DENSE_RANK() assigns consecutive sequential rankings without gaps (e.g., 1, 2, 2, 3)",
          "RANK() sorts ascending, while DENSE_RANK() sorts descending",
          "DENSE_RANK() only works with integer columns",
          "RANK() is an aggregation function, while DENSE_RANK() is a scalar function"
        ],
        correctAnswer: 0,
        explanation: "When ranking sales reps with tied revenue: RANK() produces gaps (1, 2, 2, 4), whereas DENSE_RANK() maintains tight uninterrupted rank sequences (1, 2, 2, 3)."
      },
      {
        id: 3,
        question: "When evaluating an imbalanced classification model for rare event detection (e.g., 0.5% Credit Card Fraud rate), why is 'Accuracy' a dangerously misleading metric?",
        options: [
          "A naive model predicting 'No Fraud' for 100% of transactions will achieve 99.5% accuracy while failing to detect a single actual fraudulent transaction",
          "Accuracy cannot be computed on decimal numbers",
          "Accuracy is only applicable to unsupervised clustering models",
          "Accuracy is always lower than Precision and Recall"
        ],
        correctAnswer: 0,
        explanation: "With extreme class imbalance, raw accuracy is useless. Business analytics models must be evaluated using Precision, Recall, F1-Score, and Precision-Recall Area Under Curve (PR-AUC)."
      },
      {
        id: 4,
        question: "In Binary Logistic Regression modeling, how is the 'Odds Ratio' (OR) interpreted for an independent predictor variable?",
        options: [
          "OR = exp(β); it represents the multiplicative change in the odds of the target outcome occurring for every one-unit increase in the predictor variable",
          "OR is the simple correlation coefficient between the two variables",
          "OR is the percentage of missing values in the dataset",
          "OR represents the absolute difference in dollar sales revenue"
        ],
        correctAnswer: 0,
        explanation: "In logistic regression, the coefficient β represents log-odds. Exponentiating it [exp(β)] yields the Odds Ratio: an OR of 1.35 indicates a 35% higher odds of customer churn per unit increase in complaints."
      },
      {
        id: 5,
        question: "In A/B experiment design, what does 'Statistical Power' (1 - β) represent?",
        options: [
          "The probability of correctly detecting a true treatment effect of a specified magnitude (e.g., 5% conversion uplift) when an actual difference genuinely exists",
          "The total computational processing power of the database server",
          "The percentage of website visitors assigned to Variant B",
          "The maximum daily ad spend allocated to the experiment"
        ],
        correctAnswer: 0,
        explanation: "Statistical Power (conventionally set at 80% or 90%) ensures the experiment sample size is large enough to reliably detect a meaningful Minimum Detectable Effect (MDE) without false negative failures."
      },
      {
        id: 6,
        question: "What is the primary objective of 'K-Means Clustering' in customer segmentation analysis?",
        options: [
          "Partitioning unlabelled customer records into K distinct non-overlapping clusters such that within-cluster variance (inertia) is minimized and between-cluster distance is maximized",
          "Predicting exact future stock market closing prices",
          "Sorting customer names alphabetically",
          "Detecting missing primary keys in SQL tables"
        ],
        correctAnswer: 0,
        explanation: "K-Means is an unsupervised machine learning algorithm that groups customers into homogeneous behavioral clusters by iteratively minimizing the sum of squared Euclidean distances to cluster centroids."
      },
      {
        id: 7,
        question: "In business data modeling, what is the difference between a 'Star Schema' and a 'Snowflake Schema' in an enterprise Data Warehouse?",
        options: [
          "In a Star Schema, dimension tables are denormalized and connect directly to the central Fact table in a single join; in a Snowflake Schema, dimension tables are normalized into multi-level hierarchical sub-tables",
          "Star schemas are for cloud databases; snowflake schemas are strictly on-premise",
          "Star schemas have no primary keys",
          "Snowflake schemas cannot store numerical business metrics"
        ],
        correctAnswer: 0,
        explanation: "Star schemas prioritize query performance and fast analytical BI dashboard slicing via denormalized dimensions. Snowflake schemas normalize dimension hierarchies (e.g., Product -> Category -> Department) to minimize storage redundancy."
      },
      {
        id: 8,
        question: "What does 'Overfitting' mean in predictive machine learning, and how is it diagnosed?",
        options: [
          "When a model memorizes the training data noise and performs exceptionally well on training sets but fails to generalize, yielding poor performance on unseen validation/test data",
          "When a dataset has too few columns",
          "When the machine learning model takes longer than 1 minute to train",
          "When all data rows are completely identical"
        ],
        correctAnswer: 0,
        explanation: "Overfitting (high variance) occurs when complex models learn random noise in the training sample. It is diagnosed by a large performance gap between training accuracy and cross-validation/test accuracy, corrected via regularization (L1/L2) and pruning."
      },
      {
        id: 9,
        question: "In Customer Retention Analytics, what is a 'Cohort Analysis Heatmap' primarily used to visualize?",
        options: [
          "Tracking the percentage of customers acquired in a specific month (cohort) who remain active and make repeat purchases across subsequent lifecycle months",
          "Displaying physical geographic heatmaps of store locations",
          "Monitoring the internal CPU temperature of company data servers",
          "Measuring employee daily office badge swipe times"
        ],
        correctAnswer: 0,
        explanation: "Cohort heatmaps group customers by acquisition date, plotting retention decay curves over time (Month 0, Month 1, Month 2...) to reveal whether product improvements are increasing long-term user stickiness."
      },
      {
        id: 10,
        question: "In Decision Tree algorithms (e.g., CART / Random Forest), what does 'Gini Impurity' measure?",
        options: [
          "The probability that a randomly chosen element from a dataset node would be incorrectly labeled if it were randomly labeled according to the class distribution in the subset",
          "The physical impurity of manufacturing raw materials",
          "The percentage of duplicate rows in a database table",
          "The network latency in transferring data packets"
        ],
        correctAnswer: 0,
        explanation: "Gini Impurity = 1 - Σ(pi²). A pure node containing only one class has a Gini score of 0.0. Decision trees split nodes along features that maximize Gini Impurity reduction (Information Gain)."
      },
      {
        id: 11,
        question: "In Time Series Forecasting for quarterly sales, what does the 'ARIMA(p, d, q)' model represent?",
        options: [
          "AutoRegressive (p) terms, Integrated (d) differencing order for stationarity, and Moving Average (q) error terms",
          "Annual Revenue Index for Market Analysis",
          "Automated Robotic Intelligence for Marketing Actions",
          "Average Rate of Interest on Municipal Assets"
        ],
        correctAnswer: 0,
        explanation: "ARIMA models capture temporal autocorrelations: AR(p) uses past values, I(d) removes trends/seasonality to make the series stationary, and MA(q) models lagged forecast error residuals."
      },
      {
        id: 12,
        question: "What does the 'ROC-AUC' (Receiver Operating Characteristic - Area Under Curve) metric evaluate for a classification model?",
        options: [
          "The model's ability to discriminate between positive and negative classes across all possible decision probability thresholds (plotting True Positive Rate vs False Positive Rate)",
          "The percentage of missing values in the target column",
          "The execution time required to render a BI dashboard visual",
          "The total annual dollar savings from automation"
        ],
        correctAnswer: 0,
        explanation: "ROC-AUC ranges from 0.5 (random coin toss) to 1.0 (perfect classification). An AUC of 0.88 means there is an 88% probability that the model ranks a randomly chosen positive customer above a randomly chosen negative customer."
      },
      {
        id: 13,
        question: "What is 'Feature Importance' in tree-based ensemble models like Random Forest and XGBoost?",
        options: [
          "A metric calculating the relative contribution of each input variable in reducing impurity (e.g., Gini gain / variance reduction) across all trees in the ensemble",
          "The font size used to display column names in Excel",
          "The monetary cost paid to acquire that specific data field",
          "The order in which columns were originally created in SQL"
        ],
        correctAnswer: 0,
        explanation: "Feature importance scores rank predictors by their total predictive power (Gini gain or SHAP values), enabling business analysts to explain which drivers most heavily influence customer behaviors."
      },
      {
        id: 14,
        question: "In Executive BI Dashboard Design (Power BI / Tableau), why is 'Data-to-Ink Ratio' (Edward Tufte principle) critical for executive decision making?",
        options: [
          "Maximizing the share of visual ink devoted to communicating core data while eliminating decorative clutter, redundant 3D bevels, and non-essential gridlines to accelerate cognitive insight",
          "Printing all business dashboards on physical glossy paper using expensive colored ink",
          "Ensuring that every chart contains at least 15 different bright colors",
          "Filling every single pixel of white space on the dashboard screen"
        ],
        correctAnswer: 0,
        explanation: "High data-to-ink ratio focuses executive attention on key performance indicators (KPIs) and trends without distraction from visual chartjunk, decorative 3D effects, or redundant legends."
      },
      {
        id: 15,
        question: "What is 'Simpson's Paradox' in statistical data analysis?",
        options: [
          "A phenomenon where a clear trend or correlation appears in different sub-groups of data, but completely disappears or reverses when the groups are combined into an aggregate total",
          "A software bug where data rows double automatically",
          "A mathematical proof that sample sizes above 30 are always identical",
          "A method for multiplying matrices in linear algebra"
        ],
        correctAnswer: 0,
        explanation: "Simpson's Paradox occurs due to unobserved confounding variables. For example, a hospital may appear to have higher aggregate mortality rates simply because it treats a disproportionate share of severe, high-risk cases."
      },
      {
        id: 16,
        question: "In SQL data manipulation, what does a Common Table Expression (CTE) created with the 'WITH' clause provide?",
        options: [
          "A temporary, named intermediate result set that simplifies complex multi-step queries, improves readability, and enables recursive querying",
          "A permanent database table that cannot be deleted",
          "An encryption protocol for storing passwords",
          "A method to automatically convert SQL into Python code"
        ],
        correctAnswer: 0,
        explanation: "CTEs (`WITH cte_name AS (...)`) modularize complex nested subqueries into readable, reusable building blocks, drastically simplifying multi-touch attribution and cohort SQL logic."
      },
      {
        id: 17,
        question: "What is 'Survival Analysis' (Kaplan-Meier estimator / Cox Proportional Hazards) used for in business analytics?",
        options: [
          "Modeling 'Time-to-Event' data, such as the probability distribution of how long a customer will remain active before churning, accounting for right-censored active customers",
          "Calculating the structural earthquake safety of office buildings",
          "Predicting factory machinery physical obsolescence",
          "Calculating employee life insurance premium deductions"
        ],
        correctAnswer: 0,
        explanation: "Survival analysis models customer lifecycle durations while properly handling 'censored' data (customers who are still active and have not yet churned at the time of observation)."
      },
      {
        id: 18,
        question: "In Predictive Analytics, what is 'Multicollinearity' and why is it problematic in Multiple Linear Regression?",
        options: [
          "A condition where two or more independent predictor variables are highly correlated with each other, inflating standard errors and making individual coefficient estimates unstable and unreliable",
          "A dataset having more rows than columns",
          "A situation where the dependent variable is binary",
          "A data entry error where numbers are entered as text strings"
        ],
        correctAnswer: 0,
        explanation: "High multicollinearity (Variance Inflation Factor VIF > 5-10) makes it mathematically impossible to isolate the individual effect of each predictor on the target variable."
      },
      {
        id: 19,
        question: "What is the primary difference between 'Supervised Learning' and 'Unsupervised Learning'?",
        options: [
          "Supervised learning trains models on labeled historical data with a known target outcome variable; Unsupervised learning discovers hidden patterns, groupings, and structures in unlabeled data without predefined ground truth",
          "Supervised learning requires human engineers to sit at the computer during training; Unsupervised learning runs automatically overnight",
          "Supervised learning is for small datasets; Unsupervised learning is strictly for big data",
          "Supervised learning cannot make predictions on new data"
        ],
        correctAnswer: 0,
        explanation: "Supervised models (Regression, Classification) map inputs (X) to known labeled targets (Y). Unsupervised models (Clustering, PCA, Association Rules) uncover intrinsic data geometry without explicit target labels."
      },
      {
        id: 20,
        question: "In Big Data Architecture, what is the 'ELT' (Extract, Load, Transform) paradigm used in modern Cloud Data Warehouses (Snowflake, BigQuery, Databricks)?",
        options: [
          "Raw data is extracted from source systems, loaded directly into the cloud data warehouse in its native format, and transformed inside the scalable distributed cloud compute engine using SQL / dbt",
          "Data is transformed manually in Excel spreadsheets before loading into databases",
          "Data is encrypted and locked in offline magnetic tape drives",
          "Data is deleted immediately after being generated"
        ],
        correctAnswer: 0,
        explanation: "Modern ELT leverages virtually unlimited cloud processing power to store raw immutable data first, running transformations and aggregations in-warehouse on demand (using dbt/SQL) rather than through legacy pre-load ETL bottlenecks."
      }
    ]
  }
];

// Helper to look up specialization by slug
export function getSpecializationById(id: string): SpecializationDomain {
  const found = MBA_SPECIALIZATIONS.find(s => s.id === id);
  return found || MBA_SPECIALIZATIONS[0];
}
