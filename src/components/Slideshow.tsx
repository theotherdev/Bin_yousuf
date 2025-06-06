// src/components/ProjectsSlideshow.tsx - Minimal and aesthetic slideshow
import React, { useState, useEffect, useRef } from 'react';

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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const slideshowRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && images.length > 1) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, isPlaying, autoPlayInterval, images.length]);

  // Pause on hover
  const handleMouseEnter = () => {
    setIsPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsPlaying(true);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden bg-gray-50" style={{ height }}>
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
              className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${
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
              
              {/* Subtle overlay for better text contrast if needed */}
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows (minimal, only show on hover) */}
        {showArrows && images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 
                bg-white/20 hover:bg-white/30 backdrop-blur-sm 
                rounded-full p-3 transition-all duration-300 
                opacity-0 group-hover:opacity-100 hover:scale-110
                disabled:opacity-50 disabled:cursor-not-allowed"
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
              onClick={nextSlide}
              disabled={isTransitioning}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 
                bg-white/20 hover:bg-white/30 backdrop-blur-sm 
                rounded-full p-3 transition-all duration-300 
                opacity-0 group-hover:opacity-100 hover:scale-110
                disabled:opacity-50 disabled:cursor-not-allowed"
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
        {showDots && images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`transition-all duration-300 rounded-full ${
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

        {/* Play/Pause button (minimal) */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-6 right-6 z-10 
            bg-black/20 hover:bg-black/30 backdrop-blur-sm 
            rounded-full p-2 transition-all duration-300 
            opacity-60 hover:opacity-100"
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {/* Image counter */}
        <div className="absolute top-6 left-6 z-10 
          bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 
          text-white text-sm font-medium opacity-60">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSlideshow;