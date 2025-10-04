<template>
  <div class="flex flex-col items-center justify-center w-full h-full pt-[60px] pb-16">
    <div class="fixed inset-0 w-full h-full">
      <div class="pointer-events-none absolute inset-0">
        <video
          src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/video/bg/giftbg.mp4"
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
    <div class="grid-container !mt-7 rounded-[4px]">
      <n-tabs type="segment" animated>
        <n-tab-pane name="chap1" tab="直播间" class="!p-4">
          <n-alert v-if="liveRooms.length === 0" type="info" title="通知">
    <n-marquee>
      <div style="margin-right: 64px">
        欢迎各位主播上架自己的直播间
      </div>
    </n-marquee>
  </n-alert>
          <div class="live-room-grid">

            <n-card
              v-for="room in liveRooms"
              :key="room.id"
              class="live-room-card"
              hoverable
              @click="goToLiveRoom(room.url)"
            >
              <n-image
                object-fit="contain"
                :src="room.cover"
                alt="直播间封面"
                class="live-room-cover"
              />
              <div class="live-room-info">
                <n-ellipsis line-clamp="2"
                  ><h3 class="live-room-title">{{ room.title }}</h3></n-ellipsis
                >
                <p class="live-room-author">{{ room.author }}</p>
              </div>
            </n-card>
          </div>
        </n-tab-pane>
        <n-tab-pane name="chap2" tab="礼物"> <n-alert v-if="liveRooms.length === 0" type="info" title="通知">
    <n-marquee>
      <div style="margin-right: 64px">
        礼物正在制作中 🎁
      </div>
    </n-marquee>
  </n-alert> </n-tab-pane>
        <n-tab-pane name="chap3" tab="更多" disabled> 更多内容正在制作中，敬请期待！ </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { NCard, NEllipsis, NImage, NTabPane, NTabs, NAlert, NMarquee } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    NTabs,
    NTabPane,
    NCard,
    NImage,
    NEllipsis,
    NAlert,
    NMarquee
  },
  setup() {
    const liveRooms: { id: number; title: string; author: string; cover: string; url: string }[] = [
      // {
      //   id: 1,
      //   title: '直播间标题1',
      //   author: '主播1',
      //   cover:
      //     'https://hlymmodelslist.oss-cn-beijing.aliyuncs.com/models/CT/saber_wedding_personal.png',
      //   url: 'https://live.bilibili.com/1',
      // },
      // {
      //   id: 2,
      //   title: '直播间标题2',
      //   author: '主播2',
      //   cover:
      //     'https://hlymmodelslist.oss-cn-beijing.aliyuncs.com/models/CT/saber_wedding_personal.png',
      //   url: 'https://live.bilibili.com/2',
      // },
      // 添加更多直播间数据
    ]
    const goToLiveRoom = (url: string) => {
      window.open(url, '_blank')
    }
    return { liveRooms, goToLiveRoom }
  },
})
</script>
<style scoped>
.grid-container {
  max-width: 1280px;
  width: 100%;

  margin: 0 auto;
  overflow-x: hidden; /* 防止横向滚动条 */
  position: relative;
  z-index: 10;
}
.grid-containerSearch {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  overflow-x: hidden; /* 防止横向滚动条 */
  padding: 4px;
}
.home-grass {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0.1), #f5f5f5);
}
.live-room-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 默认 5 列 */
  gap: 16px;
  overflow: visible; /* 确保子元素的放大效果不会被截取 */
}
@media (max-width: 768px) {
  .live-room-grid {
    grid-template-columns: repeat(2, 1fr); /* 小屏幕下 2 列 */
  }
}

.live-room-card {
  cursor: pointer;
  transition: transform 0.2s;
  overflow: visible; /* 确保放大效果不会被截取 */
  z-index: 1; /* 提升卡片的层级 */
  position: relative; /* 确保 z-index 生效 */
  padding: 0;
}

.live-room-card:hover {
  transform: scale(1.05);
  z-index: 10; /* 鼠标悬停时提升层级，避免被其他元素遮挡 */
}

.live-room-cover {
  width: 100%;
  height: 150px;
  object-fit: contain;
  border-radius: 8px;
}

.live-room-info {
  margin-top: 8px;
}

.live-room-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.live-room-author {
  font-size: 14px;
  color: #666;
  margin: 0;
}
</style>
