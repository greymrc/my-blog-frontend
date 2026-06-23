import request from '../request'
import type {
  User,
  LoginRequest,
  RegisterRequest,
  UpdateUserRequest,
  ApiResponse
} from '@my-blog/shared/types'

// 用户注册
export function register(data: RegisterRequest): Promise<ApiResponse<number>> {
  return request.post('/admin/user/register', data)
}

// 用户登录
export function login(data: LoginRequest): Promise<ApiResponse<User>> {
  return request.post('/admin/user/login', data)
}

// 用户登出
export function logout(): Promise<ApiResponse<boolean>> {
  return request.get('/admin/user/logout')
}

// 获取当前登录用户信息
export function getLoginUser(): Promise<ApiResponse<User>> {
  return request.get('/admin/user/getLoginUser')
}

// 更新用户信息
export function updateUser(data: UpdateUserRequest): Promise<ApiResponse<boolean>> {
  return request.post('/admin/user/update', data)
}