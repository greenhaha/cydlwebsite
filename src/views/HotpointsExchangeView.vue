<template>
  <div class="hotpoints-exchange-page">
    <!-- 背景层，与祈愿值页面统一 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style="background-image: url('https://hlympic.oss-cn-beijing.aliyuncs.com/frontend/assets/image/bg1.webp')"></div>
    </div>
    <div class="pointer-events-none fixed inset-0 z-0"></div>

    <!-- 主内容容器：结构对齐 WishValueExchangeView -->
    <div class="exchange-content inset-0 h-full top-[0px] z-10 flex flex-col items-center justify-start pt-[80px] pb-8">
      <!-- 顶部导航 -->
      <!-- 顶部导航：z-index 与祈愿值页面保持一致 (z-99) -->
      <div class="fixed top-0 left-0 right-0 z-99 bg-black/60 backdrop-blur-md border-b border-white/20">
        <div class="w-full !mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div class="flex items-center justify-between">
            <RouterLink
              to="/activity"
              class="inline-flex items-center px-4 py-2 text-white/90 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/20 bg-black/30"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回活动中心
            </RouterLink>
            <!-- 此页不在顶部显示热度值，刷新按钮置于卡片内 -->
          </div>
        </div>
      </div>

      <!-- 标题区 -->
      <!-- 标题区：结构与祈愿值兑换中心保持一致，使用强制 !mb-* 避免 margin 折叠 -->
      <div class="page-header w-full max-w-[1280px] px-4 !mb-8 z-35 text-center">
        <div class="relative !mb-8">
          <div class="relative z-10">
            <div class="flex items-center justify-center !mb-6">
              <div class="h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent w-24"></div>
              <div class="mx-3 w-2 h-2 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50"></div>
              <div class="h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent w-24"></div>
            </div>

            <h1 class="text-[36px] md:text-[48px] lg:text-[56px] font-black text-white !mb-3 tracking-tight leading-none drop-shadow-2xl text-shadow-lg">
              热度值兑换中心
            </h1>

            <h2 class="text-[16px] md:text-[20px] lg:text-[24px] font-medium text-white/95 !mb-4 tracking-wide text-center drop-shadow-lg text-shadow">
              积攒热度值，达成目标即可领取限时奖励
            </h2>

            <div class="flex items-center justify-center !mb-[32px]">
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-32"></div>
              <div class="!mx-3 w-1.5 h-1.5 bg-white/60 rounded-full"></div>
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-32"></div>
            </div>
          </div>
        </div>

        <!-- 信息面板：与祈愿值页面风格对齐 (统一圆角/阴影/间距) -->
        <div class="backdrop-blur-lg bg-black/50 rounded-lg !p-4 border border-white/30 shadow-2xl">
          <p class="text-[14px] md:text-[16px] text-white leading-relaxed max-w-lg !mx-auto text-center drop-shadow-lg text-shadow !mb-2">
            限时奖励：积攒热度值完成目标后点击“领取”兑换，点击“入库”发放至您的库存（不会扣除热度值）
          </p>
          <p class="text-white/90 text-xs text-center text-shadow">
            热度值 = 活动积分 * 1/10
          </p>
        </div>
      </div>

  <!-- 商品列表区域：增加 mx-auto 与对齐间距，保证少量卡片时整体居中 -->
  <section v-if="isActiveWindow" class="exchange-goods w-full max-w-[1200px] px-4 !mb-8 z-35 mx-auto">
        <div v-if="loadingItems" class="flex items-center justify-center py-12 text-white">加载中...</div>
        <div v-else class="flex flex-col gap-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          <div v-for="item in items" :key="item.id" class="relative group bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl overflow-hidden border border-gray-600/30 hover:border-orange-400/60 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm flex flex-col">
            <!-- 顶部覆盖徽章移除，统一到名称行 -->
            <div class="relative h-40 bg-gradient-to-br from-orange-500/20 to-amber-500/20">
              <img :src="item.iconUrl" :alt="item.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1600ms] ease-[cubic-bezier(.19,1,.22,1)]" />
              <div class="absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow">{{ item.rarity || '普通' }}</div>
            </div>
            <div class="p-4 flex-1 flex flex-col">
              <!-- 名称 + 状态徽章（统一：已入库 / 待入库 / 可领取） -->
              <div class="flex items-start justify-between mb-1 min-h-[30px]">
                <h3 class="text-white font-bold text-lg line-clamp-2 flex-1 pr-2">{{ item.name }}</h3>
                <template v-if="stateOf(item.id).warehoused">
                  <span class="ml-2 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/90 text-white shadow flex items-center space-x-1 shrink-0">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    <span>已入库</span>
                  </span>
                </template>
                <template v-else-if="stateOf(item.id).bought">
                  <span class="ml-2 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/90 text-white shadow flex items-center space-x-1 shrink-0">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    <span>待入库</span>
                  </span>
                </template>
                <template v-else-if="canBuy(item)">
                  <span class="ml-2 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow flex items-center space-x-1 shrink-0 animate-pulse">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 7h7l-5.7 4.1L18 21l-6-4-6 4 1.7-7.9L2 9h7z"/></svg>
                    <span>可领取</span>
                  </span>
                </template>
              </div>
              <p class="text-gray-300 text-sm mb-3 line-clamp-2">{{ item.description }}</p>
              <div class="flex items-center justify-between mb-4">
                <div class="flex flex-col space-y-1">
                  <div class="flex items-center space-x-2">
                    <span class="text-[18px] leading-none">🔥</span>
                    <span class="text-orange-300 font-bold text-lg">{{ item.costHotpoints }}</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-54 h-2 bg-gray-700/70 rounded overflow-hidden relative">
                      <div class="h-full transition-all duration-500" :class="progressBarClass(item)" :style="{width: progressPercent(item) + '%'}" />
                      <div v-if="progressPercent(item)===100" class="absolute inset-0 pointer-events-none mix-blend-screen opacity-70 progress-spark" />
                    </div>
                    <button @click.stop="refreshHotpoints" :disabled="loadingHotpoints" class="relative ml-2 p-1 rounded hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed group" title="刷新热度值">
                      <svg v-if="loadingHotpoints" class="w-4 h-4 animate-spin text-orange-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9"/><polyline points="3 3 3 9 9 9"/><path d="M3 12a9 9 0 0 0 9 9"/><polyline points="15 15 21 15 21 9"/></svg>
                      <svg v-else class="w-4 h-4 text-white/70 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg>
                      <!-- 悬浮提示 -->
                      <span class="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/80 text-white/90 text-[11px] px-2 py-1 rounded shadow-lg border border-white/10 whitespace-nowrap z-10">
                        刷新
                      </span>
                    </button>
                  </div>
                  <div class="text-[11px] text-white/50 tracking-wide">
                    <div>{{ hotpoints }} / {{ item.costHotpoints }}</div>
                    <template v-if="refreshStatus!=='idle' && lastRefreshAt">
                      <div class="mt-2 flex items-center flex-wrap">
                        <span :class="[refreshStatus==='success' ? 'text-emerald-400 font-semibold' : (refreshStatus==='error' ? 'text-red-400 font-semibold' : 'text-white/60')]">
                          {{ refreshStatus==='success' ? '刷新成功！' : (refreshStatus==='error' ? '刷新失败！' : '') }}
                        </span>
                        <span class="ml-3 text-white font-normal">刷新于：{{ lastRefreshDatetime }}</span>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
              <div class="mt-auto pt-2 border-t border-white/10 flex flex-col gap-2">
                <button :disabled="!canBuy(item)" @click="onBuy(item)" class="w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed" :class="canBuy(item) ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white' : 'bg-gray-700 text-gray-400'">{{ getBuyText(item) }}</button>
                <button :disabled="!canWarehouse(item)" @click="onWarehouse(item)" class="w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed" :class="canWarehouse(item) ? 'bg-white/10 hover:bg-white/20 text-white border border-white/30' : 'bg-gray-700 text-gray-500'">{{ getWarehouseText(item) }}</button>
              </div>
            </div>
          </div>
          <div v-if="items.length === 0" class="col-span-full text-center py-16 text-white/70">暂无可兑换奖品</div>
          </div>
          <!-- 历史记录展示 -->
          <div v-if="historyRecords.length">
            <div class="flex flex-col gap-2">
              <h4 class="text-white font-semibold flex items-center text-lg">
                <span class="mr-2">🕒</span>
                兑换 / 入库历史
              </h4>
              <div class="overflow-x-auto rounded-lg border border-white/10 bg-black/30 backdrop-blur-sm">
            <table class="min-w-full text-sm">
              <thead>
                <tr class="text-left text-white/70 bg-white/5">
                  <th class="px-4 py-2 font-medium">奖品</th>
                  <th class="px-4 py-2 font-medium">状态</th>
                  <th class="px-4 py-2 font-medium">领取时间</th>
                  <th class="px-4 py-2 font-medium">入库时间</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="rec in historyRecords" :key="rec.orderId" class="border-t border-white/5 hover:bg-white/5 transition-colors">
                  <td class="px-4 py-2 text-white/90">{{ mapItemName(rec.itemId) }}</td>
                  <td class="px-4 py-2">
                    <span :class="statusBadgeClass(rec.status)" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold">{{ statusLabel(rec.status) }}</span>
                  </td>
                  <td class="px-4 py-2 text-white/70">{{ rec.createdAt ? formatTime(rec.createdAt) : '-' }}</td>
                  <td class="px-4 py-2 text-white/70">{{ rec.warehousedAt ? formatTime(rec.warehousedAt) : (rec.status==='WAREHOUSED' ? '(未知)' : '-') }}</td>
                </tr>
              </tbody>
            </table>
              </div> <!-- end overflow wrapper -->
            </div> <!-- end flex gap container -->
          </div> <!-- end history v-if -->
        </div> <!-- end v-else flex column container -->
      </section>

      <!-- 未到开放时间 / 已结束 提示区 -->
      <section v-else class="w-full max-w-[900px] px-4 !mb-16 z-35 mx-auto">
        <div class="backdrop-blur-xl bg-black/60 border border-white/20 rounded-2xl p-8 shadow-2xl text-center flex flex-col items-center">
          <h2 class="text-3xl md:text-4xl font-black text-white mb-4 drop-shadow-lg">热度值兑换暂未开放</h2>
          <p class="text-white/80 text-sm md:text-base mb-4">开放时间：
            <span class="text-orange-300 font-semibold">{{ openStartFormatted }}</span>
            <span class="text-white/50 mx-2">~</span>
            <span class="text-orange-300 font-semibold">{{ openEndFormatted }}</span>
          </p>
          <p v-if="isBeforeStart" class="text-amber-300 font-medium mb-2">距离开放还有：{{ countdown }}</p>
          <p v-else-if="isAfterEnd" class="text-white/60 mb-2">活动已结束，感谢参与</p>
          <p v-else class="text-white/70 mb-2">正在计算开放状态...</p>
          <p class="text-xs text-white/40">（如有疑问请联系管理员获取帮助，感谢支持！）</p>
        </div>
      </section>

      <!-- 领取确认新设计 -->
      <div v-if="showBuyConfirm && selectedItem" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="buy-title">
        <div class="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 max-w-lg w-full mx-4 border border-white/15 shadow-[0_20px_50px_-15px_rgba(0,0,0,.6)]">
          <div class="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-pink-500 shadow-xl flex items-center justify-center ring-4 ring-slate-900/70">
            <svg viewBox="0 0 24 24" class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 7h7l-5.5 4 2.5 9-7-5-7 5 2.5-9L2 9h7z"/></svg>
          </div>
          <div class="mt-10 text-center flex flex-col gap-2">
            <h3 id="buy-title" class="text-2xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-400 to-fuchsia-400 drop-shadow">领取奖励确认</h3>
            <div class="flex flex-col gap-2">
              <p class="text-white/90 text-sm leading-relaxed">您的进度已达标，可领取以下奖励</p>
              <div class="rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col md:flex-row md:items-center gap-3 text-left">
                <div v-if="selectedItem.iconUrl" class="w-16 h-16 rounded-lg overflow-hidden ring-1 ring-white/15 flex-shrink-0">
                  <img :src="selectedItem.iconUrl" :alt="selectedItem.name" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1 space-y-1">
                  <div class="text-white font-semibold text-base">{{ selectedItem.name }}</div>
                  <div class="text-xs text-white/60">所需热度值：<span class="text-orange-300 font-semibold">{{ selectedItem.costHotpoints }}</span></div>
                  <div class="text-xs text-white/60">当前热度值：<span :class="hotpoints >= selectedItem.costHotpoints ? 'text-emerald-300 font-semibold' : 'text-red-300 font-semibold'">{{ hotpoints }}</span></div>
                </div>
              </div>
            </div>
            <div class="text-[11px] text-white/50 leading-relaxed">
              领取后奖品进入 <span class="text-indigo-300 font-medium">待入库</span> 状态，需要您手动确认入库
            </div>
            <div class="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mt-4"></div>
            <!-- 显式留白 spacer，避免 margin 折叠导致分界线与按钮贴合 -->
            <div class="h-1"></div>
          </div>
          <div class="flex flex-col md:flex-row gap-3">
            <button @click="cancelBuy" class="flex-1 h-11 rounded-lg bg-white/10 hover:bg-white/15 active:bg-white/20 text-white/90 text-sm font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60">取消</button>
            <button :disabled="buying" @click="confirmBuy" class="flex-1 h-11 rounded-lg text-sm font-semibold tracking-wide transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 disabled:opacity-60 disabled:cursor-not-allowed" :class="buying ? 'bg-gradient-to-r from-orange-400/60 to-pink-500/60 text-white/80' : 'bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-500/90 hover:to-pink-600/90 text-white shadow-[0_6px_18px_-6px_rgba(244,114,182,.55)]'">
              <span v-if="buying" class="inline-flex items-center gap-2"><svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9"/><polyline points="3 3 3 9 9 9"/><path d="M3 12a9 9 0 0 0 9 9"/><polyline points="15 15 21 15 21 9"/></svg>领取中...</span>
              <span v-else>确认领取</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 入库确认新设计 -->
      <div v-if="showWarehouseConfirm && selectedItem" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="warehouse-title">
        <div class="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 max-w-lg w-full mx-4 border border-white/15 shadow-[0_20px_50px_-15px_rgba(0,0,0,.6)]">
          <div class="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 shadow-xl flex items-center justify-center ring-4 ring-slate-900/70">
            <svg viewBox="0 0 24 24" class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7l9-4 9 4-9 4-9-4Z"/><path d="m3 17 9 4 9-4"/><path d="m3 12 9 4 9-4"/></svg>
          </div>
          <!-- 结构与领取确认弹窗统一：flex + gap 控制垂直间距；在按钮前加入分界线 + spacer -->
          <div class="mt-10 text-center flex flex-col gap-2">
            <h3 id="warehouse-title" class="text-2xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-300 drop-shadow">确认入库</h3>
            <!-- 标题下提示 + 奖励卡片（结构与领取确认一致） -->
            <div class="flex flex-col gap-2">
              <p class="text-white/90 text-sm leading-relaxed">请确认信息</p>
              <div class="rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col md:flex-row md:items-center gap-3 text-left">
                <div v-if="selectedItem.iconUrl" class="w-16 h-16 rounded-lg overflow-hidden ring-1 ring-white/15 flex-shrink-0">
                  <img :src="selectedItem.iconUrl" :alt="selectedItem.name" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1 space-y-1">
                  <div class="text-white font-semibold text-base">{{ selectedItem.name }}</div>
                  <div class="text-xs text-white/60">当前状态：<span class="text-indigo-300 font-medium">待入库</span></div>
                  <div class="text-xs text-white/60">一经兑换：<span class="text-emerald-300 font-medium">不可撤销</span></div>
                </div>
              </div>
            </div>
            <!-- 小字提示 -->
            <div class="text-[11px] text-white/55 leading-relaxed">奖励写入后台库存后立即生效，且无法“撤回 / 重新领取”，请确认当前账号无误再继续</div>
            <!-- 额外说明列表 -->
            <div class="bg-black/40 text-xs text-left text-white/70 p-4 rounded-xl leading-relaxed border border-white/10">
              <ul class="list-disc list-inside marker:text-emerald-300 space-y-1">
                <li>生效后可在历史记录中查看入库时间</li>
                <li>网络波动时请勿频繁重复点击</li>
                <li>异常情况请截图并联系管理员</li>
              </ul>
            </div>
            <div class="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mt-4"></div>
            <div class="h-1"></div>
          </div>
          <div class="flex flex-col md:flex-row gap-3">
            <button @click="cancelWarehouse" class="flex-1 h-11 rounded-lg bg-white/10 hover:bg-white/15 active:bg-white/20 text-white/90 text-sm font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60">取消</button>
            <button :disabled="warehousing" @click="confirmWarehouse" class="flex-1 h-11 rounded-lg text-sm font-semibold tracking-wide transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60 disabled:opacity-60 disabled:cursor-not-allowed" :class="warehousing ? 'bg-gradient-to-r from-emerald-400/50 to-cyan-500/50 text-white/80' : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-500/90 hover:to-cyan-500/90 text-white shadow-[0_6px_18px_-6px_rgba(45,212,191,.55)]'">
              <span v-if="warehousing" class="inline-flex items-center gap-2"><svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9"/><polyline points="3 3 3 9 9 9"/><path d="M3 12a9 9 0 0 0 9 9"/><polyline points="15 15 21 15 21 9"/></svg>入库中...</span>
              <span v-else>确认入库</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Toast -->
    <transition name="fade">
      <div v-if="toast?.visible" class="fixed bottom-6 right-6 bg-black/80 text-white px-4 py-3 rounded-lg text-sm shadow-lg border border-white/10 max-w-sm flex items-start space-x-3">
        <span class="font-semibold" :class="toast.type==='error' ? 'text-red-400' : 'text-emerald-300'">{{ toast.type==='error' ? '提示' : '成功' }}</span>
        <span class="flex-1 text-white/90">{{ toast.message }}</span>
        <button class="text-white/40 hover:text-white" @click="toast.visible=false">×</button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { hotpointsApi, type HotpointsResponse, hotpointsExchangeApi, type HotpointsExchangeRecord, timeApi } from '@/services/api'

