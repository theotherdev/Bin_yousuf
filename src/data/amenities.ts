// src/data/amenities.ts
import { amenityIcons } from '../components/Amenities/AmenityIcons';

export interface ProjectAmenity {
  id: string;
  name: string;
  icon: keyof typeof amenityIcons;
  category: 'views' | 'recreation' | 'accommodation' | 'infrastructure' | 'lifestyle';
}

// Complete amenities database
export const amenitiesData: Record<string, ProjectAmenity> = {
  // Views & Location
  'panoramic-sea-views': {
    id: 'panoramic-sea-views',
    name: 'Panoramic Views of the Arabian Sea',
    icon: 'panoramic-sea-views',
    category: 'views'
  },
  'central-park-views': {
    id: 'central-park-views', 
    name: 'Central Park Views',
    icon: 'central-park',
    category: 'views'
  },
  
  // Recreation
  'infinity-pool': {
    id: 'infinity-pool',
    name: 'Infinity Pool',
    icon: 'infinity-pool', 
    category: 'recreation'
  },
  'swimming-pool': {
    id: 'swimming-pool',
    name: 'Swimming Pool',
    icon: 'swimming-pool',
    category: 'recreation'
  },
  'private-beach': {
    id: 'private-beach',
    name: 'Private Beach Access',
    icon: 'private-beach',
    category: 'recreation'
  },
  
  // Accommodation  
  'limited-penthouse': {
    id: 'limited-penthouse',
    name: 'Limited Edition Penthouse',
    icon: 'penthouse',
    category: 'accommodation'
  },
  'sea-facing-apartments': {
    id: 'sea-facing-apartments',
    name: '1-4 Bedroom Apartments Sea Facing',
    icon: 'sea-facing-apartments',
    category: 'accommodation'
  },
  'apartment-penthouse': {
    id: 'apartment-penthouse',
    name: '1-4 Bedroom Apartments+Penthouse',
    icon: 'sea-facing-apartments',
    category: 'accommodation'
  },
  
  // Infrastructure
  'waterfront-promenade': {
    id: 'waterfront-promenade',
    name: 'Waterfront Promenade',
    icon: 'waterfront-promenade',
    category: 'infrastructure'
  },
  'dedicated-parking': {
    id: 'dedicated-parking',
    name: 'Dedicated Car Parking',
    icon: 'car-parking',
    category: 'infrastructure'
  },
  'business-center': {
    id: 'business-center',
    name: 'Business Center',
    icon: 'business-center',
    category: 'infrastructure'
  },
  'retail-outlets': {
    id: 'retail-outlets',
    name: 'Retail Outlets',
    icon: 'retail-outlets',
    category: 'infrastructure'
  },
  
  // Lifestyle
  'gated-community': {
    id: 'gated-community',
    name: 'Safe & Secure Gated Community',
    icon: 'gated-community',
    category: 'lifestyle'
  }
};

// Project-specific amenities mapping based on PDF data
export const projectAmenities: Record<string, string[]> = {
  // EMAAR PROJECTS
  'panorama': [
    'panoramic-sea-views',
    'infinity-pool', 
    'limited-penthouse',
    'waterfront-promenade',
    'dedicated-parking',
    'sea-facing-apartments'
  ],
  
  'the-views': [
    'panoramic-sea-views',
    'infinity-pool',
    'limited-penthouse', 
    'waterfront-promenade',
    'dedicated-parking',
    'sea-facing-apartments'
  ],
  
  'park-edge': [
    'central-park-views',
    'limited-penthouse',
    'private-beach',
    'dedicated-parking',
    'sea-facing-apartments'
  ],
  
  'coral-towers': [
    'panoramic-sea-views',
    'swimming-pool',
    'apartment-penthouse',
    'dedicated-parking',
    'gated-community'
  ],
  
  'pearl-reef-towers': [
    'panoramic-sea-views', 
    'swimming-pool',
    'apartment-penthouse',
    'dedicated-parking',
    'gated-community'
  ],
  
  // HMR PROJECTS
  'h1-tower': [
    'gated-community',
    'infinity-pool',
    'private-beach',
    'retail-outlets',
    'dedicated-parking',
    'apartment-penthouse'
  ],
  
  // Note: Saima Tower and Saima Waterfront have identical amenities
  'saima-tower': [
    'gated-community',
    'infinity-pool', 
    'private-beach',
    'dedicated-parking',
    'apartment-penthouse'
  ],
  
  'aa-waterfront': [
    'gated-community',
    'swimming-pool',
    'private-beach',
    'retail-outlets',
    'apartment-penthouse'
  ],
  
  // Gold Crest (try both variations)
  'gold-crest': [
    'gated-community',
    'infinity-pool',
    'private-beach',
    'business-center',
    'dedicated-parking',
    'apartment-penthouse'
  ],
  'gold-crest-residence': [
    'gated-community',
    'infinity-pool',
    'private-beach',
    'business-center',
    'dedicated-parking',
    'apartment-penthouse'
  ],
  
  'saima-marina': [
    'gated-community',
    'swimming-pool',
    'private-beach',
    'dedicated-parking',
    'apartment-penthouse'
  ],
  
  'h-s-residence': [
    'gated-community',
    'private-beach',
    'swimming-pool',
    'apartment-penthouse'
  ],
  
  // Note: Same amenities as Saima Tower
  'saima-waterfront': [
    'gated-community',
    'infinity-pool', 
    'private-beach',
    'dedicated-parking',
    'apartment-penthouse'
  ],
  
  // Beach Terraces: 41 floors, 1-4 bedroom apartments, Dec 2029 completion
  'beach-terraces-by-metro': [
    'private-beach',
    'swimming-pool',
    'retail-outlets',
    'apartment-penthouse',
    'dedicated-parking'
  ]
};

// Helper function to get amenities for a project
export const getProjectAmenities = (projectId: string): ProjectAmenity[] => {
  const amenityIds = projectAmenities[projectId] || [];
  return amenityIds.map(id => amenitiesData[id]).filter(Boolean);
};

// Helper function to get amenities by category
export const getAmenitiesByCategory = (amenities: ProjectAmenity[]) => {
  return amenities.reduce((acc, amenity) => {
    if (!acc[amenity.category]) {
      acc[amenity.category] = [];
    }
    acc[amenity.category].push(amenity);
    return acc;
  }, {} as Record<string, ProjectAmenity[]>);
};