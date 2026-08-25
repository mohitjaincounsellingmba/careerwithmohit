"use client";

import { useEffect, useState } from "react";
import { getAssignedVariant, recordABExposure } from "@/lib/ab-testing";

interface BlogPostABHeaderProps {
  slug: string;
  defaultTitle: string;
  defaultDescription?: string;
  abTest?: {
    id: string;
    variants: Record<string, {
      title?: string;
      description?: string;
      cta_title?: string;
      cta_description?: string;
      [key: string]: any;
    }>;
  };
}

export function BlogPostABHeader({ slug, defaultTitle, defaultDescription, abTest }: BlogPostABHeaderProps) {
  const [activeVariant, setActiveVariant] = useState<string>("A");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (abTest && abTest.id) {
      const variantKeys = Object.keys(abTest.variants || { A: {}, B: {} });
      const chosen = getAssignedVariant(abTest.id, variantKeys.length ? variantKeys : ["A", "B"]);
      setActiveVariant(chosen);
      recordABExposure(abTest.id, chosen, slug);
    }
  }, [abTest, slug]);

  // Determine display values
  let displayTitle = defaultTitle;
  let displayDescription = defaultDescription;

  if (isClient && abTest && abTest.variants && abTest.variants[activeVariant]) {
    const variantData = abTest.variants[activeVariant];
    if (variantData.title) displayTitle = variantData.title;
    if (variantData.description) displayDescription = variantData.description;
  }

  return (
    <div>
      <h1 className="font-display text-5xl font-black tracking-tight text-foreground sm:text-7xl md:text-8xl mb-12 leading-[0.95] uppercase">
        {displayTitle}
      </h1>

      {displayDescription && (
        <p className="text-2xl md:text-3xl font-bold text-gray-700 leading-tight max-w-3xl border-l-[12px] border-primary pl-8 py-2">
          {displayDescription}
        </p>
      )}

      {isClient && abTest && (
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-300 rounded text-xs font-semibold text-slate-500">
          <span>⚡ A/B Test Active</span>
          <span className="bg-primary text-white px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">
            Variant {activeVariant}
          </span>
        </div>
      )}
    </div>
  );
}
