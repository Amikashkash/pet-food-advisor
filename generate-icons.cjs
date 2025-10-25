const sharp = require('sharp');
const fs = require('fs');

// Create an SVG icon with purple gradient and paw print
const createIconSVG = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#a78bfa;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#6d28d9;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad)"/>
  <g transform="translate(${size * 0.5}, ${size * 0.5})">
    <!-- Paw print -->
    <ellipse cx="0" cy="0" rx="${size * 0.15}" ry="${size * 0.2}" fill="white" opacity="0.9"/>
    <circle cx="${-size * 0.08}" cy="${-size * 0.15}" r="${size * 0.08}" fill="white" opacity="0.9"/>
    <circle cx="${size * 0.08}" cy="${-size * 0.15}" r="${size * 0.08}" fill="white" opacity="0.9"/>
    <circle cx="${-size * 0.12}" cy="${-size * 0.28}" r="${size * 0.07}" fill="white" opacity="0.9"/>
    <circle cx="${size * 0.12}" cy="${-size * 0.28}" r="${size * 0.07}" fill="white" opacity="0.9"/>
  </g>
</svg>
`;

async function generateIcons() {
  const sizes = [192, 512];

  console.log('Generating PWA icons...\n');

  for (const size of sizes) {
    const svgBuffer = Buffer.from(createIconSVG(size));
    const outputPath = `public/icons/icon-${size}x${size}.png`;

    await sharp(svgBuffer)
      .png()
      .toFile(outputPath);

    console.log(`✓ Generated ${outputPath}`);
  }

  // Generate favicon
  const faviconSVG = Buffer.from(createIconSVG(32));
  await sharp(faviconSVG)
    .resize(32, 32)
    .png()
    .toFile('public/favicon.ico');

  console.log('✓ Generated public/favicon.ico');

  console.log('\n✅ All icons generated successfully!');
}

generateIcons().catch(console.error);
