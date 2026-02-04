<template>
  <div class="contribute-page">
    <div class="page-bg">
      <video class="page-bg-video" :src="bgVideoUrl" autoplay muted loop playsinline></video>
      <div class="page-overlay"></div>
    </div>

    <div class="contribute-content">
      <section class="page-hero">
        <div class="hero-copy">
          <div class="eyebrow-row">
            <p class="eyebrow">{{ copy.heroEyebrow }}</p>
            <n-tag v-if="isAdmin" type="success" round size="small" class="admin-tag">{{ copy.adminMode }}</n-tag>
          </div>
          <h1>{{ copy.heroTitle }}</h1>
          <p class="lead">{{ copy.heroLead }}</p>
        </div>
        <div class="hero-side">
          <div class="hero-stats">
            <div class="stat">
              <span>{{ copy.statsDonor }}</span>
              <strong>{{ donorCount }}</strong>
            </div>
            <div class="stat">
              <span>{{ copy.statsTech }}</span>
              <strong>{{ techCount }}</strong>
            </div>
            <div class="stat">
              <span>{{ copy.statsSpecial }}</span>
              <strong>{{ specialCount }}</strong>
            </div>
          </div>
          <section v-if="showSponsorSummary" class="sponsor-summary">
            <div class="sponsor-card">
              <div class="sponsor-card-header">
                <div>
                  <span class="section-kicker">{{ copy.sponsorCardLabel }}</span>
                  <h3>{{ copy.sponsorCardTitle }}</h3>
                </div>
              </div>
              <div class="sponsor-metrics">
                <template v-if="isAfdianSponsor">
                  <div class="sponsor-metric">
                    <span>{{ copy.sponsorPlan }}</span>
                    <strong>{{ sponsorInfo?.planName || '--' }}</strong>
                  </div>
                  <div class="sponsor-metric">
                    <span>{{ copy.sponsorMonths }}</span>
                    <strong>{{ sponsorInfo?.months ?? '--' }}</strong>
                  </div>
                  <div class="sponsor-metric">
                    <span>{{ copy.sponsorAmount }}</span>
                    <strong>{{ formatAmount(sponsorInfo?.amount) }}</strong>
                  </div>
                </template>
                <template v-else>
                  <div class="sponsor-metric">
                    <span>{{ copy.sponsorTypeLabel }}</span>
                    <strong>{{ sponsorTypeLabel }}</strong>
                  </div>
                  <div class="sponsor-metric">
                    <span>{{ copy.sponsorContentLabel }}</span>
                    <strong>{{ sponsorInfo?.sponsorContent || '--' }}</strong>
                  </div>
                </template>
              </div>
              <div class="sponsor-note">
                <span>{{ copy.sponsorNote }}</span>
                <button class="sponsor-link" type="button" @click="openChangeRequest">{{ copy.sponsorChange }}</button>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section class="contribute-section section-donors">
        <div class="section-header">
          <div class="section-title">
            <span class="section-kicker">{{ copy.donorsLabel }}</span>
            <div class="title-row">
              <h2>{{ copy.donorsTitle }}</h2>
              <div class="title-actions">
                <button class="sponsor-pill" type="button" @click="handleSponsorAction">
                  {{ sponsorActionLabel }}
                </button>
                <button v-if="isAdmin" class="sponsor-pill sponsor-pill-ghost" type="button" @click="openAdminPanel">
                  {{ copy.sponsorAdmin }}
                </button>
              </div>
            </div>
          </div>
          <p class="section-lead">{{ copy.donorsDesc }}</p>
        </div>

        <div v-if="loading" class="contributors-grid" aria-hidden="true">
          <div v-for="s in 8" :key="'donor-skeleton-' + s" class="skeleton-card">
            <div class="skeleton-avatar"></div>
            <div class="skeleton-line skeleton-line-lg"></div>
            <div class="skeleton-line skeleton-line-sm"></div>
          </div>
        </div>
        <div v-else-if="error" class="section-error">
          <p>{{ error }}</p>
          <n-button @click="fetchContributors" type="primary">{{ copy.retry }}</n-button>
        </div>
        <div v-else class="contributors-grid" :class="{ 'is-single': contributeList.donors.length === 1, 'is-empty': contributeList.donors.length === 0 }">
          <template v-if="contributeList.donors.length === 0">
            <div class="contributor-card placeholder-card">
              <div class="card-surface">
                <div class="avatar placeholder-avatar">
                  <span>+</span>
                </div>
                <h3>{{ copy.placeholderTitle }}</h3>
                <p>{{ copy.placeholderDesc }}</p>
              </div>
            </div>
          </template>
          <template v-else>
            <div v-for="donor in contributeList.donors" :key="donor.name" class="contributor-card">
              <div class="card-surface">
                <div class="avatar">
                  <span>{{ getInitials(donor.name) }}</span>
                </div>
                <h3>{{ donor.name.trim() }}</h3>
                <p>{{ donor.supportDescription || copy.defaultDesc }}</p>
              </div>
            </div>
          </template>
        </div>
      </section>

<section class="contribute-section section-tech">
        <div class="section-header">
          <div class="section-title">
            <span class="section-kicker">{{ copy.techLabel }}</span>
            <h2>{{ copy.techTitle }}</h2>
          </div>
          <p class="section-lead">{{ copy.techDesc }}</p>
        </div>

        <div v-if="loading" class="contributors-grid" aria-hidden="true">
          <div v-for="s in 8" :key="'tech-skeleton-' + s" class="skeleton-card">
            <div class="skeleton-avatar"></div>
            <div class="skeleton-line skeleton-line-lg"></div>
            <div class="skeleton-line skeleton-line-sm"></div>
          </div>
        </div>
        <div v-else-if="error" class="section-error">
          <p>{{ error }}</p>
          <n-button @click="fetchContributors" type="primary">{{ copy.retry }}</n-button>
        </div>
        <div v-else class="contributors-grid" :class="{ 'is-single': contributeList.techSupporters.length === 1, 'is-empty': contributeList.techSupporters.length === 0 }">
          <template v-if="contributeList.techSupporters.length === 0">
            <div class="contributor-card placeholder-card">
              <div class="card-surface">
                <div class="avatar placeholder-avatar">
                  <span>+</span>
                </div>
                <h3>{{ copy.placeholderTitle }}</h3>
                <p>{{ copy.placeholderDesc }}</p>
              </div>
            </div>
          </template>
          <template v-else>
            <div v-for="supporter in contributeList.techSupporters" :key="supporter.name" class="contributor-card">
              <div class="card-surface">
                <div class="avatar">
                  <span>{{ getInitials(supporter.name) }}</span>
                </div>
                <h3>{{ supporter.name.trim() }}</h3>
                <p>{{ supporter.supportDescription || copy.defaultDesc }}</p>
              </div>
            </div>
          </template>
        </div>
      </section>

