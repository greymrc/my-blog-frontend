<template>
  <div class="tag">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>标签管理</span>
          <el-button type="primary" @click="handleAdd">新增标签</el-button>
        </div>
      </template>

      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="标签名称">
          <template #default="{ row }">
            <el-tag :color="row.color" style="color: #fff">{{ row.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="color" label="颜色" width="100">
          <template #default="{ row }">
            <div class="color-preview" :style="{ backgroundColor: row.color }"></div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160">
          <template #default="{ row }">
            {{ row.createTime?.replace('T', ' ').slice(0, 19) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row as Tag)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row as Tag)">删除</el-button>
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
          <el-input v-model="form.name" placeholder="请输入标签名称" />
        </el-form-item>
        <el-form-item label="颜色">
          <div class="color-picker">
            <el-color-picker v-model="form.color" />
            <div class="preset-colors">
              <span
                v-for="color in presetColors"
                :key="color"
                class="color-item"
                :class="{ active: form.color === color }"
                :style="{ backgroundColor: color }"
                @click="form.color = color"
              ></span>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { getTagList, addTag, updateTag, deleteTag } from '@/api'
import { BIZ_CODE } from '@/constants'
import type { Tag, AddTagRequest, UpdateTagRequest } from '@/types'
import { ElMessage, ElMessageBox } from 'element-plus'

const loading = ref(false)
const tableData = ref<Tag[]>([])
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
  color: '#409EFF'
})

const rules = {
  name: [
    { required: true, message: '请输入标签名称', trigger: 'blur' },
    { min: 1, max: 20, message: '标签名称长度为1-20个字符', trigger: 'blur' }
  ]
}

// 预设颜色
const presetColors = [
  '#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399',
  '#FF5722', '#00BCD4', '#9C27B0', '#4CAF50', '#FF9800'
]

// 获取列表
const fetchData = async () => {
  loading.value = true
  try {
    const res = await getTagList(queryParams)
    if (res.code === BIZ_CODE.SUCCESS) {
      tableData.value = res.data.records
      total.value = res.data.total
    }
  } finally {
    loading.value = false
  }
}

// 新增
const handleAdd = () => {
  dialogTitle.value = '新增标签'
  form.id = 0
  form.name = ''
  form.color = '#409EFF'
  dialogVisible.value = true
}

// 编辑
const handleEdit = (row: Tag) => {
  dialogTitle.value = '编辑标签'
  form.id = row.id
  form.name = row.name
  form.color = row.color || '#409EFF'
  dialogVisible.value = true
}

// 删除
const handleDelete = async (row: Tag) => {
  try {
    await ElMessageBox.confirm(`确定要删除标签"${row.name}"吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const res = await deleteTag(row.id)
    if (res.code === BIZ_CODE.SUCCESS) {
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
        const data: UpdateTagRequest = {
          id: form.id,
          name: form.name,
          color: form.color
        }
        const res = await updateTag(data)
        success = res.code === BIZ_CODE.SUCCESS
      } else {
        const data: AddTagRequest = {
          name: form.name,
          color: form.color
        }
        const res = await addTag(data)
        success = res.code === BIZ_CODE.SUCCESS
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

<style lang="scss" scoped>
.tag {
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

  .color-preview {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
  }

  .color-picker {
    display: flex;
    align-items: center;
    gap: 16px;

    .preset-colors {
      display: flex;
      gap: 8px;

      .color-item {
        width: 20px;
        height: 20px;
        border-radius: 4px;
        cursor: pointer;
        border: 2px solid transparent;

        &:hover {
          transform: scale(1.1);
        }

        &.active {
          border-color: #409eff;
        }
      }
    }
  }
}
</style>