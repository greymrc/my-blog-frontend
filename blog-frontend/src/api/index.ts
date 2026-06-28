import axios from 'axios'
import { TOKEN_KEY, JWT_PREFIX } from '../constants'
import type { ApiResponse } from '../types'

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
    const token = getToken()
    if (token) {
      config.headers.Authorization = JWT_PREFIX + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response?.status === 401) {
      removeToken()
    }
    return Promise.reject(error)
  }
)

// Token 管理
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

// ==================== 文章 API ====================
export const getArticleList = (params?: { page?: number; pageSize?: number; categoryId?: number; tagId?: number }) => {
  return http.post<any, ApiResponse>('/article/list', params)
}

export const getArticleDetail = (id: number) => {
  return http.get<any, ApiResponse>(`/article/${id}`)
}

export const getArticleArchive = () => {
  return http.get<any, ApiResponse>('/article/archive')
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