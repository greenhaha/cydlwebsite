<template>
  <div class="contribute-page">
    <div class="page-bg">
      <video class="page-bg-video" :src="bgVideoUrl" autoplay muted loop playsinline></video>
      <div class="page-overlay"></div>
    </div>

    <div class="contribute-content">
      <section class="page-hero">
        <div class="hero-copy">
          <p class="eyebrow">{{ copy.heroEyebrow }}</p>
          <h1>{{ copy.heroTitle }}</h1>
          <p class="lead">{{ copy.heroLead }}</p>
        </div>
        <div class="hero-stats">
          <div class="stat">
            <span>{{ copy.statsDonor }}</span>
            <strong>{{ donorCount }}</strong>
          </div>
          <div class="stat">
            <span>{{ copy.statsTech }}</span>
            <strong>{{ techCount }}</strong>
          </div>
          <div class="stat">
            <span>{{ copy.statsSpecial }}</span>
            <strong>{{ specialCount }}</strong>
          </div>
        </div>
      </section>

      <section class="contribute-section section-donors">
        <div class="section-header">
          <div class="section-title">
            <span class="section-kicker">{{ copy.donorsLabel }}</span>
            <h2>{{ copy.donorsTitle }}</h2>
          </div>
          <p class="section-lead">{{ copy.donorsDesc }}</p>
        </div>

        <div v-if="loading" class="contributors-grid" aria-hidden="true">
          <div v-for="s in 8" :key="'donor-skeleton-' + s" class="skeleton-card">
            <div class="skeleton-avatar"></div>
            <div class="skeleton-line skeleton-line-lg"></div>
            <div class="skeleton-line skeleton-line-sm"></div>
          </div>
        </div>
        <div v-else-if="error" class="section-error">
          <p>{{ error }}</p>
          <n-button @click="fetchContributors" type="primary">{{ copy.retry }}</n-button>
        </div>
        <div v-else class="contributors-grid" :class="{ 'is-single': contributeList.donors.length === 1, 'is-empty': contributeList.donors.length === 0 }">
          <template v-if="contributeList.donors.length === 0">
            <div class="contributor-card placeholder-card">
              <div class="card-surface">
                <div class="avatar placeholder-avatar">
                  <span>+</span>
                </div>
                <h3>{{ copy.placeholderTitle }}</h3>
                <p>{{ copy.placeholderDesc }}</p>
              </div>
            </div>
          </template>
          <template v-else>
            <div v-for="donor in contributeList.donors" :key="donor.name" class="contributor-card">
              <div class="card-surface">
                <div class="avatar">
                  <span>{{ getInitials(donor.name) }}</span>
                </div>
                <h3>{{ donor.name.trim() }}</h3>
                <p>{{ donor.supportDescription || copy.defaultDesc }}</p>
              </div>
            </div>
          </template>
        </div>
      </section>

<section class="contribute-section section-tech">
        <div class="section-header">
          <div class="section-title">
            <span class="section-kicker">{{ copy.techLabel }}</span>
            <h2>{{ copy.techTitle }}</h2>
          </div>
          <p class="section-lead">{{ copy.techDesc }}</p>
        </div>

        <div v-if="loading" class="contributors-grid" aria-hidden="true">
          <div v-for="s in 8" :key="'tech-skeleton-' + s" class="skeleton-card">
            <div class="skeleton-avatar"></div>
            <div class="skeleton-line skeleton-line-lg"></div>
            <div class="skeleton-line skeleton-line-sm"></div>
          </div>
        </div>
        <div v-else-if="error" class="section-error">
          <p>{{ error }}</p>
          <n-button @click="fetchContributors" type="primary">{{ copy.retry }}</n-button>
        </div>
        <div v-else class="contributors-grid" :class="{ 'is-single': contributeList.techSupporters.length === 1, 'is-empty': contributeList.techSupporters.length === 0 }">
          <template v-if="contributeList.techSupporters.length === 0">
            <div class="contributor-card placeholder-card">
              <div class="card-surface">
                <div class="avatar placeholder-avatar">
                  <span>+</span>
                </div>
                <h3>{{ copy.placeholderTitle }}</h3>
                <p>{{ copy.placeholderDesc }}</p>
              </div>
            </div>
          </template>
          <template v-else>
            <div v-for="supporter in contributeList.techSupporters" :key="supporter.name" class="contributor-card">
              <div class="card-surface">
                <div class="avatar">
                  <span>{{ getInitials(supporter.name) }}</span>
                </div>
                <h3>{{ supporter.name.trim() }}</h3>
                <p>{{ supporter.supportDescription || copy.defaultDesc }}</p>
              </div>
            </div>
          </template>
        </div>
      </section>

