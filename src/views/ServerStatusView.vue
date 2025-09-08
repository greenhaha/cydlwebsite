<template>
  <div class="server-status-page">
    <!-- 背景层：固定，不影响导航和底部声明 -->
    <div class="status-bg fixed inset-0 w-full h-full pointer-events-none">
      <div class="status-bg-image absolute inset-0"></div>
    </div>
    <div class="server-status-container">
  <div class="server-status-card fade-in-card">
      <ServerStatusHeader :loading="loading" @refresh="fetchServers" />
      <n-divider />
  <LoadingErrorState :loading="loading" :error="error" :has-data="serverDataList.length > 0" @retry="fetchServers" />
  <div v-if="!loading && serverDataList.length" class="summary-bar" aria-live="polite">
        <div class="summary-item">
          <span class="label">在线服务器</span>
          <n-tag :type="onlineServers > 0 ? 'success' : 'error'" size="small" round>
            <span class="metric-val" :key="onlineServers">{{ onlineServers }}</span>/{{ totalServers }}
          </n-tag>
        </div>
        <div class="summary-item">
          <span class="label">玩家总数</span>
          <n-tag type="info" size="small" round>
            <span class="metric-val" :key="totalPlayers">{{ totalPlayers }}</span>/{{ totalMaxPlayers }}
          </n-tag>
        </div>
        <div class="summary-item">
          <span class="label">平均 Ping</span>
          <n-tag :type="avgPingTagType" size="small" round>
            <span class="metric-val" :key="avgPingDisplay">{{ avgPingDisplay }}</span>
          </n-tag>
        </div>
        <div class="summary-item utilization" v-if="totalMaxPlayers > 0">
          <span class="label">整体利用率</span>
          <div class="util-bar" :class="{ zero: utilizationPercent === 0 }">
            <div class="util-inner" :style="{ width: utilizationPercent + '%', background: utilizationColor }"></div>
            <span class="util-text"><span class="metric-val" :key="utilizationPercent.toFixed(0)">{{ utilizationPercent.toFixed(0) }}</span>%</span>
          </div>
        </div>
      </div>

  <div v-if="!loading && serverDataList.length" class="preview-grid" aria-label="服务器列表">
        <ServerPreviewCard
          v-for="(sd, idx) in serverDataList"
          :key="idx"
          :server="sd"
          :label="serverConfigs[idx].name"
          :expandable="true"
          @expand="openDetail(idx)"
        />
      </div>

      <div v-else-if="loading" class="skeleton-blocks">
        <div class="summary-skeleton" aria-hidden="true">
          <div class="line w120" /><div class="line w140" /><div class="line w100" /><div class="line w200" />
        </div>
        <div class="preview-skeleton-grid" aria-hidden="true">
          <div class="preview-skel" v-for="n in 2" :key="n">
            <div class="skel-line h14 w70" /><div class="skel-line h10 w110" /><div class="skel-line h10 w150" />
          </div>
        </div>
      </div>

      <teleport to="body">
        <transition name="detail-fade">
          <div v-if="detailIndex !== null" class="detail-overlay" @click.self="closeDetail">
            <div class="detail-panel" ref="detailPanelRef" role="dialog" aria-modal="true" :aria-labelledby="'server-detail-title'">
              <div class="detail-header">
                <h3 id="server-detail-title">{{ serverConfigs[detailIndex].name }}</h3>
                <button class="close-btn" ref="closeBtnRef" @click="closeDetail" aria-label="关闭详情">×</button>
              </div>
              <div class="detail-content">
                <n-grid
                  :cols="1"
                  :x-gap="16"
                  :y-gap="12"
                  responsive="screen"
                  :item-responsive="true"
                  :collapsed-rows="2"
                  :cols-xl="2"
                  :cols-lg="2"
                  :cols-md="1"
                  :cols-sm="1"
                  :cols-xs="1"
                >
                  <n-grid-item :span="1" :xl-span="2" :lg-span="2" :md-span="1" :sm-span="1" :xs-span="1">
                    <ServerStatusCard :server-data="serverDataList[detailIndex]" />
                  </n-grid-item>
                  <n-grid-item :span="1" :xl-span="1" :lg-span="1" :md-span="1" :sm-span="1" :xs-span="1">
                    <ServerInfoCard :server-data="serverDataList[detailIndex]" />
                  </n-grid-item>
                  <n-grid-item :span="1" :xl-span="1" :lg-span="1" :md-span="1" :sm-span="1" :xs-span="1">
                    <PlayerInfoCard :server-data="serverDataList[detailIndex]" />
                  </n-grid-item>
                  <n-grid-item :span="1" :xl-span="2" :lg-span="2" :md-span="1" :sm-span="1" :xs-span="1">
                    <ConnectionCard :server-data="serverDataList[detailIndex]" :server-address="serverAddresses[detailIndex]" />
                  </n-grid-item>
                  <n-grid-item v-if="serverDataList[detailIndex].online && serverDataList[detailIndex].playerList.length > 0" :span="1" :xl-span="2" :lg-span="2" :md-span="1" :sm-span="1" :xs-span="1">
                    <PlayerList :player-list="serverDataList[detailIndex].playerList" />
                  </n-grid-item>
                </n-grid>
              </div>
            </div>
          </div>
        </transition>
      </teleport>

    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { NGrid, NGridItem, NDivider } from 'naive-ui'
