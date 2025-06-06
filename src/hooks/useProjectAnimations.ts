// src/hooks/useProjectAnimations.ts - Fixed version with footer detection
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { Project } from '../scripts/types/index.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin);

interface AnimationState {
  scrollY: number;
  windowHeight: number;
  progress: number;
  isAnimating: boolean;
}

export const useProjectAnimations = (projects: Project[], enabled: boolean = true) => {
  const [animationState, setAnimationState] = useState<AnimationState>({
    scrollY: 0,
    windowHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
    progress: 0,
    isAnimating: false
  });

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const mainTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const tickingRef = useRef(false);

  // Element refs
  const projectsSidebarRef = useRef<HTMLElement | null>(null);
  const animatedProjectImageRef = useRef<HTMLElement | null>(null);
  const mainAnimatedImageRef = useRef<HTMLImageElement | null>(null);
  const firstProjectInGridRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Get elements
    projectsSidebarRef.current = document.getElementById('projectsSidebar');
    animatedProjectImageRef.current = document.getElementById('animatedProjectImage');
    mainAnimatedImageRef.current = document.getElementById('mainAnimatedImage') as HTMLImageElement;
    firstProjectInGridRef.current = document.querySelector('#project-1');

    // Initialize GSAP animations
    initializeGSAPAnimations();

    // Setup scroll handler
    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          updateScrollAnimation();
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    // Setup resize handler
    const handleResize = () => {
      setAnimationState(prev => ({
        ...prev,
        windowHeight: window.innerHeight
      }));
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Initial update
    updateScrollAnimation();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (mainTimelineRef.current) {
        mainTimelineRef.current.kill();
      }
    };
  }, [enabled, projects]);

  const initializeGSAPAnimations = () => {
    if (!animatedProjectImageRef.current) return;

    // Create main timeline
    mainTimelineRef.current = gsap.timeline({ paused: true });

    // Set initial state
    gsap.set(animatedProjectImageRef.current, {
      top: '100vh',
      left: '0',
      width: '100vw',
      height: '100vh',
      opacity: 0,
      borderRadius: '0px',
      zIndex: 999
    });

    // Create animation sequence
    mainTimelineRef.current
      // Phase 1: Scale up from bottom and fade in (0 -> 0.4)
      .to(animatedProjectImageRef.current, {
        top: '0vh',
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      })
      // Phase 2: Shrink and move to grid position (0.4 -> 0.95)
      .to(animatedProjectImageRef.current, {
        top: '12vh',
        left: '38vw',
        width: '60vw',
        height: '60vh',
        borderRadius: '12px',
        duration: 0.55,
        ease: "power2.inOut"
      })
      // Phase 3: Final positioning (0.95 -> 1.0)
      .to(animatedProjectImageRef.current, {
        duration: 0.05,
        ease: "none"
      });
  };

  const updateScrollAnimation = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Calculate positions
    const heroHeight = windowHeight * 1.1;
    const projectsSectionPadding = windowHeight * 0.12;
    const firstProjectPosition = heroHeight + projectsSectionPadding;
    const scrollStart = firstProjectPosition - windowHeight * 0.8;
    const scrollRange = windowHeight * 1.5;

    // Get footer element and its position
    const footer = document.querySelector('footer');
    const footerTop = footer ? footer.getBoundingClientRect().top + scrollY : Infinity;
    
    // Calculate if we're near the footer (with some buffer)
    const footerBuffer = windowHeight * 0.3; // 30% of viewport height as buffer
    const isNearFooter = scrollY + windowHeight > footerTop - footerBuffer;

    // Update sidebar visibility - hide if near footer
    const sidebarThreshold = windowHeight * 0.2;
    const shouldShowSidebar = scrollY > sidebarThreshold && !isNearFooter;
    updateSidebarVisibility(shouldShowSidebar);

    // Calculate progress
    const progress = Math.min(Math.max((scrollY - scrollStart) / scrollRange, 0), 1);

    // Update animation state
    setAnimationState({
      scrollY,
      windowHeight,
      progress,
      isAnimating: progress > 0 && progress < 1
    });

    // Update timeline progress
    if (mainTimelineRef.current) {
      mainTimelineRef.current.progress(progress);
    }

    // Handle crossfade between animated and grid images
    handleImageCrossfade(progress);
  };

  const updateSidebarVisibility = (visible: boolean) => {
    if (visible !== sidebarVisible) {
      setSidebarVisible(visible);

      if (projectsSidebarRef.current) {
        if (visible) {
          gsap.killTweensOf(projectsSidebarRef.current);
          gsap.fromTo(projectsSidebarRef.current,
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
          );
        } else {
          gsap.killTweensOf(projectsSidebarRef.current);
          gsap.to(projectsSidebarRef.current, {
            opacity: 0,
            x: -100,
            duration: 0.3,
            ease: "power2.in"
          });
        }
      }
    }
  };

  const handleImageCrossfade = (progress: number) => {
    if (!animatedProjectImageRef.current || !firstProjectInGridRef.current) return;

    if (progress < 0.95) {
      gsap.set(firstProjectInGridRef.current, { opacity: 0 });
    } else if (progress >= 0.95 && progress < 1) {
      const fadeProgress = (progress - 0.95) / 0.05;
      gsap.set(animatedProjectImageRef.current, { opacity: 1 - fadeProgress });
      gsap.set(firstProjectInGridRef.current, { opacity: fadeProgress });
    } else {
      gsap.set(firstProjectInGridRef.current, { opacity: 1 });
      gsap.set(animatedProjectImageRef.current, { opacity: 0, pointerEvents: 'none' });
    }
  };

  const scrollToProject = (projectIndex: number) => {
    const targetElement = document.getElementById(`project-${projectIndex + 1}`);
    if (targetElement) {
      gsap.to(window, {
        scrollTo: { y: targetElement, offsetY: 80 },
        duration: 1,
        ease: "power2.out"
      });
    }
  };

  const highlightProject = (projectElement: HTMLElement) => {
    gsap.timeline()
      .to(projectElement, {
        y: -15,
        boxShadow: "0 40px 100px rgba(0, 0, 0, 0.25)",
        duration: 0.6,
        ease: "power2.out"
      })
      .to(projectElement.querySelector('.project-image'), {
        scale: 1.02,
        duration: 0.6,
        ease: "power2.out"
      }, 0)
      .to(projectElement, {
        y: 0,
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
        duration: 0.6,
        ease: "power2.out",
        delay: 1.4
      })
      .to(projectElement.querySelector('.project-image'), {
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.6");
  };

  return {
    animationState,
    sidebarVisible,
    scrollToProject,
    highlightProject
  };
};