<template>
  <div class="faq-page">
    <div class="page-bg">
      <video class="page-bg-video" :src="bgVideoUrl" autoplay muted loop playsinline></video>
      <div class="page-overlay"></div>
    </div>

    <div class="faq-content">
      <section class="faq-hero">
        <div class="hero-copy">
          <p class="eyebrow">{{ copy.eyebrow }}</p>
          <h1>{{ copy.title }}</h1>
          <p class="lead">{{ copy.lead }}</p>
          <div class="hero-tags">
            <span class="tag">{{ copy.tagPrimary }}</span>
            <span class="tag muted">{{ copy.tagSecondary }}</span>
          </div>
        </div>
</section>

      <section class="faq-grid">
        <article v-for="item in faqItems" :key="item.title" class="faq-card">
          <div class="faq-icon" :class="`accent-${item.accent}`">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 18h.01M9.09 9a3 3 0 015.82 1c0 2-3 2-3 4" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
          <div class="faq-body">
            <div class="faq-question">
              <span class="faq-prefix">Q</span>
              <h3>{{ item.title }}</h3>
            </div>
            <p class="faq-answer">{{ item.answer }}</p>
            <div v-if="item.commands" class="faq-commands">
              <code v-for="cmd in item.commands" :key="cmd">{{ cmd }}</code>
            </div>
            <div v-if="item.actions" class="faq-actions">
              <a
                v-for="action in item.actions"
                :key="action.label"
                :href="action.href"
                target="_blank"
                rel="noopener noreferrer"
                class="faq-action"
                :class="action.variant"
              >
                {{ action.label }}
              </a>
            </div>
          </div>
        </article>
      </section>

      <section class="faq-footer">
        <div class="note-card">{{ copy.footerNote }}</div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const bgVideoUrl = 'https://hlympic.oss-cn-beijing.aliyuncs.com/frontend/assets/video/bg/baierduo.mp4'

const copy = {
  eyebrow: 'FAQ CENTER',
  title: '常见问题',
  lead: '快速找到你需要的答案 仍有疑问可在群内咨询',
  tagPrimary: '社区指南',
  tagSecondary: '问题与解答',
  countLabel: '问题汇总',
  footerNote: '如需更多帮助请联系QQ群管理员',
}

const faqItems = [
  {
    title: '如何绑定Steam账号',
    answer: '推荐使用Steam账号登录 或在个人资料页点击通过Steam绑定 并按提示操作 访问Steam社区可能需要加速器',
    accent: 'blue',
  },
  {
    title: '绑定方式有哪几种',
    answer: '当前支持网页绑定与游戏内绑定 网页绑定用于活动中心 游戏内绑定用于签到系统',
    accent: 'green',
  },
  {
    title: '如何在游戏内绑定账号',
    answer: '进入服务器聊天窗口 输入指令即可完成绑定',
    commands: ['!bind 空格+QQ号'],
    accent: 'purple',
  },
  {
    title: '如何查看Steam64 ID',
    answer: '进入服务器聊天窗口 输入指令查看自己的Steam64 ID',
    commands: ['!steamid'],
    accent: 'orange',
  },
  {
    title: '服务器连接问题如何解决',
    answer: '遇到贴图错误或地图丢失请先检查网络 或删除本地社区文件 如仍有问题请联系管理员',
    actions: [
      {
        label: '加入QQ群获取帮助',
        href: 'https://qm.qq.com/cgi-bin/qm/qr?k=Sh4gcapxVV57FqXxe7ZU07-v9u8YvKVN&jump_from=webapi&authKey=HiFkDO97IWzVgJEO6SWn59U3r7vJPEfvGNq8+Y4RVgOHFRN8+CB9WhpjYJmRvyky',
        variant: 'primary',
      },
    ],
    accent: 'red',
  },
  {
    title: '如何订阅服务器资源',
    answer: '请加入交流群获取资源订阅链接和使用方法',
    accent: 'indigo',
  },
  {
    title: 'QQ号绑定有什么作用',
    answer: '绑定后可用于积分签到 账号管理 社区沟通 并获得更多服务支持',
    accent: 'teal',
  },
  {
    title: '如何支持服务器发展',
    answer: '欢迎加入QQ群了解更多信息 也可通过赞助支持维护与升级',
    actions: [
      {
        label: '加入QQ群 342289459',
        href: 'https://qm.qq.com/cgi-bin/qm/qr?k=Sh4gcapxVV57FqXxe7ZU07-v9u8YvKVN&jump_from=webapi&authKey=HiFkDO97IWzVgJEO6SWn59U3r7vJPEfvGNq8+Y4RVgOHFRN8+CB9WhpjYJmRvyky',
        variant: 'primary',
      },
      {
        label: '赞助支持 爱发电',
        href: 'https://afdian.com/a/hlymcn',
        variant: 'ghost',
      },
    ],
    accent: 'pink',
  },
  {
    title: '如何获得服务器身份组',
    answer: '可以通过赞助或申请管理成员 Helper Mapper 等方式获取对应身份组',
    accent: 'violet',
  },
  {
    title: '服务器常用指令有哪些',
    answer: '常用指令包括绑定 查询ID 帮助 商店与换肤',
    commands: ['!bind', '!steamid', '!help', '!store / !bp'],
    accent: 'cyan',
  },
  {
    title: '游戏卡顿或延迟高怎么办',
    answer: '请检查网络 使用加速器 降低画质设置 或重启游戏',
    accent: 'lime',
  },
  {
    title: '如何举报作弊玩家',
    answer: '请记录玩家SteamID与时间 在QQ群联系管理员 我们会及时处理',
    accent: 'amber',
  },
  {
    title: '如何申请成为管理员',
    answer: '需要满足活跃度高 游戏时间长 品行端正等条件 具体流程请咨询现有管理员',
    accent: 'slate',
  },
]
</script>

