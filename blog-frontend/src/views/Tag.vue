<script setup lang="ts">
import Main from '@/components/Layout/Main/index.vue'
import SideBar from '@/components/Layout/SideBar/index.vue'
import { mockTags } from '@/mock'

const tags = ref(mockTags)
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
        <div class="tag-cloud">
          <div class="tag-item" v-for="tag in tags" :key="tag.id"
               :style="{ color: tag.color, borderColor: tag.color, fontSize: (0.9 + Math.random() * 0.6) + 'rem' }"
               @click="$router.push(`/tag/${tag.id}`)">
            # {{ tag.name }}
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
</style>
