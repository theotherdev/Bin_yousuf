// src/config/app.config.ts - Application configuration constants
export const APP_CONFIG = {
  // Site information
  site: {
    name: 'BinYousuf Group',
    shortName: 'BYG',
    url: 'https://www.binyousufgroup.com',
    description: 'BinYousuf Group (BYG) - Official sales partners of Emaar Oceanfront & HMR Waterfront.',
  },

  // Contact information
  contact: {
    whatsapp: {
      number: '+923162283100',
      url: 'https://wa.me/923162283100',
      message: 'Hello! I\'m interested in learning more about your waterfront properties.',
    },
    email: 'info@binyousufgroup.com',
    address: 'Karachi, Pakistan',
  },

  // Social media links
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
  },

  // Business partnerships
  partnerships: [
    'Emaar Oceanfront',
    'HMR Waterfront',
  ],

  // SEO defaults
  seo: {
    defaultTitle: 'BinYousuf Group - Luxury Waterfront Properties Karachi',
    defaultDescription: 'Official sales partners of Emaar Oceanfront & HMR Waterfront. Discover luxury sea-facing apartments and waterfront properties in DHA Phase 8, Karachi.',
    keywords: [
      'waterfront properties Karachi',
      'Emaar Oceanfront Karachi',
      'HMR Waterfront',
      'luxury apartments Karachi',
      'sea facing apartments DHA Phase 8',
      'BinYousuf Group',
      'real estate Karachi',
      'oceanfront properties Pakistan',
      'luxury real estate investment',
      'DHA Phase 8 properties',
      'waterfront living Karachi',
    ],
  },
} as const;