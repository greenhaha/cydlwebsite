<template>
    <div class="shop-history-page">
        <!-- 页面标题 -->
        <div class="page-header !mb-8">
            <div class="header-card p-6 rounded-2xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-xl">
                <h1 class="page-title text-2xl font-bold text-gray-800 !mb-2">购买历史</h1>
                <p class="page-subtitle text-gray-600">查看您的所有购买记录和下载的模型</p>
            </div>
        </div>

        <!-- 统计信息 -->
        <div class="stats-section !mb-8">
            <div class="stats-card p-6 rounded-2xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-xl">
                <n-grid cols="4 xs:2 s:2 m:4 l:4" x-gap="20" y-gap="16" responsive="screen">
                    <n-grid-item>
                        <div class="stat-item text-center p-4 rounded-xl bg-blue-50 border border-blue-200">
                            <div class="stat-icon !mb-2">
                                <n-icon size="32" color="#3b82f6">
                                    <CartOutline />
                                </n-icon>
                            </div>
                            <div class="stat-value text-2xl font-bold text-blue-600">{{ totalPurchases }}</div>
                            <div class="stat-label text-sm text-gray-600">总购买数</div>
                        </div>
                    </n-grid-item>
                    <n-grid-item>
                        <div class="stat-item text-center p-4 rounded-xl bg-green-50 border border-green-200">
                            <div class="stat-icon !mb-2">
                                <n-icon size="32" color="#10b981">
                                    <DiamondOutline />
                                </n-icon>
                            </div>
                            <div class="stat-value text-2xl font-bold text-green-600">{{ totalSpent }}</div>
                            <div class="stat-label text-sm text-gray-600">总消费积分</div>
                        </div>
                    </n-grid-item>
                    <n-grid-item>
                        <div class="stat-item text-center p-4 rounded-xl bg-purple-50 border border-purple-200">
                            <div class="stat-icon !mb-2">
                                <n-icon size="32" color="#8b5cf6">
                                    <DownloadOutline />
                                </n-icon>
                            </div>
                            <div class="stat-value text-2xl font-bold text-purple-600">{{ totalDownloads }}</div>
                            <div class="stat-label text-sm text-gray-600">总下载次数</div>
                        </div>
                    </n-grid-item>
                    <n-grid-item>
                        <div class="stat-item text-center p-4 rounded-xl bg-orange-50 border border-orange-200">
                            <div class="stat-icon !mb-2">
                                <n-icon size="32" color="#f59e0b">
                                    <CalendarOutline />
                                </n-icon>
                            </div>
                            <div class="stat-value text-2xl font-bold text-orange-600">{{ daysSinceFirstPurchase }}
                            </div>
                            <div class="stat-label text-sm text-gray-600">购买天数</div>
                        </div>
                    </n-grid-item>
                </n-grid>
            </div>
        </div>

        <!-- 筛选和搜索 -->
        <div class="filter-section !mb-6">
            <div class="filter-card p-4 rounded-2xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-xl">
                <n-grid cols="4 xs:1 s:2 m:3 l:4" x-gap="16" y-gap="12" responsive="screen">
                    <n-grid-item>
                        <n-input v-model:value="searchQuery" placeholder="搜索模型名称" size="medium" @input="handleSearch">
                            <template #prefix>
                                <n-icon>
                                    <SearchOutline />
                                </n-icon>
                            </template>
                        </n-input>
                    </n-grid-item>
                    <n-grid-item>
                        <n-select v-model:value="statusFilter" :options="statusOptions" placeholder="购买状态" size="medium"
                            clearable @update:value="handleFilter" />
                    </n-grid-item>
                    <n-grid-item>
                        <n-date-picker v-model:value="dateRange" type="daterange" placeholder="选择日期范围" size="medium"
                            clearable @update:value="handleFilter" />
                    </n-grid-item>
                    <n-grid-item>
                        <n-select v-model:value="sortBy" :options="sortOptions" placeholder="排序方式" size="medium"
                            @update:value="handleSort" />
                    </n-grid-item>
                </n-grid>
            </div>
        </div>

        <!-- 购买记录列表 -->
        <div class="history-list">
            <div class="list-card p-6 rounded-2xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-xl">
                <!-- 加载状态 -->
                <div v-if="loading" class="loading-container text-center py-12">
                    <n-spin size="large" />
                    <p class="text-gray-600 mt-4">正在加载购买记录...</p>
                </div>

                <!-- 购买记录 -->
                <div v-else-if="filteredHistory.length > 0" class="history-items">
                    <div v-for="item in paginatedHistory" :key="item.id"
                        class="history-item p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 !mb-4 last:mb-0">
                        <n-grid cols="5 xs:1 s:2 m:3 l:5" x-gap="20" y-gap="16" responsive="screen">
                            <!-- 模型图片和基本信息 -->
                            <n-grid-item span="2 xs:1 s:1 m:1 l:2">
                                <div class="model-info flex items-start space-x-4">
                                    <div class="model-image-container flex-shrink-0">
                                        <img :src="item.model.imageUrl || '/placeholder-model.svg'"
                                            :alt="item.model.name" class="w-20 h-20 object-cover rounded-lg"
                                            @error="handleImageError" />
                                    </div>
                                    <div class="model-details flex-1 min-w-0 pl-2">
                                        <h3 class="model-name text-lg font-semibold text-gray-800 !mb-1 truncate">
                                            {{ item.model.name }}
                                        </h3>
                                        <div class="model-meta text-sm text-gray-600 space-y-1">
                                            <div class="flex items-center">
                                                <n-tag size="small"
                                                    :type="item.model.faction === '1' ? 'warning' : 'info'">
                                                    {{ item.model.faction === '1' ? 'T阵营' : 'CT阵营' }}
                                                </n-tag>
                                                <span class="ml-2">{{ item.model.fileSize || '12.5 MB' }}</span>
                                            </div>
                                            <div class="flex items-center text-blue-600 font-medium">
                                                <n-icon size="16" class="mr-1">
                                                    <DiamondOutline />
                                                </n-icon>
                                                {{ item.points }} 积分
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </n-grid-item>

                            <!-- 购买信息 -->
                            <n-grid-item>
                                <div class="purchase-info">
                                    <div class="info-label text-sm text-gray-600 mb-1">购买时间</div>
                                    <div class="info-value text-sm font-medium text-gray-800">
                                        {{ formatDate(item.purchaseDate) }}
                                    </div>
                                    <div class="info-label text-sm text-gray-600 mb-1 mt-2">订单号</div>
                                    <div class="info-value text-xs text-gray-600 font-mono">
                                        {{ item.orderId }}
                                    </div>
                                </div>
                            </n-grid-item>

                            <!-- 状态 -->
                            <n-grid-item>
                                <div class="status-info">
                                    <div class="info-label text-sm text-gray-600 !mb-2">状态</div>
                                    <n-tag :type="getStatusType(item.status)" size="small" class="mb-2">
                                        {{ getStatusText(item.status) }}
                                    </n-tag>
                                    <div v-if="item.downloadCount > 0" class="download-info text-xs text-gray-600">
                                        已下载 {{ item.downloadCount }} 次
                                    </div>
                                </div>
                            </n-grid-item>

                            <!-- 操作按钮 -->
                            <n-grid-item>
                                <div class="actions space-y-2">
                                    <n-button v-if="item.status === 'completed'" type="primary" size="small" block
                                        @click="downloadModel(item)" :loading="item.downloading">
                                        <template #icon>
                                            <n-icon>
                                                <DownloadOutline />
                                            </n-icon>
                                        </template>
                                        下载
                                    </n-button>

                                    <n-button type="info" size="small" block @click="viewModelDetails(item.model.id)">
                                        查看详情
                                    </n-button>

                                    <n-button v-if="item.status === 'completed'" size="small" block
                                        @click="rateModel(item)">
                                        <template #icon>
                                            <n-icon>
                                                <StarOutline />
                                            </n-icon>
                                        </template>
                                        {{ item.rated ? '已评价' : '评价' }}
                                    </n-button>
                                </div>
                            </n-grid-item>
                        </n-grid>
                    </div>
                </div>

                <!-- 空状态 -->
                <div v-else class="empty-state text-center py-16">
                    <div class="empty-icon mb-4">
                        <n-icon size="64" color="#9ca3af">
                            <CartOutline />
                        </n-icon>
                    </div>
                    <h3 class="text-lg font-medium text-gray-800 !mb-2">暂无购买记录</h3>
                    <p class="text-gray-600 !mb-6">您还没有购买任何模型，快去商城看看吧！</p>
                    <n-button type="primary" @click="goToShop">
                        前往商城
                    </n-button>
                </div>

                <!-- 分页 -->
                <div v-if="filteredHistory.length > 0" class="pagination-container !mt-6 flex justify-center">
                    <n-pagination v-model:page="currentPage" :page-count="totalPages" :page-size="pageSize"
                        show-size-picker :page-sizes="[5, 10, 20, 50]" @update:page="handlePageChange"
                        @update:page-size="handlePageSizeChange" />
                </div>
            </div>
        </div>

        <!-- 评价对话框 -->
        <n-modal v-model:show="showRatingModal">
            <div class="rating-modal-card max-w-md mx-auto p-6 rounded-2xl bg-white shadow-2xl" v-if="selectedItem">
                <h3 class="text-xl font-bold text-gray-800 mb-4">评价模型</h3>
                <div class="model-info-brief !mb-4 p-4 rounded-lg bg-gray-50">
                    <div class="flex items-center space-x-3">
                        <img :src="selectedItem.model.imageUrl || '/placeholder-model.svg'"
                            :alt="selectedItem.model.name" class="w-12 h-12 object-cover rounded-lg" />
                        <div>
                            <div class="font-medium text-gray-800">{{ selectedItem.model.name }}</div>
                            <div class="text-sm text-gray-600">{{ selectedItem.points }} 积分</div>
                        </div>
                    </div>
                </div>

                <div class="rating-section !mb-4">
                    <div class="text-sm text-gray-600 !mb-2">评分：</div>
                    <n-rate v-model:value="userRating" size="large" />
                </div>

                <div class="comment-section !mb-6">
                    <div class="text-sm text-gray-600 mb-2">评价内容（可选）：</div>
                    <n-input v-model:value="userComment" type="textarea" placeholder="分享您对这个模型的使用体验..." :rows="3"
                        maxlength="200" show-count />
                </div>

                <div class="modal-actions flex space-x-3">
                    <n-button @click="showRatingModal = false" class="flex-1">
                        取消
                    </n-button>
                    <n-button type="primary" @click="submitRating" :loading="submittingRating" class="flex-1">
                        提交评价
                    </n-button>
                </div>
            </div>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import {
    CalendarOutline,
    CartOutline,
    DiamondOutline,
    DownloadOutline,
    SearchOutline,
    StarOutline,
} from '@vicons/ionicons5'
import {
    NButton,
    NDatePicker,
    NGrid,
    NGridItem,
    NIcon,
    NInput,
    NModal,
    NPagination,
    NRate,
    NSelect,
    NSpin,
    NTag,
    useMessage,
} from 'naive-ui'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// 接口定义
interface ModelItem {
    id: number
    name: string
    description?: string
    imageUrl?: string
    faction: string
    fileSize?: string
}

