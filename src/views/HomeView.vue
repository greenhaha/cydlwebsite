

<template>
  <div class="home-page">
    <!-- 背景视频 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="pointer-events-none absolute inset-0">
        <video
          src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/video/bg/hecheng1.mp4"
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

    <!-- 主内容区域 -->
    <div class="home-content inset-0 h-full top-[0px] z-10 flex flex-col items-center justify-center pb-16">
      <!-- 英雄区域 -->
      <div class="hero-section !mt-24 z-20 text-center px-4 flex flex-col items-center justify-center">
        <div class="hero-title-wrapper mb-6">
          <n-h1 class="hero-title text-center !text-[42px] md:!text-[52px] font-bold text-white mb-4 text-shadow-lg">
            HLYM CS2 社区服务器
          </n-h1>
          <div class="hero-subtitle-wrapper">
            <n-h5 class="hero-subtitle text-center text-lg md:text-xl text-white/95 max-w-3xl mx-auto text-shadow">
              面向所有CS2玩家的公益服务器，所有内容均免费！
            </n-h5>
          </div>
        </div>
        <div class="hero-accent h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-8"></div>
      </div>

      <!-- 特性卡片区域 -->
      <div class="features-section flex flex-wrap justify-center mt-4 w-full pt-16 max-w-[1200px] px-4">
        <n-grid cols="4 xs:2 s:2 m:4 l:4 " x-gap="24" y-gap="24" responsive="screen">
          <n-grid-item>
            <n-card class="feature-card h-full backdrop-blur-lg bg-blue-50/90 border border-blue-200/60 hover:bg-blue-100/95 transition-all duration-300 hover:scale-105 hover:shadow-2xl" hoverable>
              <template #header>
                <div class="feature-header flex items-center gap-3 min-h-[48px]">
                  <div class="feature-icon-wrapper p-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg">
                    <ServerIcon class="w-[20px] h-[20px] text-white" />
                  </div>
                  <span class="feature-title text-blue-800 font-semibold">免费公益</span>
                </div>
              </template>
              <div class="feature-content text-blue-700 leading-relaxed min-h-[60px] flex items-center">
                包括积分、玩家皮肤在内的所有功能完全免费，永不收费
              </div>
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card class="feature-card h-full backdrop-blur-lg bg-emerald-50/90 border border-emerald-200/60 hover:bg-emerald-100/95 transition-all duration-300 hover:scale-105 hover:shadow-2xl" hoverable>
              <template #header>
                <div class="feature-header flex items-center gap-3 min-h-[48px]">
                  <div class="feature-icon-wrapper p-2 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg">
                    <GameIcon class="w-[20px] h-[20px] text-white" />
                  </div>
                  <span class="feature-title text-emerald-800 font-semibold">丰富玩法</span>
                </div>
              </template>
              <div class="feature-content text-emerald-700 leading-relaxed min-h-[60px] flex items-center">
                主打MG娱乐对抗，内置40多张精选小游戏地图
              </div>
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card class="feature-card h-full backdrop-blur-lg bg-violet-50/90 border border-violet-200/60 hover:bg-violet-100/95 transition-all duration-300 hover:scale-105 hover:shadow-2xl" hoverable>
              <template #header>
                <div class="feature-header flex items-center gap-3 min-h-[48px]">
                  <div class="feature-icon-wrapper p-2 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg">
                    <ShirtIcon class="w-[20px] h-[20px] text-white" />
                  </div>
                  <span class="feature-title text-violet-800 font-semibold">个性装扮</span>
                </div>
              </template>
              <div class="feature-content text-violet-700 leading-relaxed min-h-[60px] flex items-center">
                多余款精美模型，部分模型支持自定义换肤
              </div>
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card class="feature-card h-full backdrop-blur-lg bg-orange-50/90 border border-orange-200/60 hover:bg-orange-100/95 transition-all duration-300 hover:scale-105 hover:shadow-2xl" hoverable>
              <template #header>
                <div class="feature-header flex items-center gap-3 min-h-[48px]">
                  <div class="feature-icon-wrapper p-2 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg">
                    <WechatIcon class="w-[20px] h-[20px] text-white" />
                  </div>
                  <span class="feature-title text-orange-800 font-semibold">活跃社区</span>
                </div>
              </template>
              <div class="feature-content text-orange-700 leading-relaxed min-h-[60px] flex items-center">
                加入QQ群，获取更多游戏攻略和玩家交流
              </div>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>
      <!-- 统计数据区域 -->
      <div class="stats-section flex flex-wrap justify-around mt-4 w-full pt-24 max-w-[1200px] z-20 px-4">
        <n-grid cols="4 xs:3 s:3 m:3 l:3 " x-gap="24" y-gap="24" responsive="screen">
          <n-grid-item>
            <div class="stat-card text-center p-6 rounded-xl backdrop-blur-lg bg-gray-50/95 border border-gray-200/60 hover:bg-gray-100/95 transition-all duration-300 h-full flex flex-col justify-center">
              <div class="stat-number text-[28px] md:text-[32px] font-bold text-blue-600 mb-2">80+</div>
              <div class="stat-label text-[18px] md:text-[20px] font-semibold text-gray-700">游戏地图</div>
            </div>
          </n-grid-item>
          <n-grid-item>
            <div class="stat-card text-center p-6 rounded-xl backdrop-blur-lg bg-gray-50/95 border border-gray-200/60 hover:bg-gray-100/95 transition-all duration-300 h-full flex flex-col justify-center">
              <div class="stat-number text-[28px] md:text-[32px] font-bold text-emerald-600 mb-2">90+</div>
              <div class="stat-label text-[18px] md:text-[20px] font-semibold text-gray-700">人物模型</div>
            </div>
          </n-grid-item>
          <n-grid-item>
            <div class="stat-card text-center p-6 rounded-xl backdrop-blur-lg bg-gray-50/95 border border-gray-200/60 hover:bg-gray-100/95 transition-all duration-300 h-full flex flex-col justify-center">
              <div class="stat-number text-[28px] md:text-[32px] font-bold text-violet-600 mb-2">10+</div>
              <div class="stat-label text-[18px] md:text-[20px] font-semibold text-gray-700">自定义内容</div>
            </div>
          </n-grid-item>
        </n-grid>
      </div>

      <!-- 行动召唤区域 -->
      <div class="cta-section mt-4 w-full pt-24 max-w-[1200px] z-20 text-center px-4 ">
        <div class="cta-card p-8 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-white/95 to-gray-50/95 border border-gray-200/60 mx-auto max-w-2xl shadow-2xl">
          <h3 class="cta-title text-[26px] md:text-[30px] font-bold w-full text-center text-gray-800 mb-4">
            立即加入我们
          </h3>
          <p class="cta-description text-[16px] md:text-[18px] w-full text-center text-gray-600 mb-8 leading-relaxed">
            点击上方的"服务器状态"按钮来查询服务器并加入游戏
          </p>
          <n-button
            type="primary"
            size="large"
            class="cta-button bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            @click="goToQQGroup"
          >
            <ShareIcon class="w-[18px] h-[18px] text-white mr-2" />
            加入QQ群 黄粱一梦CS2社区
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  position: relative;
  z-index: 0;
}

