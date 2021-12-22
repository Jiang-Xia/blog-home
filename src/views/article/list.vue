<script setup lang="ts">
import { getArticleInfo, getArticleList } from '@/api/article'
import { categoryOptions, tagsOptions, getOptions, getRandomClor } from './common'
import { onMounted, ref, reactive } from 'vue'
interface FormState {
  id: number
  title: string
  description: string
}
interface queryPrams {
  page: number
  category: string
  tags: string[]
  pageSize: number
}
interface itemState {
  id: string
  [x: string]: string
}
const articleList = ref([])
getOptions('标签')
getOptions('分类')
onMounted(async () => {
  getArticleListHandle()
})
const queryPrams = reactive({
  page: 1,
  category: '',
  tags: [],
  pageSize: 20
})
const getArticleListHandle = async () => {
  const res = await getArticleList(queryPrams)
  articleList.value = res.list
}
// 点击tag
const clickTagHandle = (item: itemState, type: string) => {
  if (type === '分类') {
    queryPrams.category = item.id
  } else {
    const list:any = [...queryPrams.tags]
    if (!list.includes(item.id)) {
      list.push(item.id)
    }
    queryPrams.tags = list
    console.log(queryPrams.tags )
  }
  getArticleListHandle()
}
</script>

<template>
  <div class="article-list-container">
    <section class="article-item">
      <div class="card-wrap" v-for="(item, index) in articleList" :key="index">
        <router-link class="line-1" :to="'/article/info?id=' + item['id']">
          {{ item['title'] }}
        </router-link>
        <div class="line-2">
          {{ item['updateTime'] }}
        </div>
        <div class="line-3"></div>
        <div>
          <a-tag color="#87d068">默认</a-tag>
        </div>
      </div>
    </section>
    <section class="info-tool">
      <div class="card-wrap auth-info"></div>
      <div class="card-wrap category-wrap">
        <h4>分类</h4>
        <a-tag
          v-for="(item, index) of categoryOptions"
          :key="index"
          :color="item['color'] || getRandomClor()"
          @click="clickTagHandle(item, '分类')"
          >{{ item['label'] }}</a-tag
        >
      </div>
      <div class="card-wrap tag-wrap">
        <h4>标签</h4>
        <a-tag
          v-for="(item, index) of tagsOptions"
          :key="index"
          :color="item['color'] || getRandomClor()"
          @click="clickTagHandle(item, '标签')"
          >{{ item['label'] }}</a-tag
        >
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.article-list-container {
  position: relative;
  .article-item {
    margin-right: 340px;
    transition: all 0.5s;
    // 文章列表
    .card-wrap {
      height: 110px;
      margin-left: 20px;
      margin-bottom: 20px;
      padding: 18px 20px;
      background-color: #fff;
      // box-shadow: 0 2px 6px rgba($color: #000000, $alpha: 0.26);
      border-radius: 8px;
      .line-1 {
        font-size: 18px;
        line-height: 1.5;
        font-weight: 600;
      }
      .line-2 {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
      }
      .line-2 {
      }
    }
  }
  // 右边卡片
  .info-tool {
    position: absolute;
    right: 0;
    top: 0;
    width: 340px;
    transition: all 0.5s;
    // 作者信息
    .card-wrap {
      margin-bottom: 20px;
      margin-right: 20px;
      margin-left: 20px;
      padding: 18px 20px;
      background-color: #fff;
      // box-shadow: $box-shadow;
      border-radius: 8px;
      min-height: 310px;
    }
    // 分类
    .category-wrap {
      min-height: 270px;
    }
    // 标签
    .tag-wrap {
      min-height: 470px;
    }
  }
  .article-item,
  .info-tool {
    min-height: 50vh;
  }
  @media screen and (max-width: 992px) {
    .article-item {
      margin-right: 0;
      padding-right: 20px;
    }
    .info-tool {
      transform: translate(300%);
    }
  }
}
</style>
