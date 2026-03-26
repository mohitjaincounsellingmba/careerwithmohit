export interface CollegeRecord {
  name: string;
  state: string;
  city: string;
  validTill?: string;
  category?: string; // e.g., "Engineering", "Law", "Grade A++"
}

export const aiuApprovedPGDM: CollegeRecord[] = [
  { name: "Apeejay School of Management", state: "Delhi", city: "New Delhi", validTill: "2025" },
  { name: "Asia Pacific Institute of Management", state: "Delhi", city: "New Delhi", validTill: "2025" },
  { name: "Asian Business School", state: "Uttar Pradesh", city: "Noida", validTill: "2024 (Under Renewal)" },
  { name: "BIMTECH (Birla Institute of Management Technology)", state: "Uttar Pradesh", city: "Greater Noida", validTill: "2024 (Under Renewal)" },
  { name: "Delhi School of Business", state: "Delhi", city: "New Delhi", validTill: "2025" },
  { name: "FORE School of Management", state: "Delhi", city: "New Delhi", validTill: "2026" },
  { name: "FIIB (Fortune Institute of International Business)", state: "Delhi", city: "New Delhi", validTill: "2025" },
  { name: "Great Lakes Institute of Management", state: "Haryana", city: "Gurgaon", validTill: "2025" },
  { name: "IMT (Institute of Management Technology)", state: "Uttar Pradesh", city: "Ghaziabad", validTill: "2025" },
  { name: "IMS (Institute of Management Studies)", state: "Uttar Pradesh", city: "Ghaziabad", validTill: "2025" },
  { name: "ITS School of Management", state: "Uttar Pradesh", city: "Ghaziabad", validTill: "2025" },
  { name: "Jaipuria School of Business", state: "Uttar Pradesh", city: "Ghaziabad", validTill: "2025" },
  { name: "LBSIM (Lal Bahadur Shastri Institute of Management)", state: "Delhi", city: "New Delhi", validTill: "2025" },
  { name: "NDIM (New Delhi Institute of Management)", state: "Delhi", city: "New Delhi", validTill: "2026" },
  { name: "Goa Institute of Management (GIM)", state: "Goa", city: "Sanquelim", validTill: "2029" },
  { name: "TAPMI (T.A. Pai Management Institute)", state: "Karnataka", city: "Manipal", validTill: "2025" },
  { name: "SDMIMD", state: "Karnataka", city: "Mysore", validTill: "2025" },
  { name: "K.J. Somaiya Institute of Management", state: "Maharashtra", city: "Mumbai", validTill: "2025" },
  { name: "Prin. L.N. Welingkar Institute of Management Development & Research", state: "Maharashtra", city: "Mumbai", validTill: "2025" },
  { name: "S. P. Jain Institute of Management & Research", state: "Maharashtra", city: "Mumbai", validTill: "2025" },
  { name: "JIMS Rohini", state: "Delhi", city: "New Delhi", validTill: "2025" },
];

export const aicteApproved: CollegeRecord[] = [
  { name: "IIT Delhi", state: "Delhi", city: "New Delhi", category: "Engineering" },
  { name: "IIT Bombay", state: "Maharashtra", city: "Mumbai", category: "Engineering" },
  { name: "NIT Trichy", state: "Tamil Nadu", city: "Tiruchirappalli", category: "Engineering" },
  { name: "COEP Technological University", state: "Maharashtra", city: "Pune", category: "Engineering" },
  { name: "VIT Vellore", state: "Tamil Nadu", city: "Vellore", category: "Engineering" },
  { name: "BITS Pilani", state: "Rajasthan", city: "Pilani", category: "Engineering" },
  { name: "SRM Institute of Science and Technology", state: "Tamil Nadu", city: "Chennai", category: "Engineering" },
  { name: "Thapar Institute of Engineering & Technology", state: "Punjab", city: "Patiala", category: "Engineering" },
  { name: "Manipal Institute of Technology", state: "Karnataka", city: "Manipal", category: "Engineering" },
  { name: "Delhi Technological University (DTU)", state: "Delhi", city: "New Delhi", category: "Engineering" },
  { name: "Netaji Subhas University of Technology (NSUT)", state: "Delhi", city: "New Delhi", category: "Engineering" },
];

