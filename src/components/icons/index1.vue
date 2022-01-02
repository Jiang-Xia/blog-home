<script lang="tsx">
import { createFromIconfontCN } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
const MyIcon: any = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3114416_hu8gde6mmuc.js' // 在 iconfont.cn 上生成
  // extraCommonProps
})
export default defineComponent({
  name: 'XIcon',
  setup(props: any) {
    return () => <MyIcon type={props.icon} />
  }
})
</script>