<section class="contribute-section section-special">
        <div class="section-header">
          <div class="section-title">
            <span class="section-kicker">{{ copy.specialLabel }}</span>
            <h2>{{ copy.specialTitle }}</h2>
          </div>
          <p class="section-lead">{{ copy.specialDesc }}</p>
        </div>

        <div v-if="loading" class="contributors-grid special-grid" aria-hidden="true">
          <div v-for="s in 8" :key="'special-skeleton-' + s" class="skeleton-card special-card">
            <div class="skeleton-avatar"></div>
            <div class="skeleton-line skeleton-line-lg"></div>
            <div class="skeleton-line skeleton-line-sm"></div>
          </div>
        </div>
        <div v-else-if="error" class="section-error">
          <p>{{ error }}</p>
          <n-button @click="fetchContributors" type="primary">{{ copy.retry }}</n-button>
        </div>
        <div
          v-else
          class="contributors-grid special-grid"
          :class="{ 'is-single': contributeList.specialThanks.length === 1, 'is-empty': contributeList.specialThanks.length === 0 }"
        >
          <template v-if="contributeList.specialThanks.length === 0">
            <div class="contributor-card special-card placeholder-card">
              <div class="card-surface">
                <div class="avatar placeholder-avatar">
                  <span>+</span>
                </div>
                <h3>{{ copy.placeholderTitle }}</h3>
                <p>{{ copy.placeholderDesc }}</p>
              </div>
            </div>
          </template>
          <template v-else>
            <div v-for="supporter in contributeList.specialThanks" :key="supporter.name" class="contributor-card special-card">
              <div class="card-surface">
                <div class="avatar">
                  <span>{{ getInitials(supporter.name) }}</span>
                </div>
                <h3>{{ supporter.name.trim() }}</h3>
                <p>{{ supporter.supportDescription || copy.defaultDesc }}</p>
              </div>
            </div>
          </template>
        </div>
      </section>

<section class="thanks-section">
        <div class="thanks-card">
          <h3>{{ copy.thanksTitle }}</h3>
          <p>{{ copy.thanksDesc }}</p>
          <n-button type="primary" size="large" class="cta-button" @click="goToQQGroup">{{ copy.thanksCta }}</n-button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { NButton } from 'naive-ui'
import { contributeApi, type ContributeResponse } from '../services/api'

const copy = {
  heroEyebrow: 'HLYM COMMUNITY',
  heroTitle: '\u8d21\u732e\u8005\u540d\u5355',
  heroLead: '\u611f\u8c22\u6240\u6709\u4e3a\u670d\u52a1\u5668\u63d0\u4f9b\u4e86\u5e2e\u52a9\u3001\u8d5e\u52a9\u4ee5\u53ca\u6280\u672f\u652f\u6301\u7684\u4e2a\u4eba\u6216\u56e2\u961f',
  statsDonor: '\u8d5e\u52a9\u8005',
  statsTech: '\u6280\u672f\u652f\u6301',
  statsSpecial: '\u7279\u522b\u9e23\u8c22',
  donorsLabel: '\u8d5e\u52a9\u8005',
  donorsTitle: '\u8d5e\u52a9\u8005\u540d\u5355',
  donorsDesc: '\u611f\u8c22\u4f60\u4eec\u7684\u6148\u5584\u8d5e\u52a9\uff0c\u4e3a\u670d\u52a1\u5668\u7684\u8fd0\u7ef4\u63d0\u4f9b\u4e86\u5f3a\u6709\u529b\u7684\u652f\u6301',
  techLabel: '\u6280\u672f\u652f\u6301',
  techTitle: '\u6280\u672f\u652f\u6301\u540d\u5355',
  techDesc: '\u611f\u8c22\u5f00\u53d1\u56e2\u961f\u6210\u5458\u7684\u8f9b\u52e4\u4ed8\u51fa\uff0c\u4e3a\u5927\u5bb6\u63d0\u4f9b\u4e86\u9ad8\u8d28\u7684\u529f\u80fd\u4e0e\u4f53\u9a8c',
  specialLabel: '\u7279\u522b\u9e23\u8c22',
  specialTitle: '\u7279\u522b\u9e23\u8c22',
  specialDesc: '\u7279\u522b\u611f\u8c22\u4ee5\u4e0b\u4e2a\u4eba\u6216\u56e2\u961f\u7684\u652f\u6301\u4e0e\u534f\u52a9',
  thanksTitle: '\u5f00\u53d1\u8005\u5bc4\u8bed',
  thanksDesc: '\u611f\u8c22\u5404\u4f4d\u957f\u4e45\u7684\u652f\u6301\uff0c\u6211\u4eec\u5c06\u7ee7\u7eed\u52aa\u529b\uff0c\u4e3a\u5927\u5bb6\u5e26\u6765\u66f4\u597d\u7684\u670d\u52a1\u4e0e\u4f53\u9a8c\uff01\u5982\u679c\u4f60\u4e5f\u60f3\u6210\u4e3a\u8d21\u732e\u8005\uff0c\u6b22\u8fce\u52a0\u5165\u6211\u4eec\u7684 QQ \u7fa4\u4e0e\u6211\u4eec\u8054\u7cfb\uff01\u6210\u4e3a\u8d21\u732e\u8005\u5c06\u4f1a\u6709\u7279\u522b\u5956\u52b1',
  thanksCta: '\u8054\u7cfb\u6211\u4eec\u83b7\u53d6\u66f4\u591a\u652f\u6301',
  retry: '\u91cd\u8bd5',
  defaultDesc: '\u611f\u8c22\u4f60\u7684\u652f\u6301',
  placeholderTitle: '\u865a\u4f4d\u4ee5\u5f85',
  placeholderDesc: '\u671f\u5f85\u4f60\u7684\u52a0\u5165'
}

