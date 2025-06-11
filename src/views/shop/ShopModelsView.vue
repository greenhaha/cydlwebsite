<template>
    <div class="shop-models-page">
        <!-- 搜索和筛选区域 -->
        <div class="search-section !mb-8">
            <div class="search-card p-6 rounded-2xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-2xl">
                <n-grid cols="5 xs:1 s:1 m:2 l:5" x-gap="16" y-gap="16" responsive="screen">
                    <n-grid-item>
                        <div class="search-input-wrapper search-focus">
                            <n-input v-model:value="searchQuery" placeholder="搜索模型名称、价格" size="large"
                                class="search-input" @input="handleSearch">
                                <template #prefix>
                                    <n-icon>
                                        <SearchOutline />
                                    </n-icon>
                                </template>
                            </n-input>
                        </div>
                    </n-grid-item>
                    <n-grid-item>
                        <div class="select-wrapper">
                            <n-select v-model:value="selectedTag" :options="tags" placeholder="选择标签" size="large"
                                clearable @update:value="handleFilter" />
                        </div>
                    </n-grid-item>
                    <n-grid-item>
                        <div class="select-wrapper">
                            <n-select v-model:value="priceRange" :options="priceRanges" placeholder="价格区间" size="large"
                                clearable @update:value="handleFilter" />
                        </div>
                    </n-grid-item>
                    <n-grid-item>
                        <div class="radio-wrapper p-2 rounded-lg bg-gray-50/80 border border-gray-200/40">
                            <n-radio-group v-model:value="selectedFaction" @update:value="handleFilter">
                                <n-radio value="1" class="radio-item">T</n-radio>
                                <n-radio value="2" class="radio-item">CT</n-radio>
                                <n-radio value="" class="radio-item">全部</n-radio>
                            </n-radio-group>
                        </div>
                    </n-grid-item>
                    <n-grid-item>
                        <div class="sort-wrapper">
                            <n-select v-model:value="sortBy" :options="sortOptions" placeholder="排序方式" size="large"
                                @update:value="handleSort" />
                        </div>
                    </n-grid-item>
                </n-grid>
            </div>
        </div>

        <!-- 模型列表 -->
        <div v-if="!loading" class="models-grid">
            <n-grid cols="4 xs:1 s:2 m:3 l:4" x-gap="20" y-gap="24" responsive="screen">
                <n-grid-item v-for="model in paginatedModels" :key="model.modelId">
                    <div class="model-card group cursor-pointer shop-card-hover">
                        <div
                            class="card-content p-6 rounded-2xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-xl">
                            <!-- 模型图片 -->
                            <div
                                class="model-image-container responsive-image relative !mb-4 overflow-hidden rounded-xl">
                                <img :src="model.previewUrl || '/placeholder-model.svg'" :alt="model.modelName"
                                    class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                    @error="handleImageError" />
                                <div class="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-lg text-sm">
                                    {{ model.faction === '1' ? 'T' : 'CT' }}
                                </div>
                                <div
                                    class="absolute top-2 left-2 points-shine text-white px-2 py-1 rounded-lg text-sm font-medium shadow-lg">
                                    <span class="price-counter">{{ model.price }}</span> 积分
                                </div>
                                <!-- 热门标签 -->
                                <div v-if="model.quality >= 4"
                                    class="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold tag-bounce">
                                    🔥 高品质
                                </div>
                            </div>

                            <!-- 模型信息 -->
                            <div class="model-info">
                                <h3 class="model-name text-lg font-semibold text-gray-800 !mb-2 truncate">
                                    {{ model.modelName }}
                                </h3>
                                <p class="model-description text-sm text-gray-600 !mb-3 line-clamp-2">
                                    精美的角色模型，为您的游戏体验增添独特魅力
                                </p>

                                <!-- 标签 -->
                                <div class="model-tags !mb-4">
                                    <n-tag size="small" :type="getGroupTypeStyle(model.groupType)" class="!mr-1 !mb-1">
                                        {{ getGroupTypeLabel(model.groupType) }}
                                    </n-tag>
                                    <n-tag v-if="model.quality >= 4" size="small" type="warning" class="!mr-1 !mb-1">
                                        高品质
                                    </n-tag>
                                </div>

                                <!-- 操作按钮 -->
                                <div class="model-actions flex space-x-2">
                                    <n-button type="primary" size="small" @click="previewModel(model)"
                                        class="flex-1 gradient-button">
                                        预览
                                    </n-button>
                                    <div class="w-3" />
                                    <n-button type="success" size="small" @click="purchaseModel(model)"
                                        :disabled="model.price > shopStore.userPoints"
                                        class="flex-1 purchase-button !pl-2">
                                        购买
                                    </n-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </n-grid-item>
            </n-grid>
        </div>

        <!-- 加载状态骨架屏 -->
        <div v-else class="loading-container">
            <n-grid cols="4 xs:1 s:2 m:3 l:4" x-gap="20" y-gap="24" responsive="screen">
                <n-grid-item v-for="n in 12" :key="n">
                    <div
                        class="skeleton-card p-6 rounded-2xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-xl">
                        <div class="skeleton-image skeleton w-full h-48 rounded-xl !mb-4"></div>
                        <div class="skeleton-title skeleton h-4 w-3/4 rounded !mb-2"></div>
                        <div class="skeleton-description skeleton h-3 w-full rounded !mb-1"></div>
                        <div class="skeleton-description skeleton h-3 w-2/3 rounded !mb-3"></div>
                        <div class="skeleton-tags flex space-x-2 !mb-4">
                            <div class="skeleton h-6 w-16 rounded"></div>
                            <div class="skeleton h-6 w-20 rounded"></div>
                        </div>
                        <div class="skeleton-buttons flex space-x-2">
                            <div class="skeleton h-8 flex-1 rounded"></div>
                            <div class="skeleton h-8 flex-1 rounded"></div>
                        </div>
                    </div>
                </n-grid-item>
            </n-grid>
        </div>

        <!-- 空状态 -->
        <div v-if="!loading && filteredModels.length === 0" class="empty-state text-center py-12">
            <div
                class="empty-card p-8 rounded-2xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-xl max-w-md mx-auto">
                <n-icon size="48" color="#9ca3af" class="!mb-4">
                    <SearchOutline />
                </n-icon>
                <h3 class="text-lg font-semibold text-gray-800 !mb-2">未找到相关模型</h3>
                <p class="text-gray-600">请尝试调整搜索条件或筛选选项</p>
                <n-button type="primary" @click="clearFilters" class="mt-4">
                    清除筛选
                </n-button>
            </div>
        </div>

        <!-- 分页 -->
        <div v-if="!loading && filteredModels.length > 0" class="pagination-container !mt-8 flex justify-center">
            <div
                class="pagination-card pagination-glow p-4 rounded-2xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-xl">
                <n-pagination v-model:page="currentPage" :page-count="totalPages" :page-size="pageSize" show-size-picker
                    :page-sizes="[12, 24, 36, 48]" @update:page="handlePageChange"
                    @update:page-size="handlePageSizeChange" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SearchOutline } from '@vicons/ionicons5'
