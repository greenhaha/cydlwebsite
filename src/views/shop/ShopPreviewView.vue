<template>
    <div class="shop-preview-page" v-if="model">
        <div class="preview-container w-full mx-auto">
            <!-- 返回按钮 -->
            <div class="back-button-section !mb-6">
                <n-button @click="goBack" size="large" class="back-btn">
                    <template #icon>
                        <n-icon>
                            <ArrowBackOutline />
                        </n-icon>
                    </template>
                    返回商城
                </n-button>
            </div>

            <!-- 主预览区域 -->
            <div class="preview-main !mb-8">
                <div
                    class="preview-card p-8 rounded-2xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-2xl">
                    <n-grid cols="2 xs:1 s:1 m:2 l:2" x-gap="32" y-gap="24" responsive="screen">
                        <!-- 模型图片展示 -->
                        <n-grid-item>
                            <div class="image-gallery">
                                <div class="main-image-container !mb-4">
                                    <img :src="model.imageUrl || '/placeholder-model.jpg'" :alt="model.name"
                                        class="main-image w-full h-96 object-cover rounded-xl shadow-lg"
                                        @error="handleImageError" />
                                    <div class="image-overlay absolute top-4 right-4">
                                        <div
                                            class="faction-badge bg-black/70 text-white px-3 py-1 rounded-lg text-sm !mb-2">
                                            {{ model.faction === '1' ? 'T阵营' : 'CT阵营' }}
                                        </div>
                                        <div
                                            class="points-badge bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                                            {{ model.points }} 积分
                                        </div>
                                    </div>
                                </div>

                                <!-- 缩略图 -->
                                <div class="thumbnail-grid grid grid-cols-4 gap-2">
                                    <div v-for="(thumb, index) in thumbnails" :key="index"
                                        class="thumbnail-item cursor-pointer rounded-lg overflow-hidden"
                                        @click="setMainImage(thumb)">
                                        <img :src="thumb" :alt="`预览图 ${index + 1}`"
                                            class="w-full h-20 object-cover hover:scale-110 transition-transform duration-300" />
                                    </div>
                                </div>
                            </div>
                        </n-grid-item>

                        <!-- 模型信息 -->
                        <n-grid-item>
                            <div class="model-details">
                                <h1 class="model-title text-3xl font-bold text-gray-800 !mb-4">
                                    {{ model.name }}
                                </h1>

                                <div class="model-meta !mb-6">
                                    <div class="meta-item flex items-center !mb-3">
                                        <n-icon size="20" color="#6b7280" class="mr-2">
                                            <DiamondOutline />
                                        </n-icon>
                                        <span class="text-gray-600">价格：</span>
                                        <span class="text-2xl font-bold text-blue-600 ml-2">{{ model.points }} 积分</span>
                                    </div>

                                    <div class="meta-item flex items-center !mb-3">
                                        <n-icon size="20" color="#6b7280" class="mr-2">
                                            <StarOutline />
                                        </n-icon>
                                        <span class="text-gray-600">评分：</span>
                                        <n-rate :value="model.rating || 5" readonly size="small" class="ml-2" />
                                        <span class="text-gray-600 ml-2">({{ model.rating || 5 }}/5)</span>
                                    </div>

                                    <div class="meta-item flex items-center !mb-3">
                                        <n-icon size="20" color="#6b7280" class="mr-2">
                                            <DownloadOutline />
                                        </n-icon>
                                        <span class="text-gray-600">下载次数：</span>
                                        <span class="text-gray-800 font-medium ml-2">{{ model.downloadCount || 0
                                            }}</span>
                                    </div>
                                </div>

                                <div class="model-description !mb-6">
                                    <h3 class="text-lg font-semibold text-gray-800 !mb-3">模型描述</h3>
                                    <p class="text-gray-600 leading-relaxed">
                                        {{ model.description ||
                                            '这是一个高质量的游戏模型，具有精美的纹理和细节。经过精心设计和优化，为您的游戏体验增添独特魅力。支持多种游戏引擎，兼容性良好。' }}
                                    </p>
                                </div>

                                <!-- 标签 -->
                                <div class="model-tags !mb-6">
                                    <h3 class="text-lg font-semibold text-gray-800 !mb-3">标签</h3>
                                    <div class="tags-container">
                                        <n-tag v-for="tag in model.tags" :key="tag" type="info" size="medium"
                                            class="!mr-2 !mb-2">
                                            {{ tag }}
                                        </n-tag>
                                    </div>
                                </div>

                                <!-- 模型规格 -->
                                <div class="model-specs !mb-8">
                                    <h3 class="text-lg font-semibold text-gray-800 !mb-3">模型规格</h3>
                                    <div class="specs-grid grid grid-cols-2 gap-4">
                                        <div class="spec-item p-3 bg-gray-50 rounded-lg">
                                            <div class="spec-label text-sm text-gray-600">多边形数</div>
                                            <div class="spec-value font-medium">{{ formatNumber(model.polygons || 15000)
                                                }}</div>
                                        </div>
                                        <div class="spec-item p-3 bg-gray-50 rounded-lg">
                                            <div class="spec-label text-sm text-gray-600">纹理大小</div>
                                            <div class="spec-value font-medium">{{ model.textureSize || '2048x2048' }}
                                            </div>
                                        </div>
                                        <div class="spec-item p-3 bg-gray-50 rounded-lg">
                                            <div class="spec-label text-sm text-gray-600">文件格式</div>
                                            <div class="spec-value font-medium">{{ model.format || '.fbx, .obj' }}</div>
                                        </div>
                                        <div class="spec-item p-3 bg-gray-50 rounded-lg">
                                            <div class="spec-label text-sm text-gray-600">文件大小</div>
                                            <div class="spec-value font-medium">{{ model.fileSize || '12.5 MB' }}</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- 操作按钮 -->
                                <div class="action-buttons">
                                    <n-space size="large"> <n-button type="success" size="large" @click="purchaseModel"
                                            :disabled="model.points > shopStore.userPoints" class="purchase-btn">
                                            <template #icon>
                                                <n-icon>
                                                    <CartOutline />
                                                </n-icon>
                                            </template>
                                            {{ model.points > shopStore.userPoints ? '积分不足' : '立即购买' }}
                                        </n-button>

                                        <n-button type="info" size="large" @click="addToWishlist" class="wishlist-btn">
                                            <template #icon>
                                                <n-icon>
                                                    <HeartOutline />
                                                </n-icon>
                                            </template>
                                            加入收藏
                                        </n-button>
                                    </n-space>
                                </div>
                            </div>
                        </n-grid-item>
                    </n-grid>
                </div>
            </div>

            <!-- 相关推荐 -->
            <div class="related-models">
                <div
                    class="related-card p-6 rounded-2xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-xl">
                    <h2 class="section-title text-2xl font-bold text-gray-800 !mb-6">相关推荐</h2>
                    <n-grid cols="4 xs:1 s:2 m:3 l:4" x-gap="16" y-gap="20" responsive="screen">
                        <n-grid-item v-for="relatedModel in relatedModels" :key="relatedModel.id">
                            <div class="related-model-card cursor-pointer" @click="viewModel(relatedModel.id)">
                                <div
                                    class="card-content p-4 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
                                    <img :src="relatedModel.imageUrl || '/placeholder-model.svg'"
                                        :alt="relatedModel.name" class="w-full h-32 object-cover rounded-lg !mb-3" />
                                    <h4 class="text-sm font-medium text-gray-800 !mb-1 truncate">{{ relatedModel.name }}
                                    </h4>
                                    <p class="text-blue-600 font-bold text-sm">{{ relatedModel.points }} 积分</p>
                                </div>
                            </div>
                        </n-grid-item>
                    </n-grid>
                </div>
            </div>
        </div>

        <!-- 购买确认对话框 -->
        <n-modal v-model:show="showPurchaseModal">
            <div class="modal-card max-w-md mx-auto p-6 rounded-2xl bg-white shadow-2xl">
                <h3 class="text-xl font-bold text-gray-800 !mb-4">确认购买</h3>
                <div class="purchase-info !mb-6">
                    <div class="info-item flex justify-between !mb-3">
                        <span class="text-gray-600">模型名称：</span>
                        <span class="font-medium">{{ model?.name }}</span>
                    </div>
                    <div class="info-item flex justify-between !mb-3">
                        <span class="text-gray-600">价格：</span>
                        <span class="font-bold text-blue-600">{{ model?.points }} 积分</span>
                    </div>
                    <div class="info-item flex justify-between !mb-3">
                        <span class="text-gray-600">当前积分：</span>
                        <span class="font-medium">{{ shopStore.userPoints }} 积分</span>
                    </div>
                    <div class="info-item flex justify-between">
                        <span class="text-gray-600">购买后余额：</span>
                        <span class="font-medium">{{ shopStore.userPoints - (model?.points || 0) }} 积分</span>
                    </div>
                </div>
                <div class="modal-actions flex space-x-3">
                    <n-button @click="showPurchaseModal = false" class="flex-1">
                        取消
                    </n-button>
                    <n-button type="success" @click="confirmPurchase" :loading="purchasing" class="flex-1">
                        确认购买
                    </n-button>
                </div>
            </div>
        </n-modal>
    </div>

    <!-- 加载状态 -->
    <div v-else class="loading-container flex items-center justify-center min-h-[60vh]">
        <div
            class="loading-card p-8 rounded-2xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-xl text-center">
            <n-spin size="large" />
            <p class="text-gray-600 mt-4">正在加载模型详情...</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    ArrowBackOutline,
    CartOutline,
    DiamondOutline,
    DownloadOutline,
    HeartOutline,
    StarOutline,
} from '@vicons/ionicons5'
import {
    NButton,
    NGrid,
    NGridItem,
    NIcon,
    NModal,
    NRate,
    NSpace,
    NSpin,
    NTag,
    useMessage,
} from 'naive-ui'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useShopStore } from '@/stores/shop'

