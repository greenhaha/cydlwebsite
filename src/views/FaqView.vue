<template>
  <div class="faq-page relative min-h-screen w-full pt-[60px] pb-20">
    <!-- 背景视频 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="pointer-events-none absolute inset-0">
        <video
          src="../assets/bg/baierduo.mp4"
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

    <!-- 页面内容 -->
    <div class="faq-container relative z-20 max-w-4xl mx-auto px-4">
      <!-- 页面标题区域 -->
      <div class="text-center !mb-8 pt-8 flex flex-col items-center">
        <div class="inline-flex items-center justify-center p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h1 class="page-title text-[48px] md:text-[56px] font-bold text-white mb-6 leading-tight">
          <span class="block bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            常见问题
          </span>
        </h1>
        <p class="page-subtitle text-[20px] md:text-[22px] text-white/80 max-w-2xl mx-auto leading-relaxed">
          快速找到您需要的答案，解决疑惑
        </p>
        <div class="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-8 rounded-full"></div>
      </div>

      <!-- FAQ列表 - 一问一答格式 -->
      <div class="faq-list space-y-6">
        <!-- FAQ项目1 -->
        <div class="faq-item">
          <div class="faq-card bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="faq-icon-wrapper flex-shrink-0">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.1m-2.174-2.828c.94-.94 2.4-.94 3.394 0l2.114 2.114a2.998 2.998 0 01-4.242 4.242l-1.1-1.1" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="question-section mb-4">
                  <h3 class="text-xl font-bold text-blue-700 mb-2 flex items-center">
                    <span class="mr-2">Q:</span>
                    <span>如何绑定Steam账号？</span>
                  </h3>
                </div>
                <div class="answer-section">
                  <p class="text-gray-700 leading-relaxed text-base">
                    <span class="font-semibold text-blue-600 mr-2">A:</span>
                    在绑定页面中请点击页面上的"获取Steam 64位 ID"按钮，并按照提示进行操作。注意：在绑定前请确保自己打开游戏加速，可以正常访问steam社区。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ项目2 -->
        <div class="faq-item">
          <div class="faq-card bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="faq-icon-wrapper flex-shrink-0">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="question-section mb-4">
                  <h3 class="text-xl font-bold text-green-700 mb-2 flex items-center">
                    <span class="mr-2">Q:</span>
                    <span>绑定的方式有哪几种？</span>
                  </h3>
                </div>
                <div class="answer-section">
                  <p class="text-gray-700 leading-relaxed text-base">
                    <span class="font-semibold text-green-600 mr-2">A:</span>
                    目前支持2种绑定方式：网页绑定和游戏内绑定。推荐使用网页绑定，操作更加便捷。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ项目3 -->
        <div class="faq-item">
          <div class="faq-card bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="faq-icon-wrapper flex-shrink-0">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 011 1v1z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="question-section mb-4">
                  <h3 class="text-xl font-bold text-purple-700 mb-2 flex items-center">
                    <span class="mr-2">Q:</span>
                    <span>如何在游戏内绑定账号？</span>
                  </h3>
                </div>
                <div class="answer-section">
                  <p class="text-gray-700 leading-relaxed text-base">
                    <span class="font-semibold text-purple-600 mr-2">A:</span>
                    进入社区服务器，打开聊天窗口，输入 <code class="bg-purple-100 px-2 py-1 rounded text-purple-700 font-mono">!bind 空格+QQ号</code> 即可绑定。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ项目4 -->
        <div class="faq-item">
          <div class="faq-card bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="faq-icon-wrapper flex-shrink-0">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="question-section mb-4">
                  <h3 class="text-xl font-bold text-orange-700 mb-2 flex items-center">
                    <span class="mr-2">Q:</span>
                    <span>如何查看Steam64位ID？</span>
                  </h3>
                </div>
                <div class="answer-section">
                  <p class="text-gray-700 leading-relaxed text-base">
                    <span class="font-semibold text-orange-600 mr-2">A:</span>
                    进入社区服务器，打开聊天窗口，输入 <code class="bg-orange-100 px-2 py-1 rounded text-orange-700 font-mono">!steamid</code> 即可查看自己的steam64位ID。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ项目5 -->
        <div class="faq-item">
          <div class="faq-card bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="faq-icon-wrapper flex-shrink-0">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="question-section mb-4">
                  <h3 class="text-xl font-bold text-red-700 mb-2 flex items-center">
                    <span class="mr-2">Q:</span>
                    <span>服务器连接问题如何解决？</span>
                  </h3>
                </div>
                <div class="answer-section">
                  <p class="text-gray-700 leading-relaxed text-base mb-4">
                    <span class="font-semibold text-red-600 mr-2">A:</span>
                    如遇贴图错误或地图丢失，请先检查网络，然后删除本地社区文件。如有其他问题，请联系群管理。
                  </p>
                  <a
                    href="https://qm.qq.com/cgi-bin/qm/qr?k=Sh4gcapxVV57FqXxe7ZU07-v9u8YvKVN&jump_from=webapi&authKey=HiFkDO97IWzVgJEO6SWn59U3r7vJPEfvGNq8+Y4RVgOHFRN8+CB9WhpjYJmRvyky"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <n-button type="primary" size="medium" class="action-btn bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-none shadow-lg hover:shadow-xl">
                      🔗 加入QQ群 342289459
                    </n-button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ项目6 -->
        <div class="faq-item">
          <div class="faq-card bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="faq-icon-wrapper flex-shrink-0">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="question-section mb-4">
                  <h3 class="text-xl font-bold text-indigo-700 mb-2 flex items-center">
                    <span class="mr-2">Q:</span>
                    <span>如何订阅创意工坊？</span>
                  </h3>
                </div>
                <div class="answer-section">
                  <p class="text-gray-700 leading-relaxed text-base mb-4">
                    <span class="font-semibold text-indigo-600 mr-2">A:</span>
                    国内用户需要开启加速器，然后访问创意工坊链接订阅地图和贴图资源。
                  </p>
                  <a
                    href="https://steamcommunity.com/sharedfiles/filedetails/?id=3245952520"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <n-button type="primary" size="medium" class="action-btn bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 border-none shadow-lg hover:shadow-xl">
                      🔧 打开创意工坊
                    </n-button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ项目7 -->
        <div class="faq-item">
          <div class="faq-card bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="faq-icon-wrapper flex-shrink-0">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="question-section mb-4">
                  <h3 class="text-xl font-bold text-teal-700 mb-2 flex items-center">
                    <span class="mr-2">Q:</span>
                    <span>QQ号绑定有什么作用？</span>
                  </h3>
                </div>
                <div class="answer-section">
                  <p class="text-gray-700 leading-relaxed text-base">
                    <span class="font-semibold text-teal-600 mr-2">A:</span>
                    绑定QQ号后可以享受更便捷的服务管理，方便社区交流，并且可以获得更多的游戏功能和服务支持。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ项目8 -->
        <div class="faq-item">
          <div class="faq-card bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="faq-icon-wrapper flex-shrink-0">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="question-section mb-4">
                  <h3 class="text-xl font-bold text-pink-700 mb-2 flex items-center">
                    <span class="mr-2">Q:</span>
                    <span>如何支持服务器发展？</span>
                  </h3>
                </div>
                <div class="answer-section">
                  <p class="text-gray-700 leading-relaxed text-base mb-4">
                    <span class="font-semibold text-pink-600 mr-2">A:</span>
                    如果您对我们的服务器感兴趣，可以加入我们的QQ群了解更多信息，也可以为开发团队提供赞助资金，帮助我们更好地建设服务器！
                  </p>
                  <div class="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://qm.qq.com/cgi-bin/qm/qr?k=Sh4gcapxVV57FqXxe7ZU07-v9u8YvKVN&jump_from=webapi&authKey=HiFkDO97IWzVgJEO6SWn59U3r7vJPEfvGNq8+Y4RVgOHFRN8+CB9WhpjYJmRvyky"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <n-button type="primary" size="medium" class="action-btn bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 border-none shadow-lg hover:shadow-xl">
                        💬 加入QQ群 342289459
                      </n-button>
                    </a>
                    <n-button size="medium" class="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 border-none shadow-lg hover:shadow-xl">
                      ❤️ 赞助支持
                    </n-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ项目9 -->
        <div class="faq-item">
          <div class="faq-card bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="faq-icon-wrapper flex-shrink-0">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="question-section mb-4">
                  <h3 class="text-xl font-bold text-violet-700 mb-2 flex items-center">
                    <span class="mr-2">Q:</span>
                    <span>如何获得VIP权限？</span>
                  </h3>
                </div>
                <div class="answer-section">
                  <p class="text-gray-700 leading-relaxed text-base">
                    <span class="font-semibold text-violet-600 mr-2">A:</span>
                    VIP权限可以通过赞助服务器获得，具体详情请联系群管理员。VIP用户可以享受优先连接、专属武器皮肤等特权。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ项目10 -->
        <div class="faq-item">
          <div class="faq-card bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="faq-icon-wrapper flex-shrink-0">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="question-section mb-4">
                  <h3 class="text-xl font-bold text-cyan-700 mb-2 flex items-center">
                    <span class="mr-2">Q:</span>
                    <span>服务器有哪些常用指令？</span>
                  </h3>
                </div>
                <div class="answer-section">
                  <p class="text-gray-700 leading-relaxed text-base">
                    <span class="font-semibold text-cyan-600 mr-2">A:</span>
                    常用指令包括：<code class="bg-cyan-100 px-2 py-1 rounded text-cyan-700 font-mono">!bind</code> 绑定账号、<code class="bg-cyan-100 px-2 py-1 rounded text-cyan-700 font-mono">!steamid</code> 查看ID、<code class="bg-cyan-100 px-2 py-1 rounded text-cyan-700 font-mono">!rank</code> 查看排名、<code class="bg-cyan-100 px-2 py-1 rounded text-cyan-700 font-mono">!stats</code> 查看统计等。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ项目11 -->
        <div class="faq-item">
          <div class="faq-card bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="faq-icon-wrapper flex-shrink-0">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-500 to-lime-600 flex items-center justify-center shadow-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="question-section mb-4">
                  <h3 class="text-xl font-bold text-lime-700 mb-2 flex items-center">
                    <span class="mr-2">Q:</span>
                    <span>游戏卡顿或延迟高怎么办？</span>
                  </h3>
                </div>
                <div class="answer-section">
                  <p class="text-gray-700 leading-relaxed text-base">
                    <span class="font-semibold text-lime-600 mr-2">A:</span>
                    建议先检查网络连接，使用游戏加速器，降低游戏画质设置。如果问题持续存在，可以尝试重启游戏或联系技术支持。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ项目12 -->
        <div class="faq-item">
          <div class="faq-card bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="faq-icon-wrapper flex-shrink-0">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="question-section mb-4">
                  <h3 class="text-xl font-bold text-amber-700 mb-2 flex items-center">
                    <span class="mr-2">Q:</span>
                    <span>如何举报作弊玩家？</span>
                  </h3>
                </div>
                <div class="answer-section">
                  <p class="text-gray-700 leading-relaxed text-base">
                    <span class="font-semibold text-amber-600 mr-2">A:</span>
                    发现作弊玩家时，请记录玩家ID和作弊时间，并在QQ群中联系管理员举报。我们会及时处理并维护游戏环境的公平性。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ项目13 -->
        <div class="faq-item">
          <div class="faq-card bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="faq-icon-wrapper flex-shrink-0">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="question-section mb-4">
                  <h3 class="text-xl font-bold text-rose-700 mb-2 flex items-center">
                    <span class="mr-2">Q:</span>
                    <span>如何申请成为管理员？</span>
                  </h3>
                </div>
                <div class="answer-section">
                  <p class="text-gray-700 leading-relaxed text-base">
                    <span class="font-semibold text-rose-600 mr-2">A:</span>
                    管理员申请需要满足一定条件：活跃度高、游戏时间长、品行端正等。具体申请流程请在QQ群中咨询现有管理员。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ项目14 -->
        <div class="faq-item">
          <div class="faq-card bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="faq-icon-wrapper flex-shrink-0">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="question-section mb-4">
                  <h3 class="text-xl font-bold text-emerald-700 mb-2 flex items-center">
                    <span class="mr-2">Q:</span>
                    <span>服务器有哪些游戏模式？</span>
                  </h3>
                </div>
                <div class="answer-section">
                  <p class="text-gray-700 leading-relaxed text-base">
                    <span class="font-semibold text-emerald-600 mr-2">A:</span>
                    目前只有MG模式，后续会有更多模式服务器上线，欢迎体验！
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ项目15 -->
        <div class="faq-item">
          <div class="faq-card bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="faq-icon-wrapper flex-shrink-0">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shadow-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="question-section mb-4">
                  <h3 class="text-xl font-bold text-slate-700 mb-2 flex items-center">
                    <span class="mr-2">Q:</span>
                    <span>如何调整游戏设置获得最佳体验？</span>
                  </h3>
                </div>
                <div class="answer-section">
                  <p class="text-gray-700 leading-relaxed text-base">
                    <span class="font-semibold text-slate-600 mr-2">A:</span>
                    建议根据电脑配置调整画质设置，关闭垂直同步，调整鼠标灵敏度，设置合适的分辨率和刷新率，以获得流畅的游戏体验。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部提示 -->
      <div class="text-center mt-16">
        <div class="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[#999]">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          还有疑问？随时联系我们的客服团队
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { NButton } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    NButton,
  },
  setup() {
    return {}
  },
})
</script>

