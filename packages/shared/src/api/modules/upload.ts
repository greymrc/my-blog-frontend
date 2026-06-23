import request from '../request'
import type { ApiResponse } from '@my-blog/shared/types'

// 上传文章封面
export function uploadArticleCover(file: File): Promise<ApiResponse<string>> {
  return request.upload('/upload/article/cover', file)
}

// 上传文章内容图片
export function uploadArticleImage(file: File): Promise<ApiResponse<string>> {
  return request.upload('/upload/article/image', file)
}

// 上传用户头像
export function uploadUserAvatar(file: File): Promise<ApiResponse<string>> {
  return request.upload('/upload/user/avatar', file)
}

// 上传网站头像
export function uploadWebsiteAvatar(file: File): Promise<ApiResponse<string>> {
  return request.upload('/upload/website/avatar', file)
}

// 删除文件
export function deleteFile(fileUrl: string): Promise<ApiResponse<boolean>> {
  return request.delete('/upload/delete', { params: { fileUrl } })
}