// 接口定义
interface ModelItem {
    id: number
    name: string
    description?: string
    imageUrl?: string
    points: number
    faction: string
    tags?: string[]
    rating?: number
    downloadCount?: number
    polygons?: number
    textureSize?: string
    format?: string
    fileSize?: string
}

const route = useRoute()
const router = useRouter()
const message = useMessage()
const shopStore = useShopStore()

// 响应式数据
const model = ref<ModelItem | null>(null)
const relatedModels = ref<ModelItem[]>([])
const showPurchaseModal = ref(false)
const purchasing = ref(false)
const thumbnails = ref<string[]>([])

// 获取模型详情
const fetchModelDetails = async (id: string) => {
    try {
        // TODO: 调用实际API
        // const response = await api.getModelDetails(id)
        // model.value = response.data

        // 模拟数据
        const mockModel: ModelItem = {
            id: parseInt(id),
            name: `精美角色模型 ${id}`,
            description: `这是一个高质量的3D角色模型，具有精美的纹理和细节。经过专业团队精心设计和优化，适用于各种游戏场景。模型包含完整的骨骼绑定和动画支持，材质贴图精细，光影效果出色。无论是用于角色扮演游戏、射击游戏还是其他类型的游戏，都能为玩家带来沉浸式的视觉体验。`,
            imageUrl: `https://picsum.photos/600/400?random=${id}`,
            points: Math.floor(Math.random() * 800) + 200,
            faction: Math.random() > 0.5 ? '1' : '2',
            tags: ['角色模型', '高质量', '游戏专用', 'PBR材质'],
            rating: Math.floor(Math.random() * 2) + 4, // 4-5星
            downloadCount: Math.floor(Math.random() * 5000) + 1000,
            polygons: Math.floor(Math.random() * 20000) + 10000,
            textureSize: '2048x2048',
            format: '.fbx, .obj, .blend',
            fileSize: `${(Math.random() * 20 + 5).toFixed(1)} MB`,
        }

        model.value = mockModel

        // 生成缩略图
        thumbnails.value = Array.from({ length: 4 }, (_, index) =>
            `https://picsum.photos/300/200?random=${id}${index}`
        )

        // 获取相关推荐
        await fetchRelatedModels()
    } catch (error) {
        console.error('获取模型详情失败:', error)
        message.error('获取模型详情失败')
    }
}