<style scoped>
.faq-page {
  min-height: 100vh;
  position: relative;
  z-index: 0;

}
.faq-container {
  margin: 0 auto;
}
.home-grass {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0.4), #f5f5f5);
}

/* 页面标题样式 */
.page-title {
  animation: titleGlow 3s ease-in-out infinite;
}

@keyframes titleGlow {
  0%, 100% {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2);
  }
  50% {
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3);
  }
}

/* FAQ列表样式 */
.faq-list {
  max-width: 100%;
}

.faq-item {
  animation: fadeInUp 0.8s ease-out;
  margin-bottom: 1rem;
}

.faq-item:nth-child(1) { animation-delay: 0.1s; }
.faq-item:nth-child(2) { animation-delay: 0.2s; }
.faq-item:nth-child(3) { animation-delay: 0.3s; }
.faq-item:nth-child(4) { animation-delay: 0.4s; }
.faq-item:nth-child(5) { animation-delay: 0.5s; }
.faq-item:nth-child(6) { animation-delay: 0.6s; }
.faq-item:nth-child(7) { animation-delay: 0.7s; }
.faq-item:nth-child(8) { animation-delay: 0.8s; }
.faq-item:nth-child(9) { animation-delay: 0.9s; }
.faq-item:nth-child(10) { animation-delay: 1.0s; }
.faq-item:nth-child(11) { animation-delay: 1.1s; }
.faq-item:nth-child(12) { animation-delay: 1.2s; }
.faq-item:nth-child(13) { animation-delay: 1.3s; }
.faq-item:nth-child(14) { animation-delay: 1.4s; }
.faq-item:nth-child(15) { animation-delay: 1.5s; }

