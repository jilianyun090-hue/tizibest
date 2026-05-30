const fs = require('fs');
const path = require('path');
const articles = require('./src/data/articles.js');
const articleGenerator = require('./src/data/articleGenerator.js');

// Airport metadata for grid cards and comparison table
const airports = [
  {
    name: "极连云",
    price: "8.00",
    slug: "jilianyun-review",
    features: ["IEPL专线", "不限速", "不限设备数", "支持不限时"],
    desc: "2026综合首选，采用IEPL国际专线保证晚高峰。支持不限时套餐且不设设备上限，对新手和极客都极其友好。",
    affLink: "https://haozevpn.jlyvipaff.com/#/?code=KUKfOY13",
    rank: 1,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/jilianyun"
  },
  {
    name: "瞬云机场",
    price: "8.25",
    slug: "shunyun-review",
    features: ["Anycast直连", "1倍率无虚标", "大带宽", "支持不限时"],
    desc: "全站一倍率，提供超多优质Anycast直连专线节点。价格十分低廉，是不限时大流量用户的极佳选择。",
    affLink: "https://bbb.jichang.best/#/register?code=o4I4kToe",
    rank: 2,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/shunyun"
  },
  {
    name: "寰宇云",
    price: "7.40",
    slug: "huanyuyun-review",
    features: ["BGP多线中转", "支持不限时", "按量付费", "高性价比"],
    desc: "主打按量付费与不限时套餐，年付仅需89元起。提供BGP多线中转，性价比优秀，适合日常低频或备用用户。",
    affLink: "https://bbb.jichang.best/#/register?code=o4I4kToe",
    rank: 3,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/huanyuyun"
  },
  {
    name: "光年梯",
    price: "7.50",
    slug: "guangnianti-review",
    features: ["老牌机场", "IEPL物理专线", "不限速", "不限时套餐"],
    desc: "深耕行业多年的知名老厂，以极高的稳定性和灾备出口著称。提供高性价比不限时套餐，大流量首选。",
    affLink: "https://gnt001.gntvipaff.cc/#/?code=j1ufpE44",
    rank: 4,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/guangnianti"
  },
  {
    name: "极速云机场",
    price: "8.25",
    slug: "jisuyun-review",
    features: ["中转加速", "大带宽", "不限时套餐", "多平台兼容"],
    desc: "极速云采用中转加直连高速混合网络，提供极低的起步门槛和灵活的配置，性价比非常优秀，完美契合个人娱乐。",
    affLink: "https://ask.xsccusm.com:8888/#/register?code=RENHYxqv",
    rank: 5,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/jisuyun"
  },
  {
    name: "山水云",
    price: "14.99",
    slug: "shanshuiyun-review",
    features: ["隧道中转", "流媒体解锁", "按量付费", "设备无限制"],
    desc: "主打隧道中转和不限设备，提供极其稳定且全面的流媒体及AI平台解锁支持，日常网络检索推荐。",
    affLink: "https://haozevpn.jlyvipaff.com/#/?code=KUKfOY13",
    rank: 6,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/shanshuiyun"
  },
  {
    name: "秒秒云",
    price: "14.00",
    slug: "miaomiaoyun-review",
    features: ["高速中转", "原生IP多", "住宅IP解锁", "不限时"],
    desc: "主打多地BGP接入及原生IP解锁。提供极其干净的住宅IP，非常适合高频使用ChatGPT/Claude的开发者。",
    affLink: "https://dl1.mmy8.com/#/register?code=g3bq7bpK",
    rank: 7,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/miaomiaoyun"
  },
  {
    name: "迅达VPN",
    price: "15.00",
    slug: "xundavpn-review",
    features: ["直连公网", "大带宽", "老牌稳定", "多协议支持"],
    desc: "直连公网多协议防封锁梯子，提供大带宽下载支持，适合追求极致速度的大流量下载和重度网民。",
    affLink: "https://ask.xsccusm.com:8888/#/register?code=RENHYxqv",
    rank: 8,
    noLimit: false,
    hasTrial: false,
    tgGroup: ""
  },
  {
    name: "Edge-X机场",
    price: "16.80",
    slug: "edgex-review",
    features: ["IPLC专线", "低延迟", "不限设备数", "大流量支持"],
    desc: "IPLC低延迟跨国专线机场，不限连接设备数量。全节点1倍率无虚耗，晚高峰保障不卡顿。",
    affLink: "https://gnt001.gntvipaff.cc/#/?code=j1ufpE44",
    rank: 9,
    noLimit: true,
    hasTrial: false,
    tgGroup: ""
  },
  {
    name: "可达加速度",
    price: "10.00",
    slug: "kedajiasudu-review",
    features: ["混合专线", "价格实惠", "多线负载", "节点丰富"],
    desc: "专线多线负载均衡架构，套餐价格亲民，适合低预算下追求较高速度和多节点备选的玩家。",
    affLink: "https://1.mkd997.com/#/register?code=JgTY5JiT",
    rank: 10,
    noLimit: false,
    hasTrial: false,
    tgGroup: ""
  },
  {
    name: "奈云",
    price: "10.60",
    slug: "naiyun-review",
    features: ["跨境专线", "AI/Netflix解锁", "全客户端支持", "不限时"],
    desc: "提供超强流媒体与AI平台解锁，包含专属客户端，极简化一键连接，支持不限时按量套餐。",
    affLink: "https://haozevpn.gcvipaff.cc/#/?code=WRQJc2v4",
    rank: 11,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/naiyun"
  },
  {
    name: "隐云",
    price: "25.00",
    slug: "yinyun-review",
    features: ["中转专线", "高隐蔽性", "高安全性", "防封锁协议"],
    desc: "主打中转专线与自研高隐蔽性防封锁传输协议，抗封锁能力强，特别适合高敏感时期的稳定科学上网。",
    affLink: "https://flycat.flycatvipaff.cc/#/?code=1arEKHqh",
    rank: 12,
    noLimit: false,
    hasTrial: false,
    tgGroup: ""
  },
  {
    name: "山海机场",
    price: "6.00",
    slug: "shanhai-review",
    features: ["极致低价", "不限时套餐", "包年特惠", "中转加速"],
    desc: "适合大流量下载和追求绝对低门槛的平民级机场。套餐价格极低，性价比极高，推荐作为常用备用选项。",
    affLink: "https://shanhai.sbs/#/register?code=qVTbPfWP",
    rank: 13,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/shanhai"
  },
  {
    name: "LiZione",
    price: "10.00",
    slug: "lizione-review",
    features: ["Shadowsocks", "BGP中转", "多端支持", "原生解锁"],
    desc: "稳定Shadowsocks原生协议专线，节点速度快且安全风控干净，完美解锁ChatGPT与各类流媒体。",
    affLink: "https://haoze.v2yunvipaff.com/#/?code=trJG2874",
    rank: 14,
    noLimit: false,
    hasTrial: false,
    tgGroup: "https://t.me/lizione"
  },
  {
    name: "光速云",
    price: "8.25",
    slug: "guangshuyun-review",
    features: ["BGP+IEPL", "不限时套餐", "1倍率无虚耗", "全节点解锁"],
    desc: "高质量BGP中转和IEPL专线混合架构，不限时大流量套餐性价比突出，晚高峰运行极速不卡顿。",
    affLink: "https://kjlq01.gsyvipaff.cc/#/?code=b1OTkTeL",
    rank: 15,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/guangshuyun"
  },
  {
    name: "全球云",
    price: "20.00",
    slug: "quanqiuyun-review",
    features: ["智能调度", "8K秒开", "流媒体优化", "不限时"],
    desc: "专为4K/8K超清流媒体进行优化，晚高峰吞吐能力极强。按量付费不限时，稳定性和速度都属第一梯队。",
    affLink: "https://haozevpn.gcvipaff.cc/#/?code=WRQJc2v4",
    rank: 16,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/quanqiuyun"
  },
  {
    name: "星岛梦",
    price: "16.00",
    slug: "xingdaomeng-review",
    features: ["IEPL物理专线", "不限设备", "Trojan防封锁", "不限时"],
    desc: "全线搭载防封锁极佳的Trojan协议与物理专线，支持无限设备同时在线。晚高峰速率有保障。",
    affLink: "https://wuyou202001.xdmvipaff.cc/#/?code=olWCiAhj",
    rank: 17,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/xingdaomeng"
  },
  {
    name: "哆啦A梦",
    price: "10.00",
    slug: "doraemon-review",
    features: ["三网IEPL", "千兆大带宽", "原生IP解锁", "支持不限时"],
    desc: "搭载三网IEPL内网专线出口，晚高峰实测能跑满千兆带宽。原生IP解锁，完美满足风控AI与流媒体需求。",
    affLink: "https://store.yyds2-doraemon.site/login/register?invite_code=5VxQMw0k",
    rank: 18,
    noLimit: true,
    hasTrial: false,
    tgGroup: ""
  },
  {
    name: "大哥云",
    price: "19.90",
    slug: "dageyun-review",
    features: ["自研客户端", "有免费试用", "多节点覆盖", "一键连接"],
    desc: "提供专业的自研客户端以及新用户免费试用额度，操作门槛极低，适合小白用户一键完成科学上网。",
    affLink: "https://haoze.v2yunvipaff.com/#/?code=trJG2874",
    rank: 19,
    noLimit: false,
    hasTrial: true,
    tgGroup: "https://t.me/dageyun"
  },
  {
    name: "龙猫云",
    price: "15.00",
    slug: "longmaoyun-review",
    features: ["Shadowsocks", "专线中转", "多端自适应", "安全稳定"],
    desc: "高端中转传输加上Shadowsocks原生链路，提供极其纯净安全的连接质量，有效抵抗封锁，风控表现优秀。",
    affLink: "https://flycat.flycatvipaff.cc/#/?code=1arEKHqh",
    rank: 20,
    noLimit: false,
    hasTrial: false,
    tgGroup: "https://t.me/longmaoyun"
  },
  {
    name: "飞鸟机场",
    price: "15.00",
    slug: "feiniaojichang-review",
    features: ["BGP多线中转", "支持不限时", "高速平稳", "全节点解锁"],
    desc: "采用BGP多线网络，保证了国内大部分省市都有极快的连接响应速度。提供按量付费不限时套餐。",
    affLink: "https://bbb.jichang.best/#/register?code=o4I4kToe",
    rank: 21,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/feiniaojichang"
  },
  {
    name: "青云梯",
    price: "8.00",
    slug: "qingyunti-review",
    features: ["隧道中转", "支持不限时", "大带宽秒开", "性价比高"],
    desc: "百兆/千兆大带宽隧道接入，支持不限时套餐。看视频及浏览社交媒体极其流畅，具有极高性价比。",
    affLink: "https://shanhai.sbs/#/register?code=qVTbPfWP",
    rank: 22,
    noLimit: true,
    hasTrial: false,
    tgGroup: ""
  },
  {
    name: "花云",
    price: "10.60",
    slug: "huayun-review",
    features: ["跨境物理专线", "高防中转", "稳定老厂", "多平台优化"],
    desc: "知名老牌机场，物理专线直连，虽然年付起步但稳定性在业内名列前茅，延迟低、无任何卡顿波动。",
    affLink: "https://gnt001.gntvipaff.cc/#/?code=j1ufpE44",
    rank: 23,
    noLimit: false,
    hasTrial: false,
    tgGroup: "https://t.me/flowercloud"
  }
];

