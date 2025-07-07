<template>
  <div class="anniversary-page fixed inset-0 w-full h-full overflow-y-auto">
    <!-- 背景视频层 -->
    <div class="fixed inset-0 w-full h-full -z-30">
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
    
    <!-- 背景装饰层 -->
    <div class="anniversary-grass pointer-events-none fixed inset-0 -z-20"></div>
    
    <!-- 背景动效层 -->
    <div class="background-effects fixed inset-0 pointer-events-none -z-10">
      <div 
        v-for="effect in backgroundEffects" 
        :key="effect.id"
        class="effect-particle absolute"
        :class="effect.className"
        :style="{ 
          left: effect.x + '%', 
          top: effect.y + '%',
          animationDelay: effect.delay + 's',
          animationDuration: effect.duration + 's'
        }"
      ></div>
    </div>

    <!-- 主内容区域 -->
    <div class="anniversary-content relative w-full min-h-screen z-0 flex flex-col items-center pt-4 pb-16">
      <!-- 标题区域 -->
      <div class="hero-section z-20 text-center px-4 flex flex-col items-center justify-center mb-12">
        <div class="hero-title-wrapper mb-8">
          <div class="celebration-badge mb-4">
            <n-tag type="success" size="large" class="celebration-tag">
              🎉 周年庆典正在进行中 🎉
            </n-tag>
          </div>
          <n-h1 class="celebration-title text-center !text-[52px] md:!text-[72px] font-bold text-white mb-4 text-shadow-lg">
            CS2 黄粱一梦社区服
          </n-h1>
          <n-h2 class="anniversary-subtitle text-center !text-[36px] md:!text-[48px] font-bold text-blue-400 mb-4 text-shadow-lg">
            一周年庆典
          </n-h2>
          <div class="hero-subtitle-wrapper">
            <n-h5 class="hero-subtitle text-center text-lg md:text-xl text-white/95 max-w-4xl mx-auto text-shadow">
              感谢所有玩家的支持与陪伴，让我们一起庆祝这个特殊的时刻！
            </n-h5>
          </div>
        </div>
        
        <!-- 科技感装饰线 -->
        <div class="tech-divider relative flex items-center justify-center my-8 w-full max-w-lg">
          <div class="tech-line h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-full"></div>
          <div class="tech-dot absolute w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      <!-- 活动详情区域 -->
      <div class="activities-section w-full max-w-6xl mx-auto px-4 mb-12">
        <n-h3 class="text-center text-3xl md:text-4xl font-bold text-white mb-8">
          庆典活动
        </n-h3>
        
        <n-grid cols="1 s:2 m:2 l:3" x-gap="24" y-gap="24" responsive="screen">
          <n-grid-item v-for="(activity, index) in activities" :key="index">
            <n-card class="activity-card h-full backdrop-blur-lg bg-black/40 border border-blue-500/40 hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-400/70" hoverable>
              <template #header>
                <div class="activity-header flex items-center gap-3 min-h-[48px]">
                  <div class="activity-icon-wrapper p-3 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 shadow-lg">
                    <component :is="activity.icon" class="w-[24px] h-[24px] text-white" />
                  </div>
                  <div class="activity-title-wrapper">
                    <span class="activity-title text-white font-bold text-lg">{{ activity.title }}</span>
                    <div class="activity-time text-blue-300 text-sm">{{ activity.time }}</div>
                  </div>
                </div>
              </template>
              <div class="activity-content text-white/90 text-sm leading-relaxed mb-4">
                {{ activity.description }}
              </div>
              <div class="activity-rewards mb-4">
                <div class="rewards-title text-yellow-400 font-semibold mb-2">🎁 活动奖励：</div>
                <div class="rewards-list">
                  <n-tag 
                    v-for="reward in activity.rewards" 
                    :key="reward"
                    type="warning" 
                    size="small"
                    class="mr-2 mb-1"
                  >
                    {{ reward }}
                  </n-tag>
                </div>
              </div>
              <template #footer>
                <div class="activity-footer flex items-center justify-between">
                  <div class="activity-status">
                    <n-tag 
                      :type="activity.status === 'active' ? 'success' : activity.status === 'coming' ? 'warning' : 'default'" 
                      size="small"
                    >
                      {{ activity.statusText }}
                    </n-tag>
                  </div>
                  <n-button 
                    :type="activity.status === 'active' ? 'primary' : 'default'" 
                    size="small"
                    @click="joinActivity(activity)"
                  >
                    {{ activity.buttonText }}
                  </n-button>
                </div>
              </template>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>

      <!-- 奖励展示区域 -->
      <div class="rewards-section w-full max-w-6xl mx-auto px-4 mb-12">
        <n-h3 class="text-center text-3xl md:text-4xl font-bold text-white mb-8">
          专属奖励
        </n-h3>
        
        <n-grid cols="2 s:3 m:4 l:5" x-gap="20" y-gap="20" responsive="screen">
          <n-grid-item v-for="(reward, index) in exclusiveRewards" :key="index">
            <n-card class="reward-card h-full backdrop-blur-lg bg-black/30 border border-yellow-500/30 hover:bg-black/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-yellow-400/60" hoverable>
              <div class="reward-content text-center">
                <div class="reward-icon-wrapper mb-3 flex justify-center">
                  <div class="reward-icon p-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg">
                    <component :is="reward.icon" class="w-[32px] h-[32px] text-white" />
                  </div>
                </div>
                <div class="reward-name text-white font-bold text-sm mb-2">{{ reward.name }}</div>
                <div class="reward-description text-white/70 text-xs leading-relaxed mb-3">
                  {{ reward.description }}
                </div>
                <div class="reward-rarity">
                  <n-tag 
                    :type="reward.rarity === 'legendary' ? 'warning' : reward.rarity === 'epic' ? 'info' : 'default'" 
                    size="small"
                  >
                    {{ reward.rarityText }}
                  </n-tag>
                </div>
              </div>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>

      <!-- 统计数据区域 -->
      <div class="stats-section w-full max-w-4xl mx-auto px-4 mb-12">
        <n-h3 class="text-center text-3xl md:text-4xl font-bold text-white mb-8">
          社区数据
        </n-h3>
        
        <div class="stats-grid grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="(stat, index) in stats" :key="index" class="stat-item">
            <n-card class="stat-card h-full backdrop-blur-lg bg-black/40 border border-green-500/40 hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl" hoverable>
              <div class="stat-content text-center">
                <div class="stat-icon-wrapper mb-3 flex justify-center">
                  <div class="stat-icon p-3 rounded-full bg-gradient-to-br from-green-400 to-teal-500 shadow-lg">
                    <component :is="stat.icon" class="w-[28px] h-[28px] text-white" />
                  </div>
                </div>
                <div class="stat-number text-2xl md:text-3xl font-bold text-white mb-1">{{ stat.number }}</div>
                <div class="stat-label text-green-300 text-sm">{{ stat.label }}</div>
              </div>
            </n-card>
          </div>
        </div>
      </div>

      <!-- 参与入口区域 -->
      <div class="participation-section w-full max-w-4xl mx-auto px-4">
        <n-h3 class="text-center text-3xl md:text-4xl font-bold text-white mb-8">
          立即参与
        </n-h3>
        
        <div class="participation-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          <n-card class="participation-card backdrop-blur-lg bg-black/40 border border-blue-500/40 hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl" hoverable>
            <template #header>
              <div class="participation-header flex items-center gap-3">
                <div class="participation-icon-wrapper p-3 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 shadow-lg">
                  <GameControllerIcon class="w-[24px] h-[24px] text-white" />
                </div>
                <span class="participation-title text-white font-bold text-lg">游戏内参与</span>
              </div>
            </template>
            <div class="participation-content text-white/90 text-sm leading-relaxed mb-4">
              直接进入游戏服务器，参与各种周年庆活动，获取专属奖励。
            </div>
            <template #footer>
              <n-button type="primary" size="large" block @click="joinGame">
                <template #icon>
                  <n-icon>
                    <PlayIcon />
                  </n-icon>
                </template>
                立即进入游戏
              </n-button>
            </template>
          </n-card>
          
          <n-card class="participation-card backdrop-blur-lg bg-black/40 border border-purple-500/40 hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl" hoverable>
            <template #header>
              <div class="participation-header flex items-center gap-3">
                <div class="participation-icon-wrapper p-3 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 shadow-lg">
                  <ChatbubbleIcon class="w-[24px] h-[24px] text-white" />
                </div>
                <span class="participation-title text-white font-bold text-lg">社区互动</span>
              </div>
            </template>
            <div class="participation-content text-white/90 text-sm leading-relaxed mb-4">
              加入我们的社区群聊，与其他玩家交流，分享游戏心得。
            </div>
            <template #footer>
              <n-button type="primary" size="large" block @click="joinCommunity">
                <template #icon>
                  <n-icon>
                    <People />
                  </n-icon>
                </template>
                加入社区
              </n-button>
            </template>
          </n-card>
        </div>
      </div>
    </div>

    <!-- 背景动效 -->
    <div class="background-effects fixed inset-0 pointer-events-none -z-10">
      <div 
        v-for="effect in backgroundEffects" 
        :key="effect.id"
        class="effect-particle absolute"
        :class="effect.className"
        :style="{ 
          left: effect.x + '%', 
          top: effect.y + '%',
          animationDelay: effect.delay + 's',
          animationDuration: effect.duration + 's'
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  Calendar as CalendarIcon,
  Chatbubble as ChatbubbleIcon,
  GameController as GameControllerIcon,
  Gift as GiftIcon,
  People,
  Person as PersonIcon,
  Play as PlayIcon,
  Server as ServerIcon,
  Star as StarIcon,
  Trophy as TrophyIcon
} from '@vicons/ionicons5'
import { NButton, NCard, NGrid, NGridItem, NH1, NH2, NH3, NH5, NIcon, NTag } from 'naive-ui'
import { onMounted, ref } from 'vue'

