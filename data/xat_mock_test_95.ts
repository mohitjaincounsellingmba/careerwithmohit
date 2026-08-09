export interface XatQuestion {
  id: number;
  section: 'valr' | 'dm' | 'qadi' | 'gk';
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
}

export const XAT_MOCK_TEST_95: XatQuestion[] = [
  // =========================================================================
  // SECTION I: VERBAL AND LOGICAL ABILITY (VALR) (26 Questions, Q1 - Q26)
  // =========================================================================

  // Passage 1: Epistemology & Artificial Intelligence (Q1 - Q4)
  {
    id: 1,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    passageTitle: 'Passage 1: Epistemology & Artificial Intelligence (Q1 - Q4)',
    passageText: `The central crisis of contemporary epistemology stem from the shift from explanatory models to predictive models. For centuries, scientific progress was measured by human capacity to explain causality through conceptual frameworks. Modern deep-learning architectures, however, prioritize predictive accuracy at the expense of causal transparency. When an algorithm correctly forecasts complex medical outcomes or macroeconomic shifts without providing an intelligible causal narrative, the traditional link between knowledge and understanding is severed. Critics argue that relying on opacity compromises human moral accountability. If decision-makers cannot comprehend why a model recommends a specific intervention, they cannot ethically justify its real-world consequences.`,
    questionNumber: 1,
    questionText: 'What is the primary epistemological crisis highlighted by the author?',
    options: [
      'Deep-learning algorithms have consistently low predictive accuracy.',
      'Scientific progress has completely halted due to corporate algorithm ownership.',
      'High predictive accuracy without causal explanation severs knowledge from understanding.',
      'Human decision-makers refuse to adopt algorithms in medicine and economics.',
      'Causal frameworks are mathematically impossible to construct in modern science.'
    ],
    correctAnswer: 2,
    solution: 'The opening paragraph clearly defines the crisis: algorithms offer high predictive accuracy while sacrificing causal transparency, severing the link between empirical knowledge and causal understanding.',
    topic: 'Reading Comprehension - Epistemology & AI'
  },
  {
    id: 2,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    passageTitle: 'Passage 1: Epistemology & Artificial Intelligence (Q1 - Q4)',
    passageText: `The central crisis of contemporary epistemology stem from the shift from explanatory models to predictive models. For centuries, scientific progress was measured by human capacity to explain causality through conceptual frameworks. Modern deep-learning architectures, however, prioritize predictive accuracy at the expense of causal transparency. When an algorithm correctly forecasts complex medical outcomes or macroeconomic shifts without providing an intelligible causal narrative, the traditional link between knowledge and understanding is severed. Critics argue that relying on opacity compromises human moral accountability. If decision-makers cannot comprehend why a model recommends a specific intervention, they cannot ethically justify its real-world consequences.`,
    questionNumber: 2,
    questionText: 'According to the author, moral accountability is compromised primarily because:',
    options: [
      'Algorithms are deliberately programmed to evade legal regulations.',
      'Decision-makers cannot ethically justify real-world actions driven by opaque models.',
      'Predictive models are more expensive than traditional scientific research.',
      'Medical outcomes are inherently unpredictable regardless of technology.',
      'Human agency is entirely eliminated by government regulatory mandates.'
    ],
    correctAnswer: 1,
    solution: 'The concluding sentence states that if human decision-makers cannot comprehend why a model recommends an intervention, they cannot ethically justify its real-world consequences.',
    topic: 'Reading Comprehension - Moral Accountability'
  },
  {
    id: 3,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    passageTitle: 'Passage 1: Epistemology & Artificial Intelligence (Q1 - Q4)',
    passageText: `The central crisis of contemporary epistemology stem from the shift from explanatory models to predictive models. For centuries, scientific progress was measured by human capacity to explain causality through conceptual frameworks. Modern deep-learning architectures, however, prioritize predictive accuracy at the expense of causal transparency. When an algorithm correctly forecasts complex medical outcomes or macroeconomic shifts without providing an intelligible causal narrative, the traditional link between knowledge and understanding is severed. Critics argue that relying on opacity compromises human moral accountability. If decision-makers cannot comprehend why a model recommends a specific intervention, they cannot ethically justify its real-world consequences.`,
    questionNumber: 3,
    questionText: "The author's argument assumes which of the following?",
    options: [
      'Moral justification requires an intelligible understanding of causal mechanisms.',
      'Deep-learning models will eventually replace all human moral philosophy.',
      'Predictive accuracy is less valuable than complete economic stability.',
      'Traditional scientific models never made errors in predicting real-world outcomes.',
      'Explanation and prediction are mutually exclusive in all scientific domains.'
    ],
    correctAnswer: 0,
    solution: 'The argument linking opaque algorithms to a failure of moral accountability assumes that ethical justification necessarily requires an intelligible understanding of the causal reasons behind decisions.',
    topic: 'Critical Reasoning - Underlying Assumption'
  },
  {
    id: 4,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    passageTitle: 'Passage 1: Epistemology & Artificial Intelligence (Q1 - Q4)',
    passageText: `The central crisis of contemporary epistemology stem from the shift from explanatory models to predictive models. For centuries, scientific progress was measured by human capacity to explain causality through conceptual frameworks. Modern deep-learning architectures, however, prioritize predictive accuracy at the expense of causal transparency. When an algorithm correctly forecasts complex medical outcomes or macroeconomic shifts without providing an intelligible causal narrative, the traditional link between knowledge and understanding is severed. Critics argue that relying on opacity compromises human moral accountability. If decision-makers cannot comprehend why a model recommends a specific intervention, they cannot ethically justify its real-world consequences.`,
    questionNumber: 4,
    questionText: 'The tone of the passage regarding pure predictive modeling can best be described as:',
    options: [
      'Enthusiastically supportive',
      'Critically apprehensive',
      'Completely indifferent',
      'Dismissive and aggressive',
      'Unconditionally optimistic'
    ],
    correctAnswer: 1,
    solution: 'The author analyzes the profound ethical and epistemological shortcomings of black-box predictive models in a critically apprehensive manner.',
    topic: 'Reading Comprehension - Tone & Stance'
  },

  // Passage 2: Socio-Economic History (Q5 - Q8)
  {
    id: 5,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    passageTitle: 'Passage 2: Socio-Economic History (Q5 - Q8)',
    passageText: `The agrarian revolution was not merely a technological transition in food production; it fundamentally reshaped human social hierarchies. Hunter-gatherer communities maintained relatively egalitarian social structures due to nomadism and the impossibility of asset accumulation. The settlement required by agriculture enabled surplus generation, which in turn birthed property rights, institutionalized inequality, and centralized political authority. As land became the primary store of value, social status became tied to inheritance rather than individual contribution. Thus, the security offered by agricultural surpluses was bought at the cost of pervasive social stratification.`,
    questionNumber: 5,
    questionText: 'What allowed hunter-gatherer societies to remain relatively egalitarian?',
    options: [
      'Strict enforcement of legal egalitarian codes.',
      'High technological advancement in agricultural tools.',
      'Nomadism and the inability to accumulate physical assets.',
      'Abundance of centralized political governance.',
      'Universal ownership of agricultural land reserves.'
    ],
    correctAnswer: 2,
    solution: 'The text notes hunter-gatherer communities remained egalitarian due to constant nomadism and the physical impossibility of accumulating assets.',
    topic: 'Reading Comprehension - Factual Detail'
  },
  {
    id: 6,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    passageTitle: 'Passage 2: Socio-Economic History (Q5 - Q8)',
    passageText: `The agrarian revolution was not merely a technological transition in food production; it fundamentally reshaped human social hierarchies. Hunter-gatherer communities maintained relatively egalitarian social structures due to nomadism and the impossibility of asset accumulation. The settlement required by agriculture enabled surplus generation, which in turn birthed property rights, institutionalized inequality, and centralized political authority. As land became the primary store of value, social status became tied to inheritance rather than individual contribution. Thus, the security offered by agricultural surpluses was bought at the cost of pervasive social stratification.`,
    questionNumber: 6,
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
    topic: 'Reading Comprehension - Inferences & Trade-offs'
  },
  {
    id: 7,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    passageTitle: 'Passage 2: Socio-Economic History (Q5 - Q8)',
    passageText: `The agrarian revolution was not merely a technological transition in food production; it fundamentally reshaped human social hierarchies. Hunter-gatherer communities maintained relatively egalitarian social structures due to nomadism and the impossibility of asset accumulation. The settlement required by agriculture enabled surplus generation, which in turn birthed property rights, institutionalized inequality, and centralized political authority. As land became the primary store of value, social status became tied to inheritance rather than individual contribution. Thus, the security offered by agricultural surpluses was bought at the cost of pervasive social stratification.`,
    questionNumber: 7,
    questionText: 'The transition to agriculture caused social status to depend primarily on:',
    options: [
      'Individual physical strength',
      'Nomadic hunting skill',
      'Asset inheritance',
      'Egalitarian political voting',
      'Artistic cultural production'
    ],
    correctAnswer: 2,
    solution: 'The passage explicitly states: "As land became the primary store of value, social status became tied to inheritance rather than individual contribution."',
    topic: 'Reading Comprehension - Detail Retrieval'
  },
  {
    id: 8,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    passageTitle: 'Passage 2: Socio-Economic History (Q5 - Q8)',
    passageText: `The agrarian revolution was not merely a technological transition in food production; it fundamentally reshaped human social hierarchies. Hunter-gatherer communities maintained relatively egalitarian social structures due to nomadism and the impossibility of asset accumulation. The settlement required by agriculture enabled surplus generation, which in turn birthed property rights, institutionalized inequality, and centralized political authority. As land became the primary store of value, social status became tied to inheritance rather than individual contribution. Thus, the security offered by agricultural surpluses was bought at the cost of pervasive social stratification.`,
    questionNumber: 8,
    questionText: 'Which title best captures the core thesis of Passage 2?',
    options: [
      'The Technological Triumph of Modern Farming',
      'Agricultural Surplus and the Origins of Inequality',
      'Why Nomadism Failed in Prehistoric Europe',
      'The Universal Benefits of Property Rights',
      'Political Harmony in Early Human Settlements'
    ],
    correctAnswer: 1,
    solution: 'The central thesis explores how the advent of agricultural surplus led directly to property rights, social stratification, and institutionalized inequality.',
    topic: 'Reading Comprehension - Main Idea & Title'
  },

  // Part B: Critical Reasoning, Verbal Logic & Vocabulary (Q9 - Q26)
  {
    id: 9,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    questionNumber: 9,
    questionText: `Critical Reasoning (Strengthen): A city council introduced bus-only lanes to reduce commute times. After six months, average bus speeds increased by 25%. The council claims bus-only lanes successfully improved public transit efficiency. Which statement STRENGTHENS this claim?`,
    options: [
      'Total private car traffic on parallel roads increased by 15%.',
      'Bus passenger ridership increased by 30% without causing boarding delays.',
      'Fuel prices dropped significantly during the same six-month period.',
      'The number of traffic lights was reduced across the city.',
      'Bus maintenance budgets were cut by municipal authorities.'
    ],
    correctAnswer: 1,
    solution: 'Option B strengthens the claim by showing that public transit handled 30% more passenger load while sustaining speed improvements, demonstrating true systemic efficiency gains.',
    topic: 'Critical Reasoning - Strengthen Argument'
  },
  {
    id: 10,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    questionNumber: 10,
    questionText: `Critical Reasoning (Weaken): "A health study claims that consuming two cups of green tea daily reduces the risk of heart disease by 20%." Which finding most WEAKENS this conclusion?`,
    options: [
      'Green tea contains high levels of natural antioxidants.',
      'Individuals who drink green tea regularly also engage in 50% more weekly exercise than non-drinkers.',
      'Green tea is more expensive than standard black tea.',
      'Coffee consumers show similar low rates of heart disease.',
      'The study surveyed participants across five different countries.'
    ],
    correctAnswer: 1,
    solution: 'Option B presents an alternative confounding variable: regular green tea drinkers exercise 50% more, meaning exercise could be the true cause of lower heart disease rather than green tea.',
    topic: 'Critical Reasoning - Weaken Argument'
  },
  {
    id: 11,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    questionNumber: 11,
    questionText: 'Complete Analogy: EXACERBATE : MITIGATE :: PERPETUATE : ?',
    options: ['Continue', 'Cease', 'Sustain', 'Foster', 'Prolong'],
    correctAnswer: 1,
    solution: 'Exacerbate (worsen) and Mitigate (lessen) are antonyms. Perpetuate (cause to continue) is the antonym of Cease (stop).',
    topic: 'Vocabulary - Analogies'
  },
  {
    id: 12,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    questionNumber: 12,
    questionText: 'Choose the option that best fills the blanks: "His _____ argument was undermined by his _____ presentation style, which alienated the boardroom panel."',
    options: [
      'cogent ... abrasive',
      'specious ... charming',
      'feeble ... eloquent',
      'lucid ... persuasive',
      'ambiguous ... flawless'
    ],
    correctAnswer: 0,
    solution: "'Cogent' (clear, logical, convincing) fits the intellectual quality of the argument, while 'abrasive' (harsh, unpleasant) explains how his presentation style alienated the panel.",
    topic: 'Sentence Completion - Double Blanks'
  },
  {
    id: 13,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    questionNumber: 13,
    questionText: `Parajumble: Rearrange sentences A-D in a logical sequence.\n\nA. This digital divide prevents rural students from accessing online learning resources.\nB. While urban educational hubs adopted digital infrastructure seamlessly, rural schools lagged behind.\nC. Bridging this gap requires targeted government subsidies for high-speed broadband.\nD. Educational inequality has widened significantly over the past decade.`,
    options: ['DBAC', 'DABC', 'BADC', 'ACBD', 'DCBA'],
    correctAnswer: 0,
    solution: 'Sequence is DBAC:\n• D introduces broad educational inequality.\n• B contrasts urban adoption with rural lag.\n• A defines the consequence of this lag as "This digital divide".\n• C concludes with the policy solution to bridge the gap.',
    topic: 'Verbal Ability - Parajumbles'
  },
  {
    id: 14,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    questionNumber: 14,
    questionText: `Parajumble: Rearrange sentences A-D in a logical sequence.\n\nA. Carbon pricing creates financial incentives for heavy polluters to reduce emissions.\nB. Without strict regulatory enforcement, however, industries simply pass costs to consumers.\nC. Market-based climate policies have gained global traction among policymakers.\nD. Thus, market mechanisms must be paired with statutory caps to be effective.`,
    options: ['CABD', 'ACBD', 'CBAD', 'ADBC', 'BACD'],
    correctAnswer: 0,
    solution: 'Sequence is CABD:\n• C introduces market-based climate policies.\n• A explains the mechanism of carbon pricing.\n• B provides the limitation without enforcement.\n• D provides the conclusion ("Thus, market mechanisms must be paired...").',
    topic: 'Verbal Ability - Parajumbles'
  },
  {
    id: 15,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    questionNumber: 15,
    questionText: 'Grammar / Usage: Identify the grammatically correct sentence.',
    options: [
      'Neither the CEO nor the board members was willing to accept responsibility.',
      'Neither the CEO nor the board members were willing to accept responsibility.',
      'Neither the CEO or the board members were willing to accept responsibility.',
      'Neither the CEO nor the board members has been willing to accept responsibility.',
      'Neither the CEO nor the board members is willing to accept responsibility.'
    ],
    correctAnswer: 1,
    solution: "In 'neither... nor' constructions, the verb agrees with the closer subject. 'Board members' is plural, requiring the plural verb 'were'.",
    topic: 'Grammar - Subject-Verb Agreement'
  },
  {
    id: 16,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    questionNumber: 16,
    questionText: 'Choose the word closest in meaning to UBIQUITOUS:',
    options: ['Rare', 'Omnipresent', 'Obsolete', 'Transient', 'Secret'],
    correctAnswer: 1,
    solution: 'Ubiquitous means present, appearing, or found everywhere; omnipresent is its exact synonym.',
    topic: 'Vocabulary - Synonyms'
  },
  {
    id: 17,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    questionNumber: 17,
    questionText: 'Choose the word opposite in meaning to EQUANIMITY:',
    options: ['Serenity', 'Agitation', 'Calmness', 'Poise', 'Harmony'],
    correctAnswer: 1,
    solution: 'Equanimity means mental calmness and composure. Its direct antonym is Agitation.',
    topic: 'Vocabulary - Antonyms'
  },
  {
    id: 18,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    questionNumber: 18,
    questionText: `Statement & Syllogism: "All economists are strategists. No strategist is a gambler."\n\nConclusion I: No economist is a gambler.\nConclusion II: Some strategists are economists.`,
    options: [
      'Only Conclusion I follows',
      'Only Conclusion II follows',
      'BOTH Conclusions I and II follow',
      'NEITHER Conclusion follows',
      'Either Conclusion I or II follows'
    ],
    correctAnswer: 2,
    solution: '• All E are S, and No S is G. Since E is entirely inside S, no E can be G (Conclusion I follows).\n• Since All E are S, Some S are definitely E (Conclusion II follows). Both follow.',
    topic: 'Logical Reasoning - Syllogisms'
  },
  {
    id: 19,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    questionNumber: 19,
    questionText: 'Choose the correct fill-in-the-blank pair: "Despite the CFO\'s _____ predictions, the startup managed to secure _____ funding from foreign investors."',
    options: [
      'dire ... substantial',
      'rosy ... minimal',
      'optimistic ... meager',
      'cheerful ... zero',
      'gloomy ... negligible'
    ],
    correctAnswer: 0,
    solution: "'Despite' establishes a contrast between negative predictions ('dire') and positive fundraising success ('substantial funding').",
    topic: 'Sentence Completion - Contextual Contrasts'
  },
  {
    id: 20,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    questionNumber: 20,
    questionText: `Logical Deduction: "If a candidate scores above 90% in XAT, they are called for the interview. Rohan was not called for the interview."`,
    options: [
      'Rohan scored above 90% in XAT.',
      'Rohan did not score above 90% in XAT.',
      'Rohan rejected the interview call.',
      'Rohan scored exactly 95% in XAT.',
      'Cannot be determined.'
    ],
    correctAnswer: 1,
    solution: "Applying Modus Tollens (contrapositive): If P → Q, then ~Q → ~P. Since Rohan was not called for the interview, he did not score above 90%.",
    topic: 'Logical Reasoning - Deductive Logic'
  },
  {
    id: 21,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    questionNumber: 21,
    questionText: `Identify the odd sentence out that does NOT fit the main theme:\n\n1) Electric vehicles drastically reduce tailpipe carbon emissions in urban centers.\n2) Battery recycling technology is advancing to recover precious metals efficiently.\n3) Renewable energy generation costs have reached grid parity in major economies.\n4) Public fast-charging infrastructure density is critical for widespread EV adoption.\n5) Modern lithium-ion batteries require thermal management systems for safety.`,
    options: ['Sentence 1', 'Sentence 2', 'Sentence 3', 'Sentence 4', 'Sentence 5'],
    correctAnswer: 2,
    solution: 'Sentence 3 discusses macro renewable power generation economics, while sentences 1, 2, 4, and 5 form a coherent theme on EV technology, batteries, and charging infrastructure.',
    topic: 'Verbal Ability - Odd Sentence Out'
  },
  {
    id: 22,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    questionNumber: 22,
    questionText: `Critical Reasoning (Paradox): A country increased taxation on sugary beverages by 20%. Surprisingly, total revenue collected from beverage taxes declined by 10% in the following year. Which statement resolves this paradox?`,
    options: [
      'Consumers shifted heavily toward tax-free natural fruit juices, reducing sugar drink sales by 30%.',
      'Beverage manufacturers increased their advertising budgets by 15%.',
      'The tax was implemented across all provinces simultaneously.',
      'Sugar supply prices remained stable throughout the year.',
      'Income tax rates were also increased during the same period.'
    ],
    correctAnswer: 0,
    solution: 'If a 20% tax hike caused consumers to cut volume consumption by 30%, the volume drop more than offset the higher rate, explaining the 10% decline in total tax collected.',
    topic: 'Critical Reasoning - Resolve Paradox'
  },
  {
    id: 23,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    questionNumber: 23,
    questionText: 'Complete Analogy: EPHEMERAL : PERMANENT :: PROFLIGATE : ?',
    options: ['Extravagant', 'Frugal', 'Reckless', 'Wealthy', 'Generous'],
    correctAnswer: 1,
    solution: 'Ephemeral and Permanent are antonyms. Profligate (recklessly wasteful) is the antonym of Frugal (thrifty, sparing).',
    topic: 'Vocabulary - Analogies'
  },
  {
    id: 24,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    questionNumber: 24,
    questionText: 'Identify the sentence with correct parallel structure:',
    options: [
      'The consultant recommended restructuring the department, optimizing workflows, and to reduce overheads.',
      'The consultant recommended restructuring the department, optimizing workflows, and reducing overheads.',
      'The consultant recommended to restructure department, optimize workflows, and reducing overheads.',
      'The consultant recommended restructuring department, optimize workflows, and overhead reduction.',
      'The consultant recommended department restructuring, to optimize workflows, and reducing overheads.'
    ],
    correctAnswer: 1,
    solution: 'Parallel structure requires consistent gerund forms in the list: restructuring..., optimizing..., and reducing...',
    topic: 'Grammar - Parallelism'
  },
  {
    id: 25,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    questionNumber: 25,
    questionText: 'Choose the correct idiom: "After months of stalling, the board finally decided to _____ and approve the merger."',
    options: [
      'bite the bullet',
      'burn the candle at both ends',
      'cry over spilt milk',
      'beat around the bush',
      'hit the sack'
    ],
    correctAnswer: 0,
    solution: "'Bite the bullet' means to decide to do something difficult or unpleasant that one has been hesitating over.",
    topic: 'Vocabulary - Idioms & Phrases'
  },
  {
    id: 26,
    section: 'valr',
    sectionName: 'Verbal and Logical Ability',
    questionNumber: 26,
    questionText: `Paragraph Summary: Select the best summary of the text below.\n\nText: Central banks use interest rate adjustments to balance inflation and growth. Raising rates cools borrowing and curbs price rises but risks economic slowdown. Lowering rates stimulates investment but can ignite inflation. Monetary policy is thus a continuous balancing act.`,
    options: [
      'Central banks should never raise interest rates because it causes economic slowdowns.',
      'Monetary policy involves fine-tuning interest rates to control inflation without halting economic growth.',
      'Investment levels are completely independent of central bank interest rate decisions.',
      'Lowering interest rates is the only effective method to achieve price stability.',
      'Central banks prioritize inflation control over employment and business investment.'
    ],
    correctAnswer: 1,
    solution: 'Option B captures both facets of monetary policy: tuning interest rates to rein in inflation while preserving economic growth.',
    topic: 'Verbal Ability - Paragraph Summary'
  },

  // =========================================================================
  // SECTION II: DECISION MAKING (DM) (21 Questions, Q27 - Q47)
  // =========================================================================

  // Caselet 1: Business Strategy & Ethics (Q27 - Q29)
  {
    id: 27,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 1: Business Strategy & Ethics - PharmaCare Laboratories',
    scenarioText: `PharmaCare holds a patent for 'LifeCure', a vital drug for a rare disease. Production cost is ₹ 500 per dose. PharmaCare currently sells it at ₹ 10,000 per dose, earning massive profits. Public health NGOs urge PharmaCare to lower the price to ₹ 1,000 so low-income patients can afford it. However, PharmaCare's CFO argues that high profits are necessary to recoup ₹ 500 Crores spent on R&D for drugs that failed trials. CEO Ananya must decide the pricing policy.`,
    questionNumber: 27,
    questionText: 'Which decision best balances ethical responsibility with financial sustainability?',
    options: [
      'Maintain the ₹ 10,000 price rigidly and reject all NGO requests.',
      'Lower price to ₹ 500 for everyone, incurring a total loss on R&D recovery.',
      'Introduce tiered pricing: sell at ₹ 1,000 to low-income patients via government schemes while maintaining ₹ 10,000 for commercial insurance.',
      'Stop producing LifeCure completely to avoid public controversy.',
      'Sell the patent to a foreign competitor for an immediate cash payout.'
    ],
    correctAnswer: 2,
    solution: 'Tiered pricing enables low-income patients to access life-saving medicine through subsidized public channels while continuing to recoup R&D investments through commercial insurers.',
    topic: 'Decision Making - Ethical Business Pricing'
  },
  {
    id: 28,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 1: Business Strategy & Ethics - PharmaCare Laboratories',
    scenarioText: `PharmaCare holds a patent for 'LifeCure', a vital drug for a rare disease. Production cost is ₹ 500 per dose. PharmaCare currently sells it at ₹ 10,000 per dose, earning massive profits. Public health NGOs urge PharmaCare to lower the price to ₹ 1,000 so low-income patients can afford it. However, PharmaCare's CFO argues that high profits are necessary to recoup ₹ 500 Crores spent on R&D for drugs that failed trials. CEO Ananya must decide the pricing policy.`,
    questionNumber: 28,
    questionText: 'If Ananya adopts tiered pricing, which argument best defends this choice to private investors?',
    options: [
      'Tiered pricing expands total volume sales and builds government goodwill without destroying commercial revenue.',
      'Investors should not care about financial returns when public health is involved.',
      'Low-income patients will eventually buy commercial insurance in the future.',
      'R&D costs do not matter in long-term corporate accounting.',
      'Competitors will be legally barred from developing alternative drugs.'
    ],
    correctAnswer: 0,
    solution: 'This argument justifies tiered pricing on commercial and strategic grounds: higher overall unit volume, ESG goodwill, and preservation of premium corporate insurance margins.',
    topic: 'Decision Making - Stakeholder Management'
  },
  {
    id: 29,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 1: Business Strategy & Ethics - PharmaCare Laboratories',
    scenarioText: `PharmaCare holds a patent for 'LifeCure', a vital drug for a rare disease. Production cost is ₹ 500 per dose. PharmaCare currently sells it at ₹ 10,000 per dose, earning massive profits. Public health NGOs urge PharmaCare to lower the price to ₹ 1,000 so low-income patients can afford it. However, PharmaCare's CFO argues that high profits are necessary to recoup ₹ 500 Crores spent on R&D for drugs that failed trials. CEO Ananya must decide the pricing policy.`,
    questionNumber: 29,
    questionText: 'What is the primary ethical risk if PharmaCare refuses any price reduction?',
    options: [
      'Severe brand reputation damage and potential government compulsory licensing intervention.',
      'Immediate bankruptcy of PharmaCare Laboratories.',
      'Loss of patent protection in commercial markets.',
      'Resignation of the CFO.',
      'Decline in raw material manufacturing costs.'
    ],
    correctAnswer: 0,
    solution: 'Refusing price adjustments for life-saving medication risks intense public backlash, reputational destruction, and legal triggers for government compulsory licensing.',
    topic: 'Decision Making - Regulatory & Reputational Risk'
  },

  // Caselet 2: HR Policy & Performance Conflict (Q30 - Q32)
  {
    id: 30,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 2: HR Policy & Performance Conflict - TechCorp HR Dilemma',
    scenarioText: `Rohan is TechCorp's top salesperson, generating 30% of total revenue. However, Rohan frequently verbally bullies junior team members, causing high turnover among junior staff. HR Head Sunita receives a formal harassment complaint from three junior employees who threaten to resign publicly unless action is taken. Sales VP Karan opposes firing Rohan, claiming losing Rohan will cause TechCorp to miss its quarterly revenue targets.`,
    questionNumber: 30,
    questionText: 'What is the most appropriate management action for Sunita to take?',
    options: [
      'Ignore the junior employees\' complaint to protect quarterly revenue.',
      'Fire the three junior employees for disrupting team harmony.',
      'Issue a formal warning to Rohan, mandate behavioral counseling, and implement zero-tolerance probation.',
      'Promote Rohan to an isolated executive role with a 20% salary bonus.',
      'Pay the junior employees a cash bonus to withdraw their complaint quietly.'
    ],
    correctAnswer: 2,
    solution: 'A formal reprimand combined with mandatory behavioral counseling and strict probation enforces zero-tolerance workplace policies while providing a clear procedural pathway for remediation.',
    topic: 'Decision Making - HR Governance'
  },
  {
    id: 31,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 2: HR Policy & Performance Conflict - TechCorp HR Dilemma',
    scenarioText: `Rohan is TechCorp's top salesperson, generating 30% of total revenue. However, Rohan frequently verbally bullies junior team members, causing high turnover among junior staff. HR Head Sunita receives a formal harassment complaint from three junior employees who threaten to resign publicly unless action is taken. Sales VP Karan opposes firing Rohan, claiming losing Rohan will cause TechCorp to miss its quarterly revenue targets.`,
    questionNumber: 31,
    questionText: 'If Rohan repeats the toxic behavior during his probation, what should Sunita do?',
    options: [
      'Terminate Rohan\'s employment immediately to enforce workplace safety and culture integrity.',
      'Give Rohan another warning and extend probation by one year.',
      'Deduct 5% from Rohan\'s sales commission.',
      'Ask junior employees to work remotely permanently.',
      'Transfer Sunita to another department.'
    ],
    correctAnswer: 0,
    solution: 'Zero-tolerance probation requires decisive execution. Repeating harassment during probation warrants immediate termination to protect organizational safety and culture.',
    topic: 'Decision Making - Policy Enforcement'
  },
  {
    id: 32,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 2: HR Policy & Performance Conflict - TechCorp HR Dilemma',
    scenarioText: `Rohan is TechCorp's top salesperson, generating 30% of total revenue. However, Rohan frequently verbally bullies junior team members, causing high turnover among junior staff. HR Head Sunita receives a formal harassment complaint from three junior employees who threaten to resign publicly unless action is taken. Sales VP Karan opposes firing Rohan, claiming losing Rohan will cause TechCorp to miss its quarterly revenue targets.`,
    questionNumber: 32,
    questionText: 'Which long-term risk does Karan ignore by defending Rohan\'s toxic behavior?',
    options: [
      'Institutionalization of toxic culture, loss of talent pipeline, and legal liability.',
      'Immediate reduction in raw material costs.',
      'Increase in customer retention rates.',
      'Higher employee attendance across all sales teams.',
      'Lower corporate income tax rates.'
    ],
    correctAnswer: 0,
    solution: 'Defending a toxic high-performer sacrifices company-wide morale, destroys talent recruitment pipelines, and exposes the firm to severe legal liability.',
    topic: 'Decision Making - Culture & Strategic Risk'
  },

  // Caselet 3: Operations & Environment (Q33 - Q35)
  {
    id: 33,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 3: Operations & Environment - EcoTextiles Manufacturing',
    scenarioText: `EcoTextiles operates a factory near a river. A new local environmental law lowers allowable chemical discharge limits by 50%. Upgrading the effluent treatment plant will cost ₹ 5 Crores and take 6 months. Continuing current operations risks a fine of ₹ 50 Lakhs per month. Shutting down production during upgrades will result in losing a major international client.`,
    questionNumber: 33,
    questionText: 'What is the most prudent operational strategy for EcoTextiles?',
    options: [
      'Pay the ₹ 50 Lakhs monthly fine while continuing full production and expediting plant upgrades simultaneously.',
      'Shut down the factory completely for 6 months without consulting the international client.',
      'Dump effluent secretly at night to evade municipal fines.',
      'Shift operations to an illegal unregistered facility.',
      'Permanently close the business and sell factory land.'
    ],
    correctAnswer: 0,
    solution: 'Paying the interim fine while fast-tracking green plant upgrades keeps production alive, preserves key international contracts, and achieves long-term compliance.',
    topic: 'Decision Making - Environmental Operations'
  },
  {
    id: 34,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 3: Operations & Environment - EcoTextiles Manufacturing',
    scenarioText: `EcoTextiles operates a factory near a river. A new local environmental law lowers allowable chemical discharge limits by 50%. Upgrading the effluent treatment plant will cost ₹ 5 Crores and take 6 months. Continuing current operations risks a fine of ₹ 50 Lakhs per month. Shutting down production during upgrades will result in losing a major international client.`,
    questionNumber: 34,
    questionText: 'How should EcoTextiles communicate with its major international client during this transition?',
    options: [
      'Transparently inform the client of green upgrades, sub-contract production temporarily to a compliant partner, and maintain delivery schedules.',
      'Conceal the environmental law changes completely from the client.',
      'Cancel the client contract immediately without explanation.',
      'Ask the client to pay the ₹ 5 Crores upgrade cost directly.',
      'Blame the local government for unfair business regulations.'
    ],
    correctAnswer: 0,
    solution: 'Transparent stakeholder communication paired with contingency sub-contracting safeguards fulfillment schedules and positions the firm favorably on ESG metrics.',
    topic: 'Decision Making - Client Communications'
  },
  {
    id: 35,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 3: Operations & Environment - EcoTextiles Manufacturing',
    scenarioText: `EcoTextiles operates a factory near a river. A new local environmental law lowers allowable chemical discharge limits by 50%. Upgrading the effluent treatment plant will cost ₹ 5 Crores and take 6 months. Continuing current operations risks a fine of ₹ 50 Lakhs per month. Shutting down production during upgrades will result in losing a major international client.`,
    questionNumber: 35,
    questionText: 'What long-term benefit does upgrading the effluent treatment plant provide EcoTextiles?',
    options: [
      'Full regulatory compliance, risk mitigation, and enhanced ESG positioning for global clients.',
      'Elimination of all employee salary expenses.',
      'Free supply of raw cotton from local farmers.',
      'Monopoly over national transportation logistics.',
      'Total exemption from corporate taxation.'
    ],
    correctAnswer: 0,
    solution: 'Upgrading the treatment plant future-proofs the factory against harsher regulations, eliminates recurring fines, and improves sustainability positioning.',
    topic: 'Decision Making - ESG & Long-term Strategy'
  },

  // Caselet 4: Product Safety & Public Relations (Q36 - Q38)
  {
    id: 36,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 4: Product Safety & Public Relations - AutoMotors EV Recall',
    scenarioText: `AutoMotors launched a popular Electric Scooter. Two isolated battery fire incidents were reported out of 50,000 units sold. Engineering reports indicate a 0.01% defect probability under extreme heat. Recalling all 50,000 units for battery inspection will cost ₹ 30 Crores. Doing nothing risks driver safety and catastrophic brand damage if another fire occurs.`,
    questionNumber: 36,
    questionText: 'What is the most ethically and strategically sound decision for AutoMotors CEO?',
    options: [
      'Issue a voluntary safety recall for battery inspection and software updates immediately.',
      'Deny the fire incidents publicly and blame user negligence.',
      'Wait until ten more fires occur before taking action.',
      'Quietly stop selling scooters without informing existing owners.',
      'Increase scooter prices for future buyers.'
    ],
    correctAnswer: 0,
    solution: 'A voluntary safety recall prioritizes human safety, mitigates legal liability, and builds long-term customer trust in a nascent EV market.',
    topic: 'Decision Making - Crisis Management'
  },
  {
    id: 37,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 4: Product Safety & Public Relations - AutoMotors EV Recall',
    scenarioText: `AutoMotors launched a popular Electric Scooter. Two isolated battery fire incidents were reported out of 50,000 units sold. Engineering reports indicate a 0.01% defect probability under extreme heat. Recalling all 50,000 units for battery inspection will cost ₹ 30 Crores. Doing nothing risks driver safety and catastrophic brand damage if another fire occurs.`,
    questionNumber: 37,
    questionText: 'How should AutoMotors handle the public relations narrative during the recall?',
    options: [
      'Proactively announce the recall emphasizing user safety as top priority, offering free doorstep servicing.',
      'Blame battery cell suppliers exclusively in press releases.',
      'Delete customer feedback comments from social media channels.',
      'Claim the fire reports were fabricated by competitors.',
      'Avoid issuing any public statements.'
    ],
    correctAnswer: 0,
    solution: 'Proactive and empathetic messaging centered on consumer safety and complimentary servicing turns a potential PR crisis into a demonstration of brand reliability.',
    topic: 'Decision Making - Public Relations'
  },
  {
    id: 38,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 4: Product Safety & Public Relations - AutoMotors EV Recall',
    scenarioText: `AutoMotors launched a popular Electric Scooter. Two isolated battery fire incidents were reported out of 50,000 units sold. Engineering reports indicate a 0.01% defect probability under extreme heat. Recalling all 50,000 units for battery inspection will cost ₹ 30 Crores. Doing nothing risks driver safety and catastrophic brand damage if another fire occurs.`,
    questionNumber: 38,
    questionText: 'What is the primary justification for absorbing the ₹ 30 Crores recall cost?',
    options: [
      'Consumer safety and long-term brand equity far outweigh short-term recall expense.',
      'It guarantees 100% tax exemption from central authorities.',
      'Competitors will reimburse AutoMotors for the recall.',
      'Battery prices will fall by 90% next month.',
      'It eliminates the need for future marketing campaigns.'
    ],
    correctAnswer: 0,
    solution: 'The potential cost of brand destruction, lawsuits, and loss of future market share vastly exceeds the upfront ₹30 Cr recall expenditure.',
    topic: 'Decision Making - Cost-Benefit Analysis'
  },

  // Caselet 5: Retail Channel Conflict (Q39 - Q41)
  {
    id: 39,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 5: Retail Channel Conflict - StyleFit Apparel',
    scenarioText: `StyleFit sells clothing through 200 offline franchise stores. To boost sales, StyleFit launches a direct-to-consumer online store offering a 25% discount. Franchise owners protest that online discounts are destroying foot traffic in offline stores and threaten to boycott StyleFit products.`,
    questionNumber: 39,
    questionText: 'What is the best strategy to resolve this channel conflict?',
    options: [
      'Harmonize online and offline prices, offer exclusive product lines for offline stores, and share online fulfillment commissions with local franchises.',
      'Close all 200 offline franchise stores immediately.',
      'Shut down the online store completely.',
      'Increase offline store prices by another 20%.',
      'Ignore franchise protests completely.'
    ],
    correctAnswer: 0,
    solution: 'Omnichannel price parity, offline-exclusive SKUs, and geo-located fulfillment commission sharing align partner incentives without sacrificing direct digital growth.',
    topic: 'Decision Making - Channel Conflict Resolution'
  },
  {
    id: 40,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 5: Retail Channel Conflict - StyleFit Apparel',
    scenarioText: `StyleFit sells clothing through 200 offline franchise stores. To boost sales, StyleFit launches a direct-to-consumer online store offering a 25% discount. Franchise owners protest that online discounts are destroying foot traffic in offline stores and threaten to boycott StyleFit products.`,
    questionNumber: 40,
    questionText: 'How does exclusive product line distribution help offline franchisees?',
    options: [
      'Gives consumers a unique reason to visit physical stores for exclusive items.',
      'Eliminates all inventory storage costs for offline stores.',
      'Reduces offline store electricity bills.',
      'Forces online shoppers to pay double tax rates.',
      'Guarantees zero competition from foreign brands.'
    ],
    correctAnswer: 0,
    solution: 'Exclusive offline product lines give shoppers an incentive to visit physical retail stores, preserving foot traffic and franchisee profitability.',
    topic: 'Decision Making - Retail Strategy'
  },
  {
    id: 41,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 5: Retail Channel Conflict - StyleFit Apparel',
    scenarioText: `StyleFit sells clothing through 200 offline franchise stores. To boost sales, StyleFit launches a direct-to-consumer online store offering a 25% discount. Franchise owners protest that online discounts are destroying foot traffic in offline stores and threaten to boycott StyleFit products.`,
    questionNumber: 41,
    questionText: 'What is the core objective of omnichannel integration in retail?',
    options: [
      'Providing a seamless customer experience across physical and digital touchpoints while aligning channel partner incentives.',
      'Eliminating physical stores completely from national commerce.',
      'Maximizing price friction between online and offline shoppers.',
      'Avoiding digital marketing investments.',
      'Restricting sales exclusively to cash transactions.'
    ],
    correctAnswer: 0,
    solution: 'Omnichannel integration unites digital convenience with physical retail touchpoints while preserving healthy collaborative partner incentives.',
    topic: 'Decision Making - Omnichannel Strategy'
  },

  // Caselet 6: Academic Ethics (Q42 - Q47)
  {
    id: 42,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 6: Academic Ethics - National Institute Governance',
    scenarioText: `A senior professor at a premier management institute is accused of plagiarizing parts of a research paper. The professor is a candidate for Director. An internal inquiry committee confirms minor plagiarism (12% text similarity without citation). The Board must decide on appointment and disciplinary action.`,
    questionNumber: 42,
    questionText: 'What is the most appropriate action for the Institute Board?',
    options: [
      'Disqualify the professor from the Director candidacy and issue a formal academic reprimand.',
      'Ignore the plagiarism report and appoint the professor as Director immediately.',
      'Suppress the inquiry report permanently.',
      'Expel all student members of the inquiry committee.',
      'Promote the professor to Board Chairman.'
    ],
    correctAnswer: 0,
    solution: 'An institutional Director must embody uncompromised academic integrity. Disqualification combined with a formal reprimand enforces institutional ethics proportionally.',
    topic: 'Decision Making - Institutional Governance'
  },
  {
    id: 43,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 6: Academic Ethics - National Institute Governance',
    scenarioText: `A senior professor at a premier management institute is accused of plagiarizing parts of a research paper. The professor is a candidate for Director. An internal inquiry committee confirms minor plagiarism (12% text similarity without citation). The Board must decide on appointment and disciplinary action.`,
    questionNumber: 43,
    questionText: 'Why is academic integrity paramount for institutional leadership?',
    options: [
      'Institutional reputation, ethical culture, and global academic credibility depend on leadership integrity.',
      'It lowers annual campus maintenance budgets.',
      'It guarantees 100% placement packages for all graduates.',
      'It eliminates the need for student entrance exams.',
      'It increases government grant allocations automatically.'
    ],
    correctAnswer: 0,
    solution: 'The global standing, degree credibility, and ethical culture of an academic institution are directly shaped by the standards of its leadership.',
    topic: 'Decision Making - Academic Integrity'
  },
  {
    id: 44,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 6: Academic Ethics - National Institute Governance',
    scenarioText: `A senior professor at a premier management institute is accused of plagiarizing parts of a research paper. The professor is a candidate for Director. An internal inquiry committee confirms minor plagiarism (12% text similarity without citation). The Board must decide on appointment and disciplinary action.`,
    questionNumber: 44,
    questionText: 'If the Board appoints the professor despite plagiarism, what message does it send to students and faculty?',
    options: [
      'Ethical violations are tolerable if an individual holds senior status or influence.',
      'Plagiarism is illegal under civil law.',
      'Research paper publications are unnecessary for academic promotion.',
      'Campus security measures will be tightened.',
      'Student tuition fees will be refunded.'
    ],
    correctAnswer: 0,
    solution: 'Overlooking confirmed ethical misconduct by a senior candidate signals that ethical standards are flexible and subservient to rank or status.',
    topic: 'Decision Making - Organizational Culture'
  },
  {
    id: 45,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 6: Academic Ethics - National Institute Governance',
    scenarioText: `A senior professor at a premier management institute is accused of plagiarizing parts of a research paper. The professor is a candidate for Director. An internal inquiry committee confirms minor plagiarism (12% text similarity without citation). The Board must decide on appointment and disciplinary action.`,
    questionNumber: 45,
    questionText: 'What preventive measure should the institute implement for future faculty selections?',
    options: [
      'Mandatory automated plagiarism screening and independent peer review prior to shortlisting candidates.',
      'Banning faculty members from publishing research papers.',
      'Eliminating academic background checks.',
      'Conducting selections through anonymous lottery.',
      'Restricting appointments exclusively to internal candidates.'
    ],
    correctAnswer: 0,
    solution: 'Systematic pre-screening with automated plagiarism software and independent peer reviews creates a transparent and objective gatekeeping protocol.',
    topic: 'Decision Making - Preventive Governance'
  },
  {
    id: 46,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 6: Academic Ethics - National Institute Governance',
    scenarioText: `A senior professor at a premier management institute is accused of plagiarizing parts of a research paper. The professor is a candidate for Director. An internal inquiry committee confirms minor plagiarism (12% text similarity without citation). The Board must decide on appointment and disciplinary action.`,
    questionNumber: 46,
    questionText: 'How should the institute handle media inquiries regarding the plagiarism case?',
    options: [
      'Issue an official statement confirming inquiry findings and outline corrective steps taken.',
      'Threaten legal action against all news journalists.',
      'Deny the existence of the inquiry committee.',
      'Close the institute campus for two weeks.',
      'Refuse to comment permanently.'
    ],
    correctAnswer: 0,
    solution: 'Transparent and measured official disclosure demonstrates institutional accountability and prevents rumor-driven reputational damage.',
    topic: 'Decision Making - Media Communications'
  },
  {
    id: 47,
    section: 'dm',
    sectionName: 'Decision Making',
    scenarioTitle: 'Caselet 6: Academic Ethics - National Institute Governance',
    scenarioText: `A senior professor at a premier management institute is accused of plagiarizing parts of a research paper. The professor is a candidate for Director. An internal inquiry committee confirms minor plagiarism (12% text similarity without citation). The Board must decide on appointment and disciplinary action.`,
    questionNumber: 47,
    questionText: 'What is the fundamental principle governing ethical decision-making in institutional leadership?',
    options: [
      'Upholding systemic integrity, fairness, and accountability above individual convenience.',
      'Maximizing short-term public relations exposure.',
      'Protecting senior management at all costs.',
      'Avoiding financial expenditures on compliance.',
      'Minimizing stakeholder communication transparency.'
    ],
    correctAnswer: 0,
    solution: 'Institutional governance requires placing organizational integrity, fairness, and long-term credibility above the personal interests of any individual.',
    topic: 'Decision Making - Governance Principles'
  },

  // =========================================================================
  // SECTION III: QUANTITATIVE ABILITY & DATA INTERPRETATION (28 Qs, Q48 - Q75)
  // =========================================================================

  // Part A: Quantitative Aptitude (Q48 - Q62)
  {
    id: 48,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    questionNumber: 48,
    questionText: 'A merchant marks up an item by 50% above CP and offers a discount of 20%. If he earns a profit of ₹ 400, find the Cost Price.',
    options: ['₹ 2,000', '₹ 1,800', '₹ 2,500', '₹ 1,600', '₹ 2,200'],
    correctAnswer: 0,
    solution: 'Let CP = x.\nMP = 1.50x.\nSP = 1.50x × (1 − 0.20) = 1.50x × 0.80 = 1.20x.\nProfit = SP − CP = 1.20x − x = 0.20x = 400.\nx = 400 / 0.20 = ₹ 2,000.',
    topic: 'Arithmetic - Profit, Loss & Discount'
  },
  {
    id: 49,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    questionNumber: 49,
    questionText: 'If roots of equation x² − 10x + k = 0 are real and one root is 4 times the other, find k.',
    options: ['16', '20', '24', '12', '25'],
    correctAnswer: 0,
    solution: 'Let roots be r and 4r.\nSum of roots = r + 4r = 5r = 10 ⇒ r = 2.\nRoots are 2 and 8.\nProduct of roots = k = 2 × 8 = 16.',
    topic: 'Algebra - Quadratic Roots'
  },
  {
    id: 50,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    questionNumber: 50,
    questionText: 'A train 200 m long traveling at 72 km/h crosses a platform in 25 seconds. Find platform length.',
    options: ['300 m', '250 m', '280 m', '320 m', '350 m'],
    correctAnswer: 0,
    solution: 'Speed in m/s = 72 × (5/18) = 20 m/s.\nTotal distance = Speed × Time = 20 × 25 = 500 m.\nPlatform Length = Total Distance − Train Length = 500 − 200 = 300 m.',
    topic: 'Arithmetic - Speed, Time & Distance'
  },
  {
    id: 51,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    questionNumber: 51,
    questionText: 'Pipe A fills a tank in 10 hrs, Pipe B in 15 hrs. Pipe C empties full tank in 20 hrs. All opened together, time to fill tank?',
    options: ['120/7 hrs', '60/7 hrs', '15 hrs', '10 hrs', '12 hrs'],
    correctAnswer: 1,
    solution: 'LCM(10, 15, 20) = 60 units.\n• Rate A = +6 units/hr\n• Rate B = +4 units/hr\n• Rate C = −3 units/hr\nNet Rate = 6 + 4 − 3 = 7 units/hr.\nTime to fill = 60 / 7 hours.',
    topic: 'Arithmetic - Pipes & Cisterns'
  },
  {
    id: 52,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    questionNumber: 52,
    questionText: 'A sum under compound interest at 10% p.a. grows to ₹ 13,310 in 3 years. Find principal sum.',
    options: ['₹ 10,000', '₹ 11,000', '₹ 9,500', '₹ 10,500', '₹ 12,000'],
    correctAnswer: 0,
    solution: 'A = P(1 + r/100)³ ⇒ 13,310 = P(1 + 10/100)³ = P(1.1)³ = 1.331 P.\nP = 13,310 / 1.331 = ₹ 10,000.',
    topic: 'Arithmetic - Compound Interest'
  },
  {
    id: 53,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    questionNumber: 53,
    questionText: 'In an alloy of 90 kg, ratio of Copper to Zinc is 5 : 4. How much Copper (in kg) must be added to make ratio 2 : 1?',
    options: ['30 kg', '25 kg', '20 kg', '35 kg', '15 kg'],
    correctAnswer: 0,
    solution: 'Initial quantities in 90 kg:\n• Copper = (5/9) × 90 = 50 kg\n• Zinc = (4/9) × 90 = 40 kg\nFor 2 : 1 ratio with 40 kg Zinc, required Copper = 2 × 40 = 80 kg.\nCopper to be added = 80 − 50 = 30 kg.',
    topic: 'Arithmetic - Ratios & Mixtures'
  },
  {
    id: 54,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    questionNumber: 54,
    questionText: "Average age of 20 employees is 30 years. If manager's age is included, average increases by 1 yr. Manager's age?",
    options: ['51 years', '50 years', '52 years', '48 years', '55 years'],
    correctAnswer: 0,
    solution: 'Total age of 20 employees = 20 × 30 = 600 years.\nNew average for 21 people = 31 years.\nTotal age of 21 people = 21 × 31 = 651 years.\nManager\'s age = 651 − 600 = 51 years.',
    topic: 'Arithmetic - Averages'
  },
  {
    id: 55,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    questionNumber: 55,
    questionText: 'Solve for x: log₃(x) + log₃(x − 6) = 3.',
    options: ['9', '8', '7', '6', '10'],
    correctAnswer: 0,
    solution: 'log₃(x(x − 6)) = 3 ⇒ x(x − 6) = 3³ = 27\n⇒ x² − 6x − 27 = 0 ⇒ (x − 9)(x + 3) = 0.\nSince x > 6 for log domain, x = 9.',
    topic: 'Algebra - Logarithms'
  },
  {
    id: 56,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    questionNumber: 56,
    questionText: 'Sum of first 15 terms of Arithmetic Progression: 3, 7, 11, 15 ... is:',
    options: ['465', '450', '480', '420', '500'],
    correctAnswer: 0,
    solution: 'a = 3, d = 4, n = 15.\nS₁₅ = (15/2)[2(3) + (15 − 1)(4)] = (15/2)[6 + 56] = (15/2) × 62 = 15 × 31 = 465.',
    topic: 'Algebra - Progressions'
  },
  {
    id: 57,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    questionNumber: 57,
    questionText: 'In a right triangle ABC (∠B = 90°), AB = 9 cm, BC = 12 cm. Find inradius of triangle ABC.',
    options: ['3 cm', '4 cm', '2.5 cm', '3.5 cm', '5 cm'],
    correctAnswer: 0,
    solution: 'Hypotenuse AC = √(9² + 12²) = √(81 + 144) = √225 = 15 cm.\nInradius for right triangle r = (AB + BC − AC) / 2 = (9 + 12 − 15) / 2 = 6 / 2 = 3 cm.',
    topic: 'Geometry - Triangles & Circles'
  },
  {
    id: 58,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    questionNumber: 58,
    questionText: "In how many ways can letters of word 'LEADER' be arranged?",
    options: ['360', '720', '180', '240', '120'],
    correctAnswer: 0,
    solution: "'LEADER' has 6 letters with 'E' repeating twice.\nNumber of permutations = 6! / 2! = 720 / 2 = 360 ways.",
    topic: 'Modern Math - Permutations'
  },
  {
    id: 59,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    questionNumber: 59,
    questionText: 'Probability of getting sum of at least 10 when two unbiased dice are thrown simultaneously:',
    options: ['1/6', '1/12', '5/36', '1/4', '1/9'],
    correctAnswer: 0,
    solution: 'Total outcomes = 36.\nFavorable pairs with sum ≥ 10:\n• Sum = 10: (4,6), (5,5), (6,4)\n• Sum = 11: (5,6), (6,5)\n• Sum = 12: (6,6)\nTotal = 6 pairs. Probability = 6 / 36 = 1/6.',
    topic: 'Modern Math - Probability'
  },
  {
    id: 60,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    questionNumber: 60,
    questionText: 'Sum of infinite GP with first term = 16 and common ratio = 1/4 is:',
    options: ['64/3', '20', '24', '18', '32/3'],
    correctAnswer: 0,
    solution: 'Formula: S_∞ = a / (1 − r) = 16 / (1 − 1/4) = 16 / (3/4) = 16 × (4/3) = 64/3.',
    topic: 'Algebra - Geometric Progressions'
  },
  {
    id: 61,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    questionNumber: 61,
    questionText: 'Diagonal of a square is 12√2 cm. Find its perimeter.',
    options: ['48 cm', '36 cm', '24 cm', '60 cm', '40 cm'],
    correctAnswer: 0,
    solution: 'Diagonal d = s√2 = 12√2 ⇒ Side s = 12 cm.\nPerimeter = 4 × s = 4 × 12 = 48 cm.',
    topic: 'Geometry - Quadrilaterals'
  },
  {
    id: 62,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    questionNumber: 62,
    questionText: 'Distance between points (3, 4) and (9, 12) in Cartesian plane:',
    options: ['10', '12', '8', '14', '15'],
    correctAnswer: 0,
    solution: 'd = √[(9 − 3)² + (12 − 4)²] = √(6² + 8²) = √(36 + 64) = √100 = 10 units.',
    topic: 'Geometry - Coordinate Geometry'
  },

  // Part B: Data Interpretation Sets (Q63 - Q75)
  // DI Set 1 (Q63 - Q66): Revenue & Cost data (in ₹ Crores) for TechGlobal
  {
    id: 63,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    scenarioTitle: 'DI Set 1 (Q63 - Q66): TechGlobal Financial Performance',
    scenarioText: 'Revenue & Cost data (in ₹ Crores) for TechGlobal (2022 - 2025):',
    dataTable: {
      headers: ['Year', '2022', '2023', '2024', '2025'],
      rows: [
        ['Revenue (₹ Cr)', 400, 500, 650, 800],
        ['Expenditure (₹ Cr)', 300, 380, 480, 560]
      ]
    },
    questionNumber: 63,
    questionText: 'What is the percentage increase in Revenue from 2022 to 2025?',
    options: ['100%', '80%', '120%', '90%', '110%'],
    correctAnswer: 0,
    solution: 'Revenue in 2022 = 400 Cr, Revenue in 2025 = 800 Cr.\nPercentage Increase = [(800 − 400) / 400] × 100 = (400 / 400) × 100 = 100%.',
    topic: 'Data Interpretation - Percentage Growth'
  },
  {
    id: 64,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    scenarioTitle: 'DI Set 1 (Q63 - Q66): TechGlobal Financial Performance',
    scenarioText: 'Revenue & Cost data (in ₹ Crores) for TechGlobal (2022 - 2025):',
    dataTable: {
      headers: ['Year', '2022', '2023', '2024', '2025'],
      rows: [
        ['Revenue (₹ Cr)', 400, 500, 650, 800],
        ['Expenditure (₹ Cr)', 300, 380, 480, 560]
      ]
    },
    questionNumber: 64,
    questionText: 'In which year was the absolute Profit (Revenue − Expenditure) highest?',
    options: ['2025', '2024', '2023', '2022', '2023 & 2024 tie'],
    correctAnswer: 0,
    solution: 'Profits per year:\n• 2022: 400 − 300 = 100 Cr\n• 2023: 500 − 380 = 120 Cr\n• 2024: 650 − 480 = 170 Cr\n• 2025: 800 − 560 = 240 Cr\nAbsolute profit is highest in 2025 (₹240 Cr).',
    topic: 'Data Interpretation - Trend Analysis'
  },
  {
    id: 65,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    scenarioTitle: 'DI Set 1 (Q63 - Q66): TechGlobal Financial Performance',
    scenarioText: 'Revenue & Cost data (in ₹ Crores) for TechGlobal (2022 - 2025):',
    dataTable: {
      headers: ['Year', '2022', '2023', '2024', '2025'],
      rows: [
        ['Revenue (₹ Cr)', 400, 500, 650, 800],
        ['Expenditure (₹ Cr)', 300, 380, 480, 560]
      ]
    },
    questionNumber: 65,
    questionText: 'What is the average expenditure (in ₹ Cr) over 4 years?',
    options: ['430', '425', '440', '450', '410'],
    correctAnswer: 0,
    solution: 'Total Expenditure = 300 + 380 + 480 + 560 = 1,720 Cr.\nAverage = 1,720 / 4 = 430 Cr.',
    topic: 'Data Interpretation - Averages'
  },
  {
    id: 66,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    scenarioTitle: 'DI Set 1 (Q63 - Q66): TechGlobal Financial Performance',
    scenarioText: 'Revenue & Cost data (in ₹ Crores) for TechGlobal (2022 - 2025):',
    dataTable: {
      headers: ['Year', '2022', '2023', '2024', '2025'],
      rows: [
        ['Revenue (₹ Cr)', 400, 500, 650, 800],
        ['Expenditure (₹ Cr)', 300, 380, 480, 560]
      ]
    },
    questionNumber: 66,
    questionText: 'Ratio of total Profit in 2022-23 to total Profit in 2024-25?',
    options: ['11 : 205', '22 : 41', '1 : 2', '3 : 5', '4 : 7'],
    correctAnswer: 1,
    solution: 'Profit 2022-23 = 100 + 120 = 220 Cr.\nProfit 2024-25 = 170 + 240 = 410 Cr.\nRatio = 220 : 410 = 22 : 41.',
    topic: 'Data Interpretation - Ratios'
  },

  // DI Set 2 (Q67 - Q70): Elective Enrolments
  {
    id: 67,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    scenarioTitle: 'DI Set 2 (Q67 - Q70): Elective Course Enrolments',
    scenarioText: `Elective Enrolments among 200 Students in AI, Data Analytics (DA), and Cyber Security (CS):\n• 90 enrolled in AI; 80 in DA; 70 in CS.\n• 30 enrolled in AI & DA; 25 in DA & CS; 20 in AI & CS.\n• 10 enrolled in all three courses.`,
    questionNumber: 67,
    questionText: 'How many students enrolled in AT LEAST one course?',
    options: ['165', '170', '160', '175', '180'],
    correctAnswer: 3,
    solution: 'Inclusion-Exclusion Principle:\n|AI ∪ DA ∪ CS| = 90 + 80 + 70 − (30 + 25 + 20) + 10 = 240 − 75 + 10 = 175 students.',
    topic: 'Data Interpretation - Venn Diagrams'
  },
  {
    id: 68,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    scenarioTitle: 'DI Set 2 (Q67 - Q70): Elective Course Enrolments',
    scenarioText: `Elective Enrolments among 200 Students in AI, Data Analytics (DA), and Cyber Security (CS):\n• 90 enrolled in AI; 80 in DA; 70 in CS.\n• 30 enrolled in AI & DA; 25 in DA & CS; 20 in AI & CS.\n• 10 enrolled in all three courses.`,
    questionNumber: 68,
    questionText: 'How many students enrolled in EXACTLY one course?',
    options: ['120', '115', '125', '110', '130'],
    correctAnswer: 0,
    solution: '• Exactly 2 courses = (30 − 10) + (25 − 10) + (20 − 10) = 20 + 15 + 10 = 45.\n• All 3 courses = 10.\n• Total enrolled in at least one = 175.\n• Exactly 1 course = 175 − 45 − 10 = 120 students.',
    topic: 'Data Interpretation - Venn Diagrams'
  },
  {
    id: 69,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    scenarioTitle: 'DI Set 2 (Q67 - Q70): Elective Course Enrolments',
    scenarioText: `Elective Enrolments among 200 Students in AI, Data Analytics (DA), and Cyber Security (CS):\n• 90 enrolled in AI; 80 in DA; 70 in CS.\n• 30 enrolled in AI & DA; 25 in DA & CS; 20 in AI & CS.\n• 10 enrolled in all three courses.`,
    questionNumber: 69,
    questionText: 'How many students enrolled in NONE of these courses?',
    options: ['35', '30', '40', '25', '45'],
    correctAnswer: 3,
    solution: 'Total students = 200. Taking at least one = 175.\nNone = 200 − 175 = 25 students.',
    topic: 'Data Interpretation - Venn Diagrams'
  },
  {
    id: 70,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    scenarioTitle: 'DI Set 2 (Q67 - Q70): Elective Course Enrolments',
    scenarioText: `Elective Enrolments among 200 Students in AI, Data Analytics (DA), and Cyber Security (CS):\n• 90 enrolled in AI; 80 in DA; 70 in CS.\n• 30 enrolled in AI & DA; 25 in DA & CS; 20 in AI & CS.\n• 10 enrolled in all three courses.`,
    questionNumber: 70,
    questionText: 'How many students enrolled in AI but NOT DA?',
    options: ['60', '50', '55', '65', '70'],
    correctAnswer: 0,
    solution: 'Total AI students = 90. Enrolled in both AI and DA = 30.\nStudents enrolled in AI but not DA = 90 − 30 = 60.',
    topic: 'Data Interpretation - Set Operations'
  },

  // DI Set 3 (Q71 - Q75): Sports League Points Table
  {
    id: 71,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    scenarioTitle: 'DI Set 3 (Q71 - Q75): Sports League Points Table',
    scenarioText: `Sports League Points Table: Teams A, B, C, D play a round-robin tournament (Win = 3 pts, Draw = 1 pt, Loss = 0 pt).\n• Team A: 7 pts (2 Wins, 1 Draw, 0 Loss)\n• Team B: 4 pts (1 Win, 1 Draw, 1 Loss)\n• Team C: 3 pts (0 Win, 3 Draws, 0 Loss)\n• Team D: 1 pt (0 Win, 1 Draw, 2 Loss)`,
    questionNumber: 71,
    questionText: 'Total number of matches played in tournament?',
    options: ['6', '8', '12', '4', '10'],
    correctAnswer: 0,
    solution: 'In a 4-team round-robin tournament, total matches = ⁴C₂ = (4 × 3)/2 = 6 matches.',
    topic: 'Logical Reasoning - Round Robin Tournaments'
  },
  {
    id: 72,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    scenarioTitle: 'DI Set 3 (Q71 - Q75): Sports League Points Table',
    scenarioText: `Sports League Points Table: Teams A, B, C, D play a round-robin tournament (Win = 3 pts, Draw = 1 pt, Loss = 0 pt).\n• Team A: 7 pts (2 Wins, 1 Draw, 0 Loss)\n• Team B: 4 pts (1 Win, 1 Draw, 1 Loss)\n• Team C: 3 pts (0 Win, 3 Draws, 0 Loss)\n• Team D: 1 pt (0 Win, 1 Draw, 2 Loss)`,
    questionNumber: 72,
    questionText: 'Outcome of match between Team A and Team D?',
    options: ['Team A won', 'Team D won', 'Draw', 'Match cancelled', 'Cannot be determined'],
    correctAnswer: 0,
    solution: 'Team A drew with Team C (Team C drew all 3 matches). Team A won its other 2 matches against Team B and Team D.',
    topic: 'Logical Reasoning - Match Deductions'
  },
  {
    id: 73,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    scenarioTitle: 'DI Set 3 (Q71 - Q75): Sports League Points Table',
    scenarioText: `Sports League Points Table: Teams A, B, C, D play a round-robin tournament (Win = 3 pts, Draw = 1 pt, Loss = 0 pt).\n• Team A: 7 pts (2 Wins, 1 Draw, 0 Loss)\n• Team B: 4 pts (1 Win, 1 Draw, 1 Loss)\n• Team C: 3 pts (0 Win, 3 Draws, 0 Loss)\n• Team D: 1 pt (0 Win, 1 Draw, 2 Loss)`,
    questionNumber: 73,
    questionText: 'Which team did Team B defeat?',
    options: ['Team D', 'Team C', 'Team A', 'Cannot be determined', 'None'],
    correctAnswer: 0,
    solution: 'Team B lost to Team A and drew with Team C. Hence, Team B\'s single win was against Team D.',
    topic: 'Logical Reasoning - Match Deductions'
  },
  {
    id: 74,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    scenarioTitle: 'DI Set 3 (Q71 - Q75): Sports League Points Table',
    scenarioText: `Sports League Points Table: Teams A, B, C, D play a round-robin tournament (Win = 3 pts, Draw = 1 pt, Loss = 0 pt).\n• Team A: 7 pts (2 Wins, 1 Draw, 0 Loss)\n• Team B: 4 pts (1 Win, 1 Draw, 1 Loss)\n• Team C: 3 pts (0 Win, 3 Draws, 0 Loss)\n• Team D: 1 pt (0 Win, 1 Draw, 2 Loss)`,
    questionNumber: 74,
    questionText: 'Total matches ending in a DRAW?',
    options: ['3', '4', '2', '5', '1'],
    correctAnswer: 0,
    solution: 'Team C drew all 3 of its matches (vs A, vs B, and vs D). None of the other 3 matches ended in a draw. Total draw matches = 3.',
    topic: 'Logical Reasoning - Points Table'
  },
  {
    id: 75,
    section: 'qadi',
    sectionName: 'QA & Data Interpretation',
    scenarioTitle: 'DI Set 3 (Q71 - Q75): Sports League Points Table',
    scenarioText: `Sports League Points Table: Teams A, B, C, D play a round-robin tournament (Win = 3 pts, Draw = 1 pt, Loss = 0 pt).\n• Team A: 7 pts (2 Wins, 1 Draw, 0 Loss)\n• Team B: 4 pts (1 Win, 1 Draw, 1 Loss)\n• Team C: 3 pts (0 Win, 3 Draws, 0 Loss)\n• Team D: 1 pt (0 Win, 1 Draw, 2 Loss)`,
    questionNumber: 75,
    questionText: 'Total combined points accumulated by all 4 teams?',
    options: ['15', '18', '16', '12', '14'],
    correctAnswer: 0,
    solution: 'Total points = 7 (Team A) + 4 (Team B) + 3 (Team C) + 1 (Team D) = 15 points.',
    topic: 'Logical Reasoning - Summation'
  },

  // =========================================================================
  // SECTION IV: GENERAL KNOWLEDGE (GK) (20 Questions, Q76 - Q95)
  // =========================================================================

  {
    id: 76,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 76,
    questionText: 'Which Indian state is home to the Kaziranga National Park, famous for one-horned rhinoceroses?',
    options: ['Assam', 'West Bengal', 'Odisha', 'Uttarakhand', 'Meghalaya'],
    correctAnswer: 0,
    solution: 'Kaziranga National Park is located in the Golaghat and Nagaon districts of Assam, and hosts two-thirds of the world\'s great one-horned rhinoceroses.',
    topic: 'Static GK - National Parks of India'
  },
  {
    id: 77,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 77,
    questionText: 'Who among the following is the current Governor of the Reserve Bank of India (RBI)?',
    options: ['Shaktikanta Das', 'Urjit Patel', 'Raghuram Rajan', 'Nirmala Sitharaman', 'Arvind Subramanian'],
    correctAnswer: 0,
    solution: 'Shaktikanta Das is the 25th Governor of the Reserve Bank of India (RBI).',
    topic: 'Current Affairs & Economy - Indian Banking'
  },
  {
    id: 78,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 78,
    questionText: 'What is the capital city of Australia?',
    options: ['Canberra', 'Sydney', 'Melbourne', 'Brisbane', 'Perth'],
    correctAnswer: 0,
    solution: 'Canberra is the federal capital city of Australia.',
    topic: 'Static GK - World Geography & Capitals'
  },
  {
    id: 79,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 79,
    questionText: "Which international organization publishes the annual 'World Economic Outlook' report?",
    options: ['International Monetary Fund (IMF)', 'World Bank', 'World Trade Organization (WTO)', 'WEF', 'UNDP'],
    correctAnswer: 0,
    solution: 'The World Economic Outlook (WEO) is a survey conducted and published semiannually by the International Monetary Fund (IMF).',
    topic: 'Current Affairs - Global Reports & Indices'
  },
  {
    id: 80,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 80,
    questionText: 'Which element has the highest electrical conductivity among all metals?',
    options: ['Silver', 'Copper', 'Gold', 'Aluminum', 'Iron'],
    correctAnswer: 0,
    solution: 'Silver has the highest electrical conductivity of any metal, followed by copper and gold.',
    topic: 'General Science - Physics & Chemistry'
  },
  {
    id: 81,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 81,
    questionText: 'Headquarter of the United Nations Educational, Scientific and Cultural Organization (UNESCO) is in:',
    options: ['Paris, France', 'Geneva, Switzerland', 'New York, USA', 'Vienna, Austria', 'Rome, Italy'],
    correctAnswer: 0,
    solution: 'UNESCO is headquartered in Paris, France.',
    topic: 'Static GK - International Organizations'
  },
  {
    id: 82,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 82,
    questionText: 'Which Indian Space Mission successfully landed near the Lunar South Pole?',
    options: ['Chandrayaan-3', 'Chandrayaan-2', 'Mangalyaan', 'Aditya-L1', 'Gaganyaan'],
    correctAnswer: 0,
    solution: 'ISRO\'s Chandrayaan-3 successfully accomplished a historic soft landing near the south pole of the Moon on August 23, 2023.',
    topic: 'Current Affairs & Science - Space Missions'
  },
  {
    id: 83,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 83,
    questionText: 'What is the currency of Japan?',
    options: ['Yen', 'Yuan', 'Won', 'Ringgit', 'Baht'],
    correctAnswer: 0,
    solution: 'The Japanese Yen (¥) is the official currency of Japan.',
    topic: 'Static GK - Currencies of the World'
  },
  {
    id: 84,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 84,
    questionText: 'Who was the first Chief Justice of India?',
    options: ['H. J. Kania', 'M. Patanjali Sastri', 'B. K. Mukherjea', 'K. Subba Rao', 'Y. V. Chandrachud'],
    correctAnswer: 0,
    solution: 'Sir Harilal Jekisundas Kania was the first Chief Justice of India (1950–1951).',
    topic: 'Static GK - Indian Polity & History'
  },
  {
    id: 85,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 85,
    questionText: 'Which article of the Indian Constitution guarantees the Right to Equality before Law?',
    options: ['Article 14', 'Article 19', 'Article 21', 'Article 32', 'Article 44'],
    correctAnswer: 0,
    solution: 'Article 14 of the Constitution of India guarantees equality before law and equal protection of laws to all persons within the territory of India.',
    topic: 'Static GK - Indian Constitution'
  },
  {
    id: 86,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 86,
    questionText: "The term 'Bull and Bear' is associated with which financial sector?",
    options: ['Stock Market', 'Commercial Banking', 'Real Estate', 'Foreign Exchange', 'Insurance'],
    correctAnswer: 0,
    solution: "In stock markets, a 'Bull' represents an upward market trend/optimism, while a 'Bear' represents a downward trend/pessimism.",
    topic: 'Business & Financial Awareness'
  },
  {
    id: 87,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 87,
    questionText: "Which Indian river is also known as 'Dakshin Ganga'?",
    options: ['Godavari', 'Krishna', 'Kaveri', 'Narmada', 'Mahanadi'],
    correctAnswer: 0,
    solution: 'Godavari is the second longest river in India and is widely referred to as Dakshin Ganga (Ganges of the South).',
    topic: 'Static GK - Indian Geography & Rivers'
  },
  {
    id: 88,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 88,
    questionText: "Who wrote the famous historical book 'Discovery of India'?",
    options: ['Jawaharlal Nehru', 'Mahatma Gandhi', 'Rabindranath Tagore', 'B. R. Ambedkar', 'Subhash Chandra Bose'],
    correctAnswer: 0,
    solution: "'The Discovery of India' was written by India's first Prime Minister, Pandit Jawaharlal Nehru, during his imprisonment at Ahmednagar Fort (1942–1946).",
    topic: 'Static GK - Famous Books & Authors'
  },
  {
    id: 89,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 89,
    questionText: "Which gas is primarily responsible for the Greenhouse Effect in Earth's atmosphere?",
    options: ['Carbon Dioxide (CO₂)', 'Oxygen (O₂)', 'Nitrogen (N₂)', 'Argon (Ar)', 'Helium (He)'],
    correctAnswer: 0,
    solution: 'Carbon dioxide (CO₂), along with water vapor and methane, is one of the principal greenhouse gases driving global warming.',
    topic: 'General Science & Environment'
  },
  {
    id: 90,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 90,
    questionText: 'Nobel Prize in Peace 2023 was awarded to:',
    options: ['Narges Mohammadi', 'Maria Ressa', 'Malala Yousafzai', 'Nadia Murad', 'Ales Bialiatski'],
    correctAnswer: 0,
    solution: 'The Nobel Peace Prize 2023 was awarded to Iranian human rights activist Narges Mohammadi for her fight against the oppression of women in Iran.',
    topic: 'Current Affairs - Nobel Prizes'
  },
  {
    id: 91,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 91,
    questionText: "Which country hosted the G20 Leaders' Summit in September 2023 under presidency theme 'Vasudhaiva Kutumbakam'?",
    options: ['India', 'Brazil', 'Indonesia', 'South Africa', 'Japan'],
    correctAnswer: 0,
    solution: 'India hosted the 18th G20 Summit in New Delhi at Bharat Mandapam in September 2023 under the theme \'One Earth, One Family, One Future\'.',
    topic: 'Current Affairs - International Summits'
  },
  {
    id: 92,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 92,
    questionText: "What does 'UPI' stand for in Indian digital payments?",
    options: [
      'Unified Payments Interface',
      'Universal Payment Integration',
      'United Payment Instrument',
      'Unified Payment Infrastructure',
      'Universal Public Interface'
    ],
    correctAnswer: 0,
    solution: 'UPI stands for Unified Payments Interface, developed by National Payments Corporation of India (NPCI).',
    topic: 'Business & Digital Banking'
  },
  {
    id: 93,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 93,
    questionText: "Which chemical compound is commonly known as 'Baking Soda'?",
    options: [
      'Sodium Bicarbonate',
      'Sodium Carbonate',
      'Sodium Chloride',
      'Calcium Carbonate',
      'Potassium Nitrate'
    ],
    correctAnswer: 0,
    solution: 'Sodium Bicarbonate (NaHCO₃) is the chemical compound commonly known as Baking Soda.',
    topic: 'General Science - Everyday Chemistry'
  },
  {
    id: 94,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 94,
    questionText: 'Which is the smallest continent by land area?',
    options: ['Australia', 'Europe', 'Antarctica', 'South America', 'Africa'],
    correctAnswer: 0,
    solution: 'Australia (Oceania) is the smallest continent by land area, covering approximately 7.7 million square kilometers.',
    topic: 'Static GK - World Geography'
  },
  {
    id: 95,
    section: 'gk',
    sectionName: 'General Knowledge',
    questionNumber: 95,
    questionText: 'The Tropic of Cancer does NOT pass through which Indian state?',
    options: ['Odisha', 'Rajasthan', 'Gujarat', 'Madhya Pradesh', 'Chhattisgarh'],
    correctAnswer: 0,
    solution: 'The Tropic of Cancer passes through 8 Indian states: Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram. It does not pass through Odisha.',
    topic: 'Static GK - Indian Geography'
  }
];
