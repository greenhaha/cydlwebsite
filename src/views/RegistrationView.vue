<template>
  <div class="signin-page">
    <div class="page-bg">
      <video class="page-bg-video" :src="bgVideoUrl" autoplay muted loop playsinline></video>
      <div class="page-overlay"></div>
    </div>

    <div class="signin-content">
      <section class="signin-hero">
        <div class="hero-copy">
          <p class="eyebrow">{{ copy.heroEyebrow }}</p>
          <h1>{{ copy.heroTitle }}</h1>
          <p class="lead">{{ copy.heroLead }}</p>
          <div class="hero-tags">
            <span class="tag">{{ copy.heroTag }}</span>
            <span class="tag muted">{{ copy.heroTagAlt }}</span>
            <span class="status-chip hero-chip" :class="hasSignedIn ? 'is-done' : 'is-ready'">
              {{ hasSignedIn ? copy.statusSigned : copy.statusReady }}
            </span>
          </div>
        </div>
      </section>

      <section class="signin-card">
        <div class="card-header">
          <div>
            <p class="card-eyebrow">{{ copy.cardEyebrow }}</p>
            <h2>{{ copy.cardTitle }}</h2>
            <p class="card-subtitle">{{ copy.cardSubtitle }}</p>
          </div>
          <div class="card-badge" :class="hasSignedIn ? 'is-done' : 'is-ready'">
            {{ hasSignedIn ? copy.badgeDone : copy.badgeReady }}
          </div>
        </div>

        <div class="card-body">
          <label class="field-label" for="qq-input">{{ copy.qqLabel }}</label>
          <input
            id="qq-input"
            v-model="qqNumber"
            type="text"
            class="field-input"
            :placeholder="copy.qqPlaceholder"
          />
          <p v-if="!hasSignedIn && !errorMessage" class="field-helper">{{ copy.helper }}</p>
          <p v-if="errorMessage" class="field-error">{{ errorMessage }}</p>

          <button
            class="signin-btn"
            :class="hasSignedIn || !qqNumber ? 'is-disabled' : ''"
            :disabled="hasSignedIn || !qqNumber || isLoading"
            @click="handleSignIn"
          >
            <span v-if="isLoading">{{ copy.loading }}</span>
            <span v-else-if="hasSignedIn">{{ copy.signed }}</span>
            <span v-else>{{ copy.cta }}</span>
          </button>

        </div>
      </section>

      <section class="signin-note">
        <div class="note-card">
          <span>{{ copy.note }}</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { authApi } from '@/services/api'

const copy = {
  heroEyebrow: 'DAILY SIGNIN',
  heroTitle: '每日签到',
  heroLead: '每日签到 领取积分',
  heroTag: '签到中心',
  heroTagAlt: '连续签到奖励更丰厚',
  cardEyebrow: 'SIGNIN CENTER',
  cardTitle: '签到中心',
  cardSubtitle: '完成每日签到 连续签到有额外积分奖励',
  qqLabel: '签到QQ号',
  qqPlaceholder: '请输入你的QQ号',
  helper: '请输入QQ号后点击下方按钮',
  cta: '立即签到领取奖励',
  loading: '签到中 请稍候',
  signed: '今日已签到',
  statusReady: '可签到',
  statusSigned: '已完成',
  badgeReady: '待签到',
  badgeDone: '已签到',
  metricPoints: '今日积分',
  metricStatus: '状态',
  metricDone: '已签到',
  metricTodo: '待签到',
  note: '每日签到可获得积分奖励 连续签到奖励更丰厚',
  msgInvalidQQ: '请输入有效的QQ号',
  msgNeedLogin: '请先登录后再进行签到',
  msgSuccess: '签到成功',
  msgFail: '签到失败 请稍后重试',
  msgAlready: '你今天已签到 明天再来',
  msgInvalidUser: '无效的用户ID 请检查QQ号',
  msgServiceDown: '签到服务暂时不可用',
  msgNetwork: '网络连接失败 请检查网络设置',
  msgConfig: '请求配置错误 请刷新页面重试',
  msgUnauthorized: '未授权 请先登录',
  msgForbidden: '没有权限进行此操作',
  msgNotFound: '签到服务不可用',
  msgServerError: '服务器内部错误',
  msgRequestFail: '请求失败 请稍后重试'
}

