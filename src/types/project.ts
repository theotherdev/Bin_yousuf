// src/types/project.ts - Fixed types to match Astro's ImageMetadata
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
}