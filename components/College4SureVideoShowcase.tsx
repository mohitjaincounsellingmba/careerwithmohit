"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  category: string;
  youtubeId: string;
  thumbnail: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: "v1",
    title: "The 10-10-10-10 Rule: Crack CAT Quant with High Accuracy",
    category: "CAT 2026 Strategy",
    youtubeId: "7fSYn0Mixws",
    thumbnail: "https://img.youtube.com/vi/7fSYn0Mixws/hqdefault.jpg",
  },
  {
    id: "v2",
    title: "How to Shortlist Safe, Target & Dream MBA Colleges for 2027",
    category: "B-School Selection",
    youtubeId: "tK_Rsn4nQH4",
    thumbnail: "https://img.youtube.com/vi/tK_Rsn4nQH4/hqdefault.jpg",
  },
  {
    id: "v3",
    title: "GD-PI-WAT Secret Tactics: How Top B-Schools Evaluate Candidates",
    category: "Interview Mentorship",
    youtubeId: "7eoPS2AqLUk",
    thumbnail: "https://img.youtube.com/vi/7eoPS2AqLUk/hqdefault.jpg",
  },
];

export function College4SureVideoShowcase() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#061124]/10">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#2563EB] flex items-center gap-2 mb-2">
              <span className="w-5 h-0.5 rounded-full bg-[#2563EB]" />
              In their words
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#061124] tracking-tight">
              Strategy, cut-offs &amp; mentorship
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-700 max-w-2xl">
              Short strategy sessions and masterclasses from Mohit Jain and senior admissions mentors.
            </p>
          </div>
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#2563EB] text-[#061124] hover:text-white border border-[#061124]/15 font-bold text-sm transition-all shadow-sm group self-start sm:self-auto"
          >
            <span>Read all admissions guides</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {VIDEOS.map((vid) => (
            <article
              key={vid.id}
              className="group rounded-[28px] bg-white border-[1.5px] border-[#061124]/10 overflow-hidden shadow-[0_18px_44px_-22px_rgba(6,17,36,0.15)] hover:shadow-[0_34px_70px_-30px_rgba(37,99,235,0.25)] hover:-translate-y-2 transition-all duration-300"
            >
              {activeVideoId === vid.id ? (
                <div className="aspect-[16/9] w-full bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${vid.youtubeId}?autoplay=1&rel=0`}
                    title={vid.title}
                    allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveVideoId(vid.id)}
                  className="relative aspect-[16/9] w-full overflow-hidden block bg-gradient-to-br from-[#2563EB] to-[#0EA5E9] text-left cursor-pointer"
                  aria-label={`Play video: ${vid.title}`}
                >
                  <img
                    src={vid.thumbnail}
                    alt={`${vid.title} video thumbnail`}
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      // Fallback to official youtube thumbnail if unsplash fails
                      const target = e.currentTarget as HTMLImageElement;
                      if (!target.src.includes('img.youtube.com')) {
                        target.src = `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`;
                      }
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061124]/85 via-transparent to-transparent" />

                  {/* Play Button with Pulsing Ripple */}
                  <span className="play-ripple absolute inset-0 m-auto w-14 h-14 rounded-full bg-white text-[#2563EB] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-115">
                    <Play className="w-6 h-6 fill-[#2563EB] translate-x-0.5" />
                  </span>

                  <span className="absolute bottom-3 left-3.5 z-10 font-mono text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#061124]/80 text-white backdrop-blur-sm border border-white/20">
                    {vid.category}
                  </span>
                </button>
              )}

              <div className="p-5 sm:p-6">
                <h3 className="font-display font-extrabold text-base sm:text-lg text-[#061124] group-hover:text-[#2563EB] transition-colors leading-snug line-clamp-2">
                  {vid.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