import {
    NButton,
    NGrid,
    NGridItem,
    NIcon,
    NInput,
    NPagination,
    NRadio,
    NRadioGroup,
    NSelect,
    NTag,
} from 'naive-ui'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useShopStore } from '@/stores/shop'

// 接口定义 - 与ModelsView保持一致
interface ModelItem {
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

const router = useRouter()
const shopStore = useShopStore()

// 响应式数据
const models = ref<ModelItem[]>([])
const filteredModels = ref<ModelItem[]>([])
const loading = ref(false)
const searchQuery = ref('')
const selectedTag = ref<string | null>(null)
const selectedFaction = ref('')
const priceRange = ref<string | null>(null)
const sortBy = ref('latest')
const currentPage = ref(1)
const pageSize = ref(12)

// 筛选选项 - 基于实际的 groupType
const tags = ref([
    { label: '武器皮肤', value: '武器皮肤' },
    { label: '角色模型', value: '角色模型' },
    { label: '装备道具', value: '装备道具' },
    { label: '捐赠模型', value: '捐赠模型' },
    { label: '稀有模型', value: '稀有模型' },
    { label: '经典模型', value: '经典模型' },
])

const priceRanges = ref([
    { label: '0-100积分', value: '0-100' },
    { label: '100-500积分', value: '100-500' },
    { label: '500-1000积分', value: '500-1000' },
    { label: '1000+积分', value: '1000+' },
])

const sortOptions = ref([
    { label: '最新上架', value: 'latest' },
    { label: '价格从低到高', value: 'price_asc' },
    { label: '价格从高到低', value: 'price_desc' },
    { label: '最受欢迎', value: 'popular' },
    { label: '评分最高', value: 'rating' },
])

// 计算属性
const totalPages = computed(() => Math.ceil(filteredModels.value.length / pageSize.value))

const paginatedModels = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredModels.value.slice(start, end)
})

// 获取模型数据 - 与ModelsView API保持一致
const fetchModels = async () => {
    loading.value = true
    try {
        // 使用与ModelsView相同的API端点
        const response = await fetch('/api/v1/models/search')
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        models.value = data
        // 初始化时按价格从高到低排序
        applyFilters()
    } catch (error) {
        console.error('获取模型数据失败:', error)
        // 如果API调用失败，使用fallback数据
        const fallbackModels = Array.from({ length: 50 }, (_, index) => ({
            modelId: index + 1,
            modelType: 1,
            categoryId: 1,
            modelName: `精美模型 ${index + 1}`,
            modelNameEn: `model_${index + 1}`,
            price: Math.floor(Math.random() * 1000) + 50,
            isPermanent: true,
            groupType: Math.floor(Math.random() * 4) + 1,
            faction: Math.random() > 0.5 ? '1' : '2',
            exclusiveTo: null,
            isArchived: false,
            hasDiscount: false,
            quality: Math.floor(Math.random() * 5) + 1,
            modelPath: `characters/models/model_${index + 1}/model.vmdl`,
            previewUrl: `https://picsum.photos/300/200?random=${index}`,
            previewOnline: false,
            previewType: 2,
        }))
        models.value = fallbackModels
        applyFilters()
    } finally {
        loading.value = false
    }
}

