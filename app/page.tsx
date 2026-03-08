import Link from "next/link";
import { getSortedPostsData } from "@/lib/markdown";

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 sm:px-12 max-w-[90rem] mx-auto">
      <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12 border-b-8 border-foreground pb-8">
        <div>
          <h1 className="text-6xl sm:text-8xl md:text-[9rem] xl:text-[11rem] font-display font-black uppercase leading-[0.85] tracking-tighter">
            Web<br />Aesthetics
          </h1>
          <p className="mt-8 text-xl sm:text-2xl max-w-2xl font-bold text-foreground/80 leading-snug">
            Exploring brutalist editorial design, typography as art, and the end of the homogenized internet.
          </p>
        </div>
        <div className="text-accent font-black text-2xl sm:text-5xl uppercase tracking-widest mb-2 md:mb-6">
          Vol. 1
        </div>
      </header>

      <main>
        <section>
          <h2 className="text-3xl font-display font-black uppercase tracking-tighter mb-16 flex items-center gap-6">
            <span className="w-16 h-2 bg-accent inline-block"></span>
            Latest Entries
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {allPostsData.map(({ slug, title, date, description }) => (
              <article key={slug} className="group flex flex-col items-start border-t-4 border-foreground pt-6 relative">
                {/* Decorative element marking article start */}
                <div className="absolute top-0 right-0 w-4 h-4 bg-accent -translate-y-full translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <p className="text-sm font-black uppercase tracking-widest text-foreground/50 mb-4 bg-foreground/5 px-2 py-1 rounded-sm">{date}</p>
                <Link href={`/blog/${slug}`} className="block w-full">
                  <h3 className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-[-0.04em] leading-[1.1] mb-6 group-hover:text-accent group-hover:-translate-y-1 transition-all duration-300">
                    {title}
                  </h3>
                </Link>
                {description && (
                  <p className="text-foreground/90 text-lg leading-relaxed mb-8 font-medium">
                    {description}
                  </p>
                )}
                <Link 
                  href={`/blog/${slug}`} 
                  className="mt-auto text-lg font-black uppercase tracking-widest flex items-center gap-3 text-accent group-hover:gap-6 bg-accent/10 px-4 py-2 hover:bg-accent hover:text-background transition-all"
                >
                  Read Post <span>&rarr;</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
