// src/scripts/main/index.ts - Fixed version with footer detection
import type { Project, AnimationElements, AnimationState } from '../types/index.js';
import { GSAPLoader } from '../utils/gsap-loader.js';

// Import projects data - this will be loaded dynamically
let projects: Project[] = [];

// Function to load projects data
async function loadProjects(): Promise<Project[]> {
  try {
    const { projects: importedProjects } = await import('../../data/projects.js');
    return importedProjects;
  } catch (error) {
    console.warn('Could not import projects data:', error);
    return [];
  }
}

// Check if we're on the projects page to prevent conflicts
function isProjectsPage(): boolean {
  return window.location.pathname === '/projects' || 
         window.location.pathname === '/projects/' ||
         (window as any).__isProjectsPage === true;
}

class ProjectAnimationController {
  private elements: AnimationElements;
  private animationState: AnimationState;
  private mainTimeline: any;
  private ticking: boolean = false;
  private projects: Project[];
  private gsapLoader: GSAPLoader;
  private scrollHandler: (event: Event) => void;
  private resizeHandler: (event: Event) => void;

  constructor(projects: Project[]) {
    this.projects = projects;
    this.gsapLoader = GSAPLoader.getInstance();
    this.elements = this.initializeElements();
    this.animationState = {
      scrollY: 0,
      windowHeight: window.innerHeight,
      progress: 0,
      isAnimating: false
    };

    // Bind event handlers
    this.scrollHandler = () => this.requestTick();
    this.resizeHandler = this.debounce(() => {
      this.animationState.windowHeight = window.innerHeight;
      this.handleScroll();
    }, 150);
  }

  private initializeElements(): AnimationElements {
    return {
      projectsSidebar: document.getElementById('projectsSidebar'),
      projectItems: document.querySelectorAll<HTMLElement>('.project-item'),
      imageItems: document.querySelectorAll<HTMLElement>('.project-image-item'),
      animatedProjectImage: document.getElementById('animatedProjectImage'),
      mainAnimatedImage: document.getElementById('mainAnimatedImage') as HTMLImageElement,
      firstProjectInGrid: document.querySelector<HTMLElement>('#project-1')
    };
  }

  private waitForGSAP(callback: () => void): void {
    this.gsapLoader.waitForGSAP(callback);
  }

  private initializeGSAPAnimations(): void {
    const gsap = window.gsap;
    if (!gsap || !this.elements.animatedProjectImage) return;

    // Create main timeline
    this.mainTimeline = gsap.timeline({ paused: true });

    // Set initial state - positioned below viewport
    gsap.set(this.elements.animatedProjectImage, {
      top: '100vh',
      left: '0',
      width: '100vw',
      height: '100vh',
      opacity: 0,
      borderRadius: '0px',
      zIndex: 999,
      position: 'fixed'
    });

    // Create animation sequence with better timing
    this.mainTimeline
      // Phase 1: Rise from bottom and fade in (0 -> 0.3)
      .to(this.elements.animatedProjectImage, {
        top: '0vh',
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      })
      // Phase 2: Hold full screen briefly (0.3 -> 0.4)
      .to(this.elements.animatedProjectImage, {
        duration: 0.1,
        ease: "none"
      })
      // Phase 3: Transform to grid position (0.4 -> 0.9)
      .to(this.elements.animatedProjectImage, {
        top: '12vh',
        left: '38vw',
        width: '60vw',
        height: '60vh',
        borderRadius: '12px',
        duration: 0.5,
        ease: "power2.inOut"
      })
      // Phase 4: Fine positioning for perfect alignment (0.9 -> 1.0)
      .to(this.elements.animatedProjectImage, {
        duration: 0.1,
        ease: "power1.inOut"
      });
  }

  private handleScroll(): void {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Update animation state
    this.animationState = {
      ...this.animationState,
      scrollY,
      windowHeight
    };
    
    // Calculate positions with better precision
    const heroHeight = windowHeight * 1.1;
    const projectsSectionPadding = windowHeight * 0.12;
    const firstProjectPosition = heroHeight + projectsSectionPadding;
    const scrollStart = firstProjectPosition - windowHeight * 0.9;
    const scrollRange = windowHeight * 1.8;
    
    const gsap = window.gsap;
    
    // FOOTER DETECTION - NEW LOGIC
    const footer = document.querySelector('footer');
    let isNearFooter = false;
    
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const footerTop = footerRect.top + scrollY;
      const footerBuffer = windowHeight * 0.4; // 40% of viewport height as buffer
      
      // Check if we're approaching the footer
      isNearFooter = scrollY + windowHeight > footerTop - footerBuffer;
    }
    
