<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isCollapse = ref(false)

const menuItems = [
  { path: '/dashboard', icon: 'House', title: '仪表盘' },
  { path: '/article', icon: 'Document', title: '文章管理' },
  { path: '/category', icon: 'Folder', title: '分类管理' },
  { path: '/tag', icon: 'PriceTag', title: '标签管理' },
  { path: '/comment', icon: 'ChatDotSquare', title: '评论管理' },
  { path: '/user', icon: 'User', title: '用户管理' },
  { path: '/setting', icon: 'Setting', title: '系统设置' }
]

const activeMenu = computed(() => {
  const path = route.path
  // 处理文章编辑页面的菜单高亮
  if (path.startsWith('/article')) {
    return '/article'
  }
  return path
})

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <el-container class="admin-layout">
    <el-aside :width="isCollapse ? '64px' : '200px'" class="aside">
      <div class="logo">
        <span v-if="!isCollapse">My Blog Admin</span>
        <span v-else>Blog</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        class="menu"
      >
        <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
          <el-icon><component :is="item.icon" /></el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="left">
          <el-icon class="collapse-btn" @click="isCollapse = !isCollapse">
            <component :is="isCollapse ? 'Expand' : 'Fold'" />
          </el-icon>
        </div>
        <div class="right">
          <el-dropdown>
            <span class="user-info">
              <el-avatar :size="32" icon="User" />
              <span class="username">管理员</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="main">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.admin-layout {
  height: 100vh;
}

.aside {
  background: #304156;
  transition: width 0.3s;

  .logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #3a4758;
  }

  .menu {
    border-right: none;
    background: transparent;

    :deep(.el-menu-item) {
      color: #bfcbd9;

      &:hover {
        background: #263445;
      }

      &.is-active {
        color: #409eff;
        background: #263445;
      }
    }
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .collapse-btn {
    font-size: 20px;
    cursor: pointer;
    color: #606266;

    &:hover {
      color: #409eff;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    .username {
      color: #606266;
    }
  }
}

.main {
  background: #f0f2f5;
  padding: 16px;
}
</style>