const bgVideoUrl = 'https://hlympic.oss-cn-beijing.aliyuncs.com/frontend/assets/video/bg/4K.mp4'

const qqNumber = ref('')
const hasSignedIn = ref(false)
const gainedPoints = ref(0)
const errorMessage = ref('')
const isLoading = ref(false)
const authStore = useAuthStore()
const { user, isAuthenticated, token } = storeToRefs(authStore)
const profilePrefillAttempted = ref(false)

const tryAutoFillQQ = () => {
  if (isAuthenticated.value && user.value?.qqId && !qqNumber.value) {
    qqNumber.value = user.value.qqId
  }
}

const fetchBoundQQ = async () => {
  if (!isAuthenticated.value || profilePrefillAttempted.value) return
  profilePrefillAttempted.value = true
  try {
    const profile = await authApi.getUserProfile()
    if (profile.qqId && !qqNumber.value) {
      qqNumber.value = profile.qqId
    }
  } catch (error) {
    console.error('fetch profile failed', error)
    profilePrefillAttempted.value = false
  }
}

onMounted(() => {
  if (!user.value && token.value) {
    authStore
      .validateToken()
      .catch(() => {})
      .finally(() => {
        fetchBoundQQ()
      })
  } else {
    fetchBoundQQ()
  }
})

watch(
  () => isAuthenticated.value,
  (authenticated) => {
    if (!authenticated) {
      profilePrefillAttempted.value = false
      return
    }
    tryAutoFillQQ()
    fetchBoundQQ()
  },
  { immediate: true }
)

watch(
  () => user.value?.qqId,
  () => {
    tryAutoFillQQ()
  }
)

const resolvePoints = (payload: unknown) => {
  if (!payload || typeof payload !== 'object') return 0
  const record = payload as Record<string, unknown>
  const direct = record.points ?? record.point ?? record.score ?? record.signPoints ?? record.signInPoints
  if (typeof direct === 'number') return direct
  if (typeof direct === 'string' && direct.trim() && !Number.isNaN(Number(direct))) return Number(direct)
  const data = record.data && typeof record.data === 'object' ? (record.data as Record<string, unknown>) : {}
  const nested =
    data.points ?? data.point ?? data.score ?? data.signPoints ?? data.signInPoints ?? data.rewardPoints
  if (typeof nested === 'number') return nested
  if (typeof nested === 'string' && nested.trim() && !Number.isNaN(Number(nested))) return Number(nested)
  return 0
}

const showMessage = (type: 'success' | 'error', title: string, content: string) => {
  const modal = document.createElement('div')
  modal.className = 'theme-modal'

  const messageBox = document.createElement('div')
  messageBox.className = `theme-modal__card ${type === 'success' ? 'is-success' : 'is-error'}`

  messageBox.innerHTML = `
    <div class="theme-modal__header">
      <div class="theme-modal__icon ${type === 'success' ? 'is-success' : 'is-error'}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="${type === 'success' ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' : 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'}"></path>
        </svg>
      </div>
      <div class="theme-modal__titles">
        <h3>${title}</h3>
        <p>${content}</p>
      </div>
    </div>
    <div class="theme-modal__actions">
      <button class="theme-modal__btn ${type === 'success' ? 'is-success' : 'is-error'}" type="button">确定</button>
    </div>
  `

  modal.appendChild(messageBox)
  document.body.appendChild(modal)

  const closeBtn = messageBox.querySelector('.theme-modal__btn')
  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.remove())
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove()
    }
  })

  setTimeout(() => {
    messageBox.classList.add('is-visible')
  }, 10)

  if (type === 'success') {
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove()
      }
    }, 2600)
  }
}

