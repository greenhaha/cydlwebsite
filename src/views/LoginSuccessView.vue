<template>
  <div class="login-success-page">
    <!-- 专属背景 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat"
           style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/bg1.webp')">
      </div>
      <div class="home-grass pointer-events-none fixed inset-0 z-0"></div>
    </div>

    <!-- 主内容区域 -->
    <div class="success-content inset-0 h-full top-[0px] z-10 flex flex-col items-center justify-center pt-[80px] pb-8">

      <!-- 成功/失败卡片 -->
      <div class="success-card w-full max-w-md px-4">
        <div class="backdrop-blur-lg bg-black/70 rounded-2xl p-8 border border-white/20 shadow-2xl text-center">

          <!-- 成功状态 -->
          <div v-if="status === 'success'" class="space-y-6">
            <!-- 成功图标 -->
            <div class="flex justify-center">
              <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>

            <!-- 成功标题 -->
            <div>
              <h1 class="text-2xl font-bold text-white mb-2">登录成功</h1>
              <p class="text-white/80 text-sm">
                Steam 登录成功，正在跳转到主页...
              </p>
            </div>

            <!-- 加载指示器 -->
            <div class="flex justify-center">
              <svg class="animate-spin h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>

          <!-- 等待/加载状态（防止闪烁为失败） -->
          <div v-else-if="status === 'pending'" class="space-y-6">
            <div class="flex justify-center">
              <div class="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
                <svg class="w-8 h-8 text-blue-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-white mb-2">处理中...</h1>
              <p class="text-white/80 text-sm">正在确认登录状态，请稍候</p>
            </div>
          </div>

          <!-- 失败状态 -->
          <div v-else class="space-y-6">
            <!-- 失败图标 -->
            <div class="flex justify-center">
              <div class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </div>
            </div>

            <!-- 失败标题 -->
            <div>
              <h1 class="text-2xl font-bold text-white mb-2">登录失败</h1>
              <p class="text-white/80 text-sm mb-4">
                {{ errorMessage }}
              </p>
            </div>

            <!-- 重试按钮 -->
            <div class="space-y-3">
              <RouterLink
                to="/login"
                class="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-block"
              >
                返回登录页面
              </RouterLink>

              <RouterLink
                to="/"
                class="w-full py-2 px-4 text-white/80 hover:text-white transition-colors inline-block"
              >
                回到主页
              </RouterLink>
            </div>
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

// 状态: pending | success | error
const status = ref<'pending' | 'success' | 'error'>('pending')
const errorMessage = ref('未知错误')

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const qpSuccess = urlParams.get('success') === 'true'
  const qpToken = urlParams.get('token')
  const qpError = urlParams.get('error')

  // 1. 已经在 store 中认证（包括注册流程直接跳转）
  if (authStore.isAuthenticated) {
    status.value = 'success'
    // 延迟跳转
    setTimeout(() => router.push('/'), 1800)
    return
  }

  // 2. 显式错误参数优先
  if (qpError) {
    status.value = 'error'
    errorMessage.value = qpError
    return
  }

  // 3. 如果 URL 携带 token（无论 success 标志是否显式为 true），尝试使用
  if (qpToken) {
    try {
      authStore.setToken(qpToken)
      await authStore.getCurrentUser()
      status.value = 'success'
      setTimeout(() => router.push('/'), 1800)
      return
    } catch (e) {
      console.error('使用URL Token获取用户失败:', e)
      status.value = 'error'
      errorMessage.value = '登录后获取用户信息失败'
      return
    }
  }

  // 4. 若本地仅有 token（localStorage 已写入但 user 为空）尝试刷新
  if (authStore.token && !authStore.user) {
    try {
      await authStore.getCurrentUser()
      status.value = 'success'
      setTimeout(() => router.push('/'), 1800)
      return
    } catch (e) {
      console.error('本地 token 校验失败:', e)
      // 继续走失败显示
    }
  }

  // 5. 若有 success=true 但没有 token（某些后端未带 token 回来），尝试验证现有 token
  if (qpSuccess && authStore.token) {
    try {
      await authStore.getCurrentUser()
      status.value = 'success'
      setTimeout(() => router.push('/'), 1800)
      return
    } catch (e) {
      console.error('success 标志存在但拉取用户失败', e)
    }
  }

  // 6. 最终判定为错误
  status.value = 'error'
  errorMessage.value = '登录状态未确认，请重新登录'
})
</script>

<style scoped>
.home-grass {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0.1), rgba(0, 0, 0, 0.1));
}
</style>