<section class="contribute-section section-special">
        <div class="section-header">
          <div class="section-title">
            <span class="section-kicker">{{ copy.specialLabel }}</span>
            <h2>{{ copy.specialTitle }}</h2>
          </div>
          <p class="section-lead">{{ copy.specialDesc }}</p>
        </div>

        <div v-if="loading" class="contributors-grid special-grid" aria-hidden="true">
          <div v-for="s in 8" :key="'special-skeleton-' + s" class="skeleton-card special-card">
            <div class="skeleton-avatar"></div>
            <div class="skeleton-line skeleton-line-lg"></div>
            <div class="skeleton-line skeleton-line-sm"></div>
          </div>
        </div>
        <div v-else-if="error" class="section-error">
          <p>{{ error }}</p>
          <n-button @click="fetchContributors" type="primary">{{ copy.retry }}</n-button>
        </div>
        <div
          v-else
          class="contributors-grid special-grid"
          :class="{ 'is-single': contributeList.specialThanks.length === 1, 'is-empty': contributeList.specialThanks.length === 0 }"
        >
          <template v-if="contributeList.specialThanks.length === 0">
            <div class="contributor-card special-card placeholder-card">
              <div class="card-surface">
                <div class="avatar placeholder-avatar">
                  <span>+</span>
                </div>
                <h3>{{ copy.placeholderTitle }}</h3>
                <p>{{ copy.placeholderDesc }}</p>
              </div>
            </div>
          </template>
          <template v-else>
            <div v-for="supporter in contributeList.specialThanks" :key="supporter.name" class="contributor-card special-card">
              <div class="card-surface">
                <div class="avatar">
                  <span>{{ getInitials(supporter.name) }}</span>
                </div>
                <h3>{{ supporter.name.trim() }}</h3>
                <p>{{ supporter.supportDescription || copy.defaultDesc }}</p>
              </div>
            </div>
          </template>
        </div>
      </section>

      <section class="thanks-section">
        <div class="thanks-card">
          <h3>{{ copy.thanksTitle }}</h3>
          <p>{{ copy.thanksDesc }}</p>
          <n-button type="primary" size="large" class="cta-button" @click="goToQQGroup">{{ copy.thanksCta }}</n-button>
        </div>
      </section>
    </div>

    <div v-if="sponsorModalVisible" class="sponsor-overlay" role="dialog" aria-modal="true">
      <div class="glass-panel sponsor-panel">
        <div class="glass-panel__header">
          <div>
            <p class="glass-panel__eyebrow">{{ copy.sponsorKicker }}</p>
            <div class="glass-panel__title-row">
              <h3>{{ copy.sponsorBecomeTitle }}</h3>
              <button class="sponsor-pill" type="button" @click="goToAfdian">
                {{ copy.sponsorGoAfdian }}
              </button>
            </div>
            <p>{{ copy.sponsorBecomeDesc }}</p>
          </div>
          <button class="glass-panel__close" type="button" @click="sponsorModalVisible = false" :aria-label="copy.close">&times;</button>
        </div>
        <div class="glass-panel__body">
          <div class="glass-field-row">
            <div class="glass-field glass-field--grow">
              <input
                v-model="sponsorOrderId"
                :placeholder="copy.sponsorOrderPlaceholder"
                class="glass-input"
                type="text"
              />
            </div>
            <button class="glass-submit verify-submit" type="button" @click="handleVerifyOrder">
              {{ copy.sponsorVerifyShort }}
            </button>
          </div>
          <p class="modal-tip">{{ copy.sponsorVerifyTip }}</p>
        </div>
      </div>
    </div>

    <div v-if="claimModalVisible" class="sponsor-overlay" role="dialog" aria-modal="true">
      <div class="glass-panel sponsor-panel">
        <div class="glass-panel__header">
          <div>
            <p class="glass-panel__eyebrow">{{ copy.sponsorKicker }}</p>
            <h3>{{ copy.sponsorClaimTitle }}</h3>
            <p>{{ copy.sponsorClaimDesc }}</p>
          </div>
          <button class="glass-panel__close" type="button" @click="claimModalVisible = false" :aria-label="copy.close">&times;</button>
        </div>
        <div class="glass-panel__body">
          <div class="modal-actions">
            <button class="sponsor-pill" type="button" @click="goToProfile">
              {{ copy.sponsorBindCta }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="updateModalVisible" class="sponsor-overlay" role="dialog" aria-modal="true">
      <div class="glass-panel sponsor-panel">
        <div class="glass-panel__header">
          <div>
            <p class="glass-panel__eyebrow">{{ copy.sponsorKicker }}</p>
            <h3>{{ copy.sponsorUpdateTitle }}</h3>
          </div>
          <button class="glass-panel__close" type="button" @click="updateModalVisible = false" :aria-label="copy.close">&times;</button>
        </div>
        <div class="glass-panel__body">
          <div class="glass-field">
            <label>{{ copy.sponsorUpdateLabel }}</label>
            <div class="glass-field-row">
              <input
                v-model="updateOrderId"
                :placeholder="copy.sponsorUpdatePlaceholder"
                class="glass-input"
                type="text"
              />
              <button class="glass-submit verify-submit verify-submit-compact" type="button" @click="handleUpdateOrder">
                {{ copy.sponsorVerifyShort }}
              </button>
            </div>
          </div>
          <p class="modal-tip">{{ copy.sponsorUpdateTip }}</p>
          <div class="modal-actions">
            <button class="sponsor-link" type="button" @click="openChangeRequest">{{ copy.sponsorChange }}</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="changeModalVisible" class="sponsor-overlay" role="dialog" aria-modal="true">
      <div class="glass-panel sponsor-panel">
        <div class="glass-panel__header">
          <div>
            <p class="glass-panel__eyebrow">{{ copy.sponsorKicker }}</p>
            <h3>{{ copy.sponsorChangeTitle }}</h3>
            <p>{{ copy.sponsorChangeDesc }}</p>
          </div>
          <button class="glass-panel__close" type="button" @click="changeModalVisible = false" :aria-label="copy.close">&times;</button>
        </div>
        <div class="glass-panel__body">
          <div class="glass-field-row">
            <div class="glass-field glass-field--grow">
              <input
                v-model="changeOrderId"
                :placeholder="copy.sponsorChangePlaceholder"
                class="glass-input"
                type="text"
              />
            </div>
            <button class="glass-submit verify-submit" type="button" :disabled="changeSubmitting" @click="handleChangeRequestSubmit">
              {{ copy.sponsorChangeSubmit }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="adminModalVisible" class="sponsor-overlay" role="dialog" aria-modal="true">
      <div class="glass-panel sponsor-panel modal-card-wide">
        <div class="glass-panel__header">
          <div>
            <p class="glass-panel__eyebrow">{{ copy.sponsorKicker }}</p>
            <h3>{{ copy.sponsorAdminTitle }}</h3>
          </div>
          <button class="glass-panel__close" type="button" @click="adminModalVisible = false" :aria-label="copy.close">&times;</button>
        </div>
        <div class="admin-panel">
          <div class="admin-form">
            <div class="admin-form-header">
              <h4>{{ copy.adminAddTitle }}</h4>
            </div>
            <div class="admin-form-row">
              <div class="glass-field">
                <label>{{ copy.adminAddName }}</label>
                <input v-model="adminForm.displayName" class="glass-input" type="text" />
              </div>
              <div class="glass-field">
                <label>{{ copy.adminAddSteam }}</label>
                <input v-model="adminForm.steamId64" class="glass-input" type="text" />
              </div>
            </div>
            <div class="admin-form-row">
              <div class="glass-field">
                <label>{{ copy.adminAddType }}</label>
                <select v-model="adminForm.sponsorType" class="glass-input">
                  <option v-for="item in adminTypeOptions" :key="item.value" :value="item.value">
                    {{ item.label }}
                  </option>
                </select>
              </div>
              <div class="glass-field">
                <label>{{ copy.adminAddItem }}</label>
                <select v-model="adminForm.sponsorItem" class="glass-input">
                  <option v-for="item in adminItems" :key="item.id" :value="String(item.id)">
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="admin-form-row admin-form-row--align">
              <div class="glass-field glass-field--grow">
                <label>{{ copy.adminAddContent }}</label>
                <input v-model="adminForm.sponsorContent" class="glass-input" type="text" />
              </div>
              <button class="glass-submit verify-submit admin-add-submit" type="button" :disabled="adminSubmitting" @click="handleAdminAdd">
                {{ adminSubmitting ? copy.adminAdding : copy.adminAddBtn }}
              </button>
            </div>
          </div>
          <div v-if="adminRecords.length === 0" class="admin-empty">
            <p>{{ copy.sponsorAdminEmpty }}</p>
          </div>
          <div v-else class="admin-list">
            <div v-for="record in adminRecords" :key="record.orderId" class="admin-row">
              <div class="admin-row-main">
                <strong>{{ record.username }}</strong>
                <span>{{ record.orderId }}</span>
                <span v-if="record.sponsorType">{{ formatSponsorType(record.sponsorType) }} · {{ record.sponsorContent || '--' }}</span>
                <span v-if="record.steamId64">Steam64 {{ record.steamId64 }}</span>
              </div>
              <div class="admin-actions">
                <button class="sponsor-pill sponsor-pill-danger" type="button" @click="handleAdminRevoke(record.orderId)">
                  {{ copy.sponsorAdminRemove }}
                </button>
              </div>
            </div>
          </div>

          <div class="admin-form admin-change">
            <div class="admin-form-header">
              <h4>{{ copy.sponsorChangeAdminTitle }}</h4>
            </div>
            <div v-if="changeRequests.length === 0" class="admin-empty">
              <p>{{ copy.sponsorChangeAdminEmpty }}</p>
            </div>
            <div v-else class="admin-list admin-list-scroll">
              <div v-for="request in changeRequests" :key="request.id" class="admin-row">
                <div class="admin-row-main">
                  <strong>{{ request.username || '--' }}</strong>
                  <span>{{ request.orderId }}</span>
                  <span v-if="request.targetAfdianUserName">{{ request.targetAfdianUserName }}</span>
                  <span v-else-if="request.targetAfdianUserId">{{ request.targetAfdianUserId }}</span>
                  <span v-if="request.currentAfdianUserId">{{ request.currentAfdianUserId }}</span>
                </div>
                <div class="admin-actions">
                  <button class="sponsor-pill sponsor-pill-ghost" type="button" @click="handleApproveChange(request.id)">
                    {{ copy.sponsorChangeApprove }}
                  </button>
                  <button class="sponsor-pill sponsor-pill-danger" type="button" @click="handleRejectChange(request.id)">
                    {{ copy.sponsorChangeReject }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, reactive } from 'vue'
import { NButton, NTag, useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { contributeApi, sponsorApi, showcaseApi, type ContributeResponse, type SponsorVerifyData, type SponsorAdminItem, type SponsorAdminRow, type SponsorChangeRequestRow, type ShowcaseAdminProfile } from '../services/api'

const copy = {
  heroEyebrow: 'HLYM COMMUNITY',
  adminMode: '管理员模式',
  heroTitle: '贡献者名单',
  heroLead: '感谢所有为服务器提供了帮助、赞助以及技术支持的个人或团队',
  statsDonor: '赞助者',
  statsTech: '技术支持',
  statsSpecial: '特别鸣谢',
  donorsLabel: '赞助者',
  donorsTitle: '赞助者名单',
  donorsDesc: '感谢你们的慈善赞助，为服务器的运维提供了强有力的支持',
  techLabel: '技术支持',
  techTitle: '技术支持名单',
  techDesc: '感谢开发团队成员的辛勤付出，为大家提供了高质的功能与体验',
  specialLabel: '特别鸣谢',
  specialTitle: '特别鸣谢',
  specialDesc: '特别感谢以下个人或团队的支持与协助',
  thanksTitle: '开发者寄语',
  thanksDesc: '感谢各位长久的支持，我们将继续努力，为大家带来更好的服务与体验！如果你也想成为贡献者，欢迎加入我们的 QQ 群与我们联系！成为贡献者将会有特别奖励',
  thanksCta: '联系我们获取更多支持',
  retry: '重试',
  defaultDesc: '感谢你的支持',
  placeholderTitle: '虚位以待',
  placeholderDesc: '期待你的加入',
  sponsorActionJoin: '成为赞助者',
  sponsorActionClaim: '领取权益',
  sponsorActionUpdate: '更新赞助信息',
  sponsorAdmin: '管理赞助者',
  sponsorCardLabel: '我的赞助',
  sponsorCardTitle: '赞助信息',
  sponsorPlan: '赞助方案',
  sponsorMonths: '赞助月数',
  sponsorAmount: '赞助金额',
  sponsorNote: '赞助金额会累计',
  sponsorChange: '申请更换爱发电账号',
  sponsorKicker: 'SPONSORSHIP',
  sponsorBecomeTitle: '成为赞助者',
  sponsorBecomeDesc: '完成赞助后即可进行权益领取',
  sponsorGoAfdian: '前往爱发电赞助',
  sponsorAlreadyTitle: '已经赞助了？',
  sponsorOrderPlaceholder: '已经赞助了？填写订单号',
  sponsorUpdatePlaceholder: '填写新订单号',
  sponsorUpdateLabel: '更新订单号',
  sponsorVerify: '校验订单',
  sponsorVerifyShort: '校验',
  sponsorVerifyTip: '校验成功后即可领取你的专属权益',
  sponsorClaimTitle: '领取权益',
  sponsorClaimDesc: '请先绑定 Steam 账号',
  sponsorBindCta: '前往个人资料绑定',
  sponsorUpdateTitle: '更新赞助信息',
  sponsorUpdateDesc: '赞助金额会累加不会清空',
  sponsorUpdateTip: '如需更换爱发电账号需要管理员审核',
  sponsorChangeTitle: '申请更换爱发电账号',
  sponsorChangeDesc: '请输入新订单号以提交审核',
  sponsorChangePlaceholder: '填写新订单号',
  sponsorChangeSubmit: '提交审核',
  sponsorChangeSuccess: '已提交审核',
  sponsorAdminTitle: '赞助者管理',
  sponsorAdminEmpty: '暂无赞助记录',
  sponsorAdminTip: '可以撤回记录或手动添加赞助',
  sponsorAdminEdit: '修改',
  sponsorAdminRemove: '撤回',
  sponsorChangeAdminTitle: '账号切换申请',
  sponsorChangeAdminEmpty: '暂无申请',
  sponsorChangeApprove: '通过',
  sponsorChangeReject: '拒绝',
  adminAddTitle: '手动添加赞助',
  adminAddName: '显示名称',
  adminAddSteam: 'Steam64',
  adminAddType: '赞助类型',
  adminAddContent: '赞助内容',
  adminAddItem: '身份类型',
  adminAddBtn: '添加',
  adminAdding: '添加中',
  sponsorTypeLabel: '赞助类型',
  sponsorContentLabel: '赞助内容',
  close: '关闭',
  cancel: '取消',
  loginTip: '请先登录网站'
}

const bgVideoUrl = 'https://hlympic.oss-cn-beijing.aliyuncs.com/frontend/assets/video/bg/4K.mp4'

const contributeList = ref<ContributeResponse>({
  donors: [],
  techSupporters: [],
  specialThanks: []
})
const loading = ref(true)
const error = ref<string | null>(null)

const router = useRouter()
const authStore = useAuthStore()
const message = useMessage()

type SponsorInfo = {
  orderId: string
  planName: string
  months: number
  amount: number
  afdianId: string
  afdianName: string
  sourceUserId: string
  sponsorType: string
  sponsorContent: string
  sponsorItem: string
  claimed: boolean
}

const sponsorInfo = ref<SponsorInfo | null>(null)
const sponsorOrderId = ref('')
const updateOrderId = ref('')
const pendingOrderId = ref('')
const sponsorModalVisible = ref(false)
const claimModalVisible = ref(false)
const updateModalVisible = ref(false)
const adminModalVisible = ref(false)
const changeModalVisible = ref(false)
const changeOrderId = ref('')
const changeSubmitting = ref(false)
const adminRecords = ref<Array<{ orderId: string; username: string; sponsorType?: string; sponsorContent?: string; steamId64?: string }>>([])
const adminItems = ref<SponsorAdminItem[]>([])
const changeRequests = ref<SponsorChangeRequestRow[]>([])
const adminSubmitting = ref(false)
const adminForm = reactive({
  displayName: '',
  steamId64: '',
  sponsorType: 'MODEL',
  sponsorContent: '',
  sponsorItem: ''
})
const adminTypeOptions = [
  { value: 'SPONSOR', label: '赞助' },
  { value: 'MODEL', label: '模型赞助' },
  { value: 'OTHER', label: '其他赞助' }
]

const isAuthenticated = computed(() => authStore.isAuthenticated)
const hasSteam = computed(() => !!authStore.user?.steamId64)
const showSponsorSummary = computed(() => isAuthenticated.value && !!sponsorInfo.value)
const isAdmin = ref(false)
const isAfdianSponsor = computed(() => sponsorInfo.value?.sponsorType === 'AFDIAN')
const sponsorTypeLabel = computed(() => formatSponsorType(sponsorInfo.value?.sponsorType))

const donorCount = computed(() => (loading.value ? '--' : contributeList.value.donors.length))
const techCount = computed(() => (loading.value ? '--' : contributeList.value.techSupporters.length))
const specialCount = computed(() => (loading.value ? '--' : contributeList.value.specialThanks.length))
const sponsorActionLabel = computed(() => {
  if (!isAuthenticated.value) return copy.sponsorActionJoin
  if (!sponsorInfo.value) return copy.sponsorActionJoin
  if (!hasSteam.value) return copy.sponsorActionClaim
  if (!sponsorInfo.value.claimed) return copy.sponsorActionClaim
  return copy.sponsorActionUpdate
})

const fetchContributors = async () => {
  try {
    loading.value = true
    error.value = null
    const data = await contributeApi.getContributors()
    contributeList.value = data
  } catch (err) {
    console.error('fetch contributors failed', err)
    error.value = '获取贡献者数据失败，请稍后重试'
    const { contributeList: staticData } = await import('../const/contribute')
    contributeList.value = staticData
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchContributors()
})

const getErrorMessage = (err: unknown, fallback: string) => {
  if (err instanceof Error && err.message) return err.message
  return fallback
}

const parseAmount = (value?: string) => {
  if (!value) return 0
  const amount = Number(value)
  return Number.isFinite(amount) ? amount : 0
}

const formatSponsorType = (value?: string) => {
  if (!value) return '--'
  const normalized = value.toUpperCase()
  if (normalized === 'AFDIAN') return '爱发电赞助'
  if (normalized === 'SPONSOR') return '赞助'
  if (normalized === 'MODEL') return '模型赞助'
  if (normalized === 'OTHER') return '其他赞助'
  return value
}

const buildSponsorInfo = (payload: SponsorVerifyData): SponsorInfo => {
  const sponsorType = payload.sponsorType || 'AFDIAN'
  const sponsorContent = payload.sponsorContent || (sponsorType === 'AFDIAN' ? '赞助' : '')
  const isAfdian = sponsorType === 'AFDIAN'
  return {
    orderId: payload.orderId || '',
    planName: isAfdian ? payload.planId || '--' : formatSponsorType(sponsorType),
    months: isAfdian ? payload.month ?? 0 : 0,
    amount: isAfdian ? parseAmount(payload.showAmount ?? payload.totalAmount) : 0,
    afdianId: payload.afdianUserId || '',
    afdianName: payload.afdianUserName || '',
    sourceUserId: payload.sourceUserId || '',
    sponsorType,
    sponsorContent,
    sponsorItem: payload.sponsorItem || '',
    claimed: Boolean(payload.itemInserted || payload.redeemed)
  }
}

const applySponsorInfo = (payload: SponsorVerifyData) => {
  sponsorInfo.value = buildSponsorInfo(payload)
  if (payload.orderId) {
    pendingOrderId.value = payload.orderId
  }
}

const fetchAdminProfile = async () => {
  if (!isAuthenticated.value) {
    isAdmin.value = false
    return
  }
  try {
    const profile: ShowcaseAdminProfile = await showcaseApi.adminProfile()
    isAdmin.value = profile.admin
  } catch {
    isAdmin.value = false
  }
}

const loadAdminRecords = async () => {
  if (!isAuthenticated.value || !isAdmin.value) return
  try {
    const rows = await sponsorApi.adminList()
    adminRecords.value = rows.map((row: SponsorAdminRow) => ({
      orderId: row.orderId,
      username: row.username || '--',
      sponsorType: row.sponsorType,
      sponsorContent: row.sponsorContent,
      steamId64: row.steamId64
    }))
  } catch {
    adminRecords.value = []
  }
}

const loadChangeRequests = async () => {
  if (!isAuthenticated.value || !isAdmin.value) return
  try {
    changeRequests.value = await sponsorApi.adminChangeRequests()
  } catch {
    changeRequests.value = []
  }
}

const resetAdminForm = () => {
  adminForm.displayName = ''
  adminForm.steamId64 = ''
  adminForm.sponsorType = adminTypeOptions[0]?.value || 'MODEL'
  adminForm.sponsorContent = ''
  adminForm.sponsorItem = adminItems.value.length ? String(adminItems.value[0].id) : ''
}

const handleChangeRequestSubmit = async () => {
  const orderId = changeOrderId.value.trim()
  if (!orderId) {
    message.warning('请填写订单号')
    return
  }
  changeSubmitting.value = true
  try {
    await sponsorApi.changeRequest(orderId)
    message.success(copy.sponsorChangeSuccess)
    changeModalVisible.value = false
    changeOrderId.value = ''
  } catch (err) {
    message.error(getErrorMessage(err, 'submit failed'))
  } finally {
    changeSubmitting.value = false
  }
}

const handleApproveChange = async (requestId: number) => {
  try {
    await sponsorApi.adminApproveChange(requestId)
    message.success('已通过')
    await loadChangeRequests()
  } catch (err) {
    message.error(getErrorMessage(err, 'approve failed'))
  }
}

const handleRejectChange = async (requestId: number) => {
  try {
    await sponsorApi.adminRejectChange(requestId)
    message.success('已拒绝')
    await loadChangeRequests()
  } catch (err) {
    message.error(getErrorMessage(err, 'reject failed'))
  }
}

const loadAdminItems = async () => {
  if (!isAuthenticated.value || !isAdmin.value) return
  try {
    const rows = await sponsorApi.adminItems()
    adminItems.value = rows
    if (!adminForm.sponsorItem && rows.length) {
      adminForm.sponsorItem = String(rows[0].id)
    }
  } catch {
    adminItems.value = []
  }
}

const loadSponsorInfo = async () => {
  if (!isAuthenticated.value) {
    sponsorInfo.value = null
    pendingOrderId.value = ''
    return
  }
  try {
    const data = await sponsorApi.me()
    if (data) {
      applySponsorInfo(data)
    } else {
      sponsorInfo.value = null
      pendingOrderId.value = ''
    }
  } catch {
    sponsorInfo.value = null
    pendingOrderId.value = ''
  }
}

watch(
  () => authStore.isAuthenticated,
  (value) => {
    if (value) {
      loadSponsorInfo()
      fetchAdminProfile()
    } else {
      isAdmin.value = false
      adminRecords.value = []
      adminItems.value = []
      changeRequests.value = []
      sponsorInfo.value = null
      pendingOrderId.value = ''
      changeModalVisible.value = false
      changeOrderId.value = ''
      resetAdminForm()
    }
  },
  { immediate: true }
)

const getInitials = (name: string): string => {
  const cleanName = name.trim()
  if (cleanName.length === 0) return '?'
  if (/[一-龥]/.test(cleanName)) {
    return cleanName.length >= 2 ? cleanName.substring(0, 2) : cleanName.substring(0, 1)
  }
  const words = cleanName.split(' ')
  if (words.length >= 2) {
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase()
  }
  return cleanName.charAt(0).toUpperCase()
}

const goToQQGroup = () => {
  window.open(
    'https://qm.qq.com/cgi-bin/qm/qr?k=Sh4gcapxVV57FqXxe7ZU07-v9u8YvKVN&jump_from=webapi&authKey=HiFkDO97IWzVgJEO6SWn59U3r7vJPEfvGNq8+Y4RVgOHFRN8+CB9WhpjYJmRvyky',
    '_blank'
  )
}

const redeemOrder = async (orderId: string) => {
  try {
    const payload = await sponsorApi.redeem(orderId)
    if (!payload.valid) {
      message.warning(payload.message || 'order not paid')
      return
    }
    applySponsorInfo(payload)
    updateOrderId.value = ''
    sponsorOrderId.value = ''
    sponsorModalVisible.value = false
    updateModalVisible.value = false
    const tip = payload.itemInserted ? 'redeem success' : payload.message || 'order recorded'
    message.success(tip)
  } catch (err) {
    const reason = getErrorMessage(err, 'redeem failed')
    message.error(reason)
    if (reason.includes('request approval') || reason.includes('afdian account')) {
      openChangeRequest()
    }
  }
}

const handleSponsorAction = async () => {
  if (!isAuthenticated.value) {
    message.warning(copy.loginTip)
    return
  }
  if (!sponsorInfo.value) {
    sponsorModalVisible.value = true
    return
  }
  if (!hasSteam.value) {
    claimModalVisible.value = true
    return
  }
  if (!sponsorInfo.value.claimed) {
    const orderId = sponsorInfo.value.orderId || pendingOrderId.value
    if (!orderId) {
      updateModalVisible.value = true
      return
    }
    await redeemOrder(orderId)
    return
  }
  updateModalVisible.value = true
}

const goToAfdian = () => {
  window.open('https://afdian.com/a/hlymcn', '_blank', 'noopener,noreferrer')
}

const handleVerifyOrder = async () => {
  const orderId = sponsorOrderId.value.trim()
  if (!orderId) {
    message.warning('请填写订单号')
    return
  }
  await redeemOrder(orderId)
  if (!hasSteam.value && sponsorInfo.value) {
    claimModalVisible.value = true
  }
}


const handleUpdateOrder = async () => {
  const orderId = updateOrderId.value.trim()
  if (!orderId) {
    message.warning('请填写订单号')
    return
  }
  await redeemOrder(orderId)
}

const goToProfile = () => {
  router.push('/profile')
  claimModalVisible.value = false
}

const openChangeRequest = () => {
  changeOrderId.value = updateOrderId.value || sponsorOrderId.value || pendingOrderId.value || ''
  changeModalVisible.value = true
}

const openAdminPanel = async () => {
  if (!isAuthenticated.value) {
    message.warning(copy.loginTip)
    return
  }
  await fetchAdminProfile()
  if (!isAdmin.value) {
    message.warning('没有权限')
    return
  }
  adminModalVisible.value = true
  await Promise.all([loadAdminItems(), loadAdminRecords(), loadChangeRequests()])
  if (!adminForm.sponsorItem) {
    resetAdminForm()
  }
}

const handleAdminAdd = async () => {
  if (!adminForm.displayName.trim()) {
    message.warning('请填写显示名称')
    return
  }
  if (!adminForm.steamId64.trim()) {
    message.warning('请填写 Steam64')
    return
  }
  if (!adminForm.sponsorItem) {
    message.warning('请选择权益条目')
    return
  }
  if (!adminForm.sponsorContent.trim()) {
    message.warning('请填写赞助内容')
    return
  }
  adminSubmitting.value = true
  try {
    await sponsorApi.adminAdd({
      steamId64: adminForm.steamId64.trim(),
      sponsorType: adminForm.sponsorType,
      sponsorContent: adminForm.sponsorContent.trim(),
      sponsorItem: adminForm.sponsorItem,
      displayName: adminForm.displayName.trim()
    })
    message.success('添加成功')
    resetAdminForm()
    await Promise.all([loadAdminRecords(), fetchContributors()])
  } catch (err) {
    message.error(getErrorMessage(err, 'add failed'))
  } finally {
    adminSubmitting.value = false
  }
}

const handleAdminRevoke = async (orderId: string) => {
  try {
    await sponsorApi.adminRevoke(orderId)
    message.success('已撤回')
    await Promise.all([loadAdminRecords(), fetchContributors()])
  } catch (err) {
    message.error(getErrorMessage(err, 'revoke failed'))
  }
}

const formatAmount = (value?: number) => {
  if (value === null || value === undefined) return '--'
  return `¥${value.toFixed(2)}`
}
</script>

<style scoped>
.contribute-page {
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

.contribute-content {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 120px 24px 160px;
}

.page-hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 72px;
  position: relative;
  padding-right: 420px;
}

.hero-copy {
  max-width: 640px;
}

.hero-side {
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: stretch;
  flex: 0 0 auto;
  position: absolute;
  right: 16px;
  top: 0;
  width: min(387px, 100%);
}

.eyebrow-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.34em;
  font-size: 12px;
  color: var(--theme-muted);
}

.admin-tag {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.page-hero h1 {
  font-size: 46px;
  margin: 10px 0 12px;
}

.lead {
  color: var(--theme-muted);
  line-height: 1.6;
  font-size: 16px;
}

.hero-stats {
  display: inline-grid;
  grid-template-columns: repeat(3, max-content);
  gap: 12px;
  width: fit-content;
  max-width: 100%;
  align-self: flex-end;
  margin-left: auto;
  justify-content: center;
  justify-items: center;
  text-align: center;
  flex: 0 0 auto;
  margin-right: 0;
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 20px;
  padding: 14px 16px;
  box-shadow: var(--theme-card-shadow);
}

.hero-stats .stat {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  color: var(--theme-muted);
}

.hero-stats strong {
  font-size: 20px;
  color: var(--theme-text);
}

.contribute-section {
  margin-bottom: 54px;
}

.section-header {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-title {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.section-kicker {
  font-size: 12px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--theme-muted);
}

.section-title h2 {
  font-size: 32px;
  margin: 0;
}

.section-lead {
  color: var(--theme-muted);
  line-height: 1.6;
  max-width: 720px;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  flex-wrap: wrap;
}

.title-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sponsor-summary {
  display: flex;
  justify-content: flex-end;
}

.sponsor-card {
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 22px;
  padding: 16px 22px;
  box-shadow: var(--theme-card-shadow);
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-right: 0;
}

.sponsor-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.sponsor-card h3 {
  margin: 6px 0 0;
  font-size: 22px;
}

.sponsor-metrics {
  display: flex;
  align-items: center;
  gap: 40px;
  flex-wrap: nowrap;
  justify-content: flex-start;
}

.sponsor-metric {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  color: var(--theme-muted);
  align-items: flex-start;
  text-align: left;
  min-width: 90px;
}

.sponsor-metric strong {
  font-size: 18px;
  color: var(--theme-text);
}

.sponsor-note {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 13px;
  color: var(--theme-muted);
}

.sponsor-link {
  background: none;
  border: none;
  padding: 0;
  color: #7c8dff;
  font-weight: 600;
  cursor: pointer;
}

.sponsor-pill {
  border: none;
  border-radius: 999px;
  padding: 8px 18px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(147, 51, 234, 0.95));
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 12px 24px rgba(59, 130, 246, 0.35);
  white-space: nowrap;
}

.sponsor-pill:hover {
  transform: translateY(-1px);
}

.sponsor-pill-ghost {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #ffffff;
  border: none;
  box-shadow: 0 12px 30px rgba(22, 163, 74, 0.35);
}

.sponsor-pill-small {
  padding: 6px 14px;
  font-size: 12px;
  box-shadow: 0 10px 22px rgba(22, 163, 74, 0.28);
}

:global(:root[data-theme='light']) .sponsor-pill-ghost {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #ffffff;
  border: none;
  box-shadow: 0 12px 30px rgba(22, 163, 74, 0.35);
}

.sponsor-pill-danger {
  background: #ef4444;
  color: #ffffff;
  border: none;
  box-shadow: 0 12px 24px rgba(239, 68, 68, 0.35);
}

.modal-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.sponsor-overlay {
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: radial-gradient(circle at top, rgba(49, 46, 129, 0.35), rgba(2, 6, 23, 0.8));
  backdrop-filter: blur(10px);
}

.glass-panel.sponsor-panel {
  width: min(560px, 100%);
  border-radius: 34px;
  padding: 34px;
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  box-shadow: var(--theme-card-shadow);
  color: var(--theme-text);
}

.glass-panel__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.glass-panel__header h3 {
  margin: 0;
  font-size: 26px;
}

.glass-panel__title-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.glass-panel__header p {
  margin: 6px 0 0;
  color: var(--theme-muted);
}

.glass-panel__eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.5em;
  font-size: 11px;
  color: var(--theme-muted);
  margin-bottom: 6px;
}

.glass-panel__close {
  background: none;
  border: none;
  color: var(--theme-text);
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-size: 28px;
  line-height: 1;
  opacity: 0.85;
  transition: transform 0.2s ease, opacity 0.2s ease;
  margin-left: auto;
  align-self: flex-start;
}

.glass-panel__close:hover {
  opacity: 1;
  transform: rotate(4deg);
}

.glass-panel__body {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 12px;
  margin-bottom: 0;
}

.glass-panel__cta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.glass-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.glass-field-row {
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
}

.glass-field--grow {
  flex: 1;
  min-width: 0;
}

.glass-field label {
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--theme-muted);
}

.glass-input {
  width: 100%;
  border-radius: 20px;
  border: 1px solid var(--theme-border);
  background: var(--theme-secondary-bg);
  color: var(--theme-text);
  padding: 14px 18px;
  font-size: 15px;
  transition: border 0.2s ease, box-shadow 0.2s ease;
}

.glass-input:focus {
  outline: none;
  border-color: rgba(94, 234, 212, 0.8);
  box-shadow: 0 0 0 3px rgba(94, 234, 212, 0.15);
}

.glass-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 20px;
  padding: 14px 22px;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  box-shadow: 0 12px 30px rgba(22, 163, 74, 0.35);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  white-space: nowrap;
}

