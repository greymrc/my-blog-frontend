<script setup lang="ts">
import Main from '@/components/Layout/Main/index.vue'
import SideBar from '@/components/Layout/SideBar/index.vue'
import { getAllCategories } from '@/api'
import type { Category } from '@/types'

const categories = ref<Category[]>([])
const loading = ref(false)

const fetchCategories = async () => {
  loading.value = true
  try {
    categories.value = await getAllCategories()
  } catch {
    // 响应拦截器已 ElMessage 提示错误，此处静默
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <Main is-side-bar>
    <template #content>
      <div class="category-container">
        <el-divider border-style="dashed" content-position="left">
          <div style="display: flex; align-items: center">
            <el-icon color="#409EFF"><FolderOpened /></el-icon>
            <span style="margin-left: 5px">分类</span>
          </div>
        </el-divider>
        <div class="category-list" v-loading="loading">
          <div class="category-item" v-for="category in categories" :key="category.id"
               @click="$router.push(`/category/${category.id}`)">
            <div class="category-name">{{ category.name }}</div>
            <div class="category-count" v-if="category.articleCount != null">{{ category.articleCount }} 篇</div>
          </div>
          <div v-if="!loading && !categories.length" class="empty-tip">暂无分类</div>
        </div>
      </div>
    </template>
    <template #information>
      <SideBar />
    </template>
  </Main>
</template>

<script lang="ts">
import { FolderOpened } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.category-container {
  padding: 1rem;
}

.category-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.category-item {
  background: var(--mao-bg-category);
  border-radius: $border-radius;
  padding: 1.5rem;
  text-align: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  }

  .category-name {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .category-count {
    font-size: 0.9rem;
    opacity: 0.8;
  }
}

.empty-tip {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--el-text-color-secondary);
  padding: 2rem 0;
}
</style>
