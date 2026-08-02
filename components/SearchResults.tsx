"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { PostData } from "@/lib/blog-categories";

export function SearchResults({ posts }: { posts: PostData[] }) {
  const query = useSearchParams().get("q") || "";
  const normalized = query.trim().toLowerCase();
  const results = normalized ? posts.filter((post) => `${post.title} ${post.description || ""}`.toLowerCase().includes(normalized)) : [];

  return (
    <main className="min-h-screen border-t-8 border-foreground bg-muted px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <header className="mb-16 border-b-8 border-foreground pb-8"><h1 className="font-display text-5xl font-extrabold uppercase tracking-tighter sm:text-7xl">Search <span className="mt-4 inline-block border-4 border-foreground bg-primary px-3 py-1 text-white">Results</span></h1><p className="mt-8 text-xl text-gray-600">{normalized ? `Found ${results.length} result${results.length === 1 ? "" : "s"} for “${query}”` : "Please enter a search term above."}</p></header>
        {results.length > 0 ? <div className="grid gap-8 lg:grid-cols-3">{results.map((post) => <Link key={post.slug} href={`/blog/${post.slug}`} className="flex min-h-64 flex-col border-4 border-foreground bg-white p-7 shadow-[6px_6px_0_0_rgb(59,130,246)] hover:-translate-y-1"><span className="w-fit border-2 border-foreground bg-accent px-3 py-1 text-xs font-bold uppercase">{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span><h2 className="mt-5 text-2xl font-black leading-tight">{post.title}</h2>{post.description && <p className="mt-4 line-clamp-3 text-gray-600">{post.description}</p>}<span className="mt-auto pt-6 font-bold text-primary">Read Article →</span></Link>)}</div> : normalized ? <div className="border-4 border-foreground bg-white p-12 text-center"><h2 className="text-2xl font-black">No matching articles found</h2><Link href="/blog" className="mt-6 inline-block font-bold text-primary">Browse all articles</Link></div> : null}
      </div>
    </main>
  );
}
