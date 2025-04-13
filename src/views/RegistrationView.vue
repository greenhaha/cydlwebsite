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
import { NButton, NCard, NInput, NSpace, NText } from 'naive-ui'
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

    const handleSignIn = async () => {
      if (!qqNumber.value) {
        errorMessage.value = '请输入有效的QQ号'
        return
      }

      try {
        const response = await axios.post('/registration', { qq: qqNumber.value })
        if (response.data.success) {
          hasSignedIn.value = true
          gainedPoints.value = response.data.points
          errorMessage.value = ''
        } else {
          errorMessage.value = response.data.message || '签到失败，请稍后重试'
        }
      } catch {
        errorMessage.value = '网络错误，请稍后重试'
      }
    }

    return {
      qqNumber,
      hasSignedIn,
      gainedPoints,
      errorMessage,
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
