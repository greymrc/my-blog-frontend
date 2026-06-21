// 通用类型定义

// 后端统一响应结构
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 分页请求参数
export interface PaginationParams {
  pageNum: number
  pageSize: number
}

// 分页响应数据
export interface PaginationData<T> {
  list: T[]
  total: number
  pageNum: number
  pageSize: number
  pages: number
}

// 用户信息
export interface UserInfo {
  id: number
  username: string
  nickname?: string
  avatar?: string
  email?: string
  role?: string
  createdAt?: string
  updatedAt?: string
}

// 文章信息
export interface Article {
  id: number
  title: string
  content: string
  summary?: string
  cover?: string
  categoryId?: number
  categoryName?: string
  tags?: Tag[]
  viewCount: number
  likeCount: number
  commentCount: number
  status: ArticleStatus
  createdAt: string
  updatedAt: string
}

export enum ArticleStatus {
  DRAFT = 0,
  PUBLISHED = 1,
  ARCHIVED = 2
}

// 分类
export interface Category {
  id: number
  name: string
  description?: string
  articleCount?: number
  createdAt?: string
}

// 标签
export interface Tag {
  id: number
  name: string
  color?: string
  articleCount?: number
}

// 评论
export interface Comment {
  id: number
  content: string
  userId: number
  userName?: string
  userAvatar?: string
  targetType: number
  targetId: number
  parentId?: number
  replyUserId?: number
  replyUserName?: string
  createdAt: string
}