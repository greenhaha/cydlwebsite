<template>
  <div class="models-page flex flex-col items-center justify-center w-full h-full pt-[60px] !pb-16">
    <!-- 背景视频 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="pointer-events-none absolute inset-0">
        <video
          src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/video/bg/YokaiSecret.mp4"
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

    <!-- 页面标题（统一风格，无顶部图标） -->
  <div class="page-header w-full max-w-[1280px] px-4 mb-8 z-20 flex flex-col items-center text-center pt-12">
      <h1 class="page-title text-[36px] md:text-[42px] font-black mb-4 leading-tight tracking-tight drop-shadow-lg">
        <span class="block bg-gradient-to-r from-blue-800 via-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-md" style="background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          模型图鉴
        </span>
      </h1>
      <div class="subtitle-container !mb-6">
        <p class="page-subtitle text-[16px] md:text-[18px] text-white/90 leading-relaxed font-medium drop-shadow-md subtitle-stroke">
          探索丰富的角色模型，发现你的专属皮肤
        </p>
      </div>
      <div class="flex justify-center space-x-2 !mb-10">
        <div class="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
        <div class="w-6 h-0.5 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"></div>
        <div class="w-8 h-0.5 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full"></div>
      </div>
    </div>

    <!-- 搜索和筛选区域 -->
    <div class="search-section w-full max-w-[1280px] px-4 !mb-8 z-20">
        <div class="search-card">
          <div v-if="loading" class="search-skeleton">
            <div class="skeleton-grid">
              <div class="skeleton-field-block">
                <div class="skeleton-label skeleton-label-short"></div>
                <div class="skeleton-input skeleton-input-wide"></div>
              </div>
              <div class="skeleton-field-block">
                <div class="skeleton-label skeleton-label-short"></div>
                <div class="skeleton-combined">
                  <div class="skeleton-input skeleton-input-compact"></div>
                  <div class="skeleton-input skeleton-input-compact"></div>
                </div>
              </div>
              <div class="skeleton-field-block">
                <div class="skeleton-label skeleton-label-short"></div>
                <div class="skeleton-faction">
                  <div class="skeleton-pill" v-for="pill in 3" :key="'pill-'+pill"></div>
                  <div class="skeleton-refresh"></div>
                </div>
              </div>
            </div>
            <div class="skeleton-toolbar">
              <div class="skeleton-chip-row">
                <div class="skeleton-chip" v-for="chip in 4" :key="'chip-'+chip"></div>
              </div>
              <div class="skeleton-action-row">
                <div class="skeleton-btn skeleton-btn-light"></div>
                <div class="skeleton-btn skeleton-btn-strong"></div>
              </div>
            </div>
          </div>
          <template v-else>
            <n-grid cols="3 xs:1 s:1 m:3 l:3" x-gap="16" y-gap="16" responsive="screen">
              <n-grid-item>
                <div class="search-field">
                  <p class="field-label">模型搜索</p>
                  <div class="search-input-wrapper">
                    <n-input
                      v-model:value="searchQuery"
                      placeholder="搜索模型名称、积分、价格"
                      size="large"
                      class="search-input"
                    />
                  </div>
              </div>
            </n-grid-item>
            <n-grid-item>
              <div class="search-field combined-field">
                <p class="field-label">分类与排序</p>
                <div class="combined-controls">
                  <div class="search-input-wrapper select-wrapper compact-select">
                    <n-select
                      v-model:value="selectedTag"
                      :options="tags"
                      clearable
                      placeholder="选择标签"
                      size="large"
                      class="tag-select"
                    />
                  </div>
                  <div class="search-input-wrapper select-wrapper compact-select sort-select">
                    <n-select
                      v-model:value="selectedSortOption"
                      :options="sortOptions"
                      @update:value="handleSortSelect"
                      placeholder="选择排序方式"
                      size="large"
                    />
                  </div>
                </div>
              </div>
            </n-grid-item>
            <n-grid-item>
              <div class="search-field aligned-field">
                <p class="field-label">阵营筛选</p>
                <div class="faction-controls">
                  <div class="radio-wrapper aligned-radio">
                    <n-radio-group v-model:value="selectedFaction" name="factionGroup" class="faction-radio segmented-faction-radio">
                      <n-radio value="" class="radio-item">全部</n-radio>
                      <n-radio value="2" class="radio-item">CT</n-radio>
                      <n-radio value="1" class="radio-item">T</n-radio>
                    </n-radio-group>
                  </div>
                  <button
                    :class="['models-refresh-btn', { loading }]"
                    :disabled="loading"
                    @click="refreshModelData"
                    aria-label="刷新模型列表"
                    title="刷新模型列表"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="23 4 23 10 17 10" />
                      <polyline points="1 20 1 14 7 14" />
                      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                    </svg>
                  </button>
                </div>
              </div>
            </n-grid-item>
            </n-grid>

            <div class="filter-toolbar">
              <div class="filter-chips">
                <span v-if="activeFilters.length === 0" class="chip chip-muted">未选择筛选条件</span>
                <span v-for="chip in activeFilters" :key="chip" class="chip">
                  {{ chip }}
                </span>
              </div>
              <div class="filter-actions">
                <n-button
                  size="large"
                  class="action-btn btn-gray"
                  @click="resetFilters"
                >
                  重置
                </n-button>
                <n-button
                  @click="filterModels"
                  type="info"
                  size="large"
                  class="search-btn action-btn btn-green"
                >
                  搜索
                </n-button>
              </div>
            </div>
          </template>
      </div>
    </div>

    <transition name="floating-fade">
      <div v-if="showFloatingFilters" class="floating-filter z-30">
        <button
          v-if="floatingCollapsed"
          class="floating-collapse-btn"
          @click="restoreFloatingPanel"
          aria-label="展开快速索引"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 15 12 9 18 15" />
          </svg>
          <span>快速索引</span>
        </button>
        <div
          v-else
          class="floating-inner"
          @mouseenter="pauseFloatingCollapse"
          @mouseleave="resumeFloatingCollapse"
          @focusin="pauseFloatingCollapse"
          @focusout="resumeFloatingCollapse"
        >
          <div class="floating-summary">
            <div>
              <p class="floating-title">快速索引</p>
              <div class="floating-chip-list">
                <span
                  v-if="activeFilters.length === 0"
                  class="chip chip-muted chip-compact"
                >
                  未设置筛选
                </span>
                <span
                  v-for="chip in activeFilters.slice(0, 3)"
                  :key="chip + '-floating'"
                  class="chip chip-compact"
                >
                  {{ chip }}
                </span>
              </div>
            </div>
            <button class="floating-toggle" @click="toggleFloatingPanel">
              {{ floatingExpanded ? '收起筛选' : '展开筛选' }}
            </button>
          </div>
          <transition name="slide-down">
            <div v-show="floatingExpanded" class="floating-content">
              <div class="floating-fields">
                <div class="floating-field">
                  <p class="floating-label">模型搜索</p>
                  <n-input
                    v-model:value="searchQuery"
                    placeholder="搜索模型"
                    size="large"
                  />
                </div>
                <div class="floating-field">
                  <p class="floating-label">分类</p>
                  <n-select
                    v-model:value="selectedTag"
                    :options="tags"
                    clearable
                    placeholder="选择标签"
                    size="large"
                  />
                </div>
                <div class="floating-field">
                  <p class="floating-label">排序</p>
                  <n-select
                    v-model:value="selectedSortOption"
                    :options="sortOptions"
                    @update:value="handleSortSelect"
                    placeholder="选择排序"
                    size="large"
                  />
                </div>
                <div class="floating-field">
                  <p class="floating-label">阵营</p>
                  <div class="radio-wrapper floating-radio-wrapper">
                    <n-radio-group
                      v-model:value="selectedFaction"
                      name="floatingFaction"
                      class="faction-radio segmented-faction-radio floating-faction-radio"
                    >
                      <n-radio value="" class="radio-item">全部</n-radio>
                      <n-radio value="2" class="radio-item">CT</n-radio>
                      <n-radio value="1" class="radio-item">T</n-radio>
                    </n-radio-group>
                  </div>
                </div>
              </div>
              <div class="floating-actions">
                <n-button size="medium" class="action-btn btn-gray" @click="resetFilters">
                  重置
                </n-button>
                <n-button size="medium" class="search-btn action-btn btn-green" @click="filterModels">
                  搜索
                </n-button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>

    <!-- 模型卡片区域 -->
    <div class="models-section w-full max-w-[1280px] px-4 z-20">
      <div v-if="loading" class="model-skeleton-grid">
        <div class="model-skeleton-card" v-for="s in 8" :key="s">
          <div class="skeleton-thumb"></div>
          <div class="skeleton-line w-80"></div>
          <div class="skeleton-line w-50"></div>
        </div>
      </div>
      <n-grid v-else cols="4 xs:1 s:2 m:3 l:4" x-gap="20" y-gap="20" responsive="screen">
        <n-grid-item v-for="model in filteredModels" :key="model.modelId">
          <n-card
            class="model-card h-full backdrop-blur-lg bg-white/95 border border-gray-200/60 hover:bg-white/98 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            :style="getCardStyle(model)"
            hoverable
          >
            <template #header>
              <div class="card-header">
                <div class="model-header min-h-[48px] flex items-center justify-between">
                  <n-ellipsis class="model-title text-gray-800 font-semibold text-lg">
                    {{ model.modelName }}
                  </n-ellipsis>
                  <div class="faction-badge">
                    <n-tag
                      :type="model.faction === '1' ? 'error' : 'info'"
                      size="small"
                      round
                      class="shadow-sm"
                    >
                      {{ model.faction === '1' ? 'T' : 'CT' }}
                    </n-tag>
                  </div>
                </div>
              </div>
            </template>

            <div class="model-content flex flex-col h-full">
              <div class="model-image-wrapper !mb-4 rounded-lg overflow-hidden shadow-md">
                <n-image
                  :src="model.previewUrl"
                  :alt="model.modelName"
                  width="100%"
                  height="200px"
                  object-fit="fill"
                  @click="showImage(model.previewUrl)"
                  class="hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              </div>

              <div class="model-info flex-1 space-y-3">
                <div class="price-info flex items-center justify-between">
                  <span class="price-label text-gray-600 text-sm">积分价格</span>
                  <span class="price-value font-bold text-lg">
                    {{ model.price === 0 ? 'Free' : model.price }}
                  </span>
                </div>

                <div class="tags-info">
                  <div class="tags-wrapper flex flex-wrap gap-2">
                    <n-tag
                      v-for="badge in buildModelBadges(model)"
                      :key="badge.key"
                      :type="badge.type"
                      :color="badge.color"
                      round
                      :bordered="false"
                      size="small"
                      class="shadow-sm"
                    >
                      {{ badge.label }}
                    </n-tag>
                  </div>
                </div>
              </div>
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>

