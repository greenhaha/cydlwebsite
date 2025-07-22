<template>
  <div class="anniversary-page">
    <!-- 专属背景 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat"
           style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cs2bg1.png')">
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
      <!-- 增加纹理遮罩提升对比度 -->
      <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <!-- 主内容区域 -->
    <div class="anniversary-content relative z-10 min-h-screen flex flex-col items-center pt-20 pb-16">
      <!-- 顶部导航 -->
      <div class="fixed top-0 left-0 right-0 z-30 bg-black/70 backdrop-blur-lg border-b border-orange-400/30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex justify-center">
            <RouterLink
              to="/"
              class="inline-flex items-center px-6 py-3 text-white hover:text-orange-400 transition-all duration-300 rounded-xl hover:bg-orange-500/20 bg-black/40 border border-orange-400/30 backdrop-blur-sm font-medium"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              返回主页
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- 页面标题区域 -->
      <div class="page-header w-full max-w-6xl mx-auto px-6 !mt-8 !mb-16 text-center">
        <!-- 主标题容器 - 增强背景 -->
        <div class="relative bg-black/60 backdrop-blur-xl rounded-3xl border-2 border-orange-400/40 !p-8 shadow-2xl">
          <!-- 装饰性光效 -->
          <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 animate-pulse"></div>

          <div class="relative z-10">
            <!-- 顶部装饰线 -->
            <div class="flex items-center justify-center !mb-6">
              <div class="h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent w-32 rounded-full"></div>
              <div class="mx-4 w-4 h-4 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50"></div>
              <div class="h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent w-32 rounded-full"></div>
            </div>

            <!-- 主标题 -->
            <div class="!mb-6">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-white !mb-4 tracking-tight leading-tight">
                <span class="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-2xl">
                  周年庆典
                </span>
              </h1>
              <div class="text-shadow-glow text-orange-400 text-lg font-medium !mb-2">ANNIVERSARY CELEBRATION</div>
            </div>

            <!-- 副标题 -->
            <h2 class="text-lg md:text-xl lg:text-2xl font-bold text-white/95 !mb-6 tracking-wide max-w-3xl mx-auto text-shadow-strong">
              感恩相伴 · 共创辉煌 · 未来可期
            </h2>

            <!-- 底部装饰线 -->
            <div class="flex items-center justify-center">
              <div class="h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent w-48 rounded-full"></div>
              <div class="mx-4 w-2 h-2 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50"></div>
              <div class="h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent w-48 rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- 描述文字 -->
        <div class="max-w-4xl mx-auto !mt-6">
          <div class="backdrop-blur-xl bg-black/60 rounded-2xl !p-6 border-2 border-white/30 shadow-2xl">
            <p class="text-lg md:text-xl text-white font-medium leading-relaxed text-shadow-strong">
              感谢每一位玩家的陪伴，让我们一起庆祝这特殊的时刻！
            </p>
          </div>
        </div>
      </div>

      <!-- 快捷按钮区域 -->
      <div class="actions-section w-full max-w-4xl mx-auto px-6 !mb-12">
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <RouterLink
            to="/lottery"
            class="game-btn-primary group"
          >
            <span class="!mr-3 text-xl group-hover:scale-110 transition-transform duration-300">🎰</span>
            立即抽奖
          </RouterLink>
          <RouterLink
            to="/challenge"
            class="game-btn-secondary group"
          >
            <span class="!mr-3 text-xl group-hover:scale-110 transition-transform duration-300">🏆</span>
            参与挑战
          </RouterLink>
        </div>
      </div>

      <!-- 特色功能区域 -->
      <div class="features-section w-full max-w-7xl mx-auto px-6 !mb-16">
        <div class="text-center !mb-12">
          <div class="game-section-header">
            <h3 class="game-section-title">庆典特色</h3>
            <div class="game-section-subtitle">FESTIVAL FEATURES</div>
            <p class="game-section-desc">专为周年庆打造的精彩内容</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- 限时抽奖 -->
          <div class="game-feature-card group lottery">
            <div class="feature-badge">HOT</div>
            <div class="text-center">
              <div class="feature-icon-container lottery">
                <div class="feature-icon">🎁</div>
              </div>
              <h4 class="feature-title">限时抽奖</h4>
              <div class="feature-subtitle">LOTTERY</div>
              <p class="feature-description">每日免费抽奖机会，稀有奖品等你拿</p>
              <RouterLink to="/lottery" class="feature-button lottery-btn">
                <span class="!mr-2">🎲</span>
                参与抽奖
              </RouterLink>
            </div>
          </div>

          <!-- 全服挑战 -->
          <div class="game-feature-card group challenge featured">
            <div class="feature-badge featured-badge">FEATURED</div>
            <div class="text-center">
              <div class="feature-icon-container challenge">
                <div class="feature-icon">🏆</div>
              </div>
              <h4 class="feature-title">全服挑战</h4>
              <div class="feature-subtitle">CHALLENGE</div>
              <p class="feature-description">携手完成社区目标，解锁专属奖励</p>
              <RouterLink to="/challenge" class="feature-button challenge-btn">
                <span class="!mr-2">⚔️</span>
                参与挑战
              </RouterLink>
            </div>
          </div>

          <!-- 周年礼包 -->
          <div class="game-feature-card group gift">
            <div class="feature-badge">NEW</div>
            <div class="text-center">
              <div class="feature-icon-container gift">
                <div class="feature-icon">🎉</div>
              </div>
              <h4 class="feature-title">周年礼包</h4>
              <div class="feature-subtitle">GIFT PACK</div>
              <p class="feature-description">登录即送纪念礼包，感谢一路相伴</p>
              <RouterLink to="/gift" class="feature-button gift-btn">
                <span class="!mr-2">🎁</span>
                领取礼包
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- 庆典数据区域 -->
      <div class="stats-section w-full max-w-7xl mx-auto px-6 !mb-16">
        <div class="text-center !mb-12">
          <div class="game-section-header">
            <h3 class="game-section-title">庆典数据</h3>
            <div class="game-section-subtitle">CELEBRATION STATISTICS</div>
            <p class="game-section-desc">见证社区的成长与活力</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="game-stat-card group">
            <div class="stat-icon-wrapper">
              <div class="stat-icon">👥</div>
            </div>
            <div class="stat-value">15,847</div>
            <div class="stat-label">累计玩家</div>
            <div class="stat-label-en">TOTAL PLAYERS</div>
          </div>

          <div class="game-stat-card group">
            <div class="stat-icon-wrapper">
              <div class="stat-icon">🎮</div>
            </div>
            <div class="stat-value">89,423</div>
            <div class="stat-label">总游戏场次</div>
            <div class="stat-label-en">TOTAL GAMES</div>
          </div>

          <div class="game-stat-card group">
            <div class="stat-icon-wrapper">
              <div class="stat-icon">🏆</div>
            </div>
            <div class="stat-value">3,256</div>
            <div class="stat-label">奖品发放数</div>
            <div class="stat-label-en">REWARDS GIVEN</div>
          </div>

          <div class="game-stat-card group">
            <div class="stat-icon-wrapper">
              <div class="stat-icon">⭐</div>
            </div>
            <div class="stat-value">9.8</div>
            <div class="stat-label">社区评分</div>
            <div class="stat-label-en">COMMUNITY RATING</div>
          </div>
        </div>
      </div>

      <!-- 底部信息栏 -->
      <div class="footer-info w-full max-w-6xl mx-auto px-6">
        <div class="game-footer-container">
          <p class="text-xl text-white font-bold !mb-3 text-shadow-strong">
            <span class="inline-flex items-center">
              <span class="!mr-2">🎊</span>
              感谢所有玩家的支持与陪伴
              <span class="!ml-2">🎊</span>
            </span>
          </p>
          <p class="text-white/90 text-base">
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
/* 游戏风格按钮样式 - 周年庆橙色主题 */
.game-btn-primary {
  @apply inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black rounded-xl shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105 backdrop-blur-lg border-2 border-orange-400/50 text-lg;
}

