import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const COLLEGES_DIR = path.join(process.cwd(), 'colleges');
const POSTS_DIR = path.join(process.cwd(), 'posts');

function optimizeColleges() {
  console.log('📌 Scanning and enriching College markdown files for SEO...');
  if (!fs.existsSync(COLLEGES_DIR)) {
    console.log('No colleges directory found, skipping.');
    return;
  }

  const files = fs.readdirSync(COLLEGES_DIR).filter(f => f.endsWith('.md'));
  let updatedCount = 0;

  files.forEach(file => {
    const filePath = path.join(COLLEGES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);
    const data = parsed.data;

    let needsUpdate = false;

    if (!data.name || !data.location) {
      return;
    }

    // 1. Generate SERP-friendly title (< 60 chars) if not present
    if (!data.seo_title) {
      if (data.category === 'Management') {
        data.seo_title = `${data.name} MBA Fees, Cutoff & Placement 2027`.slice(0, 60);
      } else if (data.category === 'Engineering') {
        data.seo_title = `${data.name} B.Tech Fees, Cutoff & Placement 2027`.slice(0, 60);
      } else {
        data.seo_title = `${data.name} Fees, Placement & Admission 2027`.slice(0, 60);
      }
      needsUpdate = true;
    }

    // 2. Generate compelling meta description (140-160 chars) if not present
    if (!data.seo_description) {
      const feeText = data.fees ? `fee structure ${data.fees}` : 'fees';
      const placementText = data.avg_placement ? `average placement ${data.avg_placement}` : 'placement details';
      if (data.category === 'Management') {
        data.seo_description = `Explore ${data.name} ${data.location}: MBA/PGDM ${feeText}, ${placementText}, highest CTC, ranking, and 2027 admission process with Mohit Jain.`.slice(0, 160);
      } else if (data.category === 'Engineering') {
        data.seo_description = `Check ${data.name} ${data.location}: B.Tech ${feeText}, ${placementText}, JEE cutoff, ranking, and 2027 engineering admissions.`.slice(0, 160);
      } else {
        data.seo_description = `Detailed guide for ${data.name} in ${data.location}: courses, ${feeText}, ${placementText}, ranking, and 2027 admission process.`.slice(0, 160);
      }
      needsUpdate = true;
    }

    // 3. Ensure comprehensive SEO keywords array
    if (!Array.isArray(data.keywords) || data.keywords.length < 5) {
      const baseKeywords = [
        `${data.name} review`,
        `${data.name} fees structure 2027`,
        `${data.name} average package`,
        `${data.name} placement report 2027`,
        `${data.name} highest package`,
        `${data.name} cutoff 2027`,
        `${data.name} admission process`,
        `${data.name} ranking`,
        `${data.name} ${data.location}`,
        `is ${data.name} good`,
        `${data.name} mohit jain review`,
        `${data.name} hostel fees`,
        `${data.name} contact number`,
      ];
      if (data.category === 'Management') {
        baseKeywords.push(
          `${data.name} MBA fees`,
          `${data.name} PGDM placement`,
          `${data.name} MBA admission 2027`,
          `MBA colleges ${data.location}`
        );
      } else if (data.category === 'Engineering') {
        baseKeywords.push(
          `${data.name} B.Tech fees`,
          `${data.name} CSE placement`,
          `${data.name} B.Tech admission 2027`,
          `engineering colleges ${data.location}`
        );
      }
      data.keywords = baseKeywords;
      needsUpdate = true;
    }

    if (needsUpdate) {
      const newContent = matter.stringify(parsed.content, data);
      fs.writeFileSync(filePath, newContent, 'utf8');
      updatedCount++;
    }
  });

  console.log(`✅ College SEO Audit Completed: Scanned ${files.length} colleges, updated ${updatedCount} files.`);
}

function verifyBlogPosts() {
  console.log('\n📌 Verifying Blog Post SEO frontmatter...');
  if (!fs.existsSync(POSTS_DIR)) {
    console.log('No posts directory found, skipping.');
    return;
  }

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  let validCount = 0;
  let fixedCount = 0;

  files.forEach(file => {
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);
    const data = parsed.data;

    let needsUpdate = false;

    if (!data.title) {
      data.title = file.replace('.md', '').replace(/-/g, ' ');
      needsUpdate = true;
    }

    if (!data.description || data.description.trim() === '') {
      data.description = `Read our comprehensive guide on ${data.title} - complete analysis, admission process, fees, placements, and expert tips for 2027.`.slice(0, 160);
      needsUpdate = true;
    }

    if (!Array.isArray(data.keywords) || data.keywords.length === 0) {
      data.keywords = [
        data.title,
        'career counselling',
        'MBA admission 2027',
        'college review',
        'Mohit Jain career counselling',
        'Delhi NCR admissions'
      ];
      needsUpdate = true;
    }

    if (needsUpdate) {
      const newContent = matter.stringify(parsed.content, data);
      fs.writeFileSync(filePath, newContent, 'utf8');
      fixedCount++;
    } else {
      validCount++;
    }
  });

  console.log(`✅ Blog SEO Verification Completed: ${validCount} posts valid, ${fixedCount} posts enriched.`);
}

console.log('🚀 Starting Site-Wide Metadata SEO Optimization...\n');
optimizeColleges();
verifyBlogPosts();
console.log('\n✨ Site-Wide Metadata SEO Optimization Completed Successfully!');
