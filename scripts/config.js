/**
 * SEO Generator Suite Configuration
 */
module.exports = {
  baseUrl: 'https://www.deltatour.my.id',
  
  // Organization Metadata (for schema.json & social)
  organization: {
    name: 'Delta Tour',
    url: 'https://www.deltatour.my.id',
    logoUrl: 'https://www.deltatour.my.id/assets/img/logo-delta-tour.png',
    telephone: '+62-822-2817-8439',
    email: 'benspipin2@gmail.com',
    streetAddress: 'Perumahan Bumi Ambulu Permai',
    addressLocality: 'Ambulu',
    addressRegion: 'Jember',
    postalCode: '68172',
    addressCountry: 'ID',
    socialLinks: [
      'https://www.instagram.com/deltatour.jember',
      'https://www.facebook.com/deltatour.jember'
    ]
  },

  // Website Meta Definitions
  website: {
    name: 'Delta Tour',
    description: 'Delta Tour melayani paket wisata Bromo, Kawah Ijen, Kawah Wurung Bondowoso, Banyuwangi, Lumajang, Baluran, wisata Jember, dan sewa mobil dengan driver berpengalaman dari Jember.',
    language: 'id-ID'
  },

  // Security.txt Details
  security: {
    contact: 'mailto:benspipin2@gmail.com',
    expires: '2027-12-31T23:59:59.000Z',
    preferredLanguages: 'id, en',
    canonical: 'https://www.deltatour.my.id/.well-known/security.txt'
  },

  // humans.txt Credits
  humans: {
    team: {
      developer: 'Antigravity AI',
      contact: 'benspipin2@gmail.com',
      client: 'Delta Tour'
    },
    site: {
      lastUpdate: new Date().toISOString().split('T')[0],
      standards: 'HTML5, CSS3, ES6',
      components: 'Vanilla HTML, CSS, JS',
      software: 'Pure Node.js SEO Generator Suite'
    }
  },

  // Sitemap generator settings
  sitemap: {
    changefreq: 'monthly',
    priority: {
      home: '1.0',
      detail: '0.8',
      other: '0.5'
    }
  },

  // Paths
  paths: {
    htmlPattern: '*.html',
    excludeDirs: ['node_modules', '.git', 'seo-report', 'scripts', '.agents', '.well-known']
  }
};
