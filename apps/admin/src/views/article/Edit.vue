<template>
  <div class="article-edit" v-loading="loading">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ isEdit ? '编辑文章' : '创建文章' }}</span>
          <div class="actions">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="info" :loading="saving" @click="handleSave">保存草稿</el-button>
            <el-button type="primary" :loading="saving" @click="handlePublish">发布</el-button>
          </div>
        </div>
      </template>

      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="标题" prop="articleTitle">
              <el-input v-model="form.articleTitle" placeholder="请输入文章标题" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="分类">
              <el-select v-model="form.categoryId" placeholder="请选择分类" clearable>
                <el-option
                  v-for="item in categories"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="form.status">
                <el-option label="草稿" :value="0" />
                <el-option label="公开" :value="1" />
                <el-option label="私密" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="标签">
          <el-select v-model="form.tagIds" multiple placeholder="请选择标签">
            <el-option
              v-for="item in tags"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
              <span :style="{ color: item.color }">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="封面">
          <el-upload
            class="cover-uploader"
            :show-file-list="false"
            :before-upload="(file: File) => { handleCoverUpload({ file }); return false }"
            accept="image/*"
          >
            <el-image
              v-if="form.coverImage"
              :src="form.coverImage"
              fit="cover"
              class="cover-image"
            />
            <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <el-input v-model="form.coverImage" placeholder="或直接输入封面图片URL" style="margin-top: 8px" />
        </el-form-item>

        <el-form-item label="摘要">
          <el-input
            v-model="form.articleExcerpt"
            type="textarea"
            :rows="3"
            placeholder="请输入文章摘要（可选）"
          />
        </el-form-item>

        <el-form-item label="内容" prop="articleContent">
          <MdEditor
            v-model="form.articleContent"
            style="height: 500px"
            @uploadImg="handleEditorUpload"
          />
        </el-form-item>

        <el-form-item label="排序">
          <el-input-number v-model="form.sortOrder" :min="0" :max="10000" />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  getArticleDetail,
  addArticle,
  updateArticle,
  getAllCategories,
  getAllTags,
  uploadArticleCover,
  uploadArticleImage
} from '@my-blog/shared/api'
import { BIZ_CODE } from '@my-blog/shared/constants'
import type { Category, Tag, AddArticleRequest, UpdateArticleRequest } from '@my-blog/shared/types'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => !!route.params.id)
const articleId = computed(() => Number(route.params.id))

const loading = ref(false)
const saving = ref(false)
const categories = ref<Category[]>([])
const tags = ref<Tag[]>([])

const form = ref({
  articleTitle: '',
  articleContent: '',
  articleExcerpt: '',
  coverImage: '',
  categoryId: undefined as number | undefined,
  tagIds: [] as number[],
  status: 0,
  sortOrder: 0
})

const rules = {
  articleTitle: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { min: 1, max: 100, message: '标题长度为1-100个字符', trigger: 'blur' }
  ],
  articleContent: [
    { required: true, message: '请输入文章内容', trigger: 'blur' }
  ]
}

const formRef = ref()

// 获取分类和标签
const fetchOptions = async () => {
  const [catRes, tagRes] = await Promise.all([
    getAllCategories(),
    getAllTags()
  ])
  if (catRes.code === BIZ_CODE.SUCCESS) {
    categories.value = catRes.data
  }
  if (tagRes.code === BIZ_CODE.SUCCESS) {
    tags.value = tagRes.data
  }
}

// 获取文章详情（编辑模式）
const fetchArticle = async () => {
  if (!articleId.value) return

  loading.value = true
  try {
    const res = await getArticleDetail(articleId.value)
    if (res.code === BIZ_CODE.SUCCESS) {
      const article = res.data
      form.value = {
        articleTitle: article.articleTitle,
        articleContent: article.articleContent,
        articleExcerpt: article.articleExcerpt || '',
        coverImage: article.coverImage || '',
        categoryId: article.categoryId,
        tagIds: article.tags?.map(t => t.id) || [],
        status: article.status,
        sortOrder: article.sortOrder
      }
    }
  } finally {
    loading.value = false
  }
}

// 上传封面
const handleCoverUpload = async (options: { file: File }) => {
  try {
    const res = await uploadArticleCover(options.file)
    if (res.code === BIZ_CODE.SUCCESS) {
      form.value.coverImage = res.data
      ElMessage.success('上传成功')
    }
  } catch {
    ElMessage.error('上传失败')
  }
}

// Markdown 编辑器上传图片
const handleEditorUpload = async (files: File[], callback: (urls: string[]) => void) => {
  try {
    const urls: string[] = []
    for (const file of files) {
      const res = await uploadArticleImage(file)
      if (res.code === BIZ_CODE.SUCCESS) {
        urls.push(res.data)
      }
    }
    callback(urls)
  } catch {
    ElMessage.error('图片上传失败')
  }
}

// 保存
const handleSave = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return

    saving.value = true
    try {
      let success = false

      if (isEdit.value) {
        const data: UpdateArticleRequest = {
          id: articleId.value,
          ...form.value
        }
        const res = await updateArticle(data)
        success = res.code === BIZ_CODE.SUCCESS
      } else {
        const data: AddArticleRequest = {
          ...form.value
        }
        const res = await addArticle(data)
        success = res.code === BIZ_CODE.SUCCESS
      }

      if (success) {
        ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
        router.push('/article')
      }
    } finally {
      saving.value = false
    }
  })
}

// 发布
const handlePublish = async () => {
  form.value.status = 1
  await handleSave()
}

// 取消
const handleCancel = () => {
  router.push('/article')
}

onMounted(() => {
  fetchOptions()
  if (isEdit.value) {
    fetchArticle()
  }
})
</script>

<style lang="scss" scoped>
.article-edit {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .actions {
      display: flex;
      gap: 8px;
    }
  }

  .cover-uploader {
    .cover-image {
      width: 200px;
      height: 120px;
      border-radius: 4px;
    }

    .cover-uploader-icon {
      width: 200px;
      height: 120px;
      font-size: 28px;
      color: #8c939d;
      border: 1px dashed #d9d9d9;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        border-color: #409eff;
      }
    }
  }
}
</style>