// rename-gallery.js
import fs from 'fs/promises';
import path from 'path';

async function processDirectory(dir) {
  // Read all items in this directory
  const entries = await fs.readdir(dir, { withFileTypes: true });

  // 1) Rename files in this directory
  const images = entries
    .filter(e => e.isFile() && e.name.endsWith('.webp') && e.name !== 'main-image.webp')
    .map(e => e.name)
    .sort(); // consistent ordering

  for (let i = 0; i < images.length; i++) {
    const oldName = images[i];
    const newName = `gallery-${i + 1}.webp`;
    const oldPath = path.join(dir, oldName);
    const newPath = path.join(dir, newName);

    if (oldName !== newName) {
      await fs.rename(oldPath, newPath);
      console.log(`Renamed in ${dir}: ${oldName} → ${newName}`);
    }
  }

  // 2) Recurse into subdirectories
  for (const entry of entries) {
    if (entry.isDirectory()) {
      await processDirectory(path.join(dir, entry.name));
    }
  }
}

async function renameAll() {
  // adjust this if your assets live elsewhere
  const root = path.resolve('./src/assets/projects');

  try {
    await processDirectory(root);
    console.log('All done!');
  } catch (err) {
    console.error('Error:', err);
  }
}

renameAll();
