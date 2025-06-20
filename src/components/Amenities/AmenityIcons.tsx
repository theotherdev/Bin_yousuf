// src/components/Amenities/AmenityIcons.tsx
import React from 'react';

interface IconProps {
  className?: string;
}

// Panoramic Views Icon
export const PanoramicViewsIcon: React.FC<IconProps> = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="7" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M6 11L10 15L14 11L18 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="8" cy="10" r="1.5" fill="currentColor"/>
    <path d="M2 7L12 2L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Infinity Pool Icon
export const InfinityPoolIcon: React.FC<IconProps> = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 4L14 2M12 4L10 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M2 16C2 16 4 14 6 14C8 14 10 16 12 16C14 16 16 14 18 14C20 14 22 16 22 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M2 20C2 20 4 18 6 18C8 18 10 20 12 20C14 20 16 18 18 18C20 18 22 20 22 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <rect x="4" y="15" width="16" height="1" fill="currentColor" opacity="0.3"/>
  </svg>
);

// Limited Edition Penthouse Icon
export const PenthouseIcon: React.FC<IconProps> = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="10" width="16" height="10" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="6" y="6" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="8" y="2" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="6" y="12" width="2" height="2" fill="currentColor" opacity="0.6"/>
    <rect x="9" y="12" width="2" height="2" fill="currentColor" opacity="0.6"/>
    <rect x="12" y="12" width="2" height="2" fill="currentColor" opacity="0.6"/>
    <rect x="15" y="12" width="2" height="2" fill="currentColor" opacity="0.6"/>
    <rect x="18" y="12" width="2" height="2" fill="currentColor" opacity="0.6"/>
    <path d="M10 4H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Waterfront Promenade Icon
export const WaterfrontPromenadeIcon: React.FC<IconProps> = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12H22" stroke="currentColor" strokeWidth="2"/>
    <path d="M4 12V8M8 12V8M12 12V8M16 12V8M20 12V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M2 8H22" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 16C2 16 4 14 6 14C8 14 10 16 12 16C14 16 16 14 18 14C20 14 22 16 22 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M2 20C2 20 4 18 6 18C8 18 10 20 12 20C14 20 16 18 18 18C20 18 22 20 22 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Dedicated Car Parking Icon
export const CarParkingIcon: React.FC<IconProps> = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="8" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="7" cy="16" r="2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="17" cy="16" r="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 11H21" stroke="currentColor" strokeWidth="2"/>
    <path d="M5 8L7 4H17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="9" y="9" width="6" height="2" fill="currentColor" opacity="0.4"/>
  </svg>
);

// Sea Facing Apartments Icon
export const SeaFacingApartmentsIcon: React.FC<IconProps> = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="2"/>
    <path d="M4 8H20M4 12H20M4 16H20" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 4V20M12 4V20M16 4V20" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="5" y="5" width="2" height="2" fill="currentColor" opacity="0.4"/>
    <rect x="9" y="5" width="2" height="2" fill="currentColor" opacity="0.4"/>
    <rect x="13" y="5" width="2" height="2" fill="currentColor" opacity="0.4"/>
    <rect x="17" y="5" width="2" height="2" fill="currentColor" opacity="0.4"/>
    <path d="M2 22C2 22 4 20 6 20C8 20 10 22 12 22C14 22 16 20 18 20C20 20 22 22 22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Swimming Pool Icon (for regular pools)
export const SwimmingPoolIcon: React.FC<IconProps> = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="8" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 16C3 16 5 14 7 14C9 14 11 16 13 16C15 16 17 14 19 14C21 14 23 16 23 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3 20C3 20 5 18 7 18C9 18 11 20 13 20C15 20 17 18 19 18C21 18 23 20 23 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="8" cy="12" r="1" fill="currentColor" opacity="0.6"/>
    <circle cx="16" cy="12" r="1" fill="currentColor" opacity="0.6"/>
  </svg>
);

