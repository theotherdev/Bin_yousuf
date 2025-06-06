// src/components/HeroSection.tsx
import React, { useEffect, useRef } from 'react';
import { projects } from '../data/projects.js';

const HeroSection: React.FC = () => {
  const animatedTextRef = useRef<HTMLSpanElement>(null);
  
  const heroWords = projects.map(project => project.name.toUpperCase());
  let currentIndex = 0;

  const changeWord = () => {
    if (!animatedTextRef.current) return;
    
    const animatedText = animatedTextRef.current;
    
    // Start blur-out animation
    animatedText.classList.add("blur-out");

    setTimeout(() => {
      // Change the word
      currentIndex = (currentIndex + 1) % heroWords.length;
      animatedText.textContent = heroWords[currentIndex];
      
      // Remove blur-out and add blur-in
      animatedText.classList.remove("blur-out");
      animatedText.classList.add("blur-in");

      setTimeout(() => {
        // Remove blur-in class after animation completes
        animatedText.classList.remove("blur-in");
      }, 800); // Duration matches the blur-in animation
    }, 400); // Duration matches the blur-out animation
  };

  useEffect(() => {
    // Set initial word
    if (animatedTextRef.current && heroWords.length > 0) {
      animatedTextRef.current.textContent = heroWords[0];
    }

    // Start the animation cycle after initial delay
    const initialTimeout = setTimeout(() => {
      const interval = setInterval(changeWord, 3000); // Change word every 3 seconds
      
      // Cleanup function
      return () => clearInterval(interval);
    }, 2000); // Initial delay of 2 seconds

    // Cleanup timeout on unmount
    return () => clearTimeout(initialTimeout);
  }, []);

  return (
    <main className="h-[110vh] flex items-center justify-start relative pl-[10vw]">
      <div className="text-[clamp(24px,7vw,80px)] font-medium text-[#4c4c4c] tracking-[-0.02em] text-left relative z-[2]">
        <span className="mr-[0.1em]">BYG </span>
        <span
          ref={animatedTextRef}
          className="relative inline-block min-w-[1em] transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          id="animatedText"
        >
          {heroWords[0] || 'PANORAMA'}
        </span>
        <div 
          className="block text-gray-500 mt-[0.4em] tracking-[0.18em] uppercase font-semibold leading-tight w-full sm:w-auto"
          style={{ 
            marginLeft: '0.4em',
            fontSize: 'clamp(6px, 1vw, 18px)', // Responsive font size for mobile
            maxWidth: '80vw' // On mobile, max width is 80% of viewport width
          }}
        >
          Official Partners With EMAAR® Oceanfront & HMR® Waterfront
        </div>
      </div>
    </main>
  );
};

export default HeroSection;