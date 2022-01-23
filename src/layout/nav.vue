<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-11-24 20:34:46
 * @LastEditTime: 2022-01-23 18:41:55
 * @Description: 
 * @FilePath: \blog-home\src\layout\nav.vue
-->

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import Login from './login.vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { getArticleList } from '@/api/article'
import XIcon from '@/components/icons'
import dayjs from 'dayjs'
import { Message } from '@arco-design/web-vue'
const navList = ref([
  {
    path: '/',
    title: '首页',
    icon: ''
  },
  {
    path: '/archives',
    title: '归档',
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
  await setTimeout(() => {
    store.action.updateToken('')
    store.action.updateUserInfo({})
    Message.success('退出成功')
  }, 200)
}
// 昵称
const nickname = computed(() => {
  const info = store.state.userInfo
  // console.log(info, 'info')
  let str = info.nickname || ''
  str = str.slice(0, 1)
  return str
})

const router = useRouter()
const route = useRoute()
// 新建文章
const newArticleHandle = () => {
  if (store.state.token) {
    router.push('/article/create')
  } else {
    loginHandle()
  }
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

onMounted(() => {
  const paperFeeling = store.state.userConfig.paperFeeling
  if (paperFeeling) {
    paperClass.value = 'blog-open-book'
  } else {
    paperClass.value = 'blog-book'
  }

  const themeType = localStorage.getItem('theme')
  // console.log(themeType)
  if (themeType) {
    if (themeType === 'auto') {
      getHour()
    } else {
      setTheme(themeType)
    }
    // 都有设置icon和选中
    theme.value = themeType
    iconClass.value = 'blog-' + themeType
  } else {
    getHour()
  }
})

/* 切换主题 开始 */
const theme = ref<string>('light')
const iconClass = ref('blog-light')
const setTheme = (type: string) => {
  document.documentElement.setAttribute('class', `theme-${type}`)
  document.body.setAttribute('data-theme', `theme-${type}`)
  document.body.setAttribute('arco-theme', `${type}`)
}
// 是否自动设置
const getHour = () => {
  const time = dayjs().hour()
  // 白天
  if (6 < time && time < 18) {
    setTheme('light')
  } else {
    setTheme('dark')
  }
}
// 回调
const changeTheme = (type: string) => {
  // console.log('切换主题回调')
  theme.value = type
  iconClass.value = 'blog-' + type
  localStorage.setItem('theme', type)
  if (type === 'light') {
    setTheme(type)
  } else if (type === 'dark') {
    setTheme(type)
  } else if (type === 'auto') {
    getHour()
  }
}
const clickIcon = () => {
  if (theme.value === 'light') {
    changeTheme('dark')
  } else {
    changeTheme('light')
  }
}
/* 切换主题 结束 */
/* 纸感 */
const paperClass = ref('blog-book')
const changPaper = () => {
  if (paperClass.value === 'blog-book') {
    paperClass.value = 'blog-open-book'
    store.action.updateUserConfig({ paperFeeling: true })
  } else {
    paperClass.value = 'blog-book'
    store.action.updateUserConfig({ paperFeeling: false })
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
      <a-auto-complete
        v-model:value="searchText"
        :data="articleList"
        placeholder="搜索内容"
        @select="onSelect"
        @search="onSearchHandle"
      />
      <a-button
        v-show="!route.path.includes('create')"
        @click="newArticleHandle"
        title="新建文章"
        class="mg-r-10 mg-l-10"
      >
        <template #icon>
          <icon-plus />
        </template>
      </a-button>
      <!-- 主题模式 开始 -->
      <a-dropdown size="small" class="mg-l-10" trigger="hover">
        <span>
          <x-icon class="pointer" @click="clickIcon" style="color: #fff" :icon="iconClass" />
        </span>
        <template #content>
          <a-doption :class="theme === 'light' ? 'active' : ''" @click="changeTheme('light')">
            <span>light</span>
          </a-doption>
          <a-doption :class="theme === 'dark' ? 'active' : ''" @click="changeTheme('dark')">
            <span>dark</span>
          </a-doption>
          <a-doption :class="theme === 'auto' ? 'active' : ''" @click="changeTheme('auto')">
            <span>auto</span>
          </a-doption>
        </template>
      </a-dropdown>
      <!-- 纸感 -->
      <x-icon
        title="纸感"
        class="pointer mg-l-10"
        @click="changPaper"
        style="color: #fff"
        :icon="paperClass"
      />
      <!--主题模式 结束  -->
      <a-button type="text" size="small" @click="loginHandle" v-if="!nickname">登录</a-button>
      <a-dropdown v-else>
        <a class="arco-dropdown-link" @click.prevent>
          <a-avatar>{{ nickname }}</a-avatar>
        </a>
        <template #content>
          <a-doption>
            <a href="javascript:;" @click="logoutHandle">退出</a>
          </a-doption>
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
  height: 100%;
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
    color: var(--main-color);
  }
  .router-link-item > span:hover {
    color: var(--main-color);
  }
  .tool-bar {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    line-height: 1;
    .arco-input-search,
    .arco-auto-complete {
      width: 160px;
      margin-right: 16px;
    }
    .arco-avatar {
    }
  }
  // 深度选择器两种写法
  :deep(.arco-input-search),
  :deep(.arco-select-selector),
  :deep(.arco-input-wrapper),
  :deep(.arco-input),
  :deep(.arco-avatar),
  :deep(.arco-btn) {
    background-color: transparent !important;
    border-color: transparent !important;
    color: #fff;
  }
  ::v-deep(.arco-input-suffix) {
    color: #fff;
  }
}

// #app 容器外样式
:global(.arco-dropdown-option.active) {
  background-color: var(--main-color);
  color: #fff;
}
</style>
