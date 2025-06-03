// src/components/ProjectsList.tsx
import React, { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    // Handle initial scroll based on URL
    handleInitialScroll();
    
    // Setup intersection observer
    setupIntersectionObserver();
    
    // Setup keyboard navigation
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentIndex < projects.length - 1) {
        e.preventDefault();
        scrollToProject(currentIndex + 1);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        scrollToProject(currentIndex - 1);
      }
    };

    document.addEventListener('keydown', handleKeydown);
    
    // Setup navigation handlers
    setupNavigationHandlers();

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [currentIndex, projects]);

  const handleInitialScroll = () => {
    const hash = window.location.hash;
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          const projectIndex = parseInt((targetElement as HTMLElement).dataset.projectIndex || '0');
          if (!isNaN(projectIndex)) {
            setCurrentIndex(projectIndex);
          }
        }, 100);
      }
    }
  };

  const setupIntersectionObserver = () => {
    let observerActive = false;
    setTimeout(() => {
      observerActive = true;
    }, 1000);

    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && observerActive && !isScrolling) {
          const projectId = (entry.target as HTMLElement).dataset.projectId;
          const projectIndex = parseInt((entry.target as HTMLElement).dataset.projectIndex || '0');
          
          const newHash = `#project-${projectId}`;
          if (window.location.hash !== newHash) {
            window.history.replaceState(null, '', newHash);
          }
          
          setCurrentIndex(projectIndex);
        }
      });
    }, options);

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  };

  const setupNavigationHandlers = () => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const section = link.getAttribute('href')?.substring(1);
        
        if (section === 'emaar') {
          scrollToProject(0);
        } else if (section === 'hmr') {
          const hmrIndex = projects.findIndex(p => p.location === 'HMR');
          if (hmrIndex !== -1) {
            scrollToProject(hmrIndex);
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  };

  const scrollToProject = (index: number) => {
    if (index >= 0 && index < sectionsRef.current.length) {
      setIsScrolling(true);
      const targetSection = sectionsRef.current[index];
      
      if (targetSection) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: targetSection, offsetY: 0 },
          ease: "power2.inOut",
          onComplete: () => {
            setTimeout(() => setIsScrolling(false), 100);
          }
        });
      }
    }
  };

  const getProjectUrl = (project: Project) => {
    return `/projects/${project.name.toLowerCase().replace(/[\s&]/g, '-').replace(/--+/g, '-')}`;
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-screen overflow-y-scroll overflow-x-hidden scroll-smooth relative hide-scrollbar"
      id="projectsListContainer"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {projects.map((project, index) => (
        <section
          key={project.id}
          ref={el => { if (el) sectionsRef.current[index] = el; }}
          className={`
            min-h-screen w-full flex items-center justify-center relative
            scroll-snap-start bg-white
            ${index % 2 === 1 ? 'bg-gray-50' : ''}
          `}
          id={`project-${project.id}`}
          data-project-id={project.id}
          data-project-name={project.name}
          data-project-location={project.location.toLowerCase()}
          data-project-index={index}
        >
          <div className="w-full max-w-[1400px] mx-auto px-10 py-[60px] 
            grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-[60px] items-center">
            
            {/* Project Header */}
            <div className="flex flex-col gap-5 text-center lg:text-left">
              <span className="text-sm text-gray-500 font-medium">
                {project.number}
              </span>
              <h1 className="text-clamp-title font-semibold leading-tight text-gray-800 m-0">
                {project.name}
              </h1>
              <p className="text-lg text-gray-600 font-normal">
                {project.location}
              </p>
            </div>
            
            {/* Project Image */}
            <a 
              href={getProjectUrl(project)}
              className="w-full h-[70vh] overflow-hidden rounded-2xl 
                shadow-[0_40px_80px_rgba(0,0,0,0.15)] relative block 
                no-underline text-inherit transition-all duration-[600ms] 
                ease-out-cubic group hover:-translate-y-1.5 
                hover:shadow-[0_50px_100px_rgba(0,0,0,0.2)]"
            >
              <img
                src={project.image.src}
                alt={project.name}
                className="w-full h-full object-cover transition-transform 
                  duration-[600ms] ease-out-cubic group-hover:scale-105"
              />
            </a>
            
            {/* Desktop Details Button */}
            <div className="col-span-full text-center mt-10 hidden lg:block">
              <a 
                href={getProjectUrl(project)}
                className="btn-secondary"
              >
                View Project Details
              </a>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProjectsList;