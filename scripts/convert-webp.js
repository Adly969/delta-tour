/**
 * convert-webp.js
 * Converts all JPEG/PNG images in assets/img/ to WebP format using sharp.
 * Keeps original files as fallback.
 */

const fs = require('fs');
const path = require('path');

const IMG_DIR = path.join(__dirname, '..', 'assets', 'img');
const QUALITY = 75;

async function convertToWebP() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch {
    console.error('[ERROR] sharp is not installed. Run: npm install sharp --save-dev');
    process.exit(1);
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
        // Hero background image: max width 1200px
        pipeline = pipeline.resize({ width: 1200, withoutEnlargement: true });
      } else if (lowerName.includes('logo')) {
        // Logo: max width 160px
        pipeline = pipeline.resize({ width: 160, withoutEnlargement: true });
      } else {
        // Gallery / destinations / fleet / previews: max width 800px
        pipeline = pipeline.resize({ width: 800, withoutEnlargement: true });
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
