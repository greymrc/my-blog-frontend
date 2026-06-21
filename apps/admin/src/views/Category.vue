<script setup lang="ts">
</script>

<template>
  <div class="category">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>分类管理</span>
          <el-button type="primary">新建分类</el-button>
        </div>
      </template>
      <p>分类管理页面内容</p>
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