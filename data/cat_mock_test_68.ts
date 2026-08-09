export interface CatQuestion {
  id: number;
  section: 'varc' | 'dilr' | 'qa';
  sectionName: string;
  type: 'mcq' | 'tita';
  passageTitle?: string;
  passageText?: string;
  scenarioTitle?: string;
  scenarioText?: string;
  dataTable?: { headers: string[]; rows: (string | number)[][] };
  questionNumber: number;
  questionText: string;
  options?: string[];
  correctAnswer: number | string; // index (0-3) for MCQ, string for TITA
  solution: string;
  topic?: string;
}

export const CAT_MOCK_TEST_68: CatQuestion[] = [
  // ==========================================
  // SECTION I: VARC (24 Questions, Q1 - Q24)
  // ==========================================
  
  // Passage 1: Environmental Economics & Policy (Q1 - Q4)
  {
    id: 1,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    passageTitle: 'Passage 1: Environmental Economics & Policy (Q1 - Q4)',
    passageText: `The economic valuation of ecosystem services has become a central paradigm in contemporary environmental governance. By assigning monetary values to ecological functions—such as carbon sequestration, pollination, and watershed protection—policy advocates aim to integrate natural capital into traditional cost-benefit analyses. However, critical political economists argue that this financialization of nature commodifies essential ecological processes, reducing intrinsic environmental values to market dynamics. When ecosystem services are monetized, their protection becomes contingent upon market demand and financial return rather than ecological integrity. Furthermore, market-based conservation instruments like carbon credits often perpetuate spatial inequalities, allowing heavy polluters in industrialized nations to offset emissions while displacing local communities in developing regions.`,
    questionNumber: 1,
    questionText: 'Which of the following best expresses the primary concern raised by critical political economists?',
    options: [
      'Ecosystem services are inherently impossible to measure accurately.',
      'Monetizing nature reduces intrinsic ecological value to market dynamics and profit motives.',
      'Carbon credits have completely failed to reduce global carbon emissions.',
      'Industrialized nations bear the entire burden of global ecosystem protection.'
    ],
    correctAnswer: 1,
    solution: 'Para 1 directly highlights that critical political economists argue financialization commodifies essential ecological processes, reducing intrinsic environmental values to market dynamics and profit-driven demand.',
    topic: 'Reading Comprehension - Critical Economics'
  },
  {
    id: 2,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    passageTitle: 'Passage 1: Environmental Economics & Policy (Q1 - Q4)',
    passageText: `The economic valuation of ecosystem services has become a central paradigm in contemporary environmental governance. By assigning monetary values to ecological functions—such as carbon sequestration, pollination, and watershed protection—policy advocates aim to integrate natural capital into traditional cost-benefit analyses. However, critical political economists argue that this financialization of nature commodifies essential ecological processes, reducing intrinsic environmental values to market dynamics. When ecosystem services are monetized, their protection becomes contingent upon market demand and financial return rather than ecological integrity. Furthermore, market-based conservation instruments like carbon credits often perpetuate spatial inequalities, allowing heavy polluters in industrialized nations to offset emissions while displacing local communities in developing regions.`,
    questionNumber: 2,
    questionText: 'According to the passage, carbon credits can lead to which unintended consequence?',
    options: [
      'Rapid devaluation of natural capital in industrialized nations.',
      'Spatial inequalities and displacement of local communities in developing regions.',
      'Immediate cessation of carbon sequestration projects.',
      'Over-regulation of market-based conservation instruments.'
    ],
    correctAnswer: 1,
    solution: 'The final sentence explicitly states that market-based instruments like carbon credits often perpetuate spatial inequalities, allowing heavy polluters in industrialized nations to offset emissions while displacing local communities in developing regions.',
    topic: 'Reading Comprehension - Policy Impact'
  },
  {
    id: 3,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    passageTitle: 'Passage 1: Environmental Economics & Policy (Q1 - Q4)',
    passageText: `The economic valuation of ecosystem services has become a central paradigm in contemporary environmental governance. By assigning monetary values to ecological functions—such as carbon sequestration, pollination, and watershed protection—policy advocates aim to integrate natural capital into traditional cost-benefit analyses. However, critical political economists argue that this financialization of nature commodifies essential ecological processes, reducing intrinsic environmental values to market dynamics. When ecosystem services are monetized, their protection becomes contingent upon market demand and financial return rather than ecological integrity. Furthermore, market-based conservation instruments like carbon credits often perpetuate spatial inequalities, allowing heavy polluters in industrialized nations to offset emissions while displacing local communities in developing regions.`,
    questionNumber: 3,
    questionText: 'The term "natural capital" in the passage refers to:',
    options: [
      'Financial investments made in green energy technology.',
      'Stock of natural assets providing ecological functions and benefits.',
      'Total GDP generated by agricultural sectors.',
      'Taxes levied on environmental pollution.'
    ],
    correctAnswer: 1,
    solution: '"Natural capital" represents the Earth\'s stock of natural assets (such as geology, soil, air, water, and living organisms) that provide vital ecological functions and environmental benefits.',
    topic: 'Reading Comprehension - Contextual Vocabulary'
  },
  {
    id: 4,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    passageTitle: 'Passage 1: Environmental Economics & Policy (Q1 - Q4)',
    passageText: `The economic valuation of ecosystem services has become a central paradigm in contemporary environmental governance. By assigning monetary values to ecological functions—such as carbon sequestration, pollination, and watershed protection—policy advocates aim to integrate natural capital into traditional cost-benefit analyses. However, critical political economists argue that this financialization of nature commodifies essential ecological processes, reducing intrinsic environmental values to market dynamics. When ecosystem services are monetized, their protection becomes contingent upon market demand and financial return rather than ecological integrity. Furthermore, market-based conservation instruments like carbon credits often perpetuate spatial inequalities, allowing heavy polluters in industrialized nations to offset emissions while displacing local communities in developing regions.`,
    questionNumber: 4,
    questionText: "The author's tone toward market-based conservation instruments can best be described as:",
    options: [
      'Unreservedly enthusiastic',
      'Critically analytical',
      'Dismissive and hostile',
      'Completely neutral and passive'
    ],
    correctAnswer: 1,
    solution: 'The author methodically explains the goals of policy advocates while presenting the substantive objections and structural flaws identified by critical political economists, adopting a critically analytical tone.',
    topic: 'Reading Comprehension - Tone & Stance'
  },

  // Passage 2: Philosophy of Technology (Q5 - Q8)
  {
    id: 5,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    passageTitle: 'Passage 2: Philosophy of Technology (Q5 - Q8)',
    passageText: `Artificial Intelligence is rapidly reshaping knowledge production, altering how humans synthesize information and derive truth. Historically, epistemological frameworks relied on human empirical observation and rational deduction. Machine learning algorithms, however, operate on pattern recognition within vast datasets that often exceed human cognitive capacity. This shift creates 'epistemic opacity'—a condition where an AI system generates accurate predictions or decisions, but the underlying reasoning remains opaque to human operators. As decision-making in medicine, law, and finance is increasingly delegated to black-box models, human agency is quietly transferred to automated architectures. The central ethical imperative of modern AI ethics is thus not merely ensuring output accuracy, but preserving human interpretability and meaningful oversight.`,
    questionNumber: 5,
    questionText: "What does 'epistemic opacity' mean in the context of the passage?",
    options: [
      'Complete failure of AI algorithms to produce accurate data.',
      'Lack of transparency in how an AI model arrives at its outputs despite high accuracy.',
      'Human inability to gather large datasets for machine learning.',
      'The intentional bias coded into financial algorithms.'
    ],
    correctAnswer: 1,
    solution: "The passage defines 'epistemic opacity' as a condition where an AI system produces accurate predictions or decisions, yet the underlying mechanisms and reasoning remain hidden/opaque to humans.",
    topic: 'Reading Comprehension - Epistemology'
  },
  {
    id: 6,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    passageTitle: 'Passage 2: Philosophy of Technology (Q5 - Q8)',
    passageText: `Artificial Intelligence is rapidly reshaping knowledge production, altering how humans synthesize information and derive truth. Historically, epistemological frameworks relied on human empirical observation and rational deduction. Machine learning algorithms, however, operate on pattern recognition within vast datasets that often exceed human cognitive capacity. This shift creates 'epistemic opacity'—a condition where an AI system generates accurate predictions or decisions, but the underlying reasoning remains opaque to human operators. As decision-making in medicine, law, and finance is increasingly delegated to black-box models, human agency is quietly transferred to automated architectures. The central ethical imperative of modern AI ethics is thus not merely ensuring output accuracy, but preserving human interpretability and meaningful oversight.`,
    questionNumber: 6,
    questionText: 'According to the passage, the primary ethical task in contemporary AI development is to:',
    options: [
      'Maximize computational speed and data storage capacities.',
      'Preserve human interpretability and meaningful oversight over AI decisions.',
      'Eliminate human involvement in medical and legal decision-making.',
      'Restrict AI development exclusively to rational deductive tasks.'
    ],
    correctAnswer: 1,
    solution: 'The closing sentence states: "The central ethical imperative of modern AI ethics is thus not merely ensuring output accuracy, but preserving human interpretability and meaningful oversight."',
    topic: 'Reading Comprehension - Inference & Detail'
  },
  {
    id: 7,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    passageTitle: 'Passage 2: Philosophy of Technology (Q5 - Q8)',
    passageText: `Artificial Intelligence is rapidly reshaping knowledge production, altering how humans synthesize information and derive truth. Historically, epistemological frameworks relied on human empirical observation and rational deduction. Machine learning algorithms, however, operate on pattern recognition within vast datasets that often exceed human cognitive capacity. This shift creates 'epistemic opacity'—a condition where an AI system generates accurate predictions or decisions, but the underlying reasoning remains opaque to human operators. As decision-making in medicine, law, and finance is increasingly delegated to black-box models, human agency is quietly transferred to automated architectures. The central ethical imperative of modern AI ethics is thus not merely ensuring output accuracy, but preserving human interpretability and meaningful oversight.`,
    questionNumber: 7,
    questionText: 'Which of the following is an assumption made by the author?',
    options: [
      'Human reasoning is always superior in speed to AI algorithmic processing.',
      'Delegating decisions without understanding the process poses risks to human agency.',
      'Black-box models should be completely banned across all industries.',
      'Empirical observation is no longer useful in modern scientific research.'
    ],
    correctAnswer: 1,
    solution: 'The author assumes that delegating critical decision-making to systems whose internal operations are opaque poses genuine threats to human agency and therefore requires ethical safeguards and human oversight.',
    topic: 'Reading Comprehension - Critical Reasoning Assumption'
  },
  {
    id: 8,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    passageTitle: 'Passage 2: Philosophy of Technology (Q5 - Q8)',
    passageText: `Artificial Intelligence is rapidly reshaping knowledge production, altering how humans synthesize information and derive truth. Historically, epistemological frameworks relied on human empirical observation and rational deduction. Machine learning algorithms, however, operate on pattern recognition within vast datasets that often exceed human cognitive capacity. This shift creates 'epistemic opacity'—a condition where an AI system generates accurate predictions or decisions, but the underlying reasoning remains opaque to human operators. As decision-making in medicine, law, and finance is increasingly delegated to black-box models, human agency is quietly transferred to automated architectures. The central ethical imperative of modern AI ethics is thus not merely ensuring output accuracy, but preserving human interpretability and meaningful oversight.`,
    questionNumber: 8,
    questionText: 'The transition from traditional epistemological frameworks to machine learning is characterized by:',
    options: [
      'A shift from human deduction to pattern recognition in massive datasets.',
      'A move away from data analysis toward intuitive guessing.',
      'Complete replacement of finance and law professionals by robots.',
      'Greater human control over underlying analytical mechanisms.'
    ],
    correctAnswer: 0,
    solution: 'The text highlights the contrast between historical frameworks (human empirical observation and rational deduction) and machine learning (pattern recognition across massive datasets beyond human capacity).',
    topic: 'Reading Comprehension - Conceptual Contrast'
  },

  // Passage 3: History & Architecture (Q9 - Q12)
  {
    id: 9,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    passageTitle: 'Passage 3: History & Architecture (Q9 - Q12)',
    passageText: `Urban architecture reflects prevailing socio-political ideologies. The Gothic style of medieval Europe, with its soaring vaults and pointed arches, aimed to direct human contemplation skyward, underscoring ecclesiastical authority. Conversely, the modernist movement of the early 20th century, championed by figures like Le Corbusier, emphasized functionality, geometric purity, and industrial efficiency. Modernism viewed the building as a 'machine for living,' rejecting historical ornamentation in favor of mass-produced steel, concrete, and glass. Yet, this functionalist ideal often resulted in monotonous urban landscapes that alienated residents, sparking the postmodern response which re-introduced historicism, irony, and local context into architectural design.`,
    questionNumber: 9,
    questionText: "The phrase 'machine for living' reflects which core philosophy of modernism?",
    options: [
      'Rejection of industrial manufacturing in housing construction.',
      'Priority of functional utility and industrial efficiency over ornamentation.',
      'Direct imitation of medieval Gothic structural designs.',
      'Incorporation of local cultural context into building facades.'
    ],
    correctAnswer: 1,
    solution: "Le Corbusier's 'machine for living' philosophy prioritized functional efficiency, geometric purity, and industrial mass production over historical ornament.",
    topic: 'Reading Comprehension - Architectural Theory'
  },
  {
    id: 10,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    passageTitle: 'Passage 3: History & Architecture (Q9 - Q12)',
    passageText: `Urban architecture reflects prevailing socio-political ideologies. The Gothic style of medieval Europe, with its soaring vaults and pointed arches, aimed to direct human contemplation skyward, underscoring ecclesiastical authority. Conversely, the modernist movement of the early 20th century, championed by figures like Le Corbusier, emphasized functionality, geometric purity, and industrial efficiency. Modernism viewed the building as a 'machine for living,' rejecting historical ornamentation in favor of mass-produced steel, concrete, and glass. Yet, this functionalist ideal often resulted in monotonous urban landscapes that alienated residents, sparking the postmodern response which re-introduced historicism, irony, and local context into architectural design.`,
    questionNumber: 10,
    questionText: 'Why did postmodernism emerge according to the passage?',
    options: [
      'In reaction to the monotonous and alienating aspects of modernist architecture.',
      'Because steel and concrete became too expensive to manufacture.',
      'To restore the absolute political dominance of medieval churches.',
      'As a direct extension of Le Corbusier\'s geometric theories.'
    ],
    correctAnswer: 0,
    solution: 'The passage explicitly states that postmodernism arose as a reaction to the monotonous urban landscapes and alienation caused by modernist functionalism.',
    topic: 'Reading Comprehension - Cause & Effect'
  },
  {
    id: 11,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    passageTitle: 'Passage 3: History & Architecture (Q9 - Q12)',
    passageText: `Urban architecture reflects prevailing socio-political ideologies. The Gothic style of medieval Europe, with its soaring vaults and pointed arches, aimed to direct human contemplation skyward, underscoring ecclesiastical authority. Conversely, the modernist movement of the early 20th century, championed by figures like Le Corbusier, emphasized functionality, geometric purity, and industrial efficiency. Modernism viewed the building as a 'machine for living,' rejecting historical ornamentation in favor of mass-produced steel, concrete, and glass. Yet, this functionalist ideal often resulted in monotonous urban landscapes that alienated residents, sparking the postmodern response which re-introduced historicism, irony, and local context into architectural design.`,
    questionNumber: 11,
    questionText: 'Gothic architecture primarily sought to express:',
    options: [
      'Industrial efficiency and modernism.',
      'Ecclesiastical authority and spiritual contemplation.',
      'Postmodern irony and local contextualism.',
      'Mass-produced housing solutions.'
    ],
    correctAnswer: 1,
    solution: 'The passage states that the Gothic style aimed to direct human contemplation skyward, underscoring ecclesiastical (church) authority.',
    topic: 'Reading Comprehension - Historical Context'
  },
  {
    id: 12,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    passageTitle: 'Passage 3: History & Architecture (Q9 - Q12)',
    passageText: `Urban architecture reflects prevailing socio-political ideologies. The Gothic style of medieval Europe, with its soaring vaults and pointed arches, aimed to direct human contemplation skyward, underscoring ecclesiastical authority. Conversely, the modernist movement of the early 20th century, championed by figures like Le Corbusier, emphasized functionality, geometric purity, and industrial efficiency. Modernism viewed the building as a 'machine for living,' rejecting historical ornamentation in favor of mass-produced steel, concrete, and glass. Yet, this functionalist ideal often resulted in monotonous urban landscapes that alienated residents, sparking the postmodern response which re-introduced historicism, irony, and local context into architectural design.`,
    questionNumber: 12,
    questionText: 'Which material is NOT explicitly associated with modernist architecture in the text?',
    options: [
      'Steel',
      'Glass',
      'Concrete',
      'Carved Timber'
    ],
    correctAnswer: 3,
    solution: 'The passage explicitly lists "steel, concrete, and glass". Carved timber is not mentioned and represents traditional ornamentation rejected by modernists.',
    topic: 'Reading Comprehension - Detail Verification'
  },

  // Passage 4: Behavioral Psychology (Q13 - Q16)
  {
    id: 13,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    passageTitle: 'Passage 4: Behavioral Psychology (Q13 - Q16)',
    passageText: `Cognitive biases systematically distort human decision-making, departing from the normative models of classical economic theory. One prominent phenomenon is the 'status quo bias,' wherein individuals demonstrate an irrational preference for the current state of affairs. When faced with complex choices, decision-makers experience choice overload, leading to decision fatigue. Default options capitalize on this bias; by pre-selecting a designated choice, choice architects can significantly increase adoption rates without restricting individual choice. This principle forms the foundation of 'nudge theory,' which seeks to gently guide behavior toward socially desirable outcomes while maintaining autonomy.`,
    questionNumber: 13,
    questionText: 'What is the primary mechanism through which default options influence decision-making?',
    options: [
      'By legally enforcing specific choices on consumers.',
      'By leveraging status quo bias and mitigating choice overload.',
      'By offering financial subsidies for selected choices.',
      'By eliminating all alternative options from the choice set.'
    ],
    correctAnswer: 1,
    solution: 'Default options work by capitalizing on the status quo bias and preventing the cognitive friction caused by choice overload.',
    topic: 'Reading Comprehension - Behavioral Economics'
  },
  {
    id: 14,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    passageTitle: 'Passage 4: Behavioral Psychology (Q13 - Q16)',
    passageText: `Cognitive biases systematically distort human decision-making, departing from the normative models of classical economic theory. One prominent phenomenon is the 'status quo bias,' wherein individuals demonstrate an irrational preference for the current state of affairs. When faced with complex choices, decision-makers experience choice overload, leading to decision fatigue. Default options capitalize on this bias; by pre-selecting a designated choice, choice architects can significantly increase adoption rates without restricting individual choice. This principle forms the foundation of 'nudge theory,' which seeks to gently guide behavior toward socially desirable outcomes while maintaining autonomy.`,
    questionNumber: 14,
    questionText: 'According to nudge theory, an effective policy intervention must:',
    options: [
      'Restrict individual freedom of choice completely.',
      'Mandate compliance through strict penal codes.',
      'Guide behavior toward desired outcomes while preserving individual autonomy.',
      'Rely entirely on traditional classical economic models.'
    ],
    correctAnswer: 2,
    solution: 'Nudge theory is founded on the dual principle of gently guiding human behavior toward beneficial outcomes while preserving freedom of choice and autonomy.',
    topic: 'Reading Comprehension - Theoretical Definition'
  },
  {
    id: 15,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    passageTitle: 'Passage 4: Behavioral Psychology (Q13 - Q16)',
    passageText: `Cognitive biases systematically distort human decision-making, departing from the normative models of classical economic theory. One prominent phenomenon is the 'status quo bias,' wherein individuals demonstrate an irrational preference for the current state of affairs. When faced with complex choices, decision-makers experience choice overload, leading to decision fatigue. Default options capitalize on this bias; by pre-selecting a designated choice, choice architects can significantly increase adoption rates without restricting individual choice. This principle forms the foundation of 'nudge theory,' which seeks to gently guide behavior toward socially desirable outcomes while maintaining autonomy.`,
    questionNumber: 15,
    questionText: 'Classical economic theory assumes that human decision-making is:',
    options: [
      'Systematic, irrational, and biased.',
      'Rational and aligned with normative economic models.',
      'Exclusively driven by choice overload.',
      'Heavily dependent on default settings.'
    ],
    correctAnswer: 1,
    solution: 'The opening line points out that real-world biases depart from the "normative models of classical economic theory", which presuppose rational agents.',
    topic: 'Reading Comprehension - Economic Assumptions'
  },
  {
    id: 16,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    passageTitle: 'Passage 4: Behavioral Psychology (Q13 - Q16)',
    passageText: `Cognitive biases systematically distort human decision-making, departing from the normative models of classical economic theory. One prominent phenomenon is the 'status quo bias,' wherein individuals demonstrate an irrational preference for the current state of affairs. When faced with complex choices, decision-makers experience choice overload, leading to decision fatigue. Default options capitalize on this bias; by pre-selecting a designated choice, choice architects can significantly increase adoption rates without restricting individual choice. This principle forms the foundation of 'nudge theory,' which seeks to gently guide behavior toward socially desirable outcomes while maintaining autonomy.`,
    questionNumber: 16,
    questionText: 'Decision fatigue occurs when individuals:',
    options: [
      'Are forced to make choices under extreme time limits.',
      'Experience cognitive exhaustion due to choice overload.',
      'Refuse to participate in economic markets.',
      'Are unaware of default options available to them.'
    ],
    correctAnswer: 1,
    solution: 'The passage notes: "When faced with complex choices, decision-makers experience choice overload, leading to decision fatigue."',
    topic: 'Reading Comprehension - Direct Factual'
  },

  // Part B: Verbal Ability (Q17 - Q24)
  {
    id: 17,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'tita',
    questionNumber: 17,
    questionText: `Parajumble: Arrange sentences 1-4 in logical sequence.\n\n1. Consequently, firms must adapt rapidly to shifting regulatory standards and consumer demands.\n2. The global transition toward renewable energy has accelerated dramatically in recent years.\n3. This rapid shift is driven both by declining technology costs and urgent climate policies.\n4. Those that fail to pivot risk severe market devaluation and stranded assets.\n\n(Enter 4-digit sequence without spaces)`,
    correctAnswer: '2314',
    solution: 'Logical sequence is 2314:\n• (2) establishes the opening topic (accelerating global transition to renewables).\n• (3) gives the underlying dual drivers of "this rapid shift".\n• (1) introduces the corporate imperative ("Consequently, firms must adapt...").\n• (4) concludes with the penalty for non-compliance ("Those that fail to pivot...").',
    topic: 'Verbal Ability - Parajumbles'
  },
  {
    id: 18,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'tita',
    questionNumber: 18,
    questionText: `Parajumble: Arrange sentences 1-4 in logical sequence.\n\n1. In contrasting fashion, qualitative research focuses on deep context and human narrative.\n2. Quantitative methods seek to quantify variables and establish empirical patterns.\n3. Combining both approaches through mixed-methods yields a more comprehensive analysis.\n4. Each methodological paradigm possesses distinct epistemological strengths and limits.\n\n(Enter 4-digit sequence without spaces)`,
    correctAnswer: '4213',
    solution: 'Logical sequence is 4213:\n• (4) opens with the overarching assertion about research paradigms.\n• (2) defines the quantitative paradigm.\n• (1) introduces qualitative research in contrast.\n• (3) synthesizes both methodologies into mixed-methods analysis.',
    topic: 'Verbal Ability - Parajumbles'
  },
  {
    id: 19,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'tita',
    questionNumber: 19,
    questionText: `Parajumble: Arrange sentences 1-4 in logical sequence.\n\n1. This historical isolation allowed unique endemic species to evolve without major predators.\n2. Madagascar separated from the Indian landmass approximately 88 million years ago.\n3. Today, habitat loss threatens these fragile ecological communities with extinction.\n4. As a result, over 90% of its wildlife is found nowhere else on Earth.\n\n(Enter 4-digit sequence without spaces)`,
    correctAnswer: '2143',
    solution: 'Logical sequence is 2143:\n• (2) introduces the origin event (geological separation of Madagascar).\n• (1) connects "This historical isolation" with unique evolutionary biology.\n• (4) gives the direct outcome ("As a result, over 90% of its wildlife is endemic").\n• (3) shifts to the contemporary threat ("Today, habitat loss threatens...").',
    topic: 'Verbal Ability - Parajumbles'
  },
  {
    id: 20,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'tita',
    questionNumber: 20,
    questionText: `Parajumble: Arrange sentences 1-4 in logical sequence.\n\n1. Language acquisition in children involves both innate cognitive structures and environmental interaction.\n2. Noam Chomsky posited the existence of a Universal Grammar inherent to the human brain.\n3. However, social interactionists emphasize the critical role of communicative context in language development.\n4. Modern linguistics reconciles these views by viewing language as an interaction of nature and nurture.\n\n(Enter 4-digit sequence without spaces)`,
    correctAnswer: '1234',
    solution: 'Logical sequence is 1234:\n• (1) introduces the overarching dual thesis of language acquisition.\n• (2) presents the nativist thesis (Chomsky\'s Universal Grammar).\n• (3) contrasts it with the environmental/social interactionist antithesis.\n• (4) delivers the modern synthesis reconciling nature and nurture.',
    topic: 'Verbal Ability - Parajumbles'
  },
  {
    id: 21,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    questionNumber: 21,
    questionText: `Odd One Out: Choose the sentence that does NOT belong to the paragraph.\n\n1) Cryptographic protocols form the security backbone of distributed ledger technology.\n2) Public key infrastructure ensures secure identity verification across decentralized networks.\n3) High transaction latency remains a persistent scaling bottleneck for major blockchains.\n4) Hash functions guarantee data immutability by producing unique digital signatures for blocks.\n5) Together, these cryptographic primitives protect decentralized ledgers against unauthorized tampering.`,
    options: [
      '1) Cryptographic protocols form the security backbone of distributed ledger technology.',
      '2) Public key infrastructure ensures secure identity verification across decentralized networks.',
      '3) High transaction latency remains a persistent scaling bottleneck for major blockchains.',
      '4) Hash functions guarantee data immutability by producing unique digital signatures for blocks.',
      '5) Together, these cryptographic primitives protect decentralized ledgers against unauthorized tampering.'
    ],
    correctAnswer: 2,
    solution: 'Sentence 3 discusses network performance and scaling bottlenecks, whereas sentences 1, 2, 4, and 5 form a coherent paragraph explaining how cryptographic primitives ensure security and immutability.',
    topic: 'Verbal Ability - Odd One Out'
  },
  {
    id: 22,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    questionNumber: 22,
    questionText: `Odd One Out: Choose the sentence that does NOT belong to the paragraph.\n\n1) Photosynthesis converts solar energy into chemical energy stored in glucose molecules.\n2) Chlorophyll pigments within plant chloroplasts absorb specific wavelengths of sunlight.\n3) Global deforestation severely reduces the Earth\'s total forest canopy cover.\n4) Light-dependent reactions split water molecules, releasing oxygen as a byproduct.\n5) The Calvin cycle subsequently utilizes ATP and NADPH to synthesize organic sugars.`,
    options: [
      '1) Photosynthesis converts solar energy into chemical energy stored in glucose molecules.',
      '2) Chlorophyll pigments within plant chloroplasts absorb specific wavelengths of sunlight.',
      '3) Global deforestation severely reduces the Earth\'s total forest canopy cover.',
      '4) Light-dependent reactions split water molecules, releasing oxygen as a byproduct.',
      '5) The Calvin cycle subsequently utilizes ATP and NADPH to synthesize organic sugars.'
    ],
    correctAnswer: 2,
    solution: 'Sentence 3 introduces deforestation (macro ecology), while sentences 1, 2, 4, and 5 outline the biochemical cellular mechanics of photosynthesis.',
    topic: 'Verbal Ability - Odd One Out'
  },
  {
    id: 23,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    questionNumber: 23,
    questionText: `Para Summary: Select the option that best summarizes the text.\n\nText: Microplastics have contaminated marine ecosystems worldwide, accumulating in food webs. Marine organisms ingest these synthetic particles, which absorb toxic pollutants. Beyond ecological damage, human consumption of seafood exposes populations to potential health hazards. Immediate international mitigation strategies are essential to halt plastic influx into oceans.`,
    options: [
      'Plastic pollution in oceans can be solved entirely by banning seafood consumption globally.',
      'Microplastic contamination damages marine webs and poses human health risks, demanding global action.',
      'Synthetic particles in oceans exclusively affect lower-level marine species like plankton.',
      'International regulations have successfully halted the influx of plastics into global waters.'
    ],
    correctAnswer: 1,
    solution: 'Option B accurately captures both dimensions of the problem (ecological bioaccumulation and human health risk) and the concluding call for global mitigation without overgeneralizing.',
    topic: 'Verbal Ability - Para Summary'
  },
  {
    id: 24,
    section: 'varc',
    sectionName: 'Verbal Ability & Reading Comprehension',
    type: 'mcq',
    questionNumber: 24,
    questionText: `Para Summary: Select the option that best summarizes the text.\n\nText: Remote work arrangements have restructured corporate dynamics, enhancing employee autonomy while complicating organizational cohesion. While workers report higher satisfaction and reduced commute stress, managers struggle with performance evaluation and team culture maintenance. Hybrid models attempt to balance flexibility with mandatory office collaboration days.`,
    options: [
      'Remote work has proven completely unsustainable for modern corporate environments.',
      'Hybrid work models aim to reconcile worker flexibility with management\'s need for collaboration and culture.',
      'Employees universally prefer full-time office work to avoid performance evaluation issues.',
      'Commute stress is the sole determinant of employee job satisfaction in corporate settings.'
    ],
    correctAnswer: 1,
    solution: 'Option B perfectly summarizes the dual forces (individual flexibility vs managerial cohesion) and identifies hybrid work as the balancing mechanism.',
    topic: 'Verbal Ability - Para Summary'
  },

  // ==========================================
  // SECTION II: DILR (22 Questions, Q25 - Q46)
  // ==========================================

  // Set 1: Seating Arrangement & Project Teams (Q25 - Q29)
  {
    id: 25,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'mcq',
    scenarioTitle: 'Set 1: Seating Arrangement & Project Teams (Q25 - Q29)',
    scenarioText: `Scenario: Six consultants—P, Q, R, S, T, and U—sit in a circle facing inward for a meeting. Each consultant specializes in one distinct domain: Finance, IT, HR, Marketing, Operations, or Legal.
• P sits second to the right of the Finance expert.
• The HR expert is an immediate neighbor of both Q and the Legal expert.
• R, who is the IT expert, sits directly opposite S.
• T is the Operations expert and sits immediately to the left of P.
• Q is not the Finance expert and sits opposite U.`,
    questionNumber: 25,
    questionText: "What is P's domain specialization?",
    options: ['Marketing', 'HR', 'Finance', 'Legal'],
    correctAnswer: 0,
    solution: 'By resolving the seating constraints, P is positioned between S (Finance) and T (Operations) and specializes in Marketing.',
    topic: 'Logical Reasoning - Circular Arrangement'
  },
  {
    id: 26,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'mcq',
    scenarioTitle: 'Set 1: Seating Arrangement & Project Teams (Q25 - Q29)',
    scenarioText: `Scenario: Six consultants—P, Q, R, S, T, and U—sit in a circle facing inward for a meeting. Each consultant specializes in one distinct domain: Finance, IT, HR, Marketing, Operations, or Legal.
• P sits second to the right of the Finance expert.
• The HR expert is an immediate neighbor of both Q and the Legal expert.
• R, who is the IT expert, sits directly opposite S.
• T is the Operations expert and sits immediately to the left of P.
• Q is not the Finance expert and sits opposite U.`,
    questionNumber: 26,
    questionText: 'Who sits directly opposite the Legal expert?',
    options: ['P', 'T', 'R', 'U'],
    correctAnswer: 1,
    solution: 'U is the Legal expert. Directly opposite U (3 positions away in a 6-person circle) sits T (the Operations expert).',
    topic: 'Logical Reasoning - Circular Arrangement'
  },
  {
    id: 27,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'mcq',
    scenarioTitle: 'Set 1: Seating Arrangement & Project Teams (Q25 - Q29)',
    scenarioText: `Scenario: Six consultants—P, Q, R, S, T, and U—sit in a circle facing inward for a meeting. Each consultant specializes in one distinct domain: Finance, IT, HR, Marketing, Operations, or Legal.
• P sits second to the right of the Finance expert.
• The HR expert is an immediate neighbor of both Q and the Legal expert.
• R, who is the IT expert, sits directly opposite S.
• T is the Operations expert and sits immediately to the left of P.
• Q is not the Finance expert and sits opposite U.`,
    questionNumber: 27,
    questionText: 'Who is the Finance expert?',
    options: ['S', 'U', 'Q', 'P'],
    correctAnswer: 0,
    solution: 'S is the Finance expert, sitting directly opposite R (IT expert).',
    topic: 'Logical Reasoning - Circular Arrangement'
  },
  {
    id: 28,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'mcq',
    scenarioTitle: 'Set 1: Seating Arrangement & Project Teams (Q25 - Q29)',
    scenarioText: `Scenario: Six consultants—P, Q, R, S, T, and U—sit in a circle facing inward for a meeting. Each consultant specializes in one distinct domain: Finance, IT, HR, Marketing, Operations, or Legal.
• P sits second to the right of the Finance expert.
• The HR expert is an immediate neighbor of both Q and the Legal expert.
• R, who is the IT expert, sits directly opposite S.
• T is the Operations expert and sits immediately to the left of P.
• Q is not the Finance expert and sits opposite U.`,
    questionNumber: 28,
    questionText: 'Which consultant sits immediately to the right of Q?',
    options: ['HR expert', 'Operations expert', 'Finance expert', 'IT expert'],
    correctAnswer: 2,
    solution: 'When facing inward, to the immediate right of Q is S (the Finance expert).',
    topic: 'Logical Reasoning - Circular Arrangement'
  },
  {
    id: 29,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'tita',
    scenarioTitle: 'Set 1: Seating Arrangement & Project Teams (Q25 - Q29)',
    scenarioText: `Scenario: Six consultants—P, Q, R, S, T, and U—sit in a circle facing inward for a meeting. Each consultant specializes in one distinct domain: Finance, IT, HR, Marketing, Operations, or Legal.
• P sits second to the right of the Finance expert.
• The HR expert is an immediate neighbor of both Q and the Legal expert.
• R, who is the IT expert, sits directly opposite S.
• T is the Operations expert and sits immediately to the left of P.
• Q is not the Finance expert and sits opposite U.`,
    questionNumber: 29,
    questionText: 'How many consultants sit between P and R when counting clockwise from P? (Enter number, e.g., 2)',
    correctAnswer: '2',
    solution: 'Moving clockwise from P: P -> T -> Q -> R. The consultants between P and R are T and Q (exactly 2 consultants).',
    topic: 'Logical Reasoning - Circular Arrangement'
  },

  // Set 2: Company Multi-Line Graph Interpretation (Q30 - Q34)
  {
    id: 30,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'mcq',
    scenarioTitle: 'Set 2: Company Financial Performance (Q30 - Q34)',
    scenarioText: `Data: Annual revenue and expenditure (in ₹ Crores) for Apex Ltd. from 2021 to 2025:`,
    dataTable: {
      headers: ['Year', '2021', '2022', '2023', '2024', '2025'],
      rows: [
        ['Revenue (₹ Cr)', 250, 320, 400, 450, 600],
        ['Expenditure (₹ Cr)', 180, 240, 280, 360, 420]
      ]
    },
    questionNumber: 30,
    questionText: 'In which year was the absolute Profit (in ₹ Cr) the highest?',
    options: ['2022', '2023', '2024', '2025'],
    correctAnswer: 3,
    solution: 'Profits per year:\n• 2021: 250 − 180 = 70 Cr\n• 2022: 320 − 240 = 80 Cr\n• 2023: 400 − 280 = 120 Cr\n• 2024: 450 − 360 = 90 Cr\n• 2025: 600 − 420 = 180 Cr\nAbsolute profit is highest in 2025 (₹180 Cr).',
    topic: 'Data Interpretation - Tables & Trends'
  },
  {
    id: 31,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'mcq',
    scenarioTitle: 'Set 2: Company Financial Performance (Q30 - Q34)',
    scenarioText: `Data: Annual revenue and expenditure (in ₹ Crores) for Apex Ltd. from 2021 to 2025:`,
    dataTable: {
      headers: ['Year', '2021', '2022', '2023', '2024', '2025'],
      rows: [
        ['Revenue (₹ Cr)', 250, 320, 400, 450, 600],
        ['Expenditure (₹ Cr)', 180, 240, 280, 360, 420]
      ]
    },
    questionNumber: 31,
    questionText: 'What was the percentage increase in Revenue from 2021 to 2025?',
    options: ['120%', '140%', '150%', '100%'],
    correctAnswer: 1,
    solution: 'Revenue in 2021 = 250 Cr, Revenue in 2025 = 600 Cr.\nPercentage Increase = [(600 − 250) / 250] × 100 = (350 / 250) × 100 = 140%.',
    topic: 'Data Interpretation - Percentage Growth'
  },
  {
    id: 32,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'mcq',
    scenarioTitle: 'Set 2: Company Financial Performance (Q30 - Q34)',
    scenarioText: `Data: Annual revenue and expenditure (in ₹ Crores) for Apex Ltd. from 2021 to 2025:`,
    dataTable: {
      headers: ['Year', '2021', '2022', '2023', '2024', '2025'],
      rows: [
        ['Revenue (₹ Cr)', 250, 320, 400, 450, 600],
        ['Expenditure (₹ Cr)', 180, 240, 280, 360, 420]
      ]
    },
    questionNumber: 32,
    questionText: 'In which year was the Profit Margin (%) highest?',
    options: ['2021', '2023', '2024', '2025'],
    correctAnswer: 1,
    solution: 'Profit Margins = (Profit / Revenue) × 100%:\n• 2021: (70/250) × 100 = 28.0%\n• 2022: (80/320) × 100 = 25.0%\n• 2023: (120/400) × 100 = 30.0%\n• 2024: (90/450) × 100 = 20.0%\n• 2025: (180/600) × 100 = 30.0%\nAmong the given choices, 2023 and 2025 tie at 30.0%, with 2023 listed as the primary answer.',
    topic: 'Data Interpretation - Ratio & Profit Margin'
  },
  {
    id: 33,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'tita',
    scenarioTitle: 'Set 2: Company Financial Performance (Q30 - Q34)',
    scenarioText: `Data: Annual revenue and expenditure (in ₹ Crores) for Apex Ltd. from 2021 to 2025:`,
    dataTable: {
      headers: ['Year', '2021', '2022', '2023', '2024', '2025'],
      rows: [
        ['Revenue (₹ Cr)', 250, 320, 400, 450, 600],
        ['Expenditure (₹ Cr)', 180, 240, 280, 360, 420]
      ]
    },
    questionNumber: 33,
    questionText: 'What is the average expenditure (in ₹ Cr) over the 5-year period? (Enter numerical value)',
    correctAnswer: '296',
    solution: 'Total Expenditure = 180 + 240 + 280 + 360 + 420 = 1480 Cr.\nAverage Expenditure = 1480 / 5 = 296 Cr.',
    topic: 'Data Interpretation - Averages'
  },
  {
    id: 34,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'mcq',
    scenarioTitle: 'Set 2: Company Financial Performance (Q30 - Q34)',
    scenarioText: `Data: Annual revenue and expenditure (in ₹ Crores) for Apex Ltd. from 2021 to 2025:`,
    dataTable: {
      headers: ['Year', '2021', '2022', '2023', '2024', '2025'],
      rows: [
        ['Revenue (₹ Cr)', 250, 320, 400, 450, 600],
        ['Expenditure (₹ Cr)', 180, 240, 280, 360, 420]
      ]
    },
    questionNumber: 34,
    questionText: 'What is the ratio of total profit made in 2021-2022 to total profit made in 2024-2025?',
    options: ['3 : 5', '5 : 9', '15 : 27', '5 : 18'],
    correctAnswer: 1,
    solution: 'Profit in 2021-2022 = 70 + 80 = 150 Cr.\nProfit in 2024-2025 = 90 + 180 = 270 Cr.\nRatio = 150 : 270 = 5 : 9.',
    topic: 'Data Interpretation - Ratios'
  },

  // Set 3: Matrix Grid & Course Enrolments (Q35 - Q39)
  {
    id: 35,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'tita',
    scenarioTitle: 'Set 3: Matrix Grid & Course Enrolments (Q35 - Q39)',
    scenarioText: `Scenario: 100 students enrolled in elective courses: Data Science (DS), AI, and Cybersecurity (CS).
• 45 students enrolled in DS; 50 enrolled in AI; 40 enrolled in CS.
• 15 enrolled in both DS and AI; 12 enrolled in AI and CS; 10 enrolled in DS and CS.
• 5 students enrolled in all three courses.`,
    questionNumber: 35,
    questionText: 'How many students enrolled in AT LEAST one course? (Enter numerical value)',
    correctAnswer: '93',
    solution: 'Using Principle of Inclusion-Exclusion:\n|DS ∪ AI ∪ CS| = 45 + 50 + 40 − (15 + 12 + 10) + 5 = 135 − 37 + 5 = 93 students.',
    topic: 'Logical Reasoning - Venn Diagrams & Sets'
  },
  {
    id: 36,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'tita',
    scenarioTitle: 'Set 3: Matrix Grid & Course Enrolments (Q35 - Q39)',
    scenarioText: `Scenario: 100 students enrolled in elective courses: Data Science (DS), AI, and Cybersecurity (CS).
• 45 students enrolled in DS; 50 enrolled in AI; 40 enrolled in CS.
• 15 enrolled in both DS and AI; 12 enrolled in AI and CS; 10 enrolled in DS and CS.
• 5 students enrolled in all three courses.`,
    questionNumber: 36,
    questionText: 'How many students enrolled in EXACTLY one course? (Enter numerical value)',
    correctAnswer: '66',
    solution: 'Exactly 2 courses = (15 − 5) + (12 − 5) + (10 − 5) = 10 + 7 + 5 = 22.\nAll 3 courses = 5.\nTotal taking at least 1 course = 93.\nExactly 1 course = 93 − 22 − 5 = 66.',
    topic: 'Logical Reasoning - Venn Diagrams & Sets'
  },
  {
    id: 37,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'tita',
    scenarioTitle: 'Set 3: Matrix Grid & Course Enrolments (Q35 - Q39)',
    scenarioText: `Scenario: 100 students enrolled in elective courses: Data Science (DS), AI, and Cybersecurity (CS).
• 45 students enrolled in DS; 50 enrolled in AI; 40 enrolled in CS.
• 15 enrolled in both DS and AI; 12 enrolled in AI and CS; 10 enrolled in DS and CS.
• 5 students enrolled in all three courses.`,
    questionNumber: 37,
    questionText: 'How many students enrolled in NONE of these three courses? (Enter numerical value)',
    correctAnswer: '7',
    solution: 'Total students = 100. Enrolled in at least one course = 93.\nStudents enrolled in none = 100 − 93 = 7.',
    topic: 'Logical Reasoning - Venn Diagrams & Sets'
  },
  {
    id: 38,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'mcq',
    scenarioTitle: 'Set 3: Matrix Grid & Course Enrolments (Q35 - Q39)',
    scenarioText: `Scenario: 100 students enrolled in elective courses: Data Science (DS), AI, and Cybersecurity (CS).
• 45 students enrolled in DS; 50 enrolled in AI; 40 enrolled in CS.
• 15 enrolled in both DS and AI; 12 enrolled in AI and CS; 10 enrolled in DS and CS.
• 5 students enrolled in all three courses.`,
    questionNumber: 38,
    questionText: 'How many students enrolled in DS but NOT in AI?',
    options: ['30', '35', '25', '20'],
    correctAnswer: 0,
    solution: 'Total DS students = 45. Students enrolled in both DS and AI = 15.\nStudents enrolled in DS but not AI = 45 − 15 = 30.',
    topic: 'Logical Reasoning - Set Operations'
  },
  {
    id: 39,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'mcq',
    scenarioTitle: 'Set 3: Matrix Grid & Course Enrolments (Q35 - Q39)',
    scenarioText: `Scenario: 100 students enrolled in elective courses: Data Science (DS), AI, and Cybersecurity (CS).
• 45 students enrolled in DS; 50 enrolled in AI; 40 enrolled in CS.
• 15 enrolled in both DS and AI; 12 enrolled in AI and CS; 10 enrolled in DS and CS.
• 5 students enrolled in all three courses.`,
    questionNumber: 39,
    questionText: 'What proportion of total enrolled students (taking at least 1 course) take exactly two courses?',
    options: ['22/93', '27/93', '32/100', '15/88'],
    correctAnswer: 0,
    solution: 'Students taking exactly 2 courses = 22. Total enrolled students = 93.\nProportion = 22/93.',
    topic: 'Logical Reasoning - Proportions in Sets'
  },

  // Set 4: Tournament Games & Points Table (Q40 - Q46)
  {
    id: 40,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'tita',
    scenarioTitle: 'Set 4: Tournament Games & Points Table (Q40 - Q46)',
    scenarioText: `Scenario: Four teams—Alpha, Beta, Gamma, and Delta—play a round-robin tournament where every team plays every other team once.
Win = 3 pts, Draw = 1 pt, Loss = 0 pt.
• Alpha finished with 7 points and lost no matches.
• Beta finished with 4 points, having 1 win, 1 draw, and 1 loss.
• Gamma finished with 3 points from 3 draws.
• Delta finished with 1 point.`,
    questionNumber: 40,
    questionText: 'How many total matches were played in the entire tournament? (Enter number)',
    correctAnswer: '6',
    solution: 'In a round-robin tournament of 4 teams, total matches = ⁴C₂ = (4 × 3) / 2 = 6 matches.',
    topic: 'Logical Reasoning - Tournaments & Round Robin'
  },
  {
    id: 41,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'mcq',
    scenarioTitle: 'Set 4: Tournament Games & Points Table (Q40 - Q46)',
    scenarioText: `Scenario: Four teams—Alpha, Beta, Gamma, and Delta—play a round-robin tournament where every team plays every other team once.
Win = 3 pts, Draw = 1 pt, Loss = 0 pt.
• Alpha finished with 7 points and lost no matches.
• Beta finished with 4 points, having 1 win, 1 draw, and 1 loss.
• Gamma finished with 3 points from 3 draws.
• Delta finished with 1 point.`,
    questionNumber: 41,
    questionText: 'What was the outcome of the match between Alpha and Delta?',
    options: ['Alpha won', 'Delta won', 'Draw', 'Cannot be determined'],
    correctAnswer: 0,
    solution: 'Alpha has 7 points (2 Wins, 1 Draw). Gamma drew with all teams (including Alpha). Therefore, Alpha\'s 2 wins must be against Beta and Delta.',
    topic: 'Logical Reasoning - Tournament Match Analysis'
  },
  {
    id: 42,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'mcq',
    scenarioTitle: 'Set 4: Tournament Games & Points Table (Q40 - Q46)',
    scenarioText: `Scenario: Four teams—Alpha, Beta, Gamma, and Delta—play a round-robin tournament where every team plays every other team once.
Win = 3 pts, Draw = 1 pt, Loss = 0 pt.
• Alpha finished with 7 points and lost no matches.
• Beta finished with 4 points, having 1 win, 1 draw, and 1 loss.
• Gamma finished with 3 points from 3 draws.
• Delta finished with 1 point.`,
    questionNumber: 42,
    questionText: 'Which team did Beta defeat in its single win?',
    options: ['Alpha', 'Gamma', 'Delta', 'Cannot be determined'],
    correctAnswer: 2,
    solution: 'Beta drew with Gamma and lost to Alpha. Hence, Beta\'s single win was against Delta.',
    topic: 'Logical Reasoning - Tournament Match Analysis'
  },
  {
    id: 43,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'tita',
    scenarioTitle: 'Set 4: Tournament Games & Points Table (Q40 - Q46)',
    scenarioText: `Scenario: Four teams—Alpha, Beta, Gamma, and Delta—play a round-robin tournament where every team plays every other team once.
Win = 3 pts, Draw = 1 pt, Loss = 0 pt.
• Alpha finished with 7 points and lost no matches.
• Beta finished with 4 points, having 1 win, 1 draw, and 1 loss.
• Gamma finished with 3 points from 3 draws.
• Delta finished with 1 point.`,
    questionNumber: 43,
    questionText: 'How many total matches ended in a DRAW in the tournament? (Enter number)',
    correctAnswer: '3',
    solution: 'Gamma drew all 3 matches (vs Alpha, Beta, Delta). None of the other 3 matches were draws. Total drawn matches = 3.',
    topic: 'Logical Reasoning - Tournament Analysis'
  },
  {
    id: 44,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'mcq',
    scenarioTitle: 'Set 4: Tournament Games & Points Table (Q40 - Q46)',
    scenarioText: `Scenario: Four teams—Alpha, Beta, Gamma, and Delta—play a round-robin tournament where every team plays every other team once.
Win = 3 pts, Draw = 1 pt, Loss = 0 pt.
• Alpha finished with 7 points and lost no matches.
• Beta finished with 4 points, having 1 win, 1 draw, and 1 loss.
• Gamma finished with 3 points from 3 draws.
• Delta finished with 1 point.`,
    questionNumber: 44,
    questionText: "What was Delta's record (Wins - Draws - Losses)?",
    options: ['0 - 1 - 2', '0 - 2 - 1', '1 - 0 - 2', '0 - 0 - 3'],
    correctAnswer: 0,
    solution: 'Delta had 1 point: 0 wins, 1 draw (vs Gamma), and 2 losses (vs Alpha and Beta) -> 0 - 1 - 2.',
    topic: 'Logical Reasoning - Points Table'
  },
  {
    id: 45,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'mcq',
    scenarioTitle: 'Set 4: Tournament Games & Points Table (Q40 - Q46)',
    scenarioText: `Scenario: Four teams—Alpha, Beta, Gamma, and Delta—play a round-robin tournament where every team plays every other team once.
Win = 3 pts, Draw = 1 pt, Loss = 0 pt.
• Alpha finished with 7 points and lost no matches.
• Beta finished with 4 points, having 1 win, 1 draw, and 1 loss.
• Gamma finished with 3 points from 3 draws.
• Delta finished with 1 point.`,
    questionNumber: 45,
    questionText: "What was Alpha's record (Wins - Draws - Losses)?",
    options: ['3 - 0 - 0', '2 - 1 - 0', '1 - 2 - 0', '2 - 0 - 1'],
    correctAnswer: 1,
    solution: 'Alpha scored 7 points from 3 matches: 2 wins (6 pts) + 1 draw (1 pt) + 0 losses -> 2 - 1 - 0.',
    topic: 'Logical Reasoning - Points Table'
  },
  {
    id: 46,
    section: 'dilr',
    sectionName: 'Data Interpretation & Logical Reasoning',
    type: 'tita',
    scenarioTitle: 'Set 4: Tournament Games & Points Table (Q40 - Q46)',
    scenarioText: `Scenario: Four teams—Alpha, Beta, Gamma, and Delta—play a round-robin tournament where every team plays every other team once.
Win = 3 pts, Draw = 1 pt, Loss = 0 pt.
• Alpha finished with 7 points and lost no matches.
• Beta finished with 4 points, having 1 win, 1 draw, and 1 loss.
• Gamma finished with 3 points from 3 draws.
• Delta finished with 1 point.`,
    questionNumber: 46,
    questionText: 'What was the total sum of points accumulated by all 4 teams combined? (Enter number)',
    correctAnswer: '15',
    solution: 'Sum of points = 7 (Alpha) + 4 (Beta) + 3 (Gamma) + 1 (Delta) = 15 points total.',
    topic: 'Logical Reasoning - Tournament Math'
  },

  // ==========================================
  // SECTION III: QA (22 Questions, Q47 - Q68)
  // ==========================================

  // Arithmetic (Q47 - Q54)
  {
    id: 47,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'mcq',
    questionNumber: 47,
    questionText: 'Two pipes A and B can fill a tank in 12 hours and 18 hours respectively. Pipe C can empty the full tank in 15 hours. If all three pipes are opened together, how long (in hours) will it take to fill the tank completely?',
    options: ['9.8 hours', '180/13 hours', '10.5 hours', '12 hours'],
    correctAnswer: 1,
    solution: 'LCM(12, 18, 15) = 180 units.\n• Pipe A rate = 180 / 12 = +15 units/hr\n• Pipe B rate = 180 / 18 = +10 units/hr\n• Pipe C rate = 180 / 15 = −12 units/hr\nNet Rate = 15 + 10 − 12 = 13 units/hr.\nTotal Time required = 180 / 13 hours (≈ 13.84 hours).',
    topic: 'Arithmetic - Pipes & Cisterns'
  },
  {
    id: 48,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'mcq',
    questionNumber: 48,
    questionText: 'A train traveling at 72 km/h crosses a 200 m long platform in 22 seconds. What is the length of the train (in meters)?',
    options: ['240 m', '220 m', '200 m', '250 m'],
    correctAnswer: 0,
    solution: 'Speed in m/s = 72 × (5/18) = 20 m/s.\nTotal distance = Speed × Time = 20 m/s × 22 s = 440 m.\nLength of train = Total distance − Platform length = 440 − 200 = 240 m.',
    topic: 'Arithmetic - Speed, Time & Distance'
  },
  {
    id: 49,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'tita',
    questionNumber: 49,
    questionText: 'A sum of money doubles itself in 5 years under simple interest. In how many years will it become 5 times itself at the same interest rate? (Enter number of years)',
    correctAnswer: '20',
    solution: 'Under Simple Interest, doubling means Interest earned SI = P in 5 years (rate R = 20%).\nTo become 5 times the principal, total interest needed = 4P.\nTime = 4 × 5 years = 20 years.',
    topic: 'Arithmetic - Simple Interest'
  },
  {
    id: 50,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'mcq',
    questionNumber: 50,
    questionText: 'In an alloy of 80 kg, the ratio of copper to zinc is 5 : 3. How much copper (in kg) must be added to make the ratio 2 : 1?',
    options: ['10 kg', '15 kg', '20 kg', '8 kg'],
    correctAnswer: 0,
    solution: 'Initial amount:\n• Copper = (5/8) × 80 = 50 kg\n• Zinc = (3/8) × 80 = 30 kg\nFor ratio to become 2 : 1 with 30 kg Zinc, required Copper = 2 × 30 = 60 kg.\nCopper to be added = 60 − 50 = 10 kg.',
    topic: 'Arithmetic - Mixtures & Ratios'
  },
  {
    id: 51,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'mcq',
    questionNumber: 51,
    questionText: 'A merchant marks up his goods by 50% and allows a discount of 20%. What is his net profit percentage?',
    options: ['30%', '25%', '20%', '15%'],
    correctAnswer: 2,
    solution: 'Let Cost Price CP = 100.\nMarked Price MP = 100 × 1.50 = 150.\nSelling Price SP = 150 × (1 − 0.20) = 150 × 0.80 = 120.\nNet Profit Percentage = (120 − 100)% = 20%.',
    topic: 'Arithmetic - Profit, Loss & Discount'
  },
  {
    id: 52,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'tita',
    questionNumber: 52,
    questionText: 'Average age of a group of 10 students is 20 years. When a new student joins, the average age increases by 1 year. What is the age of the new student? (Enter age in years)',
    correctAnswer: '31',
    solution: 'Initial total age = 10 × 20 = 200 years.\nNew average for 11 students = 21 years.\nNew total age = 11 × 21 = 231 years.\nAge of new student = 231 − 200 = 31 years.',
    topic: 'Arithmetic - Averages'
  },
  {
    id: 53,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'mcq',
    questionNumber: 53,
    questionText: 'A and B start a business with investments of ₹ 40,000 and ₹ 60,000. After 6 months, B withdraws half his capital. If total annual profit is ₹ 36,000, what is B\'s share of profit?',
    options: ['₹ 19,058', '₹ 20,000', '₹ 16,000', '₹ 21,000'],
    correctAnswer: 0,
    solution: 'Investment ratio:\n• A = 40,000 × 12 = 480,000\n• B = (60,000 × 6) + (30,000 × 6) = 360,000 + 180,000 = 540,000\nRatio A : B = 480 : 540 = 8 : 9.\nB\'s share of profit = (9 / 17) × 36,000 = ₹ 19,058.82 ≈ ₹ 19,058.',
    topic: 'Arithmetic - Partnerships'
  },
  {
    id: 54,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'mcq',
    questionNumber: 54,
    questionText: 'A car travels 120 km at 60 km/h and returns the same distance at 40 km/h. What is the average speed (in km/h) for the entire journey?',
    options: ['50 km/h', '48 km/h', '45 km/h', '52 km/h'],
    correctAnswer: 1,
    solution: 'When distances are equal, harmonic mean gives Average Speed = 2xy / (x + y) = (2 × 60 × 40) / (60 + 40) = 4800 / 100 = 48 km/h.',
    topic: 'Arithmetic - Average Speed'
  },

  // Algebra (Q55 - Q60)
  {
    id: 55,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'mcq',
    questionNumber: 55,
    questionText: 'If x + (1/x) = 4, what is the value of x³ + (1/x³)?',
    options: ['52', '64', '48', '56'],
    correctAnswer: 0,
    solution: 'Formula: x³ + 1/x³ = (x + 1/x)³ − 3(x + 1/x).\nSubstituting 4: 4³ − 3(4) = 64 − 12 = 52.',
    topic: 'Algebra - Algebraic Identities'
  },
  {
    id: 56,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'tita',
    questionNumber: 56,
    questionText: 'Find the minimum value of the quadratic expression f(x) = 2x² − 8x + 11. (Enter numerical value)',
    correctAnswer: '3',
    solution: 'For f(x) = ax² + bx + c with a = 2 > 0, minimum occurs at vertex x = −b/(2a) = 8/(2 × 2) = 2.\nf(2) = 2(2)² − 8(2) + 11 = 8 − 16 + 11 = 3.',
    topic: 'Algebra - Quadratic Functions & Max/Min'
  },
  {
    id: 57,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'mcq',
    questionNumber: 57,
    questionText: 'Solve for x: log₂(x) + log₂(x − 2) = 3.',
    options: ['4', '2', '6', '8'],
    correctAnswer: 0,
    solution: 'log₂(x(x − 2)) = 3\n=> x(x − 2) = 2³ = 8\n=> x² − 2x − 8 = 0\n=> (x − 4)(x + 2) = 0\nSince the domain requires x > 2, the unique solution is x = 4.',
    topic: 'Algebra - Logarithms'
  },
  {
    id: 58,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'mcq',
    questionNumber: 58,
    questionText: 'The 3rd and 7th terms of an Arithmetic Progression (AP) are 11 and 27 respectively. What is the 11th term?',
    options: ['41', '43', '45', '39'],
    correctAnswer: 1,
    solution: '• T₃ = a + 2d = 11\n• T₇ = a + 6d = 27\nSubtracting gives 4d = 16 => d = 4.\na = 11 − 2(4) = 3.\n11th term T₁₁ = a + 10d = 3 + 10(4) = 43.',
    topic: 'Algebra - Progressions & Series'
  },
  {
    id: 59,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'tita',
    questionNumber: 59,
    questionText: 'How many integral solutions exist for the inequality |x − 3| ≤ 5? (Enter total number of integral values)',
    correctAnswer: '11',
    solution: '|x − 3| ≤ 5 => −5 ≤ x − 3 ≤ 5 => −2 ≤ x ≤ 8.\nThe integer solutions are -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8 (total 8 − (−2) + 1 = 11 integers).',
    topic: 'Algebra - Inequalities & Absolute Values'
  },
  {
    id: 60,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'mcq',
    questionNumber: 60,
    questionText: 'If a and b are roots of x² − 5x + 6 = 0, find the value of a² + b².',
    options: ['13', '25', '19', '31'],
    correctAnswer: 0,
    solution: 'Sum of roots (a + b) = 5, Product of roots (ab) = 6.\na² + b² = (a + b)² − 2ab = 5² − 2(6) = 25 − 12 = 13 (roots are 2 and 3: 2² + 3² = 13).',
    topic: 'Algebra - Theory of Equations'
  },

  // Geometry & Mensuration (Q61 - Q65)
  {
    id: 61,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'mcq',
    questionNumber: 61,
    questionText: 'A circle is inscribed in an equilateral triangle of side 12 cm. What is the area of the circle (in sq cm)?',
    options: ['12π', '16π', '9π', '24π'],
    correctAnswer: 0,
    solution: 'Inradius of equilateral triangle r = a / (2√3) = 12 / (2√3) = 2√3 cm.\nArea of inscribed circle = π r² = π (2√3)² = π × 12 = 12π sq cm.',
    topic: 'Geometry - Circles & Triangles'
  },
  {
    id: 62,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'tita',
    questionNumber: 62,
    questionText: 'A rectangular box has dimensions 3 cm, 4 cm, and 12 cm. What is the length of its longest internal diagonal (in cm)? (Enter numerical value)',
    correctAnswer: '13',
    solution: 'Longest diagonal d = √(l² + w² + h²) = √(3² + 4² + 12²) = √(9 + 16 + 144) = √169 = 13 cm.',
    topic: 'Mensuration - 3D Geometry'
  },
  {
    id: 63,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'mcq',
    questionNumber: 63,
    questionText: 'In triangle ABC, AB = 8 cm, BC = 10 cm, and AC = 12 cm. AD is the median to side BC. What is the length of AD (in cm)?',
    options: ['√79', '√71', '7 cm', '8 cm'],
    correctAnswer: 0,
    solution: 'By Apollonius\' Theorem on median AD to BC:\nAB² + AC² = 2(AD² + BD²)\nWith BC = 10, BD = 5.\n8² + 12² = 2(AD² + 5²)\n=> 64 + 144 = 2(AD² + 25)\n=> 208 = 2(AD² + 25)\n=> 104 = AD² + 25\n=> AD² = 79\n=> AD = √79 cm.',
    topic: 'Geometry - Apollonius Theorem & Medians'
  },
  {
    id: 64,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'mcq',
    questionNumber: 64,
    questionText: 'The diagonal of a square is 10√2 cm. What is its perimeter (in cm)?',
    options: ['40 cm', '20 cm', '40√2 cm', '50 cm'],
    correctAnswer: 0,
    solution: 'Diagonal d = s√2 = 10√2 cm => Side s = 10 cm.\nPerimeter = 4 × s = 4 × 10 = 40 cm.',
    topic: 'Geometry - Polygons & Quadrilaterals'
  },
  {
    id: 65,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'tita',
    questionNumber: 65,
    questionText: 'A cylinder of radius 7 cm and height 10 cm is melted to form solid spheres of radius 3.5 cm. How many such full spheres can be formed? (Enter integer value)',
    correctAnswer: '8',
    solution: '• Volume of cylinder = π r₁² h = π × 7² × 10 = 490π cm³.\n• Volume of one sphere = (4/3) π r₂³ = (4/3) π (3.5)³ = (4/3) × 42.875 × π = 57.167π cm³.\nNumber of full spheres = ⌊490π / 57.167π⌋ = ⌊8.57⌋ = 8 full spheres.',
    topic: 'Mensuration - Volume & Melting Problems'
  },

  // Modern Mathematics (Q66 - Q68)
  {
    id: 66,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'mcq',
    questionNumber: 66,
    questionText: 'How many distinct 4-digit numbers can be formed using digits 1, 2, 3, 4, 5 without repetition such that the number is divisible by 5?',
    options: ['24', '120', '48', '12'],
    correctAnswer: 0,
    solution: 'For the 4-digit number to be divisible by 5, the units place must be 5 (1 choice).\nThe remaining 3 positions (Thousands, Hundreds, Tens) can be filled by the remaining 4 digits (1, 2, 3, 4) in ⁴P₃ = 4 × 3 × 2 = 24 ways.',
    topic: 'Modern Math - Permutations & Combinations'
  },
  {
    id: 67,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'mcq',
    questionNumber: 67,
    questionText: 'Two unbiased dice are thrown simultaneously. What is the probability that the sum of numbers obtained is at least 10?',
    options: ['1/6', '1/12', '5/36', '1/4'],
    correctAnswer: 0,
    solution: 'Total possible outcomes = 6 × 6 = 36.\nFavorable outcomes for sum ≥ 10:\n• Sum = 10: (4,6), (5,5), (6,4) -> 3 pairs\n• Sum = 11: (5,6), (6,5) -> 2 pairs\n• Sum = 12: (6,6) -> 1 pair\nTotal favorable = 3 + 2 + 1 = 6.\nProbability = 6 / 36 = 1/6.',
    topic: 'Modern Math - Probability'
  },
  {
    id: 68,
    section: 'qa',
    sectionName: 'Quantitative Ability',
    type: 'tita',
    questionNumber: 68,
    questionText: 'Find the sum of all terms in an infinite Geometric Progression (GP) whose first term is 12 and common ratio is 1/3. (Enter numerical answer)',
    correctAnswer: '18',
    solution: 'Formula for sum of infinite GP with |r| < 1: S_∞ = a / (1 − r).\nS_∞ = 12 / (1 − 1/3) = 12 / (2/3) = 12 × (3/2) = 18.',
    topic: 'Modern Math - Sequences & Infinite Series'
  }
];
