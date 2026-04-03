import { getPostData } from '@/lib/markdown';
import { Compass, Calendar, User } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function InstagramCard({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-[1080px] h-[1080px] bg-primary flex items-center justify-center p-20 overflow-hidden border-[16px] border-foreground relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 -mt-40 -mr-40 h-[600px] w-[600px] rounded-full bg-white/10" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rotate-45 bg-white/10" />
      
      <div className="bg-white w-full h-full border-[12px] border-foreground shadow-[40px_40px_0px_0px_rgba(0,0,0,1)] flex flex-col p-24 z-10">
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-6">
            <div className="bg-primary p-4 border-4 border-foreground">
              <Compass className="h-12 w-12 text-white" />
            </div>
            <span className="font-display text-4xl font-black uppercase tracking-tighter text-foreground">
              CareerWithMohit
            </span>
          </div>
          <div className="bg-accent px-6 py-2 border-4 border-foreground -rotate-2">
            <span className="font-bold text-2xl uppercase">Expert Insights</span>
          </div>
        </div>

        <div className="flex-grow flex flex-col justify-center">
          <div className="mb-10 inline-block bg-primary text-white px-6 py-2 border-4 border-foreground self-start font-bold text-2xl uppercase tracking-widest">
            Latest Blog Post
          </div>
          <h1 className="font-display text-7xl font-black tracking-tighter text-foreground leading-[1.1] mb-12 uppercase">
            {post.title}
          </h1>
          <p className="text-4xl font-bold text-gray-600 leading-relaxed line-clamp-3">
            {post.description}
          </p>
        </div>

        <div className="mt-16 pt-16 border-t-8 border-foreground flex justify-between items-end">
          <div className="space-y-4">
             <div className="flex items-center gap-4 text-3xl font-bold text-foreground">
               <Calendar className="h-10 w-10 text-primary" strokeWidth={3} />
               {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
             </div>
             <div className="flex items-center gap-4 text-3xl font-bold text-foreground">
               <User className="h-10 w-10 text-primary" strokeWidth={3} />
               By Mohit Jain
             </div>
          </div>
          <div className="bg-foreground text-white px-10 py-6 border-4 border-foreground text-4xl font-black uppercase tracking-tighter shadow-[10px_10px_0px_0px_rgba(59,130,246,1)]">
            Read More @ careerwithmohit.com
          </div>
        </div>
      </div>
    </div>
  );
}
