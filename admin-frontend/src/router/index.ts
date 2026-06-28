import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { getToken } from '@/api'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: { title: '登录', requiresAuth: false }
    },
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/layouts/AdminLayout.vue'),
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/Dashboard.vue'),
          meta: { title: '仪表盘' }
        },
        {
          path: 'article',
          name: 'ArticleList',
          component: () => import('@/views/article/List.vue'),
          meta: { title: '文章列表' }
        },
        {
          path: 'article/create',
          name: 'ArticleCreate',
          component: () => import('@/views/article/Edit.vue'),
          meta: { title: '创建文章' }
        },
        {
          path: 'article/edit/:id',
          name: 'ArticleEdit',
          component: () => import('@/views/article/Edit.vue'),
          meta: { title: '编辑文章' }
        },
        {
          path: 'category',
          name: 'Category',
          component: () => import('@/views/Category.vue'),
          meta: { title: '分类管理' }
        },
        {
          path: 'tag',
          name: 'Tag',
          component: () => import('@/views/Tag.vue'),
          meta: { title: '标签管理' }
        },
        {
          path: 'website',
          name: 'Website',
          component: () => import('@/views/Website.vue'),
          meta: { title: '网站设置' }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
      meta: { title: '404' }
    }
  ]
})

// 路由守卫
router.beforeEach(async (to) => {
  document.title = (to.meta.title as string) || 'My Blog Admin'

  // 登录页不需要验证
  if (to.path === '/login') {
    return
  }

  // 检查是否有 token
  const token = getToken()
  if (!token) {
    return '/login'
  }

  // 获取用户信息
  const userStore = useUserStore()
  if (!userStore.user) {
    try {
      await userStore.fetchUser()
    } catch {
      return '/login'
    }
  }
})

export default router