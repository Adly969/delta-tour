const fs = require('fs');
const path = require('path');
const config = require('./config');
const { logger } = require('./utils');

/**
 * Generate XML Sitemaps
 */
function generateSitemaps(parsedPages) {
  logger.info('Generating sitemap.xml...');

  // Clean up obsolete sitemaps if they exist in the root
  const obsoleteSitemaps = ['sitemap-image.xml', 'sitemap-video.xml', 'sitemap-news.xml'];
  obsoleteSitemaps.forEach(file => {
    if (fs.existsSync(file)) {
      try {
        fs.unlinkSync(file);
        logger.info(`Removed obsolete file: ${file}`);
      } catch (err) {
        logger.warn(`Could not remove ${file}: ${err.message}`);
      }
    }
  });

  // Helper to make absolute URL from relative path
  function getAbsoluteUrl(urlPath) {
    if (urlPath.startsWith('http://') || urlPath.startsWith('https://')) {
      return urlPath;
    }
    
    // Normalize relative path
    let cleaned = urlPath.replace(/^\.?\//, '');
    
    // Map index.html to root '/'
    if (cleaned === 'index.html') {
      return `${config.baseUrl}/`;
    }
    
    return `${config.baseUrl}/${cleaned}`;
  }

  // Helper to escape XML special chars
  function escapeXml(unsafe) {
    if (!unsafe) return '';
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
      }
    });
  }

  // Filter out 404.html, template.html, and partials
  const activePages = parsedPages.filter(page => {
    const filename = path.basename(page.filePath).toLowerCase();
    return (
      filename !== '404.html' &&
      filename !== 'template.html' &&
      !filename.includes('partial')
    );
  });

  // Generate sitemap.xml
  let standardXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  standardXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  activePages.forEach(page => {
    const pageUrl = getAbsoluteUrl(page.filePath);
    const filename = path.basename(page.filePath).toLowerCase();

    // Get last modification date from file system
    let lastModDate = new Date();
    try {
      lastModDate = fs.statSync(page.filePath).mtime;
    } catch (err) {
      logger.warn(`Could not read mtime for ${page.filePath}, using current date`);
    }
    const lastmod = lastModDate.toISOString().split('T')[0];

    // Priority & Changefreq configuration based on user requested rules:
    let priority = '0.6';
    let changefreq = 'monthly';

    if (filename === 'index.html') {
      priority = '1.0';
      changefreq = 'daily';
    } else if (filename === 'paket.html') {
      priority = '0.9';
      changefreq = 'weekly';
    } else if (filename === 'galeri.html') {
      priority = '0.8';
      changefreq = 'weekly';
    } else if (filename === 'kontak.html') {
      priority = '0.8';
      changefreq = 'weekly';
    } else if (filename === 'tentang.html') {
      priority = '0.8';
      changefreq = 'weekly';
    } else if (filename.startsWith('detail-')) {
      priority = '0.7';
      changefreq = 'monthly';
    }

    standardXml += '  <url>\n';
    standardXml += `    <loc>${escapeXml(pageUrl)}</loc>\n`;
    standardXml += `    <lastmod>${lastmod}</lastmod>\n`;
    standardXml += `    <changefreq>${changefreq}</changefreq>\n`;
    standardXml += `    <priority>${priority}</priority>\n`;
    standardXml += '  </url>\n';
  });

  standardXml += '</urlset>\n';
  fs.writeFileSync('sitemap.xml', standardXml, 'utf-8');
  logger.success('Saved: sitemap.xml');
}

module.exports = {
  generateSitemaps
};
