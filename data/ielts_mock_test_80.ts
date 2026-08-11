export interface IeltsQuestion {
  id: number;
  section: 'listening' | 'reading';
  partOrPassage: number; // 1, 2, 3, 4 for listening; 1, 2, 3 for reading
  partTitle: string;
  transcriptOrPassage?: string;
  questionNumber: number;
  questionText: string;
  questionType: 'MCQ' | 'Fill Blank' | 'TFNG' | 'Matching';
  options: string[]; // 4 choices: A, B, C, D (or True/False/Not Given)
  correctAnswer: number; // 0-indexed (0 for A, 1 for B, 2 for C, 3 for D)
  solution: string;
  topic?: string;
}

export interface IeltsWritingTask {
  id: 'task1-academic' | 'task1-gt' | 'task2';
  title: string;
  type: 'Task 1 (Academic)' | 'Task 1 (General Training)' | 'Task 2 (Formal Essay)';
  timeMinutes: number;
  minWords: number;
  prompt: string;
  band9ModelAnswer: string;
  keyAssessmentCriteria: {
    title: string;
    description: string;
  }[];
}

// ============================================================================
// OFFICIAL IELTS 80-QUESTION PRACTICE PAPER (LISTENING 40 + READING 40)
// ============================================================================

export const IELTS_MOCK_TEST_80: IeltsQuestion[] = [
  // --------------------------------------------------------------------------
  // SECTION I: LISTENING MODULE (40 Questions | 30 Minutes | Q1 - Q40)
  // --------------------------------------------------------------------------

  // --- Part 1: Everyday Social Conversation (Q1 - Q10) ---
  {
    id: 1,
    section: 'listening',
    partOrPassage: 1,
    partTitle: 'Part 1: Everyday Social Conversation - Housing Rental Inquiry (Q1 - Q10)',
    transcriptOrPassage: `Agent: Good morning, City Accommodation Services. How can I help you?
Caller: Hello, I'm calling to inquire about the two-bedroom apartment on Park Avenue.
Agent: Ah, yes! That apartment is available starting from 1st September. The monthly rent is £850, which includes internet and water rates, but heating is extra.
Caller: That sounds reasonable. What facilities are near the property?
Agent: There is a primary school within walking distance, a supermarket just 200 meters away, and the central train station is accessible via the Number 14 bus.
Caller: What is the minimum lease duration required?
Agent: The landlord requires a minimum of 6 months.
Caller: How much deposit is needed prior to move-in?
Agent: One month's rent as deposit.
Caller: Are pets permitted inside the building?
Agent: Pets are strictly prohibited in the apartment building.
Caller: Is there parking space available?
Agent: There is on-street parking available, though a resident on-street permit is required.
Caller: When can we schedule a viewing appointment?
Agent: We can book your viewing appointment for Saturday at 11:00 AM.`,
    questionNumber: 1,
    questionText: 'The apartment on Park Avenue becomes available on ____________.',
    questionType: 'Fill Blank',
    options: ['1st August', '1st September', '15th September', '1st October'],
    correctAnswer: 1,
    solution: 'Audio script explicitly states availability date: "That apartment is available starting from 1st September."',
    topic: 'Listening Part 1 - Dates & Details'
  },
  {
    id: 2,
    section: 'listening',
    partOrPassage: 1,
    partTitle: 'Part 1: Everyday Social Conversation - Housing Rental Inquiry (Q1 - Q10)',
    transcriptOrPassage: `Agent: Good morning, City Accommodation Services. How can I help you?
Caller: Hello, I'm calling to inquire about the two-bedroom apartment on Park Avenue.
Agent: Ah, yes! That apartment is available starting from 1st September. The monthly rent is £850, which includes internet and water rates, but heating is extra.
Caller: That sounds reasonable. What facilities are near the property?
Agent: There is a primary school within walking distance, a supermarket just 200 meters away, and the central train station is accessible via the Number 14 bus.`,
    questionNumber: 2,
    questionText: 'The monthly rental price for the apartment is £ ____________.',
    questionType: 'Fill Blank',
    options: ['800', '850', '900', '750'],
    correctAnswer: 1,
    solution: 'Monthly rent is £850 ("The monthly rent is £850, which includes internet and water rates").',
    topic: 'Listening Part 1 - Numerical Data'
  },
  {
    id: 3,
    section: 'listening',
    partOrPassage: 1,
    partTitle: 'Part 1: Everyday Social Conversation - Housing Rental Inquiry (Q1 - Q10)',
    transcriptOrPassage: `Agent: Good morning, City Accommodation Services. How can I help you?
Caller: Hello, I'm calling to inquire about the two-bedroom apartment on Park Avenue.
Agent: Ah, yes! That apartment is available starting from 1st September. The monthly rent is £850, which includes internet and water rates, but heating is extra.`,
    questionNumber: 3,
    questionText: 'Which utility bill is NOT included in the monthly rent?',
    questionType: 'Fill Blank',
    options: ['Water', 'Internet', 'Heating', 'Electricity'],
    correctAnswer: 2,
    solution: 'Heating is mentioned as extra ("includes internet and water rates, but heating is extra").',
    topic: 'Listening Part 1 - Specific Information'
  },
  {
    id: 4,
    section: 'listening',
    partOrPassage: 1,
    partTitle: 'Part 1: Everyday Social Conversation - Housing Rental Inquiry (Q1 - Q10)',
    transcriptOrPassage: `Caller: That sounds reasonable. What facilities are near the property?
Agent: There is a primary school within walking distance, a supermarket just 200 meters away, and the central train station is accessible via the Number 14 bus.`,
    questionNumber: 4,
    questionText: 'To reach the central train station, residents can take bus number ____________.',
    questionType: 'Fill Blank',
    options: ['4', '14', '40', '24'],
    correctAnswer: 1,
    solution: 'Bus number 14 reaches the central station ("accessible via the Number 14 bus").',
    topic: 'Listening Part 1 - Transport & Numbers'
  },
  {
    id: 5,
    section: 'listening',
    partOrPassage: 1,
    partTitle: 'Part 1: Everyday Social Conversation - Housing Rental Inquiry (Q1 - Q10)',
    transcriptOrPassage: `Agent: There is a primary school within walking distance, a supermarket just 200 meters away, and the central train station is accessible via the Number 14 bus.`,
    questionNumber: 5,
    questionText: 'What facility is located 200 meters from the property?',
    questionType: 'MCQ',
    options: ['Primary school', 'Supermarket', 'Train station', 'Park'],
    correctAnswer: 1,
    solution: 'Supermarket is 200m away ("a supermarket just 200 meters away").',
    topic: 'Listening Part 1 - Locations & Distances'
  },
  {
    id: 6,
    section: 'listening',
    partOrPassage: 1,
    partTitle: 'Part 1: Everyday Social Conversation - Housing Rental Inquiry (Q1 - Q10)',
    transcriptOrPassage: `Caller: What is the minimum lease duration required?
Agent: The landlord requires a standard minimum lease duration of 6 months.`,
    questionNumber: 6,
    questionText: 'Minimum lease duration required by the landlord:',
    questionType: 'MCQ',
    options: ['3 months', '6 months', '12 months', '24 months'],
    correctAnswer: 1,
    solution: 'Standard minimum lease is 6 months.',
    topic: 'Listening Part 1 - Tenancy Terms'
  },
  {
    id: 7,
    section: 'listening',
    partOrPassage: 1,
    partTitle: 'Part 1: Everyday Social Conversation - Housing Rental Inquiry (Q1 - Q10)',
    transcriptOrPassage: `Caller: How much deposit is required prior to move-in?
Agent: The landlord requires a security deposit equal to one month\'s rent.`,
    questionNumber: 7,
    questionText: 'How much deposit is required prior to move-in?',
    questionType: 'MCQ',
    options: ["One month's rent", "Two months' rent", '£500 fixed', '£1,000 fixed'],
    correctAnswer: 0,
    solution: 'Deposit equal to 1 month rent.',
    topic: 'Listening Part 1 - Financial Requirements'
  },
  {
    id: 8,
    section: 'listening',
    partOrPassage: 1,
    partTitle: 'Part 1: Everyday Social Conversation - Housing Rental Inquiry (Q1 - Q10)',
    transcriptOrPassage: `Caller: Are pets permitted inside the apartment building?
Agent: Pets are strictly prohibited in the apartment building.`,
    questionNumber: 8,
    questionText: 'Are pets permitted inside the apartment building?',
    questionType: 'MCQ',
    options: ['Allowed without restriction', 'Strictly prohibited', 'Allowed with written consent', 'Only small dogs permitted'],
    correctAnswer: 1,
    solution: 'Strictly prohibited. The property has a strict no pets policy.',
    topic: 'Listening Part 1 - Building Regulations'
  },
  {
    id: 9,
    section: 'listening',
    partOrPassage: 1,
    partTitle: 'Part 1: Everyday Social Conversation - Housing Rental Inquiry (Q1 - Q10)',
    transcriptOrPassage: `Caller: What about parking availability at the property?
Agent: There is on-street parking available, though an on-street permit is required from the local council.`,
    questionNumber: 9,
    questionText: 'Parking availability at the property:',
    questionType: 'MCQ',
    options: ['Underground garage spot included', 'On-street permit required', 'No parking available', 'Private driveway space'],
    correctAnswer: 1,
    solution: 'On-street permit required. Resident parking permit is needed.',
    topic: 'Listening Part 1 - Property Features'
  },
  {
    id: 10,
    section: 'listening',
    partOrPassage: 1,
    partTitle: 'Part 1: Everyday Social Conversation - Housing Rental Inquiry (Q1 - Q10)',
    transcriptOrPassage: `Caller: Can we schedule a viewing appointment?
Agent: We have an open slot confirmed for Saturday at 11:00 AM.`,
    questionNumber: 10,
    questionText: 'The viewing appointment is scheduled for:',
    questionType: 'MCQ',
    options: ['Thursday at 2:00 PM', 'Friday at 10:30 AM', 'Saturday at 11:00 AM', 'Monday at 4:00 PM'],
    correctAnswer: 2,
    solution: 'Saturday at 11:00 AM viewing confirmed.',
    topic: 'Listening Part 1 - Appointments & Time'
  },

  // --- Part 2: Guided Monologue & Tour Presentation (Q11 - Q20) ---
  {
    id: 11,
    section: 'listening',
    partOrPassage: 2,
    partTitle: 'Part 2: Guided Monologue & Tour Presentation - Maritime Museum (Q11 - Q20)',
    transcriptOrPassage: `Audio Transcript Script - Maritime Museum Presentation:
Welcome everyone to the National Maritime Museum. Before we begin our tour, please note the safety regulations. Emergency exits are located on the east and west corridors. The Main Exhibition Hall displays historical ship models from the 18th century. Our interactive navigation simulator is located on the second floor in Room 204.
Please remember that while non-flash photography is allowed throughout the museum, flash is prohibited inside special galleries. If you need audio headsets, they are distributed at the main information desk. For student groups of 10 or more visitors, a special group discount applies. If you feel hungry later, our museum cafe features an organic seafood chowder as today\'s specialty. Family memberships are £60 annually, and note that our summer temporary exhibit closes on 31st August.`,
    questionNumber: 11,
    questionText: 'Where are the museum emergency exits located?',
    questionType: 'MCQ',
    options: ['North and South corridors', 'East and West corridors', 'Main entrance only', 'Second floor foyer'],
    correctAnswer: 1,
    solution: 'East and West corridors. Audio states: "Emergency exits are located on the east and west corridors."',
    topic: 'Listening Part 2 - Directions & Safety'
  },
  {
    id: 12,
    section: 'listening',
    partOrPassage: 2,
    partTitle: 'Part 2: Guided Monologue & Tour Presentation - Maritime Museum (Q11 - Q20)',
    transcriptOrPassage: `The Main Exhibition Hall displays historical ship models from the 18th century. Our interactive navigation simulator is located on the second floor in Room 204.`,
    questionNumber: 12,
    questionText: 'What is featured in the Main Exhibition Hall?',
    questionType: 'MCQ',
    options: ['Modern submarine engines', '18th century ship models', 'Oil paintings of sea maps', 'Ancient diving equipment'],
    correctAnswer: 1,
    solution: '18th century ship models are the main hall feature.',
    topic: 'Listening Part 2 - Exhibits & Artifacts'
  },
  {
    id: 13,
    section: 'listening',
    partOrPassage: 2,
    partTitle: 'Part 2: Guided Monologue & Tour Presentation - Maritime Museum (Q11 - Q20)',
    transcriptOrPassage: `Our interactive navigation simulator is located on the second floor in Room 204.`,
    questionNumber: 13,
    questionText: 'The interactive navigation simulator is situated in:',
    questionType: 'MCQ',
    options: ['Room 101', 'Room 204', 'Ground floor atrium', 'Outdoor courtyard'],
    correctAnswer: 1,
    solution: 'Room 204. Navigation simulator is located in Room 204 on the second floor.',
    topic: 'Listening Part 2 - Room Identification'
  },
  {
    id: 14,
    section: 'listening',
    partOrPassage: 2,
    partTitle: 'Part 2: Guided Monologue & Tour Presentation - Maritime Museum (Q11 - Q20)',
    transcriptOrPassage: `Photography policy: Please remember that photography is allowed without flash in the special exhibition galleries.`,
    questionNumber: 14,
    questionText: 'Photography policy inside special exhibition galleries:',
    questionType: 'MCQ',
    options: ['Allowed with flash', 'Allowed without flash', 'Strictly prohibited', 'Allowed for students only'],
    correctAnswer: 1,
    solution: 'Allowed without flash. Photo rule restricts flash usage.',
    topic: 'Listening Part 2 - Museum Rules'
  },
  {
    id: 15,
    section: 'listening',
    partOrPassage: 2,
    partTitle: 'Part 2: Guided Monologue & Tour Presentation - Maritime Museum (Q11 - Q20)',
    transcriptOrPassage: `The museum gift shop opens daily from 9:00 AM to 5:00 PM for souvenirs and books.`,
    questionNumber: 15,
    questionText: 'Museum gift shop opening hours:',
    questionType: 'MCQ',
    options: ['9:00 AM to 5:00 PM', '10:00 AM to 6:00 PM', '11:00 AM to 4:00 PM', 'Open 24 hours'],
    correctAnswer: 0,
    solution: '9:00 AM to 5:00 PM is the official gift shop schedule.',
    topic: 'Listening Part 2 - Facility Hours'
  },
  {
    id: 16,
    section: 'listening',
    partOrPassage: 2,
    partTitle: 'Part 2: Guided Monologue & Tour Presentation - Maritime Museum (Q11 - Q20)',
    transcriptOrPassage: `If you wish to use an audio guide headset, they are provided at the main information desk.`,
    questionNumber: 16,
    questionText: 'Audio guide headsets are provided at:',
    questionType: 'MCQ',
    options: ['Main information desk', 'Second floor cafe', 'Outdoor ticket booth', 'Museum library'],
    correctAnswer: 0,
    solution: 'Main information desk distributes the audio guide headsets.',
    topic: 'Listening Part 2 - Visitor Amenities'
  },
  {
    id: 17,
    section: 'listening',
    partOrPassage: 2,
    partTitle: 'Part 2: Guided Monologue & Tour Presentation - Maritime Museum (Q11 - Q20)',
    transcriptOrPassage: `For student tour groups, a group discount is available for a minimum of 10 visitors.`,
    questionNumber: 17,
    questionText: 'Group discount threshold for student tours:',
    questionType: 'MCQ',
    options: ['Minimum 5 visitors', 'Minimum 10 visitors', 'Minimum 15 visitors', 'Minimum 20 visitors'],
    correctAnswer: 1,
    solution: 'Minimum 10 visitors required to qualify for student group discount.',
    topic: 'Listening Part 2 - Ticketing & Discounts'
  },
  {
    id: 18,
    section: 'listening',
    partOrPassage: 2,
    partTitle: 'Part 2: Guided Monologue & Tour Presentation - Maritime Museum (Q11 - Q20)',
    transcriptOrPassage: `In the museum cafe, today\'s special daily menu option is our chef\'s organic seafood chowder.`,
    questionNumber: 18,
    questionText: 'The museum cafe special daily menu option:',
    questionType: 'MCQ',
    options: ['Organic seafood chowder', 'Vegetarian lasagna', 'Grilled chicken sandwich', 'Fresh fruit salad'],
    correctAnswer: 0,
    solution: 'Organic seafood chowder is the cafe specialty.',
    topic: 'Listening Part 2 - Cafe Menu'
  },
  {
    id: 19,
    section: 'listening',
    partOrPassage: 2,
    partTitle: 'Part 2: Guided Monologue & Tour Presentation - Maritime Museum (Q11 - Q20)',
    transcriptOrPassage: `Annual museum membership for families is £60 per year, which includes unlimited free admission.`,
    questionNumber: 19,
    questionText: 'Annual museum membership fee for families:',
    questionType: 'MCQ',
    options: ['£45', '£60', '£75', '£90'],
    correctAnswer: 1,
    solution: '£60 per year for family membership.',
    topic: 'Listening Part 2 - Membership Pricing'
  },
  {
    id: 20,
    section: 'listening',
    partOrPassage: 2,
    partTitle: 'Part 2: Guided Monologue & Tour Presentation - Maritime Museum (Q11 - Q20)',
    transcriptOrPassage: `Please be advised that our summer temporary exhibition will conclude on 31st August.`,
    questionNumber: 20,
    questionText: 'Temporary exhibit closing date for summer season:',
    questionType: 'MCQ',
    options: ['15th July', '31st August', '10th September', '30th October'],
    correctAnswer: 1,
    solution: '31st August marks the end of the summer temporary exhibit.',
    topic: 'Listening Part 2 - Event Dates'
  },

  // --- Part 3: Academic Discussion Between Students (Q21 - Q30) ---
  {
    id: 21,
    section: 'listening',
    partOrPassage: 3,
    partTitle: 'Part 3: Academic Discussion Between Students - Research Project (Q21 - Q30)',
    transcriptOrPassage: `Audio Context - Academic Discussion between Sarah and Mark:
Sarah: Hi Mark, we need to finalize our environmental engineering research project for Professor Davis. Have you reviewed our proposal on renewable energy microgrids?
Mark: Yes Sarah, renewable energy microgrids is definitely the strongest topic. For our primary data collection, online survey questionnaires will give us broad geographic reach.
Sarah: Agreed. Let\'s target a sample size of 250 participants to ensure statistical validity.
Mark: Perfect. When I began running the initial data analysis, missing data values in responses caused the biggest statistical hurdle, so we will need imputation techniques.
Sarah: Professor Davis set our final project presentation deadline for 20th November.
Mark: Right, and keeping the presentation focused is key—let\'s limit the final deck to 15 slides.
Sarah: For the visualizations and interactive dashboards, Tableau will make our data clearer than standard spreadsheets.
Mark: Who should do which part? Sarah, you should present the literature review section during the seminar.
Sarah: Sure, and since our allocated slot is exactly 20 minutes, we should rehearse our pacing carefully.
Mark: Definitely, especially considering this project carries a 30% weightage in our final course grade!`,
    questionNumber: 21,
    questionText: "What is the primary topic of the students' research project?",
    questionType: 'MCQ',
    options: ['Renewable energy microgrids', 'Urban waste management protocols', 'Biodiversity loss in rainforests', 'Public transport electrification'],
    correctAnswer: 0,
    solution: 'Renewable energy microgrids is the student research topic.',
    topic: 'Listening Part 3 - Project Topic'
  },
  {
    id: 22,
    section: 'listening',
    partOrPassage: 3,
    partTitle: 'Part 3: Academic Discussion Between Students - Research Project (Q21 - Q30)',
    transcriptOrPassage: `Mark: For our primary data collection, online survey questionnaires will give us broad geographic reach.`,
    questionNumber: 22,
    questionText: 'Which methodology did the students choose for primary data collection?',
    questionType: 'MCQ',
    options: ['Online survey questionnaires', 'Face-to-face interviews', 'Laboratory experiments', 'Historical archive analysis'],
    correctAnswer: 0,
    solution: 'Online survey questionnaires was the methodology chosen.',
    topic: 'Listening Part 3 - Research Methodology'
  },
  {
    id: 23,
    section: 'listening',
    partOrPassage: 3,
    partTitle: 'Part 3: Academic Discussion Between Students - Research Project (Q21 - Q30)',
    transcriptOrPassage: `Sarah: Agreed. Let\'s target a sample size of 250 participants to ensure statistical validity.`,
    questionNumber: 23,
    questionText: 'What sample size was agreed upon for the survey?',
    questionType: 'MCQ',
    options: ['100 participants', '250 participants', '500 participants', '1,000 participants'],
    correctAnswer: 1,
    solution: '250 participants target sample size.',
    topic: 'Listening Part 3 - Sample Sizes'
  },
  {
    id: 24,
    section: 'listening',
    partOrPassage: 3,
    partTitle: 'Part 3: Academic Discussion Between Students - Research Project (Q21 - Q30)',
    transcriptOrPassage: `Mark: When I began running the initial data analysis, missing data values in responses caused the biggest statistical hurdle.`,
    questionNumber: 24,
    questionText: 'What main difficulty did Sarah encounter during statistical analysis?',
    questionType: 'MCQ',
    options: ['Software compatibility errors', 'Missing data values in responses', 'Unclear survey question phrasing', 'Insufficient computing power'],
    correctAnswer: 1,
    solution: 'Missing data values in responses was the key statistical hurdle.',
    topic: 'Listening Part 3 - Data Challenges'
  },
  {
    id: 25,
    section: 'listening',
    partOrPassage: 3,
    partTitle: 'Part 3: Academic Discussion Between Students - Research Project (Q21 - Q30)',
    transcriptOrPassage: `Sarah: Professor Davis set our final project presentation deadline for 20th November.`,
    questionNumber: 25,
    questionText: 'The project presentation deadline set by Professor Davis:',
    questionType: 'MCQ',
    options: ['12th November', '20th November', '1st December', '15th December'],
    correctAnswer: 1,
    solution: '20th November is the submission deadline.',
    topic: 'Listening Part 3 - Academic Deadlines'
  },
  {
    id: 26,
    section: 'listening',
    partOrPassage: 3,
    partTitle: 'Part 3: Academic Discussion Between Students - Research Project (Q21 - Q30)',
    transcriptOrPassage: `Mark: Keeping the presentation focused is key—let\'s limit the final deck to 15 slides.`,
    questionNumber: 26,
    questionText: 'How many slides will be included in the final presentation deck?',
    questionType: 'MCQ',
    options: ['10 slides', '15 slides', '20 slides', '25 slides'],
    correctAnswer: 1,
    solution: '15 slides in the final presentation deck.',
    topic: 'Listening Part 3 - Presentation Structure'
  },
  {
    id: 27,
    section: 'listening',
    partOrPassage: 3,
    partTitle: 'Part 3: Academic Discussion Between Students - Research Project (Q21 - Q30)',
    transcriptOrPassage: `Sarah: For the visualizations and interactive dashboards, Tableau will make our data clearer than standard spreadsheets.`,
    questionNumber: 27,
    questionText: 'Which software will be used for creating data visualizations?',
    questionType: 'MCQ',
    options: ['R Studio', 'Python Matplotlib', 'Tableau', 'Microsoft Excel'],
    correctAnswer: 2,
    solution: 'Tableau is the software used for generating charts.',
    topic: 'Listening Part 3 - Software Tools'
  },
  {
    id: 28,
    section: 'listening',
    partOrPassage: 3,
    partTitle: 'Part 3: Academic Discussion Between Students - Research Project (Q21 - Q30)',
    transcriptOrPassage: `Mark: Sarah, you should present the literature review section during the seminar. Sarah: Sure!`,
    questionNumber: 28,
    questionText: 'Who will present the literature review section during the seminar?',
    questionType: 'MCQ',
    options: ['Sarah', 'Mark', 'Professor Davis', 'Both Sarah and Mark jointly'],
    correctAnswer: 0,
    solution: 'Sarah is the designated presenter for the literature review.',
    topic: 'Listening Part 3 - Roles & Responsibilities'
  },
  {
    id: 29,
    section: 'listening',
    partOrPassage: 3,
    partTitle: 'Part 3: Academic Discussion Between Students - Research Project (Q21 - Q30)',
    transcriptOrPassage: `Sarah: And since our allocated slot is exactly 20 minutes, we should rehearse our pacing carefully.`,
    questionNumber: 29,
    questionText: 'Expected duration allocated for the group presentation:',
    questionType: 'MCQ',
    options: ['10 minutes', '15 minutes', '20 minutes', '30 minutes'],
    correctAnswer: 2,
    solution: '20 minutes is the allocated presentation length.',
    topic: 'Listening Part 3 - Presentation Timing'
  },
  {
    id: 30,
    section: 'listening',
    partOrPassage: 3,
    partTitle: 'Part 3: Academic Discussion Between Students - Research Project (Q21 - Q30)',
    transcriptOrPassage: `Mark: Definitely, especially considering this project carries a 30% weightage in our final course grade!`,
    questionNumber: 30,
    questionText: 'Percentage weightage of this project in the final course grade:',
    questionType: 'MCQ',
    options: ['20%', '30%', '40%', '50%'],
    correctAnswer: 1,
    solution: '30% grade weightage in the final course mark.',
    topic: 'Listening Part 3 - Grading Criteria'
  },

  // --- Part 4: Academic Lecture (Q31 - Q40) ---
  {
    id: 31,
    section: 'listening',
    partOrPassage: 4,
    partTitle: 'Part 4: Academic Lecture - Deep-Sea Geothermal Vents (Q31 - Q40)',
    transcriptOrPassage: `Audio Context - Academic Lecture on Marine Geology & Extremophiles:
Lecturer: Good morning class. Today we explore deep-sea geothermal vents, also known as hydrothermal vents. First discovered in 1977 by oceanographers using the research submersible Alvin along the Galapagos Rift, these vents exist at extreme depths averaging 2,500 meters beneath the surface.
Mineral-rich hydrothermal fluids emitted from \'black smokers\' reach staggering temperatures between 300°C and 400°C. The plume contains dense concentrations of hydrogen sulfide and valuable metal mineral precipitates, predominantly copper and zinc sulfides.
Because sunlight cannot penetrate these abyssal depths, organisms at the foundation of the ecosystem do not perform photosynthesis; instead, they rely on chemosynthesis, converting sulfur compounds into organic matter.
Today, the prospect of deep-sea commercial mining poses significant threats, particularly benthic habitat destruction. Intriguingly, astrobiologists believe understanding these vents provides a crucial model for future space exploration, notably exploring the subterranean Europa ocean beneath the ice crust of Jupiter\'s moon.`,
    questionNumber: 31,
    questionText: 'What phenomenon is the university lecturer analyzing in this session?',
    questionType: 'MCQ',
    options: ['Deep-sea geothermal vents', 'Volcanic ash dispersion mechanisms', 'Glacial melting in Arctic regions', 'Soil erosion in tropical zones'],
    correctAnswer: 0,
    solution: 'Deep-sea geothermal vents is the lecture topic.',
    topic: 'Listening Part 4 - Lecture Theme'
  },
  {
    id: 32,
    section: 'listening',
    partOrPassage: 4,
    partTitle: 'Part 4: Academic Lecture - Deep-Sea Geothermal Vents (Q31 - Q40)',
    transcriptOrPassage: `The plume contains dense concentrations of hydrogen sulfide and valuable metal mineral precipitates.`,
    questionNumber: 32,
    questionText: 'Primary chemical compound identified in hydrothermal vent plumes:',
    questionType: 'MCQ',
    options: ['Hydrogen sulfide', 'Sodium chloride', 'Carbon monoxide', 'Methane hydrate'],
    correctAnswer: 0,
    solution: 'Hydrogen sulfide is the primary chemical compound identified.',
    topic: 'Listening Part 4 - Chemical Composition'
  },
  {
    id: 33,
    section: 'listening',
    partOrPassage: 4,
    partTitle: 'Part 4: Academic Lecture - Deep-Sea Geothermal Vents (Q31 - Q40)',
    transcriptOrPassage: `Mineral-rich hydrothermal fluids emitted from \'black smokers\' reach staggering temperatures between 300°C and 400°C.`,
    questionNumber: 33,
    questionText: 'What temperature range do fluids emitted from black smokers reach?',
    questionType: 'MCQ',
    options: ['100°C - 200°C', '300°C - 400°C', '500°C - 600°C', 'Above 700°C'],
    correctAnswer: 1,
    solution: '300°C - 400°C black smoker fluid temperature.',
    topic: 'Listening Part 4 - Thermal Data'
  },
  {
    id: 34,
    section: 'listening',
    partOrPassage: 4,
    partTitle: 'Part 4: Academic Lecture - Deep-Sea Geothermal Vents (Q31 - Q40)',
    transcriptOrPassage: `Organisms at the foundation of the ecosystem do not perform photosynthesis; instead, they rely on chemosynthesis.`,
    questionNumber: 34,
    questionText: 'Organisms at the base of hydrothermal vent food webs rely on:',
    questionType: 'MCQ',
    options: ['Photosynthesis', 'Chemosynthesis', 'Herbivorous grazing', 'Parasitic absorption'],
    correctAnswer: 1,
    solution: 'Chemosynthesis is the biological base of the food web.',
    topic: 'Listening Part 4 - Marine Biology'
  },
  {
    id: 35,
    section: 'listening',
    partOrPassage: 4,
    partTitle: 'Part 4: Academic Lecture - Deep-Sea Geothermal Vents (Q31 - Q40)',
    transcriptOrPassage: `Hydrothermal vents were first discovered in 1977 by oceanographers along the Galapagos Rift.`,
    questionNumber: 35,
    questionText: 'In what year were hydrothermal vents first discovered by scientists?',
    questionType: 'MCQ',
    options: ['1965', '1977', '1985', '1992'],
    correctAnswer: 1,
    solution: '1977 was the historic discovery year.',
    topic: 'Listening Part 4 - Scientific History'
  },
  {
    id: 36,
    section: 'listening',
    partOrPassage: 4,
    partTitle: 'Part 4: Academic Lecture - Deep-Sea Geothermal Vents (Q31 - Q40)',
    transcriptOrPassage: `First discovered in 1977 by oceanographers using the research submersible Alvin along the Galapagos Rift.`,
    questionNumber: 36,
    questionText: 'Name of the research submersible vessel used during the initial discovery:',
    questionType: 'MCQ',
    options: ['Alvin', 'Nautilus', 'Challenger', 'Trieste'],
    correctAnswer: 0,
    solution: 'Alvin was the deep-sea submersible vessel used.',
    topic: 'Listening Part 4 - Oceanographic Equipment'
  },
  {
    id: 37,
    section: 'listening',
    partOrPassage: 4,
    partTitle: 'Part 4: Academic Lecture - Deep-Sea Geothermal Vents (Q31 - Q40)',
    transcriptOrPassage: `These vents exist at extreme depths averaging 2,500 meters beneath the surface.`,
    questionNumber: 37,
    questionText: 'Average ocean depth at which hydrothermal vents are typically formed:',
    questionType: 'MCQ',
    options: ['500 meters', '1,000 meters', '2,500 meters', '5,000 meters'],
    correctAnswer: 2,
    solution: '2,500 meters is the average vent depth.',
    topic: 'Listening Part 4 - Ocean Depth'
  },
  {
    id: 38,
    section: 'listening',
    partOrPassage: 4,
    partTitle: 'Part 4: Academic Lecture - Deep-Sea Geothermal Vents (Q31 - Q40)',
    transcriptOrPassage: `The plume contains valuable metal mineral precipitates, predominantly copper and zinc sulfides.`,
    questionNumber: 38,
    questionText: 'Which metal mineral deposits are densely concentrated around vent chimneys?',
    questionType: 'MCQ',
    options: ['Copper and Zinc sulfides', 'Aluminum oxides', 'Pure gold veins', 'Platinum nuggets'],
    correctAnswer: 0,
    solution: 'Copper and Zinc sulfides are the concentrated mineral deposits.',
    topic: 'Listening Part 4 - Mineral Geology'
  },
  {
    id: 39,
    section: 'listening',
    partOrPassage: 4,
    partTitle: 'Part 4: Academic Lecture - Deep-Sea Geothermal Vents (Q31 - Q40)',
    transcriptOrPassage: `Today, the prospect of deep-sea commercial mining poses significant threats, particularly benthic habitat destruction.`,
    questionNumber: 39,
    questionText: 'Key environmental concern associated with deep-sea mining of vent sites:',
    questionType: 'MCQ',
    options: ['Benthic habitat destruction', 'Surface water temperature rise', 'Atmospheric ozone depletion', 'Coastal tsunami generation'],
    correctAnswer: 0,
    solution: 'Benthic habitat destruction is the primary environmental concern.',
    topic: 'Listening Part 4 - Environmental Impacts'
  },
  {
    id: 40,
    section: 'listening',
    partOrPassage: 4,
    partTitle: 'Part 4: Academic Lecture - Deep-Sea Geothermal Vents (Q31 - Q40)',
    transcriptOrPassage: `Intriguingly, astrobiologists believe understanding these vents provides a crucial model for future space exploration, notably exploring the subterranean Europa ocean beneath the ice crust of Jupiter\'s moon.`,
    questionNumber: 40,
    questionText: "What future space mission target shares environmental similarities with Earth's vent ecosystems?",
    questionType: 'MCQ',
    options: ['Mars subsurface ice', 'Europa ocean beneath ice crust', 'Venus upper atmosphere', 'Titan methane lakes'],
    correctAnswer: 1,
    solution: 'Europa ocean beneath ice crust shares environmental similarities with geothermal vent ecosystems.',
    topic: 'Listening Part 4 - Astrobiology'
  },

  // --------------------------------------------------------------------------
  // SECTION II: ACADEMIC READING MODULE (40 Questions | 60 Minutes | Q41 - Q80)
  // --------------------------------------------------------------------------

  // --- Passage 1: Environmental Science & Artificial Intelligence (Q41 - Q53 / Reading Q1 - Q13) ---
  {
    id: 41,
    section: 'reading',
    partOrPassage: 1,
    partTitle: 'Passage 1: Environmental Science & Artificial Intelligence (Q1 - Q13)',
    transcriptOrPassage: `The central crisis of contemporary environmental epistemology stems from the shift from explanatory models to predictive models. For centuries, scientific progress was measured by human capacity to explain causality through conceptual frameworks. Modern deep-learning architectures, however, prioritize predictive accuracy at the expense of causal transparency. When an algorithm correctly forecasts complex climate shifts without providing an intelligible causal narrative, the traditional link between knowledge and understanding is severed. Critics argue that relying on opacity compromises human moral accountability. If decision-makers cannot comprehend why a model recommends a specific ecological intervention, they cannot ethically justify its real-world consequences.`,
    questionNumber: 1,
    questionText: 'What is the primary crisis highlighted in the passage?',
    questionType: 'MCQ',
    options: [
      'Deep-learning models have low predictive accuracy.',
      'Predictive accuracy without causal explanation severs knowledge from understanding.',
      'Climate change models are impossible to construct.',
      'Human decision-makers reject technological tools.'
    ],
    correctAnswer: 1,
    solution: 'Predictive accuracy without causal explanation severs knowledge from understanding. The passage highlights that prioritizing predictive accuracy over causal transparency breaks the link between knowledge and understanding.',
    topic: 'Reading Passage 1 - Main Idea'
  },
  {
    id: 42,
    section: 'reading',
    partOrPassage: 1,
    partTitle: 'Passage 1: Environmental Science & Artificial Intelligence (Q1 - Q13)',
    transcriptOrPassage: `For centuries, scientific progress was measured by human capacity to explain causality through conceptual frameworks.`,
    questionNumber: 2,
    questionText: 'True / False / Not Given: Scientific progress was historically measured by causal explanation capacity.',
    questionType: 'TFNG',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 0,
    solution: 'TRUE. Text states scientific progress was historically measured by causal explanation ("human capacity to explain causality through conceptual frameworks").',
    topic: 'Reading Passage 1 - True/False/Not Given'
  },
  {
    id: 43,
    section: 'reading',
    partOrPassage: 1,
    partTitle: 'Passage 1: Environmental Science & Artificial Intelligence (Q1 - Q13)',
    transcriptOrPassage: `Modern deep-learning architectures, however, prioritize predictive accuracy at the expense of causal transparency.`,
    questionNumber: 3,
    questionText: 'True / False / Not Given: Deep-learning models are cheaper to build than traditional models.',
    questionType: 'TFNG',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 2,
    solution: 'NOT GIVEN. Cost comparison is not mentioned anywhere in the text.',
    topic: 'Reading Passage 1 - True/False/Not Given'
  },
  {
    id: 44,
    section: 'reading',
    partOrPassage: 1,
    partTitle: 'Passage 1: Environmental Science & Artificial Intelligence (Q1 - Q13)',
    transcriptOrPassage: `Critics argue that relying on opacity compromises human moral accountability. If decision-makers cannot comprehend why a model recommends a specific ecological intervention, they cannot ethically justify its real-world consequences.`,
    questionNumber: 4,
    questionText: 'True / False / Not Given: Moral accountability is compromised when decision-makers rely on opaque models.',
    questionType: 'TFNG',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 0,
    solution: 'TRUE. Relying on opacity directly compromises moral accountability as decision-makers cannot ethically justify interventions.',
    topic: 'Reading Passage 1 - True/False/Not Given'
  },
  {
    id: 45,
    section: 'reading',
    partOrPassage: 1,
    partTitle: 'Passage 1: Environmental Science & Artificial Intelligence (Q1 - Q13)',
    transcriptOrPassage: `Modern deep-learning architectures, however, prioritize predictive accuracy at the expense of causal transparency.`,
    questionNumber: 5,
    questionText: 'Match the concept: "Predictive accuracy prioritized over causal transparency" refers to:',
    questionType: 'Matching',
    options: [
      'Deep-learning architectures',
      'Traditional scientific progress',
      'Environmental epistemology',
      'Ethical justification'
    ],
    correctAnswer: 0,
    solution: 'Deep-learning architectures explicitly prioritize predictive accuracy over causal transparency.',
    topic: 'Reading Passage 1 - Concept Matching'
  },
  {
    id: 46,
    section: 'reading',
    partOrPassage: 1,
    partTitle: 'Passage 1: Environmental Science & Artificial Intelligence (Q1 - Q13)',
    transcriptOrPassage: `When an algorithm correctly forecasts complex climate shifts without providing an intelligible causal narrative, the traditional link between knowledge and understanding is severed.`,
    questionNumber: 6,
    questionText: 'The traditional link between knowledge and _________ is severed by opaque predictive models.',
    questionType: 'Fill Blank',
    options: ['understanding', 'accuracy', 'statistics', 'technology'],
    correctAnswer: 0,
    solution: 'understanding. The passage states: "the traditional link between knowledge and understanding is severed."',
    topic: 'Reading Passage 1 - Sentence Completion'
  },
  {
    id: 47,
    section: 'reading',
    partOrPassage: 1,
    partTitle: 'Passage 1: Environmental Science & Artificial Intelligence (Q1 - Q13)',
    transcriptOrPassage: `If decision-makers cannot comprehend why a model recommends a specific ecological intervention, they cannot ethically justify its real-world consequences.`,
    questionNumber: 7,
    questionText: 'Decision-makers cannot ethically justify real-world _________ if models are incomprehensible.',
    questionType: 'Fill Blank',
    options: ['consequences', 'costs', 'data', 'publications'],
    correctAnswer: 0,
    solution: 'consequences. Decision-makers cannot ethically justify consequences.',
    topic: 'Reading Passage 1 - Sentence Completion'
  },
  {
    id: 48,
    section: 'reading',
    partOrPassage: 1,
    partTitle: 'Passage 1: Environmental Science & Artificial Intelligence (Q1 - Q13)',
    transcriptOrPassage: `Critics argue that relying on opacity compromises human moral accountability. If decision-makers cannot comprehend why a model recommends a specific ecological intervention, they cannot ethically justify its real-world consequences.`,
    questionNumber: 8,
    questionText: 'The tone of the author towards pure predictive opacity can best be described as:',
    questionType: 'MCQ',
    options: [
      'Critically apprehensive',
      'Enthusiastically supportive',
      'Completely indifferent',
      'Unconditionally optimistic'
    ],
    correctAnswer: 0,
    solution: 'Critically apprehensive. The author expresses serious ethical and philosophical concerns over lack of causal transparency.',
    topic: "Reading Passage 1 - Author's Tone"
  },
  {
    id: 49,
    section: 'reading',
    partOrPassage: 1,
    partTitle: 'Passage 1: Environmental Science & Artificial Intelligence (Q1 - Q13)',
    transcriptOrPassage: `When an algorithm correctly forecasts complex climate shifts without providing an intelligible causal narrative...`,
    questionNumber: 9,
    questionText: 'Which field is explicitly mentioned as being affected by algorithmic forecasts?',
    questionType: 'MCQ',
    options: [
      'Complex climate shifts',
      'Rocket trajectory design',
      'High-frequency stock trading',
      'Architectural urban planning'
    ],
    correctAnswer: 0,
    solution: 'Complex climate shifts is explicitly cited in the text.',
    topic: 'Reading Passage 1 - Factual Detail'
  },
  {
    id: 50,
    section: 'reading',
    partOrPassage: 1,
    partTitle: 'Passage 1: Environmental Science & Artificial Intelligence (Q1 - Q13)',
    transcriptOrPassage: `Critics argue that relying on opacity compromises human moral accountability.`,
    questionNumber: 10,
    questionText: 'True / False / Not Given: All scientists agree that predictive accuracy is more important than causal narrative.',
    questionType: 'TFNG',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 2,
    solution: 'NOT GIVEN. Text mentions critics, but does not state universal consensus among all scientists.',
    topic: 'Reading Passage 1 - True/False/Not Given'
  },
  {
    id: 51,
    section: 'reading',
    partOrPassage: 1,
    partTitle: 'Passage 1: Environmental Science & Artificial Intelligence (Q1 - Q13)',
    transcriptOrPassage: `For centuries, scientific progress was measured by human capacity to explain causality through conceptual frameworks.`,
    questionNumber: 11,
    questionText: 'Conceptual frameworks were historically used to explain _________.',
    questionType: 'Fill Blank',
    options: ['causality', 'profit', 'software', 'geology'],
    correctAnswer: 0,
    solution: 'causality. Conceptual frameworks were used to explain causality.',
    topic: 'Reading Passage 1 - Sentence Completion'
  },
  {
    id: 52,
    section: 'reading',
    partOrPassage: 1,
    partTitle: 'Passage 1: Environmental Science & Artificial Intelligence (Q1 - Q13)',
    transcriptOrPassage: `The central crisis of contemporary environmental epistemology stems from the shift from explanatory models to predictive models.`,
    questionNumber: 12,
    questionText: 'The main focus of contemporary epistemology according to the text is:',
    questionType: 'MCQ',
    options: [
      'Shift from explanatory to predictive models',
      'Elimination of all machine learning',
      'Expansion of textbook publishing',
      'Reduction of research funding'
    ],
    correctAnswer: 0,
    solution: 'Shift from explanatory to predictive models.',
    topic: 'Reading Passage 1 - Core Theme'
  },
  {
    id: 53,
    section: 'reading',
    partOrPassage: 1,
    partTitle: 'Passage 1: Environmental Science & Artificial Intelligence (Q1 - Q13)',
    transcriptOrPassage: `The central crisis of contemporary environmental epistemology stems from the shift from explanatory models to predictive models... Critics argue that relying on opacity compromises human moral accountability.`,
    questionNumber: 13,
    questionText: 'Best alternative title for Passage 1:',
    questionType: 'MCQ',
    options: [
      'The Epistemological Risks of Opaque AI Prediction',
      'Why Climate Models Always Fail',
      'History of Computer Hardware Design',
      'Moral Philosophy in Ancient Greece'
    ],
    correctAnswer: 0,
    solution: 'The Epistemological Risks of Opaque AI Prediction captures the core argument regarding transparency and ethics in AI.',
    topic: 'Reading Passage 1 - Passage Title'
  },

  // --- Passage 2: History & Agrarian Revolution (Q54 - Q66 / Reading Q14 - Q26) ---
  {
    id: 54,
    section: 'reading',
    partOrPassage: 2,
    partTitle: 'Passage 2: History & Agrarian Revolution (Q14 - Q26)',
    transcriptOrPassage: `The agrarian revolution was not merely a technological transition in food production; it fundamentally reshaped human social hierarchies. Hunter-gatherer communities maintained relatively egalitarian social structures due to nomadism and the impossibility of asset accumulation. The settlement required by agriculture enabled surplus generation, which in turn birthed property rights, institutionalized inequality, and centralized political authority. As land became the primary store of value, social status became tied to inheritance rather than individual contribution. Thus, the security offered by agricultural surpluses was bought at the cost of pervasive social stratification.`,
    questionNumber: 14,
    questionText: 'What allowed hunter-gatherer societies to remain egalitarian?',
    questionType: 'MCQ',
    options: [
      'Nomadism and asset accumulation impossibility',
      'Enforced legal codes',
      'Advanced farming tools',
      'Centralized governance'
    ],
    correctAnswer: 0,
    solution: 'Nomadism and asset accumulation impossibility kept hunter-gatherer societies egalitarian.',
    topic: 'Reading Passage 2 - Social Structures'
  },
  {
    id: 55,
    section: 'reading',
    partOrPassage: 2,
    partTitle: 'Passage 2: History & Agrarian Revolution (Q14 - Q26)',
    transcriptOrPassage: `The settlement required by agriculture enabled surplus generation, which in turn birthed property rights...`,
    questionNumber: 15,
    questionText: 'True / False / Not Given: Agriculture enabled surplus food generation.',
    questionType: 'TFNG',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 0,
    solution: 'TRUE. The text directly states that agriculture enabled surplus generation.',
    topic: 'Reading Passage 2 - True/False/Not Given'
  },
  {
    id: 56,
    section: 'reading',
    partOrPassage: 2,
    partTitle: 'Passage 2: History & Agrarian Revolution (Q14 - Q26)',
    transcriptOrPassage: `Hunter-gatherer communities maintained relatively egalitarian social structures due to nomadism and the impossibility of asset accumulation.`,
    questionNumber: 16,
    questionText: 'True / False / Not Given: Hunter-gatherers had higher life expectancy than early farmers.',
    questionType: 'TFNG',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 2,
    solution: 'NOT GIVEN. Life expectancy comparison is not discussed in the passage.',
    topic: 'Reading Passage 2 - True/False/Not Given'
  },
  {
    id: 57,
    section: 'reading',
    partOrPassage: 2,
    partTitle: 'Passage 2: History & Agrarian Revolution (Q14 - Q26)',
    transcriptOrPassage: `As land became the primary store of value, social status became tied to inheritance rather than individual contribution.`,
    questionNumber: 17,
    questionText: 'True / False / Not Given: Social status became tied to asset inheritance after the agricultural transition.',
    questionType: 'TFNG',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 0,
    solution: 'TRUE. Social status became tied to inheritance rather than individual contribution.',
    topic: 'Reading Passage 2 - True/False/Not Given'
  },
  {
    id: 58,
    section: 'reading',
    partOrPassage: 2,
    partTitle: 'Passage 2: History & Agrarian Revolution (Q14 - Q26)',
    transcriptOrPassage: `As land became the primary store of value, social status became tied to inheritance rather than individual contribution.`,
    questionNumber: 18,
    questionText: 'Land became the primary store of _________ in settled agrarian societies.',
    questionType: 'Fill Blank',
    options: ['value', 'grain', 'weapons', 'water'],
    correctAnswer: 0,
    solution: 'value. Land became the primary store of value.',
    topic: 'Reading Passage 2 - Sentence Completion'
  },
  {
    id: 59,
    section: 'reading',
    partOrPassage: 2,
    partTitle: 'Passage 2: History & Agrarian Revolution (Q14 - Q26)',
    transcriptOrPassage: `Thus, the security offered by agricultural surpluses was bought at the cost of pervasive social stratification.`,
    questionNumber: 19,
    questionText: 'The security of surpluses came at the cost of pervasive social _________.',
    questionType: 'Fill Blank',
    options: ['stratification', 'harmony', 'mobility', 'isolation'],
    correctAnswer: 0,
    solution: 'stratification. The cost of surpluses was social stratification.',
    topic: 'Reading Passage 2 - Sentence Completion'
  },
  {
    id: 60,
    section: 'reading',
    partOrPassage: 2,
    partTitle: 'Passage 2: History & Agrarian Revolution (Q14 - Q26)',
    transcriptOrPassage: `The settlement required by agriculture enabled surplus generation, which in turn birthed property rights, institutionalized inequality, and centralized political authority.`,
    questionNumber: 20,
    questionText: 'Property rights emerged directly as a result of:',
    questionType: 'MCQ',
    options: [
      'Agricultural surplus generation and settlement',
      'Nomadic migrations',
      'Royal decrees',
      'Trade route establishment'
    ],
    correctAnswer: 0,
    solution: 'Agricultural surplus generation and settlement directly birthed property rights.',
    topic: 'Reading Passage 2 - Institutional Emergence'
  },
  {
    id: 61,
    section: 'reading',
    partOrPassage: 2,
    partTitle: 'Passage 2: History & Agrarian Revolution (Q14 - Q26)',
    transcriptOrPassage: `The settlement required by agriculture enabled surplus generation, which in turn birthed property rights, institutionalized inequality, and centralized political authority.`,
    questionNumber: 21,
    questionText: 'Centralized political authority was birthed by:',
    questionType: 'MCQ',
    options: [
      'Settlement and asset accumulation',
      'Religious rituals',
      'Invasions',
      'Universal voting'
    ],
    correctAnswer: 0,
    solution: 'Settlement and asset accumulation enabled the rise of centralized authority.',
    topic: 'Reading Passage 2 - Political Organization'
  },
  {
    id: 62,
    section: 'reading',
    partOrPassage: 2,
    partTitle: 'Passage 2: History & Agrarian Revolution (Q14 - Q26)',
    transcriptOrPassage: `The agrarian revolution was not merely a technological transition in food production; it fundamentally reshaped human social hierarchies.`,
    questionNumber: 22,
    questionText: 'True / False / Not Given: All hunter-gatherer tribes immediately accepted agriculture when introduced.',
    questionType: 'TFNG',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 2,
    solution: 'NOT GIVEN. The rate or universality of acceptance by various tribes is not discussed in the text.',
    topic: 'Reading Passage 2 - True/False/Not Given'
  },
  {
    id: 63,
    section: 'reading',
    partOrPassage: 2,
    partTitle: 'Passage 2: History & Agrarian Revolution (Q14 - Q26)',
    transcriptOrPassage: `Thus, the security offered by agricultural surpluses was bought at the cost of pervasive social stratification.`,
    questionNumber: 23,
    questionText: 'Main trade-off described in Passage 2:',
    questionType: 'MCQ',
    options: [
      'Security vs. Social Stratification',
      'Health vs. Wealth',
      'Freedom vs. Education',
      'Technology vs. Religion'
    ],
    correctAnswer: 0,
    solution: 'Security vs. Social Stratification. Surpluses provided food security but caused deep social stratification.',
    topic: 'Reading Passage 2 - Core Trade-off'
  },
  {
    id: 64,
    section: 'reading',
    partOrPassage: 2,
    partTitle: 'Passage 2: History & Agrarian Revolution (Q14 - Q26)',
    transcriptOrPassage: `Hunter-gatherer communities maintained relatively egalitarian social structures due to nomadism and the impossibility of asset accumulation.`,
    questionNumber: 24,
    questionText: 'Hunter-gatherers could not accumulate physical _________.',
    questionType: 'Fill Blank',
    options: ['assets', 'knowledge', 'stories', 'memories'],
    correctAnswer: 0,
    solution: 'assets. Nomadism prevented physical asset accumulation.',
    topic: 'Reading Passage 2 - Sentence Completion'
  },
  {
    id: 65,
    section: 'reading',
    partOrPassage: 2,
    partTitle: 'Passage 2: History & Agrarian Revolution (Q14 - Q26)',
    transcriptOrPassage: `As land became the primary store of value, social status became tied to inheritance rather than individual contribution.`,
    questionNumber: 25,
    questionText: 'Social status in hunter-gatherer times was tied to:',
    questionType: 'MCQ',
    options: [
      'Individual contribution',
      'Land ownership',
      'Written exams',
      'Royal lineage'
    ],
    correctAnswer: 0,
    solution: 'Individual contribution (in contrast to post-agrarian inherited wealth).',
    topic: 'Reading Passage 2 - Social Status'
  },
  {
    id: 66,
    section: 'reading',
    partOrPassage: 2,
    partTitle: 'Passage 2: History & Agrarian Revolution (Q14 - Q26)',
    transcriptOrPassage: `The agrarian revolution was not merely a technological transition in food production; it fundamentally reshaped human social hierarchies... Thus, the security offered by agricultural surpluses was bought at the cost of pervasive social stratification.`,
    questionNumber: 26,
    questionText: 'Best summary title for Passage 2:',
    questionType: 'MCQ',
    options: [
      'Agricultural Surpluses and Institutional Inequality',
      'The Joy of Prehistoric Hunting',
      'Modern Fertilizer Innovations',
      'How Cities Were Built'
    ],
    correctAnswer: 0,
    solution: 'Agricultural Surpluses and Institutional Inequality traces how agricultural surpluses led directly to institutionalized hierarchy.',
    topic: 'Reading Passage 2 - Passage Title'
  },

  // --- Passage 3: Behavioral Economics & Nudge Theory (Q67 - Q80 / Reading Q27 - Q40) ---
  {
    id: 67,
    section: 'reading',
    partOrPassage: 3,
    partTitle: 'Passage 3: Behavioral Economics & Nudge Theory (Q27 - Q40)',
    transcriptOrPassage: `Cognitive biases systematically distort human decision-making, departing from normative models of classical economic theory. One prominent phenomenon is 'status quo bias,' wherein individuals demonstrate an irrational preference for the current state of affairs. Faced with complex choices, decision-makers experience choice overload, leading to decision fatigue. Default options capitalize on this bias; by pre-selecting a designated choice, choice architects significantly increase adoption rates without restricting individual choice. This principle forms the foundation of 'nudge theory,' guiding behavior toward desirable outcomes while maintaining autonomy.`,
    questionNumber: 27,
    questionText: 'What mechanism do default options capitalize on?',
    questionType: 'MCQ',
    options: [
      'Status quo bias and choice fatigue',
      'Legal mandates',
      'Financial penalties',
      'Advertising slogans'
    ],
    correctAnswer: 0,
    solution: 'Status quo bias and choice fatigue. Default options leverage inertia and decision fatigue.',
    topic: 'Reading Passage 3 - Choice Architecture'
  },
  {
    id: 68,
    section: 'reading',
    partOrPassage: 3,
    partTitle: 'Passage 3: Behavioral Economics & Nudge Theory (Q27 - Q40)',
    transcriptOrPassage: `Cognitive biases systematically distort human decision-making, departing from normative models of classical economic theory.`,
    questionNumber: 28,
    questionText: 'True / False / Not Given: Classical economic theory assumes humans always act rationally.',
    questionType: 'TFNG',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 0,
    solution: 'TRUE. Classical economic theory is based on normative, rational-actor assumptions.',
    topic: 'Reading Passage 3 - True/False/Not Given'
  },
  {
    id: 69,
    section: 'reading',
    partOrPassage: 3,
    partTitle: 'Passage 3: Behavioral Economics & Nudge Theory (Q27 - Q40)',
    transcriptOrPassage: `This principle forms the foundation of 'nudge theory,' guiding behavior toward desirable outcomes while maintaining autonomy.`,
    questionNumber: 29,
    questionText: 'True / False / Not Given: Nudge theory restricts individual freedom of choice legally.',
    questionType: 'TFNG',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 1,
    solution: 'FALSE. Nudge theory explicitly maintains autonomy without restricting individual choice.',
    topic: 'Reading Passage 3 - True/False/Not Given'
  },
  {
    id: 70,
    section: 'reading',
    partOrPassage: 3,
    partTitle: 'Passage 3: Behavioral Economics & Nudge Theory (Q27 - Q40)',
    transcriptOrPassage: `Default options capitalize on this bias; by pre-selecting a designated choice, choice architects significantly increase adoption rates without restricting individual choice.`,
    questionNumber: 30,
    questionText: 'True / False / Not Given: Choice architects are required to pass government certification.',
    questionType: 'TFNG',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 2,
    solution: 'NOT GIVEN. Government certification requirements are not mentioned.',
    topic: 'Reading Passage 3 - True/False/Not Given'
  },
  {
    id: 71,
    section: 'reading',
    partOrPassage: 3,
    partTitle: 'Passage 3: Behavioral Economics & Nudge Theory (Q27 - Q40)',
    transcriptOrPassage: `Faced with complex choices, decision-makers experience choice overload, leading to decision fatigue.`,
    questionNumber: 31,
    questionText: 'Complex choices lead to choice overload and decision _________.',
    questionType: 'Fill Blank',
    options: ['fatigue', 'power', 'wealth', 'clarity'],
    correctAnswer: 0,
    solution: 'fatigue. Choice overload leads directly to decision fatigue.',
    topic: 'Reading Passage 3 - Sentence Completion'
  },
  {
    id: 72,
    section: 'reading',
    partOrPassage: 3,
    partTitle: 'Passage 3: Behavioral Economics & Nudge Theory (Q27 - Q40)',
    transcriptOrPassage: `This principle forms the foundation of 'nudge theory,' guiding behavior toward desirable outcomes while maintaining autonomy.`,
    questionNumber: 32,
    questionText: 'Nudge theory guides behavior while maintaining individual _________.',
    questionType: 'Fill Blank',
    options: ['autonomy', 'income', 'privacy', 'tax'],
    correctAnswer: 0,
    solution: 'autonomy. The theory preserves individual autonomy.',
    topic: 'Reading Passage 3 - Sentence Completion'
  },
  {
    id: 73,
    section: 'reading',
    partOrPassage: 3,
    partTitle: 'Passage 3: Behavioral Economics & Nudge Theory (Q27 - Q40)',
    transcriptOrPassage: `One prominent phenomenon is 'status quo bias,' wherein individuals demonstrate an irrational preference for the current state of affairs.`,
    questionNumber: 33,
    questionText: 'Status quo bias is characterized by:',
    questionType: 'MCQ',
    options: [
      'Irrational preference for current state of affairs',
      'Desire for constant radical change',
      'High risk-taking behavior',
      'Perfect mathematical logic'
    ],
    correctAnswer: 0,
    solution: 'Irrational preference for current state of affairs.',
    topic: 'Reading Passage 3 - Psychological Biases'
  },
  {
    id: 74,
    section: 'reading',
    partOrPassage: 3,
    partTitle: 'Passage 3: Behavioral Economics & Nudge Theory (Q27 - Q40)',
    transcriptOrPassage: `Default options capitalize on this bias; by pre-selecting a designated choice, choice architects significantly increase adoption rates without restricting individual choice.`,
    questionNumber: 34,
    questionText: 'Choice architects influence outcomes primarily by:',
    questionType: 'MCQ',
    options: [
      'Pre-selecting default options',
      'Banning alternative choices',
      'Imposing heavy tax fines',
      'Running TV commercials'
    ],
    correctAnswer: 0,
    solution: 'Pre-selecting default options to nudge behavior.',
    topic: 'Reading Passage 3 - Choice Architecture'
  },
  {
    id: 75,
    section: 'reading',
    partOrPassage: 3,
    partTitle: 'Passage 3: Behavioral Economics & Nudge Theory (Q27 - Q40)',
    transcriptOrPassage: `...by pre-selecting a designated choice, choice architects significantly increase adoption rates without restricting individual choice.`,
    questionNumber: 35,
    questionText: 'True / False / Not Given: Pre-selected options increase adoption rates.',
    questionType: 'TFNG',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 0,
    solution: 'TRUE. Pre-selected options significantly increase adoption rates.',
    topic: 'Reading Passage 3 - True/False/Not Given'
  },
  {
    id: 76,
    section: 'reading',
    partOrPassage: 3,
    partTitle: 'Passage 3: Behavioral Economics & Nudge Theory (Q27 - Q40)',
    transcriptOrPassage: `Cognitive biases systematically distort human decision-making, departing from normative models of classical economic theory.`,
    questionNumber: 36,
    questionText: 'Classical economic models are described as:',
    questionType: 'MCQ',
    options: ['Normative', 'Chaotic', 'Unrealistic', 'Outdated'],
    correctAnswer: 0,
    solution: 'Normative. The text refers to "normative models of classical economic theory".',
    topic: 'Reading Passage 3 - Economic Terminology'
  },
  {
    id: 77,
    section: 'reading',
    partOrPassage: 3,
    partTitle: 'Passage 3: Behavioral Economics & Nudge Theory (Q27 - Q40)',
    transcriptOrPassage: `Cognitive biases systematically distort human decision-making...`,
    questionNumber: 37,
    questionText: 'Cognitive biases systematically _________ human decision-making.',
    questionType: 'Fill Blank',
    options: ['distort', 'improve', 'speed up', 'secure'],
    correctAnswer: 0,
    solution: 'distort. Biases systematically distort rational judgment.',
    topic: 'Reading Passage 3 - Sentence Completion'
  },
  {
    id: 78,
    section: 'reading',
    partOrPassage: 3,
    partTitle: 'Passage 3: Behavioral Economics & Nudge Theory (Q27 - Q40)',
    transcriptOrPassage: `This principle forms the foundation of 'nudge theory,' guiding behavior toward desirable outcomes while maintaining autonomy.`,
    questionNumber: 38,
    questionText: 'Primary goal of Nudge Theory in public policy:',
    questionType: 'MCQ',
    options: [
      'Guide behavior to desirable outcomes preserving choice',
      'Enforce total government control',
      'Eliminate all corporate profits',
      'Replace human managers with AI'
    ],
    correctAnswer: 0,
    solution: 'Guide behavior to desirable outcomes while preserving freedom of choice.',
    topic: 'Reading Passage 3 - Public Policy Goals'
  },
  {
    id: 79,
    section: 'reading',
    partOrPassage: 3,
    partTitle: 'Passage 3: Behavioral Economics & Nudge Theory (Q27 - Q40)',
    transcriptOrPassage: `Faced with complex choices, decision-makers experience choice overload, leading to decision fatigue.`,
    questionNumber: 39,
    questionText: 'Decision fatigue is caused directly by:',
    questionType: 'MCQ',
    options: ['Choice overload', 'Physical exercise', 'Lack of sleep', 'High interest rates'],
    correctAnswer: 0,
    solution: 'Choice overload is the direct cause stated in the passage.',
    topic: 'Reading Passage 3 - Cognitive Fatigue'
  },
  {
    id: 80,
    section: 'reading',
    partOrPassage: 3,
    partTitle: 'Passage 3: Behavioral Economics & Nudge Theory (Q27 - Q40)',
    transcriptOrPassage: `Default options capitalize on this bias; by pre-selecting a designated choice, choice architects significantly increase adoption rates without restricting individual choice. This principle forms the foundation of 'nudge theory'...`,
    questionNumber: 40,
    questionText: 'Best overall title for Passage 3:',
    questionType: 'MCQ',
    options: [
      'Nudge Theory and Default Choice Architecture',
      'Why Classical Economics Is Perfect',
      'How to Avoid Paying Taxes',
      'The Psychology of Physical Fitness'
    ],
    correctAnswer: 0,
    solution: 'Nudge Theory and Default Choice Architecture comprehensively summarizes the discussion on choice architecture, status quo bias, and behavioral nudges.',
    topic: 'Reading Passage 3 - Passage Title'
  }
];