// 获取相关推荐
const fetchRelatedModels = async () => {
    try {
        // TODO: 调用实际API
        // const response = await api.getRelatedModels(model.value?.id)
        // relatedModels.value = response.data

        // 模拟数据
        const mockRelated = Array.from({ length: 4 }, (_, index) => ({
            id: 1000 + index,
            name: `相关模型 ${index + 1}`,
            imageUrl: `https://picsum.photos/200/150?random=${1000 + index}`,
            points: Math.floor(Math.random() * 500) + 100,
            faction: Math.random() > 0.5 ? '1' : '2',
        }))

        relatedModels.value = mockRelated
    } catch (error) {
        console.error('获取相关推荐失败:', error)
    }
}

// 事件处理
const goBack = () => {
    router.push('/shop')
}

const setMainImage = (imageUrl: string) => {
    if (model.value) {
        model.value.imageUrl = imageUrl
    }
}

const purchaseModel = () => {
    if (!model.value) return

    if (model.value.points > shopStore.userPoints) {
        message.warning('积分不足，无法购买此模型')
        return
    }

    showPurchaseModal.value = true
}

const confirmPurchase = async () => {
    if (!model.value) return

    purchasing.value = true
    try {
        // TODO: 调用购买API
        // await api.purchaseModel(model.value.id)

        // 模拟购买
        await new Promise(resolve => setTimeout(resolve, 1000))

        shopStore.deductPoints(model.value.points)
        message.success('购买成功！模型已添加到您的库存中')
        showPurchaseModal.value = false

        // 可以跳转到购买历史页面
        router.push('/shop/history')
    } catch (error) {
        console.error('购买失败:', error)
        message.error('购买失败，请重试')
    } finally {
        purchasing.value = false
    }
}

