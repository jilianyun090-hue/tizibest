const fs = require('fs');
const path = require('path');
const https = require('https');
const articles = require('./src/data/articles.js');
const articleGenerator = require('./src/data/articleGenerator.js');

// Pad description to meet search engine recommended length (150-160 characters)
function padDescription(desc) {
  if (!desc) return '';
  const targetMin = 150;
  const targetMax = 156;
  if (desc.length >= targetMin && desc.length <= targetMax) {
    return desc;
  }
  if (desc.length > targetMax) {
    return desc.substring(0, targetMax - 3) + '...';
  }
  const paddingSource = "稳定机场推荐网致力于为广大网络出海、外贸办公及学术科研用户提供客观中立的翻墙机场测评与Clash/小火箭等客户端配置指南，助您畅快安全连接全球网络。";
  let needed = 152 - desc.length;
  if (needed > 0) {
    let suffix = " " + paddingSource.substring(0, needed - 1);
    if (suffix.length < needed) {
      suffix = suffix.padEnd(needed, '.');
    }
    return desc + suffix;
  }
  return desc;
}

// Airport metadata for grid cards and comparison table
const airports = [
  {
    name: "极连云",
    price: "8.00",
    slug: "jilianyun-review",
    features: ["IEPL专线", "不限速", "不限设备数", "支持不限时"],
    desc: "在2026年稳定机场推荐中位居前列的IEPL专线高速机场。完美支持Clash/Shadowrocket订阅，解锁流媒体与ChatGPT/Claude，是绝佳的AI专用机场与不限设备翻墙梯子。",
    affLink: "https://haozevpn.jlyvipaff.com/#/?code=KUKfOY13",
    rank: 3,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/jilianyun",
    logo: "https://i.ibb.co/5XvXTMxR/photo-2025-12-14-16-40-25.jpg"
  },
  {
    name: "瞬云机场",
    price: "8.25",
    slug: "shunyun-review",
    features: ["Anycast直连", "1倍率无虚标", "大带宽", "支持不限时"],
    desc: "全站一倍率无虚标的高性价比机场。作为便宜机场推荐首选，提供Anycast高速直连节点与不限时流量包，畅享4K视频与Netflix/YouTube解锁，堪称年度最好用机场 and 高稳定性科学上网梯子。",
    affLink: "https://ccc.jichang.best/#/register?code=o4I4kToe",
    rank: 1,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/shunyun",
    logo: "https://i.ibb.co/DHLgNf1d/Gemini-Generated-Image-7oufv07oufv07ouf-1.png"
  },
  {
    name: "寰宇云",
    price: "7.40",
    slug: "huanyuyun-review",
    features: ["BGP多线中转", "支持不限时", "按量付费", "高性价比"],
    desc: "高性价比的便宜按量付费中转机场。BGP多线接入，是完美的防跑路备用梯子推荐。支持多种主流订阅格式，日常科学上网与AI工具网络解决方案的高性价比选择。",
    affLink: "https://vip3.huanyuyunbest.com/#/register?code=K6h5VWw2",
    rank: 2,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/huanyuyun",
    logo: "https://i.ibb.co/wrhvStSP/Gemini-Generated-Image-8su9c18su9c18su9-1.png"
  },
  {
    name: "锦云",
    price: "6.00",
    slug: "jinyun-review",
    features: ["中转加速", "不限速", "多设备支持", "流媒体解锁"],
    desc: "提供超高性价比的中转/专线高速机场，低至6元起。全站不限速，目前最高支持同时在线10台设备，完美解锁Netflix/Disney+等主流流媒体与ChatGPT/Claude等AI服务，是高性价比网络加速和科学上网的极佳翻墙梯子。",
    affLink: "https://w2.whengdl.com/#/register?code=BIGc8qrQ",
    rank: 4,
    noLimit: false,
    hasTrial: false,
    tgGroup: ""
  },
  {
    name: "光年梯",
    price: "7.50",
    slug: "guangnianti-review",
    features: ["老牌机场", "IEPL物理专线", "不限速", "不限时套餐"],
    desc: "深耕行业多年的老牌物理专线机场。以极高的容灾稳定性著称，作为稳定机场推荐常客，提供不限速、不限时的抗封锁Shadowsocks/Trojan协议节点，堪称大流量科学上网的良心梯子推荐。",
    affLink: "https://gnt001.gntvipaff.cc/#/?code=j1ufpE44",
    rank: 5,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/guangnianti",
    logo: "https://i.ibb.co/Gv8rp8rk/photo-2026-04-15-13-24-38.jpg"
  },
  {
    name: "极速云机场",
    price: "8.25",
    slug: "jisuyun-review",
    features: ["中转加速", "大带宽", "不限时套餐", "多平台兼容"],
    desc: "采用高隐蔽性中转技术的性价比机场。提供极低起步价格，支持多协议订阅与一键节点配置，适合流媒体解锁与游戏加速，是超低预算下的新手机场推荐选择。",
    affLink: "https://tg.sintotgch.com/#/register?code=RENHYxqv",
    rank: 6,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/jisuyun",
    logo: "https://i.ibb.co/qF3fTyK4/jisu-LOGO.png"
  },
  {
    name: "山水云",
    price: "14.99",
    slug: "shanshuiyun-review",
    features: ["隧道中转", "流媒体解锁", "按量付费", "设备无限制"],
    desc: "主打高速隧道中转与不限设备的稳定机场。支持V2Ray和Trojan多协议，提供干净的原生海外节点，完美解锁Netflix/Disney+与大模型风控，是极佳的解锁流媒体机场。",
    affLink: "https://ss2.byvvcsx.com/#/register?code=jkziWeb8",
    rank: 7,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/ssy5999",
    logo: "https://i.ibb.co/LD8J8vN2/image.jpg"
  },
  {
    name: "影子VPN",
    price: "18.80",
    slug: "yingzi-review",
    features: ["IEPL跨境专线", "流媒体解锁", "ChatGPT解锁", "全线不限速"],
    desc: "采用全高速IEPL跨境专线的高端高稳定性机场，月付18.80元起。全节点网络不过公网、低延迟，完美解锁Netflix、Disney+、TikTok及ChatGPT等主流出海应用，抗封锁能力优异，高峰期连接稳定不拥堵。",
    affLink: "https://www.yingzi01.com/register?code=X7XPN1cS",
    rank: 8,
    noLimit: false,
    hasTrial: false,
    tgGroup: ""
  },
  {
    name: "秒秒云",
    price: "14.00",
    slug: "miaomiaoyun-review",
    features: ["高速中转", "原生IP多", "住宅IP解锁", "不限时"],
    desc: "专注于原生IP与住宅IP解锁的高速机场。专为ChatGPT机场与Claude机场使用场景进行节点风控调优，是AI大模型开发者 and 学术科研的首选AI专用机场。",
    affLink: "https://mdl3.mxjcbg.com/#/register?code=g3bq7bpK",
    rank: 9,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/mmy7777",
    logo: "https://i.ibb.co/Jk74kH3R/miaomiao.png"
  },
  {
    name: "迅达VPN",
    price: "15.00",
    slug: "xundavpn-review",
    features: ["直连公网", "大带宽", "老牌稳定", "多协议支持"],
    desc: "采用多协议抗封锁技术的直连公网翻墙机场。提供千兆大带宽，适合超清4K视频下载与游戏加速，是一款大流量重度网民首选的高速机场与VPN替代方案。",
    affLink: "https://sulianproxy.com/register?code=lfITU4zy",
    rank: 10,
    noLimit: false,
    hasTrial: false,
    tgGroup: "",
    logo: "https://i.ibb.co/Sw0nyMS8/image.jpg"
  },
  {
    name: "Edge-X机场",
    price: "16.80",
    slug: "edgex-review",
    features: ["IPLC专线", "低延迟", "不限设备数", "大流量支持"],
    desc: "全线搭载IPLC低延迟跨境专线的高端高速机场。全节点无虚标，不设设备数上限，晚高峰无卡顿，适合4K/8K视频与流媒体解锁，是一款品质极佳的物理专线梯子推荐。",
    affLink: "https://edge-invite.com/#/register?code=73ienU2h",
    rank: 11,
    noLimit: true,
    hasTrial: false,
    tgGroup: "",
    logo: "https://i.ibb.co/F4VvFN55/edge.jpg"
  },
  {
    name: "边界云",
    price: "15.00",
    slug: "bianjieyun-review",
    features: ["IEPL专线", "50+全球节点", "3天退款保障"],
    desc: "提供IEPL企业物理专线的高端高速机场。支持Trojan/V2Ray等协议，支持最高500Mbps速率，解锁流媒体与ChatGPT/Claude，是追求极致稳定连接的高端翻墙梯子。",
    affLink: "https://www.lvpn.cc/r/6UQDZT",
    rank: 12,
    noLimit: false,
    hasTrial: false,
    tgGroup: "",
    logo: "https://i.ibb.co/RpffcYng/image.jpg"
  },
  {
    name: "可达加速度",
    price: "10.00",
    slug: "kedajiasudu-review",
    features: ["混合专线", "价格实惠", "多线负载", "节点丰富"],
    desc: "基于专线多负载均衡架构的性价比机场。套餐价格极低，提供丰富且抗封锁的Shadowsocks/V2Ray海外节点，是极具竞争力的便宜机场推荐 and 备用翻墙梯子。",
    affLink: "https://1.mkd997.com/?page=register&code=5KnBzRqS",
    rank: 13,
    noLimit: false,
    hasTrial: false,
    tgGroup: "",
    logo: "https://i.ibb.co/DBnJmbc/image.jpg"
  },
  {
    name: "奈云",
    price: "10.60",
    slug: "naiyun-review",
    features: ["跨境专线", "AI/Netflix解锁", "全客户端支持", "不限时"],
    desc: "提供全套定制客户端与一键节点导入的新手机场推荐。支持不限时按量付费，解锁流媒体与AI，是操作极其简单、适合小白用户的稳定机场。",
    affLink: "https://jichang-go.org/go.php",
    rank: 14,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/naiyun",
    logo: "https://i.ibb.co/RTB2cqwW/image.png"
  },
  {
    name: "隐云",
    price: "25.00",
    slug: "yinyun-review",
    features: ["中转专线", "高隐蔽性", "高安全性", "防封锁协议"],
    desc: "主打自研高隐蔽性协议与加密中转的高速机场。抗封锁表现出色，在敏感期依然能保证稳定连接，是外贸与跨境开发首选的安全科学上网梯子。",
    affLink: "https://jichang-go.org/go.php",
    rank: 15,
    noLimit: false,
    hasTrial: false,
    tgGroup: "",
    logo: "https://i.ibb.co/FCC7ptp/logo.webp"
  },
  {
    name: "山海机场",
    price: "6.00",
    slug: "shanhai-review",
    features: ["极致低价", "不限时套餐", "包年特惠", "中转加速"],
    desc: "极致性价比的便宜机场推荐。月付仅需几元，提供大带宽下载与中转线路，支持不限时包年特惠，是完美的低预算主用或科学上网备用梯子。",
    affLink: "https://shanhai.sbs/#/register?code=qVTbPfWP",
    rank: 16,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/shanhai",
    logo: "https://i.ibb.co/BHQ5pNFZ/image.png"
  },
  {
    name: "LiZione",
    price: "10.00",
    slug: "lizione-review",
    features: ["Shadowsocks", "BGP中转", "多端支持", "原生解锁"],
    desc: "提供纯净原生IP的专业Shadowsocks机场。节点速度快，风控低，能完美解锁ChatGPT/Claude与流媒体，是极客开发专属的稳定高速机场。",
    affLink: "https://lizione.vip/#/register?code=Wmf3jYMy",
    rank: 17,
    noLimit: false,
    hasTrial: false,
    tgGroup: "https://t.me/lizione",
    logo: "https://i.ibb.co/PGkmP1rg/lizione.jpg"
  },
  {
    name: "光速云",
    price: "8.25",
    slug: "guangshuyun-review",
    features: ["BGP+IEPL", "不限时套餐", "1倍率无虚耗", "全节点解锁"],
    desc: "采用BGP中转与IEPL专线混合架构的性价比机场。大流量不限时套餐，晚高峰网络极速，适合超清视频解锁与日常网络加速。",
    affLink: "https://kjlq01.gsyvipaff.cc/#/?code=b1OTkTeL",
    rank: 18,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/guangshuyun",
    logo: "https://i.ibb.co/FkYmVdyN/logo.jpg"
  },
  {
    name: "全球云",
    price: "20.00",
    slug: "quanqiuyun-review",
    features: ["智能调度", "8K秒开", "流媒体优化", "不限时"],
    desc: "专为4K/8K解锁流媒体机场进行深度优化的稳定机场。按量付费不限时，晚高峰下载速度极快，是重度观影党必备的高速机场。",
    affLink: "https://haozevpn.gcvipaff.cc/#/?code=WRQJc2v4",
    rank: 19,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/quanqiuyun",
    logo: "https://i.ibb.co/4Zzh2Qk6/image.png"
  },
  {
    name: "星岛梦",
    price: "16.00",
    slug: "xingdaomeng-review",
    features: ["IEPL物理专线", "不限设备", "Trojan防封锁", "不限时"],
    desc: "全线采用防封锁Trojan协议的物理专线稳定机场。支持无限设备在线，物理跨境专线直连，晚高峰大带宽，是一款抗干扰性极强的翻墙梯子。",
    affLink: "https://wuyou202001.xdmvipaff.cc/#/?code=olWCiAhj",
    rank: 20,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/xingdaomeng"
  },
  {
    name: "哆啦A梦",
    price: "10.00",
    slug: "doraemon-review",
    features: ["三网IEPL", "千兆大带宽", "原生IP解锁", "支持不限时"],
    desc: "搭载三网IEPL专线与千兆带宽的顶级高速机场。节点提供纯净原生IP解锁，完美绕过ChatGPT与Netflix锁区，适合AI办公与流媒体观影。",
    affLink: "https://store.yyds2-doraemon.site/login/register?invite_code=5VxQMw0k",
    rank: 21,
    noLimit: true,
    hasTrial: false,
    tgGroup: ""
  },
  {
    name: "大哥云",
    price: "19.90",
    slug: "dageyun-review",
    features: ["自研客户端", "有免费试用", "多节点覆盖", "一键连接"],
    desc: "提供自研客户端与免费试用额度的新手机场推荐。无需复杂设置，一键导入节点即可实现科学上网，是小白出海首选的翻墙梯子。",
    affLink: "https://jichang-go.org/go.php",
    rank: 22,
    noLimit: false,
    hasTrial: true,
    tgGroup: "https://t.me/dageyun"
  },
  {
    name: "龙猫云",
    price: "15.00",
    slug: "longmaoyun-review",
    features: ["Shadowsocks", "专线中转", "多端自适应", "安全稳定"],
    desc: "基于高端加密中转与原生Shadowsocks协议的稳定机场。安全性高，IP纯净度强，完美保护出海隐私并降低风控。",
    affLink: "https://jichang-go.org/go.php",
    rank: 23,
    noLimit: false,
    hasTrial: false,
    tgGroup: "https://t.me/longmaoyun"
  },
  {
    name: "飞鸟机场",
    price: "15.00",
    slug: "feiniaojichang-review",
    features: ["BGP多线中转", "支持不限时", "高速平稳", "全节点解锁"],
    desc: "采用国内多线BGP入口接入的高速机场。响应时间极短，不限时大流量套餐性价比极高，推荐作为日常娱乐与备用节点。",
    affLink: "https://jichang-go.org/go.php",
    rank: 24,
    noLimit: true,
    hasTrial: false,
    tgGroup: "https://t.me/feiniaojichang"
  },
  {
    name: "青云梯",
    price: "8.00",
    slug: "qingyunti-review",
    features: ["隧道中转", "支持不限时", "大带宽秒开", "性价比高"],
    desc: "采用多入口加密隧道中转的便宜机场推荐。支持按量不限时，网页与超清视频秒开，是极致性价比的科学上网梯子。",
    affLink: "https://jichang-go.org/go.php",
    rank: 25,
    noLimit: true,
    hasTrial: false,
    tgGroup: ""
  },
  {
    name: "花云",
    price: "10.60",
    slug: "huayun-review",
    features: ["跨境物理专线", "高防中转", "稳定老厂", "多平台优化"],
    desc: "业内知名度极高的高端老牌IEPL专线机场。提供全物理专线直连与多协议混合订阅，晚高峰零延迟、零卡顿，是高稳定性要求的商务首选。",
    affLink: "https://jichang-go.org/go.php",
    rank: 26,
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

  // 1. Create target directories (Clean 'posts' directory first)
  const postsDir = path.join(__dirname, 'posts');
  if (fs.existsSync(postsDir)) {
    fs.rmSync(postsDir, { recursive: true, force: true });
  }
  ensureDirSync(postsDir);
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
    const avatarHTML = ap.logo 
      ? `<div class="airport-avatar" style="padding:0;overflow:hidden;background:transparent;"><img src="${ap.logo}" alt="${ap.name} Logo" style="width:100%;height:100%;object-fit:cover;border-radius:10px;" loading="lazy"></div>`
      : `<div class="airport-avatar">${ap.name[0]}</div>`;
    return `
      <div class="airport-card">
        <div class="airport-card-header">
          ${avatarHTML}
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
          <div style="display: flex; gap: 0.5rem; flex-shrink: 0;">
            <a href="posts/${ap.slug}.html" class="airport-btn" style="background-color: var(--badge-bg); color: var(--text-secondary);">评测</a>
            <a href="${ap.affLink}" target="_blank" rel="nofollow" class="airport-btn">官网注册</a>
          </div>
        </div>
      </div>
    `;
  }).join('\n');

  // Adjusted cards markup for posts (pointing to sibling htmls)
  const airportCardsMarkupForPosts = airports.map(ap => {
    const tagsMarkup = ap.features.map(f => `<span class="feature-tag">${f}</span>`).join('');
    const avatarHTML = ap.logo 
      ? `<div class="airport-avatar" style="padding:0;overflow:hidden;background:transparent;"><img src="${ap.logo}" alt="${ap.name} Logo" style="width:100%;height:100%;object-fit:cover;border-radius:10px;" loading="lazy"></div>`
      : `<div class="airport-avatar">${ap.name[0]}</div>`;
    return `
      <div class="airport-card">
        <div class="airport-card-header">
          ${avatarHTML}
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
          <div style="display: flex; gap: 0.5rem; flex-shrink: 0;">
            <a href="${ap.slug}.html" class="airport-btn" style="background-color: var(--badge-bg); color: var(--text-secondary);">评测</a>
            <a href="${ap.affLink}" target="_blank" rel="nofollow" class="airport-btn">官网注册</a>
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

    const avatarHTML = ap.logo 
      ? `<div class="airport-list-avatar" style="padding:0;overflow:hidden;background:transparent;"><img src="${ap.logo}" alt="${ap.name} Logo" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" loading="lazy"></div>`
      : `<div class="airport-list-avatar">${ap.name[0]}</div>`;

    return `
      <div class="airport-list-item" id="${ap.slug}">
        <div class="airport-list-left">
          <div class="airport-list-rank">${rankBadge}</div>
          ${avatarHTML}
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

  // 6.3 Generate pinned airport list (Ermao style, top 3)
  const pinnedAirports = sortedAirports.slice(0, 3);
  const pinnedAirportListMarkup = pinnedAirports.map(ap => {
    const tagsMarkup = ap.features.slice(0, 3).map(f => `<span class="feature-tag">${f}</span>`).join('');
    let rankBadge = `Top ${ap.rank}`;
    if (ap.rank === 1) rankBadge = `🥇 Top 1`;
    else if (ap.rank === 2) rankBadge = `🥈 Top 2`;
    else if (ap.rank === 3) rankBadge = `🥉 Top 3`;

    const avatarHTML = ap.logo 
      ? `<div class="airport-avatar" style="padding:0;overflow:hidden;background:transparent;"><img src="${ap.logo}" alt="${ap.name} Logo" style="width:100%;height:100%;object-fit:cover;border-radius:10px;" loading="lazy"></div>`
      : `<div class="airport-avatar" style="background: var(--accent); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: 700; border-radius: 10px;">${ap.name[0]}</div>`;

    return `
      <div class="airport-card pinned-card">
        <div class="airport-card-header">
          ${avatarHTML}
          <div class="airport-meta-info">
            <h3 class="airport-name" style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              ${ap.name}
              <span class="pinned-badge" style="background: #fff0f0; color: #ff4d4f; font-size: 0.7rem; padding: 1px 6px; border-radius: 4px; border: 1px solid #ffccc7; font-weight: normal;">置顶推荐</span>
            </h3>
            <span class="airport-card-badge badge-recom" style="display: flex; align-items: center; gap: 0.35rem;">
              ${rankBadge} &nbsp;|&nbsp; 评分: ${(10 - ap.rank*0.1).toFixed(1)}
            </span>
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
          <div style="display: flex; gap: 0.5rem; flex-shrink: 0;">
            <a href="posts/${ap.slug}.html" class="airport-btn" style="background-color: var(--badge-bg); color: var(--text-secondary);">评测</a>
            <a href="${ap.affLink}" target="_blank" rel="nofollow" class="airport-btn">官网注册</a>
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

  // --- SEO & INTERNAL LINKING HELPERS ---
  const getSeoTags = (title, description, pageSlug) => {
    const canonicalUrl = `https://vpns-top.com/${pageSlug}`;
    return `
  <meta name="geo.region" content="CN" />
  <meta name="geo.placename" content="China" />
  <meta name="language" content="zh-CN" />
  <meta name="revisit-after" content="3 days" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="稳定机场推荐 - vpns-top.com" />
  <meta property="og:locale" content="zh_CN" />
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta name="twitter:card" content="summary_large_image" />
    `;
  };

  const getPostSeoTags = (title, description, slug) => {
    const canonicalUrl = `https://vpns-top.com/posts/${slug}.html`;
    return `
  <meta name="geo.region" content="CN" />
  <meta name="geo.placename" content="China" />
  <meta name="language" content="zh-CN" />
  <meta name="revisit-after" content="3 days" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="稳定机场推荐 - vpns-top.com" />
  <meta property="og:locale" content="zh_CN" />
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta name="twitter:card" content="summary_large_image" />
    `;
  };

  const sidebarLadderRecs = `
    <div class="widget rec-widget">
      <h3 class="widget-title">科学上网稳定梯子推荐</h3>
      <div class="ladder-rec-sidebar" style="display: flex; flex-direction: column; gap: 0.75rem;">
        <a href="{{rootPath}}posts/shunyun-review.html" class="rec-sidebar-item" style="display: block; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-secondary); text-decoration: none; transition: var(--transition);">
          <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary); margin-bottom: 0.25rem;">🥇 瞬云 — 无倍率稳定梯子</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary);">全站一倍率，Anycast直连专线</div>
        </a>
        <a href="{{rootPath}}posts/huanyuyun-review.html" class="rec-sidebar-item" style="display: block; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-secondary); text-decoration: none; transition: var(--transition);">
          <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary); margin-bottom: 0.25rem;">🥈 寰宇云 — 便宜按量付费梯子</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary);">BGP中转，性价比出海备份首选</div>
        </a>
        <a href="{{rootPath}}posts/jilianyun-review.html" class="rec-sidebar-item" style="display: block; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-secondary); text-decoration: none; transition: var(--transition);">
          <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary); margin-bottom: 0.25rem;">🥉 极连云 — IEPL专线稳定梯子</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary);">IEPL企业专线，不限连接设备数</div>
        </a>
        <a href="{{rootPath}}posts/jinyun-review.html" class="rec-sidebar-item" style="display: block; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-secondary); text-decoration: none; transition: var(--transition);">
          <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary); margin-bottom: 0.25rem;">✨ 锦云 — 高性价比不限速梯子</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary);">月付低至6元起，多设备流媒体解锁</div>
        </a>
      </div>
    </div>
  `;

  const postLadderRecs = `
<section class="ladder-recommendation-block" style="margin-top: 2.5rem; padding: 1.5rem; border: 1.5px dashed var(--accent); border-radius: 12px; background-color: var(--accent-light);">
  <h3 style="margin-top: 0; color: var(--accent); font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-heading);">
    🚀 2026年科学上网稳定翻墙梯子推荐
  </h3>
  <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.6;">
    如果您正在寻找速度快、连接稳定、且不易跑路的高速机场，以下是本站长期测试后精心筛选的几款<strong>2026年最值得选择的稳定翻墙梯子推荐</strong>。支持Clash、Shadowrocket等主流客户端，适合日常出海开发、学术科研及流媒体解锁：
  </p>
  <div class="ladder-rec-grid" style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
    <!-- 瞬云 -->
    <div class="ladder-rec-item" style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; border: 1px solid var(--border); transition: transform 0.2s;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem; display: flex; align-items: center; justify-content: space-between; font-family: var(--font-heading);">
        <a href="{{rootPath}}posts/shunyun-review.html" style="font-weight: 700; color: var(--text-primary);">🥇 瞬云机场 — 无倍率性价比高速直连梯子</a>
        <span style="font-size: 0.8rem; background: var(--success-bg); color: var(--success-text); padding: 2px 6px; border-radius: 4px; font-weight: normal;">强烈推荐</span>
      </h4>
      <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
        提供超多优质<strong>Anycast直连专线</strong>，无虚标倍率，高性价比不限时流量包。节点速度极佳，晚高峰4K秒开。适合日常娱乐与出海学习。<a href="{{rootPath}}posts/shunyun-review.html" style="color: var(--accent); text-decoration: underline; margin-left: 5px;">查看瞬云测评 ↗</a>
      </p>
    </div>
    <!-- 极连云 -->
    <div class="ladder-rec-item" style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; border: 1px solid var(--border); transition: transform 0.2s;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem; display: flex; align-items: center; justify-content: space-between; font-family: var(--font-heading);">
        <a href="{{rootPath}}posts/jilianyun-review.html" style="font-weight: 700; color: var(--text-primary);">🥈 极连云 — IEPL专线不限设备稳定出海梯子</a>
        <span style="font-size: 0.8rem; background: var(--accent-light); color: var(--accent-text); padding: 2px 6px; border-radius: 4px; font-weight: normal;">不限设备</span>
      </h4>
      <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
        采用<strong>IEPL物理专线</strong>加速，不限制设备连接数量，专为ChatGPT、Claude及流媒体（Netflix/Disney+）进行原生IP解锁。晚高峰延迟极低，翻墙首选。<a href="{{rootPath}}posts/jilianyun-review.html" style="color: var(--accent); text-decoration: underline; margin-left: 5px;">查看极连云测评 ↗</a>
      </p>
    </div>
    <!-- 寰宇云 -->
    <div class="ladder-rec-item" style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; border: 1px solid var(--border); transition: transform 0.2s;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem; display: flex; align-items: center; justify-content: space-between; font-family: var(--font-heading);">
        <a href="{{rootPath}}posts/huanyuyun-review.html" style="font-weight: 700; color: var(--text-primary);">🥉 寰宇云 — 便宜按量付费高性价比备用梯子</a>
        <span style="font-size: 0.8rem; background: var(--badge-bg); color: var(--badge-text); padding: 2px 6px; border-radius: 4px; font-weight: normal;">备用推荐</span>
      </h4>
      <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
        主打低门槛与按量付费，年付89元起。提供优质<strong>BGP中转加速网络</strong>，性价比极其突出，非常适合轻度科学上网用户或作为常备的防跑路防断连备用梯子。<a href="{{rootPath}}posts/huanyuyun-review.html" style="color: var(--accent); text-decoration: underline; margin-left: 5px;">查看寰宇云测评 ↗</a>
      </p>
    </div>
    <!-- 锦云 -->
    <div class="ladder-rec-item" style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; border: 1px solid var(--border); transition: transform 0.2s;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem; display: flex; align-items: center; justify-content: space-between; font-family: var(--font-heading);">
        <a href="{{rootPath}}posts/jinyun-review.html" style="font-weight: 700; color: var(--text-primary);">✨ 锦云机场 — 月付6元起高性价比不限速中转专线</a>
        <span style="font-size: 0.8rem; background: var(--success-bg); color: var(--success-text); padding: 2px 6px; border-radius: 4px; font-weight: normal;">超低月付</span>
      </h4>
      <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
        高性价比的便宜中转/专线高速机场，月付低至6元起。全站不限速，最高支持在线10台设备，原生流媒体IP与ChatGPT/Claude完美解锁，是日常出海学习的最佳性价比梯子推荐。<a href="{{rootPath}}posts/jinyun-review.html" style="color: var(--accent); text-decoration: underline; margin-left: 5px;">查看锦云测评 ↗</a>
      </p>
    </div>
  </div>
</section>
  `;

  // 8. COMPILE HOMEPAGE (index.html)
  const homeTemplatePath = path.join(__dirname, 'src', 'templates', 'homepage.html');
  if (fs.existsSync(homeTemplatePath)) {
    let homeHTML = fs.readFileSync(homeTemplatePath, 'utf-8');
    
    // Extract title & description for SEO
    const titleMatch = homeHTML.match(/<title>([\s\S]+?)<\/title>/i);
    const descMatch = homeHTML.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]+?)["']/i);
    const pageTitle = titleMatch ? titleMatch[1] : '稳定机场推荐';
    const pageDesc = descMatch ? padDescription(descMatch[1]) : '';
    const seoTags = getSeoTags(pageTitle, pageDesc, '');
    
    // Perform replacements
    homeHTML = homeHTML.replace(/\{\{pinnedAirportList\}\}/g, pinnedAirportListMarkup);
    homeHTML = homeHTML.replace(/\{\{recentArticles\}\}/g, recentArticlesMarkup);
    homeHTML = homeHTML.replace(/\{\{popularArticles\}\}/g, popularArticlesList);
    homeHTML = homeHTML.replace(/\{\{categoriesWidget\}\}/g, categoriesWidgetMarkup);
    homeHTML = homeHTML.replace(/\{\{tagCloudWidget\}\}/g, tagCloudMarkup);
    homeHTML = homeHTML.replace(/\{\{searchIndex\}\}/g, searchIndexJSON);
    homeHTML = homeHTML.replace(/\{\{seoTags\}\}/g, seoTags);
    homeHTML = homeHTML.replace(/\{\{sidebarLadderRecs\}\}/g, sidebarLadderRecs.replace(/\{\{rootPath\}\}/g, ''));
    
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
    
    // Extract title & description for SEO
    const titleMatch = gridHTML.match(/<title>([\s\S]+?)<\/title>/i);
    const descMatch = gridHTML.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]+?)["']/i);
    const pageTitle = titleMatch ? titleMatch[1] : '2026年机场评测推荐列表';
    const pageDesc = descMatch ? padDescription(descMatch[1]) : '';
    const seoTags = getSeoTags(pageTitle, pageDesc, 'airport.html');
    
    // Generate Table of Contents for the airport recommendations list
    const airportTocListMarkup = sortedAirports.map(ap => {
      return `
        <a href="#${ap.slug}" class="toc-link">
          <span class="toc-rank">${ap.rank}</span>
          <span class="toc-name">${ap.name}</span>
          <span class="toc-price">￥${ap.price}/月</span>
        </a>
      `;
    }).join('\n');
    
    gridHTML = gridHTML.replace(/\{\{airportList\}\}/g, airportListMarkup);
    gridHTML = gridHTML.replace(/\{\{airportTocList\}\}/g, airportTocListMarkup);
    gridHTML = gridHTML.replace(/\{\{searchIndex\}\}/g, searchIndexJSON);
    gridHTML = gridHTML.replace(/\{\{seoTags\}\}/g, seoTags);
    
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
    
    // Extract title & description for SEO
    const titleMatch = reviewsHTML.match(/<title>([\s\S]+?)<\/title>/i);
    const descMatch = reviewsHTML.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]+?)["']/i);
    const pageTitle = titleMatch ? titleMatch[1] : '稳定高速机场评测列表';
    const pageDesc = descMatch ? padDescription(descMatch[1]) : '';
    const seoTags = getSeoTags(pageTitle, pageDesc, 'reviews.html');
    
    reviewsHTML = reviewsHTML.replace(/\{\{reviewArticles\}\}/g, reviewArticlesMarkup);
    reviewsHTML = reviewsHTML.replace(/\{\{popularArticles\}\}/g, popularArticlesList);
    reviewsHTML = reviewsHTML.replace(/\{\{categoriesWidget\}\}/g, categoriesWidgetMarkup);
    reviewsHTML = reviewsHTML.replace(/\{\{tagCloudWidget\}\}/g, tagCloudMarkup);
    reviewsHTML = reviewsHTML.replace(/\{\{searchIndex\}\}/g, searchIndexJSON);
    reviewsHTML = reviewsHTML.replace(/\{\{seoTags\}\}/g, seoTags);
    reviewsHTML = reviewsHTML.replace(/\{\{sidebarLadderRecs\}\}/g, sidebarLadderRecs.replace(/\{\{rootPath\}\}/g, ''));
    
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
    
    // Extract title & description for SEO
    const titleMatch = guidesHTML.match(/<title>([\s\S]+?)<\/title>/i);
    const descMatch = guidesHTML.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]+?)["']/i);
    const pageTitle = titleMatch ? titleMatch[1] : '科学上网指南与技术科普专题';
    const pageDesc = descMatch ? padDescription(descMatch[1]) : '';
    const seoTags = getSeoTags(pageTitle, pageDesc, 'guides.html');
    
    guidesHTML = guidesHTML.replace(/\{\{guideArticles\}\}/g, guideArticlesMarkup);
    guidesHTML = guidesHTML.replace(/\{\{popularArticles\}\}/g, popularArticlesList);
    guidesHTML = guidesHTML.replace(/\{\{categoriesWidget\}\}/g, categoriesWidgetMarkup);
    guidesHTML = guidesHTML.replace(/\{\{tagCloudWidget\}\}/g, tagCloudMarkup);
    guidesHTML = guidesHTML.replace(/\{\{searchIndex\}\}/g, searchIndexJSON);
    guidesHTML = guidesHTML.replace(/\{\{seoTags\}\}/g, seoTags);
    guidesHTML = guidesHTML.replace(/\{\{sidebarLadderRecs\}\}/g, sidebarLadderRecs.replace(/\{\{rootPath\}\}/g, ''));
    
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
    
    // Extract title & description for SEO
    const titleMatch = softwareHTML.match(/<title>([\s\S]+?)<\/title>/i);
    const descMatch = softwareHTML.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]+?)["']/i);
    const pageTitle = titleMatch ? titleMatch[1] : '翻墙加速软件客户端下载与配置新手教程';
    const pageDesc = descMatch ? padDescription(descMatch[1]) : '';
    const seoTags = getSeoTags(pageTitle, pageDesc, 'software.html');
    
    softwareHTML = softwareHTML.replace(/\{\{searchIndex\}\}/g, searchIndexJSON);
    softwareHTML = softwareHTML.replace(/\{\{seoTags\}\}/g, seoTags);
    
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
      const paddedDesc = padDescription(art.description || '');
      let postHTML = articleTemplate;
      
      // First, replace tags in the article content itself (like comparison table and cards grid)
      let finalContent = art.content;
      finalContent = finalContent.replace(/\{\{compareTableRows\}\}/g, compareTableRowsMarkupForPosts);
      finalContent = finalContent.replace(/\{\{airportCards\}\}/g, airportCardsMarkupForPosts);
      
      // Append in-content ladder recommendation widget block
      finalContent = finalContent + "\n" + postLadderRecs;
      
      const tocMarkup = generateTOC(finalContent);
      const tagBadgesMarkup = art.tags.map(t => `<span class="feature-tag">${t}</span>`).join('');
      
      // Breadcrumbs category link destination
      let categoryLink = 'reviews.html';
      if (art.category === '科学上网指南') {
        categoryLink = 'guides.html';
      } else if (art.category === '客户端配置教程') {
        categoryLink = 'software.html';
      }
      
      const seoTags = getPostSeoTags(art.title, paddedDesc, art.slug);
      
      postHTML = postHTML.replace(/\{\{title\}\}/g, art.title);
      postHTML = postHTML.replace(/\{\{description\}\}/g, paddedDesc);
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
      postHTML = postHTML.replace(/\{\{seoTags\}\}/g, seoTags);
      postHTML = postHTML.replace(/\{\{sidebarLadderRecs\}\}/g, sidebarLadderRecs);
      
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

  // 12. CONFIGURE & SUBMIT TO INDEXNOW
  generateIndexNow();

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

// IndexNow Generator and Submitter
function generateIndexNow() {
  console.log("Generating IndexNow validation key file...");
  const apiKey = '05709fa9015c42abb8ed05abca174cdd';
  const baseUrl = 'https://vpns-top.com';
  
  // Write the verification txt file
  fs.writeFileSync(path.join(__dirname, `${apiKey}.txt`), apiKey, 'utf-8');
  console.log(`Generated ${apiKey}.txt successfully!`);

  // Collect all URLs to submit
  const urls = [
    `${baseUrl}/`,
    `${baseUrl}/airport.html`,
    `${baseUrl}/reviews.html`,
    `${baseUrl}/guides.html`,
    `${baseUrl}/software.html`
  ];
  
  articles.forEach(art => {
    urls.push(`${baseUrl}/posts/${art.slug}.html`);
  });

  // Call API submission
  submitIndexNow(apiKey, baseUrl, urls);
}

function submitIndexNow(apiKey, baseUrl, urls) {
  console.log("Submitting URLs to IndexNow (Bing/Yandex)...");
  
  const postData = JSON.stringify({
    host: 'vpns-top.com',
    key: apiKey,
    keyLocation: `${baseUrl}/${apiKey}.txt`,
    urlList: urls
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/IndexNow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log("Successfully submitted URLs to IndexNow!");
      } else {
        console.warn(`IndexNow submission responded with status code: ${res.statusCode}. Response: ${data}`);
      }
    });
  });

  req.on('error', (e) => {
    console.warn("IndexNow submission failed (this is normal if build container has no internet access):", e.message);
  });

  req.write(postData);
  req.end();
}

build();
