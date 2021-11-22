import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src'
      },
      // 设置别名路径
      { find: 'views', replacement: '/src/views' },
      { find: 'components', replacement: '/src/components' }
    ]
  },
  css: {
    preprocessorOptions: {
      // 天坑！！！element-plus scss文件变量命名有旧版本启用的，和设置全局scss变量有冲突
      scss: {
        additionalData: '@import "@/styles/scss/_mixins";'
      },
      less: {
        // 定制ant-design-vue主题
        modifyVars: {},
        javascriptEnabled: true
      }
    }
  },
  server: {
    // open: true,
    port: 5001,
    /* 使用代理 */
    proxy: {}
  }
})