.home-grass {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0.4), #f5f5f5);
}

.pointer-events-none {
  pointer-events: none;
}

/* 英雄区域样式 */
.hero-title {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.text-shadow-sm {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.text-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* 特性卡片样式 */
.feature-card {
  max-width: 300px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-icon-wrapper {
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon-wrapper {
  transform: scale(1.1);
}

/* 统计卡片样式 */
.stat-card {
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

/* .stat-number 样式已通过Tailwind类处理 */

/* CTA 区域样式 */
.cta-card {
  transition: all 0.3s ease;
  margin: 0 auto;
}

.cta-card:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
}

.cta-button {
  transition: all 0.3s ease;
  font-weight: 600;
}

.cta-button:hover {
  transform: translateY(-2px);
}

/* 响应式优化 */
@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 1rem;
  }

  .features-section,
  .stats-section,
  .cta-section {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .feature-card,
  .stat-card {
    margin: 0 auto;
    min-height: 140px;
  }

  /* 移动端卡片高度统一 */
  .feature-card .n-card {
    height: 100%;
  }

  .feature-header {
    align-items: flex-start !important;
  }

  .feature-content {
    flex: 1;
    display: flex;
    align-items: center;
  }
}

/* 深色模式优化 */
@media (prefers-color-scheme: dark) {
  .feature-card,
  .stat-card,
  .cta-card {
    background: rgba(248, 250, 252, 0.95) !important;
    border: 1px solid rgba(226, 232, 240, 0.6) !important;
  }
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-section,
.features-section,
.stats-section,
.cta-section {
  animation: fadeInUp 0.8s ease-out;
}

.features-section {
  animation-delay: 0.2s;
}

.stats-section {
  animation-delay: 0.4s;
}

.cta-section {
  animation-delay: 0.6s;
}
</style>
<script lang="ts">
import {
  GameController as GameIcon,
  Server as ServerIcon,
  ShareSocial as ShareIcon,
  Shirt as ShirtIcon,
  LogoWechat as WechatIcon,
} from '@vicons/ionicons5'
import { NButton, NCard, NGrid, NGridItem, NH1, NH5 } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    NCard,
    NButton,
    ServerIcon,
    GameIcon,
    ShirtIcon,
    WechatIcon,
    ShareIcon,
    NGrid,
    NGridItem,
    NH1,
    NH5,
  },

  setup() {
    const goToQQGroup = () => {
      window.open('https://qm.qq.com/cgi-bin/qm/qr?k=Sh4gcapxVV57FqXxe7ZU07-v9u8YvKVN&jump_from=webapi&authKey=HiFkDO97IWzVgJEO6SWn59U3r7vJPEfvGNq8+Y4RVgOHFRN8+CB9WhpjYJmRvyky', '_blank')
    }
    return {
      goToQQGroup,
    }
  },
})
</script>