<script lang="ts">
import {
  NButton,
  NCard,
  NEllipsis,
  NGrid,
  NGridItem,
  NImage,
  NInput,
  NRadio,
  NRadioGroup,
  NSelect,
  NTag,
  useMessage,
} from 'naive-ui'
import { computed, defineComponent, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { groupType, modelCategoryMeta, modelQualityMeta, modelTypeMeta } from '../const/const'

export default defineComponent({
  components: {
    NCard,
    NInput,
    NSelect,
    NButton,
    NGrid,
    NGridItem,
    NImage,
    NEllipsis,
    NTag,
    NRadio,
    NRadioGroup,
  },
  setup() {
    const message = useMessage()
    // 定义模型数据类型
    interface ModelData {
      modelId: number
      modelType: number
      categoryId: number
      modelName: string
      modelNameEn: string
      price: number
      isPermanent: boolean
      groupType: number
      faction: string
      exclusiveTo: string | null
      isArchived: boolean
      hasDiscount: boolean
      quality: number
      modelPath: string
      previewUrl: string
      previewOnline: boolean
      previewType: number
    }

    type BadgeDefinition = {
      key: string
      label: string
      type?: 'default' | 'success' | 'info' | 'warning' | 'error'
      color?: {
        color: string
        textColor: string
        borderColor: string
      }
    }

    type SortMode = 'price' | 'quality'

    const fallbackCategoryColor = {
      color: '#e0e7ff',
      textColor: '#3730a3',
      borderColor: '#a5b4fc',
    }

    const qualityStripPalette: Record<number, string> = {
      7: '#ef4444', // red
      6: '#f97316', // orange
      5: '#d946ef', // magenta
      4: '#c084fc', // purple
      3: '#3b82f6', // blue
      2: '#38bdf8', // light blue
      1: '#86efac', // olive green fallback
    }

    const searchQuery = ref('')
    const selectedTag = ref('')
    const selectedFaction = ref('')
    const dialogVisible = ref(false)
    const dialogImage = ref('')
    const sortDirection = ref<'desc' | 'asc'>('desc') // 排序方向：'desc'为降序（高到低），'asc'为升序（低到高）
    const qualitySortDirection = ref<'desc' | 'asc'>('desc')
    const activeSort = ref<SortMode>('price')
    const selectedSortOption = ref('price-desc')
    const showFloatingFilters = ref(false)
    const floatingExpanded = ref(false)
    const floatingCollapsed = ref(false)
    let floatingCollapseTimer: number | null = null
    let floatingOutsideHandler: ((event: PointerEvent) => void) | null = null
    const floatingCollapseDelay = 2800
    const sortOptions = [
      { label: '价格（高→低）', value: 'price-desc' },
      { label: '价格（低→高）', value: 'price-asc' },
      { label: '稀有度（高→低）', value: 'quality-desc' },
      { label: '稀有度（低→高）', value: 'quality-asc' },
    ]
    const loading = ref(true) // 加载状态
    const allModels = ref<ModelData[]>([]) // 存储从API获取的所有模型数据
    const filteredModels = ref<ModelData[]>([]) // 存储筛选后的模型数据

    // API调用函数
    const fetchModels = async () => {
      try {
        loading.value = true
        const response = await fetch('/api/v1/models/search')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        allModels.value = data
        filteredModels.value = applySort(data)
      } catch (error) {
        console.error('获取模型数据失败:', error)
        // 如果API调用失败，可以选择显示错误信息或使用默认数据
      } finally {
        loading.value = false
      }
    }

    const handleScroll = () => {
      const shouldShow = window.scrollY > 260
      if (!shouldShow) {
        floatingExpanded.value = false
        floatingCollapsed.value = false
        clearFloatingCollapseTimer()
      }
      showFloatingFilters.value = shouldShow
    }

    const clearFloatingCollapseTimer = () => {
      if (floatingCollapseTimer !== null) {
        window.clearTimeout(floatingCollapseTimer)
        floatingCollapseTimer = null
      }
    }

    const scheduleFloatingCollapse = () => {
      if (!showFloatingFilters.value || floatingCollapsed.value || floatingExpanded.value) return
      clearFloatingCollapseTimer()
      floatingCollapseTimer = window.setTimeout(() => {
        floatingCollapsed.value = true
        floatingCollapseTimer = null
      }, floatingCollapseDelay)
    }

    const pauseFloatingCollapse = () => {
      clearFloatingCollapseTimer()
    }

    const resumeFloatingCollapse = () => {
      if (!floatingExpanded.value && showFloatingFilters.value && !floatingCollapsed.value) {
        scheduleFloatingCollapse()
      }
    }

    const restoreFloatingPanel = () => {
      floatingCollapsed.value = false
      floatingExpanded.value = false
      clearFloatingCollapseTimer()
      scheduleFloatingCollapse()
    }

    const handleFloatingOutside = (event: PointerEvent) => {
      const filterEl = document.querySelector('.floating-inner')
      const toggleBtn = document.querySelector('.floating-collapse-btn')
      if (!filterEl) return
      const target = event.target as Node
      if (filterEl.contains(target) || (toggleBtn && toggleBtn.contains(target))) return
      floatingExpanded.value = false
      floatingCollapsed.value = true
      scheduleFloatingCollapse()
    }

    // 页面挂载时调用API
    onMounted(() => {
      fetchModels()
      window.addEventListener('scroll', handleScroll, { passive: true })
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
      clearFloatingCollapseTimer()
      if (floatingOutsideHandler) {
        document.removeEventListener('pointerdown', floatingOutsideHandler)
        floatingOutsideHandler = null
      }
    })

    watch(showFloatingFilters, (visible) => {
      if (visible) {
        floatingExpanded.value = false
        floatingCollapsed.value = true
        clearFloatingCollapseTimer()
        floatingOutsideHandler = handleFloatingOutside
        document.addEventListener('pointerdown', floatingOutsideHandler)
      } else {
        floatingCollapsed.value = false
        floatingExpanded.value = false
        clearFloatingCollapseTimer()
        if (floatingOutsideHandler) {
          document.removeEventListener('pointerdown', floatingOutsideHandler)
          floatingOutsideHandler = null
        }
      }
    })

    watch(floatingExpanded, (expanded) => {
      if (expanded) {
        floatingCollapsed.value = false
        clearFloatingCollapseTimer()
      } else {
        if (showFloatingFilters.value) {
          floatingCollapsed.value = false
          scheduleFloatingCollapse()
        } else {
          clearFloatingCollapseTimer()
        }
      }
    })

    const tags = computed(() => {
      const allTags = new Set<string>()
      allModels.value.forEach((model) => allTags.add(groupType[model.groupType as keyof typeof groupType]))
      const resolved = Array.from(allTags).map((tag) => ({ label: tag, value: tag, type: 'default' }))
      return [{ label: '无', value: '', type: 'default' }, ...resolved]
    })
    const activeFilters = computed(() => {
      const chips: string[] = []
      if (searchQuery.value) chips.push(`关键词：${searchQuery.value}`)
      if (selectedTag.value) chips.push(`标签：${selectedTag.value}`)
      if (selectedFaction.value)
        chips.push(`阵营：${selectedFaction.value === '1' ? 'T' : 'CT'}`)
      chips.push(activeSort.value === 'price' ? `排序：价格（${sortDirection.value === 'desc' ? '高→低' : '低→高'}）` : `排序：稀有度（${qualitySortDirection.value === 'desc' ? '高→低' : '低→高'}）`)
      return chips
    })
    const tagsType = (tag: number) => {
      if (tag === 3) return 'info'
      if (tag === 5) return 'warning'
      if (tag === 2) return 'error'
      if (tag === 1) return 'success'
      if (tag === 4) return 'info'
      return 'default'
    }
    const tagTransform = (tag: number) => {
      return groupType[tag as keyof typeof groupType]
    }
    const buildModelBadges = (model: ModelData): BadgeDefinition[] => {
      const badges: BadgeDefinition[] = []

      const typeMeta = modelTypeMeta[model.modelType as keyof typeof modelTypeMeta]
      if (typeMeta) {
        badges.push({
          key: `type-${model.modelId}`,
          label: typeMeta.label,
          color: typeMeta.color,
        })
      }

      const classificationMeta = modelCategoryMeta[model.groupType as keyof typeof modelCategoryMeta]
      badges.push({
        key: `category-${model.modelId}`,
        label: classificationMeta?.label ?? `分类 #${model.groupType ?? '-'}`,
        color: classificationMeta?.color ?? fallbackCategoryColor,
      })

      return badges
    }
    const getCardStyle = (model: ModelData) => {
      const qualityMeta = modelQualityMeta[model.quality as keyof typeof modelQualityMeta]
      const stripColor = qualityStripPalette[model.quality] ?? '#e2e8f0'
      if (qualityMeta) {
        return {
          border: `2px solid ${qualityMeta.color.borderColor}`,
          '--quality-strip-color': stripColor,
        }
      }
      return {
        '--quality-strip-color': stripColor,
      }
    }

    const applySort = (models: ModelData[]) => {
      const items = [...models]
      if (activeSort.value === 'quality') {
        const dir = qualitySortDirection.value === 'desc' ? -1 : 1
        return items.sort((a, b) => (a.quality - b.quality) * dir)
      }
      const dir = sortDirection.value === 'desc' ? -1 : 1
      return items.sort((a, b) => (a.price - b.price) * dir)
    }
    const filterModels = () => {
      const query = searchQuery.value.toLowerCase()
      console.log('searchQuery:', searchQuery.value)
      const filtered = allModels.value.filter((model) => {
        const matchesName = model.modelName.toLowerCase().includes(query)
        const matchesPoints = model.price.toString().includes(query)
        // 修复：model 没有 tags 属性，改为通过 groupType 匹配标签
        const matchesTag = selectedTag.value
          ? groupType[model.groupType as keyof typeof groupType] === selectedTag.value
          : true
        const matchesFaction =
          selectedFaction.value === '' || model.faction === selectedFaction.value
        return (matchesName || matchesPoints) && matchesTag && matchesFaction
      })

      filteredModels.value = applySort(filtered)
    }

    const showImage = (url: string) => {
      dialogImage.value = url;
      dialogVisible.value = true;
    };

    const sortModelsByPrice = () => {
      activeSort.value = 'price'
      filteredModels.value = applySort(filteredModels.value)
    }

    const sortModelsByQuality = () => {
      activeSort.value = 'quality'
      filteredModels.value = applySort(filteredModels.value)
    }

    const applySortSelection = (value: string) => {
      if (value.startsWith('price')) {
        sortDirection.value = value.endsWith('asc') ? 'asc' : 'desc'
        sortModelsByPrice()
        return
      }
      qualitySortDirection.value = value.endsWith('asc') ? 'asc' : 'desc'
      sortModelsByQuality()
    }

    const handleSortSelect = (value: string | null) => {
      const nextValue = value ?? 'price-desc'
      selectedSortOption.value = nextValue
      applySortSelection(nextValue)
    }

    const toggleFloatingPanel = () => {
      const next = !floatingExpanded.value
      floatingExpanded.value = next
      floatingCollapsed.value = false
      if (!next) {
        scheduleFloatingCollapse()
      }
    }

    const resetFilters = () => {
      searchQuery.value = ''
      selectedTag.value = ''
      selectedFaction.value = ''
      sortDirection.value = 'desc'
      qualitySortDirection.value = 'desc'
      activeSort.value = 'price'
      selectedSortOption.value = 'price-desc'
      filteredModels.value = [...allModels.value]
      filterModels()
    }

    const refreshModelData = async () => {
      if (loading.value) return
      const loadingMsg = message.loading('同步图鉴中...', { duration: 0 })
      try {
        await fetchModels()
      } finally {
        loadingMsg.destroy()
      }
    }

    return {
      searchQuery,
      selectedTag,
      selectedFaction,
      tags,
      activeFilters,
      filteredModels,
      filterModels,
      resetFilters,
      dialogVisible,
      dialogImage,
      showImage,
      tagsType,
      tagTransform,
      buildModelBadges,
      getCardStyle,
      sortDirection,
      qualitySortDirection,
      sortOptions,
      selectedSortOption,
      handleSortSelect,
      showFloatingFilters,
      floatingExpanded,
      floatingCollapsed,
      toggleFloatingPanel,
      restoreFloatingPanel,
      pauseFloatingCollapse,
      resumeFloatingCollapse,
      loading,
      refreshModelData,
    }
  },
})
</script>

<style scoped>
.models-page {
  min-height: 100vh;
  position: relative;
  z-index: 0;
}

.home-grass {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0.1), #f5f5f5);
}

