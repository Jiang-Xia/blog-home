// activeMenu 用来高亮导航的参数
const router = {
  path: '/article',
  name: 'Article',
  // component: () => import("../../views/article/index.vue"),
  component: () => import('views/article/index.vue'),
  title: '文章',
  meta: {
    roles: [1, 2]
  },
  children: []
}
export default router
