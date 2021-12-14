<script setup lang="ts">
import { RuleObject, ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { defineComponent, onMounted, reactive, ref, UnwrapRef } from 'vue'
import { computed, onBeforeUnmount } from 'vue'
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
import { filterXSS,escapeHtml } from 'xss'
import { createArticle } from '@/api/article'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import {
  IDomEditor, // 编辑器实例接口
  IEditorConfig, // 编辑器配置
  IToolbarConfig // 工具栏配置
} from '@wangeditor/editor'
interface FormState {
  title: string
  description: string
  content: string
}
const defaultForm = {
  title: '',
  description: '',
  content: ''
}
const router = useRouter()
const formRef = ref()
const formState: UnwrapRef<FormState> = reactive({
  ...defaultForm
})
// 自定义校验
const checkTitle = async (rule: RuleObject, value: string) => {
  if (value === '') {
    return Promise.reject('请输入标题！')
  } else {
    return Promise.resolve()
  }
}
const checkDescription = async (rule: RuleObject, value: string) => {
  if (value === '') {
    return Promise.reject('请输入描述！')
  } else {
    return Promise.resolve()
  }
}
const rules = {
  title: [{ required: true, validator: checkTitle, trigger: 'blur' }],
  description: [{ required: true, validator: checkDescription, trigger: 'blur' }],
  content: [{ required: false, trigger: 'blur' }]
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
}
const handleFinish = async (values: FormState) => {
  const params = {
    ...values,
    content: JSON.stringify(myEditor.children)
  }
  // console.log('params:', params)
  // return
  const res = await createArticle(params)
  message.success('新建成功！')
  router.push('/article/list')
}
const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
  console.log(errors)
}
const resetForm = () => {
  formRef.value.resetFields()
}

const editorId = 'wangEditor-1'

// 默认内容
const defaultContent = [
  {
    type: 'paragraph',
    children: [{ text: '快把你的灵感写下来吧~' }]
  }
]
const defaultContent2 = [
  {
    type: 'paragraph',
    children: [{ text: '快把你的灵感写下来吧~' }]
  }
]

// 注意，深度拷贝 content ，否则会报错
const getDefaultContent = computed(() => defaultContent2)

// 编辑器配置
const editorConfig: IEditorConfig = {
  placeholder: '请输入内容...',
  scroll: true,
  readOnly: false,
  autoFocus: false,
  customAlert: () => '',
  MENU_CONF: {
    insertImage: {
      checkImage(src: string) {
        console.log('image src', src)
        if (src.indexOf('http') !== 0) {
          return '图片网址必须以 http/https 开头'
        }
        return true
      }
    }
  }
}
let myEditor: IDomEditor
// 编辑器回调函数
const handleCreated = (editor: IDomEditor) => {
  console.log('created', editor)
  myEditor = editor
}
const handleChange = (editor: any) => {
  console.log('change:', editor.children)
}
const handleDestroyed = (editor: any) => {
  console.log('destroyed', editor)
}
const handleFocus = (editor: any) => {
  console.log('focus', editor)
}
const handleBlur = (editor: any) => {
  console.log('blur', editor)
}
const customAlert = (info: string, type: string) => {
  alert(`【自定义提示】${type} - ${info}`)
}
const customPaste = (editor: any, event: any, callback: Function) => {
  console.log('ClipboardEvent 粘贴事件对象', event)
  // 自定义插入内容
  // editor.insertText('xxx')

  // 返回值（注意，vue 事件的返回值，不能用 return）
  // callback(false) // 返回 false ，阻止默认粘贴行为
  // callback(true) // 返回 true ，继续默认的粘贴行为
  return true
}
const mode = 'default'
// 及时销毁编辑器
onBeforeUnmount(() => {
  const editor = getEditor(editorId)
  if (editor == null) return

  // 销毁，并移除 editor
  editor.destroy()
  removeEditor(editorId)
})
</script>
<template>
  <section class="banner-container">
    <div class="banner-content">新建文章</div>
  </section>
  <section class="add-container">
    <div class="add-content">
      <a-form
        name="custom-validation"
        ref="formRef"
        :model="formState"
        :rules="rules"
        v-bind="layout"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item has-feedback label="标题" name="title">
          <a-input v-model:value="formState.title" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="描述" name="description">
          <a-input v-model:value="formState.description" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="内容" name="content">
          <div style="border: 1px solid #ccc">
            <!-- 工具栏 -->
            <Toolbar :editorId="editorId" :mode="mode" style="border-bottom: 1px solid #ccc" />
            <!-- 编辑器 -->
            <Editor
              :editorId="editorId"
              class="editor"
              :mode="mode"
              :defaultConfig="editorConfig"
              :defaultContent="getDefaultContent"
              @onCreated="handleCreated"
              @onChange="handleChange"
              @onDestroyed="handleDestroyed"
              @onFocus="handleFocus"
              @onBlur="handleBlur"
              @customAlert="customAlert"
              @customPaste="customPaste"
              style="height: 500px"
            />
          </div>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit">提交</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
        </a-form-item>
      </a-form>
    </div>
  </section>
</template>

<style scoped lang="scss">
.banner-container {
  height: 40vh;
  .banner-content {
    background-image: url(./img/add.webp);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    backdrop-filter: blur(2px);
    font-size: 32px;
    text-shadow: 3px 3px steelblue;
    letter-spacing: 25px;
  }
}
.add-container {
  position: relative;
  margin: -40px auto 0;
  min-height: 100vh;
  min-width: 40%;
  width: 70%;
  z-index: 0;
  border-radius: 18px;
  box-shadow: $box-shadow;
  background-color: #fff;
  // background-color: #252d38;
  padding: 40px 20px 20px 20px;
}
</style>