// 活动数据
const activities = ref([
  {
    title: '限时武器皮肤',
    time: '7月15日 - 7月22日',
    description: '专属周年庆武器皮肤免费领取，包含AK-47、AWP、M4A4等热门武器的限定皮肤。',
    rewards: ['AK-47 | 周年纪念', 'AWP | 黄金时代', 'M4A4 | 社区之光'],
    status: 'active',
    statusText: '进行中',
    buttonText: '立即领取',
    icon: StarIcon
  },
  {
    title: '社区竞技赛',
    time: '7月16日 20:00',
    description: '5v5竞技比赛，单淘汰制，胜者获得丰厚奖励。报名截止时间：7月15日 18:00。',
    rewards: ['冠军礼包', '亚军奖金', '季军徽章'],
    status: 'coming',
    statusText: '即将开始',
    buttonText: '立即报名',
    icon: TrophyIcon
  },
  {
    title: '社区交流会',
    time: '7月17日 19:00',
    description: '线上语音聊天室，与管理员和其他玩家交流游戏心得，分享精彩瞬间。',
    rewards: ['专属头像框', '社区徽章', '纪念品'],
    status: 'coming',
    statusText: '即将开始',
    buttonText: '预约参加',
    icon: ChatbubbleIcon
  },
  {
    title: '服务器升级',
    time: '7月18日',
    description: '服务器硬件升级，提升游戏体验，新增更多游戏模式和地图。',
    rewards: ['体验优化', '新增地图', '性能提升'],
    status: 'coming',
    statusText: '即将开始',
    buttonText: '了解详情',
    icon: ServerIcon
  },
  {
    title: '周年抽奖',
    time: '7月19日 - 7月21日',
    description: '每日登录即可参与抽奖，奖品包括游戏内物品和实物奖励。',
    rewards: ['稀有皮肤', '游戏周边', '现金红包'],
    status: 'coming',
    statusText: '即将开始',
    buttonText: '查看奖品',
    icon: GiftIcon
  },
  {
    title: '回忆展示',
    time: '整个周年庆期间',
    description: '展示社区一年来的精彩瞬间，包括比赛集锦、玩家作品、社区发展历程。',
    rewards: ['纪念视频', '社区历史', '玩家故事'],
    status: 'active',
    statusText: '进行中',
    buttonText: '查看回忆',
    icon: CalendarIcon
  }
])

