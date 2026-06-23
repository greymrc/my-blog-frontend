import request from '../request'
import type {
  Category,
  AddCategoryRequest,
  UpdateCategoryRequest,
  DeleteCategoryRequest,
  PageResult,
  PageParams,
  ApiResponse
} from '@my-blog/shared/types'

// 分类分页列表
export function getCategoryList(params: PageParams): Promise<ApiResponse<PageResult<Category>>> {
  return request.post('/admin/category/list', params)
}

// 查询全部分类
export function getAllCategories(): Promise<ApiResponse<Category[]>> {
  return request.get('/admin/category/all')
}

// 根据ID查询分类
export function getCategoryById(id: number): Promise<ApiResponse<Category>> {
  return request.get(`/admin/category/${id}`)
}

// 新增分类
export function addCategory(data: AddCategoryRequest): Promise<ApiResponse<number>> {
  return request.post('/admin/category/add', data)
}

// 更新分类
export function updateCategory(data: UpdateCategoryRequest): Promise<ApiResponse<boolean>> {
  return request.post('/admin/category/update', data)
}

// 删除分类
export function deleteCategory(data: DeleteCategoryRequest): Promise<ApiResponse<boolean>> {
  return request.post('/admin/category/delete', data)
}