// src/data/projects.ts - Comprehensive project data with proper TypeScript types
import type { ImageMetadata } from 'astro';

// Import project images
import panoramaImg from '../assets/projects/emaar/panorama/main-image.webp';
import theViewsImg from '../assets/projects/emaar/the-views/main-image.webp';
import parkEdgeImg from '../assets/projects/emaar/park-edge/main-image.webp';
import coralTowersImg from '../assets/projects/emaar/coral-towers/main-image.webp';
import pearlReefImg from '../assets/projects/emaar/pearl-reef-towers/main-image.webp';
import aaWaterfrontImg from '../assets/projects/hmr/aa-waterfront/main-image.webp';
import goldCrestImg from '../assets/projects/hmr/gold-crest-residence/main-image.webp';
import hsResidenceImg from '../assets/projects/hmr/hs-residence/main-image.webp';
import h1TowerImg from '../assets/projects/hmr/h1-tower/main-image.webp';
import saimaMarinaImg from '../assets/projects/hmr/saima-marina/main-image.webp';
import saimaWaterfrontImg from '../assets/projects/hmr/saima-waterfront/main-image.webp';
import beachTerraceImg from '../assets/projects/hmr/beach-terraces-by-metro/main-image.webp';

// Project interface for the simplified project list
export interface Project {
  id: number;
  number: string;
  name: string;
  location: string;
  image: ImageMetadata;
}

// Project data array with proper typing
export const projects: Project[] = [
  {
    id: 1,
    number: '001',
    name: 'Panorama',
    location: 'Emaar',
    image: panoramaImg,
  },
  {
    id: 2,
    number: '002',
    name: 'The Views',
    location: 'Emaar',
    image: theViewsImg,
  },
  {
    id: 3,
    number: '003',
    name: 'Park Edge',
    location: 'Emaar',
    image: parkEdgeImg,
  },
  {
    id: 4,
    number: '004',
    name: 'Coral Towers',
    location: 'Emaar',
    image: coralTowersImg,
  },
  {
    id: 5,
    number: '005',
    name: 'Pearl & Reef Towers',
    location: 'Emaar',
    image: pearlReefImg,
  },
  {
    id: 6,
    number: '006',
    name: 'AA Waterfront',
    location: 'HMR',
    image: aaWaterfrontImg,
  },
  {
    id: 7,
    number: '007',
    name: 'Gold Crest Residence',
    location: 'HMR',
    image: goldCrestImg,
  },
  {
    id: 8,
    number: '008',
    name: 'H&S Residence',
    location: 'HMR',
    image: hsResidenceImg,
  },
  {
    id: 9,
    number: '009',
    name: 'H1 Tower',
    location: 'HMR',
    image: h1TowerImg,
  },
  {
    id: 10,
    number: '010',
    name: 'Saima Marina',
    location: 'HMR',
    image: saimaMarinaImg,
  },
  {
    id: 11,
    number: '011',
    name: 'Saima Waterfront',
    location: 'HMR',
    image: saimaWaterfrontImg,
  },
  {
    id: 12,
    number: '012',
    name: 'Beach Terraces by Metro',
    location: 'HMR',
    image: beachTerraceImg,
  },
];

// Utility functions with proper typing
export function getProjectsByLocation(location: string): Project[] {
  return projects.filter(
    project => project.location.toLowerCase() === location.toLowerCase()
  );
}

export function getProjectCounts(): { emaar: number; hmr: number } {
  const emaarCount = projects.filter(p => p.location === 'Emaar').length;
  const hmrCount = projects.filter(p => p.location === 'HMR').length;

  return {
    emaar: emaarCount,
    hmr: hmrCount,
  };
}

export function getProjectById(id: number): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getProjectByName(name: string): Project | undefined {
  return projects.find(
    project => project.name.toLowerCase() === name.toLowerCase()
  );
}