// ============ 基础状态 ============
const authStore = useAuthStore()
const router = useRouter()
const hotpointsResp = ref<HotpointsResponse | null>(null)
const loadingHotpoints = ref(false)
const lastRefreshAt = ref<Date|null>(null)
const refreshStatus = ref<'idle'|'success'|'error'>('idle')

const hotpoints = computed(() => hotpointsResp.value?.hotpoints || 0)

// ============ 活动开放时间窗口配置（显式国内时区 Asia/Shanghai） ============
// 使用带 +08:00 偏移的绝对时间，避免客户端处于其它时区时出现提前或延迟。
// 修改活动窗口只需调整下方两个常量。格式务必包含 +08:00。
const OPEN_START = ref(new Date('2025-10-03T18:00:00+08:00')) // TODO: 调整实际开始时间 (北京时间)
const OPEN_END   = ref(new Date('2025-11-07T23:59:59+08:00')) // TODO: 调整实际结束时间 (北京时间)

// 当前“权威时间” = 本地时间 + serverDelta（后端矫正）
const now = ref(new Date())
let nowTimer: number | null = null
const serverDelta = ref(0) // 服务器时间 - 本地 Date.now()

async function syncServerTime(){
  try {
    const data = await timeApi.getServerTime()
    if(typeof data.timestamp === 'number'){
      serverDelta.value = data.timestamp - Date.now()
    } else if(data.chinaTime){
      const parsed = Date.parse(data.chinaTime)
      if(!Number.isNaN(parsed)) serverDelta.value = parsed - Date.now()
    }
    now.value = new Date(Date.now() + serverDelta.value)
  } catch(e){
    console.warn('[time-sync] 服务器时间同步失败，使用本地时间', e)
  }
}