// Helper: Make sure directory exists
function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Helper: Strip HTML for search index snippets
function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Helper: Parse H2 & H3 for Table of Contents
function generateTOC(content) {
  const headingRegex = /<h([23])\s+id="([^"]+)">([^<]+)<\/h\1>/g;
  let match;
  let tocItems = [];
  
  while ((match = headingRegex.exec(content)) !== null) {
    const depth = parseInt(match[1]);
    const id = match[2];
    const text = match[3];
    tocItems.push(`<li class="toc-item depth-${depth}"><a href="#${id}" class="toc-link">${text}</a></li>`);
  }
  
  return tocItems.length > 0 ? tocItems.join('\n') : '<li class="toc-item"><a href="#intro" class="toc-link">文章正文</a></li>';
}

function build() {
  console.log("Starting static site build...");

  // SEO screen-reader-only content block containing all target keywords
  const seoHiddenBlock = `
    <div class="sr-only">
      <h2>2026年科学上网稳定翻墙机场推荐与常用节点配置</h2>
      <p>本站长期关注并测试全球高速稳定机场节点服务，涵盖机场推荐、机场节点、翻墙机场、科学上网机场、高速机场、稳定机场、SSR机场、Trojan机场、V2Ray机场、Clash机场、Shadowsocks机场、VPN替代、代理节点、海外节点和国际网络加速等关键网络加速服务。</p>
      <h3>用户高意图便宜与性价比机场选择</h3>
      <p>为满足广大用户购买意图，我们精选了便宜机场推荐、性价比机场、稳定机场推荐、高速机场推荐、最好用机场。特别针对特定应用提供优化支持：Netflix机场、ChatGPT机场、Claude机场、YouTube机场、TikTok机场、AI专用机场、解锁流媒体机场、4K机场与游戏加速机场。</p>
      <h3>常用长尾竞争词与多区域节点推荐</h3>
      <p>主要关注包括：2026机场推荐、新手机场推荐、Clash机场推荐、稳定机场推荐知乎、高速机场推荐贴吧、ChatGPT节点推荐、Claude节点推荐、Netflix解锁机场、TikTok运营机场，提供香港机场推荐、日本机场推荐、新加坡机场推荐、美国机场推荐，采用优质IEPL机场推荐和IPLC机场推荐物理专线。</p>
      <h3>主流科学上网客户端与教程指引</h3>
      <p>我们提供全方位的科学上网教程、机场订阅教程、节点配置教程，主要教程包括：Clash Verge Rev教程、Clash Meta教程、Clash订阅链接、Clash配置教程、V2RayN教程、Shadowrocket教程、Quantumult X教程、Surge教程。</p>
      <h3>解决AI访问限制与流媒体解锁流量问题</h3>
      <p>重点帮助解答：ChatGPT怎么用、ChatGPT网络问题、Claude无法访问、Gemini无法访问，提供专业的OpenAI节点推荐、Claude节点推荐、AI工具网络解决方案、ChatGPT专线节点服务。针对流媒体解锁提供Netflix解锁、Disney+解锁、HBO Max解锁、YouTube Premium、TikTok运营网络、TikTok直播网络以及海外短视频网络配置方案。</p>
    </div>
  `;

  // 0. Pre-generate all dynamic article contents in-place
  articles.forEach(art => {
    art.content = articleGenerator.getContentForArticle(art, airports);
  });

  // 1. Create target directories
  ensureDirSync(path.join(__dirname, 'posts'));
  ensureDirSync(path.join(__dirname, 'assets', 'css'));
  ensureDirSync(path.join(__dirname, 'assets', 'js'));
  ensureDirSync(path.join(__dirname, 'assets', 'images'));

  // 2. Copy static assets
  const cssSource = path.join(__dirname, 'src', 'assets', 'css', 'style.css');
  const cssDest = path.join(__dirname, 'assets', 'css', 'style.css');
  if (fs.existsSync(cssSource)) {
    fs.copyFileSync(cssSource, cssDest);
    console.log("Copied style.css");
  } else {
    console.error("Source style.css not found!");
  }

  const jsSource = path.join(__dirname, 'src', 'assets', 'js', 'main.js');
  const jsDest = path.join(__dirname, 'assets', 'js', 'main.js');
  if (fs.existsSync(jsSource)) {
    fs.copyFileSync(jsSource, jsDest);
    console.log("Copied main.js");
  } else {
    console.error("Source main.js not found!");
  }

  const imagesSourceDir = path.join(__dirname, 'src', 'assets', 'images');
  const imagesDestDir = path.join(__dirname, 'assets', 'images');
  if (fs.existsSync(imagesSourceDir)) {
    const imageFiles = fs.readdirSync(imagesSourceDir);
    imageFiles.forEach(file => {
      fs.copyFileSync(path.join(imagesSourceDir, file), path.join(imagesDestDir, file));
    });
    console.log("Copied images folder");
  }

  // 3. Pre-build global search index
  const searchIndex = articles.map(art => {
    const rawContent = stripHtml(art.content);
    return {
      title: art.title,
      summary: rawContent.substring(0, 120),
      url: `posts/${art.slug}.html`,
      tags: art.tags
    };
  });
  const searchIndexJSON = JSON.stringify(searchIndex);

  // 4. Generate dynamic sidebar Popular Articles (top 8)
  const popularArticlesList = articles.slice(0, 8).map((art, idx) => {
    const rankClass = idx < 3 ? 'top-3' : '';
    const views = 15200 - idx * 1250;
    return `
      <div class="popular-item">
        <div class="popular-num ${rankClass}">${idx + 1}</div>
        <div class="popular-info">
          <a href="posts/${art.slug}.html" class="popular-title">${art.title}</a>
          <span class="popular-views">🔥 ${views.toLocaleString()} 次阅读</span>
        </div>
      </div>
    `;
  }).join('\n');

  // Relative Popular Articles for posts (adjust path)
  const popularArticlesListForPosts = articles.slice(0, 8).map((art, idx) => {
    const rankClass = idx < 3 ? 'top-3' : '';
    const views = 15200 - idx * 1250;
    return `
      <div class="popular-item">
        <div class="popular-num ${rankClass}">${idx + 1}</div>
        <div class="popular-info">
          <a href="../posts/${art.slug}.html" class="popular-title">${art.title}</a>
          <span class="popular-views">🔥 ${views.toLocaleString()} 次阅读</span>
        </div>
      </div>
    `;
  }).join('\n');

  // 5. Generate airport-card grids (for root pages)
  const airportCardsMarkup = airports.map(ap => {
    const tagsMarkup = ap.features.map(f => `<span class="feature-tag">${f}</span>`).join('');
    return `
      <div class="airport-card">
        <div class="airport-card-header">
          <div class="airport-avatar">${ap.name[0]}</div>
          <div class="airport-meta-info">
            <h3 class="airport-name">${ap.name}</h3>
            <span class="airport-card-badge badge-recom">推荐度: Top ${ap.rank}</span>
          </div>
        </div>
        <div class="airport-card-body">
          <div class="airport-features">
            ${tagsMarkup}
          </div>
          <p class="airport-desc">${ap.desc}</p>
        </div>
        <div class="airport-card-footer">
          <div class="airport-price">
            <span>￥${ap.price}</span> / 月起
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <a href="posts/${ap.slug}.html" class="airport-btn" style="background-color: var(--badge-bg); color: var(--text-secondary);">评测</a>
            <a href="${ap.affLink}" target="_blank" rel="nofollow" class="airport-btn">注册官网</a>
          </div>
        </div>
      </div>
    `;
  }).join('\n');

  // Adjusted cards markup for posts (pointing to sibling htmls)
  const airportCardsMarkupForPosts = airports.map(ap => {
    const tagsMarkup = ap.features.map(f => `<span class="feature-tag">${f}</span>`).join('');
    return `
      <div class="airport-card">
        <div class="airport-card-header">
          <div class="airport-avatar">${ap.name[0]}</div>
          <div class="airport-meta-info">
            <h3 class="airport-name">${ap.name}</h3>
            <span class="airport-card-badge badge-recom">推荐度: Top ${ap.rank}</span>
          </div>
        </div>
        <div class="airport-card-body">
          <div class="airport-features">
            ${tagsMarkup}
          </div>
          <p class="airport-desc">${ap.desc}</p>
        </div>
        <div class="airport-card-footer">
          <div class="airport-price">
            <span>￥${ap.price}</span> / 月起
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <a href="${ap.slug}.html" class="airport-btn" style="background-color: var(--badge-bg); color: var(--text-secondary);">评测</a>
            <a href="${ap.affLink}" target="_blank" rel="nofollow" class="airport-btn">注册官网</a>
          </div>
        </div>
      </div>
    `;
  }).join('\n');

  // 6. Generate comparison table rows (sorted by rank)
  const sortedAirports = [...airports].sort((a, b) => a.rank - b.rank);
  const compareTableRowsMarkup = sortedAirports.map(ap => {
    let rankBadge = `<span class="compare-rank">${ap.rank}</span>`;
    if (ap.rank === 1) rankBadge = `<span class="compare-rank rank-1">🥇</span>`;
    else if (ap.rank === 2) rankBadge = `<span class="compare-rank rank-2">🥈</span>`;
    else if (ap.rank === 3) rankBadge = `<span class="compare-rank rank-3">🥉</span>`;

    const noLimitMarkup = ap.noLimit ? '<span class="status-yes">✅ 支持</span>' : '<span class="status-no">❌ 不支持</span>';
    const trialMarkup = ap.hasTrial ? '<span class="status-yes">✅ 有试用</span>' : '<span class="status-no">无</span>';
    const tgMarkup = ap.tgGroup ? `<a href="${ap.tgGroup}" target="_blank" rel="nofollow" class="compare-tg-link">TG 群组 ↗</a>` : '<span class="status-no">暂无</span>';

    return `
      <tr>
        <td>${rankBadge}</td>
        <td>
          <div class="compare-name">
            ${ap.name}
          </div>
        </td>
        <td><strong style="color: var(--danger-text);">￥${ap.price}</strong> /月起</td>
        <td>${noLimitMarkup}</td>
        <td>${trialMarkup}</td>
        <td>${tgMarkup}</td>
        <td>
          <a href="posts/${ap.slug}.html" class="compare-detail-btn">评测详情</a>
          <a href="${ap.affLink}" target="_blank" rel="nofollow" class="compare-btn">前往注册</a>
        </td>
      </tr>
    `;
  }).join('\n');

  const compareTableRowsMarkupForPosts = sortedAirports.map(ap => {
    let rankBadge = `<span class="compare-rank">${ap.rank}</span>`;
    if (ap.rank === 1) rankBadge = `<span class="compare-rank rank-1">🥇</span>`;
    else if (ap.rank === 2) rankBadge = `<span class="compare-rank rank-2">🥈</span>`;
    else if (ap.rank === 3) rankBadge = `<span class="compare-rank rank-3">🥉</span>`;

    const noLimitMarkup = ap.noLimit ? '<span class="status-yes">✅ 支持</span>' : '<span class="status-no">❌ 不支持</span>';
    const trialMarkup = ap.hasTrial ? '<span class="status-yes">✅ 有试用</span>' : '<span class="status-no">无</span>';
    const tgMarkup = ap.tgGroup ? `<a href="${ap.tgGroup}" target="_blank" rel="nofollow" class="compare-tg-link">TG 群组 ↗</a>` : '<span class="status-no">暂无</span>';

    return `
      <tr>
        <td>${rankBadge}</td>
        <td>
          <div class="compare-name">
            ${ap.name}
          </div>
        </td>
        <td><strong style="color: var(--danger-text);">￥${ap.price}</strong> /月起</td>
        <td>${noLimitMarkup}</td>
        <td>${trialMarkup}</td>
        <td>${tgMarkup}</td>
        <td>
          <a href="${ap.slug}.html" class="compare-detail-btn">评测详情</a>
          <a href="${ap.affLink}" target="_blank" rel="nofollow" class="compare-btn">前往注册</a>
        </td>
      </tr>
    `;
  }).join('\n');

  // 6.2 Generate vertical airport list (for airport.html)
  const airportListMarkup = sortedAirports.map(ap => {
    const tagsMarkup = ap.features.map(f => `<span class="feature-tag">${f}</span>`).join('');
    const noLimitMarkup = ap.noLimit ? '<span class="status-yes">✅ 支持</span>' : '<span class="status-no">❌ 不支持</span>';
    const trialMarkup = ap.hasTrial ? '<span class="status-yes">✅ 有试用</span>' : '<span class="status-no">无</span>';
    const tgMarkup = ap.tgGroup ? `<a href="${ap.tgGroup}" target="_blank" rel="nofollow" class="compare-tg-link">TG 群组 ↗</a>` : '<span class="status-no">暂无</span>';
    
    let rankBadge = `<span class="compare-rank">${ap.rank}</span>`;
    if (ap.rank === 1) rankBadge = `<span class="compare-rank rank-1">🥇</span>`;
    else if (ap.rank === 2) rankBadge = `<span class="compare-rank rank-2">🥈</span>`;
    else if (ap.rank === 3) rankBadge = `<span class="compare-rank rank-3">🥉</span>`;

    return `
      <div class="airport-list-item">
        <div class="airport-list-left">
          <div class="airport-list-rank">${rankBadge}</div>
          <div class="airport-list-avatar">${ap.name[0]}</div>
          <div class="airport-list-name-section">
            <h3 class="airport-list-name">${ap.name}</h3>
            <span class="airport-list-sub">综合评分: ${(10 - ap.rank*0.1).toFixed(1)} / 10</span>
          </div>
        </div>
        
        <div class="airport-list-middle">
          <div class="airport-list-tags">${tagsMarkup}</div>
          <p class="airport-list-desc">${ap.desc}</p>
        </div>
        
        <div class="airport-list-right">
          <div class="airport-list-price">
            <span class="price-val">￥${ap.price}</span> /月起
          </div>
          <div class="airport-list-meta-grid">
            <div class="meta-cell"><strong>不限时:</strong> ${noLimitMarkup}</div>
            <div class="meta-cell"><strong>有试用:</strong> ${trialMarkup}</div>
            <div class="meta-cell"><strong>TG群组:</strong> ${tgMarkup}</div>
          </div>
          <div class="airport-list-actions">
            <a href="posts/${ap.slug}.html" class="list-btn btn-review">阅读评测</a>
            <a href="${ap.affLink}" target="_blank" rel="nofollow" class="list-btn btn-go">官网注册</a>
          </div>
        </div>
      </div>
    `;
  }).join('\n');

  // 6.3 Generate pinned airport list (Ermao style, top 5)
  const pinnedAirports = sortedAirports.slice(0, 5);
  const pinnedAirportListMarkup = pinnedAirports.map(ap => {
    const tagsMarkup = ap.features.slice(0, 3).map(f => `<span class="feature-tag">${f}</span>`).join('');
    let rankBadge = `<span class="compare-rank">${ap.rank}</span>`;
    if (ap.rank === 1) rankBadge = `<span class="compare-rank rank-1">🥇</span>`;
    else if (ap.rank === 2) rankBadge = `<span class="compare-rank rank-2">🥈</span>`;
    else if (ap.rank === 3) rankBadge = `<span class="compare-rank rank-3">🥉</span>`;

    return `
      <div class="airport-list-item pinned-item">
        <div class="airport-list-left">
          <div class="airport-list-rank">${rankBadge}</div>
          <div class="airport-list-avatar" style="background: var(--accent); color: white;">${ap.name[0]}</div>
          <div class="airport-list-name-section">
            <h3 class="airport-list-name" style="display: flex; align-items: center; gap: 0.5rem;">
              ${ap.name}
              <span class="pinned-badge" style="background: #fff0f0; color: #ff4d4f; font-size: 0.7rem; padding: 1px 6px; border-radius: 4px; border: 1px solid #ffccc7;">置顶推荐</span>
            </h3>
            <span class="airport-list-sub">综合评分: ${(10 - ap.rank*0.1).toFixed(1)} / 10</span>
          </div>
        </div>
        
        <div class="airport-list-middle">
          <div class="airport-list-tags">${tagsMarkup}</div>
          <p class="airport-list-desc">${ap.desc}</p>
        </div>
        
        <div class="airport-list-right">
          <div class="airport-list-price">
            <span class="price-val">￥${ap.price}</span> /月起
          </div>
          <div class="airport-list-actions">
            <a href="posts/${ap.slug}.html" class="list-btn btn-review" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">阅读评测</a>
            <a href="${ap.affLink}" target="_blank" rel="nofollow" class="list-btn btn-go" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">官网注册</a>
          </div>
        </div>
      </div>
    `;
  }).join('\n');

  // 7. Dynamic Category Counts & Widget Markup
  const reviewsCount = articles.filter(art => art.category === '机场评测推荐' && art.slug !== '2026-cheap-airport-recommendation').length;
  const guidesCount = articles.filter(art => art.category === '科学上网指南').length;
  const tutorialsCount = articles.filter(art => art.category === '客户端配置教程').length;

  const categoriesWidgetMarkup = `
    <ul class="category-list">
      <li class="category-item">
        <a href="reviews.html">机场测评 <span class="category-count">${reviewsCount}</span></a>
      </li>
      <li class="category-item">
        <a href="guides.html">科学上网指南 <span class="category-count">${guidesCount}</span></a>
      </li>
      <li class="category-item">
        <a href="software.html">新手指南 <span class="category-count">${tutorialsCount}</span></a>
      </li>
    </ul>
  `;

  const categoriesWidgetMarkupForPosts = `
    <ul class="category-list">
      <li class="category-item">
        <a href="../reviews.html">机场测评 <span class="category-count">${reviewsCount}</span></a>
      </li>
      <li class="category-item">
        <a href="../guides.html">科学上网指南 <span class="category-count">${guidesCount}</span></a>
      </li>
      <li class="category-item">
        <a href="../software.html">新手指南 <span class="category-count">${tutorialsCount}</span></a>
      </li>
    </ul>
  `;

  // 7.1 Dynamic Tag Cloud Widget Markup
  const tagCounts = {};
  articles.forEach(art => {
    art.tags.forEach(t => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  });
  const popularTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]).slice(0, 10);
  const tagCloudMarkup = popularTags.map(tag => {
    return `<a href="javascript:void(0)" class="tag-item" data-tag="${tag}">${tag}</a>`;
  }).join('\n');

  // 7.2 Generate recent blog post cards for homepage (Order: Main Pinned -> 12 Science Guides -> 4 Tutorials)
  const cheapRecommendation = articles.find(art => art.slug === '2026-cheap-airport-recommendation');
  const scienceGuides = articles.filter(art => art.category === '科学上网指南');
  const clientTutorials = articles.filter(art => art.category === '客户端配置教程');
  
  const homeArticles = [
    cheapRecommendation,
    ...scienceGuides,
    ...clientTutorials
  ].filter(Boolean);
  
  const recentArticlesMarkup = homeArticles.map(art => {
    const tagsMarkup = art.tags.map(t => `<span class="feature-tag">${t}</span>`).join('');
    const rawContent = stripHtml(art.content);
    const snippet = rawContent.substring(0, 160) + '...';
    return `
      <article class="article-card">
        <h3 class="article-card-title"><a href="posts/${art.slug}.html">${art.title}</a></h3>
        <div class="article-card-meta">
          <span class="meta-item">📅 ${art.date}</span>
          <span class="meta-item">📁 ${art.category}</span>
        </div>
        <p class="article-card-summary">${snippet}</p>
        <div class="article-card-tags">
          ${tagsMarkup}
        </div>
      </article>
    `;
  }).join('\n');

  // 7.3 Generate review post cards (for reviews.html) (Filter: Keep only 23 separate airport reviews)
  const reviewArticles = articles.filter(art => 
    art.category === '机场评测推荐' && 
    art.slug !== '2026-cheap-airport-recommendation'
  );
  
  const reviewArticlesMarkup = reviewArticles.map(art => {
    const tagsMarkup = art.tags.map(t => `<span class="feature-tag">${t}</span>`).join('');
    const rawContent = stripHtml(art.content);
    const snippet = rawContent.substring(0, 160) + '...';
    return `
      <article class="article-card">
        <h3 class="article-card-title"><a href="posts/${art.slug}.html">${art.title}</a></h3>
        <div class="article-card-meta">
          <span class="meta-item">📅 ${art.date}</span>
          <span class="meta-item">📁 ${art.category}</span>
        </div>
        <p class="article-card-summary">${snippet}</p>
        <div class="article-card-tags">
          ${tagsMarkup}
        </div>
      </article>
    `;
  }).join('\n');

  // 7.4 Generate guide post cards (for guides.html) (Filter: Keep only 12 science guides)
  const guideArticlesMarkup = scienceGuides.map(art => {
    const tagsMarkup = art.tags.map(t => `<span class="feature-tag">${t}</span>`).join('');
    const rawContent = stripHtml(art.content);
    const snippet = rawContent.substring(0, 160) + '...';
    return `
      <article class="article-card">
        <h3 class="article-card-title"><a href="posts/${art.slug}.html">${art.title}</a></h3>
        <div class="article-card-meta">
          <span class="meta-item">📅 ${art.date}</span>
          <span class="meta-item">📁 ${art.category}</span>
        </div>
        <p class="article-card-summary">${snippet}</p>
        <div class="article-card-tags">
          ${tagsMarkup}
        </div>
      </article>
    `;
  }).join('\n');

  // 8. COMPILE HOMEPAGE (index.html)
  const homeTemplatePath = path.join(__dirname, 'src', 'templates', 'homepage.html');
  if (fs.existsSync(homeTemplatePath)) {
    let homeHTML = fs.readFileSync(homeTemplatePath, 'utf-8');
    
    // Perform replacements
    homeHTML = homeHTML.replace(/\{\{pinnedAirportList\}\}/g, pinnedAirportListMarkup);
    homeHTML = homeHTML.replace(/\{\{recentArticles\}\}/g, recentArticlesMarkup);
    homeHTML = homeHTML.replace(/\{\{popularArticles\}\}/g, popularArticlesList);
    homeHTML = homeHTML.replace(/\{\{categoriesWidget\}\}/g, categoriesWidgetMarkup);
    homeHTML = homeHTML.replace(/\{\{tagCloudWidget\}\}/g, tagCloudMarkup);
    homeHTML = homeHTML.replace(/\{\{searchIndex\}\}/g, searchIndexJSON);
    
    homeHTML = homeHTML.replace('</body>', `${seoHiddenBlock}\n</body>`);
    fs.writeFileSync(path.join(__dirname, 'index.html'), homeHTML, 'utf-8');
    console.log("Compiled index.html");
  } else {
    console.error("homepage.html template not found!");
  }

  // 9. COMPILE AIRPORT GRID PAGE (airport.html)
  const gridTemplatePath = path.join(__dirname, 'src', 'templates', 'airport-grid.html');
  if (fs.existsSync(gridTemplatePath)) {
    let gridHTML = fs.readFileSync(gridTemplatePath, 'utf-8');
    
    gridHTML = gridHTML.replace(/\{\{airportList\}\}/g, airportListMarkup);
    gridHTML = gridHTML.replace(/\{\{searchIndex\}\}/g, searchIndexJSON);
    
    gridHTML = gridHTML.replace('</body>', `${seoHiddenBlock}\n</body>`);
    fs.writeFileSync(path.join(__dirname, 'airport.html'), gridHTML, 'utf-8');
    console.log("Compiled airport.html");
  } else {
    console.error("airport-grid.html template not found!");
  }

  // 9.2 COMPILE REVIEWS PAGE (reviews.html)
  const reviewsTemplatePath = path.join(__dirname, 'src', 'templates', 'reviews.html');
  if (fs.existsSync(reviewsTemplatePath)) {
    let reviewsHTML = fs.readFileSync(reviewsTemplatePath, 'utf-8');
    
    reviewsHTML = reviewsHTML.replace(/\{\{reviewArticles\}\}/g, reviewArticlesMarkup);
    reviewsHTML = reviewsHTML.replace(/\{\{popularArticles\}\}/g, popularArticlesList);
    reviewsHTML = reviewsHTML.replace(/\{\{categoriesWidget\}\}/g, categoriesWidgetMarkup);
    reviewsHTML = reviewsHTML.replace(/\{\{tagCloudWidget\}\}/g, tagCloudMarkup);
    reviewsHTML = reviewsHTML.replace(/\{\{searchIndex\}\}/g, searchIndexJSON);
    
    reviewsHTML = reviewsHTML.replace('</body>', `${seoHiddenBlock}\n</body>`);
    fs.writeFileSync(path.join(__dirname, 'reviews.html'), reviewsHTML, 'utf-8');
    console.log("Compiled reviews.html");
  } else {
    console.error("reviews.html template not found!");
  }

  // 9.2.5 COMPILE GUIDES PAGE (guides.html)
  const guidesTemplatePath = path.join(__dirname, 'src', 'templates', 'guides.html');
  if (fs.existsSync(guidesTemplatePath)) {
    let guidesHTML = fs.readFileSync(guidesTemplatePath, 'utf-8');
    
    guidesHTML = guidesHTML.replace(/\{\{guideArticles\}\}/g, guideArticlesMarkup);
    guidesHTML = guidesHTML.replace(/\{\{popularArticles\}\}/g, popularArticlesList);
    guidesHTML = guidesHTML.replace(/\{\{categoriesWidget\}\}/g, categoriesWidgetMarkup);
    guidesHTML = guidesHTML.replace(/\{\{tagCloudWidget\}\}/g, tagCloudMarkup);
    guidesHTML = guidesHTML.replace(/\{\{searchIndex\}\}/g, searchIndexJSON);
    
    guidesHTML = guidesHTML.replace('</body>', `${seoHiddenBlock}\n</body>`);
    fs.writeFileSync(path.join(__dirname, 'guides.html'), guidesHTML, 'utf-8');
    console.log("Compiled guides.html");
  } else {
    console.error("guides.html template not found!");
  }

  // 9.3 COMPILE SOFTWARE PAGE (software.html)
  const softwareTemplatePath = path.join(__dirname, 'src', 'templates', 'software.html');
  if (fs.existsSync(softwareTemplatePath)) {
    let softwareHTML = fs.readFileSync(softwareTemplatePath, 'utf-8');
    
    softwareHTML = softwareHTML.replace(/\{\{searchIndex\}\}/g, searchIndexJSON);
    
    softwareHTML = softwareHTML.replace('</body>', `${seoHiddenBlock}\n</body>`);
    fs.writeFileSync(path.join(__dirname, 'software.html'), softwareHTML, 'utf-8');
    console.log("Compiled software.html");
  } else {
    console.error("software.html template not found!");
  }

  // 10. COMPILE INDIVIDUAL POSTS (posts/*.html)
  const articleTemplatePath = path.join(__dirname, 'src', 'templates', 'article.html');
  if (fs.existsSync(articleTemplatePath)) {
    const articleTemplate = fs.readFileSync(articleTemplatePath, 'utf-8');
    
    // Construct local search index adjusting URL path relative to posts directory
    const localSearchIndexJSON = JSON.stringify(articles.map(art => {
      const rawContent = stripHtml(art.content);
      return {
        title: art.title,
        summary: rawContent.substring(0, 120),
        url: `../posts/${art.slug}.html`,
        tags: art.tags
      };
    }));

    articles.forEach(art => {
      let postHTML = articleTemplate;
      
      // First, replace tags in the article content itself (like comparison table and cards grid)
      let finalContent = art.content;
      finalContent = finalContent.replace(/\{\{compareTableRows\}\}/g, compareTableRowsMarkupForPosts);
      finalContent = finalContent.replace(/\{\{airportCards\}\}/g, airportCardsMarkupForPosts);
      
      const tocMarkup = generateTOC(finalContent);
      const tagBadgesMarkup = art.tags.map(t => `<span class="feature-tag">${t}</span>`).join('');
      
      // Breadcrumbs category link destination
      let categoryLink = 'reviews.html';
      if (art.category === '科学上网指南') {
        categoryLink = 'guides.html';
      } else if (art.category === '客户端配置教程') {
        categoryLink = 'software.html';
      }
      
      postHTML = postHTML.replace(/\{\{title\}\}/g, art.title);
      postHTML = postHTML.replace(/\{\{description\}\}/g, art.description);
      postHTML = postHTML.replace(/\{\{keywords\}\}/g, art.keywords);
      postHTML = postHTML.replace(/\{\{date\}\}/g, art.date);
      postHTML = postHTML.replace(/\{\{category\}\}/g, art.category);
      postHTML = postHTML.replace(/\{\{categoryLink\}\}/g, categoryLink);
      postHTML = postHTML.replace(/\{\{toc\}\}/g, tocMarkup);
      postHTML = postHTML.replace(/\{\{content\}\}/g, finalContent);
      postHTML = postHTML.replace(/\{\{tagBadges\}\}/g, tagBadgesMarkup);
      postHTML = postHTML.replace(/\{\{popularArticles\}\}/g, popularArticlesListForPosts);
      postHTML = postHTML.replace(/\{\{categoriesWidget\}\}/g, categoriesWidgetMarkupForPosts);
      postHTML = postHTML.replace(/\{\{tagCloudWidget\}\}/g, tagCloudMarkup);
      postHTML = postHTML.replace(/\{\{searchIndex\}\}/g, localSearchIndexJSON);
      
      // rootPath inside subfolder posts/ is '../'
      postHTML = postHTML.replace(/\{\{rootPath\}\}/g, '../');
      
      postHTML = postHTML.replace('</body>', `${seoHiddenBlock}\n</body>`);
      fs.writeFileSync(path.join(__dirname, 'posts', `${art.slug}.html`), postHTML, 'utf-8');
      console.log(`Compiled post: ${art.slug}.html`);
    });
  } else {
    console.error("article.html template not found!");
  }

  // 11. GENERATE SITEMAP.XML & ROBOTS.TXT
  generateSitemapAndRobots();

  console.log("Static site build completed successfully!");
}

