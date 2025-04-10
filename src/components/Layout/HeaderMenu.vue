<template>
  <div class="flex items-center">
    <n-menu
      v-if="!isMobile"
      :options="menuOptions"
      mode="horizontal"
      class="topMenu"
      responsive
      v-model:value="activeKey"
    />
    <n-drawer v-else v-model:show="drawerVisible" placement="left" width="240">
      <template #header>
        <div class="drawer-header">菜单</div>
      </template>
      <n-menu
        :options="menuOptions"
        mode="vertical"
        v-model:value="activeKey"
        class="drawer-menu"
      />
    </n-drawer>
    <n-button v-if="isMobile" @click="drawerVisible = true" class="menu-button" color="#2080f0">
      <template #icon>
        <n-icon>
          <MenuIcon />
        </n-icon>
      </template>
    </n-button>
  </div>
</template>

<script lang="ts">
import {
  AlertCircle as AlertCircleIcon,
  Book as BookIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  WomanSharp as ModelIcon,
} from '@vicons/ionicons5'
import type { MenuOption } from 'naive-ui'
import { NButton, NDrawer, NIcon, NMenu } from 'naive-ui'
import type { Component } from 'vue'

import { defineComponent, h, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'home',
            params: {
              lang: 'zh-CN',
            },
          },
        },
        { default: () => '首页' },
      ),
    key: 'go-back-home',
    icon: renderIcon(HomeIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/models',
          },
        },
        { default: () => '模型图鉴' },
      ),
    key: 'models-page',
    icon: renderIcon(ModelIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/faq',
          },
        },
        { default: () => '常见问题' },
      ),
    key: 'faq-page',
    icon: renderIcon(AlertCircleIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/registration',
          },
        },
        { default: () => '签到' },
      ),
    key: 'registration-page',
    icon: renderIcon(BookIcon),
  },
]

export default defineComponent({
  components: {
    NMenu,
    NDrawer,
    NButton,
    NIcon,
    MenuIcon,
  },
  setup() {
    const activeKey = ref<string | null>(null)
    const drawerVisible = ref(false)
    const isMobile = ref(false)

    const updateIsMobile = () => {
      isMobile.value = window.innerWidth < 768
    }

    onMounted(() => {
      updateIsMobile()
      window.addEventListener('resize', updateIsMobile)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateIsMobile)
    })

    return {
      activeKey,
      drawerVisible,
      isMobile,
      menuOptions,
    }
  },
})
</script>

<style scoped>
.topMenu {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中（可选，根据需求） */
  height: 100%; /* 确保菜单占满父容器的高度 */
}

.menu-button {
  position: absolute;
  top: 16px;
  left: 16px;
}

.drawer-header {
  font-size: 18px;
  font-weight: bold;
  padding: 16px;
}

.drawer-menu {
  padding: 16px;
}
</style>

<style>
.topMenu.n-menu--horizontal {
  height: 100%;
}
.topMenu .v-overflow {
  align-items: center;
}
.topMenu.n-menu--horizontal .n-menu-item {
  height: 100%;
}
.topMenu.n-menu--horizontal .n-menu-item-content.n-menu-item-content--selected {
  background-color: rgba(22, 119, 255, 1);
}
</style>
