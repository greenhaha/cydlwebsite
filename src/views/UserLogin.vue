<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <n-card class="max-w-md w-full" :bordered="false" style="box-shadow:0 2px 8px rgba(0,0,0,0.08);">
      <div class="space-y-6">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-indigo-600 mb-2">次原动力</h1>
          <p class="text-sm text-gray-500">欢迎回来</p>
        </div>
        <div class="text-center">
          <h2 class="text-2xl font-semibold text-gray-800">
            登录账号
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            还没有账号？
            <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
              立即注册
            </router-link>
          </p>
        </div>
      </div>
      <form class="mt-8" @submit.prevent="handleLogin">
        <n-space vertical :size="16">
          <div>
            <n-input
              v-model:value="form.username"
              placeholder="用户名"
              required
              class="w-full"
              autofocus
              :status="errors.username ? 'error' : undefined"
            />
            <p v-if="errors.username" class="mt-1 text-sm text-red-500">{{ errors.username }}</p>
          </div>
          <div>
            <n-input
              v-model:value="form.password"
              placeholder="密码"
              type="password"
              required
              class="w-full"
              :status="errors.password ? 'error' : undefined"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
          </div>
          <n-button
            type="primary"
            class="w-full"
            attr-type="submit"
            :loading="loading"
          >
            登录
          </n-button>
        </n-space>
      </form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { NCard, NInput, NSpace, NButton, useMessage } from 'naive-ui'
import { z } from 'zod'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const message = useMessage()

const form = reactive({
  username: '',
  password: ''
})

const errors = reactive({
  username: '',
  password: ''
})

const loginSchema = z.object({
  username: z.string()
    .min(1, '用户名不能为空'),
  password: z.string()
    .min(1, '密码不能为空')
})

const validateForm = () => {
  try {
    loginSchema.parse(form)
    return true
  } catch (error) {
    if (error instanceof z.ZodError) {
      // 清除之前的错误
      Object.keys(errors).forEach(key => {
        errors[key as keyof typeof errors] = ''
      })
      // 设置新的错误
      error.errors.forEach(err => {
        const path = err.path[0] as keyof typeof errors
        errors[path] = err.message
      })
    }
    return false
  }
}

const handleLogin = async () => {
  if (!validateForm()) {
    return
  }
  
  loading.value = true
  try {
    const result = await userStore.login(form)
    if (result.success) {
      message.success('登录成功')
      router.push('/')
    } else {
      message.error('登录失败，请检查用户名和密码')
    }
  } catch {
    message.error('登录失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script> 