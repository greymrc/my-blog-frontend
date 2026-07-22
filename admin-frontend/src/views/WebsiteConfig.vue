<template>
  <div class="website-config" v-loading="loading">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>
            网站配置
            <el-tag size="small" :type="mode === 'add' ? 'warning' : 'success'" style="margin-left: 8px">
              {{ mode === 'add' ? '新增（未初始化）' : '编辑' }}
            </el-tag>
          </span>
          <el-button type="primary" :loading="saving" @click="handleSave">
            {{ mode === 'add' ? '初始化保存' : '保存' }}
          </el-button>
        </div>
      </template>

      <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="网站标题" prop="websiteName">
          <el-input v-model="form.websiteName" placeholder="网站标题（必填，≤100）" maxlength="100" show-word-limit />
        </el-form-item>

        <el-form-item label="Logo">
          <el-upload class="single-uploader" :show-file-list="false"
            :before-upload="(file: File) => { handleSingleUpload(file, 'logo'); return false }" accept="image/*">
            <el-image v-if="form.logo" :src="form.logo" fit="cover" class="single-img" />
            <el-icon v-else class="up-icon"><Plus /></el-icon>
          </el-upload>
          <el-input v-model="form.logo" placeholder="或直接输入图片URL" style="margin-top: 8px" />
        </el-form-item>

        <el-form-item label="站点图标">
          <el-upload class="single-uploader" :show-file-list="false"
            :before-upload="(file: File) => { handleSingleUpload(file, 'favicon'); return false }" accept="image/*">
            <el-image v-if="form.favicon" :src="form.favicon" fit="cover" class="single-img" />
            <el-icon v-else class="up-icon"><Plus /></el-icon>
          </el-upload>
          <el-input v-model="form.favicon" placeholder="或直接输入 favicon URL" style="margin-top: 8px" />
        </el-form-item>

        <el-form-item label="博主卡片背景">
          <el-upload class="single-uploader" :show-file-list="false"
            :before-upload="(file: File) => { handleSingleUpload(file, 'bloggerCardBackground'); return false }" accept="image/*">
            <el-image v-if="form.bloggerCardBackground" :src="form.bloggerCardBackground" fit="cover" class="single-img" />
            <el-icon v-else class="up-icon"><Plus /></el-icon>
          </el-upload>
          <el-input v-model="form.bloggerCardBackground" placeholder="或直接输入图片URL" style="margin-top: 8px" />
        </el-form-item>

        <el-form-item label="首页 banner 图">
          <div class="image-list">
            <div v-for="(url, i) in form.bannerImages" :key="i" class="image-item">
              <el-image :src="url" fit="cover" class="thumb" />
              <el-button type="danger" circle size="small" class="del-btn"
                @click="form.bannerImages.splice(i, 1)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
            <el-upload class="uploader-card" :show-file-list="false"
              :before-upload="(file: File) => { handleListUpload(file, 'bannerImages'); return false }" accept="image/*">
              <el-icon class="up-icon"><Plus /></el-icon>
            </el-upload>
          </div>
        </el-form-item>

        <el-form-item label="文章默认封面图">
          <div class="image-list">
            <div v-for="(url, i) in form.articleCoverImages" :key="i" class="image-item">
              <el-image :src="url" fit="cover" class="thumb" />
              <el-button type="danger" circle size="small" class="del-btn"
                @click="form.articleCoverImages.splice(i, 1)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
            <el-upload class="uploader-card" :show-file-list="false"
              :before-upload="(file: File) => { handleListUpload(file, 'articleCoverImages'); return false }" accept="image/*">
              <el-icon class="up-icon"><Plus /></el-icon>
            </el-upload>
          </div>
          <div class="tip">文章未传封面时，从这里随机取一张兜底</div>
        </el-form-item>

        <el-form-item label="首页公告条">
          <el-input v-model="form.headerNotification" placeholder="文章列表上方公告条" />
        </el-form-item>

        <el-form-item label="侧边栏公告">
          <el-input v-model="form.sidebarAnnouncement" type="textarea" :rows="3" placeholder="侧边栏公告" />
        </el-form-item>

        <el-form-item label="每日鸡汤">
          <el-input v-model="form.dailySoup" type="textarea" :rows="3" placeholder="侧边栏每日鸡汤" />
        </el-form-item>

        <el-form-item label="备案号">
          <el-input v-model="form.recordInfo" placeholder="ICP备案号" />
        </el-form-item>

        <el-form-item label="关于本站">
          <el-input v-model="form.aboutSite" type="textarea" :rows="5" placeholder="关于本站说明（纯文本，换行保留）" />
        </el-form-item>

        <el-form-item label="技术栈">
          <el-input v-model="form.techStackText" type="textarea" :rows="4" placeholder="一行一个，如 Vue3、Java" />
        </el-form-item>

        <el-form-item label="打字机文案">
          <el-input v-model="form.typingTextsText" type="textarea" :rows="3" placeholder="一行一条（预留）" />
        </el-form-item>

        <el-form-item label="扩展信息">
          <el-input v-model="form.extendInfo" type="textarea" :rows="3" placeholder="扩展信息（预留）" />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getWebsiteConfig, addWebsiteConfig, updateWebsiteConfig, uploadWebsiteConfigImage } from '@/api'
import { BIZ_CODE } from '@/constants'
import type { WebsiteConfigRequest } from '@/types'

const loading = ref(false)
const saving = ref(false)
// update=已存在配置走修改；add=表为空走首次初始化
const mode = ref<'add' | 'update'>('update')

