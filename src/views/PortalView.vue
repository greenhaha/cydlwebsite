<template>
  <div class="portal-page">
    <div class="portal-bg">
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

    <PortalHeader />

    <div class="portal-shell">
      <div class="portal-content">
        <section id="portal-welcome" class="page-hero snap-section">
          <div class="title-block">
          <div class="title-eyebrow-row">
            <p class="eyebrow">{{ eyebrowText }}</p>
            <n-tag type="success" round size="small">{{ statusTag }}</n-tag>
          </div>
          <h1>{{ heroTitle }}</h1>
          <p class="lead">{{ heroLead }}</p>
          <div class="hero-actions">
            <router-link to="/home" class="inline-flex">
              <n-button type="primary" size="large" class="hero-primary-btn">
                {{ enterHomeText }}
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

        <section class="feature-section snap-section">
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

        <section id="portal-servers" class="portal-section snap-section">
        <div class="section-head section-head--row">
          <div>
            <p class="section-eyebrow">SERVERS</p>
            <h2>服务器详情展示</h2>
            <p class="section-lead">实时同步在线状态，支持一键查看详情与快速加入</p>
          </div>
        </div>
        <div v-if="portalServerConfigs.length" class="server-grid" aria-label="服务器列表">
          <ServerPreviewCard
            v-for="(server, idx) in portalServerDataList"
            :key="`portal-server-${idx}`"
            :server="server"
            :label="portalServerConfigs[idx]?.name || `社区服务器 ${String(idx + 1).padStart(2, '0')}`"
            :expandable="true"
            @expand="goToServerStatus"
          />
        </div>
        <div v-else class="portal-empty">暂无服务器配置</div>
        </section>

        <section id="portal-shortcuts" class="portal-section snap-section">
        <div class="section-head">
          <p class="section-eyebrow">SHORTCUTS</p>
          <h2>快捷入口</h2>
          <p class="section-lead">常用功能快速抵达</p>
        </div>
        <div class="shortcut-grid">
          <router-link
            v-for="item in shortcuts"
            :key="item.title"
            :to="item.to"
            class="shortcut-card"
          >
            <div class="shortcut-icon">
              <component :is="item.icon" class="shortcut-icon-svg" />
            </div>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </router-link>
        </div>
        </section>

        <section id="portal-account" class="portal-section snap-section">
        <div class="section-head">
          <p class="section-eyebrow">ACCOUNT</p>
          <h2>登录 / 注册</h2>
          <p class="section-lead">加入社区，解锁更多功能</p>
        </div>
        <div class="account-grid">
          <div class="account-actions">
            <router-link to="/login" class="inline-flex">
              <n-button size="large" type="primary" class="hero-primary-btn">登录</n-button>
            </router-link>
            <router-link to="/register" class="inline-flex">
              <n-button size="large" class="hero-secondary-btn">注册</n-button>
            </router-link>
          </div>
          <div class="account-rankings">
            <div class="ranking-card">
              <div class="ranking-head">
                <div>
                  <p class="ranking-eyebrow">STATS RANK</p>
                  <h3>数据统计排名</h3>
                </div>
                <span class="ranking-tag">TOP3</span>
              </div>
              <div v-if="isLoadingRankings" class="ranking-loading">加载中...</div>
              <div v-else class="ranking-columns">
                <div v-for="group in statRankingGroups" :key="group.title" class="ranking-column">
                  <p class="column-title">{{ group.title }}</p>
                  <div v-if="group.list.length === 0" class="ranking-empty">暂无数据</div>
                  <div
                    v-for="(player, index) in group.list"
                    :key="player.steamId + group.title"
                    class="ranking-row"
                  >
                    <span class="rank-index">{{ index + 1 }}</span>
                    <span class="rank-name">{{ player.playerName || '玩家' }}</span>
                    <span class="rank-value">{{ formatNumber(player.value) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="ranking-card">
              <div class="ranking-head">
                <div>
                  <p class="ranking-eyebrow">PLAYTIME</p>
                  <h3>游玩时长排名</h3>
                </div>
                <span class="ranking-tag">TOP5</span>
              </div>
              <div v-if="isLoadingPlaytime" class="ranking-loading">加载中...</div>
              <div v-else class="playtime-list">
                <div
                  v-for="(player, index) in playTimeRanking"
                  :key="player.steamId"
                  class="playtime-row"
                >
                  <span class="rank-index">{{ index + 1 }}</span>
                  <span class="rank-name">{{ player.playerName || '玩家' }}</span>
                  <span class="rank-value">{{ formatPlayTime(player.value) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
      </div>
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
  WomanSharp as ModelIcon,
  Heart as HeartIcon,
  PhonePortrait as PhonePortraitIcon,
} from '@vicons/ionicons5'
import PortalHeader from '@/components/Layout/PortalHeader.vue'
import ServerPreviewCard from '@/components/ServerStatus/ServerPreviewCard.vue'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { k4StatsApi, k4TimesApi, type K4PlayerRankingInfo, type K4TimesPlayerRankingInfo } from '@/services/api'
import { serverConfigs } from '@/const/servers'
import { useMultiServerStatus } from '@/composables/useMultiServerStatus'

const eyebrowText = 'HLYM社区 · CS2公益服务器'
const statusTag = '公益免费'
const heroTitle = 'HLYM CS2 公益服务器'
const heroLead = '面向所有 CS2 玩家，永久免费开放'
const enterHomeText = '进入主页'
const joinGroupText = '加入QQ交流群'

const panelEyebrow = 'Live Stats'
const panelTitle = '丰富内容，持续更新'

const stats = [
  { label: '地图', value: '100+' },
  { label: '模型', value: '150+' },
  { label: '自定义内容', value: '80+' },
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
    desc: '主营娱乐对抗，多地图轮换，空闲时自动更换闯关图池',
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

const shortcuts = [
  { title: '模型图鉴', desc: '皮肤与模型预览', to: '/models', icon: ModelIcon },
  { title: '贡献者', desc: '支持社区建设', to: '/contribute', icon: HeartIcon },
  { title: 'APP下载', desc: '安卓客户端入口', to: '/app-download', icon: PhonePortraitIcon },
]

const isLoadingRankings = ref(true)
const isLoadingPlaytime = ref(true)
const killsRanking = ref<K4PlayerRankingInfo[]>([])
const shootsRanking = ref<K4PlayerRankingInfo[]>([])
const grenadesRanking = ref<K4PlayerRankingInfo[]>([])
const playTimeRanking = ref<K4TimesPlayerRankingInfo[]>([])

const statRankingGroups = computed(() => [
  { title: '击杀数', list: killsRanking.value },
  { title: '开火数', list: shootsRanking.value },
  { title: '道具数', list: grenadesRanking.value },
])

const formatNumber = (value: number | undefined) => {
  if (value === null || value === undefined) return '--'
  return Number.isFinite(value) ? Number(value).toLocaleString() : '--'
}

const formatPlayTime = (seconds: number | undefined): string => {
  if (!seconds || seconds <= 0) return '--'
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  if (hours >= 24) {
    const days = Math.floor(hours / 24)
    const remainingHours = hours % 24
    return `${days}天${remainingHours}小时`
  }
  if (hours > 0) {
    return `${hours}小时${minutes}分钟`
  }
  return `${minutes}分钟`
}

const loadRankings = async () => {
  isLoadingRankings.value = true
  try {
    const [killsResp, shootsResp, grenadesResp] = await Promise.all([
      k4StatsApi.getKillsRanking(3),
      k4StatsApi.getShootsRanking(3),
      k4StatsApi.getGrenadesRanking(3),
    ])
    killsRanking.value = killsResp.success && killsResp.data ? killsResp.data.rankings.slice(0, 3) : []
    shootsRanking.value = shootsResp.success && shootsResp.data ? shootsResp.data.rankings.slice(0, 3) : []
    grenadesRanking.value = grenadesResp.success && grenadesResp.data ? grenadesResp.data.rankings.slice(0, 3) : []
  } catch (e) {
    console.error('加载数据统计排名失败', e)
    killsRanking.value = []
    shootsRanking.value = []
    grenadesRanking.value = []
  } finally {
    isLoadingRankings.value = false
  }
}

const loadPlaytime = async () => {
  isLoadingPlaytime.value = true
  try {
    const resp = await k4TimesApi.getPlayTimeRanking(5)
    playTimeRanking.value = resp.success && resp.data ? resp.data.rankings.slice(0, 5) : []
  } catch (e) {
    console.error('加载游玩时长排名失败', e)
    playTimeRanking.value = []
  } finally {
    isLoadingPlaytime.value = false
  }
}

onMounted(() => {
  loadRankings()
  loadPlaytime()
})

const portalServerConfigs = serverConfigs.filter((config) => config.address?.trim())
const portalServerAddresses = portalServerConfigs.map((config) => config.address.trim())
const { serverDataList: portalServerDataList } = useMultiServerStatus(portalServerAddresses)
const router = useRouter()

const goToQQGroup = () => {
  window.open(
    'https://qm.qq.com/cgi-bin/qm/qr?k=Sh4gcapxVV57FqXxe7ZU07-v9u8YvKVN&jump_from=webapi&authKey=HiFkDO97IWzVgJEO6SWn59U3r7vJPEfvGNq8+Y4RVgOHFRN8+CB9WhpjYJmRvyky',
    '_blank'
  )
}

const goToServerStatus = () => {
  router.push('/server-status').then(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  })
}
</script>

<style scoped>
.portal-page {
  position: relative;
  min-height: 100vh;
  color: var(--theme-text);
}

.portal-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
}

.portal-bg video {
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

.portal-shell {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 104px 28px 140px;
}

.portal-content {
  min-width: 0;
}

.snap-section {
  padding: 72px 0;
  scroll-margin-top: 96px;
}

.page-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 32px;
  align-items: center;
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

.hero-primary-btn {
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

.section-head {
  margin-bottom: 24px;
}

.section-head--row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
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

.server-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 320px));
  gap: 18px;
  margin-top: 12px;
}

.portal-empty {
  padding: 24px 18px;
  border-radius: 18px;
  border: 1px dashed var(--theme-border);
  background: var(--theme-secondary-bg);
  color: var(--theme-muted);
  text-align: center;
  margin-top: 12px;
}

.shortcut-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

.shortcut-card {
  display: flex;
  gap: 14px;
  align-items: center;
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 20px;
  padding: 18px;
  box-shadow: var(--theme-card-shadow);
  color: var(--theme-text);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.shortcut-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 22px 50px rgba(2, 6, 23, 0.4);
}

.shortcut-icon {
  width: 46px;
  height: 46px;
  border-radius: 16px;
  background: rgba(148, 163, 184, 0.2);
  color: var(--theme-text);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.shortcut-icon-svg {
  width: 22px;
  height: 22px;
}

.shortcut-card h3 {
  margin: 0 0 4px;
  font-size: 16px;
}

.shortcut-card p {
  margin: 0;
  font-size: 13px;
  color: var(--theme-muted);
}

.account-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: stretch;
}

.account-actions {
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex-wrap: wrap;
  align-self: flex-start;
}

.account-rankings {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.ranking-card {
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 22px;
  padding: 18px 18px 16px;
  box-shadow: var(--theme-card-shadow);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ranking-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.ranking-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.28em;
  font-size: 10px;
  color: var(--theme-muted);
}

.ranking-head h3 {
  margin: 6px 0 0;
  font-size: 18px;
}

.ranking-tag {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--theme-border);
  background: var(--theme-secondary-bg);
  font-size: 11px;
  color: var(--theme-text);
  font-weight: 600;
}

.ranking-loading,
.ranking-empty {
  color: var(--theme-muted);
  font-size: 12px;
  padding: 8px 0;
}

.ranking-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}

