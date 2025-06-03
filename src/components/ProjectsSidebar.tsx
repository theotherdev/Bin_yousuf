// src/components/ProjectsSidebar.tsx
import React, { useEffect, useRef } from 'react';
import { projects } from '../data/projects.js';
import type { Project } from '../scripts/types/index.js';

interface ProjectsSidebarProps {
  currentPath: string;
  isVisible?: boolean;
}

const ProjectsSidebar: React.FC<ProjectsSidebarProps> = ({ currentPath, isVisible = false }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isProjectsPage = currentPath === '/projects' || currentPath === '/projects/';

  useEffect(() => {
    if (!isProjectsPage) return;

    const handleProjectClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const projectItem = target.closest('.project-item') as HTMLElement;
      if (!projectItem) return;

      const projectIndex = parseInt(projectItem.dataset.projectIndex || '0');
      const targetSection = document.querySelectorAll('.project-section')[projectIndex];

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const projectItems = document.querySelectorAll('.projects-sidebar .project-item');
    projectItems.forEach(item => {
      item.addEventListener('click', handleProjectClick);
    });

    // Intersection Observer for active state
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const projectId = entry.target.getAttribute('data-project-id');

          projectItems.forEach(item => {
            if (item.getAttribute('data-project') === projectId) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    });

    document.querySelectorAll('.project-section').forEach(section => {
      observer.observe(section);
    });

    return () => {
      projectItems.forEach(item => {
        item.removeEventListener('click', handleProjectClick);
      });
      observer.disconnect();
    };
  }, [isProjectsPage]);

  return (
    <div
      ref={sidebarRef}
      className={`
        fixed left-[5vw] top-[15vh] w-[400px] max-h-[70vh] 
        bg-white/95 backdrop-blur-[20px] rounded-2xl p-[30px_25px]
        z-[5] transition-all duration-500 overflow-y-auto
        shadow-[0_20px_60px_rgba(0,0,0,0.1)] desktop-sidebar-only
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[100px]'}
      `}
      id="projectsSidebar"
    >
      <div className="flex justify-between items-center mb-[25px] pb-[15px] border-b border-black/10">
        <h3 className="text-base font-semibold text-gray-800">Projects</h3>
      </div>

      <div className="flex flex-col">
        {projects.map((project: Project, index: number) => (
          isProjectsPage ? (
            <div
              key={project.id}
              className="project-item flex items-start p-[12px_8px] cursor-pointer 
                transition-all duration-300 rounded-lg relative mb-1
                hover:bg-black/5 hover:translate-x-[5px]"
              data-project={project.id}
              data-scroll-target={`project-${project.id}`}
              data-project-index={index}
            >
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
            </div>
          ) : (
            <a
              key={project.id}
              href={`/projects#project-${project.id}`}
              className="project-item flex items-start p-[12px_8px] cursor-pointer 
                transition-all duration-300 rounded-lg relative mb-1 no-underline
                hover:bg-black/5 hover:translate-x-[5px]"
              data-project={project.id}
            >
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
            </a>
          )
        ))}
      </div>

      <style jsx>{`
        .project-item.active {
          background-color: rgba(0, 0, 0, 0.08);
          transform: translateX(5px);
        }

        /* Custom scrollbar */
        .projects-sidebar::-webkit-scrollbar {
          width: 4px;
        }

        .projects-sidebar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 2px;
        }

        .projects-sidebar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 2px;
        }

        .projects-sidebar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 768px) {
          .desktop-sidebar-only {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectsSidebar;