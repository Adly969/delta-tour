const fs = require('fs');
const path = require('path');
const config = require('./config');
const { logger } = require('./utils');

/**
 * Run SEO audits on parsed pages
 */
function runAudit(parsedPages) {
  logger.info('Running SEO audits...');

  const auditResults = {
    summary: {
      totalPages: parsedPages.length,
      errorsCount: 0,
      warningsCount: 0,
      score: 100
    },
    pages: {}
  };

  const titleMap = new Map(); // title -> array of pages
  const descMap = new Map();  // description -> array of pages

  // Initialize page-level audit structures
  parsedPages.forEach(page => {
    auditResults.pages[page.filePath] = {
      title: page.title,
      description: page.description,
      canonical: page.canonical,
      errors: [],
      warnings: [],
      passed: []
    };

    // Track titles & descriptions for duplicate detection
    if (page.title) {
      if (!titleMap.has(page.title)) titleMap.set(page.title, []);
      titleMap.get(page.title).push(page.filePath);
    }
    if (page.description) {
      if (!descMap.has(page.description)) descMap.set(page.description, []);
      descMap.get(page.description).push(page.filePath);
    }
  });

  // Perform audits per page
  parsedPages.forEach(page => {
    const pageAudit = auditResults.pages[page.filePath];

    // 1. Audit Title
    if (!page.title) {
      pageAudit.errors.push({
        type: 'Title Missing',
        message: 'Halaman tidak memiliki tag <title>.'
      });
    } else {
      // Length check
      if (page.title.length < 30) {
        pageAudit.warnings.push({
          type: 'Title Too Short',
          message: `Judul halaman terlalu pendek (${page.title.length} karakter). Target ideal: 50-60 karakter.`
        });
      } else if (page.title.length > 60) {
        pageAudit.warnings.push({
          type: 'Title Too Long',
          message: `Judul halaman terlalu panjang (${page.title.length} karakter). Target ideal: 50-60 karakter.`
        });
      } else {
        pageAudit.passed.push('Judul halaman memiliki panjang optimal.');
      }

      // Duplicate check
      const duplicateTitles = titleMap.get(page.title);
      if (duplicateTitles && duplicateTitles.length > 1) {
        const dupList = duplicateTitles.filter(p => p !== page.filePath).join(', ');
        pageAudit.errors.push({
          type: 'Duplicate Title',
          message: `Judul halaman sama dengan halaman lain: [${dupList}].`
        });
      } else {
        pageAudit.passed.push('Judul halaman bersifat unik.');
      }
    }

    // 2. Audit Meta Description
    if (!page.description) {
      pageAudit.errors.push({
        type: 'Meta Description Missing',
        message: 'Halaman tidak memiliki tag <meta name="description">.'
      });
    } else {
      // Length check
      if (page.description.length < 50) {
        pageAudit.warnings.push({
          type: 'Meta Description Too Short',
          message: `Deskripsi meta terlalu pendek (${page.description.length} karakter). Target ideal: 120-160 karakter.`
        });
      } else if (page.description.length > 160) {
        pageAudit.warnings.push({
          type: 'Meta Description Too Long',
          message: `Deskripsi meta terlalu panjang (${page.description.length} karakter). Target ideal: 120-160 karakter.`
        });
      } else {
        pageAudit.passed.push('Deskripsi meta memiliki panjang optimal.');
      }

      // Duplicate check
      const duplicateDescs = descMap.get(page.description);
      if (duplicateDescs && duplicateDescs.length > 1) {
        const dupList = duplicateDescs.filter(p => p !== page.filePath).join(', ');
        pageAudit.warnings.push({
          type: 'Duplicate Meta Description',
          message: `Deskripsi meta sama dengan halaman lain: [${dupList}].`
        });
      } else {
        pageAudit.passed.push('Deskripsi meta bersifat unik.');
      }
    }

    // 3. Audit Canonical
    if (!page.canonical) {
      pageAudit.errors.push({
        type: 'Canonical Tag Missing',
        message: 'Halaman tidak memiliki tag <link rel="canonical">.'
      });
    } else {
      // Check if canonical uses the base URL in config
      let expectedCanonical = `${config.baseUrl}/${page.filePath}`;
      if (page.filePath === 'index.html') {
        expectedCanonical = `${config.baseUrl}/`;
      }

      if (page.canonical !== expectedCanonical) {
        pageAudit.warnings.push({
          type: 'Canonical URL Mismatch',
          message: `URL canonical saat ini (${page.canonical}) tidak sesuai dengan domain utama (${expectedCanonical}).`
        });
      } else {
        pageAudit.passed.push('Tag canonical terpasang dan mengarah ke URL yang benar.');
      }
    }

    // 4. Audit Missing Alt Image
    let missingAltCount = 0;
    let emptyAltCount = 0;
    page.images.forEach(img => {
      if (img.alt === null) {
        missingAltCount++;
      } else if (img.alt === '') {
        emptyAltCount++;
      }
    });

    if (missingAltCount > 0) {
      pageAudit.warnings.push({
        type: 'Alt Image Attribute Missing',
        message: `Terdapat ${missingAltCount} tag <img> yang tidak memiliki atribut 'alt' sama sekali.`
      });
    }
    if (emptyAltCount > 0) {
      pageAudit.warnings.push({
        type: 'Empty Alt Attribute',
        message: `Terdapat ${emptyAltCount} tag <img> dengan atribut 'alt' kosong ("").`
      });
    }
    if (missingAltCount === 0 && emptyAltCount === 0 && page.images.length > 0) {
      pageAudit.passed.push('Semua gambar memiliki deskripsi alt.');
    }

    // 5. Audit Broken Internal Links
    page.links.forEach(link => {
      const href = link.href.split('?')[0].split('#')[0]; // strip query parameters and hash anchors
      const hash = link.href.includes('#') ? link.href.split('#')[1] : null;

      // Skip external links, phone, email, WhatsApp, or empty anchors
      if (
        link.href.startsWith('http://') ||
        link.href.startsWith('https://') ||
        link.href.startsWith('mailto:') ||
        link.href.startsWith('tel:') ||
        link.href.startsWith('javascript:') ||
        link.href === '#' ||
        link.href === ''
      ) {
        return;
      }

      // Local file check
      let targetFile = href;
      // If href is empty (just a hash link on the same page, e.g. href="#paket-favorit")
      if (href === '') {
        targetFile = page.filePath;
      }

      // Check if file exists on disk
      if (!fs.existsSync(targetFile)) {
        pageAudit.errors.push({
          type: 'Broken Internal Link',
          message: `Link internal rusak ke: "${link.href}" (File "${targetFile}" tidak ditemukan di disk).`
        });
      } else {
        // If file exists, check hash anchor if it exists
        if (hash) {
          const targetPageData = parsedPages.find(p => p.filePath === targetFile);
          if (targetPageData) {
            if (!targetPageData.targets.includes(hash)) {
              pageAudit.warnings.push({
                type: 'Broken Anchor Link',
                message: `Anchor link rusak: "${link.href}" (ID #${hash} tidak ditemukan di halaman "${targetFile}").`
              });
            }
          }
        }
      }
    });
  });

  // Calculate scores & global metrics
  let totalErrors = 0;
  let totalWarnings = 0;

  Object.keys(auditResults.pages).forEach(key => {
    const page = auditResults.pages[key];
    totalErrors += page.errors.length;
    totalWarnings += page.warnings.length;
  });

  auditResults.summary.errorsCount = totalErrors;
  auditResults.summary.warningsCount = totalWarnings;

  // Calculate SEO score from 0 to 100 based on warnings and errors
  // Errors cost 10 points, warnings cost 3 points
  let score = 100 - (totalErrors * 8) - (totalWarnings * 2.5);
  score = Math.max(0, Math.min(100, Math.round(score)));
  auditResults.summary.score = score;

  logger.info(`Audit complete. Score: ${score}/100. Errors: ${totalErrors}, Warnings: ${totalWarnings}`);

  return auditResults;
}

module.exports = {
  runAudit
};