.glass-submit:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px rgba(21, 128, 61, 0.4);
}

.verify-submit {
  min-width: 72px;
}

.verify-submit-compact {
  min-width: 56px;
  padding: 12px 16px;
  height: 48px;
}

.modal-tip {
  margin: 0;
  font-size: 13px;
  color: var(--theme-muted);
}

.modal-card-wide {
  width: min(760px, 94vw);
}

:global(:root[data-theme='light']) .sponsor-overlay {
  background: rgba(15, 23, 42, 0.28);
}

:global(:root[data-theme='light']) .glass-panel.sponsor-panel {
  background: rgba(255, 255, 255, 0.96);
  border-color: rgba(15, 23, 42, 0.12);
  box-shadow: 0 28px 80px rgba(15, 23, 42, 0.12);
}

:global(:root[data-theme='light']) .glass-input {
  background: rgba(226, 232, 240, 0.7);
  color: #0f172a;
  border-color: rgba(15, 23, 42, 0.15);
}

:global(:root[data-theme='light']) .glass-input:focus {
  border-color: rgba(14, 165, 233, 0.6);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
}

:global(:root:not([data-theme='light'])) .glass-panel.sponsor-panel {
  background: linear-gradient(160deg, rgba(15, 23, 42, 0.92), rgba(30, 27, 75, 0.88));
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: 0 45px 120px rgba(2, 6, 23, 0.75);
  color: #e2e8f0;
}

