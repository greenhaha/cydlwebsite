<template>
  <div class="login-page">
    <!-- 专属背景 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat"
           style="background-image: url('https://oss.kigermap.com/frontend/assets/image/bg1.webp')">
      </div>
      <div class="home-grass pointer-events-none fixed inset-0 z-0"></div>
    </div>

    <!-- 主内容区域 -->
    <div class="login-content inset-0 h-full top-[0px] z-10 flex flex-col items-center justify-center pt-[80px] pb-8">
      <!-- 顶部导航 -->
      <div class="fixed top-0 left-0 right-0 z-30 bg-black/60 backdrop-blur-md border-b border-white/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <RouterLink
            to="/"
            class="inline-flex items-center px-4 py-2 text-white/90 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/20 bg-black/30"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            返回主页
          </RouterLink>
        </div>
      </div>

      <!-- 登录表单 -->
      <div class="login-form-container w-full max-w-md px-4">
        <div class="backdrop-blur-lg bg-black/70 rounded-2xl p-8 border border-white/20 shadow-2xl">
          <!-- 标题 -->
          <div class="text-center !mb-8">
            <h1 class="text-3xl font-bold text-white mb-2 text-shadow-lg">
              用户登录
            </h1>
            <p class="text-white/80 text-sm text-shadow">
              登录你的账户，开始游戏之旅
            </p>
          </div>

          <!-- 错误提示 -->
          <div v-if="authStore.error" class="!mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p class="text-red-300 text-sm text-center">{{ authStore.error }}</p>
          </div>

          <!-- 登录表单 -->
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- 用户名输入 -->
            <div class="!mb-2">
              <label class="block text-white/90 text-sm font-medium !mb-2 text-shadow">
                用户名或邮箱
              </label>
              <input
                v-model="loginForm.username"
                type="text"
                required
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                placeholder="请输入用户名或邮箱"
              >
            </div>

            <!-- 密码输入 -->
            <div>
              <label class="block text-white/90 text-sm font-medium !mb-2 text-shadow">
                密码
              </label>
              <div class="relative">
                <input
                  v-model="loginForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm pr-12"
                  placeholder="请输入密码"
                >
                <button
                  type="button"
                  @click="togglePassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors"
                >
                  <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L12 12M12 12l2.122 2.122"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- 记住我选项 -->
            <div class="flex items-center justify-between !m-4">
              <!-- <label class="flex items-center">
                <input
                  v-model="loginForm.rememberMe"
                  type="checkbox"
                  class="rounded border-white/20 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 bg-white/10"
                >
                <span class="ml-2 text-white/80 text-sm text-shadow">记住我</span>
              </label> -->

            </div>

            <!-- 登录按钮 -->
            <button
              type="submit"
              :disabled="authStore.isLoading"
              class="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div v-if="authStore.isLoading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                登录中...
              </div>
              <span v-else>登录</span>
            </button>
          </form>

          <!-- 分割线 -->
          <div class="!my-6 flex items-center">
            <div class="flex-1 h-px bg-white/20"></div>
            <span class="px-4 text-white/60 text-sm">或使用第三方登录</span>
            <div class="flex-1 h-px bg-white/20"></div>
          </div>

          <!-- Steam登录按钮 -->
          <button
            @click="handleSteamLogin"
            :disabled="steamLoading"
            type="button"
            class="w-full py-3 px-4 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
          >
            <div v-if="steamLoading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              跳转中...
            </div>
            <div v-else class="flex items-center justify-center space-x-3">
              <!-- Steam Logo -->
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <path d="M8.5 12.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5zm7 0c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5z"/>
              </svg>
              <span>使用 Steam 登录</span>
            </div>
          </button>

          <!-- 分割线 -->
          <div class="!my-6 flex items-center">
            <div class="flex-1 h-px bg-white/20"></div>
            <div class="flex-1 h-px bg-white/20"></div>
          </div>

          <!-- 注册链接 -->
          <div class="text-center">
            <p class="text-white/80 text-sm text-shadow">
              还没有账户？
              <RouterLink
                to="/register"
                class="text-blue-400 hover:text-blue-300 font-medium transition-colors ml-1"
              >
                立即注册
              </RouterLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// 表单数据
const loginForm = ref({
  username: '',
  password: '',
  rememberMe: false
})

// 密码显示控制
const showPassword = ref(false)
// Steam登录状态
const steamLoading = ref(false)

// 切换密码显示
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// 处理登录
const handleLogin = async () => {
  try {
    // 清除之前的错误
    authStore.clearError()

    // 执行登录
    await authStore.login(loginForm.value.username, loginForm.value.password)

    // 登录成功，跳转到主页
    router.push('/')
  } catch (error) {
    // 错误已经在store中处理
    console.error('登录失败:', error)
  }
}

// 处理Steam登录
const handleSteamLogin = async () => {
  try {
    steamLoading.value = true
    authStore.clearError()

    // 调用后端获取Steam登录URL
    // 注意：Steam 认证控制器后端当前基础路径为 /api/auth/steam (没有 /v1)。如后端未来改为 /api/v1/auth/steam 需同步此处。
    const response = await fetch('/api/auth/steam/login', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('HTTP Error:', response.status, errorText)
      throw new Error(`HTTP ${response.status}: 获取Steam登录URL失败`)
    }

    const data = await response.json()
    console.log('Steam login response:', data)

    if (!data.success) {
      throw new Error(data.message || 'Steam登录失败')
    }

    // 重定向到Steam登录页面
    window.location.href = data.loginUrl
  } catch (error) {
    console.error('Steam登录失败:', error)
    if (error instanceof SyntaxError) {
      authStore.setError('服务器响应格式错误，请检查后端服务是否正常运行')
    } else {
      authStore.setError(error instanceof Error ? error.message : 'Steam登录失败')
    }
  } finally {
    steamLoading.value = false
  }
}

// 页面加载时检查是否已登录
onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push('/')
  }
})
</script>

<style scoped>
.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.text-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

.home-grass {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0.1), rgba(0, 0, 0, 0.1));
}

/* 自定义checkbox样式 */
input[type="checkbox"] {
  appearance: none;
  width: 1rem;
  height: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.25rem;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
  cursor: pointer;
}

input[type="checkbox"]:checked {
  background: #3b82f6;
  border-color: #3b82f6;
}

input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 4px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
