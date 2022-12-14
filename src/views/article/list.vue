<script setup lang="ts">
import { getArticleInfo, getArticleList } from '@/api/article'
import { categoryOptions, tagsOptions, getOptions, updateLikesHandle } from './common'
import { onMounted, ref, reactive, unref, UnwrapRef, toRefs } from 'vue'
import router from '@/router'
import { useStore } from '@/store'
import defaultCover from './img/create.webp'
import { isTrueCoverLink } from '@/utils'
// interface FormState {
//   id: number
//   title: string
//   description: string
// }
interface queryState {
  page: number
  category: string
  tags: string[]
  pageSize: number
  total: number
  title?: string
  description?: string
  content?: string
}
interface itemState {
  id: string
  checked: boolean
  [x: string]: string | boolean
}
const store = useStore()
// 文章列表中的每一项item都为any
const articleListDefault: any[] = []
const articleList = ref(articleListDefault)
getOptions('标签')
getOptions('分类')
onMounted(async () => {
  console.log('========')
  getArticleListHandle()
})
const queryPrams: queryState = reactive({
  page: 1,
  category: '',
  tags: [],
  pageSize: 20,
  total: 0,
  title: '',
  description: '',
  content: '',
  uid: store.state.userInfo.id
})
const getArticleListHandle = async (val = 1) => {
  queryPrams.page = val
  const res = await getArticleList(queryPrams)
  articleList.value = res.list
  queryPrams.total = res.pagination.total
}
// 获取标签名(暂时没有用)
const getTagLabel = (arr: []): string => {
  // 如果是js的话，这个方法会写得很简单
  //  ts的话，它会提前对各种值进行类型推导，避免了一些取值的错误（比如在undefined和null取属性值）
  let text = arr.map((v: any) => v.label).join()
  return text
}

// 点击tag
const clickTagHandle = (item: itemState, type: string) => {
  if (type === '分类') {
    if (queryPrams.category === item.id) {
      // 清空选中
      queryPrams.category = ''
    } else {
      queryPrams.category = item.id
    }
  } else {
    // 标签
    item.checked = !item.checked

    const list: any = [...queryPrams.tags]
    if (!item.checked) {
      list.splice(list.indexOf(item.id), 1)
    } else {
      if (!list.includes(item.id)) {
        list.push(item.id)
      }
    }
    queryPrams.tags = list
    console.log(queryPrams.tags)
  }
  getArticleListHandle(1)
}
// 分页
const current = ref(1)
const currentChangeHandle = (val: number) => {
  getArticleListHandle(val)
}

// 模糊搜索
const searchText = ref('')
const onSearchHandle = () => {
  queryPrams.page = 1
  queryPrams.category = ''
  queryPrams.tags = []
  queryPrams.title = searchText.value
  queryPrams.description = searchText.value
  queryPrams.content = searchText.value
  console.log(queryPrams)
  getArticleListHandle(1)
}
// 文章详情
const gotoDetail = (item: any) => {
  router.push('/article/info?id=' + item.id)
}
</script>

