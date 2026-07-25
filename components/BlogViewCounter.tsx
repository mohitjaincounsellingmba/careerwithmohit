"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

interface BlogViewCounterProps {
  slug: string;
  publishDate: string;
}

// Client-side helper to calculate initial views matching the server
function getSlugHash(slug: string): number {
  return slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function calculateInitialViews(slug: string, dateStr: string): number {
  try {
    const publishedDate = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - publishedDate.getTime());
    const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    
    const hash = getSlugHash(slug);
    const variance = (hash % 11) - 5; // -5 to +5 variance
    const dailyAverage = Math.max(8, 15 + variance);
    
    const baseViews = diffDays * dailyAverage;
    const randomFactor = hash % 89;
    
    return Math.floor(baseViews + randomFactor);
  } catch (e) {
    return 120; // safe fallback
  }
}

export function BlogViewCounter({ slug, publishDate }: BlogViewCounterProps) {
  const estimated = calculateInitialViews(slug, publishDate);
  const [views, setViews] = useState<number>(estimated);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div 
      className="bg-blue-50 text-foreground px-5 py-2 text-sm font-black uppercase tracking-widest -rotate-1 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 transition-all duration-300"
      title={`${views.toLocaleString()} page views`}
    >
      <Eye className="w-5 h-5 stroke-[3] text-primary" />
      <span className={isLoaded ? "opacity-100" : "opacity-80"}>
        {views.toLocaleString()} Views
      </span>
    </div>
  );
}
