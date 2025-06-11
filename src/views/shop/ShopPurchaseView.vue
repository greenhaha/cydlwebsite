<template>
    <div class="shop-purchase-page" v-if="model">
        <div class="purchase-container w-full mx-auto">
            <!-- 返回按钮 -->
            <div class="back-button-section !mb-6">
                <n-button @click="goBack" size="large" class="back-btn">
                    <template #icon>
                        <n-icon>
                            <ArrowBackOutline />
                        </n-icon>
                    </template>
                    返回预览
                </n-button>
            </div>

            <!-- 购买确认卡片 -->
            <div
                class="purchase-card p-8 rounded-2xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-2xl">
                <div class="purchase-header text-center !mb-8">
                    <h1 class="page-title text-3xl font-bold text-gray-800 !mb-2">确认购买</h1>
                    <p class="page-subtitle text-gray-600">请仔细检查以下购买信息</p>
                </div>

                <n-grid cols="2 xs:1 s:1 m:2 l:2" x-gap="32" y-gap="24" responsive="screen">
                    <!-- 模型信息 -->
                    <n-grid-item>
                        <div class="model-info-section">
                            <h2 class="section-title text-xl font-semibold text-gray-800 !mb-4">商品信息</h2>

                            <div class="model-card p-6 rounded-xl bg-gray-50 border border-gray-200">
                                <div class="model-image-container !mb-4">
                                    <img :src="model.imageUrl || '/placeholder-model.svg'" :alt="model.name"
                                        class="w-full h-48 object-cover rounded-lg" @error="handleImageError" />
                                    <div class="model-badges !mt-2 flex justify-between !mr-4">
                                        <n-tag type="info" size="small">
                                            {{ model.faction === '1' ? 'T阵营' : 'CT阵营' }}
                                        </n-tag>
                                        <n-tag type="success" size="small">
                                            {{ model.points }} 积分
                                        </n-tag>
                                    </div>
                                </div>

                                <div class="model-details">
                                    <h3 class="model-name text-lg font-bold text-gray-800 !mb-2">{{ model.name }}</h3>
                                    <p class="model-description text-sm text-gray-600 !mb-4 line-clamp-3">
                                        {{ model.description || '高质量的游戏模型，具有精美的纹理和细节。' }}
                                    </p>

                                    <div class="model-specs grid grid-cols-2 gap-3 text-sm">
                                        <div class="spec-item">
                                            <span class="text-gray-600">多边形数：</span>
                                            <span class="font-medium">{{ formatNumber(model.polygons || 15000) }}</span>
                                        </div>
                                        <div class="spec-item">
                                            <span class="text-gray-600">文件大小：</span>
                                            <span class="font-medium">{{ model.fileSize || '12.5 MB' }}</span>
                                        </div>
                                        <div class="spec-item">
                                            <span class="text-gray-600">格式：</span>
                                            <span class="font-medium">{{ model.format || '.fbx, .obj' }}</span>
                                        </div>
                                        <div class="spec-item">
                                            <span class="text-gray-600">评分：</span>
                                            <span class="font-medium">{{ model.rating || 5 }}/5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </n-grid-item>

                    <!-- 购买信息 -->
                    <n-grid-item>
                        <div class="purchase-info-section">
                            <h2 class="section-title text-xl font-semibold text-gray-800 !mb-4">订单详情</h2>

                            <div class="purchase-summary p-6 rounded-xl bg-blue-50 border border-blue-200 !mb-6">
                                <div class="summary-item flex justify-between items-center !mb-4">
                                    <span class="text-gray-600">商品名称：</span>
                                    <span class="font-medium text-gray-800">{{ model.name }}</span>
                                </div>

                                <div class="summary-item flex justify-between items-center !mb-4">
                                    <span class="text-gray-600">商品价格：</span>
                                    <span class="font-bold text-blue-600 text-lg">{{ model.points }} 积分</span>
                                </div>

                                <div class="summary-item flex justify-between items-center !mb-4">
                                    <span class="text-gray-600">当前积分：</span>
                                    <span class="font-medium text-gray-800">{{ userPoints }} 积分</span>
                                </div>

                                <hr class="my-4 border-blue-300">

                                <div class="summary-item flex justify-between items-center !mb-4">
                                    <span class="text-gray-600">购买后余额：</span>
                                    <span class="font-bold text-lg"
                                        :class="remainingPoints >= 0 ? 'text-green-600' : 'text-red-600'">
                                        {{ remainingPoints }} 积分
                                    </span>
                                </div>

                                <!-- 积分不足警告 -->
                                <div v-if="remainingPoints < 0"
                                    class="insufficient-points-warning mt-4 p-4 rounded-lg bg-red-50 border border-red-200">
                                    <div class="flex items-center text-red-600">
                                        <n-icon size="20" class="mr-2">
                                            <WarningOutline />
                                        </n-icon>
                                        <span class="font-medium">积分不足</span>
                                    </div>
                                    <p class="text-red-600 text-sm mt-1">
                                        您还需要 {{ Math.abs(remainingPoints) }} 积分才能购买此商品
                                    </p>
                                    <div class="mt-3">
                                        <n-button type="warning" size="small" @click="goToSignIn">
                                            去签到获取积分
                                        </n-button>
                                    </div>
                                </div>
                            </div>

                            <!-- 购买协议 -->
                            <div class="purchase-agreement !mb-6">
                                <n-checkbox v-model:checked="agreedToTerms">
                                    <span class="text-sm text-gray-600">
                                        我已阅读并同意
                                        <a href="#" class="text-blue-600 hover:underline">《购买协议》</a>
                                        和
                                        <a href="#" class="text-blue-600 hover:underline">《使用条款》</a>
                                    </span>
                                </n-checkbox>
                            </div>

                            <!-- 支付方式选择 -->
                            <div class="payment-method !mb-6">
                                <h3 class="text-lg font-medium text-gray-800 !mb-3">支付方式</h3>
                                <n-radio-group v-model:value="paymentMethod">
                                    <n-space vertical>
                                        <n-radio value="points" class="payment-option">
                                            <div class="flex items-center">
                                                <n-icon size="20" color="#3b82f6" class="mr-2">
                                                    <DiamondOutline />
                                                </n-icon>
                                                <span>积分支付</span>
                                                <n-tag type="success" size="small" class="ml-2">推荐</n-tag>
                                            </div>
                                        </n-radio>
                                        <n-radio value="combo" disabled class="payment-option">
                                            <div class="flex items-center opacity-50">
                                                <n-icon size="20" color="#6b7280" class="mr-2">
                                                    <CardOutline />
                                                </n-icon>
                                                <span>积分+现金 (即将开放)</span>
                                            </div>
                                        </n-radio>
                                    </n-space>
                                </n-radio-group>
                            </div>

                            <!-- 购买按钮 -->
                            <div class="purchase-actions">
                                <n-space size="large" vertical>
                                    <n-button type="success" size="large" block @click="handlePurchase"
                                        :disabled="!canPurchase" :loading="purchasing" class="purchase-btn">
                                        <template #icon>
                                            <n-icon>
                                                <CartOutline />
                                            </n-icon>
                                        </template>
                                        {{ getPurchaseButtonText() }}
                                    </n-button>

                                    <n-button size="large" block @click="goBack" class="cancel-btn">
                                        取消购买
                                    </n-button>
                                </n-space>
                            </div>
                        </div>
                    </n-grid-item>
                </n-grid>
            </div>
        </div>

        <!-- 购买成功对话框 -->
        <n-modal v-model:show="showSuccessModal">
            <div class="success-modal-card max-w-md mx-auto p-8 rounded-2xl bg-white shadow-2xl text-center">
                <div class="success-icon !mb-4">
                    <n-icon size="64" color="#10b981">
                        <CheckmarkCircleOutline />
                    </n-icon>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 !mb-4">购买成功！</h3>
                <p class="text-gray-600 !mb-6">
                    恭喜您成功购买了「{{ model?.name }}」！<br>
                    模型已添加到您的库存中。
                </p>
                <div class="success-actions">
                    <n-space size="medium">
                        <n-button type="primary" @click="goToHistory">
                            查看购买历史
                        </n-button>
                        <n-button @click="continueShopping">
                            继续购物
                        </n-button>
                    </n-space>
                </div>
            </div>
        </n-modal>
    </div>

    <!-- 加载状态 -->
    <div v-else class="loading-container flex items-center justify-center min-h-[60vh]">
        <div
            class="loading-card p-8 rounded-2xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-xl text-center">
            <n-spin size="large" />
            <p class="text-gray-600 mt-4">正在加载商品信息...</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    ArrowBackOutline,
    CardOutline,
    CartOutline,
    CheckmarkCircleOutline,
    DiamondOutline,
    WarningOutline,
} from '@vicons/ionicons5'
import {
    NButton,
    NCheckbox,
    NGrid,
    NGridItem,
    NIcon,
    NModal,
    NRadio,
    NRadioGroup,
    NSpace,
    NSpin,
    NTag,
    useMessage,
} from 'naive-ui'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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

