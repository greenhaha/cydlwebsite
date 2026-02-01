<template>
  <div class="home-page">
    <div class="home-bg">
      <video
        src="https://hlympic.oss-cn-beijing.aliyuncs.com/frontend/assets/video/bg/hecheng1.mp4"
        muted
        autoplay
        loop
        playsinline
        preload="metadata"
      ></video>
      <div class="bg-overlay"></div>
    </div>

    <div class="home-content">
      <section class="page-hero">
        <div class="title-block">
          <div class="title-eyebrow-row">
            <p class="eyebrow">{{ eyebrowText }}</p>
            <n-tag type="success" round size="small">{{ statusTag }}</n-tag>
          </div>
          <h1>{{ heroTitle }}</h1>
          <p class="lead">{{ heroLead }}</p>
          <div class="hero-actions">
            <router-link to="/app-download" class="inline-flex">
              <n-button type="primary" size="large" class="hero-download-btn">
                {{ downloadButtonText }}
              </n-button>
            </router-link>
            <n-button size="large" class="hero-secondary-btn" @click="goToQQGroup">
              {{ joinGroupText }}
            </n-button>
          </div>
        </div>

        <div class="hero-panel">
          <p class="panel-eyebrow">{{ panelEyebrow }}</p>
          <h3>{{ panelTitle }}</h3>
          <div class="panel-stats">
            <div class="panel-stat" v-for="stat in stats" :key="stat.label">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="feature-section">
        <div class="section-head">
          <p class="section-eyebrow">{{ featureEyebrow }}</p>
          <h2>{{ featureTitle }}</h2>
          <p class="section-lead">{{ featureLead }}</p>
        </div>
        <div class="feature-grid">
          <div
            class="feature-card"
            v-for="item in features"
            :key="item.title"
            :style="{ '--icon-bg': item.accent }"
          >
            <div class="feature-icon">
              <component :is="item.icon" class="feature-icon-svg" />
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NTag } from 'naive-ui'
import {
  GameController as GameIcon,
  People as PeopleIcon,
  Server as ServerIcon,
  Shirt as ShirtIcon,
} from '@vicons/ionicons5'

const eyebrowText = 'HLYM社区 · CS2公益服务器'
const statusTag = '公益免费'
const heroTitle = 'HLYM CS2 公益服务器'
const heroLead = '面向所有 CS2 玩家，永久免费开放'
const downloadButtonText = '安卓APP下载'
const joinGroupText = '加入QQ交流群'

const panelEyebrow = 'Live Stats'
const panelTitle = '丰富内容，持续更新'

const stats = [
  { label: '地图', value: '100+' },
  { label: '模型', value: '150+' },
  { label: '自定义内容', value: '20+' },
]

const featureEyebrow = 'Features'
const featureTitle = '核心特色'
const featureLead = '一站式玩法与服务，让你轻松上手'

const features = [
  {
    title: '免费公益',
    desc: '全部功能免费，长期维护更新',
    icon: ServerIcon,
    accent: 'linear-gradient(135deg, #2563eb, #60a5fa)',
  },
  {
    title: '丰富玩法',
    desc: 'MG娱乐对抗，多地图轮换',
    icon: GameIcon,
    accent: 'linear-gradient(135deg, #7c3aed, #c084fc)',
  },
  {
    title: '个性装扮',
    desc: '模型皮肤丰富，支持自定义',
    icon: ShirtIcon,
    accent: 'linear-gradient(135deg, #f97316, #fb923c)',
  },
  {
    title: '活跃社区',
    desc: 'QQ群交流，活动持续更新',
    icon: PeopleIcon,
    accent: 'linear-gradient(135deg, #14b8a6, #2dd4bf)',
  },
]

const goToQQGroup = () => {
  window.open(
    'https://qm.qq.com/cgi-bin/qm/qr?k=Sh4gcapxVV57FqXxe7ZU07-v9u8YvKVN&jump_from=webapi&authKey=HiFkDO97IWzVgJEO6SWn59U3r7vJPEfvGNq8+Y4RVgOHFRN8+CB9WhpjYJmRvyky',
    '_blank'
  )
}
</script>

<style scoped>
.home-page {
  position: relative;
  min-height: 100vh;
  color: var(--theme-text);
}


.home-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
}

.home-bg video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: var(--theme-video-filter);
}

.bg-overlay {
  position: absolute;
  inset: 0;
  background: var(--theme-overlay);
}

.home-content {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 120px 28px 160px;
}

.page-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 32px;
  align-items: end;
  margin-bottom: 48px;
}

.title-block h1 {
  font-size: 48px;
  margin: 12px 0 10px;
  letter-spacing: 1px;
}

.title-block .lead {
  color: var(--theme-muted);
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.title-eyebrow-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.32em;
  font-size: 12px;
  color: rgba(148, 163, 184, 0.9);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
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

.hero-secondary-btn {
  border-radius: 999px !important;
  border: 1px solid var(--theme-secondary-border) !important;
  background: var(--theme-secondary-bg) !important;
  color: var(--theme-text) !important;
  height: 46px !important;
  padding: 0 26px !important;
  font-weight: 600;
  backdrop-filter: blur(12px);
}

.hero-panel {
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 28px;
  padding: 24px 24px 20px;
  box-shadow: var(--theme-card-shadow);
}

.panel-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.4em;
  font-size: 11px;
  color: rgba(148, 163, 184, 0.8);
  margin-bottom: 8px;
}

.hero-panel h3 {
  margin: 0 0 16px;
  font-size: 22px;
}

.panel-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.panel-stat {
  background: var(--theme-chip-bg);
  border-radius: 16px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
}

.stat-label {
  font-size: 12px;
  color: var(--theme-muted);
  display: block;
  margin-top: 4px;
}

.feature-section {
  margin-top: 56px;
}

.section-head {
  margin-bottom: 24px;
}

.section-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.4em;
  font-size: 12px;
  color: rgba(148, 163, 184, 0.8);
}

.section-head h2 {
  font-size: 32px;
  margin: 8px 0 10px;
}

.section-lead {
  color: var(--theme-muted);
  max-width: 520px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

.feature-card {
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 24px;
  padding: 22px;
  box-shadow: var(--theme-card-shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 28px 60px rgba(2, 6, 23, 0.45);
}

.feature-icon {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--icon-bg);
  color: #fff;
  margin-bottom: 16px;
}

.feature-icon-svg {
  width: 24px;
  height: 24px;
}

.feature-card h3 {
  font-size: 18px;
  margin-bottom: 8px;
}

.feature-card p {
  color: var(--theme-muted);
  line-height: 1.6;
  font-size: 14px;
}

@media (max-width: 960px) {
  .page-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .home-content {
    padding: 100px 18px 140px;
  }

  .title-block h1 {
    font-size: 36px;
  }

  .panel-stats {
    grid-template-columns: 1fr;
  }
}
</style>
