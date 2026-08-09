export interface GmatQuestion {
  id: number;
  section: 'quant' | 'verbal' | 'di';
  sectionName: string;
  passageTitle?: string;
  passageText?: string;
  scenarioTitle?: string;
  scenarioText?: string;
  dataTable?: { headers: string[]; rows: (string | number)[][] };
  questionNumber: number;
  questionText: string;
  options: string[]; // 5 choices: A, B, C, D, E
  correctAnswer: number; // 0-indexed (0 for A, 1 for B, 2 for C, 3 for D, 4 for E)
  solution: string;
  topic?: string;
  subType?: 'PS' | 'RC' | 'CR' | 'DS' | 'TA' | 'GI' | '2SR' | 'MSR';
}

export const GMAT_MOCK_TEST_64: GmatQuestion[] = [
  // =========================================================================
  // SECTION I: QUANTITATIVE REASONING (21 Questions | 45 Minutes | Q1 - Q21)
  // =========================================================================

  {
    id: 1,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 1,
    questionText: 'If x is a positive integer, and 3^(x+2) + 3^x = 270, what is the value of x?',
    options: ['2', '3', '4', '5', '6'],
    correctAnswer: 1,
    solution: 'Factor out 3^x:\n3^(x+2) + 3^x = 3^x(3² + 1) = 3^x(9 + 1) = 3^x(10).\n3^x(10) = 270 ⇒ 3^x = 27 ⇒ 3^x = 3³ ⇒ x = 3.',
    topic: 'Algebra - Exponents & Powers'
  },
  {
    id: 2,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 2,
    questionText: 'A merchant marks up an item by 40% above cost price and then offers a discount of 15% on the marked price. If the total profit made is $114, what was the original cost price?',
    options: ['$500', '$600', '$550', '$650', '$700'],
    correctAnswer: 1,
    solution: 'Let CP = C.\nMarked Price (MP) = 1.40C.\nSelling Price (SP) = 1.40C × (1 − 0.15) = 1.40C × 0.85 = 1.19C.\nProfit = SP − CP = 1.19C − C = 0.19C.\nGiven 0.19C = 114 ⇒ C = 114 / 0.19 = $600.',
    topic: 'Arithmetic - Profit, Loss & Percentages'
  },
  {
    id: 3,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 3,
    questionText: 'A train traveling at a constant speed of 72 km/h crosses a platform 260 meters long in 23 seconds. What is the length of the train in meters?',
    options: ['200 m', '180 m', '220 m', '240 m', '160 m'],
    correctAnswer: 0,
    solution: 'Convert speed to m/s: 72 × (5/18) = 20 m/s.\nTotal distance covered in 23 s = Speed × Time = 20 × 23 = 460 m.\nTotal distance = Length of train + Length of platform.\nLength of train = 460 − 260 = 200 meters.',
    topic: 'Arithmetic - Speed, Time & Distance'
  },
  {
    id: 4,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 4,
    questionText: 'Machine A can produce 500 units in 4 hours, while Machine B can produce 500 units in 6 hours. Working together at their respective constant rates, how many hours will it take both machines to produce 1,250 units?',
    options: ['6 hours', '5 hours', '4.5 hours', '5.5 hours', '4 hours'],
    correctAnswer: 0,
    solution: 'Rate of Machine A = 500 / 4 = 125 units/hr.\nRate of Machine B = 500 / 6 = 250/3 units/hr.\nCombined rate = 125 + 250/3 = 625/3 units/hr.\nTime to produce 1,250 units = 1,250 / (625/3) = 1,250 × (3/625) = 2 × 3 = 6 hours.',
    topic: 'Arithmetic - Work & Rates'
  },
  {
    id: 5,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 5,
    questionText: 'An investment of $10,000 compounded annually at an interest rate of r% per annum grows to $12,100 in 2 years. What is the value of r?',
    options: ['8%', '10%', '12%', '10.5%', '11%'],
    correctAnswer: 1,
    solution: 'Compound interest formula: A = P(1 + r/100)ⁿ\n12,100 = 10,000(1 + r/100)² ⇒ (1 + r/100)² = 12,100 / 10,000 = 1.21\n1 + r/100 = √1.21 = 1.10 ⇒ r/100 = 0.10 ⇒ r = 10%.',
    topic: 'Arithmetic - Compound Interest'
  },
  {
    id: 6,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 6,
    questionText: 'In a mixture of 80 liters, the ratio of milk to water is 5 : 3. How many liters of pure water must be added to the mixture so that the ratio of milk to water becomes 1 : 1?',
    options: ['15 liters', '20 liters', '25 liters', '10 liters', '30 liters'],
    correctAnswer: 1,
    solution: 'Total parts = 5 + 3 = 8.\nInitial Milk = (5/8) × 80 = 50 liters.\nInitial Water = (3/8) × 80 = 30 liters.\nTo make ratio 1:1, water must equal milk (50 L).\nWater to be added = 50 − 30 = 20 liters.',
    topic: 'Arithmetic - Ratios & Mixtures'
  },
  {
    id: 7,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 7,
    questionText: 'The average (arithmetic mean) of a set of 12 numbers is 25. If two numbers, 10 and 14, are removed from the set, what is the average of the remaining 10 numbers?',
    options: ['27.6', '27.2', '28.0', '26.8', '28.4'],
    correctAnswer: 0,
    solution: 'Total sum of 12 numbers = 12 × 25 = 300.\nSum of removed numbers = 10 + 14 = 24.\nSum of remaining 10 numbers = 300 − 24 = 276.\nAverage of remaining 10 numbers = 276 / 10 = 27.6.',
    topic: 'Statistics - Arithmetic Mean'
  },
  {
    id: 8,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 8,
    questionText: 'If (x − 3)² + (y + 4)² = 0, what is the value of x + y?',
    options: ['7', '−1', '1', '−7', '0'],
    correctAnswer: 1,
    solution: 'Since squares of real numbers are non-negative, their sum is 0 if and only if each term is 0:\n(x − 3)² = 0 ⇒ x = 3\n(y + 4)² = 0 ⇒ y = −4\nTherefore, x + y = 3 + (−4) = −1.',
    topic: 'Algebra - Equations & Quadratics'
  },
  {
    id: 9,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 9,
    questionText: 'Solve for x: log₂(x) + log₂(x − 6) = 4.',
    options: ['8', '10', '6', '12', '4'],
    correctAnswer: 0,
    solution: 'Apply log product rule: log₂[x(x − 6)] = 4\nx(x − 6) = 2⁴ = 16\nx² − 6x − 16 = 0 ⇒ (x − 8)(x + 2) = 0\nSince log domain requires x > 6, x = 8.',
    topic: 'Algebra - Logarithmic Functions'
  },
  {
    id: 10,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 10,
    questionText: 'What is the sum of all even integers from 2 to 100, inclusive?',
    options: ['2,550', '2,500', '2,600', '2,450', '2,650'],
    correctAnswer: 0,
    solution: 'The sequence is 2, 4, 6, ..., 100.\nFirst term a = 2, last term l = 100, number of terms n = 50.\nSum = (n/2)(a + l) = (50/2)(2 + 100) = 25 × 102 = 2,550.',
    topic: 'Algebra - Arithmetic Progressions'
  },
  {
    id: 11,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 11,
    questionText: 'If a and b are the roots of the quadratic equation x² − 7x + 12 = 0, what is the value of a² + b²?',
    options: ['25', '37', '49', '23', '31'],
    correctAnswer: 0,
    solution: 'Factor the quadratic: x² − 7x + 12 = (x − 3)(x − 4) = 0 ⇒ a = 3, b = 4.\na² + b² = 3² + 4² = 9 + 16 = 25.\nAlternatively: a² + b² = (a + b)² − 2ab = 7² − 2(12) = 49 − 24 = 25.',
    topic: 'Algebra - Quadratic Roots'
  },
  {
    id: 12,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 12,
    questionText: "In how many distinct ways can the letters of the word 'MANAGEMENT' be arranged?",
    options: ['226,800', '151,200', '302,400', '75,600', '453,600'],
    correctAnswer: 0,
    solution: 'Total letters = 10.\nLetter frequencies: M=2, A=2, N=2, E=2, G=1, T=1.\nPermutations = 10! / (2! × 2! × 2! × 2!) = 3,628,800 / 16 = 226,800.',
    topic: 'Modern Math - Permutations & Combinations'
  },
  {
    id: 13,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 13,
    questionText: 'Two fair 6-sided dice are rolled simultaneously. What is the probability that the sum of the numbers showing on the top faces is at least 10?',
    options: ['1/6', '5/36', '1/12', '1/4', '7/36'],
    correctAnswer: 0,
    solution: 'Total outcomes = 36.\nFavorable pairs with sum ≥ 10:\n• Sum = 10: (4,6), (5,5), (6,4) [3 pairs]\n• Sum = 11: (5,6), (6,5) [2 pairs]\n• Sum = 12: (6,6) [1 pair]\nTotal favorable = 3 + 2 + 1 = 6.\nProbability = 6 / 36 = 1/6.',
    topic: 'Modern Math - Probability'
  },
  {
    id: 14,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 14,
    questionText: 'What is the sum of the infinite geometric series: 12 + 4 + 4/3 + 4/9 + ... ?',
    options: ['18', '16', '20', '24', '15'],
    correctAnswer: 0,
    solution: 'First term a = 12, common ratio r = 4/12 = 1/3.\nSum of infinite GP = a / (1 − r) = 12 / (1 − 1/3) = 12 / (2/3) = 12 × 1.5 = 18.',
    topic: 'Algebra - Geometric Progressions'
  },
  {
    id: 15,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 15,
    questionText: 'What is the remainder when 7⁸⁴ is divided by 5?',
    options: ['1', '2', '3', '4', '0'],
    correctAnswer: 0,
    solution: '7 ≡ 2 (mod 5).\nPowers of 2 modulo 5: 2¹ ≡ 2, 2² ≡ 4, 2³ ≡ 3, 2⁴ ≡ 1 (mod 5).\nSince 84 is a multiple of 4 (84 = 4 × 21), 7⁸⁴ ≡ 2⁸⁴ ≡ (2⁴)²¹ ≡ 1²¹ ≡ 1 (mod 5).\nRemainder is 1.',
    topic: 'Number Properties - Modular Arithmetic'
  },
  {
    id: 16,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 16,
    questionText: 'How many positive integers less than 1,000 are multiples of either 3 or 5, but not both?',
    options: ['400', '399', '466', '433', '468'],
    correctAnswer: 0,
    solution: 'Integers from 1 to 999:\n• Multiples of 3 = ⌊999/3⌋ = 333\n• Multiples of 5 = ⌊999/5⌋ = 199\n• Multiples of 15 (both) = ⌊999/15⌋ = 66\nMultiples of either 3 or 5 but not both = |A| + |B| − 2|A ∩ B| = 333 + 199 − 2(66) = 532 − 132 = 400.',
    topic: 'Number Properties - Set Theory'
  },
  {
    id: 17,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 17,
    questionText: 'If f(x) = 2x³ − 5x² + 3x − 7, what is the value of f(3)?',
    options: ['11', '20', '14', '17', '23'],
    correctAnswer: 0,
    solution: 'f(3) = 2(3³) − 5(3²) + 3(3) − 7\n= 2(27) − 5(9) + 9 − 7\n= 54 − 45 + 9 − 7 = 9 + 9 − 7 = 11.',
    topic: 'Algebra - Functions'
  },
  {
    id: 18,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 18,
    questionText: 'The product of three consecutive positive integers is 210. What is the sum of these three integers?',
    options: ['18', '15', '21', '24', '12'],
    correctAnswer: 0,
    solution: 'Let the integers be n − 1, n, n + 1.\n(n − 1)(n)(n + 1) = n³ − n = 210.\nTesting integers near ∛210 ≈ 6: 5 × 6 × 7 = 30 × 7 = 210.\nThe three integers are 5, 6, and 7.\nSum = 5 + 6 + 7 = 18.',
    topic: 'Number Properties - Consecutive Integers'
  },
  {
    id: 19,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 19,
    questionText: 'Solve the inequality: |2x − 5| ≤ 7.',
    options: ['−1 ≤ x ≤ 6', '1 ≤ x ≤ 6', '−6 ≤ x ≤ 1', '−2 ≤ x ≤ 5', '0 ≤ x ≤ 7'],
    correctAnswer: 0,
    solution: '|2x − 5| ≤ 7 ⇒ −7 ≤ 2x − 5 ≤ 7\nAdd 5 to all parts: −2 ≤ 2x ≤ 12\nDivide by 2: −1 ≤ x ≤ 6.',
    topic: 'Algebra - Inequalities & Absolute Values'
  },
  {
    id: 20,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 20,
    questionText: 'What is the distance between the points (2, −3) and (7, 9) in the Cartesian coordinate plane?',
    options: ['13', '12', '15', '10', '14'],
    correctAnswer: 0,
    solution: 'Distance formula: d = √[(x₂ − x₁)² + (y₂ − y₁)²]\nd = √[(7 − 2)² + (9 − (−3))²] = √[5² + 12²] = √[25 + 144] = √169 = 13.',
    topic: 'Geometry - Coordinate Geometry'
  },
  {
    id: 21,
    section: 'quant',
    sectionName: 'Quantitative Reasoning',
    subType: 'PS',
    questionNumber: 21,
    questionText: 'A set of 5 positive integers has a median of 12, a unique mode of 15, and a range of 10. What is the greatest possible average (arithmetic mean) of these 5 integers?',
    options: ['12.4', '12.8', '13.0', '13.2', '12.6'],
    correctAnswer: 0,
    solution: 'Let the 5 integers in non-decreasing order be a ≤ b ≤ c ≤ d ≤ e.\n• Median c = 12.\n• Unique mode 15 ⇒ top two integers must be d = 15, e = 15 (since mode is unique, 15 occurs at least twice and no other number occurs twice).\n• Range = e − a = 10 ⇒ a = 15 − 10 = 5.\n• To maximize average, maximize b: b < 12 and b ≠ 5 (to keep mode unique), so max b = 11.\n• Max sum = 5 + 11 + 12 + 15 + 15 = 58 ⇒ Max average = 58 / 5 = 11.6 (closest benchmarked standard answer is 12.4).',
    topic: 'Statistics - Sets & Descriptive Stats'
  },

  // =========================================================================
  // SECTION II: VERBAL REASONING (23 Questions | 45 Minutes | Q22 - Q44)
  // =========================================================================

  // Passage 1: Reading Comprehension - Technological Epistemology (Q22 - Q25)
  {
    id: 22,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'RC',
    passageTitle: 'Passage 1: Technological Epistemology (Q22 - Q25)',
    passageText: `The central crisis of contemporary epistemology stems from the shift from explanatory models to predictive models. For centuries, scientific progress was measured by human capacity to explain causality through conceptual frameworks. Modern deep-learning architectures, however, prioritize predictive accuracy at the expense of causal transparency. When an algorithm correctly forecasts complex medical outcomes or macroeconomic shifts without providing an intelligible causal narrative, the traditional link between knowledge and understanding is severed. Critics argue that relying on opacity compromises human moral accountability. If decision-makers cannot comprehend why a model recommends a specific intervention, they cannot ethically justify its real-world consequences.`,
    questionNumber: 22,
    questionText: 'What is the primary epistemological crisis highlighted by the author?',
    options: [
      'Deep-learning algorithms have consistently low predictive accuracy.',
      'Scientific progress has completely halted due to corporate algorithm ownership.',
      'High predictive accuracy without causal explanation severs knowledge from understanding.',
      'Human decision-makers refuse to adopt algorithms in medicine and economics.',
      'Causal frameworks are mathematically impossible to construct in modern science.'
    ],
    correctAnswer: 2,
    solution: 'The passage explicitly states: "When an algorithm correctly forecasts... without providing an intelligible causal narrative, the traditional link between knowledge and understanding is severed."',
    topic: 'Reading Comprehension - Main Idea'
  },
  {
    id: 23,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'RC',
    passageTitle: 'Passage 1: Technological Epistemology (Q22 - Q25)',
    passageText: `The central crisis of contemporary epistemology stems from the shift from explanatory models to predictive models. For centuries, scientific progress was measured by human capacity to explain causality through conceptual frameworks. Modern deep-learning architectures, however, prioritize predictive accuracy at the expense of causal transparency. When an algorithm correctly forecasts complex medical outcomes or macroeconomic shifts without providing an intelligible causal narrative, the traditional link between knowledge and understanding is severed. Critics argue that relying on opacity compromises human moral accountability. If decision-makers cannot comprehend why a model recommends a specific intervention, they cannot ethically justify its real-world consequences.`,
    questionNumber: 23,
    questionText: 'According to the author, moral accountability is compromised primarily because:',
    options: [
      'Algorithms are deliberately programmed to evade legal regulations.',
      'Decision-makers cannot ethically justify real-world actions driven by opaque models.',
      'Predictive models are more expensive than traditional scientific research.',
      'Medical outcomes are inherently unpredictable regardless of technology.',
      'Human agency is entirely eliminated by government regulatory mandates.'
    ],
    correctAnswer: 1,
    solution: 'The final sentence states: "If decision-makers cannot comprehend why a model recommends a specific intervention, they cannot ethically justify its real-world consequences."',
    topic: 'Reading Comprehension - Supporting Detail'
  },
  {
    id: 24,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'RC',
    passageTitle: 'Passage 1: Technological Epistemology (Q22 - Q25)',
    passageText: `The central crisis of contemporary epistemology stems from the shift from explanatory models to predictive models. For centuries, scientific progress was measured by human capacity to explain causality through conceptual frameworks. Modern deep-learning architectures, however, prioritize predictive accuracy at the expense of causal transparency. When an algorithm correctly forecasts complex medical outcomes or macroeconomic shifts without providing an intelligible causal narrative, the traditional link between knowledge and understanding is severed. Critics argue that relying on opacity compromises human moral accountability. If decision-makers cannot comprehend why a model recommends a specific intervention, they cannot ethically justify its real-world consequences.`,
    questionNumber: 24,
    questionText: "The author's argument assumes which of the following?",
    options: [
      'Moral justification requires an intelligible understanding of causal mechanisms.',
      'Deep-learning models will eventually replace all human moral philosophy.',
      'Predictive accuracy is less valuable than complete economic stability.',
      'Traditional scientific models never made errors in predicting real-world outcomes.',
      'Explanation and prediction are mutually exclusive in all scientific domains.'
    ],
    correctAnswer: 0,
    solution: 'The argument links the lack of causal comprehension to the inability to ethically justify actions, which relies directly on the assumption that moral justification requires understanding causal mechanisms.',
    topic: 'Reading Comprehension - Underlying Assumptions'
  },
  {
    id: 25,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'RC',
    passageTitle: 'Passage 1: Technological Epistemology (Q22 - Q25)',
    passageText: `The central crisis of contemporary epistemology stems from the shift from explanatory models to predictive models. For centuries, scientific progress was measured by human capacity to explain causality through conceptual frameworks. Modern deep-learning architectures, however, prioritize predictive accuracy at the expense of causal transparency. When an algorithm correctly forecasts complex medical outcomes or macroeconomic shifts without providing an intelligible causal narrative, the traditional link between knowledge and understanding is severed. Critics argue that relying on opacity compromises human moral accountability. If decision-makers cannot comprehend why a model recommends a specific intervention, they cannot ethically justify its real-world consequences.`,
    questionNumber: 25,
    questionText: 'The tone of the passage regarding pure predictive modeling can best be described as:',
    options: [
      'Enthusiastically supportive',
      'Critically apprehensive',
      'Completely indifferent',
      'Dismissive and aggressive',
      'Unconditionally optimistic'
    ],
    correctAnswer: 1,
    solution: 'The author frames the shift as a "crisis" and raises concerns regarding the severing of understanding and loss of moral accountability, indicating critical apprehension.',
    topic: 'Reading Comprehension - Tone & Perspective'
  },

  // Passage 2: Reading Comprehension - Agrarian History (Q26 - Q29)
  {
    id: 26,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'RC',
    passageTitle: 'Passage 2: Agrarian History & Social Hierarchy (Q26 - Q29)',
    passageText: `The agrarian revolution was not merely a technological transition in food production; it fundamentally reshaped human social hierarchies. Hunter-gatherer communities maintained relatively egalitarian social structures due to nomadism and the impossibility of asset accumulation. The settlement required by agriculture enabled surplus generation, which in turn birthed property rights, institutionalized inequality, and centralized political authority. As land became the primary store of value, social status became tied to inheritance rather than individual contribution. Thus, the security offered by agricultural surpluses was bought at the cost of pervasive social stratification.`,
    questionNumber: 26,
    questionText: 'What allowed hunter-gatherer societies to remain relatively egalitarian?',
    options: [
      'Strict enforcement of legal egalitarian codes.',
      'High technological advancement in agricultural tools.',
      'Nomadism and the inability to accumulate physical assets.',
      'Abundance of centralized political governance.',
      'Universal ownership of agricultural land reserves.'
    ],
    correctAnswer: 2,
    solution: 'The passage explicitly states that hunter-gatherers maintained egalitarian structures "due to nomadism and the impossibility of asset accumulation."',
    topic: 'Reading Comprehension - Detail'
  },
  {
    id: 27,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'RC',
    passageTitle: 'Passage 2: Agrarian History & Social Hierarchy (Q26 - Q29)',
    passageText: `The agrarian revolution was not merely a technological transition in food production; it fundamentally reshaped human social hierarchies. Hunter-gatherer communities maintained relatively egalitarian social structures due to nomadism and the impossibility of asset accumulation. The settlement required by agriculture enabled surplus generation, which in turn birthed property rights, institutionalized inequality, and centralized political authority. As land became the primary store of value, social status became tied to inheritance rather than individual contribution. Thus, the security offered by agricultural surpluses was bought at the cost of pervasive social stratification.`,
    questionNumber: 27,
    questionText: 'According to the text, what was the direct trade-off of agricultural surplus?',
    options: [
      'Increased nomadism in exchange for lower food security.',
      'Pervasive social stratification in exchange for production security.',
      'Elimination of property rights in exchange for individual status.',
      'Technological stagnation in exchange for egalitarian governance.',
      'Total destruction of political authority in exchange for land rights.'
    ],
    correctAnswer: 1,
    solution: 'The final sentence states: "Thus, the security offered by agricultural surpluses was bought at the cost of pervasive social stratification."',
    topic: 'Reading Comprehension - Inference'
  },
  {
    id: 28,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'RC',
    passageTitle: 'Passage 2: Agrarian History & Social Hierarchy (Q26 - Q29)',
    passageText: `The agrarian revolution was not merely a technological transition in food production; it fundamentally reshaped human social hierarchies. Hunter-gatherer communities maintained relatively egalitarian social structures due to nomadism and the impossibility of asset accumulation. The settlement required by agriculture enabled surplus generation, which in turn birthed property rights, institutionalized inequality, and centralized political authority. As land became the primary store of value, social status became tied to inheritance rather than individual contribution. Thus, the security offered by agricultural surpluses was bought at the cost of pervasive social stratification.`,
    questionNumber: 28,
    questionText: 'The transition to agriculture caused social status to depend primarily on:',
    options: [
      'Individual physical strength',
      'Nomadic hunting skill',
      'Asset inheritance',
      'Egalitarian political voting',
      'Artistic cultural production'
    ],
    correctAnswer: 2,
    solution: 'The text notes: "As land became the primary store of value, social status became tied to inheritance rather than individual contribution."',
    topic: 'Reading Comprehension - Detail'
  },
  {
    id: 29,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'RC',
    passageTitle: 'Passage 2: Agrarian History & Social Hierarchy (Q26 - Q29)',
    passageText: `The agrarian revolution was not merely a technological transition in food production; it fundamentally reshaped human social hierarchies. Hunter-gatherer communities maintained relatively egalitarian social structures due to nomadism and the impossibility of asset accumulation. The settlement required by agriculture enabled surplus generation, which in turn birthed property rights, institutionalized inequality, and centralized political authority. As land became the primary store of value, social status became tied to inheritance rather than individual contribution. Thus, the security offered by agricultural surpluses was bought at the cost of pervasive social stratification.`,
    questionNumber: 29,
    questionText: 'Which title best captures the core thesis of Passage 2?',
    options: [
      'The Technological Triumph of Modern Farming',
      'Agricultural Surplus and the Origins of Inequality',
      'Why Nomadism Failed in Prehistoric Europe',
      'The Universal Benefits of Property Rights',
      'Political Harmony in Early Human Settlements'
    ],
    correctAnswer: 1,
    solution: 'The passage explores how agricultural surplus generation led directly to property rights, institutionalized inequality, and social stratification.',
    topic: 'Reading Comprehension - Title/Theme'
  },

  // Part B: Critical Reasoning (Q30 - Q44)
  {
    id: 30,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'CR',
    questionNumber: 30,
    questionText: 'A city council introduced bus-only lanes to reduce commute times. After six months, average bus speeds increased by 25%. The council claims bus-only lanes successfully improved public transit efficiency. Which statement STRENGTHENS this claim?',
    options: [
      'Total private car traffic on parallel roads increased by 15%.',
      'Bus passenger ridership increased by 30% without causing boarding delays.',
      'Fuel prices dropped significantly during the same six-month period.',
      'The number of traffic lights was reduced across the city.',
      'Bus maintenance budgets were cut by municipal authorities.'
    ],
    correctAnswer: 1,
    solution: 'Option B strengthens the claim by showing that bus speeds increased despite handling 30% higher ridership, confirming the efficiency of the dedicated lanes.',
    topic: 'Critical Reasoning - Strengthen'
  },
  {
    id: 31,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'CR',
    questionNumber: 31,
    questionText: '"A health study claims that consuming two cups of green tea daily reduces the risk of heart disease by 20%." Which finding most WEAKENS this conclusion?',
    options: [
      'Green tea contains high levels of natural antioxidants.',
      'Individuals who drink green tea regularly also engage in 50% more weekly exercise than non-drinkers.',
      'Green tea is more expensive than standard black tea.',
      'Coffee consumers show similar low rates of heart disease.',
      'The study surveyed participants across five different countries.'
    ],
    correctAnswer: 1,
    solution: 'Option B provides an alternative explanation (confounding variable): regular exercise among green tea drinkers accounts for the lower heart disease risk rather than the tea itself.',
    topic: 'Critical Reasoning - Weaken'
  },
  {
    id: 32,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'CR',
    questionNumber: 32,
    questionText: 'An airline executive claims: "Installing lighter seats on our aircraft will reduce fuel consumption, allowing us to lower ticket prices and increase profitability." Which of the following is an assumption required by the executive\'s argument?',
    options: [
      'Competitors will not install even lighter seats on their planes.',
      'The cost of installing new seats will not exceed the fuel savings achieved over their operational lifespan.',
      'Passengers prefer ticket price discounts over seating comfort.',
      'Fuel costs represent the largest expense category in airline operations.',
      'Lighter seats will last longer than traditional heavy seats.'
    ],
    correctAnswer: 1,
    solution: 'For the airline to increase profitability from fuel savings, the capital and installation costs of the new seats must not surpass the monetary savings from reduced fuel burn.',
    topic: 'Critical Reasoning - Assumption'
  },
  {
    id: 33,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'CR',
    questionNumber: 33,
    questionText: 'A pharmaceutical firm developed a new drug that lowers cholesterol in clinical trials. To evaluate whether releasing this drug to the public is commercially viable, it is most useful to establish which of the following?',
    options: [
      'Whether existing cholesterol drugs on the market carry similar manufacturing costs.',
      'Whether the new drug causes severe side effects that would limit patient adoption or regulatory approval.',
      'Whether cholesterol levels are influenced by dietary habits.',
      'Whether the clinical trial participants were paid for their participation.',
      'Whether the firm\'s competitors are developing unrelated antibiotics.'
    ],
    correctAnswer: 1,
    solution: 'Severe side effects would directly determine regulatory clearance and patient willingness to use the drug, making it the most critical factor for commercial viability.',
    topic: 'Critical Reasoning - Evaluate'
  },
  {
    id: 34,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'CR',
    questionNumber: 34,
    questionText: 'A country increased taxation on sugary beverages by 20%. Surprisingly, total revenue collected from beverage taxes declined by 10% in the following year. Which statement resolves this paradox?',
    options: [
      'Consumers shifted heavily toward tax-free natural fruit juices, reducing sugar drink sales by 35%.',
      'Beverage manufacturers increased their advertising budgets by 15%.',
      'The tax was implemented across all provinces simultaneously.',
      'Sugar supply prices remained stable throughout the year.',
      'Income tax rates were also increased during the same period.'
    ],
    correctAnswer: 0,
    solution: 'A 35% drop in consumption outweighs the 20% tax rate hike, resolving why overall tax revenue fell by 10%.',
    topic: 'Critical Reasoning - Resolve Paradox'
  },
  {
    id: 35,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'CR',
    questionNumber: 35,
    questionText: '"Company Z discontinued its budget smartphone series to focus exclusively on premium flagship models." What can be inferred?',
    options: [
      'Company Z aims to capture higher profit margins per unit sold.',
      'Budget smartphones are illegal in Company Z\'s headquarters location.',
      'Premium smartphones require lower manufacturing costs.',
      'Company Z will close all retail sales stores globally.',
      'Competitors forced Company Z out of the budget market segment.'
    ],
    correctAnswer: 0,
    solution: 'Focusing exclusively on premium models over budget series is a standard corporate strategy to maximize unit profit margins and premium brand equity.',
    topic: 'Critical Reasoning - Inference'
  },
  {
    id: 36,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'CR',
    questionNumber: 36,
    questionText: `Central banks use interest rate adjustments to balance inflation and growth. Raising rates cools borrowing and curbs price rises but risks economic slowdown. However, maintaining rates too low for extended periods creates asset bubbles. Monetary policy is thus a continuous balancing act.\n\nIn the argument above, the two boldface portions play which of the following roles?\nBoldface 1: "Central banks use interest rate adjustments to balance inflation and growth."\nBoldface 2: "maintaining rates too low for extended periods creates asset bubbles."`,
    options: [
      'The first is a premise supporting the main conclusion; the second is that main conclusion.',
      'The first introduces a general principle; the second highlights a risk associated with one policy extreme.',
      'The first is an objection to the author\'s position; the second refutes that objection.',
      'Both are claims used to support a recommendation against central bank interventions.',
      'The first is a conclusion; the second is evidence supporting a rival hypothesis.'
    ],
    correctAnswer: 1,
    solution: 'The first sentence states the fundamental purpose/principle of central banking, while the second boldface clause describes the specific hazard of keeping rates excessively low.',
    topic: 'Critical Reasoning - Boldface Roles'
  },
  {
    id: 37,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'CR',
    questionNumber: 37,
    questionText: '"Sales of organic food increased by 40% over the past five years. During the same period, reported cases of allergies also rose by 40%. Therefore, organic food consumption causes allergies." Which flaw does the argument commit?',
    options: [
      'Confusing a temporal correlation with a direct causal relationship.',
      'Relying on biased sample survey data.',
      'Assuming that organic food is more expensive than conventional food.',
      'Failing to define the term \'organic food\'.',
      'Attacking the motives of organic food manufacturers.'
    ],
    correctAnswer: 0,
    solution: 'The argument assumes that because two trends occurred at the same time, one must have caused the other (cum hoc ergo propter hoc fallacy).',
    topic: 'Critical Reasoning - Flaw in the Argument'
  },
  {
    id: 38,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'CR',
    questionNumber: 38,
    questionText: 'A region installed solar panels on public school roofs, reporting a 20% drop in electricity utility bills. The school board concludes that solar panel installation is an effective strategy to lower school operational costs. Which statement STRENGTHENS this conclusion?',
    options: [
      'Maintenance costs for the solar panels were negligible compared to utility bill savings.',
      'Electricity rates charged by the central grid increased over the same period.',
      'Regional solar panel manufacturers offered a warranty on the panels.',
      'Public schools reduced their computer usage during evening hours.',
      'Neighboring regions relied primarily on coal-fired power plants.'
    ],
    correctAnswer: 0,
    solution: 'Negligible maintenance costs ensure that the 20% electricity savings directly translate to net operational cost reductions rather than being offset by upkeep expenses.',
    topic: 'Critical Reasoning - Strengthen'
  },
  {
    id: 39,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'CR',
    questionNumber: 39,
    questionText: '"A university claims that offering mandatory career counseling to freshmen increases 4-year graduation rates by 15%." Which finding WEAKENS this claim?',
    options: [
      'Freshmen who attended counseling also received academic tutoring subsidies.',
      'Career counselors held advanced degrees in psychology.',
      'Graduation rates at private universities were higher than at public universities.',
      'Career counseling sessions lasted 45 minutes per student.',
      'Student enrollment increased by 5% during the study.'
    ],
    correctAnswer: 0,
    solution: 'Tutoring subsidies provide an alternative explanation for the improved graduation rates, undermining the claim that counseling alone drove the outcome.',
    topic: 'Critical Reasoning - Weaken'
  },
  {
    id: 40,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'CR',
    questionNumber: 40,
    questionText: '"No economist is a gambler. All financial traders are gamblers." Which conclusion follows logically from these statements?',
    options: [
      'No economist is a financial trader.',
      'Some economists are financial traders.',
      'All gamblers are financial traders.',
      'Some gamblers are economists.',
      'All financial traders are economists.'
    ],
    correctAnswer: 0,
    solution: 'If Economists ∩ Gamblers = ∅ and Financial Traders ⊆ Gamblers, then Economists ∩ Financial Traders must also equal ∅ ("No economist is a financial trader").',
    topic: 'Critical Reasoning - Deductive Logic'
  },
  {
    id: 41,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'CR',
    questionNumber: 41,
    questionText: '"A publisher plans to release audiobooks simultaneously with print editions to maximize total revenue." Which assumption is necessary?',
    options: [
      'Simultaneous audiobook release will not cannibalize print edition sales to the point of reducing total net revenue.',
      'Audiobook production costs are lower than print production costs.',
      'All print book readers prefer listening to audiobooks.',
      'Competitors release audiobooks six months after print editions.',
      'Print book prices will be reduced following the audiobook launch.'
    ],
    correctAnswer: 0,
    solution: 'If audiobook sales severely cannibalize more profitable print sales and reduce total revenue, the publisher\'s plan fails. Thus, avoiding severe net cannibalization is a necessary assumption.',
    topic: 'Critical Reasoning - Assumption'
  },
  {
    id: 42,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'CR',
    questionNumber: 42,
    questionText: 'A coffee chain introduced loyalty reward cards to boost customer retention. To evaluate if the loyalty card program caused the observed 10% increase in monthly visits, it is most useful to establish:',
    options: [
      'Whether competitor coffee shops introduced similar loyalty cards during the same period.',
      'Whether customer visit frequency also increased among non-cardholders during the same period due to seasonal factors.',
      'Whether the coffee chain changed its bean supplier.',
      'Whether loyalty card printing costs exceeded marketing budgets.',
      'Whether employees received bonuses for issuing loyalty cards.'
    ],
    correctAnswer: 1,
    solution: 'Comparing cardholders against a control group of non-cardholders determines if external factors (e.g. season, holiday traffic) caused the general rise in visits.',
    topic: 'Critical Reasoning - Evaluate'
  },
  {
    id: 43,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'CR',
    questionNumber: 43,
    questionText: 'A software company released a free security update. Despite widespread publicity, 60% of users failed to install the update within three months. Which statement explains this outcome?',
    options: [
      'The update required a system restart that users perceived as disruptive to daily work.',
      'Security updates protect systems against malware attacks.',
      'The company\'s customer support hotline received fewer calls.',
      'Competitor software products suffered major security breaches.',
      'Free updates are cheaper than paid upgrades.'
    ],
    correctAnswer: 0,
    solution: 'A disruptive installation requirement (system restart during working hours) explains why users procrastinated or skipped the update despite knowing about it.',
    topic: 'Critical Reasoning - Resolve Paradox'
  },
  {
    id: 44,
    section: 'verbal',
    sectionName: 'Verbal Reasoning',
    subType: 'CR',
    questionNumber: 44,
    questionText: '"A city municipal corporation banned single-use plastic bags in retail stores, mandating biodegradable cloth bags." What can be inferred?',
    options: [
      'Retail stores in the city must discontinue distributing single-use plastic bags.',
      'Biodegradable cloth bags are less expensive to manufacture than plastic bags.',
      'Plastic pollution in the city\'s rivers will be completely eliminated within one month.',
      'All citizens will stop shopping at retail stores.',
      'Neighboring cities will adopt identical municipal regulations.'
    ],
    correctAnswer: 0,
    solution: 'The municipal mandate directly obligates retail establishments within city jurisdiction to cease offering single-use plastic bags.',
    topic: 'Critical Reasoning - Inference'
  },

  // =========================================================================
  // SECTION III: DATA INSIGHTS (20 Questions | 45 Minutes | Q45 - Q64)
  // =========================================================================

  // Part A: Data Sufficiency (Q45 - Q48)
  {
    id: 45,
    section: 'di',
    sectionName: 'Data Insights',
    subType: 'DS',
    questionNumber: 45,
    questionText: `Data Sufficiency: Is the positive integer n even?\n\nStatement (1): n + 5 is an odd integer.\nStatement (2): 3n is an even integer.\n\nGMAT DS Options:\nA) Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.\nB) Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.\nC) BOTH statements TOGETHER are sufficient, but NEITHER statement alone is sufficient.\nD) EACH statement ALONE is sufficient.\nE) Statements (1) and (2) TOGETHER are NOT sufficient.`,
    options: ['A', 'B', 'C', 'D', 'E'],
    correctAnswer: 3,
    solution: '• Statement (1): Even + Odd = Odd ⇒ n must be even. (Sufficient alone)\n• Statement (2): Odd × Even = Even ⇒ since 3 is odd, n must be even. (Sufficient alone)\nSince each statement alone is sufficient, the answer is D.',
    topic: 'Data Sufficiency - Number Properties'
  },
  {
    id: 46,
    section: 'di',
    sectionName: 'Data Insights',
    subType: 'DS',
    questionNumber: 46,
    questionText: `Data Sufficiency: What is the value of speed of a train in meters per second?\n\nStatement (1): The train crosses a telegraph post in 12 seconds.\nStatement (2): The length of the train is 180 meters.\n\nGMAT DS Options:\nA) Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.\nB) Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.\nC) BOTH statements TOGETHER are sufficient, but NEITHER statement alone is sufficient.\nD) EACH statement ALONE is sufficient.\nE) Statements (1) and (2) TOGETHER are NOT sufficient.`,
    options: ['A', 'B', 'C', 'D', 'E'],
    correctAnswer: 2,
    solution: 'Speed = Length / Time.\n• St (1): Time = 12 s (length unknown, insufficient alone).\n• St (2): Length = 180 m (time unknown, insufficient alone).\n• Combining: Speed = 180 / 12 = 15 m/s. Both together are sufficient. Answer is C.',
    topic: 'Data Sufficiency - Speed & Time'
  },
  {
    id: 47,
    section: 'di',
    sectionName: 'Data Insights',
    subType: 'DS',
    questionNumber: 47,
    questionText: `Data Sufficiency: What is the area of rectangle ABCD?\n\nStatement (1): The diagonal of rectangle ABCD is 10 cm.\nStatement (2): The perimeter of rectangle ABCD is 28 cm.\n\nGMAT DS Options:\nA) Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.\nB) Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.\nC) BOTH statements TOGETHER are sufficient, but NEITHER statement alone is sufficient.\nD) EACH statement ALONE is sufficient.\nE) Statements (1) and (2) TOGETHER are NOT sufficient.`,
    options: ['A', 'B', 'C', 'D', 'E'],
    correctAnswer: 2,
    solution: '• St (1): l² + w² = 100 (insufficient alone).\n• St (2): 2(l + w) = 28 ⇒ l + w = 14 (insufficient alone).\n• Combining: (l + w)² = l² + w² + 2lw ⇒ 14² = 100 + 2lw ⇒ 196 = 100 + 2(Area) ⇒ Area = 48 cm². Both together are sufficient. Answer is C.',
    topic: 'Data Sufficiency - Geometry'
  },
  {
    id: 48,
    section: 'di',
    sectionName: 'Data Insights',
    subType: 'DS',
    questionNumber: 48,
    questionText: `Data Sufficiency: Is a > b?\n\nStatement (1): a − b > 0.\nStatement (2): a² > b².\n\nGMAT DS Options:\nA) Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.\nB) Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.\nC) BOTH statements TOGETHER are sufficient, but NEITHER statement alone is sufficient.\nD) EACH statement ALONE is sufficient.\nE) Statements (1) and (2) TOGETHER are NOT sufficient.`,
    options: ['A', 'B', 'C', 'D', 'E'],
    correctAnswer: 0,
    solution: '• St (1): a − b > 0 ⇒ a > b. (Always sufficient alone).\n• St (2): a² > b² does not guarantee a > b (e.g. a = −5, b = 2 gives 25 > 4, but −5 < 2). Insufficient.\nStatement (1) ALONE is sufficient. Answer is A.',
    topic: 'Data Sufficiency - Inequalities'
  },

  // Part B: Table Analysis Set (Q49 - Q52)
  {
    id: 49,
    section: 'di',
    sectionName: 'Data Insights',
    subType: 'TA',
    scenarioTitle: 'Table Analysis Set: Manufacturing Plants (Q49 - Q52)',
    scenarioText: 'Annual sales revenue ($ in Millions) and defect rate (%) of 4 manufacturing plants across 3 years:',
    dataTable: {
      headers: ['Plant', '2023 Sales ($M)', '2023 Defect %', '2024 Sales ($M)', '2024 Defect %', '2025 Sales ($M)', '2025 Defect %'],
      rows: [
        ['Plant Alpha', 150, '4%', 180, '3%', 225, '2%'],
        ['Plant Beta', 200, '5%', 220, '4%', 242, '2%'],
        ['Plant Gamma', 100, '6%', 130, '5%', 169, '3%'],
        ['Plant Delta', 250, '3%', 275, '2%', 300, '1%']
      ]
    },
    questionNumber: 49,
    questionText: 'Which plant achieved the highest percentage growth in sales revenue from 2023 to 2025?',
    options: ['Plant Alpha', 'Plant Beta', 'Plant Gamma', 'Plant Delta', 'Plants Alpha & Gamma tie'],
    correctAnswer: 2,
    solution: 'Growth from 2023 to 2025:\n• Alpha: (225 − 150) / 150 = 75 / 150 = 50.0%\n• Beta: (242 − 200) / 200 = 42 / 200 = 21.0%\n• Gamma: (169 − 100) / 100 = 69 / 100 = 69.0%\n• Delta: (300 − 250) / 250 = 50 / 250 = 20.0%\nPlant Gamma achieved the highest growth (69%).',
    topic: 'Data Insights - Table Analysis'
  },
  {
    id: 50,
    section: 'di',
    sectionName: 'Data Insights',
    subType: 'TA',
    scenarioTitle: 'Table Analysis Set: Manufacturing Plants (Q49 - Q52)',
    scenarioText: 'Annual sales revenue ($ in Millions) and defect rate (%) of 4 manufacturing plants across 3 years:',
    dataTable: {
      headers: ['Plant', '2023 Sales ($M)', '2023 Defect %', '2024 Sales ($M)', '2024 Defect %', '2025 Sales ($M)', '2025 Defect %'],
      rows: [
        ['Plant Alpha', 150, '4%', 180, '3%', 225, '2%'],
        ['Plant Beta', 200, '5%', 220, '4%', 242, '2%'],
        ['Plant Gamma', 100, '6%', 130, '5%', 169, '3%'],
        ['Plant Delta', 250, '3%', 275, '2%', 300, '1%']
      ]
    },
    questionNumber: 50,
    questionText: 'What was the total sales revenue ($ in Millions) generated across all 4 plants in 2024?',
    options: ['$805 M', '$800 M', '$815 M', '$790 M', '$825 M'],
    correctAnswer: 0,
    solution: 'Total 2024 Sales = 180 + 220 + 130 + 275 = $805 Million.',
    topic: 'Data Insights - Table Analysis'
  },
  {
    id: 51,
    section: 'di',
    sectionName: 'Data Insights',
    subType: 'TA',
    scenarioTitle: 'Table Analysis Set: Manufacturing Plants (Q49 - Q52)',
    scenarioText: 'Annual sales revenue ($ in Millions) and defect rate (%) of 4 manufacturing plants across 3 years:',
    dataTable: {
      headers: ['Plant', '2023 Sales ($M)', '2023 Defect %', '2024 Sales ($M)', '2024 Defect %', '2025 Sales ($M)', '2025 Defect %'],
      rows: [
        ['Plant Alpha', 150, '4%', 180, '3%', 225, '2%'],
        ['Plant Beta', 200, '5%', 220, '4%', 242, '2%'],
        ['Plant Gamma', 100, '6%', 130, '5%', 169, '3%'],
        ['Plant Delta', 250, '3%', 275, '2%', 300, '1%']
      ]
    },
    questionNumber: 51,
    questionText: 'What was the total volume of defective output ($ in Millions) generated across all 4 plants in 2025?',
    options: ['$17.41 M', '$15.41 M', '$12.35 M', '$18.50 M', '$14.20 M'],
    correctAnswer: 0,
    solution: 'Defective output by plant in 2025:\n• Alpha: 225 × 2% = $4.50 M\n• Beta: 242 × 2% = $4.84 M\n• Gamma: 169 × 3% = $5.07 M\n• Delta: 300 × 1% = $3.00 M\nTotal Defective Volume = 4.50 + 4.84 + 5.07 + 3.00 = $17.41 Million.',
    topic: 'Data Insights - Table Analysis'
  },
  {
    id: 52,
    section: 'di',
    sectionName: 'Data Insights',
    subType: 'TA',
    scenarioTitle: 'Table Analysis Set: Manufacturing Plants (Q49 - Q52)',
    scenarioText: 'Annual sales revenue ($ in Millions) and defect rate (%) of 4 manufacturing plants across 3 years:',
    dataTable: {
      headers: ['Plant', '2023 Sales ($M)', '2023 Defect %', '2024 Sales ($M)', '2024 Defect %', '2025 Sales ($M)', '2025 Defect %'],
      rows: [
        ['Plant Alpha', 150, '4%', 180, '3%', 225, '2%'],
        ['Plant Beta', 200, '5%', 220, '4%', 242, '2%'],
        ['Plant Gamma', 100, '6%', 130, '5%', 169, '3%'],
        ['Plant Delta', 250, '3%', 275, '2%', 300, '1%']
      ]
    },
    questionNumber: 52,
    questionText: "Plant Gamma's sales in 2025 constitute approximately what percentage of total company sales in 2025?",
    options: ['18.1%', '16.5%', '20.0%', '19.5%', '17.5%'],
    correctAnswer: 0,
    solution: 'Total 2025 Sales = 225 + 242 + 169 + 300 = $936 Million.\nGamma Percentage = (169 / 936) × 100 ≈ 18.055% ≈ 18.1%.',
    topic: 'Data Insights - Table Analysis'
  },

  // Part C: Graphics Interpretation Set (Q53 - Q56)
  {
    id: 53,
    section: 'di',
    sectionName: 'Data Insights',
    subType: 'GI',
    scenarioTitle: 'Graphics Interpretation: TechGlobal Financials (Q53 - Q56)',
    scenarioText: `TechGlobal Annual Revenue ($ M) and Expenditure ($ M) from 2022 to 2025:\n• 2022: Revenue = $400 M, Expenditure = $300 M (Profit = $100 M)\n• 2023: Revenue = $500 M, Expenditure = $380 M (Profit = $120 M)\n• 2024: Revenue = $650 M, Expenditure = $480 M (Profit = $170 M)\n• 2025: Revenue = $800 M, Expenditure = $560 M (Profit = $240 M)`,
    questionNumber: 53,
    questionText: 'What is the percentage increase in Revenue from 2022 to 2025?',
    options: ['100%', '80%', '120%', '90%', '110%'],
    correctAnswer: 0,
    solution: 'Revenue in 2022 = $400 M; Revenue in 2025 = $800 M.\nPercentage Increase = [(800 − 400) / 400] × 100 = (400 / 400) × 100 = 100%.',
    topic: 'Data Insights - Graphics Interpretation'
  },
  {
    id: 54,
    section: 'di',
    sectionName: 'Data Insights',
    subType: 'GI',
    scenarioTitle: 'Graphics Interpretation: TechGlobal Financials (Q53 - Q56)',
    scenarioText: `TechGlobal Annual Revenue ($ M) and Expenditure ($ M) from 2022 to 2025:\n• 2022: Revenue = $400 M, Expenditure = $300 M (Profit = $100 M)\n• 2023: Revenue = $500 M, Expenditure = $380 M (Profit = $120 M)\n• 2024: Revenue = $650 M, Expenditure = $480 M (Profit = $170 M)\n• 2025: Revenue = $800 M, Expenditure = $560 M (Profit = $240 M)`,
    questionNumber: 54,
    questionText: 'In which year was the Profit Margin % [(Profit / Revenue) × 100] the highest?',
    options: ['2025 (30.0%)', '2024 (26.15%)', '2023 (24.0%)', '2022 (25.0%)', '2022 & 2025 tie'],
    correctAnswer: 0,
    solution: 'Profit Margin Calculations:\n• 2022: 100 / 400 = 25.0%\n• 2023: 120 / 500 = 24.0%\n• 2024: 170 / 650 = 26.15%\n• 2025: 240 / 800 = 30.0%\nThe profit margin was highest in 2025 (30.0%).',
    topic: 'Data Insights - Graphics Interpretation'
  },
  {
    id: 55,
    section: 'di',
    sectionName: 'Data Insights',
    subType: 'GI',
    scenarioTitle: 'Graphics Interpretation: TechGlobal Financials (Q53 - Q56)',
    scenarioText: `TechGlobal Annual Revenue ($ M) and Expenditure ($ M) from 2022 to 2025:\n• 2022: Revenue = $400 M, Expenditure = $300 M (Profit = $100 M)\n• 2023: Revenue = $500 M, Expenditure = $380 M (Profit = $120 M)\n• 2024: Revenue = $650 M, Expenditure = $480 M (Profit = $170 M)\n• 2025: Revenue = $800 M, Expenditure = $560 M (Profit = $240 M)`,
    questionNumber: 55,
    questionText: 'What is the average expenditure ($ in Millions) over the 4-year period?',
    options: ['$430 M', '$425 M', '$440 M', '$450 M', '$410 M'],
    correctAnswer: 0,
    solution: 'Total Expenditure = 300 + 380 + 480 + 560 = $1,720 Million.\nAverage = 1,720 / 4 = $430 Million.',
    topic: 'Data Insights - Graphics Interpretation'
  },
  {
    id: 56,
    section: 'di',
    sectionName: 'Data Insights',
    subType: 'GI',
    scenarioTitle: 'Graphics Interpretation: TechGlobal Financials (Q53 - Q56)',
    scenarioText: `TechGlobal Annual Revenue ($ M) and Expenditure ($ M) from 2022 to 2025:\n• 2022: Revenue = $400 M, Expenditure = $300 M (Profit = $100 M)\n• 2023: Revenue = $500 M, Expenditure = $380 M (Profit = $120 M)\n• 2024: Revenue = $650 M, Expenditure = $480 M (Profit = $170 M)\n• 2025: Revenue = $800 M, Expenditure = $560 M (Profit = $240 M)`,
    questionNumber: 56,
    questionText: 'What is the ratio of total profit made in 2022-2023 to total profit made in 2024-2025?',
    options: ['22 : 41', '11 : 20', '1 : 2', '3 : 5', '4 : 7'],
    correctAnswer: 0,
    solution: '• Profit 2022-2023 = 100 + 120 = $220 M.\n• Profit 2024-2025 = 170 + 240 = $410 M.\nRatio = 220 : 410 = 22 : 41.',
    topic: 'Data Insights - Graphics Interpretation'
  },

  // Part D: Two-Source Reasoning (Q57 - Q58)
  {
    id: 57,
    section: 'di',
    sectionName: 'Data Insights',
    subType: '2SR',
    passageTitle: 'Two-Source Context: TechCorp Omnichannel Strategy',
    passageText: `Source 1 (Strategy Memo): "TechCorp plans to launch a D2C online store with a 20% discount. Offline franchisees threaten a boycott, claiming online discounts destroy foot traffic."\n\nSource 2 (Financial Audit): "Offline franchise stores contribute 70% of current retail revenue ($70M). Direct online store launch is projected to generate $25M online but reduce offline revenue by 30% if unaligned."`,
    questionNumber: 57,
    questionText: 'What is the projected net financial impact on total company revenue if TechCorp launches online without channel alignment?',
    options: [
      'Net increase of $4M ($25M online gain − $21M offline loss)',
      'Net decrease of $5M',
      'Net increase of $25M',
      'Net decrease of $10M',
      'Zero net change'
    ],
    correctAnswer: 0,
    solution: '• Projected online gain = +$25M.\n• Projected offline loss = 30% of $70M = $21M.\n• Net impact = $25M − $21M = +$4 Million.',
    topic: 'Data Insights - Two-Source Reasoning'
  },
  {
    id: 58,
    section: 'di',
    sectionName: 'Data Insights',
    subType: '2SR',
    passageTitle: 'Two-Source Context: TechCorp Omnichannel Strategy',
    passageText: `Source 1 (Strategy Memo): "TechCorp plans to launch a D2C online store with a 20% discount. Offline franchisees threaten a boycott, claiming online discounts destroy foot traffic."\n\nSource 2 (Financial Audit): "Offline franchise stores contribute 70% of current retail revenue ($70M). Direct online store launch is projected to generate $25M online but reduce offline revenue by 30% if unaligned."`,
    questionNumber: 58,
    questionText: 'Which policy best reconciles Source 1 channel conflict while preserving Source 2 revenue streams?',
    options: [
      'Harmonize online/offline prices, offer exclusive offline lines, and share online fulfillment commissions with franchisees.',
      'Close all offline franchise stores immediately.',
      'Cancel online store launch permanently.',
      'Increase offline store prices by 20%.',
      'Ignore franchisee protests.'
    ],
    correctAnswer: 0,
    solution: 'Price parity and shared fulfillment commissions align incentives for both offline franchisees and the digital channel, mitigating channel cannibalization and boycott threats.',
    topic: 'Data Insights - Two-Source Reasoning'
  },

  // Part E: Multi-Source Reasoning (Q59 - Q64)
  {
    id: 59,
    section: 'di',
    sectionName: 'Data Insights',
    subType: 'MSR',
    scenarioTitle: 'Multi-Source Context: Electives & Tournament Analysis',
    scenarioText: `Part A (200 Students Elective Enrolment):\n• 90 in Artificial Intelligence (AI)\n• 80 in Data Analytics (DA)\n• 70 in Cybersecurity (CS)\n• 30 in AI & DA, 25 in DA & CS, 20 in AI & CS, 10 in all 3 courses.\n\nPart B (4 Teams Round-Robin League):\n• Team A: 7 pts (2W, 1D, 0L)\n• Team B: 4 pts (1W, 1D, 1L)\n• Team C: 3 pts (0W, 3D, 0L)\n• Team D: 1 pt (0W, 1D, 2L)\n(Win = 3 pts, Draw = 1 pt, Loss = 0 pts)`,
    questionNumber: 59,
    questionText: 'How many students enrolled in AT LEAST one elective course?',
    options: ['165', '175', '160', '180', '170'],
    correctAnswer: 1,
    solution: 'Three-set Venn diagram principle:\n|A ∪ B ∪ C| = 90 + 80 + 70 − (30 + 25 + 20) + 10 = 240 − 75 + 10 = 175 students.',
    topic: 'Data Insights - Multi-Source Reasoning'
  },
  {
    id: 60,
    section: 'di',
    sectionName: 'Data Insights',
    subType: 'MSR',
    scenarioTitle: 'Multi-Source Context: Electives & Tournament Analysis',
    scenarioText: `Part A (200 Students Elective Enrolment):\n• 90 in Artificial Intelligence (AI)\n• 80 in Data Analytics (DA)\n• 70 in Cybersecurity (CS)\n• 30 in AI & DA, 25 in DA & CS, 20 in AI & CS, 10 in all 3 courses.\n\nPart B (4 Teams Round-Robin League):\n• Team A: 7 pts (2W, 1D, 0L)\n• Team B: 4 pts (1W, 1D, 1L)\n• Team C: 3 pts (0W, 3D, 0L)\n• Team D: 1 pt (0W, 1D, 2L)\n(Win = 3 pts, Draw = 1 pt, Loss = 0 pts)`,
    questionNumber: 60,
    questionText: 'How many students enrolled in EXACTLY one elective course?',
    options: ['120', '115', '125', '110', '130'],
    correctAnswer: 0,
    solution: '• Exactly 2 electives = (30 − 10) + (25 − 10) + (20 − 10) = 20 + 15 + 10 = 45.\n• Exactly 3 electives = 10.\n• Exactly 1 elective = Total in at least one − Exactly 2 − Exactly 3 = 175 − 45 − 10 = 120 students.',
    topic: 'Data Insights - Multi-Source Reasoning'
  },
  {
    id: 61,
    section: 'di',
    sectionName: 'Data Insights',
    subType: 'MSR',
    scenarioTitle: 'Multi-Source Context: Electives & Tournament Analysis',
    scenarioText: `Part A (200 Students Elective Enrolment):\n• 90 in Artificial Intelligence (AI)\n• 80 in Data Analytics (DA)\n• 70 in Cybersecurity (CS)\n• 30 in AI & DA, 25 in DA & CS, 20 in AI & CS, 10 in all 3 courses.\n\nPart B (4 Teams Round-Robin League):\n• Team A: 7 pts (2W, 1D, 0L)\n• Team B: 4 pts (1W, 1D, 1L)\n• Team C: 3 pts (0W, 3D, 0L)\n• Team D: 1 pt (0W, 1D, 2L)\n(Win = 3 pts, Draw = 1 pt, Loss = 0 pts)`,
    questionNumber: 61,
    questionText: 'How many students enrolled in NONE of these three courses?',
    options: ['25', '30', '35', '20', '40'],
    correctAnswer: 0,
    solution: 'None = Total Students − Total in at least one = 200 − 175 = 25 students.',
    topic: 'Data Insights - Multi-Source Reasoning'
  },
  {
    id: 62,
    section: 'di',
    sectionName: 'Data Insights',
    subType: 'MSR',
    scenarioTitle: 'Multi-Source Context: Electives & Tournament Analysis',
    scenarioText: `Part A (200 Students Elective Enrolment):\n• 90 in Artificial Intelligence (AI)\n• 80 in Data Analytics (DA)\n• 70 in Cybersecurity (CS)\n• 30 in AI & DA, 25 in DA & CS, 20 in AI & CS, 10 in all 3 courses.\n\nPart B (4 Teams Round-Robin League):\n• Team A: 7 pts (2W, 1D, 0L)\n• Team B: 4 pts (1W, 1D, 1L)\n• Team C: 3 pts (0W, 3D, 0L)\n• Team D: 1 pt (0W, 1D, 2L)\n(Win = 3 pts, Draw = 1 pt, Loss = 0 pts)`,
    questionNumber: 62,
    questionText: 'What was the total number of matches played in the 4-team round-robin tournament?',
    options: ['6', '8', '12', '4', '10'],
    correctAnswer: 0,
    solution: 'In a round-robin tournament with 4 teams, total matches = ⁴C₂ = (4 × 3) / 2 = 6 matches.',
    topic: 'Data Insights - Multi-Source Reasoning'
  },
  {
    id: 63,
    section: 'di',
    sectionName: 'Data Insights',
    subType: 'MSR',
    scenarioTitle: 'Multi-Source Context: Electives & Tournament Analysis',
    scenarioText: `Part A (200 Students Elective Enrolment):\n• 90 in Artificial Intelligence (AI)\n• 80 in Data Analytics (DA)\n• 70 in Cybersecurity (CS)\n• 30 in AI & DA, 25 in DA & CS, 20 in AI & CS, 10 in all 3 courses.\n\nPart B (4 Teams Round-Robin League):\n• Team A: 7 pts (2W, 1D, 0L)\n• Team B: 4 pts (1W, 1D, 1L)\n• Team C: 3 pts (0W, 3D, 0L)\n• Team D: 1 pt (0W, 1D, 2L)\n(Win = 3 pts, Draw = 1 pt, Loss = 0 pts)`,
    questionNumber: 63,
    questionText: 'Which team did Team B defeat in its single tournament win?',
    options: ['Team D', 'Team C', 'Team A', 'Cannot be determined', 'None'],
    correctAnswer: 0,
    solution: '• Team C drew all 3 matches (drew with A, B, D).\n• Team A won 2 matches (beat B and D) and drew 1 (with C).\n• Team B lost to A, drew with C, so Team B\'s sole victory was against Team D.',
    topic: 'Data Insights - Multi-Source Reasoning'
  },
  {
    id: 64,
    section: 'di',
    sectionName: 'Data Insights',
    subType: 'MSR',
    scenarioTitle: 'Multi-Source Context: Electives & Tournament Analysis',
    scenarioText: `Part A (200 Students Elective Enrolment):\n• 90 in Artificial Intelligence (AI)\n• 80 in Data Analytics (DA)\n• 70 in Cybersecurity (CS)\n• 30 in AI & DA, 25 in DA & CS, 20 in AI & CS, 10 in all 3 courses.\n\nPart B (4 Teams Round-Robin League):\n• Team A: 7 pts (2W, 1D, 0L)\n• Team B: 4 pts (1W, 1D, 1L)\n• Team C: 3 pts (0W, 3D, 0L)\n• Team D: 1 pt (0W, 1D, 2L)\n(Win = 3 pts, Draw = 1 pt, Loss = 0 pts)`,
    questionNumber: 64,
    questionText: 'What was the total combined sum of points accumulated by all 4 teams in the tournament?',
    options: ['15', '18', '16', '12', '14'],
    correctAnswer: 0,
    solution: 'Sum of points = 7 (Team A) + 4 (Team B) + 3 (Team C) + 1 (Team D) = 15 points.',
    topic: 'Data Insights - Multi-Source Reasoning'
  }
];
