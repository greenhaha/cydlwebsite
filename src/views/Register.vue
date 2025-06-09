<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <n-card class="max-w-md w-full" :bordered="false" style="box-shadow:0 2px 8px rgba(0,0,0,0.08);">
      <div class="space-y-6">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-indigo-600 mb-2">次原动力</h1>
          <p class="text-sm text-gray-500">加入我们</p>
        </div>
        <div class="text-center">
          <h2 class="text-2xl font-semibold text-gray-800">
            注册新账号
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            已有账号？
            <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
              立即登录
            </router-link>
          </p>
        </div>
      </div>
      <form class="mt-8" @submit.prevent="handleRegister">
        <n-space vertical :size="16">
          <div>
            <n-input
              v-model:value="form.username"
              placeholder="用户名（英文+数字，最大16位）"
              required
              class="w-full"
              autofocus
              :status="errors.username ? 'error' : undefined"
            />
            <p v-if="errors.username" class="mt-1 text-sm text-red-500">{{ errors.username }}</p>
          </div>
          <div>
            <n-input
              v-model:value="form.nickname"
              placeholder="昵称（最大24个字符）"
              required
              class="w-full"
              :status="errors.nickname ? 'error' : undefined"
            />
            <p v-if="errors.nickname" class="mt-1 text-sm text-red-500">{{ errors.nickname }}</p>
          </div>
          <div>
            <n-input
              v-model:value="form.email"
              placeholder="邮箱"
              required
              class="w-full"
              :status="errors.email ? 'error' : undefined"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
          </div>
          <div>
            <n-input
              v-model:value="form.password"
              placeholder="密码（至少6位，包含字母和数字）"
              type="password"
              required
              class="w-full"
              :status="errors.password ? 'error' : undefined"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
          </div>
          <div>
            <n-input
              v-model:value="form.confirmPassword"
              placeholder="确认密码"
              type="password"
              required
              class="w-full"
              :status="errors.confirmPassword ? 'error' : undefined"
            />
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-500">{{ errors.confirmPassword }}</p>
          </div>
          <div>
            <n-input
              v-model:value="form.qq"
              placeholder="QQ号（必填）"
              required
              class="w-full"
              :status="errors.qq ? 'error' : undefined"
            />
            <p v-if="errors.qq" class="mt-1 text-sm text-red-500">{{ errors.qq }}</p>
          </div>
          <n-button
            type="primary"
            class="w-full"
            attr-type="submit"
            :loading="loading"
          >
            注册
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
  nickname: '',
  email: '',
  password: '',
  confirmPassword: '',
  qq: ''
})

const errors = reactive({
  username: '',
  nickname: '',
  email: '',
  password: '',
  confirmPassword: '',
  qq: ''
})

const registerSchema = z.object({
  username: z.string()
    .min(1, '用户名不能为空')
    .max(16, '用户名最多16位')
    .regex(/^[a-zA-Z0-9]+$/, '用户名只能包含英文和数字'),
  nickname: z.string()
    .min(1, '昵称不能为空')
    .max(24, '昵称最多24个字符'),
  email: z.string()
    .min(1, '邮箱不能为空')
    .email('请输入有效的邮箱地址'),
  password: z.string()
    .min(6, '密码至少6位')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, '密码必须包含字母和数字'),
  confirmPassword: z.string()
    .min(1, '请确认密码'),
  qq: z.string()
    .min(1, 'QQ号不能为空')
    .regex(/^[1-9][0-9]{4,}$/, '请输入有效的QQ号')
}).refine((data) => data.password === data.confirmPassword, {
  message: '两次输入的密码不一致',
  path: ['confirmPassword']
})

const validateForm = () => {
  try {
    registerSchema.parse(form)
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

const handleRegister = async () => {
  try {
    const result = await userStore.register()
    if (result.success) {
      message.success('注册成功，请登录')
      router.push('/login')
    } else {
      message.error('注册失败，请稍后重试')
    }
  } catch {
    message.error('注册失败，请稍后重试')
  }
}
</script>