// ============================================================================
// SECTION III: WRITING MODULE (2 Tasks | 60 Minutes)
// ============================================================================

export const IELTS_WRITING_TASKS: IeltsWritingTask[] = [
  {
    id: 'task1-academic',
    title: 'Academic Task 1: Renewable Energy Investment Bar Chart',
    type: 'Task 1 (Academic)',
    timeMinutes: 20,
    minWords: 150,
    prompt: `The bar chart below shows the annual investment (in $ Millions) in renewable energy sectors (Solar, Wind, Hydro) across three regions (Europe, Asia-Pacific, North America) in 2025.

Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.`,
    band9ModelAnswer: `The bar chart illustrates the volume of capital invested (measured in millions of US dollars) across three major renewable energy sectors—Solar, Wind, and Hydroelectric power—in Europe, the Asia-Pacific region, and North America during 2025.

Overall, it is immediately apparent that the Asia-Pacific region attracted the highest aggregate funding across the renewable landscape, with Solar emerging as the dominant recipient of investment across all three geographic territories. Conversely, Hydroelectric power recorded the lowest financial allocation globally.

Looking at Solar energy in detail, Asia-Pacific led substantially with an expenditure of approximately $180 million, followed by Europe at $140 million and North America at $110 million. In the Wind power domain, Europe demonstrated comparable prominence, securing $125 million, slightly ahead of Asia-Pacific at $115 million, whereas North America lagged with $85 million.

In contrast, Hydro power witnessed considerably lower investment totals. Asia-Pacific again committed the highest figure at $65 million, followed by North America ($45 million) and Europe ($40 million). In summary, Solar represented the cornerstone of renewable investment across all regions in 2025.`,
    keyAssessmentCriteria: [
      { title: 'Task Achievement', description: 'Accurate overview, clear identification of highest/lowest categories, precise data comparisons without personal opinion.' },
      { title: 'Coherence & Cohesion', description: 'Logical paragraph structure with clear topic sentences and smooth discourse markers (Overall, In contrast, Conversely).' },
      { title: 'Lexical Resource', description: 'Wide range of academic vocabulary (aggregate funding, prominent, allocation, expenditure, cornerstone).' },
      { title: 'Grammatical Range & Accuracy', description: 'Complex sentence structures with flawless passive and comparative forms.' }
    ]
  },
  {
    id: 'task1-gt',
    title: 'General Training Task 1: Formal Letter to Store Manager',
    type: 'Task 1 (General Training)',
    timeMinutes: 20,
    minWords: 150,
    prompt: `You recently bought a piece of electronic equipment from a store, but it stopped working after three days. Write a letter to the store manager. In your letter:
• Describe the item and when you bought it
• Explain the problem with the equipment
• State what action you expect the store to take

Write at least 150 words. Begin your letter with "Dear Sir or Madam,".`,
    band9ModelAnswer: `Dear Sir or Madam,

I am writing to express my dissatisfaction with an electronic appliance I recently purchased at your Central City branch, and to formally request an urgent resolution.

On August 8th, 2026, I bought an UltraSound Wireless Noise-Cancelling Headphone set (Model Ref: US-900X, Receipt No. 44812). Initially, the device functioned satisfactorily; however, after merely three days of moderate usage, the Bluetooth connectivity ceased completely. Furthermore, the unit fails to recharge despite using the official charging adapter provided in the packaging.

Given that this product is brand new and covered by your 1-year manufacturer warranty and 30-day exchange policy, I request a direct replacement with a new, tested unit. If an identical model is unavailable, I would like to receive a full refund to my original payment method.

I have enclosed a photocopy of the purchase receipt along with the warranty certificate. I look forward to your prompt response.

Yours faithfully,
Alex Morgan`,
    keyAssessmentCriteria: [
      { title: 'Task Achievement', description: 'Covers all three bullet points thoroughly with realistic detail, model numbers, and purchase dates.' },
      { title: 'Tone & Register', description: 'Consistently formal and polite tone suitable for correspondence with store management.' },
      { title: 'Lexical Resource', description: 'Precise consumer electronics and complaint vocabulary (moderate usage, ceases completely, replacement, refund).' },
      { title: 'Grammatical Range & Accuracy', description: 'Varied complex clauses, modal verbs, and condition structures.' }
    ]
  },
  {
    id: 'task2',
    title: 'Writing Task 2: AI vs Human Teachers in Modern Education',
    type: 'Task 2 (Formal Essay)',
    timeMinutes: 40,
    minWords: 250,
    prompt: `Some people believe that artificial intelligence will replace human teachers in classrooms within the next few decades, while others argue that human empathy and guidance can never be automated.

Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.`,
    band9ModelAnswer: `The rapid evolution of artificial intelligence has sparked intense debate over the future of education, with some predicting that intelligent algorithms will completely supplant educators, while others maintain that human empathy and mentorship are irreplaceable. In my view, while AI will serve as an indispensable pedagogical assistant, human educators will remain the irreplaceable core of the classroom.

Advocates of AI-driven education emphasize algorithmic efficiency, personalization, and accessibility. AI systems can dynamically adapt instructional pacing to individual student mastery, diagnosing knowledge gaps in real-time through adaptive learning platforms like Khan Academy or Duolingo. Moreover, AI can grade assignments instantaneously and provide multilingual instruction 24/7, democratizing access to high-quality education in underprivileged or remote regions where certified teachers are scarce.

On the other hand, the holistic development of students requires emotional intelligence, moral mentorship, and interpersonal encouragement—qualities that silicon algorithms cannot replicate. Human teachers inspire critical thinking, mediate social interactions, and identify nuanced emotional distress such as anxiety or low self-esteem. For instance, a struggling student often needs compassionate reassurance rather than another algorithmic drill. Furthermore, teachers instill values like ethics, civic responsibility, and resilience, which are cultivated through human connection rather than data processing.

In conclusion, while artificial intelligence will undoubtedly revolutionize curriculum delivery and administrative efficiency, it cannot replace the empathic and motivational guidance provided by human educators. The future of pedagogy lies not in the obsolescence of teachers, but in an augmented synergy where AI empowers educators to focus on inspiring human potential.`,
    keyAssessmentCriteria: [
      { title: 'Task Response', description: 'Thoroughly discusses both viewpoints, presents a clear and nuanced thesis throughout the entire essay.' },
      { title: 'Coherence & Cohesion', description: 'Seamless transitions, well-defined topic paragraphs, sophisticated linking phrases (On the other hand, In conclusion).' },
      { title: 'Lexical Resource', description: 'Rich academic vocabulary (pedagogical, supplant, democratizing, holistic, obsolescence, augmented synergy).' },
      { title: 'Grammatical Range & Accuracy', description: 'Flawless execution of complex sentence structures, conditional clauses, and sophisticated punctuation.' }
    ]
  }
];

