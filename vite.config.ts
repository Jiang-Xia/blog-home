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
  server: {
    // open: true,
    port: 5009,
    /* 使用代理 */
    proxy: {}
  }
})
