<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { getCategoryList, addCategory, updateCategory, deleteCategory } from '@my-blog/shared/api'
import type { Category, AddCategoryRequest, UpdateCategoryRequest } from '@my-blog/shared/types'
import { ElMessage, ElMessageBox } from 'element-plus'

const loading = ref(false)
const tableData = ref<Category[]>([])
const total = ref(0)

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10
})

// 对话框
const dialogVisible = ref(false)
const dialogTitle = ref('')
const formRef = ref()
const form = reactive({
  id: 0,
  name: '',
  sortOrder: 0
})

const rules = {
  name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { min: 1, max: 20, message: '分类名称长度为1-20个字符', trigger: 'blur' }
  ]
}

// 获取列表
const fetchData = async () => {
  loading.value = true
  try {
    const res = await getCategoryList(queryParams)
    if (res.code === 200) {
      tableData.value = res.data.records
      total.value = res.data.total
    }
  } finally {
    loading.value = false
  }
}

// 新增
const handleAdd = () => {
  dialogTitle.value = '新增分类'
  form.id = 0
  form.name = ''
  form.sortOrder = 0
  dialogVisible.value = true
}

// 编辑
const handleEdit = (row: Category) => {
  dialogTitle.value = '编辑分类'
  form.id = row.id
  form.name = row.name
  form.sortOrder = row.sortOrder
  dialogVisible.value = true
}

// 删除
const handleDelete = async (row: Category) => {
  try {
    await ElMessageBox.confirm(`确定要删除分类"${row.name}"吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const res = await deleteCategory({ id: row.id })
    if (res.code === 200) {
      ElMessage.success('删除成功')
      fetchData()
    }
  } catch {
    // 用户取消
  }
}

// 提交
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return

    try {
      let success = false
      if (form.id) {
        const data: UpdateCategoryRequest = {
          id: form.id,
          name: form.name,
          sortOrder: form.sortOrder
        }
        const res = await updateCategory(data)
        success = res.code === 200
      } else {
        const data: AddCategoryRequest = {
          name: form.name,
          sortOrder: form.sortOrder
        }
        const res = await addCategory(data)
        success = res.code === 200
      }

      if (success) {
        ElMessage.success(form.id ? '更新成功' : '创建成功')
        dialogVisible.value = false
        fetchData()
      }
    } catch {
      // 错误已处理
    }
  })
}

// 分页
const handlePageChange = (page: number) => {
  queryParams.pageNum = page
  fetchData()
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="category">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>分类管理</span>
          <el-button type="primary" @click="handleAdd">新增分类</el-button>
        </div>
      </template>

      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="分类名称" />
        <el-table-column prop="sortOrder" label="排序" width="100" />
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row as Category)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row as Category)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          v-model:current-page="queryParams.pageNum"
          v-model:page-size="queryParams.pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, prev, pager, next"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="400px">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sortOrder" :min="0" :max="1000" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.category {
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
</style>