// ============================================================================
// OFFICIAL BAND SCORE CONVERSION TABLES
// ============================================================================

export function calculateIeltsListeningBand(rawScore: number): number {
  if (rawScore >= 39) return 9.0;
  if (rawScore >= 37) return 8.5;
  if (rawScore >= 35) return 8.0;
  if (rawScore >= 32) return 7.5;
  if (rawScore >= 30) return 7.0;
  if (rawScore >= 26) return 6.5;
  if (rawScore >= 23) return 6.0;
  if (rawScore >= 18) return 5.5;
  if (rawScore >= 16) return 5.0;
  if (rawScore >= 13) return 4.5;
  if (rawScore >= 10) return 4.0;
  if (rawScore >= 6) return 3.5;
  return 3.0;
}

export function calculateIeltsReadingBand(rawScore: number): number {
  if (rawScore >= 39) return 9.0;
  if (rawScore >= 37) return 8.5;
  if (rawScore >= 35) return 8.0;
  if (rawScore >= 33) return 7.5;
  if (rawScore >= 30) return 7.0;
  if (rawScore >= 27) return 6.5;
  if (rawScore >= 23) return 6.0;
  if (rawScore >= 19) return 5.5;
  if (rawScore >= 15) return 5.0;
  if (rawScore >= 13) return 4.5;
  if (rawScore >= 10) return 4.0;
  if (rawScore >= 6) return 3.5;
  return 3.0;
}

