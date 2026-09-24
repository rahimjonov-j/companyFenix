import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

async function optimizeImages() {
  const files = fs.readdirSync(PUBLIC_DIR);
  
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.png')) {
      const inputPath = path.join(PUBLIC_DIR, file);
      const outputWebp = path.join(PUBLIC_DIR, file.replace(/\.(jpg|png)$/, '.webp'));
      
      console.log(`Optimizing ${file}...`);
      
      try {
        await sharp(inputPath)
          .resize(1200, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputWebp);
          
        console.log(`Created ${path.basename(outputWebp)}`);
        
        // Also save a smaller jpg just in case
        const tempJpg = inputPath + '.temp';
        await sharp(inputPath)
          .resize(1200, null, { withoutEnlargement: true })
          .jpeg({ quality: 80, progressive: true })
          .toFile(tempJpg);
          
        fs.unlinkSync(inputPath);
        fs.renameSync(tempJpg, inputPath);
        console.log(`Optimized ${file}`);
        
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err);
      }
    }
  }
}

optimizeImages().catch(console.error);
