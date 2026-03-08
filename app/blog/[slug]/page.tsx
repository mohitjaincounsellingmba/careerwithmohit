import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostData, getSortedPostsData } from "@/lib/markdown";
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import { JsonLd } from "@/components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const postData = getPostData(slug);
  
  if (!postData) return {};

  return {
    title: postData.title,
    description: postData.description,
    openGraph: {
      title: postData.title,
      description: postData.description,
      type: "article",
      publishedTime: postData.date,
      authors: ["Mohit Jain"],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

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

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": postData.title,
    "description": postData.description,
    "datePublished": postData.date,
    "author": {
      "@type": "Person",
      "name": "Mohit Jain"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CareerWithMohit",
      "logo": {
        "@type": "ImageObject",
        "url": "https://careerwithmohit.com/logo.webp"
      }
    }
  };

  return (
    <article className="w-full bg-slate-50 pb-24 font-body">
      <JsonLd data={articleData} />
      
      {/* HEADER SECTION - ULTRA PREMIUM */}
      <div className="bg-white border-b-[12px] border-foreground pt-20 pb-20 px-6 sm:px-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rotate-12 -ml-10 -mb-10" />
        
        <div className="mx-auto max-w-4xl relative z-10">
          <Link href="/blog" className="mb-12 inline-flex items-center gap-3 text-lg font-black text-foreground group transition-all">
            <div className="h-10 w-10 flex items-center justify-center border-4 border-foreground group-hover:bg-primary group-hover:text-white transition-colors uppercase">
              <ArrowLeft className="h-6 w-6 stroke-[3.5px]" />
            </div>
            Back to Articles
          </Link>
          
          <header>
            <div className="mb-10 flex flex-wrap items-center gap-6">
              <div className="bg-foreground text-white px-5 py-2 text-sm font-black uppercase tracking-widest -rotate-1 border-4 border-foreground">
                {new Date(postData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="bg-accent text-foreground px-5 py-2 text-sm font-black uppercase tracking-widest rotate-1 border-4 border-foreground">
                Expert Analysis
              </div>
            </div>
            
            <h1 className="font-display text-5xl font-black tracking-tight text-foreground sm:text-7xl md:text-8xl mb-12 leading-[0.95] uppercase">
              {postData.title}
            </h1>
            
            {postData.description && (
              <p className="text-2xl md:text-3xl font-bold text-gray-700 leading-tight max-w-3xl border-l-[12px] border-primary pl-8 py-2">
                {postData.description}
              </p>
            )}
          </header>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 sm:px-12 mt-20">
        <div className="prose prose-xl prose-slate max-w-none">
          <ReactMarkdown
            components={{
              h2: ({ node, ...props }) => (
                <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-foreground mt-24 mb-10 border-b-8 border-foreground pb-6 inline-block" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-primary mt-16 mb-6" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="text-xl leading-relaxed text-gray-800 font-medium mb-10" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="space-y-6 mb-12 list-none p-0" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="flex items-start gap-5 text-xl font-bold border-4 border-foreground bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <div className="my-16 bg-blue-50 border-[6px] border-primary p-10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Compass className="w-32 h-32 text-primary" />
                   </div>
                   <div className="relative z-10 italic text-2xl font-black text-primary leading-tight" {...props} />
                </div>
              ),
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-16 rounded-xl border-8 border-foreground shadow-[20px_20px_0px_0px_rgba(59,130,246,0.3)]">
                  <table className="w-full border-collapse bg-white text-left" {...props} />
                </div>
              ),
              thead: ({ node, ...props }) => (
                <thead className="bg-foreground text-white border-b-8 border-foreground uppercase font-black tracking-tight italic" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th className="px-8 py-6 text-xl" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="px-8 py-6 border-b-4 border-foreground text-lg font-bold text-foreground" {...props} />
              ),
              tr: ({ node, ...props }) => (
                <tr className="hover:bg-primary/5 transition-colors last:td:border-b-0" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-black text-foreground bg-accent/30 px-1" {...props} />
              ),
            }}
          >
            {postData.content || ''}
          </ReactMarkdown>
        </div>

        {/* CTA SECTION - BOLD & ACTION-ORIENTED */}
        <div className="mt-32 border-8 border-foreground bg-primary p-12 sm:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-accent" />
          <h3 className="font-display text-4xl sm:text-6xl font-black tracking-tighter text-white mb-8 uppercase leading-none">
            Don't Guess Your Career. <br />
            <span className="text-accent underline decoration-8 underline-offset-8">Strategy</span> Wins.
          </h3>
          <p className="text-blue-50 text-2xl font-bold mb-14 max-w-2xl mx-auto leading-tight">
            Get uncompromised, expert guidance to dominate your academic and professional goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="https://wa.me/919560020771" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex h-20 items-center justify-center bg-white border-4 border-foreground px-12 text-2xl font-black text-foreground transition-all hover:bg-accent hover:translate-x-2 hover:-translate-y-2 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] uppercase">
              WhatsApp Now
            </a>
            <Link href="/inquiry" className="w-full sm:w-auto inline-flex h-20 items-center justify-center bg-transparent border-4 border-white px-12 text-2xl font-black text-white transition-all hover:bg-white hover:text-primary uppercase">
              Inquiry Form
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
