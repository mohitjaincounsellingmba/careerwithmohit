import { getAllColleges, CollegeMetadata } from "@/lib/colleges";
import { MBA_PGDM_COLLEGES_2027 } from "@/data/mbaPgdmColleges2027";
import { GeoMbaHub } from "@/data/geoMbaHubs";

export function getCollegesForGeoHub(hub: GeoMbaHub): CollegeMetadata[] {
  const allColleges = getAllColleges();
  const lowerKeywords = hub.locationKeywords.map((k) => k.toLowerCase());

  // 1. Filter markdown colleges
  const matchedFromMarkdown = allColleges.filter((college) => {
    const locLower = (college.location || "").toLowerCase();
    const nameLower = (college.name || "").toLowerCase();

    const isGeoMatch = lowerKeywords.some(
      (keyword) => locLower.includes(keyword) || nameLower.includes(keyword)
    );

    const isManagement =
      college.category === "Management" ||
      college.courses.some((c) => ["MBA", "PGDM", "BBA", "Executive MBA"].includes(c));

    return isGeoMatch && isManagement;
  });

  // 2. Augment with MBA_PGDM_COLLEGES_2027 dataset if not already in list
  const existingSlugs = new Set(matchedFromMarkdown.map((c) => c.slug));
  const existingNames = new Set(matchedFromMarkdown.map((c) => c.name.toLowerCase()));

  const matchedFromData: CollegeMetadata[] = [];

  MBA_PGDM_COLLEGES_2027.forEach((item) => {
    const locLower = (item.location || "").toLowerCase();
    const nameLower = (item.name || "").toLowerCase();
    const isGeoMatch = lowerKeywords.some(
      (keyword) => locLower.includes(keyword) || nameLower.includes(keyword)
    );

    if (isGeoMatch) {
      const slug = item.slug || item.universitySlug;
      if (!existingSlugs.has(slug) && !existingNames.has(nameLower)) {
        matchedFromData.push({
          slug,
          name: item.name,
          logo: "/logo.png",
          location: item.location,
          category: "Management",
          type: "Institute",
          courses: item.programs || ["PGDM", "MBA"],
          established: 1995,
          ownership: "Private Autonomous",
          ranking: item.accreditation || "AICTE Approved",
          fees: item.fee,
          avg_placement: item.avgPlacement || "₹8.50 LPA",
          highest_placement: item.highestPlacement || "₹22.00 LPA",
          lowest_placement: "₹5.50 LPA",
          exams: ["CAT", "MAT", "CMAT", "XAT"],
          brochure_url: "#",
          website: "https://www.careerwithmohit.online",
          top_recruiters: item.topRecruiters || ["Deloitte", "KPMG", "ICICI Bank", "Amazon"]
        });
      }
    }
  });

  const merged = [...matchedFromMarkdown, ...matchedFromData];
  return merged.sort((a, b) => (a.name > b.name ? 1 : -1));
}
