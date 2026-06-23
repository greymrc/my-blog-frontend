import request from '../request'
import type {
  WebsiteInfo,
  UpdateWebsiteInfoRequest,
  ApiResponse
} from '@my-blog/shared/types'

// 获取网站信息（公开接口）
export function getWebsiteInfo(): Promise<ApiResponse<WebsiteInfo>> {
  return request.get('/app/website-info/get')
}

// 获取网站信息（管理接口）
export function getWebsiteInfoAdmin(): Promise<ApiResponse<WebsiteInfo>> {
  return request.get('/admin/website-info/get')
}

// 更新网站信息
export function updateWebsiteInfo(data: UpdateWebsiteInfoRequest): Promise<ApiResponse<boolean>> {
  return request.post('/admin/website-info/update', data)
}