// 统一中国时区格式化 (YYYY-MM-DD HH:mm:ss)
const CHINA_TZ = 'Asia/Shanghai'
const chinaFormatter = new Intl.DateTimeFormat('zh-CN', {
  timeZone: CHINA_TZ,
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
})
function formatChina(d: Date){
  const parts = chinaFormatter.formatToParts(d)
  const obj: Record<string,string> = {}
  parts.forEach(p=>{ if(p.type!=='literal') obj[p.type]=p.value })
  return `${obj.year}-${obj.month}-${obj.day} ${obj.hour}:${obj.minute}:${obj.second}`
}

const isBeforeStart = computed(()=> now.value < OPEN_START.value)
const isAfterEnd = computed(()=> now.value > OPEN_END.value)
const isActiveWindow = computed(()=> !isBeforeStart.value && !isAfterEnd.value)
const openStartFormatted = computed(()=> formatChina(OPEN_START.value))
const openEndFormatted = computed(()=> formatChina(OPEN_END.value))
const countdown = computed(()=>{
  if(!isBeforeStart.value) return ''
  let diff = OPEN_START.value.getTime() - now.value.getTime()
  if(diff < 0) diff = 0
  const sec = Math.floor(diff/1000)
  const d = Math.floor(sec/86400)
  const h = Math.floor((sec%86400)/3600)
  const m = Math.floor((sec%3600)/60)
  const s = sec%60
  return `${d}天${h.toString().padStart(2,'0')}小时${m.toString().padStart(2,'0')}分${s.toString().padStart(2,'0')}秒`
})

