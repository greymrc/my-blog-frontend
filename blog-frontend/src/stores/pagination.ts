import { defineStore } from 'pinia'

const usePaginationStore = defineStore('pagination', {
  state: () => ({
    articlePagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    }
  }),
})

export default usePaginationStore
