"use client";

import { useState, useEffect } from "react";

const disciplines = ["MBA", "BTECH", "BBA", "BCA", "LAW", "DESIGN"];

export function DynamicHeroText() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = disciplines[index];
      
      if (isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        setSpeed(75);
      } else {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        setSpeed(150);
      }

      if (!isDeleting && displayText === currentWord) {
        // Pause at the end of the word
        setSpeed(2000);
        setIsDeleting(true);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % disciplines.length);
        setSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, speed]);

  return (
    <span className="inline-flex items-baseline">
      <span className="text-white transition-all duration-300">
        {displayText}
      </span>
      <span className="ml-2 inline-block w-2 h-[0.8em] bg-accent animate-[blink_1s_infinite] shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
