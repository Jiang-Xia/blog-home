<script setup lang="ts">
import { delArticle, getArticleInfo, getComment } from '@/api/article'
import { onMounted, ref, reactive, UnwrapRef, watch } from 'vue'
import { updateViews } from './common'
import { computed, onBeforeUnmount } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from '@/store'
import { updateLikesHandle, editorTheme } from './common'

import defaultImg from './img/create.webp'
import { makeToc, tocInter, isTrueCoverLink } from '@/utils'
import Catalogue from './components/catalogue.vue'
import Comment from './components/comment.vue'
import MdEditor from 'md-editor-v3'

import { Message, Modal } from '@arco-design/web-vue'
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
  likes: 0,
  uid: 0
}
const route = reactive(useRoute())
// 获取到的html内容
const html = ref('')
const isEditorShow = ref(false)
// 先定义默认数组类型
const topicsDefault: tocInter[] = []
const topics = ref(topicsDefault)
let ArticleInfo = reactive({ ...defaultForm })
const getArticleInfoHandle = async (to?: any) => {
  let query = route.query
  if (to) {
    query = to.query
  }
  isEditorShow.value = false
  const res = await getArticleInfo(query)
  Object.keys(defaultForm).forEach((v: string) => {
    if (res.info[v]) {
      ArticleInfo[v] = res.info[v]
    }
  })
  // console.log(JSON.parse(ArticleInfo.content))
  isEditorShow.value = true
  updateViews(route.query.id)
}
const getTagLabel = (arr: any): string => {
  let text = arr.map((v: any) => v.label).join()
  return text
}
onMounted(() => {
  getArticleInfoHandle()
  getCommentHandle()
})
// 路由变化钩子
onBeforeRouteUpdate((to) => {
  getArticleInfoHandle(to)
})
const tagLabel = computed(() => {
  return getTagLabel(ArticleInfo.tags)
})
const store = useStore()
const showEditor = computed(() => {
  const { id } = store.state.userInfo
  return id === ArticleInfo.uid
})
const canDel = computed(() => {
  const { id } = store.state.userInfo
  return id === ArticleInfo.uid
})

const router = useRouter()
const delArticleHandle = async () => {
  Modal.confirm({
    title: '删除文章',
    content: '确定删除该文章嘛？',
    onOk: async () => {
      const res = await delArticle({ id: route.query.id })
      Message.success('删除成功')
      router.push('/')
    }
  })
}

const comments = ref([])
const commentTotal = ref(0)

const getCommentHandle = async () => {
  const id: string = route.query.id as string
  const res = await getComment(id)
  comments.value = res.list
  let total = res.pagination.total
  res.list.map((v: any) => (total += v.allReplyCount))
  commentTotal.value = total
}

// 获取文章目录
const onGetCatalogHandle = (list: any) => {
  topics.value = list.map((v: any) => {
    v.id = v.text
    return v
  })
}
</script>
<template>
  <div>
    <section class="banner-container">
      <div class="banner-content" :style="{ 'background-image': ArticleInfo.cover }">
        <img :src="isTrueCoverLink(ArticleInfo.cover) || defaultImg" alt="" />
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
    <section class="module-wrap__detail article-info">
      <div class="clearfix">
        <router-link :to="'/article/create?id=' + route.query.id">
          <a-button v-if="showEditor" type="text" size="mini">编辑</a-button>
        </router-link>
        <a-button v-if="canDel" class="fr" type="text" size="mini" @click="delArticleHandle"
          >删除</a-button
        >
      </div>

      <md-editor
        v-if="isEditorShow"
        v-model="ArticleInfo.contentHtml"
        class="x-md-editor"
        preview-only
        :theme="editorTheme"
        @onGetCatalog="onGetCatalogHandle"
      />

      <!-- 目录 -->
      <Catalogue :topics="topics" />
    </section>
    <!-- 评论 -->
    <Comment
      class="module-wrap__detail comment-module"
      :comments="comments"
      :total="commentTotal"
      @commented="getCommentHandle"
    />
  </div>
</template>
<style lang="scss" scoped>
.banner-container {
  height: 60vh;
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
  z-index: 20;
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
.module-wrap__detail {
  box-sizing: border-box;
  position: relative;
  margin: 20px auto 0;
  min-height: 40vh;
  min-width: 40%;
  max-width: 1200px;
  width: 70%;
  z-index: 10;
  border-radius: var(--layout-border-radius);
  background-color: var(--minor-bgc);
  padding: 10px 20px 20px 20px;
  @media screen and (max-width: 768px) {
    width: 95%;
  }
}
.article-info {
}
.comment-module {
  min-height: 30vh;
}
</style>
