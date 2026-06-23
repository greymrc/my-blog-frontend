import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAllCategories, addCategory, updateCategory, deleteCategory } from '@my-blog/shared/api'
import type { Category, AddCategoryRequest, UpdateCategoryRequest } from '@my-blog/shared/types'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])
  const loading = ref(false)

  // 获取所有分类
  const fetchAllCategories = async () => {
    loading.value = true
    try {
      const res = await getAllCategories()
      if (res.code === 200) {
        categories.value = res.data
      }
    } finally {
      loading.value = false
    }
  }

  // 新增分类
  const add = async (data: AddCategoryRequest) => {
    const res = await addCategory(data)
    if (res.code === 200) {
      await fetchAllCategories()
      return res.data
    }
    return null
  }

  // 更新分类
  const update = async (data: UpdateCategoryRequest) => {
    const res = await updateCategory(data)
    if (res.code === 200) {
      await fetchAllCategories()
      return true
    }
    return false
  }

  // 删除分类
  const remove = async (id: number) => {
    const res = await deleteCategory({ id })
    if (res.code === 200) {
      await fetchAllCategories()
      return true
    }
    return false
  }

  return {
    categories,
    loading,
    fetchAllCategories,
    add,
    update,
    remove
  }
})