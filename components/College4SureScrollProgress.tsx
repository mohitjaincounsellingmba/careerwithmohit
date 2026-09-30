"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function College4SureScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let queued = false;

    const onScroll = () => {
      if (queued) return;
      queued = true;

      requestAnimationFrame(() => {
        queued = false;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        const progress = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
        setScrollProgress(progress);
        setShowBackToTop(currentScroll > 450);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top Gradient Scroll Progress Bar */}
      <div
        id="prog"
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-[3.5px] z-[120] bg-gradient-to-r from-[#2563EB] via-[#0EA5E9] via-[#F59E0B] to-[#10B981] transition-all duration-75 pointer-events-none"
      />

      {/* Floating Back to Top Button */}
      <button
        id="top"
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed right-5 bottom-5 w-12 h-12 rounded-full bg-[#2563EB] text-white flex items-center justify-center z-[90] shadow-[0_14px_30px_-12px_rgba(37,99,235,0.8)] transition-all duration-300 cursor-pointer ${
          showBackToTop
            ? "opacity-100 translate-y-0 pointer-events-auto hover:bg-[#F59E0B] hover:text-[#061124] hover:-translate-y-1 hover:rotate-[-8deg]"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp className="w-5 h-5 stroke-[2.5]" />
      </button>
    </>
  );
}
