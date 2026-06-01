const fs = require('fs');

// Fix guides.html, reviews.html, airport.html, software.html
const filesToFix = ['guides.html', 'reviews.html', 'airport.html', 'software.html'];

filesToFix.forEach(filename => {
  let content = fs.readFileSync(filename, 'utf8');
  const original = content;
  
  // Fix TG link
  content = content.replace(
    '<a href="#" class="social-icon" title="Telegram 频道">TG</a>',
    '<a href="https://t.me/feifei04" target="_blank" class="social-icon" title="Telegram 频道">TG</a>'
  );
  
  // Remove X (Twitter) icon
  content = content.replace('<a href="#" class="social-icon" title="Twitter 官方账号">X</a>', '');
  
  // Fix email link
  content = content.replace(
    '<a href="#" class="social-icon" title="联系邮箱">✉</a>',
    '<a href="mailto:haozevpn@gmail.com" class="social-icon" title="联系邮箱">✉</a>'
  );
  
  if (content !== original) {
    fs.writeFileSync(filename, content, 'utf8');
    console.log('Fixed:', filename);
  } else {
    console.log('No changes needed:', filename);
  }
});

console.log('All done!');
