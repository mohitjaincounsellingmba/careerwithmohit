import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostData, getSortedPostsData } from "@/lib/markdown";
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = getPostData(slug);

  if (!postData) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-32 px-6 sm:px-12 max-w-5xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest text-foreground hover:text-accent mb-16 transition-all group">
        <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Index
      </Link>
      
      <article>
        <header className="mb-24 border-b-8 border-foreground pb-12 relative">
          <div className="absolute top-0 right-0 w-8 h-8 bg-accent rotate-45 -translate-y-1/2 translate-x-1/2 mix-blend-difference"></div>
          
          <p className="text-sm font-black uppercase tracking-widest text-foreground/50 mb-8 bg-foreground/5 inline-block px-3 py-1 rounded-sm">
            {postData.date}
          </p>
          <h1 className="text-6xl sm:text-8xl md:text-[7rem] font-display font-black uppercase tracking-[-0.04em] leading-[0.9] mb-12">
            {postData.title}
          </h1>
          {postData.description && (
            <p className="text-2xl sm:text-3xl font-bold text-foreground/80 leading-snug border-l-8 border-accent pl-8 py-2 max-w-3xl">
              {postData.description}
            </p>
          )}
        </header>

        <div className="prose max-w-none">
          <ReactMarkdown>{postData.content || ''}</ReactMarkdown>
        </div>
      </article>
      
      <footer className="mt-40 pt-16 border-t-8 border-foreground flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
        <div>
          <h3 className="text-3xl font-display font-black uppercase tracking-tight mb-4">Web Aesthetics</h3>
          <p className="text-foreground/60 font-bold uppercase tracking-widest text-sm">Vol. 1 / Brutalism & Editorial</p>
        </div>
        <div className="w-16 h-16 bg-accent rotate-12 hover:rotate-90 transition-transform duration-500 cursor-pointer flex items-center justify-center text-background font-black text-2xl">
          *
        </div>
      </footer>
    </div>
  );
}
