// src/data/projects.d.ts - Updated type definitions
import type { ImageMetadata } from 'astro';

export interface Project {
  id: number;
  number: string;
  name: string;
  location: string;
  image: ImageMetadata;
}

declare module './projects.js' {
  export const projects: Project[];
  export function getProjectsByLocation(location: string): Project[];
  export function getProjectCounts(): { emaar: number; hmr: number };
}