// ============ 商品配置 ============
interface HotpointsExchangeItemConfig { id:string; name:string; description:string; iconUrl:string; costHotpoints:number; rarity?:string; targetTable:string; targetMatchField:string; targetMatchBy:'steamId64'|'username'; writeFields:Record<string, unknown> }
interface RuntimeItemState { bought:boolean; warehoused:boolean }

// ================== 按当前表结构(id, steamid, item) 配置 ==================
// 说明：
// 1. id 为自增，不需要也不允许前端提供
// 2. steamid 由后端根据登录用户 + targetMatchBy=steamId64 自动填入 (或在写入时使用 match.value)
// 3. item 字段写入我们配置的标识或文本
// 4. 如果想防止重复兑换，在后端给 (steamid, item) 建唯一索引即可
// 5. 本配置仅需提供 writeFields: { item: '具体写入内容' }
// 6. targetMatchField 填 'steamid' 只是为了把用户 steamId 传给后端（即使是 INSERT，也能统一处理）
// 7. 如果后端决定始终 INSERT，可忽略 match.field 做直接插入；若要做“存在则拒绝”，就先查 (steamid,item)

const ITEM_CONFIGS: HotpointsExchangeItemConfig[] = [
  //{
  //  id: 'anniversary',
  //  name: '周年庆限定标签',
  //  description: '完结撒花，感谢陪伴',
  //  iconUrl: 'https://hlympic.oss-cn-beijing.aliyuncs.com/frontend/assets/image/anniversary_tag.png',
  //  costHotpoints: 500,
  //  rarity: '标签',
  //  targetTable: 'store_permissions',
  //  targetMatchField: 'steamid',         // 用于后端获取用户 steamid (match.by = steamId64)
  //  targetMatchBy: 'steamId64',
  //  writeFields: {
  //    item: '周年庆限定标签'       // 实际写入 item 字段的内容，可根据需要自定义
  //  }
  //},
  //{
  //  id: 'vrc_lime',
  //  name: '[周年庆限定]lime',
  //  description: '捐赠人oVo，周年庆限定皮肤，活动期间限时兑换',
  //  iconUrl: 'https://hlympic.oss-cn-beijing.aliyuncs.com/frontend/assets/image/lime_1.png',
  //  costHotpoints: 1000,
  //  rarity: '换肤模型',
  //  targetTable: 'store_permissions',
  //  targetMatchField: 'steamid',         // 用于后端获取用户 steamid (match.by = steamId64)
  //  targetMatchBy: 'steamId64',
  //  writeFields: {
  //    item: '[捐赠][周年庆限定]lime'       // 实际写入 item 字段的内容，可根据需要自定义
  //  }
  //},
  //{
  //  id: 'testers',
  //  name: '[测试限定标签][质检员]',
  //  description: '参与9月26~10月1日测试奖励',
  //  iconUrl: 'https://hlympic.oss-cn-beijing.aliyuncs.com/frontend/assets/image/hlymcn.jpg',
  //  costHotpoints: 100,
  //  rarity: '标签',
  //  targetTable: 'store_permissions',
  // targetMatchField: 'steamid',         // 用于后端获取用户 steamid (match.by = steamId64)
  //  targetMatchBy: 'steamId64',
  //  writeFields: {
  //    item: '[质检员]（标签）'            // 实际写入 item 字段的内容，可根据需要自定义
  //  }
  //}
]

