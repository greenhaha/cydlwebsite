<template>
  <div class="registration-page relative min-h-screen w-full overflow-hidden">
    <!-- 背景视频 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="pointer-events-none absolute inset-0">
        <video
          src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/video/bg/4K.mp4"
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

    <!-- 装饰性背景元素 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
        <div class="shape shape-6"></div>
      </div>
    </div>

    <!-- 页面内容 -->
    <div class="relative z-20 h-screen flex flex-col justify-center items-center px-4">
      <!-- 页面标题区域 -->
      <div class="text-center mb-8 max-w-2xl">
        <!-- 装饰性顶部元素 -->
        <div class="pt-3 !mb-6">
          <div class="inline-flex items-center justify-center relative">
            <div
              class="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-full blur-xl"
            ></div>
            <div
              class="relative inline-flex items-center justify-center p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
            >
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <h1
          class="page-title text-[36px] md:text-[42px] font-black text-white mb-4 leading-tight tracking-tight drop-shadow-lg"
        >
          <span
            class="block bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-md"
          >
            每日签到
          </span>
        </h1>
        <div class="subtitle-container !mb-6">
          <p
            class="page-subtitle text-[16px] md:text-[18px] text-white/90 leading-relaxed font-medium drop-shadow-md"
          >
            坚持每日签到，获得丰厚积分奖励
          </p>
        </div>
        <div class="flex justify-center space-x-2 !mb-6">
          <div class="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
          <div class="w-6 h-0.5 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"></div>
          <div class="w-8 h-0.5 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full"></div>
        </div>
      </div>

      <!-- 签到卡片容器 -->
      <div class="signin-container relative">
        <!-- 卡片背景装饰 -->
        <div class="card-bg-decoration absolute -inset-6 opacity-30">
          <div
            class="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-[2.5rem] blur-2xl"
          ></div>
        </div>

        <!-- 主签到卡片 -->
        <div class="signin-card relative w-full max-w-sm mx-auto">
          <div
            class="card-inner bg-white/98 backdrop-blur-2xl rounded-[2rem] border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-700"
          >
            <!-- 卡片顶部装饰条 -->
            <div
              class="card-header-decoration h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-[2rem] mb-0"
            ></div>

            <div class="p-8">
              <!-- 卡片头部 -->
              <div class="text-center !mb-6">
                <div class="icon-container relative inline-block mb-4">
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-xl blur-lg"
                  ></div>
                  <div
                    class="relative w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300"
                  >
                    <svg
                      class="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h2
                  class="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent !mb-2 drop-shadow-sm"
                >
                  签到中心
                </h2>
                <p class="text-gray-600 text-sm font-medium drop-shadow-sm">
                  完成每日签到，积分奖励等你来拿
                </p>
              </div>

              <!-- 输入区域 -->
              <div class="input-section !mb-6">
                <div class="input-group relative">
                  <label class="block text-sm font-bold text-gray-700 !mb-3 drop-shadow-sm">
                    <span class="flex items-center">
                      <div
                        class="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-2"
                      >
                        <svg
                          class="w-2.5 h-2.5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      QQ号码
                    </span>
                  </label>
                  <div class="relative">
                    <input
                      v-model="qqNumber"
                      type="text"
                      placeholder="请输入您的QQ号码"
                      class="custom-input w-full px-4 py-3 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-400 text-base font-medium"
                    />
                    <div
                      v-if="qqNumber"
                      class="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <div
                        class="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center"
                      >
                        <svg
                          class="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="3"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="input-helper !mt-2">
                    <p
                      v-if="!hasSignedIn && !errorMessage"
                      class="text-xs text-gray-500 flex items-center drop-shadow-sm"
                    >
                      <svg
                        class="w-3 h-3 mr-2 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      请输入您的QQ号码，然后点击下方签到按钮
                    </p>
                  </div>
                </div>
              </div>

              <!-- 签到按钮 -->
              <div class="button-section">
                <button
                  @click="handleSignIn"
                  :disabled="hasSignedIn || !qqNumber || isLoading"
                  class="signin-btn relative w-full py-3.5 px-6 rounded-xl font-bold text-white text-base transition-all duration-500 transform focus:outline-none focus:ring-4 focus:ring-blue-300/50 overflow-hidden drop-shadow-md"
                  :class="[
                    hasSignedIn || !qqNumber
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl',
                  ]"
                >
                  <div class="relative z-10 drop-shadow-sm">
                    <span v-if="isLoading" class="flex items-center justify-center">
                      <svg
                        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      签到中，请稍候...
                    </span>
                    <span v-else-if="hasSignedIn" class="flex items-center justify-center">
                      <svg
                        class="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      今日已成功签到
                    </span>
                    <span v-else class="flex items-center justify-center">
                      <svg
                        class="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      立即签到领取奖励
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- 卡片装饰光效 -->
          <div
            class="card-glow absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-[2rem] opacity-0 hover:opacity-100 transition-opacity duration-700 blur-xl -z-10"
          ></div>
        </div>
      </div>

      <!-- 底部装饰信息 -->
      <div class="text-center !mt-5">
        <div
          class="inline-flex items-center px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 shadow-lg"
        >
          <div
            class="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mr-2"
          >
            <svg
              class="w-2.5 h-2.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span class="text-sm font-medium drop-shadow-md"
            >每日签到可获得积分奖励，连续签到奖励更丰厚</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const qqNumber = ref('')
    const hasSignedIn = ref(false)
    const gainedPoints = ref(0)
    const errorMessage = ref('')
    const isLoading = ref(false)

    // 创建消息弹窗函数
    const showMessage = (type: 'success' | 'error', title: string, content: string) => {
      // 创建弹窗元素
      const modal = document.createElement('div')
      modal.className = `fixed inset-0 z-50 flex items-center justify-center px-4 ${type === 'success' ? 'bg-black/50' : 'bg-black/50'}`

      const messageBox = document.createElement('div')
      messageBox.className = ` max-w-md w-full rounded-2xl shadow-2xl transform transition-all duration-300 scale-95 opacity-0 ${
        type === 'success'
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200'
          : 'bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200'
      } !overflow-hidden`

      messageBox.innerHTML = `
         <div class="relative !overflow-hidden">
           <div class="absolute top-0 left-0 w-full h-1 ${type === 'success' ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-rose-500'}"></div>
           <div class="p-6">
             <div class="flex items-start">
               <div class="flex-shrink-0">
                 <div class="w-10 h-10 rounded-full ${type === 'success' ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-rose-500'} flex items-center justify-center drop-shadow-md">
                   <svg class="w-5 h-5 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${type === 'success' ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' : 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'}"/>
                   </svg>
                 </div>
               </div>
               <div class="ml-4 flex-1">
                 <h3 class="text-lg font-bold ${type === 'success' ? 'text-green-800' : 'text-red-800'} mb-2 drop-shadow-sm">${title}</h3>
                 <p class="text-base ${type === 'success' ? 'text-green-700' : 'text-red-700'} drop-shadow-sm">${content}</p>
               </div>
             </div>
             <div class="mt-6 flex justify-end">
               <button class="px-6 py-2 ${type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700'} text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 drop-shadow-md" onclick="this.closest('.fixed').remove()">
                 确定
               </button>
             </div>
           </div>
         </div>
       `

      modal.appendChild(messageBox)
      document.body.appendChild(modal)

      // 显示动画
      setTimeout(() => {
        messageBox.classList.remove('scale-95', 'opacity-0')
        messageBox.classList.add('scale-100', 'opacity-100')
      }, 10)

      // 点击背景关闭
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove()
        }
      })

      // 3秒后自动关闭成功消息
      if (type === 'success') {
        setTimeout(() => {
          if (modal.parentNode) {
            modal.remove()
          }
        }, 3000)
      }
    }

    const handleSignIn = async () => {
      if (!qqNumber.value) {
        showMessage('error', '签到失败', '请输入有效的QQ号')
        return
      }

      isLoading.value = true
      errorMessage.value = ''

      try {
        const response = await axios.post('/api/v1/signin', { userId: qqNumber.value })
        console.log(response)
        if (response.data.code === '200') {
          hasSignedIn.value = true
          gainedPoints.value = response.data.points
          showMessage('success', 'TIP', response.data.message)
        } else {
          // 处理业务逻辑错误
          const errorMsg = response.data.error || response.data.message
          let displayMsg = errorMsg || '签到失败，请稍后重试'

          if (errorMsg.includes('already signed in')) {
            displayMsg = '您今天已经签到过了，明天再来吧~'
          } else if (errorMsg.includes('invalid user')) {
            displayMsg = '无效的用户ID，请检查QQ号是否正确'
          }

          showMessage('error', '签到失败', displayMsg)
        }
      } catch (error) {
        console.error('签到请求失败:', error)
        let displayMsg = '发生未知错误，请稍后重试'

        // 处理网络错误
        if (axios.isAxiosError(error)) {
          if (error.response) {
            // 服务器返回了错误状态码
            switch (error.response.status) {
              case 400:
                displayMsg = error.response.data.error || '请求参数错误'
                break
              case 401:
                displayMsg = '未授权，请先登录'
                break
              case 403:
                displayMsg = '没有权限进行此操作'
                break
              case 404:
                displayMsg = '签到服务暂时不可用'
                break
              case 500:
                displayMsg = error.response.data.error || '服务器内部错误'
                break
              default:
                displayMsg = `请求失败 (${error.response.status})，请稍后重试`
            }
          } else if (error.request) {
            // 请求已发出但没有收到响应
            displayMsg = '网络连接失败，请检查网络设置'
          } else {
            // 请求配置出错
            displayMsg = '请求配置错误，请刷新页面重试'
          }
        }

        showMessage('error', '签到失败', displayMsg)
      } finally {
        isLoading.value = false
      }
    }

    return {
      qqNumber,
      hasSignedIn,
      gainedPoints,
      errorMessage,
      isLoading,
      handleSignIn,
    }
  },
})
</script>

