const sharp = require('sharp');
const path = require('path');

const imgPath = 'C:\\Users\\Javohir\\.gemini\\antigravity-ide\\brain\\ee782661-c566-4557-930c-a7b74d0cf08d\\.user_uploaded\\media_1790230804132.jpg';

sharp(imgPath)
  .metadata()
  .then(metadata => {
    console.log(`Width: ${metadata.width}, Height: ${metadata.height}`);
  })
  .catch(err => {
    console.error('Error:', err);
  });