import { ServerStatusCard, ServerInfoCard, PlayerInfoCard, ConnectionCard, PlayerList, ServerStatusHeader, LoadingErrorState } from '@/components/ServerStatus'
import { useMultiServerStatus } from '@/composables/useMultiServerStatus'
import { NTag } from 'naive-ui'
import ServerPreviewCard from '@/components/ServerStatus/ServerPreviewCard.vue'

// 配置需要展示的服务器地址（可扩展）
// 服务器配置：名称 + 地址；空地址表示占位待配置
interface ServerConfig { name: string; address: string }
// 更新：第一个服务器为正式服，第二个服务器地址未公布
const serverConfigs: ServerConfig[] = [
  { name: '娱乐对抗正式服', address: '110.42.41.225:27015' },
  { name: '活动专用服务器 - 待上线', address: '' } // 空表示未公布
]
const serverAddresses = serverConfigs.map(c => c.address)

const { loading, error, serverDataList, fetchServers } = useMultiServerStatus(serverAddresses)

// 折叠视图逻辑已移除（预览卡取代）

// 汇总统计
const totalServers = computed(() => serverDataList.value.length)
const onlineServers = computed(() => serverDataList.value.filter(s => s.online).length)
const totalPlayers = computed(() => serverDataList.value.reduce((sum, s) => sum + (s.players || 0), 0))
const totalMaxPlayers = computed(() => serverDataList.value.reduce((sum, s) => sum + (s.maxPlayers || 0), 0))
const pingValues = computed(() => serverDataList.value.map(s => s.ping).filter((p): p is number => typeof p === 'number' && p > 0))
const avgPing = computed(() => pingValues.value.length ? Math.round(pingValues.value.reduce((a, b) => a + b, 0) / pingValues.value.length) : null)
const avgPingDisplay = computed(() => avgPing.value != null ? `${avgPing.value}ms` : '未知')
const avgPingTagType = computed(() => {
  if (avgPing.value == null) return 'default'
  if (avgPing.value <= 40) return 'success'
  if (avgPing.value <= 80) return 'info'
  if (avgPing.value <= 120) return 'warning'
  return 'error'
})
const utilizationPercent = computed(() => totalMaxPlayers.value ? (totalPlayers.value / totalMaxPlayers.value) * 100 : 0)
const utilizationColor = computed(() => {
  const v = utilizationPercent.value
  if (v >= 90) return '#DC2626'
  if (v >= 75) return '#F59E0B'
  if (v >= 40) return '#10B981'
  return '#3B82F6'
})

