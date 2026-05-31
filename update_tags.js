const fs = require('fs');
const path = require('path');

const rootDir = String.raw`d:\桌面文件\vpns-top.com`;

// 新标签云 HTML - 所有标签都有 data-tag 属性和 href
const NEW_TAG_CLOUD = `<div class="tag-cloud">
          <a href="javascript:void(0)" class="tag-item" data-tag="机场推荐">机场推荐</a>
<a href="javascript:void(0)" class="tag-item" data-tag="IEPL专线">IEPL专线</a>
<a href="javascript:void(0)" class="tag-item" data-tag="IPLC专线">IPLC专线</a>
<a href="javascript:void(0)" class="tag-item" data-tag="流媒体解锁">流媒体解锁</a>
<a href="javascript:void(0)" class="tag-item" data-tag="客户端教程">客户端教程</a>
<a href="javascript:void(0)" class="tag-item" data-tag="Clash Verge">Clash Verge</a>
<a href="javascript:void(0)" class="tag-item" data-tag="Shadowrocket">Shadowrocket</a>
<a href="javascript:void(0)" class="tag-item" data-tag="v2rayN">v2rayN</a>
<a href="javascript:void(0)" class="tag-item" data-tag="Clash Meta">Clash Meta</a>
<a href="javascript:void(0)" class="tag-item" data-tag="新手指南">新手指南</a>
<a href="javascript:void(0)" class="tag-item" data-tag="防跑路">防跑路</a>
<a href="javascript:void(0)" class="tag-item" data-tag="Shadowsocks">Shadowsocks</a>
<a href="javascript:void(0)" class="tag-item" data-tag="Hysteria2">Hysteria2</a>
<a href="javascript:void(0)" class="tag-item" data-tag="BGP中转">BGP中转</a>
<a href="javascript:void(0)" class="tag-item" data-tag="不限设备">不限设备</a>
<a href="javascript:void(0)" class="tag-item" data-tag="高性价比">高性价比</a>
<a href="javascript:void(0)" class="tag-item" data-tag="商务首选">商务首选</a>
<a href="javascript:void(0)" class="tag-item" data-tag="ChatGPT">ChatGPT</a>
<a href="javascript:void(0)" class="tag-item" data-tag="Netflix">Netflix</a>
<a href="javascript:void(0)" class="tag-item" data-tag="原生IP">原生IP</a>
<a href="javascript:void(0)" class="tag-item" data-tag="便宜机场">便宜机场</a>
<a href="javascript:void(0)" class="tag-item" data-tag="按量付费">按量付费</a>
<a href="javascript:void(0)" class="tag-item" data-tag="局域网共享">局域网共享</a>
<a href="javascript:void(0)" class="tag-item" data-tag="GFW">GFW</a>
<a href="javascript:void(0)" class="tag-item" data-tag="配置步骤">配置步骤</a>
        </div>`;

const OLD_TAG_CLOUD_RE = /<div class="tag-cloud">[\s\S]*?<\/div>/;

// Pages to update tag cloud
const pages = ['index.html','airport.html','reviews.html','guides.html'];

for (const fn of pages) {
  const filePath = path.join(rootDir, fn);
  let c = fs.readFileSync(filePath, 'utf8');
  if (OLD_TAG_CLOUD_RE.test(c)) {
    c = c.replace(OLD_TAG_CLOUD_RE, NEW_TAG_CLOUD);
    fs.writeFileSync(filePath, c, 'utf8');
    console.log(`[OK] Updated tag cloud in ${fn}`);
  } else {
    console.log(`[SKIP] No tag cloud found in ${fn}`);
  }
}

// Also update post files tag clouds
const postsDir = path.join(rootDir, 'posts');
let postCount = 0;
for (const fn of fs.readdirSync(postsDir).filter(f => f.endsWith('.html'))) {
  const filePath = path.join(postsDir, fn);
  let c = fs.readFileSync(filePath, 'utf8');
  if (OLD_TAG_CLOUD_RE.test(c)) {
    c = c.replace(OLD_TAG_CLOUD_RE, NEW_TAG_CLOUD);
    fs.writeFileSync(filePath, c, 'utf8');
    postCount++;
  }
}
console.log(`[OK] Updated tag cloud in ${postCount} post files`);
console.log('\nAll done!');
