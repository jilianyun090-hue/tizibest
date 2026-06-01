const fs = require('fs');

// Check guides.html sidebar
const g = fs.readFileSync('guides.html', 'utf8');
const hasTGLink = g.includes('href="https://t.me/feifei04"');
const hasBrokenLink = g.includes('href="#" class="social-icon"');
console.log('guides has correct TG link:', hasTGLink);
console.log('guides has broken link:', hasBrokenLink);

// Check airport.html
const a = fs.readFileSync('airport.html', 'utf8');
console.log('airport has correct TG link:', a.includes('href="https://t.me/feifei04"'));
console.log('airport has broken link:', a.includes('href="#" class="social-icon"'));

// Check reviews.html
const r = fs.readFileSync('reviews.html', 'utf8');
console.log('reviews has correct TG link:', r.includes('href="https://t.me/feifei04"'));
console.log('reviews has broken link:', r.includes('href="#" class="social-icon"'));

// Show the actual social links section from guides
const socialStart = g.indexOf('<div class="social-links">');
if (socialStart !== -1) {
  console.log('guides social section:', g.substring(socialStart, socialStart + 200));
}
