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
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
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
        <div class="relative mb-8">
          
          <!-- 主标题容器 -->
          <div class="relative z-10">
            <!-- 顶部装饰线 -->
            <div class="flex items-center justify-center !mb-6">
              <div class="h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent w-24"></div>
              <div class="mx-3 w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></div>
              <div class="h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent w-24"></div>
            </div>
            
            
            
            <!-- 主标题 -->
            <div class="!mb-4 relative text-center">
              <h1 class="text-[36px] md:text-[48px] lg:text-[56px] font-black text-white mb-3 tracking-tight leading-none drop-shadow-2xl text-shadow-lg">
                幸运抽奖
              </h1>
            </div>
            
            <!-- 副标题 -->
            <h2 class="text-[16px] md:text-[20px] lg:text-[24px] font-medium text-white/95 mb-4 tracking-wide text-center drop-shadow-lg text-shadow">
              每日签到 · 赢取大奖 · 好运连连
            </h2>
            
            <!-- 用户欢迎信息 -->
            <div v-if="authStore.isAuthenticated" class="!mb-6 flex justify-center">
              <div class="backdrop-blur-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg px-6 py-3 border border-white/30 shadow-lg">
                <p class="text-white/95 text-sm md:text-base font-medium text-center">
                  🎉 欢迎回来，<span class="text-yellow-300 font-bold">{{ authStore.user?.username || '用户' }}</span>！
                </p>
                <p class="text-white/80 text-xs md:text-sm text-center mt-1">
                  开始你的幸运抽奖之旅吧！
                </p>
              </div>
            </div>
            
            <!-- 底部装饰线 -->
            <div class="flex items-center justify-center !mb-[32px]">
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-32"></div>
              <div class="!mx-3 w-1.5 h-1.5 bg-white/60 rounded-full"></div>
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-32"></div>
            </div>
          </div>
        </div>
        
        <!-- 描述文字 -->
        <div class="backdrop-blur-lg bg-black/50 rounded-lg flex-wrap !p-4 border border-white/30 shadow-2xl flex justify-center !mb-3">
          <p class="!w-full text-[14px] md:text-[16px] text-white leading-relaxed max-w-lg mx-auto text-center drop-shadow-lg text-shadow">
            参与每日抽奖活动，丰厚奖品等你来拿！
          </p>
          <p class="!w-full text-white text-sm mb-1 text-center text-shadow drop-shadow">
            🎲 每日免费抽奖机会，错过今天等明天 🎲
          </p>
          <p class="!w-full text-white/90 text-xs text-center text-shadow">
            抽奖活动每日0点重置，记得及时参与哦！
          </p>
        </div>
      </div>

      

        <!-- 抽奖格子 - 大富翁棋盘布局 -->
        <div class="monopoly-board relative mx-auto !mb-6" style="min-width: 300px; min-height: 300px;">
          <!-- 顶部一排 (0-2) -->
          <div class=" flex">
            <div 
              v-for="index in [0, 1, 2,3]" 
              :key="index"
              class="relative !m-1 lottery-box w-35 h-35 bg-cover bg-center bg-no-repeat cursor-pointer transition-transform  mr-2"
              style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cjbox.png'); background-size: 100% 100%;"
              :class="{ 'animate-pulse border-4 border-yellow-400': isSpinning && currentIndex === index }"
              @click="selectPrize(index)"
            >
              <!-- 奖品图标/积分 -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div v-if="prizes[index].type === 'points'" class="text-center w-full h-full">
                  <img src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png" class="w-full h-full mx-auto " alt="积分">
                  <span class="text-xs font-bold text-[#999] drop-shadow-lg absolute top-2/3 left-0 block w-full text-center">{{ prizes[index].value }}积分</span>
                </div>
                <div v-else-if="prizes[index].type === 'item'" class="text-center w-full h-full flex justify-center ">
                  <img src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/eika_mode.webp" style="height: 60%; margin-top: 10px; " alt="积分">
                  <span class="text-xs font-bold text-[#999] drop-shadow-lg absolute top-2/3 left-0 block w-full text-center">{{ prizes[index].value }}</span>
                </div>
                <div v-else class="text-xl drop-shadow-lg">{{ prizes[index].icon }}</div>
              </div>
              
              <!-- 中奖发光效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 bg-cover bg-center bg-no-repeat animate-ping"
                style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/light.png')"
              ></div>
              
              <!-- 强化中奖效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 rounded-lg animate-win-shake"
                style="
                  background: radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(255, 165, 0, 0.7) 50%, rgba(255, 69, 0, 0.5) 100%);
                  box-shadow: 
                    0 0 30px rgba(255, 215, 0, 1), 
                    0 0 60px rgba(255, 165, 0, 0.8), 
                    0 0 90px rgba(255, 69, 0, 0.6),
                    inset 0 0 20px rgba(255, 255, 255, 0.3);
                  animation: winPulse 0.8s ease-in-out infinite alternate, winShake 0.3s ease-in-out infinite;
                  border: 3px solid rgba(255, 215, 0, 0.8);
                "
              ></div>
              
              <!-- 中奖文字效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 flex items-center justify-center z-10"
              >
                <div class="text-white text-xs font-bold bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 rounded-full animate-bounce shadow-2xl border-2 border-white/50">
                  🎉 中奖！
                </div>
              </div>
              
              <!-- 中奖粒子效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 pointer-events-none overflow-hidden"
              >
                <div 
                  v-for="i in 8" 
                  :key="i"
                  class="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
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
          <div class=" flex flex-col-reverse">
            <div 
              v-for="index in [10, 11,]" 
              :key="index"
              class="relative !m-1 lottery-box w-35 h-35 bg-cover bg-center bg-no-repeat cursor-pointer transition-transform hover:scale-105  mb-2"
              style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cjbox.png'); background-size: 100% 100%;"
              :class="{ 'animate-pulse border-4 border-yellow-400': isSpinning && currentIndex === index }"
              @click="selectPrize(index)"
            >
              <!-- 奖品图标/积分 -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div v-if="prizes[index].type === 'points'" class="text-center w-full h-full">
                  <img src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png" class="w-full h-full mx-auto mb-1" alt="积分">
                  <span class="text-xs font-bold text-[#999] drop-shadow-lg absolute top-2/3 left-0 block w-full text-cente">{{ prizes[index].value }}积分</span>
                </div>
                <div v-else class="text-xl drop-shadow-lg">{{ prizes[index].icon }}</div>
              </div>
              
              <!-- 中奖发光效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 bg-cover bg-center bg-no-repeat animate-ping"
                style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/light.png')"
              ></div>
              
              <!-- 强化中奖效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 rounded-lg animate-win-shake"
                style="
                  background: radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(255, 165, 0, 0.7) 50%, rgba(255, 69, 0, 0.5) 100%);
                  box-shadow: 
                    0 0 30px rgba(255, 215, 0, 1), 
                    0 0 60px rgba(255, 165, 0, 0.8), 
                    0 0 90px rgba(255, 69, 0, 0.6),
                    inset 0 0 20px rgba(255, 255, 255, 0.3);
                  animation: winPulse 0.8s ease-in-out infinite alternate, winShake 0.3s ease-in-out infinite;
                  border: 3px solid rgba(255, 215, 0, 0.8);
                "
              ></div>
              
              <!-- 中奖文字效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 flex items-center justify-center z-10"
              >
                <div class="text-white text-xs font-bold bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 rounded-full animate-bounce shadow-2xl border-2 border-white/50">
                  🎉 中奖！
                </div>
              </div>
              
              <!-- 中奖粒子效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 pointer-events-none overflow-hidden"
              >
                <div 
                  v-for="i in 8" 
                  :key="i"
                  class="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
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
              class="relative !m-1 lottery-box w-35 h-35 bg-cover bg-center bg-no-repeat   mb-2"
              style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cjbox.png') ; background-size: 100% 100%;"
              :class="{ 'animate-pulse border-4 border-yellow-400': isSpinning && currentIndex === index }"
              @click="selectPrize(index)"
            >
              <!-- 奖品图标/积分 -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div v-if="prizes[index].type === 'points'" class="text-center w-full h-full">
                  <img src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png" class="w-full h-full mx-auto mb-1" alt="积分">
                  <span class="text-xs font-bold text-[#999] drop-shadow-lg absolute top-2/3 left-0 block w-full text-cente">{{ prizes[index].value }}积分</span>
                </div>
                <div v-else class="text-xl drop-shadow-lg">{{ prizes[index].icon }}</div>
              </div>
              
              <!-- 中奖发光效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 bg-cover bg-center bg-no-repeat animate-ping"
                style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/light.png')"
              ></div>
              
              <!-- 强化中奖效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 rounded-lg animate-win-shake"
                style="
                  background: radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(255, 165, 0, 0.7) 50%, rgba(255, 69, 0, 0.5) 100%);
                  box-shadow: 
                    0 0 30px rgba(255, 215, 0, 1), 
                    0 0 60px rgba(255, 165, 0, 0.8), 
                    0 0 90px rgba(255, 69, 0, 0.6),
                    inset 0 0 20px rgba(255, 255, 255, 0.3);
                  animation: winPulse 0.8s ease-in-out infinite alternate, winShake 0.3s ease-in-out infinite;
                  border: 3px solid rgba(255, 215, 0, 0.8);
                "
              ></div>
              
              <!-- 中奖文字效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 flex items-center justify-center z-10"
              >
                <div class="text-white text-xs font-bold bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 rounded-full animate-bounce shadow-2xl border-2 border-white/50">
                  🎉 中奖！
                </div>
              </div>
              
              <!-- 中奖粒子效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 pointer-events-none overflow-hidden"
              >
                <div 
                  v-for="i in 8" 
                  :key="i"
                  class="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
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
          <div class=" flex flex-row-reverse">
            <div 
              v-for="index in [ 6, 7, 8, 9]" 
              :key="index"
              class="relative !m-1 lottery-box w-35 h-35 bg-cover bg-center bg-no-repeat cursor-pointer transition-transform hover:scale-105"
              style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cjbox.png'); background-size: 100% 100%;"
              :class="{ 'animate-pulse border-4 border-yellow-400': isSpinning && currentIndex === index }"
              @click="selectPrize(index)"
            >
              <!-- 奖品图标/积分 -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div v-if="prizes[index].type === 'points'" class="text-center w-full h-full">
                  <img src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png" class="w-full h-full mx-auto mb-1" alt="积分">
                  <span class="text-xs font-bold text-[#999] drop-shadow-lg absolute top-2/3 left-0 block w-full text-center">{{ prizes[index].value }}积分</span>
                </div>
                <div v-else class="text-xl drop-shadow-lg">{{ prizes[index].icon }}</div>
              </div>
              
              <!-- 中奖发光效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 bg-cover bg-center bg-no-repeat animate-ping"
                style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/light.png')"
              ></div>
              
              <!-- 强化中奖效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 rounded-lg animate-win-shake"
                style="
                  background: radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(255, 165, 0, 0.7) 50%, rgba(255, 69, 0, 0.5) 100%);
                  box-shadow: 
                    0 0 30px rgba(255, 215, 0, 1), 
                    0 0 60px rgba(255, 165, 0, 0.8), 
                    0 0 90px rgba(255, 69, 0, 0.6),
                    inset 0 0 20px rgba(255, 255, 255, 0.3);
                  animation: winPulse 0.8s ease-in-out infinite alternate, winShake 0.3s ease-in-out infinite;
                  border: 3px solid rgba(255, 215, 0, 0.8);
                "
              ></div>
              
              <!-- 中奖文字效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 flex items-center justify-center z-10"
              >
                <div class="text-white text-xs font-bold bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 rounded-full animate-bounce shadow-2xl border-2 border-white/50">
                  🎉 中奖！
                </div>
              </div>
              
              <!-- 中奖粒子效果 -->
              <div 
                v-if="winningIndex === index && showWinEffect"
                class="absolute inset-0 pointer-events-none overflow-hidden"
              >
                <div 
                  v-for="i in 8" 
                  :key="i"
                  class="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
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
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div v-if="isSpinning" class="text-white text-lg font-bold animate-bounce drop-shadow-lg text-shadow">
              🎲 抽奖中...
            </div>
            <div v-else-if="showWinEffect" class="text-yellow-300 text-lg font-bold animate-pulse drop-shadow-lg text-shadow">
              🎉 恭喜中奖！
            </div>
            <div v-else class="text-white/80 text-sm drop-shadow text-shadow">
              <!-- 抽奖区域 -->
      <div class="lottery-section w-full max-w-[600px] !px-4 !mb-8 z-35 text-center">
        <!-- 抽奖按钮 -->
        <div class="text-center !mb-6">
          <button 
            @click="startLottery"
            :disabled="remainingChances <= 0 || !authStore.isAuthenticated"
            class="relative group"
          >
            <!-- 抽奖按钮背景图 -->
            <div class="w-32 h-25 bg-cover bg-center bg-no-repeat mx-auto transition-transform duration-300 group-hover:scale-105 group-disabled:scale-95 group-disabled:opacity-60"
                 style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/btn-cj.png')">
            </div>
          </button>
          
          <div class="mt-3 text-white text-center drop-shadow-lg">
            <span class="text-base font-medium text-shadow">剩余次数：</span>
            <span class="text-xl font-bold text-yellow-300 text-shadow-lg">{{ remainingChances }}</span>
          </div>
          
          <!-- 登录提示 -->
          <div v-if="!authStore.isAuthenticated" class="mt-3 text-red-300 text-sm text-center">
            请先登录才能参与抽奖
          </div>
        </div>
            </div>
          </div>
        </div>
      </div>

  

      <!-- 奖品展示区域 -->
      <div class="prizes-showcase w-full max-w-[900px] px-4 mb-8 z-35">
        <div class="backdrop-blur-lg bg-black/50 rounded-xl p-6 border border-white/30 shadow-2xl">
          <div class="text-center mb-6">
            <h3 class="text-[20px] md:text-[24px] font-bold text-white mb-2 text-shadow-lg drop-shadow-lg">
              奖品展示
            </h3>
            <p class="text-[14px] md:text-[16px] text-white/95 text-center text-shadow drop-shadow">
              所有奖品及中奖概率一览
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- 传说级奖品 -->
            <div 
              v-for="prize in prizePool.filter(p => p.rarity === 'legendary')" 
              :key="prize.name"
              class="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg p-4 border-2 border-yellow-400/50 hover:border-yellow-400/80 transition-all duration-300 hover:scale-105"
            >
              <div class="flex items-center mb-3">
                <div class="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mr-3">
                  <img v-if="prize.type === 'item'" :src="prize.icon" class="h-[80%]" alt="奖品">
                  <img v-else :src="prize.icon" class="h-[80%]" alt="积分">
                </div>
                <div class="flex-1">
                  <h4 class="text-white font-bold text-sm mb-1 text-shadow">{{ prize.name }}</h4>
                  <div class="flex items-center justify-between">
                    <span class="text-yellow-300 text-xs font-medium">
                      {{ prize.type === 'points' ? `+${prize.value}积分` : prize.value }}
                    </span>
                    <span class="text-yellow-400 text-xs font-bold bg-yellow-400/20 px-2 py-1 rounded">
                      {{ prize.probability }}%
                    </span>
                  </div>
                </div>
              </div>
              <div class="text-xs text-yellow-300/80 text-center">传说级</div>
            </div>

            <!-- 史诗级奖品 -->
            <div 
              v-for="prize in prizePool.filter(p => p.rarity === 'epic')" 
              :key="prize.name"
              class="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 border-2 border-purple-400/50 hover:border-purple-400/80 transition-all duration-300 hover:scale-105"
            >
              <div class="flex items-center mb-3">
                <div class="w-12 h-12 bg-purple-400/20 rounded-lg flex items-center justify-center mr-3">
                  <img :src="prize.icon" class="h-[80%]" alt="积分">
                </div>
                <div class="flex-1">
                  <h4 class="text-white font-bold text-sm mb-1 text-shadow">{{ prize.name }}</h4>
                  <div class="flex items-center justify-between">
                    <span class="text-purple-300 text-xs font-medium">+{{ prize.value }}积分</span>
                    <span class="text-purple-400 text-xs font-bold bg-purple-400/20 px-2 py-1 rounded">
                      {{ prize.probability }}%
                    </span>
                  </div>
                </div>
              </div>
              <div class="text-xs text-purple-300/80 text-center">史诗级</div>
            </div>

            <!-- 稀有级奖品 -->
            <div 
              v-for="prize in prizePool.filter(p => p.rarity === 'rare')" 
              :key="prize.name"
              class="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg p-4 border-2 border-blue-400/50 hover:border-blue-400/80 transition-all duration-300 hover:scale-105"
            >
              <div class="flex items-center mb-3">
                <div class="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center mr-3">
                  <img :src="prize.icon" class="h-[80%]" alt="积分">
                </div>
                <div class="flex-1">
                  <h4 class="text-white font-bold text-sm mb-1 text-shadow">{{ prize.name }}</h4>
                  <div class="flex items-center justify-between">
                    <span class="text-blue-300 text-xs font-medium">+{{ prize.value }}积分</span>
                    <span class="text-blue-400 text-xs font-bold bg-blue-400/20 px-2 py-1 rounded">
                      {{ prize.probability }}%
                    </span>
                  </div>
                </div>
              </div>
              <div class="text-xs text-blue-300/80 text-center">稀有级</div>
            </div>

            <!-- 普通级奖品 -->
            <div 
              v-for="prize in prizePool.filter(p => p.rarity === 'uncommon')" 
              :key="prize.name"
              class="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg p-4 border-2 border-green-400/50 hover:border-green-400/80 transition-all duration-300 hover:scale-105"
            >
              <div class="flex items-center mb-3">
                <div class="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center mr-3">
                  <img :src="prize.icon" class="h-[80%]" alt="积分">
                </div>
                <div class="flex-1">
                  <h4 class="text-white font-bold text-sm mb-1 text-shadow">{{ prize.name }}</h4>
                  <div class="flex items-center justify-between">
                    <span class="text-green-300 text-xs font-medium">+{{ prize.value }}积分</span>
                    <span class="text-green-400 text-xs font-bold bg-green-400/20 px-2 py-1 rounded">
                      {{ prize.probability }}%
                    </span>
                  </div>
                </div>
              </div>
              <div class="text-xs text-green-300/80 text-center">普通级</div>
            </div>

            <!-- 基础级奖品 -->
            <div 
              v-for="prize in prizePool.filter(p => p.rarity === 'common')" 
              :key="prize.name"
              class="bg-gradient-to-r from-gray-600/20 to-slate-600/20 rounded-lg p-4 border-2 border-gray-400/50 hover:border-gray-400/80 transition-all duration-300 hover:scale-105"
            >
              <div class="flex items-center mb-3">
                <div class="w-12 h-12 bg-gray-400/20 rounded-lg flex items-center justify-center mr-3">
                  <img :src="prize.icon" class="h-[80%]" alt="积分">
                </div>
                <div class="flex-1">
                  <h4 class="text-white font-bold text-sm mb-1 text-shadow">{{ prize.name }}</h4>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-300 text-xs font-medium">+{{ prize.value }}积分</span>
                    <span class="text-gray-400 text-xs font-bold bg-gray-400/20 px-2 py-1 rounded">
                      {{ prize.probability }}%
                    </span>
                  </div>
                </div>
              </div>
              <div class="text-xs text-gray-300/80 text-center">基础级</div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { lotteryApi, type LotteryResponse, type LotteryStatusResponse, type LotteryRecord, type ApiResponse } from '@/services/api'

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

