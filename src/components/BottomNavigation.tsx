// src/components/BottomNavigation.tsx
import React, { useEffect, useState } from 'react';
import { getProjectCounts } from '../data/projects.js';

interface BottomNavigationProps {
  currentPath: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentPath }) => {
  const [projectCounts, setProjectCounts] = useState({ emaar: 0, hmr: 0 });
  const isProjectsPage = currentPath === '/projects' || currentPath === '/projects/';

  useEffect(() => {
    const counts = getProjectCounts();
    setProjectCounts(counts);
  }, []);

  return (
    <div className="fixed bottom-10 left-10 flex gap-10 z-10 flex-wrap md:bottom-5 md:left-5 md:gap-5">
      {isProjectsPage ? (
        <>
          <a 
            href="#emaar" 
            className="text-gray-500 text-sm font-normal transition-colors duration-300 hover:text-gray-800 no-underline"
            data-section="emaar"
          >
            Emaar <sup className="text-[10px] ml-0.5">{projectCounts.emaar}</sup>
          </a>
          <a 
            href="#hmr" 
            className="text-gray-500 text-sm font-normal transition-colors duration-300 hover:text-gray-800 no-underline"
            data-section="hmr"
          >
            HMR <sup className="text-[10px] ml-0.5">{projectCounts.hmr}</sup>
          </a>
        </>
      ) : (
        <>
          <a 
            href="/projects?section=emaar" 
            className="text-gray-500 text-sm font-normal transition-colors duration-300 hover:text-gray-800 no-underline"
          >
            Emaar <sup className="text-[10px] ml-0.5">{projectCounts.emaar}</sup>
          </a>
          <a 
            href="/projects#project-6" 
            className="text-gray-500 text-sm font-normal transition-colors duration-300 hover:text-gray-800 no-underline"
          >
            HMR <sup className="text-[10px] ml-0.5">{projectCounts.hmr}</sup>
          </a>
        </>
      )}
    </div>
  );
};

export default BottomNavigation;