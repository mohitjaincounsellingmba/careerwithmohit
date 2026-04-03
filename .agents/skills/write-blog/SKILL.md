---
name: write-blog
description: Helps write SEO friendly blog posts for the careerwithmohit portfolio. It refers to idea.md and existing posts to maintain consistency and then automates the git commit/push process.
---

This skill provides a structured workflow for generating SEO-optimized blog posts that align with the website's mission and existing content.

## Workflow

### 1. Context Gathering
Before writing a new post, ALWAYS perform the following:
- Read [idea.md](file:///Users/mohitjain/Desktop/my%20portfolio/careerwithmohit/idea.md) to understand the core mission (MBA, BTech, Career Counselling, Exams).
- List the contents of the [posts directory](file:///Users/mohitjain/Desktop/my%20portfolio/careerwithmohit/posts) and read at least 2-3 recent or relevant posts to match the tone, style, and formatting (usually markdown with frontmatter).

### 2. SEO Guidelines
Ensure the blog post follows these SEO best practices:
- **Title**: Include the primary keyword naturally.
- **Headings**: Use H1 for the main title, H2 for sub-sections, and H3 for sub-points.
- **Keywords**: Integrate trending keywords related to Indian MBA/BTech admissions, fees, and placements.
- **Internal Linking**: Link to at least 2-3 other relevant posts in the `posts/` directory.
- **Meta Description**: Suggest a concise, compelling meta description.
- **Structure**: Use bullet points and tables where appropriate to improve readability and "featured snippet" potential.

### 3. Writing & Formatting
- Write in a helpful, informative, and professional tone.
- Save the file in the `posts/` directory with a kebab-case filename (e.g., `top-mba-colleges-2026.md`).
- Ensure consistent YAML frontmatter (if applicable to the project).

### 4. Git Automation
Once the post is written and verified for quality:
- Run `git add .` to stage the new post.
- Run `git commit -m "feat: add blog post about [Topic Name]"`
- Run `git push origin main` to deploy/update the blog.

### 5. Social Media Automation
After the post is pushed and the site is updated:
- Run `node scripts/social-share.mjs` to automatically post to Instagram, Facebook, and LinkedIn.
- Wait for the graphics to be generated and shared.

## Critical Reminders
- Ensure `INSTAGRAM_BUSINESS_ID`, `INSTAGRAM_ACCESS_TOKEN`, `FB_PAGE_ID`, and `LINKEDIN_ACCESS_TOKEN` are set in your environment or `.env` file.
- Do NOT guess college data; if unsure, perform a web search to get accurate fees, placements, and dates.
- Always check if a similar post already exists to avoid duplication or to provide a better internal link.