const items = ref<HotpointsExchangeItemConfig[]>([])
const loadingItems = ref(true)
const runtimeStates = ref<Record<string, RuntimeItemState>>({})
const historyRecords = ref<HotpointsExchangeRecord[]>([])
const toast = ref<{visible:boolean;message:string;type:'error'|'success'}>({visible:false,message:'',type:'success'})

function stateOf(id:string){ return runtimeStates.value[id] ||= { bought:false, warehoused:false } }

// ============ 购买 / 入库 逻辑 ============
const showBuyConfirm = ref(false)
const showWarehouseConfirm = ref(false)
const selectedItem = ref<HotpointsExchangeItemConfig|null>(null)
const buying = ref(false)
const warehousing = ref(false)

function canBuy(item:HotpointsExchangeItemConfig){ const st=stateOf(item.id); return !st.bought && hotpoints.value >= item.costHotpoints }
function canWarehouse(item:HotpointsExchangeItemConfig){ const st=stateOf(item.id); return st.bought && !st.warehoused }
function getBuyText(item:HotpointsExchangeItemConfig){ const st=stateOf(item.id); if(st.warehoused) return '已完成'; if(st.bought) return '待入库'; if(hotpoints.value < item.costHotpoints) return '未达门槛'; return '领取' }
function getWarehouseText(item:HotpointsExchangeItemConfig){ const st=stateOf(item.id); if(st.warehoused) return '已入库'; if(st.bought) return '入库'; return '入库(先兑换)' }
function showToast(message:string, type:'error'|'success'='success'){ toast.value={visible:true,message,type}; setTimeout(()=>{ toast.value.visible=false }, 3200) }

