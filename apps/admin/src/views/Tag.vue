<script setup lang="ts">
</script>

<template>
  <div class="tag">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>标签管理</span>
          <el-button type="primary">新建标签</el-button>
        </div>
      </template>
      <p>标签管理页面内容</p>
    </el-card>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>