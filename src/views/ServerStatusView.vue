<template>
  <div class="server-status-page">
    <div class="status-bg">
      <div class="status-bg-image" :style="{ backgroundImage: `url(${bgImageUrl})` }"></div>
      <div class="bg-overlay"></div>
    </div>

    <div class="server-status-content">
      <section class="page-hero">
        <div class="title-block">
          <div class="title-eyebrow-row">
            <p class="eyebrow">SERVER STATUS</p>
            <n-tag
              v-if="totalServers > 0"
              :type="onlineServers === totalServers ? 'success' : 'warning'"
              round
              size="small"
            >
              {{ showErrorState ? '--' : onlineServers }}/{{ showErrorState ? '--' : totalServers }} 在线
            </n-tag>
          </div>
          <h1>服务器状态</h1>
          <p class="lead">实时查看在线情况、负载占比与延迟走势，快速加入社区服务器</p>
          <div class="hero-actions">
            <n-button type="primary" size="large" class="hero-refresh-btn" :loading="loading" @click="handleRefresh">
              立即刷新
            </n-button>
            <span class="hero-meta">上次更新 {{ lastUpdated || '--' }}</span>
            <a class="hero-link" href="https://servers.upkk.com/swagger/" target="_blank" rel="noopener">预览图来自 Upkk·公开API</a>
          </div>
        </div>
        <div v-if="showSummary" class="hero-util-card">
          <div class="hero-util-grid">
            <span class="hero-util-label-cell">{{ labelUtilization }}</span>
            <span class="hero-util-label-cell">{{ labelTotalServers }}</span>
            <span class="hero-util-label-cell">{{ labelTotalPlayers }}</span>

            <span
              v-if="!showErrorState"
              class="hero-util-value-cell"
              :style="{ color: utilizationColor }"
            >
              {{ utilizationPercent.toFixed(0) }}%
            </span>
            <span v-else class="hero-util-value-cell hero-util-error">{{ labelUtilError }}</span>
            <span class="hero-util-stat-value">{{ totalServersText }}</span>
            <span class="hero-util-stat-value">{{ totalPlayersText }}</span>
          </div>
          <div
            v-if="!showErrorState && totalMaxPlayers > 0"
            class="hero-util-bar"
            role="progressbar"
            :aria-valuenow="Math.round(utilizationPercent)"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div class="hero-util-inner" :style="{ width: utilizationPercent + '%', background: utilizationColor }"></div>
          </div>
        </div>
      </section>

      <section class="status-section">
  <div class="status-card">
    <div v-if="serverDataList.length > 0" class="preview-grid" aria-label="服务器列表">
      <ServerPreviewCard
        v-for="(sd, idx) in serverDataList"
        :key="idx"
        :server="sd"
        :label="serverConfigs[idx].name"
        :expandable="true"
        @expand="openDetail(idx)"
      />
    </div>
    <div v-else-if="loading" class="preview-skeleton-grid" aria-hidden="true">
      <div class="preview-skel" v-for="n in 2" :key="n">
        <div class="skel-line h14 w70" />
        <div class="skel-line h10 w110" />
        <div class="skel-line h10 w150" />
      </div>
    </div>
    <div v-else class="empty-state">暂无可用服务器数据</div>

    <teleport to="body">
      <transition name="detail-fade">
        <div v-if="detailIndex !== null" class="detail-overlay" @click.self="closeDetail">
          <div
            class="detail-panel"
            ref="detailPanelRef"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="'server-detail-title'"
          >
            <div class="detail-header">
              <div class="detail-title">
                <p class="detail-eyebrow">SERVER DETAIL</p>
                <h3 id="server-detail-title">{{ serverConfigs[detailIndex].name }}</h3>
              </div>
              <button class="close-btn" ref="closeBtnRef" @click="closeDetail" aria-label="关闭详情">×</button>
            </div>

            <div class="detail-content" v-if="selectedServer">
              <div class="detail-grid">
                <div class="detail-card detail-card--hero">
                  <div class="detail-status-row">
                    <span class="detail-pill" :class="selectedServer.online ? 'is-online' : 'is-offline'">
                      {{ selectedServer.online ? '在线' : '离线' }}
                    </span>
                    <span class="detail-ping">PING {{ selectedPingText }}</span>
                  </div>
                  <div class="detail-main">
                    <h4 class="detail-name">{{ selectedName }}</h4>
                    <p class="detail-sub">地图: {{ selectedMap }}</p>
                  </div>
                  <div class="detail-metrics-row">
                    <div class="detail-metrics">
                      <div class="detail-metric"><span>玩家</span><strong>{{ selectedPlayersText }}</strong></div>
                      <div class="detail-metric"><span>BOT</span><strong>{{ selectedBots }}</strong></div>
                      <div class="detail-metric"><span>版本</span><strong>{{ selectedVersion }}</strong></div>
                    </div>
                    <n-button
                      class="join-server-btn"
                      size="small"
                      type="primary"
                      :disabled="!canJoinServer"
                      @click="handleJoinServer"
                    >
                      {{ labelJoinServer }}
                    </n-button>
                  </div>
                </div>

                <div class="detail-card">
                  <h4 class="card-title">连接信息</h4>
                  <div class="info-list">
                    <div class="info-row"><span>地址</span><strong>{{ selectedAddress || '--' }}</strong></div>
                    <div class="info-row"><span>VAC</span><strong>{{ selectedServer.vacEnabled ? '开启' : '关闭' }}</strong></div>
                    <div class="info-row"><span>密码</span><strong>{{ selectedServer.passwordProtected ? '需要' : '无' }}</strong></div>
                    <div class="info-row"><span>反作弊</span><strong>{{ selectedServer.antiCheat || '--' }}</strong></div>
                  </div>
                </div>

                <div class="detail-card">
                  <h4 class="card-title">{{ labelPlayerList }}</h4>
                  <div v-if="selectedServer.online && selectedServer.playerList.length > 0" class="player-table">
                    <div class="player-row player-head">
                      <span>{{ labelPlayerName }}</span>
                      <span>{{ labelPlayerScore }}</span>
                      <span>{{ labelPlayerTime }}</span>
                    </div>
                    <div class="player-row" v-for="(p, idx) in selectedServer.playerList" :key="idx">
                      <span>{{ p.name }}</span>
                      <span>{{ p.score }}</span>
                      <span>{{ formatPlayerTime(p.time) }}</span>
                    </div>
                  </div>
                  <p v-else class="player-empty">{{ labelNoPlayers }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { NButton, NTag, useMessage } from 'naive-ui'
import { useMultiServerStatus } from '@/composables/useMultiServerStatus'
import ServerPreviewCard from '@/components/ServerStatus/ServerPreviewCard.vue'

// 配置需要展示的服务器地址（可扩展）
// 服务器配置：名称 + 地址；空地址表示占位待配置
interface ServerConfig { name: string; address: string }
const serverConfigs: ServerConfig[] = [
  { name: 'CS2-娱乐对抗', address: '110.42.41.225:27015' }
]
const serverAddresses = serverConfigs.map(c => c.address)
const bgImageUrl = 'https://hlympic.oss-cn-beijing.aliyuncs.com/frontend/assets/image/bg5.gif'

const { loading, error, serverDataList, lastUpdated, fetchServers } = useMultiServerStatus(serverAddresses)
const message = useMessage()
const labelUtilization = '\u6574\u4f53\u5229\u7528\u7387'
const labelUtilError = '\u65e0\u6cd5\u83b7\u53d6\u670d\u52a1\u5668\u72b6\u6001'
const labelTotalServers = '\u603b\u670d\u52a1\u5668'
const labelTotalPlayers = '\u603b\u4eba\u6570'
const labelPlayerList = '\u73a9\u5bb6\u5217\u8868'
const labelPlayerName = '\u73a9\u5bb6'
const labelPlayerScore = '\u5f97\u5206'
const labelPlayerTime = '\u65f6\u957f'
const labelNoPlayers = '\u6682\u65e0\u5728\u7ebf\u73a9\u5bb6'
const formatPlayerTime = (value: number | undefined) => {
  if (typeof value !== 'number' || Number.isNaN(value)) return '--'
  const total = Math.max(0, Math.floor(value))
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}:${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
const labelJoinServer = '\u52a0\u5165\u670d\u52a1\u5668'

// 折叠视图逻辑已移除（预览卡取代）

const totalServers = computed(() => serverDataList.value.length)
const onlineServers = computed(() => serverDataList.value.filter(s => s.online).length)
const totalPlayers = computed(() => serverDataList.value.reduce((sum, s) => sum + (s.players || 0), 0))
const totalMaxPlayers = computed(() => serverDataList.value.reduce((sum, s) => sum + (s.maxPlayers || 0), 0))
// 颜色标签胶囊已移除，avgPingTagType 不再需要
const utilizationPercent = computed(() => totalMaxPlayers.value ? (totalPlayers.value / totalMaxPlayers.value) * 100 : 0)
// 利用率颜色（方案A）：空闲=绿(#10B981) 中等=蓝(#3B82F6) 偏高=橙(#F59E0B) 高危=红(#DC2626)
// 阈值区间：0-39 绿（空闲/健康） | 40-74 蓝（中等） | 75-89 橙（偏高） | 90+ 红（高危）
const utilizationColor = computed(() => {
  const v = utilizationPercent.value
  if (v >= 90) return 'rgba(37, 99, 235, 0.95)'
  if (v >= 75) return 'rgba(59, 130, 246, 0.85)'
  if (v >= 40) return 'rgba(96, 165, 250, 0.75)'
  return 'rgba(147, 197, 253, 0.65)'
})
// 允许部分服务器已返回就先显示概要与卡片，loading 期间已有数据也展示
const showErrorState = computed(() => !!error.value && !loading.value && serverDataList.value.length === 0)

const totalServersText = computed(() => (showErrorState.value ? '--' : String(totalServers.value)))
const totalPlayersText = computed(() => {
  if (showErrorState.value) return '--'
  return totalMaxPlayers.value ? `${totalPlayers.value}/${totalMaxPlayers.value}` : `${totalPlayers.value}/--`
})

const showSummary = computed(() => {
  if (serverDataList.value.length) return true
  return showErrorState.value
})

// 刷新封装：带成功/失败提示
const handleRefresh = async () => {
  if (loading.value) return
  const loadingMsg = message.loading('刷新中...', { duration: 0 })
  const prevError = error.value
  try {
    await fetchServers()
    // 不再显示成功提示，仅在失败时提示错误
    if (error.value && error.value !== prevError) {
      message.error(`刷新失败: ${error.value}`)
    }
  } catch {
    message.error('刷新过程中出现异常')
  } finally {
    // 结束后关闭 "刷新中..." 提示
    loadingMsg.destroy()
  }
}

// 详情展开逻辑
const detailIndex = ref<number | null>(null)
const detailPanelRef = ref<HTMLElement | null>(null)
const closeBtnRef = ref<HTMLButtonElement | null>(null)
let previouslyFocused: HTMLElement | null = null

const selectedServer = computed(() => (detailIndex.value !== null ? serverDataList.value[detailIndex.value] : null))
const selectedConfig = computed(() => (detailIndex.value !== null ? serverConfigs[detailIndex.value] : null))
const selectedAddress = computed(() => (detailIndex.value !== null ? serverAddresses[detailIndex.value] : ''))
const selectedName = computed(() => selectedServer.value?.name || selectedConfig.value?.name || '服务器')
const selectedMap = computed(() => selectedServer.value?.map || '未知地图')
const selectedVersion = computed(() => selectedServer.value?.version || '--')
const selectedBots = computed(() => (selectedServer.value ? selectedServer.value.bots : 0))
const selectedPlayersText = computed(() => {
  const s = selectedServer.value
  if (!s) return '--'
  const max = s.maxPlayers || 0
  return max ? `${s.players}/${max}` : `${s.players}/--`
})
const selectedPingText = computed(() => {
  const s = selectedServer.value
  const v = s ? (s.ping ?? s.queryDuration) : null
  return v != null ? `${v}ms` : '--'
})

const canJoinServer = computed(() => {
  const addr = selectedAddress.value?.trim()
  if (!addr) return false
  if (addr.includes('\u5f85\u516c\u5f00')) return false
  return !!selectedServer.value?.online
})
const handleJoinServer = () => {
  if (!canJoinServer.value) {
    message.info('\u670d\u52a1\u5668\u5730\u5740\u672a\u516c\u5f00\u6216\u5f53\u524d\u79bb\u7ebf')
    return
  }
  const addr = selectedAddress.value.trim()
  window.location.href = `steam://connect/${addr}`
}

const openDetail = (idx: number) => {
  previouslyFocused = document.activeElement as HTMLElement | null
  detailIndex.value = idx
}
const closeDetail = () => {
  detailIndex.value = null
}

function focusFirstInPanel() {
  requestAnimationFrame(() => {
    closeBtnRef.value?.focus()
  })
}

function trapFocus(e: KeyboardEvent) {
  if (e.key !== 'Tab') return
  const panel = detailPanelRef.value
  if (!panel) return
  const focusable = Array.from(panel.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )).filter(el => !el.hasAttribute('disabled'))
  if (!focusable.length) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') { e.preventDefault(); closeDetail() }
  else if (e.key === 'Tab') trapFocus(e)
}

// 锁定滚动
watch(detailIndex, (v) => {
  const cls = 'no-scroll'
  if (v !== null) {
    document.documentElement.classList.add(cls)
    document.body.classList.add(cls)
    window.addEventListener('keydown', onKeydown)
    focusFirstInPanel()
  } else {
    document.documentElement.classList.remove(cls)
    document.body.classList.remove(cls)
    window.removeEventListener('keydown', onKeydown)
// 关闭后回焦先前元素或相应预览卡
    if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
      previouslyFocused.focus()
    } else if (previouslyFocused === null && typeof detailIndex.value === 'number') {
      const cards = document.querySelectorAll<HTMLElement>('.preview-card')
      if (cards[detailIndex.value]) cards[detailIndex.value].focus()
    }
  }
})
onUnmounted(() => {
  document.documentElement.classList.remove('no-scroll')
  document.body.classList.remove('no-scroll')
  window.removeEventListener('keydown', onKeydown)
})


