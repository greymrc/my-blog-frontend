// Mock 静态数据 - 后续替换为真实 API

// 文章列表 Mock
export const mockArticleList = [
  {
    id: 1,
    articleTitle: 'Vue3 + TypeScript 项目搭建最佳实践',
    articleContent: '本文将介绍如何使用 Vue3 和 TypeScript 搭建一个现代化的前端项目，包括项目结构、代码规范、状态管理等方面的最佳实践...',
    articleCover: 'https://picsum.photos/800/400?random=1',
    categoryName: '前端开发',
    categoryId: 1,
    tags: ['Vue3', 'TypeScript'],
    visitCount: 256,
    commentCount: 12,
    createTime: '2024-06-15',
    updateTime: '2024-06-20',
  },
  {
    id: 2,
    articleTitle: '深入理解 JavaScript 事件循环机制',
    articleContent: '事件循环是 JavaScript 异步编程的核心机制，理解它对于编写高质量的异步代码至关重要。本文将从宏任务、微任务的角度深入剖析...',
    articleCover: 'https://picsum.photos/800/400?random=2',
    categoryName: 'JavaScript',
    categoryId: 2,
    tags: ['JavaScript', '异步编程'],
    visitCount: 389,
    commentCount: 23,
    createTime: '2024-05-20',
    updateTime: '2024-05-25',
  },
  {
    id: 3,
    articleTitle: 'CSS Grid 布局完全指南',
    articleContent: 'CSS Grid 是目前最强大的布局系统之一，它将网页划分成一个个网格，可以任意组合不同的网格做出各种各样的布局...',
    articleCover: 'https://picsum.photos/800/400?random=3',
    categoryName: 'CSS',
    categoryId: 3,
    tags: ['CSS', '布局'],
    visitCount: 178,
    commentCount: 8,
    createTime: '2024-04-10',
    updateTime: '2024-04-12',
  },
  {
    id: 4,
    articleTitle: 'Node.js 性能优化实战',
    articleContent: '在生产环境中，Node.js 应用的性能至关重要。本文将分享一些实用的性能优化技巧，包括内存管理、集群模式、缓存策略等...',
    articleCover: 'https://picsum.photos/800/400?random=4',
    categoryName: '后端开发',
    categoryId: 4,
    tags: ['Node.js', '性能优化'],
    visitCount: 445,
    commentCount: 31,
    createTime: '2024-03-18',
    updateTime: '2024-03-22',
  },
  {
    id: 5,
    articleTitle: 'Docker 容器化部署前端应用',
    articleContent: 'Docker 可以帮助我们快速部署前端应用，保证环境一致性。本文将介绍如何使用 Docker 和 Nginx 部署 Vue 项目...',
    articleCover: 'https://picsum.photos/800/400?random=5',
    categoryName: 'DevOps',
    categoryId: 5,
    tags: ['Docker', '部署'],
    visitCount: 312,
    commentCount: 15,
    createTime: '2024-02-28',
    updateTime: '2024-03-01',
  },
  {
    id: 6,
    articleTitle: 'Pinia 状态管理深入解析',
    articleContent: 'Pinia 是 Vue3 官方推荐的状态管理库，相比 Vuex 更加轻量和灵活。本文将深入解析 Pinia 的核心概念和高级用法...',
    articleCover: 'https://picsum.photos/800/400?random=6',
    categoryName: '前端开发',
    categoryId: 1,
    tags: ['Vue3', 'Pinia'],
    visitCount: 234,
    commentCount: 19,
    createTime: '2024-01-15',
    updateTime: '2024-01-18',
  },
]

// 推荐文章 Mock
export const mockRecommendArticles = [
  {
    id: 1,
    articleTitle: 'Vue3 + TypeScript 项目搭建最佳实践',
    articleContent: '本文将介绍如何使用 Vue3 和 TypeScript 搭建...',
    articleCover: 'https://picsum.photos/800/400?random=10',
    createTime: '2024-06-15',
  },
  {
    id: 4,
    articleTitle: 'Node.js 性能优化实战',
    articleContent: '在生产环境中，Node.js 应用的性能至关重要...',
    articleCover: 'https://picsum.photos/800/400?random=11',
    createTime: '2024-03-18',
  },
  {
    id: 2,
    articleTitle: '深入理解 JavaScript 事件循环机制',
    articleContent: '事件循环是 JavaScript 异步编程的核心机制...',
    articleCover: 'https://picsum.photos/800/400?random=12',
    createTime: '2024-05-20',
  },
]

