import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import '@/styles/index.scss'
const app = createApp(App)
app.use(store).use(router).use(Antd).mount('#app')
