<script setup lang="ts"></script>

<template>
  <div class="absolute inset-0 w-full h-full">
    <div class="pointer-events-none absolute inset-0">
      <video
        src="../assets/bg/hecheng1.mp4"
        muted
        autoplay="true"
        class="w-full h-full bg-cover bg-center min-w-full min-h-full object-cover globalVideo"
        loop="true"
        preload="metadata"
        transition="all duration-100 cubic-bezier(.4,0,.2,1)"
      ></video>
    </div>
  </div>
  <div class="home-grass pointer-events-none absolute inset-0 z-0"></div>
  <div class="absolute inset-0 h-full top-[0px] z-0 flex flex-col items-center justify-center">
    <n-h1 class="text-[48px]">HLYM CS2 社区服务器</n-h1>
    <n-h5 class="text-[24px]">面向所有CS2玩家的公益服务器，所有内容均免费！</n-h5>
    <div class="flex flex-wrap justify-center mt-4 w-full pt-20">
      <n-card hoverable>
        <template #header>
          <!-- 在这里通过render函数自定义title -->
          <ServerIcon class="w-[24px] h-[24px] text-blue-500" />
          <span>免费公益</span>
        </template>
        包括积分、玩家皮肤在内的所有功能完全免费，永不收费
      </n-card>
      <n-card hoverable class="card-midle1">
        <template #header>
          <!-- 在这里通过render函数自定义title -->
          <GameIcon class="w-[24px] h-[24px] text-blue-500" />
          <span>丰富玩法</span>
        </template>
        主打MG娱乐对抗，内置40多张精选小游戏地图
      </n-card>
      <n-card hoverable class="card-midle">
        <template #header>
          <!-- 在这里通过render函数自定义title -->
          <ShirtIcon class="w-[24px] h-[24px] text-blue-500" />
          <span>个性装扮</span>
        </template>
        多余款精美模型，部分模型支持自定义换肤
      </n-card>
      <n-card hoverable>
        <template #header>
          <!-- 在这里通过render函数自定义title -->
          <WechatIcon class="w-[24px] h-[24px] text-blue-500" />
          <span>活跃社区</span>
        </template>
        加入QQ群，获取更多游戏攻略和玩家交流
      </n-card>
    </div>
    <div class="flex flex-wrap justify-around mt-4 w-full pt-10">
      <div>
        <div class="text-[24px] font-bold">游戏地图</div>
        <div class="text-[20px] text-center">40 +</div>
      </div>
      <div>
        <div class="text-[24px] font-bold">人物模型</div>
        <div class="text-[20px] text-center">90 +</div>
      </div>
      <div>
        <div class="text-[24px] font-bold">自定义内容</div>
        <div class="text-[20px] text-center">10 +</div>
      </div>
    </div>
    <div class="mt-4 w-full pt-20">
      <div class="text-[24px] w-full text-center">立即加入我们</div>
      <div class="text-[18px] w-full text-center">
        点击上方的"服务器状态"按钮来查询服务器并加入游戏
      </div>
    </div>

    <div>
      <a
        href="https://qm.qq.com/cgi-bin/qm/qr?k=Sh4gcapxVV57FqXxe7ZU07-v9u8YvKVN&jump_from=webapi&authKey=HiFkDO97IWzVgJEO6SWn59U3r7vJPEfvGNq8+Y4RVgOHFRN8+CB9WhpjYJmRvyky"
        target="_blank"
        rel="noopener noreferrer"
        ><n-button type="info" to="/server" class="mt-4">
          <ShareIcon class="w-[18px] h-[18px] text-[white]" /> 加入QQ群 黄粱一梦CS2社区
        </n-button></a
      >
    </div>
  </div>
</template>

<style scoped>
.home-grass {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0.4), #f5f5f5);
}
.n-card {
  max-width: 300px;
}
.card-midle1 {
  margin-left: 20px;
}
.card-midle {
  margin: 0 20px;
}
</style>
<script lang="ts">
import { NCard, NButton } from 'naive-ui'
import { defineComponent } from 'vue'
import {
  Server as ServerIcon,
  GameController as GameIcon,
  Shirt as ShirtIcon,
  LogoWechat as WechatIcon,
  ShareSocial as ShareIcon,
} from '@vicons/ionicons5'

export default defineComponent({
  components: {
    NCard,
    NButton,
    ServerIcon,
    GameIcon,
    ShirtIcon,
    WechatIcon,
    ShareIcon,
  },
})
</script>
