<script setup lang="ts">
import usePaginationStore from '@/stores/pagination'

const paginationStore = usePaginationStore()

function handlePageChange(page: number) {
  paginationStore.articlePagination.current = page
  // 滚动到内容区顶部
  window.scrollTo({ top: 300, behavior: 'smooth' })
}
</script>

<template>
  <div class="pag">
    <el-pagination background layout="prev, pager, next"
                   :total="paginationStore.articlePagination.total"
                   :hide-on-single-page="true"
                   :page-size="paginationStore.articlePagination.pageSize"
                   @current-change="handlePageChange"
    />
  </div>
</template>

<style scoped lang="scss">
.pag {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
