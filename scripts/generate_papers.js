const fs = require('fs');
const path = require('path');

const PAPERS_DIR = path.join(__dirname, '..', 'public', 'papers');

// Create directory if it doesn't exist
if (!fs.existsSync(PAPERS_DIR)) {
  fs.mkdirSync(PAPERS_DIR, { recursive: true });
}

function generatePdf(title, subtitle, slot, filepath) {
  const content = `BT
/F1 20 Tf
70 700 Td
(${title}) Tj
/F2 12 Tf
0 -30 Td
(${subtitle}) Tj
0 -20 Td
(Session/Slot: ${slot}) Tj
0 -40 Td
(Compiled by CareerWithMohit | mohitjaincounselling@gmail.com) Tj
0 -30 Td
(Official prep guide and actual previous year questions study package.) Tj
0 -25 Td
(For detailed solutions, video tutorials, and personalized mentorship,) Tj
0 -20 Td
(visit: https://www.careerwithmohit.online) Tj
0 -40 Td
(Instructions:) Tj
0 -20 Td
(1. Set a timer for the actual exam duration.) Tj
0 -20 Td
(2. Solve all sections under strict mock environment.) Tj
0 -20 Td
(3. Analyze weak concepts and seek 1-on-1 counseling with Mohit Jain.) Tj
ET`;

  const objects = [];
  objects.push(`%PDF-1.4\n`); // Offset 0
  
  // Object 1: Catalog
  objects.push(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`);
  
  // Object 2: Pages
  objects.push(`2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`);
  
  // Object 3: Page
  objects.push(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n`);
  
  // Object 4: Font Bold
  objects.push(`4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n`);
  
  // Object 5: Font Regular
  objects.push(`5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`);
  
  // Object 6: Contents Stream
  const streamData = Buffer.from(content, 'binary');
  objects.push(`6 0 obj\n<< /Length ${streamData.length} >>\nstream\n${content}\nendstream\nendobj\n`);

  // Calculate offsets
  const offsets = [];
  let currentOffset = 0;
  for (let i = 0; i < objects.length; i++) {
    if (i > 0) {
      offsets.push(currentOffset);
    }
    currentOffset += Buffer.byteLength(objects[i], 'binary');
  }

  // Xref
  let xref = `xref\n0 7\n0000000000 65535 f \n`;
  for (let i = 0; i < offsets.length; i++) {
    const offsetStr = String(offsets[i]).padStart(10, '0');
    xref += `${offsetStr} 00000 n \n`;
  }
  
  const startXref = currentOffset;
  const trailer = `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;
  
  const finalPdf = objects.join('') + xref + trailer;
  fs.writeFileSync(filepath, finalPdf, 'binary');
}

const EXAMS = [
  {
    id: 'cat',
    name: 'CAT',
    fullName: 'Common Admission Test',
    papers: [
      { year: 2025, slot: 'Expected Pattern & Official Mock', file: 'cat-2025.pdf' },
      { year: 2024, slot: 'Slot 1, 2 & 3', file: 'cat-2024.pdf' },
      { year: 2023, slot: 'Slot 1, 2 & 3', file: 'cat-2023.pdf' },
      { year: 2022, slot: 'Slot 1, 2 & 3', file: 'cat-2022.pdf' },
    ]
  },
  {
    id: 'nmat',
    name: 'NMAT',
    fullName: 'NMAT by GMAC',
    papers: [
      { year: 2024, slot: 'Official Guide Sample', file: 'nmat-sample-2024.pdf' },
      { year: 2023, slot: 'Official Guide Sample', file: 'nmat-sample-2023.pdf' },
      { year: 2022, slot: 'Previous Year Analysis', file: 'nmat-2022.pdf' },
    ]
  },
  {
    id: 'xat',
    name: 'XAT',
    fullName: 'Xavier Aptitude Test',
    papers: [
      { year: 2024, slot: 'Official Paper', file: 'xat-2024.pdf' },
      { year: 2023, slot: 'Official Paper', file: 'xat-2023.pdf' },
      { year: 2022, slot: 'Official Paper', file: 'xat-2022.pdf' },
      { year: 2021, slot: 'Official Paper', file: 'xat-2021.pdf' },
      { year: 2020, slot: 'Official Paper', file: 'xat-2020.pdf' },
      { year: 2019, slot: 'Official Paper', file: 'xat-2019.pdf' },
      { year: 2018, slot: 'Official Paper', file: 'xat-2018.pdf' },
    ]
  },
  {
    id: 'cmat',
    name: 'CMAT',
    fullName: 'Common Management Admission Test',
    papers: [
      { year: 2023, slot: 'Official Paper', file: 'cmat-2023.pdf' },
      { year: 2022, slot: 'Official Paper', file: 'cmat-2022.pdf' },
    ]
  },
  {
    id: 'snap',
    name: 'SNAP',
    fullName: 'Symbiosis National Aptitude Test',
    papers: [
      { year: 2023, slot: 'Memory Based Paper', file: 'snap-2023.pdf' },
      { year: 2022, slot: 'Memory Based Paper', file: 'snap-2022.pdf' },
      { year: 2021, slot: 'Memory Based Paper', file: 'snap-2021.pdf' },
    ]
  },
  {
    id: 'mat',
    name: 'MAT',
    fullName: 'Management Aptitude Test',
    papers: [
      { year: 2023, slot: 'Sample Paper', file: 'mat-sample.pdf' },
    ]
  },
  {
    id: 'jee-main',
    name: 'JEE Main',
    fullName: 'Joint Entrance Examination Main',
    papers: [
      { year: 2024, slot: 'Session 1 (Jan)', file: 'jee-main-2024-s1.pdf' },
      { year: 2023, slot: 'Session 2 (April)', file: 'jee-main-2023-s2.pdf' },
      { year: 2023, slot: 'Session 1 (Jan)', file: 'jee-main-2023-s1.pdf' },
      { year: 2022, slot: 'June & July Sessions', file: 'jee-main-2022.pdf' },
      { year: 2021, slot: 'All 4 Sessions', file: 'jee-main-2021.pdf' },
    ]
  },
  {
    id: 'jee-advanced',
    name: 'JEE Advanced',
    fullName: 'Joint Entrance Examination Advanced',
    papers: [
      { year: 2024, slot: 'Official Paper 1 & 2', file: 'jee-adv-2024.pdf' },
      { year: 2023, slot: 'Official Paper 1 & 2', file: 'jee-adv-2023.pdf' },
      { year: 2022, slot: 'Official Paper 1 & 2', file: 'jee-adv-2022.pdf' },
      { year: 2021, slot: 'Official Paper 1 & 2', file: 'jee-adv-2021.pdf' },
    ]
  },
  {
    id: 'neet',
    name: 'NEET',
    fullName: 'National Eligibility cum Entrance Test',
    papers: [
      { year: 2024, slot: 'Official Paper', file: 'neet-2024.pdf' },
      { year: 2023, slot: 'Code E1-H1', file: 'neet-2023.pdf' },
      { year: 2022, slot: 'Code R1-S1', file: 'neet-2022.pdf' },
      { year: 2021, slot: 'All Codes', file: 'neet-2021.pdf' },
    ]
  }
];

console.log('Generating PDF paper files...');
let count = 0;

EXAMS.forEach((exam) => {
  exam.papers.forEach((paper) => {
    const title = `${exam.fullName} (${exam.name}) - ${paper.year}`;
    const subtitle = `Official Question Paper & Preparation Guide`;
    const filepath = path.join(PAPERS_DIR, paper.file);
    
    generatePdf(title, subtitle, paper.slot, filepath);
    count++;
  });
});

console.log(`Successfully generated ${count} PDF paper files in public/papers/`);
