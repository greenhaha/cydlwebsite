<template>
  <div class="preview-card" @click="handleExpand" tabindex="0">
    <div class="status-icon" :class="statusClass" role="status" :aria-label="statusAria" />
    <div class="main-info">
      <h4 class="name" :title="displayName">{{ displayName }}</h4>
      <div class="map" :title="mapFull">地图: {{ mapDisplay }}</div>
      <div class="meta">
        <span class="players" :class="utilClass">{{ server.players }}/{{ server.maxPlayers || '?' }}</span>
        <span class="sep">•</span>
  <span class="ping" :class="pingClass">{{ pingText }}</span>
  <span class="ping-bar" :class="pingBarClass" aria-hidden="true" />
      </div>
    </div>
    <div class="actions" @click.stop>
      <button class="connect-btn" :class="buttonVariant" @click.stop.prevent="emit('expand')">
        <span v-if="!server.online" class="off-icon" aria-hidden="true">⏻</span>
        详情
      </button>
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

// 预览卡名称始终使用配置的 label；仅当 label 为空时回退服务器自身名称
const displayName = computed(() => props.label || props.server.name || '未命名服务器')
const effectivePing = computed(() => props.server.ping ?? props.server.queryDuration ?? null)
const pingText = computed(() => effectivePing.value != null ? effectivePing.value + 'ms' : '未知')
const mapFull = computed(() => props.server.map || '未知地图')
const mapDisplay = computed(() => {
  const m = mapFull.value
  return m.length > 18 ? m.slice(0, 16) + '…' : m
})

const pingClass = computed(() => {
  const v = effectivePing.value
  if (v == null) return 'ping-unknown'
  if (v <= 40) return 'ping-good'
  if (v <= 80) return 'ping-ok'
  if (v <= 120) return 'ping-warn'
  return 'ping-bad'
})

const statusClass = computed(() => props.server.online ? 's-online' : 's-offline')
const statusAria = computed(() => props.server.online ? '在线' : '离线')
const utilClass = computed(() => {
  const ratio = props.server.maxPlayers ? props.server.players / props.server.maxPlayers : 0
  if (ratio >= .9) return 'util-high'
  if (ratio >= .6) return 'util-mid'
  return 'util-low'
})

// 按钮颜色跟随在线状态
const buttonVariant = computed(() => props.server.online ? 'btn-online' : 'btn-offline')

// Ping 条 class
const pingBarClass = computed(() => {
  const v = effectivePing.value
  if (v == null) return 'bar-unknown'
  if (v <= 40) return 'bar-good'
  if (v <= 80) return 'bar-ok'
  if (v <= 120) return 'bar-warn'
  return 'bar-bad'
})

// 连接相关逻辑已移除，按钮仅用于展开详情

const handleExpand = () => {
  if (props.expandable) emit('expand')
}
</script>

<style scoped>
.preview-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px 14px 14px;
  background: linear-gradient(135deg,#ffffff 0%, #f1f5f9 100%);
  border: 1px solid #d6dee9;
  border-radius: 18px;
  cursor: pointer;
  transition: box-shadow .25s, transform .18s, border-color .25s;
  min-width: 240px;
  overflow: hidden;
  color:#334155;
}
.preview-card::after { content:""; position:absolute; inset:0; background:radial-gradient(circle at 80% 20%, rgba(99,102,241,0.14), transparent 60%); opacity:0; transition:opacity .5s ease; }
.preview-card:hover { box-shadow:0 10px 28px -8px rgba(30,41,59,.22); transform:translateY(-3px); border-color:#b3c0cf; }
.preview-card:hover::after { opacity:1; }
.status-icon { width:14px; height:14px; border-radius:50%; box-shadow:0 0 0 3px rgba(0,0,0,.05); flex-shrink:0; }
.s-online { background:linear-gradient(135deg,#34d399,#059669); }
.s-offline { background:linear-gradient(135deg,#94a3b8,#64748b); }
.main-info { flex:1; min-width:0; }
.name { font-size:14px; font-weight:600; margin:0 0 4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:#1e293b; }
.map { font-size:11px; line-height:1.2; margin:-2px 0 4px; color:#64748b; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.meta { font-size:12px; display:flex; align-items:center; gap:6px; color:#475569; font-weight:500; }
.sep { opacity:.4; }
.players { font-variant-numeric:tabular-nums; }
.util-low { color:#2563EB; }
.util-mid { color:#0D9488; }
.util-high { color:#DC2626; }
.ping { font-variant-numeric:tabular-nums; }
.ping-good { color:#059669; }
.ping-ok { color:#2563EB; }
.ping-warn { color:#D97706; }
.ping-bad { color:#DC2626; }
.ping-unknown { color:#64748B; }
.ping-bar { width:55px; height:4px; border-radius:3px; background:#cbd5e1; margin-left:2px; position:relative; top:0; }
.bar-good { background:linear-gradient(90deg,#34c58f,#058a5d); }
.bar-ok { background:linear-gradient(90deg,#2563EB,#3B82F6); }
.bar-warn { background:linear-gradient(90deg,#F59E0B,#D97706); }
.bar-bad { background:linear-gradient(90deg,#EF4444,#B91C1C); }
.bar-unknown { background:linear-gradient(90deg,#94a3b8,#64748b); opacity:.6; }
.actions { display:flex; align-items:center; }
.connect-btn { border:none; border-radius:999px; padding:6px 16px; font-size:12px; font-weight:600; cursor:pointer; letter-spacing:.5px; transition:background .28s, transform .18s, box-shadow .28s, color .28s; font-family:inherit; }
.connect-btn:active { transform:translateY(1px) scale(.97); }
.connect-btn.btn-online { background:linear-gradient(135deg,#34c58f,#058a5d); color:#fff; box-shadow:0 4px 12px -3px rgba(16,185,129,.45), 0 2px 4px -1px rgba(5,150,105,.35); }
.connect-btn.btn-online:hover { background:linear-gradient(135deg,#26b07f,#036f4a); }
.connect-btn.btn-offline { background:linear-gradient(135deg,#E2E8F0,#CBD5E1); color:#475569; box-shadow:0 2px 6px -2px rgba(71,85,105,.25); }
.connect-btn.btn-offline:hover { background:linear-gradient(135deg,#d7dde5,#98a6b6); color:#1e293b; }
.off-icon { margin-right:4px; font-size:12px; opacity:.9; }
</style>
