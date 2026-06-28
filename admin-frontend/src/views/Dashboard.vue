<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <el-row :gutter="16">
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <el-icon class="stat-icon" style="color: #409eff" :size="32">
              <Document />
            </el-icon>
            <div class="stat-info">
              <div class="stat-value">{{ articleCount }}</div>
              <div class="stat-label">文章总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <el-icon class="stat-icon" style="color: #67c23a" :size="32">
              <Folder />
            </el-icon>
            <div class="stat-info">
              <div class="stat-value">{{ categoryCount }}</div>
              <div class="stat-label">分类总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <el-icon class="stat-icon" style="color: #e6a23c" :size="32">
              <PriceTag />
            </el-icon>
            <div class="stat-info">
              <div class="stat-value">{{ tagCount }}</div>
              <div class="stat-label">标签总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <el-icon class="stat-icon" style="color: #f56c6c" :size="32">
              <View />
            </el-icon>
            <div class="stat-info">
              <div class="stat-value">0</div>
              <div class="stat-label">访问量</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 博主信息 -->
    <el-row :gutter="16" style="margin-top: 16px">
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <span>博主信息</span>
          </template>
          <div class="blogger-info" v-if="websiteInfo">
            <el-avatar :size="64" :src="websiteInfo.avatar" icon="User" />
            <div class="info">
              <h3>{{ websiteInfo.bloggerName }}</h3>
              <p>{{ websiteInfo.intro || '暂无简介' }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <span>分类列表</span>
          </template>
          <div class="list-content">
            <el-tag
              v-for="item in categories"
              :key="item.id"
              style="margin: 4px"
            >
              {{ item.name }}
            </el-tag>
            <el-text v-if="categories.length === 0" type="info">暂无分类</el-text>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <span>标签列表</span>
          </template>
          <div class="list-content">
            <el-tag
              v-for="item in tags"
              :key="item.id"
              :color="item.color"
              style="margin: 4px; color: #fff"
            >
              {{ item.name }}
            </el-tag>
            <el-text v-if="tags.length === 0" type="info">暂无标签</el-text>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Document, Folder, PriceTag, View } from '@element-plus/icons-vue'
import {
  getArticleList,
  getAllCategories,
  getAllTags,
  getWebsiteInfo
} from '@/api'
import { BIZ_CODE } from '@/constants'
import type { Category, Tag, WebsiteInfo } from '@/types'

const loading = ref(false)
const categories = ref<Category[]>([])
const tags = ref<Tag[]>([])
const websiteInfo = ref<WebsiteInfo | null>(null)

// 统计数据
const articleCount = ref(0)
const categoryCount = ref(0)
const tagCount = ref(0)

// 获取统计数据
const fetchStats = async () => {
  loading.value = true
  try {
    // 获取文章统计
    const articleRes = await getArticleList({ pageNum: 1, pageSize: 1 })
    if (articleRes.code === BIZ_CODE.SUCCESS) {
      articleCount.value = articleRes.data.total
    }

    // 获取分类统计
    const catRes = await getAllCategories()
    if (catRes.code === BIZ_CODE.SUCCESS) {
      categories.value = catRes.data
      categoryCount.value = catRes.data.length
    }

    // 获取标签统计
    const tagRes = await getAllTags()
    if (tagRes.code === BIZ_CODE.SUCCESS) {
      tags.value = tagRes.data
      tagCount.value = tagRes.data.length
    }

    // 获取网站信息
    const websiteRes = await getWebsiteInfo()
    if (websiteRes.code === BIZ_CODE.SUCCESS) {
      websiteInfo.value = websiteRes.data
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStats()
})
</script>

<style lang="scss" scoped>
.dashboard {
  .stat-card {
    .stat-content {
      display: flex;
      align-items: center;
      gap: 16px;

      .stat-icon {
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f0f2f5;
        border-radius: 8px;
      }

      .stat-info {
        .stat-value {
          font-size: 28px;
          font-weight: bold;
          color: #303133;
        }

        .stat-label {
          font-size: 14px;
          color: #909399;
          margin-top: 4px;
        }
      }
    }
  }

  .blogger-info {
    display: flex;
    align-items: center;
    gap: 16px;

    .info {
      h3 {
        margin: 0;
        color: #303133;
      }

      p {
        margin: 8px 0 0;
        color: #909399;
        font-size: 14px;
      }
    }
  }

  .list-content {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
}
</style>