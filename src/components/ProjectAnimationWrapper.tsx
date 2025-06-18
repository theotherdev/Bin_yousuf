// src/components/ProjectAnimationWrapper.tsx
import React, { useEffect } from 'react';
import { useProjectAnimations } from '../hooks/useProjectAnimations';
import { projects } from '../data/projects.js';

interface ProjectAnimationWrapperProps {
  children: React.ReactNode;
}

const ProjectAnimationWrapper: React.FC<ProjectAnimationWrapperProps> = ({ children }) => {
  const { animationState, sidebarVisible } = useProjectAnimations(projects, true);

  useEffect(() => {
    // Update sidebar visibility based on hook state
    const sidebar = document.getElementById('projectsSidebar');
    if (sidebar) {
      if (sidebarVisible) {
        sidebar.classList.add('visible');
      } else {
        sidebar.classList.remove('visible');
      }
    }
  }, [sidebarVisible]);

  useEffect(() => {
    // Add class to body when animating
    if (animationState.isAnimating) {
      document.body.classList.add('animating');
    } else {
      document.body.classList.remove('animating');
    }

    return () => {
      document.body.classList.remove('animating');
    };
  }, [animationState.isAnimating]);

  return (
    <div className="relative">
      {children}
      
      {/* Debug info in development */}
      {import.meta.env.DEV && (
        <div className="fixed bottom-20 right-5 bg-black/80 text-white p-4 rounded-none text-xs font-mono z-[2000]">
          <div>Scroll: {Math.round(animationState.scrollY)}px</div>
          <div>Progress: {(animationState.progress * 100).toFixed(1)}%</div>
          <div>Animating: {animationState.isAnimating ? 'Yes' : 'No'}</div>
          <div>Sidebar: {sidebarVisible ? 'Visible' : 'Hidden'}</div>
        </div>
      )}
    </div>
  );
};

export default ProjectAnimationWrapper;