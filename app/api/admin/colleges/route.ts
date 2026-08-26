import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllColleges, clearCollegesCache } from "@/lib/colleges";
import { slugify } from "@/lib/slugify";

export const dynamic = "force-static";


const collegesDirectory = path.join(process.cwd(), "colleges");
const uploadsDirectory = path.join(process.cwd(), "public", "images", "colleges");

export async function GET() {
  try {
    clearCollegesCache();
    const colleges = getAllColleges();
    return NextResponse.json({ success: true, count: colleges.length, colleges });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch colleges" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      slug: customSlug,
      category = "Management",
      type = "Institute",
      location = "India",
      state = "",
      established = 2000,
      ownership = "Private",
      ranking = "Top Rated",
      fees = "Contact Admissions",
      avg_placement = "₹8.5 LPA",
      highest_placement = "₹22.0 LPA",
      lowest_placement = "₹5.5 LPA",
      courses = ["MBA", "PGDM"],
      specialization = "",
      exams = ["CAT", "MAT", "CMAT"],
      website = "",
      brochure_url = "",
      top_recruiters = ["Deloitte", "KPMG", "Amazon", "ICICI Bank"],
      logo = "",
      description = "",
    } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { success: false, error: "College name is required" },
        { status: 400 }
      );
    }

    const slug = (customSlug || slugify(name)).toLowerCase().trim();
    if (!fs.existsSync(collegesDirectory)) {
      fs.mkdirSync(collegesDirectory, { recursive: true });
    }

    // Handle Image Upload if base64 data URI
    let finalLogo = logo;
    if (logo && logo.startsWith("data:image/")) {
      if (!fs.existsSync(uploadsDirectory)) {
        fs.mkdirSync(uploadsDirectory, { recursive: true });
      }

      const match = logo.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
      if (match) {
        const ext = match[1] === "jpeg" ? "jpg" : match[1];
        const base64Data = match[2];
        const fileName = `${slug}-${Date.now()}.${ext}`;
        const filePath = path.join(uploadsDirectory, fileName);
        fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));
        finalLogo = `/images/colleges/${fileName}`;
      }
    }

    // Format Courses array
    const parsedCourses = Array.isArray(courses)
      ? courses
      : (courses as string)
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean);

    // Format Exams / Cutoff array
    const parsedExams = Array.isArray(exams)
      ? exams
      : (exams as string)
          .split(",")
          .map((e) => e.trim())
          .filter(Boolean);

    // Format Top Recruiters
    const parsedRecruiters = Array.isArray(top_recruiters)
      ? top_recruiters
      : (top_recruiters as string)
          .split(",")
          .map((r) => r.trim())
          .filter(Boolean);

    // Generate markdown body content with specializations, cutoff, placement, and description
    let markdownBody = `### Courses & Fees
${parsedCourses.map((c: string) => `- **${c}**: ${fees}`).join("\n")}

### About ${name}
${description || `${name} located in ${location} is a top ${ownership.toLowerCase()} ${type.toLowerCase()} offering ${category.toLowerCase()} programs with industry-focused curriculum, excellent placement support, and modern infrastructure.`}

${specialization ? `### Specializations Offered\n${specialization}` : ""}

### Placements
- **Average CTC**: ${avg_placement}
- **Highest CTC**: ${highest_placement}
- **Lowest CTC**: ${lowest_placement}
- **Top Recruiters**: ${parsedRecruiters.join(", ")}
`;

    const frontmatter: Record<string, any> = {
      name,
      logo: finalLogo,
      location,
      category,
      type,
      courses: parsedCourses,
      established: Number(established) || 2000,
      ownership,
      ranking,
      fees,
      avg_placement,
      highest_placement,
      lowest_placement,
      exams: parsedExams,
      website,
      brochure_url,
      top_recruiters: parsedRecruiters,
      seo_title: `${name} ${parsedCourses[0] || 'MBA'} Fees, Cutoff & Placement 2027`,
      seo_description: `Explore ${name} ${location}: ${parsedCourses.join('/')} fee structure ${fees}, average placement ${avg_placement}, highest CTC ${highest_placement}, ranking & 2027 admission details.`,
    };

    if (state) frontmatter.state = state;

    const fileContent = matter.stringify(markdownBody, frontmatter);
    const targetFilePath = path.join(collegesDirectory, `${slug}.md`);

    fs.writeFileSync(targetFilePath, fileContent, "utf8");

    // Invalidate Cache
    clearCollegesCache();

    return NextResponse.json({
      success: true,
      slug,
      message: `College "${name}" saved successfully!`,
    });
  } catch (error: any) {
    console.error("Error saving college:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save college" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "College slug is required" },
        { status: 400 }
      );
    }

    const filePath = path.join(collegesDirectory, `${slug}.md`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    clearCollegesCache();

    return NextResponse.json({
      success: true,
      message: `College "${slug}" deleted successfully.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete college" },
      { status: 500 }
    );
  }
}