const bgVideoUrl = 'https://hlympic.oss-cn-beijing.aliyuncs.com/frontend/assets/video/bg/4K.mp4'

const contributeList = ref<ContributeResponse>({
  donors: [],
  techSupporters: [],
  specialThanks: []
})
const loading = ref(true)
const error = ref<string | null>(null)

const donorCount = computed(() => (loading.value ? '--' : contributeList.value.donors.length))
const techCount = computed(() => (loading.value ? '--' : contributeList.value.techSupporters.length))
const specialCount = computed(() => (loading.value ? '--' : contributeList.value.specialThanks.length))

const fetchContributors = async () => {
  try {
    loading.value = true
    error.value = null
    const data = await contributeApi.getContributors()
    contributeList.value = data
  } catch (err) {
    console.error('fetch contributors failed', err)
    error.value = '\u83b7\u53d6\u8d21\u732e\u8005\u6570\u636e\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5'
    const { contributeList: staticData } = await import('../const/contribute')
    contributeList.value = staticData
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchContributors()
})

const getInitials = (name: string): string => {
  const cleanName = name.trim()
  if (cleanName.length === 0) return '?'
  if (/[\u4e00-\u9fa5]/.test(cleanName)) {
    return cleanName.length >= 2 ? cleanName.substring(0, 2) : cleanName.substring(0, 1)
  }
  const words = cleanName.split(' ')
  if (words.length >= 2) {
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase()
  }
  return cleanName.charAt(0).toUpperCase()
}

const goToQQGroup = () => {
  window.open(
    'https://qm.qq.com/cgi-bin/qm/qr?k=Sh4gcapxVV57FqXxe7ZU07-v9u8YvKVN&jump_from=webapi&authKey=HiFkDO97IWzVgJEO6SWn59U3r7vJPEfvGNq8+Y4RVgOHFRN8+CB9WhpjYJmRvyky',
    '_blank'
  )
}
</script>

