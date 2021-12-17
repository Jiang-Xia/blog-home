import layout from '@/layout/index.vue'
// activeMenu 用来高亮导航的参数
const router = {
  path: '/article',
  name: 'Article',
  component: layout,
  title: '文章',
  children: [
    {
      path: 'list',
      name: 'ArticleList',
      component: () => import('views/article/index.vue'),
      title: '文章列表',
      meta: {}
    },
    {
      path: 'create',
      name: 'ArticleAdd',
      component: () => import('views/article/create.vue'),
      title: '新建文章',
      meta: {}
    },
    {
      path: 'info',
      name: 'ArticleInfo',
      component: () => import('views/article/info.vue'),
      title: '文章详情',
      meta: {}
    }
  ]
}
export default router
