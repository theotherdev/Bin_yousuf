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
    apartmentTypes?: string; // New field for apartment types (e.g., "1-4 bed")
    floors?: string; // New field for number of floors
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

// Completion dates mapping - accurate data provided
export const projectCompletionDates: Record<string, string> = {
    // EMAAR Projects (5 projects)
    'panorama': 'March 2026',
    'the-views': 'March 2026',
    'park-edge': 'March 2028', 
    'coral-towers': 'Ready to Move',
    'pearl-reef-towers': 'Ready to Move',
    
    // HMR Projects (7 projects)
    'aa-waterfront': 'December 2028',
    'gold-crest-residence': 'December 2028',
    'hs-residence': 'December 2029',
    'h1-tower': 'June 2026',
    'saima-marina': 'December 2029',
    'saima-waterfront': 'December 2028',
    'beach-terraces-by-metro': 'December 2029'
};

// Floors mapping - accurate data provided
export const projectFloors: Record<string, string> = {
    // EMAAR Projects (5 projects)
    'panorama': '45',
    'the-views': '43',
    'park-edge': '41', 
    'coral-towers': '28',
    'pearl-reef-towers': '21',
    
    // HMR Projects (7 projects)
    'aa-waterfront': '34',
    'gold-crest-residence': '33',
    'hs-residence': '39',
    'h1-tower': '34',
    'saima-marina': '40',
    'saima-waterfront': '40',
    'beach-terraces-by-metro': '41'
};

// Apartment types mapping - accurate data provided
export const projectApartmentTypes: Record<string, string> = {
    // EMAAR Projects (5 projects)
    'panorama': '1-4 Bedroom + Limited Edition Penthouse',
    'the-views': '1-4 Bedroom',
    'park-edge': '1-4 Bedroom + Penthouse', 
    'coral-towers': '1-4 Bedroom + Townhouse Duplex',
    'pearl-reef-towers': '1-4 Bedroom + Penthouse',
    
    // HMR Projects (7 projects)
    'h1-tower': '1-4 Bedroom + Penthouse',
    'aa-waterfront': '1-4 Bedroom + Penthouse',
    'gold-crest-residence': '1-4 Bedroom + Penthouse',
    'hs-residence': '1-4 Bedroom + Penthouse',
    'saima-marina': '1-4 Bedroom + Penthouse',
    'saima-waterfront': '1-4 Bedroom + Penthouse',
    'beach-terraces-by-metro': '1-4 Bedroom + Penthouse'
};