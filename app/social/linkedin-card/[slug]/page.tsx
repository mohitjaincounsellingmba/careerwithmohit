import { getPostData } from '@/lib/markdown';
import { notFound } from 'next/navigation';

export default async function LinkedInCard({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    notFound();
  }

  const category = post.keywords?.[0] || 'Career Insights';
  const date = new Date(post.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', sans-serif; }
        `}</style>
      </head>
      <body>
        {/* 1200x627 LinkedIn Banner Card */}
        <div style={{
          width: '1200px',
          height: '627px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)',
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Left Accent Bar */}
          <div style={{
            width: '8px',
            background: 'linear-gradient(180deg, #3b82f6, #8b5cf6)',
            flexShrink: 0,
          }} />

          {/* Decorative blobs */}
          <div style={{
            position: 'absolute', top: '-80px', right: '200px',
            width: '350px', height: '350px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-60px', right: '-60px',
            width: '280px', height: '280px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
          }} />

          {/* Grid overlay */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.03,
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

          {/* Right Side: Visual Accent Panel */}
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0,
            width: '320px',
            background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1))',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '32px', paddingBottom: '20px',
          }}>
            {/* Logo */}
            <div style={{
              width: '100px', height: '100px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '48px', fontWeight: '900', color: 'white',
            }}>M</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'white', fontSize: '20px', fontWeight: '800' }}>CareerWithMohit</div>
              <div style={{ color: '#60a5fa', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', marginTop: '4px' }}>careerwithmohit.com</div>
            </div>
            {/* Stats row */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '12px', width: '200px',
            }}>
              {['MBA Admissions', 'B.Tech Guidance', 'Career Counselling'].map((tag) => (
                <div key={tag} style={{
                  background: 'rgba(59,130,246,0.15)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  borderRadius: '100px',
                  padding: '8px 16px',
                  color: '#93c5fd',
                  fontSize: '13px',
                  fontWeight: '600',
                  textAlign: 'center',
                }}>{tag}</div>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div style={{
            position: 'relative', zIndex: 10,
            flex: 1, display: 'flex', flexDirection: 'column',
            padding: '52px 48px 44px 56px',
            maxWidth: '860px',
          }}>
            {/* Top: Category + Date */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                padding: '7px 20px', borderRadius: '100px',
                color: 'white', fontSize: '13px', fontWeight: '700',
                letterSpacing: '1.5px', textTransform: 'uppercase',
              }}>
                {category}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#475569' }} />
                <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>{date}</span>
              </div>
            </div>

            {/* Label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '28px', height: '3px', background: '#3b82f6', borderRadius: '2px' }} />
              <span style={{ color: '#93c5fd', fontSize: '14px', fontWeight: '700', letterSpacing: '2.5px', textTransform: 'uppercase' }}>
                New Article
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              color: 'white',
              fontSize: post.title.length > 70 ? '34px' : '42px',
              fontWeight: '900',
              lineHeight: 1.15,
              letterSpacing: '-0.5px',
              marginBottom: '24px',
              flex: 1,
            }}>
              {post.title}
            </h1>

            {/* Description */}
            <p style={{
              color: '#94a3b8',
              fontSize: '18px',
              fontWeight: '400',
              lineHeight: 1.6,
              marginBottom: '32px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {post.description}
            </p>

            {/* Footer */}
            <div style={{
              paddingTop: '24px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ color: '#64748b', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Written by</div>
                <div style={{ color: 'white', fontSize: '18px', fontWeight: '800' }}>Mohit Jain</div>
                <div style={{ color: '#64748b', fontSize: '13px', marginTop: '2px' }}>Education & Career Counsellor</div>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                padding: '14px 28px', borderRadius: '10px',
                color: 'white', fontSize: '16px', fontWeight: '800',
              }}>
                Read Full Article →
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
