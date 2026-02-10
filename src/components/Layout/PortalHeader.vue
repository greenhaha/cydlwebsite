<template>
  <header class="portal-header">
    <div class="portal-surface">
      <div class="portal-inner">
        <RouterLink to="/home" class="brand-link" aria-label="进入主页">
          <div class="brand-block">
            <div class="brand-mark"><img src="/favicon.ico" alt="logo" class="brand-logo" /></div>
            <div class="brand-text">
              <span class="brand-title">{{ copy.brandTitle }}</span>
              <span class="brand-subtitle">{{ copy.brandSubtitle }}</span>
            </div>
          </div>
        </RouterLink>

        <nav class="portal-nav">
          <a
            v-for="item in navItems"
            :key="item.key"
            :href="item.href"
            class="portal-link"
            :class="{ active: activeKey === item.key }"
            @click="activeKey = item.key"
          >
            {{ item.label }}
          </a>
        </nav>

        <div class="portal-actions">
          <button class="theme-toggle" type="button" @click="toggleTheme">
            <n-icon size="18">
              <component :is="themeIcon" />
            </n-icon>
            <span>{{ themeLabel }}</span>
          </button>
          <RouterLink to="/home" class="enter-home">
            <n-button size="small" type="primary" class="enter-home-btn">
              {{ copy.enterHome }}
            </n-button>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Moon, Sunny } from '@vicons/ionicons5'
import { NButton, NIcon } from 'naive-ui'
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const copy = {
  brandTitle: '黄粱一梦',
  brandSubtitle: '灵魂の雕塑',
  enterHome: '进入主页',
}

const navItems = [
  { key: 'welcome', label: '站点介绍', href: '#portal-welcome' },
  { key: 'servers', label: '服务器', href: '#portal-servers' },
  { key: 'shortcuts', label: '快捷入口', href: '#portal-shortcuts' },
  { key: 'account', label: '登录/注册', href: '#portal-account' },
]

export default defineComponent({
  components: {
    NButton,
    NIcon,
    RouterLink,
  },
  setup() {
    const theme = ref(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark')
    const activeKey = ref(navItems[0]?.key ?? '')
    let observer: IntersectionObserver | null = null
    const toggleTheme = () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', theme.value)
      localStorage.setItem('theme', theme.value)
    }
    const themeIcon = computed(() => (theme.value === 'dark' ? Moon : Sunny))
    const themeLabel = computed(() => (theme.value === 'dark' ? '暗色' : '亮色'))

    const updateActiveByEntries = (entries: IntersectionObserverEntry[]) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (!visible) return
      const id = visible.target.getAttribute('id')
      const match = navItems.find((item) => item.href.replace('#', '') === id)
      if (match) {
        activeKey.value = match.key
      }
    }

    onMounted(() => {
      observer = new IntersectionObserver(updateActiveByEntries, {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: '-20% 0px -55% 0px',
      })
      navItems.forEach((item) => {
        const id = item.href.replace('#', '')
        const el = document.getElementById(id)
        if (el) observer?.observe(el)
      })
    })

    onBeforeUnmount(() => {
      observer?.disconnect()
      observer = null
    })

    return {
      copy,
      navItems,
      toggleTheme,
      themeIcon,
      themeLabel,
      activeKey,
    }
  },
})
</script>

<style scoped>
.portal-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 300;
}

.portal-surface {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 0 16px;
  border-radius: 0;
  background: var(--theme-card-bg);
  border-bottom: 1px solid var(--theme-border);
  box-shadow: 0 16px 30px rgba(2, 6, 23, 0.22);
  backdrop-filter: blur(14px);
}

.portal-inner {
  width: min(1280px, calc(100% - 32px));
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 18px;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.brand-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.brand-link:focus-visible {
  outline: 2px solid rgba(148, 163, 184, 0.6);
  outline-offset: 4px;
  border-radius: 12px;
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

.portal-nav {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  overflow-x: auto;
  scrollbar-width: none;
  margin-left: auto;
}

.portal-nav::-webkit-scrollbar {
  display: none;
}

.portal-link {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 10px;
  color: var(--theme-muted);
  font-size: 13px;
  font-weight: 600;
  transition: background 0.2s ease, color 0.2s ease;
  white-space: nowrap;
}

.portal-link.active {
  background: rgba(148, 163, 184, 0.2);
  color: var(--theme-text);
  box-shadow: inset 0 0 0 1px var(--theme-border);
}

.portal-link:hover {
  background: rgba(148, 163, 184, 0.14);
  color: var(--theme-text);
}

.portal-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 12px;
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  border: 1px solid var(--theme-border);
  background: var(--theme-secondary-bg);
  color: var(--theme-text);
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
}

.enter-home {
  display: inline-flex;
}

:deep(.enter-home-btn.n-button) {
  border-radius: 999px !important;
  font-weight: 600;
}

@media (max-width: 980px) {
  .portal-surface {
    flex-wrap: nowrap;
    height: 72px;
    padding: 12px 16px;
    border-radius: 0;
  }

  .portal-inner {
    flex-wrap: nowrap;
    justify-content: space-between;
    row-gap: 0;
  }

  .portal-nav {
    display: none;
  }

  .portal-actions {
    margin-left: 0;
    gap: 8px;
  }

  .portal-link {
    padding: 6px 10px;
    font-size: 12px;
  }

  .theme-toggle {
    padding: 4px 8px;
    font-size: 11px;
  }

  :deep(.enter-home-btn.n-button) {
    height: 30px !important;
    padding: 0 12px !important;
    font-size: 11px !important;
  }
}

:root[data-theme='light'] .portal-surface {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 18px 30px rgba(148, 163, 184, 0.2);
}
</style>