// 应用筛选和排序 - 基于前端数据处理
const applyFilters = () => {
    let filtered = [...models.value]

    // 搜索筛选
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(model =>
            model.modelName.toLowerCase().includes(query) ||
            model.price.toString().includes(query)
        )
    }

    // 标签筛选 (基于 groupType)
    if (selectedTag.value) {
        const tagGroupMap: { [key: string]: number } = {
            '武器皮肤': 1,
            '角色模型': 2,
            '装备道具': 3,
            '特效': 4,
            '稀有': 5,
            '经典': 6,
        }
        const targetGroupType = tagGroupMap[selectedTag.value]
        if (targetGroupType) {
            filtered = filtered.filter(model => model.groupType === targetGroupType)
        }
    }

    // 阵营筛选
    if (selectedFaction.value) {
        filtered = filtered.filter(model => model.faction === selectedFaction.value)
    }

    // 价格区间筛选
    if (priceRange.value) {
        const [min, max] = priceRange.value.split('-').map(v => v.replace('+', '').replace('积分', ''))
        filtered = filtered.filter(model => {
            if (max === '') {
                return model.price >= parseInt(min)
            }
            return model.price >= parseInt(min) && model.price <= parseInt(max)
        })
    }

    // 排序
    switch (sortBy.value) {
        case 'price_asc':
            filtered.sort((a, b) => a.price - b.price)
            break
        case 'price_desc':
            filtered.sort((a, b) => b.price - a.price)
            break
        case 'popular':
            filtered.sort((a, b) => b.quality - a.quality)
            break
        case 'rating':
            filtered.sort((a, b) => b.quality - a.quality)
            break
        default: // latest
            filtered.sort((a, b) => b.modelId - a.modelId)
    }

    filteredModels.value = filtered
    currentPage.value = 1
}

// 事件处理
const handleSearch = () => {
    applyFilters()
}

const handleFilter = () => {
    applyFilters()
}

const handleSort = () => {
    applyFilters()
}

const handlePageChange = (page: number) => {
    currentPage.value = page
}

const handlePageSizeChange = (size: number) => {
    pageSize.value = size
    currentPage.value = 1
}

const clearFilters = () => {
    searchQuery.value = ''
    selectedTag.value = null
    selectedFaction.value = ''
    priceRange.value = null
    sortBy.value = 'latest'
    applyFilters()
}

const previewModel = (model: ModelItem) => {
    router.push(`/shop/preview/${model.modelId}`)
}

const purchaseModel = (model: ModelItem) => {
    router.push(`/shop/purchase/${model.modelId}`)
}

const handleImageError = (event: Event) => {
    const target = event.target as HTMLImageElement
    target.src = '/placeholder-model.svg'
}

// 辅助函数：获取组类型标签
const getGroupTypeLabel = (groupType: number): string => {
    const labels: { [key: number]: string } = {
        1: '武器皮肤',
        2: '角色模型',
        3: '装备道具',
        4: '捐赠模型',
        5: '稀有模型',
        6: '经典模型',
    }
    return labels[groupType] || '未知类型'
}

// 辅助函数：获取组类型样式
const getGroupTypeStyle = (groupType: number): "default" | "error" | "primary" | "info" | "success" | "warning" => {
    const styles: { [key: number]: "default" | "error" | "primary" | "info" | "success" | "warning" } = {
        1: 'info',
        2: 'success',
        3: 'warning',
        4: 'error',
        5: 'primary',
        6: 'default',
    }
    return styles[groupType] || 'default'
}

// 监听筛选条件变化 - 添加防抖处理
let debounceTimer: number | null = null
watch([searchQuery, selectedTag, selectedFaction, priceRange, sortBy], () => {
    if (debounceTimer) {
        clearTimeout(debounceTimer)
    }
    debounceTimer = window.setTimeout(() => {
        try {
            applyFilters()
        } catch (error) {
            console.error('Filter application error:', error)
        }
    }, 300)
}, { deep: true })

onMounted(() => {
    try {
        fetchModels()
    } catch (error) {
        console.error('Component mount error:', error)
    }
})
</script>

<style scoped>
.shop-models-page {
    min-height: 600px;
}

.search-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.model-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.model-card:hover {
    transform: translateY(-4px) scale(1.02);
}

.card-content {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
}

.model-image-container {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 2;
}

.radio-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.radio-item {
    margin-right: 12px;
}

.empty-card,
.pagination-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

:deep(.n-input) {
    background: rgba(255, 255, 255, 0.8);
}

:deep(.n-select) {
    background: rgba(255, 255, 255, 0.8);
}

:deep(.n-radio-group) {
    display: flex;
    gap: 12px;
}

:deep(.n-pagination) {
    justify-content: center;
}

.skeleton-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
