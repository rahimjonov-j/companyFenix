const fs = require('fs');
const files = [
  'src/sections/Technology/Technology.tsx',
  'src/sections/Products/Products.tsx',
  'src/sections/ProductExperience/ProductExperience.tsx',
  'src/sections/Lifestyle/Lifestyle.tsx',
  'src/sections/Hero/Hero.tsx',
  'src/components/Navigation/Navigation.tsx',
  'index.html'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('.jpg')) {
    content = content.replace(/\.jpg/g, '.webp');
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
