// scripts/cleanupOldProjectFiles.ts
// Run this script to remove old individual project files after migration

import { unlink } from 'fs/promises';
import { join } from 'path';

const oldProjectFiles = [
  'panorama.astro',
  'the-views.astro',
  'park-edge.astro',
  'coral-towers.astro',
  'pearl-reef-towers.astro',
  'aa-waterfront.astro',
  'gold-crest-residence.astro',
  'hs-residence.astro',
  'h1-tower.astro',
  'saima-marina.astro',
  'saima-waterfront.astro',
  'beach-terraces-by-metro.astro'
];

async function cleanupOldFiles() {
  console.log('🧹 Starting cleanup of old project files...\n');
  
  for (const file of oldProjectFiles) {
    const filePath = join('src/pages/projects', file);
    
    try {
      await unlink(filePath);
      console.log(`✅ Removed: ${filePath}`);
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.log(`⏭️  Skipped: ${filePath} (file not found)`);
      } else {
        console.error(`❌ Error removing ${filePath}:`, error.message);
      }
    }
  }
  
  console.log('\n✨ Cleanup complete!');
  console.log('📝 Note: Make sure the new dynamic route is working before deleting this script.');
}

// Run the cleanup
cleanupOldFiles().catch(console.error);

// To run this script:
// npx tsx scripts/cleanupOldProjectFiles.ts