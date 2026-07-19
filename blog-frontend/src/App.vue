<script setup lang="ts">
import { onMounted } from 'vue'
import useWebsiteStore from '@/stores/website'

const websiteStore = useWebsiteStore()

// 应用启动拉取一次博主信息，供全局组件使用
onMounted(() => {
  websiteStore.fetchBloggerInfo()
})
</script>

<template>
  <router-view />
</template>

<style scoped>
</style>