export function calculateOverallBand(listeningBand: number, readingBand: number): number {
  const avg = (listeningBand + readingBand) / 2;
  const decimal = avg - Math.floor(avg);
  if (decimal < 0.25) return Math.floor(avg);
  if (decimal >= 0.25 && decimal < 0.75) return Math.floor(avg) + 0.5;
  return Math.floor(avg) + 1.0;
}

export interface UniversityEligibility {
  name: string;
  country: string;
  flag: string;
  minBand: number;
  featuredCourse: string;
  status: 'Eligible' | 'Competitive' | 'Reach';
}

export function getUniversityEligibility(overallBand: number): UniversityEligibility[] {
  const universities: { name: string; country: string; flag: string; minBand: number; featuredCourse: string }[] = [
    { name: 'University of Oxford', country: 'United Kingdom', flag: '🇬🇧', minBand: 7.5, featuredCourse: 'MSc Computer Science / MBA' },
    { name: 'University of Cambridge', country: 'United Kingdom', flag: '🇬🇧', minBand: 7.5, featuredCourse: 'MPhil Management / Engineering' },
    { name: 'Harvard University', country: 'United States', flag: '🇺🇸', minBand: 7.5, featuredCourse: 'Master in Public Policy / MBA' },
    { name: 'Massachusetts Institute of Technology (MIT)', country: 'United States', flag: '🇺🇸', minBand: 7.0, featuredCourse: 'MS Analytics / EECS' },
    { name: 'Stanford University', country: 'United States', flag: '🇺🇸', minBand: 7.0, featuredCourse: 'MS Computer Science / MBA' },
    { name: 'Imperial College London', country: 'United Kingdom', flag: '🇬🇧', minBand: 7.0, featuredCourse: 'MSc Artificial Intelligence' },
    { name: 'University of Toronto', country: 'Canada', flag: '🇨🇦', minBand: 6.5, featuredCourse: 'Rotman Full-Time MBA / MEng' },
    { name: 'University of Melbourne', country: 'Australia', flag: '🇦🇺', minBand: 6.5, featuredCourse: 'Master of Management / Data Science' },
    { name: 'National University of Singapore (NUS)', country: 'Singapore', flag: '🇸🇬', minBand: 6.5, featuredCourse: 'MSc Business Analytics' },
    { name: 'University of British Columbia (UBC)', country: 'Canada', flag: '🇨🇦', minBand: 6.5, featuredCourse: 'Sauder MBA / Master of Data Science' },
    { name: 'University of Sydney', country: 'Australia', flag: '🇦🇺', minBand: 6.5, featuredCourse: 'Master of International Business' },
    { name: 'Technical University of Munich (TUM)', country: 'Germany', flag: '🇩🇪', minBand: 6.5, featuredCourse: 'MSc Informatics (English Taught)' }
  ];

  return universities.map(u => {
    let status: 'Eligible' | 'Competitive' | 'Reach' = 'Reach';
    if (overallBand >= u.minBand + 0.5) status = 'Eligible';
    else if (overallBand >= u.minBand) status = 'Competitive';
    return { ...u, status };
  });
}