// 响应式数据
const model = ref<ModelItem | null>(null)
const userPoints = ref(1250)
const purchasing = ref(false)
const showSuccessModal = ref(false)
const agreedToTerms = ref(false)
const paymentMethod = ref('points')

// 计算属性
const remainingPoints = computed(() => {
    return userPoints.value - (model.value?.points || 0)
})

const canPurchase = computed(() => {
    return (
        model.value &&
        remainingPoints.value >= 0 &&
        agreedToTerms.value &&
        paymentMethod.value === 'points'
    )
})

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
            description: `这是一个高质量的3D角色模型，具有精美的纹理和细节。经过专业团队精心设计和优化，适用于各种游戏场景。模型包含完整的骨骼绑定和动画支持，材质贴图精细，光影效果出色。`,
            imageUrl: `https://picsum.photos/400/300?random=${id}`,
            points: Math.floor(Math.random() * 800) + 200,
            faction: Math.random() > 0.5 ? '1' : '2',
            tags: ['角色模型', '高质量', '游戏专用'],
            rating: Math.floor(Math.random() * 2) + 4,
            downloadCount: Math.floor(Math.random() * 5000) + 1000,
            polygons: Math.floor(Math.random() * 20000) + 10000,
            textureSize: '2048x2048',
            format: '.fbx, .obj, .blend',
            fileSize: `${(Math.random() * 20 + 5).toFixed(1)} MB`,
        }

        model.value = mockModel
    } catch (error) {
        console.error('获取模型详情失败:', error)
        message.error('获取模型详情失败')
    }
}

