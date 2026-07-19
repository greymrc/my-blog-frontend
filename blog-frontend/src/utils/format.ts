// 时间格式化 - 后端返回 ISO 时间（如 '2024-01-15T00:00:00'），截取前 10 位得到 'YYYY-MM-DD'
// 用 slice 而非 Date 解析，避免时区差异导致日期差一天
export function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  return dateStr.slice(0, 10)
}

// 全站字数格式化：后端返回总字数（如 125000），除以 1万 展示为 "12.5w"
export function formatWordCount(words?: number): string {
  if (!words) return '0'
  const wan = words / 10000
  return (wan % 1 === 0 ? wan.toFixed(0) : wan.toFixed(1)) + 'w'
}

// 相对时间格式化：将 ISO 时间转为 "刚刚 / X 分钟前 / X 小时前 / X 天前 / X 个月前 / X 年前"
export function formatRelativeTime(dateStr?: string): string {
  if (!dateStr) return ''
  const target = new Date(dateStr).getTime()
  if (Number.isNaN(target)) return ''
  const diff = Date.now() - target
  if (diff < 0) return '刚刚'
  const sec = Math.floor(diff / 1000)
  if (sec < 60) return '刚刚'
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min} 分钟前`
  const hour = Math.floor(min / 60)
  if (hour < 24) return `${hour} 小时前`
  const day = Math.floor(hour / 24)
  if (day < 30) return `${day} 天前`
  const month = Math.floor(day / 30)
  if (month < 12) return `${month} 个月前`
  const year = Math.floor(month / 12)
  return `${year} 年前`
}
