<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, title: '文章标题1', category: '技术', status: '已发布', views: 100, createdAt: '2024-01-01' },
  { id: 2, title: '文章标题2', category: '生活', status: '草稿', views: 50, createdAt: '2024-01-02' }
])

const handleEdit = (row: any) => {
  console.log('edit', row)
}

const handleDelete = (row: any) => {
  console.log('delete', row)
}
</script>

<template>
  <div class="article-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>文章列表</span>
          <el-button type="primary" @click="$router.push('/article/create')">
            新建文章
          </el-button>
        </div>
      </template>

      <el-table :data="tableData" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="category" label="分类" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '已发布' ? 'success' : 'info'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="views" label="浏览量" width="100" />
        <el-table-column prop="createdAt" label="创建时间" width="120" />
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.article-list {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>