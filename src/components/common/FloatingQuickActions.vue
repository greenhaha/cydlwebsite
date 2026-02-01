<template>
  <transition name="fab-fade">
    <div v-show="isVisible" ref="fabRef" class="quick-action-fab" :class="{ 'is-expanded': isExpanded }">
      <transition-group name="fab-slide" tag="div" class="fab-actions" v-if="isExpanded">
        <button
          v-for="action in actions"
          :key="action.key"
          class="fab-action-btn"
          type="button"
          @click.stop="handleAction(action.key)"
        >
          <span class="fab-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="presentation">
              <path
                v-for="(d, idx) in iconMap[action.key]"
                :key="d + idx"
                :d="d"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span class="fab-label">{{ action.label }}</span>
        </button>
      </transition-group>
      <button class="fab-main" type="button" :aria-expanded="isExpanded" @click.stop="toggleFab">
        <svg v-if="!isExpanded" viewBox="0 0 24 24" role="presentation">
          <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg v-else viewBox="0 0 24 24" role="presentation">
          <path d="M6 6l12 12M18 6l-12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

type ActionKey =
  | 'top'
  | 'home'
  | 'models'
  | 'faq'
  | 'registration'
  | 'server'
  | 'activity'
  | 'profile'
  | 'theme'

const router = useRouter()
const route = useRoute()
const isExpanded = ref(false)
const isVisible = ref(false)
const fabRef = ref<HTMLElement | null>(null)
const interactionLocked = ref(false)
let unlockTimer: number | null = null

const actions = reactive<{ key: ActionKey; label: string }[]>([
  { key: 'top', label: '回到顶部' },
  { key: 'theme', label: '\u5207\u6362\u4e3b\u9898' },
  { key: 'home', label: '主菜单' },
  { key: 'models', label: '模型图鉴' },
  { key: 'faq', label: '常见问题' },
  { key: 'registration', label: '每日签到' },
  { key: 'server', label: '服务器状态' },
  { key: 'activity', label: '活动中心' },
  { key: 'profile', label: '个人资料' },
])

const iconMap: Record<ActionKey, string[]> = {
  top: ['M12 5L7 10', 'M12 5l5 5', 'M12 5v14'],
  home: ['M3 10.5L12 4l9 6.5', 'M5 11.5v8.5h4v-5h6v5h4v-8.5'],
  models: ['M5 5h6v6H5z', 'M13 5h6v6h-6z', 'M5 13h6v6H5z', 'M13 13h6v6h-6z'],
  faq: ['M12 18h.01', 'M9.09 9.55a3 3 0 0 1 5.82 1.22c0 1.5-1 2.25-2 2.95-.74.53-1 1.06-1 1.78', 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0'],
  registration: ['M7 7h10', 'M7 12h10', 'M7 17h6', 'M5 4h14v16H5z'],
  server: ['M4 6h16v12H4z', 'M4 10h16', 'M9 14h6', 'M8 18v2', 'M16 18v2'],
  activity: ['M12 4.5l2.05 4.16 4.59.67-3.32 3.22.78 4.54L12 15.9l-4.1 2.19.78-4.54-3.32-3.22 4.59-.67z'],
  profile: ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8', 'M6 20c0-3.3137 2.6863-6 6-6s6 2.6863 6 6'],
  theme: ['M12 3v2','M12 19v2','M4.22 4.22l1.42 1.42','M18.36 18.36l1.42 1.42','M3 12h2','M19 12h2','M4.22 19.78l1.42-1.42','M18.36 5.64l1.42-1.42','M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8'],
}

const lockInteraction = () => {
  if (unlockTimer !== null) {
    window.clearTimeout(unlockTimer)
    unlockTimer = null
  }
  interactionLocked.value = true
  unlockTimer = window.setTimeout(() => {
    interactionLocked.value = false
    unlockTimer = null
  }, 260)
}

const releaseInteraction = () => {
  if (unlockTimer !== null) {
    window.clearTimeout(unlockTimer)
    unlockTimer = null
  }
  interactionLocked.value = false
}

const toggleFab = () => {
  if (interactionLocked.value) return
  isExpanded.value = !isExpanded.value
  lockInteraction()
}

const closeFab = () => {
  if (!isExpanded.value) return
  isExpanded.value = false
  releaseInteraction()
}

const toggleTheme = () => {
  const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
  const next = current === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', next)
  localStorage.setItem('theme', next)
}

const handleAction = async (key: ActionKey) => {
  switch (key) {
    case 'top':
      window.scrollTo({ top: 0, behavior: 'smooth' })
      break
    case 'home':
      router.push('/')
      break
    case 'faq':
      router.push('/faq')
      break
    case 'models':
      router.push('/models')
      break
    case 'profile':
      router.push('/profile')
      break
    case 'activity':
      router.push('/activity')
      break
    case 'server':
      router.push('/server-status')
      break
    case 'registration':
      router.push('/registration')
      break
    case 'theme':
      toggleTheme()
      break
  }
  closeFab()
}

const handleDocumentPointerDown = (event: PointerEvent) => {
  if (!fabRef.value) return
  if (fabRef.value.contains(event.target as Node)) return
  closeFab()
}

onMounted(() => {
  isVisible.value = true
  document.addEventListener('pointerdown', handleDocumentPointerDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleDocumentPointerDown)
  releaseInteraction()
})

watch(
  () => route.fullPath,
  () => {
    closeFab()
  }
)
</script>

<style scoped>
.quick-action-fab {
  position: fixed;
  bottom: 32px;
  right: 28px;
  z-index: 1200;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.fab-main {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  color: #fff;
  background: radial-gradient(circle at 30% 20%, #38bdf8, #2563eb 60%, #1d4ed8 90%);
  box-shadow: 0 15px 35px rgba(37, 99, 235, 0.45);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.fab-main:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 20px 40px rgba(37, 99, 235, 0.5);
}

.fab-main svg {
  width: 26px;
  height: 26px;
}

.fab-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.fab-action-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: var(--theme-card-bg);
  color: var(--theme-text);
  border: 1px solid var(--theme-border);
  box-shadow: var(--theme-card-shadow);
  min-width: 150px;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}

.fab-action-btn:hover {
  transform: translateX(-4px);
  background: var(--theme-card-bg);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.45);
}

.fab-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.fab-icon svg {
  width: 18px;
  height: 18px;
}

.fab-label {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.fab-fade-enter-active,
.fab-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fab-fade-enter-from,
.fab-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.fab-slide-enter-active,
.fab-slide-leave-active {
  transition: all 0.2s ease;
}

.fab-slide-enter-from,
.fab-slide-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 768px) {
  .quick-action-fab {
    right: 16px;
    bottom: 20px;
  }

  .fab-action-btn {
    min-width: 0;
    width: auto;
    padding: 8px 12px;
  }

  .fab-label {
    font-size: 12px;
    letter-spacing: 0.06em;
  }
}
</style>
