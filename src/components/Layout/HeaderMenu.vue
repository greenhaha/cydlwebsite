<template>
  <n-menu
    :options="menuOptions"
    mode="horizontal"
    class="topMenu"
    responsive
    v-model:value="activeKey"
  />
</template>

<script lang="ts">
import {
  AlertCircle as AlertCircleIcon,
  Book as BookIcon,
  Home as HomeIcon,
  WomanSharp as ModelIcon,
} from '@vicons/ionicons5'
import type { MenuOption } from 'naive-ui'
import { NIcon, NMenu } from 'naive-ui'
import type { Component } from 'vue'

import { defineComponent, h, ref } from 'vue'
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
            path: '/about',
          },
        },
        { default: () => '关于' },
      ),
    key: 'about-page',
    icon: renderIcon(BookIcon),
  },
]

export default defineComponent({
  components: {
    NMenu,
  },
  setup() {
    return {
      activeKey: ref<string | null>(null),
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
</style>
<style>
.topMenu .v-overflow {
  align-items: center;
}
.topMenu .n-menu-item-content__icon {
  color: white;
}
.topMenu.n-menu--horizontal .n-menu-item {
  height: 100%;
}

.topMenu.n-menu--horizontal .n-menu-item-content.n-menu-item-content--selected {
  background-color: rgba(22, 119, 255, 1);
}
</style>
