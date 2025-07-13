// src/types/gsap.ts - Improved GSAP type definitions
export interface GSAPVars {
  duration?: number;
  delay?: number;
  ease?: string;
  x?: number | string;
  y?: number | string;
  scale?: number;
  opacity?: number;
  rotation?: number;
  transformOrigin?: string;
  onComplete?: () => void;
  onStart?: () => void;
  onUpdate?: () => void;
  [key: string]: unknown;
}

export interface GSAPTimeline {
  to(target: GSAPTarget, vars: GSAPVars): GSAPTimeline;
  from(target: GSAPTarget, vars: GSAPVars): GSAPTimeline;
  fromTo(target: GSAPTarget, fromVars: GSAPVars, toVars: GSAPVars): GSAPTimeline;
  set(target: GSAPTarget, vars: GSAPVars): GSAPTimeline;
  add(child: GSAPTimeline | (() => void), position?: number | string): GSAPTimeline;
  play(from?: number): GSAPTimeline;
  pause(): GSAPTimeline;
  resume(): GSAPTimeline;
  reverse(): GSAPTimeline;
  restart(): GSAPTimeline;
  kill(): void;
  progress(value?: number): GSAPTimeline | number;
  duration(value?: number): GSAPTimeline | number;
  delay(value?: number): GSAPTimeline | number;
  totalProgress(value?: number): GSAPTimeline | number;
  totalDuration(): number;
  isActive(): boolean;
}

export interface GSAPStatic {
  timeline(vars?: GSAPVars): GSAPTimeline;
  to(target: GSAPTarget, vars: GSAPVars): GSAPTimeline;
  from(target: GSAPTarget, vars: GSAPVars): GSAPTimeline;
  fromTo(target: GSAPTarget, fromVars: GSAPVars, toVars: GSAPVars): GSAPTimeline;
  set(target: GSAPTarget, vars: GSAPVars): GSAPTimeline;
  killTweensOf(target: GSAPTarget): void;
  getProperty(target: GSAPTarget, property: string): unknown;
  quickSetter(target: GSAPTarget, property: string, unit?: string): (value: number | string) => void;
}

export interface ScrollTriggerVars {
  trigger?: GSAPTarget;
  start?: string | number;
  end?: string | number;
  scrub?: boolean | number;
  pin?: boolean | GSAPTarget;
  snap?: boolean | number | { snapTo: number | string; duration: number; delay: number };
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  onUpdate?: (self: ScrollTriggerInstance) => void;
  onToggle?: (self: ScrollTriggerInstance) => void;
  markers?: boolean;
  id?: string;
  refreshPriority?: number;
  [key: string]: unknown;
}

export interface ScrollTriggerInstance {
  progress: number;
  direction: number;
  isActive: boolean;
  kill(): void;
  refresh(): void;
  update(): void;
}

export interface ScrollTriggerStatic {
  create(vars: ScrollTriggerVars): ScrollTriggerInstance;
  refresh(): void;
  addEventListener(type: string, callback: () => void): void;
  removeEventListener(type: string, callback: () => void): void;
  killAll(): void;
}

export type GSAPTarget = string | HTMLElement | NodeListOf<HTMLElement> | HTMLElement[];

// Global GSAP interface
declare global {
  interface Window {
    gsap?: GSAPStatic;
    ScrollTrigger?: ScrollTriggerStatic;
  }
}

// Module augmentation for environments where GSAP is imported
declare module 'gsap' {
  const gsap: GSAPStatic;
  export default gsap;
  export const ScrollTrigger: ScrollTriggerStatic;
}