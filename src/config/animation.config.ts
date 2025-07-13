// src/config/animation.config.ts - Animation configuration constants
export const ANIMATION_CONFIG = {
  // Animation durations (in seconds)
  durations: {
    instant: 0,
    fast: 0.2,
    normal: 0.3,
    medium: 0.6,
    slow: 1.0,
    slideshow: 2.0,
  },

  // Easing functions
  easing: {
    default: 'power2.out',
    smooth: 'power1.inOut',
    bounce: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.5)',
    spring: 'power2.inOut',
  },

  // Stagger delays for sequential animations
  stagger: {
    fast: 0.1,
    normal: 0.15,
    slow: 0.2,
  },

  // Scroll trigger settings
  scrollTrigger: {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
  },

  // Slideshow settings
  slideshow: {
    autoPlayInterval: 2000, // milliseconds
    transitionDuration: 700,
    pauseOnHover: true,
  },

  // Navigation animations
  navigation: {
    mobileMenuDuration: 0.3,
    scrollHideDuration: 0.3,
    scrollThreshold: 100, // pixels
  },

  // Project animations
  projects: {
    cardHoverScale: 1.02,
    cardHoverDuration: 0.3,
    listItemDelay: 0.1,
  },
} as const;
