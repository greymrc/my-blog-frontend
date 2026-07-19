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

// 作者信息 - 对齐后端 AuthorDTO
export interface Author {
  id: number
  nickname: string
  avatar?: string
}

// 分类相关类型 - 对齐后端 CategoryDTO
export interface Category {
  id: number
  name: string
  sortWeight?: number
  articleCount?: number
}

// 分类新增请求 - 对齐后端 CategoryAddRequest
export interface AddCategoryRequest {
  name: string
  sortWeight?: number
}

// 分类更新请求 - 对齐后端 CategoryUpdateRequest
export interface UpdateCategoryRequest {
  id: number
  name?: string
  sortWeight?: number
}

// 标签相关类型 - 对齐后端 TagDTO
export interface Tag {
  id: number
  name: string
  color?: string
  createTime?: string
  updateTime?: string
}

// 标签新增请求 - 对齐后端 TagAddRequest
export interface AddTagRequest {
  name: string
  color?: string
}

// 标签更新请求 - 对齐后端 TagUpdateRequest
export interface UpdateTagRequest {
  id: number
  name?: string
  color?: string
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

// 创建文章请求 - 对齐后端 ArticleAddRequest
export interface AddArticleRequest {
  title: string
  content: string
  excerpt?: string
  coverImage?: string
  categoryId?: number
  tagIds?: number[]
  status?: number
  sortWeight?: number
}

// 更新文章请求 - 对齐后端 ArticleUpdateRequest
export interface UpdateArticleRequest {
  id: number
  title?: string
  content?: string
  excerpt?: string
  coverImage?: string
  categoryId?: number
  tagIds?: number[]
  status?: number
  sortWeight?: number
}

// 博主信息类型 - 对齐后端 BloggerInfoDTO
export interface BloggerInfo {
  id: number
  bloggerName: string
  avatar?: string
  intro?: string
  githubUrl?: string
  email?: string
  aboutContent?: string
  updateTime?: string
}

// 博主信息更新请求 - 对齐后端 BloggerInfoUpdateRequest
export interface UpdateBloggerInfoRequest {
  bloggerName?: string
  avatar?: string
  intro?: string
  githubUrl?: string
  email?: string
  aboutContent?: string
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
