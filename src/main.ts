/*
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-11-12 17:29:55
 * @LastEditTime: 2022-01-09 18:01:31
 * @Description:
 * @FilePath: \blog-home\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.less'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@/styles/index.scss'
import '@/assets/css/atom-one-dark.css'
import axios from '@/utils/request'
import XIcon from '@/components/icons/index'
const app = createApp(App)
app.component(XIcon.name, XIcon)
app
  .use(store)
  .use(router)
  .use(ArcoVue, {
    // 用于改变使用组件时的前缀名称
    componentPrefix: 'a'
  })
  .use(ArcoVueIcon)
  .mount('#app')
const globalProperties = app.config.globalProperties
globalProperties.$axios = axios
