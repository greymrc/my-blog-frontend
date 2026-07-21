<script setup lang="ts">
import Main from '@/components/Layout/Main/index.vue'
import SideBar from '@/components/Layout/SideBar/index.vue'
import { getAllTags } from '@/api'
import type { Tag } from '@/types'

const tags = ref<Tag[]>([])
const loading = ref(false)

const fetchTags = async () => {
  loading.value = true
  try {
    tags.value = await getAllTags()
  } catch {
    // 响应拦截器已 ElMessage 提示错误，此处静默
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTags()
})
</script>

<template>
  <Main is-side-bar>
    <template #content>
      <div class="tag-container">
        <el-divider border-style="dashed" content-position="left">
          <div style="display: flex; align-items: center">
            <el-icon color="#409EFF"><PriceTag /></el-icon>
            <span style="margin-left: 5px">标签</span>
          </div>
        </el-divider>
        <div class="tag-cloud" v-loading="loading">
          <div class="tag-item" v-for="(tag, index) in tags" :key="tag.id"
               :style="{ color: tag.color || '#409EFF', borderColor: tag.color || '#409EFF', fontSize: (0.9 + (index % 4) * 0.2) + 'rem' }"
               @click="$router.push(`/tag/${tag.id}`)">
            # {{ tag.name }}
          </div>
          <div v-if="!loading && !tags.length" class="empty-tip">暂无标签</div>
        </div>
      </div>
    </template>
    <template #information>
      <SideBar />
    </template>
  </Main>
</template>

<script lang="ts">
import { PriceTag } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.tag-container {
  padding: 1rem;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
}

.tag-item {
  padding: 0.5rem 1.2rem;
  border: 2px solid;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
}

.empty-tip {
  width: 100%;
  text-align: center;
  color: var(--el-text-color-secondary);
  padding: 2rem 0;
}
</style>