// Demo 详情展开逻辑
const detailIndex = ref<number | null>(null)
const detailPanelRef = ref<HTMLElement | null>(null)
const closeBtnRef = ref<HTMLButtonElement | null>(null)
let previouslyFocused: HTMLElement | null = null

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
/* 页面背景容器：允许添加自定义背景图片与遮罩 */
.server-status-page { position:relative; min-height:100vh; overflow:hidden; }
.status-bg-image { background: var(--server-bg-image, url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/bg5.gif')) center/cover no-repeat; filter:brightness(var(--server-bg-brightness,1.15)); }

.server-status-container { position:relative; min-height:calc(100vh - 80px); padding:120px 24px 80px; display:flex; justify-content:center; align-items:flex-start; z-index:10; pointer-events:none; }

.server-status-card {
  max-width: 1000px;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  pointer-events:auto;
  overflow: hidden;
}
.server-status-card { position:relative; }
.server-status-card::before { content:""; position:absolute; top:0; left:6px; right:6px; height:6px; border-top-left-radius:6px; border-top-right-radius:6px; background:linear-gradient(90deg,#fbbf24,#f59e0b,#d97706); }
.fade-in-card { animation: mainCardIn .8s ease-out; }
@keyframes mainCardIn { from { opacity:0; transform:translateY(24px) scale(.98); } 60% { opacity:.85; transform:translateY(-4px) scale(1.01);} to { opacity:1; transform:translateY(0) scale(1);} }

.server-info {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.last-updated {
  text-align: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.summary-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding: 12px 20px;
  background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(109,40,217,0.08));
  border: 1px solid rgba(99,102,241,0.15);
  border-radius: 14px;
  position: relative;
  pointer-events:auto;
}
.summary-bar::before { content:""; position:absolute; top:0; left:12px; right:12px; height:1px; background:linear-gradient(90deg, rgba(99,102,241,.35), rgba(139,92,246,.25), rgba(99,102,241,.35)); opacity:.55; pointer-events:none; }
.summary-item {
  display: flex;
  flex-direction: column;
  min-width: 120px;
  position: relative;
}
.summary-item .label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .5px;
  text-transform: uppercase;
  color: #6366F1;
  margin-bottom: 4px;
}
.utilization {
  flex: 1 1 220px;
  min-width: 200px;
}
.util-bar {
  position: relative;
  height: 22px;
  background: #EEF2FF;
  border-radius: 999px;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(99,102,241,0.15);
}
.util-bar.zero { background: repeating-linear-gradient(45deg, #EEF2FF 0 12px, #E2E8F0 12px 24px); }
.util-inner {
  height: 100%;
  width: 0;
  border-radius: 999px;
  transition: width .6s cubic-bezier(.4,0,.2,1), background .3s;
  background: #6366F1;
}
.util-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
.metric-val { display:inline-block; animation:metricIn .25s ease-out; }
@keyframes metricIn { from { opacity:0; transform:translateY(6px);} to { opacity:1; transform:translateY(0);} }
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #1E293B;
  mix-blend-mode: multiply;
}

.avg-ping-item { min-width: 200px; }
.avg-ping-box { position: relative; width: 180px; height: 50px; border-radius: 12px; background: linear-gradient(135deg,#EEF2FF,#F8FAFC); overflow:hidden; box-shadow: inset 0 0 0 1px rgba(99,102,241,0.15); }
.avg-ping-box :deep(svg) { position:absolute; inset:0; }
.avg-ping-foreground { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; backdrop-filter: blur(1px); }

/* Skeleton */
.skeleton-blocks { margin-bottom:32px; pointer-events:none; }
.summary-skeleton { display:flex; gap:18px; margin-bottom:26px; }
.summary-skeleton .line { height:42px; border-radius:14px; background:linear-gradient(90deg,#eceff4 0%, #f5f7fa 40%, #eceff4 80%); background-size:200% 100%; animation:shimmer 1.3s linear infinite; flex:0 0 auto; }
.summary-skeleton .w120 { width:140px; }
.summary-skeleton .w140 { width:180px; }
.summary-skeleton .w100 { width:120px; }
.summary-skeleton .w200 { width:260px; flex:1; }
.preview-skeleton-grid { display:flex; gap:20px 22px; flex-wrap:wrap; }
.preview-skel { width:260px; height:86px; background:linear-gradient(135deg,#ffffff,#f1f5f9); border:1px solid #d6dee9; border-radius:18px; padding:14px 16px; display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden; }
.preview-skel::after { content:""; position:absolute; inset:0; background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.6),rgba(255,255,255,0)); animation:skel-sweep 1.4s ease-in-out infinite; }
.skel-line { background:#e2e8f0; border-radius:6px; animation:fadePulse 1.6s ease-in-out infinite; }
.skel-line.h14 { height:14px; }
.skel-line.h10 { height:10px; }
.skel-line.w70 { width:70px; }
.skel-line.w110 { width:110px; }
.skel-line.w150 { width:150px; }
@keyframes shimmer { to { background-position:-200% 0; } }
@keyframes skel-sweep { 0% { transform:translateX(-100%);} 60% { transform:translateX(100%);} 100% { transform:translateX(100%);} }
@keyframes fadePulse { 0%,100% { opacity:.55;} 50% { opacity:1; } }

  @media (max-width: 860px) {
    .detail-panel { padding:32px 26px 46px; border-radius:28px; }
    .detail-header h3 { font-size:18px; }
    .close-btn { width:36px; height:36px; }
    .preview-grid { gap:14px; }
  }

.no-scroll { overflow:hidden !important; }

:deep(.n-card) {
  transition: all 0.3s ease;
}

:deep(.n-card:hover) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .server-status-container { padding: 90px 12px 40px; min-height:calc(100vh - 70px); align-items:flex-start; }

  .server-status-card {
    padding: 20px;
    border-radius: 16px;
    margin: 0;
    max-width: 100%;
  }

  /* 调整网格间距 */
  .server-info :deep(.n-grid) {
    --n-gap: 12px 12px !important;
  }

  /* 最后更新时间移动端优化 */
  .last-updated {
    margin-top: 16px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .server-status-container { padding: 80px 8px 32px; }

  .server-status-card {
    padding: 16px;
    border-radius: 12px;
  }
}

/* 横屏模式优化 */
@media (max-width: 768px) and (orientation: landscape) {
  .server-status-container { padding: 70px 16px 32px; }

  .server-status-card {
    padding: 16px;
  }
}

/* 超宽屏优化 */
@media (min-width: 1400px) {
  .server-status-card {
    max-width: 1200px;
  }

  .server-info :deep(.n-grid) {
    --n-gap: 32px 32px !important;
  }
}

  /* 新预览卡片布局 */
  .preview-grid { display:flex; flex-wrap:wrap; gap:20px 22px; margin-top:6px; margin-bottom:30px; }
/* 全局 focus 可见样式（仅当前作用域内主要交互元素） */
:focus-visible { outline:2px solid rgba(99,102,241,.65); outline-offset:2px; }
  .preview-grid { pointer-events:auto; }

  /* 详情 Overlay */
  .detail-overlay { position:fixed; inset:0; background:rgba(15,23,42,.6); backdrop-filter:blur(10px) saturate(130%); display:flex; align-items:center; justify-content:center; padding:32px 18px; z-index:4000; }
  /* 详情面板：提高对比度与层次感 */
  .detail-panel { width:100%; max-width:960px; background:linear-gradient(145deg,#ffffff 0%, #f1f5f9 100%); border:1px solid rgba(148,163,184,.35); border-radius:30px; box-shadow:0 28px 60px -18px rgba(0,0,0,.30), 0 16px 40px -20px rgba(0,0,0,.22); padding:32px 36px 40px; position:relative; animation:panelIn .45s cubic-bezier(.4,0,.2,1); max-height:calc(100vh - 96px); display:flex; flex-direction:column; color:#334155; }
  .detail-content { flex:1; overflow-y:auto; margin-top:8px; padding-right:4px; }
  .detail-content::-webkit-scrollbar { width:8px; }
  .detail-content::-webkit-scrollbar-track { background:transparent; }
  .detail-content::-webkit-scrollbar-thumb { background:rgba(99,102,241,.35); border-radius:4px; }
  .detail-content::-webkit-scrollbar-thumb:hover { background:rgba(99,102,241,.55); }
  @keyframes panelIn { from { opacity:0; transform:translateY(28px) scale(.98);} to { opacity:1; transform:translateY(0) scale(1);} }
  .detail-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:22px; }
  .detail-header h3 { margin:0; font-size:22px; font-weight:600; letter-spacing:.5px; color:#1e293b; }
  /* 内部卡片统一边框与背景，增强区块分隔 */
  .detail-content :deep(.n-card:not(.status-card)) { background:linear-gradient(135deg,#ffffff 0%, #f8fafc 100%) !important; border:1px solid #e2e8f0; box-shadow:0 2px 4px -2px rgba(0,0,0,.04), 0 4px 10px -4px rgba(0,0,0,.06); color:#334155; }
  /* 恢复状态卡原始背景，不受统一覆盖影响 */
  /* 状态卡使用自身在线/离线渐变 */
  /* 状态卡保持自身渐变/边框/阴影样式（不在此处覆写） */
  .detail-content :deep(.n-card .n-card__header) { border-bottom:1px solid #e5e7eb; }
  .detail-content :deep(.n-tag) { font-weight:600; }
  .detail-content :deep(.n-text[depth="3"]) { color:#64748b; }
  .close-btn {
    border:1px solid #cbd5e1;
    background:#F1F5F9;
    width:40px; height:40px;
    border-radius:12px;
    font-size:22px; font-weight:500;
    cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    color:#334155;
    transition:background .25s, transform .25s, border-color .25s;
  }
  .close-btn:hover { background:#E2E8F0; }
  .close-btn:active { transform:scale(.92); }
  .close-btn:focus { outline:none; }
  .close-btn:focus-visible { outline:2px solid rgba(99,102,241,.65); outline-offset:2px; }

  /* 过渡 */
  .detail-fade-enter-active, .detail-fade-leave-active { transition: opacity .35s ease; }
  .detail-fade-enter-from, .detail-fade-leave-to { opacity:0; }

  @media (max-width: 860px) {
  .detail-panel { padding:26px 22px 34px; border-radius:26px; max-height:calc(100vh - 72px); }
    .detail-header h3 { font-size:18px; }
    .close-btn { width:36px; height:36px; }
    .preview-grid { gap:14px; }
  }

  .no-scroll { overflow:hidden !important; }
</style>
