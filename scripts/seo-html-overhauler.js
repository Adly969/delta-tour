const fs = require('fs');
const path = require('path');
const { findHtmlFiles } = require('./utils');

function overhaulHtmlFiles() {
  const htmlFiles = findHtmlFiles();
  console.log(`Starting HTML SEO & Performance Overhaul on ${htmlFiles.length} files...`);

  htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    let original = content;

    // 1. Clean up duplicate Google Fonts stylesheet links
    const duplicateFontStr = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">\r\n  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">';
    const duplicateFontStrLF = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">\n  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">';
    
    content = content.replace(duplicateFontStr, '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">');
    content = content.replace(duplicateFontStrLF, '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">');

    // Also handle simple sequential duplicate links if format varies
    const regexDuplicateFonts = /(<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter[^>]*>)\s*\1/g;
    content = content.replace(regexDuplicateFonts, '$1');

    // 2. Ensure meta robots exists in head: <meta name="robots" content="index, follow">
    if (!content.includes('name="robots"')) {
      content = content.replace('<head>', '<head>\n  <meta name="robots" content="index, follow">');
    }

    // 3. Extract page title for default image alt fallbacks
    const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
    const pageTitle = titleMatch ? titleMatch[1].split('|')[0].trim() : 'Delta Tour';

    // 4. Overhaul all <img> tags for Image SEO
    // We will parse all image tags and ensure alt, title, loading, decoding, width, height are optimized
    const imgRegex = /<img\s+([^>]+)>/gi;
    content = content.replace(imgRegex, (match, attrsStr) => {
      // Parse current attributes
      let src = (attrsStr.match(/src=["']([^"']*)["']/i) || [])[1] || '';
      
      // Convert local jpg/png (except favicons) to webp
      if (src && /\.(jpe?g|png)$/i.test(src) && !src.includes('favicon') && !src.startsWith('http') && !src.startsWith('//')) {
        src = src.replace(/\.(jpe?g|png)$/i, '.webp');
      }

      let alt = (attrsStr.match(/alt=["']([^"']*)["']/i) || [])[1];
      let title = (attrsStr.match(/title=["']([^"']*)["']/i) || [])[1];
      let width = (attrsStr.match(/width=["']([^"']*)["']/i) || [])[1];
      let height = (attrsStr.match(/height=["']([^"']*)["']/i) || [])[1];
      let loading = (attrsStr.match(/loading=["']([^"']*)["']/i) || [])[1];
      let decoding = (attrsStr.match(/decoding=["']([^"']*)["']/i) || [])[1];
      let fetchpriority = (attrsStr.match(/fetchpriority=["']([^"']*)["']/i) || [])[1];
      let className = (attrsStr.match(/class=["']([^"']*)["']/i) || [])[1] || '';

      // Determine clean fallback values
      if (alt === undefined || alt === '') {
        // Fallback alt: clean file name or page title
        const filename = path.basename(src, path.extname(src)).replace(/[-_]/g, ' ');
        alt = filename ? `${filename.charAt(0).toUpperCase() + filename.slice(1)} - ${pageTitle}` : pageTitle;
      }
      
      if (!title) {
        title = alt;
      }

      // Determine width and height if missing
      if (!width || !height) {
        if (className.includes('brand-logo') || src.includes('logo-delta-tour')) {
          width = '40';
          height = '40';
        } else if (className.includes('avatar') || src.includes('avatar') || className.includes('rating')) {
          width = '64';
          height = '64';
        } else if (src.includes('wa-preview') || src.includes('fleet') || src.includes('hero')) {
          width = '1200';
          height = '630';
        } else {
          // Standard placeholder card / gallery image size
          width = '600';
          height = '400';
        }
      }

      // Determine loading and decoding
      if (!decoding) {
        decoding = 'async';
      }

      if (!loading) {
        // Hero background image links or eager brand logo
        if (className.includes('brand-logo') || className.includes('hero-img') || fetchpriority === 'high') {
          loading = 'eager';
        } else {
          loading = 'lazy';
        }
      }

      // Rebuild optimized img element
      let newAttrs = `src="${src}" alt="${alt}" title="${title}" width="${width}" height="${height}" loading="${loading}" decoding="${decoding}"`;
      if (fetchpriority) {
        newAttrs += ` fetchpriority="${fetchpriority}"`;
      }
      if (className) {
        newAttrs += ` class="${className}"`;
      }

      // Preserve any other attributes (e.g. data-*, aria-*)
      const otherAttrs = attrsStr.replace(/(src|alt|title|width|height|loading|decoding|fetchpriority|class)=["'][^"']*["']/gi, '').trim();
      if (otherAttrs) {
        newAttrs += ` ${otherAttrs.replace(/\s+/g, ' ')}`;
      }

      return `<img ${newAttrs.trim()}>`;
    });

    // 5. Accessibility optimizations
    // Add aria-labels to WhatsApp buttons or icons if missing
    content = content.replace(/data-whatsapp-general/g, 'data-whatsapp-general aria-label="Hubungi Admin Delta Tour via WhatsApp"');
    content = content.replace(/class="btn btn-whatsapp" type="button" aria-label="Hubungi Admin/g, 'class="btn btn-whatsapp" type="button" aria-label="Hubungi Admin');
    
    // Ensure form controls have associated labels and descriptive aria labels
    if (file === 'kontak.html' || file.startsWith('detail-')) {
      content = content.replace(/id="nama"/g, 'id="nama" aria-required="true"');
      content = content.replace(/id="wa"/g, 'id="wa" aria-required="true"');
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====

    // 6. Async Google Fonts loading (eliminate render-blocking ~900ms)
    const syncFontLink = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">';
    const asyncFontLink = '<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap">\n  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" media="print" onload="this.media=\'all\'">\n  <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"></noscript>';

    if (content.includes(syncFontLink) && !content.includes('media="print"')) {
      content = content.replace(syncFontLink, asyncFontLink);
    }

    // 7. Preload hero image WebP for LCP optimization
    const heroPreloadTag = '<link rel="preload" as="image" href="assets/img/hero-delta-tour.webp" type="image/webp">';
    if (content.includes('hero-page') && !content.includes('preload" as="image"')) {
      // Insert after the preconnect to fonts.gstatic.com
      content = content.replace(
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  ' + heroPreloadTag
      );
    }

    // 8. Use minified CSS
    if (content.includes('style.css?') && !content.includes('style.min.css')) {
      content = content.replace(/style\.css\?v=[^"']*/g, 'style.min.css?v=2.0');
    }

    // 9. Defer main.js and code split detail-wisata.js
    if (content.includes('<script src="assets/js/main.js"></script>') || content.includes('<script src="assets/js/main.js" defer></script>')) {
      const isDefer = content.includes('defer');
      const targetScript = isDefer ? '<script src="assets/js/main.js" defer></script>' : '<script src="assets/js/main.js"></script>';
      
      if (file.endsWith('detail-wisata.html')) {
        if (!content.includes('detail-wisata.js')) {
          content = content.replace(targetScript, '<script src="assets/js/main.js" defer></script>\n  <script src="assets/js/detail-wisata.js" defer></script>');
        } else if (!isDefer) {
          content = content.replace(targetScript, '<script src="assets/js/main.js" defer></script>');
        }
      } else {
        if (!isDefer) {
          content = content.replace(targetScript, '<script src="assets/js/main.js" defer></script>');
        }
      }
    }

    // 10. Delay GTM/Google Analytics load to avoid blocking initial paint
    const syncGtmScript = '<script async src="https://www.googletagmanager.com/gtag/js?id=G-V4ZENGR3N5"></script>';
    const delayedGtmScript = '<script>\n    window.addEventListener(\'load\', function() {\n      var s = document.createElement(\'script\');\n      s.async = true;\n      s.src = \'https://www.googletagmanager.com/gtag/js?id=G-V4ZENGR3N5\';\n      document.head.appendChild(s);\n    });\n  </script>';
    if (content.includes(syncGtmScript)) {
      content = content.replace(syncGtmScript, delayedGtmScript);
    }

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf-8');
      console.log(`Successfully overhauled HTML file: ${path.basename(file)}`);
    }
  });

  console.log('HTML SEO & Performance Overhaul completed.');
}

module.exports = {
  overhaulHtmlFiles
};

// Run if called directly
if (require.main === module) {
  overhaulHtmlFiles();
}
