<script setup lang="ts">
import { ValidatedError } from '@arco-design/web-vue/es/form/interface'
import { reactive, ref } from 'vue'
// import { computed, onBeforeUnmount, onMounted } from 'vue'
import { createArticle, editArticle, getArticleInfo } from '@/api/article'
import api from '@/api/index'
import { Message } from '@arco-design/web-vue'
import CreateModal from './components/create-modal.vue'
import { categoryOptions, tagsOptions, getOptions, editorTheme } from './common'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import MdEditor from 'md-editor-v3'

interface FormState {
  title: string
  description: string
  // content: string
  contentHtml?: string
  category: string
  cover: string
  tags: number[]
}
const defaultForm = {
  title: '',
  description: '',
  // content: '',
  contentHtml: '',
  category: '',
  cover: '',
  tags: []
}

const router = useRouter()
const formRef = ref()
const formState: FormState = reactive({ ...defaultForm })
// 自定义异步校验
const checkTitle = async (value: string, cb: (error?: string) => void) => {
  console.log(value)
  if (!value) {
    cb('请输入标题！')
  }
  Promise.resolve()
}
const checkDescription = async (value: string, cb: (error?: string) => void) => {
  if (!value) {
    cb('请输入描述！')
  }
  Promise.resolve()
}
const rules = {
  title: [{ required: true, validator: checkTitle, trigger: 'blur' }],
  description: [{ required: true, validator: checkDescription, trigger: 'blur' }],
  category: [{ required: true, message: '请选择分类！', trigger: 'change' }],
  tags: [{ required: true, message: '请选择标签！', trigger: 'change' }],
  cover: [{ required: true, message: '封面为必填！', trigger: 'blur' }],
  contentHtml: [{ required: true, trigger: 'change' }]
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
    await api.createCategory(obj)
    Message.success('添加成功！')
    getOptions(type)
  } else {
    await api.createTag(obj)
    getOptions(type)
    Message.success('添加成功！')
  }
}
getOptions('标签')
getOptions('分类')

// 提交成功
const handleFinish: any = async (values: FormState) => {
  // console.log('values', values)
  const params = {
    ...values,
    // content: formState.content,
    contentHtml: formState.contentHtml,
    id: 0
    // cover: formState.cover
  }
  // console.log('params:', params)
  // return
  if (route.query.id) {
    // 编辑
    params.id = Number(route.query.id)
    const res = await editArticle(params)
    Message.success('修改成功！')
  } else {
    // 新建
    const res = await createArticle(params)
    Message.success('新建成功！')
  }
  router.push('/home')
}
// 提交失败
const handleFinishFailed: any = (errors: ValidatedError) => {
  console.log(errors)
}
const resetForm = () => {
  formRef.value.resetFields()
}

// const ArticleInfo = ref({})
const route = useRoute()
// 文章编辑
const getArticleInfoHandle = async () => {
  let query = route.query
  let res = await getArticleInfo(query)
  res = res.info
  formState.title = res.title
  formState.description = res.description
  // formState.content = res.content
  formState.contentHtml = res.contentHtml
  formState.category = res.category.id
  formState.cover = res.cover
  formState.tags = res.tags.map((v: any) => v.id)
}
if (route.query.id) {
  getArticleInfoHandle()
}
</script>
<template>
  <div>
    <section class="banner-container">
      <div class="banner-content">
        {{ route.query.id ? '编辑' : '新建' }}
        文章
      </div>
    </section>
    <section class="create-container">
      <div class="create-content">
        <a-form
          ref="formRef"
          name="custom-validation"
          :model="formState"
          :rules="rules"
          :label-col-props="{ span: 3, offset: 0 }"
          :wrapper-col-props="{ span: 20, offset: 0 }"
          @submit-success="handleFinish"
          @submit-failed="handleFinishFailed"
        >
          <a-form-item label="标题" name="title" field="title">
            <a-input v-model="formState.title" autocomplete="off" placeholder="标题" />
          </a-form-item>
          <a-form-item label="描述" name="description" field="description" placeholder="描述">
            <a-textarea
              v-model="formState.description"
              placeholder="描述"
              :auto-size="{ minRows: 2, maxRows: 10 }"
            />
          </a-form-item>

          <a-form-item label="封面" name="cover" field="cover">
            <a-input
              v-model="formState.cover"
              autocomplete="off"
              placeholder="封面支持外链url或者base64(1M以内)"
            />
          </a-form-item>

          <a-form-item label="分类" name="category" field="category">
            <a-select
              v-model="formState.category"
              style="width: 50%"
              :options="categoryOptions"
              placeholder="选择一种分类"
            >
            </a-select>
            <a-button type="text" @click="showConfirm('分类')">
              <template #icon>
                <XIcon icon="blog-plus-square" />
              </template>
            </a-button>
          </a-form-item>

          <a-form-item label="标签" name="tags" field="tags" placeholder="选择标签 ">
            <a-select
              v-model="formState.tags"
              style="width: 50%"
              :options="tagsOptions"
              multiple
              class="tag-select"
            >
            </a-select>
            <a-button type="text" @click="showConfirm('标签')">
              <template #icon>
                <XIcon icon="blog-plus-square" />
              </template>
            </a-button>
          </a-form-item>
          <a-form-item label="内容" name="contentHtml" field="contentHtml">
            <md-editor v-model="formState.contentHtml" class="x-md-editor" :theme="editorTheme" />
          </a-form-item>

          <a-form-item :wrapper-col-props="{ span: 13, offset: 7 }">
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
  // 如果父级设置了z-index，子元素设置z-index基于父级的z-index层级内进行设置的。css拼爹！
  // z-index: 10;
  border-radius: var(--layout-border-radius);
  // box-shadow: $box-shadow;
  background-color: var(--minor-bgc);
  padding: 40px 20px 20px 20px;
  @media screen and (max-width: 768px) {
    width: 95%;
  }
  .x-md-editor {
    // border-color: var(--color-fill-2) !important;
    // border-radius: 4px;
    // background-color: var(--color-fill-2) !important;
  }
}
</style>