function onBuy(item:HotpointsExchangeItemConfig){ if(!canBuy(item)) return; selectedItem.value=item; showBuyConfirm.value=true }
function cancelBuy(){ showBuyConfirm.value=false; selectedItem.value=null }
function onWarehouse(item:HotpointsExchangeItemConfig){ if(!canWarehouse(item)) return; selectedItem.value=item; showWarehouseConfirm.value=true }
function cancelWarehouse(){ showWarehouseConfirm.value=false; selectedItem.value=null }

function progressPercent(item:HotpointsExchangeItemConfig){ if(item.costHotpoints<=0) return 100; return Math.min(100, Math.floor(hotpoints.value / item.costHotpoints * 100)) }

function progressBarClass(item:HotpointsExchangeItemConfig){
  const p = progressPercent(item)
  if(p >= 100) return 'bg-gradient-to-r from-emerald-400 via-cyan-400 to-fuchsia-400 progress-full'
  if(p >= 75) return 'bg-gradient-to-r from-orange-400 via-pink-500 to-pink-600'
  if(p >= 50) return 'bg-gradient-to-r from-amber-400 to-orange-500'
  if(p >= 25) return 'bg-gradient-to-r from-yellow-400/80 to-amber-500/80'
  return 'bg-gray-500/60'
}

