import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import styleImport from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    styleImport({
      libs: [
        {
          libraryName: '@arco-design/web-vue',
          esModule: true,
          resolveStyle: (name) => {
            // css
            // return `@arco-design/web-vue/es/${name}/style/css.js`
            // less
            return `@arco-design/web-vue/es/${name}/style/index.js`
          }
        }
      ]
    })
  ],
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
        additionalData: '@import "@/styles/theme.scss";'
      },
      less: {
        // 定制ant-design-vue主题
        modifyVars: {
          'arcoblue-6': '#00ADB5'
          // '@border-radius-base': '4px'
        },
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
