// 用户相关类型
export interface User {
  id: number
  account: string
  nickname?: string
  avatar?: string
  email?: string
  token?: string
}

export interface LoginRequest {
  account: string
  password: string
}

// 分类相关类型
export interface Category {
  id: number
  name: string
  slug?: string
  description?: string
  articleCount?: number
  createdAt?: string
  updatedAt?: string
}

export interface AddCategoryRequest {
  name: string
  slug?: string
  description?: string
}

export interface UpdateCategoryRequest {
  id: number
  name?: string
  slug?: string
  description?: string
}

// 标签相关类型
export interface Tag {
  id: number
  name: string
  slug?: string
  articleCount?: number
  createdAt?: string
  updatedAt?: string
}

export interface AddTagRequest {
  name: string
  slug?: string
}

export interface UpdateTagRequest {
  id: number
  name?: string
  slug?: string
}

// 文章相关类型
export interface Article {
  id: number
  title: string
  slug?: string
  summary?: string
  content: string
  cover?: string
  categoryId: number
  categoryName?: string
  tags?: Tag[]
  viewCount: number
  likeCount: number
  commentCount: number
  status: ArticleStatus
  isTop: boolean
  createdAt: string
  updatedAt: string
}

export enum ArticleStatus {
  DRAFT = 0,
  PUBLISHED = 1,
}

export interface AddArticleRequest {
  title: string
  slug?: string
  summary?: string
  content: string
  cover?: string
  categoryId: number
  tagIds?: number[]
  status?: ArticleStatus
  isTop?: boolean
}

export interface UpdateArticleRequest {
  id: number
  title?: string
  slug?: string
  summary?: string
  content?: string
  cover?: string
  categoryId?: number
  tagIds?: number[]
  status?: ArticleStatus
  isTop?: boolean
}

// 网站信息类型
export interface WebsiteInfo {
  id: number
  name: string
  description?: string
  keywords?: string
  logo?: string
  favicon?: string
  footer?: string
  notice?: string
  github?: string
  email?: string
}

export interface UpdateWebsiteInfoRequest {
  name?: string
  description?: string
  keywords?: string
  logo?: string
  favicon?: string
  footer?: string
  notice?: string
  github?: string
  email?: string
}

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
  list: T[]
  total: number
  page: number
  pageSize: number
}