/* 页面标题样式 */
.page-title {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.text-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* 搜索区域样式 */
.search-card {
  padding: 22px 24px;
  border-radius: 28px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.96));
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 20px 45px -20px rgba(15, 23, 42, 0.28);
  backdrop-filter: blur(16px);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.search-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 30px 60px -25px rgba(15, 23, 42, 0.35);
}

.search-skeleton {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}

.skeleton-field,
.skeleton-chip,
.skeleton-btn,
.skeleton-thumb,
.skeleton-line,
.skeleton-input,
.skeleton-label,
.skeleton-pill,
.skeleton-refresh {
  border-radius: 12px;
  background: linear-gradient(120deg, rgba(226, 232, 240, 0.7), rgba(241, 245, 249, 0.9), rgba(226, 232, 240, 0.7));
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.6s ease-in-out infinite;
}

.skeleton-field-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-field {
  height: 54px;
  flex: 1 1 200px;
}

.skeleton-label {
  height: 12px;
  width: 120px;
  border-radius: 999px;
}

.skeleton-label-short {
  width: 90px;
}

.skeleton-input {
  height: 52px;
  border-radius: 16px;
}

.skeleton-input-wide {
  width: 100%;
}

.skeleton-input-compact {
  flex: 1 1 0;
  min-width: 0;
}

