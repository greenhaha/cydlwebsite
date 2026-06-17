<template>
  <div class="gift-page">
    <div class="gift-bg">
      <video
        src="https://hlympic.oss-cn-beijing.aliyuncs.com/frontend/assets/video/bg/giftbg.mp4"
        muted
        autoplay
        loop
        playsinline
        preload="metadata"
      ></video>
      <div class="bg-overlay"></div>
    </div>

    <div class="gift-content">
      <section class="page-hero">
        <div class="title-block">
          <div class="title-eyebrow-row">
            <p class="eyebrow">Bilibili 精选呈现</p>
            <n-tag v-if="isAdmin" type="success" round size="small">管理员模式</n-tag>
          </div>
          <h1>直播与视频图鉴</h1>
          <p class="lead">只需贴上链接，系统即刻抓取封面、标题与主播信息，打造沉浸式展示墙</p>
        </div>
      </section>

      <div class="tab-card-wrapper" v-if="currentTab">
        <section class="tab-section">
          <header class="tab-meta">
            <div class="tab-heading">
              <span class="tab-arrow tab-arrow-left" role="button" @click="showPrevCard">‹</span>
              <div class="tab-heading-text">
                <p class="tab-eyebrow">{{ currentTab.eyebrow }}</p>
                <h3>{{ currentTab.title }}</h3>
                <p>{{ currentTab.description }}</p>
              </div>
              <span class="tab-arrow tab-arrow-right" role="button" @click="showNextCard">›</span>
            </div>
            <div class="tab-meta-actions">
              <span class="tab-counter">已收录 {{ getEntries(currentTab.type).length }} 条</span>
              <n-button
                class="tab-refresh-btn"
                type="primary"
                strong
                size="medium"
                round
                :loading="getLoading(currentTab.type)"
                @click="refreshGallery(currentTab.type)"
              >
                <template #icon>
                  <n-icon><RefreshOutline /></n-icon>
                </template>
                同步内容
              </n-button>
            </div>
          </header>

          <n-alert v-if="getError(currentTab.type)" type="error" class="tab-alert" :closable="false">
            {{ getError(currentTab.type) }}
          </n-alert>
          <div v-else-if="!getLoading(currentTab.type) && getEntries(currentTab.type).length === 0" class="empty-hint">
            {{ currentTab.empty }}
          </div>

          <div v-if="getLoading(currentTab.type)" class="showcase-skeleton-grid">
            <div class="showcase-skeleton-card" v-for="s in 6" :key="`skeleton-${s}`">
              <div class="skeleton-thumb"></div>
              <div class="skeleton-line"></div>
              <div class="skeleton-line skeleton-line-short"></div>
            </div>
          </div>
          <div v-else class="showcase-grid">
            <template v-for="item in getGalleryItems(currentTab.type)" :key="itemKey(item)">
              <div
                v-if="isAddCardItem(item)"
                class="showcase-card add-card"
                @click="handleAddCardClick(item.type)"
              >
                <div class="add-icon">
                  <n-icon size="44"><AddOutline /></n-icon>
                </div>
                <p class="add-title">添加{{ item.type === 'LIVE' ? '直播间' : '视频' }}</p>
                <p class="add-hint">粘贴 {{ item.type === 'LIVE' ? 'live.bilibili.com' : 'BV 号' }} 链接即可展示</p>
              </div>
              <article
                v-else
                class="showcase-card"
                @click="openExternal(item.url)"
              >
                <div class="card-media">
                  <img :src="item.cover" alt="封面" loading="lazy" />
                  <div class="card-type-chip">{{ item.type === 'LIVE' ? 'LIVE' : 'VIDEO' }}</div>
                  <div class="card-admin-controls" v-if="canManageEntry(item)">
                    <n-button size="tiny" quaternary type="primary" @click.stop="handleManageClick(item)">
                      <template #icon><n-icon size="16"><ConstructOutline /></n-icon></template>
                      管理
                    </n-button>
                  </div>
                </div>
                <div class="card-body">
                  <n-ellipsis :line-clamp="2" class="card-title">{{ item.title }}</n-ellipsis>
                  <p class="card-author">{{ item.type === 'LIVE' ? '主播' : '作者' }}：{{ item.author }}</p>
                  <div class="card-meta">
                    <span class="card-submitter">
                      <span>提交人：{{ item.submittedBy }}</span>
                      <span
                        v-if="item.submitterTag"
                        class="submitter-tag"
                        :style="getSubmitterTagStyle(item.submitterTagColor)"
                      >
                        {{ item.submitterTag }}
                      </span>
                    </span>
                    <n-button
                      v-if="canDeleteEntry(item)"
                      size="tiny"
                      quaternary
                      type="error"
                      :loading="isDeletingEntry(item.id)"
                      @click.stop="requestDelete(item)"
                    >
                      删除
                    </n-button>
                  </div>
                </div>
              </article>
            </template>
          </div>
        </section>
      </div>
    </div>

    <transition name="modal-fade">
      <div v-if="submitModalVisible" class="glass-modal" role="dialog" aria-modal="true" aria-label="提交内容">
        <div class="glass-panel">
          <div class="glass-panel__header">
            <div>
              <p class="glass-panel__eyebrow">Submit</p>
              <h3>提交{{ submitModalType === 'LIVE' ? '直播间' : '视频' }}</h3>
              <p>系统会自动解析标题、作者与封面</p>
            </div>
            <button class="glass-panel__close" type="button" @click="closeSubmitModal" aria-label="关闭">×</button>
          </div>
          <div class="glass-panel__body">
            <div class="glass-field-row">
              <div class="glass-field glass-field--grow">
                <label>内容链接</label>
                <input
                  v-model="submitForm.url"
                  :placeholder="submitPlaceholder"
                  class="glass-input"
                  type="text"
                />
              </div>
              <button
                class="glass-submit"
                type="button"
                :disabled="submitLoading"
                @click="handleSubmitConfirm"
              >
                {{ submitLoading ? '提交中' : '提交' }}
              </button>
            </div>
            <p v-if="submitError" class="form-error glass-panel__error">{{ submitError }}</p>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal-fade">
      <div v-if="manageModalVisible" class="glass-modal" role="dialog" aria-modal="true" aria-label="管理投稿">
        <div class="glass-panel">
          <div class="glass-panel__header">
            <div>
              <p class="glass-panel__eyebrow">Manage</p>
              <h3>管理投稿</h3>
              <p v-if="manageTarget">{{ manageTarget.title }}</p>
            </div>
            <button class="glass-panel__close" type="button" @click="closeManageModal" aria-label="关闭">×</button>
          </div>
          <div class="glass-panel__body" v-if="manageTarget">
            <div class="glass-field">
              <label>新的哔哩哔哩链接</label>
              <input
                v-model="manageForm.url"
                placeholder="粘贴新的哔哩哔哩链接"
                class="glass-input"
                type="text"
              />
            </div>
            <p v-if="manageError" class="form-error glass-panel__error">{{ manageError }}</p>
          </div>
          <div class="glass-panel__footer">
            <n-button quaternary :loading="manageDeleting" type="error" class="ghost-btn ghost-btn--danger" @click="handleManageDelete">
              删除卡片
            </n-button>
            <div class="modal-actions-spacer"></div>
            <n-button quaternary class="ghost-btn" @click="closeManageModal">取消</n-button>
            <button
              class="link-action link-action--success"
              type="button"
              :disabled="manageSaving"
              @click="handleManageUpdate"
            >
              {{ manageSaving ? '保存中...' : '保存链接' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { AddOutline, ConstructOutline, RefreshOutline } from '@vicons/ionicons5'
import {
  NAlert,
  NButton,
  NEllipsis,
  NIcon,
  NTag,
  useDialog,
  useMessage,
} from 'naive-ui'
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { showcaseApi, type ShowcaseAdminProfile, type ShowcaseResponse, type ShowcaseStatus, type ShowcaseType } from '@/services/api'

type ShowcaseEntry = {
  id: number
  title: string
  author: string
  url: string
  cover: string
  submittedBy: string
  createdAt: string
  status: ShowcaseStatus
  submitterId?: number
  submitterTag?: string | null
  submitterTagColor?: string | null
  type: ShowcaseType
}

type SubmissionForm = {
  url: string
}

type AddCardDescriptor = {
  isAddCard: true
  type: ShowcaseType
  key: string
}

type GalleryItem = ShowcaseEntry | AddCardDescriptor

type ValidationResult = {
  valid: boolean
  value?: string
  message?: string
}

const FALLBACK_COVER = 'https://hlymmodelslist.oss-cn-beijing.aliyuncs.com/models/CT/saber_wedding_personal.png'
const BILIBILI_LIVE_HOST = 'live.bilibili.com'
const PAGE_SIZE = 60

const TAB_CONFIGS: Array<{ type: ShowcaseType; tab: string; title: string; eyebrow: string; description: string; empty: string }> = [
  {
    type: 'LIVE',
    tab: '直播图鉴',
    title: '直播间',
    eyebrow: 'Live Rooms',
    description: '呈现社区主播的实时热度，点击即可跳转哔哩哔哩直播间',
    empty: '暂时还没有直播间投稿，成为第一个分享的人吧',
  },
  {
    type: 'VIDEO',
    tab: '视频图鉴',
    title: '视频分享库',
    eyebrow: 'Video Archive',
    description: '收录玩家自制的攻略、剪辑与赛事高光，轻松沉浸观看',
    empty: '这里还空着，欢迎上传你的精彩视频',
  },
]

const TAB_LABELS: Record<ShowcaseType, string> = {
  LIVE: '直播间',
  VIDEO: '视频分享库',
}

const normalizeCover = (cover?: string | null) => {
  if (!cover) return FALLBACK_COVER
  if (cover.startsWith('//')) return `https:${cover}`
  return cover
}

const tryParseUrl = (value: string): URL | null => {
  try {
    return new URL(value)
  } catch {
    return null
  }
}

const isBilibiliHost = (hostname: string) => hostname === 'bilibili.com' || hostname.endsWith('.bilibili.com')

const extractBvid = (parsed: URL): string | null => {
  const match = parsed.href.match(/(BV[\w]+)/i)
  return match ? match[1] : null
}

const extractRoomId = (parsed: URL): string | null => {
  const match = parsed.pathname.match(/(\d+)/)
  return match ? match[1] : null
}

const HEX_COLOR_RE = /^#(?:[0-9a-fA-F]{3}){1,2}$/

const toHalfWidth = (value: string) =>
  value.replace(/[\uFF01-\uFF5E]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0)).replace(/\u3000/g, ' ')

const sanitizeColorValue = (value: string | null | undefined) => {
  if (!value) return ''
  return toHalfWidth(value).trim()
}

const normalizeHexColor = (value: string) => {
  if (value.length === 4) {
    return `#${value
      .slice(1)
      .split('')
      .map((ch) => ch + ch)
      .join('')}`
  }
  return value
}

const hexToRgba = (value: string, alpha: number) => {
  const normalized = normalizeHexColor(value)
  const numeric = parseInt(normalized.slice(1), 16)
  const r = (numeric >> 16) & 255
  const g = (numeric >> 8) & 255
  const b = numeric & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const validateBilibiliUrl = (value: string, type: ShowcaseType): ValidationResult => {
  const trimmed = value.trim()
  if (!trimmed) {
    return { valid: false, message: type === 'LIVE' ? '请粘贴直播间链接' : '请粘贴视频链接' }
  }
  const parsed = tryParseUrl(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`)
  if (!parsed) {
    return { valid: false, message: '链接格式不正确，请以 https:// 开头' }
  }
  if (!isBilibiliHost(parsed.hostname)) {
    return { valid: false, message: '目前仅支持哔哩哔哩链接' }
  }
  if (type === 'LIVE') {
    if (parsed.hostname !== BILIBILI_LIVE_HOST) {
      return { valid: false, message: '直播间链接需来自 live.bilibili.com' }
    }
    if (!extractRoomId(parsed)) {
      return { valid: false, message: '未检测到直播间 ID，请确认链接格式' }
    }
  } else if (!extractBvid(parsed)) {
    return { valid: false, message: '请粘贴包含 BV 号的哔哩哔哩视频链接' }
  }
  return { valid: true, value: parsed.toString() }
}

const transformEntry = (item: ShowcaseResponse): ShowcaseEntry => ({
  id: item.id,
  title: item.title,
  author: item.author,
  url: item.originalUrl,
  cover: normalizeCover(item.coverUrl),
  submittedBy: item.submittedBy || (item.submitterId ? `ID${item.submitterId}` : '匿名'),
  createdAt: item.createdAt,
  status: item.status,
  submitterId: item.submitterId,
  submitterTag: item.submitterTag || null,
  submitterTagColor: item.submitterTagColor || null,
  type: item.type,
})

export default defineComponent({
  components: {
    NEllipsis,
    NAlert,
    NButton,
    NIcon,
    NTag,
    AddOutline,
    ConstructOutline,
    RefreshOutline,
  },
  setup() {
    const authStore = useAuthStore()
    const { isAuthenticated, user } = storeToRefs(authStore)
    const liveRooms = ref<ShowcaseEntry[]>([])
    const videos = ref<ShowcaseEntry[]>([])
    const liveLoading = ref(false)
    const videoLoading = ref(false)
    const liveFetchError = ref('')
    const videoFetchError = ref('')
    const deletingIds = ref<Set<number>>(new Set())
    const isAdmin = ref(false)
    const submitModalVisible = ref(false)
    const submitModalType = ref<ShowcaseType>('LIVE')
    const submitForm = reactive<SubmissionForm>({ url: '' })
    const submitError = ref('')
    const submitLoading = ref(false)
    const manageModalVisible = ref(false)
    const manageTarget = ref<ShowcaseEntry | null>(null)
    const manageForm = reactive<SubmissionForm>({ url: '' })
    const manageError = ref('')
    const manageSaving = ref(false)
    const manageDeleting = ref(false)
    const activeTab = ref<ShowcaseType>('LIVE')
    const tabOrder = TAB_CONFIGS.map((cfg) => cfg.type)
    const currentTab = computed(() => TAB_CONFIGS.find((cfg) => cfg.type === activeTab.value) || TAB_CONFIGS[0])
    const isSyncing = computed(() => liveLoading.value || videoLoading.value)
    const message = useMessage()
    const dialog = useDialog()

    const loadEntries = async (type: ShowcaseType) => {
      const loadingRef = type === 'LIVE' ? liveLoading : videoLoading
      const errorRef = type === 'LIVE' ? liveFetchError : videoFetchError
      const targetList = type === 'LIVE' ? liveRooms : videos
      loadingRef.value = true
      errorRef.value = ''
      try {
        const data = await showcaseApi.list({ type, status: 'PUBLISHED', page: 0, size: PAGE_SIZE })
        targetList.value = data.items.map(transformEntry)
      } catch (error) {
        errorRef.value = error instanceof Error ? error.message : '加载失败，请稍后再试'
      } finally {
        loadingRef.value = false
      }
    }

    const createGalleryItems = (list: ShowcaseEntry[], type: ShowcaseType): GalleryItem[] => {
      const addCard: AddCardDescriptor = { isAddCard: true, type, key: `${type}-add-card` }
      if (!list.length) {
        return [addCard]
      }
      return [...list, addCard]
    }

    const liveGalleryItems = computed(() => createGalleryItems(liveRooms.value, 'LIVE'))
    const videoGalleryItems = computed(() => createGalleryItems(videos.value, 'VIDEO'))

    const isAddCardItem = (item: GalleryItem): item is AddCardDescriptor => {
      return (item as AddCardDescriptor).isAddCard === true
    }

    const itemKey = (item: GalleryItem) => (isAddCardItem(item) ? item.key : `entry-${item.id}`)

    const openExternal = (url: string) => {
      window.open(url, '_blank', 'noopener')
    }

    const updateDeletingSet = (id: number, shouldAdd: boolean) => {
      const next = new Set(deletingIds.value)
      if (shouldAdd) {
        next.add(id)
      } else {
        next.delete(id)
      }
      deletingIds.value = next
    }

    const getCollectionRef = (type: ShowcaseType) => (type === 'LIVE' ? liveRooms : videos)

    const performSubmission = async (type: ShowcaseType, url: string) => {
      if (!isAuthenticated.value) {
        throw new Error(type === 'LIVE' ? '请登录后再提交直播间' : '请登录后再分享视频')
      }
      const validation = validateBilibiliUrl(url, type)
      if (!validation.valid) {
        throw new Error(validation.message || '链接不符合要求')
      }
      const sanitizedUrl = validation.value || url.trim()
      const response = await showcaseApi.submit(type, sanitizedUrl)
      return transformEntry(response)
    }

    const getSubmitterTagStyle = (color?: string | null): Record<string, string> => {
      const sanitized = sanitizeColorValue(color)
      if (!sanitized) return {}
      if (HEX_COLOR_RE.test(sanitized)) {
        const normalized = normalizeHexColor(sanitized)
        return {
          '--tag-fg': normalized,
          '--tag-border': hexToRgba(normalized, 0.45),
          '--tag-bg': hexToRgba(normalized, 0.18),
        }
      }
      return {
        '--tag-fg': sanitized,
        '--tag-border': sanitized,
      }
    }

    const doDelete = async (type: ShowcaseType, entryId: number) => {
      updateDeletingSet(entryId, true)
      try {
        await showcaseApi.remove(entryId)
        const target = getCollectionRef(type)
        target.value = target.value.filter((item) => item.id !== entryId)
        message.success('删除成功')
      } catch (error) {
        message.error(error instanceof Error ? error.message : '删除失败，请稍后再试')
      } finally {
        updateDeletingSet(entryId, false)
      }
    }

    const isEntryOwner = (entry: ShowcaseEntry) => {
      if (!user.value) return false
      if (entry.submitterId && entry.submitterId === user.value.id) return true
      if (entry.submittedBy && entry.submittedBy === user.value.username) return true
      return false
    }

    const canDeleteEntry = (entry: ShowcaseEntry) => {
      if (isAdmin.value) return false
      return isEntryOwner(entry)
    }

    const canManageEntry = (entry: ShowcaseEntry) => {
      if (isAdmin.value) return true
      return isEntryOwner(entry)
    }

    const requestDelete = (entry: ShowcaseEntry) => {
      dialog.warning({
        title: '删除确认',
        content: '删除后无法恢复，确定要删除该投稿吗',
        positiveText: '删除',
        negativeText: '取消',
        onPositiveClick: () => doDelete(entry.type, entry.id),
      })
    }

    const isDeletingEntry = (id: number) => deletingIds.value.has(id)

    const handleAddCardClick = (type: ShowcaseType) => {
      if (!isAuthenticated.value) {
        message.warning('登录后才能提交内容')
        return
      }
      submitModalType.value = type
      submitForm.url = ''
      submitError.value = ''
      submitModalVisible.value = true
    }

    const closeSubmitModal = () => {
      submitModalVisible.value = false
      submitForm.url = ''
      submitError.value = ''
    }

    const handleSubmitConfirm = async () => {
      submitError.value = ''
      submitLoading.value = true
      try {
        const entry = await performSubmission(submitModalType.value, submitForm.url)
        const collection = getCollectionRef(submitModalType.value)
        collection.value = [entry, ...collection.value]
        submitModalVisible.value = false
        message.success(submitModalType.value === 'LIVE' ? '直播间提交成功' : '视频提交成功')
      } catch (error) {
        submitError.value = error instanceof Error ? error.message : '提交失败，请稍后重试'
      } finally {
        submitLoading.value = false
      }
    }

    const handleManageClick = (entry: ShowcaseEntry) => {
      manageTarget.value = entry
      manageForm.url = entry.url
      manageError.value = ''
      manageModalVisible.value = true
    }

    const closeManageModal = () => {
      manageModalVisible.value = false
      manageTarget.value = null
      manageError.value = ''
      manageSaving.value = false
      manageDeleting.value = false
    }

    const handleManageUpdate = async () => {
      if (!manageTarget.value) return
      manageError.value = ''
      manageSaving.value = true
      try {
        const response = await showcaseApi.update(manageTarget.value.id, { url: manageForm.url })
        const updated = transformEntry(response)
        const collection = getCollectionRef(updated.type)
        collection.value = collection.value.map((item) => (item.id === updated.id ? updated : item))
        manageModalVisible.value = false
        message.success('投稿已更新')
      } catch (error) {
        manageError.value = error instanceof Error ? error.message : '更新失败，请稍后再试'
      } finally {
        manageSaving.value = false
      }
    }

    const handleManageDelete = () => {
      if (!manageTarget.value) return
      dialog.warning({
        title: '删除投稿',
        content: '删除后将无法恢复，确定继续吗',
        positiveText: '删除',
        negativeText: '取消',
        onPositiveClick: async () => {
          if (!manageTarget.value) return
          manageDeleting.value = true
          try {
            await doDelete(manageTarget.value.type, manageTarget.value.id)
            closeManageModal()
          } finally {
            manageDeleting.value = false
          }
        },
      })
    }

    const refreshGallery = async (type: ShowcaseType) => {
      const loadingMsg = message.loading(`正在同步${TAB_LABELS[type]}...`, { duration: 0 })
      try {
        await showcaseApi.refresh(type)
        await loadEntries(type)
        message.success(`${TAB_LABELS[type]}已刷新`)
      } catch (error) {
        const msg = error instanceof Error ? error.message : '刷新失败，请稍后再试'
        message.error(msg)
      } finally {
        loadingMsg.destroy()
      }
    }

    const showPrevCard = () => {
      const currentIdx = tabOrder.indexOf(activeTab.value)
      const nextIdx = (currentIdx - 1 + tabOrder.length) % tabOrder.length
      activeTab.value = tabOrder[nextIdx]
    }

    const showNextCard = () => {
      const currentIdx = tabOrder.indexOf(activeTab.value)
      const nextIdx = (currentIdx + 1) % tabOrder.length
      activeTab.value = tabOrder[nextIdx]
    }

    const refreshAll = async () => {
      const loadingMsg = message.loading('正在同步全部内容...', { duration: 0 })
      try {
        await Promise.all([showcaseApi.refresh('LIVE'), showcaseApi.refresh('VIDEO')])
        await Promise.all([loadEntries('LIVE'), loadEntries('VIDEO')])
        message.success('全部内容已刷新')
      } catch (error) {
        const msg = error instanceof Error ? error.message : '刷新失败，请稍后再试'
        message.error(msg)
      } finally {
        loadingMsg.destroy()
      }
    }

    const getGalleryItems = (type: ShowcaseType) => (type === 'LIVE' ? liveGalleryItems.value : videoGalleryItems.value)
    const getEntries = (type: ShowcaseType) => (type === 'LIVE' ? liveRooms.value : videos.value)
    const getLoading = (type: ShowcaseType) => (type === 'LIVE' ? liveLoading.value : videoLoading.value)
    const getError = (type: ShowcaseType) => (type === 'LIVE' ? liveFetchError.value : videoFetchError.value)

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

    const submitPlaceholder = computed(() =>
      submitModalType.value === 'LIVE' ? 'https://live.bilibili.com/xxxx' : 'https://www.bilibili.com/video/BVxxxx'
    )

    watch(
      () => isAuthenticated.value,
      (authed) => {
        if (authed) {
          fetchAdminProfile()
        } else {
          isAdmin.value = false
        }
      },
      { immediate: true }
    )

    onMounted(() => {
      loadEntries('LIVE')
      loadEntries('VIDEO')
      if (isAuthenticated.value) {
        fetchAdminProfile()
      }
    })

    return {
      isAuthenticated,
      user,
      liveRooms,
      videos,
      liveLoading,
      videoLoading,
      liveFetchError,
      videoFetchError,
      openExternal,
      canDeleteEntry,
      canManageEntry,
      isEntryOwner,
      requestDelete,
      isDeletingEntry,
      handleAddCardClick,
      submitModalVisible,
      submitForm,
      submitModalType,
      submitError,
      submitLoading,
      handleSubmitConfirm,
      closeSubmitModal,
      isAddCardItem,
      itemKey,
      getGalleryItems,
      getEntries,
      getLoading,
      getError,
      activeTab,
      currentTab,
      isSyncing,
      refreshGallery,
      refreshAll,
      showPrevCard,
      showNextCard,
      isAdmin,
      manageModalVisible,
      manageForm,
      manageError,
      manageSaving,
      manageDeleting,
      handleManageClick,
      handleManageUpdate,
      handleManageDelete,
      closeManageModal,
      manageTarget,
      submitPlaceholder,
      getSubmitterTagStyle,
    }
  },
})
</script>

<style scoped>
.gift-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  color: #f8fafc;
}

.gift-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
}

.gift-bg video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.2) brightness(0.6);
}

.bg-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.25), transparent),
    radial-gradient(circle at 80% 0%, rgba(236, 72, 153, 0.2), transparent),
    rgba(2, 6, 23, 0.7);
}

.gift-content {
  position: relative;
  z-index: 1;
  padding: 120px 32px 160px;
  max-width: 1320px;
  margin: 0 auto;
}

.page-hero {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-end;
  margin-bottom: 32px;
}

.title-block h1 {
  font-size: 48px;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.title-block .eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.4em;
  font-size: 13px;
  color: rgba(248, 250, 252, 0.6);
}

 .title-block .lead {
  color: rgba(248, 250, 252, 0.75);
  max-width: 640px;
  line-height: 1.6;
}

.title-eyebrow-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tab-card-wrapper {
  width: 100%;
}

.tab-heading {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 0 72px 0 32px;
}

.tab-heading-text {
  flex: 1;
}

.tab-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 48px;
  line-height: 1;
  cursor: pointer;
  user-select: none;

  /* 颜色永远不在 hover 里变化（亮/暗模式都不会“消失”） */
  color: var(--theme-text);

  /* 只做轻微位移/透明度变化，手感更轻 */
  opacity: 0.85;
  transition: transform 0.18s ease, opacity 0.18s ease;
}

.tab-arrow-left {
  left: 0;
}

.tab-arrow-right {
  right: 0;
}

.tab-arrow:hover {
  opacity: 1;
}

/* 左右箭头 hover 只偏移一下（不变色） */
.tab-arrow-left:hover {
  transform: translateY(-50%) translateX(-4px);
}

.tab-arrow-right:hover {
  transform: translateY(-50%) translateX(4px);
}

.tab-section {
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 32px;
  padding: 32px;
  box-shadow: 0 18px 60px rgba(2, 6, 23, 0.28);
}

.tab-meta {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-start;
  margin-bottom: 24px;
}

.tab-meta h3 {
  font-size: 24px;
  margin-bottom: 4px;
}

.tab-meta p {
  color: rgba(226, 232, 240, 0.8);
  margin: 0;
}

.tab-eyebrow {
  font-size: 12px;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: rgba(148, 163, 184, 0.8);
  margin-bottom: 4px;
}

.tab-meta-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

:deep(.tab-refresh-btn.n-button) {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(147, 51, 234, 0.95));
  color: #fff;
  border: none;
  box-shadow: 0 6px 12px rgba(14, 165, 233, 0.22);
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

:deep(.tab-refresh-btn.n-button:hover) {
  transform: translateY(-2px);
  box-shadow: 0 10px 18px rgba(124, 58, 237, 0.28);
}

:deep(.tab-refresh-btn.n-button:focus-visible) {
  box-shadow: 0 0 0 2px rgba(191, 219, 254, 0.85), 0 8px 16px rgba(14, 165, 233, 0.26);
}

:deep(.tab-refresh-btn .n-button__content) {
  font-weight: 600;
  letter-spacing: 0.05em;
}

:deep(.tab-refresh-btn .n-button__border),
:deep(.tab-refresh-btn .n-button__state-border) {
  display: none;
}

.tab-counter {
  font-size: 13px;
  color: rgba(226, 232, 240, 0.75);
}

.tab-alert {
  margin-bottom: 16px;
}

.empty-hint {
  padding: 16px 20px;
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.5);
  color: rgba(226, 232, 240, 0.85);
  border: 1px dashed rgba(148, 163, 184, 0.4);
  margin-bottom: 16px;
}

.showcase-skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.showcase-skeleton-card {
  border-radius: 24px;
  padding: 18px;
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  box-shadow: var(--theme-card-shadow);
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow: hidden;
}

.skeleton-thumb {
  height: 180px;
  border-radius: 18px;
  background: linear-gradient(120deg, rgba(148, 163, 184, 0.25), rgba(59, 130, 246, 0.28), rgba(148, 163, 184, 0.25));
  background-size: 200% 200%;
  animation: shimmer 2s linear infinite;
}

.skeleton-line {
  height: 14px;
  border-radius: 999px;
  background: linear-gradient(120deg, rgba(148, 163, 184, 0.35), rgba(59, 130, 246, 0.25), rgba(148, 163, 184, 0.35));
  background-size: 200% 200%;
  animation: shimmer 2s linear infinite;
}

:global(:root[data-theme='light']) .gift-page .skeleton-thumb {
  background: linear-gradient(120deg, rgba(148, 163, 184, 0.18), rgba(59, 130, 246, 0.16), rgba(148, 163, 184, 0.18));
}

:global(:root[data-theme='light']) .gift-page .skeleton-line {
  background: linear-gradient(120deg, rgba(148, 163, 184, 0.25), rgba(59, 130, 246, 0.14), rgba(148, 163, 184, 0.25));
}

.skeleton-line-short {
  width: 60%;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.showcase-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  display: flex;
  flex-direction: column;
}

.showcase-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 52px rgba(0, 0, 0, 0.30);
}

.card-media {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.showcase-card:hover .card-media img {
  transform: scale(1.05);
}

.card-type-chip {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.7);
  font-size: 12px;
  letter-spacing: 0.2em;
}

.card-admin-controls {
  position: absolute;
  top: 12px;
  right: 12px;
}

.card-body {
  padding: 18px;
}

.card-title {
  font-size: 17px;
  font-weight: 600;
  color: #f8fafc;
}

.card-author {
  font-size: 14px;
  margin: 8px 0;
  color: rgba(226, 232, 240, 0.8);
}

.card-meta {
  font-size: 13px;
  color: rgba(148, 163, 184, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.card-submitter {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.submitter-tag {
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 2px 10px;
  border-radius: 999px;
  background: var(--tag-bg, rgba(59, 130, 246, 0.18));
  color: var(--tag-fg, #bfdbfe);
  border: 1px solid var(--tag-border, rgba(59, 130, 246, 0.35));
}

.add-card {
  background: rgba(15, 23, 42, 0.65);
  border: 1px dashed rgba(255, 255, 255, 0.2);
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px 24px;
}

.add-icon {
  width: 72px;
  height: 72px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.2);
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.add-hint {
  font-size: 13px;
  color: rgba(226, 232, 240, 0.65);
}

.form-error {
  margin-top: 8px;
  color: #f87171;
  font-size: 13px;
}

:deep(.submit-modal .n-card) {
  width: min(520px, calc(100vw - 64px));
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.92), rgba(30, 27, 75, 0.86));
  box-shadow: 0 25px 70px rgba(2, 6, 23, 0.65);
  backdrop-filter: blur(18px);
  padding: 28px;
}

:deep(.submit-modal .n-card-header),
:deep(.submit-modal .n-card__content),
:deep(.submit-modal .n-card__action) {
  border-radius: inherit;
}

:deep(.submit-modal .n-card__content) {
  padding: 0;
}

:deep(.submit-modal .n-card-header) {
  padding-top: 0;
}

.modal-actions-spacer {
  flex: 1;
}

.glass-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: radial-gradient(circle at top, rgba(49, 46, 129, 0.35), rgba(2, 6, 23, 0.8));
  backdrop-filter: blur(10px);
  z-index: 60;
}

.glass-panel {
  width: min(520px, 100%);
  border-radius: 32px;
  padding: 32px;
  background: linear-gradient(160deg, rgba(15, 23, 42, 0.92), rgba(30, 27, 75, 0.88));
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 45px 120px rgba(2, 6, 23, 0.75);
  color: #e2e8f0;
  max-width: 520px;
}

.glass-panel__header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.glass-panel__header h3 {
  margin: 0;
  font-size: 24px;
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
}

.glass-panel__close:hover {
  opacity: 1;
  transform: rotate(4deg);
}

.glass-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.glass-field-row {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.glass-field--grow {
  flex: 1;
}

.glass-field label {
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--theme-muted);
}

.glass-input {
  width: 100%;
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(15, 23, 42, 0.65);
  color: #f8fafc;
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
  gap: 8px;
  border: none;
  border-radius: 20px;
  padding: 14px 20px;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  box-shadow: 0 12px 30px rgba(22, 163, 74, 0.35);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.glass-submit:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.glass-submit:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px rgba(21, 128, 61, 0.4);
}


.glass-panel__body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.glass-panel__footer {
  display: flex;
  align-items: center;
  gap: 12px;
}

.glass-panel__error {
  color: #fecaca;
}

.ghost-btn {
  color: rgba(248, 250, 252, 0.85);
}

.ghost-btn--danger {
  color: #fecaca;
}

.link-action {
  background: none;
  border: none;
  color: rgba(248, 250, 252, 0.85);
  font: inherit;
  padding: 0;
  cursor: pointer;
  transition: color 0.2s ease, opacity 0.2s ease;
}

.link-action--success {
  color: #bbf7d0;
}

.link-action:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 960px) {
  .page-hero {
    flex-direction: column;
    align-items: flex-start;
  }

  .tab-meta {
    flex-direction: column;
  }

  .gift-content {
    padding: 100px 16px 140px;
  }

  .tab-heading {
    padding: 0 40px 0 24px;
  }

  .tab-arrow {
    font-size: 36px;
  }
}

@keyframes shimmer {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@media (max-width: 640px) {
  .showcase-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}


/* Theme overrides */
.gift-page {
  color: var(--theme-text);
  --theme-card-shadow: 0 10px 24px rgba(2, 6, 23, 0.14);
}

.gift-bg video {
  filter: var(--theme-video-filter);
}

.bg-overlay {
  background: var(--theme-overlay);
}

.title-block .eyebrow,
.title-block .lead,
.tab-eyebrow,
.tab-meta p,
.tab-counter,
.card-author,
.card-meta,
.add-hint,
.empty-hint {
  color: var(--theme-muted);
}

.tab-section,
.showcase-card,
.add-card,
.glass-panel {
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  color: var(--theme-text);
}

.glass-panel__body,
.glass-panel__footer {
  background: transparent !important;
  border: none !important;
}

.showcase-card {
  box-shadow: var(--theme-card-shadow);
}

.card-type-chip {
  background: var(--theme-secondary-bg);
}

.glass-input {
  background: var(--theme-secondary-bg);
  border: 1px solid var(--theme-border);
  color: var(--theme-text);
}

.glass-input::placeholder {
  color: var(--theme-muted);
}

.ghost-btn,
.link-action {
  color: var(--theme-text);
}

:global(:root[data-theme='light']) .gift-page {
  --theme-text: #0f172a;
  --theme-muted: rgba(15, 23, 42, 0.72);
  --theme-card-bg: rgba(255, 255, 255, 0.96);
  --theme-border: rgba(255, 255, 255, 0.35);
  --theme-secondary-bg: rgba(226, 232, 240, 0.9);
}

:global([data-theme='light']) .glass-input::placeholder {
  color: rgba(15, 23, 42, 0.5) !important;
}

/* 删除与保存按钮也改为黑色 */
:global([data-theme='light']) .ghost-btn--danger,
:global([data-theme='light']) .link-action--success {
  color: #ff0000 !important;
}

:global(:root[data-theme='light']) .glass-panel__close {
  color: #0f172a;
}

:global(:root[data-theme='light']) .glass-panel__close:hover {
  color: #000000;
}

</style>
