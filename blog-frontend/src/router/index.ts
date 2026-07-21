import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
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
          path: '/category',
          name: 'Category',
          component: () => import('@/views/Category.vue'),
          meta: { title: '分类' }
        },
        {
          path: '/category/:id',
          name: 'CategoryArticles',
          component: () => import('@/views/ArticleFilter.vue'),
          meta: { title: '分类', filterType: 'category' }
        },
        {
          path: '/tag',
          name: 'Tag',
          component: () => import('@/views/Tag.vue'),
          meta: { title: '标签' }
        },
        {
          path: '/tag/:id',
          name: 'TagArticles',
          component: () => import('@/views/ArticleFilter.vue'),
          meta: { title: '标签', filterType: 'tag' }
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