.skeleton-combined {
  display: flex;
  gap: 12px;
  align-items: stretch;
}

.skeleton-faction {
  display: flex;
  align-items: center;
  gap: 8px;
}

.skeleton-pill {
  flex: 1 1 0;
  height: 46px;
  border-radius: 14px;
}

.skeleton-refresh {
  width: 46px;
  height: 46px;
  border-radius: 14px;
}

.skeleton-wide {
  flex-basis: 320px;
}

.skeleton-medium {
  flex-basis: 220px;
}

.skeleton-chip {
  height: 32px;
  width: 110px;
  border-radius: 999px;
}

.skeleton-btn {
  height: 48px;
  width: 140px;
  border-radius: 10px;
}

.skeleton-btn-light {
  width: 120px;
}

.skeleton-btn-strong {
  width: 140px;
}

.skeleton-toolbar {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.skeleton-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skeleton-action-row {
  display: flex;
  gap: 12px;
}

.model-skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  min-height: 420px;
}

.model-skeleton-card {
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(226, 232, 240, 0.8);
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.skeleton-thumb {
  height: 180px;
  width: 100%;
  border-radius: 12px;
}

.skeleton-line {
  height: 20px;
}

.skeleton-line.w-80 {
  width: 80%;
}

.skeleton-line.w-50 {
  width: 50%;
}

.model-skeleton-card .skeleton-line:last-child {
  height: 14px;
  border-radius: 8px;
}


.search-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.aligned-field {
  height: 100%;
}

.combined-field {
  height: 100%;
}

.combined-controls {
  display: flex;
  gap: 12px;
  align-items: stretch;
  width: 100%;
  flex-wrap: wrap;
}

.field-label {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #0f172a;
}

.search-input-wrapper,
.select-wrapper {
  border-radius: 10px;
  overflow: visible;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
  width: 100%;
}

.aligned-radio {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.faction-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.models-refresh-btn {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  background: #f1f5f9;
  color: #0f766e;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.08);
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  flex: 0 0 auto;
}

.models-refresh-btn:hover:not(:disabled) {
  background: #e2e8f0;
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.12);
}

.models-refresh-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.models-refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.models-refresh-btn.loading svg {
  animation: spinBtn 0.9s linear infinite;
}

.compact-select {
  flex: 1 1 0;
  min-width: 0;
}

.sort-select :deep(.n-select) {
  width: 100%;
}

.search-input-wrapper :deep(.n-input),
.select-wrapper :deep(.n-base-selection),
.floating-field :deep(.n-input),
.floating-field :deep(.n-base-selection) {
  border-radius: 12px !important;
  min-height: 48px;
  padding: 0 10px;
  font-size: 13px;
  display: flex;
  align-items: center;
}

.select-wrapper :deep(.n-select),
.floating-field :deep(.n-select) {
  border-radius: 12px !important;
}

.search-input-wrapper :deep(.n-input__input),
.floating-field :deep(.n-input__input) {
  font-size: 13px;
  line-height: 1.3;
}

.select-wrapper :deep(.n-base-selection-label),
.floating-field :deep(.n-base-selection-label) {
  font-size: 13px;
  display: flex;
  align-items: center;
}

.filter-toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 18px;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.chip {
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.12);
  color: #4338ca;
  font-size: 13px;
  font-weight: 600;
}

