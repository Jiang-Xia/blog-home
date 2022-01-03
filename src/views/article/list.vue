<script setup lang="ts">
import { getArticleInfo, getArticleList } from '@/api/article'
import { categoryOptions, tagsOptions, getOptions, getRandomClor } from './common'
import { onMounted, ref, reactive } from 'vue'
import {
  AppstoreOutlined,
  TagOutlined,
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons-vue'
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
  total: number
  title?: ''
  description?: ''
  content?: ''
}
interface itemState {
  id: string
  checked: boolean
  [x: string]: string | boolean
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
  pageSize: 20,
  total: 0,
  title: '',
  description: '',
  content: ''
})
const getArticleListHandle = async (val: number = 1) => {
  queryPrams.page = val
  const res = await getArticleList(queryPrams)
  articleList.value = res.list
  queryPrams.total = res.pagination.total
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
  // queryPrams.category = ''
  // queryPrams.tags = []
  queryPrams.title = searchText.value
  queryPrams.description = searchText.value
  // queryPrams.content = searchText.value
  getArticleListHandle(1)
}
</script>

<template>
  <div class="article-list-container">
    <section class="article-item">
      <transition-group name="list" tag="div">
        <div class="card-wrap" v-for="(item, index) in articleList" :key="index">
          <router-link class="line-1" :to="'/article/info?id=' + item['id']">
            {{ item['title'] }}
          </router-link>
          <div class="line-2 ellipsis">
            {{ item['description'] }}
          </div>
          <div class="line-3">更新于 {{ item['uTime'] }}</div>
          <div>
            <a-tag :color="item['category']['color']">{{ item['category']['label'] }}</a-tag>
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
        :pageSize="queryPrams.pageSize"
        :total="queryPrams.total"
        @change="currentChangeHandle"
      />
    </section>
    <section class="info-tool">
      <div class="card-wrap auth-info">
        <h4>
          <FilterOutlined />
          关键字
        </h4>
        <a-input-search
          v-model:value="searchText"
          placeholder="输入标签或者摘要"
          @search="onSearchHandle"
        >
          <template #enterButton>
            <a-button><SearchOutlined /></a-button>
          </template>
        </a-input-search>
      </div>
      <div class="card-wrap category-wrap">
        <h4>
          <AppstoreOutlined />
          分类
        </h4>
        <div
          class="category-item"
          v-for="(item, index) of categoryOptions"
          :key="index"
          :color="item['color']"
          :class="item['id'] === queryPrams.category ? 'active' : ''"
          @click="clickTagHandle(item, '分类')"
        >
          <div
            class="category__inner"
            :style="{
              borderColor: item['id'] === queryPrams.category ? item['color'] : ''
            }"
          >
            <span class="category__text">{{ item['label'] }}</span>
            <a-tag class="category__tag" :color="item['color']">{{ item['articleCount'] }}</a-tag>
          </div>
        </div>
      </div>
      <div class="card-wrap tag-wrap">
        <h4><TagOutlined /> 标签</h4>
        <a-tag
          class="custom-tag"
          v-for="(item, index) of tagsOptions"
          :key="index"
          :color="item['color']"
          :class="item['checked'] ? 'active' : ''"
          @click="clickTagHandle(item, '标签')"
          >{{ item['label'] }}({{ item['articleCount'] }})</a-tag
        >
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.article-list-container {
  position: relative;
  :deep(.ant-empty) {
    margin-bottom: 10vh;
    transition: all 1s;
    transform: scale(0, 0);
  }
  .ant-pagination {
    margin-top: 8vh;
  }
  .article-item {
    margin-right: 340px;
    transition: all 0.5s;
    // 文章列表
    .card-wrap {
      min-height: 110px;
      margin-bottom: 20px;
      padding: 18px 20px;
      @include styles('background-color', 'minor-bgc');
      // box-shadow: 0 2px 6px rgba($color: #000000, $alpha: 0.26);
      border-radius: 8px;
      .line-1 {
        font-size: 20px;
        line-height: 1.2;
      }
      .line-2,
      .line-3 {
        font-size: 14px;
        line-height: 1.7;
        @include styles('color', 'text-color2');
      }
      .line-3 {
        margin-bottom: 2px;
        font-size: 12px;
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
      @include styles('background-color', 'minor-bgc');
      // box-shadow: $box-shadow;
      border-radius: 8px;
      min-height: 310px;
      & > h4 {
        line-height: 32px;
        font-size: 15px;
        font-weight: 600;
        @include styles('color', 'text-color');
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
      margin: 0;
    }
    .category__inner {
      @include flex-between();
      cursor: pointer;
      border-bottom: 2px solid #eee;
      transition: all 0.5s;
    }
    .category-item:hover {
      // background-color: #f9f9f9;
      @include styles('background-color', 'hover-color');
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
