const fs = require('fs');

// ===== 1. Fix software.html ClashParty and ClashMi cards =====
let sw = fs.readFileSync('software.html', 'utf8');

const oldClashPartyCard = `          <!-- Clash Party -->
          <div class="software-card">
            <div class="software-img-wrapper">
              <img src="https://clashmac.cn.com/img/logo/clash-verge-rev.webp" alt="Clash Party" class="software-img" onerror="this.style.display='none'">
            </div>
            <div class="software-content">
              <div class="software-meta">
                <span class="platform-badge platform-win">Windows</span>
                <span class="platform-badge platform-mac">macOS</span>
                <span class="software-status status-classic">稳定工具</span>
              </div>
              <h2 class="software-title">Clash Party</h2>
              <p class="software-desc">基于开源 Clash 项目深度定制的桌面端分支版本。坚持"稳定大于一切"的设计理念，完美兼容所有主流机场订阅格式，内置强大的规则分流引擎，特别适合追求极致稳定性的长期挂机用户。</p>
              
              <div class="software-steps">
                <div class="step-title">⚙️ 快速配置步骤：</div>
                <ol>
                  <li>从机场后台复制 <strong>Clash 订阅链接</strong>。</li>
                  <li>打开 Clash Party，点击 <strong>配置 → 导入订阅</strong>。</li>
                  <li>粘贴机场提供的订阅链接，点击确认导入。</li>
                  <li>订阅更新完成后，在节点列表里选择延迟较低的节点。</li>
                  <li>打开主界面的代理开关，点击模式按钮选择 <strong>规则模式</strong>（推荐）。</li>
                </ol>
              </div>

              <div style="margin:1rem 0;display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;">
                <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260105115031668.webp" alt="Clash Party 导入订阅" style="width:100%;border-radius:8px;border:1px solid var(--border-color);" loading="lazy"><figcaption style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.25rem;">① 导入订阅链接</figcaption></figure>
                <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260105115525822.webp" alt="Clash Party 选择节点" style="width:100%;border-radius:8px;border:1px solid var(--border-color);" loading="lazy"><figcaption style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.25rem;">② 选择低延迟节点</figcaption></figure>
                <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260105115059757.webp" alt="Clash Party 开启代理" style="width:100%;border-radius:8px;border:1px solid var(--border-color);" loading="lazy"><figcaption style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.25rem;">③ 开启系统代理</figcaption></figure>
                <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260102144939298.webp" alt="Clash Party 规则模式" style="width:100%;border-radius:8px;border:1px solid var(--border-color);" loading="lazy"><figcaption style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.25rem;">④ 推荐使用规则模式</figcaption></figure>
              </div>

              <div class="software-actions">
                <a href="https://github.com/Loyalsoldier/clash-rules" target="_blank" rel="nofollow" class="soft-btn soft-btn-download">GitHub 官方下载</a>
                <a href="posts/clash-verge-rev-tutorial.html" class="soft-btn soft-btn-doc">参考配置教程</a>
              </div>
            </div>
          </div>`;

