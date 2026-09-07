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
    <span className="inline-flex items-baseline min-h-[1.1em]">
      <span className="text-amber-300 font-extrabold tracking-tight transition-all duration-200">
        {displayText}
      </span>
      <span className="ml-1.5 inline-block w-1.5 h-[0.8em] bg-amber-400 rounded-sm animate-pulse" />
    </span>
  );
}
