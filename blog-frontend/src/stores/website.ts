import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getBloggerInfo } from '@/api'
import type { BloggerInfo } from '@/types'

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

  // 后端无对应字段的静态展示信息
  const siteStatic = ref({
    websiteName: 'My Blog',
    headerNotification: '欢迎来到我的博客！',
    sidebarAnnouncement: '本站正在建设中，敬请期待更多内容...',
    webmasterProfileBackground: 'https://picsum.photos/400/300',
    // 首页 banner 轮播图列表（纯 CSS 淡入淡出，一张 6s，列表长度即循环张数）
    bannerList: [
      'https://picsum.photos/seed/banner1/1920/1080',
      'https://picsum.photos/seed/banner2/1920/1080',
      'https://picsum.photos/seed/banner3/1920/1080',
      'https://picsum.photos/seed/banner4/1920/1080',
      'https://picsum.photos/seed/banner5/1920/1080',
    ],
    recordInfo: '蜀ICP备2025148459',
  })

  // 拉取博主信息
  const fetchBloggerInfo = async () => {
    try {
      bloggerInfo.value = await getBloggerInfo()
    } catch {
      // 响应拦截器已 ElMessage 提示错误，此处静默
    }
  }

  return {
    bloggerInfo,
    siteStatic,
    fetchBloggerInfo,
  }
})

export default useWebsiteStore
