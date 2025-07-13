// src/components/ProjectsGrid.tsx
import React from 'react';
import { projects } from '../data/projects';
import type { Project } from '../types/project';

const ProjectsGrid: React.FC = () => {
  return (
    <div
      className="ml-[38vw] w-[60vw] flex flex-col gap-10 py-5 lg:ml-[40vw] lg:w-[55vw] md:ml-[5vw] md:w-[90vw]"
      id="imagesContainer"
    >
      {projects.map((project: Project, index: number) => (
        <a
          key={project.id}
          href={`/projects#project-${project.id}`}
          className={`
            relative w-full h-[60vh] rounded-xl overflow-hidden -shadow-[0_20px_60px_rgba(0,0,0,0.15)]
            transition-all duration-300 cursor-pointer block no-underline group
            hover:transform hover:-translate-y-2.5 hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)]
            md:h-[50vh]
          `}
          data-project={project.id}
          id={`project-${project.id}`}
          style={index === 0 ? { opacity: 0 } : {}}
        >
          <img
            src={project.image.src}
            alt={project.name}
            width={1200}
            height={800}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading={index < 3 ? 'eager' : 'lazy'}
          />

          {/* Project overlay info */}
          <div
            className={`
  absolute bottom-0 left-0 right-0 
  bg-gradient-to-t from-black/70 to-transparent
  p-[40px_30px_30px] transform transition-transform duration-300
  text-white
  ${/* Desktop: hover to show */ ''} 
  translate-y-full group-hover:translate-y-0
  ${/* Mobile: always visible */ ''}
  md:translate-y-0
`}
          >
            <div className="project-info">
              <span className="block text-xs text-white/80 font-medium mb-1.5">
                {project.number}
              </span>
              <h3 className="text-xl font-semibold mb-1.5 leading-tight text-white">
                {project.name}
              </h3>
              <p className="text-sm text-white/90 font-normal">
                {project.location}
              </p>
            </div>
          </div>
        </a>
      ))}

      <style jsx>{`
        /* Highlighted state for animation */
        .project-image-item.highlighted {
          transform: translateY(-15px);
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.25);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-image-item.highlighted .project-image {
          transform: scale(1.02);
        }

        /* Mobile specific styles */
        @media (max-width: 768px) {
          /* Remove hover effects on mobile */
          .project-image-item:hover {
            transform: none;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          }

          .project-image-item:hover .project-image {
            transform: none;
          }

          /* Add touch feedback instead */
          .project-image-item:active {
            transform: scale(0.98);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectsGrid;
