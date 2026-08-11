export interface DetWordOption {
  word: string;
  isReal: boolean;
}

export interface DetReadAndSelectQuestion {
  id: number;
  type: 'read_and_select';
  taskNumber: number;
  taskTitle: string;
  questionText: string;
  words: DetWordOption[];
  explanation: string;
}

export interface DetMissingPart {
  prefix: string;
  missing: string; // The missing letters
  fullWord: string;
}

export interface DetReadAndCompleteQuestion {
  id: number;
  type: 'read_and_complete';
  taskNumber: number;
  taskTitle: string;
  passageTemplate: string;
  blanks: DetMissingPart[];
  fullPassageText: string;
  explanation: string;
}

export interface DetListenAndTypeQuestion {
  id: number;
  type: 'listen_and_type';
  taskNumber: number;
  taskTitle: string;
  audioTranscript: string;
  replayLimit: number;
  explanation: string;
}

export interface DetWriteAboutPhotoQuestion {
  id: number;
  type: 'write_about_photo';
  taskNumber: number;
  taskTitle: string;
  photoDescription: string;
  photoPrompt: string;
  sampleAnswer: string;
  keywords: string[];
  explanation?: string;
}

export interface DetInteractiveReadingQuestion {
  id: number;
  type: 'interactive_reading';
  taskNumber: number;
  taskTitle: string;
  passageText: string;
  questionNumber: number;
  questionType: 'Complete Passage' | 'Synonym' | 'Main Idea' | 'Choose Title' | 'Inference';
  questionText: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
}

export interface DetWritingSpeakingSample {
  id: 'writing_sample' | 'speaking_sample';
  taskTitle: string;
  taskType: 'Writing Sample' | 'Speaking Sample';
  timeMinutes: number;
  recommendedWords?: string;
  prompt: string;
  sampleAnswer: string;
  keyPoints?: string[];
}

export type DetAdaptiveQuestion = 
  | DetReadAndSelectQuestion 
  | DetReadAndCompleteQuestion 
  | DetListenAndTypeQuestion 
  | DetWriteAboutPhotoQuestion 
  | DetInteractiveReadingQuestion;

// ============================================================================
// OFFICIAL DUOLINGO ENGLISH TEST (DET) 23-QUESTION PRACTICE PAPER
// ============================================================================

export const DET_MOCK_TEST_QUESTIONS: DetAdaptiveQuestion[] = [
  // --------------------------------------------------------------------------
  // TASK 1: READ AND SELECT (Identify Real English Words) (Q1 - Q5)
  // --------------------------------------------------------------------------
  {
    id: 1,
    type: 'read_and_select',
    taskNumber: 1,
    taskTitle: 'Task 1: Read and Select (Identify Real English Words)',
    questionText: 'Select the real English words from the list below:',
    words: [
      { word: 'Fastidious', isReal: true },
      { word: 'Meticulize', isReal: false },
      { word: 'Obfuscate', isReal: true },
      { word: 'Glorifical', isReal: false },
      { word: 'Ubiquitous', isReal: true },
      { word: 'Prepositly', isReal: false }
    ],
    explanation: 'Real Words: Fastidious (very attentive to detail), Obfuscate (make unclear), Ubiquitous (present everywhere). Non-words: Meticulize, Glorifical, Prepositly.'
  },
  {
    id: 2,
    type: 'read_and_select',
    taskNumber: 2,
    taskTitle: 'Task 1: Read and Select (Identify Real English Words)',
    questionText: 'Select the real English words from the list below:',
    words: [
      { word: 'Ameliorate', isReal: true },
      { word: 'Constructive', isReal: true },
      { word: 'Ephemerous', isReal: false },
      { word: 'Transient', isReal: true },
      { word: 'Disinterment', isReal: true },
      { word: 'Reclamating', isReal: false }
    ],
    explanation: 'Real Words: Ameliorate (make better), Constructive (serving a useful purpose), Transient (lasting only for a short time), Disinterment (exhumation). Non-words: Ephemerous, Reclamating.'
  },
  {
    id: 3,
    type: 'read_and_select',
    taskNumber: 3,
    taskTitle: 'Task 1: Read and Select (Identify Real English Words)',
    questionText: 'Select the real English words from the list below:',
    words: [
      { word: 'Equanimity', isReal: true },
      { word: 'Speculational', isReal: false },
      { word: 'Pragmatic', isReal: true },
      { word: 'Eloquence', isReal: true },
      { word: 'Subferent', isReal: false },
      { word: 'Fastidiousness', isReal: true }
    ],
    explanation: 'Real Words: Equanimity (mental calmness), Pragmatic (practical), Eloquence (fluent speaking), Fastidiousness (meticulousness). Non-words: Speculational, Subferent.'
  },
  {
    id: 4,
    type: 'read_and_select',
    taskNumber: 4,
    taskTitle: 'Task 1: Read and Select (Identify Real English Words)',
    questionText: 'Select the real English words from the list below:',
    words: [
      { word: 'Laconic', isReal: true },
      { word: 'Verbosify', isReal: false },
      { word: 'Generosity', isReal: true },
      { word: 'Profligate', isReal: true },
      { word: 'Conciliatory', isReal: true },
      { word: 'Meticulousness', isReal: true }
    ],
    explanation: 'Real Words: Laconic (using very few words), Generosity (giving), Profligate (recklessly extravagant), Conciliatory (intended to pacify), Meticulousness (great attention to detail). Non-word: Verbosify.'
  },
  {
    id: 5,
    type: 'read_and_select',
    taskNumber: 5,
    taskTitle: 'Task 1: Read and Select (Identify Real English Words)',
    questionText: 'Select the real English words from the list below:',
    words: [
      { word: 'Diligent', isReal: true },
      { word: 'Resilience', isReal: true },
      { word: 'Inadvertent', isReal: true },
      { word: 'Commodify', isReal: true },
      { word: 'Stratification', isReal: true },
      { word: 'Epistemize', isReal: false }
    ],
    explanation: 'Real Words: Diligent (hardworking), Resilience (capacity to recover), Inadvertent (unintentional), Commodify (turn into a commercial product), Stratification (social classification). Non-word: Epistemize.'
  },

  // --------------------------------------------------------------------------
  // TASK 2: READ AND COMPLETE (Fill in the Blanks / C-Test) (Q6 - Q10)
  // --------------------------------------------------------------------------
  {
    id: 6,
    type: 'read_and_complete',
    taskNumber: 6,
    taskTitle: 'Task 2: Read and Complete (C-Test Missing Letters)',
    passageTemplate: `In today's fast-paced digital economy, the con____ of "deep work" has emerged as a cri____ competitive advantage. It all____ individuals to qu____ master complicated information and prod____ better results in less time.`,
    blanks: [
      { prefix: 'con', missing: 'cept', fullWord: 'concept' },
      { prefix: 'cri', missing: 'tical', fullWord: 'critical' },
      { prefix: 'all', missing: 'ows', fullWord: 'allows' },
      { prefix: 'qu', missing: 'ickly', fullWord: 'quickly' },
      { prefix: 'prod', missing: 'uce', fullWord: 'produce' }
    ],
    fullPassageText: `In today's fast-paced digital economy, the concept of "deep work" has emerged as a critical competitive advantage. It allows individuals to quickly master complicated information and produce better results in less time.`,
    explanation: 'Completed sentence: concept, critical, allows, quickly, produce.'
  },
  {
    id: 7,
    type: 'read_and_complete',
    taskNumber: 7,
    taskTitle: 'Task 2: Read and Complete (C-Test Missing Letters)',
    passageTemplate: `Modern deep-learning architectures pri____ predictive accuracy at the ex____ of causal transparency. When an algo____ forecasts complex climate shifts without pro____ an intelligible narrative, the traditional link is sev____.`,
    blanks: [
      { prefix: 'pri', missing: 'oritize', fullWord: 'prioritize' },
      { prefix: 'ex', missing: 'pense', fullWord: 'expense' },
      { prefix: 'algo', missing: 'rithm', fullWord: 'algorithm' },
      { prefix: 'pro', missing: 'viding', fullWord: 'providing' },
      { prefix: 'sev', missing: 'ered', fullWord: 'severed' }
    ],
    fullPassageText: `Modern deep-learning architectures prioritize predictive accuracy at the expense of causal transparency. When an algorithm forecasts complex climate shifts without providing an intelligible narrative, the traditional link is severed.`,
    explanation: 'Completed sentence: prioritize, expense, algorithm, providing, severed.'
  },
  {
    id: 8,
    type: 'read_and_complete',
    taskNumber: 8,
    taskTitle: 'Task 2: Read and Complete (C-Test Missing Letters)',
    passageTemplate: `The agrarian revolution fun____ reshaped human social hierarchies. Hunter-gatherer comm____ maintained egalitarian structures due to nom____ and the impossibility of as____ accumulation.`,
    blanks: [
      { prefix: 'fun', missing: 'damentally', fullWord: 'fundamentally' },
      { prefix: 'comm', missing: 'unities', fullWord: 'communities' },
      { prefix: 'nom', missing: 'adism', fullWord: 'nomadism' },
      { prefix: 'as', missing: 'set', fullWord: 'asset' }
    ],
    fullPassageText: `The agrarian revolution fundamentally reshaped human social hierarchies. Hunter-gatherer communities maintained egalitarian structures due to nomadism and the impossibility of asset accumulation.`,
    explanation: 'Completed sentence: fundamentally, communities, nomadism, asset.'
  },
  {
    id: 9,
    type: 'read_and_complete',
    taskNumber: 9,
    taskTitle: 'Task 2: Read and Complete (C-Test Missing Letters)',
    passageTemplate: `Default options cap____ on status quo bias; by pre-sel____ a designated choice, choice arch____ significantly inc____ adoption rates without res____ individual freedom.`,
    blanks: [
      { prefix: 'cap', missing: 'italize', fullWord: 'capitalize' },
      { prefix: 'pre-sel', missing: 'ecting', fullWord: 'pre-selecting' },
      { prefix: 'arch', missing: 'itects', fullWord: 'architects' },
      { prefix: 'inc', missing: 'rease', fullWord: 'increase' },
      { prefix: 'res', missing: 'tricting', fullWord: 'restricting' }
    ],
    fullPassageText: `Default options capitalize on status quo bias; by pre-selecting a designated choice, choice architects significantly increase adoption rates without restricting individual freedom.`,
    explanation: 'Completed sentence: capitalize, pre-selecting, architects, increase, restricting.'
  },
  {
    id: 10,
    type: 'read_and_complete',
    taskNumber: 10,
    taskTitle: 'Task 2: Read and Complete (C-Test Missing Letters)',
    passageTemplate: `Central bank digital currencies rep____ a fundamental re-architecture of monetary sys____. Proponents emp____ that sovereign digital money enhances financial inc____ and real-time cross-border set____.`,
    blanks: [
      { prefix: 'rep', missing: 'resent', fullWord: 'represent' },
      { prefix: 'sys', missing: 'tems', fullWord: 'systems' },
      { prefix: 'emp', missing: 'hasize', fullWord: 'emphasize' },
      { prefix: 'inc', missing: 'lusion', fullWord: 'inclusion' },
      { prefix: 'set', missing: 'tlements', fullWord: 'settlements' }
    ],
    fullPassageText: `Central bank digital currencies represent a fundamental re-architecture of monetary systems. Proponents emphasize that sovereign digital money enhances financial inclusion and real-time cross-border settlements.`,
    explanation: 'Completed sentence: represent, systems, emphasize, inclusion, settlements.'
  },

  // --------------------------------------------------------------------------
  // TASK 3: LISTEN AND TYPE (Dictation Transcript) (Q11 - Q15)
  // --------------------------------------------------------------------------
  {
    id: 11,
    type: 'listen_and_type',
    taskNumber: 11,
    taskTitle: 'Task 3: Listen and Type (Dictation)',
    audioTranscript: 'The university library will remain closed on national holidays.',
    replayLimit: 3,
    explanation: 'Accurate transcription: "The university library will remain closed on national holidays."'
  },
  {
    id: 12,
    type: 'listen_and_type',
    taskNumber: 12,
    taskTitle: 'Task 3: Listen and Type (Dictation)',
    audioTranscript: 'Recent technological advancement has significantly improved global communication networks.',
    replayLimit: 3,
    explanation: 'Accurate transcription: "Recent technological advancement has significantly improved global communication networks."'
  },
  {
    id: 13,
    type: 'listen_and_type',
    taskNumber: 13,
    taskTitle: 'Task 3: Listen and Type (Dictation)',
    audioTranscript: 'Students are required to submit their research proposals before Friday afternoon.',
    replayLimit: 3,
    explanation: 'Accurate transcription: "Students are required to submit their research proposals before Friday afternoon."'
  },
  {
    id: 14,
    type: 'listen_and_type',
    taskNumber: 14,
    taskTitle: 'Task 3: Listen and Type (Dictation)',
    audioTranscript: 'Environmental conservation policies must balance economic growth with ecological integrity.',
    replayLimit: 3,
    explanation: 'Accurate transcription: "Environmental conservation policies must balance economic growth with ecological integrity."'
  },
  {
    id: 15,
    type: 'listen_and_type',
    taskNumber: 15,
    taskTitle: 'Task 3: Listen and Type (Dictation)',
    audioTranscript: 'Effective leadership requires strong communication skills and emotional intelligence.',
    replayLimit: 3,
    explanation: 'Accurate transcription: "Effective leadership requires strong communication skills and emotional intelligence."'
  },

  // --------------------------------------------------------------------------
  // TASK 4: WRITE ABOUT THE PHOTO (Q16 - Q18)
  // --------------------------------------------------------------------------
  {
    id: 16,
    type: 'write_about_photo',
    taskNumber: 16,
    taskTitle: 'Task 4: Write About the Photo (Image Description)',
    photoDescription: 'A modern open-plan office space with professionals working on laptops at wooden desks, surrounded by large glass windows and indoor plants.',
    photoPrompt: 'Write 1–3 detailed sentences describing the image above (Minimum 1 minute).',
    sampleAnswer: 'The photograph depicts a spacious, modern open-plan office where professionals are focused on their laptops. Large glass windows allow abundant natural light to fill the room, creating a bright and productive atmosphere.',
    keywords: ['open-plan office', 'professionals', 'laptops', 'glass windows', 'natural light', 'indoor plants', 'productive atmosphere']
  },
  {
    id: 17,
    type: 'write_about_photo',
    taskNumber: 17,
    taskTitle: 'Task 4: Write About the Photo (Image Description)',
    photoDescription: 'A group of university students sitting around a circular table in a library, discussing notes with open books and a tablet.',
    photoPrompt: 'Write 1–3 detailed sentences describing the image above (Minimum 1 minute).',
    sampleAnswer: 'In this image, a group of university students is gathered around a wooden table in a quiet library. They are collaborating on an academic project using digital tablets and study notebooks.',
    keywords: ['university students', 'circular table', 'library', 'collaborating', 'tablets', 'notebooks', 'academic project']
  },
  {
    id: 18,
    type: 'write_about_photo',
    taskNumber: 18,
    taskTitle: 'Task 4: Write About the Photo (Image Description)',
    photoDescription: 'A wind turbine farm located on green rolling hills during a clear sunset with a golden sky.',
    photoPrompt: 'Write 1–3 detailed sentences describing the image above (Minimum 1 minute).',
    sampleAnswer: 'The photo shows several tall wind turbines positioned across lush green hills during sunset. The golden sunlight casts a warm glow over the landscape, highlighting renewable energy generation.',
    keywords: ['wind turbines', 'green hills', 'sunset', 'golden sky', 'renewable energy', 'landscape', 'warm glow']
  },

  // --------------------------------------------------------------------------
  // TASK 5: INTERACTIVE READING (Q19 - Q23)
  // --------------------------------------------------------------------------
  {
    id: 19,
    type: 'interactive_reading',
    taskNumber: 19,
    taskTitle: 'Task 5: Interactive Reading (Passage Completion & Analysis)',
    passageText: `The economic valuation of ecosystem services has become a central paradigm in contemporary environmental governance. By assigning monetary values to ecological functions—such as carbon sequestration, pollination, and watershed protection—policy advocates aim to integrate natural capital into traditional cost-benefit analyses. However, critical political economists argue that this financialization of nature commodifies essential ecological processes, reducing intrinsic environmental values to market dynamics. When ecosystem services are monetized, their protection becomes contingent upon market demand rather than ecological integrity. Furthermore, market-based conservation instruments like carbon credits often perpetuate spatial inequalities, allowing heavy polluters in industrialized nations to offset emissions while displacing local communities in developing regions.`,
    questionNumber: 19,
    questionType: 'Complete Passage',
    questionText: 'Choose the sentence that best fits the missing gap in the passage above:',
    options: [
      'Consequently, environmentalists argue that nature should be treated as a pure financial asset class.',
      'Therefore, ethical policy frameworks must balance financial instruments with strict statutory conservation laws.',
      'Industrial polluters have completely eliminated carbon emissions worldwide as a result.',
      'Economic valuation has proven to be the only effective method for protecting rainforests.'
    ],
    correctAnswer: 1,
    explanation: 'Therefore, ethical policy frameworks must balance financial instruments with strict statutory conservation laws fits the logical transition following the critique of market-based instruments.'
  },
  {
    id: 20,
    type: 'interactive_reading',
    taskNumber: 20,
    taskTitle: 'Task 5: Interactive Reading (Passage Completion & Analysis)',
    passageText: `The economic valuation of ecosystem services has become a central paradigm in contemporary environmental governance. By assigning monetary values to ecological functions—such as carbon sequestration, pollination, and watershed protection—policy advocates aim to integrate natural capital into traditional cost-benefit analyses. However, critical political economists argue that this financialization of nature commodifies essential ecological processes, reducing intrinsic environmental values to market dynamics. When ecosystem services are monetized, their protection becomes contingent upon market demand rather than ecological integrity. Furthermore, market-based conservation instruments like carbon credits often perpetuate spatial inequalities, allowing heavy polluters in industrialized nations to offset emissions while displacing local communities in developing regions.`,
    questionNumber: 20,
    questionType: 'Synonym',
    questionText: 'Which word in the passage is closest in meaning to "commodifies"?',
    options: [
      'Turns into a commercial product',
      'Protects legally',
      'Destroys completely',
      'Evaluates scientifically'
    ],
    correctAnswer: 0,
    explanation: '"Commodifies" means turning essential ecological processes into commercial market products.'
  },
  {
    id: 21,
    type: 'interactive_reading',
    taskNumber: 21,
    taskTitle: 'Task 5: Interactive Reading (Passage Completion & Analysis)',
    passageText: `The economic valuation of ecosystem services has become a central paradigm in contemporary environmental governance. By assigning monetary values to ecological functions—such as carbon sequestration, pollination, and watershed protection—policy advocates aim to integrate natural capital into traditional cost-benefit analyses. However, critical political economists argue that this financialization of nature commodifies essential ecological processes, reducing intrinsic environmental values to market dynamics. When ecosystem services are monetized, their protection becomes contingent upon market demand rather than ecological integrity. Furthermore, market-based conservation instruments like carbon credits often perpetuate spatial inequalities, allowing heavy polluters in industrialized nations to offset emissions while displacing local communities in developing regions.`,
    questionNumber: 21,
    questionType: 'Main Idea',
    questionText: 'Select the statement that best captures the main idea of the passage:',
    options: [
      'Assigning monetary value to ecosystem services helps integrate nature into cost-benefit analysis but risks commodifying intrinsic environmental value.',
      'Carbon credits have completely solved global spatial inequalities between nations.',
      'Political economists agree that natural capital should be bought and sold freely on stock exchanges.',
      'Watershed protection is the most expensive ecosystem service in developing regions.'
    ],
    correctAnswer: 0,
    explanation: 'Captures the dual aspect: integration into cost-benefit analysis vs the ethical risk of commodification.'
  },
  {
    id: 22,
    type: 'interactive_reading',
    taskNumber: 22,
    taskTitle: 'Task 5: Interactive Reading (Passage Completion & Analysis)',
    passageText: `The economic valuation of ecosystem services has become a central paradigm in contemporary environmental governance. By assigning monetary values to ecological functions—such as carbon sequestration, pollination, and watershed protection—policy advocates aim to integrate natural capital into traditional cost-benefit analyses. However, critical political economists argue that this financialization of nature commodifies essential ecological processes, reducing intrinsic environmental values to market dynamics. When ecosystem services are monetized, their protection becomes contingent upon market demand rather than ecological integrity. Furthermore, market-based conservation instruments like carbon credits often perpetuate spatial inequalities, allowing heavy polluters in industrialized nations to offset emissions while displacing local communities in developing regions.`,
    questionNumber: 22,
    questionType: 'Choose Title',
    questionText: 'Choose the most appropriate title for the passage:',
    options: [
      'The Financialization of Nature: Benefits and Ethical Risks',
      'How to Invest in Carbon Credit Markets',
      'The Complete Failure of Global Environmental Policies',
      'History of European Industrial Polluters'
    ],
    correctAnswer: 0,
    explanation: '"The Financialization of Nature: Benefits and Ethical Risks" accurately reflects the text\'s theme.'
  },
  {
    id: 23,
    type: 'interactive_reading',
    taskNumber: 23,
    taskTitle: 'Task 5: Interactive Reading (Passage Completion & Analysis)',
    passageText: `The economic valuation of ecosystem services has become a central paradigm in contemporary environmental governance. By assigning monetary values to ecological functions—such as carbon sequestration, pollination, and watershed protection—policy advocates aim to integrate natural capital into traditional cost-benefit analyses. However, critical political economists argue that this financialization of nature commodifies essential ecological processes, reducing intrinsic environmental values to market dynamics. When ecosystem services are monetized, their protection becomes contingent upon market demand rather than ecological integrity. Furthermore, market-based conservation instruments like carbon credits often perpetuate spatial inequalities, allowing heavy polluters in industrialized nations to offset emissions while displacing local communities in developing regions.`,
    questionNumber: 23,
    questionType: 'Inference',
    questionText: 'What can be inferred about carbon credits from the final sentence of the text?',
    options: [
      'They may allow polluters in wealthy countries to avoid actual domestic emission cuts while impacting local communities elsewhere.',
      'They guarantee equal financial compensation for all citizens in developing countries.',
      'They are illegal in industrialized nations.',
      'They have halted all local community displacements globally.'
    ],
    correctAnswer: 0,
    explanation: 'Text explicitly infers that carbon credits allow heavy polluters to offset emissions while causing local displacements.'
  }
];

