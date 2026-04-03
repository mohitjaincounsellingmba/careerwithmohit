import { getPostData } from '@/lib/markdown';
import { notFound } from 'next/navigation';

export default async function InstagramCard({
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
        {/* 1080x1080 Square Card */}
        <div style={{
          width: '1080px',
          height: '1080px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Decorative Circles */}
          <div style={{
            position: 'absolute', top: '-120px', right: '-120px',
            width: '500px', height: '500px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-100px', left: '-100px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '700px', height: '700px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 60%)',
          }} />

          {/* Grid Lines Decoration */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%', padding: '72px' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '60px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Logo Circle */}
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '28px', fontWeight: '900', color: 'white',
                }}>M</div>
                <div>
                  <div style={{ color: 'white', fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>CareerWithMohit</div>
                  <div style={{ color: '#60a5fa', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>careerwithmohit.com</div>
                </div>
              </div>
              {/* Category Badge */}
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                padding: '10px 24px', borderRadius: '100px',
                color: 'white', fontSize: '14px', fontWeight: '700',
                letterSpacing: '1px', textTransform: 'uppercase',
              }}>
                {category}
              </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {/* Tag */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                marginBottom: '32px', alignSelf: 'flex-start',
              }}>
                <div style={{ width: '32px', height: '3px', background: '#3b82f6', borderRadius: '2px' }} />
                <span style={{ color: '#93c5fd', fontSize: '16px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase' }}>
                  Latest Post
                </span>
              </div>

              {/* Title */}
              <h1 style={{
                color: 'white',
                fontSize: post.title.length > 60 ? '52px' : '64px',
                fontWeight: '900',
                lineHeight: 1.1,
                letterSpacing: '-1px',
                marginBottom: '32px',
              }}>
                {post.title}
              </h1>

              {/* Description */}
              <p style={{
                color: '#94a3b8',
                fontSize: '24px',
                fontWeight: '400',
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {post.description}
              </p>
            </div>

            {/* Footer */}
            <div style={{
              marginTop: '48px',
              paddingTop: '36px',
              borderTop: '1px solid rgba(255,255,255,0.12)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>By</div>
                <div style={{ color: 'white', fontSize: '22px', fontWeight: '800' }}>Mohit Jain</div>
                <div style={{ color: '#64748b', fontSize: '15px' }}>Education & Career Counsellor</div>
              </div>

              {/* CTA Button */}
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                padding: '18px 36px',
                borderRadius: '12px',
                color: 'white',
                fontSize: '20px',
                fontWeight: '800',
                textAlign: 'center',
              }}>
                Read Full Article →<br/>
                <span style={{ fontSize: '14px', fontWeight: '600', opacity: 0.9 }}>careerwithmohit.com</span>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
