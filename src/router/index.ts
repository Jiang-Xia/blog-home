import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Article from './modules/article'
// 固定路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/article'
  },
  Article
]
// 异步路由根据权限配置
export const asyncRoutes = [{ path: '/:pathMatch(.*)', redirect: '/404', hidden: true }]
export function resetRouter() {
  // const newRouter = createRouter()
  // router.matcher = newRouter.matcher
}
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
