<script setup lang="ts">
import { getArticleInfo } from '@/api/article'
import { onMounted, ref, reactive, UnwrapRef, watch } from 'vue'
import { computed, onBeforeUnmount } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
interface FormState {
  title?: string
  description?: string
  content?: string
}
const defaultForm = {
  title: '',
  description: '',
  content: '',
  contentHtml:''
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
  isEditorShow.value = true
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
      <div class="banner-content">
        <!-- <div>文章详情</div> -->
        <p>{{ ArticleInfo.title }}</p>
      </div>
    </section>
    <section class="article-info">
      <div v-if="isEditorShow" v-html="ArticleInfo.contentHtml"></div>
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
