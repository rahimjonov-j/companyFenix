const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const imgPath = path.join(PUBLIC_DIR, 'filters-all.jpg');

async function sliceFilters() {
  const width = 144;
  const height = 440;
  const startX = 80;
  const startY = 160;

  for (let i = 0; i < 6; i++) {
    const left = startX + i * 143;
    const outputName = path.join(PUBLIC_DIR, `stage-${i + 1}.webp`);
    
    await sharp(imgPath)
      .extract({ left, top: startY, width, height })
      .webp({ quality: 90 })
      .toFile(outputName);
      
    console.log(`Created stage-${i + 1}.webp`);
  }
}

sliceFilters().catch(console.error);
