const config = {
  // 阿里巴巴图标库链接，新添加图标需要重新生成 css 改成js
  iconfonrUrl: '//at.alicdn.com/t/font_3114416_1n8rvcm9g9k.js'
}

export let baseUrl: string
const mode = import.meta.env.MODE
if (mode === 'production') {
  baseUrl = 'http://42.192.145.236:5000'
} else {
  baseUrl = 'http://localhost:5000'
  // baseUrl = 'http://42.192.145.236:5000'
  // baseUrl = 'http://jiang-xia.top'
}
export default config