const handleSignIn = async () => {
  if (!qqNumber.value) {
    errorMessage.value = copy.msgInvalidQQ
    showMessage('error', '签到失败', copy.msgInvalidQQ)
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const storedToken = localStorage.getItem('authToken')
    if (!storedToken) {
      errorMessage.value = copy.msgNeedLogin
      showMessage('error', '签到失败', copy.msgNeedLogin)
      isLoading.value = false
      return
    }

    const response = await axios.post(
      '/api/v1/signin',
      { userId: qqNumber.value },
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const payload = response.data || {}
    const resolvedPoints = resolvePoints(payload)
    const messageText = typeof payload.message === 'string' ? payload.message : ''
    const dataText = typeof payload.data === 'string' ? payload.data : ''
    const code = payload.code
    const isSuccess = code === 200 || code === '200' || payload.success === true || payload.status === 'success'

    const alreadyHint =
      dataText.includes('签到') &&
      (dataText.includes('已') || dataText.includes('已经')) &&
      (dataText.includes('重复') || dataText.includes('请勿') || dataText.includes('不要'))

    if (alreadyHint) {
      hasSignedIn.value = true
      gainedPoints.value = resolvedPoints
      showMessage('success', 'TIP', dataText)
      return
    }

    if (isSuccess) {
      hasSignedIn.value = true
      gainedPoints.value = resolvedPoints
      showMessage('success', 'TIP', dataText || messageText || copy.msgSuccess)
      return
    }

    const errorMsg = payload.error || payload.message || ''
    let displayMsg = errorMsg || copy.msgFail

    if (errorMsg.includes('already signed in') || errorMsg.includes('已签到')) {
      displayMsg = copy.msgAlready
      hasSignedIn.value = true
      gainedPoints.value = resolvedPoints
    } else if (errorMsg.includes('invalid user')) {
      displayMsg = copy.msgInvalidUser
    }

    if (errorMsg.includes('签到成功') && payload.data) {
      hasSignedIn.value = true
      gainedPoints.value = resolvedPoints
      showMessage('success', 'TIP', payload.data)
      return
    }

    errorMessage.value = displayMsg
    showMessage('error', '签到失败', displayMsg)
  } catch (error) {
    console.error('signin failed', error)
    let displayMsg = copy.msgFail

    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            displayMsg = error.response.data.error || copy.msgRequestFail
            break
          case 401:
            displayMsg = copy.msgUnauthorized
            break
          case 403:
            displayMsg = copy.msgForbidden
            break
          case 404:
            displayMsg = copy.msgNotFound
            break
          case 500:
            displayMsg = error.response.data.error || copy.msgServerError
            break
          default:
            displayMsg = `${copy.msgRequestFail} (${error.response.status})`
        }
      } else if (error.request) {
        displayMsg = copy.msgNetwork
      } else {
        displayMsg = copy.msgConfig
      }
    }

    errorMessage.value = displayMsg
    showMessage('error', '签到失败', displayMsg)
  } finally {
    isLoading.value = false
  }
}
</script>


<style scoped>
.signin-page {
  min-height: 100vh;
  position: relative;
  color: var(--theme-text);
}

.page-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
}

.page-bg-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: var(--theme-video-filter);
}

.page-overlay {
  position: absolute;
  inset: 0;
  background: var(--theme-overlay);
}

.signin-content {
  position: relative;
  z-index: 1;
  max-width: 980px;
  margin: 0 auto;
  padding: 120px 24px 160px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.signin-hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px;
}

.hero-copy {
  max-width: 640px;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.34em;
  font-size: 12px;
  color: var(--theme-muted);
}

.signin-hero h1 {
  font-size: 44px;
  margin: 10px 0 12px;
}

.lead {
  color: var(--theme-muted);
  line-height: 1.6;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.tag {
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--theme-secondary-bg);
  border: 1px solid var(--theme-border);
  color: var(--theme-text);
  font-size: 12px;
}

.tag.muted {
  color: var(--theme-muted);
}

.hero-status {
  display: flex;
  align-items: flex-start;
}

.status-chip {
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid transparent;
  background: var(--theme-card-bg);
}

.status-chip.is-ready {
  color: #93c5fd;
  border-color: rgba(147, 197, 253, 0.4);
}

.status-chip.is-done {
  color: #34d399;
  border-color: rgba(52, 211, 153, 0.45);
}

.hero-chip {
  background: var(--theme-secondary-bg);
  border: 1px solid var(--theme-border);
  color: var(--theme-text);
}

.hero-chip.is-ready {
  color: #93c5fd;
  border-color: rgba(147, 197, 253, 0.4);
}

.hero-chip.is-done {
  color: #34d399;
  border-color: rgba(52, 211, 153, 0.45);
}

.signin-card {
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 28px;
  box-shadow: var(--theme-card-shadow);
  padding: 28px 32px;
  backdrop-filter: blur(12px);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 20px;
}

.card-eyebrow {
  font-size: 12px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--theme-muted);
  margin: 0 0 6px;
}

