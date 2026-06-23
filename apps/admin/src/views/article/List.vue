<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  getArticleList,
  getAllCategories,
  getAllTags,
  deleteArticle
} from '@my-blog/shared/api'
import type { Article, Category, Tag } from '@my-blog/shared/types'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()

const loading = ref(false)
const tableData = ref<Article[]>([])
const total = ref(0)
const categories = ref<Category[]>([])
const tags = ref<Tag[]>([])

const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  categoryId: undefined as number | undefined,
  tagId: undefined as number | undefined,
  status: undefined as number | undefined
})

// 获取文章列表
const fetchData = async () => {
  loading.value = true
  try {
    const res = await getArticleList(queryParams.value)
    if (res.code === 200) {
      tableData.value = res.data.records
      total.value = res.data.total
    }
  } finally {
    loading.value = false
  }
}

// 获取分类和标签
const fetchOptions = async () => {
  const [catRes, tagRes] = await Promise.all([
    getAllCategories(),
    getAllTags()
  ])
  if (catRes.code === 200) {
    categories.value = catRes.data
  }
  if (tagRes.code === 200) {
    tags.value = tagRes.data
  }
}

// 搜索
const handleSearch = () => {
  queryParams.value.pageNum = 1
  fetchData()
}

// 重置
const handleReset = () => {
  queryParams.value = {
    pageNum: 1,
    pageSize: 10,
    categoryId: undefined,
    tagId: undefined,
    status: undefined
  }
  fetchData()
}

// 分页变化
const handlePageChange = (page: number) => {
  queryParams.value.pageNum = page
  fetchData()
}

const handleSizeChange = (size: number) => {
  queryParams.value.pageSize = size
  queryParams.value.pageNum = 1
  fetchData()
}

// 新建文章
const handleAdd = () => {
  router.push('/article/create')
}

// 编辑文章
const handleEdit = (row: Article) => {
  router.push(`/article/edit/${row.id}`)
}

// 删除文章
const handleDelete = async (row: Article) => {
  try {
    await ElMessageBox.confirm(`确定要删除文章"${row.articleTitle}"吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const res = await deleteArticle({ id: row.id })
    if (res.code === 200) {
      ElMessage.success('删除成功')
      fetchData()
    }
  } catch {
    // 用户取消
  }
}

// 状态标签
const getStatusType = (status: number) => {
  switch (status) {
    case 0: return 'info'
    case 1: return 'success'
    case 2: return 'warning'
    default: return 'info'
  }
}

const getStatusText = (status: number) => {
  switch (status) {
    case 0: return '草稿'
    case 1: return '已发布'
    case 2: return '私密'
    default: return '未知'
  }
}

onMounted(() => {
  fetchData()
  fetchOptions()
})
</script>

<template>
  <div class="article-list">
    <!-- 搜索区域 -->
    <el-card class="search-card" shadow="never">
      <el-form :inline="true" :model="queryParams">
        <el-form-item label="分类">
          <el-select
            v-model="queryParams.categoryId"
            placeholder="请选择分类"
            clearable
            style="width: 150px"
          >
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-select
            v-model="queryParams.tagId"
            placeholder="请选择标签"
            clearable
            style="width: 150px"
          >
            <el-option
              v-for="item in tags"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="queryParams.status"
            placeholder="请选择状态"
            clearable
            style="width: 120px"
          >
            <el-option label="草稿" :value="0" />
            <el-option label="已发布" :value="1" />
            <el-option label="私密" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格区域 -->
    <el-card class="table-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>文章列表</span>
          <el-button type="primary" @click="handleAdd">新建文章</el-button>
        </div>
      </template>

      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="articleTitle" label="标题" min-width="200" show-overflow-tooltip />
        <el-table-column prop="category.name" label="分类" width="100">
          <template #default="{ row }">
            <el-tag v-if="row.category" size="small">{{ row.category.name }}</el-tag>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="标签" width="150">
          <template #default="{ row }">
            <el-tag
              v-for="tag in row.tags"
              :key="tag.id"
              size="small"
              :color="tag.color"
              style="margin-right: 4px; color: #fff"
            >
              {{ tag.name }}
            </el-tag>
            <span v-if="!row.tags?.length">-</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)" size="small">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="viewCount" label="阅读量" width="80" />
        <el-table-column prop="createTime" label="创建时间" width="160">
          <template #default="{ row }">
            {{ row.createTime?.replace('T', ' ').slice(0, 19) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row as Article)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row as Article)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          v-model:current-page="queryParams.pageNum"
          v-model:page-size="queryParams.pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.article-list {
  .search-card {
    margin-bottom: 16px;
  }

  .table-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .pagination {
      margin-top: 16px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>