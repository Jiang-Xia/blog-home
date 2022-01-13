<script setup lang="ts">
import { getArticleInfo } from '@/api/article'
import { onMounted, ref, reactive, UnwrapRef, watch } from 'vue'
import { updateViews } from './common'
import { computed, onBeforeUnmount } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import XMarkdownReader from '@/components/x-markdown-reader'
import defaultImg from './img/create.webp'
interface FormState {
  title?: string
  description?: string
  content?: string
  cover?: string
  // [propName:string]:any
}
const defaultForm = {
  title: '',
  description: '',
  content: '',
  contentHtml: '',
  cover: ''
}
const route = reactive(useRoute())
// 获取到的html内容
const html = ref('')
const isEditorShow = ref(false)
let ArticleInfo = reactive({ ...defaultForm })
const getArticleInfoHandle = async (to?: any) => {
  let query = route.query
  if (to) {
    query = to.query
  }
  isEditorShow.value = false
  const res = await getArticleInfo(query)
  ArticleInfo.title = res.info.title
  ArticleInfo.content = res.info.content
  ArticleInfo.contentHtml = res.info.contentHtml
  ArticleInfo.cover = res.info.cover
  // Object.keys(defaultForm).forEach((v: string) => {
  //   if (typeof res.info[v]) {
  //     ArticleInfo[v] = res.info[v]
  //   }
  // })
  isEditorShow.value = true
  updateViews(route.query.id)
}
onMounted(() => {
  getArticleInfoHandle()
})
// 路由变化钩子
onBeforeRouteUpdate((to) => {
  getArticleInfoHandle(to)
})
</script>
<template>
  <div>
    <section class="banner-container">
      <div class="banner-content" :style="{ 'background-image': ArticleInfo.cover }">
        <img :src="ArticleInfo.cover || defaultImg" alt="" />
        <!-- <div>文章详情</div> -->
        <div class="article-header">
          <p>{{ ArticleInfo.title }}</p>
        </div>
      </div>
    </section>
    <section class="article-info">
      <!-- <div v-if="isEditorShow" v-html="ArticleInfo.contentHtml"></div> -->
      <x-markdown-reader v-if="isEditorShow" :content="ArticleInfo.contentHtml" />
    </section>
  </div>
</template>
<style lang="scss" scoped>
.banner-container {
  height: 40vh;
  .banner-content {
    position: relative;
    overflow: hidden;
    & > img {
      width: 100%;
      height: 100%;
      filter: blur(8px) brightness(0.95);
      transform: scale(1.1);
      background-color: var(--nav-color);
    }
  }
}
.article-header {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: #fff;
  backdrop-filter: blur(2px);
  font-size: 32px;
  text-shadow: 3px 3px steelblue;
  letter-spacing: 25px;
  text-align: center;
  line-height: 1.1;
}
.article-info {
  position: relative;
  margin: 20px auto 0;
  min-height: 100vh;
  min-width: 40%;
  width: 70%;
  z-index: 0;
  border-radius: 18px;
  background-color: var(--minor-bgc);
  padding: 20px 20px 20px 20px;
  @media screen and (max-width: 768px) {
    width: 95%;
  }
}
</style>
