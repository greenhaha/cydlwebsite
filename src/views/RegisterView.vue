<template>
  <div class="register-page">
    <!-- 专属背景 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" 
           style="background-image: url('/src/assets/image/bg1.webp')">
      </div>
      <div class="home-grass pointer-events-none fixed inset-0 z-0"></div>
    </div>

    <!-- 主内容区域 -->
    <div class="register-content inset-0 h-full top-[0px] z-10 flex flex-col items-center justify-center pt-[80px] pb-8">
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

      <!-- 注册表单 -->
      <div class="register-form-container w-full max-w-md px-4">
        <div class="backdrop-blur-lg bg-black/70 rounded-2xl p-8 border border-white/20 shadow-2xl">
          <!-- 标题 -->
          <div class="text-center !mb-8">
            <h1 class="text-3xl font-bold text-white mb-2 text-shadow-lg">
              用户注册
            </h1>
            <p class="text-white/80 text-sm text-shadow">
              创建你的账户，开始游戏之旅
            </p>
          </div>

          <!-- 错误提示 -->
          <div v-if="authStore.error" class="!mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p class="text-red-300 text-sm text-center">{{ authStore.error }}</p>
          </div>

          <!-- 成功提示 -->
          <div v-if="registerSuccess" class="!mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
            <p class="text-green-300 text-sm text-center">注册成功！请前往登录页面登录。</p>
          </div>

          <!-- 注册表单 -->
          <form @submit.prevent="handleRegister" class="space-y-6">
            <!-- 用户名输入 -->
            <div class="!my-2">
              <label class="block text-white/90 text-sm font-medium mb-2 text-shadow">
                用户名 <span class="text-red-400">*</span>
              </label>
              <input
                v-model="registerForm.username"
                type="text"
                required
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                placeholder="请输入用户名"
              >
            </div>

            <!-- 邮箱输入 -->
            <div class="!my-2">
              <label class="block text-white/90 text-sm font-medium mb-2 text-shadow">
                邮箱 <span class="text-red-400">*</span>
              </label>
              <input
                v-model="registerForm.email"
                type="email"
                required
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                placeholder="请输入邮箱地址"
              >
            </div>

            <!-- 密码输入 -->
            <div class="!my-2">
              <label class="block text-white/90 text-sm font-medium mb-2 text-shadow">
                密码 <span class="text-red-400">*</span>
              </label>
              <div class="relative">
                <input
                  v-model="registerForm.password"
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

            <!-- 确认密码输入 -->
            <div class="!my-2">
              <label class="block text-white/90 text-sm font-medium !mb-2 text-shadow">
                确认密码 <span class="text-red-400">*</span>
              </label>
              <div class="relative">
                <input
                  v-model="registerForm.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm pr-12"
                  placeholder="请再次输入密码"
                >
                <button
                  type="button"
                  @click="toggleConfirmPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors"
                >
                  <svg v-if="showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L12 12M12 12l2.122 2.122"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Steam ID（可选） -->
            <div class="!my-2">
              <label class="block text-white/90 text-sm font-medium mb-2 text-shadow">
                Steam ID64 <span class="text-gray-400">(可选)</span>
              </label>
              <input
                v-model="registerForm.steamId64"
                type="text"
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                placeholder="请输入Steam ID64"
              >
            </div>

            <!-- QQ号（可选） -->
            <div class="!my-2">
              <label class="block text-white/90 text-sm font-medium mb-2 text-shadow">
                QQ号 <span class="text-gray-400">(可选)</span>
              </label>
              <input
                v-model="registerForm.qqId"
                type="text"
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                placeholder="请输入QQ号"
              >
            </div>

            <!-- 服务条款 -->
            <div class="flex items-start !my-4">
              <input
                v-model="registerForm.acceptTerms"
                type="checkbox"
                required
                class="!mt-1 rounded border-white/20 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 bg-white/10"
              >
              <label class="!ml-2 text-white/80 text-sm text-shadow">
                我已阅读并同意
                <a href="#" class="text-blue-400 hover:text-blue-300 transition-colors">服务条款</a>
                和
                <a href="#" class="text-blue-400 hover:text-blue-300 transition-colors">隐私政策</a>
                <span class="text-red-400">*</span>
              </label>
            </div>

            <!-- 注册按钮 -->
            <button
              type="submit"
              :disabled="authStore.isLoading || !isFormValid"
              class="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div v-if="authStore.isLoading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                注册中...
              </div>
              <span v-else>注册</span>
            </button>
          </form>

          <!-- 分割线 -->
          <div class="!my-6 flex items-center">
            <div class="flex-1 h-px bg-white/20"></div>
            <span class="px-4 text-white/60 text-sm">或</span>
            <div class="flex-1 h-px bg-white/20"></div>
          </div>

          <!-- 登录链接 -->
          <div class="text-center">
            <p class="text-white/80 text-sm text-shadow">
              已有账户？
              <RouterLink 
                to="/login"
                class="text-blue-400 hover:text-blue-300 font-medium transition-colors ml-1"
              >
                立即登录
              </RouterLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// 表单数据
const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  steamId64: '',
  qqId: '',
  acceptTerms: false
})

// 密码显示控制
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const registerSuccess = ref(false)

// 表单验证
const isFormValid = computed(() => {
  return registerForm.value.username.trim() !== '' &&
         registerForm.value.email.trim() !== '' &&
         registerForm.value.password.trim() !== '' &&
         registerForm.value.confirmPassword.trim() !== '' &&
         registerForm.value.password === registerForm.value.confirmPassword &&
         registerForm.value.acceptTerms
})

// 切换密码显示
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

// 处理注册
const handleRegister = async () => {
  try {
    // 清除之前的错误
    authStore.clearError()
    
    // 检查密码确认
    if (registerForm.value.password !== registerForm.value.confirmPassword) {
      authStore.error = '两次输入的密码不一致'
      return
    }
    
    // 执行注册
    await authStore.register({
      username: registerForm.value.username,
      email: registerForm.value.email,
      password: registerForm.value.password,
      confirmPassword: registerForm.value.confirmPassword,
      steamId64: registerForm.value.steamId64 || undefined,
      qqId: registerForm.value.qqId || undefined
    })
    
    // 注册成功
    registerSuccess.value = true
    
    // 3秒后跳转到登录页面
    setTimeout(() => {
      router.push('/login')
    }, 3000)
    
  } catch (error) {
    // 错误已经在store中处理
    console.error('注册失败:', error)
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
  flex-shrink: 0;
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
