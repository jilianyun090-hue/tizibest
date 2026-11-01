// 站点全局配置
export const SITE = {
  domain:      'tizibest.com',
  url:         'https://tizibest.com',
  name:        '稳定机场推荐',
  tagline:     '机场评测与配置指南',
  description: 'TiziBest 提供机场评测、客户端配置教程与选购指南，整理线路、套餐、速度和流媒体兼容性等信息，供用户比较参考。',
  lang:        'zh-CN',
  locale:      'zh_CN',
  author:      'TiziBest 编辑团队',
  twitterHandle: '',
  ogImage:     '/og-default.png',
  themeColor:  '#0f172a',
} as const;

export type SiteConfig = typeof SITE;
