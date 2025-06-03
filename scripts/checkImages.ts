// scripts/checkImages.ts - Script to validate images before build
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

interface ImageCheck {
  path: string;
  exists: boolean;
  size: number;
  error?: string;
}

async function checkImageFile(filePath: string): Promise<ImageCheck> {
  try {
    const stats = await stat(filePath);
    return {
      path: filePath,
      exists: true,
      size: stats.size
    };
  } catch (error) {
    return {
      path: filePath,
      exists: false,
      size: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function scanProjectImages(): Promise<void> {
  const projectsPath = join(process.cwd(), 'src/assets/projects');
  const issues: ImageCheck[] = [];
  
  try {
    const locations = await readdir(projectsPath);
    
    for (const location of locations) {
      const locationPath = join(projectsPath, location);
      const locationStat = await stat(locationPath);
      
      if (locationStat.isDirectory()) {
        const projects = await readdir(locationPath);
        
        for (const project of projects) {
          const projectPath = join(locationPath, project);
          const projectStat = await stat(projectPath);
          
          if (projectStat.isDirectory()) {
            console.log(`\n📁 Checking ${location}/${project}:`);
            
            // Check main image
            const mainImagePath = join(projectPath, 'main-image.webp');
            const mainImageCheck = await checkImageFile(mainImagePath);
            
            if (!mainImageCheck.exists) {
              console.log(`  ❌ Missing main-image.webp`);
              issues.push(mainImageCheck);
            } else if (mainImageCheck.size === 0) {
              console.log(`  ⚠️  Empty main-image.webp (${mainImageCheck.size} bytes)`);
              issues.push(mainImageCheck);
            } else {
              console.log(`  ✅ main-image.webp (${(mainImageCheck.size / 1024).toFixed(1)}KB)`);
            }
            
            // Check gallery images
            const projectFiles = await readdir(projectPath);
            const galleryFiles = projectFiles.filter(file => 
              file.startsWith('gallery-') && file.endsWith('.webp')
            );
            
            if (galleryFiles.length === 0) {
              console.log(`  ⚠️  No gallery images found`);
            } else {
              for (const galleryFile of galleryFiles) {
                const galleryPath = join(projectPath, galleryFile);
                const galleryCheck = await checkImageFile(galleryPath);
                
                if (galleryCheck.size === 0) {
                  console.log(`  ❌ Empty ${galleryFile} (${galleryCheck.size} bytes)`);
                  issues.push(galleryCheck);
                } else if (galleryCheck.size < 1000) {
                  console.log(`  ⚠️  Small ${galleryFile} (${galleryCheck.size} bytes)`);
                } else {
                  console.log(`  ✅ ${galleryFile} (${(galleryCheck.size / 1024).toFixed(1)}KB)`);
                }
              }
            }
          }
        }
      }
    }
    
  } catch (error) {
    console.error('Error scanning project images:', error);
  }
  
  // Summary
  console.log(`\n📊 Summary:`);
  if (issues.length === 0) {
    console.log('✅ All images are valid!');
  } else {
    console.log(`❌ Found ${issues.length} issues:`);
    issues.forEach(issue => {
      console.log(`  - ${issue.path}: ${issue.error || 'Missing or empty'}`);
    });
    
    console.log('\n🔧 To fix these issues:');
    console.log('1. Check if the image files exist');
    console.log('2. Re-export corrupted images from your image editor');
    console.log('3. Ensure images are not empty (0 bytes)');
    console.log('4. Convert images to WebP format if needed');
  }
}

// Run the check
scanProjectImages().catch(console.error);