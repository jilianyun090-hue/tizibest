const fs = require('fs');
const path = require('path');

const postsDir = String.raw`d:\桌面文件\vpns-top.com\posts`;
const rootDir  = String.raw`d:\桌面文件\vpns-top.com`;

const GEO = `  <meta name="geo.region" content="CN">
  <meta name="geo.placename" content="China">
  <meta name="language" content="zh-CN">
  <meta name="revisit-after" content="3 days">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="稳定机场推荐">
  <meta property="og:locale" content="zh_CN">
  <meta name="twitter:card" content="summary_large_image">
`;

function processFile(filePath, urlPath) {
  let c = fs.readFileSync(filePath, 'utf8');
  // Fix logo
  c = c.replace(/<span>(?:vpns-top|tizibest)\.com<\/span>/g, '<span>稳定机场推荐</span>');
  // Add GEO only if not present
  if (!c.includes('geo.region')) {
    const titleM = c.match(/<title>(.+?)(?: - (?:vpns-top|tizibest)\.com)?<\/title>/);
    const descM  = c.match(/<meta name="description" content="([^"]+)"/);
    const ogTitle = titleM ? titleM[1] : '稳定机场推荐';
    const ogDesc  = descM  ? descM[1].slice(0,160) : '2026年优质机场评测';
    const ogUrl   = `https://www.tizibest.com/${urlPath}`;
    const ogExtra = `  <meta property="og:title" content="${ogTitle}">\n  <meta property="og:description" content="${ogDesc}">\n  <meta property="og:url" content="${ogUrl}">\n`;
    c = c.replace('</head>', GEO + ogExtra + '</head>');
    fs.writeFileSync(filePath, c, 'utf8');
    return 'updated';
  }
  fs.writeFileSync(filePath, c, 'utf8');
  return 'skipped';
}

let updated = 0, skipped = 0;

// Process posts
const postFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.html'));
for (const fn of postFiles) {
  const r = processFile(path.join(postsDir, fn), `posts/${fn}`);
  if (r === 'updated') { updated++; console.log(`  [OK] posts/${fn}`); }
  else skipped++;
}

// Process root pages
for (const fn of ['index.html','airport.html','reviews.html','guides.html','software.html']) {
  const r = processFile(path.join(rootDir, fn), fn);
  if (r === 'updated') { updated++; console.log(`  [OK] ${fn}`); }
  else skipped++;
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped`);
