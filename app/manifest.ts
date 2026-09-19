import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CareerWithMohit - Career Counselling & MBA Admissions',
    short_name: 'CareerWithMohit',
    description: 'Expert career guidance, MBA & PGDM admissions consulting, free entrance mock tests, and interview prep by Mohit Jain.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0f172a',
    orientation: 'portrait',
    categories: ['education', 'career', 'admissions'],
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
