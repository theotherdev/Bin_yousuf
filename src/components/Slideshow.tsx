// src/components/ProjectsSlideshow.tsx - Fixed version with reliable auto-play
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface SlideshowProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  height?: string;
}

const ProjectsSlideshow: React.FC<SlideshowProps> = ({
  images,
  autoPlayInterval = 2000,
  showDots = true,
  showArrows = false,
  height = "60vh"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const slideshowRef = useRef<HTMLDivElement>(null);

  // Memoized function to go to next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  // Memoized function to go to previous slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  // Memoized function to go to specific slide
  const goToSlide = useCallback((index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  }, [currentIndex]);

  // Auto-play functionality - removed currentIndex from dependencies to prevent restart
  useEffect(() => {
    if (isPlaying && images.length > 1) {
      intervalRef.current = setInterval(nextSlide, autoPlayInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, autoPlayInterval, images.length, nextSlide]); // Removed currentIndex

  // Pause on hover
  const handleMouseEnter = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPlaying(true);
  }, []);

  // Handle manual navigation - temporarily pause auto-play
  const handleManualNavigation = useCallback((action: () => void) => {
    // Temporarily pause auto-play
    setIsPlaying(false);
    
    // Execute the navigation action
    action();
    
    // Resume auto-play after a short delay
    setTimeout(() => {
      setIsPlaying(true);
    }, autoPlayInterval);
  }, [autoPlayInterval]);

  // If no images, return null
  if (!images || images.length === 0) {
    return null;
  }

  // If only one image, don't show controls
  const showControls = images.length > 1;

  return (
    <div className="relative w-full overflow-hidden bg-neutral-50 group" style={{ height }}>
      {/* Main slideshow container */}
      <div 
        ref={slideshowRef}
        className="relative w-full h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Images */}
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out ${
                index === currentIndex 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
              style={{
                zIndex: index === currentIndex ? 2 : 1
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              
              {/* Subtle overlay for better contrast */}
              <div className="absolute inset-0 bg-black/5"></div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {showArrows && showControls && (
          <>
            <button
              onClick={() => handleManualNavigation(prevSlide)}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 
                bg-white/20 hover:bg-white/30 backdrop-blur-sm 
                rounded-full p-3 transition-all duration-300 
                opacity-0 group-hover:opacity-100 hover:scale-110
                focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Previous image"
            >
              <svg 
                className="w-5 h-5 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => handleManualNavigation(nextSlide)}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 
                bg-white/20 hover:bg-white/30 backdrop-blur-sm 
                rounded-full p-3 transition-all duration-300 
                opacity-0 group-hover:opacity-100 hover:scale-110
                focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Next image"
            >
              <svg 
                className="w-5 h-5 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dot indicators */}
        {showDots && showControls && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleManualNavigation(() => goToSlide(index))}
                  className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 ${
                    index === currentIndex
                      ? 'w-6 h-2 bg-white'
                      : 'w-2 h-2 bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsSlideshow;