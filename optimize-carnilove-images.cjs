const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'public', 'assets', 'pic');
const outputDir = path.join(__dirname, 'public', 'assets', 'pic');

// Mapping of product codes to image filenames
const imageMapping = {
  'CL_DOG_001': 'carnilove-lamb-boar.png',           // Lamb & Wild Boar
  'CL_DOG_002': 'carnilove-puppy-salmon-L.png',      // Puppy Salmon & Turkey (Large)
  'CL_DOG_003': 'carnilove_salmon_larg.png',         // Adult Salmon & Turkey (Large)
  'CL_DOG_004': 'carnilove- salmon-medium.png',      // Adult Salmon (Medium)
  'CL_CAT_001': 'carnilove-duck.png',                // Duck & Turkey
  'CL_CAT_002': 'carnilove-lamb.png',                // Lamb & Wild Boar
  'CL_CAT_003': 'carnilove-kitten-salmon.png',       // Kitten Salmon & Turkey
  'CL_CAT_004': 'carnilove-salmon-cat.png',          // Salmon
  'CL_CAT_005': 'carnilove-duch-phesant.png'         // Duck & Pheasant
};

async function optimizeImage(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const inputSize = stats.size;

    console.log(`\nOptimizing: ${path.basename(inputPath)}`);
    console.log(`Original size: ${(inputSize / 1024).toFixed(2)} KB`);

    await sharp(inputPath)
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .png({
        quality: 80,
        compressionLevel: 9
      })
      .toFile(outputPath + '.tmp');

    // Replace original with optimized
    fs.renameSync(outputPath + '.tmp', outputPath);

    const newStats = fs.statSync(outputPath);
    const outputSize = newStats.size;
    const reduction = ((inputSize - outputSize) / inputSize * 100).toFixed(1);

    console.log(`Optimized size: ${(outputSize / 1024).toFixed(2)} KB`);
    console.log(`Reduction: ${reduction}%`);

    return { inputSize, outputSize, reduction };
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

async function optimizeAllImages() {
  console.log('=== Carnilove Image Optimization ===\n');

  let totalInputSize = 0;
  let totalOutputSize = 0;
  let optimizedCount = 0;

  for (const [productCode, filename] of Object.entries(imageMapping)) {
    const inputPath = path.join(inputDir, filename);
    const outputPath = path.join(outputDir, filename);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Image not found: ${filename}`);
      continue;
    }

    const result = await optimizeImage(inputPath, outputPath);

    if (result) {
      totalInputSize += result.inputSize;
      totalOutputSize += result.outputSize;
      optimizedCount++;
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Images optimized: ${optimizedCount}/${Object.keys(imageMapping).length}`);
  console.log(`Total original size: ${(totalInputSize / 1024).toFixed(2)} KB`);
  console.log(`Total optimized size: ${(totalOutputSize / 1024).toFixed(2)} KB`);
  console.log(`Total reduction: ${((totalInputSize - totalOutputSize) / totalInputSize * 100).toFixed(1)}%`);

  // Update the products JSON with correct image paths
  updateProductsJSON();
}

function updateProductsJSON() {
  console.log('\n=== Updating carnilove_products.json ===');

  const productsPath = path.join(__dirname, 'assets', 'carnilove_products.json');
  const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  for (const [productCode, filename] of Object.entries(imageMapping)) {
    if (productsData.products[productCode]) {
      productsData.products[productCode].image = `/assets/pic/${filename}`;
      console.log(`✅ ${productCode}: ${filename}`);
    }
  }

  fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2));
  console.log('\n✅ Products JSON updated successfully!');
}

// Run optimization
optimizeAllImages().catch(console.error);
