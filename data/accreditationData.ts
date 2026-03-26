export interface AIUCollege {
  name: string;
  state: string;
  city: string;
  validTill: string;
}

export const aiuApprovedPGDM: AIUCollege[] = [
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
  { name: "IPE (Institute of Public Enterprise)", state: "Telangana", city: "Hyderabad", validTill: "2025" },
  { name: "JIMS Rohini", state: "Delhi", city: "New Delhi", validTill: "2025" },
  { name: "JIMS Kalkaji", state: "Delhi", city: "New Delhi", validTill: "2025" },
  { name: "IFMR Graduate School of Business", state: "Andhra Pradesh", city: "Sri City", validTill: "2025" },
  { name: "XIME Bangalore", state: "Karnataka", city: "Bangalore", validTill: "2025" },
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
