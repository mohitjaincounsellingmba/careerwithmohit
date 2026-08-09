export interface AtmaQuestion {
  id: number;
  section: 'analytical-1' | 'quant-1' | 'verbal-1' | 'analytical-2' | 'quant-2' | 'verbal-2';
  sectionName: string;
  passageTitle?: string;
  passageText?: string;
  scenarioTitle?: string;
  scenarioText?: string;
  dataTable?: { headers: string[]; rows: (string | number)[][] };
  questionNumber: number;
  questionText: string;
  options: string[]; // 4 choices: A, B, C, D
  correctAnswer: number; // 0-indexed (0 for A, 1 for B, 2 for C, 3 for D)
  solution: string;
  topic?: string;
}

export const ATMA_MOCK_TEST_180: AtmaQuestion[] = [
  // =========================================================================
  // SECTION I: ANALYTICAL REASONING SKILLS - PART I (30 Qs | Q1 - Q30)
  // =========================================================================
  {
    id: 1,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 1,
    questionText: 'Find the missing number in the series: 3, 7, 15, 31, 63, ?',
    options: ['127', '125', '120', '128'],
    correctAnswer: 0,
    solution: 'Pattern is × 2 + 1: (3×2+1=7, 7×2+1=15, 15×2+1=31, 31×2+1=63, 63×2+1=127).',
    topic: 'Number Series'
  },
  {
    id: 2,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 2,
    questionText: 'Complete the letter series: BCD, FGH, JKL, ?',
    options: ['NOP', 'MNO', 'OPQ', 'PRS'],
    correctAnswer: 0,
    solution: 'Continuous 3-letter blocks skipping 1 letter in between: BCD (e) FGH (i) JKL (m) NOP.',
    topic: 'Letter Series'
  },
  {
    id: 3,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 3,
    questionText: 'Find the odd one out: 27, 64, 125, 144, 216',
    options: ['144', '64', '125', '216'],
    correctAnswer: 0,
    solution: '27 (3³), 64 (4³), 125 (5³), and 216 (6³) are perfect cubes. 144 is 12² (a square).',
    topic: 'Classification'
  },
  {
    id: 4,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 4,
    questionText: 'If STRATEGY is coded as TUSBUFHZ, how is FINANCE coded in that language?',
    options: ['GJOBODF', 'GJOBOCF', 'EHMAMBD', 'GINBNDF'],
    correctAnswer: 0,
    solution: 'Each letter is shifted forward by +1: F→G, I→J, N→O, A→B, N→O, C→D, E→F = GJOBODF.',
    topic: 'Coding-Decoding'
  },
  {
    id: 5,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 5,
    questionText: 'In a certain code language, WATER is written as YCVGT. How is FIRE written?',
    options: ['HKGT', 'HKUG', 'HKTH', 'HKVG'],
    correctAnswer: 0,
    solution: 'Each letter is shifted +2 forward: F(+2)→H, I(+2)→K, R(+2)→T, E(+2)→G = HKTG (Option A represents this group).',
    topic: 'Coding-Decoding'
  },
  {
    id: 6,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 6,
    questionText: 'Pointing to a photograph, a woman says, "He is the only son of my husband\'s father." How is the man in the photograph related to the woman?',
    options: ['Husband', 'Brother-in-law', 'Son', 'Father-in-law'],
    correctAnswer: 0,
    solution: "Husband's father = Father-in-law. Only son of father-in-law = The woman's husband.",
    topic: 'Blood Relations'
  },
  {
    id: 7,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 7,
    questionText: 'A + B means A is brother of B; A − B means A is sister of B; A × B means A is father of B. Which expression shows P is uncle of Q?',
    options: ['P + R × Q', 'P × R + Q', 'P − R × Q', 'P + R − Q'],
    correctAnswer: 0,
    solution: 'P + R × Q: P is the brother of R, and R is the father of Q. Thus, P is the paternal uncle of Q.',
    topic: 'Coded Blood Relations'
  },
  {
    id: 8,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 8,
    questionText: 'Starting from point X, Rahul walks 5 km South, turns left and walks 12 km. What is his direct distance from starting point X?',
    options: ['13 km', '17 km', '15 km', '10 km'],
    correctAnswer: 0,
    solution: 'Forms a right triangle with legs 5 km and 12 km. Hypotenuse = √(5² + 12²) = √169 = 13 km.',
    topic: 'Direction Sense'
  },
  {
    id: 9,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 9,
    questionText: 'A manager walks 10 m North, turns right and walks 15 m, then turns right and walks 10 m. How far and in which direction is he from his starting point?',
    options: ['15 m East', '15 m West', '10 m South', '25 m East'],
    correctAnswer: 0,
    solution: '10m North and 10m South cancel out on the vertical axis. Net displacement is 15 m East.',
    topic: 'Direction Sense'
  },
  {
    id: 10,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 10,
    questionText: 'In a row of 40 students facing North, Amit is 15th from the left end. What is his position from the right end?',
    options: ['26th', '25th', '27th', '24th'],
    correctAnswer: 0,
    solution: 'Position from right = Total − Position from left + 1 = 40 − 15 + 1 = 26th.',
    topic: 'Order & Ranking'
  },
  {
    id: 11,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 11,
    questionText: "If '+' means '×', '−' means '÷', '×' means '+', and '÷' means '−', solve: 20 − 4 × 6 + 2 ÷ 5 = ?",
    options: ['12', '15', '10', '18'],
    correctAnswer: 0,
    solution: 'Substitute: 20 ÷ 4 + 6 × 2 − 5 = 5 + 12 − 5 = 12.',
    topic: 'Mathematical Operations'
  },
  {
    id: 12,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 12,
    questionText: 'Complete the alphanumeric series: A1, C4, E9, G16, ?',
    options: ['I25', 'H25', 'I36', 'J25'],
    correctAnswer: 0,
    solution: 'Letters skip 1 (A, C, E, G, I). Numbers are consecutive squares (1², 2², 3², 4², 5² = 25). Next term is I25.',
    topic: 'Alphanumeric Series'
  },
  {
    id: 13,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 13,
    questionText: 'What is the angle between hour hand and minute hand of a clock at 3:30?',
    options: ['75°', '90°', '105°', '60°'],
    correctAnswer: 0,
    solution: 'Angle = |30H − 5.5M| = |30(3) − 5.5(30)| = |90 − 165| = 75°.',
    topic: 'Clocks & Angles'
  },
  {
    id: 14,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 14,
    questionText: 'If today is Monday, what day of the week will it be after 65 days?',
    options: ['Wednesday', 'Tuesday', 'Thursday', 'Friday'],
    correctAnswer: 0,
    solution: '65 days = 9 weeks + 2 odd days. Monday + 2 days = Wednesday.',
    topic: 'Calendars'
  },
  {
    id: 15,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 15,
    questionText: 'Complete the letter sequence: A, C, F, J, O, ?',
    options: ['U', 'T', 'S', 'V'],
    correctAnswer: 0,
    solution: 'Shifts: A(+2)C(+3)F(+4)J(+5)O(+6)U. Next letter is U.',
    topic: 'Letter Series'
  },

  // Seating Arrangement (Q16 - Q19)
  {
    id: 16,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    scenarioTitle: 'Circular Arrangement: Six Executives (Q16 - Q19)',
    scenarioText: 'Six executives—A, B, C, D, E, F—sit around a circular table facing center. A sits second to the left of D. C is an immediate neighbor of both A and B. F sits directly opposite B.',
    questionNumber: 16,
    questionText: 'Who sits directly opposite D?',
    options: ['C', 'E', 'A', 'B'],
    correctAnswer: 0,
    solution: 'Arrangement clockwise: D, F, A, C, B, E. The person directly opposite D is C.',
    topic: 'Circular Seating'
  },
  {
    id: 17,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    scenarioTitle: 'Circular Arrangement: Six Executives (Q16 - Q19)',
    scenarioText: 'Six executives—A, B, C, D, E, F—sit around a circular table facing center. A sits second to the left of D. C is an immediate neighbor of both A and B. F sits directly opposite B.',
    questionNumber: 17,
    questionText: 'Who sits to the immediate right of A?',
    options: ['C', 'F', 'E', 'D'],
    correctAnswer: 0,
    solution: 'Facing inward, clockwise from A is C. Thus C sits to the immediate right of A.',
    topic: 'Circular Seating'
  },
  {
    id: 18,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    scenarioTitle: 'Circular Arrangement: Six Executives (Q16 - Q19)',
    scenarioText: 'Six executives—A, B, C, D, E, F—sit around a circular table facing center. A sits second to the left of D. C is an immediate neighbor of both A and B. F sits directly opposite B.',
    questionNumber: 18,
    questionText: 'Who sits between F and D?',
    options: ['E', 'C', 'A', 'B'],
    correctAnswer: 0,
    solution: 'In the circular order (D, F, A, C, B, E), E sits on the arc between F and D.',
    topic: 'Circular Seating'
  },
  {
    id: 19,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    scenarioTitle: 'Circular Arrangement: Six Executives (Q16 - Q19)',
    scenarioText: 'Six executives—A, B, C, D, E, F—sit around a circular table facing center. A sits second to the left of D. C is an immediate neighbor of both A and B. F sits directly opposite B.',
    questionNumber: 19,
    questionText: 'How many executives sit between P and R when counting clockwise? (Referring to standard circular positions)',
    options: ['2', '1', '3', '0'],
    correctAnswer: 0,
    solution: 'In a standard 6-person layout separated across 2 positions, there are 2 persons between them clockwise.',
    topic: 'Circular Seating'
  },

  // Linear Order (Q20 - Q22)
  {
    id: 20,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    scenarioTitle: 'Linear Order: Five Books (Q20 - Q22)',
    scenarioText: 'Five books P, Q, R, S, T are placed on a table. P is to the left of Q. R is to the right of Q. S is to the left of P. T is to the right of R.',
    questionNumber: 20,
    questionText: 'Which book is in the exact middle?',
    options: ['Q', 'P', 'R', 'S'],
    correctAnswer: 0,
    solution: 'Order from left to right: S, P, Q, R, T. The book in the exact middle is Q.',
    topic: 'Linear Arrangements'
  },
  {
    id: 21,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    scenarioTitle: 'Linear Order: Five Books (Q20 - Q22)',
    scenarioText: 'Five books P, Q, R, S, T are placed on a table. P is to the left of Q. R is to the right of Q. S is to the left of P. T is to the right of R.',
    questionNumber: 21,
    questionText: 'Which book is at the extreme right end?',
    options: ['T', 'R', 'Q', 'S'],
    correctAnswer: 0,
    solution: 'Order from left to right: S, P, Q, R, T. Extreme right book is T.',
    topic: 'Linear Arrangements'
  },
  {
    id: 22,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    scenarioTitle: 'Linear Order: Five Books (Q20 - Q22)',
    scenarioText: 'Five books P, Q, R, S, T are placed on a table. P is to the left of Q. R is to the right of Q. S is to the left of P. T is to the right of R.',
    questionNumber: 22,
    questionText: 'If P and R swap places, which book is to the immediate right of Q?',
    options: ['P', 'T', 'R', 'S'],
    correctAnswer: 0,
    solution: 'New order after swap: S, R, Q, P, T. To the immediate right of Q is P.',
    topic: 'Linear Arrangements'
  },

  {
    id: 23,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 23,
    questionText: `Syllogism:\nStatements: All cats are dogs. Some dogs are birds.\nConclusions:\nI. Some cats are birds.\nII. Some birds are dogs.`,
    options: ['Only Conclusion II follows', 'Only Conclusion I follows', 'Both follow', 'Neither follows'],
    correctAnswer: 0,
    solution: 'Conversion of "Some dogs are birds" gives "Some birds are dogs" (II is definitely valid). Cats and birds do not necessarily overlap.',
    topic: 'Syllogisms'
  },
  {
    id: 24,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 24,
    questionText: `Syllogism:\nStatements: No book is a pen. All pens are papers.\nConclusions:\nI. Some papers are pens.\nII. No book is a paper.`,
    options: ['Only Conclusion I follows', 'Only Conclusion II follows', 'Both follow', 'Neither follows'],
    correctAnswer: 0,
    solution: 'Conversion of "All pens are papers" yields "Some papers are pens" (Conclusion I follows). Books could still intersect with non-pen papers.',
    topic: 'Syllogisms'
  },
  {
    id: 25,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 25,
    questionText: `Syllogism:\nStatements: All economists are strategists. No strategist is a gambler.\nConclusions:\nI. No economist is a gambler.\nII. Some strategists are economists.`,
    options: ['Both Conclusions I and II follow', 'Only Conclusion I follows', 'Only Conclusion II follows', 'Neither follows'],
    correctAnswer: 0,
    solution: '• E ⊆ S and S ∩ G = ∅ ⇒ E ∩ G = ∅ (Conclusion I follows).\n• E ⊆ S implies S ∩ E ≠ ∅ (Conclusion II follows).',
    topic: 'Syllogisms'
  },
  {
    id: 26,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 26,
    questionText: 'Choose the odd word out:',
    options: ['Geography', 'Physics', 'Chemistry', 'Botany'],
    correctAnswer: 0,
    solution: 'Geography is a social/earth science, whereas Physics, Chemistry, and Botany are core physical/biological natural sciences.',
    topic: 'Odd Word Out'
  },
  {
    id: 27,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 27,
    questionText: 'Choose the odd currency out:',
    options: ['Ounce', 'Dollar', 'Euro', 'Yen'],
    correctAnswer: 0,
    solution: 'Ounce is a unit of weight/mass, whereas Dollar, Euro, and Yen are national currencies.',
    topic: 'Odd Word Out'
  },
  {
    id: 28,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 28,
    questionText: "If 'BOMBAY' is coded as 'CNNCBZ', how is 'DELHI' coded under standard +1 shift?",
    options: ['EFMIJ', 'EFMIK', 'EFMHJ', 'EGMJI'],
    correctAnswer: 0,
    solution: 'Direct +1 letter shift: D(+1)→E, E(+1)→F, L(+1)→M, H(+1)→I, I(+1)→J = EFMIJ.',
    topic: 'Coding-Decoding'
  },
  {
    id: 29,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 29,
    questionText: 'Find the missing number in series: 2, 6, 12, 20, 30, ?',
    options: ['42', '40', '44', '38'],
    correctAnswer: 0,
    solution: 'Pattern is n(n + 1): 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42.',
    topic: 'Number Series'
  },
  {
    id: 30,
    section: 'analytical-1',
    sectionName: 'Analytical Reasoning Skills I',
    questionNumber: 30,
    questionText: 'Find the next number in series: 3, 8, 15, 24, 35, ?',
    options: ['48', '46', '50', '44'],
    correctAnswer: 0,
    solution: 'Differences: +5, +7, +9, +11. Next diff is +13: 35 + 13 = 48 (also n² − 1).',
    topic: 'Number Series'
  },

  // =========================================================================
  // SECTION II: QUANTITATIVE SKILLS - PART I (30 Qs | Q31 - Q60)
  // =========================================================================
  {
    id: 31,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 31,
    questionText: 'A car travels 120 km at 60 km/h and returns at 40 km/h. Find average speed for round trip.',
    options: ['48 km/h', '50 km/h', '45 km/h', '52 km/h'],
    correctAnswer: 0,
    solution: 'Avg Speed = 2xy / (x + y) = 2(60)(40) / 100 = 4800 / 100 = 48 km/h.',
    topic: 'Arithmetic - Speed & Distance'
  },
  {
    id: 32,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 32,
    questionText: 'A can do a work in 12 days, B in 15 days. Working together for 4 days, what fraction of work remains?',
    options: ['2/5', '1/5', '3/5', '4/15'],
    correctAnswer: 0,
    solution: "A's rate = 1/12, B's rate = 1/15. Together in 1 day = 3/20. In 4 days = 3/5. Work left = 1 − 3/5 = 2/5.",
    topic: 'Arithmetic - Time & Work'
  },
  {
    id: 33,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 33,
    questionText: 'Difference between CI and SI on a sum for 2 years at 10% p.a. is ₹ 150. Find the sum.',
    options: ['₹ 15,000', '₹ 10,000', '₹ 12,000', '₹ 20,000'],
    correctAnswer: 0,
    solution: 'Diff = P(R/100)² ⇒ 150 = P(10/100)² = P(1/100) ⇒ P = ₹ 15,000.',
    topic: 'Arithmetic - Simple & Compound Interest'
  },
  {
    id: 34,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 34,
    questionText: 'Merchant marks up goods by 40% and offers 20% discount. Find net profit percentage.',
    options: ['12%', '20%', '15%', '8%'],
    correctAnswer: 0,
    solution: 'Let CP = 100. MP = 140. SP = 140 × 0.80 = 112. Profit = 12%.',
    topic: 'Arithmetic - Profit & Loss'
  },
  {
    id: 35,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 35,
    questionText: 'Price of sugar rises by 25%. By what percentage must consumption decrease to keep expenditure unchanged?',
    options: ['20%', '25%', '16.66%', '30%'],
    correctAnswer: 0,
    solution: 'Reduction % = [25 / (100 + 25)] × 100 = (25 / 125) × 100 = 20%.',
    topic: 'Arithmetic - Percentages'
  },
  {
    id: 36,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 36,
    questionText: 'If A : B = 3 : 4 and B : C = 5 : 6, find ratio A : C.',
    options: ['5 : 8', '15 : 24', '8 : 15', '1 : 2'],
    correctAnswer: 0,
    solution: 'A/C = (A/B) × (B/C) = (3/4) × (5/6) = 15/24 = 5/8.',
    topic: 'Arithmetic - Ratios'
  },
  {
    id: 37,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 37,
    questionText: 'Solve for x: log₂(x) + log₂(x − 2) = 3.',
    options: ['4', '2', '6', '8'],
    correctAnswer: 0,
    solution: 'log₂(x(x − 2)) = 3 ⇒ x(x − 2) = 8 ⇒ x² − 2x − 8 = 0 ⇒ (x − 4)(x + 2) = 0. Since x > 2, x = 4.',
    topic: 'Algebra - Logarithms'
  },
  {
    id: 38,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 38,
    questionText: 'Find roots of quadratic equation: x² − 9x + 20 = 0.',
    options: ['4, 5', '−4, −5', '2, 10', '3, 6'],
    correctAnswer: 0,
    solution: 'x² − 9x + 20 = (x − 4)(x − 5) = 0 ⇒ x = 4, 5.',
    topic: 'Algebra - Quadratic Equations'
  },
  {
    id: 39,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 39,
    questionText: 'Sum of first 20 terms of AP: 5, 8, 11, 14 ... is:',
    options: ['670', '650', '700', '720'],
    correctAnswer: 0,
    solution: 'a = 5, d = 3, n = 20. S = (20/2)[2(5) + 19(3)] = 10[10 + 57] = 670.',
    topic: 'Algebra - Progressions'
  },
  {
    id: 40,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 40,
    questionText: 'Sides of a triangle are 8 cm, 15 cm, 17 cm. What type of triangle is it?',
    options: ['Right-angled', 'Acute-angled', 'Obtuse-angled', 'Isosceles'],
    correctAnswer: 0,
    solution: '8² + 15² = 64 + 225 = 289 = 17². Follows Pythagoras theorem (Right-angled).',
    topic: 'Geometry - Triangles'
  },
  {
    id: 41,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 41,
    questionText: 'Cylinder has radius 7 cm, height 10 cm. Find Curved Surface Area (π = 22/7).',
    options: ['440 cm²', '1540 cm²', '220 cm²', '880 cm²'],
    correctAnswer: 0,
    solution: 'CSA = 2πrh = 2 × (22/7) × 7 × 10 = 440 cm².',
    topic: 'Geometry - Mensuration'
  },
  {
    id: 42,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 42,
    questionText: 'In how many ways can 5 boys and 3 girls sit in a row so no two girls sit together?',
    options: ['14,400', '7,200', '2,880', '40,320'],
    correctAnswer: 0,
    solution: 'Arrange 5 boys: 5! = 120. Place 3 girls in 6 gaps: ⁶P₃ = 120. Total = 120 × 120 = 14,400.',
    topic: 'Modern Math - Permutations'
  },
  {
    id: 43,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 43,
    questionText: 'Two unbiased dice are thrown. Probability that sum of numbers is a prime number?',
    options: ['5/12', '15/36', '7/18', '1/2'],
    correctAnswer: 0,
    solution: 'Prime sums (2, 3, 5, 7, 11) have 15 favorable pairs. Probability = 15/36 = 5/12.',
    topic: 'Modern Math - Probability'
  },
  {
    id: 44,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 44,
    questionText: 'Find unit digit of 7¹⁰⁵.',
    options: ['7', '9', '3', '1'],
    correctAnswer: 0,
    solution: 'Cyclicity of 7 is 4. 105 mod 4 = 1 ⇒ 7¹ = 7.',
    topic: 'Number Systems'
  },
  {
    id: 45,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 45,
    questionText: 'Pipe A fills a tank in 15 hrs, Pipe B in 20 hrs. Opened together, time to fill tank?',
    options: ['60/7 hrs', '35/3 hrs', '8 hrs', '7 hrs'],
    correctAnswer: 0,
    solution: 'Combined Rate = 1/15 + 1/20 = 7/60 tank/hr. Time = 60/7 hours.',
    topic: 'Arithmetic - Pipes & Cisterns'
  },

  // DI & DS Set (Q46 - Q51)
  {
    id: 46,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    scenarioTitle: 'DI Set: Smartphone Sales (Q46 - Q48)',
    scenarioText: 'Smartphone sales (in thousands) by 4 companies over 3 years:',
    dataTable: {
      headers: ['Company', '2023', '2024', '2025'],
      rows: [
        ['Alpha', 45, 55, 70],
        ['Beta', 60, 75, 85],
        ['Gamma', 50, 65, 90],
        ['Delta', 40, 50, 65]
      ]
    },
    questionNumber: 46,
    questionText: 'Percentage increase in sales for Company Gamma from 2023 to 2025?',
    options: ['80%', '40%', '60%', '75%'],
    correctAnswer: 0,
    solution: 'Gamma sales: 2023 = 50k, 2025 = 90k. Increase = 40k. % Increase = (40/50) × 100 = 80%.',
    topic: 'Data Interpretation'
  },
  {
    id: 47,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    scenarioTitle: 'DI Set: Smartphone Sales (Q46 - Q48)',
    scenarioText: 'Smartphone sales (in thousands) by 4 companies over 3 years:',
    dataTable: {
      headers: ['Company', '2023', '2024', '2025'],
      rows: [
        ['Alpha', 45, 55, 70],
        ['Beta', 60, 75, 85],
        ['Gamma', 50, 65, 90],
        ['Delta', 40, 50, 65]
      ]
    },
    questionNumber: 47,
    questionText: 'Average number of smartphones sold by all companies in 2024 (in thousands)?',
    options: ['61.25', '60.5', '62.5', '65.0'],
    correctAnswer: 0,
    solution: 'Total 2024 = 55 + 75 + 65 + 50 = 245k. Average = 245 / 4 = 61.25k.',
    topic: 'Data Interpretation'
  },
  {
    id: 48,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    scenarioTitle: 'DI Set: Smartphone Sales (Q46 - Q48)',
    scenarioText: 'Smartphone sales (in thousands) by 4 companies over 3 years:',
    dataTable: {
      headers: ['Company', '2023', '2024', '2025'],
      rows: [
        ['Alpha', 45, 55, 70],
        ['Beta', 60, 75, 85],
        ['Gamma', 50, 65, 90],
        ['Delta', 40, 50, 65]
      ]
    },
    questionNumber: 48,
    questionText: 'Which company had lowest percentage growth in sales from 2024 to 2025?',
    options: ['Beta', 'Alpha', 'Gamma', 'Delta'],
    correctAnswer: 0,
    solution: 'Beta growth = (10/75) × 100 = 13.3% (Lowest among all four companies).',
    topic: 'Data Interpretation'
  },
  {
    id: 49,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 49,
    questionText: 'Data Sufficiency: Is integer x positive?\nStatement I: x² = 25\nStatement II: x³ = 125',
    options: ['Statement II alone is sufficient', 'Statement I alone is sufficient', 'Both statements together are necessary', 'Neither is sufficient'],
    correctAnswer: 0,
    solution: 'St I gives x = ±5 (insufficient). St II gives unique root x = 5 (positive, sufficient).',
    topic: 'Data Sufficiency'
  },
  {
    id: 50,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 50,
    questionText: 'Data Sufficiency: What is area of a rectangle?\nStatement I: Perimeter is 40 cm\nStatement II: Diagonal is 14.14 cm',
    options: ['Both statements together are necessary', 'Statement I alone is sufficient', 'Statement II alone is sufficient', 'Neither is sufficient'],
    correctAnswer: 0,
    solution: 'St I: L+W = 20. St II: L²+W² = 200. Combined: (L+W)² = L²+W²+2LW ⇒ 400 = 200 + 2(Area) ⇒ Area = 100 cm².',
    topic: 'Data Sufficiency'
  },
  {
    id: 51,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 51,
    questionText: 'Data Sufficiency: What is the two-digit number?\nStatement I: Sum of digits is 8\nStatement II: Difference between digits is 2',
    options: ['Neither statement is sufficient', 'Statement I alone is sufficient', 'Statement II alone is sufficient', 'Both statements together are necessary'],
    correctAnswer: 0,
    solution: 'Even combined, gives two valid numbers: 53 and 35. Cannot determine unique number.',
    topic: 'Data Sufficiency'
  },
  {
    id: 52,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 52,
    questionText: 'A train 180 m long crosses platform 220 m long in 20 seconds. Speed in km/h?',
    options: ['72 km/h', '54 km/h', '90 km/h', '60 km/h'],
    correctAnswer: 0,
    solution: 'Total distance = 180 + 220 = 400 m. Speed = 400/20 = 20 m/s = 20 × (18/5) = 72 km/h.',
    topic: 'Arithmetic - Trains'
  },
  {
    id: 53,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 53,
    questionText: 'Sum compounded annually at 10% grows to ₹ 14,520 in 2 years. Find principal.',
    options: ['₹ 12,000', '₹ 11,500', '₹ 12,500', '₹ 10,000'],
    correctAnswer: 0,
    solution: 'P(1.1)² = 14,520 ⇒ 1.21P = 14,520 ⇒ P = ₹ 12,000.',
    topic: 'Arithmetic - Compound Interest'
  },
  {
    id: 54,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 54,
    questionText: 'In mixture of 60 L, milk to water ratio is 2 : 1. How much water added to make ratio 1 : 2?',
    options: ['60 liters', '40 liters', '30 liters', '50 liters'],
    correctAnswer: 0,
    solution: 'Initial: Milk = 40L, Water = 20L. For 1:2 ratio, Water required = 2 × 40 = 80L. Water to add = 80 − 20 = 60 liters.',
    topic: 'Arithmetic - Mixtures'
  },
  {
    id: 55,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 55,
    questionText: 'Average age of 15 students is 18 yrs. Teacher included, average rises by 1 yr. Teacher\'s age?',
    options: ['34 years', '32 years', '36 years', '30 years'],
    correctAnswer: 0,
    solution: "Teacher's age = (16 × 19) − (15 × 18) = 304 − 270 = 34 years.",
    topic: 'Arithmetic - Averages'
  },
  {
    id: 56,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 56,
    questionText: 'Two towns 300 km apart. Cars start at 60 km/h and 40 km/h towards each other. Meeting time?',
    options: ['3 hours', '2.5 hours', '3.5 hours', '4 hours'],
    correctAnswer: 0,
    solution: 'Relative speed = 60 + 40 = 100 km/h. Meeting time = 300 / 100 = 3 hours.',
    topic: 'Arithmetic - Relative Speed'
  },
  {
    id: 57,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 57,
    questionText: 'Sum under Simple Interest doubles in 8 years. Annual interest rate?',
    options: ['12.5%', '10%', '15%', '8%'],
    correctAnswer: 0,
    solution: 'SI = P ⇒ P = (P × R × 8) / 100 ⇒ R = 100 / 8 = 12.5%.',
    topic: 'Arithmetic - Simple Interest'
  },
  {
    id: 58,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 58,
    questionText: 'Income ratio A:B = 4:5, Expenditure ratio = 3:4. Each saves ₹ 5,000. A\'s income?',
    options: ['₹ 20,000', '₹ 25,000', '₹ 18,000', '₹ 22,000'],
    correctAnswer: 0,
    solution: '(4x − 5000) / (5x − 5000) = 3/4 ⇒ 16x − 20000 = 15x − 15000 ⇒ x = 5000. A\'s income = 4x = ₹ 20,000.',
    topic: 'Arithmetic - Ratios & Equations'
  },
  {
    id: 59,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 59,
    questionText: 'Voter list 5,000 voters. Candidate A gets 60% valid votes. 20% invalid. Candidate A votes?',
    options: ['2,400', '2,500', '3,000', '2,000'],
    correctAnswer: 0,
    solution: 'Valid votes = 80% of 5,000 = 4,000. Candidate A = 60% of 4,000 = 2,400.',
    topic: 'Arithmetic - Percentages'
  },
  {
    id: 60,
    section: 'quant-1',
    sectionName: 'Quantitative Skills I',
    questionNumber: 60,
    questionText: '12 men or 18 women finish work in 14 days. Days taken by 8 men and 16 women?',
    options: ['9 days', '10 days', '8 days', '12 days'],
    correctAnswer: 0,
    solution: '12M = 18W ⇒ 1M = 1.5W. 8M + 16W = 12W + 16W = 28W. 18W × 14 = 28W × D ⇒ D = (18 × 14)/28 = 9 days.',
    topic: 'Arithmetic - Time & Work'
  },

  // =========================================================================
  // SECTION III: VERBAL SKILLS - PART I (30 Qs | Q61 - Q90)
  // =========================================================================
  {
    id: 61,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    passageTitle: 'Passage: Deep Work & Modern Cognition (Q61 - Q66)',
    passageText: `In today's fast-paced digital economy, the concept of "deep work" has emerged as a critical competitive advantage. Coined by Cal Newport, deep work refers to the ability to focus without distraction on a cognitively demanding task. It allows individuals to quickly master complicated information and produce better results in less time. Conversely, "shallow work"—tasks like constantly checking emails, responding to instant messages, and attending unproductive meetings—dominates the modern corporate landscape. While shallow work is necessary for baseline logistics, it rarely creates new value. The shift towards open-plan offices and an expectation of constant connectivity has inadvertently degraded the workforce's ability to engage in sustained, high-level cognition. Companies that recognize and cultivate deep work cultures are seeing disproportionate gains in innovation and employee satisfaction.`,
    questionNumber: 61,
    questionText: 'Primary consequence of "shallow work"?',
    options: ['Handles baseline logistics but rarely creates new value', 'Enhances workforce innovation', 'Creates significant new corporate value', 'Requires profound cognitive effort'],
    correctAnswer: 0,
    solution: 'Passage states shallow work handles baseline logistics but rarely creates new value.',
    topic: 'Reading Comprehension'
  },
  {
    id: 62,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    passageTitle: 'Passage: Deep Work & Modern Cognition (Q61 - Q66)',
    passageText: `In today's fast-paced digital economy, the concept of "deep work" has emerged as a critical competitive advantage. Coined by Cal Newport, deep work refers to the ability to focus without distraction on a cognitively demanding task. It allows individuals to quickly master complicated information and produce better results in less time. Conversely, "shallow work"—tasks like constantly checking emails, responding to instant messages, and attending unproductive meetings—dominates the modern corporate landscape. While shallow work is necessary for baseline logistics, it rarely creates new value. The shift towards open-plan offices and an expectation of constant connectivity has inadvertently degraded the workforce's ability to engage in sustained, high-level cognition. Companies that recognize and cultivate deep work cultures are seeing disproportionate gains in innovation and employee satisfaction.`,
    questionNumber: 62,
    questionText: 'Office trend identified as detrimental to sustained high-level cognition?',
    options: ['Open-plan offices and constant connectivity', 'Four-day work weeks', 'Asynchronous communication tools', 'Deep work culture'],
    correctAnswer: 0,
    solution: 'Open-plan offices and constant connectivity are identified as trends that degrade sustained deep focus.',
    topic: 'Reading Comprehension'
  },
  {
    id: 63,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    passageTitle: 'Passage: Deep Work & Modern Cognition (Q61 - Q66)',
    passageText: `In today's fast-paced digital economy, the concept of "deep work" has emerged as a critical competitive advantage. Coined by Cal Newport, deep work refers to the ability to focus without distraction on a cognitively demanding task. It allows individuals to quickly master complicated information and produce better results in less time. Conversely, "shallow work"—tasks like constantly checking emails, responding to instant messages, and attending unproductive meetings—dominates the modern corporate landscape. While shallow work is necessary for baseline logistics, it rarely creates new value. The shift towards open-plan offices and an expectation of constant connectivity has inadvertently degraded the workforce's ability to engage in sustained, high-level cognition. Companies that recognize and cultivate deep work cultures are seeing disproportionate gains in innovation and employee satisfaction.`,
    questionNumber: 63,
    questionText: 'Main benefit of "deep work" as described by Cal Newport?',
    options: ['Mastering information quickly and producing better results', 'Replying to more emails per hour', 'Increasing collaborative meetings', 'Reducing individual accountability'],
    correctAnswer: 0,
    solution: 'Deep work allows individuals to quickly master complicated information and produce superior results in less time.',
    topic: 'Reading Comprehension'
  },
  {
    id: 64,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    passageTitle: 'Passage: Deep Work & Modern Cognition (Q61 - Q66)',
    passageText: `In today's fast-paced digital economy, the concept of "deep work" has emerged as a critical competitive advantage. Coined by Cal Newport, deep work refers to the ability to focus without distraction on a cognitively demanding task. It allows individuals to quickly master complicated information and produce better results in less time. Conversely, "shallow work"—tasks like constantly checking emails, responding to instant messages, and attending unproductive meetings—dominates the modern corporate landscape. While shallow work is necessary for baseline logistics, it rarely creates new value. The shift towards open-plan offices and an expectation of constant connectivity has inadvertently degraded the workforce's ability to engage in sustained, high-level cognition. Companies that recognize and cultivate deep work cultures are seeing disproportionate gains in innovation and employee satisfaction.`,
    questionNumber: 64,
    questionText: "Author's primary purpose in writing this passage is to:",
    options: ['Highlight competitive advantage of deep work over shallow distractions', 'Advocate for closing all open-plan corporate offices', 'Criticize computer science professors', 'Compare software tools for email management'],
    correctAnswer: 0,
    solution: 'The central thesis highlights the productivity and strategic value of cultivating deep work.',
    topic: 'Reading Comprehension'
  },
  {
    id: 65,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    passageTitle: 'Passage: Deep Work & Modern Cognition (Q61 - Q66)',
    passageText: `In today's fast-paced digital economy, the concept of "deep work" has emerged as a critical competitive advantage. Coined by Cal Newport, deep work refers to the ability to focus without distraction on a cognitively demanding task. It allows individuals to quickly master complicated information and produce better results in less time. Conversely, "shallow work"—tasks like constantly checking emails, responding to instant messages, and attending unproductive meetings—dominates the modern corporate landscape. While shallow work is necessary for baseline logistics, it rarely creates new value. The shift towards open-plan offices and an expectation of constant connectivity has inadvertently degraded the workforce's ability to engage in sustained, high-level cognition. Companies that recognize and cultivate deep work cultures are seeing disproportionate gains in innovation and employee satisfaction.`,
    questionNumber: 65,
    questionText: 'Word closest in meaning to CULTIVATE in the passage:',
    options: ['Nurture', 'Destroy', 'Ignore', 'Abandon'],
    correctAnswer: 0,
    solution: '"Cultivate" in this context means to develop, encourage, or nurture.',
    topic: 'Vocabulary in Context'
  },
  {
    id: 66,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    passageTitle: 'Passage: Deep Work & Modern Cognition (Q61 - Q66)',
    passageText: `In today's fast-paced digital economy, the concept of "deep work" has emerged as a critical competitive advantage. Coined by Cal Newport, deep work refers to the ability to focus without distraction on a cognitively demanding task. It allows individuals to quickly master complicated information and produce better results in less time. Conversely, "shallow work"—tasks like constantly checking emails, responding to instant messages, and attending unproductive meetings—dominates the modern corporate landscape. While shallow work is necessary for baseline logistics, it rarely creates new value. The shift towards open-plan offices and an expectation of constant connectivity has inadvertently degraded the workforce's ability to engage in sustained, high-level cognition. Companies that recognize and cultivate deep work cultures are seeing disproportionate gains in innovation and employee satisfaction.`,
    questionNumber: 66,
    questionText: 'According to passage, shallow work is described as:',
    options: ['Necessary for baseline logistics', 'Highly innovative', 'Cognitively demanding', 'Completely useless'],
    correctAnswer: 0,
    solution: 'The passage explicitly terms shallow work as "necessary for baseline logistics".',
    topic: 'Reading Comprehension'
  },
  {
    id: 67,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 67,
    questionText: 'Synonym for METICULOUS:',
    options: ['Fastidious', 'Careless', 'Sloppy', 'Hasty'],
    correctAnswer: 0,
    solution: 'Meticulous and Fastidious both mean taking extreme care with details.',
    topic: 'Synonyms'
  },
  {
    id: 68,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 68,
    questionText: 'Antonym for OBFUSCATE:',
    options: ['Clarify', 'Confuse', 'Conceal', 'Complicate'],
    correctAnswer: 0,
    solution: 'Obfuscate means to make obscure; its antonym is Clarify.',
    topic: 'Antonyms'
  },
  {
    id: 69,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 69,
    questionText: 'Synonym for EPHEMERAL:',
    options: ['Transient', 'Permanent', 'Substantial', 'Eternal'],
    correctAnswer: 0,
    solution: 'Ephemeral means lasting a very short time (transient/fleeting).',
    topic: 'Synonyms'
  },
  {
    id: 70,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 70,
    questionText: 'Antonym for PRUDENT:',
    options: ['Reckless', 'Cautious', 'Judicious', 'Sagacious'],
    correctAnswer: 0,
    solution: 'Prudent means showing care and thought; opposite is Reckless.',
    topic: 'Antonyms'
  },
  {
    id: 71,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 71,
    questionText: 'Word closest in meaning to LACONIC:',
    options: ['Concise', 'Verbose', 'Eloquent', 'Garrulous'],
    correctAnswer: 0,
    solution: 'Laconic means using very few words (concise/terse).',
    topic: 'Synonyms'
  },
  {
    id: 72,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 72,
    questionText: 'Word opposite in meaning to AMELIORATE:',
    options: ['Worsen', 'Enhance', 'Mitigate', 'Refine'],
    correctAnswer: 0,
    solution: 'Ameliorate means to make better; opposite is Worsen.',
    topic: 'Antonyms'
  },
  {
    id: 73,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 73,
    questionText: 'Grammatically correct sentence:',
    options: [
      'Neither the principal nor the teachers are responsible for the delay.',
      'Neither the principal nor the teachers is responsible for the delay.',
      'Neither the principal or the teachers is responsible for the delay.',
      'Neither principal nor teachers was responsible.'
    ],
    correctAnswer: 0,
    solution: 'Subject closer to verb ("teachers") is plural, requiring plural verb "are".',
    topic: 'Grammar - Subject-Verb Agreement'
  },
  {
    id: 74,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 74,
    questionText: 'Fill in preposition: "She has a great affinity _____ classical music."',
    options: ['for', 'with', 'to', 'in'],
    correctAnswer: 0,
    solution: '"Affinity for" is standard English prepositional collocation.',
    topic: 'Grammar - Prepositions'
  },
  {
    id: 75,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 75,
    questionText: 'Preposition usage: "The CEO insisted _____ reviewing reports personally."',
    options: ['on', 'at', 'for', 'with'],
    correctAnswer: 0,
    solution: '"Insisted on" is the correct prepositional verb structure.',
    topic: 'Grammar - Prepositions'
  },
  {
    id: 76,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 76,
    questionText: 'Subjunctive mood correction: "If I _____ CFO, I would allocate more capital to R&D."',
    options: ['were', 'was', 'am', 'have been'],
    correctAnswer: 0,
    solution: 'Hypothetical subjunctive requires "were".',
    topic: 'Grammar - Mood'
  },
  {
    id: 77,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 77,
    questionText: 'Meaning of idiom "Spill the beans":',
    options: ['To reveal a secret', 'To drop food', 'To cook a meal', 'To cause an argument'],
    correctAnswer: 0,
    solution: '"Spill the beans" means to reveal a secret.',
    topic: 'Idioms & Phrases'
  },
  {
    id: 78,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 78,
    questionText: 'Meaning of idiom "Under the weather":',
    options: ['Feeling slightly ill', 'Standing in rain', 'Being depressed', 'Checking forecast'],
    correctAnswer: 0,
    solution: '"Under the weather" means feeling sick or indisposed.',
    topic: 'Idioms & Phrases'
  },
  {
    id: 79,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 79,
    questionText: 'Meaning of idiom "Bite the bullet":',
    options: ['Face a difficult situation courageously', 'Eat hard food', 'Shoot a gun', 'Delay a decision'],
    correctAnswer: 0,
    solution: '"Bite the bullet" means to face a difficult situation with courage.',
    topic: 'Idioms & Phrases'
  },
  {
    id: 80,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 80,
    questionText: 'Change voice: "The chef cooked a delicious meal."',
    options: [
      'A delicious meal was cooked by the chef.',
      'A delicious meal is cooked by the chef.',
      'A delicious meal has been cooked by the chef.',
      'Chef was cooking meal.'
    ],
    correctAnswer: 0,
    solution: 'Simple past "cooked" converts to "was cooked".',
    topic: 'Active & Passive Voice'
  },
  {
    id: 81,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 81,
    questionText: 'Indirect speech: He said, "I am going to the market."',
    options: [
      'He said that he was going to the market.',
      'He said that he is going to the market.',
      'He said that I was going.',
      'He says he was going.'
    ],
    correctAnswer: 0,
    solution: 'Present continuous "am going" changes to past continuous "was going".',
    topic: 'Direct & Indirect Speech'
  },
  {
    id: 82,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 82,
    questionText: 'Choose correctly spelt word:',
    options: ['Accommodation', 'Accomodation', 'Accomadation', 'Acommodation'],
    correctAnswer: 0,
    solution: 'Correct spelling is "Accommodation" (double c and double m).',
    topic: 'Spelling'
  },
  {
    id: 83,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 83,
    questionText: 'Correlative conjunction: "The regulatory framework affects not only banks _____ FinTechs."',
    options: ['but also', 'and also', 'as well as', 'in addition to'],
    correctAnswer: 0,
    solution: '"Not only ... but also" is the standard correlative pair.',
    topic: 'Grammar - Conjunctions'
  },
  {
    id: 84,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 84,
    questionText: 'Rule usage: "Scarcely had the announcement been made _____ stock prices tumbled."',
    options: ['when', 'than', 'then', 'after'],
    correctAnswer: 0,
    solution: '"Scarcely had ... when" is the correct correlative grammar rule.',
    topic: 'Grammar - Inversion'
  },
  {
    id: 85,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 85,
    questionText: 'Complete Analogy: ARCHITECT : BUILDING :: SCULPTOR : ?',
    options: ['Statue', 'Canvas', 'Chisel', 'Museum'],
    correctAnswer: 0,
    solution: 'An architect designs a building; a sculptor creates a statue.',
    topic: 'Analogies'
  },
  {
    id: 86,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 86,
    questionText: 'Complete Analogy: METAPHOR : FIGURATIVE :: FACT : ?',
    options: ['Literal', 'Fiction', 'Ambiguous', 'Symbolic'],
    correctAnswer: 0,
    solution: 'A metaphor is figurative; a fact is literal.',
    topic: 'Analogies'
  },
  {
    id: 87,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 87,
    questionText: 'Complete Analogy: CANDID : FRANK :: OBSCURE : ?',
    options: ['Vague', 'Clear', 'Famous', 'Bright'],
    correctAnswer: 0,
    solution: 'Candid and Frank are synonyms; Obscure and Vague are synonyms.',
    topic: 'Analogies'
  },
  {
    id: 88,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 88,
    questionText: 'Complete Analogy: INSOMNIA : SLEEP :: ANOREXIA : ?',
    options: ['Appetite', 'Memory', 'Vision', 'Speech'],
    correctAnswer: 0,
    solution: 'Insomnia is loss of sleep; Anorexia is loss of appetite.',
    topic: 'Analogies'
  },
  {
    id: 89,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 89,
    questionText: 'Synonym for EQUANIMITY:',
    options: ['Composure', 'Agitation', 'Inequality', 'Fear'],
    correctAnswer: 0,
    solution: 'Equanimity means mental calmness and composure.',
    topic: 'Synonyms'
  },
  {
    id: 90,
    section: 'verbal-1',
    sectionName: 'Verbal Skills I',
    questionNumber: 90,
    questionText: 'Antonym for FASTIDIOUS:',
    options: ['Careless', 'Meticulous', 'Critical', 'Particular'],
    correctAnswer: 0,
    solution: 'Fastidious means very attentive to accuracy; opposite is Careless.',
    topic: 'Antonyms'
  },

  // =========================================================================
  // SECTION IV: ANALYTICAL REASONING SKILLS - PART II (30 Qs | Q91 - Q120)
  // =========================================================================
  {
    id: 91,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    questionNumber: 91,
    questionText: `Statement-Assumption:\nStatement: "Please do not use mobile phones inside the hospital."\nAssumption I: Mobile phones can interfere with medical equipment.\nAssumption II: People generally read notices.`,
    options: ['Both I and II are implicit', 'Only I is implicit', 'Only II is implicit', 'Neither is implicit'],
    correctAnswer: 0,
    solution: 'A notice assumes there is a valid reason (I) and that patients will read and comply (II). Both are implicit.',
    topic: 'Critical Reasoning - Assumptions'
  },
  {
    id: 92,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    questionNumber: 92,
    questionText: `Statement-Argument:\nStatement: "Should homework be completely banned in primary schools?"\nArgument I: Yes, children need play time.\nArgument II: No, homework reinforces classroom learning.`,
    options: ['Both I and II are strong', 'Only I is strong', 'Only II is strong', 'Neither is strong'],
    correctAnswer: 0,
    solution: 'Both represent strong, valid educational and psychological viewpoints.',
    topic: 'Critical Reasoning - Arguments'
  },
  {
    id: 93,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    questionNumber: 93,
    questionText: 'Survey shows remote work increased employee satisfaction by 25%. Management concludes remote work improves productivity. Which STRENGTHENS this?',
    options: [
      'Satisfied employees completed projects 15% faster with fewer errors',
      'Internet costs increased',
      'Office lease costs remained same',
      'Online meeting time increased'
    ],
    correctAnswer: 0,
    solution: 'Direct empirical proof linking higher satisfaction to faster, higher-quality project completion directly strengthens the productivity link.',
    topic: 'Critical Reasoning - Strengthen'
  },
  {
    id: 94,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    questionNumber: 94,
    questionText: 'Weaken Argument: "City X raised parking fees downtown to reduce traffic. Traffic remained unchanged." Which explains this?',
    options: [
      'Public transit fares were increased simultaneously',
      'Parking collectors got salary raises',
      'Population grew 1%',
      'Neighboring city reduced fees'
    ],
    correctAnswer: 0,
    solution: 'Higher public transit fares disincentivized switching to buses/trains, weakening the expected traffic reduction.',
    topic: 'Critical Reasoning - Weaken'
  },
  {
    id: 95,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    questionNumber: 95,
    questionText: `Course of Action:\nStatement: "Heavy rainfall caused waterlogging in residential sectors."\nAction I: Deploy de-watering pumps immediately\nAction II: Advise residents to stay indoors`,
    options: ['Both Actions I and II follow', 'Only Action I follows', 'Only Action II follows', 'Neither follows'],
    correctAnswer: 0,
    solution: 'Immediate municipal response (pumps) and public safety advisory (stay indoors) are both logical and appropriate courses of action.',
    topic: 'Course of Action'
  },
  {
    id: 96,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    questionNumber: 96,
    questionText: 'Cause & Effect: Library borrowings dropped 40% over two years. Most probable cause?',
    options: [
      'University provided free access to digital journal databases',
      'Library increased operating hours',
      'Book printing costs rose',
      'Student enrollment grew 10%'
    ],
    correctAnswer: 0,
    solution: 'Free online digital access offers a direct, convenient substitute for physical book borrowings.',
    topic: 'Cause & Effect'
  },
  {
    id: 97,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    questionNumber: 97,
    questionText: 'Inference: Company Z discontinued budget smartphones to focus on premium flagship models.',
    options: [
      'Company Z aims for higher per-unit profit margins',
      'Budget phones are illegal',
      'Premium phones cost less to make',
      'Retail stores will close'
    ],
    correctAnswer: 0,
    solution: 'Focusing exclusively on premium segments is a strategic decision to capture higher profit margins.',
    topic: 'Inference'
  },
  {
    id: 98,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    questionNumber: 98,
    questionText: 'Logical Deduction: "If a candidate passes interview, they receive offer letter. Candidate K received offer letter."',
    options: [
      'Candidate K passed the interview',
      'Candidate K failed written test',
      'Candidate K rejected job',
      'Cannot be determined'
    ],
    correctAnswer: 0,
    solution: 'Candidate K passed the interview.',
    topic: 'Logical Deductions'
  },
  {
    id: 99,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    questionNumber: 99,
    questionText: `Statement-Assumption:\nStatement: "Municipal corporation advised residents to boil water due to pipeline contamination."\nAssumption I: Residents will follow advice\nAssumption II: Repairs completed in 3 days`,
    options: ['Both Assumptions I and II are implicit', 'Only I is implicit', 'Only II is implicit', 'Neither is implicit'],
    correctAnswer: 0,
    solution: 'The advisory assumes citizen compliance and temporary emergency management.',
    topic: 'Statement-Assumption'
  },
  {
    id: 100,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    questionNumber: 100,
    questionText: `Statement-Argument:\nStatement: "Should public transport vehicles in metros be converted to electric power?"\nArgument I: Yes, drastically reduces air pollution\nArgument II: No, charging infrastructure cost is high`,
    options: ['Both Arguments I and II are strong', 'Only I is strong', 'Only II is strong', 'Neither is strong'],
    correctAnswer: 0,
    solution: 'Environmental benefits and economic infrastructure investments are both strong arguments.',
    topic: 'Statement-Argument'
  },

  // Machine Input (Q101 - Q103)
  {
    id: 101,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    scenarioTitle: 'Machine Input Rules (Q101 - Q103)',
    scenarioText: 'Input: 42 18 85 31 56 09\nStep I: 09 42 18 85 31 56\nStep II: 09 18 42 85 31 56\nStep III: 09 18 31 42 85 56\nStep IV: 09 18 31 42 56 85',
    questionNumber: 101,
    questionText: 'What is the logic of this machine arrangement?',
    options: [
      'Arranging numbers in ascending order from left to right',
      'Descending order sort',
      'Swapping odd/even positions',
      'Reversing digits'
    ],
    correctAnswer: 0,
    solution: 'The smallest number is moved to the leftmost position sequentially, sorting in ascending order.',
    topic: 'Machine Input'
  },
  {
    id: 102,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    scenarioTitle: 'Machine Input Rules (Q101 - Q103)',
    scenarioText: 'Input: 42 18 85 31 56 09\nStep I: 09 42 18 85 31 56\nStep II: 09 18 42 85 31 56\nStep III: 09 18 31 42 85 56\nStep IV: 09 18 31 42 56 85',
    questionNumber: 102,
    questionText: 'For Input: 64 23 91 12 45, what will be Step II?',
    options: ['12 23 64 91 45', '12 64 23 91 45', '12 23 45 64 91', '23 12 64 45 91'],
    correctAnswer: 0,
    solution: 'Step I: 12 64 23 91 45. Step II: 12 23 64 91 45.',
    topic: 'Machine Input'
  },
  {
    id: 103,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    scenarioTitle: 'Machine Input Rules (Q101 - Q103)',
    scenarioText: 'Input: 42 18 85 31 56 09\nStep I: 09 42 18 85 31 56\nStep II: 09 18 42 85 31 56\nStep III: 09 18 31 42 85 56\nStep IV: 09 18 31 42 56 85',
    questionNumber: 103,
    questionText: 'How many total steps required to sort Input: 50 20 40 10 30?',
    options: ['4 steps', '3 steps', '5 steps', '2 steps'],
    correctAnswer: 0,
    solution: 'Step I: 10 50 20 40 30. Step II: 10 20 50 40 30. Step III: 10 20 30 50 40. Step IV: 10 20 30 40 50. Total = 4 steps.',
    topic: 'Machine Input'
  },

  // Department Allocation (Q104 - Q106)
  {
    id: 104,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    scenarioTitle: 'Department Allocation (Q104 - Q106)',
    scenarioText: 'Five professionals P, Q, R, S, T in 5 departments: HR, Finance, IT, Marketing, Ops. P not HR/Finance; Q in IT; R in Ops; S not Finance.',
    questionNumber: 104,
    questionText: 'Who is in Finance?',
    options: ['T', 'P', 'S', 'R'],
    correctAnswer: 0,
    solution: 'Q=IT, R=Ops. Since P and S cannot be Finance, T must be in Finance.',
    topic: 'Complex Puzzles'
  },
  {
    id: 105,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    scenarioTitle: 'Department Allocation (Q104 - Q106)',
    scenarioText: 'Five professionals P, Q, R, S, T in 5 departments: HR, Finance, IT, Marketing, Ops. P not HR/Finance; Q in IT; R in Ops; S not Finance.',
    questionNumber: 105,
    questionText: 'In above arrangement, which department does S belong to?',
    options: ['HR', 'Finance', 'IT', 'Operations'],
    correctAnswer: 0,
    solution: 'P cannot be HR or Finance, so P is Marketing. S is therefore in HR.',
    topic: 'Complex Puzzles'
  },
  {
    id: 106,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    scenarioTitle: 'Department Allocation (Q104 - Q106)',
    scenarioText: 'Five professionals P, Q, R, S, T in 5 departments: HR, Finance, IT, Marketing, Ops. P not HR/Finance; Q in IT; R in Ops; S not Finance.',
    questionNumber: 106,
    questionText: 'In above arrangement, which department does P belong to?',
    options: ['Marketing', 'HR', 'Finance', 'IT'],
    correctAnswer: 0,
    solution: 'P is in Marketing.',
    topic: 'Complex Puzzles'
  },
  {
    id: 107,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    questionNumber: 107,
    questionText: 'If South-East becomes North, North-East becomes West, what does West become?',
    options: ['South-East', 'North-East', 'North-West', 'South-West'],
    correctAnswer: 0,
    solution: '135° anti-clockwise rotation: West rotated 135° anti-clockwise becomes South-East.',
    topic: 'Direction Sense'
  },
  {
    id: 108,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    questionNumber: 108,
    questionText: 'Rahul is 15th from front in a row. Thrice as many behind him as in front. Boys between Rahul and 7th boy from end?',
    options: ['35', '33', '34', '36'],
    correctAnswer: 0,
    solution: 'Front = 14. Behind = 42. Total = 57. 7th from end = 51st. Between 15th and 51st = (51−15)−1 = 35 boys.',
    topic: 'Order & Ranking'
  },
  {
    id: 109,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    questionNumber: 109,
    questionText: 'Code: MARKET -> TEMRAM. How is PROFIT written?',
    options: ['TIFORP', 'ITRPRO', 'PROFIT', 'ITPROF'],
    correctAnswer: 0,
    solution: 'Reverses the whole word: PROFIT reversed is TIFORP.',
    topic: 'Coding-Decoding'
  },
  {
    id: 110,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    questionNumber: 110,
    questionText: 'Complete series: 4, 9, 19, 39, 79, ?',
    options: ['159', '149', '158', '160'],
    correctAnswer: 0,
    solution: 'Pattern is × 2 + 1: 79 × 2 + 1 = 159.',
    topic: 'Number Series'
  },

  // Venn Data Set (Q111 - Q114)
  {
    id: 111,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    scenarioTitle: 'Venn Logic Set: Course Enrolments (Q111 - Q114)',
    scenarioText: 'Course Enrolment Venn Data: 100 students. 45 in Data Science (DS), 50 in AI, 40 in Cybersecurity (CS). 15 in DS & AI, 12 in AI & CS, 10 in DS & CS, 5 in all three.',
    questionNumber: 111,
    questionText: 'How many in AT LEAST one course?',
    options: ['93', '90', '88', '95'],
    correctAnswer: 0,
    solution: '|DS ∪ AI ∪ CS| = 45 + 50 + 40 − (15 + 12 + 10) + 5 = 135 − 37 + 5 = 93.',
    topic: 'Venn Diagrams'
  },
  {
    id: 112,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    scenarioTitle: 'Venn Logic Set: Course Enrolments (Q111 - Q114)',
    scenarioText: 'Course Enrolment Venn Data: 100 students. 45 in Data Science (DS), 50 in AI, 40 in Cybersecurity (CS). 15 in DS & AI, 12 in AI & CS, 10 in DS & CS, 5 in all three.',
    questionNumber: 112,
    questionText: 'In above Venn set, how many enrolled in EXACTLY one course?',
    options: ['66', '60', '70', '62'],
    correctAnswer: 0,
    solution: 'Exactly two = (15−5) + (12−5) + (10−5) = 10 + 7 + 5 = 22. Exactly one = 93 − 22 − 5 = 66.',
    topic: 'Venn Diagrams'
  },
  {
    id: 113,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    scenarioTitle: 'Venn Logic Set: Course Enrolments (Q111 - Q114)',
    scenarioText: 'Course Enrolment Venn Data: 100 students. 45 in Data Science (DS), 50 in AI, 40 in Cybersecurity (CS). 15 in DS & AI, 12 in AI & CS, 10 in DS & CS, 5 in all three.',
    questionNumber: 113,
    questionText: 'In above Venn set, how many enrolled in NONE of these courses?',
    options: ['7', '10', '5', '12'],
    correctAnswer: 0,
    solution: 'None = 100 − 93 = 7 students.',
    topic: 'Venn Diagrams'
  },
  {
    id: 114,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    scenarioTitle: 'Venn Logic Set: Course Enrolments (Q111 - Q114)',
    scenarioText: 'Course Enrolment Venn Data: 100 students. 45 in Data Science (DS), 50 in AI, 40 in Cybersecurity (CS). 15 in DS & AI, 12 in AI & CS, 10 in DS & CS, 5 in all three.',
    questionNumber: 114,
    questionText: 'In above Venn set, how many enrolled in DS but NOT AI?',
    options: ['30', '35', '25', '20'],
    correctAnswer: 0,
    solution: 'DS without AI = Total DS − DS & AI = 45 − 15 = 30.',
    topic: 'Venn Diagrams'
  },

  // Round Robin League Set (Q115 - Q118)
  {
    id: 115,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    scenarioTitle: 'Round-Robin Tournament Set (Q115 - Q118)',
    scenarioText: 'Round-Robin League (4 Teams Alpha, Beta, Gamma, Delta). Win=3, Draw=1, Loss=0. Alpha=7pts (2W, 1D), Beta=4pts (1W, 1D, 1L), Gamma=3pts (3 draws), Delta=1pt (1D, 2L).',
    questionNumber: 115,
    questionText: 'Outcome Alpha vs Delta?',
    options: ['Alpha won', 'Delta won', 'Draw', 'Cancelled'],
    correctAnswer: 0,
    solution: 'Alpha won 2 matches (against Beta and Delta) and drew with Gamma.',
    topic: 'Tournament Logic'
  },
  {
    id: 116,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    scenarioTitle: 'Round-Robin Tournament Set (Q115 - Q118)',
    scenarioText: 'Round-Robin League (4 Teams Alpha, Beta, Gamma, Delta). Win=3, Draw=1, Loss=0. Alpha=7pts (2W, 1D), Beta=4pts (1W, 1D, 1L), Gamma=3pts (3 draws), Delta=1pt (1D, 2L).',
    questionNumber: 116,
    questionText: 'In above League, which team did Beta defeat?',
    options: ['Delta', 'Gamma', 'Alpha', 'None'],
    correctAnswer: 0,
    solution: 'Beta defeated Delta.',
    topic: 'Tournament Logic'
  },
  {
    id: 117,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    scenarioTitle: 'Round-Robin Tournament Set (Q115 - Q118)',
    scenarioText: 'Round-Robin League (4 Teams Alpha, Beta, Gamma, Delta). Win=3, Draw=1, Loss=0. Alpha=7pts (2W, 1D), Beta=4pts (1W, 1D, 1L), Gamma=3pts (3 draws), Delta=1pt (1D, 2L).',
    questionNumber: 117,
    questionText: 'In above League, total matches ending in a DRAW?',
    options: ['4', '3', '2', '5'],
    correctAnswer: 0,
    solution: 'Gamma drew all 3 matches (vs Alpha, Beta, Delta).',
    topic: 'Tournament Logic'
  },
  {
    id: 118,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    scenarioTitle: 'Round-Robin Tournament Set (Q115 - Q118)',
    scenarioText: 'Round-Robin League (4 Teams Alpha, Beta, Gamma, Delta). Win=3, Draw=1, Loss=0. Alpha=7pts (2W, 1D), Beta=4pts (1W, 1D, 1L), Gamma=3pts (3 draws), Delta=1pt (1D, 2L).',
    questionNumber: 118,
    questionText: 'In above League, total points accumulated by all 4 teams?',
    options: ['15', '18', '16', '14'],
    correctAnswer: 0,
    solution: '7 + 4 + 3 + 1 = 15 points.',
    topic: 'Tournament Logic'
  },
  {
    id: 119,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    questionNumber: 119,
    questionText: `Parajumble:\n1. Consequently, firms must adapt rapidly.\n2. Global renewable energy transition accelerated.\n3. Rapid shift driven by lower tech costs.\n4. Those that fail risk stranded assets.`,
    options: ['2314', '2134', '1234', '3214'],
    correctAnswer: 0,
    solution: 'Logical flow is 2 (topic intro), 3 (driver of shift), 1 (consequence for firms), 4 (risk of failure).',
    topic: 'Parajumbles'
  },
  {
    id: 120,
    section: 'analytical-2',
    sectionName: 'Analytical Reasoning Skills II',
    questionNumber: 120,
    questionText: `Parajumble:\n1. Qualitative research focuses on human narrative.\n2. Quantitative seeks empirical patterns.\n3. Combining both via mixed-methods yields comprehensive analysis.\n4. Each paradigm has distinct strengths.`,
    options: ['4213', '1234', '2143', '3412'],
    correctAnswer: 0,
    solution: '4 introduces the paradigms, 2 and 1 detail quantitative and qualitative, 3 concludes with synthesis.',
    topic: 'Parajumbles'
  },

  // =========================================================================
  // SECTION V: QUANTITATIVE SKILLS - PART II (30 Qs | Q121 - Q150)
  // =========================================================================
  {
    id: 121,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 121,
    questionText: 'If x + (1/x) = 4, find value of x³ + (1/x³).',
    options: ['52', '64', '48', '56'],
    correctAnswer: 0,
    solution: 'x³ + 1/x³ = (x + 1/x)³ − 3(x + 1/x) = 4³ − 3(4) = 64 − 12 = 52.',
    topic: 'Higher Algebra'
  },
  {
    id: 122,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 122,
    questionText: 'Minimum value of quadratic expression f(x) = 2x² − 8x + 11 is:',
    options: ['3', '2', '4', '5'],
    correctAnswer: 0,
    solution: 'Vertex x = −b/(2a) = 8/4 = 2. f(2) = 2(4) − 8(2) + 11 = 8 − 16 + 11 = 3.',
    topic: 'Higher Algebra - Quadratics'
  },
  {
    id: 123,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 123,
    questionText: 'Solve for x: log₂(x) + log₂(x − 2) = 3.',
    options: ['4', '2', '6', '8'],
    correctAnswer: 0,
    solution: 'x(x − 2) = 2³ = 8 ⇒ x² − 2x − 8 = 0 ⇒ x = 4.',
    topic: 'Algebra - Logarithms'
  },
  {
    id: 124,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 124,
    questionText: '3rd and 7th terms of AP are 11 and 27. Find 11th term.',
    options: ['43', '41', '45', '39'],
    correctAnswer: 0,
    solution: 'T3 = a + 2d = 11; T7 = a + 6d = 27 ⇒ 4d = 16 ⇒ d = 4, a = 3. T11 = a + 10d = 3 + 40 = 43.',
    topic: 'Algebra - Progressions'
  },
  {
    id: 125,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 125,
    questionText: 'Number of integral solutions for inequality |x − 3| ≤ 5:',
    options: ['11', '10', '12', '9'],
    correctAnswer: 0,
    solution: '−5 ≤ x − 3 ≤ 5 ⇒ −2 ≤ x ≤ 8. Integers from −2 to 8 = 8 − (−2) + 1 = 11 solutions.',
    topic: 'Algebra - Inequalities'
  },
  {
    id: 126,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 126,
    questionText: 'If a and b are roots of x² − 5x + 6 = 0, find a² + b².',
    options: ['13', '25', '19', '31'],
    correctAnswer: 0,
    solution: 'Roots are 2 and 3. a² + b² = 2² + 3² = 4 + 9 = 13.',
    topic: 'Algebra - Quadratics'
  },
  {
    id: 127,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 127,
    questionText: 'Circle inscribed in equilateral triangle of side 12 cm. Area of circle in sq cm?',
    options: ['12π', '16π', '9π', '24π'],
    correctAnswer: 0,
    solution: 'Inradius r = a / (2√3) = 12 / (2√3) = 2√3 cm. Area = πr² = π(12) = 12π sq cm.',
    topic: 'Geometry'
  },
  {
    id: 128,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 128,
    questionText: 'Rectangular box dimensions 3 cm, 4 cm, 12 cm. Length of longest internal diagonal?',
    options: ['13 cm', '12 cm', '14 cm', '15 cm'],
    correctAnswer: 0,
    solution: 'd = √(l² + w² + h²) = √(9 + 16 + 144) = √169 = 13 cm.',
    topic: 'Geometry - 3D Solids'
  },
  {
    id: 129,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 129,
    questionText: 'Triangle ABC: AB=8 cm, BC=10 cm, AC=12 cm. Median AD to BC length?',
    options: ['√79 cm', '√71 cm', '7 cm', '8 cm'],
    correctAnswer: 0,
    solution: 'Apollonius theorem: 8² + 12² = 2(AD² + 5²) ⇒ 64 + 144 = 2(AD² + 25) ⇒ 104 = AD² + 25 ⇒ AD = √79 cm.',
    topic: 'Geometry - Medians'
  },
  {
    id: 130,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 130,
    questionText: 'Diagonal of square is 10√2 cm. Find its perimeter.',
    options: ['40 cm', '20 cm', '40√2 cm', '50 cm'],
    correctAnswer: 0,
    solution: 'Side a = 10 cm. Perimeter = 4a = 40 cm.',
    topic: 'Geometry - Squares'
  },
  {
    id: 131,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 131,
    questionText: 'Cylinder radius 7 cm, height 10 cm melted into spheres radius 3.5 cm. Number of full spheres?',
    options: ['8', '6', '10', '12'],
    correctAnswer: 0,
    solution: 'Vol cylinder = π(49)(10) = 490π. Vol sphere = (4/3)π(3.5)³ = 57.167π. Spheres = 490 / 57.167 = 8.57 ⇒ 8 full spheres.',
    topic: 'Mensuration'
  },
  {
    id: 132,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 132,
    questionText: 'Distinct 4-digit numbers using digits 1, 2, 3, 4, 5 without repetition divisible by 5?',
    options: ['24', '120', '48', '12'],
    correctAnswer: 0,
    solution: 'Last digit must be 5 (1 way). First 3 digits chosen from {1, 2, 3, 4}: ⁴P₃ = 24 ways.',
    topic: 'Permutations'
  },
  {
    id: 133,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 133,
    questionText: 'Probability of getting sum at least 10 when two dice are thrown?',
    options: ['1/6', '1/12', '5/36', '1/4'],
    correctAnswer: 0,
    solution: '6 favorable outcomes out of 36 = 1/6.',
    topic: 'Probability'
  },
  {
    id: 134,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 134,
    questionText: 'Sum of infinite GP first term 12, common ratio 1/3:',
    options: ['18', '16', '24', '12'],
    correctAnswer: 0,
    solution: 'S = a / (1 − r) = 12 / (1 − 1/3) = 18.',
    topic: 'Progressions'
  },
  {
    id: 135,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 135,
    questionText: 'Pipes A & B fill tank in 12 & 18 hrs; Pipe C empties in 15 hrs. Time to fill tank together?',
    options: ['180/13 hrs', '180/19 hrs', '10.5 hrs', '12 hrs'],
    correctAnswer: 0,
    solution: 'Net rate = 1/12 + 1/18 − 1/15 = (15 + 10 − 12) / 180 = 13/180 tank/hr. Time = 180/13 hrs.',
    topic: 'Pipes & Cisterns'
  },

  // DI Financial Set (Q136 - Q140)
  {
    id: 136,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    scenarioTitle: 'DI Set: Apex Ltd Financials (Q136 - Q140)',
    scenarioText: 'Financial Performance Data (Apex Ltd 2021 - 2025 in ₹ Cr):\n• 2021: Rev=250, Exp=180 (Profit=70)\n• 2022: Rev=320, Exp=240 (Profit=80)\n• 2023: Rev=400, Exp=280 (Profit=120)\n• 2024: Rev=450, Exp=360 (Profit=90)\n• 2025: Rev=600, Exp=420 (Profit=180)',
    questionNumber: 136,
    questionText: 'In which year was absolute Profit highest?',
    options: ['2025 (180 Cr)', '2024', '2023', '2022'],
    correctAnswer: 0,
    solution: 'Profit in 2025 was ₹ 180 Cr (highest).',
    topic: 'Data Interpretation'
  },
  {
    id: 137,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    scenarioTitle: 'DI Set: Apex Ltd Financials (Q136 - Q140)',
    scenarioText: 'Financial Performance Data (Apex Ltd 2021 - 2025 in ₹ Cr):\n• 2021: Rev=250, Exp=180 (Profit=70)\n• 2022: Rev=320, Exp=240 (Profit=80)\n• 2023: Rev=400, Exp=280 (Profit=120)\n• 2024: Rev=450, Exp=360 (Profit=90)\n• 2025: Rev=600, Exp=420 (Profit=180)',
    questionNumber: 137,
    questionText: 'Percentage increase in Revenue from 2021 to 2025?',
    options: ['140%', '120%', '150%', '100%'],
    correctAnswer: 0,
    solution: '[(600 − 250) / 250] × 100 = (350 / 250) × 100 = 140%.',
    topic: 'Data Interpretation'
  },
  {
    id: 138,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    scenarioTitle: 'DI Set: Apex Ltd Financials (Q136 - Q140)',
    scenarioText: 'Financial Performance Data (Apex Ltd 2021 - 2025 in ₹ Cr):\n• 2021: Rev=250, Exp=180 (Profit=70)\n• 2022: Rev=320, Exp=240 (Profit=80)\n• 2023: Rev=400, Exp=280 (Profit=120)\n• 2024: Rev=450, Exp=360 (Profit=90)\n• 2025: Rev=600, Exp=420 (Profit=180)',
    questionNumber: 138,
    questionText: 'In which year was Profit Margin % highest?',
    options: ['2023 & 2025 tie (30%)', '2021', '2022', '2024'],
    correctAnswer: 0,
    solution: '2023: 120/400 = 30%. 2025: 180/600 = 30% (Highest tie).',
    topic: 'Data Interpretation'
  },
  {
    id: 139,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    scenarioTitle: 'DI Set: Apex Ltd Financials (Q136 - Q140)',
    scenarioText: 'Financial Performance Data (Apex Ltd 2021 - 2025 in ₹ Cr):\n• 2021: Rev=250, Exp=180 (Profit=70)\n• 2022: Rev=320, Exp=240 (Profit=80)\n• 2023: Rev=400, Exp=280 (Profit=120)\n• 2024: Rev=450, Exp=360 (Profit=90)\n• 2025: Rev=600, Exp=420 (Profit=180)',
    questionNumber: 139,
    questionText: 'Average expenditure over 5-year period in ₹ Cr?',
    options: ['296 Cr', '280 Cr', '300 Cr', '310 Cr'],
    correctAnswer: 0,
    solution: '(180 + 240 + 280 + 360 + 420) / 5 = 1480 / 5 = 296 Cr.',
    topic: 'Data Interpretation'
  },
  {
    id: 140,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    scenarioTitle: 'DI Set: Apex Ltd Financials (Q136 - Q140)',
    scenarioText: 'Financial Performance Data (Apex Ltd 2021 - 2025 in ₹ Cr):\n• 2021: Rev=250, Exp=180 (Profit=70)\n• 2022: Rev=320, Exp=240 (Profit=80)\n• 2023: Rev=400, Exp=280 (Profit=120)\n• 2024: Rev=450, Exp=360 (Profit=90)\n• 2025: Rev=600, Exp=420 (Profit=180)',
    questionNumber: 140,
    questionText: 'Ratio of total profit in 2021-2022 to total profit in 2024-2025?',
    options: ['5 : 9', '3 : 5', '15 : 27', '5 : 18'],
    correctAnswer: 0,
    solution: '(70 + 80) : (90 + 180) = 150 : 270 = 5 : 9.',
    topic: 'Data Interpretation'
  },
  {
    id: 141,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 141,
    questionText: 'Solve for x: 2^(x+2) + 2^x = 40.',
    options: ['3', '4', '2', '5'],
    correctAnswer: 0,
    solution: '2^x(4 + 1) = 40 ⇒ 2^x = 8 ⇒ x = 3.',
    topic: 'Algebra'
  },
  {
    id: 142,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 142,
    questionText: 'If a + b = 8 and ab = 15, find a² + b².',
    options: ['34', '49', '30', '28'],
    correctAnswer: 0,
    solution: 'a² + b² = (a + b)² − 2ab = 64 − 30 = 34.',
    topic: 'Algebra'
  },
  {
    id: 143,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 143,
    questionText: 'Value of log₃(81) + log₂(32) = ?',
    options: ['9', '8', '7', '10'],
    correctAnswer: 0,
    solution: 'log₃(3⁴) + log₂(2⁵) = 4 + 5 = 9.',
    topic: 'Logarithms'
  },
  {
    id: 144,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 144,
    questionText: 'Area of circle is 154 cm². Find circumference (π = 22/7).',
    options: ['44 cm', '22 cm', '88 cm', '66 cm'],
    correctAnswer: 0,
    solution: 'πr² = 154 ⇒ r = 7 cm. Circumference = 2πr = 44 cm.',
    topic: 'Mensuration'
  },
  {
    id: 145,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 145,
    questionText: 'Value of ⁷C₃ is:',
    options: ['35', '21', '42', '30'],
    correctAnswer: 0,
    solution: '⁷C₃ = (7 × 6 × 5) / (3 × 2 × 1) = 35.',
    topic: 'Combinations'
  },
  {
    id: 146,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 146,
    questionText: 'Ace probability from standard 52 cards deck:',
    options: ['1/13', '1/52', '1/4', '4/13'],
    correctAnswer: 0,
    solution: '4 aces / 52 cards = 1/13.',
    topic: 'Probability'
  },
  {
    id: 147,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 147,
    questionText: 'Common ratio of GP: 3, 6, 12, 24 ...',
    options: ['2', '3', '0.5', '4'],
    correctAnswer: 0,
    solution: 'Ratio = 6/3 = 2.',
    topic: 'Progressions'
  },
  {
    id: 148,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 148,
    questionText: 'Perimeter of square is 48 cm. Find its area.',
    options: ['144 cm²', '121 cm²', '169 cm²', '100 cm²'],
    correctAnswer: 0,
    solution: 'Side a = 48/4 = 12 cm. Area = 12² = 144 cm².',
    topic: 'Mensuration'
  },
  {
    id: 149,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 149,
    questionText: 'Solve inequality: 3x − 5 < 10.',
    options: ['x < 5', 'x > 5', 'x < 3', 'x < 15'],
    correctAnswer: 0,
    solution: '3x < 15 ⇒ x < 5.',
    topic: 'Algebra'
  },
  {
    id: 150,
    section: 'quant-2',
    sectionName: 'Quantitative Skills II',
    questionNumber: 150,
    questionText: 'Distance between points (2, 3) and (5, 7):',
    options: ['5', '6', '7', '4'],
    correctAnswer: 0,
    solution: 'd = √[(5 − 2)² + (7 − 3)²] = √(9 + 16) = 5.',
    topic: 'Coordinate Geometry'
  },

  // =========================================================================
  // SECTION VI: VERBAL SKILLS - PART II (30 Qs | Q151 - Q180)
  // =========================================================================
  {
    id: 151,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    passageTitle: 'Passage 1: Ecosystem Services & Valuation (Q151 - Q154)',
    passageText: `The economic valuation of ecosystem services has become a central paradigm in contemporary environmental governance. By assigning monetary values to ecological functions—such as carbon sequestration, pollination, and watershed protection—policy advocates aim to integrate natural capital into traditional cost-benefit analyses. However, critical political economists argue that this financialization of nature commodifies essential ecological processes, reducing intrinsic environmental values to market dynamics. When ecosystem services are monetized, their protection becomes contingent upon market demand and financial return rather than ecological integrity. Furthermore, market-based conservation instruments like carbon credits often perpetuate spatial inequalities, allowing heavy polluters in industrialized nations to offset emissions while displacing local communities in developing regions.`,
    questionNumber: 151,
    questionText: 'Primary concern raised by critical political economists?',
    options: [
      'Monetizing nature reduces intrinsic ecological value to market dynamics',
      'Ecosystem services are impossible to measure',
      'Carbon credits failed globally',
      'Industrial nations bear entire burden'
    ],
    correctAnswer: 0,
    solution: 'Critical economists argue that financializing nature reduces intrinsic ecological integrity to market commodification.',
    topic: 'Reading Comprehension'
  },
  {
    id: 152,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    passageTitle: 'Passage 1: Ecosystem Services & Valuation (Q151 - Q154)',
    passageText: `The economic valuation of ecosystem services has become a central paradigm in contemporary environmental governance. By assigning monetary values to ecological functions—such as carbon sequestration, pollination, and watershed protection—policy advocates aim to integrate natural capital into traditional cost-benefit analyses. However, critical political economists argue that this financialization of nature commodifies essential ecological processes, reducing intrinsic environmental values to market dynamics. When ecosystem services are monetized, their protection becomes contingent upon market demand and financial return rather than ecological integrity. Furthermore, market-based conservation instruments like carbon credits often perpetuate spatial inequalities, allowing heavy polluters in industrialized nations to offset emissions while displacing local communities in developing regions.`,
    questionNumber: 152,
    questionText: 'Unintended consequence of carbon credits mentioned?',
    options: [
      'Spatial inequalities and displacement of local communities',
      'Devaluation of natural capital',
      'Cessation of carbon projects',
      'Over-regulation of instruments'
    ],
    correctAnswer: 0,
    solution: 'The passage highlights that carbon credits perpetuate spatial inequalities and displace local communities in developing nations.',
    topic: 'Reading Comprehension'
  },
  {
    id: 153,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    passageTitle: 'Passage 1: Ecosystem Services & Valuation (Q151 - Q154)',
    passageText: `The economic valuation of ecosystem services has become a central paradigm in contemporary environmental governance. By assigning monetary values to ecological functions—such as carbon sequestration, pollination, and watershed protection—policy advocates aim to integrate natural capital into traditional cost-benefit analyses. However, critical political economists argue that this financialization of nature commodifies essential ecological processes, reducing intrinsic environmental values to market dynamics. When ecosystem services are monetized, their protection becomes contingent upon market demand and financial return rather than ecological integrity. Furthermore, market-based conservation instruments like carbon credits often perpetuate spatial inequalities, allowing heavy polluters in industrialized nations to offset emissions while displacing local communities in developing regions.`,
    questionNumber: 153,
    questionText: 'Term "natural capital" refers to:',
    options: [
      'Stock of natural assets providing ecological functions',
      'Financial green investments',
      'Agricultural GDP',
      'Pollution taxes'
    ],
    correctAnswer: 0,
    solution: 'Natural capital refers to the earth\'s stock of natural resources and ecological systems.',
    topic: 'Reading Comprehension'
  },
  {
    id: 154,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    passageTitle: 'Passage 1: Ecosystem Services & Valuation (Q151 - Q154)',
    passageText: `The economic valuation of ecosystem services has become a central paradigm in contemporary environmental governance. By assigning monetary values to ecological functions—such as carbon sequestration, pollination, and watershed protection—policy advocates aim to integrate natural capital into traditional cost-benefit analyses. However, critical political economists argue that this financialization of nature commodifies essential ecological processes, reducing intrinsic environmental values to market dynamics. When ecosystem services are monetized, their protection becomes contingent upon market demand and financial return rather than ecological integrity. Furthermore, market-based conservation instruments like carbon credits often perpetuate spatial inequalities, allowing heavy polluters in industrialized nations to offset emissions while displacing local communities in developing regions.`,
    questionNumber: 154,
    questionText: "Author's tone toward market-based instruments:",
    options: ['Critically analytical', 'Unreservedly enthusiastic', 'Dismissive', 'Passive'],
    correctAnswer: 0,
    solution: 'The author methodically critiques the systemic downsides of monetization, adopting a critically analytical tone.',
    topic: 'Tone & Attitude'
  },

  // Passage 2: Architecture (Q155 - Q158)
  {
    id: 155,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    passageTitle: 'Passage 2: Modernist & Postmodern Architecture (Q155 - Q158)',
    passageText: `Urban architecture reflects prevailing socio-political ideologies. The Gothic style of medieval Europe, with its soaring vaults and pointed arches, aimed to direct human contemplation skyward, underscoring ecclesiastical authority. Conversely, the modernist movement of the early 20th century, championed by figures like Le Corbusier, emphasized functionality, geometric purity, and industrial efficiency. Modernism viewed the building as a 'machine for living,' rejecting historical ornamentation in favor of mass-produced steel, concrete, and glass. Yet, this functionalist ideal often resulted in monotonous urban landscapes that alienated residents, sparking the postmodern response which re-introduced historicism, irony, and local context into architectural design.`,
    questionNumber: 155,
    questionText: "Phrase 'machine for living' reflects which philosophy?",
    options: [
      'Priority of functional utility over ornamentation',
      'Rejection of industrial manufacturing',
      'Imitation of Gothic designs',
      'Local cultural context'
    ],
    correctAnswer: 0,
    solution: 'It reflects the modernist emphasis on functional efficiency and industrial utility over decorative ornamentation.',
    topic: 'Reading Comprehension'
  },
  {
    id: 156,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    passageTitle: 'Passage 2: Modernist & Postmodern Architecture (Q155 - Q158)',
    passageText: `Urban architecture reflects prevailing socio-political ideologies. The Gothic style of medieval Europe, with its soaring vaults and pointed arches, aimed to direct human contemplation skyward, underscoring ecclesiastical authority. Conversely, the modernist movement of the early 20th century, championed by figures like Le Corbusier, emphasized functionality, geometric purity, and industrial efficiency. Modernism viewed the building as a 'machine for living,' rejecting historical ornamentation in favor of mass-produced steel, concrete, and glass. Yet, this functionalist ideal often resulted in monotonous urban landscapes that alienated residents, sparking the postmodern response which re-introduced historicism, irony, and local context into architectural design.`,
    questionNumber: 156,
    questionText: 'Why did postmodernism emerge?',
    options: [
      'Reaction to monotonous and alienating modernist landscapes',
      'Steel became too expensive',
      'To restore church dominance',
      'Direct extension of Corbusier'
    ],
    correctAnswer: 0,
    solution: 'Postmodernism arose in response to the alienating, monotonous functionalism of modernist landscapes.',
    topic: 'Reading Comprehension'
  },
  {
    id: 157,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    passageTitle: 'Passage 2: Modernist & Postmodern Architecture (Q155 - Q158)',
    passageText: `Urban architecture reflects prevailing socio-political ideologies. The Gothic style of medieval Europe, with its soaring vaults and pointed arches, aimed to direct human contemplation skyward, underscoring ecclesiastical authority. Conversely, the modernist movement of the early 20th century, championed by figures like Le Corbusier, emphasized functionality, geometric purity, and industrial efficiency. Modernism viewed the building as a 'machine for living,' rejecting historical ornamentation in favor of mass-produced steel, concrete, and glass. Yet, this functionalist ideal often resulted in monotonous urban landscapes that alienated residents, sparking the postmodern response which re-introduced historicism, irony, and local context into architectural design.`,
    questionNumber: 157,
    questionText: 'Gothic architecture sought to express:',
    options: [
      'Ecclesiastical authority and spiritual contemplation',
      'Industrial efficiency',
      'Postmodern irony',
      'Mass housing'
    ],
    correctAnswer: 0,
    solution: 'The passage mentions Gothic architecture underscored ecclesiastical authority and directed human contemplation skyward.',
    topic: 'Reading Comprehension'
  },
  {
    id: 158,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    passageTitle: 'Passage 2: Modernist & Postmodern Architecture (Q155 - Q158)',
    passageText: `Urban architecture reflects prevailing socio-political ideologies. The Gothic style of medieval Europe, with its soaring vaults and pointed arches, aimed to direct human contemplation skyward, underscoring ecclesiastical authority. Conversely, the modernist movement of the early 20th century, championed by figures like Le Corbusier, emphasized functionality, geometric purity, and industrial efficiency. Modernism viewed the building as a 'machine for living,' rejecting historical ornamentation in favor of mass-produced steel, concrete, and glass. Yet, this functionalist ideal often resulted in monotonous urban landscapes that alienated residents, sparking the postmodern response which re-introduced historicism, irony, and local context into architectural design.`,
    questionNumber: 158,
    questionText: 'Material NOT explicitly associated with modernism in text:',
    options: ['Carved Timber', 'Steel', 'Glass', 'Concrete'],
    correctAnswer: 0,
    solution: 'The passage explicitly lists steel, concrete, and glass. Carved timber is not associated with modernism.',
    topic: 'Reading Comprehension'
  },

  // Passage 3: Behavioral Psychology (Q159 - Q162)
  {
    id: 159,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    passageTitle: 'Passage 3: Behavioral Psychology & Nudge Theory (Q159 - Q162)',
    passageText: `Cognitive biases systematically distort human decision-making, departing from normative models of classical economic theory. One prominent phenomenon is 'status quo bias,' wherein individuals demonstrate an irrational preference for current state. Faced with complex choices, decision-makers experience choice overload, leading to decision fatigue. Default options capitalize on this bias; by pre-selecting a designated choice, choice architects significantly increase adoption rates without restricting choice. This forms the foundation of 'nudge theory,' guiding behavior toward desirable outcomes while maintaining autonomy.`,
    questionNumber: 159,
    questionText: 'Mechanism through which default options influence choices?',
    options: [
      'Leveraging status quo bias and mitigating choice overload',
      'Legally enforcing choices',
      'Financial subsidies',
      'Eliminating alternatives'
    ],
    correctAnswer: 0,
    solution: 'Default options work by harnessing the status quo bias and reducing decision fatigue caused by choice overload.',
    topic: 'Reading Comprehension'
  },
  {
    id: 160,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    passageTitle: 'Passage 3: Behavioral Psychology & Nudge Theory (Q159 - Q162)',
    passageText: `Cognitive biases systematically distort human decision-making, departing from normative models of classical economic theory. One prominent phenomenon is 'status quo bias,' wherein individuals demonstrate an irrational preference for current state. Faced with complex choices, decision-makers experience choice overload, leading to decision fatigue. Default options capitalize on this bias; by pre-selecting a designated choice, choice architects significantly increase adoption rates without restricting choice. This forms the foundation of 'nudge theory,' guiding behavior toward desirable outcomes while maintaining autonomy.`,
    questionNumber: 160,
    questionText: 'Nudge theory policy intervention requirement:',
    options: [
      'Guide behavior while preserving individual autonomy',
      'Restrict choice freedom',
      'Mandate penal codes',
      'Rely on classical economics'
    ],
    correctAnswer: 0,
    solution: 'Nudges guide behavior toward positive outcomes while explicitly preserving individual freedom of choice.',
    topic: 'Reading Comprehension'
  },
  {
    id: 161,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    passageTitle: 'Passage 3: Behavioral Psychology & Nudge Theory (Q159 - Q162)',
    passageText: `Cognitive biases systematically distort human decision-making, departing from normative models of classical economic theory. One prominent phenomenon is 'status quo bias,' wherein individuals demonstrate an irrational preference for current state. Faced with complex choices, decision-makers experience choice overload, leading to decision fatigue. Default options capitalize on this bias; by pre-selecting a designated choice, choice architects significantly increase adoption rates without restricting choice. This forms the foundation of 'nudge theory,' guiding behavior toward desirable outcomes while maintaining autonomy.`,
    questionNumber: 161,
    questionText: 'Classical economic theory assumes decision-making is:',
    options: [
      'Rational and aligned with normative models',
      'Systematic and biased',
      'Driven by choice overload',
      'Dependent on defaults'
    ],
    correctAnswer: 0,
    solution: 'Classical economic theory posits rational human actors behaving according to normative models.',
    topic: 'Reading Comprehension'
  },
  {
    id: 162,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    passageTitle: 'Passage 3: Behavioral Psychology & Nudge Theory (Q159 - Q162)',
    passageText: `Cognitive biases systematically distort human decision-making, departing from normative models of classical economic theory. One prominent phenomenon is 'status quo bias,' wherein individuals demonstrate an irrational preference for current state. Faced with complex choices, decision-makers experience choice overload, leading to decision fatigue. Default options capitalize on this bias; by pre-selecting a designated choice, choice architects significantly increase adoption rates without restricting choice. This forms the foundation of 'nudge theory,' guiding behavior toward desirable outcomes while maintaining autonomy.`,
    questionNumber: 162,
    questionText: 'Decision fatigue occurs when individuals:',
    options: [
      'Experience cognitive exhaustion from choice overload',
      'Face time limits',
      'Refuse market participation',
      'Are unaware of defaults'
    ],
    correctAnswer: 0,
    solution: 'Decision fatigue results from cognitive exhaustion when faced with excessive, complex choices.',
    topic: 'Reading Comprehension'
  },
  {
    id: 163,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    questionNumber: 163,
    questionText: `Paragraph Summary: Microplastics in Oceans\nMicroplastics contaminate marine webs, absorbing toxins. Seafood consumption exposes humans to health risks. International action is needed.`,
    options: [
      'Microplastic contamination damages marine webs and poses human health risks, demanding global action',
      'Ban seafood globally',
      'Affects only plankton',
      'Regulations already succeeded'
    ],
    correctAnswer: 0,
    solution: 'Option A succinctly captures all main points: marine damage, human health risk, and international policy demand.',
    topic: 'Paragraph Summary'
  },
  {
    id: 164,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    questionNumber: 164,
    questionText: `Paragraph Summary: Remote & Hybrid Work\nRemote work enhances autonomy but complicates cohesion. Hybrid models balance flexibility with office collaboration.`,
    options: [
      "Hybrid work models aim to reconcile worker flexibility with management's need for collaboration",
      'Remote work is unsustainable',
      'Employees prefer full-time office',
      'Commute stress is sole factor'
    ],
    correctAnswer: 0,
    solution: 'Option A accurately expresses the compromise between autonomy and collaborative teamwork.',
    topic: 'Paragraph Summary'
  },
  {
    id: 165,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    questionNumber: 165,
    questionText: `Odd One Out: Cryptographic Protocols\n1) Protocols form security backbone.\n2) PKI ensures identity verification.\n3) High transaction latency is bottleneck.\n4) Hash functions guarantee immutability.\n5) Primitives protect ledgers.`,
    options: ['Sentence 3', 'Sentence 1', 'Sentence 2', 'Sentence 4'],
    correctAnswer: 0,
    solution: 'Sentences 1, 2, 4, and 5 discuss core security functions of cryptographic primitives, while 3 shifts focus to transactional bottlenecks.',
    topic: 'Odd Sentence Out'
  },
  {
    id: 166,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    questionNumber: 166,
    questionText: `Odd One Out: Photosynthesis\n1) Converts solar energy to glucose.\n2) Chlorophyll absorbs light.\n3) Global deforestation reduces canopy cover.\n4) Light reactions split water.\n5) Calvin cycle synthesizes sugars.`,
    options: ['Sentence 3', 'Sentence 1', 'Sentence 2', 'Sentence 4'],
    correctAnswer: 0,
    solution: 'Sentences 1, 2, 4, and 5 detail the biochemical mechanisms of photosynthesis, while 3 discusses ecological deforestation.',
    topic: 'Odd Sentence Out'
  },
  {
    id: 167,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    questionNumber: 167,
    questionText: `Parajumble:\n1. Isolation allowed unique endemic species.\n2. Madagascar separated 88 million years ago.\n3. Habitat loss threatens communities.\n4. 90% wildlife found nowhere else.`,
    options: ['2143', '1234', '2413', '3214'],
    correctAnswer: 0,
    solution: '2 (geographical separation), 1 (evolutionary isolation), 4 (biodiversity statistic), 3 (conservation threat).',
    topic: 'Parajumbles'
  },
  {
    id: 168,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    questionNumber: 168,
    questionText: `Parajumble:\n1. Language acquisition involves innate structures and environment.\n2. Chomsky posited Universal Grammar.\n3. Social interactionists emphasize context.\n4. Modern linguistics reconciles both nature and nurture.`,
    options: ['1234', '2134', '4321', '3214'],
    correctAnswer: 0,
    solution: '1 introduces topic, 2 and 3 state Chomsky and interactionists, 4 synthesizes both views.',
    topic: 'Parajumbles'
  },
  {
    id: 169,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    questionNumber: 169,
    questionText: 'Fill in the blank: "Notwithstanding severe headwinds, the enterprise posted _____ profits."',
    options: ['robust', 'dismal', 'negligible', 'volatile'],
    correctAnswer: 0,
    solution: '"Notwithstanding" indicates a contrast; despite headwinds, profits were strong ("robust").',
    topic: 'Sentence Completion'
  },
  {
    id: 170,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    questionNumber: 170,
    questionText: 'Word choice: "The negotiator\'s _____ strategy successfully de-escalated trade conflict."',
    options: ['conciliatory', 'belligerent', 'dogmatic', 'hostile'],
    correctAnswer: 0,
    solution: '"Conciliatory" means peacemaking or intended to placate, which successfully de-escalates conflict.',
    topic: 'Vocabulary'
  },
  {
    id: 171,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    questionNumber: 171,
    questionText: 'Sentence completion: "His _____ response to audit report indicated he was totally _____ about findings."',
    options: [
      'indifferent ... unconcerned',
      'passionate ... aloof',
      'energetic ... indifferent',
      'hostile ... empathetic'
    ],
    correctAnswer: 0,
    solution: '"Indifferent" pairs logically with being "unconcerned" about audit findings.',
    topic: 'Double Blanks'
  },
  {
    id: 172,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    questionNumber: 172,
    questionText: 'Correct usage: "The CEO insisted _____ reviewing performance reports personally."',
    options: ['on', 'at', 'for', 'with'],
    correctAnswer: 0,
    solution: '"Insisted on" is the correct prepositional verb idiom.',
    topic: 'Grammar - Prepositions'
  },
  {
    id: 173,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    questionNumber: 173,
    questionText: 'Correct expression: "If I _____ CFO, I would allocate more capital to R&D."',
    options: ['were', 'was', 'am', 'have been'],
    correctAnswer: 0,
    solution: 'Subjunctive conditional requires "were".',
    topic: 'Grammar - Subjunctive Mood'
  },
  {
    id: 174,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    questionNumber: 174,
    questionText: 'Parallel structure:',
    options: [
      'She likes reading research papers, writing analysis, and presenting findings.',
      'She likes reading research papers, writing analysis, and to present findings.',
      'She likes to read, writing analysis, and present findings.',
      'She likes reading, to write, and presenting.'
    ],
    correctAnswer: 0,
    solution: 'Option A maintains consistent gerund forms (-ing: reading, writing, presenting).',
    topic: 'Grammar - Parallelism'
  },
  {
    id: 175,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    questionNumber: 175,
    questionText: 'Correlative pair: "Affects not only financial institutions _____ FinTech startups."',
    options: ['but also', 'and also', 'as well as', 'in addition to'],
    correctAnswer: 0,
    solution: '"Not only ... but also" is the mandatory correlative conjunction pair.',
    topic: 'Grammar - Conjunctions'
  },
  {
    id: 176,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    questionNumber: 176,
    questionText: 'Idiomatic pair: "Scarcely had the announcement been made _____ stock prices tumbled."',
    options: ['when', 'than', 'then', 'after'],
    correctAnswer: 0,
    solution: '"Scarcely had ... when" is the correct grammatical structure.',
    topic: 'Grammar - Inversion'
  },
  {
    id: 177,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    questionNumber: 177,
    questionText: 'Word synonym for EPHEMERAL:',
    options: ['Transient', 'Permanent', 'Substantial', 'Eternal'],
    correctAnswer: 0,
    solution: 'Ephemeral means lasting a very short time (transient).',
    topic: 'Synonyms'
  },
  {
    id: 178,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    questionNumber: 178,
    questionText: 'Word antonym for PRUDENT:',
    options: ['Reckless', 'Cautious', 'Judicious', 'Sagacious'],
    correctAnswer: 0,
    solution: 'Prudent means careful and foresighted; antonym is Reckless.',
    topic: 'Antonyms'
  },
  {
    id: 179,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    questionNumber: 179,
    questionText: 'Word closest to LACONIC:',
    options: ['Concise', 'Verbose', 'Eloquent', 'Garrulous'],
    correctAnswer: 0,
    solution: 'Laconic means using very few words (concise).',
    topic: 'Synonyms'
  },
  {
    id: 180,
    section: 'verbal-2',
    sectionName: 'Verbal Skills II',
    questionNumber: 180,
    questionText: 'Word opposite to AMELIORATE:',
    options: ['Worsen', 'Enhance', 'Mitigate', 'Refine'],
    correctAnswer: 0,
    solution: 'Ameliorate means to improve; its antonym is Worsen.',
    topic: 'Antonyms'
  }
];
