// 业务状态码 - 与后端 ErrorCode 枚举一致
export const BIZ_CODE = {
  SUCCESS: 20000,
  PARAMS_ERROR: 40000,
  NOT_LOGIN_ERROR: 40100,
  NO_AUTH_ERROR: 40101,
  NOT_FOUND_ERROR: 40400,
  FORBIDDEN_ERROR: 40300,
  SYSTEM_ERROR: 50000,
  OPERATION_ERROR: 50001,
} as const

// Token 存储 key
export const TOKEN_KEY = 'blog_admin_token'

// JWT 前缀
export const JWT_PREFIX = 'Bearer '