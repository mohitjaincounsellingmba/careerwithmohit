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
        "url": "https://careerwithmohit.com/logo.png"
      }
    }
  };

  return (
    <article className="w-full bg-muted pb-24">
      <JsonLd data={articleData} />
      <div className="bg-white border-b-8 border-foreground pt-16 pb-16 px-6 sm:px-12">
        <div className="mx-auto max-w-4xl">
          <Link href="/blog" className="mb-10 inline-flex items-center gap-2 text-base font-bold text-foreground transition-transform hover:-translate-x-1">
            <ArrowLeft className="h-5 w-5 stroke-[3px]" />
            Back to Articles
          </Link>
          
          <header className="mb-8">
            <div className="mb-6 flex items-center gap-4">
              <time className="border-4 border-foreground bg-accent px-4 py-1 text-sm font-bold uppercase tracking-widest text-foreground">
                {new Date(postData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                Career Advice
              </span>
            </div>
            
            <h1 className="font-display text-5xl font-extrabold tracking-tighter text-foreground sm:text-6xl md:text-7xl mb-8 leading-[1.05] uppercase">
              {postData.title}
            </h1>
            
            {postData.description && (
              <p className="text-2xl font-medium text-gray-700 leading-snug border-l-8 border-primary pl-6">
                {postData.description}
              </p>
            )}
          </header>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 sm:px-12 mt-16">
        <div className="prose">
          <ReactMarkdown
            components={{
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-16 rounded-xl border-8 border-foreground shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                  <table className="w-full border-collapse bg-white text-left font-body" {...props} />
                </div>
              ),
              thead: ({ node, ...props }) => (
                <thead className="bg-primary text-white border-b-8 border-foreground uppercase font-black tracking-tight italic" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th className="px-6 py-5 text-xl" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="px-6 py-5 border-b-4 border-foreground text-lg font-bold text-foreground" {...props} />
              ),
              tr: ({ node, ...props }) => (
                <tr className="hover:bg-accent/20 transition-colors last:td:border-b-0" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-black text-primary" {...props} />
              ),
            }}
          >
            {postData.content || ''}
          </ReactMarkdown>
        </div>

        <div className="mt-24 border-4 border-foreground bg-primary p-10 sm:p-14 text-center">
          <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-6 uppercase">
            Need Expert Career Guidance?
          </h3>
          <p className="text-blue-50 text-xl font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            Book a 1-on-1 session to discuss your specific career challenges and build an actionable, uncompromised roadmap.
          </p>
          <a href="https://wa.me/919560020771" target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center bg-white border-4 border-foreground px-10 py-2 text-xl font-bold text-foreground transition-all hover:bg-gray-100 hover:scale-105 hover:-translate-y-1">
            Connect on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
