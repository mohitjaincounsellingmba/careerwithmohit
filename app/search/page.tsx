import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';

export const metadata = {
  title: 'Search Results | CareerWithMohit',
  description: 'Find specific career advice and admission insights on CareerWithMohit. Search our database of expert articles and guidance by Mohit Jain.',
  alternates: {
    canonical: '/search',
  },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { q } = await searchParams;
  const query = typeof q === 'string' ? q : '';
  
  const allPostsData = getSortedPostsData();
  
  // Filter posts based on query
  const searchResults = query ? allPostsData.filter(post => {
    const searchContent = `${post.title} ${post.description || ''}`.toLowerCase();
    return searchContent.includes(query.toLowerCase());
  }) : [];

  return (
    <div className="w-full bg-muted min-h-screen px-6 py-24 sm:px-12 sm:py-32 border-t-8 border-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 md:flex md:items-end md:justify-between border-b-8 border-foreground pb-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl font-extrabold tracking-tighter text-foreground sm:text-7xl uppercase">
              Search <span className="bg-primary text-white px-3 py-1 inline-block mt-4 -rotate-1 border-4 border-foreground">Results</span>
            </h1>
            <p className="mt-8 text-2xl font-medium text-gray-600 leading-relaxed">
              {query 
                ? `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'} for "${query}"`
                : "Please enter a search term above."}
            </p>
          </div>
        </div>
        
        {searchResults.length > 0 ? (
          <div className="grid gap-10 lg:grid-cols-3">
            {searchResults.map(({ slug, title, date, description }) => (
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
        ) : query ? (
          <div className="rounded-xl border-4 border-foreground bg-white p-12 text-center max-w-3xl mx-auto">
            <h3 className="font-display text-3xl font-bold text-foreground mb-4">No matching articles found</h3>
            <p className="text-xl text-gray-600">Try adjusting your search terms or browse our blog index instead.</p>
            <Link href="/blog" className="mt-8 inline-flex h-12 items-center justify-center bg-primary border-4 border-foreground px-8 py-2 text-lg font-bold text-white transition-all hover:bg-blue-600">
              Browse All Articles
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
