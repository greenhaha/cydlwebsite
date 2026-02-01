<template>
  <header :class="['floating-header', { hidden: headerHidden, elevated: headerElevated }]">
    <div class="header-surface">
      <div class="brand-block">
        <div class="brand-mark"><img src="/favicon.ico" alt="logo" class="brand-logo" /></div>
        <div class="brand-text">
          <span class="brand-title">{{ copy.brandTitle }}</span>
          <span class="brand-subtitle">{{ copy.brandSubtitle }}</span>
        </div>
      </div>

      <nav v-if="!isMobile" class="nav-links">
        <RouterLink
          v-for="item in navItems"
          :key="item.key"
          :to="item.to"
          class="nav-link"
          :class="{ active: isActive(item.path) }"
        >
          <n-icon size="16" class="nav-icon">
            <component :is="item.icon" />
          </n-icon>
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>

      <div class="action-block">
        <div v-if="!authStore.isAuthenticated" class="auth-actions">
          <n-button @click="goToLogin" size="small" type="primary" class="auth-btn" ghost>
            {{ copy.login }}
          </n-button>
          <n-button @click="goToRegister" size="small" type="primary" class="auth-btn">
            {{ copy.register }}
          </n-button>
        </div>
        <div v-else class="user-area">
          <n-dropdown :options="userMenuOptions" @select="handleUserMenuSelect">
            <button class="user-trigger" type="button">
              <span class="user-avatar">
                <svg class="user-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <span class="user-name hidden md:block">{{ authStore.user?.username }}</span>
              <n-icon size="16" class="user-chevron">
                <ChevronDownIcon />
              </n-icon>
            </button>
          </n-dropdown>
        </div>
      </div>

      <button v-if="isMobile" class="mobile-toggle" type="button" @click="drawerVisible = true">
        <n-icon size="20">
          <MenuIcon />
        </n-icon>
      </button>
    </div>
  </header>

  <transition name="sheet-fade">
    <div v-if="drawerVisible" class="mobile-sheet">
      <div class="sheet-backdrop" @click="drawerVisible = false"></div>
      <div class="sheet-panel">
        <div class="sheet-header">
          <span>{{ copy.mobileMenu }}</span>
          <button type="button" class="sheet-close" @click="drawerVisible = false">×</button>
        </div>
        <div class="sheet-links">
          <RouterLink
            v-for="item in navItems"
            :key="`mobile-${item.key}`"
            :to="item.to"
            class="sheet-link"
            :class="{ active: isActive(item.path) }"
            @click="drawerVisible = false"
          >
            <n-icon size="18" class="sheet-icon">
              <component :is="item.icon" />
            </n-icon>
            <span>{{ item.label }}</span>
          </RouterLink>
        </div>
        <div class="sheet-footer">
          <template v-if="!authStore.isAuthenticated">
            <n-button @click="goToLogin" size="small" type="primary" class="auth-btn" ghost>
              {{ copy.login }}
            </n-button>
            <n-button @click="goToRegister" size="small" type="primary" class="auth-btn">
              {{ copy.register }}
            </n-button>
          </template>
          <template v-else>
            <button class="sheet-user" type="button" @click="handleUserMenuSelect('profile')">
              {{ copy.profile }}
            </button>
            <button class="sheet-user danger" type="button" @click="handleUserMenuSelect('logout')">
              {{ copy.logout }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  AlertCircle as AlertCircleIcon,
  Book as BookIcon,
  ChevronDown as ChevronDownIcon,
  Heart as HeartIcon,
  Home as HomeIcon,
  LogOut as LogOutIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  PhonePortrait as PhonePortraitIcon,
  Server as ServerIcon,
  WomanSharp as ModelIcon,
  Trophy as TrophyIcon,
  Videocam as VideocamIcon,
} from '@vicons/ionicons5'
import { NButton, NDropdown, NIcon } from 'naive-ui'
import type { Component } from 'vue'
import { computed, defineComponent, h, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const copy = {
  brandTitle: '黄粱一梦',
  brandSubtitle: 'HLYMCN',
  login: '登录',
  register: '注册',
  mobileMenu: '导航',
  profile: '个人资料',
  logout: '退出登录',
}

const navItems = [
  { key: 'home', label: '首页', path: '/', to: { name: 'home', params: { lang: 'zh-CN' } }, icon: HomeIcon },
  { key: 'models', label: '模型图鉴', path: '/models', to: { path: '/models' }, icon: ModelIcon },
  { key: 'faq', label: '常见问题', path: '/faq', to: { path: '/faq' }, icon: AlertCircleIcon },
  { key: 'registration', label: '签到', path: '/registration', to: { path: '/registration' }, icon: BookIcon },
  { key: 'server', label: '服务器状态', path: '/server-status', to: { path: '/server-status' }, icon: ServerIcon },
  { key: 'gifts', label: '直播', path: '/gifts', to: { path: '/gifts' }, icon: VideocamIcon },
  { key: 'contribute', label: '贡献者', path: '/contribute', to: { path: '/contribute' }, icon: HeartIcon },
  { key: 'download', label: 'APP下载', path: '/app-download', to: { path: '/app-download' }, icon: PhonePortraitIcon },
  { key: 'activity', label: '活动中心', path: '/activity', to: { path: '/activity' }, icon: TrophyIcon },
]

export default defineComponent({
  components: {
    NButton,
    NDropdown,
    NIcon,
    MenuIcon,
    ChevronDownIcon,
    RouterLink,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()
    const drawerVisible = ref(false)
    const isMobile = ref(false)
    const headerHidden = ref(false)
    const headerElevated = ref(false)
    let lastScrollY = 0

    const userMenuOptions = ref([
      { label: copy.profile, key: 'profile', icon: renderIcon(PersonIcon) },
      { type: 'divider', key: 'divider' },
      { label: copy.logout, key: 'logout', icon: renderIcon(LogOutIcon) },
    ])

    const updateIsMobile = () => {
      isMobile.value = window.innerWidth < 960
    }

    const handleScroll = () => {
      const y = window.scrollY
      headerElevated.value = y > 6
      if (drawerVisible.value) {
        headerHidden.value = false
        lastScrollY = y
        return
      }
      const delta = y - lastScrollY
      if (y < 80) {
        headerHidden.value = false
        lastScrollY = y
        return
      }
      if (delta > 8 && y > 140) {
        headerHidden.value = true
      } else if (delta < -2) {
        headerHidden.value = false
      }
      lastScrollY = y
    }

    const goToLogin = () => {
      router.push('/login')
      drawerVisible.value = false
    }

    const goToRegister = () => {
      router.push('/register')
      drawerVisible.value = false
    }

    const handleUserMenuSelect = (key: string) => {
      switch (key) {
        case 'profile':
          router.push('/profile')
          break
        case 'logout':
          authStore.logout()
          router.push('/')
          break
      }
      drawerVisible.value = false
    }

    const isActive = (path: string) => {
      if (path == '/') return route.path == '/'
      return route.path.startsWith(path)
    }

    onMounted(() => {
      updateIsMobile()
      window.addEventListener('resize', updateIsMobile)
      window.addEventListener('scroll', handleScroll, { passive: true })
      authStore.initialize()
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateIsMobile)
      window.removeEventListener('scroll', handleScroll)
    })

    watch(
      () => route.path,
      () => {
        if (!isMobile.value) {
          drawerVisible.value = false
        }
      }
    )

    return {
      copy,
      navItems,
      drawerVisible,
      isMobile,
      authStore,
      userMenuOptions,
      goToLogin,
      goToRegister,
      handleUserMenuSelect,
      isActive,
      headerHidden,
      headerElevated,
    }
  },
})
</script>