// 统一奖品配置 - 整合概率和棋盘显示
const prizePool = [
  // 传说级奖品
  { type: 'item', value: '模型皮肤', icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/eika_mode.webp', name: '稀有皮肤', probability: 0.1, rarity: 'legendary' },
  { type: 'points', value: 10000, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '巨额积分', probability: 0.1, rarity: 'legendary' },
  // 史诗级奖品
  { type: 'points', value: 5000, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '大额积分', probability: 0.5, rarity: 'epic' },
  // 稀有级奖品
  { type: 'points', value: 1000, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '丰厚积分', probability: 2, rarity: 'rare' },
  { type: 'points', value: 500, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '优质积分', probability: 5, rarity: 'rare' },
  // 普通级奖品
  { type: 'points', value: 300, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '良好积分', probability: 10, rarity: 'uncommon' },
  // 基础级奖品 - 可以有多个格子
  { type: 'points', value: 150, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '普通积分', probability: 20, rarity: 'common' },
  { type: 'points', value: 100, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '基础积分', probability: 17, rarity: 'common' },
  { type: 'points', value: 50, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '微量积分', probability: 15, rarity: 'common' },
  { type: 'points', value: 20, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '少量积分', probability: 30.2, rarity: 'common' }
]

// 棋盘奖品配置 - 按棋盘位置排列（12个格子）
const prizes = ref([
  { type: 'points', value: 10000, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '巨额积分' },  // 0
  { type: 'points', value: 5000, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '大额积分' },   // 1
  { type: 'item', value: '模型皮肤', icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/eika_mode.webp', name: '稀有皮肤' }, // 2
  { type: 'points', value: 20, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '少量积分' },     // 3
  { type: 'points', value: 1000, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '丰厚积分' },  // 4
  { type: 'points', value: 500, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '优质积分' },   // 5
  { type: 'points', value: 300, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '良好积分' },   // 6
  { type: 'points', value: 50, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '微量积分' },    // 7
  { type: 'points', value: 150, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '普通积分' },  // 8
  { type: 'points', value: 100, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '基础积分' },  // 9
  { type: 'points', value: 50, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '微量积分' },    // 10
  { type: 'points', value: 20, icon: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cont1-icon1.png', name: '少量积分' }     // 11
])

// 大富翁棋盘路径顺序 (0->1->2->3->4->5->6->7->8->9->10->11->0...)
const boardPath = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

// 根据后端返回的奖品信息找到对应的棋盘位置
const findPrizePosition = (prizeName: string, prizeType: string, prizeValue: string) => {
  console.log('Finding position for:', { prizeName, prizeType, prizeValue })
  
  // 尝试匹配奖品类型和值
  const matchingPositions = []
  
  for (let i = 0; i < prizes.value.length; i++) {
    const boardPrize = prizes.value[i]
    
    if (prizeType === 'points') {
      // 对于积分奖品，尝试匹配数值
      const valueNum = parseInt(prizeValue)
      if (boardPrize.type === 'points' && boardPrize.value === valueNum) {
        matchingPositions.push(i)
      }
    } else if (prizeType === 'item' || prizeType === 'special') {
      // 对于物品奖品，匹配名称或类型
      if (boardPrize.type === 'item' || prizeName.includes('皮肤') || prizeName.includes('道具')) {
        matchingPositions.push(i)
      }
    }
  }
  
  // 如果找到匹配的位置，随机选择一个
  if (matchingPositions.length > 0) {
    const randomIndex = Math.floor(Math.random() * matchingPositions.length)
    return matchingPositions[randomIndex]
  }
  
  // 如果没有找到匹配的位置，返回随机位置
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
  
  isSpinning.value = true
  
  try {
    // 调用后端API执行抽奖
    const response: ApiResponse<LotteryResponse> = await lotteryApi.drawLottery({
      lotteryType: 'normal'
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
            alert(`🎉 恭喜获得：${lotteryResult.prizeName} ${lotteryResult.prizeType === 'points' ? `+${lotteryResult.prizeValue}积分` : `(${lotteryResult.prizeValue})`}`)
          }, 500)
          
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

// 加载抽奖数据
const loadLotteryData = async () => {
  try {
    // 获取抽奖状态
    const statusResponse: ApiResponse<LotteryStatusResponse> = await lotteryApi.getLotteryStatus()
    if (statusResponse.success && statusResponse.data) {
      const status = statusResponse.data
      remainingChances.value = status.remainingChances
      todayDraws.value = status.todayLotteryCount
      hasSignedIn.value = status.hasSignedIn
      dailyLimit.value = status.dailyLimit
    }
    
    // 获取今日抽奖记录
    const todayRecordsResponse: ApiResponse<LotteryRecord[]> = await lotteryApi.getTodayLotteryRecords()
    if (todayRecordsResponse.success && todayRecordsResponse.data) {
      const records = todayRecordsResponse.data
      todayWins.value = records.length
      
      // 计算今日获得的总积分
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
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes winPulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.05);
    opacity: 1;
  }
}

@keyframes winShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

.animate-win-shake {
  animation: winShake 0.5s ease-in-out infinite;
}

.bg-gradient-radial {
  background: radial-gradient(circle, var(--tw-gradient-stops));
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.text-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

.lottery-box {
  transition: all 0.3s ease;
}
</style>