function statusLabel(status:string){ return status==='WAREHOUSED' ? '已入库' : (status==='BOUGHT' ? '待入库' : status) }
function statusBadgeClass(status:string){ return status==='WAREHOUSED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/30' }
function mapItemName(id:string){ const it = items.value.find(i=>i.id===id); return it? it.name : id }

async function confirmBuy(){
  if(!selectedItem.value) return; buying.value = true
  try {
    await hotpointsExchangeApi.exchange('BUY', selectedItem.value.id)
    const st = stateOf(selectedItem.value.id); st.bought = true; // 阈值模式：不扣减热度值
    // 阈值模式下刷新也无数值变化，但保持与后端同步行为
    await fetchHotpoints();
    await loadHistory();
    showBuyConfirm.value = false
  } catch(e:unknown){ let msg = e instanceof Error ? e.message : '领取失败'; if(msg.includes('未达到')||msg.includes('未达到兑换门槛')) msg='未达到兑换门槛'; console.error(e); showToast(msg,'error') } finally { buying.value=false }
}
async function confirmWarehouse(){
  if(!selectedItem.value) return; warehousing.value = true
  try {
    await hotpointsExchangeApi.exchange('WAREHOUSE', selectedItem.value.id)
    const st = stateOf(selectedItem.value.id); st.warehoused = true
    await loadHistory();
    showWarehouseConfirm.value = false
  } catch(e:unknown){ const msg = e instanceof Error ? e.message : '入库失败'; console.error(e); showToast(msg,'error') } finally { warehousing.value=false }
}


