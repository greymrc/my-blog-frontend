<script setup lang="ts">
import Main from '@/components/Layout/Main/index.vue'
import SideBar from '@/components/Layout/SideBar/index.vue'
import useWebsiteStore from '@/stores/website'
import { getArticleDetail } from '@/api'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { Warning, User, Lock, Share, View, ChatDotRound, Calendar, Refresh } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useEventListener } from '@vueuse/core'
import { formatDate } from '@/utils/format'
import type { Article } from '@/types'

const websiteStore = useWebsiteStore()
const route = useRoute()

// 文章详情
const articleDetail = ref<Article | null>(null)

async function fetchDetail() {
  const id = Number(route.params.id)
  if (!id) return
  articleDetail.value = await getArticleDetail(id)
}

onMounted(fetchDetail)

// Markdown 渲染
const renderedContent = computed(() => {
  return marked(articleDetail.value?.content || '')
})

// 页面滚动进度
useEventListener(window, 'scroll', () => {
  const pageHeight = document.documentElement.scrollHeight
  const screenHeight = document.documentElement.clientHeight
  const scrollHeight = pageHeight - screenHeight
  const scrollTop = document.documentElement.scrollTop
  const progress = document.querySelector('.progress') as HTMLElement
  if (progress) {
    progress.style.width = (scrollTop / scrollHeight) * 100 + '%'
  }
})

// 分享
const copyToClipboard = async () => {
  try {
    const content = `欢迎访问博客文章：${articleDetail.value?.title}`
    await navigator.clipboard.writeText(content)
    ElMessage.success('已复制分享链接')
  } catch {
    ElMessage.error('复制失败')
  }
}

</script>

<template>
  <Main is-side-bar>
    <template #content>
      <div class="progress"></div>
      <div class="p-1" v-if="articleDetail">
        <!-- 封面图：纯展示，不再叠加文字 -->
        <div class="article-cover" :style="`background-image: url('${articleDetail.coverImage}')`"></div>
        <!-- 文章头部信息卡片：标题 / 分类标签 / 访问量 / 时间 -->
        <div class="article-header">
          <div class="title">{{ articleDetail.title }}</div>
          <div class="classify">
            <div class="category">{{ articleDetail.category?.name }}</div>
            <div class="tag-item" v-for="tag in articleDetail.tags" :key="tag.id"># {{ tag.name }}</div>
          </div>
          <div class="meta">
            <div class="meta-item">
              <el-icon><View /></el-icon>
              <span>访问量 {{ articleDetail.viewCount }}</span>
            </div>
            <div class="meta-item">
              <el-icon><ChatDotRound /></el-icon>
              <span>评论 0</span>
            </div>
            <div class="meta-item">
              <el-icon><Calendar /></el-icon>
              <span>发布 {{ formatDate(articleDetail.createTime) }}</span>
            </div>
            <div class="meta-item">
              <el-icon><Refresh /></el-icon>
              <span>更新 {{ formatDate(articleDetail.updateTime) }}</span>
            </div>
          </div>
        </div>
        <div>
          <div class="article-content" v-html="renderedContent"></div>
          <el-divider border-style="dashed" content-position="left">
            <div style="display: flex; align-items: center">
              <el-icon><Warning /></el-icon>
              <span style="margin-left: 0.5em">声明</span>
            </div>
          </el-divider>
          <div class="copyright">
            <div class="author">
              <el-icon><User /></el-icon>
              <strong>本文作者： {{ websiteStore.bloggerInfo?.bloggerName }}</strong>
            </div>
            <div class="license">
              <el-icon><Lock /></el-icon>
              <strong>版权声明： </strong>
              <span>本站所有文章除特别声明外，均采用 CC BY-NC-SA 4.0 许可协议。转载请注明文章出处！</span>
            </div>
          </div>
        </div>
        <!-- 尾部标签与分享 -->
        <div style="display: flex; justify-content: space-between">
          <div class="tag">
            <template v-for="tag in articleDetail.tags" :key="tag.id">
              <div @click="$router.push(`/tag/${tag.id}`)"># {{ tag.name }}</div>
            </template>
          </div>
          <div class="like">
            <div @click="copyToClipboard">
              <el-icon><Share /></el-icon>
              <span>分享</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #information>
      <SideBar />
    </template>
  </Main>
</template>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";

.article-cover {
  border-radius: $border-radius;
  height: 20rem;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.article-header {
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: $border-radius;
  box-shadow: var(--mao-shadow);
  padding: 1.5rem 2rem;
  margin-top: 0.75rem;

  .title {
    font-size: 28px;
    font-weight: bold;
    line-height: 1.4;
    margin-bottom: 1rem;
  }

  .classify {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;

    .category {
      padding: 0.2rem 0.7rem;
      border-radius: 5px;
      font-size: 0.85em;
      color: #fff;
      background: var(--mao-bg-category);
    }

    .tag-item {
      padding: 0.2rem 0.7rem;
      border-radius: 5px;
      font-size: 0.85em;
      border: 1px solid var(--el-border-color);
      color: var(--el-text-color-regular);
    }
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    color: var(--el-text-color-secondary);
    font-size: 0.85em;

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.4em;
    }
  }
}

.article-content {
  padding: 1rem 0;
  line-height: 1.8;
  font-size: 16px;

  :deep(h1), :deep(h2), :deep(h3), :deep(h4) {
    margin: 1.5em 0 0.5em;
    font-weight: bold;
  }

  :deep(h1) { font-size: 1.8em; }
  :deep(h2) { font-size: 1.5em; }
  :deep(h3) { font-size: 1.3em; }

  :deep(p) { margin: 0.5em 0; }

  :deep(pre) {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 1em;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1em 0;
  }

  :deep(code) {
    background: #f0f0f0;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.9em;
  }

  :deep(pre code) {
    background: none;
    padding: 0;
  }

  :deep(blockquote) {
    border-left: 4px solid #409eff;
    padding: 0.5em 1em;
    margin: 1em 0;
    background: #f8f8f8;
    border-radius: 0 8px 8px 0;
  }

  :deep(ul), :deep(ol) {
    padding-left: 2em;
    margin: 0.5em 0;
  }

  :deep(a) {
    color: #409eff;
    text-decoration: underline;
  }
}

.copyright {
  font-size: 0.8em;
  margin: 1rem 0;
  padding: 1rem 2rem;
  border-radius: 0.625rem;
  border: 1px solid var(--el-border-color);

  .license {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  & > div {
    margin: 1rem 0;
    display: flex;
    align-items: center;

    strong { margin: 0 0.5rem; font-weight: bold; }
  }
}

.tag {
  font-size: 0.8em;
  display: flex;
  flex-wrap: wrap;

  div {
    margin: 0.5rem 0.5rem;
    padding: 0.5rem 0.9rem;
    border: 1px solid var(--el-border-color);
    border-radius: 5px;
    background-color: var(--el-background-color);
    cursor: pointer;

    &:hover { background-color: var(--el-border-color); }
  }
}

.like {
  font-size: 0.8em;
  display: flex;
  flex-wrap: wrap;

  div {
    @include flex;
    margin: 0 0.5rem;
    padding: 0.5rem 0.9rem;
    border-radius: 5px;
    background-color: var(--el-background-color);
    cursor: pointer;

    span { margin-left: 0.5em; }
    &:hover { background-color: var(--el-border-color); }
  }
}

.progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: var(--mao-scroll-percentage-bar);
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  z-index: 9999;
  width: 0;
  transition: width 0.1s;
}
</style>
