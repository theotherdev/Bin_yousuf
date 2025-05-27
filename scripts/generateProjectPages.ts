// scripts/generateProjectPages.ts
// Run this script to generate all 12 project pages

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const projects = [
    {
        id: 'panorama',
        name: 'Panorama',
        location: 'Emaar',
        number: '001'
    },
    {
        id: 'the-views',
        name: 'The Views',
        location: 'Emaar',
        number: '002'
    },
    {
        id: 'park-edge',
        name: 'Park Edge',
        location: 'Emaar',
        number: '003'
    },
    {
        id: 'coral-towers',
        name: 'Coral Towers',
        location: 'Emaar',
        number: '004'
    },
    {
        id: 'pearl-reef-towers',
        name: 'Pearl & Reef Towers',
        location: 'Emaar',
        number: '005'
    },
    {
        id: 'aa-waterfront',
        name: 'AA Waterfront',
        location: 'HMR',
        number: '006'
    },
    {
        id: 'gold-crest-residence',
        name: 'Gold Crest Residence',
        location: 'HMR',
        number: '007'
    },
    {
        id: 'hs-residence',
        name: 'H&S Residence',
        location: 'HMR',
        number: '008'
    },
    {
        id: 'h1-tower',
        name: 'H1 Tower',
        location: 'HMR',
        number: '009'
    },
    {
        id: 'saima-marina',
        name: 'Saima Marina',
        location: 'HMR',
        number: '010'
    },
    {
        id: 'saima-waterfront',
        name: 'Saima Waterfront',
        location: 'HMR',
        number: '011'
    },
    {
        id: 'beach-terraces-by-metro',
        name: 'Beach Terraces By Metro',
        location: 'HMR',
        number: '012'
    }
];

const generateProjectPageTemplate = (project: any) => `---
// src/pages/projects/${project.id}.astro
import ProjectLayout from '../../layouts/ProjectLayout.astro';
import type { ProjectData } from '../../types/project';

// Import your project images - Update these paths with your actual image imports
import heroImg from '../../assets/projects/${project.location.toLowerCase()}/${project.id}/main-image.webp';
import gallery1 from '../../assets/projects/${project.location.toLowerCase()}/${project.id}/gallery-1.webp';
import gallery2 from '../../assets/projects/${project.location.toLowerCase()}/${project.id}/gallery-2.webp';
import gallery3 from '../../assets/projects/${project.location.toLowerCase()}/${project.id}/gallery-3.webp';
import gallery4 from '../../assets/projects/${project.location.toLowerCase()}/${project.id}/gallery-4.webp';

const projectData: ProjectData = {
    id: '${project.id}',
    name: '${project.name}',
    location: '${project.location}',
    description: 'Add your project description here. This should be a compelling overview of the project that captures its essence and key features.',
    heroImage: {
        src: heroImg,
        alt: '${project.name} - Main View',
        width: 1920,
        height: 1080
    },
    info: {
        typology: ['Architecture', 'Residential'], // Update with actual typologies
        status: 'Completed', // Update with actual status
        yearOfDesign: 2023, // Update with actual year
        location: 'Location Details', // Update with specific location
        square: '0000 m2' // Update with actual area
    },
    aboutProject: \`Add detailed project information here. This should include:
    - Design concept and philosophy
    - Key architectural features
    - Environmental considerations
    - Technical specifications
    - Any unique aspects of the project\`,
    galleryImages: [
        {
            src: gallery1,
            alt: '${project.name} - Gallery Image 1',
            width: 1200,
            height: 800
        },
        {
            src: gallery2,
            alt: '${project.name} - Gallery Image 2',
            width: 1200,
            height: 800
        },
        {
            src: gallery3,
            alt: '${project.name} - Gallery Image 3',
            width: 1200,
            height: 800
        },
        {
            src: gallery4,
            alt: '${project.name} - Gallery Image 4',
            width: 1200,
            height: 800
        }
    ]
};
---

<ProjectLayout project={projectData} />`;

// Generate all project pages and required directories
const createDirectories = () => {
    const directories = [
        'src/pages/projects',
        'src/layouts',
        'src/types',
        'src/assets/projects/emaar',
        'src/assets/projects/hmr'
    ];

    directories.forEach(dir => {
        mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
    });

    // Create project-specific asset directories
    projects.forEach(project => {
        const assetDir = `src/assets/projects/${project.location.toLowerCase()}/${project.id}`;
        mkdirSync(assetDir, { recursive: true });
        console.log(`Created asset directory: ${assetDir}`);
    });
};

try {
    // Create all necessary directories
    createDirectories();
    
    // Generate project pages
    projects.forEach(project => {
        const filename = `${project.id}.astro`;
        const filepath = join('src/pages/projects', filename);
        const content = generateProjectPageTemplate(project);
        
        writeFileSync(filepath, content);
        console.log(`Generated: ${filepath}`);
    });
    
    console.log(`\nSuccessfully generated ${projects.length} project pages!`);
    console.log('\nNext steps:');
    console.log('1. Create src/layouts/ProjectLayout.astro (template provided)');
    console.log('2. Create src/types/project.ts (template provided)');
    console.log('3. Add your actual images to the asset directories');
    console.log('4. Update the project descriptions and details in each file');
    
} catch (error) {
    console.error('Error generating project pages:', error);
}