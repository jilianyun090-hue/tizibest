# 批量为 posts/ 目录下所有 HTML 文章添加 GEO meta + Open Graph 标签
# 同时将文章 header logo 更新为"稳定机场推荐"

$postsDir = "d:\桌面文件\vpns-top.com\posts"
$siteUrl = "https://www.vpns-top.com"

# GEO meta 块 (针对中文用户目标受众)
$geoMeta = @'
  <meta name="geo.region" content="CN">
  <meta name="geo.placename" content="China">
  <meta name="language" content="zh-CN">
  <meta name="revisit-after" content="3 days">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="稳定机场推荐 - vpns-top.com">
  <meta property="og:locale" content="zh_CN">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@vpnstop">
'@

$files = Get-ChildItem -Path $postsDir -Filter "*.html"
$count = 0

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8

    # 1. 修复 logo 文字
    $content = $content -replace '<span>vpns-top\.com</span>', '<span>稳定机场推荐</span>'

    # 2. 提取 title 和 description 用于 OG 标签
    $titleMatch = [regex]::Match($content, '<title>(.+?) - vpns-top\.com</title>')
    $descMatch  = [regex]::Match($content, '<meta name="description" content="([^"]+)"')
    $urlSlug    = $file.BaseName

    $ogTitle = if ($titleMatch.Success) { $titleMatch.Groups[1].Value } else { "稳定机场推荐" }
    $ogDesc  = if ($descMatch.Success) { $descMatch.Groups[1].Value } else { "2026年优质机场评测与科学上网教程" }
    $ogUrl   = "$siteUrl/posts/$urlSlug.html"

    $ogExtra = @"
  <meta property="og:title" content="$ogTitle">
  <meta property="og:description" content="$ogDesc">
  <meta property="og:url" content="$ogUrl">
"@

    # 3. 检查是否已有 GEO 标签，避免重复插入
    if ($content -notmatch 'geo\.region') {
        # 在 </head> 前插入所有 meta
        $insertBlock = $geoMeta + $ogExtra
        $content = $content -replace '(</head>)', "$insertBlock`$1"
        $count++
        Write-Host "✅ 已处理: $($file.Name)"
    } else {
        Write-Host "⏭ 跳过(已有GEO): $($file.Name)"
    }

    # 保存
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
}

Write-Host "`n✨ 完成！共处理 $count 个文件。"
