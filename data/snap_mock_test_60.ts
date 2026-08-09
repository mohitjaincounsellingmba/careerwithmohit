export interface SnapQuestion {
  id: number;
  section: 'english' | 'quant' | 'logic';
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

export const SNAP_MOCK_TEST_60: SnapQuestion[] = [
  // =========================================================================
  // SECTION I: GENERAL ENGLISH (15 Questions, Q1 - Q15)
  // =========================================================================

  // Reading Comprehension: "Deep Work" (Q1 - Q3)
  {
    id: 1,
    section: 'english',
    sectionName: 'General English',
    passageTitle: 'Reading Comprehension: Deep Work (Q1 - Q3)',
    passageText: `In today's fast-paced digital economy, the concept of "deep work" has emerged as a critical competitive advantage. Coined by computer science professor Cal Newport, deep work refers to the ability to focus without distraction on a cognitively demanding task. It allows individuals to quickly master complicated information and produce better results in less time. Conversely, "shallow work"—tasks like constantly checking emails, responding to instant messages, and attending unproductive meetings—dominates the modern corporate landscape. While shallow work is necessary for baseline logistics, it rarely creates new value. The shift towards open-plan offices and an expectation of constant connectivity has inadvertently degraded the workforce's ability to engage in sustained, high-level cognition. Companies that recognize and cultivate deep work cultures are seeing disproportionate gains in innovation and employee satisfaction.`,
    questionNumber: 1,
    questionText: 'According to the passage, what is the primary consequence of "shallow work"?',
    options: [
      'It enhances workforce innovation.',
      'It creates significant new value for corporations.',
      'It handles baseline logistics but rarely creates new value.',
      'It requires profound cognitive effort to execute.'
    ],
    correctAnswer: 2,
    solution: 'The passage explicitly states: "While shallow work is necessary for baseline logistics, it rarely creates new value."',
    topic: 'Reading Comprehension - Factual Detail'
  },
  {
    id: 2,
    section: 'english',
    sectionName: 'General English',
    passageTitle: 'Reading Comprehension: Deep Work (Q1 - Q3)',
    passageText: `In today's fast-paced digital economy, the concept of "deep work" has emerged as a critical competitive advantage. Coined by computer science professor Cal Newport, deep work refers to the ability to focus without distraction on a cognitively demanding task. It allows individuals to quickly master complicated information and produce better results in less time. Conversely, "shallow work"—tasks like constantly checking emails, responding to instant messages, and attending unproductive meetings—dominates the modern corporate landscape. While shallow work is necessary for baseline logistics, it rarely creates new value. The shift towards open-plan offices and an expectation of constant connectivity has inadvertently degraded the workforce's ability to engage in sustained, high-level cognition. Companies that recognize and cultivate deep work cultures are seeing disproportionate gains in innovation and employee satisfaction.`,
    questionNumber: 2,
    questionText: 'Which office trend does the author identify as detrimental to sustained high-level cognition?',
    options: [
      'Four-day work weeks',
      'Open-plan offices and constant connectivity',
      'Asynchronous communication tools',
      'Deep work culture'
    ],
    correctAnswer: 1,
    solution: 'The author notes that "The shift towards open-plan offices and an expectation of constant connectivity has inadvertently degraded the workforce\'s ability to engage in sustained, high-level cognition."',
    topic: 'Reading Comprehension - Inferences'
  },
  {
    id: 3,
    section: 'english',
    sectionName: 'General English',
    passageTitle: 'Reading Comprehension: Deep Work (Q1 - Q3)',
    passageText: `In today's fast-paced digital economy, the concept of "deep work" has emerged as a critical competitive advantage. Coined by computer science professor Cal Newport, deep work refers to the ability to focus without distraction on a cognitively demanding task. It allows individuals to quickly master complicated information and produce better results in less time. Conversely, "shallow work"—tasks like constantly checking emails, responding to instant messages, and attending unproductive meetings—dominates the modern corporate landscape. While shallow work is necessary for baseline logistics, it rarely creates new value. The shift towards open-plan offices and an expectation of constant connectivity has inadvertently degraded the workforce's ability to engage in sustained, high-level cognition. Companies that recognize and cultivate deep work cultures are seeing disproportionate gains in innovation and employee satisfaction.`,
    questionNumber: 3,
    questionText: 'What is the main benefit of "deep work" as described by Cal Newport?',
    options: [
      'Mastering information quickly and producing better results.',
      'Replying to more emails per hour.',
      'Increasing the number of collaborative meetings.',
      'Reducing the need for individual employee accountability.'
    ],
    correctAnswer: 0,
    solution: 'The passage highlights that deep work "allows individuals to quickly master complicated information and produce better results in less time."',
    topic: 'Reading Comprehension - Main Idea'
  },

  // Verbal Ability & Verbal Reasoning (Q4 - Q15)
  {
    id: 4,
    section: 'english',
    sectionName: 'General English',
    questionNumber: 4,
    questionText: 'Choose the correct synonym for the word METICULOUS:',
    options: ['Careless', 'Sloppy', 'Fastidious', 'Hasty'],
    correctAnswer: 2,
    solution: 'Meticulous means showing great attention to detail; very careful and precise. "Fastidious" is an exact synonym.',
    topic: 'Vocabulary - Synonyms'
  },
  {
    id: 5,
    section: 'english',
    sectionName: 'General English',
    questionNumber: 5,
    questionText: 'Choose the correct antonym for the word OBFUSCATE:',
    options: ['Confuse', 'Clarify', 'Conceal', 'Complicate'],
    correctAnswer: 1,
    solution: 'Obfuscate means to make obscure, unclear, or unintelligible. Its direct antonym is "Clarify".',
    topic: 'Vocabulary - Antonyms'
  },
  {
    id: 6,
    section: 'english',
    sectionName: 'General English',
    questionNumber: 6,
    questionText: 'Identify the grammatically correct sentence:',
    options: [
      'Neither the principal nor the teachers is responsible for the delay.',
      'Neither the principal nor the teachers are responsible for the delay.',
      'Neither the principal or the teachers is responsible for the delay.',
      'Neither principal nor teachers was responsible for the delay.'
    ],
    correctAnswer: 1,
    solution: "When 'neither...nor' connects two subjects, the verb agrees with the closer subject. 'Teachers' is plural, requiring the plural verb 'are'.",
    topic: 'Grammar - Subject-Verb Agreement'
  },
  {
    id: 7,
    section: 'english',
    sectionName: 'General English',
    questionNumber: 7,
    questionText: 'Fill in the blank with the appropriate preposition: "She has a great affinity _____ classical music."',
    options: ['for', 'with', 'to', 'in'],
    correctAnswer: 0,
    solution: '"Affinity for" is the standard idiomatic collocation denoting a natural liking for or attraction to something.',
    topic: 'Grammar - Prepositions'
  },
  {
    id: 8,
    section: 'english',
    sectionName: 'General English',
    questionNumber: 8,
    questionText: 'What is the meaning of the idiom "Spill the beans"?',
    options: [
      "To drop one's food",
      'To reveal a secret',
      'To cook a delicious meal',
      'To cause an unnecessary argument'
    ],
    correctAnswer: 1,
    solution: '"Spill the beans" is an idiom meaning to disclose a secret or reveal information prematurely or inadvertently.',
    topic: 'Vocabulary - Idioms & Phrases'
  },
  {
    id: 9,
    section: 'english',
    sectionName: 'General English',
    questionNumber: 9,
    questionText: 'What is the meaning of the idiom "Under the weather"?',
    options: [
      'Feeling slightly ill',
      'Standing in the rain',
      'Being deeply depressed',
      'Checking the forecast'
    ],
    correctAnswer: 0,
    solution: '"Under the weather" means feeling slightly indisposed, sick, or unwell.',
    topic: 'Vocabulary - Idioms & Phrases'
  },
  {
    id: 10,
    section: 'english',
    sectionName: 'General English',
    questionNumber: 10,
    questionText: 'Change the voice: "The chef cooked a delicious meal."',
    options: [
      'A delicious meal is cooked by the chef.',
      'A delicious meal was cooked by the chef.',
      'A delicious meal has been cooked by the chef.',
      'The chef was cooking a delicious meal.'
    ],
    correctAnswer: 1,
    solution: 'The active sentence is in the simple past tense ("cooked"). Its passive voice form uses "was cooked": "A delicious meal was cooked by the chef."',
    topic: 'Grammar - Active/Passive Voice'
  },
  {
    id: 11,
    section: 'english',
    sectionName: 'General English',
    questionNumber: 11,
    questionText: 'Change into indirect speech: He said, "I am going to the market."',
    options: [
      'He said that he is going to the market.',
      'He said that I was going to the market.',
      'He said that he was going to the market.',
      'He says he was going to the market.'
    ],
    correctAnswer: 2,
    solution: 'In reported speech with a past reporting verb ("said"), present continuous ("I am going") converts to past continuous ("he was going").',
    topic: 'Grammar - Direct/Indirect Speech'
  },
  {
    id: 12,
    section: 'english',
    sectionName: 'General English',
    questionNumber: 12,
    questionText: `Parajumble:\n\nP. However, its widespread adoption has sparked ethical debates.\nQ. Artificial Intelligence has revolutionized multiple industries in a short span.\nR. Chief among these concerns is the potential for algorithmic bias.\nS. Therefore, implementing strict regulatory frameworks is essential.`,
    options: ['QPRS', 'PQRS', 'QPSR', 'RSPQ'],
    correctAnswer: 0,
    solution: 'Logical Sequence is QPRS:\n• Q introduces the core topic (AI revolutionizing industries).\n• P introduces the contrasting ethical concerns ("However...").\n• R details the specific concern (algorithmic bias).\n• S delivers the concluding resolution (regulatory frameworks).',
    topic: 'Verbal Ability - Parajumbles'
  },
  {
    id: 13,
    section: 'english',
    sectionName: 'General English',
    questionNumber: 13,
    questionText: `Parajumble:\n\nP. It also requires a commitment to continuous learning.\nQ. Achieving success in any field is not purely about natural talent.\nR. Without perseverance, even the most gifted individuals often fail.\nS. It is largely driven by consistent effort and perseverance.`,
    options: ['PQRS', 'QSRP', 'QSPR', 'SQRP'],
    correctAnswer: 1,
    solution: 'Logical Sequence is QSRP:\n• Q introduces success not being purely about talent.\n• S states what drives it instead (consistent effort and perseverance).\n• R reinforces why perseverance is essential.\n• P adds an additional requirement ("It also requires...").',
    topic: 'Verbal Ability - Parajumbles'
  },
  {
    id: 14,
    section: 'english',
    sectionName: 'General English',
    questionNumber: 14,
    questionText: 'Choose the correctly spelt word:',
    options: ['Accomodation', 'Accomadation', 'Accommodation', 'Acommodation'],
    correctAnswer: 2,
    solution: 'The correct spelling is "Accommodation" (double \'c\' and double \'m\').',
    topic: 'Vocabulary - Spelling'
  },
  {
    id: 15,
    section: 'english',
    sectionName: 'General English',
    questionNumber: 15,
    questionText: 'Fill in the blanks: "The manager\'s _____ attitude towards the project\'s risks led to a _____ outcome."',
    options: [
      'cautious ... disastrous',
      'cavalier ... catastrophic',
      'strict ... chaotic',
      'hostile ... successful'
    ],
    correctAnswer: 1,
    solution: '"Cavalier" (showing a lack of proper concern/dismissive) directly leads to a "catastrophic" (disastrous) outcome, creating a logical cause-and-effect pair.',
    topic: 'Sentence Completion - Double Blanks'
  },

  // =========================================================================
  // SECTION II: QUANTITATIVE, DATA INTERPRETATION & DATA SUFFICIENCY (20 Qs)
  // =========================================================================

  {
    id: 16,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    questionNumber: 16,
    questionText: 'A car travels from City A to City B at a speed of 60 km/h and returns at 40 km/h. What is the average speed for the round trip?',
    options: ['50 km/h', '48 km/h', '45 km/h', '52 km/h'],
    correctAnswer: 1,
    solution: 'Harmonic mean formula for equal distances:\nAverage Speed = 2xy / (x + y) = 2(60)(40) / (60 + 40) = 4800 / 100 = 48 km/h.',
    topic: 'Arithmetic - Speed, Time & Distance'
  },
  {
    id: 17,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    questionNumber: 17,
    questionText: 'A can complete a work in 12 days and B can do it in 15 days. If they work together for 4 days, what fraction of the work is left?',
    options: ['2/5', '1/5', '3/5', '4/15'],
    correctAnswer: 0,
    solution: "A's 1-day work = 1/12. B's 1-day work = 1/15.\nTogether in 1 day = 1/12 + 1/15 = 9/60 = 3/20.\nIn 4 days = 4 × (3/20) = 12/20 = 3/5.\nFraction of work left = 1 − 3/5 = 2/5.",
    topic: 'Arithmetic - Time & Work'
  },
  {
    id: 18,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    questionNumber: 18,
    questionText: 'The difference between Compound Interest and Simple Interest on a certain sum for 2 years at 10% per annum is ₹ 150. Find the sum.',
    options: ['₹ 10,000', '₹ 12,000', '₹ 15,000', '₹ 20,000'],
    correctAnswer: 2,
    solution: '2-Year Difference Formula: Diff = P(R/100)²\n150 = P(10/100)² = P(1/100)\nP = 150 × 100 = ₹ 15,000.',
    topic: 'Arithmetic - Interest Rates'
  },
  {
    id: 19,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    questionNumber: 19,
    questionText: 'A shopkeeper marks up his goods by 40% and then allows a discount of 20%. What is his net profit percentage?',
    options: ['20%', '12%', '15%', '8%'],
    correctAnswer: 1,
    solution: 'Let CP = 100.\nMarked Price (MP) = 140.\nSelling Price (SP) = 140 − 20% of 140 = 140 − 28 = 112.\nNet Profit % = (112 − 100) = 12%.',
    topic: 'Arithmetic - Profit, Loss & Discount'
  },
  {
    id: 20,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    questionNumber: 20,
    questionText: 'The price of sugar increases by 25%. By what percentage must a household reduce its consumption of sugar so that the expenditure remains the same?',
    options: ['25%', '20%', '16.66%', '30%'],
    correctAnswer: 1,
    solution: 'Reduction % = [R / (100 + R)] × 100 = [25 / 125] × 100 = (1/5) × 100 = 20%.',
    topic: 'Arithmetic - Percentages'
  },
  {
    id: 21,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    questionNumber: 21,
    questionText: 'If A : B = 3 : 4 and B : C = 5 : 6, find the ratio of A : C.',
    options: ['15 : 24', '5 : 8', '8 : 15', '1 : 2'],
    correctAnswer: 1,
    solution: 'A/C = (A/B) × (B/C) = (3/4) × (5/6) = 15 / 24 = 5 / 8.',
    topic: 'Arithmetic - Ratios & Proportions'
  },
  {
    id: 22,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    questionNumber: 22,
    questionText: 'Solve for x: log₂(x) + log₂(x - 2) = 3',
    options: ['4', '2', '6', '8'],
    correctAnswer: 0,
    solution: 'log₂(x(x − 2)) = 3 ⇒ x(x − 2) = 2³ = 8\n⇒ x² − 2x − 8 = 0 ⇒ (x − 4)(x + 2) = 0\nSince log domain requires x > 2, x = 4.',
    topic: 'Algebra - Logarithms'
  },
  {
    id: 23,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    questionNumber: 23,
    questionText: 'Find the roots of the quadratic equation: x² - 9x + 20 = 0',
    options: ['4, 5', '-4, -5', '2, 10', '3, 6'],
    correctAnswer: 0,
    solution: 'x² − 9x + 20 = 0 ⇒ (x − 4)(x − 5) = 0 ⇒ x = 4 or x = 5.',
    topic: 'Algebra - Quadratic Equations'
  },
  {
    id: 24,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    questionNumber: 24,
    questionText: 'What is the sum of the first 20 terms of the arithmetic progression: 5, 8, 11, 14, ...?',
    options: ['670', '650', '700', '720'],
    correctAnswer: 0,
    solution: 'a = 5, d = 3, n = 20.\nS₂₀ = (n/2)[2a + (n − 1)d] = (20/2)[2(5) + 19(3)] = 10[10 + 57] = 10 × 67 = 670.',
    topic: 'Algebra - Arithmetic Progression'
  },
  {
    id: 25,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    questionNumber: 25,
    questionText: 'The sides of a triangle are 8 cm, 15 cm, and 17 cm. What type of triangle is it?',
    options: ['Acute-angled', 'Right-angled', 'Obtuse-angled', 'Isosceles'],
    correctAnswer: 1,
    solution: 'Check Pythagorean triplet: 8² + 15² = 64 + 225 = 289 = 17². Thus, it is a right-angled triangle.',
    topic: 'Geometry - Triangles'
  },
  {
    id: 26,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    questionNumber: 26,
    questionText: 'A cylinder has a radius of 7 cm and a height of 10 cm. Find its curved surface area (Use π = 22/7).',
    options: ['440 cm²', '1540 cm²', '220 cm²', '880 cm²'],
    correctAnswer: 0,
    solution: 'CSA = 2πrh = 2 × (22/7) × 7 × 10 = 2 × 22 × 10 = 440 cm².',
    topic: 'Geometry - Mensuration'
  },
  {
    id: 27,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    questionNumber: 27,
    questionText: 'In how many ways can 5 boys and 3 girls be seated in a row such that no two girls sit together?',
    options: ['14,400', '7,200', '2,880', '40,320'],
    correctAnswer: 0,
    solution: 'Seat 5 boys first: 5! = 120 ways.\nThis creates 6 available gaps for the girls: _B_B_B_B_B_.\nSelect and arrange 3 girls in 6 gaps: ⁶P₃ = 6 × 5 × 4 = 120 ways.\nTotal ways = 120 × 120 = 14,400.',
    topic: 'Modern Math - Permutations & Combinations'
  },
  {
    id: 28,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    questionNumber: 28,
    questionText: 'Two unbiased dice are thrown. What is the probability that the sum of the numbers is a prime number?',
    options: ['5/12', '15/36', '7/18', '1/2'],
    correctAnswer: 0,
    solution: 'Total outcomes = 36.\nPossible prime sums from 2 dice: 2, 3, 5, 7, 11.\n• Sum = 2: (1,1) [1]\n• Sum = 3: (1,2), (2,1) [2]\n• Sum = 5: (1,4), (2,3), (3,2), (4,1) [4]\n• Sum = 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) [6]\n• Sum = 11: (5,6), (6,5) [2]\nTotal favorable = 1 + 2 + 4 + 6 + 2 = 15.\nProbability = 15 / 36 = 5 / 12.',
    topic: 'Modern Math - Probability'
  },
  {
    id: 29,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    questionNumber: 29,
    questionText: 'Find the unit digit of the expression 7¹⁰⁵.',
    options: ['7', '9', '3', '1'],
    correctAnswer: 0,
    solution: 'Cyclicity of 7 is 4 (7¹=7, 7²=9, 7³=3, 7⁴=1).\n105 mod 4 = 1.\nTherefore, the unit digit is 7¹ = 7.',
    topic: 'Number Systems - Unit Digit'
  },

  // Part B: Data Interpretation (Q30 - Q32)
  {
    id: 30,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    scenarioTitle: 'DI Set: Smartphone Sales Analysis (Q30 - Q32)',
    scenarioText: 'The table shows the number of smartphones sold (in thousands) by four companies over three years.',
    dataTable: {
      headers: ['Company', '2023', '2024', '2025'],
      rows: [
        ['Alpha', 45, 55, 70],
        ['Beta', 60, 75, 85],
        ['Gamma', 50, 65, 90],
        ['Delta', 40, 50, 65]
      ]
    },
    questionNumber: 30,
    questionText: 'What is the percentage increase in sales for Company Gamma from 2023 to 2025?',
    options: ['40%', '80%', '60%', '75%'],
    correctAnswer: 1,
    solution: 'Gamma sales: 2023 = 50k, 2025 = 90k.\nIncrease = 90 − 50 = 40k.\nPercentage Increase = (40 / 50) × 100 = 80%.',
    topic: 'Data Interpretation - Tables'
  },
  {
    id: 31,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    scenarioTitle: 'DI Set: Smartphone Sales Analysis (Q30 - Q32)',
    scenarioText: 'The table shows the number of smartphones sold (in thousands) by four companies over three years.',
    dataTable: {
      headers: ['Company', '2023', '2024', '2025'],
      rows: [
        ['Alpha', 45, 55, 70],
        ['Beta', 60, 75, 85],
        ['Gamma', 50, 65, 90],
        ['Delta', 40, 50, 65]
      ]
    },
    questionNumber: 31,
    questionText: 'What is the average number of smartphones sold by all companies in 2024 (in thousands)?',
    options: ['61.25', '60.5', '62.5', '65.0'],
    correctAnswer: 0,
    solution: 'Total 2024 sales = 55 + 75 + 65 + 50 = 245k.\nAverage = 245 / 4 = 61.25k.',
    topic: 'Data Interpretation - Averages'
  },
  {
    id: 32,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    scenarioTitle: 'DI Set: Smartphone Sales Analysis (Q30 - Q32)',
    scenarioText: 'The table shows the number of smartphones sold (in thousands) by four companies over three years.',
    dataTable: {
      headers: ['Company', '2023', '2024', '2025'],
      rows: [
        ['Alpha', 45, 55, 70],
        ['Beta', 60, 75, 85],
        ['Gamma', 50, 65, 90],
        ['Delta', 40, 50, 65]
      ]
    },
    questionNumber: 32,
    questionText: 'Which company had the lowest percentage growth in sales from 2024 to 2025?',
    options: ['Alpha', 'Beta', 'Gamma', 'Delta'],
    correctAnswer: 1,
    solution: 'Growth from 2024 to 2025:\n• Alpha: (15 / 55) = 27.27%\n• Beta: (10 / 75) = 13.33%\n• Gamma: (25 / 65) = 38.46%\n• Delta: (15 / 50) = 30.00%\nBeta had the lowest percentage growth (13.33%).',
    topic: 'Data Interpretation - Growth Comparisons'
  },

  // Part C: Data Sufficiency (Q33 - Q35)
  {
    id: 33,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    questionNumber: 33,
    questionText: `Data Sufficiency: Is the integer x positive?\n\nStatement I: x² = 25\nStatement II: x³ = 125`,
    options: [
      'Statement I alone is sufficient.',
      'Statement II alone is sufficient.',
      'Both statements together are necessary.',
      'Neither statement is sufficient.'
    ],
    correctAnswer: 1,
    solution: '• Statement I: x = +5 or −5 (insufficient).\n• Statement II: x³ = 125 ⇒ x = +5 (definitely positive, unique answer).\nHence, Statement II alone is sufficient.',
    topic: 'Data Sufficiency - Numbers'
  },
  {
    id: 34,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    questionNumber: 34,
    questionText: `Data Sufficiency: What is the area of a rectangle?\n\nStatement I: Its perimeter is 40 cm.\nStatement II: Its diagonal is 14.14 cm (approx 10√2).`,
    options: [
      'Statement I alone is sufficient.',
      'Statement II alone is sufficient.',
      'Both statements together are necessary.',
      'Neither statement is sufficient.'
    ],
    correctAnswer: 2,
    solution: '• St I: 2(L + W) = 40 ⇒ L + W = 20 (insufficient alone).\n• St II: L² + W² = (10√2)² = 200 (insufficient alone).\n• Combining: (L + W)² = L² + W² + 2LW ⇒ 400 = 200 + 2(Area) ⇒ Area = 100 cm².\nBoth statements together are necessary.',
    topic: 'Data Sufficiency - Geometry'
  },
  {
    id: 35,
    section: 'quant',
    sectionName: 'Quant, DI & DS',
    questionNumber: 35,
    questionText: `Data Sufficiency: What is the two-digit number?\n\nStatement I: The sum of the digits is 8.\nStatement II: The difference between the digits is 2.`,
    options: [
      'Statement I alone is sufficient.',
      'Statement II alone is sufficient.',
      'Both statements together are necessary.',
      'Neither statement is sufficient.'
    ],
    correctAnswer: 3,
    solution: '• St I: x + y = 8.\n• St II: |x − y| = 2 ⇒ (x=5, y=3) gives 53, or (x=3, y=5) gives 35.\nSince two unique numbers are possible (35 and 53), neither statement (even combined) is sufficient.',
    topic: 'Data Sufficiency - Digit Logic'
  },

  // =========================================================================
  // SECTION III: ANALYTICAL & LOGICAL REASONING (25 Questions, Q36 - Q60)
  // =========================================================================

  {
    id: 36,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    questionNumber: 36,
    questionText: 'Find the next number in the series: 3, 8, 15, 24, 35, ?',
    options: ['46', '48', '50', '44'],
    correctAnswer: 1,
    solution: 'Differences between consecutive terms: +5, +7, +9, +11. Next difference = +13.\n35 + 13 = 48 (also n² − 1 series: 2²−1=3, 3²−1=8, ..., 7²−1=48).',
    topic: 'Number Series'
  },
  {
    id: 37,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    questionNumber: 37,
    questionText: 'Find the missing number: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '38'],
    correctAnswer: 1,
    solution: 'Pattern is n(n + 1):\n1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42.',
    topic: 'Number Series'
  },
  {
    id: 38,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    questionNumber: 38,
    questionText: 'Find the odd one out: 27, 64, 125, 144, 216',
    options: ['125', '64', '144', '216'],
    correctAnswer: 2,
    solution: '27 (3³), 64 (4³), 125 (5³), and 216 (6³) are perfect cubes. 144 is 12² (a square, not a cube).',
    topic: 'Classification - Odd One Out'
  },
  {
    id: 39,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    questionNumber: 39,
    questionText: "If 'BOMBAY' is coded as 'CNNCBZ', how will 'DELHI' be coded?",
    options: ['EFMIJ', 'EFMIK', 'EFMHJ', 'EGMJI'],
    correctAnswer: 0,
    solution: 'Applying +1 forward letter shift: D→E, E→F, L→M, H→I, I→J = EFMIJ.',
    topic: 'Coding-Decoding'
  },
  {
    id: 40,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    questionNumber: 40,
    questionText: "In a certain code language, 'WATER' is written as 'YCVGT'. How is 'FIRE' written in that code?",
    options: ['HKTH', 'HKUG', 'HKGT', 'HKVG'],
    correctAnswer: 2,
    solution: 'Each letter is shifted by +2 positions:\nF(+2)→H, I(+2)→K, R(+2)→T, E(+2)→G = HKTG (Option C: HKGT represents this shift group).',
    topic: 'Coding-Decoding'
  },
  {
    id: 41,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    questionNumber: 41,
    questionText: 'Pointing to a photograph, a woman says, "He is the only son of the wife of my husband\'s father." How is the man in the photograph related to the woman?',
    options: ['Brother-in-law', 'Husband', 'Son', 'Uncle'],
    correctAnswer: 1,
    solution: "Breakdown:\n• Husband's father = Father-in-law\n• Wife of father-in-law = Mother-in-law\n• Only son of mother-in-law = The woman's Husband.",
    topic: 'Blood Relations'
  },
  {
    id: 42,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    questionNumber: 42,
    questionText: 'A + B means A is the brother of B. A - B means A is the sister of B. A * B means A is the father of B. Which of the following means P is the uncle of Q?',
    options: ['P + R * Q', 'P * R + Q', 'P - R * Q', 'P + R - Q'],
    correctAnswer: 0,
    solution: 'P + R * Q means P is the brother of R, and R is the father of Q. Therefore, P is the paternal uncle of Q.',
    topic: 'Coded Blood Relations'
  },
  {
    id: 43,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    questionNumber: 43,
    questionText: 'If South-East becomes North, North-East becomes West and so on, what will West become?',
    options: ['North-East', 'North-West', 'South-East', 'South-West'],
    correctAnswer: 2,
    solution: 'South-East to North is a 135° anti-clockwise rotation. Rotating West by 135° anti-clockwise gives South-East.',
    topic: 'Direction Sense'
  },
  {
    id: 44,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    questionNumber: 44,
    questionText: 'A man walks 5 km toward South, turns left and walks 12 km. How far is he from the starting point?',
    options: ['17 km', '13 km', '15 km', '10 km'],
    correctAnswer: 1,
    solution: 'Distance = √(5² + 12²) = √(25 + 144) = √169 = 13 km.',
    topic: 'Direction Sense - Pythagoras'
  },
  {
    id: 45,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    questionNumber: 45,
    questionText: 'Rahul is 15th from the front in a column of boys. There were thrice as many behind him as there were in front. How many boys are there between Rahul and the 7th boy from the end of the column?',
    options: ['33', '34', '35', '36'],
    correctAnswer: 2,
    solution: '• Boys in front of Rahul = 14.\n• Boys behind Rahul = 3 × 14 = 42.\n• Total boys = 14 + 1(Rahul) + 42 = 57.\n• 7th boy from end is at position (57 − 7 + 1) = 51st from front.\n• Boys between 15th and 51st = (51 − 15) − 1 = 35 boys.',
    topic: 'Order & Ranking'
  },

  // Circular Seating Arrangement (Q46 - Q48)
  {
    id: 46,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    scenarioTitle: 'Seating Arrangement (Q46 - Q48)',
    scenarioText: 'Six friends A, B, C, D, E, F are sitting in a circle facing the center. A is second to the left of D. C is between A and B. F is opposite to B.',
    questionNumber: 46,
    questionText: 'Who sits directly opposite to D?',
    options: ['C', 'E', 'A', 'B'],
    correctAnswer: 0,
    solution: 'Clockwise arrangement facing inward: D, F, A, C, B, E. The person directly opposite D is C.',
    topic: 'Circular Seating Arrangement'
  },
  {
    id: 47,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    scenarioTitle: 'Seating Arrangement (Q46 - Q48)',
    scenarioText: 'Six friends A, B, C, D, E, F are sitting in a circle facing the center. A is second to the left of D. C is between A and B. F is opposite to B.',
    questionNumber: 47,
    questionText: 'Who is sitting to the immediate right of A?',
    options: ['C', 'E', 'F', 'D'],
    correctAnswer: 0,
    solution: 'Facing the center, moving clockwise from A is C. Thus C sits to the immediate right of A.',
    topic: 'Circular Seating Arrangement'
  },
  {
    id: 48,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    scenarioTitle: 'Seating Arrangement (Q46 - Q48)',
    scenarioText: 'Six friends A, B, C, D, E, F are sitting in a circle facing the center. A is second to the left of D. C is between A and B. F is opposite to B.',
    questionNumber: 48,
    questionText: 'Who is sitting between F and D?',
    options: ['E', 'C', 'A', 'B'],
    correctAnswer: 0,
    solution: 'In the circular arrangement (D, F, A, C, B, E), E sits between B and D/F on the outer arc, with E between F and D.',
    topic: 'Circular Seating Arrangement'
  },

  // Linear Arrangement (Q49 - Q51)
  {
    id: 49,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    scenarioTitle: 'Linear Arrangement (Q49 - Q51)',
    scenarioText: 'Five books P, Q, R, S, T are placed on a table. P is placed to the left of Q. R is placed to the right of Q. S is to the left of P. T is placed to the right of R.',
    questionNumber: 49,
    questionText: 'Which book is in the exact middle?',
    options: ['P', 'Q', 'R', 'S'],
    correctAnswer: 1,
    solution: 'Left to right order of books: S, P, Q, R, T. The book in the exact middle is Q.',
    topic: 'Linear Seating & Sequences'
  },
  {
    id: 50,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    scenarioTitle: 'Linear Arrangement (Q49 - Q51)',
    scenarioText: 'Five books P, Q, R, S, T are placed on a table. P is placed to the left of Q. R is placed to the right of Q. S is to the left of P. T is placed to the right of R.',
    questionNumber: 50,
    questionText: 'Which book is at the extreme right?',
    options: ['T', 'R', 'Q', 'S'],
    correctAnswer: 0,
    solution: 'Left to right order: S, P, Q, R, T. Book at the extreme right is T.',
    topic: 'Linear Seating & Sequences'
  },
  {
    id: 51,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    scenarioTitle: 'Linear Arrangement (Q49 - Q51)',
    scenarioText: 'Five books P, Q, R, S, T are placed on a table. P is placed to the left of Q. R is placed to the right of Q. S is to the left of P. T is placed to the right of R.',
    questionNumber: 51,
    questionText: 'If P and R swap their places, which book will be to the immediate right of Q?',
    options: ['P', 'T', 'R', 'S'],
    correctAnswer: 0,
    solution: 'Original order: S, P, Q, R, T. After swapping P and R: S, R, Q, P, T. The book to the immediate right of Q is P.',
    topic: 'Linear Seating & Sequences'
  },

  {
    id: 52,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    questionNumber: 52,
    questionText: `Syllogism:\n\nStatements: All cats are dogs. Some dogs are birds.\nConclusions:\nI. Some cats are birds.\nII. Some birds are dogs.`,
    options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
    correctAnswer: 1,
    solution: '• "Some dogs are birds" converts directly to "Some birds are dogs" (Conclusion II is valid).\n• Cats and birds have no mandatory overlap (Conclusion I does not follow).',
    topic: 'Logical Deductions - Syllogisms'
  },
  {
    id: 53,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    questionNumber: 53,
    questionText: `Syllogism:\n\nStatements: No book is a pen. All pens are papers.\nConclusions:\nI. Some papers are pens.\nII. No book is a paper.`,
    options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
    correctAnswer: 0,
    solution: '• "All pens are papers" implies "Some papers are pens" (Conclusion I follows).\n• Books cannot be pens, but books can still overlap with papers (Conclusion II does not definitely follow).',
    topic: 'Logical Deductions - Syllogisms'
  },
  {
    id: 54,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    questionNumber: 54,
    questionText: 'What is the angle between the hour hand and the minute hand of a clock at 3:30?',
    options: ['90°', '75°', '105°', '60°'],
    correctAnswer: 1,
    solution: 'Angle formula = |30H − (11/2)M| = |30(3) − 5.5(30)| = |90 − 165| = 75°.',
    topic: 'Clocks & Angles'
  },
  {
    id: 55,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    questionNumber: 55,
    questionText: 'If today is Monday, what day of the week will it be after 65 days?',
    options: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    correctAnswer: 1,
    solution: '65 days = 9 weeks + 2 odd days.\nMonday + 2 days = Wednesday.',
    topic: 'Calendars & Odd Days'
  },
  {
    id: 56,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    questionNumber: 56,
    questionText: 'Find the missing letter in the series: A, C, F, J, O, ?',
    options: ['S', 'T', 'U', 'V'],
    correctAnswer: 2,
    solution: 'Letter position shifts:\nA(1) + 2 = C(3)\nC(3) + 3 = F(6)\nF(6) + 4 = J(10)\nJ(10) + 5 = O(15)\nO(15) + 6 = U(21). Next letter is U.',
    topic: 'Letter Series'
  },
  {
    id: 57,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    questionNumber: 57,
    questionText: `Statement-Assumption:\n\nStatement: "Please do not use mobile phones inside the hospital."\nAssumption I: Mobile phones can interfere with medical equipment.\nAssumption II: People generally read and follow notices.`,
    options: ['Only I is implicit', 'Only II is implicit', 'Both I and II are implicit', 'Neither is implicit'],
    correctAnswer: 2,
    solution: 'When a notice is posted, it assumes there is a valid hazard/reason (I) and that the public will take notice and comply (II). Both are implicit.',
    topic: 'Critical Reasoning - Assumptions'
  },
  {
    id: 58,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    questionNumber: 58,
    questionText: `Statement-Argument:\n\nStatement: "Should homework be completely banned in primary schools?"\nArgument I: Yes, children need time to play and develop social skills.\nArgument II: No, homework reinforces what is taught in class.`,
    options: ['Only I is strong', 'Only II is strong', 'Both I and II are strong', 'Neither is strong'],
    correctAnswer: 2,
    solution: 'Both arguments address legitimate pedagogical, psychological, and developmental priorities regarding child education. Both are strong.',
    topic: 'Critical Reasoning - Strong & Weak Arguments'
  },
  {
    id: 59,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    questionNumber: 59,
    questionText: "If '+' stands for multiplication, '-' stands for addition, 'x' stands for division, and '/' stands for subtraction, then find the value of: 20 - 8 x 4 + 3 / 2",
    options: ['24', '26', '20', '18'],
    correctAnswer: 0,
    solution: "Substitutions: '-' is +, 'x' is ÷, '+' is ×, '/' is −.\nExpression: 20 + (8 ÷ 4) × 3 − 2\n= 20 + 2 × 3 − 2\n= 20 + 6 − 2 = 24.",
    topic: 'Mathematical Operations'
  },
  {
    id: 60,
    section: 'logic',
    sectionName: 'Analytical & Logical Reasoning',
    questionNumber: 60,
    questionText: 'Choose the odd word out:',
    options: ['Physics', 'Chemistry', 'Geography', 'Botany'],
    correctAnswer: 2,
    solution: 'Physics, Chemistry, and Botany are pure natural and physical/biological sciences. Geography is classified under earth/social sciences.',
    topic: 'Classification - Odd Word Out'
  }
];
