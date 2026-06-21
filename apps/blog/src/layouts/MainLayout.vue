<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <el-container class="main-layout">
    <el-header class="header">
      <div class="logo">My Blog</div>
      <nav class="nav">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/archive">归档</RouterLink>
        <RouterLink to="/about">关于</RouterLink>
      </nav>
    </el-header>
    <el-main class="main">
      <RouterView />
    </el-main>
    <el-footer class="footer">
      © 2024 My Blog. All rights reserved.
    </el-footer>
  </el-container>
</template>

<style lang="scss" scoped>
.main-layout {
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #eee;
  height: 60px;

  .logo {
    font-size: 20px;
    font-weight: bold;
    color: #409eff;
  }

  .nav {
    display: flex;
    gap: 20px;

    a {
      color: #606266;
      &:hover {
        color: #409eff;
      }
      &.active {
        color: #409eff;
      }
    }
  }
}

.main {
  background: #f5f5f5;
}

.footer {
  text-align: center;
  color: #909399;
  background: #fff;
  border-top: 1px solid #eee;
}
</style>