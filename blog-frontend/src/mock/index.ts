import type { WebsiteConfig } from '@/types'

// 网站配置兜底 Mock
// getWebsiteConfig 查不到（未初始化）/网络异常时，store 用此值兜底，保证前台始终有内容
export const mockWebsiteConfig: WebsiteConfig = {
  websiteName: 'My Blog',
  headerNotification: '欢迎来到我的博客！',
  sidebarAnnouncement: '本站正在建设中，敬请期待更多内容...',
  bloggerCardBackground: 'https://picsum.photos/400/300',
  bannerImages: [
    'https://picsum.photos/seed/banner1/1920/1080',
    'https://picsum.photos/seed/banner2/1920/1080',
    'https://picsum.photos/seed/banner3/1920/1080',
    'https://picsum.photos/seed/banner4/1920/1080',
    'https://picsum.photos/seed/banner5/1920/1080',
  ],
  recordInfo: '蜀ICP备2025148459',
  dailySoup: '生活不是等待暴风雨过去，而是学会在雨中翩翩起舞。',
  aboutSite:
    '这是一个基于 Vue3 + TypeScript 搭建的个人博客，记录技术学习与生活感悟。\n如果你喜欢我的文章，欢迎收藏本站，也欢迎与我交流讨论。',
  techStack: ['Vue3', 'TypeScript', 'Pinia', 'Element Plus', 'Vite', 'Sass'],
}
