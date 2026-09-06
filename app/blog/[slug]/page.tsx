import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPostData, getSortedPostsData } from "@/lib/markdown";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Compass } from 'lucide-react';
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { InquiryCard } from "@/components/InquiryCard";
import { OnlineDegreeLeadBox } from "@/components/OnlineDegreeLeadBox";
import { AdUnit } from "@/components/AdUnit";
import { BlogViewCounter } from "@/components/BlogViewCounter";
import { BlogPostABHeader } from "@/components/BlogPostABHeader";


function cleanMarkdown(text: string | undefined): string {
  if (!text) return "";
  return text
    // Replace markdown links: [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove other formatting characters
    .replace(/[*_#`~]/g, '')
    .trim();
}

function detectGeoFocus(title: string, content: string, keywords: string[]): { isDelhiNcr: boolean; specificLocation?: string } {
  const text = `${title} ${content} ${keywords.join(" ")}`.toLowerCase();
  
  if (text.includes("greater noida") || text.includes("noida")) {
    return { isDelhiNcr: true, specificLocation: "Noida, Greater Noida, Delhi NCR" };
  }
  if (text.includes("gurgaon") || text.includes("gurugram")) {
    return { isDelhiNcr: true, specificLocation: "Gurgaon, Delhi NCR" };
  }
  if (text.includes("ghaziabad")) {
    return { isDelhiNcr: true, specificLocation: "Ghaziabad, Delhi NCR" };
  }
  if (text.includes("faridabad")) {
    return { isDelhiNcr: true, specificLocation: "Faridabad, Delhi NCR" };
  }
  if (
    text.includes("delhi") || 
    text.includes("ncr") || 
    text.includes("ggsipu") || 
    text.includes("ipu") || 
    text.includes("janakpuri") || 
    text.includes("kalkaji") || 
    text.includes("rohini") || 
    text.includes("vips")
  ) {
    return { isDelhiNcr: true, specificLocation: "Delhi NCR" };
  }
  
  return { isDelhiNcr: false };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const postData = getPostData(slug);

  if (!postData) return {};

  const cleanedTitle = cleanMarkdown(postData.title);
  const postTitle = cleanedTitle.length > 50 ? cleanedTitle.slice(0, 58) : `${cleanedTitle} | Expert Guide 2027`;
  
  // Fallback description from content if frontmatter description is missing
  let postDescription = postData.description ? cleanMarkdown(postData.description) : "";
  if (!postDescription && postData.content) {
    postDescription = cleanMarkdown(postData.content.substring(0, 160)) + "...";
  }
  postDescription = postDescription || `Expert analysis on ${cleanedTitle}. Detailed insights, placements 2025, and admission strategy for 2027 by Mohit Jain.`;
  
  const postUrl = `https://www.careerwithmohit.online/blog/${slug}`;
  const cleanedKeywords = (postData.keywords || []).map(kw => cleanMarkdown(kw));

  // Dynamic OG image: ensure absolute URL
  let ogImageUrl = postData.image || "https://www.careerwithmohit.online/og-image.webp";
  if (ogImageUrl.startsWith("/")) {
    ogImageUrl = `https://www.careerwithmohit.online${ogImageUrl}`;
  }

  const geoResult = detectGeoFocus(postData.title || "", postData.content || "", postData.keywords || []);
  const localKeywords = geoResult.isDelhiNcr && geoResult.specificLocation
    ? [
        `${geoResult.specificLocation} Colleges`,
        `Best Colleges in ${geoResult.specificLocation}`,
        `${geoResult.specificLocation} Admissions 2027`,
        `Direct Admission in ${geoResult.specificLocation}`,
        `Top Colleges in ${geoResult.specificLocation}`,
        "Delhi NCR College Counselling"
      ]
    : [];

  return {
    title: postTitle,
    description: postDescription,
    keywords: [...cleanedKeywords, ...localKeywords, "MBA Admissions 2027", "Direct MBA Admission", "Placement Report 2025", "Career Counselling India", "Mohit Jain"],
    openGraph: {
      title: postTitle,
      description: postDescription,
      type: "article",
      publishedTime: postData.date,
      modifiedTime: postData.date,
      authors: ["Mohit Jain"],
      url: postUrl,
      siteName: "CareerWithMohit",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: cleanedTitle,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: postTitle,
      description: postDescription,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
    other: {
      "citation_title": cleanedTitle,
      "citation_author": "Mohit Jain",
      "citation_publication_date": postData.date,
      "citation_online_date": postData.date,
      "citation_publisher": "CareerWithMohit",
      "ai-content-declaration": "human-authored-expert-guidance"
    }
  };
}

export const dynamicParams = false;

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

  const cleanedTitle = cleanMarkdown(postData.title);
  const articleImage = postData.image 
    ? (postData.image.startsWith('http') ? postData.image : `https://www.careerwithmohit.online${postData.image}`)
    : `https://www.careerwithmohit.online/og-image.webp`;

  const geoResult = detectGeoFocus(postData.title || "", postData.content || "", postData.keywords || []);

  const articleData: any = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": cleanedTitle,
    "description": cleanMarkdown(postData.description || postData.content?.substring(0, 160)),
    "image": articleImage,
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
    "inLanguage": "en-IN",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "header p", ".prose p:first-of-type"]
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.careerwithmohit.online/blog/${slug}`
    }
  };

  if (geoResult.isDelhiNcr) {
    articleData.contentLocation = {
      "@type": "Place",
      "name": geoResult.specificLocation || "Delhi NCR, India"
    };
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.careerwithmohit.online/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.careerwithmohit.online/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": cleanedTitle,
        "item": `https://www.careerwithmohit.online/blog/${slug}`
      }
    ]
  };

  const faqData = postData.faqs && postData.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": postData.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const isMockTest = slug.includes('mock-test') || slug.includes('mock') || (postData.title || '').toLowerCase().includes('mock test');
  const quizSchema = isMockTest ? {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": cleanedTitle,
    "description": cleanMarkdown(postData.description || postData.content?.substring(0, 160)),
    "educationalAlignment": [
      {
        "@type": "AlignmentObject",
        "alignmentType": "educationalSubject",
        "targetName": postData.category || "Competitive Exam Preparation"
      }
    ],
    "about": {
      "@type": "Thing",
      "name": `${cleanedTitle} Online Test`
    },
    "hasPart": (postData.faqs || []).map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <article className="w-full bg-slate-50 pb-24 font-body">
      {postData.ab_test?.id && (
        <meta name="cwm-ab-experiment" content={postData.ab_test.id} />
      )}
      <JsonLd data={articleData} />
      <JsonLd data={breadcrumbSchema} />
      {faqData && <JsonLd data={faqData} />}
      {quizSchema && <JsonLd data={quizSchema} />}

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
              <Link
                href={`/blog/?category=${encodeURIComponent(postData.category || 'General & Career Guide')}`}
                className="bg-primary hover:bg-secondary text-white px-5 py-2 text-sm font-black uppercase tracking-widest rotate-1 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 inline-block"
              >
                {postData.category || 'General & Career Guide'}
              </Link>
              <div className="bg-accent text-foreground px-5 py-2 text-sm font-black uppercase tracking-widest rotate-1 border-4 border-foreground">
                Expert Analysis
              </div>
              <BlogViewCounter slug={slug} publishDate={postData.date} />
            </div>

            <BlogPostABHeader
              slug={slug}
              defaultTitle={cleanedTitle}
              defaultDescription={postData.description ? cleanMarkdown(postData.description) : undefined}
              abTest={postData.ab_test}
            />
          </header>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 sm:px-12 mt-20 pb-20">
        {postData.image && (
          <div className="mb-16 relative w-full h-[400px] md:h-[500px] border-8 border-foreground rounded-xl overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <Image
              src={postData.image}
              alt={cleanedTitle}
              fill
              className="object-cover"
              sizes="(max-w-7xl) 100vw, 800px"
              priority
            />
          </div>
        )}
        <div className="prose prose-xl prose-slate max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h2: ({ node, ...props }) => (
                <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-foreground mt-24 mb-10 border-b-8 border-foreground pb-6" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-primary mt-16 mb-8 border-l-8 border-primary pl-6" {...props} />
              ),
              p: ({ node, children, ...props }) => {
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
                if (content.startsWith('[MockTestCard') && content.endsWith(']')) {
                  const titleMatch = content.match(/title="([^"]*)"/);
                  const linkMatch = content.match(/link="([^"]*)"/);
                  const qMatch = content.match(/questions="([^"]*)"/);
                  const timeMatch = content.match(/time="([^"]*)"/);

                  const cardTitle = titleMatch?.[1] || "Start Free Mock Test";
                  const cardLink = linkMatch?.[1] || "/mock-tests";
                  const cardQuestions = qMatch?.[1] || "Full Length";
                  const cardTime = timeMatch?.[1] || "Timed";

                  return (
                    <div className="my-12 p-8 border-4 border-foreground bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-2xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="bg-white text-foreground px-3 py-0.5 text-xs font-black uppercase rounded border-2 border-foreground">100% Free</span>
                            <span className="bg-accent text-foreground px-3 py-0.5 text-xs font-black uppercase rounded border-2 border-foreground">CBT Simulation</span>
                          </div>
                          <h3 className="font-display text-2xl md:text-3xl font-black uppercase text-white leading-tight mb-2">
                            {cardTitle}
                          </h3>
                          <p className="text-amber-100 font-bold text-sm">
                            ⚡ {cardQuestions} Questions • ⏳ {cardTime} • 🎯 Instant Percentile & Detailed Step-by-Step Solutions
                          </p>
                        </div>
                        <Link
                          href={cardLink}
                          className="w-full md:w-auto inline-flex items-center justify-center bg-white text-foreground border-4 border-foreground px-8 py-4 text-lg font-black uppercase transition-transform hover:-translate-y-1 hover:bg-accent shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none whitespace-nowrap"
                        >
                          Launch Free Test Now &rarr;
                        </Link>
                      </div>
                    </div>
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
              blockquote: ({ node, children, ...props }) => {
                const contentStr = React.Children.toArray(children)
                  .map(child => (typeof child === 'string' ? child : JSON.stringify(child)))
                  .join(' ');
                const isKeyTakeaway = /key takeaways|ai answer summary|direct ai answer|quick takeaways|💡|🤖/i.test(contentStr);

                if (isKeyTakeaway) {
                  return (
                    <blockquote className="my-10 bg-slate-900 text-slate-100 border-4 border-amber-400 p-6 md:p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden not-italic" {...props}>
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400 mb-4 bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/30 w-fit">
                        <span>🤖 Direct AI Answer Summary (ChatGPT & Gemini Optimized)</span>
                      </div>
                      <div className="relative z-10 text-base md:text-lg font-medium leading-relaxed text-slate-200 space-y-2 [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:text-slate-100 [&_strong]:text-amber-300 [&_strong]:bg-transparent">
                        {children}
                      </div>
                    </blockquote>
                  );
                }

                return (
                  <blockquote className="my-16 bg-blue-50 border-l-[12px] border-primary p-12 relative overflow-hidden not-italic" {...props}>
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Compass className="w-32 h-32 text-primary" />
                    </div>
                    <div className="relative z-10 text-2xl font-black text-primary leading-tight">
                      {children}
                    </div>
                  </blockquote>
                );
              },
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
              a: ({ node, href, children, ...props }) => {
                let targetHref = href || '#';
                if (targetHref.startsWith('/posts/')) {
                  targetHref = targetHref.replace(/^\/posts\//, '/blog/');
                }
                if (targetHref.endsWith('.md')) {
                  targetHref = targetHref.slice(0, -3);
                }
                const isInternal = targetHref.startsWith('/') || targetHref.startsWith('https://www.careerwithmohit.online');
                if (isInternal) {
                  return (
                    <Link href={targetHref} className="text-primary font-bold underline hover:text-secondary transition-colors" {...props}>
                      {children}
                    </Link>
                  );
                }
                return (
                  <a href={targetHref} target="_blank" rel="noopener noreferrer" className="text-primary font-bold underline hover:text-secondary transition-colors" {...props}>
                    {children}
                  </a>
                );
              },
              img: ({ node, src, alt, ...props }) => {
                if (!src) return null;
                const srcString = src as string;

                // Detect if this is a logo/icon (usually from google, unavatar, logo.dev etc)
                const isIcon = srcString.includes('favicon') || 
                              srcString.includes('logo') || 
                              srcString.includes('unavatar') || 
                              srcString.includes('icon') ||
                              srcString.includes('gstatic');

                if (isIcon) {
                   return <img 
                    src={srcString} 
                    alt={alt || "Logo"} 
                    className="inline-block" 
                    loading="lazy"
                    decoding="async"
                    style={{ height: 'auto', maxWidth: '100%', borderRadius: '8px' }} 
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    {...props} 
                  />;
                }

                return (
                  <div className="my-12 relative w-full border-4 border-foreground rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-slate-100">
                    <img
                      src={srcString}
                      alt={alt || "Blog visual illustration"}
                      className="w-full h-auto max-h-[550px] object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const parent = (e.target as HTMLElement).parentElement;
                        if (parent) parent.style.display = 'none';
                      }}
                      {...props}
                    />
                  </div>
                );
              },
            }}
          >
            {postData.content || ''}
          </ReactMarkdown>
        </div>

        {/* HIGH CONVERTING ONLINE DEGREE & ALL BLOGS LEAD GENERATION FORM */}
        <OnlineDegreeLeadBox courseName={cleanedTitle} />

        {/* Display Ad unit under the blog article */}
        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_POST || "9876543210"} />

        {/* RELATED CONTENT IN SAME CATEGORY */}
        <div className="mt-20 border-t-4 border-foreground pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h4 className="text-2xl font-black uppercase">
              More in <span className="bg-accent px-2 py-0.5 rounded border-2 border-foreground">{postData.category || 'General & Career Guide'}</span>:
            </h4>
            <Link
              href={`/blog/?category=${encodeURIComponent(postData.category || 'General & Career Guide')}`}
              className="inline-flex items-center gap-1.5 text-sm font-black uppercase tracking-wider text-primary hover:underline"
            >
              <span>View All {postData.category} Posts</span>
              <span>&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(() => {
              const allPosts = getSortedPostsData().filter(p => p.slug !== slug);
              const sameCat = allPosts.filter(p => (p.category || 'General & Career Guide') === (postData.category || 'General & Career Guide'));
              const displayPosts = sameCat.length >= 2 ? sameCat.slice(0, 2) : allPosts.slice(0, 2);

              return displayPosts.map(other => (
                <Link key={other.slug} href={`/blog/${other.slug}`} className="group p-8 border-4 border-foreground bg-white hover:bg-accent transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded bg-secondary text-white text-xs font-black uppercase mb-4 border border-foreground">
                      {other.category || 'General & Career Guide'}
                    </span>
                    <h5 className="text-xl font-black uppercase leading-tight group-hover:underline">{other.title}</h5>
                  </div>
                  <span className="mt-6 text-sm font-black uppercase text-primary group-hover:text-foreground">Read Article &rarr;</span>
                </Link>
              ));
            })()}
          </div>
        </div>

        {/* CTA SECTION - BOLD & ACTION-ORIENTED */}
        <div className="mt-32 border-[10px] border-foreground bg-primary p-12 sm:p-20 text-center relative overflow-hidden rounded-[3rem] shadow-[24px_24px_0px_0px_rgba(0,0,0,1)]">
          <div className="absolute top-0 left-0 w-full h-4 bg-accent" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 blur-3xl rounded-full"></div>

          <h3 className="font-display text-4xl sm:text-7xl font-black tracking-tighter text-white mb-8 uppercase leading-none italic">
            Dominate Your <br />
            <span className="text-accent underline decoration-[12px] underline-offset-8">2027 Goals</span>
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
              {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-foreground bg-accent shadow-sm"></div>)}
            </div>
            <p className="text-white font-black uppercase tracking-widest text-xs">Join 15,000+ Students Guided in 2025</p>
          </div>
        </div>
      </div>
    </article>
  );
}
