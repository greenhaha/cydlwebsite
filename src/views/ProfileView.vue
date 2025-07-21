<template>
  <div class="profile-page">
    <!-- 专属背景 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" 
           style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/bg1.webp')">
      </div>
      <div class="home-grass pointer-events-none fixed inset-0 z-0"></div>
    </div>

    <!-- 主内容区域 -->
    <div class="profile-content inset-0 h-full top-[0px] z-10 flex flex-col items-center justify-start pt-[80px] pb-8">
      <!-- 顶部导航 -->
      <div class="fixed top-0 left-0 right-0 z-30 bg-black/60 backdrop-blur-md border-b border-white/20">
        <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div class="flex items-center justify-between">
            <RouterLink 
              to="/"
              class="inline-flex items-center px-4 py-2 text-white/90 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/20 bg-black/30"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              返回主页
            </RouterLink>
            
            <!-- 用户信息显示 -->
            <div v-if="authStore.isAuthenticated" class="flex items-center space-x-3">
              <div class="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg border border-white/20">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div class="text-white !ml-2">
                  <span class="text-sm font-medium">{{ currentUser?.username || '用户' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 页面标题 -->
      <div class="page-header w-full max-w-[1200px] px-4 mb-8 z-20 text-center">
        <div class="relative mb-8">
          <div class="relative z-10">
            <!-- 顶部装饰线 -->
            <div class="flex items-center justify-center !mb-6">
              <div class="h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent w-24"></div>
              <div class="mx-3 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
              <div class="h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent w-24"></div>
            </div>
            
            <!-- 主标题 -->
            <div class="!mb-4 relative text-center">
              <h1 class="text-[24px] md:text-[24px] lg:text-[24px] font-black text-white mb-3 tracking-tight leading-none drop-shadow-2xl text-shadow-lg">
                个人信息
              </h1>
            </div>
            
            <!-- 副标题 -->
            <h2 class="text-[16px] md:text-[16px] lg:text-[16px] font-medium text-white/95 mb-4 tracking-wide text-center drop-shadow-lg text-shadow">
              管理你的个人资料和游戏信息
            </h2>
            
            <!-- 底部装饰线 -->
            <div class="flex items-center justify-center !mb-8">
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-32"></div>
              <div class="mx-3 w-1.5 h-1.5 bg-white/60 rounded-full"></div>
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-32"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 个人信息卡片 -->
      <div class="profile-form-container w-full max-w-4xl px-4">
        <!-- 加载状态 -->
        <div v-if="isLoadingProfile" class="flex items-center justify-center py-12">
          <div class="flex items-center space-x-3 p-4 bg-black/60 rounded-lg border border-white/20">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            <span class="text-white">正在加载用户信息...</span>
          </div>
        </div>
        
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- 左侧：基本信息 -->
          <div class="backdrop-blur-lg bg-black/70 rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div class="mb-6">
              <h3 class="text-2xl font-bold text-white mb-2 text-shadow-lg">基本信息</h3>
              <p class="text-white/80 text-sm">查看你的账户基本信息</p>
            </div>

            <!-- 用户头像 -->
            <div class="flex items-center justify-center !mb-6">
              <div class="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
            </div>

            <!-- 基本信息展示 -->
            <div class="space-y-4 bg-white/5 rounded-lg">
              <div class="flex items-center justify-between p-3">
                <span class="text-white/80 text-sm">用户名</span>
                <span class="text-white font-medium">{{ currentUser?.username || '未设置' }}</span>
              </div>
              <div class="flex items-center justify-between p-3">
                <span class="text-white/80 text-sm">邮箱</span>
                <span class="text-white font-medium">{{ currentUser?.email || '未设置' }}</span>
              </div>
              <div class="flex items-center justify-between p-3">
                <span class="text-white/80 text-sm">注册时间</span>
                <span class="text-white font-medium">{{ formatDate(currentUser?.createTime) || '未知' }}</span>
              </div>
              <div class="flex items-center justify-between p-3">
                <span class="text-white/80 text-sm">最后登录</span>
                <span class="text-white font-medium">{{ formatDate(currentUser?.lastLoginAt) || '未知' }}</span>
              </div>
              <!-- 绑定状态快览 -->
              <div class="border-t border-white/10 pt-3">
                <p class="text-white/80 text-sm !mb-2 pl-2">账户绑定状态</p>
                <div class="flex items-center justify-between p-2 !mt-2">
                  <span class="text-white/70 text-sm">QQ账户</span>
                  <span class="text-sm font-medium" :class="currentUser?.qqId ? 'text-green-300' : 'text-gray-400'">
                    {{ currentUser?.qqId || '未绑定' }}
                  </span>
                </div>
                <div class="flex items-center justify-between p-2  !mt-2">
                  <span class="text-white/70 text-sm">Steam账户</span>
                  <span class="text-sm font-medium" :class="currentUser?.steamId64 ? 'text-green-300' : 'text-gray-400'">
                    {{ currentUser?.steamId64 || '未绑定' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧：游戏信息绑定 -->
          <div class="backdrop-blur-lg bg-black/70 rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div class="!mb-6">
              <h3 class="text-2xl font-bold text-white mb-2 text-shadow-lg">游戏信息绑定</h3>
              <p class="text-white/80 text-sm">绑定你的游戏账号信息</p>
            </div>

            <!-- 修改次数提示 -->
            
            <!-- 错误提示 -->
            <div v-if="error" class="!mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p class="text-red-300 text-sm">{{ error }}</p>
            </div>

            <!-- 成功提示 -->
            <div v-if="successMessage" class="!mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
              <p class="text-green-300 text-sm">{{ successMessage }}</p>
            </div>

            <!-- 绑定表单 -->
            <div class="space-y-6">
              <!-- QQ号绑定 -->
              <div class="p-5 bg-blue-500/20 border border-blue-500/50 rounded-lg">
                <div class="flex items-center justify-between !mb-4">
                  <h4 class="text-blue-300 font-medium text-lg">QQ账户绑定</h4>
                  <span class="px-3 py-1 rounded-full text-sm font-medium border" 
                        :class="currentUser?.qqId ? 'bg-green-500/20 border-green-500/50 text-green-300' : 'bg-gray-500/20 border-gray-500/50 text-gray-300'">
                    {{ currentUser?.qqId ? '已绑定' : '未绑定' }}
                  </span>
                </div>
                
                <div v-if="currentUser?.qqId" class="space-y-4">
                  <div class="p-3 bg-green-500/20 border border-green-500/50 rounded-lg !mb-4">
                    <p class="text-green-300 font-medium">已绑定QQ: {{ currentUser.qqId }}</p>
                  </div>
                  <button
                    @click="handleUnbindQQ"
                    :disabled="isLoading || remainingModifications <= 0"
                    class="w-full px-4 py-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 hover:bg-red-500/30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M21.731 13.855a2.25 2.25 0 01-3.168 0l-1.591-1.591a2.25 2.25 0 010-3.168l1.591-1.591a2.25 2.25 0 013.168 0l1.591 1.591a2.25 2.25 0 010 3.168l-1.591 1.591z"/>
                    </svg>
                    <span>解绑QQ账户</span>
                  </button>
                </div>
                
                <div v-else class="space-y-4">
                  <div class="relative !mb-4">
                    <input
                      v-model="formData.qqId"
                      type="text"
                      placeholder="请输入你的QQ号"
                      class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      :disabled="isLoading || remainingModifications <= 0"
                    />
                  </div>
                  <button
                    @click="handleBindQQ"
                    :disabled="isLoading || remainingModifications <= 0 || !formData.qqId.trim()"
                    class="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                    <span>绑定QQ账户</span>
                    <span class="text-sm">
                      (剩余: {{ remainingModifications }}次)
                    </span>
                  </button>
                </div>
                
                <p class="text-blue-200 text-sm !mt-2">用于游戏内联系和活动通知</p>
              </div>

              <!-- Steam64ID绑定 -->
              <div class="p-5 bg-green-500/20 border border-green-500/50 rounded-lg !mt-4">
                <div class="flex items-center justify-between !mb-4">
                  <h4 class="text-green-300 font-medium text-lg">Steam账户绑定</h4>
                  <span class="px-3 py-1 rounded-full text-sm font-medium border" 
                        :class="currentUser?.steamId64 ? 'bg-green-500/20 border-green-500/50 text-green-300' : 'bg-gray-500/20 border-gray-500/50 text-gray-300'">
                    {{ currentUser?.steamId64 ? '已绑定' : '未绑定' }}
                  </span>
                </div>
                
                <div v-if="currentUser?.steamId64" class="space-y-4">
                  <div class="p-3 bg-green-500/20 border border-green-500/50 rounded-lg !mb-4">
                    <p class="text-green-300 font-medium">已绑定Steam ID: {{ currentUser.steamId64 }}</p>
                  </div>
                  <button
                    @click="handleUnbindSteam"
                    :disabled="isLoading || remainingModifications <= 0"
                    class="w-full px-4 py-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 hover:bg-red-500/30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M21.731 13.855a2.25 2.25 0 01-3.168 0l-1.591-1.591a2.25 2.25 0 010-3.168l1.591-1.591a2.25 2.25 0 013.168 0l1.591 1.591a2.25 2.25 0 010 3.168l-1.591 1.591z"/>
                    </svg>
                    <span>解绑Steam账户</span>
                  </button>
                </div>
                
                <div v-else class="space-y-4">
                  <div class="relative !mb-4">
                    <input
                      v-model="formData.steamId64"
                      type="text"
                      placeholder="请输入你的Steam64ID"
                      class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      :disabled="isLoading || remainingModifications <= 0"
                    />
                  </div>
                  <button
                    @click="handleBindSteam"
                    :disabled="isLoading || remainingModifications <= 0 || !formData.steamId64.trim()"
                    class="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                    <span>绑定Steam账户</span>
                    <span class="text-sm">
                      (剩余: {{ remainingModifications }}次)
                    </span>
                  </button>
                </div>
                
                <p class="text-green-200 text-sm !mt-2">用于游戏数据统计和奖励发放</p>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { bindingApi, authApi, type UserProfileResponse } from '@/services/api'

// 路由和认证store
const router = useRouter()
const authStore = useAuthStore()

// 响应式数据
const isLoading = ref(false)
const error = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const remainingModifications = ref(3)
const userProfile = ref<UserProfileResponse | null>(null)
const isLoadingProfile = ref(false)

// 表单数据
const formData = ref({
  qqId: '',
  steamId64: ''
})

// 计算属性：获取当前用户数据（优先使用 userProfile）
const currentUser = computed(() => userProfile.value || authStore.user)

// 格式化日期
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '未知'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return '未知'
  }
}

// 初始化表单数据
const initializeForm = () => {
  // 优先使用 userProfile 数据，如果没有则使用 authStore 数据
  const user = currentUser.value
  formData.value.qqId = user?.qqId || ''
  formData.value.steamId64 = user?.steamId64 || ''
}

// 获取用户详细信息
const loadUserProfile = async () => {
  try {
    isLoadingProfile.value = true
    error.value = null
    
    const profile = await authApi.getUserProfile()
    userProfile.value = profile
    
    // 更新表单数据
    initializeForm()
    
  } catch (err) {
    console.error('获取用户信息失败:', err)
    error.value = err instanceof Error ? err.message : '获取用户信息失败'
  } finally {
    isLoadingProfile.value = false
  }
}

// 绑定QQ账户
const handleBindQQ = async () => {
  if (!formData.value.qqId.trim()) {
    error.value = '请输入QQ号'
    return
  }

  if (remainingModifications.value <= 0) {
    error.value = '今日修改次数已用完，请明天再试'
    return
  }

  try {
    isLoading.value = true
    error.value = null
    successMessage.value = null

    await bindingApi.bindQQAccount(formData.value.qqId.trim())
    
    // 更新认证store中的用户信息
    await authStore.initialize()
    
    // 重新获取用户详细信息
    await loadUserProfile()
    
    // 减少剩余修改次数
    remainingModifications.value--
    saveModificationCount()
    
    successMessage.value = 'QQ账户绑定成功！'
    formData.value.qqId = ''
    
    // 3秒后清除成功消息
    setTimeout(() => {
      successMessage.value = null
    }, 3000)

  } catch (err) {
    error.value = err instanceof Error ? err.message : 'QQ账户绑定失败，请重试'
  } finally {
    isLoading.value = false
  }
}

// 解绑QQ账户
const handleUnbindQQ = async () => {
  if (remainingModifications.value <= 0) {
    error.value = '今日修改次数已用完，请明天再试'
    return
  }

  try {
    isLoading.value = true
    error.value = null
    successMessage.value = null

    await bindingApi.unbindQQAccount()
    
    // 更新认证store中的用户信息
    await authStore.initialize()
    
    // 重新获取用户详细信息
    await loadUserProfile()
    
    // 减少剩余修改次数
    remainingModifications.value--
    saveModificationCount()
    
    successMessage.value = 'QQ账户解绑成功！'
    
    // 3秒后清除成功消息
    setTimeout(() => {
      successMessage.value = null
    }, 3000)

  } catch (err) {
    error.value = err instanceof Error ? err.message : 'QQ账户解绑失败，请重试'
  } finally {
    isLoading.value = false
  }
}

// 绑定Steam账户
const handleBindSteam = async () => {
  if (!formData.value.steamId64.trim()) {
    error.value = '请输入Steam64ID'
    return
  }

  if (remainingModifications.value <= 0) {
    error.value = '今日修改次数已用完，请明天再试'
    return
  }

  try {
    isLoading.value = true
    error.value = null
    successMessage.value = null

    await bindingApi.bindSteamAccount(formData.value.steamId64.trim())
    
    // 更新认证store中的用户信息
    await authStore.initialize()
    
    // 重新获取用户详细信息
    await loadUserProfile()
    
    // 减少剩余修改次数
    remainingModifications.value--
    saveModificationCount()
    
    successMessage.value = 'Steam账户绑定成功！'
    formData.value.steamId64 = ''
    
    // 3秒后清除成功消息
    setTimeout(() => {
      successMessage.value = null
    }, 3000)

  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Steam账户绑定失败，请重试'
  } finally {
    isLoading.value = false
  }
}

// 解绑Steam账户
const handleUnbindSteam = async () => {
  if (remainingModifications.value <= 0) {
    error.value = '今日修改次数已用完，请明天再试'
    return
  }

  try {
    isLoading.value = true
    error.value = null
    successMessage.value = null

    await bindingApi.unbindSteamAccount()
    
    // 更新认证store中的用户信息
    await authStore.initialize()
    
    // 重新获取用户详细信息
    await loadUserProfile()
    
    // 减少剩余修改次数
    remainingModifications.value--
    saveModificationCount()
    
    successMessage.value = 'Steam账户解绑成功！'
    
    // 3秒后清除成功消息
    setTimeout(() => {
      successMessage.value = null
    }, 3000)

  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Steam账户解绑失败，请重试'
  } finally {
    isLoading.value = false
  }
}

// 获取每日修改次数
const loadModificationCount = async () => {
  try {
    // 这里可以调用API获取今日已使用的修改次数
    // const response = await authApi.getModificationCount()
    // remainingModifications.value = 3 - response.usedCount
    
    // 暂时使用本地存储模拟
    const today = new Date().toDateString()
    const savedData = localStorage.getItem(`profile_modifications_${today}`)
    const usedCount = savedData ? parseInt(savedData) : 0
    remainingModifications.value = Math.max(0, 3 - usedCount)
  } catch (err) {
    console.error('获取修改次数失败:', err)
  }
}

// 保存修改次数到本地存储
const saveModificationCount = () => {
  const today = new Date().toDateString()
  const usedCount = 3 - remainingModifications.value
  localStorage.setItem(`profile_modifications_${today}`, usedCount.toString())
}

// 组件挂载时初始化
onMounted(async () => {
  // 检查认证状态
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }

  // 初始化表单和数据
  await loadUserProfile()
  await loadModificationCount()
})

// 监听修改次数变化，保存到本地存储
watch(() => remainingModifications.value, saveModificationCount)
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
}

.profile-content {
  min-height: 100vh;
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.text-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

.home-grass {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.5) 100%
  );
}

/* 输入框焦点样式 */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
