const fs = require('fs');
const path = require('path');

const rootDir = String.raw`d:\桌面文件\vpns-top.com`;
const postsDir = path.join(rootDir, 'posts');

// Favicon tags to insert (before </head>)
const FAVICON_ROOT = `  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="alternate icon" href="/favicon.svg">
  <meta name="theme-color" content="#6366f1">
`;
const FAVICON_POSTS = `  <link rel="icon" type="image/svg+xml" href="../favicon.svg">
  <link rel="alternate icon" href="../favicon.svg">
  <meta name="theme-color" content="#6366f1">
`;

function addFavicon(filePath, faviconBlock) {
  let c = fs.readFileSync(filePath, 'utf8');
  if (c.includes('rel="icon"')) {
    console.log(`  [SKIP] already has icon: ${path.basename(filePath)}`);
    return;
  }
  c = c.replace('</head>', faviconBlock + '</head>');
  fs.writeFileSync(filePath, c, 'utf8');
  console.log(`  [OK] ${path.basename(filePath)}`);
}

// Root pages
for (const fn of ['index.html','airport.html','reviews.html','guides.html','software.html']) {
  addFavicon(path.join(rootDir, fn), FAVICON_ROOT);
}

// Post pages
let n = 0;
for (const fn of fs.readdirSync(postsDir).filter(f => f.endsWith('.html'))) {
  addFavicon(path.join(postsDir, fn), FAVICON_POSTS);
  n++;
}

console.log(`\nDone! Processed ${n} post files + 5 root pages.`);
