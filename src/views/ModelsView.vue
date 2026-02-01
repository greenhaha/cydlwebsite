<template>
  <div class="models-page">
    <div class="page-bg">
      <video class="page-bg-video" src="https://hlympic.oss-cn-beijing.aliyuncs.com/frontend/assets/video/bg/YokaiSecret.mp4" autoplay muted loop playsinline></video>
      <div class="page-overlay"></div>
    </div>

    <div class="models-content">
      <section class="models-hero">
        <div class="hero-copy">
          <p class="eyebrow">MODEL GALLERY</p>
          <h1>模型图鉴</h1>
          <p class="lead">探索丰富的角色模型 发现你喜欢的皮肤</p>
          <div class="hero-tags">
            <span class="tag">皮肤索引</span>
            <span class="tag muted">检索与筛选</span>
          </div>
        </div>
      </section>

      <section class="search-section">
        <div class="search-card">
          <div v-if="loading" class="search-skeleton">
            <div class="skeleton-grid">
              <div class="skeleton-block">
                <div class="skeleton-label"></div>
                <div class="skeleton-input"></div>
              </div>
              <div class="skeleton-block">
                <div class="skeleton-label"></div>
                <div class="skeleton-row">
                  <div class="skeleton-input"></div>
                  <div class="skeleton-input"></div>
                </div>
              </div>
              <div class="skeleton-block">
                <div class="skeleton-label"></div>
                <div class="skeleton-row">
                  <div class="skeleton-pill"></div>
                  <div class="skeleton-pill"></div>
                  <div class="skeleton-pill"></div>
                  <div class="skeleton-refresh"></div>
                </div>
              </div>
            </div>
            <div class="skeleton-toolbar">
              <div class="skeleton-chip"></div>
              <div class="skeleton-chip"></div>
              <div class="skeleton-chip"></div>
              <div class="skeleton-btn"></div>
              <div class="skeleton-btn"></div>
            </div>
          </div>
          <template v-else>
            <n-grid cols="3 xs:1 s:1 m:3 l:3" x-gap="16" y-gap="16" responsive="screen">
              <n-grid-item>
                <div class="search-field">
                  <p class="field-label">模型搜索</p>
                  <n-input
                    v-model:value="searchQuery"
                    placeholder="搜索模型名称 积分 价格"
                    size="large"
                  />
                </div>
              </n-grid-item>
              <n-grid-item>
                <div class="search-field">
                  <p class="field-label">分类与排序</p>
                  <div class="search-row">
                    <n-select
                      v-model:value="selectedTag"
                      :options="tags"
                      clearable
                      placeholder="选择标签"
                      size="large"
                      class="compact-select"
                    />
                    <n-select
                      v-model:value="selectedSortOption"
                      :options="sortOptions"
                      @update:value="handleSortSelect"
                      placeholder="选择排序方式"
                      size="large"
                      class="compact-select"
                    />
                  </div>
                </div>
              </n-grid-item>
              <n-grid-item>
                <div class="search-field">
                  <p class="field-label">阵营筛选</p>
                  <div class="faction-controls">
                    <n-radio-group v-model:value="selectedFaction" name="factionGroup" class="faction-radio segmented-faction-radio">
                      <n-radio value="" class="radio-item">全部</n-radio>
                      <n-radio value="2" class="radio-item">CT</n-radio>
                      <n-radio value="1" class="radio-item">T</n-radio>
                    </n-radio-group>
                    <button
                      :class="['models-refresh-btn', { loading }]"
                      :disabled="loading"
                      @click="refreshModelData"
                      aria-label="刷新模型数据"
                      title="刷新模型数据"
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
                <n-button size="large" class="action-btn btn-gray" @click="resetFilters">重置</n-button>
                <n-button size="large" class="action-btn btn-green" @click="filterModels">搜索</n-button>
              </div>
            </div>
          </template>
        </div>
      </section>

      <transition name="floating-fade">
        <div v-if="showFloatingFilters" class="floating-filter">
          <button
            v-if="floatingCollapsed"
            class="floating-collapse-btn"
            @click="restoreFloatingPanel"
            aria-label="展开筛选面板"
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
                  <span v-if="activeFilters.length === 0" class="chip chip-muted chip-compact">未设置筛选</span>
                  <span v-for="chip in activeFilters.slice(0, 3)" :key="chip + '-floating'" class="chip chip-compact">
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
                    <n-input v-model:value="searchQuery" placeholder="模型搜索" size="large" />
                  </div>
                  <div class="floating-field">
                    <p class="floating-label">分类</p>
                    <n-select v-model:value="selectedTag" :options="tags" clearable placeholder="选择标签" size="large" />
                  </div>
                  <div class="floating-field">
                    <p class="floating-label">排序</p>
                    <n-select v-model:value="selectedSortOption" :options="sortOptions" @update:value="handleSortSelect" placeholder="选择排序方式" size="large" />
                  </div>
                  <div class="floating-field">
                    <p class="floating-label">阵营</p>
                    <div class="radio-wrapper floating-radio-wrapper">
                      <n-radio-group v-model:value="selectedFaction" name="floatingFaction" class="faction-radio segmented-faction-radio floating-faction-radio">
                        <n-radio value="" class="radio-item">全部</n-radio>
                        <n-radio value="2" class="radio-item">CT</n-radio>
                        <n-radio value="1" class="radio-item">T</n-radio>
                      </n-radio-group>
                    </div>
                  </div>
                </div>
                <div class="floating-actions">
                  <n-button size="medium" class="action-btn btn-gray" @click="resetFilters">重置</n-button>
                  <n-button size="medium" class="action-btn btn-green" @click="filterModels">搜索</n-button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </transition>

      <section class="models-section">
        <div v-if="loading" class="model-skeleton-grid">
          <div class="model-skeleton-card" v-for="s in 8" :key="s">
            <div class="skeleton-thumb"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line small"></div>
          </div>
        </div>
        <n-grid v-else cols="4 xs:1 s:2 m:3 l:4" x-gap="20" y-gap="20" responsive="screen">
          <n-grid-item v-for="model in filteredModels" :key="model.modelId">
            <n-card class="model-card" :style="getCardStyle(model)" hoverable>
              <template #header>
                <div class="model-header">
                  <n-ellipsis class="model-title">{{ model.modelName }}</n-ellipsis>
                  <n-tag :type="model.faction === '1' ? 'error' : 'info'" size="small" round>
                    {{ model.faction === '1' ? 'T' : 'CT' }}
                  </n-tag>
                </div>
              </template>

              <div class="model-content">
                <div class="model-image-wrapper">
                  <n-image
                    :src="model.previewUrl"
                    :alt="model.modelName"
                    width="100%"
                    height="200px"
                    object-fit="cover"
                    @click="showImage(model.previewUrl)"
                  />
                </div>

                <div class="model-info">
                  <div class="price-info">
                    <span class="price-label">积分价格</span>
                    <span class="price-value">{{ model.price === 0 ? '免费' : model.price }}</span>
                  </div>

                  <div class="tags-wrapper">
                    <n-tag
                      v-for="badge in buildModelBadges(model)"
                      :key="badge.key"
                      :type="badge.type"
                      :color="badge.color"
                      round
                      :bordered="false"
                      size="small"
                    >
                      {{ badge.label }}
                    </n-tag>
                  </div>
                </div>
              </div>
            </n-card>
          </n-grid-item>
        </n-grid>
      </section>
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
      { label: '价格 高到低', value: 'price-desc' },
      { label: '价格 低到高', value: 'price-asc' },
      { label: '稀有度 高到低', value: 'quality-desc' },
      { label: '稀有度 低到高', value: 'quality-asc' },
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

