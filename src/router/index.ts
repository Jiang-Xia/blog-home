import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Article from './modules/article'
import Home from './modules/home'

// 固定路由
export const constantRoutes: RouteRecordRaw[] = [Home, Article]
// 异步路由根据权限配置
export const asyncRoutes = [{ path: '/:pathMatch(.*)', redirect: '/home', hidden: true }]
export function resetRouter() {
  // const newRouter = createRouter()
  // router.matcher = newRouter.matcher
}
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