// ============================================================================
// SECTION II: WRITING & SPEAKING SAMPLES (Approx. 15 Minutes)
// ============================================================================

export const DET_WRITING_SPEAKING_SAMPLES: DetWritingSpeakingSample[] = [
  {
    id: 'writing_sample',
    taskTitle: 'Writing Sample: Online vs Face-to-Face Learning',
    taskType: 'Writing Sample',
    timeMinutes: 5,
    recommendedWords: '100–150 words',
    prompt: `Some people believe that online learning and remote education will eventually replace traditional university campuses, while others argue that face-to-face classroom interaction is essential for holistic personal development.

Prompt Instructions: Respond to the prompt above in detail. Write as much as you can in 3 to 5 minutes (Minimum 100–150 words recommended). This text sample will be sent directly to academic institutions along with your official score report.`,
    sampleAnswer: `While digital learning platforms offer unmatched convenience and flexibility, traditional university campuses will remain essential for holistic education. Online education empowers self-directed learning, enabling individuals from all over the world to access world-class lectures and resources without geographic barriers. However, physical classrooms cultivate critical social dynamics that screens cannot replicate—such as spontaneous debates, collaborative lab work, and extracurricular leadership. Furthermore, face-to-face mentorship allows professors to provide immediate, nuanced guidance while fostering deep peer networks that shape future careers. Ultimately, the ideal model is not the extinction of physical universities, but a hybrid paradigm that combines digital flexibility with vibrant in-person campus life.`
  },
  {
    id: 'speaking_sample',
    taskTitle: 'Speaking Sample: Overcoming a Personal Challenge',
    taskType: 'Speaking Sample',
    timeMinutes: 3,
    prompt: `Describe a challenging situation or problem you faced recently, how you resolved it, and what you learned from the experience.

Prompt Instructions: Speak clearly into your camera for 1 to 3 minutes. Your video recording will be shared directly with admissions committees at receiving institutions.`,
    sampleAnswer: `A significant challenge I encountered recently was leading a multidisciplinary university team on a tight deadline when our primary dataset was corrupted two days before submission. Rather than panicking, I called an emergency meeting to divide the workload into three tracks: data recovery, methodology documentation, and slide design. By prioritizing clear communication and delegating tasks based on individual team strengths, we reconstructed the analysis in under 24 hours and delivered a high-scoring presentation. This experience taught me the paramount value of composed leadership, proactive risk management, and the power of collaborative problem-solving under pressure.`,
    keyPoints: [
      '1) Introduction: Describe the challenging situation clearly with context.',
      '2) Action Taken: Explain the concrete steps and leadership decisions you implemented.',
      '3) Outcome & Reflection: Highlight the ultimate resolution and key personal takeaways.'
    ]
  }
];

