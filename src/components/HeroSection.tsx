// src/components/HeroSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import { projects } from '../data/projects.js';

const HeroSection: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animatedTextRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const heroWords = projects.map(project => project.name.toUpperCase());

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Initial delay before starting animation
    const initialTimeout = setTimeout(() => {
      // Start the word cycling
      intervalRef.current = setInterval(() => {
        if (!isAnimating) { // Only change word if not currently animating
          changeWord();
        }
      }, 4000); // Increased interval time for better readability
    }, 2000);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Remove currentWordIndex dependency to prevent interval reset

  const changeWord = () => {
    if (isAnimating) return; // Prevent overlapping animations
    
    setIsAnimating(true);

    // Start blur-out animation
    if (animatedTextRef.current) {
      animatedTextRef.current.classList.remove('blur-in');
      animatedTextRef.current.classList.add('blur-out');
    }

    // After blur-out animation completes, change word and blur-in
    setTimeout(() => {
      setCurrentWordIndex((prev) => (prev + 1) % heroWords.length);
      
      if (animatedTextRef.current) {
        animatedTextRef.current.classList.remove('blur-out');
        animatedTextRef.current.classList.add('blur-in');
      }

      // After blur-in animation completes, reset animation state
      setTimeout(() => {
        if (animatedTextRef.current) {
          animatedTextRef.current.classList.remove('blur-in');
        }
        setIsAnimating(false);
      }, 800); // Match the blur-in animation duration
    }, 600); // Increased blur-out duration for smoother transition
  };

  return (
    <main className="h-[110vh] flex items-center justify-start relative pl-[10vw]">
      <div className="text-[clamp(40px,7vw,80px)] font-medium text-[#4c4c4c] tracking-[-0.02em] text-left relative z-[2]">
        <span className="mr-[0.1em]">BYG </span>
        <span
          ref={animatedTextRef}
          className="relative inline-block min-w-[1em] transition-all duration-[800ms] ease-out"
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