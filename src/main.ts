/*
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-11-12 17:29:55
 * @LastEditTime: 2022-01-07 00:12:58
 * @Description:
 * @FilePath: \blog-home\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import '@/styles/index.scss'
// import '@wangeditor/editor/dist/css/style.css'
import '@/assets/css/atom-one-dark.css'
import axios from '@/utils/request'
import XIcon from '@/components/icons'
const app = createApp(App)
app.component(XIcon.name, XIcon)
app.use(store).use(router).use(Antd).mount('#app')
const globalProperties = app.config.globalProperties
globalProperties.$axios = axios
