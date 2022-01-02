<script setup lang="ts">
import { getArticleInfo } from '@/api/article'
import { onMounted, ref, reactive, UnwrapRef, watch } from 'vue'
import { computed, onBeforeUnmount } from 'vue'
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import {
  IDomEditor, // 编辑器实例接口
  IEditorConfig, // 编辑器配置
  IToolbarConfig // 工具栏配置
} from '@wangeditor/editor'
interface FormState {
  title?: string
  description?: string
  content?: string
}
const defaultForm = {
  title: '',
  description: '',
  content: ''
}
const route = reactive(useRoute())
// 获取到的html内容
const html = ref('')
const isEditorShow = ref(false)
let ArticleInfo = reactive({ ...defaultForm })
let myEditor: any = null
const getArticleInfoHandle = async (to?: any) => {
  let query = route.query
  if (to) {
    query = to.query
  }
  isEditorShow.value = false
  const res = await getArticleInfo(query)
  ArticleInfo.title = res.info.title
  ArticleInfo.content = res.info.content
  isEditorShow.value = true
}
// 编辑器默认内容
const getDefaultContent = computed(() => {
  if (ArticleInfo.content) {
    return JSON.parse(ArticleInfo.content)
  } else {
    return []
  }
})
onMounted(() => {
  getArticleInfoHandle()
})
// 路由变化钩子
onBeforeRouteUpdate((to) => {
  getArticleInfoHandle(to)
})

// 编辑器已创建回调
const handleCreated = (editor: IDomEditor) => {
  myEditor = editor
  html.value = myEditor.getHtml()
  // console.log('html',html.value)
}
const destroy = () => {
  if (myEditor == null) return
  // 销毁，并移除 editor
  myEditor.destroy()
  removeEditor('editorInfo')
  ArticleInfo = reactive({ ...defaultForm })
}
onBeforeUnmount(() => {
  destroy()
})
</script>
<template>
  <div>
    <section class="banner-container">
      <div class="banner-content">
        <!-- <div>文章详情</div> -->
        <p>{{ ArticleInfo.title }}</p>
      </div>
    </section>
    <section class="article-info">
      <div v-if="isEditorShow">
        <Editor
          class="editor"
          editorId="editorInfo"
          @onCreated="handleCreated"
          mode="default"
          :defaultContent="getDefaultContent"
          :defaultConfig="{ readOnly: true }"
        />
      </div>
      <!-- <div v-if="isEditorShow" v-html="html"></div> -->
    </section>
  </div>
</template>
<style lang="scss" scoped>
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
    text-align: center;
    line-height: 1.1;
    flex-wrap: wrap;
    & > div {
      width: 100%;
    }
  }
}
.article-info {
  position: relative;
  margin: -40px auto 0;
  min-height: 100vh;
  min-width: 40%;
  width: 70%;
  z-index: 0;
  border-radius: 18px;
  @include styles('background-color', 'minor-bgc');
  padding: 40px 20px 20px 20px;
  @media screen and (max-width: 768px) {
    width: 95%;
  }
  :deep(.w-e-text-container){
    // @include styles('background-color', 'main-bgc');
    // @include styles('color', 'text-color');
  }
}
</style>