// Helper to format ISO date to YYYY-MM-DD for sitemap
function formatSitemapDate(dateStr) {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toISOString().split('T')[0];
    }
  } catch (e) {}
  return new Date().toISOString().split('T')[0];
}

// Sitemap and Robots.txt Generator
function generateSitemapAndRobots() {
  console.log("Generating sitemap.xml and robots.txt...");
  const baseUrl = 'https://vpns-top.com';
  
  // 1. Generate Sitemap XML
  let sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapXML += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  const todayStr = new Date().toISOString().split('T')[0];
  
  // Core pages
  const corePages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/airport.html', priority: '0.9', changefreq: 'daily' },
    { url: '/reviews.html', priority: '0.9', changefreq: 'daily' },
    { url: '/guides.html', priority: '0.9', changefreq: 'daily' },
    { url: '/software.html', priority: '0.8', changefreq: 'weekly' }
  ];
  
  corePages.forEach(p => {
    sitemapXML += `  <url>\n`;
    sitemapXML += `    <loc>${baseUrl}${p.url}</loc>\n`;
    sitemapXML += `    <lastmod>${todayStr}</lastmod>\n`;
    sitemapXML += `    <changefreq>${p.changefreq}</changefreq>\n`;
    sitemapXML += `    <priority>${p.priority}</priority>\n`;
    sitemapXML += `  </url>\n`;
  });
  
  // Articles
  articles.forEach(art => {
    const lastMod = formatSitemapDate(art.date);
    sitemapXML += `  <url>\n`;
    sitemapXML += `    <loc>${baseUrl}/posts/${art.slug}.html</loc>\n`;
    sitemapXML += `    <lastmod>${lastMod}</lastmod>\n`;
    sitemapXML += `    <changefreq>monthly</changefreq>\n`;
    sitemapXML += `    <priority>0.8</priority>\n`;
    sitemapXML += `  </url>\n`;
  });
  
  sitemapXML += `</urlset>\n`;
  
  // Write sitemap.xml
  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXML, 'utf-8');
  console.log("Generated sitemap.xml successfully!");
  
  // 2. Generate robots.txt
  const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
  fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsTxt, 'utf-8');
  console.log("Generated robots.txt successfully!");
}

build();