// 专属奖励数据
const exclusiveRewards = ref([
  {
    name: 'AK-47 | 周年纪念',
    description: '限量版AK-47皮肤，独特的周年庆设计',
    rarity: 'legendary',
    rarityText: '传说级',
    icon: StarIcon
  },
  {
    name: 'AWP | 黄金时代',
    description: '金色主题AWP皮肤，象征社区的黄金时代',
    rarity: 'legendary',
    rarityText: '传说级',
    icon: StarIcon
  },
  {
    name: '专属头像框',
    description: '周年庆专属头像装饰框',
    rarity: 'epic',
    rarityText: '史诗级',
    icon: PersonIcon
  },
  {
    name: '社区徽章',
    description: '一周年纪念徽章，展示你的资历',
    rarity: 'epic',
    rarityText: '史诗级',
    icon: TrophyIcon
  },
  {
    name: '纪念品礼包',
    description: '包含多种周年庆纪念物品',
    rarity: 'rare',
    rarityText: '稀有级',
    icon: GiftIcon
  }
])

// 统计数据
const stats = ref([
  {
    number: '1000+',
    label: '注册玩家',
    icon: PersonIcon
  },
  {
    number: '10000+',
    label: '游戏局数',
    icon: GameControllerIcon
  },
  {
    number: '50+',
    label: '活动举办',
    icon: CalendarIcon
  },
  {
    number: '365',
    label: '运营天数',
    icon: ServerIcon
  }
])

// 背景动效
const backgroundEffects = ref<Array<{
  id: number
  x: number
  y: number
  delay: number
  duration: number
  className: string
}>>([])

// 初始化背景动效
const initBackgroundEffects = () => {
  const effects = []
  for (let i = 0; i < 30; i++) {
    effects.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 6,
      className: `effect-${i % 3 + 1}`
    })
  }
  backgroundEffects.value = effects
}

