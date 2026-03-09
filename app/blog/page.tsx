import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';

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
        <div className="mb-20 md:flex md:items-end md:justify-between border-b-8 border-foreground pb-8">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl font-extrabold tracking-tighter text-foreground sm:text-7xl uppercase">
              Our <span className="bg-primary text-white px-2 py-1 inline-block -rotate-2 border-4 border-foreground">Blog</span>
            </h1>
            <p className="mt-6 text-2xl font-medium text-gray-600 leading-relaxed">
              Uncompromised insights, guidance, and the latest updates to help you navigate your academic and professional journey.
            </p>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          {allPostsData.map(({ slug, title, date, description }) => (
            <Link 
              key={slug} 
              href={`/blog/${slug}`} 
              className="group flex flex-col rounded-xl border-4 border-foreground bg-white p-8 transition-all duration-200 hover:scale-[1.02] hover:-translate-y-2 hover:bg-gray-50 h-full"
            >
              <div className="mb-6 inline-block rounded-full bg-accent px-4 py-1 text-sm font-bold uppercase tracking-widest text-foreground border-2 border-foreground self-start">
                {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <h3 className="font-display text-3xl font-bold tracking-tight text-foreground mb-5 group-hover:text-primary transition-colors line-clamp-3 leading-tight">
                {title}
              </h3>
              {description && (
                <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8 line-clamp-3">
                  {description}
                </p>
              )}
              <div className="mt-auto flex items-center font-bold text-primary group-hover:text-foreground text-lg transition-colors">
                Read Article 
                <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-2">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
