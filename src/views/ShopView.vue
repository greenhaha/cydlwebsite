<template>
    <div class="shop-container w-full min-h-screen !pt-[70px] pb-16">
        <!-- 背景视频 -->
        <div class="fixed inset-0 w-full h-full -z-10">
            <div class="pointer-events-none absolute inset-0">
                <video src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/video/bg/YokaiSecret.mp4"
                    muted autoplay="true"
                    class="w-full h-full bg-cover bg-center min-w-full min-h-full object-cover globalVideo" loop="true"
                    preload="metadata" transition="all duration-100 cubic-bezier(.4,0,.2,1)"></video>
            </div>
        </div>
        <div class="home-grass pointer-events-none fixed inset-0 -z-10"></div>

        <div class="flex justify-center flex-col items-center relative z-10">
            <!-- 用户积分展示 -->
            <div class="user-points-section w-full max-w-[1280px] mx-auto px-4 !mb-6 z-20 relative">
                <div
                    class="points-card p-4 rounded-2xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-xl">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div
                                class="points-icon w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                <n-icon size="24" color="white">
                                    <DiamondOutline />
                                </n-icon>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-800">我的积分</h3>
                                <p class="text-2xl font-bold text-blue-600">{{ shopStore.getFormattedPoints() }}</p>
                            </div>
                        </div>
                        <div class="flex space-x-3">
                            <n-button type="primary" @click="$router.push('/shop/history')" class="points-button">
                                购买历史
                            </n-button>
                            <div class="w-3" />
                            <n-button type="info" @click="refreshPoints" :loading="isRefreshing" class="points-button">
                                刷新积分
                            </n-button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 商城导航 -->
            <div class="shop-nav w-full max-w-[1280px] mx-auto px-4 !mb-8 z-20 relative">
                <div class="nav-card p-4 rounded-2xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-xl">
                    <n-tabs v-model:value="activeTab" type="line" size="large" @update:value="handleTabChange">
                        <n-tab-pane name="models" tab="模型商城"></n-tab-pane>
                        <n-tab-pane name="history" tab="购买历史"></n-tab-pane>
                    </n-tabs>
                </div>
            </div>

            <!-- 主内容区域 -->
            <div class="shop-content w-full max-w-[1280px] mx-auto px-4 z-20 relative">
                <router-view v-slot="{ Component, route }">
                    <Suspense>
                        <template #default>
                            <keep-alive>
                                <component v-if="Component" :is="Component" :key="route.fullPath" />
                                <div v-else class="flex flex-col items-center justify-center p-8 min-h-[400px]">
                                    <n-spin size="large" />
                                    <p class="mt-4 text-gray-600">加载组件中...</p>
                                </div>
                            </keep-alive>
                        </template>
                        <template #fallback>
                            <div class="flex flex-col items-center justify-center p-8 min-h-[400px]">
                                <n-spin size="large" />
                                <p class="mt-4 text-gray-600">组件加载中...</p>
                            </div>
                        </template>
                    </Suspense>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DiamondOutline } from '@vicons/ionicons5'
import { NButton, NIcon, NSpin, NTabPane, NTabs } from 'naive-ui'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useShopStore } from '@/stores/shop'

const route = useRoute()
const router = useRouter()
const shopStore = useShopStore()

const isRefreshing = ref(false)
const activeTab = ref('models')

// 获取用户积分
const fetchUserPoints = async () => {
    try {
        // TODO: 调用API获取用户积分
        // const response = await api.getUserPoints()
        // shopStore.updateUserPoints(response.data.points)

        // 模拟数据
        shopStore.updateUserPoints(1250)
    } catch (error) {
        console.error('获取用户积分失败:', error)
    }
}

// 刷新积分
const refreshPoints = async () => {
    isRefreshing.value = true
    try {
        await fetchUserPoints()
    } finally {
        isRefreshing.value = false
    }
}

// 处理标签切换 - 添加错误处理
const handleTabChange = (value: string) => {
    try {
        if (value === 'models') {
            router.push('/shop/models').catch(err => {
                console.error('Navigation to models error:', err)
                // 尝试重新导航
                setTimeout(() => {
                    router.push('/shop/models').catch(() => {
                        console.error('Second navigation attempt failed')
                    })
                }, 100)
            })
        } else if (value === 'history') {
            router.push('/shop/history').catch(err => {
                console.error('Navigation to history error:', err)
                // 尝试重新导航
                setTimeout(() => {
                    router.push('/shop/history').catch(() => {
                        console.error('Second navigation attempt failed')
                    })
                }, 100)
            })
        }
    } catch (error) {
        console.error('Tab change error:', error)
        // 重置为默认标签
        activeTab.value = 'models'
    }
}

// 根据路由更新活动标签
const updateActiveTab = () => {
    try {
        const routeName = route.name as string
        const routePath = route.path

        if (routeName === 'shop-history' || routePath.includes('/shop/history')) {
            activeTab.value = 'history'
        } else if (routeName === 'shop-models' || routePath.includes('/shop/models') ||
            routeName === 'shop-preview' || routeName === 'shop-purchase' ||
            routePath.startsWith('/shop')) {
            activeTab.value = 'models'
        }
    } catch (error) {
        console.error('Update active tab error:', error)
        activeTab.value = 'models' // 默认值
    }
}

// 监听路由变化
watch(() => route.name, updateActiveTab, { immediate: true })
watch(() => route.path, updateActiveTab, { immediate: true })

onMounted(() => {
    fetchUserPoints()
    updateActiveTab()
})
</script>

<style scoped>
.shop-container {
    background: transparent;
    position: relative;
}

.points-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.nav-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.points-button {
    font-weight: 500;
}

.home-grass {
    background: linear-gradient(to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.1) 50%,
            rgba(0, 0, 0, 0.3) 100%);
}

:deep(.n-tabs-nav) {
    border-bottom: 2px solid #e5e7eb;
}

:deep(.n-tabs-tab) {
    font-weight: 500;
    font-size: 16px;
}

:deep(.n-tabs-tab--active) {
    color: #2563eb;
}
</style>