</script>

<style scoped>
.server-status-page {
  position: relative;
  min-height: 100vh;
  color: var(--theme-text);
  overflow: hidden;
}

.status-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
}

.status-bg-image {
  position: absolute;
  inset: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  filter: var(--theme-video-filter);
}

.bg-overlay {
  position: absolute;
  inset: 0;
  background: var(--theme-overlay);
}

.server-status-content {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 120px 28px 160px;
}

.page-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 32px;
  align-items: center;
  margin-bottom: 36px;
}






.hero-util-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.6fr 0.8fr;
  column-gap: 16px;
  row-gap: 6px;
  align-items: baseline;
}

.hero-util-label-cell {
  font-size: 12px;
  color: var(--theme-muted);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.hero-util-value-cell {
  font-size: 28px;
  font-weight: 700;
}

.hero-util-stat-value {
  font-size: 28px;
  font-weight: 600;
  color: var(--theme-text);
  text-align: left;
}

.hero-util-card {




  width: 320px;
  max-width: 100%;
  padding: 18px 20px;
  border-radius: 18px;
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  box-shadow: var(--theme-card-shadow);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hero-util-label {
  font-size: 12px;
  color: var(--theme-muted);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.hero-util-value {
  font-size: 28px;
  font-weight: 700;
}

.hero-util-error {
  font-size: 12px;
  color: #f87171;
  line-height: 1.4;
}

.hero-util-bar {
  height: 14px;
  border-radius: 999px;
  background: var(--theme-secondary-bg);
  overflow: hidden;
  box-shadow: inset 0 0 0 1px var(--theme-border);
}

.hero-util-inner {
  height: 100%;
  border-radius: inherit;
}







.title-block h1 {
  font-size: 48px;
  margin: 12px 0 10px;
  letter-spacing: 1px;
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

.title-block .lead {
  color: var(--theme-muted);
  max-width: 620px;
  line-height: 1.6;
  margin-bottom: 18px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.hero-refresh-btn {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%) !important;
  border: none !important;
  border-radius: 999px !important;
  padding: 0 30px !important;
  height: 46px !important;
  font-weight: 700;
  box-shadow: 0 14px 32px rgba(37, 99, 235, 0.35);
}

.hero-meta {
  font-size: 12px;
  color: var(--theme-muted);
}

.hero-link {
  font-size: 12px;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
}

.hero-link:hover {
  color: #60a5fa;
  text-decoration: underline;
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

.status-section {
  margin-top: 8px;
}

.status-card {
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
  backdrop-filter: none;
}

.summary-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 24px;
  padding: 16px 20px 18px;
  background: var(--theme-secondary-bg) !important;
  border: 1px solid var(--theme-border) !important;
  border-radius: 18px;
  position: relative;
  color: var(--theme-text) !important;
}

.summary-item {
  display: flex;
  flex-direction: column;
  min-width: 120px;
}

.summary-item .label,
.metric-line .total,
.metric-line .sep {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--theme-muted) !important;
}

.metric-line {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-variant-numeric: tabular-nums;
}

.metric-line .val {
  font-size: 20px;
  font-weight: 600;
  color: var(--theme-text) !important;
}

.utilization {
  flex: 1 1 220px;
  min-width: 200px;
}

.util-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.util-num {
  font-size: 28px;
  font-weight: 600;
}

.util-error {
  color: var(--theme-muted);
  font-size: 12px;
  font-weight: 600;
}


.util-bar {
  position: relative;
  height: 22px;
  background: var(--theme-secondary-bg) !important;
  border-radius: 999px;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px var(--theme-border);
}

.util-bar.zero {
  background: repeating-linear-gradient(45deg, var(--theme-secondary-bg) 0 12px, var(--theme-card-bg) 12px 24px) !important;
}

.util-inner {
  height: 100%;
  width: 0;
  border-radius: 999px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.summary-refresh-btn {
  margin-left: auto;
  align-self: center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(147, 51, 234, 0.95)) !important;
  border: none !important;
  color: #fff !important;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 10px 24px rgba(37, 99, 235, 0.28);
}

.summary-refresh-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 16px 30px rgba(124, 58, 237, 0.32);
}

.summary-refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 320px));
  justify-content: start;
  align-items: start;
  gap: 18px;
  margin-top: 12px;
  margin-bottom: 30px;
}