const form = ref({
  websiteName: '',
  logo: '',
  favicon: '',
  bloggerCardBackground: '',
  bannerImages: [] as string[],
  articleCoverImages: [] as string[],
  typingTextsText: '',
  headerNotification: '',
  sidebarAnnouncement: '',
  dailySoup: '',
  recordInfo: '',
  aboutSite: '',
  techStackText: '',
  extendInfo: '',
})

const rules = {
  websiteName: [
    { required: true, message: '请输入网站标题', trigger: 'blur' },
    { max: 100, message: '长度不能超过100', trigger: 'blur' },
  ],
}

const formRef = ref()

// 多值文本字段：textarea -> string[]（按换行拆分，去空白、去空行）
const splitLines = (text: string) =>
  text.split('\n').map((s) => s.trim()).filter(Boolean)

// 单图上传：上传成功后回填到对应字段
const handleSingleUpload = async (file: File, field: 'logo' | 'favicon' | 'bloggerCardBackground') => {
  try {
    const res = await uploadWebsiteConfigImage(file)
    if (res.code === BIZ_CODE.SUCCESS) {
      form.value[field] = res.data
      ElMessage.success('上传成功')
    } else {
      ElMessage.error(res.message || '上传失败')
    }
  } catch {
    ElMessage.error('上传失败')
  }
}

// 多图上传：上传成功后追加到图片列表
const handleListUpload = async (file: File, field: 'bannerImages' | 'articleCoverImages') => {
  try {
    const res = await uploadWebsiteConfigImage(file)
    if (res.code === BIZ_CODE.SUCCESS) {
      form.value[field].push(res.data)
      ElMessage.success('上传成功')
    } else {
      ElMessage.error(res.message || '上传失败')
    }
  } catch {
    ElMessage.error('上传失败')
  }
}

// 获取网站配置
const fetchData = async () => {
  loading.value = true
  try {
    const res = await getWebsiteConfig()
    if (res.code === BIZ_CODE.SUCCESS) {
      const info = res.data
      form.value = {
        websiteName: info.websiteName || '',
        logo: info.logo || '',
        favicon: info.favicon || '',
        bloggerCardBackground: info.bloggerCardBackground || '',
        bannerImages: info.bannerImages || [],
        articleCoverImages: info.articleCoverImages || [],
        typingTextsText: (info.typingTexts || []).join('\n'),
        headerNotification: info.headerNotification || '',
        sidebarAnnouncement: info.sidebarAnnouncement || '',
        dailySoup: info.dailySoup || '',
        recordInfo: info.recordInfo || '',
        aboutSite: info.aboutSite || '',
        techStackText: (info.techStack || []).join('\n'),
        extendInfo: info.extendInfo || '',
      }
      mode.value = 'update'
    } else if (res.code === BIZ_CODE.NOT_FOUND_ERROR) {
      // 表为空，切新增模式，表单保持空
      mode.value = 'add'
      ElMessage.info('暂无网站配置，填写后保存将初始化')
    } else {
      ElMessage.error(res.message || '获取失败')
    }
  } finally {
    loading.value = false
  }
}

// 保存（update 修改 / add 首次初始化）
const handleSave = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    saving.value = true
    try {
      const data: WebsiteConfigRequest = {
        websiteName: form.value.websiteName,
        logo: form.value.logo,
        favicon: form.value.favicon,
        bloggerCardBackground: form.value.bloggerCardBackground,
        bannerImages: form.value.bannerImages,
        articleCoverImages: form.value.articleCoverImages,
        typingTexts: splitLines(form.value.typingTextsText),
        headerNotification: form.value.headerNotification,
        sidebarAnnouncement: form.value.sidebarAnnouncement,
        dailySoup: form.value.dailySoup,
        recordInfo: form.value.recordInfo,
        aboutSite: form.value.aboutSite,
        techStack: splitLines(form.value.techStackText),
        extendInfo: form.value.extendInfo,
      }
      const res = mode.value === 'update'
        ? await updateWebsiteConfig(data)
        : await addWebsiteConfig(data)
      if (res.code === BIZ_CODE.SUCCESS) {
        ElMessage.success(mode.value === 'update' ? '保存成功' : '初始化成功')
        fetchData()
      } else {
        ElMessage.error(res.message || '保存失败')
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
.website-config {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .single-uploader {
    :deep(.el-upload) { display: block; }

    .single-img {
      width: 120px;
      height: 120px;
      border-radius: 4px;
      display: block;
    }

    .up-icon {
      width: 120px;
      height: 120px;
      font-size: 28px;
      color: #8c939d;
      border: 1px dashed #d9d9d9;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover { border-color: #409eff; }
    }
  }

  .image-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;

    .image-item {
      position: relative;
      width: 100px;
      height: 100px;

      .thumb {
        width: 100px;
        height: 100px;
        border-radius: 4px;
        border: 1px solid var(--el-border-color-lighter);
      }

      .del-btn {
        position: absolute;
        top: -8px;
        right: -8px;
        z-index: 1;
      }
    }

    .uploader-card {
      :deep(.el-upload) { display: flex; }

      .up-icon {
        width: 100px;
        height: 100px;
        font-size: 28px;
        color: #8c939d;
        border: 1px dashed #d9d9d9;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover { border-color: #409eff; }
      }
    }
  }

  .tip {
    width: 100%;
    font-size: 12px;
    color: var(--el-text-color-secondary);
    margin-top: 6px;
  }
}
</style>
