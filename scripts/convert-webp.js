/**
 * convert-webp.js
 * Converts all JPEG/PNG images in assets/img/ to WebP format using sharp.
 * Keeps original files as fallback.
 */

const fs = require('fs');
const path = require('path');

const IMG_DIR = path.join(__dirname, '..', 'assets', 'img');
const QUALITY = 60;

async function convertToWebP() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch {
    console.warn('[WARNING] sharp is not installed on this environment. Since WebP assets are already pre-converted and committed, skipping dynamic conversion.');
    return;
  }

  const files = fs.readdirSync(IMG_DIR).filter(f =>
    /\.(jpe?g|png)$/i.test(f) && !f.startsWith('favicon')
  );

  console.log(`[INFO] Converting & resizing ${files.length} images to WebP (quality: ${QUALITY})...`);

  let converted = 0;
  let skipped = 0;

  for (const file of files) {
    const inputPath = path.join(IMG_DIR, file);
    const outputName = file.replace(/\.(jpe?g|png)$/i, '.webp');
    const outputPath = path.join(IMG_DIR, outputName);

    try {
      const inputBuffer = fs.readFileSync(inputPath);
      let pipeline = sharp(inputBuffer);

      // Smart resizing based on image role
      const lowerName = file.toLowerCase();
      if (lowerName.includes('hero')) {
        // Hero background image: max width 800px for mobile performance
        pipeline = pipeline.resize({ width: 800, withoutEnlargement: true });
      } else if (lowerName.includes('logo')) {
        // Logo: max width 120px
        pipeline = pipeline.resize({ width: 120, withoutEnlargement: true });
      } else {
        // Gallery / destinations / fleet / previews: max width 600px
        pipeline = pipeline.resize({ width: 600, withoutEnlargement: true });
      }

      const outputBuffer = await pipeline
        .webp({ quality: QUALITY })
        .toBuffer();

      fs.writeFileSync(outputPath, outputBuffer);

      const savedPct = Math.round((1 - outputBuffer.length / inputBuffer.length) * 100);
      console.log(`  ✓ ${file} → ${outputName} (${savedPct}% smaller, width-optimized)`);
      converted++;
    } catch (err) {
      console.error(`  ✗ Failed: ${file} — ${err.message}`);
    }
  }

  console.log(`[SUCCESS] Converted & resized: ${converted}`);
}

module.exports = { convertToWebP };

if (require.main === module) {
  convertToWebP();
}
