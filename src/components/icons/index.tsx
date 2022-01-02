import { createFromIconfontCN } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
const MyIcon: any = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3114416_hu8gde6mmuc.js' // 在 iconfont.cn 上生成
})
export default defineComponent({
  name: 'XIcon',
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  setup(props: any) {
    // console.log('props', props)
    // console.log('props.icon', props.icon)
    return () => <MyIcon type={props.icon} />
  }
})