<style scoped>
.floating-header {
  position: fixed;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: min(1280px, calc(100% - 32px));
  z-index: 300;
  transition: transform 0.18s ease, opacity 0.18s ease;
  will-change: transform, opacity;
}


.floating-header.hidden {
  transform: translate(-50%, -140%);
  opacity: 0;
}


.header-surface {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 20px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--theme-footer-bg) 0%, rgba(2, 6, 23, 0.85) 80%, rgba(88, 28, 135, 0.08) 100%);
  border: 1px solid var(--theme-border);
  box-shadow: 0 16px 36px rgba(2, 6, 23, 0.28);
  backdrop-filter: blur(14px);
  animation: headerFade 0.22s ease;
}


.floating-header.elevated .header-surface {
  box-shadow: 0 20px 45px rgba(2, 6, 23, 0.5);
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.brand-mark {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: var(--theme-secondary-bg);
  border: 1px solid var(--theme-border);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.brand-logo {
  width: 24px;
  height: 24px;
  display: block;
}


.brand-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  line-height: 1.2;
}


.brand-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--theme-text);
  line-height: 1.2;
}


.brand-subtitle {
  font-size: 11px;
  letter-spacing: 0.24em;
  color: var(--theme-muted);
  line-height: 1.1;
}


.nav-links {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--theme-border);
  border-radius: 999px;
}