interface PurchaseHistoryItem {
    id: number
    orderId: string
    model: ModelItem
    points: number
    purchaseDate: string
    status: 'pending' | 'completed' | 'failed' | 'refunded'
    downloadCount: number
    rated: boolean
    rating?: number
    comment?: string
    downloading?: boolean
}

const router = useRouter()
const message = useMessage()

// 响应式数据
const loading = ref(false)
const historyItems = ref<PurchaseHistoryItem[]>([])
const filteredHistory = ref<PurchaseHistoryItem[]>([])
const searchQuery = ref('')
const statusFilter = ref<string | null>(null)
const dateRange = ref<[number, number] | null>(null)
const sortBy = ref('date_desc')
const currentPage = ref(1)
const pageSize = ref(10)

// 评价相关
const showRatingModal = ref(false)
const selectedItem = ref<PurchaseHistoryItem | null>(null)
const userRating = ref(5)
const userComment = ref('')
const submittingRating = ref(false)

// 筛选选项
const statusOptions = ref([
    { label: '已完成', value: 'completed' },
    { label: '处理中', value: 'pending' },
    { label: '失败', value: 'failed' },
    { label: '已退款', value: 'refunded' },
])

const sortOptions = ref([
    { label: '购买时间（最新）', value: 'date_desc' },
    { label: '购买时间（最早）', value: 'date_asc' },
    { label: '价格（高到低）', value: 'price_desc' },
    { label: '价格（低到高）', value: 'price_asc' },
    { label: '下载次数', value: 'download_desc' },
])

