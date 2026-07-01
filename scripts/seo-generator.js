const { logger, findHtmlFiles, parseHtmlFile } = require('./utils');
const { overhaulHtmlFiles } = require('./seo-html-overhauler');
const { generateSitemaps } = require('./sitemap-generator');
const { generateMetaFiles } = require('./meta-files-generator');
const { generateSchema } = require('./schema-generator');
const { runAudit } = require('./seo-auditor');
const { generateHtmlReport } = require('./report-generator');

function main() {
  logger.info('==========================================');
  logger.info('  SEO Generator & Auditor Suite (Node.js) ');
  logger.info('==========================================');

  // Step 1: Pre-process HTML files for optimizations (Duplicate fonts, Alt images, etc.)
  try {
    overhaulHtmlFiles();
  } catch (err) {
    logger.error(`Error during HTML overhaul: ${err.message}`);
  }

  // Step 2: Scan for HTML files
  const htmlFiles = findHtmlFiles();
  logger.info(`Found ${htmlFiles.length} HTML file(s) to process.`);

  if (htmlFiles.length === 0) {
    logger.warn('No HTML files found in this workspace.');
    return;
  }

  // Step 3: Parse each file
  const parsedPages = [];
  htmlFiles.forEach(file => {
    try {
      const parsedData = parseHtmlFile(file);
      parsedPages.push(parsedData);
      logger.info(`Parsed: ${file}`);
    } catch (err) {
      logger.error(`Failed parsing ${file}: ${err.message}`);
    }
  });

  // Step 4: Run sitemaps, metadata files, and schema generators
  try {
    generateSitemaps(parsedPages);
  } catch (err) {
    logger.error(`Error generating sitemaps: ${err.message}`);
  }

  try {
    generateMetaFiles();
  } catch (err) {
    logger.error(`Error generating metadata files: ${err.message}`);
  }

  try {
    generateSchema();
  } catch (err) {
    logger.error(`Error generating schema: ${err.message}`);
  }

  // Step 5: Run Audits
  let auditResults;
  try {
    auditResults = runAudit(parsedPages);
  } catch (err) {
    logger.error(`Error running audits: ${err.message}`);
    return;
  }

  // Step 6: Generate client-facing HTML report
  try {
    generateHtmlReport(auditResults);
  } catch (err) {
    logger.error(`Error generating HTML report: ${err.message}`);
  }

  logger.info('==========================================');
  logger.success('SEO Generator & Auditor Suite run finished.');
  logger.info(`Audit Score: ${auditResults.summary.score}/100`);
  logger.info(`Critical Errors: ${auditResults.summary.errorsCount}`);
  logger.info(`Optimizations: ${auditResults.summary.warningsCount}`);
  logger.info('==========================================');
}

main();
