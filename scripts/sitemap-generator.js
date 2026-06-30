const fs = require('fs');
const path = require('path');
const config = require('./config');
const { logger } = require('./utils');

/**
 * Generate XML Sitemaps
 */
function generateSitemaps(parsedPages) {
  logger.info('Generating sitemaps...');

  const todayStr = new Date().toISOString().split('T')[0];

  // Helper to make absolute URL from relative path
  function getAbsoluteUrl(urlPath) {
    if (urlPath.startsWith('http://') || urlPath.startsWith('https://')) {
      return urlPath;
    }
    
    // Normalize relative path
    let cleaned = urlPath.replace(/^\.?\//, '');
    
    // If it's a relative path to HTML page, map index.html to root '/'
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

  // 1. Generate sitemap.xml (Standard Web Sitemap)
  let standardXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  standardXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  parsedPages.forEach(page => {
    const pageUrl = getAbsoluteUrl(page.filePath);
    
    // Set priority based on page name
    let priority = config.sitemap.priority.other;
    if (page.filePath === 'index.html') {
      priority = config.sitemap.priority.home;
    } else if (page.filePath.startsWith('detail-')) {
      priority = config.sitemap.priority.detail;
    }

    standardXml += '  <url>\n';
    standardXml += `    <loc>${escapeXml(pageUrl)}</loc>\n`;
    standardXml += `    <lastmod>${todayStr}</lastmod>\n`;
    standardXml += `    <changefreq>${config.sitemap.changefreq}</changefreq>\n`;
    standardXml += `    <priority>${priority}</priority>\n`;
    standardXml += '  </url>\n';
  });

  standardXml += '</urlset>\n';
  fs.writeFileSync('sitemap.xml', standardXml, 'utf-8');
  logger.success('Saved: sitemap.xml');

  // 2. Generate sitemap-image.xml (Image Sitemap)
  let imageXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  imageXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  imageXml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

  let totalImagesInSitemap = 0;
  parsedPages.forEach(page => {
    if (page.images.length > 0) {
      const pageUrl = getAbsoluteUrl(page.filePath);
      imageXml += '  <url>\n';
      imageXml += `    <loc>${escapeXml(pageUrl)}</loc>\n`;

      page.images.forEach(img => {
        // Expand relative img source to absolute URL
        const imgUrl = getAbsoluteUrl(img.src);
        imageXml += '    <image:image>\n';
        imageXml += `      <image:loc>${escapeXml(imgUrl)}</image:loc>\n`;
        if (img.alt) {
          imageXml += `      <image:title>${escapeXml(img.alt)}</image:title>\n`;
          imageXml += `      <image:caption>${escapeXml(img.alt)}</image:caption>\n`;
        } else if (img.title) {
          imageXml += `      <image:title>${escapeXml(img.title)}</image:title>\n`;
          imageXml += `      <image:caption>${escapeXml(img.title)}</image:caption>\n`;
        }
        imageXml += '    </image:image>\n';
        totalImagesInSitemap++;
      });

      imageXml += '  </url>\n';
    }
  });

  imageXml += '</urlset>\n';
  fs.writeFileSync('sitemap-image.xml', imageXml, 'utf-8');
  logger.success(`Saved: sitemap-image.xml (${totalImagesInSitemap} images found)`);

  // 3. Generate sitemap-video.xml (Video Sitemap)
  let videoXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  videoXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  videoXml += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

  let totalVideosInSitemap = 0;
  parsedPages.forEach(page => {
    if (page.videos.length > 0) {
      const pageUrl = getAbsoluteUrl(page.filePath);
      videoXml += '  <url>\n';
      videoXml += `    <loc>${escapeXml(pageUrl)}</loc>\n`;

      page.videos.forEach(vid => {
        const vidUrl = getAbsoluteUrl(vid.src);
        const thumbUrl = vid.poster ? getAbsoluteUrl(vid.poster) : getAbsoluteUrl('assets/img/logo-delta-tour.png');
        const vidTitle = vid.id ? `Video ${vid.id.replace(/-/g, ' ')} - Delta Tour` : `${page.title || 'Delta Tour'} Video`;
        const vidDesc = page.description || 'Delta Tour professional travel and rental service video showcase.';

        videoXml += '    <video:video>\n';
        videoXml += `      <video:thumbnail_loc>${escapeXml(thumbUrl)}</video:thumbnail_loc>\n`;
        videoXml += `      <video:title>${escapeXml(vidTitle)}</video:title>\n`;
        videoXml += `      <video:description>${escapeXml(vidDesc)}</video:description>\n`;
        videoXml += `      <video:content_loc>${escapeXml(vidUrl)}</video:content_loc>\n`;
        videoXml += '    </video:video>\n';
        totalVideosInSitemap++;
      });

      videoXml += '  </url>\n';
    }
  });

  videoXml += '</urlset>\n';
  fs.writeFileSync('sitemap-video.xml', videoXml, 'utf-8');
  logger.success(`Saved: sitemap-video.xml (${totalVideosInSitemap} videos found)`);

  // 4. Generate sitemap-news.xml (Google News Sitemap - Optional/Placeholder)
  let newsXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  newsXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  newsXml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n';
  newsXml += '  <!-- No recent updates within the last 48 hours -->\n';
  newsXml += '</urlset>\n';

  fs.writeFileSync('sitemap-news.xml', newsXml, 'utf-8');
  logger.success('Saved: sitemap-news.xml (placeholder created)');
}

module.exports = {
  generateSitemaps
};
