import fs from 'fs';
import path from 'path';

console.log('🔄 Executing internal link trailing slash and redirect target fixes...');

let filesChanged = 0;

// Helper to update file with regex replacements
function updateFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const { from, to } of replacements) {
    content = content.replace(from, to);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesChanged++;
    console.log(`  ✅ Modified: ${path.relative(process.cwd(), filePath)}`);
  }
}

// 1. data/geoMbaHubs.ts
updateFile(path.join(process.cwd(), 'data', 'geoMbaHubs.ts'), [
  { from: /route:\s*'(\/colleges\/mba-colleges-[^']+)(?<!\/)'/g, to: "route: '$1/'" }
]);

// 2. data/govtJobs.ts
updateFile(path.join(process.cwd(), 'data', 'govtJobs.ts'), [
  { from: /'(\/blog\/[a-z0-9-]+)(?<!\/)'/g, to: "'$1/'" }
]);

// 3. data/megaMenuData.ts
updateFile(path.join(process.cwd(), 'data', 'megaMenuData.ts'), [
  { from: /'(\/tools\/btech-college-predictor)(?<!\/)'/g, to: "'$1/'" }
]);

// 4. data/mockTests.ts
updateFile(path.join(process.cwd(), 'data', 'mockTests.ts'), [
  { from: /slug:\s*"(\/tools\/[^"\s]+)(?<!\/)"/g, to: 'slug: "$1/"' },
  { from: /guideSlug:\s*"(\/blog\/[^"\s]+)(?<!\/)"/g, to: 'guideSlug: "$1/"' },
  { from: /free-cat-mock-test-2027-29\//g, to: 'free-cat-mock-test-2026/' },
  { from: /free-xat-mock-test-2027-29\//g, to: 'free-xat-mock-test-2026/' },
  { from: /free-snap-mock-test-2027-29\//g, to: 'free-snap-mock-test-2026/' },
  { from: /free-gmat-mock-test-2027-29\//g, to: 'free-gmat-mock-test-2026/' }
]);

// 5. Components with college and education links missing trailing slashes
const componentReplacements = [
  // AbroadEducationClient
  {
    file: 'components/AbroadEducationClient.tsx',
    replacements: [
      { from: /href=\{`\/abroad-education\/\$\{slug\}`\}/g, to: 'href={`/abroad-education/${slug}/`}' }
    ]
  },
  // AdmissionsClient
  {
    file: 'components/AdmissionsClient.tsx',
    replacements: [
      { from: /href=\{`\/colleges\/\$\{c\.slug\}`\}/g, to: 'href={`/colleges/${c.slug}/`}' },
      { from: /href=\{`\/colleges\/\$\{college\.slug\}`\}/g, to: 'href={`/colleges/${college.slug}/`}' }
    ]
  },
  // CatMockTest Cutoff
  {
    file: 'components/CatMockTest/CatCollegeCutoffMatcher.tsx',
    replacements: [
      { from: /href=\{`\/colleges\/\$\{col\.slug\}`\}/g, to: 'href={`/colleges/${col.slug}/`}' }
    ]
  },
  // CollegeCard
  {
    file: 'components/CollegeCard.tsx',
    replacements: [
      { from: /href=\{`\/colleges\/\$\{college\.slug\}`\}/g, to: 'href={`/colleges/${college.slug}/`}' }
    ]
  },
  // CollegeCompareClient
  {
    file: 'components/CollegeCompareClient.tsx',
    replacements: [
      { from: /href=\{`\/colleges\/\$\{college\.slug\}`\}/g, to: 'href={`/colleges/${college.slug}/`}' }
    ]
  },
  // CollegeComparison
  {
    file: 'components/CollegeComparison.tsx',
    replacements: [
      { from: /href=\{`\/colleges\/\$\{collegeA\.slug\}`\}/g, to: 'href={`/colleges/${collegeA.slug}/`}' },
      { from: /href=\{`\/colleges\/\$\{collegeB\.slug\}`\}/g, to: 'href={`/colleges/${collegeB.slug}/`}' }
    ]
  },
  // CompareModal
  {
    file: 'components/CompareModal.tsx',
    replacements: [
      { from: /href=\{`\/colleges\/\$\{college\.slug\}`\}/g, to: 'href={`/colleges/${college.slug}/`}' }
    ]
  },
  // GeoMbaHubClient
  {
    file: 'components/GeoMbaHubClient.tsx',
    replacements: [
      { from: /href=\{`\/colleges\/\$\{item\.slug\}`\}/g, to: 'href={`/colleges/${item.slug}/`}' }
    ]
  },
  // MatMockTest Cutoff
  {
    file: 'components/MatMockTest/MatCollegeCutoffMatcher.tsx',
    replacements: [
      { from: /href=\{`\/colleges\/\$\{col\.slug\}`\}/g, to: 'href={`/colleges/${col.slug}/`}' }
    ]
  },
  // NmatMockTest Cutoff
  {
    file: 'components/NmatMockTest/NmatCollegeCutoffMatcher.tsx',
    replacements: [
      { from: /href=\{`\/colleges\/\$\{col\.slug\}`\}/g, to: 'href={`/colleges/${col.slug}/`}' }
    ]
  },
  // MbaCollegesPuneClient
  {
    file: 'components/MbaCollegesPuneClient.tsx',
    replacements: [
      { from: /href=\{`\/colleges\/\$\{college\.slug\}`\}/g, to: 'href={`/colleges/${college.slug}/`}' },
      { from: /href=\{`\/colleges\/\$\{c\.slug\}`\}/g, to: 'href={`/colleges/${c.slug}/`}' }
    ]
  },
  // SearchResults
  {
    file: 'components/SearchResults.tsx',
    replacements: [
      { from: /href=\{`\/colleges\/\$\{col\.slug\}`\}/g, to: 'href={`/colleges/${col.slug}/`}' }
    ]
  },
  // SimilarColleges
  {
    file: 'components/SimilarColleges.tsx',
    replacements: [
      { from: /href=\{`\/colleges\/\$\{college\.slug\}`\}/g, to: 'href={`/colleges/${college.slug}/`}' }
    ]
  },
  // admin/CollegesTab
  {
    file: 'components/admin/CollegesTab.tsx',
    replacements: [
      { from: /href=\{`\/colleges\/\$\{c\.slug\}`\}/g, to: 'href={`/colleges/${c.slug}/`}' }
    ]
  },
  // HomeCollegeExplorer
  {
    file: 'components/HomeCollegeExplorer.tsx',
    replacements: [
      { from: /href=\{`\/\$\{col\.slug\}`\}/g, to: 'href={`/${col.slug}/`}' }
    ]
  },
  // TopTierMbaClient
  {
    file: 'components/TopTierMbaClient.tsx',
    replacements: [
      { from: /href=\{`\/\$\{col\.slug\}`\}/g, to: 'href={`/${col.slug}/`}' },
      { from: /href=\{`\/\$\{college\.slug\}`\}/g, to: 'href={`/${college.slug}/`}' }
    ]
  },
  // BBACollegeGenerator
  {
    file: 'components/BBACollegeGenerator.tsx',
    replacements: [
      { from: /href=\{`\/\$\{college\.slug\}`\}/g, to: 'href={`/${college.slug}/`}' }
    ]
  },
  // BTechCollegeGenerator
  {
    file: 'components/BTechCollegeGenerator.tsx',
    replacements: [
      { from: /href=\{`\/\$\{college\.slug\}`\}/g, to: 'href={`/${college.slug}/`}' }
    ]
  },
  // MBACollegeGenerator
  {
    file: 'components/MBACollegeGenerator.tsx',
    replacements: [
      { from: /href=\{`\/\$\{college\.slug\}`\}/g, to: 'href={`/${college.slug}/`}' }
    ]
  },
  // online-degree-certification/[slug]/page.tsx
  {
    file: 'app/online-degree-certification/[slug]/page.tsx',
    replacements: [
      { from: /href=\{`\/online-degree-certification\/\$\{univ\.universitySlug\}`\}/g, to: 'href={`/online-degree-certification/${univ.universitySlug}/`}' },
      { from: /href=\{`\/online-degree-certification\/\$\{comp\}`\}/g, to: 'href={`/online-degree-certification/${comp}/`}' }
    ]
  },
  // online-degree-certification/page.tsx
  {
    file: 'app/online-degree-certification/page.tsx',
    replacements: [
      { from: /href=\{`\/online-degree-certification\/\$\{link\.slug\}`\}/g, to: 'href={`/online-degree-certification/${link.slug}/`}' },
      { from: /href=\{`\/online-degree-certification\/\$\{geo\.slug\}`\}/g, to: 'href={`/online-degree-certification/${geo.slug}/`}' },
      { from: /href=\{`\/online-degree-certification\/\$\{col\.univSlug\}`\}/g, to: 'href={`/online-degree-certification/${col.univSlug}/`}' },
      { from: /href=\{`\/online-degree-certification\/\$\{univ\.univSlug\}`\}/g, to: 'href={`/online-degree-certification/${univ.univSlug}/`}' },
      { from: /href=\{`\/online-degree-certification\/\$\{comp\.slug\}`\}/g, to: 'href={`/online-degree-certification/${comp.slug}/`}' }
    ]
  }
];

for (const item of componentReplacements) {
  updateFile(path.join(process.cwd(), item.file), item.replacements);
}

console.log(`\n🎉 Total files updated: ${filesChanged}`);
