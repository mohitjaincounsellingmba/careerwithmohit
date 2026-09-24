import { NextRequest, NextResponse } from "next/server";
import { getAllColleges } from "@/lib/colleges";
import { searchColleges, getSearchSuggestions } from "@/lib/collegeSearch";

export const dynamic = "force-static";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || searchParams.get("search") || "";
    const stream = searchParams.get("stream") || searchParams.get("category") || "";
    const locationParam = searchParams.get("location") || searchParams.get("city") || searchParams.get("state") || "";
    const examParam = searchParams.get("exam") || "";
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 8;

    const allColleges = getAllColleges();

    if (!query.trim() && !stream && !locationParam && !examParam) {
      const suggestions = getSearchSuggestions("", allColleges, {}, limit);
      return NextResponse.json({
        query: "",
        colleges: allColleges.slice(0, limit).map((c) => ({
          slug: c.slug,
          name: c.name,
          logo: c.logo,
          location: c.location,
          category: c.category,
          fees: c.fees,
          avg_placement: c.avg_placement,
          highest_placement: c.highest_placement,
          ranking: c.ranking,
          ownership: c.ownership,
          exams: c.exams || [],
          courses: c.courses || [],
        })),
        popularSearches: suggestions.popularSearches,
        totalMatches: allColleges.length,
      });
    }

    // Scored search
    let scoredResults = searchColleges(allColleges, query);

    // Optional stream filter (e.g. mba, btech, ug)
    if (stream && stream !== "all" && stream !== "All Streams") {
      const normalizedStream = stream.toLowerCase();
      scoredResults = scoredResults.filter((s) => {
        if (normalizedStream === "mba" || normalizedStream === "management") {
          return s.college.category === "Management";
        }
        if (normalizedStream === "btech" || normalizedStream === "engineering") {
          return s.college.category === "Engineering";
        }
        if (normalizedStream === "ug" || normalizedStream === "ug courses" || normalizedStream === "bba" || normalizedStream === "bca") {
          return s.college.category === "UG Courses";
        }
        return true;
      });
    }

    // Optional location filter
    if (locationParam && locationParam !== "all") {
      const cleanLoc = locationParam.toLowerCase().replace(/[\-_]/g, " ");
      scoredResults = scoredResults.filter((s) => {
        const loc = (s.college.location || "").toLowerCase();
        const state = (s.college.state || "").toLowerCase();
        return loc.includes(cleanLoc) || state.includes(cleanLoc);
      });
    }

    // Optional exam filter
    if (examParam && examParam !== "all") {
      const cleanExam = examParam.toLowerCase().replace(/[\-_]/g, "");
      scoredResults = scoredResults.filter((s) => {
        return (s.college.exams || []).some((e) =>
          e.toLowerCase().replace(/[\s\-_]/g, "").includes(cleanExam)
        );
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
