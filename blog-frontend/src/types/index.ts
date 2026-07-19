// 通用响应类型 - 与后端 Result 类一致
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 分页请求 - 对齐后端 PageRequest
export interface PageRequest {
  pageNum: number
  pageSize: number
  sortField?: string
  sortOrder?: string
}

// 分页响应 - 对齐后端 PageResult
export interface PageResult<T> {
  records: T[]
  total: number
  pageNum: number
  pageSize: number
  pages: number
}

// 用户相关类型
export interface User {
  id: number
  account: string
  nickname?: string
  avatar?: string
  email?: string
}

// 作者信息 - 对齐后端 AuthorDTO
export interface Author {
  id: number
  nickname: string
  avatar?: string
}

// 文章相关类型 - 对齐后端 ArticleDTO
export interface Article {
  id: number
  title: string
  content: string
  excerpt?: string
  coverImage?: string
  sortWeight?: number
  viewCount: number
  status: number
  wordCount?: number
  createTime: string
  updateTime: string
  categoryId?: number
  authorId?: number
  category?: Category
  author?: Author
  tags?: Tag[]
}

// 文章归档数据 - 对齐后端 ArticleArchiveDTO（轻量级）
export interface ArticleArchiveDTO {
  id: number
  title: string
  createTime: string
  category?: Category
  tags?: Tag[]
}

// 分类相关类型 - 对齐后端 CategoryDTO
export interface Category {
  id: number
  name: string
  sortWeight?: number
  articleCount?: number
}

// 标签相关类型
export interface Tag {
  id: number
  name: string
  color?: string
}

// 博主信息类型 - 对齐后端 BloggerInfoDTO
export interface BloggerInfo {
  id?: number
  bloggerName: string
  avatar?: string
  intro?: string
  githubUrl?: string
  email?: string
  aboutContent?: string
  updateTime?: string
}

// 网站资讯统计 - 对齐后端 SiteStatsVO
export interface SiteStats {
  articleCount: number
  totalWords: number
  visitCount: number
  siteCreateDate?: string
  runDays: number
  lastArticleUpdateTime?: string
  statsRefreshTime?: string
}
