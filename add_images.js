const fs = require('fs');

// Fix shadowrocket
let sr = fs.readFileSync('posts/shadowrocket-tutorial.html', 'utf8');
if (!sr.includes('clashmac.cn.com/img/docs')) {
  const srImg = `    </ol>

    <div style="margin:1.25rem 0;display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.75rem;">
      <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260104120350916.webp" alt="小火箭添加订阅" style="width:100%;border-radius:8px;" loading="lazy"><figcaption style="font-size:0.78rem;color:var(--text-secondary);margin-top:0.3rem;">① 点＋选 Subscribe</figcaption></figure>
      <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260104120425805.webp" alt="小火箭粘贴订阅地址" style="width:100%;border-radius:8px;" loading="lazy"><figcaption style="font-size:0.78rem;color:var(--text-secondary);margin-top:0.3rem;">② 粘贴订阅地址</figcaption></figure>
      <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260104120434708.webp" alt="小火箭开启代理" style="width:100%;border-radius:8px;" loading="lazy"><figcaption style="font-size:0.78rem;color:var(--text-secondary);margin-top:0.3rem;">③ 开启代理开关</figcaption></figure>
    </div>`;
  sr = sr.replace('    </ol>\n    <p>注意，如果在登录美区', srImg + '\n    <p>注意，如果在登录美区');
  fs.writeFileSync('posts/shadowrocket-tutorial.html', sr, 'utf8');
  console.log('Fixed shadowrocket, has images:', sr.includes('clashmac.cn.com/img/docs'));
} else {
  console.log('shadowrocket already has images');
}

// Fix v2rayn
let v2 = fs.readFileSync('posts/v2rayn-tutorial.html', 'utf8');
if (!v2.includes('clashmac.cn.com/img/docs')) {
  const v2Img = `    </ol>

    <div style="margin:1.25rem 0;display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
      <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260105111003561.webp" alt="v2rayN 订阅分组设置" style="width:100%;border-radius:8px;" loading="lazy"><figcaption style="font-size:0.78rem;color:var(--text-secondary);margin-top:0.3rem;">① 订阅分组设置</figcaption></figure>
      <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260105111011206.webp" alt="v2rayN 添加订阅地址" style="width:100%;border-radius:8px;" loading="lazy"><figcaption style="font-size:0.78rem;color:var(--text-secondary);margin-top:0.3rem;">② 添加订阅地址</figcaption></figure>
      <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260105111110903.webp" alt="v2rayN 选择低延迟节点" style="width:100%;border-radius:8px;" loading="lazy"><figcaption style="font-size:0.78rem;color:var(--text-secondary);margin-top:0.3rem;">③ 选择低延迟节点</figcaption></figure>
      <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260105111119897.webp" alt="v2rayN 开启系统代理" style="width:100%;border-radius:8px;" loading="lazy"><figcaption style="font-size:0.78rem;color:var(--text-secondary);margin-top:0.3rem;">④ 开启系统代理</figcaption></figure>
    </div>`;
  // Find the first </ol> in the article-body
  const bodyStart = v2.indexOf('<div class="article-body">');
  const firstOlEnd = v2.indexOf('</ol>', bodyStart);
  const afterOl = v2.substring(firstOlEnd + 5, firstOlEnd + 120);
  console.log('v2rayn after ol:', afterOl.substring(0, 80));
  // Replace first </ol> in article body
  v2 = v2.substring(0, firstOlEnd) + v2Img.replace('    </ol>', '') + v2.substring(firstOlEnd);
  fs.writeFileSync('posts/v2rayn-tutorial.html', v2, 'utf8');
  console.log('Fixed v2rayn, has images:', v2.includes('clashmac.cn.com/img/docs'));
} else {
  console.log('v2rayn already has images');
}

// Fix Clash Meta Android
let cma = fs.readFileSync('posts/clash-meta-android-tutorial.html', 'utf8');
if (!cma.includes('clashmac.cn.com/img/docs')) {
  const cmaImg = `    </ol>

    <div style="margin:1.25rem 0;display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.75rem;">
      <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260102135135983.webp" alt="Clash Meta 新增配置" style="width:100%;border-radius:8px;" loading="lazy"><figcaption style="font-size:0.78rem;color:var(--text-secondary);margin-top:0.3rem;">① 点＋新增配置</figcaption></figure>
      <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260102135152264.webp" alt="Clash Meta 粘贴订阅" style="width:100%;border-radius:8px;" loading="lazy"><figcaption style="font-size:0.78rem;color:var(--text-secondary);margin-top:0.3rem;">② 粘贴订阅链接保存</figcaption></figure>
      <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260102135220682.webp" alt="Clash Meta 开启代理" style="width:100%;border-radius:8px;" loading="lazy"><figcaption style="font-size:0.78rem;color:var(--text-secondary);margin-top:0.3rem;">③ 点启动开启代理</figcaption></figure>
    </div>`;
  const bodyStart = cma.indexOf('<div class="article-body">');
  const firstOlEnd = cma.indexOf('</ol>', bodyStart);
  cma = cma.substring(0, firstOlEnd) + cmaImg.replace('    </ol>', '') + cma.substring(firstOlEnd);
  fs.writeFileSync('posts/clash-meta-android-tutorial.html', cma, 'utf8');
  console.log('Fixed clash-meta-android, has images:', cma.includes('clashmac.cn.com/img/docs'));
} else {
  console.log('clash-meta-android already has images');
}

console.log('All done!');