<style scoped>
.registration-page {
  min-height: 100vh;
  position: relative;
  z-index: 0;
}

.home-grass {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0.4), #f5f5f5);
}

/* 装饰性浮动形状 */
.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
  animation: float 20s infinite linear;
}

.shape-1 {
  width: 60px;
  height: 60px;
  top: 15%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 80px;
  height: 80px;
  top: 25%;
  right: 15%;
  animation-delay: -5s;
}

.shape-3 {
  width: 40px;
  height: 40px;
  bottom: 35%;
  left: 20%;
  animation-delay: -10s;
}

.shape-4 {
  width: 70px;
  height: 70px;
  bottom: 25%;
  right: 25%;
  animation-delay: -15s;
}

.shape-5 {
  width: 30px;
  height: 30px;
  top: 65%;
  left: 5%;
  animation-delay: -8s;
}

.shape-6 {
  width: 90px;
  height: 90px;
  top: 75%;
  right: 8%;
  animation-delay: -12s;
}

@keyframes float {
  0% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-15px) rotate(180deg);
    opacity: 0.7;
  }
  100% {
    transform: translateY(0px) rotate(360deg);
    opacity: 0.3;
  }
}

/* 页面标题样式 */
.page-title {
  animation: titleGlow 4s ease-in-out infinite;
  /* text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.2),
    0 0 20px rgba(255, 255, 255, 0.1); */
}

