// src/scripts/types/index.ts

// Image metadata interface
export interface ImageMetadata {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

// Project interface - matches your data structure
export interface Project {
  id: number;
  number: string;
  name: string;
  location: string;
  image: ImageMetadata;
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