.chip-compact {
  font-size: 12px;
  padding: 4px 10px;
}

.chip-muted {
  background: rgba(148, 163, 184, 0.2);
  color: #475569;
}

.filter-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.action-btn {
  border: none !important;
  border-radius: 10px !important;
  font-weight: 600;
  padding: 0 24px !important;
  color: #0f172a !important;
  text-shadow: 0 1px 2px rgba(15, 23, 42, 0.2);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 26px rgba(15, 23, 42, 0.22);
}

.action-btn:active {
  transform: translateY(1px);
}

.action-btn :deep(.n-button__content) {
  color: inherit;
}

.floating-filter {
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 0 16px;
  pointer-events: none;
}

.floating-inner {
  width: min(960px, 100%);
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 18px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.2);
  padding: 14px 18px;
  pointer-events: auto;
  backdrop-filter: blur(12px);
}

.floating-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.floating-collapse-btn {
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(15, 23, 42, 0.9);
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 8px 16px;
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.35);
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.floating-collapse-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.4);
}

.floating-collapse-btn:active {
  transform: translateY(0);
}

.floating-title {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #0f172a;
  margin-bottom: 4px;
}

.floating-chip-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.floating-toggle {
  border: none;
  background: #0ea5e9;
  color: #fff;
  padding: 6px 14px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(14, 165, 233, 0.28);
}

