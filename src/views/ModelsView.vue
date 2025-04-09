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
      <n-grid cols="4 xs:1 s:1 m:1 l:4 " x-gap="24" y-gap="24" responsive="screen">
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
      </n-grid>
    </div>

    <div class="grid-container mt-4">
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
              标签:
              <n-tag v-for="tag in model.tags" :key="tag" class="!mr-[4px]" :type="tagsType(tag)">
                {{ tag }}
              </n-tag>
            </p>
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
} from 'naive-ui'
import { computed, defineComponent, ref } from 'vue'
import { modelList } from '../const/const'

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
    const searchQuery = ref('')
    const selectedTag = ref('')
    const selectedFaction = ref('')
    const dialogVisible = ref(false)
    const dialogImage = ref('')
    const filteredModels = ref([...modelList]) // 存储筛选后的模型数据

    const tags = computed(() => {
      const allTags = new Set<string>()
      modelList.forEach((model) => model.tags.forEach((tag) => allTags.add(tag)))
      return Array.from(allTags).map((tag) => ({ label: tag, value: tag, type: 'default' }))
    })
    const tagsType = (tag: string) => {
      if (tag === '捐赠') return 'info'
      if (tag === 'hlym转模') return 'warning'
      if (tag === '个人专属') return 'error'
      if (tag === '专属模型') return 'success'
      return 'default'
    }
    const filterModels = () => {
      const query = searchQuery.value.toLowerCase()
      console.log('searchQuery:', searchQuery.value)
      filteredModels.value = modelList.filter((model) => {
        const matchesName = model.modelName.toLowerCase().includes(query)
        const matchesPoints = model.price.toString().includes(query)
        const matchesTag = selectedTag.value ? model.tags.includes(selectedTag.value) : true
        const matchesFaction =
          selectedFaction.value === '' || model.faction === selectedFaction.value
        return (matchesName || matchesPoints) && matchesTag && matchesFaction
      })
    }

    const showImage = (url: string) => {
      dialogImage.value = url
      dialogVisible.value = true
    }

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
