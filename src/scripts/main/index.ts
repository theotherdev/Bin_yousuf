// src/scripts/main/index.ts
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
    // Fallback with properly typed default data
    return [
      {
        id: 1,
        number: '01',
        name: 'Default Project',
        location: 'Default Location',
        image: { src: '', alt: 'Default Image' }
      }
    ];
  }
}

class ProjectAnimationController {
  private elements: AnimationElements;
  private animationState: AnimationState;
  private mainTimeline: any;
  private ticking: boolean = false;
  private projects: Project[];
  private gsapLoader: GSAPLoader;

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
      zIndex: 999
    });

    // Create animation sequence matching your reference
    this.mainTimeline
      // Phase 1: Scale up from bottom and fade in (0 -> 0.4)
      .to(this.elements.animatedProjectImage, {
        top: '0vh',
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      })
      // Phase 2: Shrink and move to grid position (0.4 -> 1.0)
      .to(this.elements.animatedProjectImage, {
        top: '12vh',
        left: '38vw',
        width: '60vw',
        height: '60vh',
        borderRadius: '12px',
        duration: 0.6,
        ease: "power2.inOut"
      })
      // Phase 3: Final fade to match grid opacity
      .to(this.elements.animatedProjectImage, {
        opacity: 0.8,
        duration: 0.1,
        ease: "none"
      });
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
              gsap.timeline()
                .to(targetImage, {
                  y: -15,
                  boxShadow: "0 40px 100px rgba(0, 0, 0, 0.25)",
                  duration: 0.6,
                  ease: "power2.out"
                })
                .to(targetImage.querySelector('.project-image'), {
                  scale: 1.02,
                  duration: 0.6,
                  ease: "power2.out"
                }, 0)
                .to(targetImage, {
                  y: 0,
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                  duration: 0.6,
                  ease: "power2.out",
                  delay: 1.4
                })
                .to(targetImage.querySelector('.project-image'), {
                  scale: 1,
                  duration: 0.6,
                  ease: "power2.out"
                }, "-=0.6");
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
        }
      });
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
    
    // Calculate positions - matching your layout exactly
    const heroHeight = windowHeight * 1.1; // 110vh from scrollSpacer
    const projectsSectionPadding = windowHeight * 0.12; // 12vh padding-top
    const firstProjectPosition = heroHeight + projectsSectionPadding;
    const scrollStart = firstProjectPosition - windowHeight * 0.8; // Start earlier
    const scrollRange = windowHeight * 1.5; // Shorter range for smoother animation
    
    const gsap = window.gsap;
    
    // SIDEBAR VISIBILITY - Earlier appearance
    const sidebarThreshold = windowHeight * 0.2;
    
    if (scrollY > sidebarThreshold) {
      if (this.elements.projectsSidebar && !this.elements.projectsSidebar.classList.contains('visible')) {
        this.elements.projectsSidebar.style.transition = 'none';
        
        if (gsap) {
          gsap.killTweensOf(this.elements.projectsSidebar);
          gsap.fromTo(this.elements.projectsSidebar, 
            {
              opacity: 0,
              x: -100
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
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
    } else {
      if (this.elements.projectsSidebar && this.elements.projectsSidebar.classList.contains('visible')) {
        this.elements.projectsSidebar.style.transition = 'none';
        
        if (gsap) {
          gsap.killTweensOf(this.elements.projectsSidebar);
          gsap.to(this.elements.projectsSidebar, {
            opacity: 0,
            x: -100,
            duration: 0.3,
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
    }
    
    if (!this.elements.animatedProjectImage) return;
    
    // Calculate progress for the main animation
    const progress = Math.min(Math.max((scrollY - scrollStart) / scrollRange, 0), 1);
    this.animationState.progress = progress;
    
    // Update timeline progress with GSAP or fallback
    if (gsap && this.mainTimeline) {
      this.mainTimeline.progress(progress);
    } else {
      // Fallback animation without GSAP
      this.fallbackAnimation(progress);
    }
    
    // Handle first project grid visibility - smooth transition
    if (this.elements.firstProjectInGrid) {
      let gridOpacity = 0;
      
      if (progress < 0.7) {
        // Keep grid hidden during main animation
        gridOpacity = 0;
      } else if (progress < 0.95) {
        // Fade in the grid
        const fadeProgress = (progress - 0.7) / 0.25;
        gridOpacity = fadeProgress;
      } else {
        // Fully visible
        gridOpacity = 1;
      }
      
      if (gsap) {
        gsap.set(this.elements.firstProjectInGrid, { opacity: gridOpacity });
      } else {
        this.elements.firstProjectInGrid.style.opacity = gridOpacity.toString();
      }
    }

    // Hide animated image when animation is complete
    if (progress >= 1) {
      if (gsap) {
        gsap.set(this.elements.animatedProjectImage, { 
          opacity: 0,
          pointerEvents: 'none' 
        });
      } else {
        this.elements.animatedProjectImage.style.opacity = '0';
        this.elements.animatedProjectImage.style.pointerEvents = 'none';
      }
    }
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
    } else if (progress < 0.4) {
      // Phase 1: Scale up from bottom and fade in
      const phaseProgress = progress / 0.4;
      const top = 100 - (phaseProgress * 100);
      
      this.elements.animatedProjectImage.style.top = `${top}vh`;
      this.elements.animatedProjectImage.style.left = '0';
      this.elements.animatedProjectImage.style.width = '100vw';
      this.elements.animatedProjectImage.style.height = '100vh';
      this.elements.animatedProjectImage.style.opacity = phaseProgress.toString();
      this.elements.animatedProjectImage.style.borderRadius = '0px';
    } else {
      // Phase 2: Shrink and move to grid position
      const phaseProgress = (progress - 0.4) / 0.6;
      const top = 0 + (phaseProgress * 12);
      const left = 0 + (phaseProgress * 38);
      const width = 100 - (phaseProgress * 40);
      const height = 100 - (phaseProgress * 40);
      const borderRadius = phaseProgress * 12;
      
      this.elements.animatedProjectImage.style.top = `${top}vh`;
      this.elements.animatedProjectImage.style.left = `${left}vw`;
      this.elements.animatedProjectImage.style.width = `${width}vw`;
      this.elements.animatedProjectImage.style.height = `${height}vh`;
      this.elements.animatedProjectImage.style.opacity = '1';
      this.elements.animatedProjectImage.style.borderRadius = `${borderRadius}px`;
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
        this.highlightActiveProject();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  public async initialize(): Promise<void> {
    try {
      // Load GSAP first
      await this.gsapLoader.loadGSAP();
      
      // Initialize GSAP animations
      this.initializeGSAPAnimations();
      this.setupProjectInteractions();
      
      // Add scroll listener with passive option for better performance
      window.addEventListener('scroll', () => this.requestTick(), { passive: true });
      
      // Initial calls
      this.handleScroll();
      
      console.log('🚀 App initialized with GSAP animations!');
    } catch (error) {
      console.warn('GSAP failed to load, using fallback animations:', error);
      
      // Setup basic functionality without GSAP
      this.setupProjectInteractions();
      window.addEventListener('scroll', () => this.requestTick(), { passive: true });
      this.handleScroll();
      
      console.log('🚀 App initialized with fallback animations!');
    }

    // Handle window resize with debouncing for better performance
    const debouncedResize = this.debounce(() => {
      this.animationState.windowHeight = window.innerHeight;
      this.handleScroll();
    }, 150);
    
    window.addEventListener('resize', debouncedResize);
  }
}

// Hero Text Animation Controller
class HeroTextController {
  private words: string[];
  private currentIndex: number = 0;
  private animatedTextElement: HTMLElement | null;

  constructor(words: string[]) {
    this.words = words;
    this.animatedTextElement = document.getElementById("animatedText");
  }

  private changeWord(): void {
    if (!this.animatedTextElement) return;
    this.animatedTextElement.classList.add("blur-out");

    setTimeout(() => {
      if (!this.animatedTextElement) return;
      this.currentIndex = (this.currentIndex + 1) % this.words.length;
      this.animatedTextElement.textContent = this.words[this.currentIndex];
      this.animatedTextElement.classList.remove("blur-out");
      this.animatedTextElement.classList.add("blur-in");

      setTimeout(() => {
        if (!this.animatedTextElement) return;
        this.animatedTextElement.classList.remove("blur-in");
      }, 800);
    }, 400);
  }

  public initialize(): void {
    setTimeout(() => {
      setInterval(() => this.changeWord(), 3000);
    }, 2000);
  }
}

// Main App Controller
class AppController {
  private projectController: ProjectAnimationController | null = null;
  private heroController: HeroTextController | null = null;

  constructor() {
    // Controllers will be initialized after projects are loaded
  }

  private async initializeControllers(): Promise<void> {
    // Load projects data first
    projects = await loadProjects();
    
    const heroWords = projects.map((project: Project) => project.name.toUpperCase());
    this.projectController = new ProjectAnimationController(projects);
    this.heroController = new HeroTextController(heroWords);
  }

  public async initialize(): Promise<void> {
    // Initialize controllers first
    await this.initializeControllers();

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', async () => {
        if (this.projectController && this.heroController) {
          await this.projectController.initialize();
          this.heroController.initialize();
        }
      });
    } else {
      if (this.projectController && this.heroController) {
        await this.projectController.initialize();
        this.heroController.initialize();
      }
    }
  }
}

// Extend the global Window interface for GSAP
declare global {
  interface Window {
    gsap: any;
  }
}

// Initialize the application
const app = new AppController();
app.initialize();