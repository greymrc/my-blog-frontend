<script setup lang="ts">
import Main from '@/components/Layout/Main/index.vue'
import SideBar from '@/components/Layout/SideBar/index.vue'
import useWebsiteStore from '@/stores/website'
import { mockArticleDetail } from '@/mock'
import { marked } from 'marked'
import { Warning, User, Lock, Star, Share } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useEventListener } from '@vueuse/core'

const websiteStore = useWebsiteStore()

// Mock 文章详情
const articleDetail = ref({ ...mockArticleDetail })

// Markdown 渲染
const renderedContent = computed(() => {
  return marked(articleDetail.value.articleContent || '')
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
    const content = `欢迎访问博客文章：${articleDetail.value.articleTitle}`
    await navigator.clipboard.writeText(content)
    ElMessage.success('已复制分享链接')
  } catch {
    ElMessage.error('复制失败')
  }
}

// 点赞
const handleLike = () => {
  ElMessage.info('功能开发中')
}
</script>

<template>
  <Main is-side-bar>
    <template #content>
      <div class="progress"></div>
      <div class="p-1">
        <div class="head_title" :style="`background-image: url('${articleDetail.articleCover}')`">
          <div class="head_title_text">
            <div class="classify">
              <div>{{ articleDetail.categoryName }}</div>
              <div class="tag" v-for="tag in articleDetail.tags" :key="tag.id"># {{ tag.tagName }}</div>
            </div>
            <div class="title">{{ articleDetail.articleTitle }}</div>
            <div class="statistics">
              <div>访问量: {{ articleDetail.visitCount }}</div>
              <div>评论数: {{ articleDetail.commentCount }}</div>
              <div>点赞量: {{ articleDetail.likeCount }}</div>
            </div>
            <div class="time">
              <div>发布：{{ articleDetail.createTime }}</div>
              <div>更新：{{ articleDetail.updateTime }}</div>
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
              <strong>本文作者： {{ websiteStore.webInfo?.webmasterName }}</strong>
            </div>
            <div class="license">
              <el-icon><Lock /></el-icon>
              <strong>版权声明： </strong>
              <span>本站所有文章除特别声明外，均采用 CC BY-NC-SA 4.0 许可协议。转载请注明文章出处！</span>
            </div>
          </div>
        </div>
        <!-- 尾部标签与点赞分享 -->
        <div style="display: flex; justify-content: space-between">
          <div class="tag">
            <template v-for="tag in articleDetail.tags" :key="tag.id">
              <div @click="$router.push(`/tag/${tag.id}`)"># {{ tag.tagName }}</div>
            </template>
          </div>
          <div class="like">
            <div @click="handleLike">
              <el-icon><Star /></el-icon>
              <span>{{ articleDetail.likeCount }}</span>
            </div>
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

.head_title {
  border-radius: $border-radius;
  height: 20rem;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .head_title_text {
    display: flex;
    flex-direction: column;
    align-items: self-start;
    color: white;
    font-size: 15px;
    padding: 5%;

    .tag { background-color: rgba(255, 255, 255, 0); }

    div div {
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 5px;
      margin: 5px;
      padding: 5px;
    }

    div { display: flex; }

    .title { font-size: 40px; margin: 10px 0; }
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