:global(:root:not([data-theme='light'])) .glass-input {
  background: rgba(15, 23, 42, 0.65);
  border-color: rgba(148, 163, 184, 0.35);
  color: #f8fafc;
}

.admin-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 18px;
}

.admin-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px;
  border-radius: 18px;
  border: 1px dashed var(--theme-border);
  background: var(--theme-secondary-bg);
}

.admin-change {
  margin-top: 12px;
}

.admin-form-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.admin-form-header h4 {
  margin: 0;
  font-size: 18px;
}

.admin-form-header span {
  color: var(--theme-muted);
  font-size: 12px;
}

.admin-form-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.admin-form-row--align {
  align-items: flex-end;
}

.admin-form-row .glass-field {
  flex: 1;
  min-width: 180px;
}

.admin-row-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.admin-empty {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--theme-muted);
}

.admin-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 260px;
  overflow-y: auto;
  padding-right: 6px;
}

.admin-list-scroll {
  max-height: 220px;
}

.admin-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 16px;
  border: 1px solid var(--theme-border);
  background: var(--theme-secondary-bg);
}

.admin-row span {
  display: block;
  font-size: 12px;
  color: var(--theme-muted);
}

.admin-actions {
  display: flex;
  gap: 8px;
}

.admin-add-submit {
  min-width: 56px;
  padding: 10px 14px;
  height: 48px;
  transform: translateY(-2px);
}

