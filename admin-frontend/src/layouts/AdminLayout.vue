<template>
  <el-container class="admin-layout" v-loading="initializing">
    <el-aside :width="isCollapse ? '64px' : '200px'" class="aside">
      <div class="logo">
        <span v-if="!isCollapse">My Blog</span>
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
              <el-avatar :size="32" :src="userStore.user?.avatar" icon="User" />
              <span class="username">{{ userStore.user?.nickname || '管理员' }}</span>
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
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const isCollapse = ref(false)
const initializing = ref(true)

const menuItems = [
  { path: '/dashboard', icon: 'House', title: '仪表盘' },
  { path: '/article', icon: 'Document', title: '文章管理' },
  { path: '/category', icon: 'Folder', title: '分类管理' },
  { path: '/tag', icon: 'PriceTag', title: '标签管理' },
  { path: '/website', icon: 'Setting', title: '网站设置' }
]

const activeMenu = computed(() => {
  const path = route.path
  if (path.startsWith('/article')) {
    return '/article'
  }
  return path
})

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await userStore.logout()
    router.push('/login')
  } catch {
    // 用户取消
  }
}

onMounted(async () => {
  // 页面加载时检查登录状态
  try {
    await userStore.fetchUser()
    if (!userStore.user) {
      // 未登录，跳转到登录页
      router.push('/login')
    }
  } catch {
    // 获取用户信息失败，跳转到登录页
    router.push('/login')
  } finally {
    initializing.value = false
  }
})
</script>

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
  padding: 0 16px;

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