// src/scripts/types/index.ts - Updated to use Astro's ImageMetadata
import type { ImageMetadata } from 'astro';

// Use Astro's ImageMetadata directly instead of custom interface
export type ProjectImageMetadata = ImageMetadata;

// Project interface - matches your data structure
export interface Project {
  id: number;
  number: string;
  name: string;
  location: string;
  image: ImageMetadata; // Use Astro's ImageMetadata directly
}

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

// GSAP interfaces (simplified to avoid conflicts)
export interface GSAPTimeline {
  progress(value?: number): GSAPTimeline | number;
  to(target: any, vars: any): GSAPTimeline;
  set?(target: any, vars: any): GSAPTimeline;
  pause?(): GSAPTimeline;
  play?(): GSAPTimeline;
  kill?(): void;
}

// Window interface extension for GSAP
declare global {
  interface Window {
    gsap: any; // Keep it simple to avoid conflicts
  }
}