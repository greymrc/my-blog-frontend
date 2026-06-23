// 常量定义

// Token 存储键名
export const TOKEN_KEY = 'blog_token'
export const USER_INFO_KEY = 'blog_user_info'

// 默认分页配置
export const DEFAULT_PAGE_SIZE = 10
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

// HTTP 状态码
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500
} as const

// 业务状态码（与后端 ErrorCode 枚举对应）
export const BIZ_CODE = {
  SUCCESS: 20000,              // 成功
  PARAMS_ERROR: 40000,         // 请求参数错误
  NOT_LOGIN_ERROR: 40100,      // 未登录
  NO_AUTH_ERROR: 40101,        // 无权限
  NOT_FOUND_ERROR: 40400,      // 请求数据不存在
  FORBIDDEN_ERROR: 40300,      // 禁止访问
  SYSTEM_ERROR: 50000,         // 系统内部异常
  OPERATION_ERROR: 50001       // 操作失败
} as const