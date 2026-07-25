import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CareerWithMohit',
    short_name: 'CareerWithMohit',
    description: 'Expert career guidance, MBA admissions consulting, and interview prep by Mohit Jain. Uncompromised strategies for professional success.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
