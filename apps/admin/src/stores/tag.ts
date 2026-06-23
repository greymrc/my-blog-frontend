import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAllTags, addTag, updateTag, deleteTag } from '@my-blog/shared/api'
import { BIZ_CODE } from '@my-blog/shared/constants'
import type { Tag, AddTagRequest, UpdateTagRequest } from '@my-blog/shared/types'

export const useTagStore = defineStore('tag', () => {
  const tags = ref<Tag[]>([])
  const loading = ref(false)

  // 获取所有标签
  const fetchAllTags = async () => {
    loading.value = true
    try {
      const res = await getAllTags()
      if (res.code === BIZ_CODE.SUCCESS) {
        tags.value = res.data
      }
    } finally {
      loading.value = false
    }
  }

  // 新增标签
  const add = async (data: AddTagRequest) => {
    const res = await addTag(data)
    if (res.code === BIZ_CODE.SUCCESS) {
      await fetchAllTags()
      return res.data
    }
    return null
  }

  // 更新标签
  const update = async (data: UpdateTagRequest) => {
    const res = await updateTag(data)
    if (res.code === BIZ_CODE.SUCCESS) {
      await fetchAllTags()
      return true
    }
    return false
  }

  // 删除标签
  const remove = async (id: number) => {
    const res = await deleteTag({ id })
    if (res.code === BIZ_CODE.SUCCESS) {
      await fetchAllTags()
      return true
    }
    return false
  }

  return {
    tags,
    loading,
    fetchAllTags,
    add,
    update,
    remove
  }
})