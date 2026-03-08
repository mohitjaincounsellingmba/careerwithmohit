import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-12 sm:py-24">
      <section className="mb-20 space-y-8 text-center max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance leading-tight">
          Navigate Your Career with <span className="text-accent italic">Clarity</span>
        </h1>
        <p className="text-lg leading-relaxed text-foreground/70 sm:text-xl text-balance">
          Expert career counselling, interview preparation, and resume building strategies to help you achieve your professional goals.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/contact" className="w-full sm:w-auto rounded-md bg-accent px-8 py-3.5 text-sm font-medium text-white shadow transition-colors hover:bg-accent/90">
            Book a Free Consultation
          </Link>
          <Link href="#articles" className="w-full sm:w-auto rounded-md bg-surface px-8 py-3.5 text-sm font-medium text-foreground border border-border-subtle shadow-sm transition-colors hover:bg-foreground/5">
            Read Our Advice
          </Link>
        </div>
      </section>

      <section id="articles" className="mt-24">
        <div className="flex items-center justify-between mb-12 border-b border-border-subtle pb-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Latest Articles
          </h2>
          <Link href="/blog" className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
            View all &rarr;
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allPostsData.map(({ slug, title, date, description }) => (
            <Link key={slug} href={`/blog/${slug}`} className="group flex flex-col rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm transition-all hover:shadow-md hover:border-accent/30 h-full">
              <time className="text-xs font-medium uppercase tracking-wider text-foreground/50 mb-4 block">
                {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-3">
                {title}
              </h3>
              {description && (
                <p className="text-foreground/70 text-sm leading-relaxed mb-6 line-clamp-3">
                  {description}
                </p>
              )}
              <span className="mt-auto text-sm font-medium text-accent group-hover:text-accent/80 flex items-center gap-1">
                Read article <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
