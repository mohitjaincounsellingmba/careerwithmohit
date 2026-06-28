import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/', '/search'],
      },
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot', 'MJ12bot', 'PetalBot', 'GPTBot', 'CCBot'],
        disallow: '/',
      }
    ],
    sitemap: 'https://www.careerwithmohit.online/sitemap.xml',
  };
}