.ranking-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.column-title {
  font-size: 12px;
  letter-spacing: 0.18em;
  color: var(--theme-muted);
  text-transform: uppercase;
}

.ranking-row,
.playtime-row {
  display: grid;
  grid-template-columns: 20px 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 12px;
  background: var(--theme-secondary-bg);
  border: 1px solid var(--theme-border);
}

.rank-index {
  font-size: 12px;
  font-weight: 700;
  color: var(--theme-text);
}

.rank-name {
  font-size: 13px;
  color: var(--theme-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rank-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--theme-muted);
}

.playtime-list {
  display: grid;
  gap: 10px;
}

.ghost-btn {
  border-radius: 999px !important;
  border: 1px solid var(--theme-border) !important;
  background: var(--theme-secondary-bg) !important;
  color: var(--theme-text) !important;
  font-weight: 600;
}

@media (max-width: 960px) {
  .snap-section {
    padding: 56px 0;
  }

  .page-hero {
    grid-template-columns: 1fr;
  }

  .portal-shell {
    padding: 96px 18px 120px;
  }

  .account-rankings {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .title-block h1 {
    font-size: 36px;
  }

  .panel-stats {
    grid-template-columns: 1fr;
  }

  .server-grid {
    grid-template-columns: 1fr;
  }
}
</style>
