<script setup lang="ts">
import { mockArticleList } from '@/mock'
import usePaginationStore from '@/stores/pagination'
import { useWindowSize } from '@vueuse/core'
import { View, ChatDotRound, Star } from '@element-plus/icons-vue'

const paginationStore = usePaginationStore()
const { width } = useWindowSize()

// Mock 数据 - 全量
const allArticles = ref(mockArticleList)
paginationStore.articlePagination.total = allArticles.value.length
paginationStore.articlePagination.pageSize = 5

// 当前页文章（客户端分页）
const articleList = computed(() => {
  const start = (paginationStore.articlePagination.current - 1) * paginationStore.articlePagination.pageSize
  return allArticles.value.slice(start, start + paginationStore.articlePagination.pageSize)
})
</script>

<template>
  <div>
    <template v-for="(article, index) in articleList" :key="article.id">
      <div @click="$router.push('/article/' + article.id)"
           class="card overflow-hidden shadow-md mb-5 mx-2 dark:bg-[#1D1D1D]">
        <div class="w-full md:h-full md:w-1/2 h-40" v-if="index % 2 === 1 || width < 768">
          <div class="relative w-full h-full">
            <div class="relative img w-full h-full">
              <img class="w-full h-full object-cover hover:scale-110 ease-linear duration-300"
                   :src="article.articleCover" alt="文章封面">
            </div>
            <div class="classify text-white text-xs p-1.5 w-11 absolute top-0 left-0 rounded-br-lg">
              {{ article.categoryName }}
            </div>
          </div>
        </div>
        <div class="md:w-1/2 w-full m-1 px-2 flex flex-col pl-5 pt-2 leading-7">
          <div class="hover:text-[#409EFF] transition-colors text-2xl font-bold w-fit cursor-pointer">{{ article.articleTitle }}</div>
          <div class="flex text-xs mt-2 space-x-2">
            <div class="flex"><el-icon><View /></el-icon><span class="ml-1">{{ article.visitCount }}</span></div>
            <div class="flex"><el-icon><ChatDotRound /></el-icon><span class="ml-1">{{ article.commentCount }}</span></div>
            <div class="flex"><el-icon><Star /></el-icon><span class="ml-1">{{ article.likeCount }}</span></div>
          </div>
          <p class="overflow-ellipsis overflow-hidden h-10 md:h-[3.9rem] leading-tight mt-2 text-[#475569]">
            {{ article.articleContent }}
          </p>
          <div class="flex space-x-2">
            <div class="tag">
              <span>标签：</span>
              <el-tag size="small" class="mr-2" v-for="tag in article.tags" :key="tag">{{ tag }}</el-tag>
            </div>
          </div>
          <div class="text-xs mt-4 flex">
            <p class="mr-4 mb-1">发布于：{{ article.createTime }}</p>
            <p>更新于：{{ article.updateTime }}</p>
          </div>
        </div>
        <div class="w-full md:h-full md:w-1/2 h-40" v-if="index % 2 === 0 && width >= 768">
          <div class="relative w-full h-full">
            <div class="relative img w-full h-full">
              <img class="w-full h-full object-cover hover:scale-110 ease-linear duration-300"
                   :src="article.articleCover" alt="文章封面">
            </div>
            <div class="classify text-white text-xs p-1.5 w-11 absolute top-0 left-0 rounded-br-lg">
              {{ article.categoryName }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.card {
  border-radius: $border-radius;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-lighter);

  @media (min-width: 768px) {
    flex-direction: row;
    height: 15rem;
  }

  &:hover img {
    transform: scale(1.1);
  }

  .img {
    position: relative;
    overflow: hidden;

    img {
      width: 100%; height: 100%;
      object-fit: cover;
      transition: transform 0.3s linear;
    }
  }
}

.classify {
  z-index: 1;
  position: absolute;
  top: 0;
  color: white;
  padding: 10px;
  backdrop-filter: blur(5px);
  background: rgba(64, 158, 255, 0.6);
}

.tag {
  display: flex;
  align-items: center;
  margin-top: 8px;
}
</style>
