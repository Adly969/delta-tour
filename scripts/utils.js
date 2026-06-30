const fs = require('fs');
const path = require('path');
const config = require('./config');

/**
 * Log levels & console formatting
 */
const logger = {
  info: (msg) => console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`),
  success: (msg) => console.log(`\x1b[32m[SUCCESS]\x1b[0m ${msg}`),
  warn: (msg) => console.log(`\x1b[33m[WARN]\x1b[0m ${msg}`),
  error: (msg) => console.error(`\x1b[31m[ERROR]\x1b[0m ${msg}`)
};

/**
 * Recursively find all HTML files in the root folder, excluding configured directories.
 */
function findHtmlFiles(dir = '.', fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!config.paths.excludeDirs.includes(file)) {
        findHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      // Normalize path separator to forward slashes for cross-platform consistency
      fileList.push(filePath.replace(/\\/g, '/'));
    }
  });

  return fileList;
}

/**
 * Regex-based HTML Parser (Zero Dependency)
 * Extracts metadata, images, videos, links, and target IDs for audits and sitemaps.
 */
function parseHtmlFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // 1. Extract <title>
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;

  // 2. Extract <meta name="description" content="...">
  // Handles variations in attribute ordering
  const descMatch = content.match(/<meta[^>]*?name=["']description["'][^>]*?content=["']([^"']*)["']/i) ||
                    content.match(/<meta[^>]*?content=["']([^"']*)["'][^>]*?name=["']description["']/i);
  const description = descMatch ? descMatch[1].trim() : null;

  // 3. Extract <link rel="canonical" href="...">
  const canonicalMatch = content.match(/<link[^>]*?rel=["']canonical["'][^>]*?href=["']([^"']*)["']/i) ||
                        content.match(/<link[^>]*?href=["']([^"']*)["'][^>]*?rel=["']canonical["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : null;

  // 4. Extract Images: <img src="..." alt="..." title="..." />
  const imgRegex = /<img\s+([^>]+)>/gi;
  const images = [];
  let imgMatch;
  while ((imgMatch = imgRegex.exec(content)) !== null) {
    const attrsStr = imgMatch[1];
    const srcMatch = attrsStr.match(/src=["']([^"']*)["']/i);
    if (srcMatch) {
      const src = srcMatch[1].trim();
      const altMatch = attrsStr.match(/alt=["']([^"']*)["']/i);
      const alt = altMatch ? altMatch[1].trim() : null;
      const titleAttrMatch = attrsStr.match(/title=["']([^"']*)["']/i);
      const titleAttr = titleAttrMatch ? titleAttrMatch[1].trim() : null;
      images.push({ src, alt, title: titleAttr });
    }
  }

  // 5. Extract Videos: <video> tags, poster, and nested <source>
  const videoRegex = /<video\s+([^>]*?)>([\s\S]*?)<\/video>/gi;
  const videos = [];
  let videoMatch;
  while ((videoMatch = videoRegex.exec(content)) !== null) {
    const videoAttrs = videoMatch[1];
    const videoBody = videoMatch[2];
    
    // Check for src in attributes or source tag in body
    let src = '';
    const srcAttrMatch = videoAttrs.match(/src=["']([^"']*)["']/i);
    if (srcAttrMatch) {
      src = srcAttrMatch[1].trim();
    } else {
      const sourceTagMatch = videoBody.match(/<source[^>]*?src=["']([^"']*)["']/i);
      if (sourceTagMatch) {
        src = sourceTagMatch[1].trim();
      }
    }

    if (src) {
      const posterMatch = videoAttrs.match(/poster=["']([^"']*)["']/i);
      const poster = posterMatch ? posterMatch[1].trim() : null;
      
      // Look for a nearby heading or title context
      const idMatch = videoAttrs.match(/id=["']([^"']*)["']/i);
      const id = idMatch ? idMatch[1] : '';

      videos.push({
        src,
        poster,
        id
      });
    }
  }

  // 6. Extract Links: <a href="...">text</a>
  const aRegex = /<a\s+([^>]+)>([\s\S]*?)<\/a>/gi;
  const links = [];
  let aMatch;
  while ((aMatch = aRegex.exec(content)) !== null) {
    const attrsStr = aMatch[1];
    const text = aMatch[2].replace(/<\/?[^>]+(>|$)/g, "").trim(); // Strip inner HTML tags
    const hrefMatch = attrsStr.match(/href=["']([^"']*)["']/i);
    if (hrefMatch) {
      const href = hrefMatch[1].trim();
      links.push({ href, text });
    }
  }

  // 7. Extract Target Anchors (All IDs and Name Attributes)
  // This is used to check internal section links (e.g. href="#paket-favorit")
  const idRegex = /(?:id|name)=["']([^"']+)["']/gi;
  const targets = new Set();
  let idMatch;
  while ((idMatch = idRegex.exec(content)) !== null) {
    targets.add(idMatch[1]);
  }

  return {
    filePath,
    title,
    description,
    canonical,
    images,
    videos,
    links,
    targets: Array.from(targets),
    contentLength: content.length
  };
}

module.exports = {
  logger,
  findHtmlFiles,
  parseHtmlFile
};
