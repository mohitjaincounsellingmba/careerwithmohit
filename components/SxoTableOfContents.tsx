"use client";

import React, { useState, useEffect } from "react";
import { ListOrdered, ChevronDown, ChevronUp, Hash, ArrowUpRight } from "lucide-react";

export interface TocHeading {
  title: string;
  id: string;
  level?: number;
}

interface SxoTableOfContentsProps {
  headings: TocHeading[];
}

export function SxoTableOfContents({ headings }: SxoTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  if (!headings || headings.length === 0) {
    return null;
  }

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // offset for sticky navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <nav
      aria-label="Table of Contents (Quick Navigation)"
      className="sxo-toc not-prose my-10 rounded-2xl border-4 border-foreground bg-white p-5 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
    >
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 text-left text-lg sm:text-xl font-black text-foreground uppercase tracking-tight hover:text-primary transition-colors cursor-pointer w-full"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-400 border-2 border-foreground text-slate-950 shrink-0">
            <ListOrdered className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span>Table of Contents (Jump to Section)</span>
          <span className="text-xs font-bold text-slate-500 normal-case ml-1 hidden sm:inline">
            ({headings.length} sections)
          </span>
          <div className="ml-auto p-1 text-slate-600 hover:text-foreground">
            {isOpen ? <ChevronUp className="w-5 h-5 stroke-[2.5]" /> : <ChevronDown className="w-5 h-5 stroke-[2.5]" />}
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="mt-5 pt-4 border-t-2 border-slate-100">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm sm:text-base font-bold">
            {headings.map((heading, idx) => {
              const isActive = activeId === heading.id;
              return (
                <li key={idx} className="min-w-0">
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => handleScrollTo(e, heading.id)}
                    className={`group flex items-start gap-2 p-2 rounded-lg transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary border-l-4 border-primary pl-2.5 font-black"
                        : "text-slate-700 hover:text-primary hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-xs font-black text-slate-400 group-hover:text-primary mt-1 shrink-0">
                      {idx + 1}.
                    </span>
                    <span className="truncate leading-snug group-hover:underline">
                      {heading.title}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
