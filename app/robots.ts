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
        // Explicitly allow AI Search Engines & LLM agents for Generative Engine Optimization (GEO)
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'GoogleOther',
          'Applebot-Extended',
          'Applebot',
          'cohere-ai',
          'Meta-ExternalAgent',
          'DuckAssistBot',
          'Bingbot'
        ],
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/'],
      },
      {
        // Disallow spam/scraping bots that do not provide search or AI citation value
        userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot', 'MJ12bot', 'PetalBot'],
        disallow: '/',
      }
    ],
    sitemap: 'https://www.careerwithmohit.online/sitemap.xml',
  };
}