.models-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 24px 140px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.models-hero {
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

.models-hero h1 {
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
  margin-top: 14px;
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

.search-card {
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 24px;
  padding: 22px 24px;
  box-shadow: var(--theme-card-shadow);
  backdrop-filter: blur(14px);
}

.search-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--theme-muted);
}

.search-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.compact-select {
  flex: 1 1 0;
  min-width: 0;
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
  border: 1px solid var(--theme-border);
  background: var(--theme-secondary-bg);
  color: var(--theme-text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.models-refresh-btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.models-refresh-btn.loading svg {
  animation: spinBtn 0.9s linear infinite;
}

.models-refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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
  background: var(--theme-chip-bg);
  color: var(--theme-text);
  font-size: 12px;
  font-weight: 600;
}

.chip-muted {
  background: var(--theme-secondary-bg);
  color: var(--theme-muted);
}

.filter-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.action-btn {
  border-radius: 12px !important;
  font-weight: 600;
  padding: 0 22px !important;
}

.btn-green {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.9), rgba(124, 58, 237, 0.9)) !important;
  color: #fff !important;
}

.btn-gray {
  background: var(--theme-secondary-bg) !important;
  color: var(--theme-text) !important;
  border: 1px solid var(--theme-secondary-border) !important;
}

.segmented-faction-radio {
  display: flex;
  gap: 6px;
  width: 100%;
  padding: 4px;
  border-radius: 16px;
  background: var(--theme-secondary-bg);
  box-shadow: inset 0 0 0 1px var(--theme-border);
}

