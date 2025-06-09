<template>
  <div class="flex flex-col items-center justify-center w-full h-full pt-[60px] pb-16">
    <div class="fixed inset-0 w-full h-full">
      <div class="pointer-events-none absolute inset-0">
        <video
          src="../assets/bg/YokaiSecret.mp4"
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
    <div class="grid-containerSearch mt-4 py-[24px]">
      <n-grid cols="5 xs:1 s:1 m:2 l:5 " x-gap="24" y-gap="24" responsive="screen">
        <n-grid-item>
          <n-input v-model:value="searchQuery" placeholder="搜索模型名称、积分、价格" />
        </n-grid-item>
        <n-grid-item>
          <n-select v-model:value="selectedTag" :options="tags" placeholder="选择标签" />
        </n-grid-item>
        <n-grid-item>
          <n-radio-group v-model:value="selectedFaction" name="factionGroup">
            <n-radio value="1">T</n-radio>
            <n-radio value="2">CT</n-radio>
            <n-radio value="">全部</n-radio>
          </n-radio-group>
        </n-grid-item>
        <n-grid-item>
          <n-button @click="filterModels" type="info">搜索</n-button>
        </n-grid-item>
        <n-grid-item>
          <n-button @click="togglePriceSort" type="primary">
            {{ sortDirection === 'desc' ? '按价格排序 (低→高)' : '按价格排序 (高→低)' }}
          </n-button>
        </n-grid-item>
      </n-grid>
    </div>

    <div class="grid-container mt-4">
      <n-spin :show="loading" tip="加载模型数据中...">
        <n-grid cols="4 xs:2 s:2 m:3 l:4 " x-gap="16" y-gap="16" responsive="screen">
          <n-grid-item v-for="model in filteredModels" :key="model.modelId">
            <n-card>
            <template #header>
              <n-ellipsis>
                {{ model.modelName }}
              </n-ellipsis>
            </template>
            <n-image
              :src="model.previewUrl"
              :alt="model.modelName"
              width="100%"
              height="200px"
              fit="cover"
              @click="showImage(model.previewUrl)"
            />
            <p>积分: {{ model.price }}</p>
            <p>阵营: {{ model.faction === '1' ? 'T' : 'CT' }}</p>
            <p>
              皮肤种类:
              <n-tag :color="{ color: '#fff59d', textColor: '#f57f17', borderColor: '#f57f17' }" round :bordered="false" class="!mr-[4px]">
                HLYM
              </n-tag>
              <n-tag   class="!mr-[4px]" :type="tagsType(model.groupType)" round :bordered="false">
                {{tagTransform(model.groupType)}}
              </n-tag>
            </p>
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
.grid-container {
  max-width: 1280px;
  margin: 0 auto;
  overflow-x: hidden; /* 防止横向滚动条 */
  padding: 0 8px;
}
.grid-containerSearch {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  overflow-x: hidden; /* 防止横向滚动条 */
  padding: 12px 8px;
}
.home-grass {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0.6), #f5f5f5);
}
</style>
<style>
.pointer-events-none {
  pointer-events: none;
}
</style>