// 计算属性
const totalPurchases = computed(() => historyItems.value.length)
const totalSpent = computed(() =>
    historyItems.value.reduce((sum, item) => sum + item.points, 0)
)
const totalDownloads = computed(() =>
    historyItems.value.reduce((sum, item) => sum + item.downloadCount, 0)
)
const daysSinceFirstPurchase = computed(() => {
    if (historyItems.value.length === 0) return 0
    const firstPurchase = new Date(Math.min(...historyItems.value.map(item => new Date(item.purchaseDate).getTime())))
    const today = new Date()
    return Math.floor((today.getTime() - firstPurchase.getTime()) / (1000 * 60 * 60 * 24))
})

const totalPages = computed(() => Math.ceil(filteredHistory.value.length / pageSize.value))

const paginatedHistory = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredHistory.value.slice(start, end)
})

// 获取购买历史
const fetchPurchaseHistory = async () => {
    loading.value = true
    try {
        // TODO: 调用实际API
        // const response = await api.getPurchaseHistory()
        // historyItems.value = response.data

        // 模拟数据
        const mockHistory: PurchaseHistoryItem[] = Array.from({ length: 25 }, (_, index) => ({
            id: index + 1,
            orderId: `ORD${Date.now()}${index.toString().padStart(3, '0')}`,
            model: {
                id: 100 + index,
                name: `精美模型 ${index + 1}`,
                description: '高质量的游戏模型',
                imageUrl: `https://picsum.photos/200/150?random=${100 + index}`,
                faction: Math.random() > 0.5 ? '1' : '2',
                fileSize: `${(Math.random() * 20 + 5).toFixed(1)} MB`,
            },
            points: Math.floor(Math.random() * 500) + 100,
            purchaseDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            status: ['completed', 'pending', 'failed', 'refunded'][Math.floor(Math.random() * 4)] as 'completed' | 'pending' | 'failed' | 'refunded',
            downloadCount: Math.floor(Math.random() * 10),
            rated: Math.random() > 0.7,
            rating: Math.random() > 0.7 ? Math.floor(Math.random() * 2) + 4 : undefined,
        }))

        historyItems.value = mockHistory
        applyFilters()
    } catch (error) {
        console.error('获取购买历史失败:', error)
        message.error('获取购买历史失败')
    } finally {
        loading.value = false
    }
}

