import { getAllColleges, CollegeMetadata } from "@/lib/colleges";
import { GeoMbaHub } from "@/data/geoMbaHubs";

export function getCollegesForGeoHub(hub: GeoMbaHub): CollegeMetadata[] {
  const allColleges = getAllColleges();
  const lowerKeywords = hub.locationKeywords.map((k) => k.toLowerCase());

  // Filter verified colleges from getAllColleges()
  const matched = allColleges.filter((college) => {
    const locLower = (college.location || "").toLowerCase();
    const nameLower = (college.name || "").toLowerCase();

    const isGeoMatch = lowerKeywords.some(
      (keyword) => locLower.includes(keyword) || nameLower.includes(keyword)
    );

    const isManagement =
      college.category === "Management" ||
      (college.courses && college.courses.some((c) => ["MBA", "PGDM", "BBA", "Executive MBA"].includes(c)));

    return isGeoMatch && isManagement;
  });

  return matched.sort((a, b) => (a.name > b.name ? 1 : -1));
}

