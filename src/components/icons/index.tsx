import { defineComponent, h, SetupContext } from 'vue'
import config from '@/config'
import './index.scss'
interface propsState {
  icon: string
}
// 加载iconfont 图标字体文件
const createIconfont = () => {
  const scriptUrl = config.iconfonrUrl
  const script = document.createElement('script')
  script.src = scriptUrl
  document.body.appendChild(script)
}
createIconfont()

// 创建icon 函数式组件
const createIcon = (props: propsState, context: SetupContext) => {
  const svg = (
    <svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class="">
      <use xlinkHref={'#' + props.icon}></use>
    </svg>
  )
  const html = (
    <span class="x-icon" {...context.attrs}>
      {svg}
    </span>
  )
  return h(html, context.attrs, context.slots)
}

// 创建 XIcon组件
export default defineComponent({
  name: 'XIcon',
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  setup(props: any, context: SetupContext) {
    return () => createIcon(props, context)
  }
})
