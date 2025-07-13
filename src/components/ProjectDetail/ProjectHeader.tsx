// src/components/ProjectDetail/ProjectHeader.tsx
import React, { useState } from 'react';
import type { Project } from '../../scripts/types/index.js';

interface ProjectHeaderProps {
  projectName: string;
  allProjects: Project[];
  onClose: () => void;
  onOpenGallery: () => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  projectName,
  allProjects,
  onClose,
  onOpenGallery,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleProjectChange = (projectId: string) => {
    window.location.href = `/projects/${projectId}`;
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-[10px] 
      z-[1000] px-10 py-5 border-b border-black/10"
    >
      <div className="flex justify-between items-center max-w-[1400px] mx-auto">
        <div className="flex items-center gap-5">
          <button
            onClick={onClose}
            className="bg-transparent border-none text-2xl text-neutral-500 cursor-pointer 
              p-1.5 transition-colors duration-300 hover:text-neutral-800"
          >
            ×
          </button>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`
                bg-transparent border-none text-lg font-medium text-neutral-800 
                cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md 
                transition-all duration-300 hover:bg-neutral-100
                ${dropdownOpen ? 'bg-neutral-100' : ''}
              `}
            >
              {projectName}
              <svg
                className={`w-3 h-3 transition-transform duration-300 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div
                className="absolute top-full left-0 bg-white border border-neutral-200 
                rounded-none -shadow-[0_10px_30px_rgba(0,0,0,0.1)] min-w-[300px] 
                max-h-[400px] overflow-y-auto mt-1 z-[1001]"
              >
                {allProjects.map(project => (
                  <button
                    key={project.id}
                    onClick={() =>
                      handleProjectChange(
                        project.name
                          .toLowerCase()
                          .replace(/[\s&]/g, '-')
                          .replace(/--+/g, '-')
                      )
                    }
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 text-left 
                      transition-colors duration-300 border-b border-neutral-100 
                      last:border-b-0 hover:bg-neutral-50
                      ${project.name === projectName ? 'bg-indigo-600 text-white hover:bg-indigo-600' : ''}
                    `}
                  >
                    <span
                      className={`text-xs min-w-[30px] font-medium ${
                        project.name === projectName
                          ? 'text-white/80'
                          : 'text-neutral-500'
                      }`}
                    >
                      {project.number}
                    </span>
                    <span className="flex-1 text-sm font-medium">
                      {project.name}
                    </span>
                    <span
                      className={`text-xs font-normal ${
                        project.name === projectName
                          ? 'text-white/90'
                          : 'text-neutral-600'
                      }`}
                    >
                      {project.location}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <button
            onClick={onOpenGallery}
            className="bg-transparent border-none text-neutral-500 text-sm font-normal 
              cursor-pointer px-3 py-2 rounded-md transition-all duration-300 
              hover:text-neutral-800 hover:bg-neutral-100"
          >
            Gallery
          </button>
        </div>
      </div>
    </header>
  );
};

// ProjectGallery component
interface ProjectGalleryProps {
  images: { src: any; alt: string }[];
  projectName: string;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  images,
  projectName,
}) => {
  const [, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="py-[100px] bg-white">
      <div className="max-w-[1400px] mx-auto px-10 flex flex-col gap-20">
        {images.map((image, index) => (
          <div
            key={index}
            className={`
              w-full flex animate-fade-in-up
              ${index % 2 === 0 ? 'justify-start' : 'justify-end'}
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className="relative overflow-hidden rounded-xl -shadow-project 
                transition-all duration-[400ms] ease-out-cubic cursor-pointer
                hover:-translate-y-2.5 hover:shadow-project-hover max-w-[75%] w-full"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src.src || image.src}
                alt={image.alt}
                className="w-full h-auto block transition-transform 
                  duration-[600ms] ease-out-cubic hover:scale-105"
              />
            </div>
          </div>
        ))}

        {/* Brochure Section */}
        <div
          className="mt-[100px] p-20 bg-gradient-to-br from-neutral-50 to-white 
          rounded-[20px] mb-10"
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center 
            max-w-[1000px] mx-auto"
          >
            <div className="text-center lg:text-left">
              <h3 className="text-clamp-description font-semibold text-neutral-800 mb-5">
                Interested in {projectName}?
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed mb-[30px]">
                Download our comprehensive project brochure for detailed
                information, floor plans, pricing, and exclusive offers.
              </p>
              <button className="btn-primary">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10,9 9,9 8,9" />
                </svg>
                View Brochure
              </button>
            </div>

            <div className="flex justify-center items-center">
              <div
                className="w-[200px] h-[280px] bg-white rounded-xl 
                -shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden relative 
                transform perspective-1000 hover:scale-105 transition-transform duration-300"
                style={{ transform: 'rotateY(-10deg) rotateX(5deg)' }}
              >
                <div
                  className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 
                  flex flex-col justify-end p-[30px_20px] text-white relative"
                >
                  <div
                    className="absolute top-5 left-5 right-5 h-[120px] 
                    bg-white/10 rounded-none"
                  ></div>
                  <span className="text-lg font-semibold mb-2 relative z-10">
                    {projectName}
                  </span>
                  <span className="text-sm text-white/90 relative z-10">
                    Project Brochure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// src/components/ProjectDetail/ProjectHero.tsx
import type { ProjectImage } from '../../types/project';

interface ProjectHeroProps {
  heroImage: ProjectImage;
  description: string;
  onImageClick: () => void;
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({
  heroImage,
  description,
  onImageClick,
}) => {
  return (
    <>
      <section className="w-full h-screen relative overflow-hidden mt-20">
        <div
          className="w-full h-full relative cursor-pointer group"
          onClick={onImageClick}
        >
          <img
            src={heroImage.src.src || heroImage.src}
            alt={heroImage.alt}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-black/40 flex items-center justify-center 
            opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <div
              className="text-white bg-white/20 p-4 rounded-full 
              backdrop-blur-[10px] transition-all duration-300 
              group-hover:bg-white/30 group-hover:scale-110"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-10 text-center">
          <p
            className="text-clamp-description font-normal leading-[1.4] 
            text-primary max-w-[900px] mx-auto"
          >
            {description}
          </p>
        </div>
      </section>
    </>
  );
};
