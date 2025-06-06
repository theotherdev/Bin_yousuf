# BYG  - Real Estate 

A modern, responsive real estate website built with Astro, React, TypeScript, and GSAP animations. Showcasing premium projects from EMAAR Oceanfront and HMR Waterfront developments.

## 🚀 Live Demo

[https://binyousufgroup.com/](#) <!-- Add your live URL here -->

## ✨ Features

### 🎨 **Modern Design**
- Clean, minimalist interface
- Responsive design for all devices
- Custom typography with Poppins font
- Professional color scheme

### 🎭 **Smooth Animations**
- GSAP-powered animations
- Smooth scroll transitions
- Interactive project grid
- Hero text animations
- Crossfade effects

### 📱 **Responsive Experience**
- Mobile-first design approach
- Touch-optimized interactions
- Adaptive layouts
- Custom mobile navigation

### 🏗️ **Project Showcase**
- Dynamic project grid
- Interactive sidebar navigation
- Project detail pages
- Image galleries with lightbox
- Smart navigation between projects

### ⚡ **Performance Optimized**
- Astro static site generation
- Optimized images with WebP format
- Lazy loading for images
- Minimal JavaScript bundle
- Fast loading times

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Frontend**: [React](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/byg-design-studio.git
   cd byg-design-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:4321
   ```

## 🚀 Build & Deploy

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Deploy to various platforms
- **Vercel**: Connect your repo and deploy automatically
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Navigation.tsx
│   ├── HeroSection.tsx
│   ├── ProjectsGrid.tsx
│   ├── ProjectsSidebar.tsx
│   └── ProjectsList.tsx
├── layouts/              # Astro layouts
│   ├── Layout.astro
│   └── ProjectLayout.astro
├── pages/                # Astro pages
│   ├── index.astro
│   ├── projects.astro
│   ├── about.astro
│   └── projects/
│       └── [id].astro
├── data/                 # Project data
│   ├── projects.js
│   └── projects.d.ts
├── types/                # TypeScript types
│   └── project.ts
├── scripts/              # TypeScript utilities
│   ├── main/
│   ├── types/
│   └── utils/
├── styles/               # Global styles
│   └── global.css
└── assets/               # Images and media
    └── projects/
        ├── emaar/
        └── hmr/
```

## 🎯 Key Components

### **Home Page (`index.astro`)**
- Hero section with animated text
- Interactive project grid
- Smooth scroll animations
- Project sidebar navigation

### **Projects Page (`projects.astro`)**
- Full-screen project showcase
- Smooth transitions between projects
- Keyboard navigation support
- Responsive design

### **Project Detail Pages (`[id].astro`)**
- Dynamic routing for each project
- Image galleries with lightbox
- Project information and specifications
- Smart navigation between projects

### **Interactive Sidebar**
- Real-time scroll highlighting
- Click-to-scroll functionality
- Auto-scrolling sidebar
- Smooth GSAP animations

## 🎨 Styling Architecture

### **Tailwind CSS**
- Utility-first CSS framework
- Custom design system
- Responsive breakpoints
- Component-based styling

### **Global Styles**
- Custom font loading
- Animation keyframes
- Component layer styling
- Utility classes

### **Color Palette**
```css
Primary: #4c4c4c
Secondary: #666
Accent: #667eea - #764ba2 (gradient)
Background: #ffffff
Text: #333333
```

## 🔧 Configuration

### **Astro Config**
```javascript
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false
    })
  ]
});
```

### **TypeScript Config**
- Strict type checking
- Path aliases for imports
- React JSX support

### **Tailwind Config**
- Custom breakpoints
- Extended color palette
- Custom animations
- Font configurations

## 📊 Project Data Structure

```typescript
interface Project {
  id: number;
  number: string;
  name: string;
  location: string;
  image: ImageMetadata;
}

interface ProjectData {
  id: string;
  name: string;
  location: string;
  description: string;
  heroImage: ProjectImage;
  info: ProjectInfo;
  aboutProject: string;
  galleryImages: ProjectImage[];
}
```

## 🎭 Animations & Interactions

### **GSAP Animations**
- Smooth scroll-triggered animations
- Project image transitions
- Sidebar reveal animations
- Hero text cycling

### **Interactive Features**
- Hover effects on project cards
- Click-to-scroll navigation
- Image gallery lightbox
- Responsive touch interactions

## 📱 Responsive Design

### **Breakpoints**
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

### **Mobile Optimizations**
- Touch-friendly navigation
- Optimized image sizes
- Simplified animations
- Accessible interactions

## 🔍 SEO & Performance

### **SEO Features**
- Semantic HTML structure
- Meta tags for each page
- Optimized page titles
- Image alt attributes

### **Performance**
- Static site generation
- Image optimization
- Lazy loading
- Minimal JavaScript

## 🧪 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run astro        # Run Astro CLI commands
```

## 🔧 Utilities & Scripts

### **Image Management**
- `generateProjectPages.ts` - Generate project pages
- `checkImages.ts` - Validate project images
- `cleanupOldProjectFiles.ts` - Remove old files

### **Animation System**
- GSAP loader utility
- Animation state management
- Scroll-triggered animations
- Responsive animation handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

© 2025 OtherDev. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, modification, distribution, or use of any part of this project is strictly prohibited without prior written permission from OtherDev.

## 🙏 Acknowledgments
- **GSAP** - For smooth animations
- **Astro** - For the excellent framework
- **Vercel** - For seamless deployment

## 📞 Contact

**OtherDev**
- Website: [https://www.otherdev.com/](#)
- Email: hello@otherdev.com
- LinkedIn: [https://www.linkedin.com/company/theotherdev/](#)

---

**Built with ❤️ using Astro, React, and TypeScript**