.floating-content {
  margin-top: 16px;
  border-top: 1px solid rgba(226, 232, 240, 0.8);
  padding-top: 16px;
}

.floating-fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.floating-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.floating-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #475569;
}

.floating-radio-wrapper {
  height: auto;
  min-height: 44px;
  width: 100%;
  justify-content: stretch;
  align-items: stretch;
}

.floating-actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
  padding-right: 6px;
}

.floating-actions .action-btn {
  min-height: 40px;
  padding: 0 18px !important;
  border-radius: 12px !important;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.18);
}

.floating-actions .action-btn:hover {
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.2);
}

.btn-green {
  background: #10b981 !important;
  color: #ffffff !important;
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.35);
}

.btn-gray {
  background: #e2e8f0 !important;
  color: #0f172a !important;
}

.btn-indigo {
  background: #6366f1 !important;
  color: #ffffff !important;
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.35);
}

.btn-orange {
  background: #f97316 !important;
  color: #ffffff !important;
  box-shadow: 0 10px 25px rgba(249, 115, 22, 0.35);
}

.search-btn :deep(.n-button__border),
.sort-btn :deep(.n-button__border) {
  display: none;
}

.radio-wrapper {
  height: auto;
  min-height: 48px;
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
}

.faction-radio {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-start;
}