/* FAQ卡片样式 */
.faq-card {
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.faq-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.faq-card:hover::before {
  transform: translateX(100%);
}

.faq-card:hover {
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

/* 图标包装器样式 */
.faq-icon-wrapper {
  position: relative;
}

.faq-icon-wrapper::after {
  content: '';
  position: absolute;
  inset: -4px;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%);
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.faq-card:hover .faq-icon-wrapper::after {
  opacity: 1;
  animation: shimmer 1.5s ease-in-out;
}

@keyframes shimmer {
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(100%) rotate(45deg); }
}

/* 问答部分样式 */
.question-section h3 {
  background: linear-gradient(135deg, currentColor 0%, currentColor 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.answer-section {
  padding-left: 1rem;
  border-left: 3px solid rgba(59, 130, 246, 0.2);
  margin-left: 1rem;
}

/* 代码块样式 */
code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-weight: 600;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 按钮样式增强 */
.action-btn {
  font-weight: 600;
  letter-spacing: 0.025em;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.action-btn:hover::before {
  left: 100%;
}

.action-btn:hover {
  transform: translateY(-2px);
}

/* 响应式优化 */
@media (max-width: 768px) {
  .page-title {
    font-size: 36px !important;
  }

  .page-subtitle {
    font-size: 18px !important;
  }

  .faq-card {
    padding: 1.5rem;
  }

  .faq-icon-wrapper div {
    width: 56px;
    height: 56px;
  }

  .faq-icon-wrapper svg {
    width: 28px;
    height: 28px;
  }

  .question-section h3 {
    font-size: 18px;
  }

  .answer-section {
    padding-left: 0.75rem;
    margin-left: 0.75rem;
  }

  .flex-col {
    flex-direction: column;
  }

  .flex-col .action-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 28px !important;
  }

  .page-subtitle {
    font-size: 16px !important;
  }

  .faq-card {
    padding: 1.25rem;
  }

  .faq-icon-wrapper div {
    width: 48px;
    height: 48px;
  }

  .faq-icon-wrapper svg {
    width: 24px;
    height: 24px;
  }

  .question-section h3 {
    font-size: 16px;
  }

  .answer-section p {
    font-size: 14px;
  }
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 页面元素动画 */
.page-title,
.page-subtitle {
  animation: fadeInUp 1s ease-out;
}

/* 底部提示动画 */
.text-center > div {
  animation: fadeInUp 1s ease-out 1s both;
}
</style>
