import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getLoginUser, login as loginApi, logout as logoutApi, setToken, removeToken } from '@my-blog/shared/api'
import { BIZ_CODE } from '@my-blog/shared/constants'
import type { User, LoginRequest } from '@my-blog/shared/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => !!user.value)

  // 获取当前登录用户信息
  const fetchUser = async () => {
    try {
      const res = await getLoginUser()
      if (res.code === BIZ_CODE.SUCCESS) {
        user.value = res.data
      }
    } catch (error) {
      user.value = null
    }
  }

  // 登录
  const login = async (data: LoginRequest) => {
    const res = await loginApi(data)
    if (res.code === BIZ_CODE.SUCCESS) {
      user.value = res.data
      // 保存 token 到 localStorage
      if (res.data.token) {
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
      // 清除 token 和用户信息
      removeToken()
      user.value = null
    }
  }

  return {
    user,
    isLoggedIn,
    fetchUser,
    login,
    logout
  }
})