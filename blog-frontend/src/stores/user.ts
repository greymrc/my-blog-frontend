import { defineStore } from 'pinia'
import { shallowRef } from 'vue'

const useUserStore = defineStore('user', () => {
  const userInfo = shallowRef()

  return {
    userInfo,
  }
})

export default useUserStore
