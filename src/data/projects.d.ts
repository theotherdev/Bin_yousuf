// src/data/projects.d.ts
import { Project } from '../scripts/types/index.js';

declare module './projects.js' {
  export const projects: Project[];
}