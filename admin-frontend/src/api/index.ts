import axios from 'axios'
import { TOKEN_KEY, TOKEN_HEADER_KEY } from '../constants'
import type { ApiResponse } from '../types'

// 创建 axios 实例 - 用于 /admin 路径
const httpAdmin = axios.create({
  baseURL: '/api/admin',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 创建 axios 实例 - 用于 /app 路径
const httpApp = axios.create({
  baseURL: '/api/app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 创建 axios 实例 - 用于 /upload 路径（文件上传）
const httpUpload = axios.create({
  baseURL: '/api/upload',
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

// 请求拦截器
const requestInterceptor = (config: any) => {
  const token = getToken()
  if (token) {
    config.headers[TOKEN_HEADER_KEY] = token
  }
  return config
}

httpAdmin.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error))
httpApp.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error))
httpUpload.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error))

// 响应拦截器
const responseInterceptor = (response: any) => response.data
const errorInterceptor = (error: any) => {
  if (error.response?.status === 401) {
    removeToken()
    window.location.href = '/login'
  }
  return Promise.reject(error)
}

httpAdmin.interceptors.response.use(responseInterceptor, errorInterceptor)
httpApp.interceptors.response.use(responseInterceptor, errorInterceptor)
httpUpload.interceptors.response.use(responseInterceptor, errorInterceptor)

// Token 管理
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token)
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

// ==================== 用户 API (/admin) ====================
export const getLoginUser = () => httpAdmin.get<any, ApiResponse>('/user/getLoginUser')
export const login = (data: { account: string; password: string }) => httpAdmin.post<any, ApiResponse>('/user/login', data)
export const logout = () => httpAdmin.get<any, ApiResponse>('/user/logout')

// ==================== 分类 API (/admin) ====================
export const getAllCategories = () => httpAdmin.get<any, ApiResponse>('/category/all')
export const getCategoryList = (params?: any) => httpAdmin.post<any, ApiResponse>('/category/list', params)
export const addCategory = (data: any) => httpAdmin.post<any, ApiResponse>('/category/add', data)
export const updateCategory = (data: any) => httpAdmin.post<any, ApiResponse>('/category/update', data)
export const deleteCategory = (id: number) => httpAdmin.post<any, ApiResponse>('/category/delete', { id })

// ==================== 标签 API (/admin) ====================
export const getAllTags = () => httpAdmin.get<any, ApiResponse>('/tag/all')
export const getTagList = (params?: any) => httpAdmin.post<any, ApiResponse>('/tag/list', params)
export const addTag = (data: any) => httpAdmin.post<any, ApiResponse>('/tag/add', data)
export const updateTag = (data: any) => httpAdmin.post<any, ApiResponse>('/tag/update', data)
export const deleteTag = (id: number) => httpAdmin.post<any, ApiResponse>('/tag/delete', { id })

// ==================== 文章 API (/app) ====================
export const getArticleList = (params?: any) => httpApp.post<any, ApiResponse>('/article/list', params)
export const getArticleDetail = (id: number) => httpApp.get<any, ApiResponse>(`/article/${id}`)
export const addArticle = (data: any) => httpApp.post<any, ApiResponse>('/article/add', data)
export const updateArticle = (data: any) => httpApp.post<any, ApiResponse>('/article/update', data)
export const deleteArticle = (id: number) => httpApp.post<any, ApiResponse>('/article/delete', { id })

// ==================== 网站信息 API (/admin) ====================
export const getWebsiteInfo = () => httpAdmin.get<any, ApiResponse>('/website-info/get')
export const getWebsiteInfoAdmin = () => httpAdmin.get<any, ApiResponse>('/website-info/get')
export const updateWebsiteInfo = (data: any) => httpAdmin.post<any, ApiResponse>('/website-info/update', data)

// ==================== 上传 API (/upload) ====================
export const uploadArticleCover = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return httpUpload.post<any, ApiResponse>('/article/cover', formData)
}

export const uploadArticleImage = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return httpUpload.post<any, ApiResponse>('/article/image', formData)
}

export const uploadUserAvatar = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return httpUpload.post<any, ApiResponse>('/user/avatar', formData)
}

export const uploadWebsiteAvatar = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return httpUpload.post<any, ApiResponse>('/website/avatar', formData)
}