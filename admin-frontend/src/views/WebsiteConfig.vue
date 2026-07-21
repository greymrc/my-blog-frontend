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

        <el-form-item label="Logo URL">
          <el-input v-model="form.logo" placeholder="网站 Logo 图片URL" />
        </el-form-item>

        <el-form-item label="站点图标">
          <el-input v-model="form.favicon" placeholder="浏览器页签图标URL（favicon）" />
        </el-form-item>

        <el-form-item label="博主卡片背景图">
          <el-input v-model="form.bloggerCardBackground" placeholder="博主卡片背景图URL" />
        </el-form-item>

        <el-form-item label="首页 banner 图">
          <el-input v-model="form.bannerImagesText" type="textarea" :rows="4" placeholder="一行一个图片URL" />
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
import { getWebsiteConfig, addWebsiteConfig, updateWebsiteConfig } from '@/api'
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
  bannerImagesText: '',
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

// 多值字段：textarea 文本 -> string[]（按换行拆分，去空白、去空行）
const splitLines = (text: string) =>
  text.split('\n').map((s) => s.trim()).filter(Boolean)

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
        bannerImagesText: (info.bannerImages || []).join('\n'),
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
        bannerImages: splitLines(form.value.bannerImagesText),
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
}
</style>