export const nbaAccredited: CollegeRecord[] = [
  { name: "VJTI Mumbai", state: "Maharashtra", city: "Mumbai", category: "B.Tech ME/EE/CS" },
  { name: "PSG College of Technology", state: "Tamil Nadu", city: "Coimbatore", category: "B.Tech Mechanical" },
  { name: "RV College of Engineering", state: "Karnataka", city: "Bangalore", category: "B.Tech CS/ISE" },
  { name: "BMS College of Engineering", state: "Karnataka", city: "Bangalore", category: "B.Tech Civil" },
  { name: "College of Engineering Guindy", state: "Tamil Nadu", city: "Chennai", category: "B.Tech IT" },
  { name: "Harcourt Butler Technical University", state: "Uttar Pradesh", city: "Kanpur", category: "B.Tech Chemical" },
  { name: "Walchand College of Engineering", state: "Maharashtra", city: "Sangli", category: "B.Tech Electrical" },
];

export const naacAplusPlus: CollegeRecord[] = [
  { name: "Jawaharlal Nehru University (JNU)", state: "Delhi", city: "New Delhi", category: "A++ Grade" },
  { name: "Indian Institute of Science (IISc)", state: "Karnataka", city: "Bangalore", category: "A++ Grade" },
  { name: "Banaras Hindu University (BHU)", state: "Uttar Pradesh", city: "Varanasi", category: "A++ Grade" },
  { name: "Amity University", state: "Uttar Pradesh", city: "Noida", category: "A++ Grade" },
  { name: "Christ University", state: "Karnataka", city: "Bangalore", category: "A++ Grade" },
  { name: "University of Mumbai", state: "Maharashtra", city: "Mumbai", category: "A++ Grade" },
  { name: "SRM Institute of Science and Technology", state: "Tamil Nadu", city: "Chennai", category: "A++ Grade" },
  { name: "Chandigarh University", state: "Punjab", city: "Mohali", category: "A++ Grade" },
  { name: "Lovely Professional University (LPU)", state: "Punjab", city: "Phagwara", category: "A++ Grade" },
  { name: "Savitribai Phule Pune University", state: "Maharashtra", city: "Pune", category: "A++ Grade" },
];

export const ugcRecognized: CollegeRecord[] = [
  { name: "University of Delhi", state: "Delhi", city: "New Delhi", category: "Central University" },
  { name: "Jawaharlal Nehru University", state: "Delhi", city: "New Delhi", category: "Central University" },
  { name: "Jamia Millia Islamia", state: "Delhi", city: "New Delhi", category: "Central University" },
  { name: "Aligarh Muslim University", state: "Uttar Pradesh", city: "Aligarh", category: "Central University" },
  { name: "Anna University", state: "Tamil Nadu", city: "Chennai", category: "State University" },
  { name: "Calcutta University", state: "West Bengal", city: "Kolkata", category: "State University" },
  { name: "Jadavpur University", state: "West Bengal", city: "Kolkata", category: "State University" },
  { name: "Osmania University", state: "Telangana", city: "Hyderabad", category: "State University" },
];

export const bciApproved: CollegeRecord[] = [
  { name: "National Law School of India University (NLSIU)", state: "Karnataka", city: "Bangalore", category: "Law" },
  { name: "National Law University (NLU)", state: "Delhi", city: "New Delhi", category: "Law" },
  { name: "NALSAR University of Law", state: "Telangana", city: "Hyderabad", category: "Law" },
  { name: "West Bengal National University of Juridical Sciences", state: "West Bengal", city: "Kolkata", category: "Law" },
  { name: "Symbiosis Law School (SLS)", state: "Maharashtra", city: "Pune", category: "Law" },
  { name: "ILS Law College", state: "Maharashtra", city: "Pune", category: "Law" },
  { name: "Government Law College (GLC)", state: "Maharashtra", city: "Mumbai", category: "Law" },
  { name: "Faculty of Law, University of Delhi", state: "Delhi", city: "New Delhi", category: "Law" },
];