.game-btn-secondary {
  @apply inline-flex items-center px-8 py-4 backdrop-blur-xl bg-black/60 hover:bg-black/80 border-2 border-white/50 hover:border-orange-400/70 text-white font-black rounded-xl shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 text-lg;
}

/* 游戏风格功能卡片 */
.game-feature-card {
  @apply p-8 rounded-2xl backdrop-blur-xl bg-black/70 border-2 shadow-2xl transition-all duration-500 transform hover:scale-105 hover:bg-black/80 text-center relative overflow-hidden;
}

.game-feature-card.lottery {
  @apply border-pink-400/60 hover:border-pink-400/80 hover:shadow-pink-500/30;
}

.game-feature-card.challenge {
  @apply border-blue-400/60 hover:border-blue-400/80 hover:shadow-blue-500/30;
}

.game-feature-card.gift {
  @apply border-yellow-400/60 hover:border-yellow-400/80 hover:shadow-yellow-500/30;
}

.game-feature-card.featured {
  @apply bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-400/80 hover:from-blue-600/30 hover:to-purple-600/30 shadow-blue-500/30;
}

.feature-badge {
  @apply absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-black rounded-full shadow-lg transform rotate-12;
}

.featured-badge {
  @apply bg-gradient-to-r from-blue-500 to-purple-500;
}

