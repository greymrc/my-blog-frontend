<script setup lang="ts">
</script>

<template>
  <div class="user">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary">新建用户</el-button>
        </div>
      </template>
      <p>用户管理页面内容</p>
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