<style scoped>
.contribute-page {
  min-height: 100vh;
  position: relative;
  color: var(--theme-text);
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

.contribute-content {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 120px 24px 160px;
}

.page-hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 48px;
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

.page-hero h1 {
  font-size: 46px;
  margin: 10px 0 12px;
}

.lead {
  color: var(--theme-muted);
  line-height: 1.6;
  font-size: 16px;
}

.hero-stats {
  display: inline-grid;
  grid-template-columns: repeat(3, max-content);
  gap: 12px;
  width: fit-content;
  max-width: 100%;
  align-self: flex-start;
  flex: 0 0 auto;
  margin-right: 16px;
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 20px;
  padding: 14px 16px;
  box-shadow: var(--theme-card-shadow);
}

.hero-stats .stat {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  color: var(--theme-muted);
}

.hero-stats strong {
  font-size: 20px;
  color: var(--theme-text);
}

.contribute-section {
  margin-bottom: 54px;
}

.section-header {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-title {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.section-kicker {
  font-size: 12px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--theme-muted);
}

.section-title h2 {
  font-size: 32px;
  margin: 0;
}

.section-lead {
  color: var(--theme-muted);
  line-height: 1.6;
  max-width: 720px;
}

.contributors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
  justify-items: start;
}

.contributors-grid.is-single,
.contributors-grid.is-empty {
  grid-template-columns: minmax(260px, 260px);
}

.contributor-card {
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 18px;
  padding: 18px;
  box-shadow: var(--theme-card-shadow);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  max-width: 260px;
  width: 100%;
  min-height: 200px;
  justify-self: start;
}

.contributor-card:hover {
  transform: translateY(-4px);
}

.card-surface {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

.section-donors .avatar {
  background: linear-gradient(135deg, #60a5fa, #7c3aed);
}

.section-tech .avatar {
  background: linear-gradient(135deg, #34d399, #0ea5e9);
}

.section-special .avatar {
  background: linear-gradient(135deg, #fbbf24, #f97316);
}
.section-special .special-grid {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.section-special .special-card {
  max-width: 260px;
  width: 100%;
}


.card-surface h3 {
  margin: 0;
  font-size: 18px;
  color: var(--theme-text);
}

.card-surface p {
  margin: 0;
  font-size: 13px;
  color: var(--theme-muted);
  line-height: 1.6;
}

.placeholder-card {
  border-style: dashed;
  background: var(--theme-secondary-bg);
  box-shadow: none;
}

.placeholder-avatar {
  background: rgba(148, 163, 184, 0.3);
  color: var(--theme-text);
}

.section-error {
  padding: 24px;
  border-radius: 18px;
  border: 1px dashed var(--theme-border);
  background: var(--theme-secondary-bg);
  text-align: center;
  color: var(--theme-muted);
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.skeleton-card {
  border-radius: 18px;
  border: 1px solid var(--theme-border);
  background: var(--theme-card-bg);
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: var(--theme-card-shadow);
  max-width: 260px;
  width: 100%;
  min-height: 200px;
}

.skeleton-avatar,
.skeleton-line {
  background: linear-gradient(120deg, rgba(148, 163, 184, 0.25), rgba(255, 255, 255, 0.4), rgba(148, 163, 184, 0.25));
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.6s ease-in-out infinite;
}

.skeleton-avatar {
  width: 56px;
  height: 56px;
  border-radius: 999px;
}

.skeleton-line {
  height: 12px;
  border-radius: 999px;
}

.skeleton-line-lg {
  width: 80%;
}

.skeleton-line-sm {
  width: 60%;
}

@keyframes skeleton-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.thanks-section {
  margin-top: 60px;
}

.thanks-card {
  background: var(--theme-card-bg);
  border: 1px solid var(--theme-border);
  border-radius: 26px;
  padding: 28px 32px;
  box-shadow: var(--theme-card-shadow);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.thanks-card h3 {
  margin: 0;
  font-size: 24px;
}

.thanks-card p {
  margin: 0;
  color: var(--theme-muted);
  line-height: 1.7;
}

@media (max-width: 960px) {
  .page-hero {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-stats {
    width: 100%;
  }


  .contributors-grid {
    grid-template-columns: 1fr;
    justify-items: stretch;
  }

  .contributor-card,
  .skeleton-card {
    max-width: 100% !important;
    width: 100% !important;
    justify-self: stretch;
  }


  .section-special .special-grid {
    grid-template-columns: 1fr;
    justify-items: stretch;
  }

  .section-special .special-card {
    max-width: 100% !important;
    width: 100% !important;
    justify-self: stretch;
  }
}

@media (max-width: 640px) {
  .contribute-content {
    padding: 100px 18px 120px;
  }

  .page-hero h1 {
    font-size: 36px;
  }

  .hero-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .section-title h2 {
    font-size: 26px;
  }

  .thanks-card {
    padding: 24px 20px;
  }

  .contributors-grid {
    grid-template-columns: 1fr;
    justify-items: stretch;
  }

  .contributor-card,
  .skeleton-card {
    max-width: 100% !important;
    width: 100% !important;
    justify-self: stretch;
  }
}

:deep(.cta-button) {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(147, 51, 234, 0.95)) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 999px !important;
  padding: 0 28px !important;
  height: 46px !important;
  font-weight: 600;
  box-shadow: 0 16px 30px rgba(37, 99, 235, 0.3);
}

:deep(.cta-button:hover) {
  transform: translateY(-2px);
  box-shadow: 0 20px 36px rgba(59, 130, 246, 0.36);
}
</style>
