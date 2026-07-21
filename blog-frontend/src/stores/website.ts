import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getBloggerInfo, getWebsiteConfig } from '@/api'
import { mockWebsiteConfig } from '@/mock'
import type { BloggerInfo, WebsiteConfig } from '@/types'

const useWebsiteStore = defineStore('website', () => {
  // 博主信息（来自后端 /blog/blogger-info/get）
  const bloggerInfo = ref<BloggerInfo>({
    bloggerName: '',
    avatar: '',
    intro: '',
    githubUrl: '',
    email: '',
    aboutContent: '',
    updateTime: '',
  })

  // 网站配置（来自后端 /blog/website-config/get）
  // 初始用 mockWebsiteConfig 兜底；拉取失败（未初始化/网络异常）时保留 mock，前台始终有内容
  const siteConfig = ref<WebsiteConfig>(structuredClone(mockWebsiteConfig))

  // 拉取博主信息
  const fetchBloggerInfo = async () => {
    try {
      bloggerInfo.value = await getBloggerInfo()
    } catch {
      // 响应拦截器已 ElMessage 提示错误，此处静默
    }
  }

  // 拉取网站配置（silent 调用：失败不弹 toast，保留 mock 兜底）
  const fetchSiteConfig = async () => {
    try {
      const data = await getWebsiteConfig()
      siteConfig.value = data
      // 同步 favicon（document.title 由 router beforeEach 按 meta.title 管理，此处不覆盖）
      if (data.favicon) {
        const link = document.querySelector('link[rel="icon"]')
        if (link) link.setAttribute('href', data.favicon)
      }
    } catch {
      // 未初始化或网络异常，保留 mockWebsiteConfig 兜底，静默
    }
  }

  return {
    bloggerInfo,
    siteConfig,
    fetchBloggerInfo,
    fetchSiteConfig,
  }
})

export default useWebsiteStore
