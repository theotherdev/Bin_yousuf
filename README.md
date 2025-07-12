# Bin Yousuf Group - Premium Real Estate

[![Live Website](https://img.shields.io/badge/Live-Website-blue?style=for-the-badge)](https://www.binyousufgroup.com)
[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro-orange?style=for-the-badge&logo=astro)](https://astro.build)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)

A modern, responsive real estate website built with Astro, React, TypeScript, and GSAP animations. Showcasing premium properties from EMAAR Oceanfront and HMR Waterfront developments in Karachi, Pakistan.

## 🚀 Live Demo

🌐 **[View Live Website](https://www.binyousufgroup.com)**

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Quick Start](#-quick-start)
- [Environment Setup](#-environment-setup)
- [Build & Deploy](#-build--deploy)
- [Project Structure](#-project-structure)
- [Featured Properties](#-featured-properties)
- [Lead Management](#-lead-management)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

## ✨ Features

### 🎨 **Modern Design**
- Clean, professional interface optimized for real estate
- Responsive design for all devices
- Custom typography with clean font hierarchy
- Sophisticated neutral color scheme (#4c4c4c, #666)

### 🎭 **Smooth Animations**
- GSAP-powered smooth transitions
- Scroll-triggered animations
- Interactive project galleries
- Engaging hero section animations
- Crossfade effects between projects

### 📱 **Mobile-First Experience**
- Touch-optimized interactions
- Adaptive layouts for all screen sizes
- Custom mobile navigation
- Optimized performance on mobile devices

### 🏗️ **Property Showcase**
- Dynamic project grid with filtering
- Interactive sidebar navigation
- Detailed property pages with specifications
- High-quality image galleries
- Smart navigation between properties

### 📋 **Lead Generation**
- Contact form with Google Sheets integration
- All fields optional for better conversion
- Real-time form validation
- WhatsApp integration for direct contact
- Automatic lead tracking and management

### ⚡ **Performance Optimized**
- Astro SSR with Vercel deployment
- Optimized images with WebP format
- Lazy loading for improved performance
- Minimal JavaScript bundle
- Fast loading times

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) (SSR mode)
- **Frontend**: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Backend**: Google Sheets API for lead management

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/imossaidqadri/Bin_yousuf.git
   cd Bin_yousuf
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your Google Sheets API credentials
   ```

4. **Start development server**
   ```bash
   bun run dev
   # or npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:4321
   ```

## 🔧 Environment Setup

Create a `.env` file with the following variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.binyousufgroup.com
CONTACT_NUMBER=+923360878079

# Google Sheets API Configuration
GOOGLE_SHEET_ID=your_sheet_id
GOOGLE_PROJECT_ID=your_project_id
GOOGLE_PRIVATE_KEY_ID=your_private_key_id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=your_service_account@your_project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_X509_CERT_URL=your_cert_url
```

## 🚀 Build & Deploy

### Build for production
```bash
bun run build
```

### Preview production build
```bash
bun run preview
```

### Deploy to Vercel
```bash
vercel deploy
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Navigation.tsx    # Main navigation
│   ├── HeroSection.tsx   # Homepage hero
│   ├── ContactForm.tsx   # Lead generation form
│   ├── ProjectsGrid.tsx  # Property grid
│   ├── ProjectsSidebar.tsx
│   ├── Footer.tsx
│   └── StickyWhatsAppButton.tsx
├── layouts/              # Astro layouts
│   ├── Layout.astro      # Base layout
│   └── ProjectLayout.astro
├── pages/                # Astro pages & API routes
│   ├── index.astro       # Homepage
│   ├── projects.astro    # Properties page
│   ├── about.astro       # About page
│   ├── privacy-policy.astro
│   ├── api/
│   │   └── sheets.ts     # Google Sheets API endpoint
│   └── projects/
│       └── [id].astro    # Dynamic property pages
├── data/                 # Property data
│   ├── projects.js       # Property definitions
│   └── projects.d.ts     # Type definitions
├── hooks/                # Custom React hooks
│   └── useProjectAnimations.ts
├── types/                # TypeScript types
│   └── project.ts
├── assets/               # Images and media
│   └── projects/
│       ├── emaar/        # EMAAR project images
│       └── hmr/          # HMR project images
└── styles/
    └── global.css        # Global styles
```

## 🏡 Featured Properties

### EMAAR Oceanfront
- **Panorama** - Premium beachfront apartments
- **The Views** - Luxury residential towers
- **Park Edge** - Modern family homes
- **Coral Towers** - High-rise living
- **Pearl & Reef Towers** - Twin tower complex

### HMR Waterfront
- **AA Waterfront** - Premium waterfront residences
- **Gold Crest Residence** - Luxury apartments
- **H&S Residence** - Modern family living
- **H1 Tower** - High-rise apartments
- **Saima Marina** - Marina-facing residences
- **Saima Waterfront** - Waterfront luxury
- **Beach Terraces By Metro** - Beachside living

## 📋 Lead Management

### Google Sheets Integration
- Automatic lead capture from contact forms
- Real-time data synchronization
- Lead status tracking
- Comprehensive lead information storage

### Form Features
- All fields optional for better conversion
- Email and phone validation
- Multiple project selection
- Source tracking (website, referral, etc.)
- User agent and URL tracking

## 🎨 Design System

### Color Palette
```css
Primary: #4c4c4c (Charcoal Gray)
Secondary: #666666 (Medium Gray)
Background: #ffffff (White)
Neutral: #f5f5f5 (Light Gray)
Success: #22c55e (Green)
Error: #ef4444 (Red)
```

### Typography
- Clean, professional font hierarchy
- Optimized for readability
- Responsive text scaling
- Consistent spacing

## 🎭 Animations & Interactions

### GSAP Animations
- Smooth scroll-triggered reveals
- Property image transitions
- Sidebar navigation animations
- Hero section text animations
- Loading state animations

### Interactive Features
- Hover effects on property cards
- Click-to-scroll navigation
- Image gallery lightbox
- Touch-optimized mobile interactions
- WhatsApp integration

## 📱 Responsive Design

### Breakpoints
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`
- Large Desktop: `> 1440px`

### Mobile Optimizations
- Touch-friendly navigation
- Optimized image loading
- Simplified animations
- Accessible form interactions

## 🔍 SEO & Performance

### SEO Features
- Semantic HTML structure
- Meta tags for each property
- Optimized page titles and descriptions
- Image alt attributes
- Structured data for properties

### Performance
- Server-side rendering (SSR)
- Image optimization with WebP
- Lazy loading
- Code splitting
- Minimal JavaScript

## 🧪 Development Scripts

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run preview      # Preview production build
bun run astro        # Run Astro CLI commands
```

## 📡 API Documentation

### `/api/sheets` - Lead Submission

**Endpoint:** `POST /api/sheets`

**Purpose:** Submit contact form data to Google Sheets

**Request Body:**
```json
{
  "fullName": "string (optional)",
  "email": "string (optional)",
  "phone": "string (optional)",  
  "property": "string (optional)",
  "source": "string (optional)",
  "url": "string (optional)",
  "userAgent": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lead submitted successfully",
  "rowsUpdated": 1
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "details": "Detailed error information"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

© 2025 Bin Yousuf Group. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, modification, distribution, or use of any part of this project is strictly prohibited without prior written permission from Bin Yousuf Group.

## 🙏 Acknowledgments

- **GSAP** - For smooth animations
- **Astro** - For the excellent SSR framework
- **Vercel** - For seamless deployment
- **Google Sheets API** - For lead management

## 💬 Support

### Business Inquiries
**Bin Yousuf Group**
- 🌐 Website: [binyousufgroup.com](https://www.binyousufgroup.com)
- 📱 WhatsApp: [+92 336 0878079](https://wa.me/923360878079)
- 📧 Contact: Via website form

### Technical Support
**OtherDev**
- 🌐 Website: [www.otherdev.com](https://www.otherdev.com)
- 📧 Email: hello@otherdev.com
- 💼 For technical issues, feature requests, or development support

---

<div align="center">

**Built with ❤️ for premium real estate marketing**

[![OtherDev](https://img.shields.io/badge/Developed%20by-OtherDev-blue?style=for-the-badge)](https://www.otherdev.com)

</div>