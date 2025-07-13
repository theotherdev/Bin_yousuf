// src/components/BottomNavigation.tsx - Updated for new homepage structure
import React, { useEffect, useState } from 'react';
import { getProjectCounts } from '../data/projects';

interface BottomNavigationProps {
  currentPath: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentPath }) => {
  const [projectCounts, setProjectCounts] = useState({ emaar: 0, hmr: 0 });
  const isHomePage = currentPath === '/' || currentPath === '';

  useEffect(() => {
    const counts = getProjectCounts();
    setProjectCounts(counts);
  }, []);

  return (
    <div className="fixed bottom-10 left-10 flex gap-10 z-10 flex-wrap md:bottom-5 md:left-5 md:gap-5">
      {isHomePage ? (
        <>
          <a 
            href="#project-1" 
            className="text-neutral-500 text-sm font-normal transition-colors duration-300 hover:text-neutral-800 no-underline"
            data-section="emaar"
          >
            Emaar <sup className="text-[10px] ml-0.5">{projectCounts.emaar}</sup>
          </a>
          <a 
            href="#project-6" 
            className="text-neutral-500 text-sm font-normal transition-colors duration-300 hover:text-neutral-800 no-underline"
            data-section="hmr"
          >
            HMR <sup className="text-[10px] ml-0.5">{projectCounts.hmr}</sup>
          </a>
        </>
      ) : (
        <>
          <a 
            href="/#project-1" 
            className="text-neutral-500 text-sm font-normal transition-colors duration-300 hover:text-neutral-800 no-underline"
          >
            Emaar <sup className="text-[10px] ml-0.5">{projectCounts.emaar}</sup>
          </a>
          <a 
            href="/#project-6" 
            className="text-neutral-500 text-sm font-normal transition-colors duration-300 hover:text-neutral-800 no-underline"
          >
            HMR <sup className="text-[10px] ml-0.5">{projectCounts.hmr}</sup>
          </a>
        </>
      )}
    </div>
  );
};

export default BottomNavigation;