.feature-icon-container {
  @apply w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300;
  margin-bottom: 1.5rem !important;
}

.feature-icon-container.lottery {
  @apply bg-gradient-to-br from-pink-400 to-red-400;
}

.feature-icon-container.challenge {
  @apply bg-gradient-to-br from-blue-400 to-indigo-400;
}

.feature-icon-container.gift {
  @apply bg-gradient-to-br from-yellow-400 to-orange-400;
}

.feature-icon {
  @apply text-2xl drop-shadow-lg;
}

.feature-title {
  @apply text-xl font-black text-white text-shadow-strong;
  margin-bottom: 0.5rem !important;
}

.feature-subtitle {
  @apply text-orange-400/80 text-xs font-bold tracking-widest uppercase;
  margin-bottom: 1rem !important;
}

.feature-description {
  @apply text-white/90 leading-relaxed text-base font-medium text-shadow;
  margin-bottom: 2rem !important;
}

.feature-button {
  @apply inline-flex items-center px-5 py-3 font-bold text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2;
}

.lottery-btn {
  @apply bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white border-pink-400/50;
}

.challenge-btn {
  @apply bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-blue-400/50;
}

.gift-btn {
  @apply bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-yellow-400/50;
}

/* 游戏风格统计卡片 - 复用挑战页面样式 */
.game-stat-card {
  @apply p-6 rounded-2xl backdrop-blur-xl bg-black/70 border-2 border-orange-400/40 shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 transform hover:scale-105 hover:bg-black/80 text-center;
}

.stat-icon-wrapper {
  margin-bottom: 1rem !important;
  @apply flex justify-center;
}

.stat-icon {
  @apply text-4xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg;
}

.stat-value {
  @apply text-2xl md:text-3xl font-black text-white text-shadow-strong;
  margin-bottom: 0.5rem !important;
}

.stat-label {
  @apply text-white font-bold text-base text-shadow;
  margin-bottom: 0.25rem !important;
}

.stat-label-en {
  @apply text-orange-400/80 text-xs font-medium tracking-wider uppercase;
}

/* 游戏风格区域标题 */
.game-section-header {
  @apply backdrop-blur-xl bg-black/60 rounded-2xl border-2 border-white/30 shadow-2xl;
  padding: 2rem !important;
}

.game-section-title {
  @apply text-3xl md:text-4xl font-black text-white text-shadow-strong;
  margin-bottom: 0.75rem !important;
}

.game-section-subtitle {
  @apply text-orange-400 font-bold text-base tracking-widest;
  margin-bottom: 1rem !important;
}

.game-section-desc {
  @apply text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-medium text-shadow;
}

.game-footer-container {
  @apply text-center rounded-2xl backdrop-blur-xl bg-black/60 border-2 border-white/30 shadow-2xl;
  padding: 2rem !important;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .game-feature-card {
    padding: 1.5rem !important;
  }

  .feature-icon-container {
    @apply w-14 h-14;
    margin-bottom: 1rem !important;
  }

  .feature-icon {
    @apply text-xl;
  }

  .feature-title {
    @apply text-lg;
  }

  .feature-description {
    @apply text-sm;
    margin-bottom: 1.5rem !important;
  }

  .game-stat-card {
    padding: 1rem !important;
  }

  .stat-value {
    @apply text-xl;
  }

  .game-section-header {
    padding: 1.5rem !important;
  }
}

/* 文字阴影效果 */
.text-shadow {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

.text-shadow-strong {
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6);
}

.text-shadow-glow {
  text-shadow: 0 0 20px currentColor, 0 4px 12px rgba(0, 0, 0, 0.8);
}

/* 页面特定样式 */
.anniversary-page {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* 动画效果 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse {
  animation: pulse 3s ease-in-out infinite;
}
</style>

