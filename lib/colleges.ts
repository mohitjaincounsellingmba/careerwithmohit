import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MBA_PGDM_COLLEGES_2027 } from '@/data/mbaPgdmColleges2027';

const collegesDirectory = path.join(process.cwd(), 'colleges');

export interface CollegeMetadata {
  slug: string;
  name: string;
  logo: string;
  location: string;
  category: "Management" | "Engineering" | "UG Courses";
  type: "College" | "University" | "Institute";
  courses: string[];
  established: number;
  ownership: string;
  ranking: string;
  fees: string;
  avg_placement: string;
  highest_placement: string;
  lowest_placement: string;
  exams: string[];
  brochure_url: string;
  website: string;
  top_recruiters?: string[];
}

export interface College extends CollegeMetadata {
  content: string;
}

let collegesCache: CollegeMetadata[] | null = null;

export function getAllColleges(): CollegeMetadata[] {
  if (process.env.NODE_ENV === 'production' && collegesCache) {
    return collegesCache;
  }

  const markdownColleges: CollegeMetadata[] = [];
  if (fs.existsSync(collegesDirectory)) {
    const fileNames = fs.readdirSync(collegesDirectory);
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .forEach((fileName) => {
        try {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(collegesDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const matterResult = matter(fileContents);

          markdownColleges.push({
            slug,
            ...(matterResult.data as Omit<CollegeMetadata, 'slug'>),
          });
        } catch {
          // ignore corrupted markdown
        }
      });
  }

  const existingSlugs = new Set(markdownColleges.map((c) => c.slug));
  const fallbackColleges: CollegeMetadata[] = [];

  MBA_PGDM_COLLEGES_2027.forEach((item) => {
    const slug = item.slug || item.universitySlug;
    if (slug && !existingSlugs.has(slug)) {
      fallbackColleges.push({
        slug,
        name: item.name,
        logo: '/logo.png',
        location: item.location,
        category: 'Management',
        type: 'Institute',
        courses: item.programs || ['PGDM', 'MBA'],
        established: 1998,
        ownership: 'Private Autonomous',
        ranking: item.accreditation || 'AICTE Approved',
        fees: item.fee,
        avg_placement: item.avgPlacement || '₹8.50 LPA',
        highest_placement: item.highestPlacement || '₹22.00 LPA',
        lowest_placement: '₹5.50 LPA',
        exams: ['CAT', 'MAT', 'CMAT', 'XAT'],
        brochure_url: '#',
        website: 'https://www.careerwithmohit.online',
        top_recruiters: item.topRecruiters || ['Deloitte', 'KPMG', 'ICICI Bank', 'Amazon'],
      });
    }
  });

  const merged = [...markdownColleges, ...fallbackColleges];
  const sorted = merged.sort((a, b) => (a.name > b.name ? 1 : -1));
  collegesCache = sorted;
  return sorted;
}

export async function getCollegeBySlug(slug: string): Promise<College | null> {
  try {
    const fullPath = path.join(collegesDirectory, `${slug}.md`);
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        slug,
        content: matterResult.content,
        ...(matterResult.data as Omit<CollegeMetadata, 'slug'>),
      };
    }

    // Check in MBA_PGDM_COLLEGES_2027 dataset
    const item = MBA_PGDM_COLLEGES_2027.find(
      (c) => (c.slug || c.universitySlug) === slug
    );

    if (item) {
      const content = `## About ${item.name}

${item.about}

### Key Program Highlights
${(item.highlights || []).map((h) => `- ${h}`).join('\n')}

### Admissions & Eligibility
- **Approved By**: ${item.approvals || 'AICTE, AIU'}
- **Accreditation**: ${item.accreditation}
- **Program Duration**: ${item.duration || '2 Years (Full-Time)'}
- **Learning Mode**: ${item.mode || 'Classroom & Corporate Immersion'}
- **Average Placement**: ${item.avgPlacement || '₹8.50 LPA'}
- **Highest Placement**: ${item.highestPlacement || '₹22.00 LPA'}

For 1-on-1 admission counselling, merit scholarships, and direct seat booking guidance, reach out to career counsellor Mohit Jain.
`;

      return {
        slug,
        name: item.name,
        logo: '/logo.png',
        location: item.location,
        category: 'Management',
        type: 'Institute',
        courses: item.programs || ['PGDM', 'MBA'],
        established: 1998,
        ownership: 'Private Autonomous',
        ranking: item.accreditation || 'AICTE Approved',
        fees: item.fee,
        avg_placement: item.avgPlacement || '₹8.50 LPA',
        highest_placement: item.highestPlacement || '₹22.00 LPA',
        lowest_placement: '₹5.50 LPA',
        exams: ['CAT', 'MAT', 'CMAT', 'XAT'],
        brochure_url: '#',
        website: 'https://www.careerwithmohit.online',
        top_recruiters: item.topRecruiters || ['Deloitte', 'KPMG', 'ICICI Bank', 'Amazon'],
        content,
      };
    }

    return null;
  } catch (error) {
    return null;
  }
}
