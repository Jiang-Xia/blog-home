<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-11-24 20:34:46
 * @LastEditTime: 2021-12-01 17:20:01
 * @Description: 
 * @FilePath: \blog-home\src\layout\nav.vue
-->

<script setup lang="ts">
import { ref, computed } from '@vue/reactivity'
import { getInfo } from '@/utils/cookie'
import Login from './login.vue'
const navList = ref([
  {
    path: 'home',
    title: '首页',
    icon: ''
  },
  {
    path: 'category',
    title: '分类',
    icon: ''
  },
  {
    path: 'msgboard',
    title: '留言板',
    icon: ''
  },
  {
    path: 'about',
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
const nickname = computed(() => {
  let str = getInfo().nickname || ''
  str = str.slice(0, 1)
  return str
})
</script>
<template>
  <div class="nav-container">
    <div class="logo">
      <img src="@/assets/img/logo/favicon-32x32.png" alt="logo" />
    </div>
    <nav class="nav">
      <router-link class="router-link-item" v-for="(item, index) in navList" :to="item.path">
        <span>{{ item.title }}</span>
      </router-link>
    </nav>
    <div class="tool-bar">
      <a-input-search placeholder="" @search="onSearch" />
      <a-button @click="loginHandle" v-if="!nickname">登录</a-button>
      <a-dropdown v-else>
        <a class="ant-dropdown-link" @click.prevent>
          <a-avatar>{{ nickname }}</a-avatar>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">退出</a>
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
    .nav{
      display: none;
    }
  }
  display: flex;
  justify-content: space-between;
  transition: all .3s;
  .logo {
    min-width: 50px;
    @include flex-between();
  }
  .nav {
    flex: 1;
  }
  .router-link-active {
    color: $main-color;
  }
  .router-link-item > span {
    font-size: 16px;
    font-weight: 500;
    padding: 0 12px;
  }
  .router-link-item > span:hover {
    color: $main-color;
  }
  .tool-bar {
    .ant-input-search {
      width: 160px;
      margin-right: 16px;
    }
    .ant-avatar {
    }
  }
}
</style>
