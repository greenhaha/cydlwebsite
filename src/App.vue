<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import {
  NConfigProvider,
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NMessageProvider,
  NSpace,
} from 'naive-ui'
import { RouterView } from 'vue-router'
import AppFooter from './components/Layout/AppFooter.vue'
import HeaderMenu from './components/Layout/HeaderMenu.vue'

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
      <n-space vertical size="large">
        <n-layout class="relative">
          <n-layout-header class="n-layout-header absolute top-0 left-0 right-0 z-1">
            <div class="w-full flex align-middle">
              <HeaderMenu />
            </div>

            <!-- <div><RouterLink to="/">Home</RouterLink></div>
            <div><RouterLink to="/about">About</RouterLink></div> -->
          </n-layout-header>
          <n-layout-content class="min-h-[calc(100vh)]">
            <RouterView />
          </n-layout-content>
          <n-layout-footer class="absolute left-0 right-0 bottom-0">
            <AppFooter />
          </n-layout-footer>
        </n-layout>
      </n-space>
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
  overflow-x: hidden;
  /* 确保整个页面没有横向滚动条 */
}
</style>
