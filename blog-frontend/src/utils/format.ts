// 时间格式化 - 后端返回 ISO 时间（如 '2024-01-15T00:00:00'），截取前 10 位得到 'YYYY-MM-DD'
// 用 slice 而非 Date 解析，避免时区差异导致日期差一天
export function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  return dateStr.slice(0, 10)
}
