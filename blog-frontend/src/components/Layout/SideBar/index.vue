<script setup lang="ts">
import InfoCard from '@/components/CardInfo/index.vue'
import Card from '@/components/Card/index.vue'
import useWebsiteStore from '@/stores/website'
import { mockSoup } from '@/mock'
import { getSiteStats } from '@/api'
import type { SiteStats } from '@/types'
import { formatWordCount, formatRelativeTime } from '@/utils/format'
import { Bell, EditPen, DataAnalysis } from '@element-plus/icons-vue'

const useWebsite = useWebsiteStore()
const soup = ref(mockSoup)

// 网站资讯统计（来自后端 /blog/site-stats/get）
const statsLoading = ref(false)
const siteStats = ref<SiteStats>({
  articleCount: 0,
  totalWords: 0,
  visitCount: 0,
  runDays: 0,
})

const fetchSiteStats = async () => {
  statsLoading.value = true
  try {
    siteStats.value = await getSiteStats()
  } catch {
    // 响应拦截器已 ElMessage 提示错误，此处静默
  } finally {
    statsLoading.value = false
  }
}

onMounted(() => {
  fetchSiteStats()
})
</script>

<template>
  <div>
    <InfoCard />
    <Card title="公告" :prefix-icon="Bell" :is-dithering="true" :is-arrow="true">
      <pre class="pre-text">{{ useWebsite.siteStatic?.sidebarAnnouncement }}</pre>
    </Card>
    <Card title="每日鸡汤" :prefix-icon="EditPen" suffix-icon="rotate" :is-rotate="true" :is-scale="true">
      <div class="soup-container">
        <i class="soup-quote-left">"</i>
        <p class="soup-text">{{ soup }}</p>
        <i class="soup-quote-right">"</i>
      </div>
    </Card>
    <Card title="网站资讯" :prefix-icon="DataAnalysis" :is-scale="true" v-loading="statsLoading">
      <div class="statistics">
        <div>文章数目：<span>{{ siteStats.articleCount }}</span></div>
        <div>运行时长：<span>{{ siteStats.runDays }} 天</span></div>
        <div>全站字数：<span>{{ formatWordCount(siteStats.totalWords) }}</span></div>
        <div>访问次数：<span>{{ siteStats.visitCount }}</span></div>
        <div>最后更新：<span>{{ formatRelativeTime(siteStats.lastArticleUpdateTime) }}</span></div>
      </div>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.pre-text {
  text-align: left;
  overflow: auto;
}

.statistics {
  display: flex;
  flex-direction: column;
  color: $menuActiveText;

  div {
    margin: 5px 20px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  }
}

.soup-container {
  position: relative;
  padding: 10px 25px;
  margin: 10px 0;

  .soup-text {
    font-size: 15px;
    line-height: 1.6;
    color: var(--el-text-color-primary);
    text-align: center;
    font-style: italic;
    margin: 0;
    padding: 0 10px;
  }

  .soup-quote-left, .soup-quote-right {
    position: absolute;
    font-size: 32px;
    color: var(--el-color-primary-light-7);
    font-family: "Times New Roman", serif;
    opacity: 0.6;
  }

  .soup-quote-left { top: -5px; left: 5px; }
  .soup-quote-right { bottom: -15px; right: 5px; }
}
</style>