// 活动参与方法
const joinActivity = (activity: typeof activities.value[0]) => {
  // 这里可以添加具体的活动参与逻辑
  console.log('参与活动:', activity.title)
  // 可以根据不同活动类型跳转到不同页面或显示不同模态框
}

const joinGame = () => {
  // 跳转到游戏或显示游戏连接信息
  console.log('进入游戏')
}

const joinCommunity = () => {
  // 跳转到社区页面或显示社区群聊信息
  console.log('加入社区')
}

onMounted(() => {
  initBackgroundEffects()
})
</script>

<style scoped>
/* 隐藏header入口 */
:deep(.header-menu) {
  display: none !important;
}

/* 全局header隐藏 */
:global(.header-menu) {
  display: none !important;
}

.anniversary-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  z-index: 1000;
}

.anniversary-grass {
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
  opacity: 0.4;
  z-index: -20;
}

.anniversary-content {
  position: relative;
  z-index: 0;
  padding: 2rem 1rem;
}

/* 庆典标题样式 */
.celebration-badge {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.celebration-title {
  background: linear-gradient(45deg, #ffffff, #e0e7ff, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: title-glow 3s ease-in-out infinite;
}

@keyframes title-glow {
  0%, 100% { 
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  }
  50% { 
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(59, 130, 246, 0.5);
  }
}

.anniversary-subtitle {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 3s ease-in-out infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* 科技感装饰线 */
.tech-divider {
  position: relative;
}

.tech-line {
  position: relative;
  overflow: hidden;
}

.tech-line::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent);
  animation: scan 2s infinite;
}

@keyframes scan {
  0% { left: -100%; }
  100% { left: 100%; }
}

.tech-dot {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.8);
}

/* 活动卡片样式 */
.activity-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
}

.activity-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transition: left 0.6s ease;
}

.activity-card:hover::before {
  left: 100%;
}

.activity-icon-wrapper {
  position: relative;
  overflow: hidden;
}

.activity-icon-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: icon-shine 3s infinite;
}

@keyframes icon-shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* 奖励卡片样式 */
.reward-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.reward-card:hover {
  transform: translateY(-5px);
}

.reward-icon-wrapper {
  position: relative;
}

.reward-icon {
  position: relative;
  overflow: hidden;
}

.reward-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: reward-shine 2s infinite;
}

@keyframes reward-shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* 统计卡片样式 */
.stat-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.stat-number {
  animation: number-glow 2s ease-in-out infinite;
}

@keyframes number-glow {
  0%, 100% { 
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }
  50% { 
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(34, 197, 94, 0.4);
  }
}

/* 参与卡片样式 */
.participation-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
}

.participation-card:hover {
  transform: translateY(-3px);
}

/* 背景动效 */
.background-effects {
  pointer-events: none;
}

.effect-particle {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  opacity: 0.6;
}

.effect-1 {
  background: radial-gradient(circle, rgba(59, 130, 246, 0.8), transparent);
  animation: effect-float-1 8s infinite ease-in-out;
}

.effect-2 {
  background: radial-gradient(circle, rgba(147, 51, 234, 0.8), transparent);
  animation: effect-float-2 10s infinite ease-in-out;
}

.effect-3 {
  background: radial-gradient(circle, rgba(6, 182, 212, 0.8), transparent);
  animation: effect-float-3 12s infinite ease-in-out;
}

@keyframes effect-float-1 {
  0%, 100% { 
    transform: translateY(0px) translateX(0px) rotate(0deg);
    opacity: 0.6;
  }
  50% { 
    transform: translateY(-30px) translateX(20px) rotate(180deg);
    opacity: 1;
  }
}

@keyframes effect-float-2 {
  0%, 100% { 
    transform: translateY(0px) translateX(0px) rotate(0deg);
    opacity: 0.6;
  }
  50% { 
    transform: translateY(-25px) translateX(-15px) rotate(180deg);
    opacity: 1;
  }
}

@keyframes effect-float-3 {
  0%, 100% { 
    transform: translateY(0px) translateX(0px) rotate(0deg);
    opacity: 0.6;
  }
  50% { 
    transform: translateY(-35px) translateX(10px) rotate(180deg);
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .anniversary-content {
    padding: 1rem;
  }
  
  .celebration-title {
    font-size: 2.5rem !important;
  }
  
  .anniversary-subtitle {
    font-size: 1.8rem !important;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .participation-grid {
    grid-template-columns: 1fr;
  }
  
  .activity-cards {
    grid-template-columns: 1fr;
  }
  
  .rewards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .anniversary-content {
    padding: 0.5rem;
  }
  
  .celebration-title {
    font-size: 2rem !important;
  }
  
  .anniversary-subtitle {
    font-size: 1.5rem !important;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .rewards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
