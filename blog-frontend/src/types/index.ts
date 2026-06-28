// 通用响应类型 - 与后端 Result 类一致
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 分页请求
export interface PageRequest {
  page: number
  pageSize: number
}

// 分页响应
export interface PageResponse<T> {
  records: T[]
  total: number
  page: number
  pageSize: number
}

// 用户相关类型
export interface User {
  id: number
  account: string
  nickname?: string
  avatar?: string
  email?: string
}

// 文章相关类型
export interface Article {
  id: number
  title: string
  summary?: string
  content: string
  cover?: string
  categoryId: number
  categoryName?: string
  tags?: Tag[]
  viewCount: number
  likeCount: number
  commentCount: number
  createTime: string
  updateTime: string
}

// 分类相关类型
export interface Category {
  id: number
  name: string
  description?: string
  articleCount?: number
}

// 标签相关类型
export interface Tag {
  id: number
  name: string
  color?: string
}

// 网站信息类型
export interface WebsiteInfo {
  name: string
  description?: string
  keywords?: string
  logo?: string
  favicon?: string
  footer?: string
  notice?: string
}