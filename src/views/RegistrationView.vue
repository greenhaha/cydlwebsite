<template>
  <div class="fixed inset-0 w-full h-full">
    <div class="pointer-events-none absolute inset-0">
      <video
        src="../assets/bg/4K.mp4"
        muted
        autoplay="true"
        class="w-full h-full bg-cover bg-center min-w-full min-h-full object-cover globalVideo"
        loop="true"
        preload="metadata"
        transition="all duration-100 cubic-bezier(.4,0,.2,1)"
      ></video>
    </div>
  </div>
  <div class="home-grass pointer-events-none fixed inset-0 z-0"></div>
  <div class="registration-container !z-1">
    <n-card title="每日签到" class="registration-card">
      <div class="content">
        <n-space vertical size="medium" align="center">
          <n-input
            v-model:value="qqNumber"
            placeholder="请输入您的QQ号"
            clearable
            size="large"
            class="qq-input"
          />
          <n-text type="info" v-if="!hasSignedIn">请输入QQ号后点击签到</n-text>
        </n-space>
      </div>
      <n-space vertical size="large" align="center" class="actions">
        <n-button
          type="primary"
          size="large"
          :disabled="hasSignedIn || !qqNumber"
          :loading="isLoading"
          @click="handleSignIn"
        >
          {{ hasSignedIn ? '已签到' : '点击签到' }}
        </n-button>
        <n-text v-if="hasSignedIn" type="success">
          签到成功！获得积分：{{ gainedPoints }}，明天再来吧~
        </n-text>
        <n-text v-if="errorMessage" type="error">{{ errorMessage }}</n-text>
      </n-space>
    </n-card>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { NButton, NCard, NInput, NSpace, NText, useMessage } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    NButton,
    NCard,
    NInput,
    NSpace,
    NText,
  },
  setup() {
    const qqNumber = ref('')
    const hasSignedIn = ref(false)
    const gainedPoints = ref(0)
    const errorMessage = ref('')
    const isLoading = ref(false)
    const message = useMessage()

    const handleSignIn = async () => {
      if (!qqNumber.value) {
        message.error('请输入有效的QQ号')
        return
      }
      
      isLoading.value = true
      errorMessage.value = ''
      
      try {
        const response = await axios.post('/api/v1/signin', { userId: qqNumber.value })
        if (response.data.success) {
          hasSignedIn.value = true
          gainedPoints.value = response.data.points
          message.success(`签到成功！获得积分：${gainedPoints.value}`)
        } else {
          // 处理业务逻辑错误
          const errorMsg = response.data.error || response.data.message
          if (errorMsg.includes('already signed in')) {
            message.warning('您今天已经签到过了，明天再来吧~')
          } else if (errorMsg.includes('invalid user')) {
            message.error('无效的用户ID，请检查QQ号是否正确')
          } else {
            message.error(errorMsg || '签到失败，请稍后重试')
          }
        }
      } catch (error) {
        console.error('签到请求失败:', error)
        // 处理网络错误
        if (axios.isAxiosError(error)) {
          if (error.response) {
            // 服务器返回了错误状态码
            switch (error.response.status) {
              case 400:
                message.error(error.response.data.error)
                break
              case 401:
                message.error('未授权，请先登录')
                break
              case 403:
                message.error('没有权限进行此操作')
                break
              case 404:
                message.error('签到服务暂时不可用')
                break
              case 500:
                message.error(error.response.data.error)
                break
              default:
                message.error(`请求失败 (${error.response.status})，请稍后重试`)
            }
          } else if (error.request) {
            // 请求已发出但没有收到响应
            message.error('网络连接失败，请检查网络设置')
          } else {
            // 请求配置出错
            message.error('请求配置错误，请刷新页面重试')
          }
        } else {
          message.error('发生未知错误，请稍后重试')
        }
      } finally {
        isLoading.value = false
      }
    }

    return {
      qqNumber,
      hasSignedIn,
      gainedPoints,
      errorMessage,
      isLoading,
      handleSignIn,
    }
  },
})
</script>

<style scoped>
.registration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 16px;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
}
.home-grass {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0.4), #f5f5f5);
}
.registration-card {
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}

.qq-input {
  width: 100%;
}

.actions {
  width: 100%;
}
</style>
