import { defineStore } from 'pinia'
import { ref } from 'vue'

const useWebsiteStore = defineStore('website', () => {
  // Mock 静态数据
  const webInfo = ref({
    websiteName: 'My Blog',
    webmasterAvatar: 'https://picsum.photos/200',
    webmasterName: 'Grey',
    webmasterCopy: '热爱编程，热爱生活',
    webmasterProfileBackground: 'https://picsum.photos/400/300',
    headerNotification: '欢迎来到我的博客！',
    sidebarAnnouncement: '本站正在建设中，敬请期待更多内容...',
    recordInfo: '蜀ICP备2025148459',
    articleCount: 42,
    visitCount: 1024,
    wordCount: '12.5w',
    startTime: '2024-01-01',
    lastUpdateTime: '3天',
    githubLink: 'https://github.com',
    giteeLink: 'https://gitee.com',
    email: 'grey@grey666.com',
  })

  return {
    webInfo,
  }
})

export default useWebsiteStore