<template>
  <div class="article-list-container">
    <section class="main-article-wrap">
      <transition-group name="list">
        <div
          v-for="(item, index) in articleList"
          :key="index"
          class="card-wrap article-item pointer"
          @click="gotoDetail(item)"
        >
          <div class="card-content">
            <h1 class="line-1">
              {{ item.title }}
            </h1>
            <div class="line-2 ellipsis">
              {{ item.description }}
            </div>
            <div class="line-3">更新于 {{ item['uTime'] }}</div>
            <div class="line-4">
              <!-- 分类 -->
              <span class="mg-r-10" :style="{ color: item['category']['color'] }">
                <x-icon icon="blog-category"></x-icon>
                {{ item['category']['label'] }}
              </span>
              <!-- 标签 -->
              <span class="mg-r-10" :style="{ color: item.tags?.color }">
                <x-icon icon="blog-tag"></x-icon>
                {{ getTagLabel(item['tags']) }}
              </span>
              <!-- 阅读量 -->
              <span class="mg-r-10 pointer"
                ><x-icon icon="blog-view"></x-icon>{{ item['views'] }}</span
              >
              <!-- 点赞数 -->
              <span class="mg-r-10 pointer blog-like" @click.stop="updateLikesHandle(item)">
                <x-icon :icon="item['checked'] ? 'blog-like-solid' : 'blog-like'"> </x-icon
                >{{ item['likes'] }}
              </span>
              <!-- 评论数 -->
              <span class="">
                <x-icon icon="blog-pinglun"></x-icon>
                {{ item.commentCount }}
              </span>
            </div>
          </div>
          <div class="cover-wrap">
            <img alt="封面" :src="isTrueCoverLink(item.cover) || defaultCover" />
          </div>
        </div>
      </transition-group>

      <a-empty
        :style="{ transform: !articleList.length ? 'scale(1,1)' : '' }"
        description="找不到文章..."
      />
      <!-- 分页 -->
      <a-pagination
        v-model:current="current"
        :page-size="queryPrams.pageSize"
        :total="queryPrams.total"
        @change="currentChangeHandle"
      />
    </section>
    <section class="info-tool">
      <div class="card-wrap auth-info">
        <h4>
          <XIcon icon="blog-filter" />
          关键字
        </h4>
        <a-input-search
          v-model="searchText"
          placeholder="输入标签或者摘要"
          @search="onSearchHandle"
          @press-enter="onSearchHandle"
        >
          <template #enterButton>
            <a-button><XIcon icon="blog-search" /></a-button>
          </template>
        </a-input-search>
      </div>
      <div class="card-wrap category-wrap">
        <h4>
          <XIcon icon="blog-category" />
          分类
        </h4>
        <div
          v-for="(item, index) of categoryOptions"
          :key="index"
          class="category-item"
          :color="item['color']"
          :class="item['id'] === queryPrams.category ? 'active' : ''"
          @click="clickTagHandle(item, '分类')"
        >
          <div
            class="category__inner flex-between"
            :style="{
              borderColor: item['id'] === queryPrams.category ? item['color'] : ''
            }"
          >
            <span class="category__text">{{ item['label'] }}</span>
            <a-tag class="category__tag" :color="item['color']" size="small">{{
              item['articleCount']
            }}</a-tag>
          </div>
        </div>
      </div>
      <div class="card-wrap tag-wrap">
        <h4><XIcon icon="blog-tag" /> 标签</h4>
        <a-space :wrap="true">
          <a-tag
            v-for="(item, index) of tagsOptions"
            :key="index"
            class="custom-tag"
            :color="item['color']"
            :class="item['checked'] ? 'active' : ''"
            size="small"
            @click="clickTagHandle(item, '标签')"
            >{{ item['label'] }}({{ item['articleCount'] }})</a-tag
          >
        </a-space>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.article-list-container {
  position: relative;
  padding-top: 20px;
  :deep(.arco-empty) {
    margin-bottom: 10vh;
    transition: all 1s;
    transform: scale(0, 0);
  }
  .arco-pagination {
    margin-top: 8vh;
  }
  .main-article-wrap {
    margin-right: 340px;
    transition: all 0.5s;
    padding: 0 20px;
    // 文章列表
    .card-wrap {
      min-height: 110px;
      margin-bottom: 20px;
      padding: 6px 16px;
      background-color: var(--minor-bgc);
      // box-shadow: 0 2px 6px rgba($color: #000000, $alpha: 0.26);
      border-radius: 8px;
      .line-1 {
        font-size: 20px;
        line-height: 1.2;
        margin: 0;
      }
      .line-2,
      .line-3 {
        font-size: 14px;
        line-height: 1.7;
        color: var(--text-color2);
      }
      .line-3 {
        margin-bottom: 2px;
        font-size: 12px;
      }
      .line-4 {
        font-size: 12px;
        .x-icon {
          font-size: 14px;
          margin-right: 3px;
        }
        .blog-like:hover {
          color: var(--main-color);
        }
      }
    }
    .article-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.5s;
    }
    .article-item:hover {
      transform: scale(1.02) translateY(-3px);
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
    }
    .card-content {
      min-width: 60%;
    }
    .cover-wrap {
      height: 100%;
      & > img {
        height: 100px;
        width: 150px;
        border-radius: var(--border-radius);
      }
    }
  }
  // 右边卡片
  .info-tool {
    position: absolute;
    right: 0;
    top: 20px;
    width: 340px;
    transition: all 0.5s;
    // 作者信息
    .card-wrap {
      margin-bottom: 20px;
      margin-right: 20px;
      margin-left: 20px;
      padding: 18px 20px;
      background-color: var(--minor-bgc);
      // box-shadow: $box-shadow;
      border-radius: 8px;
      min-height: 310px;
      & > h4 {
        line-height: 32px;
        font-size: 15px;
        font-weight: 600;
        color: var(--text-color);
      }
    }
    .auth-info {
      min-height: 50px;
    }
    // 分类
    .category-wrap {
      min-height: 270px;
      max-height: 60vh;
    }
    .category-item {
      padding: 5px 0;
    }
    .category__tag {
      border-radius: 11px;
      line-height: 1;
      height: 14px;
    }
    .category__inner {
      cursor: pointer;
      border-bottom: 2px solid #eee;
      transition: all 0.5s;
    }
    .category-item:hover {
      background-color: var(--hover-color);
    }
    .category__text {
      line-height: 1.8;
      flex: 1;
    }
    // 标签
    .tag-wrap {
      min-height: 470px;
    }
  }
  .main-article-wrap,
  .info-tool {
    min-height: 50vh;
  }
  @media screen and (max-width: 992px) {
    .main-article-wrap {
      margin-right: 0;
      padding-right: 20px;
    }
    .info-tool {
      transform: translate(300%);
    }
  }
  @media screen and (max-width: 992px) {
    .main-article-wrap {
      .cover-wrap {
        display: none;
      }
    }
  }
}
</style>
