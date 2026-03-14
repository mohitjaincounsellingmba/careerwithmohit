import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';
import { BlogList } from '@/components/BlogList';

export const metadata = {
  title: 'Blog | CareerWithMohit',
  description: 'Read latest career insights, MBA admission updates, and professional growth strategies from expert counsellor Mohit Jain. Uncompromised guidance for students.',
  keywords: ['MBA blog', 'career counselling blog', 'MBA admission tips', 'PGDM admission guide', 'career guidance articles', 'B-school insights', 'Mohit Jain blog'],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | CareerWithMohit',
    description: 'Read latest career insights, MBA admission updates, and professional growth strategies.',
    type: 'website',
  },
};

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="w-full bg-muted min-h-screen px-6 py-24 sm:px-12 sm:py-32 border-t-8 border-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 md:flex md:items-end md:justify-between border-b-8 border-foreground pb-8 text-center md:text-left">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl font-extrabold tracking-tighter text-foreground sm:text-7xl uppercase flex flex-col sm:flex-row items-center sm:items-end gap-4 justify-center md:justify-start">
              Our <span className="bg-primary text-white px-2 py-1 inline-block -rotate-2 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Blog</span>
              <span className="text-2xl sm:text-3xl font-black bg-accent text-foreground px-4 py-1 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase tracking-tighter">
                {allPostsData.length} Posts
              </span>
            </h1>
            <p className="mt-8 text-2xl font-bold text-gray-600 leading-relaxed italic">
              "Providing Uncompromised Insights & Guidance for Your Academic Excellence."
            </p>
          </div>
        </div>

        <BlogList initialPosts={allPostsData} />
      </div>
    </div>
  );
}
