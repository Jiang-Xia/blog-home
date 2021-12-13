<script setup lang="ts">
import { getArticleInfo } from '@/api/article'
import { onMounted, ref, reactive,UnwrapRef } from 'vue'
interface FormState {
  title?: string
  description?: string
  content?: string
}
import { useRoute } from 'vue-router'
const route = useRoute()
const articleList = ref([])
let ArticleInfo: UnwrapRef<FormState> = reactive({})
onMounted(async () => {
  const query = route.query
  const res = await getArticleInfo(query)
  ArticleInfo = res.info
  console.log(ArticleInfo.content)
})
</script>
<template>
  <div style="margin-top: 200px;" v-html="'<h2>你好vue,大雄测试</h2>'"></div>
  <div style="margin-top: 200px;" v-html="ArticleInfo.content"></div>

</template>
<style scoped></style>
