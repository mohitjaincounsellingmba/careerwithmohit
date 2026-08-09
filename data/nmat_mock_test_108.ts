export interface NmatQuestion {
  id: number;
  section: 'language' | 'quant' | 'logic';
  sectionName: string;
  passageTitle?: string;
  passageText?: string;
  scenarioTitle?: string;
  scenarioText?: string;
  dataTable?: { headers: string[]; rows: (string | number)[][] };
  questionNumber: number;
  questionText: string;
  options: string[];
  correctAnswer: number; // 0-indexed (0 for A, 1 for B, 2 for C, 3 for D)
  solution: string;
  topic?: string;
}

export const NMAT_MOCK_TEST_108: NmatQuestion[] = [
  // =========================================================================
  // SECTION I: LANGUAGE SKILLS (36 Questions | 28 Minutes) (Q1 - Q36)
  // =========================================================================

  // Part A: Reading Comprehension (Q1 - Q8)
  // Passage 1: Global Supply Chains & Resilience (Q1 - Q4)
  {
    id: 1,
    section: 'language',
    sectionName: 'Language Skills',
    passageTitle: 'Passage 1: Global Supply Chains & Resilience (Q1 - Q4)',
    passageText: `The vulnerability of hyper-globalized supply chains has been starkly revealed by recent geopolitical disruptions and climate-induced extreme weather events. For decades, multinational corporations prioritized efficiency over resilience, adopting 'just-in-time' inventory models to minimize capital tied up in warehousing. While this strategy dramatically reduced operational overhead during periods of macroeconomic stability, it left global manufacturing networks fragile and highly sensitive to single-point failures. Today, a paradigm shift is underway toward 'just-in-case' buffer management, nearshoring, and friend-shoring. By diversifying supplier bases and relocating production hubs closer to end-consumer markets, companies aim to build adaptive supply networks capable of absorbing systemic shocks.`,
    questionNumber: 1,
    questionText: "What was the main drawback of the 'just-in-time' inventory model during disruptions?",
    options: [
      'It created excessive warehousing costs.',
      'It made supply chains fragile and vulnerable to single-point failures.',
      'It forced companies to adopt friend-shoring prematurely.',
      'It increased operational overheads during macro stability.'
    ],
    correctAnswer: 1,
    solution: 'Para 1 explicitly mentions that while JIT models minimized capital tied up in warehousing, they left global manufacturing networks fragile and highly sensitive to single-point failures.',
    topic: 'Reading Comprehension - Factual Detail'
  },
  {
    id: 2,
    section: 'language',
    sectionName: 'Language Skills',
    passageTitle: 'Passage 1: Global Supply Chains & Resilience (Q1 - Q4)',
    passageText: `The vulnerability of hyper-globalized supply chains has been starkly revealed by recent geopolitical disruptions and climate-induced extreme weather events. For decades, multinational corporations prioritized efficiency over resilience, adopting 'just-in-time' inventory models to minimize capital tied up in warehousing. While this strategy dramatically reduced operational overhead during periods of macroeconomic stability, it left global manufacturing networks fragile and highly sensitive to single-point failures. Today, a paradigm shift is underway toward 'just-in-case' buffer management, nearshoring, and friend-shoring. By diversifying supplier bases and relocating production hubs closer to end-consumer markets, companies aim to build adaptive supply networks capable of absorbing systemic shocks.`,
    questionNumber: 2,
    questionText: "According to the passage, 'nearshoring' involves:",
    options: [
      'Eliminating all physical warehousing facilities globally.',
      'Relocating production hubs closer to target end-consumer markets.',
      'Relying exclusively on single-source foreign suppliers.',
      'Maximizing capital tied up in long-distance shipping routes.'
    ],
    correctAnswer: 1,
    solution: "The passage defines nearshoring and related strategies as relocating production hubs closer to end-consumer markets to reduce transit lead times and mitigate geopolitical exposure.",
    topic: 'Reading Comprehension - Concept Definition'
  },
  {
    id: 3,
    section: 'language',
    sectionName: 'Language Skills',
    passageTitle: 'Passage 1: Global Supply Chains & Resilience (Q1 - Q4)',
    passageText: `The vulnerability of hyper-globalized supply chains has been starkly revealed by recent geopolitical disruptions and climate-induced extreme weather events. For decades, multinational corporations prioritized efficiency over resilience, adopting 'just-in-time' inventory models to minimize capital tied up in warehousing. While this strategy dramatically reduced operational overhead during periods of macroeconomic stability, it left global manufacturing networks fragile and highly sensitive to single-point failures. Today, a paradigm shift is underway toward 'just-in-case' buffer management, nearshoring, and friend-shoring. By diversifying supplier bases and relocating production hubs closer to end-consumer markets, companies aim to build adaptive supply networks capable of absorbing systemic shocks.`,
    questionNumber: 3,
    questionText: "The primary motive behind corporate adoption of 'just-in-time' models was:",
    options: [
      'Minimizing capital tied up in warehousing efficiency.',
      'Enhancing environmental sustainability in shipping.',
      'Expanding manufacturing facilities into developing nations.',
      'Mitigating geopolitical conflict risks.'
    ],
    correctAnswer: 0,
    solution: "The text states corporations adopted 'just-in-time' models to minimize capital tied up in warehousing and reduce operational overhead during periods of economic stability.",
    topic: 'Reading Comprehension - Motive & Purpose'
  },
  {
    id: 4,
    section: 'language',
    sectionName: 'Language Skills',
    passageTitle: 'Passage 1: Global Supply Chains & Resilience (Q1 - Q4)',
    passageText: `The vulnerability of hyper-globalized supply chains has been starkly revealed by recent geopolitical disruptions and climate-induced extreme weather events. For decades, multinational corporations prioritized efficiency over resilience, adopting 'just-in-time' inventory models to minimize capital tied up in warehousing. While this strategy dramatically reduced operational overhead during periods of macroeconomic stability, it left global manufacturing networks fragile and highly sensitive to single-point failures. Today, a paradigm shift is underway toward 'just-in-case' buffer management, nearshoring, and friend-shoring. By diversifying supplier bases and relocating production hubs closer to end-consumer markets, companies aim to build adaptive supply networks capable of absorbing systemic shocks.`,
    questionNumber: 4,
    questionText: "The author's primary objective in this passage is to:",
    options: [
      'Advocate for the immediate dissolution of global corporate trade.',
      'Trace the strategic evolution from efficiency-first to resilience-focused supply chain models.',
      'Criticize nearshoring as an economically viable business decision.',
      'Compare shipping costs across different transport modes.'
    ],
    correctAnswer: 1,
    solution: "The author outlines the shift in supply chain philosophy from historical efficiency-focused models ('just-in-time') to modern resilience-focused models ('just-in-case', nearshoring).",
    topic: 'Reading Comprehension - Main Idea & Author Objective'
  },

  // Passage 2: Digital Currency & Monetary Policy (Q5 - Q8)
  {
    id: 5,
    section: 'language',
    sectionName: 'Language Skills',
    passageTitle: 'Passage 2: Digital Currency & Monetary Policy (Q5 - Q8)',
    passageText: `Central Bank Digital Currencies (CBDCs) represent a fundamental re-architecture of sovereign monetary systems. Unlike decentralized cryptocurrencies, CBDCs are digital liabilities issued directly by central monetary authorities, offering retail users legal tender status in electronic form. Proponents emphasize that sovereign digital currencies enhance financial inclusion, reduce physical cash printing overheads, and enable real-time cross-border settlements. Conversely, commercial banking institutions express concern that direct public CBDC accounts could trigger disintermediation—where depositors shift funds from commercial bank accounts to risk-free central bank wallets during periods of financial stress, thereby eroding commercial credit creation capacity.`,
    questionNumber: 5,
    questionText: 'How do CBDCs fundamentally differ from cryptocurrencies?',
    options: [
      'CBDCs carry legal tender status issued directly by central authorities.',
      'Cryptocurrencies are backed by physical gold reserves.',
      'CBDCs operate without any ledger accounting mechanisms.',
      'Cryptocurrencies prevent real-time cross-border settlements.'
    ],
    correctAnswer: 0,
    solution: 'The passage explicitly clarifies that CBDCs are sovereign liabilities issued directly by central banks with legal tender status, unlike decentralized cryptocurrencies.',
    topic: 'Reading Comprehension - Contrast & Detail'
  },
  {
    id: 6,
    section: 'language',
    sectionName: 'Language Skills',
    passageTitle: 'Passage 2: Digital Currency & Monetary Policy (Q5 - Q8)',
    passageText: `Central Bank Digital Currencies (CBDCs) represent a fundamental re-architecture of sovereign monetary systems. Unlike decentralized cryptocurrencies, CBDCs are digital liabilities issued directly by central monetary authorities, offering retail users legal tender status in electronic form. Proponents emphasize that sovereign digital currencies enhance financial inclusion, reduce physical cash printing overheads, and enable real-time cross-border settlements. Conversely, commercial banking institutions express concern that direct public CBDC accounts could trigger disintermediation—where depositors shift funds from commercial bank accounts to risk-free central bank wallets during periods of financial stress, thereby eroding commercial credit creation capacity.`,
    questionNumber: 6,
    questionText: 'Commercial banks worry about CBDCs primarily because:',
    options: [
      'Physical cash production costs will increase significantly.',
      'Depositor flight to central bank wallets could diminish commercial bank credit creation.',
      'Central banks will eliminate all digital payments completely.',
      'Retail users lack access to smartphones and electronic devices.'
    ],
    correctAnswer: 1,
    solution: 'Commercial banks fear disintermediation, where retail depositors move funds to risk-free central bank accounts during economic stress, draining commercial deposits and reducing credit creation capacity.',
    topic: 'Reading Comprehension - Critical Implications'
  },
  {
    id: 7,
    section: 'language',
    sectionName: 'Language Skills',
    passageTitle: 'Passage 2: Digital Currency & Monetary Policy (Q5 - Q8)',
    passageText: `Central Bank Digital Currencies (CBDCs) represent a fundamental re-architecture of sovereign monetary systems. Unlike decentralized cryptocurrencies, CBDCs are digital liabilities issued directly by central monetary authorities, offering retail users legal tender status in electronic form. Proponents emphasize that sovereign digital currencies enhance financial inclusion, reduce physical cash printing overheads, and enable real-time cross-border settlements. Conversely, commercial banking institutions express concern that direct public CBDC accounts could trigger disintermediation—where depositors shift funds from commercial bank accounts to risk-free central bank wallets during periods of financial stress, thereby eroding commercial credit creation capacity.`,
    questionNumber: 7,
    questionText: 'Which benefit of CBDCs is explicitly mentioned in the text?',
    options: [
      'Absolute anonymity in all financial transactions.',
      'Elimination of central bank interest rate policies.',
      'Facilitation of real-time cross-border settlements.',
      'Automatic cancellation of public national debt.'
    ],
    correctAnswer: 2,
    solution: 'The passage lists three specific benefits: enhancing financial inclusion, reducing cash printing overheads, and enabling real-time cross-border settlements.',
    topic: 'Reading Comprehension - Fact Retrieval'
  },
  {
    id: 8,
    section: 'language',
    sectionName: 'Language Skills',
    passageTitle: 'Passage 2: Digital Currency & Monetary Policy (Q5 - Q8)',
    passageText: `Central Bank Digital Currencies (CBDCs) represent a fundamental re-architecture of sovereign monetary systems. Unlike decentralized cryptocurrencies, CBDCs are digital liabilities issued directly by central monetary authorities, offering retail users legal tender status in electronic form. Proponents emphasize that sovereign digital currencies enhance financial inclusion, reduce physical cash printing overheads, and enable real-time cross-border settlements. Conversely, commercial banking institutions express concern that direct public CBDC accounts could trigger disintermediation—where depositors shift funds from commercial bank accounts to risk-free central bank wallets during periods of financial stress, thereby eroding commercial credit creation capacity.`,
    questionNumber: 8,
    questionText: "The term 'disintermediation' in the passage refers to:",
    options: [
      'Bypassing commercial banks by moving funds directly to central bank accounts.',
      'Eliminating central banks from national financial systems.',
      'Converting foreign currency into domestic paper currency.',
      'Increasing transaction fees on credit card networks.'
    ],
    correctAnswer: 0,
    solution: "Disintermediation refers to the removal of intermediaries (commercial banks) when depositors bypass them and hold accounts directly with the central bank.",
    topic: 'Reading Comprehension - Contextual Terminology'
  },

  // Part B: Vocabulary & Analogies (Q9 - Q18)
  {
    id: 9,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 9,
    questionText: 'Choose the synonym for EPHEMERAL:',
    options: ['Permanent', 'Transient', 'Substantial', 'Eternal'],
    correctAnswer: 1,
    solution: 'Ephemeral means lasting for a very short time; transient is its exact synonym. (Permanent and Eternal are antonyms).',
    topic: 'Vocabulary - Synonyms'
  },
  {
    id: 10,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 10,
    questionText: 'Choose the antonym for PRUDENT:',
    options: ['Reckless', 'Cautious', 'Judicious', 'Sagacious'],
    correctAnswer: 0,
    solution: 'Prudent means acting with or showing care and thought for the future. Its direct antonym is Reckless (careless, rash).',
    topic: 'Vocabulary - Antonyms'
  },
  {
    id: 11,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 11,
    questionText: 'Choose the word closest in meaning to LACONIC:',
    options: ['Verbose', 'Concise', 'Eloquent', 'Garrulous'],
    correctAnswer: 1,
    solution: 'Laconic means using very few words to express complex ideas. Concise is the synonym. Verbose and Garrulous mean wordy/talkative.',
    topic: 'Vocabulary - Synonyms'
  },
  {
    id: 12,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 12,
    questionText: 'Choose the word opposite in meaning to AMELIORATE:',
    options: ['Worsen', 'Enhance', 'Mitigate', 'Refine'],
    correctAnswer: 0,
    solution: 'Ameliorate means to make something bad or unsatisfactory better. Its antonym is Worsen.',
    topic: 'Vocabulary - Antonyms'
  },
  {
    id: 13,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 13,
    questionText: 'Complete Analogy: ARCHITECT : BUILDING :: SCULPTOR : ?',
    options: ['Canvas', 'Statue', 'Chisel', 'Museum'],
    correctAnswer: 1,
    solution: 'Relationship: Creator to Creation. An architect designs a building; a sculptor creates a statue.',
    topic: 'Vocabulary - Word Analogies'
  },
  {
    id: 14,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 14,
    questionText: 'Complete Analogy: METAPHOR : FIGURATIVE :: FACT : ?',
    options: ['Literal', 'Fiction', 'Ambiguous', 'Symbolic'],
    correctAnswer: 0,
    solution: 'Relationship: Concept to its defining characteristic. A metaphor is figurative; a fact is literal.',
    topic: 'Vocabulary - Word Analogies'
  },
  {
    id: 15,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 15,
    questionText: 'Complete Analogy: CANDID : FRANK :: OBSCURE : ?',
    options: ['Clear', 'Vague', 'Famous', 'Bright'],
    correctAnswer: 1,
    solution: 'Relationship: Synonyms. Candid and Frank are synonyms; Obscure and Vague are synonyms.',
    topic: 'Vocabulary - Word Analogies'
  },
  {
    id: 16,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 16,
    questionText: 'Complete Analogy: INSOMNIA : SLEEP :: ANOREXIA : ?',
    options: ['Memory', 'Appetite', 'Vision', 'Speech'],
    correctAnswer: 1,
    solution: 'Relationship: Condition characterized by loss of something. Insomnia is the inability/loss of sleep; Anorexia is the loss of appetite.',
    topic: 'Vocabulary - Word Analogies'
  },
  {
    id: 17,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 17,
    questionText: 'Choose the synonym for EQUANIMITY:',
    options: ['Agitation', 'Composure', 'Inequality', 'Fear'],
    correctAnswer: 1,
    solution: 'Equanimity means mental calmness, composure, and evenness of temper, especially in a difficult situation.',
    topic: 'Vocabulary - Synonyms'
  },
  {
    id: 18,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 18,
    questionText: 'Choose the antonym for FASTIDIOUS:',
    options: ['Meticulous', 'Careless', 'Critical', 'Particular'],
    correctAnswer: 1,
    solution: 'Fastidious means very attentive to and concerned about accuracy and detail. The opposite is Careless.',
    topic: 'Vocabulary - Antonyms'
  },

  // Part C: Sentence Correction & Completion (Q19 - Q28)
  {
    id: 19,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 19,
    questionText: 'Identify the grammatically correct sentence:',
    options: [
      'Neither the manager nor the employees was present at the meeting.',
      'Neither the manager nor the employees were present at the meeting.',
      'Neither the manager or the employees were present at the meeting.',
      'Neither the manager nor the employees has been present at meeting.'
    ],
    correctAnswer: 1,
    solution: "Rule of proximity for correlative conjunctions 'neither... nor': when subjects differ in number, the verb agrees with the subject closer to it ('employees' is plural, so 'were' is correct).",
    topic: 'Grammar - Subject-Verb Agreement'
  },
  {
    id: 20,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 20,
    questionText: 'Select the correct preposition: "The CEO insisted _____ reviewing the quarterly performance reports personally."',
    options: ['at', 'on', 'for', 'with'],
    correctAnswer: 1,
    solution: "The verb 'insist' takes the fixed preposition 'on' followed by a gerund ('insisted on reviewing').",
    topic: 'Grammar - Prepositions'
  },
  {
    id: 21,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 21,
    questionText: 'Correct the underlined part: "If I was the CFO of the firm, I would allocate more capital to R&D."',
    options: ['was', 'am', 'were', 'have been'],
    correctAnswer: 2,
    solution: "In hypothetical, contrary-to-fact conditional clauses (subjunctive mood), 'were' is used for all persons ('If I were the CFO...').",
    topic: 'Grammar - Subjunctive Mood'
  },
  {
    id: 22,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 22,
    questionText: 'Choose the appropriate option: "The committee has not yet agreed _____ a single candidate for the post."',
    options: ['upon', 'to', 'with', 'for'],
    correctAnswer: 0,
    solution: "Idiomatic usage: people agree 'with' a person, agree 'to' a proposal, but agree 'on/upon' a matter, decision, or candidate.",
    topic: 'Grammar - Idiomatic Prepositions'
  },
  {
    id: 23,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 23,
    questionText: 'Identify the sentence with proper parallel structure:',
    options: [
      'She likes reading research papers, writing analysis, and to present findings.',
      'She likes reading research papers, writing analysis, and presenting findings.',
      'She likes to read research papers, writing analysis, and present findings.',
      'She likes reading research papers, to write analysis, and presenting findings.'
    ],
    correctAnswer: 1,
    solution: 'Parallelism requires all items in the series to share the same grammatical form (reading..., writing..., presenting...).',
    topic: 'Grammar - Parallel Construction'
  },
  {
    id: 24,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 24,
    questionText: 'Fill in the blank: "Notwithstanding the severe headwinds, the enterprise posted _____ profits this quarter."',
    options: ['dismal', 'robust', 'negligible', 'volatile'],
    correctAnswer: 1,
    solution: "'Notwithstanding' indicates a contrast. Despite the severe headwinds, the enterprise produced strong ('robust') profits.",
    topic: 'Sentence Completion - Contextual Fillers'
  },
  {
    id: 25,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 25,
    questionText: 'Choose the correct word: "The negotiator\'s _____ strategy successfully de-escalated the trade conflict."',
    options: ['conciliatory', 'belligerent', 'dogmatic', 'hostile'],
    correctAnswer: 0,
    solution: "'Conciliatory' means intended or likely to placate or pacify, which explains how the negotiator successfully de-escalated the conflict.",
    topic: 'Sentence Completion - Vocabulary in Context'
  },
  {
    id: 26,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 26,
    questionText: 'Identify the grammatically correct usage:',
    options: [
      'Scarcely had the announcement been made than the stock prices tumbled.',
      'Scarcely had the announcement been made when the stock prices tumbled.',
      'Scarcely had the announcement made when the stock prices tumbled.',
      'Scarcely had the announcement been made then the stock prices tumbled.'
    ],
    correctAnswer: 1,
    solution: "Correlative pair rule: 'Scarcely/Hardly... when' (whereas 'No sooner... than' is paired with than).",
    topic: 'Grammar - Conjunction Pairs'
  },
  {
    id: 27,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 27,
    questionText: 'Fill in the blanks: "His _____ response to the critical audit report indicated that he was totally _____ about the findings."',
    options: [
      'indifferent ... unconcerned',
      'passionate ... aloof',
      'energetic ... indifferent',
      'hostile ... empathetic'
    ],
    correctAnswer: 0,
    solution: "Both blanks require words reflecting a similar non-reactive attitude: an 'indifferent' response shows he was 'unconcerned'.",
    topic: 'Sentence Completion - Double Blanks'
  },
  {
    id: 28,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 28,
    questionText: 'Correct sentence structure: "The new regulatory framework affects not only financial institutions _____ FinTech startups."',
    options: ['and also', 'but also', 'as well as', 'in addition to'],
    correctAnswer: 1,
    solution: "Correlative conjunction pair rule: 'not only... but also...'.",
    topic: 'Grammar - Correlative Conjunctions'
  },

  // Part D: Para Jumbles & Ordering (Q29 - Q36)
  {
    id: 29,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 29,
    questionText: `Arrange sentences A-D in coherent order:\n\nA. This algorithmic shift ensures that users receive personalized content streams.\nB. Social media networks have increasingly integrated machine learning recommendation systems.\nC. However, it also creates filter bubbles that reinforce existing ideological biases.\nD. These models analyze user interaction history to predict future content preferences.`,
    options: ['BDAC', 'BADC', 'DBAC', 'ABDC'],
    correctAnswer: 0,
    solution: "Coherent sequence is BDAC:\n• B introduces the broad topic (ML recommendation systems).\n• D explains how 'these models' work.\n• A states the positive result of 'this algorithmic shift'.\n• C provides the contrasting negative consequence ('However, it also creates filter bubbles...').",
    topic: 'Para Jumbles - Logical Sequence'
  },
  {
    id: 30,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 30,
    questionText: `Arrange sentences A-D in coherent order:\n\nA. Consequently, central banks raised benchmark lending rates to curb price pressures.\nB. Post-pandemic supply disruptions led to widespread global inflationary spikes.\nC. This monetary tightening subsequently cooled housing market transactions globally.\nD. Higher borrowing costs diminished consumer spending power across key sectors.`,
    options: ['BADC', 'BACD', 'ABCD', 'BDAC'],
    correctAnswer: 0,
    solution: "Coherent sequence is BADC:\n• B states the initial cause (inflationary spikes).\n• A describes the central bank response ('Consequently, central banks raised benchmark rates...').\n• D describes the effect on consumers ('Higher borrowing costs...').\n• C delivers the concluding macroeconomic impact on housing.",
    topic: 'Para Jumbles - Logical Sequence'
  },
  {
    id: 31,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 31,
    questionText: `Arrange sentences A-D in coherent order:\n\nA. Renewable energy costs have fallen dramatically over the past decade.\nB. Solar and wind infrastructure is now cheaper than fossil fuel generation in many regions.\nC. Despite these cost reductions, battery storage integration remains a critical bottleneck.\nD. Grid stability requires reliable energy storage to manage intermittent power generation.`,
    options: ['ABCD', 'BACD', 'ABDC', 'ACBD'],
    correctAnswer: 2,
    solution: "Coherent sequence is ABDC:\n• A opens with falling renewable costs.\n• B provides specific evidence (cheaper than fossil fuels).\n• D introduces the grid stability and storage requirement.\n• C contrasts with the current storage bottleneck.",
    topic: 'Para Jumbles - Logical Sequence'
  },
  {
    id: 32,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 32,
    questionText: `Arrange sentences A-D in coherent order:\n\nA. Electric vehicle adoption depends heavily on charging infrastructure density.\nB. Range anxiety remains a principal barrier for prospective automobile buyers.\nC. Governments are therefore subsidizing rapid-charging station installation along major corridors.\nD. Robust public charging networks alleviate consumer fears regarding battery depletion.`,
    options: ['BADC', 'ABDC', 'BACD', 'CADB'],
    correctAnswer: 2,
    solution: "Coherent sequence is BACD:\n• B establishes the core problem (range anxiety).\n• A links this barrier to charging infrastructure density.\n• C explains the policy response (government subsidies for rapid chargers).\n• D concludes with the outcome (alleviating consumer fears).",
    topic: 'Para Jumbles - Logical Sequence'
  },
  {
    id: 33,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 33,
    questionText: `Arrange sentences A-D in coherent order:\n\nA. Employee retention has become a major challenge for modern technology enterprises.\nB. Competitive salary packages alone no longer guarantee long-term worker loyalty.\nC. Today's workforce prioritizes flexible work arrangements, professional growth, and inclusive culture.\nD. Organizations must therefore overhaul human resource strategies to foster holistic engagement.`,
    options: ['ABCD', 'BACD', 'ACBD', 'ADBC'],
    correctAnswer: 0,
    solution: "Coherent sequence is ABCD:\n• A defines the overarching challenge (employee retention).\n• B explains why traditional solutions (salary) are insufficient.\n• C outlines what modern workers actually value.\n• D concludes with the strategic recommendation ('must therefore overhaul...').",
    topic: 'Para Jumbles - Logical Sequence'
  },
  {
    id: 34,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 34,
    questionText: `Arrange sentences A-D in coherent order:\n\nA. Venture capital investment in early-stage startups experienced a sharp contraction last year.\nB. Investors shifted focus from rapid user growth to sustainable unit economics.\nC. Consequently, founders were forced to extend cash runways and reduce burn rates.\nD. Valuation multiples fell significantly across tech sectors during this funding winter.`,
    options: ['ABDC', 'ADBC', 'BACD', 'ACBD'],
    correctAnswer: 0,
    solution: "Coherent sequence is ABDC:\n• A introduces the macroeconomic trend (VC contraction).\n• B explains the change in investor mindset.\n• D describes the market consequence (falling valuation multiples).\n• C gives the operational reaction by founders ('Consequently, founders were forced...').",
    topic: 'Para Jumbles - Logical Sequence'
  },
  {
    id: 35,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 35,
    questionText: `Arrange sentences A-D in coherent order:\n\nA. Corporate governance frameworks set rules regarding board accountability and transparency.\nB. Effective oversight protects shareholder value and deters executive misconduct.\nC. Independent directors play a critical role in evaluating managerial performance objectively.\nD. Strong internal controls thus minimize operational risks and preserve investor trust.`,
    options: ['ABCD', 'ACBD', 'BACD', 'ADBC'],
    correctAnswer: 1,
    solution: "Coherent sequence is ACBD:\n• A introduces corporate governance frameworks.\n• C specifies the key mechanism (independent directors).\n• B explains the objective of effective oversight.\n• D provides the conclusive summary ('thus minimize operational risks...').",
    topic: 'Para Jumbles - Logical Sequence'
  },
  {
    id: 36,
    section: 'language',
    sectionName: 'Language Skills',
    questionNumber: 36,
    questionText: `Arrange sentences A-D in coherent order:\n\nA. E-commerce platforms leverage big data analytics to customize marketing campaigns.\nB. Analyzing browsing history allows platforms to suggest relevant product cross-sells.\nC. This targeted advertising strategy drives significantly higher conversion rates.\nD. However, consumer privacy concerns over data tracking have sparked legislative scrutiny.`,
    options: ['ABCD', 'BACD', 'ABDC', 'ACBD'],
    correctAnswer: 3,
    solution: "Coherent sequence is ACBD (or ABCD):\n• A introduces big data in e-commerce.\n• C describes the effectiveness of this targeted strategy.\n• B details the specific mechanism (browsing history analysis).\n• D presents the counter-balancing privacy concern ('However, consumer privacy...').",
    topic: 'Para Jumbles - Logical Sequence'
  },

  // =========================================================================
  // SECTION II: QUANTITATIVE SKILLS (36 Questions | 52 Minutes) (Q37 - Q72)
  // =========================================================================

  // Part A: Arithmetic & Commercial Math (Q37 - Q48)
  {
    id: 37,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 37,
    questionText: 'A shopkeeper marks up an item by 40% above CP and offers a 20% discount. If the profit earned is ₹ 240, find CP.',
    options: ['₹ 2,000', '₹ 1,800', '₹ 2,400', '₹ 1,500'],
    correctAnswer: 0,
    solution: 'Let CP = x.\nMP = 1.40x.\nSP = 1.40x × (1 − 0.20) = 1.40x × 0.80 = 1.12x.\nProfit = SP − CP = 1.12x − x = 0.12x = 240.\nx = 240 / 0.12 = ₹ 2,000.',
    topic: 'Arithmetic - Profit, Loss & Discount'
  },
  {
    id: 38,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 38,
    questionText: 'A train 180 m long crosses a platform 220 m long in 20 seconds. What is the speed of the train in km/h?',
    options: ['72 km/h', '54 km/h', '90 km/h', '60 km/h'],
    correctAnswer: 0,
    solution: 'Total Distance = Length of Train + Length of Platform = 180 + 220 = 400 m.\nSpeed in m/s = Distance / Time = 400 / 20 = 20 m/s.\nSpeed in km/h = 20 × (18 / 5) = 72 km/h.',
    topic: 'Arithmetic - Speed, Time & Distance'
  },
  {
    id: 39,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 39,
    questionText: 'A sum compounded annually at 10% per annum grows to ₹ 14,520 in 2 years. Find the initial sum.',
    options: ['₹ 12,000', '₹ 11,500', '₹ 12,500', '₹ 10,000'],
    correctAnswer: 0,
    solution: 'Formula: A = P(1 + r/100)ⁿ\n14,520 = P(1 + 10/100)² = P(1.1)² = 1.21 P\nP = 14,520 / 1.21 = ₹ 12,000.',
    topic: 'Arithmetic - Compound Interest'
  },
  {
    id: 40,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 40,
    questionText: 'Pipe A fills a tank in 15 hrs, Pipe B fills in 20 hrs. Opened together, how long will they take to fill the tank?',
    options: ['60/7 hrs', '35/3 hrs', '8 hrs', '7 hrs'],
    correctAnswer: 0,
    solution: 'Rate of A = 1/15, Rate of B = 1/20.\nCombined Rate = 1/15 + 1/20 = (4 + 3)/60 = 7/60 tank/hr.\nTotal Time = 1 / (7/60) = 60/7 hours (≈ 8.57 hours).',
    topic: 'Arithmetic - Pipes & Cisterns'
  },
  {
    id: 41,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 41,
    questionText: 'In a mixture of 60 liters, the ratio of milk to water is 2 : 1. How much water must be added to make ratio 1 : 2?',
    options: ['60 liters', '40 liters', '30 liters', '50 liters'],
    correctAnswer: 0,
    solution: 'Initial mixture (60 L):\n• Milk = (2/3) × 60 = 40 L\n• Water = (1/3) × 60 = 20 L\nLet added water be w. New ratio: 40 / (20 + w) = 1/2\n⇒ 80 = 20 + w ⇒ w = 60 liters.',
    topic: 'Arithmetic - Mixtures & Alligations'
  },
  {
    id: 42,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 42,
    questionText: 'A, B, and C can complete a job in 10, 12, and 15 days respectively. Working together, in how many days is work done?',
    options: ['4 days', '5 days', '3.5 days', '4.5 days'],
    correctAnswer: 0,
    solution: 'Combined 1-day work = 1/10 + 1/12 + 1/15 = (6 + 5 + 4)/60 = 15/60 = 1/4.\nTotal days required = 4 days.',
    topic: 'Arithmetic - Time & Work'
  },
  {
    id: 43,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 43,
    questionText: "The average age of 15 students is 18 years. If the teacher's age is included, average increases by 1 yr. Teacher's age?",
    options: ['34 years', '32 years', '36 years', '30 years'],
    correctAnswer: 0,
    solution: 'Total age of 15 students = 15 × 18 = 270 years.\nNew average of 16 people = 19 years.\nTotal age of 16 people = 16 × 19 = 304 years.\nTeacher\'s age = 304 − 270 = 34 years.',
    topic: 'Arithmetic - Averages'
  },
  {
    id: 44,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 44,
    questionText: 'Two cars start towards each other from towns 300 km apart at speeds of 60 km/h and 40 km/h. When do they meet?',
    options: ['3 hours', '2.5 hours', '3.5 hours', '4 hours'],
    correctAnswer: 0,
    solution: 'Relative Speed = 60 + 40 = 100 km/h.\nTime to meet = Distance / Relative Speed = 300 / 100 = 3 hours.',
    topic: 'Arithmetic - Relative Speed'
  },
  {
    id: 45,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 45,
    questionText: 'A sum under Simple Interest doubles in 8 years. What is the annual rate of interest?',
    options: ['12.5%', '10%', '15%', '8%'],
    correctAnswer: 0,
    solution: 'Doubling means SI = P.\nP = (P × R × 8) / 100 ⇒ R = 100 / 8 = 12.5% per annum.',
    topic: 'Arithmetic - Simple Interest'
  },
  {
    id: 46,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 46,
    questionText: 'The ratio of income of A to B is 4 : 5 and their expenditure ratio is 3 : 4. If each saves ₹ 5,000, find A\'s income.',
    options: ['₹ 20,000', '₹ 25,000', '₹ 18,000', '₹ 22,000'],
    correctAnswer: 0,
    solution: 'Let incomes be 4x and 5x.\n(4x − 5000) / (5x − 5000) = 3/4\n⇒ 16x − 20,000 = 15x − 15,000 ⇒ x = 5,000.\nA\'s income = 4x = 4 × 5,000 = ₹ 20,000.',
    topic: 'Arithmetic - Ratios & Proportions'
  },
  {
    id: 47,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 47,
    questionText: "A voter list contains 5,000 voters. Candidate A gets 60% of valid votes. 20% votes invalid. Candidate A's votes?",
    options: ['2,400', '2,500', '3,000', '2,000'],
    correctAnswer: 0,
    solution: 'Valid votes = 5,000 × (1 − 0.20) = 4,000.\nCandidate A\'s votes = 60% of 4,000 = 0.60 × 4,000 = 2,400.',
    topic: 'Arithmetic - Percentages'
  },
  {
    id: 48,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 48,
    questionText: 'If 12 men or 18 women can finish a piece of work in 14 days, in how many days can 8 men and 16 women do it?',
    options: ['9 days', '10 days', '8 days', '12 days'],
    correctAnswer: 0,
    solution: 'Work rate equivalence: 12 Men = 18 Women ⇒ 1 Man = 1.5 Women.\n8 Men + 16 Women = (8 × 1.5) + 16 = 12 + 16 = 28 Women.\nUsing M₁D₁ = M₂D₂: 18 × 14 = 28 × D ⇒ D = (18 × 14) / 28 = 9 days.',
    topic: 'Arithmetic - Men-Days Work Equivalence'
  },

  // Part B: Data Interpretation & Data Sufficiency (Q49 - Q56)
  {
    id: 49,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    scenarioTitle: 'Data Set (Q49 - Q52): Product Sales Performance',
    scenarioText: 'The table below shows annual sales revenue (₹ in Lakhs) of 4 product lines (P, Q, R, S) across 3 years:',
    dataTable: {
      headers: ['Product Line', '2023', '2024', '2025'],
      rows: [
        ['Product P', 150, 180, 225],
        ['Product Q', 200, 220, 242],
        ['Product R', 100, 130, 169],
        ['Product S', 250, 275, 300]
      ]
    },
    questionNumber: 49,
    questionText: 'Which product line recorded the highest percentage growth in sales revenue between 2023 and 2025?',
    options: ['Product P', 'Product Q', 'Product R', 'Product S'],
    correctAnswer: 2,
    solution: 'Percentage growth from 2023 to 2025:\n• Product P: (225 − 150)/150 = 75/150 = 50.0%\n• Product Q: (242 − 200)/200 = 42/200 = 21.0%\n• Product R: (169 − 100)/100 = 69/100 = 69.0%\n• Product S: (300 − 250)/250 = 50/250 = 20.0%\nProduct R recorded the highest percentage growth at 69.0%.',
    topic: 'Data Interpretation - Percentage Growth'
  },
  {
    id: 50,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    scenarioTitle: 'Data Set (Q49 - Q52): Product Sales Performance',
    scenarioText: 'The table below shows annual sales revenue (₹ in Lakhs) of 4 product lines (P, Q, R, S) across 3 years:',
    dataTable: {
      headers: ['Product Line', '2023', '2024', '2025'],
      rows: [
        ['Product P', 150, 180, 225],
        ['Product Q', 200, 220, 242],
        ['Product R', 100, 130, 169],
        ['Product S', 250, 275, 300]
      ]
    },
    questionNumber: 50,
    questionText: 'What is the total sales revenue (₹ in Lakhs) generated across all 4 product lines in 2024?',
    options: ['805', '800', '815', '790'],
    correctAnswer: 0,
    solution: 'Total 2024 Revenue = 180 + 220 + 130 + 275 = ₹ 805 Lakhs.',
    topic: 'Data Interpretation - Summation & Table Reading'
  },
  {
    id: 51,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    scenarioTitle: 'Data Set (Q49 - Q52): Product Sales Performance',
    scenarioText: 'The table below shows annual sales revenue (₹ in Lakhs) of 4 product lines (P, Q, R, S) across 3 years:',
    dataTable: {
      headers: ['Product Line', '2023', '2024', '2025'],
      rows: [
        ['Product P', 150, 180, 225],
        ['Product Q', 200, 220, 242],
        ['Product R', 100, 130, 169],
        ['Product S', 250, 275, 300]
      ]
    },
    questionNumber: 51,
    questionText: "What is the ratio of Product P's sales in 2023 to Product S's sales in 2025?",
    options: ['1 : 2', '3 : 4', '2 : 3', '1 : 1'],
    correctAnswer: 0,
    solution: "Ratio = Sales of P (2023) : Sales of S (2025) = 150 : 300 = 1 : 2.",
    topic: 'Data Interpretation - Ratios'
  },
  {
    id: 52,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    scenarioTitle: 'Data Set (Q49 - Q52): Product Sales Performance',
    scenarioText: 'The table below shows annual sales revenue (₹ in Lakhs) of 4 product lines (P, Q, R, S) across 3 years:',
    dataTable: {
      headers: ['Product Line', '2023', '2024', '2025'],
      rows: [
        ['Product P', 150, 180, 225],
        ['Product Q', 200, 220, 242],
        ['Product R', 100, 130, 169],
        ['Product S', 250, 275, 300]
      ]
    },
    questionNumber: 52,
    questionText: "Product R's sales in 2025 constitute approximately what percentage of total company sales in 2025?",
    options: ['18.0%', '18.1%', '20.0%', '16.5%'],
    correctAnswer: 1,
    solution: 'Total sales in 2025 = 225 + 242 + 169 + 300 = 936 Lakhs.\nPercentage for Product R = (169 / 936) × 100 = 18.055% ≈ 18.1%.',
    topic: 'Data Interpretation - Percentage Share'
  },
  {
    id: 53,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 53,
    questionText: `Data Sufficiency: Is positive integer x even?\n\nStatement I: x + 3 is an odd integer.\nStatement II: 3x is an even integer.`,
    options: [
      'Statement I alone is sufficient.',
      'Statement II alone is sufficient.',
      'BOTH statements TOGETHER are necessary.',
      'EITHER statement ALONE is sufficient.'
    ],
    correctAnswer: 3,
    solution: '• Statement I: x + 3 = odd ⇒ x = odd − 3 = even. (Sufficient alone)\n• Statement II: 3x = even ⇒ since 3 is odd, x must be even. (Sufficient alone)\nHence, EITHER statement ALONE is sufficient.',
    topic: 'Data Sufficiency - Number Properties'
  },
  {
    id: 54,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 54,
    questionText: `Data Sufficiency: What is the value of speed of a train?\n\nStatement I: Train crosses a telegraph post in 10 seconds.\nStatement II: Length of the train is 150 meters.`,
    options: [
      'Statement I alone is sufficient.',
      'Statement II alone is sufficient.',
      'BOTH statements TOGETHER are necessary.',
      'Statements I and II together are NOT sufficient.'
    ],
    correctAnswer: 2,
    solution: 'Speed = Length of Train / Time to cross stationary point.\nStatement I gives Time = 10s (insufficient alone).\nStatement II gives Length = 150m (insufficient alone).\nCombining both gives Speed = 150 / 10 = 15 m/s. BOTH statements TOGETHER are necessary.',
    topic: 'Data Sufficiency - Speed & Distance'
  },
  {
    id: 55,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 55,
    questionText: `Data Sufficiency: What is the area of rectangle ABCD?\n\nStatement I: Diagonal of rectangle is 10 cm.\nStatement II: Perimeter of rectangle is 28 cm.`,
    options: [
      'Statement I alone is sufficient.',
      'Statement II alone is sufficient.',
      'BOTH statements TOGETHER are necessary.',
      'EITHER statement ALONE is sufficient.'
    ],
    correctAnswer: 2,
    solution: '• From Statement I: l² + w² = 10² = 100.\n• From Statement II: 2(l + w) = 28 ⇒ l + w = 14.\nUsing identity (l + w)² = l² + w² + 2lw ⇒ 14² = 100 + 2lw ⇒ 196 − 100 = 2lw ⇒ 2lw = 96 ⇒ Area lw = 48 cm².\nBOTH statements TOGETHER are necessary.',
    topic: 'Data Sufficiency - Geometry & Mensuration'
  },
  {
    id: 56,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 56,
    questionText: `Data Sufficiency: Is a > b?\n\nStatement I: a − b > 0.\nStatement II: a² > b².`,
    options: [
      'Statement I alone is sufficient.',
      'Statement II alone is sufficient.',
      'BOTH statements TOGETHER are necessary.',
      'Statements I and II together are NOT sufficient.'
    ],
    correctAnswer: 0,
    solution: '• Statement I: a − b > 0 ⇒ a > b. This directly answers the question affirmatively. (Sufficient alone)\n• Statement II: a² > b² could mean a = −5, b = 2 where a² > b² but a < b. (Insufficient alone)\nTherefore, Statement I alone is sufficient.',
    topic: 'Data Sufficiency - Inequalities'
  },

  // Part C: Algebra, Geometry & Modern Math (Q57 - Q72)
  {
    id: 57,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 57,
    questionText: 'Solve for x: 2^(x+2) + 2^x = 40.',
    options: ['3', '4', '2', '5'],
    correctAnswer: 0,
    solution: '2^x × 2² + 2^x = 40 ⇒ 2^x (4 + 1) = 40 ⇒ 5 × 2^x = 40 ⇒ 2^x = 8 ⇒ x = 3.',
    topic: 'Algebra - Exponents & Indices'
  },
  {
    id: 58,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 58,
    questionText: 'If a + b = 8 and ab = 15, find a² + b².',
    options: ['34', '49', '30', '28'],
    correctAnswer: 0,
    solution: 'a² + b² = (a + b)² − 2ab = 8² − 2(15) = 64 − 30 = 34.',
    topic: 'Algebra - Identities'
  },
  {
    id: 59,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 59,
    questionText: 'Find roots of the quadratic equation: x² − 7x + 12 = 0.',
    options: ['3, 4', '−3, −4', '2, 5', '1, 6'],
    correctAnswer: 0,
    solution: 'x² − 3x − 4x + 12 = 0 ⇒ (x − 3)(x − 4) = 0 ⇒ x = 3, 4.',
    topic: 'Algebra - Quadratic Equations'
  },
  {
    id: 60,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 60,
    questionText: 'Value of log₃(81) + log₂(32) = ?',
    options: ['9', '8', '7', '10'],
    correctAnswer: 0,
    solution: 'log₃(81) = log₃(3⁴) = 4.\nlog₂(32) = log₂(2⁵) = 5.\nSum = 4 + 5 = 9.',
    topic: 'Algebra - Logarithms'
  },
  {
    id: 61,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 61,
    questionText: 'Sum of first 20 terms of AP: 5, 9, 13, 17 ... is:',
    options: ['860', '800', '900', '830'],
    correctAnswer: 0,
    solution: 'First term a = 5, common difference d = 4, n = 20.\nS₂₀ = (n/2)[2a + (n − 1)d] = (20/2)[2(5) + 19(4)] = 10[10 + 76] = 10(86) = 860.',
    topic: 'Algebra - Arithmetic Progressions'
  },
  {
    id: 62,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 62,
    questionText: 'In a right triangle, base = 6 cm, height = 8 cm. Find hypotenuse length.',
    options: ['10 cm', '12 cm', '14 cm', '9 cm'],
    correctAnswer: 0,
    solution: 'Hypotenuse h = √(base² + height²) = √(6² + 8²) = √(36 + 64) = √100 = 10 cm.',
    topic: 'Geometry - Pythagoras Theorem'
  },
  {
    id: 63,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 63,
    questionText: 'Area of a circle is 154 cm². Find its circumference (Use π = 22/7).',
    options: ['44 cm', '22 cm', '88 cm', '66 cm'],
    correctAnswer: 0,
    solution: 'Area = π r² = 154 ⇒ (22/7) r² = 154 ⇒ r² = 49 ⇒ r = 7 cm.\nCircumference = 2πr = 2 × (22/7) × 7 = 44 cm.',
    topic: 'Geometry - Circles & Mensuration'
  },
  {
    id: 64,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 64,
    questionText: 'Find volume of a cylinder with radius 7 cm and height 10 cm.',
    options: ['1,540 cm³', '1,450 cm³', '1,200 cm³', '1,600 cm³'],
    correctAnswer: 0,
    solution: 'Volume = π r² h = (22/7) × 7² × 10 = (22/7) × 49 × 10 = 22 × 7 × 10 = 1,540 cm³.',
    topic: 'Mensuration - 3D Solids'
  },
  {
    id: 65,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 65,
    questionText: 'In how many ways can 5 distinct books be arranged on a shelf?',
    options: ['120', '60', '24', '720'],
    correctAnswer: 0,
    solution: 'Number of arrangements = 5! = 5 × 4 × 3 × 2 × 1 = 120 ways.',
    topic: 'Modern Math - Permutations'
  },
  {
    id: 66,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 66,
    questionText: 'Value of ⁷C₃ is:',
    options: ['35', '21', '42', '30'],
    correctAnswer: 0,
    solution: '⁷C₃ = (7 × 6 × 5) / (3 × 2 × 1) = 210 / 6 = 35.',
    topic: 'Modern Math - Combinations'
  },
  {
    id: 67,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 67,
    questionText: 'Probability of drawing an Ace from a well-shuffled standard deck of 52 cards:',
    options: ['1/13', '1/52', '1/4', '4/13'],
    correctAnswer: 0,
    solution: 'Total cards = 52. Number of Aces = 4.\nProbability = 4 / 52 = 1 / 13.',
    topic: 'Modern Math - Probability'
  },
  {
    id: 68,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 68,
    questionText: 'Two dice are rolled. Probability that the sum of face numbers is 7:',
    options: ['1/6', '1/12', '5/36', '1/4'],
    correctAnswer: 0,
    solution: 'Total outcomes = 6 × 6 = 36.\nFavorable pairs with sum 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 pairs.\nProbability = 6 / 36 = 1/6.',
    topic: 'Modern Math - Probability'
  },
  {
    id: 69,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 69,
    questionText: 'Find common ratio of GP: 3, 6, 12, 24 ...',
    options: ['2', '3', '0.5', '4'],
    correctAnswer: 0,
    solution: 'Common ratio r = 6 / 3 = 12 / 6 = 2.',
    topic: 'Algebra - Geometric Progressions'
  },
  {
    id: 70,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 70,
    questionText: 'Perimeter of a square is 48 cm. Find its area.',
    options: ['144 cm²', '121 cm²', '169 cm²', '100 cm²'],
    correctAnswer: 0,
    solution: 'Side of square s = 48 / 4 = 12 cm.\nArea = s² = 12² = 144 cm².',
    topic: 'Geometry - Quadrilaterals'
  },
  {
    id: 71,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 71,
    questionText: 'Solve inequality: 3x − 5 < 10.',
    options: ['x < 5', 'x > 5', 'x < 3', 'x < 15'],
    correctAnswer: 0,
    solution: '3x − 5 < 10 ⇒ 3x < 15 ⇒ x < 5.',
    topic: 'Algebra - Inequalities'
  },
  {
    id: 72,
    section: 'quant',
    sectionName: 'Quantitative Skills',
    questionNumber: 72,
    questionText: 'Distance between points (2, 3) and (5, 7) in Cartesian plane:',
    options: ['5', '6', '7', '4'],
    correctAnswer: 0,
    solution: 'Distance d = √[(x₂ − x₁)² + (y₂ − y₁)²] = √[(5 − 2)² + (7 − 3)²] = √(3² + 4²) = √(9 + 16) = √25 = 5.',
    topic: 'Geometry - Coordinate Geometry'
  },

  // =========================================================================
  // SECTION III: LOGICAL REASONING (36 Questions | 40 Minutes) (Q73 - Q108)
  // =========================================================================

  // Part A: Verbal Reasoning & Critical Thinking (Q73 - Q84)
  {
    id: 73,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 73,
    questionText: `Statement: "The municipal corporation advised city residents to boil drinking water for the next three days due to pipeline contamination."\n\nAssumption I: Most residents will follow municipal advice.\nAssumption II: Pipeline repair work will be completed within three days.`,
    options: [
      'Only Assumption I is implicit.',
      'Only Assumption II is implicit.',
      'BOTH Assumptions I and II are implicit.',
      'NEITHER Assumption is implicit.'
    ],
    correctAnswer: 2,
    solution: 'Both assumptions are implicit: the authority issues advice assuming the public will heed it (I), and specifies three days assuming the problem will be rectified in that timeframe (II).',
    topic: 'Critical Reasoning - Statement & Assumptions'
  },
  {
    id: 74,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 74,
    questionText: `Statement: "Should all public transport vehicles in major metropolitan cities be converted to electric power?"\n\nArgument I: Yes, it will drastically reduce urban vehicular air pollution.\nArgument II: No, the initial capital required for charging grid infrastructure is immense.`,
    options: [
      'Only Argument I is strong.',
      'Only Argument II is strong.',
      'BOTH Arguments I and II are strong.',
      'NEITHER Argument is strong.'
    ],
    correctAnswer: 2,
    solution: 'Both arguments present valid, substantive points: environmental public health (I) and real economic/fiscal constraints (II). Both are strong.',
    topic: 'Critical Reasoning - Statement & Arguments'
  },
  {
    id: 75,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 75,
    questionText: `Statement: "Heavy rainfall caused severe waterlogging across several low-lying suburban residential sectors."\n\nCourse of Action I: Emergency civic teams should be deployed immediately with de-watering pumps.\nCourse of Action II: Residents should be advised to remain indoors unless necessary.`,
    options: [
      'Only Course I follows.',
      'Only Course II follows.',
      'BOTH Courses I and II follow.',
      'NEITHER Course follows.'
    ],
    correctAnswer: 2,
    solution: 'Both actions are logical, feasible, and directly address the problem: de-watering addresses root flooding, while staying indoors prevents citizen distress.',
    topic: 'Critical Reasoning - Course of Action'
  },
  {
    id: 76,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 76,
    questionText: `Critical Reasoning (Strengthen): A corporate survey shows that flexible remote work options increased employee satisfaction by 25%. Management concludes remote work improves productivity. Which statement STRENGTHENS this conclusion?`,
    options: [
      'Satisfied employees at the firm completed projects 15% faster with fewer errors.',
      'Internet connectivity costs increased for remote workers.',
      'Office space leasing costs remained unchanged over the period.',
      'Managers spent more time organizing online alignment meetings.'
    ],
    correctAnswer: 0,
    solution: 'Option A provides direct empirical evidence linking high employee satisfaction to measurable gains in speed and accuracy (productivity).',
    topic: 'Critical Reasoning - Strengthen Argument'
  },
  {
    id: 77,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 77,
    questionText: `Critical Reasoning (Weaken): "City X introduced higher parking fees downtown to reduce traffic congestion. Traffic congestion levels remained unchanged after six months." Which statement explains this outcome?`,
    options: [
      'Public transit fares were increased simultaneously, driving commuters back to private vehicles.',
      'Parking fee collectors received salary raises.',
      'City X\'s population grew by 1% annually.',
      'Neighboring City Y reduced its downtown parking fees.'
    ],
    correctAnswer: 0,
    solution: 'Option A provides an external confounding factor: a simultaneous hike in public transit fares nullified the incentive to switch away from personal vehicles.',
    topic: 'Critical Reasoning - Resolve Paradox / Weaken'
  },
  {
    id: 78,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 78,
    questionText: `Statement: "All managers are leaders. Some leaders are innovators."\n\nConclusion I: Some managers are innovators.\nConclusion II: All leaders are managers.`,
    options: [
      'Only Conclusion I follows.',
      'Only Conclusion II follows.',
      'NEITHER Conclusion follows.',
      'BOTH Conclusions follow.'
    ],
    correctAnswer: 2,
    solution: 'Standard Syllogism: All M are L, Some L are I. The overlap between L and I does not necessarily include M. Neither conclusion follows definitively.',
    topic: 'Deductive Logic - Syllogisms'
  },
  {
    id: 79,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 79,
    questionText: `Statement: "No analyst is a gambler. All traders are gamblers."\n\nConclusion I: No analyst is a trader.\nConclusion II: Some gamblers are traders.`,
    options: [
      'Only Conclusion I follows.',
      'Only Conclusion II follows.',
      'BOTH Conclusions I and II follow.',
      'NEITHER Conclusion follows.'
    ],
    correctAnswer: 2,
    solution: '• Traders are entirely inside Gamblers. Since Analysts and Gamblers are disjoint, Analysts and Traders are disjoint (Conclusion I follows).\n• Since All Traders are Gamblers, Some Gamblers are definitely Traders (Conclusion II follows). Both follow.',
    topic: 'Deductive Logic - Syllogisms'
  },
  {
    id: 80,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 80,
    questionText: `Statement: "The university library reported a 40% decline in physical book borrowings over two years."\n\nCause & Effect Analysis: Which statement is the most probable cause?`,
    options: [
      'The university provided students free access to digital academic journal databases.',
      'The library increased its daily operating hours.',
      'Physical book printing costs increased globally.',
      'Student enrollment grew by 10% over two years.'
    ],
    correctAnswer: 0,
    solution: 'Providing students with convenient, ubiquitous digital academic database access directly substitutes and decreases the need for physical book checkouts.',
    topic: 'Critical Reasoning - Cause & Effect'
  },
  {
    id: 81,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 81,
    questionText: `Inference: "Company Z discontinued its budget smartphone series to focus exclusively on premium flagship models." What can be inferred?`,
    options: [
      'Company Z aims to capture higher profit margins per unit.',
      'Budget smartphones are illegal in Company Z\'s headquarters.',
      'Premium smartphones require lower manufacturing costs.',
      'Company Z will close all retail sales stores.'
    ],
    correctAnswer: 0,
    solution: 'Premium flagship devices are characterized in business strategy by higher average selling prices and superior profit margins per unit.',
    topic: 'Critical Reasoning - Inferences'
  },
  {
    id: 82,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 82,
    questionText: `Logical Consistency: "If a candidate passes the interview, they receive an offer letter. Candidate K received an offer letter."`,
    options: [
      'Candidate K passed the interview.',
      'Candidate K failed the written test.',
      'Candidate K rejected the job.',
      'Cannot be conclusively determined without additional rules.'
    ],
    correctAnswer: 0,
    solution: 'In standard entrance reasoning, receiving the offer letter affirms the prerequisite condition that candidate K cleared the selection interview.',
    topic: 'Logical Reasoning - Conditional Logic'
  },
  {
    id: 83,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 83,
    questionText: `Statement: "Should corporate firms mandate a 4-day workweek?"\n\nArgument I: Yes, employee burnout drops and productivity per hour increases.\nArgument II: No, continuous customer support sectors cannot function effectively without weekend coverage.`,
    options: [
      'Only Argument I is strong.',
      'Only Argument II is strong.',
      'BOTH Arguments I and II are strong.',
      'NEITHER Argument is strong.'
    ],
    correctAnswer: 2,
    solution: 'Both arguments cite established, compelling evidence: Argument I highlights employee mental health and output efficiency; Argument II addresses operational continuity in 24/7 service industries.',
    topic: 'Critical Reasoning - Statement & Arguments'
  },
  {
    id: 84,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 84,
    questionText: `Course of Action: "Cybersecurity breaches exposed customer data at a major online retail platform."\n\nAction I: Immediately notify affected customers and force password resets.\nAction II: Conduct an independent third-party security audit of internal IT infrastructure.`,
    options: [
      'Only Action I follows.',
      'Only Action II follows.',
      'BOTH Actions I and II follow.',
      'NEITHER Action follows.'
    ],
    correctAnswer: 2,
    solution: 'Action I limits immediate damage to affected accounts, while Action II identifies the systemic vulnerabilities to prevent future recurrence. Both follow.',
    topic: 'Critical Reasoning - Course of Action'
  },

  // Part B: Analytical Reasoning & Arrangements (Q85 - Q96)
  // Set 1 (Q85 - Q88): Circular Seating
  {
    id: 85,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    scenarioTitle: 'Set 1: Executive Circular Seating (Q85 - Q88)',
    scenarioText: `Six executives—A, B, C, D, E, F—sit around a circular table facing center.\n• A sits second to the left of D.\n• C is an immediate neighbor of both A and B.\n• F sits directly opposite B.`,
    questionNumber: 85,
    questionText: 'Who sits directly opposite D?',
    options: ['C', 'A', 'E', 'B'],
    correctAnswer: 0,
    solution: 'By deducing positions around the circle clockwise: D -> F -> E -> B -> C -> A. Directly opposite D (3 positions away) sits C.',
    topic: 'Analytical Reasoning - Circular Arrangements'
  },
  {
    id: 86,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    scenarioTitle: 'Set 1: Executive Circular Seating (Q85 - Q88)',
    scenarioText: `Six executives—A, B, C, D, E, F—sit around a circular table facing center.\n• A sits second to the left of D.\n• C is an immediate neighbor of both A and B.\n• F sits directly opposite B.`,
    questionNumber: 86,
    questionText: 'Who sits to the immediate right of A?',
    options: ['C', 'F', 'E', 'D'],
    correctAnswer: 0,
    solution: 'Facing the center, moving counter-clockwise (to the immediate right of A) brings us to C.',
    topic: 'Analytical Reasoning - Circular Arrangements'
  },
  {
    id: 87,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    scenarioTitle: 'Set 1: Executive Circular Seating (Q85 - Q88)',
    scenarioText: `Six executives—A, B, C, D, E, F—sit around a circular table facing center.\n• A sits second to the left of D.\n• C is an immediate neighbor of both A and B.\n• F sits directly opposite B.`,
    questionNumber: 87,
    questionText: 'Who sits between F and D?',
    options: ['E', 'C', 'A', 'B'],
    correctAnswer: 0,
    solution: 'In the derived circular order (D, F, E, B, C, A), E is adjacent to F (or sitting adjacent to the F-D sector).',
    topic: 'Analytical Reasoning - Circular Arrangements'
  },
  {
    id: 88,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    scenarioTitle: 'Set 1: Executive Circular Seating (Q85 - Q88)',
    scenarioText: `Six executives—A, B, C, D, E, F—sit around a circular table facing center.\n• A sits second to the left of D.\n• C is an immediate neighbor of both A and B.\n• F sits directly opposite B.`,
    questionNumber: 88,
    questionText: 'What is the position of B with respect to E?',
    options: ['Immediate left', 'Second to right', 'Directly opposite', 'Immediate right'],
    correctAnswer: 0,
    solution: 'In the clockwise sequence (... E -> B ...), facing center, B sits to the immediate left of E.',
    topic: 'Analytical Reasoning - Circular Arrangements'
  },

  // Set 2 (Q89 - Q92): Professional Departments
  {
    id: 89,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    scenarioTitle: 'Set 2: Professional Departments (Q89 - Q92)',
    scenarioText: `Five professionals—P, Q, R, S, T—belong to five distinct departments: HR, Finance, IT, Marketing, Operations.\n• P is neither in HR nor in Finance.\n• Q is in IT.\n• R is in Operations.\n• S is not in Finance.`,
    questionNumber: 89,
    questionText: 'Who belongs to the Finance department?',
    options: ['T', 'P', 'S', 'R'],
    correctAnswer: 0,
    solution: '• Q = IT, R = Operations.\n• Remaining departments: HR, Finance, Marketing.\n• P is not HR or Finance ⇒ P = Marketing.\n• S is not Finance ⇒ S = HR.\n• Therefore, T = Finance.',
    topic: 'Analytical Reasoning - Matrix Matching'
  },
  {
    id: 90,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    scenarioTitle: 'Set 2: Professional Departments (Q89 - Q92)',
    scenarioText: `Five professionals—P, Q, R, S, T—belong to five distinct departments: HR, Finance, IT, Marketing, Operations.\n• P is neither in HR nor in Finance.\n• Q is in IT.\n• R is in Operations.\n• S is not in Finance.`,
    questionNumber: 90,
    questionText: 'Which department does S belong to?',
    options: ['HR', 'Finance', 'IT', 'Operations'],
    correctAnswer: 0,
    solution: 'Since P is Marketing and T is Finance, S must belong to HR.',
    topic: 'Analytical Reasoning - Matrix Matching'
  },
  {
    id: 91,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    scenarioTitle: 'Set 2: Professional Departments (Q89 - Q92)',
    scenarioText: `Five professionals—P, Q, R, S, T—belong to five distinct departments: HR, Finance, IT, Marketing, Operations.\n• P is neither in HR nor in Finance.\n• Q is in IT.\n• R is in Operations.\n• S is not in Finance.`,
    questionNumber: 91,
    questionText: 'Which department does P belong to?',
    options: ['Marketing', 'HR', 'Finance', 'IT'],
    correctAnswer: 0,
    solution: 'P is neither HR nor Finance, and IT/Operations are occupied by Q and R. Thus, P belongs to Marketing.',
    topic: 'Analytical Reasoning - Matrix Matching'
  },
  {
    id: 92,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    scenarioTitle: 'Set 2: Professional Departments (Q89 - Q92)',
    scenarioText: `Five professionals—P, Q, R, S, T—belong to five distinct departments: HR, Finance, IT, Marketing, Operations.\n• P is neither in HR nor in Finance.\n• Q is in IT.\n• R is in Operations.\n• S is not in Finance.`,
    questionNumber: 92,
    questionText: 'Which pair correctly matches professional with department?',
    options: ['P - Marketing', 'S - Finance', 'T - Operations', 'R - HR'],
    correctAnswer: 0,
    solution: 'The valid assignment deduced is: P - Marketing, Q - IT, R - Operations, S - HR, T - Finance.',
    topic: 'Analytical Reasoning - Matrix Matching'
  },

  // Blood Relations & Directions (Q93 - Q96)
  {
    id: 93,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 93,
    questionText: 'Blood Relation: Pointing to a photograph, a man says, "His mother is the only daughter of my mother-in-law." How is the man related to the person in the photograph?',
    options: ['Father', 'Uncle', 'Brother', 'Grandfather'],
    correctAnswer: 0,
    solution: "\"Only daughter of my mother-in-law\" = the speaker's wife. If the person's mother is the speaker's wife, the man is his Father.",
    topic: 'Analytical Reasoning - Blood Relations'
  },
  {
    id: 94,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 94,
    questionText: 'Blood Relation: If A + B means A is father of B; A − B means A is sister of B; A × B means A is brother of B. Which expression shows P is uncle of Q?',
    options: ['P × R + Q', 'P + R × Q', 'P − R + Q', 'P × R − Q'],
    correctAnswer: 0,
    solution: 'In P × R + Q: P × R means P is brother of R; R + Q means R is father of Q. Therefore, P is the brother of Q\'s father, which makes P the uncle of Q.',
    topic: 'Analytical Reasoning - Coded Blood Relations'
  },
  {
    id: 95,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 95,
    questionText: 'Direction Sense: A manager walks 10 m North, turns right and walks 15 m, turns right and walks 10 m. How far and in which direction is he from his starting point?',
    options: ['15 m East', '15 m West', '10 m South', '25 m East'],
    correctAnswer: 0,
    solution: 'North (+10m) and South (−10m) cancel out. The remaining displacement is 15m East.',
    topic: 'Analytical Reasoning - Direction Sense'
  },
  {
    id: 96,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 96,
    questionText: 'Direction Sense: Starting from point X, Rahul walks 5 km South, turns left and walks 12 km. Distance from starting point X?',
    options: ['13 km', '17 km', '7 km', '15 km'],
    correctAnswer: 0,
    solution: 'Forms a right-angled triangle with legs 5 km and 12 km. Distance = √(5² + 12²) = √(25 + 144) = √169 = 13 km.',
    topic: 'Analytical Reasoning - Direction & Distance'
  },

  // Part C: Coding, Series & Input-Output (Q97 - Q108)
  {
    id: 97,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 97,
    questionText: 'If STRATEGY is coded as TUSBUFHZ in a certain code, how is FINANCE coded?',
    options: ['GJOBODF', 'GJOBOCF', 'EHMAMBD', 'GINBNDF'],
    correctAnswer: 0,
    solution: 'Pattern: Each letter is shifted +1 forward (S->T, T->U, R->S, A->B, T->U, E->F, G->H, Y->Z).\nApplying +1 to FINANCE: F->G, I->J, N->O, A->B, N->O, C->D, E->F ⇒ GJOBODF.',
    topic: 'Coding & Decoding'
  },
  {
    id: 98,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 98,
    questionText: 'In a code language, MARKET is written as TEMRAM. How is PROFIT written?',
    options: ['TIFORP', 'ITRPRO', 'PROFIT', 'ITPROF'],
    correctAnswer: 0,
    solution: 'Pattern: The letters of the word are reversed. PROFIT reversed is TIFORP.',
    topic: 'Coding & Decoding'
  },
  {
    id: 99,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 99,
    questionText: 'Complete Number Series: 4, 9, 19, 39, 79, ?',
    options: ['159', '149', '158', '160'],
    correctAnswer: 0,
    solution: 'Pattern: Each term is multiplied by 2 and increased by 1 (×2 + 1):\n• 4 × 2 + 1 = 9\n• 9 × 2 + 1 = 19\n• 19 × 2 + 1 = 39\n• 39 × 2 + 1 = 79\n• 79 × 2 + 1 = 159.',
    topic: 'Logical Series - Number Series'
  },
  {
    id: 100,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 100,
    questionText: 'Complete Letter Series: BCD, FGH, JKL, ?',
    options: ['NOP', 'MNO', 'OPQ', 'PRS'],
    correctAnswer: 0,
    solution: 'Pattern: 3 consecutive letters skipping 1 letter between clusters:\nBCD (skip E) -> FGH (skip I) -> JKL (skip M) -> NOP.',
    topic: 'Logical Series - Letter Series'
  },
  {
    id: 101,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 101,
    questionText: 'Find the odd word out:',
    options: ['Dollar', 'Euro', 'Yen', 'Ounce'],
    correctAnswer: 3,
    solution: 'Dollar, Euro, and Yen are national fiat currencies. Ounce is a unit of weight measurement.',
    topic: 'Classification - Odd Word Out'
  },
  {
    id: 102,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 102,
    questionText: 'Find the odd number out: 27, 64, 125, 144, 216',
    options: ['144', '27', '125', '216'],
    correctAnswer: 0,
    solution: '27 (3³), 64 (4³), 125 (5³), and 216 (6³) are perfect cubes. 144 is 12² (a square, not a cube of an integer).',
    topic: 'Classification - Odd Number Out'
  },

  // Machine Input-Output Rules (Q103 - Q105)
  {
    id: 103,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    scenarioTitle: 'Machine Input-Output Rules (Q103 - Q105)',
    scenarioText: `Input: 42 18 85 31 56 09\nStep I: 09 42 18 85 31 56\nStep II: 09 18 42 85 31 56\nStep III: 09 18 31 42 85 56\nStep IV: 09 18 31 42 56 85 (Final Step)`,
    questionNumber: 103,
    questionText: 'What is the logic of this machine arrangement?',
    options: [
      'Arranging numbers in ascending order from left to right, one per step.',
      'Arranging numbers in descending order.',
      'Swapping odd and even positions.',
      'Reversing digits of each number.'
    ],
    correctAnswer: 0,
    solution: 'In each step, the smallest remaining number is moved to the next leftmost position, sorting all numbers in ascending order from left to right.',
    topic: 'Analytical Reasoning - Machine Input-Output'
  },
  {
    id: 104,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    scenarioTitle: 'Machine Input-Output Rules (Q103 - Q105)',
    scenarioText: `Input: 42 18 85 31 56 09\nStep I: 09 42 18 85 31 56\nStep II: 09 18 42 85 31 56\nStep III: 09 18 31 42 85 56\nStep IV: 09 18 31 42 56 85 (Final Step)`,
    questionNumber: 104,
    questionText: 'For Input: 64 23 91 12 45, what will be Step II?',
    options: [
      '12 23 64 91 45',
      '12 64 23 91 45',
      '12 23 45 64 91',
      '23 12 64 45 91'
    ],
    correctAnswer: 0,
    solution: 'Input: 64 23 91 12 45\nStep I (smallest 12 to front): 12 64 23 91 45\nStep II (next smallest 23 to position 2): 12 23 64 91 45.',
    topic: 'Analytical Reasoning - Machine Input-Output'
  },
  {
    id: 105,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    scenarioTitle: 'Machine Input-Output Rules (Q103 - Q105)',
    scenarioText: `Input: 42 18 85 31 56 09\nStep I: 09 42 18 85 31 56\nStep II: 09 18 42 85 31 56\nStep III: 09 18 31 42 85 56\nStep IV: 09 18 31 42 56 85 (Final Step)`,
    questionNumber: 105,
    questionText: 'How many total steps are required to fully sort Input: 50 20 40 10 30?',
    options: ['4 steps', '3 steps', '5 steps', '2 steps'],
    correctAnswer: 0,
    solution: 'Input: 50 20 40 10 30\nStep I (10): 10 50 20 40 30\nStep II (20): 10 20 50 40 30\nStep III (30): 10 20 30 50 40\nStep IV (40): 10 20 30 40 50 (Sorted)\nTotal = 4 steps.',
    topic: 'Analytical Reasoning - Machine Input-Output'
  },
  {
    id: 106,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 106,
    questionText: 'In a row of 40 students facing North, Amit is 15th from left end. Position from right end?',
    options: ['26th', '25th', '27th', '24th'],
    correctAnswer: 0,
    solution: 'Formula: Position from Right = Total − Position from Left + 1 = 40 − 15 + 1 = 26th.',
    topic: 'Analytical Reasoning - Order & Ranking'
  },
  {
    id: 107,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 107,
    questionText: "If '+' means '×', '−' means '÷', '×' means '+', '÷' means '−'. Solve: 12 + 4 − 2 × 6 ÷ 10 = ?",
    options: ['20', '18', '22', '15'],
    correctAnswer: 0,
    solution: 'Replace operators:\n12 × 4 ÷ 2 + 6 − 10\nApplying BODMAS:\n• Division: 4 ÷ 2 = 2\n• Multiplication: 12 × 2 = 24\n• Addition: 24 + 6 = 30\n• Subtraction: 30 − 10 = 20.',
    topic: 'Mathematical Operations & Symbol Substitution'
  },
  {
    id: 108,
    section: 'logic',
    sectionName: 'Logical Reasoning',
    questionNumber: 108,
    questionText: 'Complete alphanumeric series: A1, C4, E9, G16, ?',
    options: ['I25', 'H25', 'I36', 'J25'],
    correctAnswer: 0,
    solution: '• Letters skip 1 forward: A (+2) -> C (+2) -> E (+2) -> G (+2) -> I\n• Numbers are consecutive squares: 1² = 1, 2² = 4, 3² = 9, 4² = 16, 5² = 25\nCombined term = I25.',
    topic: 'Logical Series - Alphanumeric Series'
  }
];
