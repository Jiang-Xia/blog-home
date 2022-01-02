<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-11-24 20:34:46
 * @LastEditTime: 2022-01-02 20:06:18
 * @Description: 
 * @FilePath: \blog-home\src\layout\nav.vue
-->

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import Login from './login.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { PlusSquareOutlined, BulbOutlined, FireOutlined, SyncOutlined } from '@ant-design/icons-vue'
import { getArticleList } from '@/api/article'
const navList = ref([
  {
    path: '/',
    title: '首页',
    icon: ''
  },
  {
    path: '/category',
    title: '分类',
    icon: ''
  },
  {
    path: '/msgboard',
    title: '留言板',
    icon: ''
  },
  {
    path: '/about',
    title: '关于',
    icon: ''
  }
])
const onSearch = () => {
  console.log('search')
}
// 获取到login组件实例，并且调用
const reLogin = ref<any>(null)
const loginHandle = () => {
  reLogin.value.handleOpen()
}
const store = useStore()
// 退出
const logoutHandle = async () => {
  await store.dispatch('user/logout')
}
// 昵称
const nickname = computed(() => {
  const info = store.getters.userInfo
  // console.log(info, 'info')
  // 或者 const info =  store.state.user.userInfo
  let str = info.nickname || ''
  str = str.slice(0, 1)
  return str
})

const router = useRouter()
const route = useRoute()
// 新建文章
const newArticleHandle = () => {
  router.push('/article/create')
}

// 搜索文章
const queryPrams = reactive({
  page: 1,
  pageSize: 20,
  title: '',
  description: '',
  content: ''
})
const searchText = ref('')
const articleList = ref([])
const getArticleListHandle = async () => {
  const res = await getArticleList(queryPrams)
  articleList.value = res.list.map((v: any) => {
    return {
      value: String(v.id),
      label: v.title
    }
  })
}
const onSearchHandle = () => {
  queryPrams.page = 1
  queryPrams.title = searchText.value
  queryPrams.description = searchText.value
  queryPrams.content = searchText.value
  getArticleListHandle()
}
const onSelect = (v: number) => {
  router.replace('/article/info?id=' + v)
}

// 主题
const theme = ref<string>('default')
// 切换主题回调
const changeTheme = (type: string) => {
  console.log('切换主题回调')
  const cb = (type: string) => {
    document.documentElement.setAttribute('class', `theme-${type}`)
    document.body.setAttribute('data-theme', `theme-${type}`)
  }
  if (type === 'default') {
    cb(type)
  } else if (type === 'dark') {
    cb(type)
  } else if (type === 'auto') {
    document.documentElement.classList.replace('theme-green', 'theme-default')
    document.body.setAttribute('data-theme', 'theme-default')
  }
}
</script>
<template>
  <div class="nav-container">
    <div class="logo" @click="$router.push('/')">
      <img src="@/assets/img/logo/favicon-32x32.png" alt="logo" />
    </div>
    <nav class="nav">
      <router-link
        class="router-link-item"
        v-for="(item, index) in navList"
        :key="index"
        :to="item.path"
      >
        <span>{{ item.title }}</span>
      </router-link>
    </nav>
    <div class="tool-bar">
      <!-- <a-input-search placeholder="搜索内容" @search="onSearch" /> -->
      <a-auto-complete
        v-model:value="searchText"
        :options="articleList"
        placeholder="搜索内容"
        @select="onSelect"
        @search="onSearchHandle"
      />
      <PlusSquareOutlined
        v-show="!route.path.includes('create')"
        @click="newArticleHandle"
        title="新建文章"
        style="color: #fff; margin-right: 5px; margin-top: 2px; cursor: pointer"
      />
      <!-- 主题模式 开始 -->
      <a-dropdown size="small" class="mg-l-10" >
        <span>
          <BulbOutlined style="color: #fff;" v-if="theme === 'default'" />
          <FireOutlined style="color: #fff;" v-else="theme === 'dark'" />
          <SyncOutlined  style="color: #fff;" v-else />
        </span>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <span @click="changeTheme('default')">亮色模式</span>
            </a-menu-item>
            <a-menu-item>
              <span @click="changeTheme('dark')">暗黑模式</span>
            </a-menu-item>
            <a-menu-item>
              <span @click="changeTheme('auto')">跟随系统</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <!--主题模式 结束  -->
      <a-button type="link" @click="loginHandle" v-if="!nickname">登录</a-button>
      <a-dropdown v-else>
        <a class="ant-dropdown-link" @click.prevent>
          <a-avatar>{{ nickname }}</a-avatar>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;" @click="logoutHandle">退出</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <Login ref="reLogin" />
  </div>
</template>

<style lang="scss" scoped>
/*
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
 */
.nav-container {
  @media (max-width: 768px) {
    .nav {
      display: none;
    }
  }
  display: flex;
  justify-content: space-between;
  transition: all 0.3s;
  .logo {
    min-width: 50px;
    @include flex-between();
  }
  .nav {
    flex: 1;
  }
  .router-link-item {
    font-size: 16px;
    font-weight: 500;
    padding: 0 12px;
    color: #fff;
  }
  .router-link-active {
    @include styles('color', 'main-color');
  }
  .router-link-item > span:hover {
    @include styles('color', 'main-color');
  }
  .tool-bar {
    display: flex;
    align-items: center;
    .ant-input-search,
    .ant-auto-complete {
      width: 160px;
      margin-right: 16px;
    }
    .ant-avatar {
    }
  }
  // 深度选择器两种写法
  :deep(.ant-input-search),
  :deep(.ant-select-selector),
  :deep(.ant-auto-complete),
  :deep(.ant-input),
  :deep(.ant-avatar),
  :deep(.ant-btn) {
    background-color: transparent !important;
    border-color: transparent !important;
    color: #fff;
  }
  ::v-deep(.ant-input-suffix) {
    color: #fff;
  }
}
</style>
