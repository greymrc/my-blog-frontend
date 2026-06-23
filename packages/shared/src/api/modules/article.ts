import request from '../request'
import type {
  Article,
  ArticleListParams,
  AddArticleRequest,
  UpdateArticleRequest,
  DeleteArticleRequest,
  PageResult,
  ApiResponse,
  ArchiveData,
  ArchiveParams
} from '@my-blog/shared/types'

// 文章分页列表
export function getArticleList(params: ArticleListParams): Promise<ApiResponse<PageResult<Article>>> {
  return request.post('/app/article/list', params)
}

// 获取文章详情
export function getArticleDetail(id: number): Promise<ApiResponse<Article>> {
  return request.get(`/app/article/${id}`)
}

// 获取文章归档列表
export function getArticleArchive(params?: ArchiveParams): Promise<ApiResponse<ArchiveData>> {
  return request.get('/app/article/archive', { params })
}

// 新增文章
export function addArticle(data: AddArticleRequest): Promise<ApiResponse<number>> {
  return request.post('/app/article/add', data)
}

// 更新文章
export function updateArticle(data: UpdateArticleRequest): Promise<ApiResponse<boolean>> {
  return request.post('/app/article/update', data)
}

// 删除文章
export function deleteArticle(data: DeleteArticleRequest): Promise<ApiResponse<boolean>> {
  return request.post('/app/article/delete', data)
}