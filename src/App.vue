<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import {
  NConfigProvider,
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NSpace,
  NMessageProvider,
  NDialogProvider,
} from 'naive-ui'
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import AppFooter from './components/Layout/AppFooter.vue'
import HeaderMenu from './components/Layout/HeaderMenu.vue'
import FloatingQuickActions from './components/common/FloatingQuickActions.vue'

const route = useRoute()

// Header 显示逻辑：仅主导航页面显示
const headerWhitelist = new Set([
  '/home',
  '/models',
  '/faq',
  '/registration',
  '/server-status',
  '/gifts',
  '/contribute',
  '/app-download',
])
const shouldShowHeader = computed(() => headerWhitelist.has(route.path))

// Footer 显示逻辑：只有 meta.hideFooter = true 的路由隐藏，其余显示
const shouldShowFooter = computed(() => route.matched.every(r => !r.meta?.hideFooter))

const themeOverrides: GlobalThemeOverrides = {
  Menu: {
    itemColorActiveHoverHorizontal: 'rgba(22, 119, 255, 1)',
    itemTextColorHoverHorizontal: 'rgba(255, 255, 255, 1)',
    itemTextColorActiveHorizontal: '#ffffffFF',
    // itemColorActive: 'rgba(22, 119, 255, 1)',
    itemTextColorActiveHoverHorizontal: '#FFFFFFFF',
    itemTextColorChildActiveHorizontal: '#FFFFFFFF',
    itemTextColorChildActiveHoverHorizontal: '#FFFFFFFF',
    itemTextColorHorizontal: 'rgba(255, 255, 255, 0.65)',
    itemColorHoverHorizontal: 'rgba(22, 119, 255, 1)',
    itemIconColor: '#999',
    itemIconColorHoverHorizontal: 'rgba(255, 255, 255, 1)',
    itemIconColorActiveHorizontal: '#FFFFFFFF',
    itemIconColorActiveHoverHorizontal: '#FFFFFFFF',
  },
  Select: {
    color: 'var(--theme-secondary-bg)',
    textColor: 'var(--theme-text)',
    placeholderColor: 'var(--theme-muted)',
    border: '1px solid var(--theme-border)',
    borderHover: '1px solid var(--theme-border)',
    borderActive: '1px solid var(--theme-border)',
    menuColor: 'var(--theme-card-bg)',
    optionColorPending: 'var(--theme-secondary-bg)',
    optionColorActive: 'var(--theme-secondary-bg)',
    optionColorSelected: 'var(--theme-secondary-bg)',
    optionTextColor: 'var(--theme-text)',
    optionTextColorActive: 'var(--theme-text)',
    optionTextColorSelected: 'var(--theme-text)',
    optionCheckColor: '#22c55e',
  },
  InternalSelection: {
    color: 'var(--theme-secondary-bg)',
    textColor: 'var(--theme-text)',
    placeholderColor: 'var(--theme-muted)',
    border: '1px solid var(--theme-border)',
    borderHover: '1px solid var(--theme-border)',
    borderActive: '1px solid var(--theme-border)',
  },

}
</script>

<template>
  <n-config-provider preflight-style-disabled :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <n-space vertical size="large">
          <n-layout class="relative flex flex-col min-h-screen">
            <n-layout-header v-if="shouldShowHeader" class="n-layout-header absolute top-0 left-0 right-0 z-1">
              <div class="w-full flex align-middle"><HeaderMenu /></div>

            </n-layout-header>
            <n-layout-content class="flex-1">
              <RouterView />
            </n-layout-content>
            <n-layout-footer v-if="shouldShowFooter" class="w-full"><AppFooter /></n-layout-footer>
            <FloatingQuickActions />
          </n-layout>
        </n-space>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    // NButton,
    HeaderMenu,
    NLayoutContent,
    NLayout,
    NLayoutHeader,
    NLayoutFooter,
    NSpace,
    NDialogProvider,
  },
})
</script>
<style scoped>
.n-layout-header {
  height: 0;
  padding: 0;
  color: var(--theme-text);
  line-height: 0;
  background-color: transparent;
  width: 100vw;
  display: flex;
  z-index: 50;
}




n-layout-footer {
  text-align: center;
  padding: 0;
  display: block;
}

n-layout-content {
  flex: 1;
  background-color: transparent;
  min-height: 0;
}

n-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>

<style>
body {
  overflow-x: hidden; /* 确保整个页面没有横向滚动条 */
}
</style>