// ============ 热度值获取 ============
async function fetchHotpoints(){
  loadingHotpoints.value=true;
  try {
    const resp = await hotpointsApi.getMyHotpoints();
    if(resp.success && resp.data){
      hotpointsResp.value = resp.data;
      return true;
    }
    return false;
  } catch(e){ console.error(e); return false } finally { loadingHotpoints.value=false }
}
async function refreshHotpoints(){
  try {
    const ok = await fetchHotpoints();
    if(!ok){ refreshStatus.value='error'; return }
    // 仅在用户主动刷新时更新时间戳
    lastRefreshAt.value = new Date();
    refreshStatus.value = 'success';
  } catch { refreshStatus.value='error' }
}
async function loadHistory(){
  try { historyRecords.value = await hotpointsExchangeApi.history(); historyRecords.value.forEach(r=>{ const st = stateOf(r.itemId); if(r.status==='BOUGHT') st.bought=true; if(r.status==='WAREHOUSED'){ st.bought=true; st.warehoused=true } }) } catch(e){ console.error(e); showToast('加载兑换记录失败','error') }
}
// formatTime 在模板中被使用 (historyRecords 表格) -- 如被标记未使用属误报
function formatTime(iso:string){ try { return new Date(iso).toLocaleString(); } catch { return iso } }

// ============ 初始化 ============
onMounted(async ()=>{
  if(!authStore.isAuthenticated){ router.push('/login'); return }
  items.value = ITEM_CONFIGS; loadingItems.value=false; await fetchHotpoints(); await loadHistory()
  // 启动计时器：用于倒计时与窗口实时判断
  await syncServerTime()
  nowTimer = window.setInterval(()=>{ now.value = new Date(Date.now() + serverDelta.value) }, 1000)
})

onUnmounted(()=>{ if(nowTimer){ clearInterval(nowTimer); nowTimer=null } })

// 刷新日期时间（YYYY-MM-DD HH:mm:ss）仅在用户点击刷新后显示
const lastRefreshDatetime = computed(()=> lastRefreshAt.value ? formatChina(lastRefreshAt.value) : '')

// ============ 后端对接 TODO 汇总 ============
// TODO(BACKEND): 建议建表 hotpoints_exchange_order(id, user_id/steam_id, item_id, cost_hotpoints, status(PENDING/WAREHOUSED), created_at, warehoused_at)
//  BUY: 校验余额 & 未兑换 -> 扣减 user_hotpoints.hotpoints -> 插入 PENDING
//  WAREHOUSE: 校验 PENDING -> 替换 writeFields 内 __NOW__ -> 写入 targetTable -> 更新订单为 WAREHOUSED
//  幂等: 重复 WAREHOUSE 返回已入库状态即可
//  安全: 校验 targetTable / writeFields 白名单
</script>

<style scoped>
.text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.text-shadow-lg { text-shadow: 0 4px 8px rgba(0,0,0,0.4); }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
@keyframes glowPulse { 0% { filter:brightness(1) drop-shadow(0 0 2px rgba(255,180,80,.4)); } 50% { filter:brightness(1.25) drop-shadow(0 0 6px rgba(255,100,180,.55)); } 100% { filter:brightness(1) drop-shadow(0 0 2px rgba(255,180,80,.4)); } }
.progress-full { animation: glowPulse 2s ease-in-out infinite; }
@keyframes sparkFlow { 0% { background-position:0 0; } 100% { background-position:200% 0; } }
.progress-spark { background:linear-gradient(90deg,rgba(255,255,255,.05) 0%,rgba(255,255,255,.6) 50%,rgba(255,255,255,.05) 100%); background-size:200% 100%; animation:sparkFlow 1.8s linear infinite; }
</style>
