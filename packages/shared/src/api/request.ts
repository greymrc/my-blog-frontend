import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import type { ApiResponse } from '@my-blog/shared/types'
import { BIZ_CODE } from '@my-blog/shared/constants'

// Token 存储 key
const TOKEN_KEY = 'token'

// 获取存储的 token
export const getStoredToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY)
  }
  return null
}

// 存储 token
export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token)
  }
}

// 移除 token
export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY)
  }
}

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 错误处理函数
const handleError = (message: string) => {
  // 在浏览器环境中使用 console.error
  if (typeof window !== 'undefined') {
    console.error(message)
  }
}

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Token 模式：从 localStorage 获取 token 并添加到请求头
    const token = getStoredToken()
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data } = response

    // 成功
    if (data.code === BIZ_CODE.SUCCESS) {
      return data as any
    }

    // 业务错误
    handleError(data.message || '请求失败')
    return Promise.reject(new Error(data.message))
  },
  (error) => {
    const { response } = error

    if (response) {
      switch (response.status) {
        case 401:
          handleError('未登录或登录已过期')
          // 跳转到登录页
          if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
            window.location.href = '/login'
          }
          break
        case 403:
          handleError('没有权限访问')
          break
        case 404:
          handleError('请求的资源不存在')
          break
        case 500:
          handleError('服务器错误')
          break
        default:
          handleError(response.data?.message || '请求失败')
      }
    } else {
      handleError('网络连接失败')
    }

    return Promise.reject(error)
  }
)

// 封装请求方法
const request = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return instance.get(url, config)
  },
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return instance.post(url, data, config)
  },
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return instance.put(url, data, config)
  },
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return instance.delete(url, config)
  },
  // 上传文件
  upload<T = any>(url: string, file: File, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const formData = new FormData()
    formData.append('file', file)
    return instance.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export { instance, request }
export default request