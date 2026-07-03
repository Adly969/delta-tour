/**
 * minify-css.js
 * Simple CSS minifier — no dependencies.
 * Reads style.css, strips comments/whitespace, writes style.min.css.
 */

const fs = require('fs');
const path = require('path');

const CSS_DIR = path.join(__dirname, '..', 'assets', 'css');
const INPUT = path.join(CSS_DIR, 'style.css');
const OUTPUT = path.join(CSS_DIR, 'style.min.css');

function minifyCSS() {
  if (!fs.existsSync(INPUT)) {
    console.error('[ERROR] style.css not found at', INPUT);
    process.exit(1);
  }

  let css = fs.readFileSync(INPUT, 'utf-8');
  const originalSize = Buffer.byteLength(css, 'utf-8');

  // Remove block comments
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');

  // Remove newlines and excess whitespace
  css = css.replace(/\s*\n\s*/g, '');

  // Collapse multiple spaces to one
  css = css.replace(/\s{2,}/g, ' ');

  // Remove spaces around selectors/braces/colons/semicolons
  css = css.replace(/\s*{\s*/g, '{');
  css = css.replace(/\s*}\s*/g, '}');
  css = css.replace(/\s*:\s*/g, ':');
  css = css.replace(/\s*;\s*/g, ';');
  css = css.replace(/\s*,\s*/g, ',');

  // Remove trailing semicolons before closing braces
  css = css.replace(/;}/g, '}');

  // Trim
  css = css.trim();

  const minifiedSize = Buffer.byteLength(css, 'utf-8');
  const savedPct = Math.round((1 - minifiedSize / originalSize) * 100);

  fs.writeFileSync(OUTPUT, css, 'utf-8');
  console.log(`[SUCCESS] style.css (${(originalSize / 1024).toFixed(1)} KB) → style.min.css (${(minifiedSize / 1024).toFixed(1)} KB) — ${savedPct}% smaller`);
}

module.exports = { minifyCSS };

if (require.main === module) {
  minifyCSS();
}
