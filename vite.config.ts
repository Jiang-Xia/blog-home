import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import styleImport from 'vite-plugin-style-import'
import visualizer from 'rollup-plugin-visualizer'
import type { Plugin } from 'vite'
import externalGlobals from 'rollup-plugin-external-globals'
// vite 插件
const vitePlugins = [
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
]

// 开启打包分析工具
const isOpenVisualizer = false
if (isOpenVisualizer) {
  vitePlugins.push(
    visualizer({
      // 放到这里就不会被git追踪
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    }) as Plugin
  )
}
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // cdn配置
    rollupOptions: {
      // dayjs arcoui打包用到不能排除
      external: [
        'vue',
        'vue-router',
        'wangeditor',
        'axios',
        'highlight.js',
        'copy-to-clipboard',
        'js-cookie',
        'animate.css'
      ],
      plugins: [
        externalGlobals({
          // vue: 'Vue',
          // 'vue-router': 'VueRouter',
          // wangeditor: 'WangEditor',
          // axios: 'axios',
          // 'highlight.js': 'highlight.js',
          // 'copy-to-clipboard': 'copy-to-clipboard',
          // 'js-cookie': 'js-cookie',
          'animate.css': 'animate.css'
        })
      ]
    }
  },

  plugins: vitePlugins,
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
        additionalData: '@import "@/styles/scss/_mixins.scss";'
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
