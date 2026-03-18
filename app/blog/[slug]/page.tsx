import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPostData, getSortedPostsData } from "@/lib/markdown";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, Compass } from 'lucide-react';
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { InquiryCard } from "@/components/InquiryCard";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const postData = getPostData(slug);

  if (!postData) return {};

  const postTitle = `${postData.title} | Updated Guide 2026`;
  const postDescription = postData.description || `Expert guide on ${postData.title}. Detailed insights, placements 2025, and admission strategy for 2026 by Mohit Jain.`;
  const postUrl = `/blog/${slug}`;

  return {
    title: postTitle,
    description: postDescription,
    keywords: [...(postData.keywords || []), "MBA Admissions 2026", "Direct MBA Admission", "Placement Report 2025", "Career Counselling India"],
    openGraph: {
      title: postTitle,
      description: postDescription,
      type: "article",
      publishedTime: postData.date,
      authors: ["Mohit Jain"],
      url: postUrl,
      siteName: "CareerWithMohit",
    },
    twitter: {
      card: "summary_large_image",
      title: postTitle,
      description: postDescription,
    },
    alternates: {
      canonical: postUrl,
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
    "@type": "BlogPosting",
    "headline": postData.title,
    "description": postData.description,
    "image": `https://www.careerwithmohit.online/og-image.webp`,
    "datePublished": postData.date,
    "dateModified": postData.date,
    "author": {
      "@type": "Person",
      "name": "Mohit Jain",
      "url": "https://www.careerwithmohit.online"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CareerWithMohit",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.careerwithmohit.online/logo.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.careerwithmohit.online/blog/${slug}`
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
          <div className="mb-8">
            <Breadcrumbs />
          </div>

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

      <div className="mx-auto max-w-4xl px-6 sm:px-12 mt-20 pb-20">
        <div className="prose prose-xl prose-slate max-w-none">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              h2: ({ node, ...props }) => (
                <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-foreground mt-24 mb-10 border-b-8 border-foreground pb-6" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-primary mt-16 mb-8 border-l-8 border-primary pl-6" {...props} />
              ),
              p: ({ node, children, ...props }) => {
                // Check if the paragraph contains our [InquiryCard] syntax
                const content = String(children);
                if (content.startsWith('[InquiryCard') && content.endsWith(']')) {
                    const titleMatch = content.match(/title="([^"]*)"/);
                    const descMatch = content.match(/description="([^"]*)"/);
                    const ctaMatch = content.match(/cta="([^"]*)"/);
                    const typeMatch = content.match(/type="([^"]*)"/);

                    return (
                        <InquiryCard 
                            title={titleMatch?.[1]}
                            description={descMatch?.[1]}
                            cta={ctaMatch?.[1]}
                            type={(typeMatch?.[1] as any) || "admission"}
                        />
                    );
                }
                return <p className="text-xl leading-relaxed text-gray-800 font-medium mb-10" {...props}>{children}</p>;
              },
              ul: ({ node, ...props }) => (
                <ul className="space-y-4 mb-12 list-disc pl-8" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="text-xl font-bold text-foreground leading-relaxed pl-2" {...props} />
              ),
              blockquote: ({ node, children, ...props }) => (
                <blockquote className="my-16 bg-blue-50 border-l-[12px] border-primary p-12 relative overflow-hidden not-italic" {...props}>
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Compass className="w-32 h-32 text-primary" />
                  </div>
                  <div className="relative z-10 text-2xl font-black text-primary leading-tight">
                    {children}
                  </div>
                </blockquote>
              ),
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-16 rounded-xl border border-gray-200 shadow-xl overflow-hidden">
                  <table className="w-full border-collapse bg-white text-left font-body" {...props} />
                </div>
              ),
              thead: ({ node, ...props }) => (
                <thead className="bg-gray-100 text-foreground border-b border-gray-200 uppercase font-black text-sm tracking-widest text-center" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th className="px-8 py-6 border-r border-gray-200 last:border-r-0" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="px-8 py-6 border-b border-gray-100 last:border-b-0 text-lg font-bold text-foreground border-r border-gray-100 last:border-r-0" {...props} />
              ),
              tr: ({ node, ...props }) => (
                <tr className="even:bg-gray-50/50 hover:bg-primary/5 transition-colors" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-black text-foreground bg-accent/20 px-1" {...props} />
              ),
              img: ({ node, src, alt, ...props }) => {
                if (!src) return null;
                return (
                  <div className="my-16 relative w-full h-[400px] md:h-[600px] border-8 border-foreground rounded-xl overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                    <Image
                      src={src as string}
                      alt={alt || "Blog Image"}
                      fill
                      className="object-cover"
                      sizes="(max-w-7xl) 100vw, 800px"
                      priority={false}
                    />
                  </div>
                );
              },
            }}
          >
            {postData.content || ''}
          </ReactMarkdown>
        </div>

        {/* RELATED CONTENT - TAXILA STYLE */}
        <div className="mt-20 border-t-4 border-foreground pt-12">
          <h4 className="text-2xl font-black uppercase mb-8">Also Check Out:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {getSortedPostsData().filter(p => p.slug !== slug).slice(0, 2).map(other => (
              <Link key={other.slug} href={`/blog/${other.slug}`} className="group p-8 border-4 border-foreground bg-white hover:bg-accent transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <h5 className="text-xl font-black uppercase leading-tight group-hover:underline">{other.title}</h5>
                <span className="mt-6 text-sm font-black uppercase text-primary">Read Article →</span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA SECTION - BOLD & ACTION-ORIENTED */}
        <div className="mt-32 border-[10px] border-foreground bg-primary p-12 sm:p-20 text-center relative overflow-hidden rounded-[3rem] shadow-[24px_24px_0px_0px_rgba(0,0,0,1)]">
          <div className="absolute top-0 left-0 w-full h-4 bg-accent" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 blur-3xl rounded-full"></div>
          
          <h3 className="font-display text-4xl sm:text-7xl font-black tracking-tighter text-white mb-8 uppercase leading-none italic">
            Dominate Your <br />
            <span className="text-accent underline decoration-[12px] underline-offset-8">2026 Goals</span>
          </h3>
          <p className="text-blue-50 text-2xl md:text-3xl font-bold mb-14 max-w-3xl mx-auto leading-tight">
            Stop guessing. Get uncompromised, expert admission strategies to secure your seat in India's top B-Schools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link 
              href="/inquiry" 
              className="w-full sm:w-auto inline-flex h-24 items-center justify-center bg-white border-8 border-foreground px-12 text-2xl font-black text-foreground transition-all hover:bg-accent hover:translate-x-2 hover:-translate-y-2 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] uppercase active:shadow-none active:translate-x-0 active:translate-y-0"
            >
              Get Free Recommendations
            </Link>
            <a 
              href="https://wa.me/919560020771" 
              className="w-full sm:w-auto inline-flex h-24 items-center justify-center bg-transparent border-8 border-white px-12 text-2xl font-black text-white transition-all hover:bg-white hover:text-primary uppercase"
            >
              WhatsApp Expert
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="flex -space-x-3">
              {[1,2,3,4,5].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-foreground bg-accent shadow-sm"></div>)}
            </div>
            <p className="text-white font-black uppercase tracking-widest text-xs">Join 15,000+ Students Guided in 2025</p>
          </div>
        </div>
      </div>
    </article>
  );
}
