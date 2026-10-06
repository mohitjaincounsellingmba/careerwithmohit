import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'posts');
const DATA_DIR = path.join(process.cwd(), 'data');
const OUTPUT_REPORT = path.join(DATA_DIR, 'deduplication-audit.json');
const OUTPUT_REDIRECTS = path.join(DATA_DIR, 'generated-redirects.json');
const OUTPUT_ENTITY_REPORT = path.join(DATA_DIR, 'same-entity-cannibalization.json');

// Stop words and generic terms
const GENERIC_MBA_TERMS = new Set([
  'mba', 'pgdm', 'admission', 'admissions', 'review', 'reviews', 'fees', 'fee',
  'placements', 'placement', 'cutoff', 'cutoffs', 'roi', 'analysis', 'guide',
  'process', 'direct', 'quota', '2026', '2027', '2028', '2029', 'top', 'best',
  'college', 'colleges', 'institute', 'institutes', 'university', 'universities',
  'in', 'for', 'and', 'the', 'of', 'to', 'how', 'what', 'delhi', 'ncr', 'pune',
  'bangalore', 'mumbai', 'jaipur', 'dehradun'
]);

function extractEntityKey(slug, title) {
  // Extract core entity from slug (e.g., 'accurate-greater-noida' from 'accurate-greater-noida-mba-pgdm-review-2027')
  const cleanSlug = slug
    .toLowerCase()
    .replace(/-?(mba|pgdm|review|reviews|admission|admissions|fees|placements|cutoff|cutoffs|2026|2027|2028|2029|batch|salary|brochure|process).*$/g, '')
    .trim();

  return cleanSlug || slug.slice(0, 15);
}

export function runEntityAwareAudit() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  console.log(`🔍 Analyzing ${files.length} posts with Entity-Aware Cannibalization detection...`);

  const entityGroups = new Map();
  const allPosts = [];

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    const title = (data.title || '').trim();
    const slug = file.replace(/\.md$/, '');
    const entityKey = extractEntityKey(slug, title);
    const wordCount = content.split(/\s+/).length;
    const hasFaqs = Array.isArray(data.faqs) && data.faqs.length > 0;

    const postItem = {
      file,
      slug,
      title,
      entityKey,
      category: data.category || 'General',
      date: data.date || '',
      wordCount,
      hasFaqs
    };

    allPosts.push(postItem);

    if (!entityGroups.has(entityKey)) {
      entityGroups.set(entityKey, []);
    }
    entityGroups.get(entityKey).push(postItem);
  }

  // Find true same-entity cannibalization (e.g. 2+ posts competing for the same college/exam entity)
  const cannibalizationClusters = [];
  const validRedirects = [];

  for (const [entity, posts] of entityGroups.entries()) {
    if (posts.length > 1 && entity.length > 3) {
      // Sort: Highest word count & has FAQs is canonical
      posts.sort((a, b) => {
        if (b.hasFaqs !== a.hasFaqs) return b.hasFaqs ? 1 : -1;
        return b.wordCount - a.wordCount;
      });

      const canonical = posts[0];
      const competing = posts.slice(1);

      cannibalizationClusters.push({
        entityKey: entity,
        canonicalSlug: canonical.slug,
        canonicalTitle: canonical.title,
        competingCount: competing.length,
        competingPosts: competing.map(p => ({ slug: p.slug, title: p.title, wordCount: p.wordCount }))
      });

      for (const comp of competing) {
        validRedirects.push({
          source: `/blog/${comp.slug}`,
          destination: `/blog/${canonical.slug}`,
          permanent: true,
          entity: entity
        });
      }
    }
  }

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_ENTITY_REPORT, JSON.stringify(cannibalizationClusters, null, 2));
  fs.writeFileSync(OUTPUT_REDIRECTS, JSON.stringify(validRedirects, null, 2));

  console.log(`\n======================================================`);
  console.log(`🎯 Entity-Aware Cannibalization Audit Complete!`);
  console.log(`======================================================`);
  console.log(`📊 Total Posts: ${allPosts.length}`);
  console.log(`🏢 Distinct Entities Analyzed: ${entityGroups.size}`);
  console.log(`⚠️ Same-Entity Cannibalization Clusters: ${cannibalizationClusters.length}`);
  console.log(`🔀 Recommended 301 Consolidations: ${validRedirects.length}`);
  console.log(`📁 Entity Cannibalization Report: ${OUTPUT_ENTITY_REPORT}`);
  console.log(`📁 Validated 301 Redirects: ${OUTPUT_REDIRECTS}\n`);
}

runEntityAwareAudit();