<style scoped>
.faq-page {
  min-height: 100vh;
  color: var(--theme-text);
  position: relative;
}

.page-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
}

.page-bg-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: var(--theme-video-filter);
}

.page-overlay {
  position: absolute;
  inset: 0;
  background: var(--theme-overlay);
}

.faq-content {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 120px 24px 140px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.faq-hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px;
}

.hero-copy {
  max-width: 640px;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.34em;
  font-size: 12px;
  color: var(--theme-muted);
}

.faq-hero h1 {
  font-size: 44px;
  margin: 10px 0 12px;
}

.lead {
  color: var(--theme-muted);
  line-height: 1.6;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.tag {
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--theme-secondary-bg);
  border: 1px solid var(--theme-border);
  color: var(--theme-text);
  font-size: 12px;
}

.tag.muted {
  color: var(--theme-muted);
}




.faq-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.faq-card {
  display: flex;
  gap: 18px;
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 28px;
  padding: 22px 24px;
  box-shadow: var(--theme-card-shadow);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.faq-card:hover {
  transform: translateY(-4px);
}

.faq-icon {
  width: 54px;
  height: 54px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  color: #fff;
  flex-shrink: 0;
}

.faq-icon svg {
  width: 26px;
  height: 26px;
}

.faq-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-question {
  display: flex;
  align-items: center;
  gap: 10px;
}

.faq-prefix {
  font-size: 12px;
  font-weight: 700;
  color: var(--theme-muted);
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid var(--theme-border);
}

.faq-question h3 {
  margin: 0;
  font-size: 18px;
}

.faq-answer {
  margin: 0;
  color: var(--theme-muted);
  line-height: 1.6;
  font-size: 14px;
}

.faq-commands {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.faq-commands code {
  background: var(--theme-secondary-bg);
  border: 1px solid var(--theme-border);
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  color: var(--theme-text);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.faq-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.faq-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid transparent;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.faq-action.primary {
  color: #fff;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(147, 51, 234, 0.95));
  box-shadow: 0 12px 24px rgba(59, 130, 246, 0.25);
}

.faq-action.ghost {
  color: var(--theme-text);
  background: var(--theme-secondary-bg);
  border-color: var(--theme-border);
}

.faq-action:hover {
  transform: translateY(-1px);
}

.faq-footer {
  display: flex;
  justify-content: center;
}

.note-card {
  padding: 10px 18px;
  border-radius: 999px;
  background: var(--theme-secondary-bg);
  border: 1px solid var(--theme-border);
  color: var(--theme-muted);
  font-size: 12px;
}

.accent-blue {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.accent-green {
  background: linear-gradient(135deg, #22c55e, #16a34a);
}

.accent-purple {
  background: linear-gradient(135deg, #8b5cf6, #6d28d9);
}

.accent-orange {
  background: linear-gradient(135deg, #f97316, #ea580c);
}

.accent-red {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.accent-indigo {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
}

.accent-teal {
  background: linear-gradient(135deg, #14b8a6, #0d9488);
}

.accent-pink {
  background: linear-gradient(135deg, #ec4899, #db2777);
}

.accent-violet {
  background: linear-gradient(135deg, #a855f7, #7c3aed);
}

.accent-cyan {
  background: linear-gradient(135deg, #06b6d4, #0891b2);
}

.accent-lime {
  background: linear-gradient(135deg, #84cc16, #65a30d);
}

.accent-amber {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.accent-slate {
  background: linear-gradient(135deg, #64748b, #475569);
}

@media (max-width: 960px) {
  .faq-hero {
    flex-direction: column;
  }

  .faq-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .faq-content {
    padding: 100px 18px 120px;
  }

  .faq-hero h1 {
    font-size: 34px;
  }

  .faq-card {
    flex-direction: column;
  }

  .faq-icon {
    width: 48px;
    height: 48px;
  }
}
</style>
