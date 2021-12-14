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
const getDefaultContent = computed(() => JSON.parse(ArticleInfo.content))

onBeforeUnmount(() => {
  if (myEditor == null) return
  // 销毁，并移除 editor
  myEditor.destroy()
  removeEditor('editorInfo')
})
</script>
<template>
  <!-- <div style="margin-top: 200px"  v-html="html"></div> -->
  <Editor
    v-if="ArticleInfo.content"
    class="editor"
    style="margin-top: 200px; height: 500px"
    editorId="editorInfo"
    @onCreated="handleCreated"
    mode="default"
    :defaultContent="getDefaultContent"
    :defaultConfig="{ readOnly: true }"
  />
</template>
<style lang="scss" scoped>

</style>