const newClashPartyCard = `          <!-- Clash Party -->
          <div class="software-card">
            <div class="software-img-wrapper">
              <img src="https://clashmac.cn.com/img/logo/clash-party.webp" alt="Clash Party" class="software-img" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/GUI-for-Cores/GUI.for.Clash/master/src/assets/applogo.png'">
            </div>
            <div class="software-content">
              <div class="software-meta">
                <span class="platform-badge platform-win">Windows</span>
                <span class="platform-badge platform-mac">macOS</span>
                <span class="software-status status-classic">稳定工具</span>
              </div>
              <h2 class="software-title">Clash Party</h2>
              <p class="software-desc">基于开源 Clash 项目深度定制的桌面端分支版。在瞬息万变的网络环境中，它坚持"稳定大于一切"的设计理念，特别适合追求极致稳定性的用户。兼容性强，支持主流机场的所有订阅格式，内置强大的规则分流引擎。</p>

              <div style="margin:1rem 0;display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;">
                <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260105115031668.webp" alt="Clash Party 导入订阅" style="width:100%;border-radius:8px;border:1px solid var(--border-color);" loading="lazy"><figcaption style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.25rem;">① 导入订阅链接</figcaption></figure>
                <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260105115525822.webp" alt="Clash Party 选择节点" style="width:100%;border-radius:8px;border:1px solid var(--border-color);" loading="lazy"><figcaption style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.25rem;">② 选择低延迟节点</figcaption></figure>
                <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260105115059757.webp" alt="Clash Party 开启代理" style="width:100%;border-radius:8px;border:1px solid var(--border-color);" loading="lazy"><figcaption style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.25rem;">③ 开启系统代理</figcaption></figure>
                <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260102144939298.webp" alt="Clash Party 规则模式" style="width:100%;border-radius:8px;border:1px solid var(--border-color);" loading="lazy"><figcaption style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.25rem;">④ 推荐使用规则模式</figcaption></figure>
              </div>

              <div class="software-actions">
                <a href="https://github.com/GUI-for-Cores/GUI.for.Clash/releases" target="_blank" rel="nofollow" class="soft-btn soft-btn-download">GitHub 官方下载</a>
                <a href="posts/clash-party-tutorial.html" class="soft-btn soft-btn-doc">详细教程</a>
              </div>
            </div>
          </div>`;

const oldClashMiCard = `          <!-- Clash Mi -->
          <div class="software-card">
            <div class="software-img-wrapper">
              <img src="https://clashmac.cn.com/img/logo/clash-verge-rev.webp" alt="Clash Mi" class="software-img" onerror="this.style.display='none'">
            </div>
            <div class="software-content">
              <div class="software-meta">
                <span class="platform-badge platform-win">Windows</span>
                <span class="platform-badge platform-mac">macOS</span>
                <span class="software-status">内核增强</span>
              </div>
              <h2 class="software-title">Clash Mi</h2>
              <p class="software-desc">基于 Mihomo（Clash Meta）核心开发的新一代代理客户端。界面极致精简、无广告干扰，内存占用仅为同类 Electron 框架软件的三分之一，完美发挥 Mihomo 内核在流媒体解锁与边缘分流上的优势，支持复杂 YAML 自定义配置。</p>
              
              <div class="software-steps">
                <div class="step-title">⚙️ 快速配置步骤：</div>
                <ol>
                  <li>从机场后台复制好订阅链接，打开 Clash Mi 进入首页。</li>
                  <li>点击 <strong>我的配置</strong>，再点右上角 <strong>＋</strong>。</li>
                  <li>选择 <strong>从剪贴板导入</strong>，粘贴订阅地址并填写备注。</li>
                  <li>点击右上角 <strong>✔ 保存</strong>，等待订阅配置下载完成。</li>
                  <li>返回主界面，点击 <strong>启动代理</strong> 按钮开始连接节点。</li>
                </ol>
              </div>

              <div style="margin:1rem 0;display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;">
                <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260102135135983.webp" alt="Clash Mi 新增配置" style="width:100%;border-radius:8px;border:1px solid var(--border-color);" loading="lazy"><figcaption style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.25rem;">① 点＋新增配置</figcaption></figure>
                <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260102135152264.webp" alt="Clash Mi 粘贴订阅" style="width:100%;border-radius:8px;border:1px solid var(--border-color);" loading="lazy"><figcaption style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.25rem;">② 粘贴订阅链接保存</figcaption></figure>
                <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260102135220682.webp" alt="Clash Mi 选择节点" style="width:100%;border-radius:8px;border:1px solid var(--border-color);" loading="lazy"><figcaption style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.25rem;">③ 选择低延迟节点</figcaption></figure>
                <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260105115059757.webp" alt="Clash Mi 开启代理" style="width:100%;border-radius:8px;border:1px solid var(--border-color);" loading="lazy"><figcaption style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.25rem;">④ 启动代理开始上网</figcaption></figure>
              </div>

              <div class="software-actions">
                <a href="https://github.com/zzzgydi/clash-nyanpasu" target="_blank" rel="nofollow" class="soft-btn soft-btn-download">GitHub 官方下载</a>
                <a href="posts/clash-verge-rev-tutorial.html" class="soft-btn soft-btn-doc">参考配置教程</a>
              </div>
            </div>
          </div>`;

