import { createRouter, createWebHistory } from 'vue-router'
// RouteRecordRaw
import Article from './modules/article'
// 固定路由
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    name: 'Home',
    title: '主页',
    meta: {}
  },
  {
    path: '/category',
    component: () => import('@/views/category/index.vue'),
    name: 'Category',
    title: '分类',
    meta: {}
  },
  {
    path: '/msgboard',
    component: () => import('@/views/msgboard/index.vue'),
    name: 'Msgboard',
    title: '留言板',
    meta: {}
  },
  {
    path: '/about',
    component: () => import('@/views/about/index.vue'),
    name: 'About',
    title: '关于',
    meta: {}
  },
  ...Article,
  {
    path: '/login',
    // components: {
    //   gView: () => import('@/views/login/index.vue')
    // },
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    title: '登录',
    meta: {}
  },
  { path: '/:pathMatch(.*)', redirect: '/' }
]
// 异步路由根据权限配置
// export const asyncRoutes = [{ path: '/:pathMatch(.*)', redirect: '/home' }]
export function resetRouter() {
  // const newRouter = createRouter()
  // router.matcher = newRouter.matcher
}
const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes: constantRoutes,
  // 路由切换滚动条行为
  scrollBehavior() {
    // to, from, savedPosition
    // 始终滚动到顶部
    return { top: 0 }
  }
})

export default router
