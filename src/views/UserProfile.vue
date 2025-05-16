<template>
  <div class="min-h-screen bg-gray-50 py-8 pt-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <n-card>
        <n-tabs type="line" animated>
          <!-- 个人信息展示 -->
          <n-tab-pane name="profile" tab="个人信息">
            <n-space vertical size="large">
              <!-- 用户基本信息卡片 -->
              <n-card>
                <n-space align="center" size="large">
                  <n-avatar
                    :size="96"
                    :src="userStore.userInfo?.avatar || ''"
                    round
                    bordered
                  >
                    {{ userStore.userInfo?.username?.charAt(0) || 'U' }}
                  </n-avatar>
                  <n-space vertical>
                    <n-text class="text-2xl font-bold">{{ userStore.userInfo?.nickname }}</n-text>
                    <n-text depth="3">@{{ userStore.userInfo?.username }}</n-text>
                  </n-space>
                </n-space>
              </n-card>

              <!-- 详细信息卡片 -->
              <n-grid :cols="24" :x-gap="16">
                <n-grid-item :span="12">
                  <n-card title="基本信息" size="small">
                    <n-descriptions bordered>
                      <n-descriptions-item label="用户名">
                        {{ userStore.userInfo?.username }}
                      </n-descriptions-item>
                      <n-descriptions-item label="昵称">
                        {{ userStore.userInfo?.nickname }}
                      </n-descriptions-item>
                      <n-descriptions-item label="QQ号">
                        {{ userStore.userInfo?.qq }}
                      </n-descriptions-item>
                    </n-descriptions>
                  </n-card>
                </n-grid-item>
                <n-grid-item :span="12">
                  <n-card title="账号信息" size="small">
                    <n-descriptions bordered>
                      <n-descriptions-item label="积分">
                        <n-tag type="success">{{ userStore.userInfo?.points }}</n-tag>
                      </n-descriptions-item>
                      <n-descriptions-item label="注册时间">
                        2024-03-21
                      </n-descriptions-item>
                      <n-descriptions-item label="账号状态">
                        <n-tag type="success">正常</n-tag>
                      </n-descriptions-item>
                    </n-descriptions>
                  </n-card>
                </n-grid-item>
              </n-grid>
            </n-space>
          </n-tab-pane>

          <!-- 修改个人信息 -->
          <n-tab-pane name="edit" tab="修改信息">
            <n-card>
              <n-form
                ref="formRef"
                :model="form"
                :rules="rules"
                label-placement="left"
                label-width="auto"
                require-mark-placement="right-hanging"
              >
                <n-form-item label="头像" path="avatar">
                  <n-upload
                    v-model:file-list="avatarFileList"
                    :max="1"
                    :default-upload="false"
                    list-type="image-card"
                    @preview="handlePreview"
                  >
                    点击上传头像
                  </n-upload>
                </n-form-item>

                <n-form-item label="昵称" path="nickname">
                  <n-input
                    v-model:value="form.nickname"
                    placeholder="请输入昵称"
                    :maxlength="24"
                    show-count
                  />
                </n-form-item>

                <n-form-item label="QQ号" path="qq">
                  <n-input
                    v-model:value="form.qq"
                    placeholder="请输入QQ号"
                  />
                </n-form-item>

                <n-form-item label="邮箱" path="email">
                  <n-input
                    v-model:value="form.email"
                    placeholder="请输入邮箱"
                  />
                </n-form-item>

                <n-form-item>
                  <n-space justify="end">
                    <n-button
                      type="primary"
                      attr-type="submit"
                      :loading="loading"
                      @click="handleUpdateProfile"
                    >
                      保存修改
                    </n-button>
                  </n-space>
                </n-form-item>
              </n-form>
            </n-card>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { useMessage } from 'naive-ui'
import {
  NCard,
  NTabs,
  NTabPane,
  NAvatar,
  NUpload,
  NForm,
  NFormItem,
  NInput,
  NButton,
  NSpace,
  NGrid,
  NGridItem,
  NDescriptions,
  NDescriptionsItem,
  NText,
  NTag,
  type UploadFileInfo,
  type FormRules
} from 'naive-ui'

const userStore = useUserStore()
const message = useMessage()
const loading = ref(false)
const avatarFileList = ref([])
const formRef = ref()

const form = reactive({
  nickname: userStore.userInfo?.nickname || '',
  qq: userStore.userInfo?.qq || '',
  email: ''
})

const rules: FormRules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { max: 24, message: '昵称最多24个字符', trigger: 'blur' }
  ],
  qq: [
    { required: true, message: '请输入QQ号', trigger: 'blur' },
    { pattern: /^[1-9][0-9]{4,}$/, message: '请输入有效的QQ号', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ]
}

const handlePreview = (file: UploadFileInfo) => {
  try {
    // 处理图片预览
    console.log('Preview file:', file)
    message.success('图片预览成功')
  } catch {
    message.error('图片预览失败')
  }
}

const handleUpdateProfile = async () => {
  try {
    await formRef.value?.validate()
    loading.value = true
    // TODO: 调用更新个人信息的 API
    console.log('更新个人信息:', form)
    
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    message.success('个人信息更新成功')
  } catch (error) {
    console.error('表单验证错误:', error)
    if (error instanceof Error) {
      message.error(error.message)
    } else {
      message.error('更新失败，请稍后重试')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.n-upload-trigger {
  width: 96px;
  height: 96px;
}

:deep(.n-card-header) {
  padding: 16px 20px;
}

:deep(.n-card__content) {
  padding: 20px;
}
</style> 