.admin-add-submit:not(:disabled):hover {
  transform: translateY(-2px);
}

.contributors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
  justify-items: start;
}

.contributors-grid.is-single,
.contributors-grid.is-empty {
  grid-template-columns: minmax(260px, 260px);
}

.contributor-card {
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 18px;
  padding: 18px;
  box-shadow: var(--theme-card-shadow);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  max-width: 260px;
  width: 100%;
  min-height: 200px;
  justify-self: start;
}

.contributor-card:hover {
  transform: translateY(-4px);
}

.card-surface {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

.section-donors .avatar {
  background: linear-gradient(135deg, #60a5fa, #7c3aed);
}

.section-tech .avatar {
  background: linear-gradient(135deg, #34d399, #0ea5e9);
}

.section-special .avatar {
  background: linear-gradient(135deg, #fbbf24, #f97316);
}
.section-special .special-grid {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.section-special .special-card {
  max-width: 260px;
  width: 100%;
}


.card-surface h3 {
  margin: 0;
  font-size: 18px;
  color: var(--theme-text);
}

.card-surface p {
  margin: 0;
  font-size: 13px;
  color: var(--theme-muted);
  line-height: 1.6;
}

.placeholder-card {
  border-style: dashed;
  background: var(--theme-secondary-bg);
  box-shadow: none;
}

.placeholder-avatar {
  background: rgba(148, 163, 184, 0.3);
  color: var(--theme-text);
}

.section-error {
  padding: 24px;
  border-radius: 18px;
  border: 1px dashed var(--theme-border);
  background: var(--theme-secondary-bg);
  text-align: center;
  color: var(--theme-muted);
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.skeleton-card {
  border-radius: 18px;
  border: 1px solid var(--theme-border);
  background: var(--theme-card-bg);
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: var(--theme-card-shadow);
  max-width: 260px;
  width: 100%;
  min-height: 200px;
}

.skeleton-avatar,
.skeleton-line {
  background: linear-gradient(120deg, rgba(148, 163, 184, 0.25), rgba(255, 255, 255, 0.4), rgba(148, 163, 184, 0.25));
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.6s ease-in-out infinite;
}

.skeleton-avatar {
  width: 56px;
  height: 56px;
  border-radius: 999px;
}

.skeleton-line {
  height: 12px;
  border-radius: 999px;
}

.skeleton-line-lg {
  width: 80%;
}

.skeleton-line-sm {
  width: 60%;
}

@keyframes skeleton-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.thanks-section {
  margin-top: 60px;
}

.thanks-card {
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 26px;
  padding: 28px 32px;
  box-shadow: var(--theme-card-shadow);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.thanks-card h3 {
  margin: 0;
  font-size: 24px;
}

.thanks-card p {
  margin: 0;
  color: var(--theme-muted);
  line-height: 1.7;
}

@media (max-width: 960px) {
  .page-hero {
    flex-direction: column;
    align-items: flex-start;
    padding-right: 0;
  }

  .hero-side {
    width: 100%;
    align-items: stretch;
    position: static;
  }

  .hero-stats {
    width: 100%;
  }

  .sponsor-card {
    padding: 20px;
    margin-right: 0;
    width: 100%;
  }


  .contributors-grid {
    grid-template-columns: 1fr;
    justify-items: stretch;
  }

  .contributor-card,
  .skeleton-card {
    max-width: 100% !important;
    width: 100% !important;
    justify-self: stretch;
  }


  .section-special .special-grid {
    grid-template-columns: 1fr;
    justify-items: stretch;
  }

  .section-special .special-card {
    max-width: 100% !important;
    width: 100% !important;
    justify-self: stretch;
  }
}

@media (max-width: 640px) {
  .contribute-content {
    padding: 100px 18px 120px;
  }

  .page-hero h1 {
    font-size: 36px;
  }

  .hero-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .sponsor-card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .section-title h2 {
    font-size: 26px;
  }

  .thanks-card {
    padding: 24px 20px;
  }

  .contributors-grid {
    grid-template-columns: 1fr;
    justify-items: stretch;
  }

  .contributor-card,
  .skeleton-card {
    max-width: 100% !important;
    width: 100% !important;
    justify-self: stretch;
  }
}

:deep(.cta-button) {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(147, 51, 234, 0.95)) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 999px !important;
  padding: 0 28px !important;
  height: 46px !important;
  font-weight: 600;
  box-shadow: 0 16px 30px rgba(37, 99, 235, 0.3);
}

:deep(.cta-button:hover) {
  transform: translateY(-2px);
  box-shadow: 0 20px 36px rgba(59, 130, 246, 0.36);
}
</style>
  .sponsor-metrics {
    flex-wrap: wrap;
  }
