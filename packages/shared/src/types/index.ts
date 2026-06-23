// ========== 统一响应格式 ==========

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// ========== 分页响应格式 ==========

export interface PageResult<T> {
  pageNum: number
  pageSize: number
  total: number
  pages: number
  records: T[]
}

// ========== 分页请求参数 ==========

export interface PageParams {
  pageNum?: number
  pageSize?: number
  sortField?: string
  sortOrder?: 'ascend' | 'descend'
}

// ========== 用户模块 ==========

export interface User {
  id: number
  account: string
  nickname: string
  email: string
  mobile: string
  gender: number  // 0女/1男
  avatar: string
  profile: string
  role: string    // user/admin
  createTime: string
  updateTime: string
  token?: string  // 登录令牌（仅登录接口返回时使用）
}

export interface LoginRequest {
  account: string
  password: string
}

export interface RegisterRequest {
  account: string
  password: string
  checkPassword: string
}

export interface UpdateUserRequest {
  id: number
  nickname?: string
  avatar?: string
  profile?: string
  email?: string
  mobile?: string
  role?: string
}

// ========== 文章模块 ==========

export interface Article {
  id: number
  title: string
  content: string
  excerpt: string
  coverImage: string
  sortOrder: number
  viewCount: number
  status: number    // 0草稿/1公开/2私密
  wordCount: number
  createTime: string
  updateTime: string
  categoryId: number
  authorId: number
  category: Category
  author: Author
  tags: Tag[]
}

export interface ArticleListParams extends PageParams {
  categoryId?: number
  tagId?: number
  status?: number
}

export interface AddArticleRequest {
  title: string
  content: string
  excerpt?: string
  coverImage?: string
  categoryId?: number
  tagIds?: number[]
  status?: number
  sortOrder?: number
}

export interface UpdateArticleRequest {
  id: number
  title: string
  content: string
  excerpt?: string
  coverImage?: string
  categoryId?: number
  tagIds?: number[]
  status?: number
  sortOrder?: number
}

export interface DeleteArticleRequest {
  id: number
}

// ========== 分类模块 ==========

export interface Category {
  id: number
  name: string
  sortOrder: number
}

export interface AddCategoryRequest {
  name: string
  sortOrder?: number
}

export interface UpdateCategoryRequest {
  id: number
  name: string
  sortOrder?: number
}

export interface DeleteCategoryRequest {
  id: number
}

// ========== 标签模块 ==========

export interface Tag {
  id: number
  name: string
  color: string
  createTime: string
  updateTime: string
}

export interface AddTagRequest {
  name: string
  color?: string
}

export interface UpdateTagRequest {
  id: number
  name: string
  color?: string
}

export interface DeleteTagRequest {
  id: number
}

// ========== 作者信息 ==========

export interface Author {
  id: number
  nickname: string
  avatar: string
}

// ========== 网站信息 ==========

export interface WebsiteInfo {
  id: number
  bloggerName: string
  avatar: string
  intro: string
  githubUrl: string
  email: string
  aboutContent: string
  updateTime: string
}

export interface UpdateWebsiteInfoRequest {
  bloggerName: string
  avatar?: string
  intro?: string
  githubUrl?: string
  email?: string
  aboutContent?: string
}

// ========== 文章归档 ==========

export interface ArchiveData {
  [year: string]: {
    [month: string]: Article[]
  }
}

export interface ArchiveParams {
  year?: number
  month?: number
}

// ========== 文件上传 ==========

export interface DeleteFileRequest {
  fileUrl: string
}