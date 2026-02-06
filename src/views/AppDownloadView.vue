<template>
  <div class="download-page">
    <div class="download-bg">
      <video
        src="https://hlympic.oss-cn-beijing.aliyuncs.com/frontend/assets/video/bg/baierduo.mp4"
        muted
        autoplay
        loop
        playsinline
        preload="metadata"
        class="download-video globalVideo"
      ></video>
      <div class="download-overlay"></div>
    </div>

    <div class="download-content">
      <section class="download-hero">
        <div class="hero-copy">
          <p class="eyebrow">HLYM MOBILE</p>
          <h1>安卓客户端下载</h1>
          <p class="lead">官方 APK 下载与安装说明 · 仅支持 Android 设备</p>
          <div class="hero-actions">
            <n-button
              tag="a"
              :href="apkUrl"
              target="_blank"
              rel="noopener noreferrer"
              type="primary"
              size="large"
              class="hero-download-btn"
            >
              立即下载 APK
            </n-button>
            <span class="hero-hint">版本 {{ version }} · 更新时间 {{ updatedAt }}</span>
          </div>
        </div>
        <div class="hero-panel">
          <div class="panel-header">
            <div>
              <p class="panel-eyebrow">Release</p>
              <h2>{{ appName }}</h2>
            </div>
            <div class="panel-tags">
              <n-tag type="success" size="small" round>Android</n-tag>
              <n-tag type="info" size="small" round>APK</n-tag>
              <n-tag size="small" round>官方发布</n-tag>
            </div>
          </div>
          <div class="panel-info">
            <div class="info-item">
              <span class="label">包名</span>
              <span class="value">{{ packageName }}</span>
            </div>
            <div class="info-item">
              <span class="label">系统要求</span>
              <span class="value">Android 8.0+</span>
            </div>
          </div>
          <div class="panel-link">
            <span class="label">下载链接</span>
            <button class="copy-link-btn copy-link-btn-inline" type="button" @click="copyLink">
              点击复制下载链接
            </button>
          </div>
        </div>
      </section>

      <section class="download-card">
        <div class="card-title">安装步骤</div>
        <ol class="card-list">
          <li>下载并保存 APK 文件</li>
          <li>系统提示来源受限时，允许该来源安装</li>
          <li>安装完成后打开 App，保持网络可用</li>
        </ol>
      </section>

      <section class="download-grid">
        <div class="info-card">
          <div class="card-title">使用声明</div>
          <ul class="card-list">
            <li>仅提供官方 APK 下载，请勿使用第三方来源</li>
            <li>安装前请确认文件来源安全</li>
          </ul>
        </div>
        <div class="info-card">
          <div class="card-title">权限说明</div>
          <ul class="card-list">
            <li>网络访问：用于加载页面与接口数据</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NTag, useMessage } from 'naive-ui'

const appName = '黄粱一梦'
const apkUrl = 'https://hlympic.oss-cn-beijing.aliyuncs.com/frontend/apks/hlymcn/hlymcn-1.0.0.apk'
const version = 'V1.0.0'
const updatedAt = '2026-02-01'
const packageName = 'cn.hlymcn.app'

const message = useMessage()

const copyLink = async () => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(apkUrl)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = apkUrl
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    message.success('下载链接已复制')
  } catch {
    message.error('复制失败，请手动下载')
  }
}
</script>

<style scoped>
.download-page {
  position: relative;
  min-height: 100vh;
  color: var(--theme-text);
  overflow: hidden;
}

.download-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
}

.download-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.download-overlay {
  position: absolute;
  inset: 0;
  background: var(--theme-overlay);
}

.download-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 24px 140px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.download-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: 28px;
  align-items: stretch;
}

.hero-copy h1 {
  font-size: 44px;
  margin: 8px 0 12px;
  letter-spacing: 0.5px;
}

.eyebrow {
  letter-spacing: 0.4em;
  text-transform: uppercase;
  font-size: 12px;
  color: var(--theme-muted);
}

.lead {
  color: var(--theme-muted);
  max-width: 520px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-top: 18px;
}

.hero-hint {
  font-size: 13px;
  color: var(--theme-muted);
}

.hero-download-btn {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%) !important;
  border: none !important;
  border-radius: 999px !important;
  padding: 0 30px !important;
  height: 46px !important;
  font-weight: 700;
  box-shadow: 0 14px 32px rgba(37, 99, 235, 0.35);
}

.copy-link-btn {
  border: 1px dashed var(--theme-border);
  background: var(--theme-secondary-bg);
  color: var(--theme-text);
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 13px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.copy-link-btn-inline {
  align-self: flex-start;
}

.copy-link-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(15, 23, 42, 0.2);
  background: var(--theme-card-bg);
}

.hero-panel {
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 24px;
  padding: 24px;
  box-shadow: var(--theme-card-shadow);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.panel-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 11px;
  color: var(--theme-muted);
  margin-bottom: 6px;
}

.panel-header h2 {
  margin: 0;
  font-size: 22px;
}

.panel-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.panel-link {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.panel-info {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.info-item {
  background: var(--theme-secondary-bg);
  border: 1px solid var(--theme-border);
  border-radius: 14px;
  padding: 12px;
}

.info-item .label,
.panel-link .label {
  font-size: 12px;
  color: var(--theme-muted);
  display: block;
  margin-bottom: 6px;
}

.info-item .value,
.panel-link .value {
  font-weight: 600;
  color: var(--theme-text);
}

.download-card,
.info-card {
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 24px;
  padding: 24px;
  box-shadow: var(--theme-card-shadow);
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
}

.card-list {
  margin: 0;
  padding-left: 20px;
  color: var(--theme-muted);
  line-height: 1.8;
}

.download-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
}

@media (max-width: 960px) {
  .download-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .download-content {
    padding: 100px 18px 120px;
  }

  .hero-copy h1 {
    font-size: 34px;
  }
}
</style>