const newClashMiCard = `          <!-- Clash Mi -->
          <div class="software-card">
            <div class="software-img-wrapper">
              <img src="https://clashmac.cn.com/img/logo/clashmi.webp" alt="Clash Mi" class="software-img" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/KaringX/clashmi/main/assets/icon.png'">
            </div>
            <div class="software-content">
              <div class="software-meta">
                <span class="platform-badge platform-win">Windows</span>
                <span class="platform-badge platform-mac">macOS</span>
                <span class="software-status">内核增强</span>
              </div>
              <h2 class="software-title">Clash Mi</h2>
              <p class="software-desc">基于 Mihomo（Clash Meta）核心的代理客户端，界面简洁、操作直观。极致精简，无多余动画与广告；内存占用仅为同类 Electron 框架软件的不到三分之一；完美发挥 Mihomo 内核在流媒体解锁与边缘分流上的优势，支持复杂 YAML 自定义配置。</p>

              <div style="margin:1rem 0;display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.6rem;">
                <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260102135135983.webp" alt="Clash Mi 新增配置" style="width:100%;border-radius:8px;border:1px solid var(--border-color);" loading="lazy"><figcaption style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.25rem;">① 点＋新增配置</figcaption></figure>
                <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260102135152264.webp" alt="Clash Mi 粘贴订阅" style="width:100%;border-radius:8px;border:1px solid var(--border-color);" loading="lazy"><figcaption style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.25rem;">② 粘贴订阅链接保存</figcaption></figure>
                <figure style="margin:0;text-align:center;"><img src="https://clashmac.cn.com/img/docs/20260102135220682.webp" alt="Clash Mi 开启代理" style="width:100%;border-radius:8px;border:1px solid var(--border-color);" loading="lazy"><figcaption style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.25rem;">③ 启动代理开始上网</figcaption></figure>
              </div>

              <div class="software-actions">
                <a href="https://github.com/KaringX/clashmi/releases" target="_blank" rel="nofollow" class="soft-btn soft-btn-download">GitHub 官方下载</a>
                <a href="posts/clashmi-tutorial.html" class="soft-btn soft-btn-doc">详细教程</a>
              </div>
            </div>
          </div>`;

if (sw.includes(oldClashPartyCard)) {
  sw = sw.replace(oldClashPartyCard, newClashPartyCard);
  console.log('Replaced ClashParty card');
} else {
  console.log('ClashParty card not found, trying partial match...');
  // Try to find it
  const idx = sw.indexOf('<!-- Clash Party -->');
  const idx2 = sw.indexOf('<!-- Clash Mi -->');
  if (idx !== -1) {
    const extracted = sw.substring(idx, idx2).trim();
    console.log('Found ClashParty at:', idx, 'ClashMi at:', idx2);
    // Replace the section
    sw = sw.substring(0, idx) + newClashPartyCard + '\n\n' + sw.substring(idx2);
    console.log('Replaced ClashParty by position');
  }
}

if (sw.includes(oldClashMiCard)) {
  sw = sw.replace(oldClashMiCard, newClashMiCard);
  console.log('Replaced ClashMi card');
} else {
  console.log('ClashMi card not found, trying partial match...');
  const idx = sw.indexOf('<!-- Clash Mi -->');
  const idx2 = sw.indexOf('\n\n        </div>\n\n        <!-- 使用提示 -->');
  if (idx !== -1) {
    sw = sw.substring(0, idx) + newClashMiCard + sw.substring(idx2);
    console.log('Replaced ClashMi by position');
  }
}

fs.writeFileSync('software.html', sw, 'utf8');
console.log('software.html saved. Has clash-party-tutorial:', sw.includes('clash-party-tutorial.html'));
console.log('software.html saved. Has clashmi-tutorial:', sw.includes('clashmi-tutorial.html'));
console.log('Has correct ClashMi github:', sw.includes('KaringX/clashmi'));
console.log('Has correct ClashParty github:', sw.includes('GUI-for-Cores/GUI.for.Clash'));
