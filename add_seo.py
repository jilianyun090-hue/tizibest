import os, re

posts_dir = r'd:\桌面文件\vpns-top.com\posts'
site_pages = [
    r'd:\桌面文件\vpns-top.com\index.html',
    r'd:\桌面文件\vpns-top.com\airport.html',
    r'd:\桌面文件\vpns-top.com\reviews.html',
    r'd:\桌面文件\vpns-top.com\guides.html',
    r'd:\桌面文件\vpns-top.com\software.html',
]

GEO_META = '''  <meta name="geo.region" content="CN">
  <meta name="geo.placename" content="China">
  <meta name="language" content="zh-CN">
  <meta name="revisit-after" content="3 days">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="稳定机场推荐">
  <meta property="og:locale" content="zh_CN">
  <meta name="twitter:card" content="summary_large_image">
'''

def process_file(path, slug, base='https://www.tizibest.com'):
    with open(path, encoding='utf-8') as f:
        c = f.read()
    # Fix logo
    c = c.replace('<span>vpns-top.com</span>', '<span>稳定机场推荐</span>').replace('<span>tizibest.com</span>', '<span>稳定机场推荐</span>')
    # Add GEO only once
    if 'geo.region' not in c:
        tm = re.search(r'<title>(.+?)(?: - (?:vpns-top|tizibest)\.com)?</title>', c)
        dm = re.search(r'<meta name="description" content="([^"]+)"', c)
        og_title = tm.group(1) if tm else '稳定机场推荐'
        og_desc  = dm.group(1)[:160] if dm else '2026年优质机场评测'
        og_url   = f'{base}/{slug}'
        og_extra = (
            f'  <meta property="og:title" content="{og_title}">\n'
            f'  <meta property="og:description" content="{og_desc}">\n'
            f'  <meta property="og:url" content="{og_url}">\n'
        )
        c = c.replace('</head>', GEO_META + og_extra + '</head>', 1)
        result = 'updated'
    else:
        result = 'skipped'
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    return result

count_u = count_s = 0

# Process posts
for fn in os.listdir(posts_dir):
    if not fn.endswith('.html'):
        continue
    slug = 'posts/' + fn
    r = process_file(os.path.join(posts_dir, fn), slug)
    if r == 'updated':
        count_u += 1
        print(f'  [OK] {fn}')
    else:
        count_s += 1

# Process main pages
for path in site_pages:
    fn = os.path.basename(path)
    r = process_file(path, fn)
    if r == 'updated':
        count_u += 1
        print(f'  [OK] {fn}')
    else:
        count_s += 1

print(f'\nDone: {count_u} updated, {count_s} skipped')
