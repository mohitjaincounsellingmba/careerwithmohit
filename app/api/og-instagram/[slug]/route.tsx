import { ImageResponse } from 'next/og';
import { getPostData, getSortedPostsData } from '@/lib/markdown';

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } | Promise<{ slug: string }> }
) {
  // Handle both Next.js 14 and 15+ patterns for params
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  
  const post = getPostData(slug);

  if (!post) {
    return new Response('Post not found', { status: 404 });
  }

  // Define a nice background gradient based on category
  const gradients: Record<string, string> = {
    'MBA': 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
    'BBA': 'linear-gradient(135deg, #0f172a 0%, #172554 100%)',
    'B.Tech': 'linear-gradient(135deg, #0f172a 0%, #064e3b 100%)',
    'Jobs & Careers': 'linear-gradient(135deg, #0f172a 0%, #4c1d95 100%)',
    'Exams': 'linear-gradient(135deg, #0f172a 0%, #7f1d1d 100%)',
    'General': 'linear-gradient(135deg, #0f172a 0%, #000000 100%)',
  };

  const bgGradient = gradients[post.category || 'General'] || gradients['General'];

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: bgGradient,
          color: 'white',
          padding: '80px',
          justifyContent: 'space-between',
          fontFamily: 'sans-serif',
          border: '20px solid #ec4899', // Pink border for instagram aesthetic
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ 
              display: 'flex',
              padding: '16px', 
              background: 'white', 
              borderRadius: '20px',
              border: '4px solid #38bdf8'
            }}>
              <span style={{ fontSize: '40px', fontWeight: 'bold', color: '#0a0a0a' }}>MJ</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '40px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', lineHeight: 1 }}>CAREERWITHMOHIT</span>
              <span style={{ fontSize: '24px', color: '#9ca3af', fontWeight: 600 }}>Admissions Expert 2026</span>
            </div>
          </div>
          <div style={{ 
            display: 'flex', 
            background: 'rgba(236, 72, 153, 0.2)', 
            padding: '16px 32px', 
            borderRadius: '100px',
            border: '2px solid #ec4899'
          }}>
            <span style={{ fontSize: '28px', color: '#ec4899', fontWeight: 800 }}>@careerwithmohit.online</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '60px' }}>
          <div style={{ display: 'flex' }}>
            <span style={{ 
              background: '#38bdf8',
              color: '#0f172a',
              padding: '12px 24px',
              fontSize: '32px', 
              textTransform: 'uppercase', 
              fontWeight: 900, 
              letterSpacing: '4px',
              borderRadius: '8px',
              boxShadow: '8px 8px 0px rgba(0,0,0,0.5)'
            }}>
              {post.category || 'NEW BLOG POST'}
            </span>
          </div>
          
          <h1 style={{ 
            fontSize: '84px', 
            fontWeight: 900, 
            lineHeight: 1.1, 
            margin: 0, 
            letterSpacing: '-2px',
            textShadow: '4px 4px 0px rgba(0,0,0,0.5)'
          }}>
            {post.title}
          </h1>
          
          {post.description && (
            <p style={{ 
              fontSize: '40px', 
              color: '#e2e8f0', 
              margin: 0, 
              lineHeight: 1.5, 
              maxWidth: '850px',
              borderLeft: '8px solid #ec4899',
              paddingLeft: '32px'
            }}>
              {post.description.substring(0, 160)}{post.description.length > 160 ? '...' : ''}
            </p>
          )}
        </div>

        {/* Bottom CTA Area */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: 'rgba(255,255,255,0.05)',
          padding: '40px',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.1)',
          marginTop: 'auto'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '28px', fontWeight: 700, color: '#cbd5e1' }}>Read full article on:</span>
            <span style={{ fontSize: '44px', fontWeight: 900, color: '#38bdf8' }}>careerwithmohit.online</span>
          </div>
          <div style={{ 
            display: 'flex',
            background: 'linear-gradient(to right, #ec4899, #8b5cf6)', 
            padding: '24px 48px', 
            borderRadius: '100px',
            fontSize: '36px',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: 'white',
            letterSpacing: '2px',
            boxShadow: '0 20px 40px rgba(236, 72, 153, 0.4)'
          }}>
            Link in Bio 🔗
          </div>
        </div>
      </div>
    ),
    {
      width: 1080, // Standard Instagram square format
      height: 1080,
    }
  );
}
