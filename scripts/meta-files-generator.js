const fs = require('fs');
const path = require('path');
const config = require('./config');
const { logger } = require('./utils');

/**
 * Generate robots.txt, manifest.webmanifest, humans.txt, security.txt, and browserconfig.xml
 */
function generateMetaFiles() {
  logger.info('Generating metadata files...');

  // 1. Robots.txt
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /private/
Disallow: /scripts/
Disallow: /seo-report/

Sitemap: ${config.baseUrl}/sitemap.xml
Sitemap: ${config.baseUrl}/sitemap-image.xml
Sitemap: ${config.baseUrl}/sitemap-video.xml
`;
  fs.writeFileSync('robots.txt', robotsTxt, 'utf-8');
  logger.success('Saved: robots.txt');

  // 2. manifest.webmanifest
  const webManifest = {
    name: `${config.website.name} | Paket Wisata Jawa Timur dari Jember`,
    short_name: config.website.name,
    description: config.website.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F8FAF5',
    theme_color: '#0B3D5C',
    icons: [
      {
        src: 'assets/img/favicon-delta-tour.png',
        sizes: '128x128',
        type: 'image/png'
      }
    ]
  };
  fs.writeFileSync('manifest.webmanifest', JSON.stringify(webManifest, null, 2), 'utf-8');
  logger.success('Saved: manifest.webmanifest');

  // 3. humans.txt
  const humansTxt = `/* TEAM */
Developer: ${config.humans.team.developer}
Contact: ${config.humans.team.contact}
Client: ${config.humans.team.client}

/* SITE */
Last update: ${new Date().toISOString().split('T')[0]}
Standards: ${config.humans.site.standards}
Components: ${config.humans.site.components}
Software: ${config.humans.site.software}
`;
  fs.writeFileSync('humans.txt', humansTxt, 'utf-8');
  logger.success('Saved: humans.txt');

  // 4. security.txt (.well-known/security.txt & security.txt)
  const securityTxt = `Contact: ${config.security.contact}
Expires: ${config.security.expires}
Preferred-Languages: ${config.security.preferredLanguages}
Canonical: ${config.security.canonical}
`;
  
  // Make sure .well-known exists
  if (!fs.existsSync('.well-known')) {
    fs.mkdirSync('.well-known');
    logger.info('Created directory: .well-known');
  }

  fs.writeFileSync(path.join('.well-known', 'security.txt'), securityTxt, 'utf-8');
  fs.writeFileSync('security.txt', securityTxt, 'utf-8');
  logger.success('Saved: security.txt and .well-known/security.txt');

  // 5. browserconfig.xml
  const browserConfigXml = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="assets/img/favicon-delta-tour.png"/>
      <TileColor>#0B3D5C</TileColor>
    </tile>
  </msapplication>
</browserconfig>
`;
  fs.writeFileSync('browserconfig.xml', browserConfigXml, 'utf-8');
  logger.success('Saved: browserconfig.xml');
}

module.exports = {
  generateMetaFiles
};
