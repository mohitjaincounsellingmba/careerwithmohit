import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
  lowest_placement: string; // Added field
  exams: string[];
  brochure_url: string;
  website: string;
  top_recruiters?: string[]; // Added optional field
}

export interface College extends CollegeMetadata {
  content: string;
}

export function getAllColleges(): CollegeMetadata[] {
  if (!fs.existsSync(collegesDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(collegesDirectory);
  const allCollegesData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(collegesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        slug,
        ...(matterResult.data as Omit<CollegeMetadata, 'slug'>),
      };
    });

  return allCollegesData.sort((a, b) => (a.name > b.name ? 1 : -1));
}

export async function getCollegeBySlug(slug: string): Promise<College | null> {
  try {
    const fullPath = path.join(collegesDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      content: matterResult.content,
      ...(matterResult.data as Omit<CollegeMetadata, 'slug'>),
    };
  } catch (error) {
    return null;
  }
}