// 应用筛选和排序
const applyFilters = () => {
    let filtered = [...historyItems.value]

    // 搜索筛选
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(item =>
            item.model.name.toLowerCase().includes(query) ||
            item.orderId.toLowerCase().includes(query)
        )
    }

    // 状态筛选
    if (statusFilter.value) {
        filtered = filtered.filter(item => item.status === statusFilter.value)
    }

    // 日期范围筛选
    if (dateRange.value) {
        const [startDate, endDate] = dateRange.value
        filtered = filtered.filter(item => {
            const purchaseTime = new Date(item.purchaseDate).getTime()
            return purchaseTime >= startDate && purchaseTime <= endDate
        })
    }

    // 排序
    switch (sortBy.value) {
        case 'date_asc':
            filtered.sort((a, b) => new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime())
            break
        case 'price_desc':
            filtered.sort((a, b) => b.points - a.points)
            break
        case 'price_asc':
            filtered.sort((a, b) => a.points - b.points)
            break
        case 'download_desc':
            filtered.sort((a, b) => b.downloadCount - a.downloadCount)
            break
        default: // date_desc
            filtered.sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime())
    }

    filteredHistory.value = filtered
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

const downloadModel = async (item: PurchaseHistoryItem) => {
    if (item.status !== 'completed') {
        message.warning('只有已完成的订单才能下载')
        return
    }

    item.downloading = true
    try {
        // TODO: 调用下载API
        // await api.downloadModel(item.model.id)

        // 模拟下载
        await new Promise(resolve => setTimeout(resolve, 1000))

        item.downloadCount++
        message.success('下载开始，请检查您的下载文件夹')
    } catch (error) {
        console.error('下载失败:', error)
        message.error('下载失败，请重试')
    } finally {
        item.downloading = false
    }
}

