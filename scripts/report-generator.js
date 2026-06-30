const fs = require('fs');
const path = require('path');
const config = require('./config');
const { logger } = require('./utils');

/**
 * Generate a premium client-facing HTML audit report
 */
function generateHtmlReport(auditResults) {
  logger.info('Generating HTML report...');

  const dateStr = new Date().toLocaleString('id-ID', {
    dateStyle: 'long',
    timeStyle: 'short'
  });

  const { totalPages, errorsCount, warningsCount, score } = auditResults.summary;

  // Determine score color class
  let scoreClass = 'score-good';
  if (score < 70) {
    scoreClass = 'score-poor';
  } else if (score < 90) {
    scoreClass = 'score-average';
  }

  // Generate page-by-page details HTML
  let pagesHtml = '';
  let sidebarHtml = '';

  Object.keys(auditResults.pages).forEach((filePath) => {
    const page = auditResults.pages[filePath];
    const totalIssues = page.errors.length + page.warnings.length;
    const badgeClass = totalIssues === 0 ? 'badge-success' : (page.errors.length > 0 ? 'badge-danger' : 'badge-warning');
    const badgeText = totalIssues === 0 ? 'Clean' : `${totalIssues} Issue${totalIssues > 1 ? 's' : ''}`;

    // Sidebar Item
    sidebarHtml += `
      <div class="sidebar-item" onclick="scrollToPage('${filePath}')">
        <div class="sidebar-file-info">
          <span class="file-icon">📄</span>
          <span class="file-name">${filePath}</span>
        </div>
        <span class="badge ${badgeClass}">${badgeText}</span>
      </div>
    `;

    // Main Details Card
    let errorsListHtml = '';
    page.errors.forEach(err => {
      errorsListHtml += `
        <div class="issue-item issue-error">
          <div class="issue-header">
            <span class="issue-badge badge-danger">${err.type}</span>
          </div>
          <p class="issue-message">${err.message}</p>
        </div>
      `;
    });

    let warningsListHtml = '';
    page.warnings.forEach(warn => {
      warningsListHtml += `
        <div class="issue-item issue-warning">
          <div class="issue-header">
            <span class="issue-badge badge-warning">${warn.type}</span>
          </div>
          <p class="issue-message">${warn.message}</p>
        </div>
      `;
    });

    let passedListHtml = '';
    page.passed.forEach(pass => {
      passedListHtml += `
        <div class="issue-item issue-passed">
          <div class="issue-header">
            <span class="issue-badge badge-success">Passed</span>
            <span class="issue-message">${pass}</span>
          </div>
        </div>
      `;
    });

    pagesHtml += `
      <section class="page-card" id="page-${filePath}">
        <div class="page-card-header">
          <h2>📄 ${filePath}</h2>
          <span class="badge ${badgeClass}">${badgeText}</span>
        </div>
        
        <div class="page-meta-grid">
          <div class="meta-item">
            <strong>Title:</strong>
            <span class="meta-val ${!page.title ? 'text-danger' : ''}">${escapeHtml(page.title) || 'Missing Title'}</span>
          </div>
          <div class="meta-item">
            <strong>Canonical URL:</strong>
            <span class="meta-val ${!page.canonical ? 'text-danger' : ''}">${escapeHtml(page.canonical) || 'Missing Canonical Tag'}</span>
          </div>
          <div class="meta-item full-width">
            <strong>Meta Description:</strong>
            <span class="meta-val ${!page.description ? 'text-danger' : ''}">${escapeHtml(page.description) || 'Missing Meta Description'}</span>
          </div>
        </div>

        <div class="issues-section">
          ${page.errors.length > 0 ? `<div class="issue-group"><h3>Critical Errors</h3>${errorsListHtml}</div>` : ''}
          ${page.warnings.length > 0 ? `<div class="issue-group"><h3>Optimizations</h3>${warningsListHtml}</div>` : ''}
          ${page.passed.length > 0 ? `<div class="issue-group collapsed"><h3 onclick="togglePassed(this)">Passed Checks (${page.passed.length}) <span class="toggle-icon">▶</span></h3><div class="passed-list" style="display:none">${passedListHtml}</div></div>` : ''}
        </div>
      </section>
    `;
  });

  // Main Report HTML Template
  const reportHtmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SEO Generator Suite | Laporan Audit Proyek</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #0B3D5C;
      --primary-light: #1E5E85;
      --bg: #F8FAF5;
      --card-bg: #ffffff;
      --text: #0F172A;
      --text-muted: #475569;
      --success: #10B981;
      --warning: #F59E0B;
      --danger: #EF4444;
      --border: #E2E8F0;
      --radius: 16px;
      --transition: all 0.25s ease-out;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.6;
      padding: 40px 20px;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    header {
      background: linear-gradient(135deg, var(--primary), var(--primary-light));
      color: white;
      padding: 40px;
      border-radius: var(--radius);
      margin-bottom: 30px;
      box-shadow: 0 10px 30px rgba(11, 61, 92, 0.12);
      position: relative;
      overflow: hidden;
    }

    header::after {
      content: '';
      position: absolute;
      width: 300px;
      height: 300px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 50%;
      top: -100px;
      right: -100px;
      pointer-events: none;
    }
    
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 20px;
    }

    .header-logo {
      font-weight: 800;
      font-size: 0.9rem;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      opacity: 0.85;
      margin-bottom: 8px;
    }
    
    h1 {
      font-size: 2.2rem;
      font-weight: 800;
      margin-bottom: 6px;
    }
    
    .subtitle {
      font-size: 1.05rem;
      opacity: 0.9;
    }
    
    .meta-time {
      display: inline-block;
      margin-top: 15px;
      font-size: 0.8rem;
      background: rgba(255, 255, 255, 0.15);
      padding: 6px 14px;
      border-radius: 30px;
      font-weight: 500;
    }

    .score-badge {
      font-size: 3.5rem;
      font-weight: 900;
      padding: 10px 25px;
      border-radius: var(--radius);
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
    
    .score-badge span {
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 4px;
      opacity: 0.85;
    }

    .score-good { background-color: var(--success); color: white; }
    .score-average { background-color: var(--warning); color: white; }
    .score-poor { background-color: var(--danger); color: white; }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      margin-bottom: 45px;
    }
    
    .stat-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
      transition: var(--transition);
    }
    
    .stat-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
    }
    
    .stat-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .icon-pages { background: rgba(30, 94, 133, 0.1); color: var(--primary); }
    .icon-errors { background: rgba(220, 38, 38, 0.1); color: var(--danger); }
    .icon-warnings { background: rgba(245, 158, 11, 0.1); color: var(--warning); }
    
    .stat-details h3 {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-muted);
      margin-bottom: 4px;
    }
    
    .stat-number {
      font-size: 1.6rem;
      font-weight: 800;
    }
    
    .dashboard-layout {
      display: grid;
      grid-template-columns: 2.8fr 1.2fr;
      gap: 30px;
    }
    
    @media (max-width: 900px) {
      .dashboard-layout {
        grid-template-columns: 1fr;
      }
    }
    
    .sidebar {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 25px;
      align-self: start;
      position: sticky;
      top: 20px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
    }

    .sidebar-title {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid var(--bg);
    }

    .sidebar-list {
      max-height: 500px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .sidebar-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px;
      border: 1px solid var(--border);
      border-radius: 8px;
      background: var(--bg);
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 500;
      transition: var(--transition);
    }

    .sidebar-item:hover {
      border-color: var(--primary-light);
      background: white;
    }

    .sidebar-file-info {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .badge {
      font-size: 0.7rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .badge-success { background: rgba(16, 185, 129, 0.15); color: var(--success); }
    .badge-warning { background: rgba(245, 158, 11, 0.15); color: var(--warning); }
    .badge-danger { background: rgba(239, 68, 68, 0.15); color: var(--danger); }

    .page-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
      transition: var(--transition);
      scroll-margin-top: 20px;
    }

    .page-card:hover {
      box-shadow: 0 8px 30px rgba(11, 61, 92, 0.05);
    }

    .page-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 15px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 20px;
    }

    .page-card-header h2 {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--primary);
    }

    .page-meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 25px;
      background: var(--bg);
      padding: 20px;
      border-radius: 8px;
      font-size: 0.85rem;
    }

    .meta-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .meta-item.full-width {
      grid-column: span 2;
    }

    @media (max-width: 600px) {
      .meta-item.full-width, .page-meta-grid {
        grid-template-columns: 1fr;
        grid-column: span 1;
      }
    }

    .meta-item strong {
      color: var(--text-muted);
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.5px;
    }

    .meta-val {
      font-weight: 500;
      word-break: break-all;
    }

    .text-danger {
      color: var(--danger);
      font-weight: 600;
    }

    .issues-section {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .issue-group h3 {
      font-size: 0.95rem;
      font-weight: 700;
      margin-bottom: 12px;
      color: var(--text-muted);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .issue-group.collapsed h3 {
      cursor: pointer;
      user-select: none;
    }

    .toggle-icon {
      font-size: 0.75rem;
      transition: transform 0.2s;
    }

    .issue-group.expanded .toggle-icon {
      transform: rotate(90deg);
    }

    .issue-item {
      padding: 12px 16px;
      border-left: 4px solid;
      background: var(--bg);
      border-radius: 0 8px 8px 0;
      margin-bottom: 8px;
      font-size: 0.85rem;
    }

    .issue-error {
      border-left-color: var(--danger);
      background: rgba(239, 68, 68, 0.02);
    }

    .issue-warning {
      border-left-color: var(--warning);
      background: rgba(245, 158, 11, 0.02);
    }

    .issue-passed {
      border-left-color: var(--success);
      background: rgba(16, 185, 129, 0.02);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .issue-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 4px;
    }

    .issue-badge {
      font-size: 0.65rem;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 4px;
      text-transform: uppercase;
    }

    .issue-message {
      color: var(--text);
      font-weight: 500;
    }

    .passed-list {
      margin-top: 8px;
    }
  </style>
  <script>
    function scrollToPage(id) {
      const el = document.getElementById('page-' + id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }

    function togglePassed(header) {
      const parent = header.parentElement;
      const list = parent.querySelector('.passed-list');
      const icon = parent.querySelector('.toggle-icon');
      
      if (list.style.display === 'none') {
        list.style.display = 'block';
        parent.classList.add('expanded');
        icon.innerText = '▼';
      } else {
        list.style.display = 'none';
        parent.classList.remove('expanded');
        icon.innerText = '▶';
      }
    }
  </script>
</head>
<body>
  <div class="container">
    <header>
      <div class="header-top">
        <div>
          <div class="header-logo">SEO GENERATOR SUITE</div>
          <h1>Laporan Audit Proyek</h1>
          <p class="subtitle">Delta Tour Static HTML Optimization & Generation Report</p>
          <span class="meta-time">Dihasilkan pada: ${dateStr}</span>
        </div>
        <div class="score-badge ${scoreClass}">
          ${score}
          <span>Score</span>
        </div>
      </div>
    </header>

    <main class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon icon-pages">📁</div>
        <div class="stat-details">
          <h3>Total Halaman</h3>
          <p class="stat-number">${totalPages}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon icon-errors">⚠️</div>
        <div class="stat-details">
          <h3>Critical Errors</h3>
          <p class="stat-number" style="color: var(--danger)">${errorsCount}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon icon-warnings">💡</div>
        <div class="stat-details">
          <h3>Optimizations</h3>
          <p class="stat-number" style="color: var(--warning)">${warningsCount}</p>
        </div>
      </div>
    </main>

    <div class="dashboard-layout">
      <div class="content-area">
        ${pagesHtml}
      </div>
      
      <div class="sidebar">
        <div class="sidebar-title">Daftar File</div>
        <div class="sidebar-list">
          ${sidebarHtml}
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

  // Ensure seo-report directory exists
  if (!fs.existsSync('seo-report')) {
    fs.mkdirSync('seo-report');
    logger.info('Created directory: seo-report');
  }

  fs.writeFileSync(path.join('seo-report', 'report.html'), reportHtmlContent, 'utf-8');
  logger.success('Saved: seo-report/report.html');
}

// Simple html tag character escape
function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[&<"']/g, (c) => {
    switch (c) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '"': return '&quot;';
      case '\'': return '&#039;';
    }
  });
}

module.exports = {
  generateHtmlReport
};