.radio-item {
  font-size: 14px;
  font-weight: 500;
}

.faction-radio :deep(.n-radio__dot) {
  display: none;
}

.faction-radio :deep(.n-radio__dot-wrapper) {
  display: none;
}

.segmented-faction-radio {
  display: flex;
  gap: 6px;
  width: 100%;
  padding: 4px;
  border-radius: 16px;
  background: rgba(148, 163, 184, 0.2);
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.32);
}

.segmented-faction-radio :deep(.n-radio) {
  flex: 1 1 0;
  min-width: 0;
  padding: 8px 0;
  border: none;
  border-radius: 12px;
  background: transparent;
  box-shadow: none;
  transition: background 0.2s ease, box-shadow 0.2s ease;
}

.segmented-faction-radio :deep(.n-radio__label) {
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
  letter-spacing: 0.03em;
  width: 100%;
  text-align: center;
  display: block;
  margin-left: 0 !important;
}

.segmented-faction-radio :deep(.n-radio:hover) {
  background: rgba(255, 255, 255, 0.5);
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.35);
}

.segmented-faction-radio :deep(.n-radio.n-radio--checked) {
  background: linear-gradient(120deg, #0ea5e9, #14b8a6);
  box-shadow: 0 8px 18px rgba(14, 165, 233, 0.3);
}

.segmented-faction-radio :deep(.n-radio.n-radio--checked .n-radio__label) {
  color: #ffffff;
}

.floating-faction-radio {
  background: rgba(148, 163, 184, 0.16);
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.28);
}