const addToWishlist = async () => {
    try {
        // TODO: 调用收藏API
        // await api.addToWishlist(model.value?.id)

        message.success('已添加到收藏夹')
    } catch (error) {
        console.error('添加收藏失败:', error)
        message.error('添加收藏失败')
    }
}

const viewModel = (id: number) => {
    router.push(`/shop/preview/${id}`)
}

const handleImageError = (event: Event) => {
    const target = event.target as HTMLImageElement
    target.src = '/placeholder-model.svg'
}

const formatNumber = (num: number) => {
    return num.toLocaleString()
}

onMounted(() => {
    const modelId = route.params.id as string
    if (modelId) {
        fetchModelDetails(modelId)
    }
})
</script>

<style scoped>
.shop-preview-page {
    min-height: 100vh;
    padding-bottom: 2rem;
}

.preview-card,
.related-card,
.loading-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.main-image-container {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
}

.main-image {
    transition: transform 0.3s ease;
}

.main-image:hover {
    transform: scale(1.05);
}

.image-overlay {
    position: absolute;
    top: 1rem;
    right: 1rem;
}

.thumbnail-item {
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.thumbnail-item:hover {
    border-color: #3b82f6;
    transform: scale(1.05);
}

.model-title {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.meta-item {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
}

.spec-item {
    transition: all 0.3s ease;
}

.spec-item:hover {
    background-color: #f3f4f6;
    transform: translateY(-2px);
}

.purchase-btn {
    background: linear-gradient(135deg, #10b981, #059669);
    border: none;
    font-weight: 600;
}

.wishlist-btn {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    border: none;
    font-weight: 600;
}

.related-model-card {
    transition: all 0.3s ease;
}

.related-model-card:hover {
    transform: translateY(-4px);
}

.modal-card {
    margin: 2rem;
}

.back-btn {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

:deep(.n-rate) {
    display: inline-flex;
}
</style>