// Private Beach Access Icon
export const PrivateBeachIcon: React.FC<IconProps> = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L14 8H18L15 11L16 16L12 13L8 16L9 11L6 8H10L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <circle cx="8" cy="6" r="1" fill="currentColor"/>
    <circle cx="16" cy="6" r="1" fill="currentColor"/>
    <path d="M2 18C2 18 4 16 6 16C8 16 10 18 12 18C14 18 16 16 18 16C20 16 22 18 22 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M2 22C2 22 4 20 6 20C8 20 10 22 12 22C14 22 16 20 18 20C20 20 22 22 22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <rect x="4" y="17" width="16" height="1" fill="currentColor" opacity="0.3"/>
  </svg>
);

// Gated Community Icon
export const GatedCommunityIcon: React.FC<IconProps> = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
    <rect x="8" y="8" width="8" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 10V14" stroke="currentColor" strokeWidth="1"/>
    <path d="M10 12H14" stroke="currentColor" strokeWidth="1"/>
    <rect x="4" y="8" width="2" height="2" fill="currentColor" opacity="0.4"/>
    <rect x="4" y="11" width="2" height="2" fill="currentColor" opacity="0.4"/>
    <rect x="4" y="14" width="2" height="2" fill="currentColor" opacity="0.4"/>
    <rect x="18" y="8" width="2" height="2" fill="currentColor" opacity="0.4"/>
    <rect x="18" y="11" width="2" height="2" fill="currentColor" opacity="0.4"/>
    <rect x="18" y="14" width="2" height="2" fill="currentColor" opacity="0.4"/>
  </svg>
);

// Business Center Icon
export const BusinessCenterIcon: React.FC<IconProps> = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="5" y="7" width="2" height="1" fill="currentColor" opacity="0.4"/>
    <rect x="17" y="7" width="2" height="1" fill="currentColor" opacity="0.4"/>
  </svg>
);

// Retail Outlets Icon
export const RetailOutletsIcon: React.FC<IconProps> = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="8" width="18" height="12" rx="1" stroke="currentColor" strokeWidth="2"/>
    <path d="M5 8V6C5 4.89543 5.89543 4 7 4H17C18.1046 4 19 4.89543 19 6V8" stroke="currentColor" strokeWidth="2"/>
    <rect x="8" y="6" width="8" height="1" fill="currentColor"/>
    <rect x="6" y="10" width="3" height="2" fill="currentColor" opacity="0.4"/>
    <rect x="10" y="10" width="4" height="2" fill="currentColor" opacity="0.4"/>
    <rect x="15" y="10" width="3" height="2" fill="currentColor" opacity="0.4"/>
    <path d="M6 16H18" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="14" r="1" fill="currentColor"/>
  </svg>
);

// Central Park Views Icon  
export const CentralParkIcon: React.FC<IconProps> = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="8" cy="10" r="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="16" cy="8" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6 16L10 12L14 16L18 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 18C10 18 11 16 12 16C13 16 14 18 14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="6" r="1" fill="currentColor" opacity="0.6"/>
    <circle cx="7" cy="15" r="0.5" fill="currentColor" opacity="0.6"/>
    <circle cx="17" cy="15" r="0.5" fill="currentColor" opacity="0.6"/>
  </svg>
);

// Export all icons as a collection
export const amenityIcons = {
  'panoramic-sea-views': PanoramicViewsIcon,
  'infinity-pool': InfinityPoolIcon,
  'swimming-pool': SwimmingPoolIcon,
  'private-beach': PrivateBeachIcon,
  'penthouse': PenthouseIcon,
  'waterfront-promenade': WaterfrontPromenadeIcon,
  'car-parking': CarParkingIcon,
  'sea-facing-apartments': SeaFacingApartmentsIcon,
  'gated-community': GatedCommunityIcon,
  'business-center': BusinessCenterIcon,
  'retail-outlets': RetailOutletsIcon,
  'central-park': CentralParkIcon
} as const;