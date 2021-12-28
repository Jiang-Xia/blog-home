import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import themePreprocessorPlugin from '@zougt/vite-plugin-theme-preprocessor'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    themePreprocessorPlugin({
      less: {
        // 各个主题文件的位置
        multipleScopeVars: [
          {
            scopeName: 'theme-default',
            path: path.resolve('src/styles/theme/default.less')
          },
          {
            scopeName: 'theme-green',
            path: path.resolve('src/styles/theme/green.less')
          }
        ]
      }
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
        additionalData: '@import "@/styles/scss/_mixins";'
      },
      less: {
        // 定制ant-design-vue主题
        // modifyVars: {
        //   '@primary-color': '#0aa679',
        //   '@border-radius-base': '4px'
        // },
        // modifyVars: getThemeVariables({
        //   dark: true // 开启暗黑模式
        // }),
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
