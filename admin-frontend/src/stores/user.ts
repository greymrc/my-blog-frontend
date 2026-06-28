import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getLoginUser, login as loginApi, logout as logoutApi, setToken, removeToken, getToken } from '@/api'
import { BIZ_CODE } from '@/constants'
import type { User, LoginRequest } from '@/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => !!user.value)

  // 获取当前登录用户信息
  const fetchUser = async () => {
    // 没有 token 就不请求
    if (!getToken()) {
      user.value = null
      return
    }
    try {
      const res = await getLoginUser()
      if (res.code === BIZ_CODE.SUCCESS) {
        user.value = res.data
      }
    } catch (error) {
      user.value = null
      removeToken()
    }
  }

  // 登录
  const login = async (data: LoginRequest) => {
    const res = await loginApi(data)
    if (res.code === BIZ_CODE.SUCCESS) {
      user.value = res.data
      // 保存 token
      if (res.data?.token) {
        setToken(res.data.token)
      }
      return true
    }
    return false
  }

  // 登出
  const logout = async () => {
    try {
      await logoutApi()
    } finally {
      removeToken()
      user.value = null
    }
  }

  // 初始化时检查登录状态
  const init = async () => {
    if (getToken() && !user.value) {
      await fetchUser()
    }
  }

  return {
    user,
    isLoggedIn,
    fetchUser,
    login,
    logout,
    init
  }
}, {
  // 持久化配置
  persist: {
    key: 'admin_user',
    storage: localStorage,
    paths: ['user']
  }
})