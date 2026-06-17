<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <a
        class="footer-visual-link"
        href="https://steamcommunity.com/groups/486Kqqq"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="访问 Steam 社区群组"
      >
        <div class="footer-visual" aria-hidden="true"></div>
      </a>
      <div class="footer-divider" aria-hidden="true"></div>
      <div class="footer-info">
        <h3>HLYM CS2 公益服务器</h3>
        <p class="footer-desc">
          <span class="footer-label">开发组介绍：</span>
          本组意在延续娱乐对抗玩法，为CS2社区环境添加一丝微不足道的光彩，所有人均为爱发电，有多种插件的开发经验，服务器运营经验，我们欢迎任何形式的合作，如果您想共同发展社区请与我们联系
        </p>
        <p class="footer-desc">
          <span class="footer-label">服务器介绍：</span>
          服务器主要玩法为MultiGames（娱乐对抗），目前用户已达900+人次，常驻在线每晚约20-30人左右，免费公益性质，内置70多张小游戏地图以及近40张混战地图，120余款模型以及近20款换肤模型可供选择，并且拥有完善的社区服务器功能，包括RTV，商店，积分系统，以及网站和QQ群签到系统，支持绑定游戏内账号（网站或游戏内绑定），武器换肤系统等额外功能，欢迎进入服务器以发掘更多玩法和功能！
        </p>
        <div class="footer-cert-row">
          <span class="footer-meta-inline">HLYM CS2 ©2026 Created by HLYMCN</span>
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
            辽ICP备19004490号-1
          </a>
          <a
            class="footer-qq"
            href="https://qm.qq.com/cgi-bin/qm/qr?k=Sh4gcapxVV57FqXxe7ZU07-v9u8YvKVN&jump_from=webapi&authKey=HiFkDO97IWzVgJEO6SWn59U3r7vJPEfvGNq8+Y4RVgOHFRN8+CB9WhpjYJmRvyky"
            target="_blank"
            rel="noopener noreferrer"
          >
            加入QQ群
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  width: 100%;
  background: var(--theme-footer-bg);
  color: var(--theme-footer-text);
  border-top: 1px solid var(--theme-border);
  backdrop-filter: blur(12px);
  padding: 36px 24px 40px;
}

.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(300px, 1.1fr) 1px minmax(300px, 1.1fr);
  gap: 28px;
  align-items: center;
}

.footer-visual {
  min-height: 180px;
  aspect-ratio: 16 / 9;
  width: 100%;
  border-radius: 24px;
  border: 1px solid var(--theme-border);
  background: var(--footer-visual, linear-gradient(135deg, rgba(148, 163, 184, 0.2), rgba(15, 23, 42, 0.2)));
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: var(--theme-card-shadow);
}

.footer-visual-link {
  display: block;
  width: 100%;
  text-decoration: none;
}

.footer-visual-link:focus-visible {
  outline: 2px solid rgba(148, 163, 184, 0.6);
  outline-offset: 4px;
  border-radius: 24px;
}

.footer-divider {
  width: 1px;
  height: 100%;
  background: var(--theme-border);
  align-self: stretch;
  opacity: 0.7;
}

.footer-info h3 {
  font-size: 18px;
  margin: 0 0 8px;
  color: var(--theme-text);
}

.footer-desc {
  margin: 0 0 12px;
  color: var(--theme-footer-text);
  line-height: 1.6;
  font-size: 13px;
}

.footer-label {
  color: var(--theme-text);
  font-weight: 600;
  margin-right: 4px;
}

.footer-info a {
  color: var(--theme-footer-link);
  text-decoration: none;
  font-size: 12px;
}

.footer-info a:hover {
  text-decoration: underline;
}

.footer-cert-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: nowrap;
  justify-content: center;
}

.footer-meta-inline {
  font-size: 12px;
  color: var(--theme-footer-text);
  white-space: nowrap;
}

.footer-qq {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid var(--theme-border);
  background: var(--theme-secondary-bg);
  color: var(--theme-text);
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.footer-qq:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.2);
}

@media (max-width: 900px) {
  .footer-inner {
    grid-template-columns: 1fr;
    align-items: stretch;
  }

  .footer-visual {
    justify-self: center;
    margin: 0 auto;
    width: 100%;
    max-width: 640px;
    min-height: 210px;
  }

  .footer-divider {
    width: 100%;
    height: 1px;
    margin: 12px 0;
    opacity: 0.6;
  }

  .footer-cert-row {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