// ============================================================================
// OFFICIAL DET SCORING (10 - 160 SCALE) & SUBSCORE ENGINE
// ============================================================================

export interface DetScoreResult {
  overallScore: number; // 10 - 160 (increments of 5)
  literacy: number;
  comprehension: number;
  conversation: number;
  production: number;
  performanceBand: string;
  cefrLevel: string;
  summaryFeedback: string;
}

export function calculateDetScore(
  readAndSelectPoints: number, // 0 - 5
  readAndCompletePoints: number, // 0 - 5
  listenAndTypePoints: number, // 0 - 5
  photoPoints: number, // 0 - 3
  interactiveReadingPoints: number, // 0 - 5
  writingSampleWords: number
): DetScoreResult {
  // Total raw score out of 23
  const rawAdaptive = readAndSelectPoints + readAndCompletePoints + listenAndTypePoints + photoPoints + interactiveReadingPoints;
  const rawRatio = Math.min(1.0, Math.max(0.0, rawAdaptive / 23));

  // Base overall score on DET 10 - 160 scale
  let rawDet = 60 + rawRatio * 95;
  if (writingSampleWords >= 100) rawDet += 5;

  // Round to nearest 5
  let overallScore = Math.round(rawDet / 5) * 5;
  overallScore = Math.min(160, Math.max(10, overallScore));

  // Calculate DET Subscores (Literacy, Comprehension, Conversation, Production)
  // Literacy = Reading + Writing (Tasks 1, 2, 4, 5)
  const literacyRatio = (readAndSelectPoints + readAndCompletePoints + photoPoints + interactiveReadingPoints) / 18;
  let literacy = Math.round((60 + literacyRatio * 95) / 5) * 5;
  literacy = Math.min(160, Math.max(10, literacy));

  // Comprehension = Reading + Listening (Tasks 1, 2, 3, 5)
  const compRatio = (readAndSelectPoints + readAndCompletePoints + listenAndTypePoints + interactiveReadingPoints) / 20;
  let comprehension = Math.round((60 + compRatio * 95) / 5) * 5;
  comprehension = Math.min(160, Math.max(10, comprehension));

  // Conversation = Listening + Speaking (Task 3 + Speaking Sample)
  const convRatio = (listenAndTypePoints * 2 + 10) / 20;
  let conversation = Math.round((60 + convRatio * 95) / 5) * 5;
  conversation = Math.min(160, Math.max(10, conversation));

  // Production = Writing + Speaking (Tasks 4 + Writing Sample + Speaking Sample)
  const prodRatio = (photoPoints + (writingSampleWords >= 80 ? 5 : 2)) / 8;
  let production = Math.round((60 + prodRatio * 95) / 5) * 5;
  production = Math.min(160, Math.max(10, production));

  let performanceBand = 'Competent (B2)';
  let cefrLevel = 'B2 Upper-Intermediate';
  let summaryFeedback = 'Can understand main ideas of complex text and interact with native speakers with reasonable fluency.';

  if (overallScore >= 140) {
    performanceBand = 'Expert / Mastery (C2)';
    cefrLevel = 'C2 Mastery';
    summaryFeedback = 'Can understand virtually everything heard or read with ease, expressing spontaneously with high precision.';
  } else if (overallScore >= 120) {
    performanceBand = 'Advanced (C1)';
    cefrLevel = 'C1 Advanced';
    summaryFeedback = 'Can understand a wide range of demanding, longer texts and express ideas fluently without much searching for expressions.';
  } else if (overallScore >= 100) {
    performanceBand = 'Upper Intermediate (B2)';
    cefrLevel = 'B2 Competent';
    summaryFeedback = 'Can effectively communicate in academic and professional contexts with good grammatical control.';
  } else {
    performanceBand = 'Intermediate (B1)';
    cefrLevel = 'B1 Intermediate';
    summaryFeedback = 'Can understand main points of clear standard input and produce simple connected text.';
  }

  return {
    overallScore,
    literacy,
    comprehension,
    conversation,
    production,
    performanceBand,
    cefrLevel,
    summaryFeedback
  };
}

