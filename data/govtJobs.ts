export interface GovtJob {
  id: string;
  title: string;
  link: string;
  date: string;
  category: 'Latest Job' | 'Admit Card' | 'Result';
}

export const GOVT_JOBS_DATA: GovtJob[] = [
  // Latest Jobs
  { id: 'lj1', title: 'SSC CGL 2026 Online Form', link: 'https://ssc.gov.in/', date: 'April 24, 2026', category: 'Latest Job' },
  { id: 'lj2', title: 'UPSC Civil Services (IAS) 2026 Exam', link: 'https://upsconline.nic.in/', date: 'April 23, 2026', category: 'Latest Job' },
  { id: 'lj3', title: 'Railway RRB ALP Recruitment 2026', link: 'https://rrbapply.gov.in/', date: 'April 22, 2026', category: 'Latest Job' },
  { id: 'lj4', title: 'SBI PO 2026 Online Application', link: 'https://sbi.co.in/web/careers', date: 'April 20, 2026', category: 'Latest Job' },
  { id: 'lj5', title: 'IBPS Clerk XIV Online Form', link: 'https://www.ibps.in/', date: 'April 18, 2026', category: 'Latest Job' },
  { id: 'lj6', title: 'UPSSSC PET 2026 Registration', link: 'https://upsssc.gov.in/', date: 'April 15, 2026', category: 'Latest Job' },
  { id: 'lj7', title: 'Delhi Police Constable Recruitment', link: 'https://delhipolice.gov.in/', date: 'April 12, 2026', category: 'Latest Job' },
  { id: 'lj8', title: 'Indian Army Agniveer 2026', link: 'https://joinindianarmy.nic.in/', date: 'April 10, 2026', category: 'Latest Job' },

  // Admit Cards
  { id: 'ac1', title: 'SSC CHSL 2026 Tier I Admit Card', link: 'https://ssc.gov.in/', date: 'April 24, 2026', category: 'Admit Card' },
  { id: 'ac2', title: 'NTA JEE Main Session 2 Hall Ticket', link: 'https://jeemain.nta.ac.in/', date: 'April 22, 2026', category: 'Admit Card' },
  { id: 'ac3', title: 'UPSC NDA I 2026 Admit Card', link: 'https://upsconline.nic.in/', date: 'April 20, 2026', category: 'Admit Card' },
  { id: 'ac4', title: 'RBI Assistant Prelims Admit Card', link: 'https://www.rbi.org.in/', date: 'April 18, 2026', category: 'Admit Card' },
  { id: 'ac5', title: 'CUET UG 2026 City Intimation Slip', link: 'https://exams.nta.ac.in/CUET-UG/', date: 'April 15, 2026', category: 'Admit Card' },
  { id: 'ac6', title: 'AFCAT 02/2026 Admit Card', link: 'https://afcat.cdac.in/', date: 'April 12, 2026', category: 'Admit Card' },

  // Results
  { id: 'r1', title: 'UP Board Class 10th & 12th Result 2026', link: '/blog/up-board-10th-12th-result-2026-declared', date: 'April 23, 2026', category: 'Result' },
  { id: 'r2', title: 'SSC GD Constable Final Result 2025', link: 'https://ssc.gov.in/', date: 'April 21, 2026', category: 'Result' },
  { id: 'r3', title: 'IBPS PO Main Exam Result 2026', link: 'https://www.ibps.in/', date: 'April 19, 2026', category: 'Result' },
  { id: 'r4', title: 'BSEB Bihar Board 10th Result 2026', link: 'http://results.biharboardonline.com/', date: 'April 17, 2026', category: 'Result' },
  { id: 'r5', title: 'JEE Main Session 2 Result Out', link: '/blog/jee-main-2026-session-2-result-declared-check-here', date: 'April 15, 2026', category: 'Result' },
  { id: 'r6', title: 'GATE 2026 Scorecard Download', link: 'https://gate2026.iitkgp.ac.in/', date: 'April 12, 2026', category: 'Result' },
];
