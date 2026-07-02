<script setup lang="ts">
import InfoCard from '@/components/CardInfo/index.vue'
import Card from '@/components/Card/index.vue'
import useWebsiteStore from '@/stores/website'
import { mockSoup } from '@/mock'

const useWebsite = useWebsiteStore()
const soup = ref(mockSoup)

// 计算运行天数
const differenceInDays = ref(0)
const startTime = new Date(useWebsite.webInfo?.startTime || '2024-01-01')
const now = new Date()
differenceInDays.value = Math.floor((now.getTime() - startTime.getTime()) / (1000 * 60 * 60 * 24))
</script>

<template>
  <div>
    <InfoCard />
    <Card title="公告" :is-dithering="true" :is-arrow="true">
      <pre class="pre-text">{{ useWebsite.webInfo?.sidebarAnnouncement }}</pre>
    </Card>
    <Card title="每日鸡汤" :is-scale="true">
      <div class="soup-container">
        <i class="soup-quote-left">"</i>
        <p class="soup-text">{{ soup }}</p>
        <i class="soup-quote-right">"</i>
      </div>
    </Card>
    <Card title="网站资讯" :is-scale="true">
      <div class="statistics">
        <div>文章数目：<span>{{ useWebsite.webInfo?.articleCount }}</span></div>
        <div>运行时长：<span>{{ differenceInDays }} 天</span></div>
        <div>全站字数：<span>{{ useWebsite.webInfo?.wordCount }}</span></div>
        <div>访问次数：<span>{{ useWebsite.webInfo?.visitCount }}</span></div>
        <div>最后更新：<span>{{ useWebsite.webInfo?.lastUpdateTime }}前</span></div>
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
