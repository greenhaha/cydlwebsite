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

    <!-- 页面标题 -->
    <div class="page-header w-full max-w-[1280px] px-4 mb-8 z-20">
      <h1 class="page-title text-[32px] md:text-[40px] font-bold text-center text-white mb-4 text-shadow-lg">
        模型展示
      </h1>
      <p class="page-subtitle text-[16px] md:text-[18px] text-center text-white/90 text-shadow">
        探索丰富的角色模型，发现你的专属皮肤
      </p>
    </div>

    <!-- 搜索和筛选区域 -->
    <div class="search-section w-full max-w-[1280px] px-4 !mb-8 z-20">
      <div class="search-card p-6 rounded-2xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-2xl">
        <n-grid cols="5 xs:1 s:1 m:2 l:5" x-gap="16" y-gap="16" responsive="screen">
          <n-grid-item>
            <div class="search-input-wrapper">
              <n-input
                v-model:value="searchQuery"
                placeholder="搜索模型名称、积分、价格"
                size="large"
                class="search-input"
              />
            </div>
          </n-grid-item>
          <n-grid-item>
            <div class="select-wrapper">
              <n-select
                v-model:value="selectedTag"
                :options="tags"
                placeholder="选择标签"
                size="large"
                class="tag-select"
              />
            </div>
          </n-grid-item>
          <n-grid-item>
            <div class="radio-wrapper p-2 rounded-lg bg-gray-50/80 border border-gray-200/40">
              <n-radio-group v-model:value="selectedFaction" name="factionGroup" class="faction-radio">
                <n-radio value="1" class="radio-item">T</n-radio>
                <n-radio value="2" class="radio-item">CT</n-radio>
                <n-radio value="" class="radio-item">全部</n-radio>
              </n-radio-group>
            </div>
          </n-grid-item>
          <n-grid-item>
            <n-button
              @click="filterModels"
              type="info"
              size="large"
              class="search-btn w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-none shadow-lg hover:shadow-xl transition-all duration-300"
            >
              搜索
            </n-button>
          </n-grid-item>
          <n-grid-item>
            <n-button
              @click="togglePriceSort"
              type="primary"
              size="large"
              class="sort-btn w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 border-none shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {{ sortDirection === 'desc' ? '按价格排序 (低→高)' : '按价格排序 (高→低)' }}
            </n-button>
          </n-grid-item>
        </n-grid>
      </div>
    </div>

    <!-- 模型卡片区域 -->
    <div class="models-section w-full max-w-[1280px] px-4 z-20">
      <n-spin :show="loading" tip="加载模型数据中..." class="min-h-[400px]">
        <n-grid cols="4 xs:1 s:2 m:3 l:4" x-gap="20" y-gap="20" responsive="screen">
          <n-grid-item v-for="model in filteredModels" :key="model.modelId">
            <n-card class="model-card h-full backdrop-blur-lg bg-white/95 border border-gray-200/60 hover:bg-white/98 transition-all duration-300 hover:scale-105 hover:shadow-2xl" hoverable>
              <template #header>
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
                    <span class="price-value text-blue-600 font-bold text-lg">{{ model.price }}</span>
                  </div>

                  <div class="tags-info">
                    <div class="tags-wrapper flex flex-wrap gap-2">
                      <n-tag
                        :color="{ color: '#fff59d', textColor: '#f57f17', borderColor: '#f57f17' }"
                        round
                        :bordered="false"
                        size="small"
                        class="shadow-sm"
                      >
                        HLYM
                      </n-tag>
                      <n-tag
                        :type="tagsType(model.groupType)"
                        round
                        :bordered="false"
                        size="small"
                        class="shadow-sm"
                      >
                        {{ tagTransform(model.groupType) }}
                      </n-tag>
                    </div>
                  </div>
                </div>
              </div>
            </n-card>
          </n-grid-item>
        </n-grid>
      </n-spin>
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
  NSpin,
} from 'naive-ui'
import { computed, defineComponent, ref, onMounted } from 'vue'
import { groupType } from '../const/const'

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
    NSpin,
  },
  setup() {
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

    const searchQuery = ref('')
    const selectedTag = ref('')
    const selectedFaction = ref('')
    const dialogVisible = ref(false)
    const dialogImage = ref('')
    const sortDirection = ref<'desc' | 'asc'>('desc') // 排序方向：'desc'为降序（高到低），'asc'为升序（低到高）
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
        // 初始化时按价格从高到低排序
        filteredModels.value = [...data].sort((a, b) => b.price - a.price)
      } catch (error) {
        console.error('获取模型数据失败:', error)
        // 如果API调用失败，可以选择显示错误信息或使用默认数据
      } finally {
        loading.value = false
      }
    }

    // 页面挂载时调用API
    onMounted(() => {
      fetchModels()
    })

    const tags = computed(() => {
      const allTags = new Set<string>()
      allModels.value.forEach((model) => allTags.add(groupType[model.groupType as keyof typeof groupType]))
      return Array.from(allTags).map((tag) => ({ label: tag, value: tag, type: 'default' }))
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

      // 根据当前排序方向进行排序
      if (sortDirection.value === 'desc') {
        filteredModels.value = filtered.sort((a: ModelData, b: ModelData) => b.price - a.price)
      } else {
        filteredModels.value = filtered.sort((a: ModelData, b: ModelData) => a.price - b.price)
      }
    }

    const showImage = (url: string) => {
      dialogImage.value = url;
      dialogVisible.value = true;
    };

    const sortModelsByPrice = (direction: 'asc' | 'desc') => {
      if (direction === 'desc') {
        filteredModels.value = [...filteredModels.value].sort((a: ModelData, b: ModelData) => b.price - a.price);
      } else {
        filteredModels.value = [...filteredModels.value].sort((a: ModelData, b: ModelData) => a.price - b.price);
      }
    };

    const togglePriceSort = () => {
      sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc';
      sortModelsByPrice(sortDirection.value);
    };

    return {
      searchQuery,
      selectedTag,
      selectedFaction,
      tags,
      filteredModels,
      filterModels,
      dialogVisible,
      dialogImage,
      showImage,
      tagsType,
      tagTransform,
      sortDirection,
      togglePriceSort,
      loading,
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
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0.4), #f5f5f5);
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
  transition: all 0.3s ease;
}

.search-card:hover {
  transform: translateY(-2px);
  filter: brightness(1.02);
}

.radio-wrapper {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.faction-radio {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
}

.radio-item {
  font-size: 14px;
  font-weight: 500;
}

/* 模型卡片样式 */
.model-card {
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
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
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
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
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tags-wrapper {
  padding: 8px 0;
}

/* 按钮样式 */
.search-btn,
.sort-btn {
  font-weight: 600;
  letter-spacing: 0.025em;
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
<style>
.pointer-events-none {
  pointer-events: none;
}
</style>
