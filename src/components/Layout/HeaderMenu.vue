<template>
  <div class="flex items-center justify-between w-full">
    <div class="flex items-center h-full">
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
    <!-- 登录/注册 或 用户信息 -->
    <div class="flex items-center">
      <template v-if="!userStore.isLoggedIn">
        <n-button text  class="!text-white   !mr-2" @click="$router.push('/login')">登录</n-button>
        <n-button   class="!text-white border border-white ml-2" @click="$router.push('/register')">注册</n-button>
      </template>
      <template v-else>
        <n-dropdown
          trigger="click"
          :options="dropdownOptions"
          @select="handleDropdownSelect"
        >
          <div class="flex items-center cursor-pointer select-none">
            <n-avatar
              :size="36"
              :src="userStore.userInfo?.avatar || ''"
              class="mr-2"
            >
              {{ userStore.userInfo?.username?.charAt(0) || 'U' }}
            </n-avatar>
            <span v-if="!isMobile" class="font-medium text-white">{{ userStore.userInfo?.username || '用户' }}</span>
          </div>
        </n-dropdown>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  AlertCircle as AlertCircleIcon,
  Book as BookIcon,
  Gift as GiftIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  WomanSharp as ModelIcon,
} from '@vicons/ionicons5'
import type { MenuOption } from 'naive-ui'
import { NButton, NDrawer, NIcon, NMenu, NDropdown, NAvatar } from 'naive-ui'
import type { Component } from 'vue'

import { defineComponent, h, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useMessage } from 'naive-ui'

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
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/gifts',
          },
        },
        { default: () => '礼物' },
      ),
    key: 'gift-page',
    icon: renderIcon(GiftIcon),
  },
]

export default defineComponent({
  components: {
    NMenu,
    NDrawer,
    NButton,
    NIcon,
    MenuIcon,
    NDropdown,
    NAvatar,
  },
  setup() {
    const activeKey = ref<string | null>(null)
    const drawerVisible = ref(false)
    const isMobile = ref(false)
    const userStore = useUserStore()
    const router = useRouter()
    const route = useRoute()
    const showDropdown = ref(false)
    const message = useMessage()

    const updateIsMobile = () => {
      isMobile.value = window.innerWidth < 768
    }

    // 根据当前路由更新选中的菜单项
    const updateActiveKey = () => {
      const path = route.path
      switch (path) {
        case '/':
          activeKey.value = 'go-back-home'
          break
        case '/models':
          activeKey.value = 'models-page'
          break
        case '/faq':
          activeKey.value = 'faq-page'
          break
        case '/registration':
          activeKey.value = 'registration-page'
          break
        case '/gifts':
          activeKey.value = 'gift-page'
          break
        default:
          activeKey.value = null
      }
    }

    onMounted(() => {
      updateIsMobile()
      updateActiveKey()
      window.addEventListener('resize', updateIsMobile)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateIsMobile)
    })

    // 监听路由变化
    watch(
      () => route.path,
      () => {
        updateActiveKey()
      }
    )

    const handleDropdownSelect = async (key: string) => {
      if (key === 'profile') {
        router.push('/profile')
      } else if (key === 'logout') {
        await handleLogout()
      }
    }

    const handleLogout = async () => {
      try {
        const result = await userStore.logout()
        if (result.success) {
          message.success('已退出登录')
          router.push('/login')
        } else {
          message.error('退出登录失败，请稍后重试')
        }
      } catch {
        message.error('退出登录失败，请稍后重试')
      }
    }

    const dropdownOptions = [
      {
        label: '个人信息',
        key: 'profile',
      },
      {
        label: '退出登录',
        key: 'logout',
      },
    ]

    return {
      activeKey,
      drawerVisible,
      isMobile,
      menuOptions,
      userStore,
      showDropdown,
      handleDropdownSelect,
      dropdownOptions,
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
