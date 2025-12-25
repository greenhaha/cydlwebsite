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

// Header 显示逻辑：某些沉浸式页面隐藏顶部导航
const shouldShowHeader = computed(() => {
  const hiddenHeaderPrefixes = ['/anniversary', '/challenge', '/lottery', '/anniversary-preheating', '/wish-credit-exchange', '/wish-exchange', '/activity', '/hotpoints-exchange', '/profile']
  return !hiddenHeaderPrefixes.some(prefix => route.path === prefix || route.path.startsWith(`${prefix}/`))
})

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
}
</script>

<template>
  <n-config-provider preflight-style-disabled :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <n-space vertical size="large">
          <n-layout class="relative">
            <n-layout-header v-if="shouldShowHeader" class="n-layout-header absolute top-0 left-0 right-0 z-1">
              <div class="w-full flex align-middle"><HeaderMenu /></div>

              <!-- <div><RouterLink to="/">Home</RouterLink></div>
              <div><RouterLink to="/about">About</RouterLink></div> -->
            </n-layout-header>
            <n-layout-content class="min-h-[calc(100vh)]">
              <RouterView />
            </n-layout-content>
            <n-layout-footer v-if="shouldShowFooter" class="absolute left-0 right-0 bottom-0"><AppFooter /></n-layout-footer>
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
  height: 64px;
  padding: 0 50px;
  color: #fff;
  line-height: 64px;
  /* background: #ebebeb; */
  background-color: #001529;
  width: 100vw;
  display: flex;
  z-index: 50;
}

n-layout-footer {
  text-align: center;
  padding: 16px;
  display: flex;
}

n-layout-content {
  background-color: #fff;
  min-height: calc(100vh - 64px);
}
n-layout {
  min-height: 100vh;
}
</style>

<style>
body {
  overflow-x: hidden; /* 确保整个页面没有横向滚动条 */
}
</style>