.page-title span {
  /* text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 4px 8px rgba(0, 0, 0, 0.1); */
}

.page-subtitle {
  text-shadow:
    0 1px 3px rgba(0, 0, 0, 0.4),
    0 2px 6px rgba(0, 0, 0, 0.3);
}

/* 白色文字强阴影效果 */
.text-white-shadow {
  text-shadow:
    0 1px 3px rgba(0, 0, 0, 0.5),
    0 2px 6px rgba(0, 0, 0, 0.4),
    0 0 10px rgba(0, 0, 0, 0.2);
}

/* 深色文字轻阴影效果 */
.text-dark-shadow {
  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.08);
}

/* 按钮文字阴影 */
.signin-btn {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

@keyframes titleGlow {
  0%,
  100% {
    text-shadow:
      0 0 30px rgba(255, 255, 255, 0.3),
      0 0 60px rgba(255, 255, 255, 0.2);
  }
  50% {
    text-shadow:
      0 0 40px rgba(255, 255, 255, 0.5),
      0 0 80px rgba(255, 255, 255, 0.3);
  }
}

/* 签到卡片样式 */
.signin-card {
  animation: cardEntry 1.2s ease-out;
}

.card-inner {
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-inner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(59, 130, 246, 0.5),
    rgba(147, 51, 234, 0.5),
    rgba(236, 72, 153, 0.5),
    transparent
  );
  transform: translateX(-100%);
  transition: transform 0.8s ease;
}

.signin-card:hover .card-inner::before {
  transform: translateX(100%);
}

.signin-card:hover .card-inner {
  transform: translateY(-6px);
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

/* 自定义输入框样式 */
.custom-input {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.custom-input:focus {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
}

/* 签到按钮样式 */
.signin-btn {
  position: relative;
  overflow: hidden;
}

.signin-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.signin-btn:hover::before {
  left: 100%;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .page-title {
    font-size: 32px !important;
  }

  .page-subtitle {
    font-size: 14px !important;
  }

  .card-inner {
    padding: 1.5rem !important;
  }

  .signin-btn {
    padding: 12px 20px !important;
    font-size: 14px !important;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 28px !important;
  }

  .page-subtitle {
    font-size: 13px !important;
  }

  .card-inner {
    padding: 1.25rem !important;
  }

  .signin-btn {
    padding: 10px 16px !important;
    font-size: 13px !important;
  }
}

/* 动画效果 */
@keyframes cardEntry {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
  }
  60% {
    opacity: 0.8;
    transform: translateY(-5px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 页面元素动画 */
.page-title {
  animation:
    titleGlow 4s ease-in-out infinite,
    fadeInUp 1.5s ease-out;
}

.page-subtitle {
  animation: fadeInUp 1.5s ease-out 0.3s both;
}

.signin-card {
  animation: cardEntry 1.2s ease-out 0.6s both;
}

/* 卡片装饰效果 */
.card-glow {
  animation: glowPulse 3s ease-in-out infinite;
}

@keyframes glowPulse {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 0.6;
  }
}

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

/* 深色模式优化 */
@media (prefers-color-scheme: dark) {
  .card-inner {
    background: rgba(248, 250, 252, 0.98) !important;
    border: 1px solid rgba(226, 232, 240, 0.7) !important;
  }
}
</style>
