// src/components/ProjectsSidebar.tsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { projects } from '../data/projects.js';
import type { Project } from '../scripts/types/index.js';

// Register GSAP plugin
gsap.registerPlugin(ScrollToPlugin);

interface ProjectsSidebarProps {
  currentPath: string;
  isVisible?: boolean;
}

const ProjectsSidebar: React.FC<ProjectsSidebarProps> = ({ currentPath, isVisible = false }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const isProjectsPage = currentPath === '/projects' || currentPath === '/projects/';
  const isHomePage = currentPath === '/' || currentPath === '';

  useEffect(() => {
    // Setup intersection observer for highlighting active project
    setupIntersectionObserver();

    return () => {
      // Cleanup
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const setupIntersectionObserver = () => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when element is in center of viewport
      threshold: 0
    };

    observerRef.current = new IntersectionObserver((entries) => {
      if (isScrolling) return; // Don't update during programmatic scrolling

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const projectId = target.getAttribute('data-project');
          
          if (projectId) {
            setActiveProjectId(parseInt(projectId));
          }
        }
      });
    }, options);

    // Observe all project elements
    const projectElements = document.querySelectorAll('[data-project]');
    projectElements.forEach(element => {
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    });
  };

  const handleProjectClick = (project: Project, event?: React.MouseEvent) => {
    // Prevent default link behavior
    event?.preventDefault();
    
    const targetId = `project-${project.id}`;
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      setIsScrolling(true);
      setActiveProjectId(project.id);

      // Calculate offset based on navigation height
      const navHeight = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      // Use GSAP for smooth scrolling
      gsap.to(window, {
        scrollTo: offsetPosition,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          // Reset scrolling state after animation
          setTimeout(() => {
            setIsScrolling(false);
          }, 100);
        }
      });

      // Add highlight animation to target element
      highlightProject(targetElement);
    }
  };

  const highlightProject = (targetElement: HTMLElement) => {
    // Create highlight animation
    const timeline = gsap.timeline();
    
    timeline
      .to(targetElement, {
        y: -15,
        boxShadow: "0 40px 100px rgba(0, 0, 0, 0.25)",
        duration: 0.6,
        ease: "power2.out"
      })
      .to(targetElement.querySelector('.project-image') || targetElement.querySelector('img'), {
        scale: 1.02,
        duration: 0.6,
        ease: "power2.out"
      }, 0)
      .to(targetElement, {
        y: 0,
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
        duration: 0.6,
        ease: "power2.out",
        delay: 1.4
      })
      .to(targetElement.querySelector('.project-image') || targetElement.querySelector('img'), {
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.6");
  };

  const scrollSidebarToActiveProject = (activeProjectId: number) => {
    if (!sidebarRef.current) return;

    const activeItem = sidebarRef.current.querySelector(`[data-project-id="${activeProjectId}"]`) as HTMLElement;
    if (!activeItem) return;

    const sidebarRect = sidebarRef.current.getBoundingClientRect();
    const activeItemRect = activeItem.getBoundingClientRect();
    
    const activeItemTop = activeItemRect.top - sidebarRect.top;
    const activeItemBottom = activeItemRect.bottom - sidebarRect.top;
    
    const sidebarHeight = sidebarRef.current.clientHeight;
    const sidebarScrollTop = sidebarRef.current.scrollTop;
    
    // Smooth scroll sidebar to keep active item visible
    if (activeItemTop < 0) {
      gsap.to(sidebarRef.current, {
        scrollTop: sidebarScrollTop + activeItemTop - 20,
        duration: 0.5,
        ease: "power2.out"
      });
    } else if (activeItemBottom > sidebarHeight) {
      gsap.to(sidebarRef.current, {
        scrollTop: sidebarScrollTop + (activeItemBottom - sidebarHeight) + 20,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  // Auto-scroll sidebar when active project changes
  useEffect(() => {
    if (activeProjectId !== null && !isScrolling) {
      scrollSidebarToActiveProject(activeProjectId);
    }
  }, [activeProjectId, isScrolling]);

  const getProjectHref = (project: Project) => {
    if (isProjectsPage) {
      return `#project-${project.id}`;
    }
    return `/projects#project-${project.id}`;
  };

  const renderProjectItem = (project: Project, index: number) => {
    const isActive = activeProjectId === project.id;
    
    const itemContent = (
      <>
        <span className="text-[11px] text-gray-500 mr-3 font-medium min-w-[25px] mt-0.5">
          {project.number}
        </span>
        <div className="flex-1">
          <h4 className="text-[13px] font-medium text-gray-800 mb-[3px] leading-[1.4]">
            {project.name}
          </h4>
          <p className="text-[11px] text-gray-500 leading-[1.3]">
            {project.location}
          </p>
        </div>
      </>
    );

    const className = `
      flex items-start p-[12px_8px] cursor-pointer 
      transition-all duration-300 rounded-lg relative mb-1
      hover:bg-black/5 hover:translate-x-[5px]
      ${isActive ? 'bg-black/[0.08] translate-x-[5px]' : ''}
    `;

    // Always use click handler for staying on the same page
    return (
      <div
        key={project.id}
        className={className}
        data-project-id={project.id}
        onClick={(e) => handleProjectClick(project, e)}
      >
        {itemContent}
      </div>
    );
  };

  return (
    <div
      ref={sidebarRef}
      className={`
        fixed left-[5vw] top-[15vh] w-[400px] max-h-[70vh] 
        bg-white/95 backdrop-blur-[20px] rounded-2xl p-[30px_25px]
        z-[5] transition-all duration-500 overflow-y-auto
        shadow-[0_20px_60px_rgba(0,0,0,0.1)] custom-scrollbar
        will-change-[opacity,transform] hidden lg:block
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[100px]'}
      `}
      id="projectsSidebar"
    >
      <div className="flex justify-between items-center mb-[25px] pb-[15px] border-b border-black/10">
        <h3 className="text-base font-semibold text-gray-800">Projects</h3>
      </div>

      <div className="flex flex-col">
        {projects.map((project: Project, index: number) => 
          renderProjectItem(project, index)
        )}
      </div>
    </div>
  );
};

export default ProjectsSidebar;

// Additional styles to add to your global.css or component
/*
Add these styles to your src/styles/global.css file:

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

@media (max-width: 1024px) {
  #projectsSidebar {
    width: 350px !important;
    left: 3vw !important;
  }
}
*/