import request from '../request'
import type {
  Tag,
  AddTagRequest,
  UpdateTagRequest,
  DeleteTagRequest,
  PageResult,
  PageParams,
  ApiResponse
} from '@my-blog/shared/types'

// 标签分页列表
export function getTagList(params: PageParams): Promise<ApiResponse<PageResult<Tag>>> {
  return request.post('/admin/tag/list', params)
}

// 查询全部标签
export function getAllTags(): Promise<ApiResponse<Tag[]>> {
  return request.get('/admin/tag/all')
}

// 根据ID查询标签
export function getTagById(id: number): Promise<ApiResponse<Tag>> {
  return request.get(`/admin/tag/${id}`)
}

// 新增标签
export function addTag(data: AddTagRequest): Promise<ApiResponse<number>> {
  return request.post('/admin/tag/add', data)
}

// 更新标签
export function updateTag(data: UpdateTagRequest): Promise<ApiResponse<boolean>> {
  return request.post('/admin/tag/update', data)
}

// 删除标签
export function deleteTag(data: DeleteTagRequest): Promise<ApiResponse<boolean>> {
  return request.post('/admin/tag/delete', data)
}