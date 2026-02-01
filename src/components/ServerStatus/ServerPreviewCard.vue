<template>
  <div
    class="preview-card"
    :class="{ offline: !server.online }"
    @click="handleExpand"
    tabindex="0"
    role="button"
    :aria-label="`查看${displayName}详情`"
    @keydown.enter.prevent="handleExpand"
    @keydown.space.prevent="handleExpand"
  >
    <div class="card-header">
      <span class="status-dot" :class="statusClass" aria-hidden="true"></span>
      <div class="header-text">
        <h4 class="server-name" :title="displayName">{{ displayName }}</h4>
        <p class="server-map" :title="mapFull">地图: {{ mapDisplay }}</p>
      </div>
      <span class="status-pill" :class="statusClass">{{ statusText }}</span>
    </div>

    <div class="card-stats">
      <div class="stat">
        <span class="stat-label">玩家</span>
        <span class="stat-value" :class="utilClass">{{ playersText }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">延迟</span>
        <span class="stat-value" :class="pingClass">{{ pingText }}</span>
      </div>
      <button class="detail-btn" type="button" @click.stop.prevent="emit('expand')">查看详情</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ServerDataLite {
  online: boolean
  name: string | null
  map?: string | null
  players: number
  maxPlayers: number
  ping: number | null
  queryDuration?: number | null
  address: string | null
}

const props = defineProps<{ server: ServerDataLite; label: string; expandable?: boolean }>()
const emit = defineEmits<{ (e: 'expand'): void }>()

const isExpandable = computed(() => props.expandable !== false)
const displayName = computed(() => props.label || props.server.name || '未命名服务器')
const effectivePing = computed(() => props.server.ping ?? props.server.queryDuration ?? null)
const pingText = computed(() => (effectivePing.value != null ? `${effectivePing.value}ms` : '--'))
const mapFull = computed(() => props.server.map || '未知地图')
const mapDisplay = computed(() => {
  const m = mapFull.value
  return m.length > 18 ? m.slice(0, 16) + '?' : m
})
const playersText = computed(() => {
  const max = props.server.maxPlayers || 0
  return max ? `${props.server.players}/${max}` : `${props.server.players}/--`
})

const statusClass = computed(() => (props.server.online ? 'is-online' : 'is-offline'))
const statusText = computed(() => (props.server.online ? '在线' : '离线'))
const utilClass = computed(() => {
  const ratio = props.server.maxPlayers ? props.server.players / props.server.maxPlayers : 0
  if (ratio >= 0.9) return 'util-high'
  if (ratio >= 0.6) return 'util-mid'
  return 'util-low'
})
const pingClass = computed(() => {
  const v = effectivePing.value
  if (v == null) return 'ping-unknown'
  if (v <= 40) return 'ping-good'
  if (v <= 80) return 'ping-ok'
  if (v <= 120) return 'ping-warn'
  return 'ping-bad'
})

const handleExpand = () => {
  if (!isExpandable.value) return
  emit('expand')
}
</script>

<style scoped>
.preview-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px 20px;
  border-radius: 20px;
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  color: var(--theme-text);
  box-shadow: var(--theme-card-shadow);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  overflow: hidden;
}

.preview-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.25), transparent 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.preview-card:hover {
  transform: translateY(-3px);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.25);
}

.preview-card:hover::before {
  opacity: 1;
}

.preview-card:focus-visible {
  outline: 2px solid rgba(59, 130, 246, 0.6);
  outline-offset: 3px;
}

.preview-card.offline {
  opacity: 0.88;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  flex-shrink: 0;
  box-shadow: 0 0 0 4px rgba(148, 163, 184, 0.16);
}

.status-dot.is-online {
  background: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2);
}

.status-dot.is-offline {
  background: #94a3b8;
}

.header-text {
  flex: 1;
  min-width: 0;
}

.server-name {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: var(--theme-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.server-map {
  margin: 0;
  font-size: 12px;
  color: var(--theme-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-pill {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid transparent;
  white-space: nowrap;
}

.status-pill.is-online {
  color: #22c55e;
  background: rgba(34, 197, 94, 0.15);
  border-color: rgba(34, 197, 94, 0.4);
}

.status-pill.is-offline {
  color: #94a3b8;
  background: rgba(148, 163, 184, 0.18);
  border-color: rgba(148, 163, 184, 0.3);
}

.card-stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 90px;
}

.stat-label {
  font-size: 12px;
  color: var(--theme-muted);
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.util-low {
  color: #60a5fa;
}

.util-mid {
  color: #22c55e;
}

.util-high {
  color: #f97316;
}

.ping-good {
  color: #22c55e;
}

.ping-ok {
  color: #60a5fa;
}

.ping-warn {
  color: #f59e0b;
}

.ping-bad {
  color: #f97316;
}

.ping-unknown {
  color: var(--theme-muted);
}

.detail-btn {
  margin-left: auto;
  border: 1px solid var(--theme-border);
  background: var(--theme-secondary-bg);
  color: var(--theme-text);
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.detail-btn:hover {
  border-color: rgba(59, 130, 246, 0.5);
  background: rgba(59, 130, 246, 0.15);
}

.detail-btn:active {
  transform: scale(0.97);
}

@media (max-width: 640px) {
  .preview-card {
    padding: 16px;
  }

  .card-stats {
    align-items: flex-start;
  }

  .detail-btn {
    width: 100%;
    text-align: center;
    margin-left: 0;
  }
}
</style>
