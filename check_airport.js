const fs = require('fs');
const a = fs.readFileSync('airport.html', 'utf8');
const socialStart = a.indexOf('<div class="social-links">');
if (socialStart !== -1) {
  console.log('airport social section:', a.substring(socialStart, socialStart + 250));
}
