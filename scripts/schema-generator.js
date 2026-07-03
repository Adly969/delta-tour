const fs = require('fs');
const config = require('./config');
const { logger } = require('./utils');

/**
 * Generate schema.json (Organization and WebSite JSON-LD structured data)
 */
function generateSchema() {
  logger.info('Generating schema.json...');

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": `${config.baseUrl}/#organization`,
        "name": config.organization.name,
        "url": config.organization.url,
        "logo": {
          "@type": "ImageObject",
          "@id": `${config.baseUrl}/#logo`,
          "url": config.organization.logoUrl,
          "caption": config.organization.name
        },
        "image": config.organization.logoUrl,
        "description": config.website.description,
        "telephone": config.organization.telephone,
        "email": config.organization.email,
        "priceRange": "$$",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -8.2655513,
          "longitude": 113.608316
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": config.organization.streetAddress,
          "addressLocality": config.organization.addressLocality,
          "addressRegion": config.organization.addressRegion,
          "postalCode": config.organization.postalCode,
          "addressCountry": config.organization.addressCountry
        },
        "areaServed": [
          "Jember",
          "Banyuwangi",
          "Bondowoso",
          "Situbondo",
          "Lumajang",
          "Malang",
          "Bromo",
          "Bali"
        ],
        "sameAs": config.organization.socialLinks
      },
      {
        "@type": "WebSite",
        "@id": `${config.baseUrl}/#website`,
        "url": config.baseUrl,
        "name": config.website.name,
        "description": config.website.description,
        "publisher": {
          "@id": `${config.baseUrl}/#organization`
        },
        "inLanguage": config.website.language,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${config.baseUrl}/?s={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  fs.writeFileSync('schema.json', JSON.stringify(schemaData, null, 2), 'utf-8');
  logger.success('Saved: schema.json');
}

module.exports = {
  generateSchema
};