// 事件处理
const goBack = () => {
    const modelId = route.params.id
    router.push(`/shop/preview/${modelId}`)
}

const handlePurchase = async () => {
    if (!model.value || !canPurchase.value) return

    purchasing.value = true
    try {
        // TODO: 调用购买API
        // await api.purchaseModel({
        //   modelId: model.value.id,
        //   paymentMethod: paymentMethod.value,
        //   points: model.value.points
        // })

        // 模拟购买过程
        await new Promise(resolve => setTimeout(resolve, 2000))

        // 更新用户积分
        userPoints.value -= model.value.points

        // 显示成功对话框
        showSuccessModal.value = true

        message.success('购买成功！')
    } catch (error) {
        console.error('购买失败:', error)
        message.error('购买失败，请重试')
    } finally {
        purchasing.value = false
    }
}

const getPurchaseButtonText = () => {
    if (!model.value) return '加载中...'
    if (remainingPoints.value < 0) return '积分不足'
    if (!agreedToTerms.value) return '请先同意购买协议'
    if (purchasing.value) return '正在购买...'
    return `确认购买 (${model.value.points} 积分)`
}

const goToSignIn = () => {
    router.push('/registration')
}

const goToHistory = () => {
    showSuccessModal.value = false
    router.push('/shop/history')
}

const continueShopping = () => {
    showSuccessModal.value = false
    router.push('/shop')
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
.shop-purchase-page {
    min-height: 100vh;
    padding-bottom: 2rem;
}

.purchase-card,
.loading-card {
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

.model-card {
    transition: all 0.3s ease;
}

.model-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.purchase-summary {
    background: linear-gradient(135deg, #eff6ff, #dbeafe);
    border: 1px solid #bfdbfe;
}

.insufficient-points-warning {
    animation: shake 0.5s ease-in-out;
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-5px);
    }

    75% {
        transform: translateX(5px);
    }
}

.purchase-btn {
    background: linear-gradient(135deg, #10b981, #059669);
    border: none;
    font-weight: 600;
    height: 48px;
    font-size: 16px;
}

.purchase-btn:disabled {
    background: #9ca3af;
    opacity: 0.6;
}

.cancel-btn {
    background: rgba(107, 114, 128, 0.1);
    border: 1px solid #d1d5db;
    height: 48px;
    font-size: 16px;
}

.payment-option {
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    background: #f9fafb;
    transition: all 0.3s ease;
}

.payment-option:hover {
    background: #f3f4f6;
    border-color: #d1d5db;
}

.success-modal-card {
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

.success-icon {
    animation: successPulse 1s ease-in-out;
}

@keyframes successPulse {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

.back-btn {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

:deep(.n-checkbox) {
    align-items: flex-start;
}

:deep(.n-radio-group) {
    width: 100%;
}

:deep(.n-radio) {
    width: 100%;
    margin-bottom: 8px;
}
</style>
