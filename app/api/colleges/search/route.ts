import { NextRequest, NextResponse } from "next/server";
import { getAllColleges } from "@/lib/colleges";
import { searchColleges, getSearchSuggestions } from "@/lib/collegeSearch";

export const dynamic = "force-static";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || searchParams.get("search") || "";
    const stream = searchParams.get("stream") || searchParams.get("category") || "";
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 6;

    const allColleges = getAllColleges();

    if (!query.trim()) {
      const suggestions = getSearchSuggestions("", allColleges, {}, limit);
      return NextResponse.json({
        query: "",
        colleges: suggestions.colleges,
        popularSearches: suggestions.popularSearches,
        totalMatches: 0,
      });
    }

    // Scored search
    let scoredResults = searchColleges(allColleges, query);

    // Optional stream filter (e.g. mba, btech)
    if (stream && stream !== "all") {
      const normalizedStream = stream.toLowerCase();
      scoredResults = scoredResults.filter((s) => {
        if (normalizedStream === "mba" || normalizedStream === "management") {
          return s.college.category === "Management";
        }
        if (normalizedStream === "btech" || normalizedStream === "engineering") {
          return s.college.category === "Engineering";
        }
        if (normalizedStream === "ug") {
          return s.college.category === "UG Courses";
        }
        return true;
      });
    }

    const matchedColleges = scoredResults.slice(0, limit).map((s) => ({
      slug: s.college.slug,
      name: s.college.name,
      logo: s.college.logo,
      location: s.college.location,
      category: s.college.category,
      fees: s.college.fees,
      avg_placement: s.college.avg_placement,
      highest_placement: s.college.highest_placement,
      ranking: s.college.ranking,
      ownership: s.college.ownership,
      exams: s.college.exams || [],
      courses: s.college.courses || [],
    }));

    const suggestions = getSearchSuggestions(query, allColleges, {}, limit);

    return NextResponse.json({
      query,
      colleges: matchedColleges,
      popularSearches: suggestions.popularSearches,
      totalMatches: scoredResults.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to search colleges", details: error?.message },
      { status: 500 }
    );
  }
}
