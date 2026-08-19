/**
 * redirects.ts — 内部外链中转表
 * 规则：不要在任何 .astro / .md 文件中硬编码推广 URL，
 * 所有外链必须在此注册，页面中只使用 referralId。
 */

export interface RedirectEntry {
  id: string;
  brand: string;
  destination: string;
  description?: string;
}

export const redirects: RedirectEntry[] = [
  // ── 主推品牌 ──────────────────────────────────────────────
  {
    id: 'yuntu',
    brand: '云图机场',
    destination: 'https://vip.ytjcok.org/#/register?code=qPHQtl9a',
    description: '金融级专线，25元/月150G，优惠码 yt88 享8折',
  },
  {
    id: 'shun-yun',
    brand: '瞬云机场',
    destination: 'https://ccc.jichang.best/#/register?code=o4I4kToe',
    description: 'ANYCAST高速节点，8.25元/月59G，低延迟专线',
  },
  {
    id: 'jisu-cloud',
    brand: '极速cloud',
    destination: 'https://august.jsjc456789.com',
    description: '极速cloud，三网优化精品线路，15元/月起',
  },
  {
    id: 'jilian-yun',
    brand: '极连云',
    destination: 'https://haozevpn.jlyvipaff.com/#/?code=KUKfOY13',
    description: 'IEPL专线，8元/月60G，全节点1倍率不限速',
  },
  {
    id: 'guangnian-ti',
    brand: '光年梯',
    destination: 'https://gnt001.gntvipaff.cc/#/?code=j1ufpE44',
    description: 'IEPL专线，7.42元/月59G，年付优惠',
  },

  // ── 次推品牌 ──────────────────────────────────────────────
  {
    id: 'feimao-yun',
    brand: '飞猫云',
    destination: 'https://flycat.flycatvipaff.cc/#/?code=1arEKHqh',
    description: '全IPLC专线，7元/月50G，2.5Gbps带宽',
  },
  {
    id: 'guangsu-yun',
    brand: '光速云',
    destination: 'https://kjlq01.gsyvipaff.cc/#/?code=b1OTkTeL',
    description: 'IEPL专线，8.25元/月59G，无限速无倍率',
  },
  {
    id: 'xingdao-meng',
    brand: '星岛梦',
    destination: 'https://wuyou202001.xdmvipaff.cc/#/?code=olWCiAhj',
    description: 'IEPL专线，16元/月100G，1T大流量永久套餐',
  },
  {
    id: 'quanqiu-yun',
    brand: '全球云',
    destination: 'https://haozevpn.gcvipaff.cc/#/?code=WRQJc2v4',
    description: 'IEPL/IPLC专线，20元/月120G，全球节点',
  },
  {
    id: 'lumina',
    brand: 'Lumina',
    destination: 'https://luminak.net/?token=lumina#/register?code=dCgHyjFi',
    description: '10元/月200G，Hysteria2直连，不限设备',
  },
  {
    id: 'bianjie-yun',
    brand: '边界云',
    destination: 'https://www.lvpn.cc/r/6UQDZT',
    description: 'IEPL专线，优惠码zevpn，3天无理由退款',
  },
  {
    id: 'bianyuan-jd',
    brand: '边缘节点',
    destination: 'https://zoio.edgenovaaff.cc/#/register?code=Oy1wZvzJ',
    description: '9元/月45G，中转加速，不限速不限设备',
  },
  {
    id: 'sujie',
    brand: '速界',
    destination: 'https://calvior.speed-world.cc/#/register?code=r7IOqoY7',
    description: '7.5元/月50G，高速IPLC，专属客户端',
  },
  {
    id: 'jinyun',
    brand: '锦云',
    destination: 'https://w2.whengdl.com/#/register?code=BIGc8qrQ',
    description: '6元/月50G，公网中转与直连混合，全流媒体解锁',
  },
  {
    id: 'shanshuiyun',
    brand: '山水云',
    destination: 'https://ss2.byvvcsx.com/#/register?code=jkziWeb8',
    description: '7.33元/月64G，中转+直连，全流媒体解锁',
  },
  {
    id: 'miaomaoyun',
    brand: '秒秒云',
    destination: 'https://m1.mouhiojl.com/#/register?code=g3bq7bpK',
    description: '14元/月128G，中转高速，24小时客服',
  },
  {
    id: 'jisu-yun',
    brand: '极速云',
    destination: 'https://tg.sintotgch.com/#/register?code=RENHYxqv',
    description: '15.99元/月1200G，大流量重度用户首选',
  },
  {
    id: 'edge-x',
    brand: 'Edge-X',
    destination: 'https://edge-invite.com/#/register?code=73ienU2h',
    description: '16.8元/月100G，公网隧道及中转优质线路',
  },
  {
    id: 'yin-yun',
    brand: '隐云',
    destination: 'https://wkacc.xyz/?code=711d7afb',
    description: 'IPLC/IEPL多线路，25元/月150G，魔法节点技术',
  },
  {
    id: 'shanhai',
    brand: '山海机场',
    destination: 'https://shanhai.sbs/#/register?code=qVTbPfWP',
    description: '新机场低价路线，SS/VLESS/AnyTLS多协议',
  },
  {
    id: 'lizione',
    brand: 'lizione',
    destination: 'https://lizione.vip/#/register?code=Wmf3jYMy',
    description: '10元/月100G，动态解锁全部流媒体',
  },
  {
    id: 'doraemon',
    brand: '哆啦A梦机场',
    destination: 'https://store.yyds2-doraemon.site/login/register?invite_code=5VxQMw0k',
    description: '10元/月100G，不限速不限设备',
  },
  {
    id: 'pinhao-lian',
    brand: '拼好连',
    destination: 'https://sxzofrnamc.runwayhz.com/#/register?code=A63zaSvx',
    description: '9.9元/月100G，BGP高速+IEPL专线，SLA 99.99%',
  },
  {
    id: '99ba',
    brand: '99吧',
    destination: 'https://99vpn.bar/#/register?code=Uni7IOJh',
    description: '7.5元/月66G，优惠码2026-99，99台设备同时登录',
  },
  {
    id: 'naiyun',
    brand: '奈云',
    destination: 'https://www.anyaff.cc/?path=register&code=A612DB2z',
    description: '老牌6年+稳定运营，10.6元/月168G',
  },
  {
    id: 'keda-jiashuqi',
    brand: '可达加速器',
    destination: 'https://1.mkd997.com/?page=register&code=5KnBzRqS',
    description: '10元/月100G，SD-WAN网络架构，全球节点',
  },
  {
    id: 'xunda-vpn',
    brand: '迅达VPN',
    destination: 'https://rcyt.ascsgg.com/register?code=lflTU4zy',
    description: '15元/月150G，BGP企业专线，7×24小时工单',
  },
  {
    id: 'weifeng',
    brand: '微风网络',
    destination: 'https://vip01.breezenetaff.com/#/?code=JxFsshSn',
    description: '微风网络，高性价比机场',
  },
  {
    id: 'lingmao',
    brand: '灵猫',
    destination: 'https://haozevpn.civetaff.com/#/?code=1pboeliL',
    description: '灵猫机场，稳定专线',
  },
  {
    id: 'firefly',
    brand: 'firefly',
    destination: 'http://haozevpn.fireflyaff.com/#/?code=t1Xo1DdU',
    description: 'firefly机场，Trojan协议',
  },
  {
    id: 'kuajie-yun',
    brand: '跨界云',
    destination: 'https://haozevpn.kuajieaff.com/#/dp4EdOAa',
    description: '跨界云，全球节点覆盖',
  },
  {
    id: 'nice-jiasu',
    brand: 'NICE加速',
    destination: 'https://web.nicecc.cc/#/register?code=7nNS5xdG',
    description: 'NICE加速，多协议支持',
  },
  {
    id: 'flower-cloud',
    brand: '花云机场',
    destination: 'https://api-flowercloud.com/aff.php?aff=16018',
    description: '2020年成立老牌，BGP入口专线，128元/年20G/月',
  },
  // 示例条目（保留，避免构建报错）
  {
    id: 'example-brand',
    brand: '示例品牌',
    destination: '/',
  },
];

/**
 * 根据 referralId 查找重定向条目
 */
export function getRedirectById(id: string): RedirectEntry | undefined {
  return redirects.find((r) => r.id === id);
}
