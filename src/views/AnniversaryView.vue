<template>
  <div class="anniversary-page">
    <!-- 专属背景 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" 
           style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cs2bg1.png')">
      </div>
      <div class="home-grass pointer-events-none fixed inset-0 z-0"></div>
    </div>

    <!-- 主内容区域 -->
    <div class="anniversary-content inset-0 h-full top-[0px] z-10 flex flex-col items-center justify-start pt-[80px] pb-8">
      <!-- 顶部导航 -->
      <div class="fixed top-0 left-0 right-0 z-30 bg-black/60 backdrop-blur-md border-b border-white/20">
        <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <RouterLink 
            to="/"
            class="inline-flex items-center px-4 py-2 text-white/90 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/20 bg-black/30"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            返回主页
          </RouterLink>
        </div>
      </div>

      <!-- 大气标题设计 -->
      <div class="page-header w-full max-w-[1280px] px-4 mb-8 z-20 text-center">
        <!-- 背景装饰 -->
        <div class="relative mb-8">
          
          <!-- 主标题容器 -->
          <div class="relative z-10">
            <!-- 顶部装饰线 -->
            <div class="flex items-center justify-center mb-6">
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-24"></div>
              <div class="mx-3 w-2 h-2 bg-white/60 rounded-full"></div>
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-24"></div>
            </div>
            
            <!-- 主标题 -->
            <div class="mb-4 relative text-center">
              <h1 class="text-[36px] md:text-[48px] lg:text-[56px] font-black text-white mb-3 tracking-tight leading-none drop-shadow-2xl text-shadow-lg">
                周年庆典
              </h1>
            </div>
            
            <!-- 副标题 -->
            <h2 class="text-[16px] md:text-[20px] lg:text-[24px] font-medium text-white/95 mb-6 tracking-wide text-center drop-shadow-lg text-shadow">
              感恩相伴 · 共创辉煌 · 未来可期
            </h2>
            
            <!-- 底部装饰线 -->
            <div class="flex items-center justify-center">
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-32"></div>
              <div class="mx-3 w-1.5 h-1.5 bg-white/60 rounded-full"></div>
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-32"></div>
            </div>
          </div>
        </div>
        
        <!-- 描述文字 -->
        <div class="backdrop-blur-lg bg-black/50 rounded-lg p-4 border border-white/30 shadow-2xl flex justify-center !mb-4">
          <p class="w-full text-center text-[14px] md:text-[16px] text-white leading-relaxed max-w-lg mx-auto text-center drop-shadow-lg text-shadow">
            感谢每一位玩家的陪伴，让我们一起庆祝这特殊的时刻！
          </p>
        </div>
      </div>

      <!-- 快捷按钮区域 -->
      <div class="actions-section w-full max-w-[800px] px-4 !mb-8 z-20">
        <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <RouterLink 
            to="/lottery"
            class="inline-flex items-center px-6 py-3 backdrop-blur-lg bg-black/40 border border-white/30 text-white text-base font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-xl text-shadow"
          >
            <span class="mr-2 text-lg">🎰</span>
            立即抽奖
          </RouterLink>
          <RouterLink 
            to="/challenge"
            class="inline-flex items-center px-6 py-3 backdrop-blur-lg bg-black/40 border border-white/30 text-white text-base font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-xl text-shadow"
          >
            <span class="mr-2 text-lg">🏆</span>
            参与挑战
          </RouterLink>
        </div>
      </div>

      <!-- 特色功能区域 -->
      <div class="features-section w-full max-w-[800px] px-4 mb-8 z-20 text-center">
        <div class="text-center !mb-6">
          <h3 class="text-[20px] md:text-[24px] font-bold text-white mb-2 drop-shadow-2xl text-shadow-lg">
            庆典特色
          </h3>
          <p class="text-[14px] md:text-[16px] text-white/80  mx-auto text-center drop-shadow-2xl text-shadow-lg">
            专为周年庆打造的精彩内容
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="feature-card p-4 rounded-lg backdrop-blur-lg bg-white/95 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div class="text-center">
              <div class="text-4xl mb-4">🎁</div>
              <h4 class="text-xl font-bold text-gray-900 mb-2">限时抽奖</h4>
              <p class="text-gray-600 mb-4">每日免费抽奖机会，稀有奖品等你拿</p>
              <RouterLink to="/lottery" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-400 to-red-500 text-white text-sm font-semibold rounded-lg hover:scale-105 transition-transform">
                参与抽奖
              </RouterLink>
            </div>
          </div>
          
          <div class="feature-card p-6 rounded-xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div class="text-center">
              <div class="text-4xl mb-4">🏆</div>
              <h4 class="text-xl font-bold text-gray-900 mb-2">全服挑战</h4>
              <p class="text-gray-600 mb-4">携手完成社区目标，解锁专属奖励</p>
              <RouterLink to="/challenge" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-sm font-semibold rounded-lg hover:scale-105 transition-transform">
                参与挑战
              </RouterLink>
            </div>
          </div>
          
          <div class="feature-card p-6 rounded-xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div class="text-center">
              <div class="text-4xl mb-4">🎉</div>
              <h4 class="text-xl font-bold text-gray-900 mb-2">周年礼包</h4>
              <p class="text-gray-600 mb-4">登录即送纪念礼包，感谢一路相伴</p>
              <RouterLink to="/gift" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-semibold rounded-lg hover:scale-105 transition-transform">
                领取礼包
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- 庆典数据区域 -->
      <div class="stats-section w-full max-w-[1280px] px-4 mb-12 z-20">
        <div class="text-center mb-8">
          <h3 class="text-[24px] md:text-[32px] font-bold text-white mb-4 text-shadow-lg">
            庆典数据
          </h3>
          <p class="text-[16px] md:text-[18px] text-white/90 text-shadow  mx-auto w-full text-center">
            见证社区的成长与活力
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 !mt-4">
          <div class="stat-card p-6 rounded-xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-2xl text-center">
            <div class="text-3xl mb-3">👥</div>
            <div class="text-2xl font-bold text-gray-900 mb-2">15,847</div>
            <div class="text-gray-600">累计玩家</div>
          </div>
          
          <div class="stat-card p-6 rounded-xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-2xl text-center">
            <div class="text-3xl mb-3">🎮</div>
            <div class="text-2xl font-bold text-gray-900 mb-2">89,423</div>
            <div class="text-gray-600">总游戏场次</div>
          </div>
          
          <div class="stat-card p-6 rounded-xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-2xl text-center">
            <div class="text-3xl mb-3">🏆</div>
            <div class="text-2xl font-bold text-gray-900 mb-2">3,256</div>
            <div class="text-gray-600">奖品发放数</div>
          </div>
          
          <div class="stat-card p-6 rounded-xl backdrop-blur-lg bg-white/95 border border-gray-200/60 shadow-2xl text-center">
            <div class="text-3xl mb-3">⭐</div>
            <div class="text-2xl font-bold text-gray-900 mb-2">9.8</div>
            <div class="text-gray-600">社区评分</div>
          </div>
        </div>
      </div>

      <!-- 底部信息栏 -->
      <div class="footer-info w-full max-w-[1280px] px-4 z-20 !mt-8">
        <div class="text-center p-6 rounded-xl backdrop-blur-lg bg-black/20 border border-white/20">
          <p class="text-white/90 text-shadow mb-2">
            🎊 感谢所有玩家的支持与陪伴 🎊
          </p>
          <p class="text-white/70 text-sm text-shadow">
            活动时间有限，精彩不容错过！
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.anniversary-page {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.anniversary-content {
  position: relative;
  min-height: 100vh;
}

.globalVideo {
  filter: brightness(0.4);
}

.home-grass {
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><radialGradient id="grad1" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:rgba(0,100,200,0.05);stop-opacity:1" /><stop offset="100%" style="stop-color:rgba(0,50,150,0.1);stop-opacity:0" /></radialGradient></defs><rect width="100" height="100" fill="url(%23grad1)" /></svg>') center/cover;
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.text-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
}

.text-shadow-sm {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.feature-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover {
  transform: translateY(-4px);
}

.stat-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card:hover {
  transform: translateY(-2px);
}
.home-grass {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0.2), #f5f5f5);
}
</style>