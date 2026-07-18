import axios from 'axios'
import { ElMessage } from 'element-plus'
import type { ApiResponse, Article, ArticleArchiveDTO, PageResult } from '../types'
import { BIZ_CODE } from '../constants'

// 创建 axios 实例 - 用户端接口路径是 /api/blog
const http = axios.create({
  baseURL: '/api/blog',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器 - 统一处理业务状态码，成功时直接返回业务 data
http.interceptors.response.use(
  (response) => {
    const res = response.data as ApiResponse
    if (res.code !== BIZ_CODE.SUCCESS) {
      ElMessage.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message || '请求失败'))
    }
    return res.data
  },
  (error) => {
    ElMessage.error(error.message || '网络异常')
    return Promise.reject(error)
  }
)

// ==================== 文章 API ====================
export interface ArticleListParams {
  pageNum?: number
  pageSize?: number
  categoryId?: number
  tagId?: number
  status?: number
  sortField?: string
  sortOrder?: string
}

export const getArticleList = (params?: ArticleListParams) => {
  return http.post<any, PageResult<Article>>('/article/list', params)
}

export const getArticleDetail = (id: number) => {
  return http.get<any, Article>(`/article/${id}`)
}

export const getArticleArchive = () => {
  return http.get<any, Record<string, Record<string, ArticleArchiveDTO[]>>>('/article/archive')
}

// ==================== 分类 API ====================
export const getAllCategories = () => {
  return http.get<any, ApiResponse>('/category/all')
}

// ==================== 标签 API ====================
export const getAllTags = () => {
  return http.get<any, ApiResponse>('/tag/all')
}

// ==================== 网站信息 API ====================
export const getWebsiteInfo = () => {
  return http.get<any, ApiResponse>('/website-info/info')
}

// ==================== 评论 API ====================
export const getCommentList = (params?: { articleId?: number; page?: number; pageSize?: number }) => {
  return http.get<any, ApiResponse>('/comment/list', { params })
}

export const addComment = (data: { articleId: number; content: string; parentId?: number }) => {
  return http.post<any, ApiResponse>('/comment/add', data)
}

// ==================== 留言 API ====================
export const getLeaveWordList = (params?: { page?: number; pageSize?: number }) => {
  return http.get<any, ApiResponse>('/leave-word/list', { params })
}

export const addLeaveWord = (data: { content: string }) => {
  return http.post<any, ApiResponse>('/leave-word/add', data)
}