.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  color: var(--theme-muted);
  font-size: 13px;
  font-weight: 600;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  white-space: nowrap;
}

.nav-link.active {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(147, 51, 234, 0.95));
  color: #fff;
  box-shadow: 0 8px 18px rgba(59, 130, 246, 0.28);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--theme-text);
}


.nav-icon {
  color: inherit;
}

.action-block {
  display: flex;
  align-items: center;
  gap: 10px;
}

.auth-actions {
  display: flex;
  gap: 10px;
}

:deep(.auth-btn.n-button) {
  border-radius: 999px !important;
  font-weight: 600;
}

.user-area {
  display: flex;
  align-items: center;
}

.user-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--theme-border);
  color: var(--theme-text);
}

.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.9), rgba(168, 85, 247, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.user-icon {
  width: 16px;
  height: 16px;
}

.user-name {
  font-size: 13px;
}

.user-chevron {
  color: var(--theme-text);
}

.mobile-toggle {
  border: 1px solid var(--theme-border);
  background: rgba(255, 255, 255, 0.08);
  color: var(--theme-text);
  border-radius: 12px;
  padding: 6px 10px;
}

.mobile-sheet {
  position: fixed;
  inset: 0;
  z-index: 400;
}

.sheet-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  animation: fadeIn 0.25s ease;
}

.sheet-panel {
  position: absolute;
  top: 16px;
  right: 16px;
  left: auto;
  width: min(320px, 82vw);
  background: var(--theme-footer-bg);
  border: 1px solid var(--theme-border);
  border-radius: 24px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: slideDown 0.2s ease;
}


.sheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--theme-text);
  font-weight: 700;
}

.sheet-close {
  border: none;
  background: transparent;
  color: var(--theme-text);
  font-size: 24px;
  line-height: 1;
}

.sheet-links {
  display: grid;
  gap: 10px;
}

.sheet-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 16px;
  color: var(--theme-text);
  background: rgba(255, 255, 255, 0.08);
}

.sheet-link.active {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(147, 51, 234, 0.95));
  color: #fff;
}

.sheet-link:hover {
  background: rgba(255, 255, 255, 0.14);
}

.sheet-footer {
  margin-top: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}


.sheet-user {
  border-radius: 14px;
  border: 1px solid var(--theme-border);
  background: rgba(255, 255, 255, 0.08);
  color: var(--theme-text);
  padding: 10px 14px;
  text-align: left;
  flex: 0 0 auto;
}


.sheet-user.danger {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.35);
  color: #fecaca;
}

.sheet-fade-enter-active,
.sheet-fade-leave-active {
  transition: opacity 0.2s ease;
}

.sheet-fade-enter-from,
.sheet-fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 960px) {
  .nav-links {
    display: none;
  }

  .action-block {
    display: none;
  }
}

:root[data-theme='light'] .header-surface {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 65%, rgba(226, 232, 240, 0.6) 100%);
  box-shadow: 0 18px 36px rgba(148, 163, 184, 0.25);
}

:root[data-theme='light'] .nav-links {
  background: rgba(255, 255, 255, 0.85);
}

:root[data-theme='light'] .mobile-toggle {
  background: rgba(255, 255, 255, 0.9);
}

@keyframes headerFade {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