const viewModelDetails = (modelId: number) => {
    router.push(`/shop/preview/${modelId}`)
}

const rateModel = (item: PurchaseHistoryItem) => {
    selectedItem.value = item
    userRating.value = item.rating || 5
    userComment.value = item.comment || ''
    showRatingModal.value = true
}

const submitRating = async () => {
    if (!selectedItem.value) return

    submittingRating.value = true
    try {
        // TODO: 调用评价API
        // await api.rateModel({
        //   modelId: selectedItem.value.model.id,
        //   rating: userRating.value,
        //   comment: userComment.value
        // })

        // 模拟提交
        await new Promise(resolve => setTimeout(resolve, 1000))

        selectedItem.value.rated = true
        selectedItem.value.rating = userRating.value
        selectedItem.value.comment = userComment.value

        showRatingModal.value = false
        message.success('评价提交成功，感谢您的反馈！')
    } catch (error) {
        console.error('提交评价失败:', error)
        message.error('提交评价失败，请重试')
    } finally {
        submittingRating.value = false
    }
}

const goToShop = () => {
    router.push('/shop')
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })
}

const getStatusType = (status: string): "default" | "error" | "primary" | "info" | "success" | "warning" => {
    const statusMap: Record<string, "default" | "error" | "primary" | "info" | "success" | "warning"> = {
        completed: 'success',
        pending: 'warning',
        failed: 'error',
        refunded: 'info',
    }
    return statusMap[status] || 'default'
}

const getStatusText = (status: string) => {
    const statusMap = {
        completed: '已完成',
        pending: '处理中',
        failed: '失败',
        refunded: '已退款',
    }
    return statusMap[status as keyof typeof statusMap] || status
}

const handleImageError = (event: Event) => {
    const target = event.target as HTMLImageElement
    target.src = '/placeholder-model.svg'
}

onMounted(() => {
    fetchPurchaseHistory()
})
</script>

<style scoped>
.shop-history-page {
    min-height: 100vh;
    padding-bottom: 2rem;
}

.header-card,
.stats-card,
.filter-card,
.list-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.page-title {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.stat-item {
    transition: all 0.3s ease;
}

.stat-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.history-item {
    transition: all 0.3s ease;
    border: 1px solid #e5e7eb;
}

.history-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: #d1d5db;
}

.model-image-container img {
    transition: transform 0.3s ease;
}

.model-image-container:hover img {
    transform: scale(1.05);
}

.actions .n-button {
    transition: all 0.3s ease;
}

.actions .n-button:hover {
    transform: translateY(-1px);
}

.rating-modal-card {
    margin: 2rem;
    animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.empty-icon {
    animation: float 3s ease-in-out infinite;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

:deep(.n-date-picker) {
    width: 100%;
}

:deep(.n-pagination) {
    justify-content: center;
}

:deep(.n-rate) {
    gap: 8px;
}
</style>