.segmented-faction-radio :deep(.n-radio) {
  flex: 1 1 0;
  padding: 8px 0;
  border-radius: 12px;
}

.segmented-faction-radio :deep(.n-radio__dot),
.segmented-faction-radio :deep(.n-radio__input) {
  display: none !important;
}

.segmented-faction-radio :deep(.n-radio__label) {
  font-size: 13px;
  font-weight: 600;
  color: var(--theme-text);
  margin-left: 0 !important;
  width: 100%;
  text-align: center;
  display: block;
}

.segmented-faction-radio :deep(.n-radio.n-radio--checked) {
  background: linear-gradient(120deg, #0ea5e9, #14b8a6);
  box-shadow: 0 8px 18px rgba(14, 165, 233, 0.3);
}

.segmented-faction-radio :deep(.n-radio.n-radio--checked .n-radio__label) {
  color: #fff;
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
  z-index: 30;
}

.floating-inner {
  width: min(960px, 100%);
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 18px;
  box-shadow: var(--theme-card-shadow);
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
  background: var(--theme-card-bg);
  color: var(--theme-text);
  border: 1px solid var(--theme-border);
  border-radius: 999px;
  padding: 8px 16px;
  box-shadow: var(--theme-card-shadow);
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
}

.floating-title {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--theme-text);
  margin-bottom: 4px;
}

.floating-chip-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip-compact {
  font-size: 11px;
  padding: 4px 10px;
}

.floating-toggle {
  border: none;
  background: #0ea5e9;
  color: #fff;
  padding: 6px 14px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
}

.floating-content {
  margin-top: 16px;
  border-top: 1px solid var(--theme-border);
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
  color: var(--theme-muted);
  letter-spacing: 0.08em;
}

.floating-actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.models-section {
  margin-top: 6px;
}

.model-card {
  border-radius: 18px;
  background: var(--theme-card-bg) !important;
  border: 1px solid var(--theme-border) !important;
  box-shadow: var(--theme-card-shadow);
  overflow: hidden;
}

.model-card::before {
  content: '';
  display: block;
  height: 6px;
  background: var(--quality-strip-color, rgba(148, 163, 184, 0.4));
}

.model-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.model-title {
  font-weight: 600;
  color: var(--theme-text) !important;
}

.model-card :deep(.n-card-header) {
  color: var(--theme-text);
}

.model-card :deep(.n-ellipsis) {
  color: var(--theme-text) !important;
}

.model-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.model-image-wrapper {
  border-radius: 12px;
  overflow: hidden;
}

.model-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.price-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 12px;
  background: linear-gradient(90deg, var(--theme-secondary-bg) 0%, var(--theme-secondary-bg) 64%, rgba(163, 230, 53, 0.18) 100%);
  border: 1px solid var(--theme-border);
}

.price-label {
  font-size: 13px;
  color: var(--theme-muted);
}

.price-value {
  font-size: 16px;
  font-weight: 700;
  color: #a3e635;
}