.floating-faction-radio :deep(.n-radio) {
  padding: 6px 0;
}

/* 模型卡片样式 */
.model-card {
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.model-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background: var(--quality-strip-color, #e2e8f0);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.4),
    0 6px 18px rgba(15, 23, 42, 0.18);
}

.model-card:hover {
  transform: translateY(-4px) scale(1.02);
}

.model-header {
  padding: 4px 0;
}

.model-title {
  flex: 1;
  color: #374151;
}

.faction-badge {
  flex-shrink: 0;
  margin-left: 8px;
}

.model-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.model-image-wrapper {
  transition: all 0.3s ease;
}

.model-image-wrapper:hover {
  transform: translateY(-2px);
}

.model-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.price-info {
  background: linear-gradient(135deg, #ffffff 0%, #ffffff 70%, #e8ffef 100%);
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
}

.price-label {
  font-weight: 500;
}

.price-value {
  font-size: 18px;
  font-weight: 700;
  color: #10b981;
}

.tags-wrapper {
  padding: 8px 0;
}

/* 按钮样式 */
.search-btn,
.sort-btn,
.rarity-btn {
  font-weight: 600;
  letter-spacing: 0.025em;
}

@keyframes spinBtn {
  to {
    transform: rotate(360deg);
  }
}


/* 响应式优化 */
@media (max-width: 768px) {
  .page-header {
    margin-bottom: 1.5rem;
    padding: 0 1rem;
  }

  .search-section {
    margin-bottom: 1.5rem;
    padding: 0 1rem;
  }

  .models-section {
    padding: 0 1rem;
  }

  .search-card {
    padding: 1rem;
  }

  .model-card {
    min-height: 380px;
  }

  .model-header {
    min-height: 40px;
  }

  .price-info {
    padding: 10px;
  }

  .radio-wrapper {
    height: 36px;
  }

  .faction-radio {
    gap: 8px;
  }

  .floating-filter {
    top: 60px;
  }

  .floating-inner {
    padding: 12px 14px;
  }

  .floating-summary {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .floating-toggle {
    width: 100%;
    text-align: center;
  }

  .floating-actions {
    width: 100%;
  }

  .aligned-radio {
    width: 100%;
    justify-content: flex-start;
  }

  .combined-controls {
    flex-direction: column;
    width: 100%;
  }

  .compact-select {
    width: 100%;
    flex: none;
  }

  .faction-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .models-refresh-btn {
    width: 100%;
    height: 44px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 24px !important;
  }

  .page-subtitle {
    font-size: 14px !important;
  }

  .model-card {
    min-height: 350px;
  }

  .search-card {
    padding: 0.75rem;
  }
}

/* 深色模式优化 */
@media (prefers-color-scheme: dark) {
  .search-card,
  .model-card {
    background: rgba(248, 250, 252, 0.98) !important;
    border: 1px solid rgba(226, 232, 240, 0.7) !important;
  }
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes skeleton-shimmer {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: -200% 50%;
  }
}

.floating-fade-enter-active,
.floating-fade-leave-active {
  transition: opacity 0.3s ease;
}

.floating-fade-enter-from,
.floating-fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-14px) scale(0.98);
}

.page-header,
.search-section,
.models-section {
  animation: fadeInUp 0.8s ease-out;
}

.search-section {
  animation-delay: 0.2s;
}

.models-section {
  animation-delay: 0.4s;
}
</style>
<style scoped>
.subtitle-stroke {
  text-shadow:
    0 1px 3px rgba(0, 0, 0, 0.4),
    0 2px 6px rgba(0, 0, 0, 0.3);
}
</style>
<style>
.pointer-events-none {
  pointer-events: none;
}
</style>
