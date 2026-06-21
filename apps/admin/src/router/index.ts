import { createRouter, createWebHistory } from 'vue-router'

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
          path: 'comment',
          name: 'Comment',
          component: () => import('@/views/Comment.vue'),
          meta: { title: '评论管理' }
        },
        {
          path: 'user',
          name: 'User',
          component: () => import('@/views/User.vue'),
          meta: { title: '用户管理' }
        },
        {
          path: 'setting',
          name: 'Setting',
          component: () => import('@/views/Setting.vue'),
          meta: { title: '系统设置' }
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
router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || 'My Blog Admin'

  const token = localStorage.getItem('token')
  const requiresAuth = to.meta.requiresAuth !== false

  if (requiresAuth && !token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router