// 文章详情 Mock
export const mockArticleDetail = {
  id: 1,
  articleTitle: 'Vue3 + TypeScript 项目搭建最佳实践',
  articleContent: `# Vue3 + TypeScript 项目搭建最佳实践

## 1. 项目初始化

使用 Vite 创建项目是最快的方式：

\`\`\`bash
npm create vite@latest my-project -- --template vue-ts
\`\`\`

## 2. 项目结构

推荐的项目目录结构如下：

\`\`\`
src/
├── api/          # 接口请求
├── assets/       # 静态资源
├── components/   # 公共组件
├── composables/  # 组合式函数
├── layouts/      # 布局组件
├── pages/        # 页面组件
├── router/       # 路由配置
├── stores/       # 状态管理
├── styles/       # 全局样式
├── types/        # 类型定义
└── utils/        # 工具函数
\`\`\`

## 3. 代码规范

### ESLint + Prettier

配置 ESLint 和 Prettier 来统一代码风格，这是团队协作的基础。

### Husky + lint-staged

使用 Husky 和 lint-staged 在提交代码时自动检查代码质量。

## 4. 状态管理

推荐使用 Pinia 作为状态管理方案，它比 Vuex 更加轻量和灵活。

> Pinia 已经成为 Vue3 官方推荐的状态管理库。

## 5. 总结

搭建一个好的项目基础架构，可以让后续开发事半功倍。希望本文对你有所帮助！`,
  articleCover: 'https://picsum.photos/800/400?random=1',
  categoryName: '前端开发',
  categoryId: 1,
  tags: [{ id: 1, tagName: 'Vue3' }, { id: 2, tagName: 'TypeScript' }],
  visitCount: 256,
  commentCount: 12,
  createTime: '2024-06-15',
  updateTime: '2024-06-20',
  userId: 1,
}

// 分类列表 Mock
export const mockCategories = [
  { id: 1, name: '前端开发', articleCount: 15 },
  { id: 2, name: 'JavaScript', articleCount: 12 },
  { id: 3, name: 'CSS', articleCount: 8 },
  { id: 4, name: '后端开发', articleCount: 6 },
  { id: 5, name: 'DevOps', articleCount: 4 },
  { id: 6, name: '数据库', articleCount: 3 },
  { id: 7, name: '算法', articleCount: 5 },
  { id: 8, name: '其他', articleCount: 7 },
]

// 标签列表 Mock
export const mockTags = [
  { id: 1, name: 'Vue3', color: '#42b883' },
  { id: 2, name: 'TypeScript', color: '#3178c6' },
  { id: 3, name: 'JavaScript', color: '#f7df1e' },
  { id: 4, name: 'CSS', color: '#264de4' },
  { id: 5, name: 'Node.js', color: '#68a063' },
  { id: 6, name: 'Docker', color: '#2496ed' },
  { id: 7, name: 'Pinia', color: '#ffd859' },
  { id: 8, name: 'React', color: '#61dafb' },
  { id: 9, name: '异步编程', color: '#e34c26' },
  { id: 10, name: '布局', color: '#9b59b6' },
  { id: 11, name: '性能优化', color: '#e67e22' },
  { id: 12, name: '部署', color: '#2ecc71' },
]

// 归档 Mock
export const mockArchive = [
  { year: '2024', months: [
    { month: '6月', articles: [
      { id: 1, title: 'Vue3 + TypeScript 项目搭建最佳实践', createTime: '2024-06-15' },
    ]},
    { month: '5月', articles: [
      { id: 2, title: '深入理解 JavaScript 事件循环机制', createTime: '2024-05-20' },
    ]},
    { month: '4月', articles: [
      { id: 3, title: 'CSS Grid 布局完全指南', createTime: '2024-04-10' },
    ]},
    { month: '3月', articles: [
      { id: 4, title: 'Node.js 性能优化实战', createTime: '2024-03-18' },
    ]},
    { month: '2月', articles: [
      { id: 5, title: 'Docker 容器化部署前端应用', createTime: '2024-02-28' },
    ]},
    { month: '1月', articles: [
      { id: 6, title: 'Pinia 状态管理深入解析', createTime: '2024-01-15' },
    ]},
  ]}
]

// 首页轮播图 Mock
export const mockBanners = [
  'https://picsum.photos/1920/1080?random=20',
  'https://picsum.photos/1920/1080?random=21',
  'https://picsum.photos/1920/1080?random=22',
  'https://picsum.photos/1920/1080?random=23',
  'https://picsum.photos/1920/1080?random=24',
]

// 每日鸡汤 Mock
export const mockSoup = '生活不是等待暴风雨过去，而是学会在雨中翩翩起舞。'
