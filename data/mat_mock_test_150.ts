export interface MatQuestion {
  id: number;
  section: 'language' | 'intelligence' | 'data-analysis' | 'math-skills' | 'economic-environment';
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

export const MAT_MOCK_TEST_150: MatQuestion[] = [
  // =========================================================================
  // SECTION I: LANGUAGE COMPREHENSION (30 Qs | Q1 - Q30)
  // =========================================================================
  {
    id: 1,
    section: 'language',
    sectionName: 'Language Comprehension',
    passageTitle: 'Passage 1: Deep Work & Distraction Economy (Q1 - Q4)',
    passageText: `In today's fast-paced digital economy, the concept of "deep work" has emerged as a critical competitive advantage. Coined by Cal Newport, deep work refers to the ability to focus without distraction on a cognitively demanding task. It allows individuals to quickly master complicated information and produce better results in less time. Conversely, "shallow work"—tasks like constantly checking emails, responding to instant messages, and attending unproductive meetings—dominates the modern corporate landscape. While shallow work is necessary for baseline logistics, it rarely creates new value. The shift towards open-plan offices and constant connectivity has inadvertently degraded the workforce's ability to engage in sustained, high-level cognition.`,
    questionNumber: 1,
    questionText: 'What is the primary consequence of "shallow work" according to the passage?',
    options: [
      'Handles baseline logistics but rarely creates new value',
      'Enhances workforce innovation',
      'Creates significant new corporate value',
      'Requires profound cognitive effort'
    ],
    correctAnswer: 0,
    solution: 'The passage explicitly states shallow work handles baseline logistics but rarely creates new value.',
    topic: 'Reading Comprehension'
  },
  {
    id: 2,
    section: 'language',
    sectionName: 'Language Comprehension',
    passageTitle: 'Passage 1: Deep Work & Distraction Economy (Q1 - Q4)',
    passageText: `In today's fast-paced digital economy, the concept of "deep work" has emerged as a critical competitive advantage. Coined by Cal Newport, deep work refers to the ability to focus without distraction on a cognitively demanding task. It allows individuals to quickly master complicated information and produce better results in less time. Conversely, "shallow work"—tasks like constantly checking emails, responding to instant messages, and attending unproductive meetings—dominates the modern corporate landscape. While shallow work is necessary for baseline logistics, it rarely creates new value. The shift towards open-plan offices and constant connectivity has inadvertently degraded the workforce's ability to engage in sustained, high-level cognition.`,
    questionNumber: 2,
    questionText: 'Which office trend is identified as detrimental to sustained high-level cognition?',
    options: [
      'Open-plan offices and constant connectivity',
      'Four-day work weeks',
      'Asynchronous communication tools',
      'Deep work culture'
    ],
    correctAnswer: 0,
    solution: 'Open-plan offices and constant connectivity are identified as detrimental to sustained focus.',
    topic: 'Reading Comprehension'
  },
  {
    id: 3,
    section: 'language',
    sectionName: 'Language Comprehension',
    passageTitle: 'Passage 1: Deep Work & Distraction Economy (Q1 - Q4)',
    passageText: `In today's fast-paced digital economy, the concept of "deep work" has emerged as a critical competitive advantage. Coined by Cal Newport, deep work refers to the ability to focus without distraction on a cognitively demanding task. It allows individuals to quickly master complicated information and produce better results in less time. Conversely, "shallow work"—tasks like constantly checking emails, responding to instant messages, and attending unproductive meetings—dominates the modern corporate landscape. While shallow work is necessary for baseline logistics, it rarely creates new value. The shift towards open-plan offices and constant connectivity has inadvertently degraded the workforce's ability to engage in sustained, high-level cognition.`,
    questionNumber: 3,
    questionText: 'What is the main benefit of "deep work"?',
    options: [
      'Mastering information quickly and producing better results',
      'Replying to more emails per hour',
      'Increasing collaborative meetings',
      'Reducing individual accountability'
    ],
    correctAnswer: 0,
    solution: 'Deep work enables mastering complex information rapidly and producing superior results in less time.',
    topic: 'Reading Comprehension'
  },
  {
    id: 4,
    section: 'language',
    sectionName: 'Language Comprehension',
    passageTitle: 'Passage 1: Deep Work & Distraction Economy (Q1 - Q4)',
    passageText: `In today's fast-paced digital economy, the concept of "deep work" has emerged as a critical competitive advantage. Coined by Cal Newport, deep work refers to the ability to focus without distraction on a cognitively demanding task. It allows individuals to quickly master complicated information and produce better results in less time. Conversely, "shallow work"—tasks like constantly checking emails, responding to instant messages, and attending unproductive meetings—dominates the modern corporate landscape. While shallow work is necessary for baseline logistics, it rarely creates new value. The shift towards open-plan offices and constant connectivity has inadvertently degraded the workforce's ability to engage in sustained, high-level cognition.`,
    questionNumber: 4,
    questionText: 'Word closest in meaning to CULTIVATE in the passage:',
    options: ['Nurture', 'Destroy', 'Ignore', 'Abandon'],
    correctAnswer: 0,
    solution: 'Cultivate in this context means to develop, encourage, or nurture.',
    topic: 'Vocabulary in Context'
  },
  {
    id: 5,
    section: 'language',
    sectionName: 'Language Comprehension',
    passageTitle: 'Passage 2: Ecosystem Valuation & Sustainability (Q5 - Q8)',
    passageText: `The economic valuation of ecosystem services has become a central paradigm in contemporary environmental governance. By assigning monetary values to ecological functions—such as carbon sequestration, pollination, and watershed protection—policy advocates aim to integrate natural capital into traditional cost-benefit analyses. However, critical political economists argue that this financialization of nature commodifies essential ecological processes, reducing intrinsic environmental values to market dynamics. When ecosystem services are monetized, their protection becomes contingent upon market demand rather than ecological integrity.`,
    questionNumber: 5,
    questionText: 'Primary concern raised by critical political economists?',
    options: [
      'Monetizing nature reduces intrinsic ecological value to market dynamics',
      'Ecosystem services are impossible to measure',
      'Carbon credits failed globally',
      'Industrial nations bear the entire burden'
    ],
    correctAnswer: 0,
    solution: 'Critical economists argue that financializing nature reduces intrinsic ecological value to market dynamics.',
    topic: 'Reading Comprehension'
  },
  {
    id: 6,
    section: 'language',
    sectionName: 'Language Comprehension',
    passageTitle: 'Passage 2: Ecosystem Valuation & Sustainability (Q5 - Q8)',
    passageText: `The economic valuation of ecosystem services has become a central paradigm in contemporary environmental governance. By assigning monetary values to ecological functions—such as carbon sequestration, pollination, and watershed protection—policy advocates aim to integrate natural capital into traditional cost-benefit analyses. However, critical political economists argue that this financialization of nature commodifies essential ecological processes, reducing intrinsic environmental values to market dynamics. When ecosystem services are monetized, their protection becomes contingent upon market demand rather than ecological integrity.`,
    questionNumber: 6,
    questionText: 'Term "natural capital" refers to:',
    options: [
      'Stock of natural assets providing ecological functions',
      'Financial green investments',
      'Agricultural GDP',
      'Pollution taxes'
    ],
    correctAnswer: 0,
    solution: 'Natural capital represents ecological stock delivering essential ecosystem services.',
    topic: 'Reading Comprehension'
  },
  {
    id: 7,
    section: 'language',
    sectionName: 'Language Comprehension',
    passageTitle: 'Passage 2: Ecosystem Valuation & Sustainability (Q5 - Q8)',
    passageText: `The economic valuation of ecosystem services has become a central paradigm in contemporary environmental governance. By assigning monetary values to ecological functions—such as carbon sequestration, pollination, and watershed protection—policy advocates aim to integrate natural capital into traditional cost-benefit analyses. However, critical political economists argue that this financialization of nature commodifies essential ecological processes, reducing intrinsic environmental values to market dynamics. When ecosystem services are monetized, their protection becomes contingent upon market demand rather than ecological integrity.`,
    questionNumber: 7,
    questionText: "Author's tone toward market-based conservation instruments:",
    options: ['Critically analytical', 'Unreservedly enthusiastic', 'Dismissive', 'Passive'],
    correctAnswer: 0,
    solution: 'The author methodically analyses and critiques the limits of market-based instruments (Critically analytical).',
    topic: 'Tone Analysis'
  },
  {
    id: 8,
    section: 'language',
    sectionName: 'Language Comprehension',
    passageTitle: 'Passage 2: Ecosystem Valuation & Sustainability (Q5 - Q8)',
    passageText: `The economic valuation of ecosystem services has become a central paradigm in contemporary environmental governance. By assigning monetary values to ecological functions—such as carbon sequestration, pollination, and watershed protection—policy advocates aim to integrate natural capital into traditional cost-benefit analyses. However, critical political economists argue that this financialization of nature commodifies essential ecological processes, reducing intrinsic environmental values to market dynamics. When ecosystem services are monetized, their protection becomes contingent upon market demand rather than ecological integrity.`,
    questionNumber: 8,
    questionText: 'When ecosystem services are monetized, their protection becomes contingent upon:',
    options: [
      'Market demand and financial return',
      'Absolute moral duties',
      'Strict criminal laws',
      'International charity'
    ],
    correctAnswer: 0,
    solution: 'Passage states protection becomes contingent upon market demand and financial return.',
    topic: 'Reading Comprehension'
  },
  {
    id: 9,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 9,
    questionText: `Paragraph Summary: Microplastics contaminate marine food webs, absorbing toxins. Seafood consumption exposes humans to health hazards. International action is needed.`,
    options: [
      'Microplastic contamination damages marine webs and poses human health risks, demanding global action',
      'Ban seafood globally',
      'Affects only plankton',
      'Regulations already succeeded'
    ],
    correctAnswer: 0,
    solution: 'Option A covers marine damage, human exposure hazards, and need for global policy action.',
    topic: 'Paragraph Summary'
  },
  {
    id: 10,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 10,
    questionText: `Paragraph Summary: Remote work enhances autonomy but complicates cohesion. Hybrid models balance flexibility with office collaboration.`,
    options: [
      "Hybrid work models aim to reconcile worker flexibility with management's need for collaboration",
      'Remote work is unsustainable',
      'Employees prefer full-time office',
      'Commute stress is the sole factor'
    ],
    correctAnswer: 0,
    solution: 'Option A captures the core synthesis between worker autonomy and organizational collaboration.',
    topic: 'Paragraph Summary'
  },
  {
    id: 11,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 11,
    questionText: 'Synonym for METICULOUS:',
    options: ['Fastidious', 'Careless', 'Sloppy', 'Hasty'],
    correctAnswer: 0,
    solution: 'Meticulous means showing great attention to detail (Fastidious).',
    topic: 'Synonyms'
  },
  {
    id: 12,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 12,
    questionText: 'Antonym for OBFUSCATE:',
    options: ['Clarify', 'Confuse', 'Conceal', 'Complicate'],
    correctAnswer: 0,
    solution: 'Obfuscate means to obscure or make unclear; antonym is Clarify.',
    topic: 'Antonyms'
  },
  {
    id: 13,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 13,
    questionText: 'Synonym for EPHEMERAL:',
    options: ['Transient', 'Permanent', 'Substantial', 'Eternal'],
    correctAnswer: 0,
    solution: 'Ephemeral means lasting for a very short time (Transient).',
    topic: 'Synonyms'
  },
  {
    id: 14,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 14,
    questionText: 'Antonym for PRUDENT:',
    options: ['Reckless', 'Cautious', 'Judicious', 'Sagacious'],
    correctAnswer: 0,
    solution: 'Prudent means showing care and wisdom; opposite is Reckless.',
    topic: 'Antonyms'
  },
  {
    id: 15,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 15,
    questionText: 'Word closest in meaning to LACONIC:',
    options: ['Concise', 'Verbose', 'Eloquent', 'Garrulous'],
    correctAnswer: 0,
    solution: 'Laconic means using very few words (Concise).',
    topic: 'Synonyms'
  },
  {
    id: 16,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 16,
    questionText: 'Word opposite in meaning to AMELIORATE:',
    options: ['Worsen', 'Enhance', 'Mitigate', 'Refine'],
    correctAnswer: 0,
    solution: 'Ameliorate means to improve; opposite is Worsen.',
    topic: 'Antonyms'
  },
  {
    id: 17,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 17,
    questionText: 'Identify the grammatically correct sentence:',
    options: [
      'Neither the principal nor the teachers are responsible for the delay.',
      'Neither the principal nor the teachers is responsible for the delay.',
      'Neither the principal or the teachers is responsible for the delay.',
      'Neither principal nor teachers was responsible.'
    ],
    correctAnswer: 0,
    solution: 'Verb agrees with the nearer plural subject ("teachers" ⇒ "are").',
    topic: 'Grammar - Subject Verb Agreement'
  },
  {
    id: 18,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 18,
    questionText: 'Fill in the preposition: "She has a great affinity _____ classical music."',
    options: ['for', 'with', 'to', 'in'],
    correctAnswer: 0,
    solution: '"Affinity for" is the correct standard preposition.',
    topic: 'Grammar - Prepositions'
  },
  {
    id: 19,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 19,
    questionText: 'Preposition usage: "The CEO insisted _____ reviewing performance reports personally."',
    options: ['on', 'at', 'for', 'with'],
    correctAnswer: 0,
    solution: '"Insisted on" is the correct prepositional collocation.',
    topic: 'Grammar - Prepositions'
  },
  {
    id: 20,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 20,
    questionText: 'Subjunctive mood: "If I _____ CFO, I would allocate more capital to R&D."',
    options: ['were', 'was', 'am', 'have been'],
    correctAnswer: 0,
    solution: 'Hypothetical subjunctive uses "were".',
    topic: 'Grammar - Subjunctive Mood'
  },
  {
    id: 21,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 21,
    questionText: 'Meaning of idiom "Spill the beans":',
    options: ['To reveal a secret', 'To drop food', 'To cook a meal', 'To cause an argument'],
    correctAnswer: 0,
    solution: '"Spill the beans" means to reveal a secret.',
    topic: 'Idioms & Phrases'
  },
  {
    id: 22,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 22,
    questionText: 'Meaning of idiom "Under the weather":',
    options: ['Feeling slightly ill', 'Standing in rain', 'Being depressed', 'Checking forecast'],
    correctAnswer: 0,
    solution: '"Under the weather" means feeling slightly ill.',
    topic: 'Idioms & Phrases'
  },
  {
    id: 23,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 23,
    questionText: 'Meaning of idiom "Bite the bullet":',
    options: ['Face a difficult situation courageously', 'Eat hard food', 'Shoot a gun', 'Delay a decision'],
    correctAnswer: 0,
    solution: '"Bite the bullet" means facing a tough situation with courage.',
    topic: 'Idioms & Phrases'
  },
  {
    id: 24,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 24,
    questionText: 'Change voice: "The chef cooked a delicious meal."',
    options: [
      'A delicious meal was cooked by the chef.',
      'A delicious meal is cooked by the chef.',
      'A delicious meal has been cooked by the chef.',
      'Chef was cooking meal.'
    ],
    correctAnswer: 0,
    solution: 'Simple past "cooked" becomes "was cooked" in passive voice.',
    topic: 'Active & Passive Voice'
  },
  {
    id: 25,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 25,
    questionText: 'Indirect speech: He said, "I am going to the market."',
    options: [
      'He said that he was going to the market.',
      'He said that he is going to the market.',
      'He said that I was going.',
      'He says he was going.'
    ],
    correctAnswer: 0,
    solution: '"am going" changes to past continuous "was going".',
    topic: 'Direct & Indirect Speech'
  },
  {
    id: 26,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 26,
    questionText: 'Choose the correctly spelt word:',
    options: ['Accommodation', 'Accomodation', 'Accomadation', 'Acommodation'],
    correctAnswer: 0,
    solution: 'Accommodation (double c and double m).',
    topic: 'Spelling'
  },
  {
    id: 27,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 27,
    questionText: 'Correlative conjunction: "The regulatory framework affects not only banks _____ FinTech startups."',
    options: ['but also', 'and also', 'as well as', 'in addition to'],
    correctAnswer: 0,
    solution: '"Not only ... but also" is the correct correlative pair.',
    topic: 'Grammar - Conjunctions'
  },
  {
    id: 28,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 28,
    questionText: 'Rule usage: "Scarcely had the announcement been made _____ stock prices tumbled."',
    options: ['when', 'than', 'then', 'after'],
    correctAnswer: 0,
    solution: '"Scarcely had ... when" is the correct correlative rule.',
    topic: 'Grammar - Inversion'
  },
  {
    id: 29,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 29,
    questionText: 'Complete Analogy: ARCHITECT : BUILDING :: SCULPTOR : ?',
    options: ['Statue', 'Canvas', 'Chisel', 'Museum'],
    correctAnswer: 0,
    solution: 'An architect designs a building; a sculptor creates a statue.',
    topic: 'Analogies'
  },
  {
    id: 30,
    section: 'language',
    sectionName: 'Language Comprehension',
    questionNumber: 30,
    questionText: 'Complete Analogy: METAPHOR : FIGURATIVE :: FACT : ?',
    options: ['Literal', 'Fiction', 'Ambiguous', 'Symbolic'],
    correctAnswer: 0,
    solution: 'Metaphor is figurative; fact is literal.',
    topic: 'Analogies'
  },

  // =========================================================================
  // SECTION II: INTELLIGENCE AND CRITICAL REASONING (30 Qs | Q31 - Q60)
  // =========================================================================
  {
    id: 31,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 31,
    questionText: 'Find missing number in series: 3, 7, 15, 31, 63, ?',
    options: ['127', '125', '120', '128'],
    correctAnswer: 0,
    solution: 'Pattern: ×2 + 1. 63 × 2 + 1 = 127.',
    topic: 'Number Series'
  },
  {
    id: 32,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 32,
    questionText: 'Complete letter series: BCD, FGH, JKL, ?',
    options: ['NOP', 'MNO', 'OPQ', 'PRS'],
    correctAnswer: 0,
    solution: 'Continuous 3-letter groups skipping 1 letter: BCD (e) FGH (i) JKL (m) NOP.',
    topic: 'Letter Series'
  },
  {
    id: 33,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 33,
    questionText: 'Find odd one out: 27, 64, 125, 144, 216',
    options: ['144', '64', '125', '216'],
    correctAnswer: 0,
    solution: '144 is 12² (square); others are perfect cubes (3³, 4³, 5³, 6³).',
    topic: 'Classification'
  },
  {
    id: 34,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 34,
    questionText: 'If STRATEGY is coded as TUSBUFHZ, how is FINANCE coded?',
    options: ['GJOBODF', 'GJOBOCF', 'EHMAMBD', 'GINBNDF'],
    correctAnswer: 0,
    solution: 'Each letter shifted +1 forward: F→G, I→J, N→O, A→B, N→O, C→D, E→F = GJOBODF.',
    topic: 'Coding-Decoding'
  },
  {
    id: 35,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 35,
    questionText: 'Pointing to a photo, a woman says, "He is the only son of my husband\'s father." Relation?',
    options: ['Husband', 'Brother-in-law', 'Son', 'Father-in-law'],
    correctAnswer: 0,
    solution: "Only son of husband's father = husband.",
    topic: 'Blood Relations'
  },
  {
    id: 36,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 36,
    questionText: 'Starting from point X, Rahul walks 5 km South, turns left and walks 12 km. Direct distance from X?',
    options: ['13 km', '17 km', '15 km', '10 km'],
    correctAnswer: 0,
    solution: 'Hypotenuse = √(5² + 12²) = 13 km.',
    topic: 'Direction Sense'
  },
  {
    id: 37,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 37,
    questionText: 'Row of 40 students facing North, Amit is 15th from left end. Position from right end?',
    options: ['26th', '25th', '27th', '24th'],
    correctAnswer: 0,
    solution: 'Position from right = 40 − 15 + 1 = 26th.',
    topic: 'Order & Ranking'
  },
  {
    id: 38,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 38,
    questionText: "If '+' means '×', '−' means '÷', '×' means '+', '÷' means '−', solve: 20 − 4 × 6 + 2 ÷ 5 = ?",
    options: ['12', '15', '10', '18'],
    correctAnswer: 0,
    solution: '20 ÷ 4 + 6 × 2 − 5 = 5 + 12 − 5 = 12.',
    topic: 'Mathematical Operations'
  },
  {
    id: 39,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 39,
    questionText: 'Complete alphanumeric series: A1, C4, E9, G16, ?',
    options: ['I25', 'H25', 'I36', 'J25'],
    correctAnswer: 0,
    solution: 'Letters skip 1 (A, C, E, G, I); numbers are 1², 2², 3², 4², 5² = 25 ⇒ I25.',
    topic: 'Alphanumeric Series'
  },
  {
    id: 40,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 40,
    questionText: 'Angle between hour hand and minute hand of clock at 3:30?',
    options: ['75°', '90°', '105°', '60°'],
    correctAnswer: 0,
    solution: '|30(3) − 5.5(30)| = |90 − 165| = 75°.',
    topic: 'Clocks'
  },
  {
    id: 41,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 41,
    questionText: 'If today is Monday, what day of week after 65 days?',
    options: ['Wednesday', 'Tuesday', 'Thursday', 'Friday'],
    correctAnswer: 0,
    solution: '65 = 9 weeks + 2 days. Monday + 2 days = Wednesday.',
    topic: 'Calendars'
  },
  {
    id: 42,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    scenarioTitle: 'Circular Seating: Six Executives (Q42 - Q44)',
    scenarioText: 'Six executives A, B, C, D, E, F sit around circular table facing center. A is second to left of D. C is neighbor of A and B. F is opposite B.',
    questionNumber: 42,
    questionText: 'Who sits directly opposite D?',
    options: ['C', 'E', 'A', 'B'],
    correctAnswer: 0,
    solution: 'Arrangement: D, F, A, C, B, E. Opposite D is C.',
    topic: 'Circular Arrangements'
  },
  {
    id: 43,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    scenarioTitle: 'Circular Seating: Six Executives (Q42 - Q44)',
    scenarioText: 'Six executives A, B, C, D, E, F sit around circular table facing center. A is second to left of D. C is neighbor of A and B. F is opposite B.',
    questionNumber: 43,
    questionText: 'Who sits to immediate right of A?',
    options: ['C', 'F', 'E', 'D'],
    correctAnswer: 0,
    solution: 'To the immediate right of A facing center is C.',
    topic: 'Circular Arrangements'
  },
  {
    id: 44,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    scenarioTitle: 'Circular Seating: Six Executives (Q42 - Q44)',
    scenarioText: 'Six executives A, B, C, D, E, F sit around circular table facing center. A is second to left of D. C is neighbor of A and B. F is opposite B.',
    questionNumber: 44,
    questionText: 'Who sits between F and D?',
    options: ['E', 'C', 'A', 'B'],
    correctAnswer: 0,
    solution: 'Between F and D sits E.',
    topic: 'Circular Arrangements'
  },
  {
    id: 45,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 45,
    questionText: 'Code: MARKET -> TEMRAM. How is PROFIT written?',
    options: ['TIFORP', 'ITRPRO', 'PROFIT', 'ITPROF'],
    correctAnswer: 0,
    solution: 'Word is reversed: PROFIT reversed is TIFORP.',
    topic: 'Coding-Decoding'
  },
  {
    id: 46,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 46,
    questionText: `Syllogism:\nStatements: All cats are dogs. Some dogs are birds.\nConclusions:\nI. Some cats are birds.\nII. Some birds are dogs.`,
    options: ['Only Conclusion II follows', 'Only Conclusion I follows', 'Both follow', 'Neither follows'],
    correctAnswer: 0,
    solution: '"Some dogs are birds" converts to "Some birds are dogs" (II follows).',
    topic: 'Syllogisms'
  },
  {
    id: 47,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 47,
    questionText: `Syllogism:\nStatements: All economists are strategists. No strategist is a gambler.\nConclusions:\nI. No economist is a gambler.\nII. Some strategists are economists.`,
    options: ['Both Conclusions I and II follow', 'Only Conclusion I follows', 'Only Conclusion II follows', 'Neither follows'],
    correctAnswer: 0,
    solution: 'All E ⊂ S and S ∩ G = ∅ ⇒ E ∩ G = ∅ (I). All E ⊂ S ⇒ Some S are E (II). Both follow.',
    topic: 'Syllogisms'
  },
  {
    id: 48,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 48,
    questionText: `Statement-Assumption:\nStatement: "Please do not use mobile phones inside hospital."\nAssumption I: Mobile phones interfere with medical equipment.\nAssumption II: People read notices.`,
    options: ['Both I and II are implicit', 'Only I is implicit', 'Only II is implicit', 'Neither is implicit'],
    correctAnswer: 0,
    solution: 'A notice assumes both a valid risk rationale (I) and public compliance (II). Both are implicit.',
    topic: 'Assumptions'
  },
  {
    id: 49,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 49,
    questionText: `Course of Action:\nStatement: "Heavy rainfall caused waterlogging in residential sectors."\nAction I: Deploy de-watering pumps\nAction II: Advise residents to stay indoors`,
    options: ['Both Actions I and II follow', 'Only Action I follows', 'Only Action II follows', 'Neither follows'],
    correctAnswer: 0,
    solution: 'Both physical removal of water and public safety advisories are logical courses of action.',
    topic: 'Course of Action'
  },
  {
    id: 50,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 50,
    questionText: 'Complete series: 4, 9, 19, 39, 79, ?',
    options: ['159', '149', '158', '160'],
    correctAnswer: 0,
    solution: 'Pattern: ×2 + 1. 79 × 2 + 1 = 159.',
    topic: 'Number Series'
  },
  {
    id: 51,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 51,
    questionText: 'Strengthen Argument: Survey shows remote work increased employee satisfaction by 25%. Management concludes remote work improves productivity. Which STRENGTHENS this?',
    options: [
      'Satisfied employees completed projects 15% faster with fewer errors',
      'Internet costs increased',
      'Office lease costs remained same',
      'Online meeting time increased'
    ],
    correctAnswer: 0,
    solution: 'Empirical data linking satisfaction directly to speed and reduced errors proves the productivity claim.',
    topic: 'Strengthen Argument'
  },
  {
    id: 52,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 52,
    questionText: 'Weaken Argument: "City X raised parking fees downtown to reduce traffic. Traffic remained unchanged." Which explains this?',
    options: [
      'Public transit fares were increased simultaneously',
      'Parking collectors got salary raises',
      'Population grew 1%',
      'Neighboring city reduced fees'
    ],
    correctAnswer: 0,
    solution: 'Higher public transit fares disincentivized commuters from switching away from private cars.',
    topic: 'Weaken Argument'
  },
  {
    id: 53,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 53,
    questionText: 'Cause & Effect: Library borrowings dropped 40% over two years. Most probable cause?',
    options: [
      'University provided free access to digital journal databases',
      'Library increased operating hours',
      'Book printing costs rose',
      'Student enrollment grew 10%'
    ],
    correctAnswer: 0,
    solution: 'Free online digital access directly substitutes for physical library borrowings.',
    topic: 'Cause & Effect'
  },
  {
    id: 54,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 54,
    questionText: 'Inference: Company Z discontinued budget smartphones to focus on premium flagship models.',
    options: [
      'Company Z aims for higher per-unit profit margins',
      'Budget phones are illegal',
      'Premium phones cost less to make',
      'Retail stores will close'
    ],
    correctAnswer: 0,
    solution: 'Focusing exclusively on premium segments is a strategic decision to capture higher unit margins.',
    topic: 'Inferences'
  },
  {
    id: 55,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 55,
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
    id: 56,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 56,
    questionText: 'Machine Input Rules: Input: 42 18 85 31 56 09. Step I: 09 42 18 85 31 56. What is logic?',
    options: [
      'Arranging numbers in ascending order from left to right',
      'Descending order sort',
      'Swapping odd/even positions',
      'Reversing digits'
    ],
    correctAnswer: 0,
    solution: 'The smallest number is positioned to the front in each step (Ascending sort).',
    topic: 'Machine Input'
  },
  {
    id: 57,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 57,
    questionText: 'Five professionals P, Q, R, S, T in 5 departments: HR, Finance, IT, Marketing, Ops. P not HR/Finance; Q in IT; R in Ops; S not Finance. Who is in Finance?',
    options: ['T', 'P', 'S', 'R'],
    correctAnswer: 0,
    solution: 'Since P and S cannot be Finance, and Q/R are occupied, T must be in Finance.',
    topic: 'Complex Puzzles'
  },
  {
    id: 58,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 58,
    questionText: 'If South-East becomes North, North-East becomes West, what does West become?',
    options: ['South-East', 'North-East', 'North-West', 'South-West'],
    correctAnswer: 0,
    solution: '135° anti-clockwise rotation shifts West to South-East.',
    topic: 'Direction Sense'
  },
  {
    id: 59,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 59,
    questionText: 'Rahul is 15th from front in row. Thrice as many behind him as in front. Boys between Rahul and 7th boy from end?',
    options: ['35', '33', '34', '36'],
    correctAnswer: 0,
    solution: 'Front=14, Behind=42, Total=57. 7th from end = 51st. Between 15th and 51st = 35 boys.',
    topic: 'Order & Ranking'
  },
  {
    id: 60,
    section: 'intelligence',
    sectionName: 'Intelligence & Critical Reasoning',
    questionNumber: 60,
    questionText: `Parajumble:\n1. Consequently, firms must adapt.\n2. Renewable transition accelerated.\n3. Rapid shift driven by lower costs.\n4. Failing firms risk stranded assets.`,
    options: ['2314', '2134', '1234', '3214'],
    correctAnswer: 0,
    solution: '2 introduces transition, 3 explains driver, 1 details adaptation, 4 gives failure consequence (2314).',
    topic: 'Parajumbles'
  },

  // =========================================================================
  // SECTION III: DATA ANALYSIS AND SUFFICIENCY (30 Qs | Q61 - Q90)
  // =========================================================================
  {
    id: 61,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    scenarioTitle: 'DI Set 1: Apex Ltd Financial Performance (Q61 - Q65)',
    scenarioText: 'Financial Performance Data (Apex Ltd 2021 - 2025 in ₹ Cr):\n• 2021: Rev=250, Exp=180 (Profit=70)\n• 2022: Rev=320, Exp=240 (Profit=80)\n• 2023: Rev=400, Exp=280 (Profit=120)\n• 2024: Rev=450, Exp=360 (Profit=90)\n• 2025: Rev=600, Exp=420 (Profit=180)',
    questionNumber: 61,
    questionText: 'In which year was absolute Profit highest?',
    options: ['2025 (180 Cr)', '2024', '2023', '2022'],
    correctAnswer: 0,
    solution: 'Profit in 2025 was ₹ 180 Cr (highest).',
    topic: 'Data Interpretation'
  },
  {
    id: 62,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    scenarioTitle: 'DI Set 1: Apex Ltd Financial Performance (Q61 - Q65)',
    scenarioText: 'Financial Performance Data (Apex Ltd 2021 - 2025 in ₹ Cr):\n• 2021: Rev=250, Exp=180 (Profit=70)\n• 2022: Rev=320, Exp=240 (Profit=80)\n• 2023: Rev=400, Exp=280 (Profit=120)\n• 2024: Rev=450, Exp=360 (Profit=90)\n• 2025: Rev=600, Exp=420 (Profit=180)',
    questionNumber: 62,
    questionText: 'Percentage increase in Revenue from 2021 to 2025?',
    options: ['140%', '120%', '150%', '100%'],
    correctAnswer: 0,
    solution: '[(600 − 250) / 250] × 100 = 140%.',
    topic: 'Data Interpretation'
  },
  {
    id: 63,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    scenarioTitle: 'DI Set 1: Apex Ltd Financial Performance (Q61 - Q65)',
    scenarioText: 'Financial Performance Data (Apex Ltd 2021 - 2025 in ₹ Cr):\n• 2021: Rev=250, Exp=180 (Profit=70)\n• 2022: Rev=320, Exp=240 (Profit=80)\n• 2023: Rev=400, Exp=280 (Profit=120)\n• 2024: Rev=450, Exp=360 (Profit=90)\n• 2025: Rev=600, Exp=420 (Profit=180)',
    questionNumber: 63,
    questionText: 'In which year was Profit Margin % highest?',
    options: ['2023 & 2025 tie (30%)', '2021', '2022', '2024'],
    correctAnswer: 0,
    solution: '2023: 120/400 = 30%. 2025: 180/600 = 30% (Highest tie).',
    topic: 'Data Interpretation'
  },
  {
    id: 64,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    scenarioTitle: 'DI Set 1: Apex Ltd Financial Performance (Q61 - Q65)',
    scenarioText: 'Financial Performance Data (Apex Ltd 2021 - 2025 in ₹ Cr):\n• 2021: Rev=250, Exp=180 (Profit=70)\n• 2022: Rev=320, Exp=240 (Profit=80)\n• 2023: Rev=400, Exp=280 (Profit=120)\n• 2024: Rev=450, Exp=360 (Profit=90)\n• 2025: Rev=600, Exp=420 (Profit=180)',
    questionNumber: 64,
    questionText: 'Average expenditure over 5-year period in ₹ Cr?',
    options: ['296 Cr', '280 Cr', '300 Cr', '310 Cr'],
    correctAnswer: 0,
    solution: '(180 + 240 + 280 + 360 + 420) / 5 = 1480 / 5 = 296 Cr.',
    topic: 'Data Interpretation'
  },
  {
    id: 65,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    scenarioTitle: 'DI Set 1: Apex Ltd Financial Performance (Q61 - Q65)',
    scenarioText: 'Financial Performance Data (Apex Ltd 2021 - 2025 in ₹ Cr):\n• 2021: Rev=250, Exp=180 (Profit=70)\n• 2022: Rev=320, Exp=240 (Profit=80)\n• 2023: Rev=400, Exp=280 (Profit=120)\n• 2024: Rev=450, Exp=360 (Profit=90)\n• 2025: Rev=600, Exp=420 (Profit=180)',
    questionNumber: 65,
    questionText: 'Ratio of total profit in 2021-2022 to total profit in 2024-2025?',
    options: ['5 : 9', '3 : 5', '15 : 27', '5 : 18'],
    correctAnswer: 0,
    solution: '(70 + 80) : (90 + 180) = 150 : 270 = 5 : 9.',
    topic: 'Data Interpretation'
  },

  // DI Set 2: Smartphone Sales (Q66 - Q68)
  {
    id: 66,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    scenarioTitle: 'DI Set 2: Smartphone Sales (Q66 - Q68)',
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
    questionNumber: 66,
    questionText: 'Percentage increase in sales for Company Gamma from 2023 to 2025?',
    options: ['80%', '40%', '60%', '75%'],
    correctAnswer: 0,
    solution: '((90 − 50) / 50) × 100 = 80%.',
    topic: 'Data Interpretation'
  },
  {
    id: 67,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    scenarioTitle: 'DI Set 2: Smartphone Sales (Q66 - Q68)',
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
    questionNumber: 67,
    questionText: 'Average number of smartphones sold by all companies in 2024 (in thousands)?',
    options: ['61.25', '60.5', '62.5', '65.0'],
    correctAnswer: 0,
    solution: 'Total 2024 = 55 + 75 + 65 + 50 = 245k. Average = 245/4 = 61.25k.',
    topic: 'Data Interpretation'
  },
  {
    id: 68,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    scenarioTitle: 'DI Set 2: Smartphone Sales (Q66 - Q68)',
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
    questionNumber: 68,
    questionText: 'Which company had lowest percentage growth in sales from 2024 to 2025?',
    options: ['Beta', 'Alpha', 'Gamma', 'Delta'],
    correctAnswer: 0,
    solution: 'Beta growth = (10/75) × 100 = 13.3% (Lowest).',
    topic: 'Data Interpretation'
  },

  // DI Set 3: Venn Diagram (Q69 - Q72)
  {
    id: 69,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    scenarioTitle: 'DI Set 3: Course Enrolment Venn Data (Q69 - Q72)',
    scenarioText: 'Course Enrolment Venn Data: 100 students. 45 in DS, 50 in AI, 40 in CS. 15 in DS & AI, 12 in AI & CS, 10 in DS & CS, 5 in all three.',
    questionNumber: 69,
    questionText: 'How many students enrolled in AT LEAST one course?',
    options: ['93', '90', '88', '95'],
    correctAnswer: 0,
    solution: '45 + 50 + 40 − (15 + 12 + 10) + 5 = 93.',
    topic: 'Venn Logic'
  },
  {
    id: 70,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    scenarioTitle: 'DI Set 3: Course Enrolment Venn Data (Q69 - Q72)',
    scenarioText: 'Course Enrolment Venn Data: 100 students. 45 in DS, 50 in AI, 40 in CS. 15 in DS & AI, 12 in AI & CS, 10 in DS & CS, 5 in all three.',
    questionNumber: 70,
    questionText: 'How many students enrolled in EXACTLY one course?',
    options: ['66', '60', '70', '62'],
    correctAnswer: 0,
    solution: 'Exactly 2 = 10 + 7 + 5 = 22. Exactly 1 = 93 − 22 − 5 = 66.',
    topic: 'Venn Logic'
  },
  {
    id: 71,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    scenarioTitle: 'DI Set 3: Course Enrolment Venn Data (Q69 - Q72)',
    scenarioText: 'Course Enrolment Venn Data: 100 students. 45 in DS, 50 in AI, 40 in CS. 15 in DS & AI, 12 in AI & CS, 10 in DS & CS, 5 in all three.',
    questionNumber: 71,
    questionText: 'How many students enrolled in NONE of these courses?',
    options: ['7', '10', '5', '12'],
    correctAnswer: 0,
    solution: 'None = 100 − 93 = 7.',
    topic: 'Venn Logic'
  },
  {
    id: 72,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    scenarioTitle: 'DI Set 3: Course Enrolment Venn Data (Q69 - Q72)',
    scenarioText: 'Course Enrolment Venn Data: 100 students. 45 in DS, 50 in AI, 40 in CS. 15 in DS & AI, 12 in AI & CS, 10 in DS & CS, 5 in all three.',
    questionNumber: 72,
    questionText: 'How many students enrolled in DS but NOT AI?',
    options: ['30', '35', '25', '20'],
    correctAnswer: 0,
    solution: 'DS without AI = 45 − 15 = 30.',
    topic: 'Venn Logic'
  },

  // DI Set 4: Round Robin League (Q73 - Q75)
  {
    id: 73,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    scenarioTitle: 'DI Set 4: Round-Robin League (Q73 - Q75)',
    scenarioText: 'Round-Robin League (4 Teams Alpha, Beta, Gamma, Delta). Win=3, Draw=1, Loss=0. Alpha=7pts, Beta=4pts, Gamma=3pts (3 draws), Delta=1pt.',
    questionNumber: 73,
    questionText: 'Outcome of match between Alpha and Delta?',
    options: ['Alpha won', 'Delta won', 'Draw', 'Cancelled'],
    correctAnswer: 0,
    solution: 'Alpha won matches against Beta and Delta, and drew with Gamma.',
    topic: 'Tournament Logic'
  },
  {
    id: 74,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    scenarioTitle: 'DI Set 4: Round-Robin League (Q73 - Q75)',
    scenarioText: 'Round-Robin League (4 Teams Alpha, Beta, Gamma, Delta). Win=3, Draw=1, Loss=0. Alpha=7pts, Beta=4pts, Gamma=3pts (3 draws), Delta=1pt.',
    questionNumber: 74,
    questionText: 'Which team did Beta defeat?',
    options: ['Delta', 'Gamma', 'Alpha', 'None'],
    correctAnswer: 0,
    solution: 'Beta defeated Delta.',
    topic: 'Tournament Logic'
  },
  {
    id: 75,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    scenarioTitle: 'DI Set 4: Round-Robin League (Q73 - Q75)',
    scenarioText: 'Round-Robin League (4 Teams Alpha, Beta, Gamma, Delta). Win=3, Draw=1, Loss=0. Alpha=7pts, Beta=4pts, Gamma=3pts (3 draws), Delta=1pt.',
    questionNumber: 75,
    questionText: 'Total matches ending in a DRAW?',
    options: ['4', '3', '2', '5'],
    correctAnswer: 0,
    solution: 'Gamma drew all 3 matches; 4 total draws occurred.',
    topic: 'Tournament Logic'
  },

  // Part B: Data Sufficiency (Q76 - Q90)
  {
    id: 76,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    questionNumber: 76,
    questionText: 'Data Sufficiency: Is integer x positive?\nStatement I: x² = 25 | Statement II: x³ = 125',
    options: ['Statement II alone is sufficient', 'Statement I alone is sufficient', 'Both statements together are necessary', 'Neither is sufficient'],
    correctAnswer: 0,
    solution: 'x³ = 125 gives x = 5 (unique positive root, sufficient).',
    topic: 'Data Sufficiency'
  },
  {
    id: 77,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    questionNumber: 77,
    questionText: 'Data Sufficiency: What is area of a rectangle?\nStatement I: Perimeter is 40 cm | Statement II: Diagonal is 14.14 cm',
    options: ['Both statements together are necessary', 'Statement I alone is sufficient', 'Statement II alone is sufficient', 'Neither is sufficient'],
    correctAnswer: 0,
    solution: 'Perimeter gives L+W=20. Diagonal gives L²+W²=200. Combined gives LW=100.',
    topic: 'Data Sufficiency'
  },
  {
    id: 78,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    questionNumber: 78,
    questionText: 'Data Sufficiency: What is the two-digit number?\nStatement I: Sum of digits is 8 | Statement II: Difference between digits is 2',
    options: ['Neither statement is sufficient', 'Statement I alone is sufficient', 'Statement II alone is sufficient', 'Both statements together are necessary'],
    correctAnswer: 0,
    solution: 'Yields two valid numbers (53 or 35). Not uniquely determined.',
    topic: 'Data Sufficiency'
  },
  {
    id: 79,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    questionNumber: 79,
    questionText: 'A train 180 m long crosses platform 220 m long in 20 seconds. Speed in km/h?',
    options: ['72 km/h', '54 km/h', '90 km/h', '60 km/h'],
    correctAnswer: 0,
    solution: 'Dist = 180 + 220 = 400 m. Speed = 400/20 = 20 m/s = 72 km/h.',
    topic: 'Trains'
  },
  {
    id: 80,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    questionNumber: 80,
    questionText: 'Sum compounded annually at 10% grows to ₹ 14,520 in 2 years. Find principal.',
    options: ['₹ 12,000', '₹ 11,500', '₹ 12,500', '₹ 10,000'],
    correctAnswer: 0,
    solution: 'P(1.21) = 14,520 ⇒ P = ₹ 12,000.',
    topic: 'Compound Interest'
  },
  {
    id: 81,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    questionNumber: 81,
    questionText: 'In mixture of 60 L, milk to water ratio is 2 : 1. How much water added to make ratio 1 : 2?',
    options: ['60 liters', '40 liters', '30 liters', '50 liters'],
    correctAnswer: 0,
    solution: 'Milk = 40L, Water = 20L. For 1:2 ratio, Water required = 80L. Add 60L.',
    topic: 'Mixtures'
  },
  {
    id: 82,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    questionNumber: 82,
    questionText: 'Average age of 15 students is 18 yrs. Teacher included, average rises by 1 yr. Teacher\'s age?',
    options: ['34 years', '32 years', '36 years', '30 years'],
    correctAnswer: 0,
    solution: '16 × 19 − 15 × 18 = 304 − 270 = 34 years.',
    topic: 'Averages'
  },
  {
    id: 83,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    questionNumber: 83,
    questionText: 'Two towns 300 km apart. Cars start at 60 km/h and 40 km/h towards each other. Meeting time?',
    options: ['3 hours', '2.5 hours', '3.5 hours', '4 hours'],
    correctAnswer: 0,
    solution: 'Relative speed = 100 km/h. Time = 300 / 100 = 3 hours.',
    topic: 'Speed & Distance'
  },
  {
    id: 84,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    questionNumber: 84,
    questionText: 'Sum under Simple Interest doubles in 8 years. Annual interest rate?',
    options: ['12.5%', '10%', '15%', '8%'],
    correctAnswer: 0,
    solution: 'R = 100 / 8 = 12.5%.',
    topic: 'Simple Interest'
  },
  {
    id: 85,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    questionNumber: 85,
    questionText: 'Income ratio A:B = 4:5, Expenditure ratio = 3:4. Each saves ₹ 5,000. A\'s income?',
    options: ['₹ 20,000', '₹ 25,000', '₹ 18,000', '₹ 22,000'],
    correctAnswer: 0,
    solution: '16x − 20000 = 15x − 15000 ⇒ x = 5000. A\'s income = 4x = ₹ 20,000.',
    topic: 'Ratios'
  },
  {
    id: 86,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    questionNumber: 86,
    questionText: 'Voter list 5,000 voters. Candidate A gets 60% valid votes. 20% invalid. Candidate A votes?',
    options: ['2,400', '2,500', '3,000', '2,000'],
    correctAnswer: 0,
    solution: 'Valid = 4,000. Candidate A = 60% of 4,000 = 2,400.',
    topic: 'Percentages'
  },
  {
    id: 87,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    questionNumber: 87,
    questionText: '12 men or 18 women finish work in 14 days. Days taken by 8 men and 16 women?',
    options: ['9 days', '10 days', '8 days', '12 days'],
    correctAnswer: 0,
    solution: '1M = 1.5W ⇒ 8M + 16W = 28W. D = (18 × 14)/28 = 9 days.',
    topic: 'Time & Work'
  },
  {
    id: 88,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    questionNumber: 88,
    questionText: 'Total combined points accumulated by all 4 teams in round-robin league?',
    options: ['15', '18', '16', '14'],
    correctAnswer: 0,
    solution: '7 + 4 + 3 + 1 = 15 points.',
    topic: 'Tournament Logic'
  },
  {
    id: 89,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    questionNumber: 89,
    questionText: `Parajumble:\n1. Qualitative research focuses on human narrative.\n2. Quantitative seeks empirical patterns.\n3. Combining both via mixed-methods.\n4. Each paradigm has distinct strengths.`,
    options: ['4213', '1234', '2143', '3412'],
    correctAnswer: 0,
    solution: '4 (paradigms intro), 2 (quant), 1 (qual), 3 (mixed methods synthesis) = 4213.',
    topic: 'Parajumbles'
  },
  {
    id: 90,
    section: 'data-analysis',
    sectionName: 'Data Analysis & Sufficiency',
    questionNumber: 90,
    questionText: 'Total matches played in 4-team round-robin tournament?',
    options: ['6', '8', '12', '4'],
    correctAnswer: 0,
    solution: '⁴C₂ = (4 × 3)/2 = 6 matches.',
    topic: 'Combinatorics'
  },

  // =========================================================================
  // SECTION IV: MATHEMATICAL SKILLS (30 Qs | Q91 - Q120)
  // =========================================================================
  {
    id: 91,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 91,
    questionText: 'A car travels 120 km at 60 km/h and returns at 40 km/h. Find average speed for round trip.',
    options: ['48 km/h', '50 km/h', '45 km/h', '52 km/h'],
    correctAnswer: 0,
    solution: 'Avg Speed = 2xy / (x+y) = 2(60)(40)/100 = 48 km/h.',
    topic: 'Speed & Distance'
  },
  {
    id: 92,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 92,
    questionText: 'A can do a work in 12 days, B in 15 days. Working together for 4 days, what fraction of work remains?',
    options: ['2/5', '1/5', '3/5', '4/15'],
    correctAnswer: 0,
    solution: 'Work done in 4 days = 4(1/12 + 1/15) = 3/5. Remaining = 2/5.',
    topic: 'Time & Work'
  },
  {
    id: 93,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 93,
    questionText: 'Difference between CI and SI on a sum for 2 years at 10% p.a. is ₹ 150. Find the sum.',
    options: ['₹ 15,000', '₹ 10,000', '₹ 12,000', '₹ 20,000'],
    correctAnswer: 0,
    solution: 'P(R/100)² = 150 ⇒ P(1/100) = 150 ⇒ P = ₹ 15,000.',
    topic: 'Interest'
  },
  {
    id: 94,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 94,
    questionText: 'Merchant marks up goods by 40% and offers 20% discount. Find net profit percentage.',
    options: ['12%', '20%', '15%', '8%'],
    correctAnswer: 0,
    solution: 'SP = 140 × 0.80 = 112. Profit = 12%.',
    topic: 'Profit & Loss'
  },
  {
    id: 95,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 95,
    questionText: 'Price of sugar rises by 25%. By what percentage must consumption decrease to keep expenditure unchanged?',
    options: ['20%', '25%', '16.66%', '30%'],
    correctAnswer: 0,
    solution: '(25 / 125) × 100 = 20%.',
    topic: 'Percentages'
  },
  {
    id: 96,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 96,
    questionText: 'If A : B = 3 : 4 and B : C = 5 : 6, find ratio A : C.',
    options: ['5 : 8', '15 : 24', '8 : 15', '1 : 2'],
    correctAnswer: 0,
    solution: '(3/4) × (5/6) = 15/24 = 5/8.',
    topic: 'Ratios'
  },
  {
    id: 97,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 97,
    questionText: 'Solve for x: log₂(x) + log₂(x − 2) = 3.',
    options: ['4', '2', '6', '8'],
    correctAnswer: 0,
    solution: 'x(x − 2) = 8 ⇒ x² − 2x − 8 = 0 ⇒ x = 4.',
    topic: 'Logarithms'
  },
  {
    id: 98,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 98,
    questionText: 'Find roots of quadratic equation: x² − 9x + 20 = 0.',
    options: ['4, 5', '−4, −5', '2, 10', '3, 6'],
    correctAnswer: 0,
    solution: '(x − 4)(x − 5) = 0 ⇒ x = 4, 5.',
    topic: 'Quadratic Equations'
  },
  {
    id: 99,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 99,
    questionText: 'Sum of first 20 terms of AP: 5, 8, 11, 14 ... is:',
    options: ['670', '650', '700', '720'],
    correctAnswer: 0,
    solution: 'S = (20/2)[2(5) + 19(3)] = 10[10 + 57] = 670.',
    topic: 'Progressions'
  },
  {
    id: 100,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 100,
    questionText: 'Sides of a triangle are 8 cm, 15 cm, 17 cm. What type of triangle is it?',
    options: ['Right-angled', 'Acute-angled', 'Obtuse-angled', 'Isosceles'],
    correctAnswer: 0,
    solution: '8² + 15² = 64 + 225 = 289 = 17² (Right-angled).',
    topic: 'Geometry'
  },
  {
    id: 101,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 101,
    questionText: 'Cylinder has radius 7 cm, height 10 cm. Find Curved Surface Area (π = 22/7).',
    options: ['440 cm²', '1540 cm²', '220 cm²', '880 cm²'],
    correctAnswer: 0,
    solution: '2πrh = 2 × (22/7) × 7 × 10 = 440 cm².',
    topic: 'Mensuration'
  },
  {
    id: 102,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 102,
    questionText: 'In how many ways can 5 boys and 3 girls sit in a row so no two girls sit together?',
    options: ['14,400', '7,200', '2,880', '40,320'],
    correctAnswer: 0,
    solution: 'Boys 5! = 120. Girls in 6 gaps ⁶P₃ = 120. Total = 120 × 120 = 14,400.',
    topic: 'Permutations'
  },
  {
    id: 103,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 103,
    questionText: 'Two unbiased dice are thrown. Probability that sum of numbers is a prime number?',
    options: ['5/12', '15/36', '7/18', '1/2'],
    correctAnswer: 0,
    solution: '15 prime sum pairs / 36 total outcomes = 5/12.',
    topic: 'Probability'
  },
  {
    id: 104,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 104,
    questionText: 'Find unit digit of 7¹⁰⁵.',
    options: ['7', '9', '3', '1'],
    correctAnswer: 0,
    solution: '105 mod 4 = 1 ⇒ 7¹ = 7.',
    topic: 'Number Systems'
  },
  {
    id: 105,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 105,
    questionText: 'Pipe A fills a tank in 15 hrs, Pipe B in 20 hrs. Opened together, time to fill tank?',
    options: ['60/7 hrs', '35/3 hrs', '8 hrs', '7 hrs'],
    correctAnswer: 0,
    solution: 'Rate = 1/15 + 1/20 = 7/60 tank/hr. Time = 60/7 hrs.',
    topic: 'Pipes & Cisterns'
  },
  {
    id: 106,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 106,
    questionText: 'If x + (1/x) = 4, find value of x³ + (1/x³).',
    options: ['52', '64', '48', '56'],
    correctAnswer: 0,
    solution: '4³ − 3(4) = 64 − 12 = 52.',
    topic: 'Algebra'
  },
  {
    id: 107,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 107,
    questionText: 'Minimum value of quadratic expression f(x) = 2x² − 8x + 11 is:',
    options: ['3', '2', '4', '5'],
    correctAnswer: 0,
    solution: 'Vertex x = 2. f(2) = 2(4) − 16 + 11 = 3.',
    topic: 'Quadratics'
  },
  {
    id: 108,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 108,
    questionText: '3rd and 7th terms of AP are 11 and 27. Find 11th term.',
    options: ['43', '41', '45', '39'],
    correctAnswer: 0,
    solution: 'd = 4, a = 3. T11 = 3 + 10(4) = 43.',
    topic: 'AP'
  },
  {
    id: 109,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 109,
    questionText: 'Number of integral solutions for inequality |x − 3| ≤ 5:',
    options: ['11', '10', '12', '9'],
    correctAnswer: 0,
    solution: '−2 ≤ x ≤ 8 (11 integers).',
    topic: 'Inequalities'
  },
  {
    id: 110,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 110,
    questionText: 'If a and b are roots of x² − 5x + 6 = 0, find a² + b².',
    options: ['13', '25', '19', '31'],
    correctAnswer: 0,
    solution: 'Roots 2, 3. a² + b² = 4 + 9 = 13.',
    topic: 'Quadratics'
  },
  {
    id: 111,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 111,
    questionText: 'Circle inscribed in equilateral triangle of side 12 cm. Area of circle in sq cm?',
    options: ['12π', '16π', '9π', '24π'],
    correctAnswer: 0,
    solution: 'r = 2√3 cm. Area = π(12) = 12π.',
    topic: 'Geometry'
  },
  {
    id: 112,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 112,
    questionText: 'Rectangular box dimensions 3 cm, 4 cm, 12 cm. Length of longest internal diagonal?',
    options: ['13 cm', '12 cm', '14 cm', '15 cm'],
    correctAnswer: 0,
    solution: '√(9 + 16 + 144) = √169 = 13 cm.',
    topic: 'Mensuration'
  },
  {
    id: 113,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 113,
    questionText: 'Triangle ABC: AB=8 cm, BC=10 cm, AC=12 cm. Median AD to BC length?',
    options: ['√79 cm', '√71 cm', '7 cm', '8 cm'],
    correctAnswer: 0,
    solution: '8² + 12² = 2(AD² + 25) ⇒ 104 = AD² + 25 ⇒ AD = √79 cm.',
    topic: 'Geometry'
  },
  {
    id: 114,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 114,
    questionText: 'Diagonal of square is 10√2 cm. Find its perimeter.',
    options: ['40 cm', '20 cm', '40√2 cm', '50 cm'],
    correctAnswer: 0,
    solution: 'Side = 10 cm. Perimeter = 40 cm.',
    topic: 'Mensuration'
  },
  {
    id: 115,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 115,
    questionText: 'Cylinder radius 7 cm, height 10 cm melted into spheres radius 3.5 cm. Number of full spheres?',
    options: ['8', '6', '10', '12'],
    correctAnswer: 0,
    solution: '490π / 57.167π ≈ 8.57 ⇒ 8 full spheres.',
    topic: 'Mensuration'
  },
  {
    id: 116,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 116,
    questionText: 'Distinct 4-digit numbers using digits 1, 2, 3, 4, 5 without repetition divisible by 5?',
    options: ['24', '120', '48', '12'],
    correctAnswer: 0,
    solution: 'Ending in 5: ⁴P₃ = 24.',
    topic: 'Combinatorics'
  },
  {
    id: 117,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 117,
    questionText: 'Sum of infinite GP first term 12, common ratio 1/3:',
    options: ['18', '16', '24', '12'],
    correctAnswer: 0,
    solution: '12 / (1 − 1/3) = 18.',
    topic: 'GP'
  },
  {
    id: 118,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 118,
    questionText: 'Solve for x: 2^(x+2) + 2^x = 40.',
    options: ['3', '4', '2', '5'],
    correctAnswer: 0,
    solution: '2^x(5) = 40 ⇒ 2^x = 8 ⇒ x = 3.',
    topic: 'Algebra'
  },
  {
    id: 119,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 119,
    questionText: 'Value of log₃(81) + log₂(32) = ?',
    options: ['9', '8', '7', '10'],
    correctAnswer: 0,
    solution: '4 + 5 = 9.',
    topic: 'Logarithms'
  },
  {
    id: 120,
    section: 'math-skills',
    sectionName: 'Mathematical Skills',
    questionNumber: 120,
    questionText: 'Distance between points (2, 3) and (5, 7):',
    options: ['5', '6', '7', '4'],
    correctAnswer: 0,
    solution: '√(3² + 4²) = 5.',
    topic: 'Coordinate Geometry'
  },

  // =========================================================================
  // SECTION V: ECONOMIC AND BUSINESS ENVIRONMENT (30 Qs | Q121 - Q150)
  // =========================================================================
  {
    id: 121,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 121,
    questionText: 'Which Indian state is home to Kaziranga National Park, famous for one-horned rhinoceroses?',
    options: ['Assam', 'West Bengal', 'Odisha', 'Uttarakhand'],
    correctAnswer: 0,
    solution: 'Kaziranga National Park is located in Assam.',
    topic: 'Indian Geography & Heritage'
  },
  {
    id: 122,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 122,
    questionText: 'Who among the following is the Governor of Reserve Bank of India (RBI)?',
    options: ['Shaktikanta Das', 'Urjit Patel', 'Raghuram Rajan', 'Nirmala Sitharaman'],
    correctAnswer: 0,
    solution: 'Shaktikanta Das is the Governor of the Reserve Bank of India.',
    topic: 'Banking & Financial Leaders'
  },
  {
    id: 123,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 123,
    questionText: 'What is the capital city of Australia?',
    options: ['Canberra', 'Sydney', 'Melbourne', 'Brisbane'],
    correctAnswer: 0,
    solution: 'Canberra is the capital city of Australia.',
    topic: 'World Geography'
  },
  {
    id: 124,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 124,
    questionText: "Which international organization publishes annual 'World Economic Outlook' report?",
    options: ['International Monetary Fund (IMF)', 'World Bank', 'World Trade Organization (WTO)', 'WEF'],
    correctAnswer: 0,
    solution: 'The World Economic Outlook report is published by the IMF.',
    topic: 'Global Economic Institutions'
  },
  {
    id: 125,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 125,
    questionText: 'Headquarters of UNESCO is located in:',
    options: ['Paris, France', 'Geneva, Switzerland', 'New York, USA', 'Vienna, Austria'],
    correctAnswer: 0,
    solution: 'UNESCO headquarters is located in Paris, France.',
    topic: 'International Organizations'
  },
  {
    id: 126,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 126,
    questionText: 'Which Indian Space Mission successfully landed near Lunar South Pole?',
    options: ['Chandrayaan-3', 'Chandrayaan-2', 'Mangalyaan', 'Aditya-L1'],
    correctAnswer: 0,
    solution: 'Chandrayaan-3 made a historic soft landing near the lunar south pole.',
    topic: 'Science & Technology'
  },
  {
    id: 127,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 127,
    questionText: 'Currency of Japan is:',
    options: ['Yen', 'Yuan', 'Won', 'Ringgit'],
    correctAnswer: 0,
    solution: 'The official currency of Japan is the Yen (¥).',
    topic: 'Currencies'
  },
  {
    id: 128,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 128,
    questionText: 'Article of Indian Constitution guaranteeing Right to Equality before Law:',
    options: ['Article 14', 'Article 19', 'Article 21', 'Article 32'],
    correctAnswer: 0,
    solution: 'Article 14 guarantees equality before the law and equal protection of the laws.',
    topic: 'Indian Polity'
  },
  {
    id: 129,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 129,
    questionText: "Term 'Bull and Bear' is associated with which financial sector?",
    options: ['Stock Market', 'Commercial Banking', 'Real Estate', 'Insurance'],
    correctAnswer: 0,
    solution: 'Bull and Bear describe upward and downward market trends in stock markets.',
    topic: 'Financial Markets'
  },
  {
    id: 130,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 130,
    questionText: 'Primary greenhouse gas responsible for global warming:',
    options: ['Carbon Dioxide (CO₂)', 'Oxygen (O₂)', 'Nitrogen (N₂)', 'Argon (Ar)'],
    correctAnswer: 0,
    solution: 'Carbon Dioxide (CO₂) is the primary greenhouse gas emitted through human activities.',
    topic: 'Environment & Climate'
  },
  {
    id: 131,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 131,
    questionText: "Full form of 'UPI' in digital payments:",
    options: [
      'Unified Payments Interface',
      'Universal Payment Integration',
      'United Payment Instrument',
      'Unified Payment Infrastructure'
    ],
    correctAnswer: 0,
    solution: 'UPI stands for Unified Payments Interface.',
    topic: 'FinTech & Banking'
  },
  {
    id: 132,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 132,
    questionText: "Chemical compound name for 'Baking Soda':",
    options: ['Sodium Bicarbonate', 'Sodium Carbonate', 'Sodium Chloride', 'Calcium Carbonate'],
    correctAnswer: 0,
    solution: 'Baking soda is Sodium Bicarbonate (NaHCO₃).',
    topic: 'General Science'
  },
  {
    id: 133,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 133,
    questionText: 'Smallest continent in world by land area:',
    options: ['Australia', 'Europe', 'Antarctica', 'South America'],
    correctAnswer: 0,
    solution: 'Australia is the smallest continent by land area.',
    topic: 'World Geography'
  },
  {
    id: 134,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 134,
    questionText: 'Tropic of Cancer does NOT pass through which Indian state?',
    options: ['Odisha', 'Rajasthan', 'Gujarat', 'Madhya Pradesh'],
    correctAnswer: 0,
    solution: 'The Tropic of Cancer passes through 8 Indian states; it does NOT pass through Odisha.',
    topic: 'Indian Geography'
  },
  {
    id: 135,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 135,
    questionText: "What does 'MVP' stand for in lean startup methodology?",
    options: ['Minimum Viable Product', 'Most Valuable Product', 'Maximum Viable Plan', 'Minimum Value Process'],
    correctAnswer: 0,
    solution: 'MVP stands for Minimum Viable Product.',
    topic: 'Startup Ecosystem'
  },
  {
    id: 136,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 136,
    questionText: 'An individual investing personal capital into early-stage startups for equity is called a:',
    options: ['Angel Investor', 'Commercial Banker', 'Venture Debt Provider', 'Stock Broker'],
    correctAnswer: 0,
    solution: 'High-net-worth individuals investing early-stage equity capital are Angel Investors.',
    topic: 'Venture Capital & Startups'
  },
  {
    id: 137,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 137,
    questionText: "Changing a startup's business model direction based on market feedback is called:",
    options: ['Pivoting', 'Bootstrapping', 'Scaling', 'Incubating'],
    correctAnswer: 0,
    solution: 'Pivoting refers to shifting strategy or target market based on validated customer feedback.',
    topic: 'Startup Terminology'
  },
  {
    id: 138,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 138,
    questionText: 'Funding a startup using solely personal savings and operating revenues is called:',
    options: ['Bootstrapping', 'Crowdfunding', 'Venture Capital', 'IPO Financing'],
    correctAnswer: 0,
    solution: 'Bootstrapping refers to self-funding without external institutional capital.',
    topic: 'Startup Terminology'
  },
  {
    id: 139,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 139,
    questionText: 'Organization offering startups shared office space, mentoring, and support is an:',
    options: ['Incubator', 'Commercial Bank', 'Stock Exchange', 'Trade Union'],
    correctAnswer: 0,
    solution: 'A startup Incubator provides workspace, advisory, and seed support.',
    topic: 'Startup Ecosystem'
  },
  {
    id: 140,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 140,
    questionText: 'Privately held startup company valued at over $1 Billion is termed a:',
    options: ['Unicorn', 'Decacorn', 'Blue Chip', 'Dragon'],
    correctAnswer: 0,
    solution: 'A Unicorn is a private startup valued at $1 Billion or more.',
    topic: 'Business Valuation'
  },
  {
    id: 141,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 141,
    questionText: 'Raising capital from a large crowd via online platforms is known as:',
    options: ['Crowdfunding', 'Venture Capital', 'Private Equity', 'Bank Loan'],
    correctAnswer: 0,
    solution: 'Crowdfunding collects capital from a large group of individuals online.',
    topic: 'Financing Methods'
  },
  {
    id: 142,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 142,
    questionText: 'Which government scheme was launched in India to foster startup culture?',
    options: ['Startup India', 'Make in India', 'Digital India', 'Skill India'],
    correctAnswer: 0,
    solution: 'Startup India was launched as a flagship initiative to nurture entrepreneurship.',
    topic: 'Government Initiatives'
  },
  {
    id: 143,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 143,
    questionText: "What does 'CAC' stand for in startup unit economics?",
    options: [
      'Customer Acquisition Cost',
      'Capital Asset Costs',
      'Customer Allowance Code',
      'Corporate Audit Charge'
    ],
    correctAnswer: 0,
    solution: 'CAC represents Customer Acquisition Cost.',
    topic: 'Unit Economics'
  },
  {
    id: 144,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 144,
    questionText: "What is 'LTV' in business metric context?",
    options: [
      'Lifetime Value of a Customer',
      'Long Term Venture',
      'Loan To Value Ratio',
      'Liquid Tax Volume'
    ],
    correctAnswer: 0,
    solution: 'LTV represents the Customer Lifetime Value.',
    topic: 'Unit Economics'
  },
  {
    id: 145,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 145,
    questionText: 'Legal protection granted to an inventor for an exclusive right to an invention is a:',
    options: ['Patent', 'Trademark', 'Copyright', 'Trade Secret'],
    correctAnswer: 0,
    solution: 'A patent grants exclusive intellectual property rights for a novel invention.',
    topic: 'Intellectual Property'
  },
  {
    id: 146,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 146,
    questionText: 'The rate at which a venture spends cash reserves before generating positive cash flow is:',
    options: ['Burn Rate', 'Turnover Rate', 'Inflation Rate', 'Discount Rate'],
    correctAnswer: 0,
    solution: 'Burn Rate is the pace at which a startup spends its cash balance.',
    topic: 'Corporate Finance'
  },
  {
    id: 147,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 147,
    questionText: 'Matrix tool used to evaluate Strengths, Weaknesses, Opportunities, and Threats:',
    options: ['SWOT Analysis', 'PESTLE Analysis', 'BCG Matrix', 'Ansoff Matrix'],
    correctAnswer: 0,
    solution: 'SWOT Analysis evaluates Strengths, Weaknesses, Opportunities, and Threats.',
    topic: 'Strategic Management'
  },
  {
    id: 148,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 148,
    questionText: 'A succinct 30-to-60 second persuasive pitch of a business idea to an investor is an:',
    options: ['Elevator Pitch', 'Executive Summary', 'Audit Prospectus', 'Term Sheet'],
    correctAnswer: 0,
    solution: 'An Elevator Pitch is a quick, compelling 30-60 second summary.',
    topic: 'Business Communication'
  },
  {
    id: 149,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 149,
    questionText: 'A non-binding agreement outlining basic terms and conditions of an investment is a:',
    options: ['Term Sheet', 'Tax Invoice', 'Salary Slip', 'Passbook'],
    correctAnswer: 0,
    solution: 'A Term Sheet sets preliminary parameters before formal legal contracts.',
    topic: 'Venture Capital'
  },
  {
    id: 150,
    section: 'economic-environment',
    sectionName: 'Economic & Business Environment',
    questionNumber: 150,
    questionText: 'Nodal Agency for Startup India initiative under Ministry of Commerce is:',
    options: ['DPIIT', 'NITI Aayog', 'RBI', 'SEBI'],
    correctAnswer: 0,
    solution: 'DPIIT (Department for Promotion of Industry and Internal Trade) is the nodal agency.',
    topic: 'Government Ministries'
  }
];
