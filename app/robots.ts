import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/'],
      },
      {
        // Explicitly allow AI Search Engines, major crawlers & SEO indexers
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Google-Extended',
          'GoogleOther',
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Applebot-Extended',
          'Applebot',
          'cohere-ai',
          'Meta-ExternalAgent',
          'DuckAssistBot',
          'Bingbot',
          'AhrefsBot',
          'SemrushBot',
          'SEMrushBot',
          'SEOptimerBot',
          'DotBot',
          'MozBot',
          'rogerbot'
        ],
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/'],
      },
      {
        // Disallow aggressive scraping bots
        userAgent: ['MJ12bot', 'PetalBot', 'Bytespider'],
        disallow: '/',
      }
    ],
    sitemap: 'https://careerwithmohit.online/sitemap.xml',
    host: 'https://careerwithmohit.online',
  };
}
