// src/types/project.ts - Updated with amenities
import type { ImageMetadata } from 'astro';

export interface ProjectImage {
    src: ImageMetadata;
    alt: string;
    width: number;
    height: number;
}

export interface ProjectInfo {
    typology: string[];
    status: string;
    yearOfDesign: number;
    location: string;
    square: string;
    completionDate?: string; // New field for completion dates
}

export interface ProjectData {
    id: string;
    name: string;
    location: string;
    description: string;
    heroImage: ProjectImage;
    info: ProjectInfo;
    aboutProject: string;
    galleryImages: ProjectImage[];
    amenities?: string[]; // New field - array of amenity IDs
}

// Completion dates mapping (from PDF data + corrections)
export const projectCompletionDates: Record<string, string> = {
    // EMAAR Projects
    'panorama': 'March 2026',
    'the-views': 'March 2026',
    'park-edge': 'March 2028', 
    'coral-towers': 'Ready to Move',
    'pearl-reef-towers': 'Ready to Move',
    
    // HMR Projects
    'h1-tower': 'June 2026',
    'saima-tower': 'December 2028',
    'aa-waterfront': 'December 2028',
    'gold-crest': 'December 2028',
    'saima-waterfront': 'December 2028', // Same as Saima Tower
    'saima-marina': 'December 2029',
    'h-s-residence': 'December 2029',
    'beach-terraces-by-metro': 'December 2029' // 41 floors, 1-4 bedroom apartments
};