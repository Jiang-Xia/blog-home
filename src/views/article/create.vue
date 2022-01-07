<script setup lang="ts">
import { RuleObject, ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { reactive, ref } from 'vue'
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { createArticle } from '@/api/article'
import api from '@/api/index'
import { message } from 'ant-design-vue'
import CreateModal from './components/create-modal.vue'
import { categoryOptions, tagsOptions, getOptions } from './common'
import { PlusSquareOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import XEditor from '@/components/x-editor/index'

interface FormState {
  title: string
  description: string
  content: string
  contentHtml?: string
  category: string
  cover:string
  tags: number[]
}
const defaultForm = {
  title: '',
  description: '',
  content: '',
  contentHtml: '',
  category: '',
  cover:"",
  tags: []
}

const router = useRouter()
const formRef = ref()
const formState: FormState = reactive({ ...defaultForm })
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
  content: [{ required: true, trigger: 'change' }]
}
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 19 }
}

const visibale = ref(false)
const visibale2 = ref(false)
// 分类 标签
const showConfirm = (type: string) => {
  if (type === '分类') {
    visibale.value = !visibale.value
  } else {
    visibale2.value = !visibale2.value
  }
}
/*
函数参数解构
type C = { name: string; type: string }
{ name, type }: C
 */
type C = { name: string; type: string }
const ceateOkHandle = async ({ name, type }: C) => {
  const obj = {
    label: name,
    value: name
  }
  if (type === '分类') {
    const res = await api.createCategory(obj)
    message.success('添加成功！')
    getOptions(type)
  } else {
    const res = await api.createTag(obj)
    getOptions(type)
    message.success('添加成功！')
  }
}
getOptions('标签')
getOptions('分类')

// 提交成功
const handleFinish = async (values: FormState) => {
  const params = {
    ...values,
    content: formState.content,
    contentHtml: formState.contentHtml,
    // cover: formState.cover
  }
  // console.log('params:', params)
  // return
  const res = await createArticle(params)
  message.success('新建成功！')
  router.push('/home')
}
// 提交失败
const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
  console.log(errors)
}
const resetForm = () => {
  formRef.value.resetFields()
}

// 编辑器修改
const editorConfig = {
  placeholder:'哈喽！有什么灵感的话赶紧写下来吧~',
  pasteFilterStyle: true,
}
const editorChange = (params: any) => {
  const { html, json, editor } = params
  formState.contentHtml = html
  formState.content = JSON.stringify(json)
  // console.log('change 之后最新的 html', html)
}
</script>
<template>
  <div>
    <section class="banner-container">
      <div class="banner-content">新建文章</div>
    </section>
    <section class="create-container">
      <div class="create-content">
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
            <a-input v-model:value="formState.title" autocomplete="off" placeholder="标题" />
          </a-form-item>
          <a-form-item has-feedback label="描述" name="description">
            <a-textarea
              v-model:value="formState.description"
              placeholder="描述"
              :auto-size="{ minRows: 2, maxRows: 10 }"
            />
          </a-form-item>

          <a-form-item has-feedback label="分类" name="category">
            <a-select
              style="width: 50%"
              v-model:value="formState.category"
              :options="categoryOptions"
            >
            </a-select>
            <a-button type="text" @click="showConfirm('分类')">
              <template #icon>
                <PlusSquareOutlined />
              </template>
            </a-button>
          </a-form-item>

          <a-form-item has-feedback label="标签" name="tags">
            <a-select
              style="width: 50%"
              v-model:value="formState.tags"
              :options="tagsOptions"
              mode="multiple"
              class="tag-select"
            >
            </a-select>
            <a-button type="text" @click="showConfirm('标签')">
              <template #icon>
                <PlusSquareOutlined />
              </template>
            </a-button>
          </a-form-item>
          <a-form-item has-feedback label="内容" name="content"> </a-form-item>
          <x-editor custom-class="x-editor" @change="editorChange" :config="editorConfig"/>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" html-type="submit">提交</a-button>
            <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
          </a-form-item>
        </a-form>
      </div>
      <!-- vue3 v-model使用方法 -->
      <CreateModal v-model:value="visibale" type="分类" @ok="ceateOkHandle" />
      <CreateModal v-model:value="visibale2" type="标签" @ok="ceateOkHandle" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.banner-container {
  height: 40vh;
  .banner-content {
    background-image: url(./img/create.webp);
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
.create-container {
  position: relative;
  margin: -40px auto 0;
  min-height: 100vh;
  min-width: 40%;
  width: 70%;
  z-index: 0;
  border-radius: 18px;
  // box-shadow: $box-shadow;
  background-color: #fff;
  @include styles('background-color', 'minor-bgc');
  padding: 40px 20px 20px 20px;
  @media screen and (max-width: 768px) {
    width: 95%;
  }
  .x-editor {
    margin-left: 12.5%;
    margin-top: -56px;
    margin-bottom: 24px;
    width: 79.1%;

    border-color: transparent !important;
    border-radius: 4px;
    :deep(.w-e-toolbar),
    :deep(.w-e-text-container) {
      @include themeify {
        background-color: themed('main-bgc') !important;
        border-color: themed('main-bgc') !important;
        color: themed('text-color2');
      }
    }
    :deep(.w-e-text code) {
      @include themeify {
        background-color: themed('minor-bgc') !important;
      }
    }
  }
}
</style>
