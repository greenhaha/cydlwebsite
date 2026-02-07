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
    <div class="map-preview" :class="{ empty: !hasMapImage }">
      <img v-if="hasMapImage" :src="mapImageUrl!" alt="" @error="handleImageError" />
      <div class="map-overlay">
        <span class="map-badge">地图预览</span>
        <span class="map-title" :title="mapFull">{{ mapFull }}</span>
      </div>
    </div>

    <div class="info-body">
      <div class="card-header">
        <span class="status-dot" :class="statusClass" aria-hidden="true"></span>
        <div class="header-text">
          <div class="name-row">
            <h4 class="server-name" :title="displayName">{{ displayName }}</h4>
            <span class="inline-stats">{{ playersText }} <span class="inline-ping" :class="pingClass">{{ pingText }}</span></span>
          </div>
          <p class="server-map" :title="mapFull">地图: {{ mapFull }}</p>
        </div>
        <span class="status-pill" :class="statusClass">{{ statusText }}</span>
      </div>

      <div class="card-stats">
        <div class="action-row">
          <div class="capacity-bar">
            <div class="capacity-fill" :class="utilClass" :style="{ width: capacityPercent + '%' }"></div>
          </div>
          <button class="detail-btn" type="button" @click.stop.prevent="emit('expand')">查看详情</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface ServerDataLite {
  online: boolean
  name: string | null
  map?: string | null
  mapImage?: string | null
  players: number
  maxPlayers: number
  bots?: number
  ping: number | null
  queryDuration?: number | null
  address: string | null
}

const props = defineProps<{ server: ServerDataLite; label: string; expandable?: boolean }>()
const emit = defineEmits<{ (e: 'expand'): void }>()

const imageError = ref(false)

const isExpandable = computed(() => props.expandable !== false)
const displayName = computed(() => props.label || props.server.name || '未命名服务器')
const effectivePing = computed(() => props.server.ping ?? props.server.queryDuration ?? null)
const pingText = computed(() => (effectivePing.value != null ? `${effectivePing.value}ms` : '--'))
const mapFull = computed(() => props.server.map || '未知地图')
const mapImageUrl = computed(() => {
  const direct = props.server.mapImage?.trim()
  if (!direct) return null
  if (direct.startsWith('//')) return `https:${direct}`
  return direct
})
const hasMapImage = computed(() => !!mapImageUrl.value && !imageError.value)
const playersText = computed(() => {
  const max = props.server.maxPlayers || 0
  return max ? `${props.server.players}/${max}` : `${props.server.players}/--`
})

const capacityPercent = computed(() => {
  const max = props.server.maxPlayers || 0
  if (!max) return 0
  const pct = (props.server.players / max) * 100
  return Math.max(0, Math.min(100, Number.isFinite(pct) ? pct : 0))
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

watch(() => props.server.map, () => {
  imageError.value = false
})


const handleExpand = () => {
  if (!isExpandable.value) return
  emit('expand')
}

const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.preview-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  border-radius: 16px;
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  color: var(--theme-text);
  box-shadow: var(--theme-card-shadow);
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}



.map-preview {
  position: relative;
  width: 100%;
  height: clamp(110px, 14vw, 140px);
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.9));
}

.map-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.map-preview.empty {
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9));
}




.map-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;
  padding: 8px 10px;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(2, 6, 23, 0.65) 100%);
}

.map-badge {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.map-title {
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.45);
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
  word-break: break-word;
}

.preview-card:hover {
  transform: translateY(-3px);
}

.preview-card:focus-visible {
  outline: 2px solid rgba(59, 130, 246, 0.6);
  outline-offset: 6px;
}

.preview-card.offline {
  opacity: 0.88;
}

.preview-card.offline .map-preview img {
  filter: grayscale(0.6) brightness(0.7);
}

.info-body {
  padding: 10px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 2%;
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

.name-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
  min-width: 0;
  justify-content: flex-start;
}

.server-name {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: var(--theme-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  flex: 0 1 auto;
}

.inline-stats {
  font-size: 12px;
  font-weight: 600;
  color: var(--theme-text);
  white-space: nowrap;
  flex-shrink: 0;
}

.inline-ping {
  margin-left: 4px;
  font-weight: 600;
}

.server-map {
  margin: 0;
  font-size: 11px;
  color: var(--theme-muted);
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
  word-break: break-word;
}

.status-pill {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
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
  flex-direction: column;
  gap: 4px;
  align-items: stretch;
}


.stat-ping {
  font-size: 12px;
  font-weight: 600;
}

.action-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: nowrap;
  padding-left: 2%;
}

.capacity-bar {
  flex: 1;
  min-width: 0;
  height: 8px;
  border-radius: 999px;
  background: var(--theme-secondary-bg);
  overflow: hidden;
  box-shadow: inset 0 0 0 1px var(--theme-border);
}

.capacity-fill {
  height: 100%;
  border-radius: inherit;
  background: #60a5fa;
  transition: width 0.3s ease;
}

.capacity-fill.util-low {
  background: #60a5fa;
}

.capacity-fill.util-mid {
  background: #22c55e;
}

.capacity-fill.util-high {
  background: #f97316;
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
  border: 1px solid var(--theme-border);
  background: var(--theme-secondary-bg);
  color: var(--theme-text);
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
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
  .card-stats {
    align-items: stretch;
  }

  .map-preview {
    height: clamp(100px, 32vw, 120px);
  }

  .info-body {
    padding: 12px 12px 14px;
  }

  .action-row {
    padding-left: 2%;
  }

  .detail-btn {
    text-align: center;
  }
}

</style>
