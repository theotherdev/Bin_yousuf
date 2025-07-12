// src/components/ProjectsList.tsx - Fixed image display issue
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { Project } from '../scripts/types/index.js';

gsap.registerPlugin(ScrollToPlugin);

interface ProjectsListProps {
  projects: Project[];
  emaarProjects: Project[];
  hmrProjects: Project[];
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects, emaarProjects, hmrProjects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = useRef(false);

  // Debounced scroll handler to prevent excessive state updates
  const debouncedSetCurrentIndex = useCallback((index: number) => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      setCurrentIndex(index);
    }, 100);
  }, []);

  // Handle initial scroll based on URL hash (only once on page load)
  const handleInitialScroll = useCallback(() => {
    if (isInitializedRef.current) return;
    if (typeof window === 'undefined') return;
    
    const hash = window.location.hash;
    if (hash) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          const projectIndex = parseInt((targetElement as HTMLElement).dataset.projectIndex || '0');
          if (!isNaN(projectIndex)) {
            setCurrentIndex(projectIndex);
            
            // Smooth scroll to element without changing URL
            targetElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }
        }
      });
    }
    isInitializedRef.current = true;
  }, []);

  // Setup intersection observer with optimized settings
  const setupIntersectionObserver = useCallback(() => {
    // Clean up existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // More conservative margins
      threshold: [0.3, 0.7] // Multiple thresholds for better detection
    };

    observerRef.current = new IntersectionObserver((entries) => {
      // Only process if not currently scrolling programmatically
      if (isScrolling) return;

      let maxIntersectionRatio = 0;
      let mostVisibleEntry: IntersectionObserverEntry | null = null;

      // Find the most visible section
      entries.forEach(entry => {
        if (entry.intersectionRatio > maxIntersectionRatio) {
          maxIntersectionRatio = entry.intersectionRatio;
          mostVisibleEntry = entry;
        }
      });

      if (mostVisibleEntry && mostVisibleEntry.isIntersecting) {
        const target = mostVisibleEntry.target as HTMLElement;
        const projectIndex = parseInt(target.dataset.projectIndex || '0');
        
        if (!isNaN(projectIndex)) {
          // Don't update URL hash during scrolling - bad for SEO
          // Just update the current index for internal state
          debouncedSetCurrentIndex(projectIndex);
        }
      }
    }, options);

    // Observe all sections
    sectionsRef.current.forEach(section => {
      if (section && observerRef.current) {
        observerRef.current.observe(section);
      }
    });
  }, [isScrolling, debouncedSetCurrentIndex]);

  // Optimized scroll to project function
  const scrollToProject = useCallback((index: number) => {
    if (index < 0 || index >= sectionsRef.current.length || isScrolling) return;
    
    const targetSection = sectionsRef.current[index];
    if (!targetSection) return;

    setIsScrolling(true);
    
    // Use GSAP for smooth, controlled scrolling
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { 
        y: targetSection, 
        offsetY: 0
      },
      ease: "power2.inOut",
      onComplete: () => {
        // Add delay to prevent immediate intersection observer conflicts
        setTimeout(() => {
          setIsScrolling(false);
        }, 200);
      }
    });
  }, [isScrolling]);

  // Handle navigation clicks (for bottom nav and external links)
  const handleNavigationClick = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
    
    if (!link) return;
    
    e.preventDefault();
    const section = link.getAttribute('href')?.substring(1);
    
    if (section === 'emaar') {
      scrollToProject(0);
    } else if (section === 'hmr') {
      const hmrIndex = projects.findIndex(p => p.location === 'HMR');
      if (hmrIndex !== -1) {
        scrollToProject(hmrIndex);
      }
    } else if (section?.startsWith('project-')) {
      // Handle direct project links
      const projectId = section.replace('project-', '');
      const projectIndex = projects.findIndex(p => p.id.toString() === projectId);
      if (projectIndex !== -1) {
        scrollToProject(projectIndex);
      }
    }
  }, [projects, scrollToProject]);

  // Keyboard navigation with throttling (no URL changes)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isScrolling) return; // Prevent rapid key presses during scroll
    
    if (e.key === 'ArrowDown' && currentIndex < projects.length - 1) {
      e.preventDefault();
      scrollToProject(currentIndex + 1);
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
      e.preventDefault();
      scrollToProject(currentIndex - 1);
    }
  }, [currentIndex, projects.length, scrollToProject, isScrolling]);

  // Generate project URL
  const getProjectUrl = useCallback((project: Project) => {
    return `/projects/${project.name.toLowerCase().replace(/[\s&]/g, '-').replace(/--+/g, '-')}`;
  }, []);

  // Smart image handling based on project characteristics
  const getImageConfig = (project: Project) => {
    // Vertical/Portrait images - need portrait containers
    const verticalProjects = ['H1 Tower'];
    
    // Wide panoramic images - work better with object-contain
    const panoramicProjects = ['Pearl & Reef Towers', 'The Views'];
    
    // Standard landscape images - work fine with object-cover
    const standardProjects = ['Panorama', 'Park Edge', 'Coral Towers', 'AA Waterfront', 
                             'Gold Crest Residence', 'H&S Residence', 'Saima Marina', 
                             'Saima Waterfront', 'Beach Terraces'];

    if (verticalProjects.includes(project.name)) {
      return { 
        type: 'vertical', 
        aspectRatio: '4/5', 
        objectFit: 'object-cover' 
      };
    } else if (panoramicProjects.includes(project.name)) {
      return { 
        type: 'panoramic', 
        aspectRatio: '16/9', 
        objectFit: 'object-contain' 
      };
    } else {
      return { 
        type: 'standard', 
        aspectRatio: '16/10', 
        objectFit: 'object-cover' 
      };
    }
  };

  // Initialize everything
  useEffect(() => {
    handleInitialScroll();
    
    // Small delay to ensure DOM is fully rendered
    const initTimeout = setTimeout(() => {
      setupIntersectionObserver();
    }, 100);

    return () => {
      clearTimeout(initTimeout);
    };
  }, [handleInitialScroll, setupIntersectionObserver]);

  // Add event listeners
  useEffect(() => {
    document.addEventListener('click', handleNavigationClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleNavigationClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNavigationClick, handleKeyDown]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-screen overflow-x-hidden relative"
      id="projectsListContainer"
    >
      {projects.map((project, index) => (
        <section
          key={project.id}
          ref={el => { 
            if (el) sectionsRef.current[index] = el; 
          }}
          className={`
            min-h-screen w-full flex items-center justify-center relative
            ${index % 2 === 1 ? 'bg-neutral-50' : 'bg-white'}
            transition-colors duration-300
          `}
          id={`project-${project.id}`}
          data-project-id={project.id}
          data-project-name={project.name}
          data-project-location={project.location.toLowerCase()}
          data-project-index={index}
        >
          <div className="w-full max-w-[1400px] mx-auto px-4 py-[60px] 
            grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-[60px] items-center">
            
            {/* Project Header */}
            <div className="flex flex-col gap-5 text-left lg:text-left">
              <span className="text-sm text-neutral-500 font-medium">
                {project.number}
              </span>
              <h2 className="text-7xl font-semibold leading-tight text-neutral-800 m-0">
                {project.name}
              </h2>
              <p className="text-lg text-neutral-600 font-normal">
                {project.location}
              </p>
            </div>
            
            {/* Smart Image Container - Adapts to each project's image characteristics */}
            <a 
              href={getProjectUrl(project)}
              className="w-full relative block no-underline text-inherit transition-all 
                duration-500 ease-out group hover:-translate-y-2 focus:outline-none 
                focus:ring-4 focus:ring-blue-500/20"
            >
              {/* Image Container - Optimized for each project */}
              <div className="relative w-full overflow-hidden rounded-2xl 
                shadow-[0_40px_80px_rgba(0,0,0,0.15)] group-hover:shadow-[0_50px_100px_rgba(0,0,0,0.2)]
                transition-shadow duration-500">
                
                {(() => {
                  const config = getImageConfig(project);
                  const needsBackground = config.objectFit === 'object-contain';
                  
                  return (
                    <>
                      {/* Desktop: Optimized container for each project */}
                      <div 
                        className={`hidden lg:block relative w-full ${needsBackground ? 'bg-neutral-100' : ''}`} 
                        style={{ aspectRatio: config.aspectRatio }}
                      >
                        <img
                          src={project.image.src}
                          alt={project.name}
                          className={`absolute inset-0 w-full h-full ${config.objectFit} object-center 
                            transition-transform duration-700 ease-out group-hover:scale-105`}
                          loading={index < 2 ? "eager" : "lazy"}
                        />
                      </div>

                      {/* Mobile: Standard approach for all */}
                      <div className="block lg:hidden relative w-full h-[60vh]">
                        <img
                          src={project.image.src}
                          alt={project.name}
                          className="absolute inset-0 w-full h-full object-cover object-center 
                            transition-transform duration-700 ease-out group-hover:scale-105"
                          loading={index < 2 ? "eager" : "lazy"}
                        />
                      </div>
                    </>
                  );
                })()}
                
                {/* Overlay for better interaction feedback */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              </div>
            </a>
            
            {/* Desktop Details Button */}
            <div className="col-span-full text-center mt-10 hidden lg:block">
              <a 
                href={getProjectUrl(project)}
                className="inline-block px-10 py-4 bg-[#121212] text-white no-underline 
                  rounded-lg font-medium transition-all duration-300 hover:bg-black 
                  hover:-translate-y-0.5 transform backface-visibility-hidden will-change-transform"
              >
                View Project Details
              </a>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-8 right-8 text-sm text-neutral-400 font-medium">
            {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProjectsList;