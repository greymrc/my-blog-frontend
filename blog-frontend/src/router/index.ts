import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/Home.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/article/:id',
          name: 'Article',
          component: () => import('@/views/Article.vue'),
          meta: { title: '文章详情' }
        },
        {
          path: '/category/:id?',
          name: 'Category',
          component: () => import('@/views/Category.vue'),
          meta: { title: '分类' }
        },
        {
          path: '/tag/:id?',
          name: 'Tag',
          component: () => import('@/views/Tag.vue'),
          meta: { title: '标签' }
        },
        {
          path: '/archive',
          name: 'Archive',
          component: () => import('@/views/Archive.vue'),
          meta: { title: '归档' }
        },
        {
          path: '/about',
          name: 'About',
          component: () => import('@/views/About.vue'),
          meta: { title: '关于' }
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

router.beforeEach((to, _from, next) => {
  document.title = (to.meta.title as string) || 'My Blog'
  next()
})

export default router
