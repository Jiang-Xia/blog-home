import layout from '@/layout/index.vue'
// activeMenu 用来高亮导航的参数
const router = {
  path: '/',
  component: layout,
  redirect: '/home',
  children: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
      title: '主页',
      meta: {}
    }
  ]
}
export default router
