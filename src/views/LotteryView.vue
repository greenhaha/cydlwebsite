<template>
  <div class="lottery-page">
    <!-- 专属背景 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" 
           style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/bg1.webp')">
      </div>
    </div>
    <div class="pointer-events-none fixed inset-0 z-0"></div>

    <!-- 主内容区域 -->
    <div class="lottery-content inset-0 h-full top-[0px] z-10 flex flex-col items-center justify-start pt-[80px] pb-8 ">
      <!-- 顶部导航 -->
      <div class="fixed top-0 left-0 right-0 z-99 bg-black/60 backdrop-blur-md border-b border-white/20">
        <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div class="flex items-center justify-between">
            <RouterLink 
              to="/"
              class="inline-flex items-center px-4 py-2 text-white/90 hover:text-white transition-colors duration-350 rounded-lg hover:bg-white/20 bg-black/30"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              返回主页
            </RouterLink>
            
            <!-- 用户信息显示区域 -->
            <div v-if="authStore.isAuthenticated" class="flex items-center space-x-3">
              <!-- 物品箱按钮 -->
              <button
                @click="openItemBoxDialog"
                class="flex !mr-4 items-center h-[50px] space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/50 hover:bg-purple-500/30 transition-colors duration-200 text-white hover:text-purple-100"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
                <span class="text-sm font-medium">物品箱</span>
              </button>
              
              <!-- 个人资料按钮 -->
              <RouterLink 
                to="/profile"
                class="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-colors duration-200"
              >
                <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div class="text-white">
                  <span class="text-sm font-medium">{{ authStore.user?.username || '用户' }}</span>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- 大气标题设计 -->
      <div class="page-header w-full max-w-[1280px] px-4 mb-8 z-35 text-center">
        <!-- 背景装饰 -->
        <div class="relative mb-8 animate-fade-in">
          
          <!-- 主标题容器 -->
          <div class="relative z-10">
            <!-- 顶部装饰线 -->
            <div class="flex items-center justify-center mb-6">
              <div class="h-0.5 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent w-24 animate-pulse"></div>
              <div class="mx-3 w-2 h-2 bg-yellow-400 rounded-full shadow-lg animate-ping"></div>
              <div class="h-0.5 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent w-24 animate-pulse"></div>
            </div>
            <!-- 主标题 -->
            <div class="mb-4 relative text-center">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 tracking-tight leading-none drop-shadow-2xl animate-title-glow">
                幸运抽奖
              </h1>
            </div>
            
            <!-- 副标题 -->
            <h2 class="text-lg md:text-xl lg:text-2xl font-medium text-white/95 mb-4 tracking-wide text-center drop-shadow-lg">
              每日签到 · 赢取大奖 · 好运连连
            </h2>
            
            <!-- 用户欢迎信息 -->
            <div v-if="authStore.isAuthenticated" class="mb-6 flex justify-center">
              <div class="backdrop-blur-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg px-6 py-3 border border-white/30 shadow-lg animate-bounce-slow">
                <p class="text-white/95 text-sm md:text-base font-medium text-center">
                  🎉 欢迎回来，<span class="text-yellow-300 font-bold">{{ authStore.user?.username || '用户' }}</span>！
                </p>
                <p class="text-white/80 text-xs md:text-sm text-center mt-1">
                  开始你的幸运抽奖之旅吧！
                </p>
              </div>
            </div>
            
            <!-- 底部装饰线 -->
            <div class="flex items-center justify-center mb-8">
              <div class="h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent w-32"></div>
              <div class="mx-3 w-1.5 h-1.5 bg-white/60 rounded-full"></div>
              <div class="h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent w-32"></div>
            </div>
          </div>
        </div>
        
        <!-- 描述文字 -->
        <div class="backdrop-blur-lg bg-black/50 rounded-lg p-4 border border-white/30 shadow-2xl mb-3 animate-slide-up">
          <p class="w-full text-sm md:text-base text-white leading-relaxed max-w-lg mx-auto text-center drop-shadow-lg">
            参与每日抽奖活动，丰厚奖品等你来拿！
          </p>
          <p class="w-full text-white text-sm mb-1 text-center drop-shadow">
            🎲 每日免费抽奖机会，错过今天等明天 🎲
          </p>
          <p class="w-full text-white/90 text-xs text-center">
            抽奖活动每日0点重置，记得及时参与哦！
          </p>
        </div>
      </div>

      

        <!-- 抽奖格子 - 大富翁棋盘布局 -->
        <div class="monopoly-board relative mx-auto mb-6 animate-board-entrance" style="min-width: 300px; min-height: 300px;">
          <!-- 顶部一排 (0-2) -->
          <div class="flex">
            <div 
              v-for="index in [0, 1, 2,3]" 
              :key="index"
              class="relative m-1 lottery-box w-20 h-20 bg-cover bg-center bg-no-repeat cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg mr-2 animate-box-float"
              style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/lottoybg.png'); background-size: 100% 100%;"
              :class="{ 'animate-pulse border-4 border-yellow-400 shadow-yellow-400/50': isSpinning && currentIndex === index }"
              @click="selectPrize(index)"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <!-- 奖品图标/祈愿值 -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div v-if="prizes[index].type === 'points'" class="text-center w-full h-full flex flex-col items-center justify-center">
                  <img src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/qiyun.png" class="w-3/4 h-3/4 mx-auto mb-1 animate-float" alt="祈愿值">
                  <span class="text-xs font-bold text-white drop-shadow-lg absolute bottom-1 left-0 w-full text-center py-1 bg-black/30 rounded">{{ prizes[index].value }}祈愿值</span>
                </div>
                <div v-else-if="prizes[index].type === 'item'" class="text-center w-full h-full flex justify-center ">
                  <img src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/eika_mode.webp" class="h-3/5 mt-2 animate-float" alt="道具">
                  <span class="text-xs font-bold text-white drop-shadow-lg absolute bottom-1 left-0 w-full text-center py-1 bg-black/30 rounded">{{ prizes[index].value }}</span>
                </div>
                <div v-else class="text-xl drop-shadow-lg animate-bounce">{{ prizes[index].icon }}</div>
              </div>
              
              <!-- 中奖发光效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 bg-cover bg-center bg-no-repeat animate-ping opacity-75"
                style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/light.png')"
              ></div>
              
              <!-- 强化中奖效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 rounded-lg animate-win-effect bg-gradient-radial from-yellow-400/90 via-orange-400/70 to-red-400/50 border-4 border-yellow-400/80 shadow-2xl"
              ></div>
              
              <!-- 中奖文字效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 flex items-center justify-center z-10"
              >
                <div class="text-white text-xs font-bold bg-gradient-to-r from-red-500 to-orange-500 px-2 py-1 rounded-full animate-bounce shadow-2xl border border-white/50">
                  🎉 中奖！
                </div>
              </div>
              
              <!-- 中奖粒子效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 pointer-events-none overflow-hidden z-20"
              >
                <div 
                  v-for="i in 8" 
                  :key="i"
                  class="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-80"
                  :style="{
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    animationDelay: Math.random() * 1 + 's',
                    animationDuration: (Math.random() * 0.5 + 0.5) + 's'
                  }"
                ></div>
              </div>
              </div>
          </div>

          <!-- 右侧一排 (3-4) -->
          <div class="flex flex-col-reverse">
            <div 
              v-for="index in [10, 11,]" 
              :key="index"
              class="relative m-1 lottery-box w-20 h-20 bg-cover bg-center bg-no-repeat cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg mb-2 animate-box-float"
              style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/lottoybg.png'); background-size: 100% 100%;"
              :class="{ 'animate-pulse border-4 border-yellow-400 shadow-yellow-400/50': isSpinning && currentIndex === index }"
              @click="selectPrize(index)"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <!-- 奖品图标/祈愿值 -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div v-if="prizes[index].type === 'points'" class="text-center w-full h-full flex flex-col items-center justify-center">
                  <img src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/qiyun.png" class="w-3/4 h-3/4 mx-auto mb-1 animate-float" alt="祈愿值">
                  <span class="text-xs font-bold text-white drop-shadow-lg absolute bottom-1 left-0 w-full text-center py-1 bg-black/30 rounded">{{ prizes[index].value }}祈愿值</span>
                </div>
                <div v-else class="text-xl drop-shadow-lg animate-bounce">{{ prizes[index].icon }}</div>
              </div>
              
              <!-- 中奖发光效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 bg-cover bg-center bg-no-repeat animate-ping opacity-75"
                style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/light.png')"
              ></div>
              
              <!-- 强化中奖效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 rounded-lg animate-win-effect bg-gradient-radial from-yellow-400/90 via-orange-400/70 to-red-400/50 border-4 border-yellow-400/80 shadow-2xl"
              ></div>
              
              <!-- 中奖文字效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 flex items-center justify-center z-10"
              >
                <div class="text-white text-xs font-bold bg-gradient-to-r from-red-500 to-orange-500 px-2 py-1 rounded-full animate-bounce shadow-2xl border border-white/50">
                  🎉 中奖！
                </div>
              </div>
              
              <!-- 中奖粒子效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 pointer-events-none overflow-hidden z-20"
              >
                <div 
                  v-for="i in 8" 
                  :key="i"
                  class="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-80"
                  :style="{
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    animationDelay: Math.random() * 1 + 's',
                    animationDuration: (Math.random() * 0.5 + 0.5) + 's'
                  }"
                ></div>
              </div>
            </div>
          </div>
          <!-- 右侧一排 (3-4) -->
          <div class="absolute right-0 top-36 flex flex-col">
            <div 
              v-for="index in [4, 5,]" 
              :key="index"
              class="relative m-1 lottery-box w-20 h-20 bg-cover bg-center bg-no-repeat mb-2 transition-all duration-300 hover:scale-110 hover:shadow-lg animate-box-float"
              style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/lottoybg.png'); background-size: 100% 100%;"
              :class="{ 'animate-pulse border-4 border-yellow-400 shadow-yellow-400/50': isSpinning && currentIndex === index }"
              @click="selectPrize(index)"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <!-- 奖品图标/祈愿值 -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div v-if="prizes[index].type === 'points'" class="text-center w-full h-full flex flex-col items-center justify-center">
                  <img src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/qiyun.png" class="w-3/4 h-3/4 mx-auto mb-1 animate-float" alt="祈愿值">
                  <span class="text-xs font-bold text-white drop-shadow-lg absolute bottom-1 left-0 w-full text-center py-1 bg-black/30 rounded">{{ prizes[index].value }}祈愿值</span>
                </div>
                <div v-else class="text-xl drop-shadow-lg animate-bounce">{{ prizes[index].icon }}</div>
              </div>
              
              <!-- 中奖发光效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 bg-cover bg-center bg-no-repeat animate-ping opacity-75"
                style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/light.png')"
              ></div>
              
              <!-- 强化中奖效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 rounded-lg animate-win-effect bg-gradient-radial from-yellow-400/90 via-orange-400/70 to-red-400/50 border-4 border-yellow-400/80 shadow-2xl"
              ></div>
              
              <!-- 中奖文字效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 flex items-center justify-center z-10"
              >
                <div class="text-white text-xs font-bold bg-gradient-to-r from-red-500 to-orange-500 px-2 py-1 rounded-full animate-bounce shadow-2xl border border-white/50">
                  🎉 中奖！
                </div>
              </div>
              
              <!-- 中奖粒子效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 pointer-events-none overflow-hidden z-20"
              >
                <div 
                  v-for="i in 8" 
                  :key="i"
                  class="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-80"
                  :style="{
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    animationDelay: Math.random() * 1 + 's',
                    animationDuration: (Math.random() * 0.5 + 0.5) + 's'
                  }"
                ></div>
              </div>
            </div>
          </div>
          <!-- 底部一排 (5-7) - 从右到左 -->
          <div class="flex flex-row-reverse">
            <div 
              v-for="index in [ 6, 7, 8, 9]" 
              :key="index"
              class="relative m-1 lottery-box w-20 h-20 bg-cover bg-center bg-no-repeat cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg animate-box-float"
              style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/lottoybg.png'); background-size: 100% 100%;"
              :class="{ 'animate-pulse border-4 border-yellow-400 shadow-yellow-400/50': isSpinning && currentIndex === index }"
              @click="selectPrize(index)"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <!-- 奖品图标/祈愿值 -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div v-if="prizes[index].type === 'points'" class="text-center w-full h-full flex flex-col items-center justify-center">
                  <img src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/qiyun.png" class="w-3/4 h-3/4 mx-auto mb-1 animate-float" alt="祈愿值">
                  <span class="text-xs font-bold text-white drop-shadow-lg absolute bottom-1 left-0 w-full text-center py-1 bg-black/30 rounded">{{ prizes[index].value }}祈愿值</span>
                </div>
                <div v-else class="text-xl drop-shadow-lg animate-bounce">{{ prizes[index].icon }}</div>
              </div>
              
              <!-- 中奖发光效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 bg-cover bg-center bg-no-repeat animate-ping opacity-75"
                style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/light.png')"
              ></div>
              
              <!-- 强化中奖效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 rounded-lg animate-win-effect bg-gradient-radial from-yellow-400/90 via-orange-400/70 to-red-400/50 border-4 border-yellow-400/80 shadow-2xl"
              ></div>
              
              <!-- 中奖文字效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 flex items-center justify-center z-10"
              >
                <div class="text-white text-xs font-bold bg-gradient-to-r from-red-500 to-orange-500 px-2 py-1 rounded-full animate-bounce shadow-2xl border border-white/50">
                  🎉 中奖！
                </div>
              </div>
              
              <!-- 中奖粒子效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 pointer-events-none overflow-hidden z-20"
              >
                <div 
                  v-for="i in 8" 
                  :key="i"
                  class="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-80"
                  :style="{
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    animationDelay: Math.random() * 1 + 's',
                    animationDuration: (Math.random() * 0.5 + 0.5) + 's'
                  }"
                ></div>
              </div>
            </div>
          </div>

         

          <!-- 中央区域 - 显示当前抽奖状态 -->
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-30">
            <div v-if="isSpinning" class="text-white text-lg font-bold animate-bounce drop-shadow-lg">
              🎲 抽奖中...
            </div>
            <div v-else-if="showWinEffect" class="text-yellow-300 text-lg font-bold animate-pulse drop-shadow-lg">
              🎉 恭喜中奖！
            </div>
            <div v-else class="text-white/80 text-sm drop-shadow text-shadow">
              <!-- 抽奖区域 -->
              <div class="lottery-section w-full max-w-96 px-4 mb-8 z-35 text-center">
        <!-- 抽奖按钮 -->
                <div class="text-center mb-6">
          <button 
            @click="startLottery"
            :disabled="remainingChances <= 0 || !authStore.isAuthenticated"
                    class="relative group transform transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
          >
            <!-- 抽奖按钮背景图 -->
                    <div class="w-24 h-24 bg-cover bg-center bg-no-repeat mx-auto transition-all duration-300 group-hover:scale-110 group-disabled:scale-95 group-disabled:opacity-60 animate-pulse-slow"
                 style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/lottoybtn.png'); background-size: 100% 100%;">
            </div>
          </button>
          
                  <div class="mt-3 text-white text-center drop-shadow-lg">
                    <span class="text-base font-medium">剩余次数：</span>
                    <span class="text-xl font-bold text-yellow-300 animate-pulse">{{ remainingChances }}</span>
          </div>
          
          <!-- 登录提示 -->
                  <div v-if="!authStore.isAuthenticated" class="mt-3 text-red-300 text-sm text-center animate-bounce">
            请先登录才能参与抽奖
          </div>
        </div>
            </div>
          </div>
        </div>
      </div>

  

      <!-- 奖品展示区域 -->
      <div class="prizes-showcase w-full max-w-4xl px-4 mb-8 z-35 animate-slide-up">
        <div class="backdrop-blur-lg bg-black/50 rounded-xl p-6 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500">
          <div class="text-center mb-6 animate-fade-in">
            <h3 class="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-lg">
              奖品展示
            </h3>
            <p class="text-sm md:text-base text-white/95 text-center drop-shadow">
              所有奖品及中奖概率一览
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-stagger-in">
            <!-- 使用后台返回的奖品数据 -->
            <div 
              v-for="prize in currentActivityPrizes" 
              :key="prize.id"
              class="rounded-lg p-4 border-2 hover:scale-105 transition-all duration-300 hover:shadow-lg backdrop-blur-sm animate-prize-card"
              :class="getPrizeDisplayClass(prize.rarity)"
            >
              <div class="flex items-center mb-3 animate-fade-in">
                <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-3 animate-float"
                     :class="getPrizeIconBgClass(prize.rarity)">
                  <img :src="prize.icon" class="h-4/5 object-contain" :alt="prize.name">
                </div>
                <div class="flex-1">
                  <h4 class="text-white font-bold text-sm mb-1">{{ prize.name }}</h4>
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-medium" :class="getPrizeValueClass(prize.rarity)">
                      {{ prize.type === 'points' ? `+${prize.value}祈愿值` : prize.value }}
                    </span>
                    <span class="text-xs font-bold px-2 py-1 rounded animate-pulse-slow" :class="getPrizeProbabilityClass(prize.rarity)">
                      {{ prize.probability }}%
                    </span>
                  </div>
                </div>
              </div>
              <div class="text-xs text-center" :class="getPrizeRarityTextClass(prize.rarity)">
                {{ getRarityDisplayText(prize.rarity) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>

    <!-- 物品箱对话框 -->
    <div v-if="showItemBoxDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-4/5 overflow-y-auto border border-white/20 shadow-2xl animate-modal-enter">
        <!-- 对话框头部 -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 mr-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center animate-pulse">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-white">我的物品箱</h2>
              <p class="text-gray-300 text-sm">{{ currentActivity?.name || '当前活动' }} - 抽奖记录</p>
            </div>
          </div>
          <button
            @click="closeItemBoxDialog"
            class="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- 加载状态 -->
        <div v-if="isLoadingRecords" class="flex items-center justify-center py-12 mt-4">
          <div class="flex items-center space-x-3">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 border-t-2 border-t-transparent"></div>
            <span class="text-white">正在加载物品记录...</span>
          </div>
        </div>

        <!-- 物品列表 -->
        <div v-else-if="personalLotteryRecords.length > 0" class="space-y-4 mt-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-stagger-in">
            <div 
              v-for="record in personalLotteryRecords" 
              :key="record.id"
              class="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-4 border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-item-enter"
            >
              <!-- 物品图标 -->
              <div class="flex items-center mb-3">
                <div class="w-16 h-16 mr-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-400/30 animate-float">
                  <img 
                    v-if="record.prizeType === 'item'" 
                    src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/eika_mode.webp" 
                    class="w-12 h-12 object-contain" 
                    alt="物品"
                  >
                  <img 
                    v-else
                    src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/qiyun.png" 
                    class="w-12 h-12 object-contain" 
                    alt="祈愿值"
                  >
                </div>
                <div class="flex-1">
                  <h3 class="text-white font-bold text-lg mb-1">{{ record.prizeName }}</h3>
                  <p class="text-gray-300 text-sm">
                    {{ record.prizeType === 'points' ? `+${record.prizeValue}祈愿值` : record.prizeValue }}
                  </p>
                </div>
              </div>

              <!-- 物品信息 -->
              <div class="space-y-2 text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-gray-400">物品种类</span>
                  <span class="text-white font-medium">
                    {{ record.prizeType === 'points' ? '祈愿值' : record.prizeType === 'item' ? '道具' : '其他' }}
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-400">抽取时间</span>
                  <span class="text-white font-medium">{{ formatDateTime(record.lotteryTime) }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-400">所属活动</span>
                  <span class="text-purple-300 font-medium">{{ record.activityName }}</span>
                </div>
              </div>

              <!-- 稀有度标识 -->
              <div class="mt-3 flex justify-center">
                <span 
                  class="px-3 py-1 rounded-full text-xs font-bold"
                  :class="getPrizeRarityClass(record.prizeType, record.prizeValue)"
                >
                  {{ getPrizeRarityText(record.prizeType, record.prizeValue) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-else class="text-center py-12">
          <div class="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          </div>
          <h3 class="text-white text-xl font-bold mb-2 animate-fade-in">物品箱空空如也</h3>
          <p class="text-gray-400">还没有抽取到任何物品，快去参与抽奖吧！</p>
        </div>

        <!-- 对话框底部 -->
        <div class="mt-6 pt-4 border-t border-gray-600/50 flex justify-end">
          <button
            @click="closeItemBoxDialog"
            class="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium transform hover:scale-105"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { lotteryApi, type LotteryRecord, type LotteryActivity, type LotteryPrize } from '@/services/api'

// 路由和认证store
const router = useRouter()
const authStore = useAuthStore()

// 响应式数据
const remainingChances = ref(3)
const isSpinning = ref(false)
const currentIndex = ref(-1)
const winningIndex = ref(-1)
const showWinEffect = ref(false)
const todayDraws = ref(0)
const todayWins = ref(0)
const totalRewards = ref(0)
const hasSignedIn = ref(false)
const dailyLimit = ref(3)

// 物品箱对话框相关
const showItemBoxDialog = ref(false)
const personalLotteryRecords = ref<LotteryRecord[]>([])
const isLoadingRecords = ref(false)
const currentActivity = ref<LotteryActivity | null>(null)
const currentActivityPrizes = ref<LotteryPrize[]>([])

// 棋盘奖品配置 - 按棋盘位置排列（12个格子）
const prizes = ref([
  { type: 'points', value: 10000, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/qiyun.png', name: '巨额祈愿值' },  // 0
  { type: 'points', value: 5000, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/qiyun.png', name: '大额祈愿值' },   // 1
  { type: 'item', value: '模型皮肤', icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/eika_mode.webp', name: '稀有皮肤' }, // 2
  { type: 'points', value: 20, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/qiyun.png', name: '少量祈愿值' },     // 3
  { type: 'points', value: 1000, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/qiyun.png', name: '丰厚祈愿值' },  // 4
  { type: 'points', value: 500, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/qiyun.png', name: '优质祈愿值' },   // 5
  { type: 'points', value: 300, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/qiyun.png', name: '良好祈愿值' },   // 6
  { type: 'points', value: 50, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/qiyun.png', name: '微量祈愿值' },    // 7
  { type: 'points', value: 150, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/qiyun.png', name: '普通祈愿值' },  // 8
  { type: 'points', value: 100, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/qiyun.png', name: '基础祈愿值' },  // 9
  { type: 'points', value: 50, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/qiyun.png', name: '微量祈愿值' },    // 10
  { type: 'points', value: 20, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/qiyun.png', name: '少量祈愿值' }     // 11
])

// 大富翁棋盘路径顺序 (0->1->2->3->4->5->6->7->8->9->10->11->0...)
const boardPath = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

// 根据后端返回的奖品信息找到对应的棋盘位置
const findPrizePosition = (prizeName: string, prizeType: string, prizeValue: string) => {
  console.log('Finding position for:', { prizeName, prizeType, prizeValue })
  
  // 在显示奖品（12格子）中找到匹配的奖品位置
  const matchingPositions: number[] = []
  
  prizes.value.forEach((prize, index) => {
    if (prize.name === prizeName && prize.type === prizeType) {
      // 对于祈愿值类型，还需要检查数值是否匹配
      if (prizeType === 'points') {
        if (prize.value.toString() === prizeValue) {
          matchingPositions.push(index)
        }
      } else {
        // 对于物品类型，检查值是否匹配
        if (prize.value === prizeValue) {
          matchingPositions.push(index)
        }
      }
    }
  })
  
  // 如果找到匹配的位置，随机选择一个
  if (matchingPositions.length > 0) {
    const randomIndex = Math.floor(Math.random() * matchingPositions.length)
    return matchingPositions[randomIndex]
  }
  
  // 如果没有找到完全匹配的位置，尝试按名称匹配
  const nameMatchingPositions: number[] = []
  prizes.value.forEach((prize, index) => {
    if (prize.name === prizeName) {
      nameMatchingPositions.push(index)
    }
  })
  
  if (nameMatchingPositions.length > 0) {
    const randomIndex = Math.floor(Math.random() * nameMatchingPositions.length)
    return nameMatchingPositions[randomIndex]
  }
  
  // 如果还是没有找到匹配的位置，返回随机位置
  console.warn('未找到匹配的奖品位置:', { prizeName, prizeType, prizeValue })
  return Math.floor(Math.random() * prizes.value.length)
}

// 开始抽奖
const startLottery = async () => {
  // 检查登录状态
  if (!authStore.isAuthenticated) {
    alert('请先登录再参与抽奖')
    router.push('/login')
    return
  }
  
  if (remainingChances.value <= 0 || isSpinning.value) return
  
  if (!hasSignedIn.value) {
    alert('请先完成今日签到后再进行抽奖')
    return
  }

  if (!currentActivity.value) {
    alert('当前没有进行中的抽奖活动')
    return
  }
  
  isSpinning.value = true
  
  try {
    // 调用后端API执行抽奖
    const response = await lotteryApi.drawLottery({
      lotteryType: 'normal',
      activityId: currentActivity.value.id
    })
    
    if (response.success && response.data) {
      const lotteryResult = response.data
      
      // 更新剩余次数
      remainingChances.value = lotteryResult.remainingChances
      todayDraws.value++
      
      // 根据后端返回的奖品找到对应的棋盘位置
      const targetPosition = findPrizePosition(
        lotteryResult.prizeName,
        lotteryResult.prizeType,
        lotteryResult.prizeValue
      )
      
      // 模拟大富翁式抽奖动画
      let pathIndex = 0
      let rounds = 0
      const minRounds = 3 // 最少转3圈
      const maxRounds = 5 // 最多转5圈
      const targetRounds = Math.floor(Math.random() * (maxRounds - minRounds + 1)) + minRounds
      
      const interval = setInterval(() => {
        currentIndex.value = boardPath[pathIndex]
        pathIndex++
        
        // 完成一圈后重置路径索引
        if (pathIndex >= boardPath.length) {
          pathIndex = 0
          rounds++
        }
        
        // 检查是否应该停止 - 停在目标位置
        if (rounds >= targetRounds && currentIndex.value === targetPosition) {
          clearInterval(interval)
          
          // 确定中奖位置
          winningIndex.value = targetPosition
          showWinEffect.value = true
          isSpinning.value = false
          
          // 更新统计
          todayWins.value++
          if (lotteryResult.prizeType === 'points') {
            const points = parseInt(lotteryResult.prizeValue)
            if (!isNaN(points)) {
              totalRewards.value += points
            }
          }
          
          // 显示中奖信息
          setTimeout(() => {
            alert(`🎉 恭喜获得：${lotteryResult.prizeName} ${lotteryResult.prizeType === 'points' ? `+${lotteryResult.prizeValue}祈愿值` : `(${lotteryResult.prizeValue})`}`)
          }, 500)
          
          // 抽奖完成后自动查询最新状态
          setTimeout(async () => {
            await refreshLotteryStatus()
          }, 1000)
          
          // 3秒后隐藏特效
          setTimeout(() => {
            showWinEffect.value = false
            winningIndex.value = -1
          }, 3000)
        }
      }, 150) // 稍微慢一点的动画速度，更有大富翁的感觉
      
    } else {
      isSpinning.value = false
      alert(`抽奖失败: ${response.message}`)
    }
  } catch (error) {
    isSpinning.value = false
    console.error('抽奖API调用失败:', error)
    alert('抽奖失败，请稍后重试')
  }
}

const selectPrize = (index: number) => {
  if (isSpinning.value) return
  // 可以添加额外的交互逻辑
  console.log('Selected prize index:', index)
}

// 打开物品箱对话框
const openItemBoxDialog = async () => {
  showItemBoxDialog.value = true
  await loadPersonalLotteryRecords()
}

// 关闭物品箱对话框
const closeItemBoxDialog = () => {
  showItemBoxDialog.value = false
}

// 加载个人抽奖记录
const loadPersonalLotteryRecords = async () => {
  if (!currentActivity.value) return
  
  try {
    isLoadingRecords.value = true
    const response = await lotteryApi.getPersonalLotteryRecords({
      activityId: currentActivity.value.id,
      page: 1,
      size: 100
    })
    
    if (response.success && response.data) {
      personalLotteryRecords.value = response.data.records
    }
  } catch (error) {
    console.error('加载个人抽奖记录失败:', error)
  } finally {
    isLoadingRecords.value = false
  }
}

// 格式化日期时间
const formatDateTime = (dateString: string) => {
  if (!dateString) return '未知'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return '未知'
  }
}

// 获取奖品稀有度样式类
const getPrizeRarityClass = (prizeType: string, prizeValue: string) => {
  if (prizeType === 'item') {
    return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
  }
  
  const value = parseInt(prizeValue)
  if (value >= 5000) {
    return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
  } else if (value >= 1000) {
    return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
  } else if (value >= 300) {
    return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
  } else if (value >= 100) {
    return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
  } else {
    return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white'
  }
}

// 获取奖品稀有度文本
const getPrizeRarityText = (prizeType: string, prizeValue: string) => {
  if (prizeType === 'item') {
    return '传说级'
  }
  
  const value = parseInt(prizeValue)
  if (value >= 5000) {
    return '传说级'
  } else if (value >= 1000) {
    return '史诗级'
  } else if (value >= 300) {
    return '稀有级'
  } else if (value >= 100) {
    return '普通级'
  } else {
    return '基础级'
  }
}

// 获取奖品展示样式类
const getPrizeDisplayClass = (rarity: string) => {
  switch (rarity) {
    case 'legendary':
      return 'bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border-yellow-400/50 hover:border-yellow-400/80'
    case 'epic':
      return 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-400/50 hover:border-purple-400/80'
    case 'rare':
      return 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-400/50 hover:border-blue-400/80'
    case 'uncommon':
      return 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-400/50 hover:border-green-400/80'
    case 'common':
    default:
      return 'bg-gradient-to-r from-gray-600/20 to-slate-600/20 border-gray-400/50 hover:border-gray-400/80'
  }
}

// 获取奖品图标背景样式类
const getPrizeIconBgClass = (rarity: string) => {
  switch (rarity) {
    case 'legendary':
      return 'bg-yellow-400/20'
    case 'epic':
      return 'bg-purple-400/20'
    case 'rare':
      return 'bg-blue-400/20'
    case 'uncommon':
      return 'bg-green-400/20'
    case 'common':
    default:
      return 'bg-gray-400/20'
  }
}

// 获取奖品值样式类
const getPrizeValueClass = (rarity: string) => {
  switch (rarity) {
    case 'legendary':
      return 'text-yellow-300'
    case 'epic':
      return 'text-purple-300'
    case 'rare':
      return 'text-blue-300'
    case 'uncommon':
      return 'text-green-300'
    case 'common':
    default:
      return 'text-gray-300'
  }
}

// 获取奖品概率样式类
const getPrizeProbabilityClass = (rarity: string) => {
  switch (rarity) {
    case 'legendary':
      return 'text-yellow-400 bg-yellow-400/20'
    case 'epic':
      return 'text-purple-400 bg-purple-400/20'
    case 'rare':
      return 'text-blue-400 bg-blue-400/20'
    case 'uncommon':
      return 'text-green-400 bg-green-400/20'
    case 'common':
    default:
      return 'text-gray-400 bg-gray-400/20'
  }
}

// 获取稀有度文本样式类
const getPrizeRarityTextClass = (rarity: string) => {
  switch (rarity) {
    case 'legendary':
      return 'text-yellow-300/80'
    case 'epic':
      return 'text-purple-300/80'
    case 'rare':
      return 'text-blue-300/80'
    case 'uncommon':
      return 'text-green-300/80'
    case 'common':
    default:
      return 'text-gray-300/80'
  }
}

// 获取稀有度显示文本
const getRarityDisplayText = (rarity: string) => {
  switch (rarity) {
    case 'legendary':
      return '传说级'
    case 'epic':
      return '史诗级'
    case 'rare':
      return '稀有级'
    case 'uncommon':
      return '普通级'
    case 'common':
    default:
      return '基础级'
  }
}

// 加载抽奖数据
const loadLotteryData = async () => {
  try {
    // 获取当前活动信息
    const activityResponse = await lotteryApi.getCurrentActivity()
    if (activityResponse.success && activityResponse.data) {
      currentActivity.value = activityResponse.data
      
      // 获取当前活动的实际奖品（用于抽奖逻辑）
      const actualPrizesResponse = await lotteryApi.getActivityPrizes(activityResponse.data.id)
      if (actualPrizesResponse.success && actualPrizesResponse.data) {
        currentActivityPrizes.value = actualPrizesResponse.data
      }
      // 获取当前活动的显示奖品（用于前端12格子显示）
      const displayPrizesResponse = await lotteryApi.getCurrentDisplayPrizes()
      if (displayPrizesResponse.success && displayPrizesResponse.data) {
        updateBoardPrizes(displayPrizesResponse.data)
      }
      
      
    }
    
    // 获取抽奖状态
    const statusResponse = await lotteryApi.getLotteryStatus(currentActivity.value?.id)
    if (statusResponse.success && statusResponse.data) {
      const status = statusResponse.data
      remainingChances.value = status.remainingChances
      todayDraws.value = status.todayLotteryCount
      hasSignedIn.value = status.hasSignedIn
      dailyLimit.value = status.dailyLimit
    }
    
    // 获取今日抽奖记录
    const todayRecordsResponse = await lotteryApi.getTodayLotteryRecords()
    if (todayRecordsResponse.success && todayRecordsResponse.data) {
      const records = todayRecordsResponse.data
      todayWins.value = records.length
      
      // 计算今日获得的总祈愿值
      let totalPoints = 0
      for (const record of records) {
        if (record.prizeType === 'points') {
          const points = parseInt(record.prizeValue)
          if (!isNaN(points)) {
            totalPoints += points
          }
        }
      }
      totalRewards.value = totalPoints
    }
  } catch (error) {
    console.error('加载抽奖数据失败:', error)
  }
}

// 刷新抽奖状态
const refreshLotteryStatus = async () => {
  try {
    if (!currentActivity.value) return
    
    console.log('刷新抽奖状态...')
    
    // 获取最新的抽奖状态
    const statusResponse = await lotteryApi.getLotteryStatus(currentActivity.value.id)
    if (statusResponse.success && statusResponse.data) {
      const status = statusResponse.data
      remainingChances.value = status.remainingChances
      todayDraws.value = status.todayLotteryCount
      hasSignedIn.value = status.hasSignedIn
      dailyLimit.value = status.dailyLimit
      
      console.log('抽奖状态已更新:', {
        remainingChances: remainingChances.value,
        todayDraws: todayDraws.value,
        hasSignedIn: hasSignedIn.value
      })
    }
    
    // 获取最新的今日抽奖记录
    const todayRecordsResponse = await lotteryApi.getTodayLotteryRecords()
    if (todayRecordsResponse.success && todayRecordsResponse.data) {
      const records = todayRecordsResponse.data
      todayWins.value = records.length
      
      // 重新计算今日获得的总祈愿值
      let totalPoints = 0
      for (const record of records) {
        if (record.prizeType === 'points') {
          const points = parseInt(record.prizeValue)
          if (!isNaN(points)) {
            totalPoints += points
          }
        }
      }
      totalRewards.value = totalPoints
      
      console.log('今日记录已更新:', {
        todayWins: todayWins.value,
        totalRewards: totalRewards.value
      })
    }
  } catch (error) {
    console.error('刷新抽奖状态失败:', error)
  }
}

// 更新棋盘奖品显示
const updateBoardPrizes = (backendPrizes: LotteryPrize[]) => {
  // 使用后台返回的显示奖品更新棋盘
  // 后台的getDisplayPrizes方法会返回12个奖品，包含重复的奖品（但概率不变）
  if (backendPrizes.length === 12) {
    // 直接使用后台返回的12个奖品
    prizes.value = backendPrizes.map(prize => ({
      type: prize.type,
      value: prize.type === 'points' ? parseInt(prize.value) : prize.value,
      icon: prize.icon,
      name: prize.name,
      rarity: prize.rarity || 'common'
    })) as typeof prizes.value
  } else {
    // 如果返回的奖品数量不是12个，保持原有逻辑作为备用
    console.warn('后台返回的显示奖品数量不是12个，使用现有配置')
    const updatedPrizes = [...prizes.value]
    backendPrizes.forEach((prize, index) => {
      if (index < 12) {
        updatedPrizes[index] = {
          type: prize.type,
          value: prize.type === 'points' ? parseInt(prize.value) : prize.value,
          icon: prize.icon,
          name: prize.name,
          rarity: prize.rarity || 'common'
        } as typeof updatedPrizes[0]
      }
    })
    prizes.value = updatedPrizes
  }
}

// 组件挂载时初始化数据
onMounted(async () => {
  // 检查认证状态
  if (!authStore.isAuthenticated) {
    // 如果没有登录，跳转到登录页面
    router.push('/login')
    return
  }
  
  // 如果已登录，加载抽奖数据
  await loadLotteryData()
})
</script>

<style scoped>
/* 自定义动画 */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes board-entrance {
  from {
    opacity: 0;
    transform: scale(0.8) rotate(-5deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes box-float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-3px) rotate(2deg);
  }
}

@keyframes title-glow {
  0%, 100% {
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 165, 0, 0.3);
  }
  50% {
    text-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 165, 0, 0.5);
  }
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes win-effect {
  0% {
    transform: scale(1);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 40px rgba(255, 215, 0, 1);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
  }
}

@keyframes modal-enter {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes stagger-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes prize-card {
  from {
    opacity: 0;
    transform: translateY(15px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes item-enter {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 应用动画类 */
.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out;
}

.animate-board-entrance {
  animation: board-entrance 1s ease-out;
}

.animate-box-float {
  animation: box-float 3s ease-in-out infinite;
}

.animate-float {
  animation: float 2s ease-in-out infinite;
}

.animate-title-glow {
  animation: title-glow 3s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.animate-win-effect {
  animation: win-effect 0.8s ease-in-out infinite;
}

.animate-modal-enter {
  animation: modal-enter 0.5s ease-out;
}

.animate-stagger-in {
  animation: stagger-in 0.6s ease-out;
}

.animate-stagger-in > * {
  animation: stagger-in 0.6s ease-out;
  animation-fill-mode: both;
}

.animate-stagger-in > *:nth-child(1) { animation-delay: 0.1s; }
.animate-stagger-in > *:nth-child(2) { animation-delay: 0.2s; }
.animate-stagger-in > *:nth-child(3) { animation-delay: 0.3s; }
.animate-stagger-in > *:nth-child(4) { animation-delay: 0.4s; }
.animate-stagger-in > *:nth-child(5) { animation-delay: 0.5s; }
.animate-stagger-in > *:nth-child(6) { animation-delay: 0.6s; }

.animate-prize-card {
  animation: prize-card 0.5s ease-out;
}

.animate-item-enter {
  animation: item-enter 0.4s ease-out;
}

/* 渐变背景 */
.bg-gradient-radial {
  background: radial-gradient(circle, var(--tw-gradient-stops));
}

/* 响应式优化 */
@media (max-width: 768px) {
  .monopoly-board {
    min-width: 280px !important;
    min-height: 280px !important;
  }
  
  .lottery-box {
    width: 4rem !important;
    height: 4rem !important;
  }
  
  .animate-box-float {
    animation-duration: 4s;
  }
}

@media (max-width: 480px) {
  .monopoly-board {
    min-width: 260px !important;
    min-height: 260px !important;
  }
  
  .lottery-box {
    width: 3.5rem !important;
    height: 3.5rem !important;
  }
}

/* 性能优化 */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-slide-up,
  .animate-board-entrance,
  .animate-box-float,
  .animate-float,
  .animate-title-glow,
  .animate-bounce-slow,
  .animate-pulse-slow,
  .animate-win-effect,
  .animate-modal-enter,
  .animate-stagger-in,
  .animate-prize-card,
  .animate-item-enter {
    animation: none;
  }
}
</style>