import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostData, getSortedPostsData } from "@/lib/markdown";
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';

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
    <article className="mx-auto max-w-3xl px-6 py-16 sm:px-12 sm:py-20">
      <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
      
      <header className="mb-12 border-b border-border-subtle pb-10">
        <div className="mb-6 flex items-center gap-3">
          <time className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent">
            {new Date(postData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </time>
          <span className="text-xs font-medium text-foreground/50 uppercase tracking-wider">
            Career Advice
          </span>
        </div>
        
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-[3.5rem] mb-6 text-balance leading-[1.1]">
          {postData.title}
        </h1>
        
        {postData.description && (
          <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl">
            {postData.description}
          </p>
        )}
      </header>

      <div className="prose">
        <ReactMarkdown>{postData.content || ''}</ReactMarkdown>
      </div>

      <div className="mt-20 border-t border-border-subtle pt-10">
        <div className="rounded-2xl bg-surface border border-border-subtle p-8 sm:p-10 text-center">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground mb-4">
            Need personalized career guidance?
          </h3>
          <p className="text-foreground/70 mb-8 max-w-md mx-auto">
            Book a 1-on-1 session to discuss your specific career challenges and build an actionable roadmap.
          </p>
          <Link href="/contact" className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-8 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-accent/90">
            Schedule a Consultation
          </Link>
        </div>
      </div>
    </article>
  );
}
