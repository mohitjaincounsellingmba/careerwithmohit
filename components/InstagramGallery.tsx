import { getSortedPostsData } from '@/lib/markdown';
import Image from 'next/image';
import Link from 'next/link';

export async function InstagramGallery() {
  // Get latest 4 posts
  const posts = getSortedPostsData().slice(0, 4);

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-pink-400 flex items-center gap-2">
        <span className="w-4 h-[2px] bg-pink-400"></span> Latest on Insta
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {posts.map((post) => (
          <a 
            key={post.slug} 
            href={`/blog/${post.slug}`} 
            className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 block bg-black/20"
          >
            <Image 
              src={post.image || "/og-image.webp"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Hover overlay with title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
              <span className="text-white text-xs font-bold text-center line-clamp-3 leading-tight">{post.title}</span>
            </div>
            {/* Instagram Icon Badge */}
            <div className="absolute top-2 right-2 bg-pink-500/80 backdrop-blur-sm p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
