import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi, type ValidateTokenResponse } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const user = ref<ValidateTokenResponse | null>(null)
  const token = ref<string | null>(localStorage.getItem('authToken'))
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 计算属性
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  // 登录
  const login = async (username: string, password: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await authApi.login({ username, password })
      
      // 设置token和用户信息
      token.value = response.token
      user.value = response.user
      
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : '登录失败'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // 注册
  const register = async (registerData: {
    username: string
    password: string
    confirmPassword: string
    email: string
    steamId64?: string
    qqId?: string
  }) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await authApi.register(registerData)
      
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : '注册失败'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // 验证Token
  const validateToken = async () => {
    if (!token.value) return false

    try {
      const userData = await authApi.validateToken()
      user.value = userData
      return true
    } catch (err) {
      console.error('Token验证失败:', err)
      logout()
      return false
    }
  }

  // 刷新Token
  const refreshToken = async () => {
    try {
      const response = await authApi.refreshToken()
      token.value = response.token
      user.value = response.user
      return response
    } catch (err) {
      console.error('Token刷新失败:', err)
      logout()
      throw err
    }
  }

  // 登出
  const logout = async () => {
    try {
      await authApi.logout()
    } catch (err) {
      console.error('登出失败:', err)
    } finally {
      // 清除状态
      user.value = null
      token.value = null
      error.value = null
    }
  }

  // 初始化认证状态
  const initialize = async () => {
    if (token.value) {
      await validateToken()
    }
  }

  // 清除错误
  const clearError = () => {
    error.value = null
  }

  return {
    // 状态
    user,
    token,
    isLoading,
    error,
    // 计算属性
    isAuthenticated,
    // 方法
    login,
    register,
    validateToken,
    refreshToken,
    logout,
    initialize,
    clearError,
  }
})