    // SIDEBAR VISIBILITY WITH FOOTER DETECTION
    const sidebarThreshold = scrollStart + (scrollRange * 0.85);
    const shouldShowSidebar = scrollY > sidebarThreshold && !isNearFooter;

    if (shouldShowSidebar) {
      if (this.elements.projectsSidebar && !this.elements.projectsSidebar.classList.contains('visible')) {
        this.showSidebar(gsap);
      }
    } else {
      if (this.elements.projectsSidebar && this.elements.projectsSidebar.classList.contains('visible')) {
        this.hideSidebar(gsap);
      }
    }
    
    if (!this.elements.animatedProjectImage) return;
    
    // Calculate progress with smoother curve
    const progress = Math.min(Math.max((scrollY - scrollStart) / scrollRange, 0), 1);
    this.animationState.progress = progress;
    
    // Update timeline progress
    if (gsap && this.mainTimeline) {
      this.mainTimeline.progress(progress);
    } else {
      this.fallbackAnimation(progress);
    }
    
    // IMPROVED: Smoother crossfade transition
    this.handleImageCrossfade(progress, gsap);
    
    // Update active project highlighting
    this.highlightActiveProject();
  }

  private showSidebar(gsap: any): void {
    if (!this.elements.projectsSidebar) return;
    
    this.elements.projectsSidebar.style.transition = 'none';
    
    if (gsap) {
      gsap.killTweensOf(this.elements.projectsSidebar);
      gsap.fromTo(this.elements.projectsSidebar, 
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            if (this.elements.projectsSidebar) {
              this.elements.projectsSidebar.style.transition = '';
            }
          }
        }
      );
    } else {
      this.elements.projectsSidebar.style.opacity = '1';
      this.elements.projectsSidebar.style.transform = 'translateX(0)';
      setTimeout(() => {
        if (this.elements.projectsSidebar) {
          this.elements.projectsSidebar.style.transition = '';
        }
      }, 50);
    }
    this.elements.projectsSidebar.classList.add('visible');
  }

  private hideSidebar(gsap: any): void {
    if (!this.elements.projectsSidebar) return;
    
    this.elements.projectsSidebar.style.transition = 'none';
    
    if (gsap) {
      gsap.killTweensOf(this.elements.projectsSidebar);
      gsap.to(this.elements.projectsSidebar, {
        opacity: 0,
        x: -100,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          if (this.elements.projectsSidebar) {
            this.elements.projectsSidebar.style.transition = '';
          }
        }
      });
    } else {
      this.elements.projectsSidebar.style.opacity = '0';
      this.elements.projectsSidebar.style.transform = 'translateX(-100px)';
      setTimeout(() => {
        if (this.elements.projectsSidebar) {
          this.elements.projectsSidebar.style.transition = '';
        }
      }, 50);
    }
    this.elements.projectsSidebar.classList.remove('visible');
  }

  private handleImageCrossfade(progress: number, gsap: any): void {
    if (!this.elements.firstProjectInGrid) return;
    
    if (progress < 0.85) {
      // Keep grid image hidden while animated image is transitioning
      if (gsap) {
        gsap.set(this.elements.firstProjectInGrid, { opacity: 0 });
        gsap.set(this.elements.animatedProjectImage, { opacity: 1 });
      } else {
        this.elements.firstProjectInGrid.style.opacity = '0';
        if (this.elements.animatedProjectImage) {
          this.elements.animatedProjectImage.style.opacity = '1';
        }
      }
    } else if (progress >= 0.85 && progress < 1) {
      // Smooth crossfade over longer range
      const fadeProgress = (progress - 0.85) / 0.15; // 0.85 to 1.0 range
      const easedProgress = this.easeInOutCubic(fadeProgress);
      
      // Fade out animated image
      const animatedOpacity = 1 - easedProgress;
      if (gsap) {
        gsap.set(this.elements.animatedProjectImage, { opacity: animatedOpacity });
        gsap.set(this.elements.firstProjectInGrid, { opacity: easedProgress });
      } else {
        if (this.elements.animatedProjectImage) {
          this.elements.animatedProjectImage.style.opacity = animatedOpacity.toString();
        }
        this.elements.firstProjectInGrid.style.opacity = easedProgress.toString();
      }
    } else {
      // Animation complete - ensure proper final state
      if (gsap) {
        gsap.set(this.elements.firstProjectInGrid, { opacity: 1 });
        gsap.set(this.elements.animatedProjectImage, { 
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -1
        });
      } else {
        this.elements.firstProjectInGrid.style.opacity = '1';
        if (this.elements.animatedProjectImage) {
          this.elements.animatedProjectImage.style.opacity = '0';
          this.elements.animatedProjectImage.style.pointerEvents = 'none';
          this.elements.animatedProjectImage.style.zIndex = '-1';
        }
      }
    }
  }

  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  private fallbackAnimation(progress: number): void {
    if (!this.elements.animatedProjectImage) return;
    
    if (progress === 0) {
      // Initial state
      this.elements.animatedProjectImage.style.top = '100vh';
      this.elements.animatedProjectImage.style.left = '0';
      this.elements.animatedProjectImage.style.width = '100vw';
      this.elements.animatedProjectImage.style.height = '100vh';
      this.elements.animatedProjectImage.style.opacity = '0';
      this.elements.animatedProjectImage.style.borderRadius = '0px';
      this.elements.animatedProjectImage.style.position = 'fixed';
    } else if (progress < 0.3) {
      // Phase 1: Rise from bottom and fade in
      const phaseProgress = progress / 0.3;
      const easedProgress = this.easeInOutCubic(phaseProgress);
      const top = 100 - (easedProgress * 100);
      
      this.elements.animatedProjectImage.style.top = `${top}vh`;
      this.elements.animatedProjectImage.style.left = '0';
      this.elements.animatedProjectImage.style.width = '100vw';
      this.elements.animatedProjectImage.style.height = '100vh';
      this.elements.animatedProjectImage.style.opacity = easedProgress.toString();
      this.elements.animatedProjectImage.style.borderRadius = '0px';
    } else if (progress < 0.4) {
      // Phase 2: Hold full screen
      this.elements.animatedProjectImage.style.top = '0vh';
      this.elements.animatedProjectImage.style.left = '0';
      this.elements.animatedProjectImage.style.width = '100vw';
      this.elements.animatedProjectImage.style.height = '100vh';
      this.elements.animatedProjectImage.style.opacity = '1';
      this.elements.animatedProjectImage.style.borderRadius = '0px';
    } else if (progress < 0.9) {
      // Phase 3: Transform to grid position
      const phaseProgress = (progress - 0.4) / 0.5;
      const easedProgress = this.easeInOutCubic(phaseProgress);
      
      const top = 0 + (easedProgress * 12);
      const left = 0 + (easedProgress * 38);
      const width = 100 - (easedProgress * 40);
      const height = 100 - (easedProgress * 40);
      const borderRadius = easedProgress * 12;
      
      this.elements.animatedProjectImage.style.top = `${top}vh`;
      this.elements.animatedProjectImage.style.left = `${left}vw`;
      this.elements.animatedProjectImage.style.width = `${width}vw`;
      this.elements.animatedProjectImage.style.height = `${height}vh`;
      this.elements.animatedProjectImage.style.opacity = '1';
      this.elements.animatedProjectImage.style.borderRadius = `${borderRadius}px`;
    } else {
      // Phase 4: Final position
      this.elements.animatedProjectImage.style.top = '12vh';
      this.elements.animatedProjectImage.style.left = '38vw';
      this.elements.animatedProjectImage.style.width = '60vw';
      this.elements.animatedProjectImage.style.height = '60vh';
      this.elements.animatedProjectImage.style.borderRadius = '12px';
      // Opacity will be handled by the crossfade logic in handleScroll
    }
  }

  private scrollSidebarToActiveProject(activeItem: HTMLElement): void {
    if (!this.elements.projectsSidebar || !activeItem) return;
    
    const gsap = window.gsap;
    const sidebarRect = this.elements.projectsSidebar.getBoundingClientRect();
    const activeItemRect = activeItem.getBoundingClientRect();
    
    const activeItemTop = activeItemRect.top - sidebarRect.top;
    const activeItemBottom = activeItemRect.bottom - sidebarRect.top;
    
    const sidebarHeight = this.elements.projectsSidebar.clientHeight;
    const sidebarScrollTop = this.elements.projectsSidebar.scrollTop;
    
    // Smooth scroll with GSAP if available, fallback to native
    if (gsap) {
      if (activeItemTop < 0) {
        gsap.to(this.elements.projectsSidebar, {
          scrollTop: sidebarScrollTop + activeItemTop - 20,
          duration: 0.5,
          ease: "power2.out"
        });
      } else if (activeItemBottom > sidebarHeight) {
        gsap.to(this.elements.projectsSidebar, {
          scrollTop: sidebarScrollTop + (activeItemBottom - sidebarHeight) + 20,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    } else {
      // Fallback to native scrolling
      if (activeItemTop < 0) {
        this.elements.projectsSidebar.scrollTo({
          top: sidebarScrollTop + activeItemTop - 20,
          behavior: 'smooth'
        });
      } else if (activeItemBottom > sidebarHeight) {
        this.elements.projectsSidebar.scrollTo({
          top: sidebarScrollTop + (activeItemBottom - sidebarHeight) + 20,
          behavior: 'smooth'
        });
      }
    }
  }

  private setupProjectInteractions(): void {
    this.elements.projectItems.forEach((item: HTMLElement) => {
      item.addEventListener('click', () => {
        // Remove active class from all items
        this.elements.projectItems.forEach((pi: HTMLElement) => 
          pi.classList.remove('active')
        );
        item.classList.add('active');
        
        const targetId = item.dataset.scrollTarget || null;
        if (targetId) {
          const targetImage = document.getElementById(targetId);
          
          if (targetImage) {
            this.scrollToTarget(targetImage);
          }
        }
      });
    });
  }

  private scrollToTarget(targetImage: HTMLElement): void {
    const navHeight = 80;
    const elementPosition = targetImage.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navHeight;
    
    const gsap = window.gsap;
    if (gsap) {
      // Smooth scroll with GSAP
      gsap.to(window, {
        scrollTo: offsetPosition,
        duration: 1,
        ease: "power2.out"
      });
      
      // Highlight animation
      this.highlightElement(targetImage, gsap);
    } else {
      // Fallback to native scroll
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Simple highlight effect
      targetImage.style.transform = 'translateY(-15px)';
      targetImage.style.boxShadow = '0 40px 100px rgba(0, 0, 0, 0.25)';
      
      setTimeout(() => {
        targetImage.style.transform = 'translateY(0)';
        targetImage.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
      }, 2000);
    }
  }

  private highlightElement(element: HTMLElement, gsap: any): void {
    if (gsap) {
      gsap.timeline()
        .to(element, {
          y: -15,
          boxShadow: "0 40px 100px rgba(0, 0, 0, 0.25)",
          duration: 0.6,
          ease: "power2.out"
        })
        .to(element.querySelector('.project-image'), {
          scale: 1.02,
          duration: 0.6,
          ease: "power2.out"
        }, 0)
        .to(element, {
          y: 0,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
          duration: 0.6,
          ease: "power2.out",
          delay: 1.4
        })
        .to(element.querySelector('.project-image'), {
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.6");
    }
  }

  private highlightActiveProject(): void {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    this.elements.imageItems.forEach((image: HTMLElement) => {
      const rect = image.getBoundingClientRect();
      const imageTop = rect.top + window.scrollY;
      const imageBottom = imageTop + rect.height;
      
      if (scrollPosition >= imageTop && scrollPosition <= imageBottom) {
        this.elements.projectItems.forEach((item: HTMLElement) => 
          item.classList.remove('active')
        );
        const projectName = image.dataset.project;
        if (projectName) {
          const correspondingItem = document.querySelector<HTMLElement>(
            `.project-item[data-project="${projectName}"]`
          );
          if (correspondingItem) {
            correspondingItem.classList.add('active');
            this.scrollSidebarToActiveProject(correspondingItem);
          }
        }
      }
    });
  }

  private debounce(func: Function, wait: number): Function {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  private requestTick(): void {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.handleScroll();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  public async initialize(): Promise<void> {
    // Don't initialize on projects page to prevent conflicts
    if (isProjectsPage()) {
      console.log('🚫 Skipping main.ts initialization on projects page');
      return;
    }

    try {
      // Load GSAP first
      await this.gsapLoader.loadGSAP();
      
      // Initialize GSAP animations
      this.initializeGSAPAnimations();
      this.setupProjectInteractions();
      
      // Store scroll handler reference for cleanup
      (window as any).__scrollHandlers = (window as any).__scrollHandlers || [];
      (window as any).__scrollHandlers.push(this.scrollHandler);
      
      // Add scroll listener with passive option for better performance
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
      window.addEventListener('resize', this.resizeHandler);
      
      // Initial calls
      this.handleScroll();
      
      console.log('🚀 App initialized with GSAP animations!');
    } catch (error) {
      console.warn('GSAP failed to load, using fallback animations:', error);
      
      // Setup basic functionality without GSAP
      this.setupProjectInteractions();
      
      // Store fallback scroll handler reference
      (window as any).__scrollHandlers = (window as any).__scrollHandlers || [];
      (window as any).__scrollHandlers.push(this.scrollHandler);
      
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
      window.addEventListener('resize', this.resizeHandler);
      this.handleScroll();
      
      console.log('🚀 App initialized with fallback animations!');
    }
  }

  public cleanup(): void {
    // Clean up event listeners
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.resizeHandler);
    
    // Clean up GSAP animations
    if (this.mainTimeline) {
      this.mainTimeline.kill();
    }
    
    // Remove from global handlers array
    const handlers = (window as any).__scrollHandlers || [];
    const index = handlers.indexOf(this.scrollHandler);
    if (index > -1) {
      handlers.splice(index, 1);
    }
  }
}

// Hero Text Animation Controller
class HeroTextController {
  private words: string[];
  private currentIndex: number = 0;
  private animatedTextElement: HTMLElement | null;
  private intervalId: NodeJS.Timeout | null = null;
  private timeoutId: NodeJS.Timeout | null = null;

  constructor(words: string[]) {
    this.words = words;
    this.animatedTextElement = document.getElementById("animatedText");
  }

  private changeWord(): void {
    if (!this.animatedTextElement) return;
    this.animatedTextElement.classList.add("blur-out");

    this.timeoutId = setTimeout(() => {
      if (!this.animatedTextElement) return;
      this.currentIndex = (this.currentIndex + 1) % this.words.length;
      this.animatedTextElement.textContent = this.words[this.currentIndex];
      this.animatedTextElement.classList.remove("blur-out");
      this.animatedTextElement.classList.add("blur-in");

      this.timeoutId = setTimeout(() => {
        if (!this.animatedTextElement) return;
        this.animatedTextElement.classList.remove("blur-in");
      }, 800);
    }, 400);
  }

  public initialize(): void {
    // Don't initialize on projects page
    if (isProjectsPage()) {
      return;
    }

    this.timeoutId = setTimeout(() => {
      this.intervalId = setInterval(() => this.changeWord(), 3000);
    }, 2000);
  }

  public cleanup(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}

// Main App Controller
class AppController {
  private projectController: ProjectAnimationController | null = null;
  private heroController: HeroTextController | null = null;
  private isInitialized: boolean = false;

  constructor() {
    // Controllers will be initialized after projects are loaded
  }

  private async initializeControllers(): Promise<void> {
    // Don't initialize on projects page
    if (isProjectsPage()) {
      console.log('🚫 Skipping controller initialization on projects page');
      return;
    }

    // Load projects data first
    projects = await loadProjects();
    
    if (projects.length === 0) {
      console.warn('No projects loaded, skipping initialization');
      return;
    }
    
    const heroWords = projects.map((project: Project) => project.name.toUpperCase());
    this.projectController = new ProjectAnimationController(projects);
    this.heroController = new HeroTextController(heroWords);
  }

  public async initialize(): Promise<void> {
    // Prevent double initialization
    if (this.isInitialized) {
      return;
    }

    // Skip initialization on projects page
    if (isProjectsPage()) {
      console.log('🚫 Skipping app initialization on projects page');
      return;
    }

    try {
      // Initialize controllers first
      await this.initializeControllers();

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', async () => {
          await this.initializeApp();
        });
      } else {
        await this.initializeApp();
      }
    } catch (error) {
      console.error('Failed to initialize app:', error);
    }
  }

  private async initializeApp(): Promise<void> {
    if (this.projectController && this.heroController) {
      try {
        await this.projectController.initialize();
        this.heroController.initialize();
        this.isInitialized = true;
        console.log('✅ App fully initialized with footer detection');
      } catch (error) {
        console.error('Error during app initialization:', error);
      }
    }
  }

  public cleanup(): void {
    if (this.projectController) {
      this.projectController.cleanup();
    }
    if (this.heroController) {
      this.heroController.cleanup();
    }
    this.isInitialized = false;
  }
}

// Extend the global Window interface for GSAP
declare global {
  interface Window {
    gsap: any;
    __scrollHandlers?: EventListener[];
    __isProjectsPage?: boolean;
    __appController?: AppController;
  }
}

// Initialize the application with proper cleanup
let appController: AppController | null = null;

// Clean up any existing app instance
if ((window as any).__appController) {
  (window as any).__appController.cleanup();
}

// Create new app instance
appController = new AppController();
(window as any).__appController = appController;

// Initialize the app
appController.initialize().catch(console.error);

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  if (appController) {
    appController.cleanup();
  }
});