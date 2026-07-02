<script setup lang="ts">
import Main from '@/components/Layout/Main/index.vue'
import SideBar from '@/components/Layout/SideBar/index.vue'
import { mockArchive } from '@/mock'

const archive = ref(mockArchive)
</script>

<template>
  <Main is-side-bar>
    <template #content>
      <div class="archive-container">
        <el-divider border-style="dashed" content-position="left">
          <div style="display: flex; align-items: center">
            <el-icon color="#409EFF"><Clock /></el-icon>
            <span style="margin-left: 5px">归档</span>
          </div>
        </el-divider>
        <div class="timeline" v-for="year in archive" :key="year.year">
          <h2 class="year">{{ year.year }}</h2>
          <div class="month-group" v-for="month in year.months" :key="month.month">
            <h3 class="month">{{ month.month }}</h3>
            <div class="article-item" v-for="article in month.articles" :key="article.id"
                 @click="$router.push(`/article/${article.id}`)">
              <div class="dot"></div>
              <div class="article-info">
                <span class="article-title">{{ article.title }}</span>
                <span class="article-date">{{ article.createTime }}</span>
              </div>
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

<script lang="ts">
import { Clock } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.archive-container {
  padding: 1rem;
}

.year {
  font-size: 1.8rem;
  font-weight: bold;
  color: #409eff;
  margin: 1rem 0 0.5rem;
  border-left: 4px solid #409eff;
  padding-left: 1rem;
}

.month {
  font-size: 1.2rem;
  font-weight: bold;
  color: #606266;
  margin: 1rem 0 0.5rem 2rem;
}

.article-item {
  display: flex;
  align-items: center;
  margin: 0.5rem 0 0.5rem 3rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    .article-title { color: #409eff; }
    transform: translateX(5px);
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #409eff;
    margin-right: 1rem;
    flex-shrink: 0;
  }

  .article-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
    background: var(--el-bg-color);
    border-radius: 8px;
    border: 1px solid var(--el-border-color-lighter);
    flex: 1;
    transition: all 0.3s;

    .article-title { font-weight: 500; }
    .article-date { color: #909399; font-size: 0.9rem; }
  }
}
</style>
