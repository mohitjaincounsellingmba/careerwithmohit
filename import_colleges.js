const fs = require('fs');
const path = require('path');

const scratchpad = fs.readFileSync('/Users/mohitjain/.gemini/antigravity/brain/6c03e537-56e5-44b1-9fb9-dd3fd3721e41/browser/scratchpad_g4avj5jc.md', 'utf8');
const jsonMatch = scratchpad.match(/```json\n([\s\S]*?)\n```/);
const data = JSON.parse(jsonMatch[1]);
const collegesDir = path.join(__dirname, 'colleges');

data.forEach((college) => {
  // Create a URL-friendly slug
  const slug = college.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  // Format data
  const name = college.name.replace(/"/g, '\\"');
  const fee = college.fee ? college.fee.trim() : "TBA";
  
  // Parse placement
  let avg_placement = "Not Disclosed";
  if (college.placement && college.placement.includes('Average')) {
    avg_placement = college.placement.replace('(Average)', '').trim();
    if (avg_placement.includes('Lakh')) {
       avg_placement = avg_placement.replace('Lakh', 'LPA');
    }
  }

  const courses = college.specialization ? college.specialization.split('/').map(c => `"${c.trim()}"`).join(', ') : '["B.Tech"]';
  
  // Try to extract location from name if separated by comma
  let location = "India";
  const nameParts = college.name.split(',');
  if (nameParts.length > 1) {
      location = nameParts[nameParts.length - 1].trim();
  }

  const content = `---
name: "${name}"
logo: "/colleges/default-engineering-logo.webp"
location: "${location}"
category: "Engineering"
type: "Institute"
courses: [${courses}]
established: 0
ownership: "Private"
ranking: "Top Private Engineering College"
fees: "${fee}"
avg_placement: "${avg_placement}"
highest_placement: "Not Disclosed"
lowest_placement: "Not Disclosed"
exams: ["JEE Main"]
brochure_url: ""
website: ""
---

### About ${name}
${name} is a top-ranking private engineering institution offering specialized courses.

### Courses & Fees
- **Specializations**: ${college.specialization}
- **Fee**: ${fee}

### Placements
- **Placement Stats**: ${college.placement || 'Not Disclosed'}

### Admission & Cutoff
- **Cutoff Information**: ${college.cutoff || 'Not Disclosed'}
`;

  const filePath = path.join(collegesDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Created: ${slug}.md`);
  } else {
    console.log(`Skipped existing: ${slug}.md`);
  }
});
console.log('Import complete.');
