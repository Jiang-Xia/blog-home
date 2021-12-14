<script setup lang="ts">
import { getArticleInfo } from '@/api/article'
import { onMounted, ref, reactive, UnwrapRef } from 'vue'
import { computed, onBeforeUnmount } from 'vue'
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
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
import { useRoute } from 'vue-router'
const route = useRoute()
// 获取到的html内容
const html = ref('')
let ArticleInfo = reactive({ ...defaultForm })
let myEditor: any = null
onMounted(async () => {
  const query = route.query
  const res = await getArticleInfo(query)
  ArticleInfo.content = res.info.content
})
// 编辑器已创建回调
const handleCreated = (editor: IDomEditor) => {
  myEditor = editor
  html.value = myEditor.getHtml()
}
// 编辑器默认内容
const getDefaultContent = computed(() => {
  if (ArticleInfo.content) {
    return JSON.parse(ArticleInfo.content)
  } else {
    return []
  }
})

onBeforeUnmount(() => {
  if (myEditor == null) return
  // 销毁，并移除 editor
  myEditor.destroy()
  removeEditor('editorInfo')
  ArticleInfo = reactive({ ...defaultForm })
})
</script>
<template>
  <section class="banner-container">
    <div class="banner-content">文章详情</div>
  </section>
  <section class="article-info">
    <Editor
      v-if="ArticleInfo.content"
      class="editor"
      editorId="editorInfo"
      @onCreated="handleCreated"
      mode="default"
      :defaultContent="getDefaultContent"
      :defaultConfig="{ readOnly: true }"
    />
  </section>
</template>
<style lang="scss" scoped>
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
.article-info{
  position: relative;
  margin: -40px auto 0;
  min-height: 100vh;
  min-width: 40%;
  width: 70%;
  z-index: 0;
  border-radius: 18px;
  // box-shadow: $box-shadow;
  background-color: #fff;
  // background-color: #252d38;
  padding: 40px 20px 20px 20px;
}
</style>