.empty-state {
  padding: 28px;
  text-align: center;
  color: var(--theme-muted);
  border: 1px dashed var(--theme-border);
  border-radius: 18px;
  background: var(--theme-secondary-bg);
}

.skeleton-blocks {
  margin-bottom: 32px;
  pointer-events: none;
}

.summary-skeleton {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-bottom: 28px;
  padding: 16px 20px 18px;
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 18px;
  position: relative;
  overflow: hidden;
}

.summary-skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 45%, rgba(255,255,255,0) 70%);
  animation: skel-sweep 2.2s ease-in-out infinite;
}

.metric-skel {
  width: 120px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skel-num,
.skel-label,
.skel-line {
  border-radius: 6px;
  background: linear-gradient(90deg, rgba(148,163,184,0.18) 0%, rgba(148,163,184,0.32) 50%, rgba(148,163,184,0.18) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.6s linear infinite;
}

.skel-num {
  height: 18px;
  width: 78px;
}

.skel-num.sm {
  width: 36px;
  height: 14px;
}

.skel-label {
  height: 14px;
  width: 64px;
  opacity: 0.8;
}

.skel-label.short {
  width: 54px;
}

.util-skel {
  flex: 1 1 260px;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.util-head-skel {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.util-bar-skel {
  position: relative;
  height: 22px;
  border-radius: 999px;
  background: var(--theme-secondary-bg);
  overflow: hidden;
  box-shadow: inset 0 0 0 1px var(--theme-border);
}

.util-bar-skel .fill {
  position: absolute;
  inset: 0;
  width: 55%;
  background: linear-gradient(90deg, rgba(59,130,246,0.35), rgba(147,51,234,0.35));
  background-size: 300% 100%;
  animation: barFlow 2.4s ease-in-out infinite;
  border-radius: 999px;
}

.refresh-skel {
  width: 40px;
  height: 40px;
  border: 1px solid var(--theme-border);
  background: var(--theme-card-bg);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.refresh-skel::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 100%);
  animation: shimmer 1.5s linear infinite;
}

.preview-skeleton-grid {
  display: flex;
  gap: 20px 22px;
  flex-wrap: wrap;
}

.preview-skel {
  width: 260px;
  height: 86px;
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 18px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.preview-skel::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.3), rgba(255,255,255,0));
  animation: skel-sweep 1.4s ease-in-out infinite;
}

.skel-line.h14 {
  height: 14px;
}

.skel-line.h10 {
  height: 14px;
}

.skel-line.w70 {
  width: 70px;
}

.skel-line.w110 {
  width: 110px;
}

.skel-line.w150 {
  width: 150px;
}

@keyframes shimmer {
  to {
    background-position: -200% 0;
  }
}

@keyframes skel-sweep {
  0% {
    transform: translateX(-100%);
  }
  60% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes barFlow {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.detail-overlay {
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at top, rgba(49, 46, 129, 0.35), rgba(2, 6, 23, 0.8));
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 18px;
  z-index: 4000;
}

.detail-panel {
  width: 100%;
  max-width: 960px;
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 30px;
  box-shadow: var(--theme-card-shadow);
  padding: 32px 36px 40px;
  position: relative;
  max-height: calc(100vh - 96px);
  display: flex;
  flex-direction: column;
  color: var(--theme-text);
}

.detail-content {
  flex: 1;
  overflow-y: auto;
  margin-top: 8px;
  padding-right: 4px;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
}

.detail-card {
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 20px;
  padding: 18px 20px;
  box-shadow: none;
  color: var(--theme-text);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.detail-card--hero {
  grid-column: 1 / -1;
  gap: 16px;
}

.detail-card--wide {
  grid-column: 1 / -1;
}

.detail-status-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.detail-pill {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid transparent;
}

.detail-pill.is-online {
  color: #22c55e;
  background: rgba(34, 197, 94, 0.15);
  border-color: rgba(34, 197, 94, 0.4);
}

.detail-pill.is-offline {
  color: #94a3b8;
  background: rgba(148, 163, 184, 0.2);
  border-color: rgba(148, 163, 184, 0.35);
}

.detail-ping {
  font-size: 12px;
  color: var(--theme-muted);
}

.detail-util {
  font-size: 28px;
  font-weight: 600;
}

.detail-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-name {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.detail-sub {
  margin: 0;
  color: var(--theme-muted);
  font-size: 12px;
}



.detail-metrics-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.detail-metrics {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.detail-metric {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: var(--theme-muted);
}

.detail-metric strong {
  color: var(--theme-text);
  font-size: 28px;
  font-weight: 600;
}

.card-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--theme-muted);
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 12px;
  color: var(--theme-muted);
}

.info-row strong {
  color: var(--theme-text);
  font-weight: 600;
}

.join-server-btn {
  align-self: flex-start;
  flex-shrink: 0;
  border-radius: 999px !important;
  padding: 0 18px !important;
  height: 36px !important;
  font-weight: 600;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(147, 51, 234, 0.95)) !important;
  border: none !important;
  box-shadow: 0 10px 22px rgba(37, 99, 235, 0.28);
}


.detail-card--hero .join-server-btn {
  margin-top: 10px;
  align-self: flex-end;
}
.join-server-btn:disabled {
  opacity: 0.6;
  box-shadow: none;
}

.player-empty {
  margin: 0;
  font-size: 12px;
  color: var(--theme-muted);
}

.player-table {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.player-row {
  display: grid;
  grid-template-columns: 1.2fr 0.6fr 0.6fr;
  gap: 12px;
  font-size: 12px;
  color: var(--theme-text);
}

.player-row span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player-head {
  font-size: 12px;
  color: var(--theme-muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}


.detail-title {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.detail-eyebrow {
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: var(--theme-muted);
}

.detail-header h3 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: var(--theme-text);
}

.detail-content :deep(.n-card .n-card__header) {
  border-bottom: 1px solid var(--theme-border);
}

.detail-content :deep(.n-card) {
  background: var(--theme-card-bg) !important;
  border: 1px solid var(--theme-border) !important;
  box-shadow: none;
  color: var(--theme-text);
}

.detail-content :deep(.n-card .n-card__content) {
  color: var(--theme-text);
}

.detail-content :deep(.n-statistic__label) {
  color: var(--theme-muted);
}

.close-btn {
  border: 1px solid var(--theme-border);
  background: var(--theme-secondary-bg);
  width: 40px;
  height: 40px;
  border-radius: 12px;
  font-size: 22px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--theme-text);
}

.close-btn:active {
  transform: scale(0.92);
}



.no-scroll {
  overflow: hidden !important;
}

@media (max-width: 960px) {
  .page-hero {
    grid-template-columns: 1fr;
  }

    .server-status-content {
    padding: 100px 18px 140px;
  }
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .hero-util-card {




    width: 100%;
  }

}

@media (max-width: 640px) {
  .title-block h1 {
    font-size: 36px;
  }

  .preview-grid {
    grid-template-columns: 1fr;
    justify-content: stretch;
    gap: 14px;
  }


.detail-metrics {
    grid-template-columns: 1fr;
  }

  .detail-card {
    padding: 16px;
  }


  .detail-metrics-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .join-server-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
