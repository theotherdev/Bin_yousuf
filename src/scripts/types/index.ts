// src/scripts/types/index.ts - Improved type definitions
import type { Project } from '../../types/project';
import type { GSAPTimeline, GSAPTarget } from '../../types/gsap';

// Re-export project types for consistency
export type { Project };

// Animation elements interface
export interface AnimationElements {
  projectsSidebar: HTMLElement | null;
  projectItems: NodeListOf<HTMLElement>;
  imageItems: NodeListOf<HTMLElement>;
  animatedProjectImage: HTMLElement | null;
  mainAnimatedImage: HTMLImageElement | null;
  firstProjectInGrid: HTMLElement | null;
}

// Animation state interface
export interface AnimationState {
  scrollY: number;
  windowHeight: number;
  progress: number;
  isAnimating: boolean;
}

// Animation controller interface
export interface AnimationController {
  elements: AnimationElements | null;
  state: AnimationState;
  timeline: GSAPTimeline | null;
  initialize(): Promise<void>;
  updateProgress(progress: number): void;
  cleanup(): void;
}

// Scroll handler interface
export interface ScrollHandler {
  isThrottled: boolean;
  lastScrollY: number;
  threshold: number;
  handleScroll(): void;
  throttle(func: () => void, delay: number): () => void;
}

// Project animation interface
export interface ProjectAnimationConfig {
  duration: number;
  ease: string;
  stagger: number;
  trigger: GSAPTarget;
  start: string;
  end: string;
}