.card-header h2 {
  margin: 0 0 6px;
  font-size: 24px;
}

.card-subtitle {
  margin: 0;
  color: var(--theme-muted);
  font-size: 14px;
}

.card-badge {
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid transparent;
}

.card-badge.is-ready {
  color: #93c5fd;
  border-color: rgba(147, 197, 253, 0.4);
}

.card-badge.is-done {
  color: #34d399;
  border-color: rgba(52, 211, 153, 0.45);
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-label {
  font-size: 13px;
  font-weight: 600;
}

.field-input {
  background: var(--theme-secondary-bg);
  border: 1px solid var(--theme-border);
  border-radius: 14px;
  padding: 12px 14px;
  color: var(--theme-text);
  font-size: 15px;
  transition: border 0.2s ease, box-shadow 0.2s ease;
}

.field-input:focus {
  outline: none;
  border-color: rgba(147, 197, 253, 0.8);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.field-helper {
  font-size: 12px;
  color: var(--theme-muted);
}

.field-error {
  font-size: 12px;
  color: #f87171;
}

.signin-btn {
  border: none;
  border-radius: 16px;
  padding: 12px 18px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(147, 51, 234, 0.95));
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 14px 28px rgba(37, 99, 235, 0.28);
}

.signin-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 36px rgba(59, 130, 246, 0.35);
}

.signin-btn.is-disabled {
  background: rgba(148, 163, 184, 0.5);
  cursor: not-allowed;
  box-shadow: none;
}

.signin-note {
  display: flex;
  justify-content: center;
}

.note-card {
  padding: 12px 18px;
  border-radius: 999px;
  background: var(--theme-secondary-bg);
  border: 1px solid var(--theme-border);
  color: var(--theme-muted);
  font-size: 12px;
}


:global(.theme-modal) {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(8, 12, 24, 0.55);
  backdrop-filter: blur(4px);
}

:global(.theme-modal__card) {
  width: min(420px, 92vw);
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 20px;
  padding: 20px 22px;
  box-shadow: var(--theme-card-shadow);
  transform: translateY(8px);
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

:global(.theme-modal__card.is-visible) {
  opacity: 1;
  transform: translateY(0);
}

:global(.theme-modal__card.is-success) {
  border-color: rgba(52, 211, 153, 0.35);
}

:global(.theme-modal__card.is-error) {
  border-color: rgba(248, 113, 113, 0.35);
}

:global(.theme-modal__header) {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

:global(.theme-modal__icon) {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  color: #fff;
  background: rgba(148, 163, 184, 0.35);
}

:global(.theme-modal__icon.is-success) {
  background: linear-gradient(135deg, rgba(52, 211, 153, 0.9), rgba(16, 185, 129, 0.9));
}

:global(.theme-modal__icon.is-error) {
  background: linear-gradient(135deg, rgba(248, 113, 113, 0.9), rgba(239, 68, 68, 0.9));
}

:global(.theme-modal__icon svg) {
  width: 20px;
  height: 20px;
}

:global(.theme-modal__titles h3) {
  margin: 0 0 6px;
  font-size: 16px;
  color: var(--theme-text);
}

:global(.theme-modal__titles p) {
  margin: 0;
  color: var(--theme-muted);
  font-size: 13px;
  line-height: 1.5;
}

:global(.theme-modal__actions) {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

:global(.theme-modal__btn) {
  border: none;
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  background: rgba(148, 163, 184, 0.6);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

:global(.theme-modal__btn.is-success) {
  background: linear-gradient(135deg, rgba(52, 211, 153, 0.9), rgba(16, 185, 129, 0.9));
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.25);
}

:global(.theme-modal__btn.is-error) {
  background: linear-gradient(135deg, rgba(248, 113, 113, 0.9), rgba(239, 68, 68, 0.9));
  box-shadow: 0 10px 20px rgba(239, 68, 68, 0.2);
}

:global(.theme-modal__btn:hover) {
  transform: translateY(-1px);
}

@media (max-width: 960px) {
  .signin-hero {
    flex-direction: column;
  }

  .hero-status {
    width: 100%;
  }

  .signin-card {
    padding: 24px 20px;
  }
}

@media (max-width: 640px) {
  .signin-content {
    padding: 100px 18px 120px;
  }

  .signin-hero h1 {
    font-size: 34px;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }

}
</style>