.tags-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.search-skeleton {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.skeleton-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-label,
.skeleton-input,
.skeleton-pill,
.skeleton-refresh,
.skeleton-chip,
.skeleton-btn,
.skeleton-thumb,
.skeleton-line {
  border-radius: 12px;
  background: linear-gradient(120deg, rgba(148, 163, 184, 0.2), rgba(148, 163, 184, 0.4), rgba(148, 163, 184, 0.2));
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.6s ease-in-out infinite;
}

.skeleton-label {
  height: 12px;
  width: 120px;
}

.skeleton-input {
  height: 48px;
}

.skeleton-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.skeleton-pill {
  height: 40px;
  flex: 1 1 0;
}

.skeleton-refresh {
  width: 40px;
  height: 40px;
}

.skeleton-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skeleton-chip {
  width: 100px;
  height: 32px;
  border-radius: 999px;
}

.skeleton-btn {
  width: 120px;
  height: 42px;
}

.model-skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.model-skeleton-card {
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-thumb {
  width: 100%;
  height: 180px;
}

.skeleton-line {
  height: 18px;
}

.skeleton-line.small {
  width: 50%;
}

@keyframes skeleton-shimmer {
  0% { background-position: 0% 50%; }
  100% { background-position: -200% 50%; }
}

@keyframes spinBtn {
  to { transform: rotate(360deg); }
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

.search-section :deep(.n-input),
.search-section :deep(.n-base-selection),
.floating-field :deep(.n-input),
.floating-field :deep(.n-base-selection) {
  background: var(--theme-secondary-bg) !important;
  border: 1px solid var(--theme-border) !important;
  color: var(--theme-text) !important;
  border-radius: 12px !important;
}

.search-section :deep(.n-input__input),
.floating-field :deep(.n-input__input),
.search-section :deep(.n-base-selection-label),
.floating-field :deep(.n-base-selection-label) {
  color: var(--theme-text) !important;
}

.search-section :deep(.n-base-selection-placeholder),
.floating-field :deep(.n-base-selection-placeholder) {
  color: var(--theme-muted) !important;
}

:global(.n-base-select-menu) {
  --n-color: var(--theme-card-bg) !important;
  --n-option-color-pending: var(--theme-secondary-bg) !important;
  --n-option-color-active: var(--theme-secondary-bg) !important;
  --n-option-color-selected: var(--theme-secondary-bg) !important;
  --n-option-text-color: var(--theme-text) !important;
  --n-option-text-color-active: var(--theme-text) !important;
  --n-option-text-color-selected: var(--theme-text) !important;
  --n-option-check-color: #22c55e !important;
  background: var(--theme-card-bg) !important;
  border: 1px solid var(--theme-border) !important;
  color: var(--theme-text) !important;
  box-shadow: var(--theme-card-shadow);
}

:global(.n-base-select-option) {
  color: var(--theme-text) !important;
}

:global(.n-base-select-option--pending),
:global(.n-base-select-option--selected) {
  background: var(--theme-secondary-bg) !important;
  background-color: var(--theme-secondary-bg) !important;
  color: var(--theme-text) !important;
}


:global(.n-base-select-option__check) {
  color: #22c55e !important;
}

:global(.n-base-selection) {
  --n-color: var(--theme-secondary-bg) !important;
  --n-border: var(--theme-border) !important;
  --n-border-active: var(--theme-border) !important;
  --n-border-hover: var(--theme-border) !important;
  --n-text-color: var(--theme-text) !important;
  --n-placeholder-color: var(--theme-muted) !important;
  background: var(--theme-secondary-bg) !important;
  background-color: var(--theme-secondary-bg) !important;
  border: 1px solid var(--theme-border) !important;
  color: var(--theme-text) !important;
  border-radius: 12px !important;
}

:global(.n-base-selection__label),
:global(.n-base-selection__placeholder),
:global(.n-base-selection__input) {
  color: var(--theme-text) !important;
}

:global(.n-base-selection__border),
:global(.n-base-selection__state-border) {
  border-color: var(--theme-border) !important;
}

:global(.n-base-select-option__content) {
  color: var(--theme-text) !important;
}

:global(.n-base-select-option--selected) {
  background: var(--theme-secondary-bg) !important;
  color: var(--theme-text) !important;
}

:global(.n-base-select-option--selected .n-base-select-option__content) {
  color: var(--theme-text) !important;
}

:global(.n-base-select-option--pending) {
  background: var(--theme-secondary-bg) !important;
  background-color: var(--theme-secondary-bg) !important;
}


@media (max-width: 960px) {
  .models-hero {
    flex-direction: column;
  }

  .search-row {
    flex-direction: column;
  }

  .faction-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .models-refresh-btn {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .models-content {
    padding: 100px 18px 120px;
  }

  .models-hero h1 {
    font-size: 34px;
  }
}
</style>