export const coaApproved: CollegeRecord[] = [
  { name: "School of Planning and Architecture (SPA)", state: "Delhi", city: "New Delhi", category: "Architecture" },
  { name: "Sir J.J. College of Architecture", state: "Maharashtra", city: "Mumbai", category: "Architecture" },
  { name: "CEPT University", state: "Gujarat", city: "Ahmedabad", category: "Architecture" },
  { name: "IIT Kharagpur (Dept of Architecture)", state: "West Bengal", city: "Kharagpur", category: "Architecture" },
  { name: "IIT Roorkee (Dept of Architecture)", state: "Uttarakhand", city: "Roorkee", category: "Architecture" },
  { name: "Chandigarh College of Architecture", state: "Chandigarh", city: "Chandigarh", category: "Architecture" },
  { name: "NIT Calicut (Dept of Architecture)", state: "Kerala", city: "Calicut", category: "Architecture" },
];

export const pciApproved: CollegeRecord[] = [
  { name: "Jamia Hamdard (Faculty of Pharmacy)", state: "Delhi", city: "New Delhi", category: "Pharmacy" },
  { name: "NIPER S.A.S. Nagar", state: "Punjab", city: "Mohali", category: "Pharmacy" },
  { name: "NIPER Hyderabad", state: "Telangana", city: "Hyderabad", category: "Pharmacy" },
  { name: "Birla Institute of Technology & Science (BITS) Pilani", state: "Rajasthan", city: "Pilani", category: "Pharmacy" },
  { name: "Manipal College of Pharmaceutical Sciences", state: "Karnataka", city: "Manipal", category: "Pharmacy" },
  { name: "JSS College of Pharmacy", state: "Tamil Nadu", city: "Ooty", category: "Pharmacy" },
  { name: "Institute of Chemical Technology (ICT)", state: "Maharashtra", city: "Mumbai", category: "Pharmacy" },
];

export const courseAccreditations: Record<string, string[]> = {
  "MBA/PGDM": ["AICTE", "UGC", "AIU", "NAAC", "NBA"],
  "B.Tech": ["AICTE", "UGC", "NBA", "NAAC"],
  "BBA": ["UGC", "NAAC"],
  "BCA": ["UGC", "NAAC"],
  "Law": ["BCI", "UGC", "NAAC"],
  "Architecture": ["COA", "UGC"],
  "Pharmacy": ["PCI", "UGC"],
};

export const accreditationInfo: Record<string, string> = {
  AICTE: "All India Council for Technical Education. Primary regulator for technical and management education in India.",
  UGC: "University Grants Commission. Responsible for maintaining standards in university education and providing recognition to universities.",
  AIU: "Association of Indian Universities. Grants equivalence to foreign degrees and PGDM programs (equating them to MBA).",
  NAAC: "National Assessment and Accreditation Council. Assesses and accredits Higher Education Institutions (HEIs) like colleges and universities.",
  NBA: "National Board of Accreditation. Accredits specific programs (like B.Tech Mechanical, PGDM Finance) rather than the whole institution.",
  BCI: "Bar Council of India. Regulatory body for legal education and profession in India.",
  COA: "Council of Architecture. Regulates the education and practice of architecture in India.",
  PCI: "Pharmacy Council of India. Regulates pharmacy education and profession in India.",
};

export const databaseMapping: Record<string, CollegeRecord[]> = {
  AIU: aiuApprovedPGDM,
  AICTE: aicteApproved,
  NBA: nbaAccredited,
  NAAC: naacAplusPlus,
  UGC: ugcRecognized,
  BCI: bciApproved,
  COA: coaApproved,
  PCI: pciApproved,
};
