<template>
  <div class="flex items-center justify-between w-full">
    <!-- 左侧菜单 -->
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

    <!-- 右侧用户区域 -->
    <div class="flex items-center space-x-4">
      <!-- 未登录状态 -->
      <div v-if="!authStore.isAuthenticated" class="flex items-center space-x-2">
        <n-button @click="goToLogin" size="small" type="primary" class="!mr-4" ghost>
          登录
        </n-button>
        <n-button @click="goToRegister" size="small" type="primary">
          注册
        </n-button>
      </div>

      <!-- 已登录状态 -->
      <div v-else class="flex items-center space-x-3">
        <n-dropdown :options="userMenuOptions" @select="handleUserMenuSelect">
          <div class="flex items-center space-x-2 cursor-pointer hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
            <span class="text-white text-sm hidden md:block !ml-2">{{ authStore.user?.username }}</span>
            <n-icon size="16" color="white">
              <ChevronDownIcon />
            </n-icon>
          </div>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  AlertCircle as AlertCircleIcon,
  Book as BookIcon,
  ChevronDown as ChevronDownIcon,
  Gift as GiftIcon,
  Heart as HeartIcon,
  Home as HomeIcon,
  LogOut as LogOutIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Server as ServerIcon,
  // Settings as SettingsIcon,
  WomanSharp as ModelIcon,
} from '@vicons/ionicons5'
import type { MenuOption } from 'naive-ui'
import {  NButton, NDrawer, NDropdown, NIcon, NMenu } from 'naive-ui'
import type { Component } from 'vue'

import { defineComponent, h, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

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
            path: '/server-status',
          },
        },
        { default: () => '服务器状态' },
      ),
    key: 'server-status-page',
    icon: renderIcon(ServerIcon),
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
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/contribute',
          },
        },
        { default: () => '贡献者' },
      ),
    key: 'contribute-page',
    icon: renderIcon(HeartIcon),
  },
]

export default defineComponent({
  components: {
    NMenu,
    NDrawer,
    NButton,
    NIcon,
    // NAvatar,
    NDropdown,
    MenuIcon,
    ChevronDownIcon,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()
    const activeKey = ref<string | null>(null)
    const drawerVisible = ref(false)
    const isMobile = ref(false)

    // 用户头像配置
    const userAvatar = ref('')
    const defaultAvatar = '/src/assets/logo.svg'

    // 用户菜单选项
    const userMenuOptions = ref([
      {
        label: '个人资料',
        key: 'profile',
        icon: renderIcon(PersonIcon),
      },
      // {
      //   label: '账户设置',
      //   key: 'settings',
      //   icon: renderIcon(SettingsIcon),
      // },
      {
        type: 'divider',
        key: 'divider',
      },
      {
        label: '退出登录',
        key: 'logout',
        icon: renderIcon(LogOutIcon),
      },
    ])

    // 根据路径获取对应的菜单key
    const getActiveKeyFromPath = (path: string): string | null => {
      const pathKeyMap: Record<string, string> = {
        '/': 'go-back-home',
        '/models': 'models-page',
        '/faq': 'faq-page',
        '/registration': 'registration-page',
        '/server-status': 'server-status-page',
        '/anniversary-preheating': 'anniversary-preheating-page',
        '/anniversary': 'anniversary-page',
        '/gifts': 'gift-page',
        '/contribute': 'contribute-page',
      }
      return pathKeyMap[path] || null
    }

    // 初始化activeKey
    const initActiveKey = () => {
      activeKey.value = getActiveKeyFromPath(route.path)
    }

    // 监听路由变化
    watch(
      () => route.path,
      (newPath) => {
        activeKey.value = getActiveKeyFromPath(newPath)
      },
      { immediate: true }
    )

    const updateIsMobile = () => {
      isMobile.value = window.innerWidth < 768
    }

    // 跳转到登录页
    const goToLogin = () => {
      router.push('/login')
    }

    // 跳转到注册页
    const goToRegister = () => {
      router.push('/register')
    }

    // 处理用户菜单选择
    const handleUserMenuSelect = (key: string) => {
      switch (key) {
        case 'profile':
          // 跳转到个人资料页面
          router.push('/profile')
          break
        case 'settings':
          // 跳转到账户设置页面
          console.log('跳转到账户设置')
          break
        case 'logout':
          // 执行退出登录
          authStore.logout()
          router.push('/')
          break
      }
    }

    onMounted(() => {
      updateIsMobile()
      window.addEventListener('resize', updateIsMobile)
      // 确保组件挂载后正确设置activeKey
      initActiveKey()
      // 初始化认证状态
      authStore.initialize()
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateIsMobile)
    })

    return {
      activeKey,
      drawerVisible,
      isMobile,
      menuOptions,
      authStore,
      userMenuOptions,
      userAvatar,
      defaultAvatar,
      goToLogin,
      goToRegister,
      handleUserMenuSelect,
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
