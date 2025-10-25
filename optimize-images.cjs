const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'public/assets/pic';
const outputDir = 'public/assets/pic-optimized';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all PNG files
const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.png'));

console.log(`Optimizing ${files.length} images...`);

let completed = 0;

files.forEach(async (file) => {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);

  try {
    const originalSize = fs.statSync(inputPath).size;

    await sharp(inputPath)
      .resize(800, 800, { // Max 800x800 pixels
        fit: 'inside',
        withoutEnlargement: true
      })
      .png({
        quality: 80,
        compressionLevel: 9,
        adaptiveFiltering: true
      })
      .toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    const reduction = ((1 - newSize/originalSize) * 100).toFixed(1);

    console.log(`✓ ${file}: ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (${reduction}% reduction)`);

    completed++;

    if (completed === files.length) {
      console.log(`\n✅ Done! Optimized ${completed} images.`);
      console.log('Now run: npm run replace-images');
    }
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
  }
});
