// src/lib/utils/animation.ts - Animation utility functions
import type { GSAPStatic, GSAPTimeline, GSAPTarget, GSAPVars } from '../../types/gsap';
import { ANIMATION_CONFIG } from '../../config/animation.config';

export class AnimationUtils {
  private static gsap: GSAPStatic | null = null;

  static async loadGSAP(): Promise<GSAPStatic | null> {
    if (this.gsap) return this.gsap;

    try {
      // Check if GSAP is already loaded globally
      if (typeof window !== 'undefined' && window.gsap) {
        this.gsap = window.gsap;
        return this.gsap;
      }

      // Dynamically import GSAP
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);
      this.gsap = gsap;
      
      if (typeof window !== 'undefined') {
        window.gsap = gsap;
        window.ScrollTrigger = ScrollTrigger;
      }
      
      return this.gsap;
    } catch (error) {
      console.warn('Failed to load GSAP:', error);
      return null;
    }
  }

  static createTimeline(vars?: GSAPVars): GSAPTimeline | null {
    if (!this.gsap) return null;
    return this.gsap.timeline(vars);
  }

  static animateIn(
    target: GSAPTarget,
    options: Partial<GSAPVars> = {}
  ): GSAPTimeline | null {
    if (!this.gsap) return null;

    const defaultVars: GSAPVars = {
      opacity: 1,
      y: 0,
      duration: ANIMATION_CONFIG.durations.normal,
      ease: ANIMATION_CONFIG.easing.default,
      ...options
    };

    return this.gsap.to(target, defaultVars);
  }

  static animateOut(
    target: GSAPTarget,
    options: Partial<GSAPVars> = {}
  ): GSAPTimeline | null {
    if (!this.gsap) return null;

    const defaultVars: GSAPVars = {
      opacity: 0,
      y: -20,
      duration: ANIMATION_CONFIG.durations.normal,
      ease: ANIMATION_CONFIG.easing.default,
      ...options
    };

    return this.gsap.to(target, defaultVars);
  }

  static staggerIn(
    targets: GSAPTarget,
    staggerDelay: number = ANIMATION_CONFIG.stagger.normal,
    options: Partial<GSAPVars> = {}
  ): GSAPTimeline | null {
    if (!this.gsap) return null;

    const tl = this.createTimeline();
    if (!tl) return null;

    const elements = this.normalizeTarget(targets);
    
    elements.forEach((element, index) => {
      const delay = index * staggerDelay;
      const vars: GSAPVars = {
        opacity: 1,
        y: 0,
        duration: ANIMATION_CONFIG.durations.normal,
        ease: ANIMATION_CONFIG.easing.default,
        delay,
        ...options
      };
      
      tl.to(element, vars, 0);
    });

    return tl;
  }

  static fadeIn(
    target: GSAPTarget,
    duration: number = ANIMATION_CONFIG.durations.normal
  ): GSAPTimeline | null {
    return this.animateIn(target, { opacity: 1, duration });
  }

  static fadeOut(
    target: GSAPTarget,
    duration: number = ANIMATION_CONFIG.durations.normal
  ): GSAPTimeline | null {
    return this.animateOut(target, { opacity: 0, duration });
  }

  static slideUp(
    target: GSAPTarget,
    duration: number = ANIMATION_CONFIG.durations.normal
  ): GSAPTimeline | null {
    return this.animateIn(target, { y: 0, opacity: 1, duration });
  }

  static slideDown(
    target: GSAPTarget,
    duration: number = ANIMATION_CONFIG.durations.normal
  ): GSAPTimeline | null {
    return this.animateOut(target, { y: 20, opacity: 0, duration });
  }

  static scaleIn(
    target: GSAPTarget,
    duration: number = ANIMATION_CONFIG.durations.normal
  ): GSAPTimeline | null {
    return this.animateIn(target, { scale: 1, opacity: 1, duration });
  }

  static scaleOut(
    target: GSAPTarget,
    duration: number = ANIMATION_CONFIG.durations.normal
  ): GSAPTimeline | null {
    return this.animateOut(target, { scale: 0.8, opacity: 0, duration });
  }

  private static normalizeTarget(target: GSAPTarget): HTMLElement[] {
    if (typeof target === 'string') {
      return Array.from(document.querySelectorAll(target));
    }
    
    if (target instanceof HTMLElement) {
      return [target];
    }
    
    if (target instanceof NodeList) {
      return Array.from(target);
    }
    
    if (Array.isArray(target)) {
      return target;
    }
    
    return [];
  }

  static killTweensOf(target: GSAPTarget): void {
    if (this.gsap) {
      this.gsap.killTweensOf(target);
    }
  }

  static set(target: GSAPTarget, vars: GSAPVars): GSAPTimeline | null {
    if (!this.gsap) return null;
    return this.gsap.set(target, vars);
  }
}

// Export a singleton instance
export const animationUtils = AnimationUtils;