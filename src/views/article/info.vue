<script setup lang="ts">
import { getArticleInfo } from '@/api/article'
import { onMounted, ref, reactive, UnwrapRef, watch } from 'vue'
import { updateViews } from './common'
import { computed, onBeforeUnmount } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import XMarkdownReader from '@/components/x-markdown-reader'
import { updateLikesHandle } from './common'

import defaultImg from './img/create.webp'
interface FormState {
  [propName: string]: any
}
const defaultForm: FormState = {
  id: '',
  title: '',
  description: '',
  content: '',
  contentHtml: '',
  cover: '',
  category: {
    label: ''
  },
  tags: [],
  views: 0,
  checked: 0,
  likes: 0
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
  Object.keys(defaultForm).forEach((v: string) => {
    if (typeof res.info[v]) {
      ArticleInfo[v] = res.info[v]
    }
  })
  isEditorShow.value = true
  updateViews(route.query.id)
}
const getTagLabel = (arr: any): string => {
  let text = arr.map((v: any) => v.label).join()
  return text
}
onMounted(() => {
  getArticleInfoHandle()
})
// 路由变化钩子
onBeforeRouteUpdate((to) => {
  getArticleInfoHandle(to)
})
const tagLabel = computed(() => {
  return getTagLabel(ArticleInfo.tags)
})
</script>
<template>
  <div>
    <section class="banner-container">
      <div class="banner-content" :style="{ 'background-image': ArticleInfo.cover }">
        <img :src="ArticleInfo.cover || defaultImg" alt="" />
        <!-- <div>文章详情</div> -->
        <div class="article-header">
          <p class="title">{{ ArticleInfo.title }}</p>
          <p class="detail">
            <x-icon icon="blog-category"></x-icon>
            {{ ArticleInfo['category']['label'] }}
            <x-icon class="mg-l-10" icon="blog-tag"></x-icon>
            {{ tagLabel }}
          </p>
          <p class="detail">
            <!-- 阅读量 -->
            <span class="mg-r-10 pointer">
              <x-icon icon="blog-view"></x-icon>
              {{ ArticleInfo['views'] }}
            </span>
            <!-- 点赞数 -->
            <span class="mg-r-10 pointer blog-like" @click.stop="updateLikesHandle(ArticleInfo)">
              <x-icon :icon="ArticleInfo['checked'] ? 'blog-like-solid' : 'blog-like'"></x-icon>
              {{ ArticleInfo['likes'] }}
            </span>
          </p>
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
  font-size: 13px;
  text-align: center;
  .title {
    color: #fff;
    backdrop-filter: blur(2px);
    font-size: 32px;
    text-shadow: 3px 3px steelblue;
    letter-spacing: 8px;
    text-align: center;
    line-height: 1.1;
  }
  .detail {
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
  }
  .x-icon {
    font-size: 16px;
  }
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
