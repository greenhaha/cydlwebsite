<template>
  <div class="feature-card group" @click="handleClick">
    <div class="card-wrapper relative bg-white border border-gray-200 rounded-2xl p-8 h-full transition-all duration-200 hover:shadow-md hover:border-blue-300 cursor-pointer">
      <!-- 徽章 -->
      <div v-if="feature.badge" class="absolute -top-2 -right-2 z-10">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 shadow-sm">
          {{ feature.badge }}
        </span>
      </div>

      <!-- 图标区域 -->
      <div class="text-center mb-6">
        <div class="inline-flex items-center justify-center w-18 h-18 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 mb-5 group-hover:scale-110 transition-transform duration-200">
          <span class="text-4xl">{{ feature.icon }}</span>
        </div>
        <h4 class="text-xl font-bold text-gray-900 mb-3">{{ feature.title }}</h4>
        <p class="text-gray-600 text-sm leading-relaxed">{{ feature.subtitle }}</p>
      </div>

      <!-- 按钮 -->
      <div class="mt-8 text-center">
        <button class="w-full inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md">
          {{ feature.buttonText }}
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

// Props 定义
interface FeatureItem {
  id: string
  icon: string
  title: string
  subtitle: string
  buttonText: string
  route?: string
  action?: () => void
  badge?: string
  priority?: number
}

const props = defineProps<{
  feature: FeatureItem
}>()

// Emits 定义
const emit = defineEmits<{
  click: [feature: FeatureItem]
}>()

const router = useRouter()

// 处理点击事件
const handleClick = () => {
  emit('click', props.feature)
  
  if (props.feature.route) {
    router.push(props.feature.route)
  } else if (props.feature.action) {
    props.feature.action()
  }
}
</script>

<style scoped>
.feature-card {
  height: 100%;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 280px;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .card-wrapper {
    min-height: 260px;
    padding: 1.5rem;
  }
  
  .text-xl {
    font-size: 1.125rem;
  }
  
  .text-4xl {
    font-size: 2.5rem;
  }
  
  .mb-6 {
    margin-bottom: 1.25rem;
  }
  
  .mb-5 {
    margin-bottom: 1rem;
  }
  
  .mb-3 {
    margin-bottom: 0.75rem;
  }
  
  .mt-8 {
    margin-top: 1.5rem;
  }
  
  .w-18 {
    width: 4rem;
  }
  
  .h-18 {
    height: 4rem;
  }
}

@media (max-width: 640px) {
  .card-wrapper {
    min-height: 240px;
    padding: 1.25rem;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
  
  .mb-6 {
    margin-bottom: 1rem;
  }
  
  .mb-5 {
    margin-bottom: 0.75rem;
  }
  
  .mt-8 {
    margin-top: 1.25rem;
  }
}
</style>