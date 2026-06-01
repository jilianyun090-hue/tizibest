const fs = require('fs');
const path = require('path');

const filePath = String.raw`d:\桌面文件\vpns-top.com\airport.html`;

// Map: avatar text -> [airport name, logo URL]
const LOGOS = [
  // 文字  ->  logo URL
  ['极', '极连云',   'https://i.ibb.co/5XvXTMxR/photo-2025-12-14-16-40-25.jpg'],
  ['瞬', '瞬云机场', 'https://i.ibb.co/DHLgNf1d/Gemini-Generated-Image-7oufv07oufv07ouf-1.png'],
  ['寰', '寰宇云',   'https://i.ibb.co/wrhvStSP/Gemini-Generated-Image-8su9c18su9c18su9-1.png'],
  ['光年', '光年梯',  'https://i.ibb.co/Gv8rp8rk/photo-2026-04-15-13-24-38.jpg'],
  ['极速', '极速云',  'https://i.ibb.co/qF3fTyK4/jisu-LOGO.png'],
  ['全', '全球云',   'https://i.ibb.co/4Zzh2Qk6/image.png'],
  ['光速', '光速云',  'https://i.ibb.co/FkYmVdyN/logo.jpg'],
  ['山海', '山海',    'https://i.ibb.co/dsVwTgx2/image.jpg'],
  ['奈', '奈云',     'https://i.ibb.co/RTB2cqwW/image.png'],
  ['隐', '隐云',     'https://i.ibb.co/FCC7ptp/logo.webp'],
  ['E',  'Edge-X',  'https://i.ibb.co/F4VvFN55/edge.jpg'],
  ['L',  'LiZione', 'https://i.ibb.co/PGkmP1rg/lizione.jpg'],
  ['山水', '山水云',  'https://i.ibb.co/LD8J8vN2/image.jpg'],
  ['可', '可达加速度','https://i.ibb.co/DBnJmbc/image.jpg'],
  ['迅', '迅达VPN', 'https://i.ibb.co/Sw0nyMS8/image.jpg'],
  ['边', '边界云',   'https://i.ibb.co/RpffcYng/image.jpg'],
];

let c = fs.readFileSync(filePath, 'utf8');

// Replace each avatar div
// Pattern: <div class="airport-list-avatar">TEXT</div>
for (const [char, name, url] of LOGOS) {
  // Escape special regex chars in char
  const escaped = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`<div class="airport-list-avatar">${escaped}<\/div>`, 'g');
  const replacement = `<div class="airport-list-avatar" style="padding:0;overflow:hidden;background:transparent;"><img src="${url}" alt="${name} Logo" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" loading="lazy" onerror="this.parentElement.style.background='var(--accent-primary)';this.style.display='none';this.parentElement.innerHTML='${char[0]}';"></div>`;
  const before = c.length;
  c = c.replace(re, replacement);
  if (c.length !== before) {
    console.log(`[OK] Replaced avatar for: ${name}`);
  } else {
    console.log(`[WARN] Not found: "${char}" (${name})`);
  }
}

fs.writeFileSync(filePath, c, 'utf8');
console.log('\nDone!');
