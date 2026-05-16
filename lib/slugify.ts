export const generateCollegeSlug = (name: string, location: string) => {
  const combined = `${name}-${location}`;
  return combined
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};