export interface DetUniversityCutoff {
  name: string;
  country: string;
  flag: string;
  minScore: number;
  program: string;
  status: 'Eligible' | 'Competitive' | 'Reach';
}

export function getDetUniversityEligibility(score: number): DetUniversityCutoff[] {
  const list = [
    { name: 'Columbia University', country: 'United States', flag: '🇺🇸', minScore: 135, program: 'Graduate School of Arts & Sciences' },
    { name: 'Yale University', country: 'United States', flag: '🇺🇸', minScore: 135, program: 'Undergraduate & Graduate Programs' },
    { name: 'New York University (NYU Stern)', country: 'United States', flag: '🇺🇸', minScore: 130, program: 'MS in Business Analytics / MBA' },
    { name: 'University of Southern California (USC)', country: 'United States', flag: '🇺🇸', minScore: 125, program: 'Viterbi School of Engineering' },
    { name: 'Northeastern University', country: 'United States', flag: '🇺🇸', minScore: 125, program: 'Khoury College of Computer Sciences' },
    { name: 'University of Toronto', country: 'Canada', flag: '🇨🇦', minScore: 120, program: 'Direct Entry Undergraduate / Grad' },
    { name: 'McGill University', country: 'Canada', flag: '🇨🇦', minScore: 120, program: 'Faculty of Science & Engineering' },
    { name: 'University of Melbourne', country: 'Australia', flag: '🇦🇺', minScore: 120, program: 'Master of International Business' },
    { name: 'Arizona State University (ASU)', country: 'United States', flag: '🇺🇸', minScore: 110, program: 'Fulton Schools of Engineering' },
    { name: 'Purdue University', country: 'United States', flag: '🇺🇸', minScore: 115, program: 'Polytechnic Institute' },
    { name: 'Monash University', country: 'Australia', flag: '🇦🇺', minScore: 115, program: 'Information Technology / Commerce' },
    { name: 'York University (Schulich)', country: 'Canada', flag: '🇨🇦', minScore: 115, program: 'MBA / Master of Finance' }
  ];

  return list.map(u => {
    let status: 'Eligible' | 'Competitive' | 'Reach' = 'Reach';
    if (score >= u.minScore + 10) status = 'Eligible';
    else if (score >= u.minScore) status = 'Competitive';
    return { ...u, status };
  });
}
