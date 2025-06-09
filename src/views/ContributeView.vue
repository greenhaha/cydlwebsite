<template>
  <div class="contribute-page">
    <!-- 背景视频 -->
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

    <!-- 主内容区域 -->
    <div class="contribute-content relative z-10 pt-[60px] pb-16 min-h-screen ">
      <div class="flex justify-center !mb-1">
        <!-- 页面标题 -->
      <div class="hero-section text-center py-12 px-4">
        <h1 class="hero-title text-4xl md:text-6xl font-bold text-white !mb-4 text-shadow-lg">
          致谢贡献者
        </h1>
        <p class="hero-subtitle text-lg md:text-xl text-white/110 max-w-2xl mx-auto text-shadow">
          感谢所有为CYDL服务器发展做出贡献的朋友们，正是因为有了你们的支持，我们才能为大家提供更好的游戏体验
        </p>
      </div>
      </div>

      <div class="flex justify-center">
        <!-- 内容容器 -->
        <div class="contribute-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 捐赠者区域 -->
        <section class="donors-section mb-12">
          <div class="section-header text-center !mb-8">
            <h2 class="section-title text-3xl md:text-4xl font-bold text-white mb-4 text-shadow">
              💝 赞助支持者
            </h2>
            <p class="section-description text-black/80 text-lg text-shadow">
              感谢以下朋友们的慷慨赞助，为服务器的运营提供了强有力的支持
            </p>
          </div>

          <div class="contributors-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div
              v-for="donor in contributeList.donors"
              :key="donor.name"
              class="contributor-card group"
            >
              <n-card
                class="h-full backdrop-blur-md bg-white/95 border border-white/40 hover:bg-white/98 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                :bordered="false"
              >
                <div class="text-center">
                  <div class="contributor-avatar mb-4">
                    <div class="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {{ getInitials(donor.name) }}
                    </div>
                  </div>
                   <h3 class="contributor-name text-xl font-semibold text-gray-950 mb-3 font-bold drop-shadow-sm">
                     {{ donor.name.trim() }}
                   </h3>
                   <p class="contributor-description text-gray-800 text-sm leading-relaxed font-medium drop-shadow-sm">
                     {{ donor.supportDescription }}
                   </p>
                </div>
              </n-card>
            </div>
          </div>
        </section>

        <!-- 技术支持者区域 -->
        <section class="tech-supporters-section">
          <div class="section-header text-center mb-8">
            <h2 class="section-title text-3xl md:text-4xl font-bold text-white mb-4 text-shadow">
              🛠️ 技术开发团队
            </h2>
            <p class="section-description text-white/80 text-lg text-shadow">
              感谢开发团队成员们的辛勤付出，为大家提供了优质的技术支持和功能开发
            </p>
          </div>

          <div class="contributors-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div
              v-for="supporter in contributeList.techSupporters"
              :key="supporter.name"
              class="contributor-card group"
            >
              <n-card
                class="h-full backdrop-blur-md !bg-white/95 border border-white/40 hover:bg-white/98 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                :bordered="false"
              >
                <div class="text-center">
                  <div class="contributor-avatar mb-4">
                    <div class="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {{ getInitials(supporter.name) }}
                    </div>
                  </div>
                   <h3 class="contributor-name text-xl font-semibold text-gray-950 mb-3 font-bold drop-shadow-sm">
                     {{ supporter.name.trim() }}
                   </h3>
                   <p class="contributor-description text-gray-800 text-sm leading-relaxed font-medium drop-shadow-sm">
                     {{ supporter.supportDescription }}
                   </p>
                </div>
              </n-card>
            </div>
          </div>
        </section>
        <div class="flex justify-center">
          <!-- 感谢语 -->
        <section class="thanks-section text-center mt-16 py-12">
          <div class="thanks-card max-w-4xl mx-auto">
            <n-card class="backdrop-blur-sm !bg-white/10 border border-white/20" :bordered="false">
              <div class="p-8">
                <h3 class="text-2xl md:text-3xl font-bold text-white !mb-6 text-shadow">
                  🙏 特别感谢
                </h3>
                <p class="text-white/110 text-lg leading-relaxed text-shadow">
                  每一份支持都弥足珍贵，每一个贡献都值得铭记。CYDL服务器能够持续为大家提供优质的游戏环境，离不开所有贡献者的无私付出。
                  未来我们将继续努力，为大家带来更好的游戏体验！
                </p>
                <div class="!mt-8">
                  <n-button type="primary" size="large" class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg" @click="goToQQGroup">
                    加入我们
                  </n-button>
                </div>
              </div>
            </n-card>
          </div>
        </section>
        </div>

      </div>
      </div>


    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NCard, NButton } from 'naive-ui'
import { contributeList } from '../const/contribute'

export default defineComponent({
  name: 'ContributeView',
  components: {
    NCard,
    NButton,
  },
  setup() {
    // 获取名字首字母用于头像显示
    const getInitials = (name: string): string => {
      const cleanName = name.trim()
      if (cleanName.length === 0) return '?'

      // 如果是中文名字，取前两个字符或第一个字符
      if (/[\u4e00-\u9fa5]/.test(cleanName)) {
        return cleanName.length >= 2 ? cleanName.substring(0, 2) : cleanName.substring(0, 1)
      }

      // 如果是英文名字，取首字母
      const words = cleanName.split(' ')
      if (words.length >= 2) {
        return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase()
      }
      return cleanName.charAt(0).toUpperCase()
    }

    const goToQQGroup = () => {
      window.open('https://qm.qq.com/cgi-bin/qm/qr?k=Sh4gcapxVV57FqXxe7ZU07-v9u8YvKVN&jump_from=webapi&authKey=HiFkDO97IWzVgJEO6SWn59U3r7vJPEfvGNq8+Y4RVgOHFRN8+CB9WhpjYJmRvyky', '_blank')
    }
    return {
      contributeList,
      getInitials,
      goToQQGroup,
    }
  },
})
</script>

<style scoped>
.contribute-page {
  min-height: 100vh;
  position: relative;
  margin: 0 auto;
  z-index: 0;
}

.home-grass {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0.6), #f5f5f5);
}

.pointer-events-none {
  pointer-events: none;
}

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

.contributor-card {
  transition: all 0.3s ease;
}

.contributor-avatar {
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contributor-card:hover .contributor-avatar {
  transform: translateY(-2px);
}

/* 响应式优化 */
@media (max-width: 640px) {
  .contribute-container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .hero-section {
    padding: 2rem 1rem;
  }

  .contributors-grid {
    gap: 1rem;
  }
}

/* 深色模式优化 */
@media (prefers-color-scheme: dark) {
  .contributor-card :deep(.n-card) {
    background: rgba(255, 255, 255, 0.97) !important;
    border: 1px solid rgba(255, 255, 255, 0.4) !important;
  }

  .contributor-card:hover :deep(.n-card) {
    background: rgba(255, 255, 255, 0.99) !important;
  }
}

/* 卡片悬停效果增强 */
.contributor-card:hover :deep(.n-card) {
  background: rgba(255, 255, 255, 0.99) !important;
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25) !important;
}

/* 按钮样式增强 */
:deep(.n-button--primary) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border: none !important;
  font-weight: 600;
  transition: all 0.3s ease;
}

:deep(.n-button--primary:hover) {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%) !important;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>
