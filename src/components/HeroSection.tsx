// src/components/HeroSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import { projects } from '../data/projects.js';

const HeroSection: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animatedTextRef = useRef<HTMLSpanElement>(null);
  
  const heroWords = projects.map(project => project.name.toUpperCase());

  useEffect(() => {
    // Initial delay before starting animation
    const initialTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        changeWord();
      }, 3000);

      return () => clearInterval(interval);
    }, 2000);

    return () => clearTimeout(initialTimeout);
  }, [currentWordIndex]);

  const changeWord = () => {
    setIsAnimating(true);

    // After blur-out animation completes
    setTimeout(() => {
      setCurrentWordIndex((prev) => (prev + 1) % heroWords.length);
      setIsAnimating(false);
    }, 400);
  };

  return (
    <main className="h-[110vh] flex items-center justify-start relative pl-[10vw]">
      <div className="text-[clamp(40px,7vw,80px)] font-medium text-[#4c4c4c] tracking-[-0.02em] text-left relative z-[2]">
        <span className="mr-[0.1em]">BYG</span>
        <span
          ref={animatedTextRef}
          className={`
            relative inline-block min-w-[1em] transition-all duration-[800ms] ease-out
            ${isAnimating ? 'blur-out' : 'blur-in'}
          `}
          id="animatedText"
        >
          {heroWords[currentWordIndex]}
        </span>
        <div className="block text-[0.15em] font-semibold text-gray-500 mt-[0.4em] tracking-[0.18em] uppercase">
          Official Partners With EMAAR® Oceanfront & HMR® Waterfront
        </div>
      </div>
    </main>
  );
};

export default HeroSection;