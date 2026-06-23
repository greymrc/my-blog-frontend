<template>
  <div class="website-setting" v-loading="loading">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>网站设置</span>
          <el-button type="primary" :loading="saving" @click="handleSave">保存设置</el-button>
        </div>
      </template>

      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="博主名称" prop="bloggerName">
          <el-input v-model="form.bloggerName" placeholder="请输入博主名称" />
        </el-form-item>

        <el-form-item label="博主头像">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :before-upload="(file: File) => { handleAvatarUpload({ file }); return false }"
            accept="image/*"
          >
            <el-avatar :size="80" :src="form.avatar" icon="User" />
          </el-upload>
          <el-input
            v-model="form.avatar"
            placeholder="或直接输入头像URL"
            style="margin-top: 8px"
          />
        </el-form-item>

        <el-form-item label="博主简介">
          <el-input
            v-model="form.intro"
            type="textarea"
            :rows="3"
            placeholder="请输入博主简介"
          />
        </el-form-item>

        <el-form-item label="GitHub">
          <el-input v-model="form.githubUrl" placeholder="请输入GitHub链接" />
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入联系邮箱" />
        </el-form-item>

        <el-form-item label="关于我">
          <MdEditor
            v-model="form.aboutContent"
            style="height: 400px"
          />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import {
  getWebsiteInfoAdmin,
  updateWebsiteInfo,
  uploadWebsiteAvatar
} from '@my-blog/shared/api'
import { BIZ_CODE } from '@my-blog/shared/constants'
import type { UpdateWebsiteInfoRequest } from '@my-blog/shared/types'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const loading = ref(false)
const saving = ref(false)

const form = ref({
  bloggerName: '',
  avatar: '',
  intro: '',
  githubUrl: '',
  email: '',
  aboutContent: ''
})

const rules = {
  bloggerName: [
    { required: true, message: '请输入博主名称', trigger: 'blur' }
  ]
}

const formRef = ref()

// 获取网站信息
const fetchData = async () => {
  loading.value = true
  try {
    const res = await getWebsiteInfoAdmin()
    if (res.code === BIZ_CODE.SUCCESS) {
      const info = res.data
      form.value = {
        bloggerName: info.bloggerName || '',
        avatar: info.avatar || '',
        intro: info.intro || '',
        githubUrl: info.githubUrl || '',
        email: info.email || '',
        aboutContent: info.aboutContent || ''
      }
    }
  } finally {
    loading.value = false
  }
}

// 上传头像
const handleAvatarUpload = async (options: { file: File }) => {
  try {
    const res = await uploadWebsiteAvatar(options.file)
    if (res.code === BIZ_CODE.SUCCESS) {
      form.value.avatar = res.data
      ElMessage.success('上传成功')
    }
  } catch {
    ElMessage.error('上传失败')
  }
}

// 保存
const handleSave = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return

    saving.value = true
    try {
      const data: UpdateWebsiteInfoRequest = {
        bloggerName: form.value.bloggerName,
        avatar: form.value.avatar,
        intro: form.value.intro,
        githubUrl: form.value.githubUrl,
        email: form.value.email,
        aboutContent: form.value.aboutContent
      }
      const res = await updateWebsiteInfo(data)
      if (res.code === BIZ_CODE.SUCCESS) {
        ElMessage.success('保存成功')
        fetchData()
      }
    } finally {
      saving.value = false
    }
  })
}

onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.website-setting {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .avatar-uploader {
    cursor: pointer;
  }
}
</style>