<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-11-20 11:28:42
 * @LastEditTime: 2022-07-20 17:46:01
 * @Description: 
 * @FilePath: \blog-home\src\layout\index.vue
-->
<script setup lang="ts">
import Nav from './nav.vue'
import { ref, watch } from 'vue'
import { onMounted, computed } from '@vue/runtime-core'
import { throttle } from '@/utils'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import Cookies from 'js-cookie'
import dayjs from 'dayjs'
const scrollTop = ref(0)
const scrollHandle = (e: any) => {
  // console.log(e.target)
  // console.log(document.documentElement.scrollTop)
  // 滚动对象为 document，所以以此获取document的滚动条高度
  scrollTop.value = document.documentElement.scrollTop
  /* 
    滚动对象为一般Element，以此获取document的滚动条高度
    scrollTop.value = e.target.scrollTop
  */
}
onMounted(() => {
  /* 
    之所以绑定window的滚动事件 是为了元素样式为固定定位（相对于window定位的）时会覆盖document子元素的滚动条
    造成错位不好看。这里的滚动对象是 document.documentElement
  */
  window.addEventListener('scroll', throttle(scrollHandle, 100), true)
  // 写入一个cookie，用于判断用户是否点过赞
  if (!Cookies.get('browserId')) {
    // 存个当前时间戳
    Cookies.set('browserId', dayjs().valueOf().toString(), { expires: 7 })
  }
})
const showFooter = computed(() => {
  const route = useRoute()
  return !route.path.includes('login')
})
// const minHeight = computed(() => (showFooter.value ? 'calc(100vh - 48px)' : '100vh'))
const store = useStore()
const paper = computed(() => {
  return store.state.userConfig.paperFeeling
})
</script>
<template>
  <div class="app-layout-contaier" :class="paper ? 'paper-feeling' : ''">
    <a-layout-header :class="{ 'arco-layout-header__active': scrollTop > 58 }">
      <Nav />
    </a-layout-header>
    <a-layout-content>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
        <!-- <keep-alive>
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </keep-alive> -->
      </router-view>
    </a-layout-content>
    <a-layout-footer v-if="showFooter">
      <p>桂ICP备2022001119号-1</p>
      <p>Powered By Typescript & Vue3 & Vite & Arco-design & Node.js & NestJS</p>
    </a-layout-footer>
    <!-- 源码默认就是 docuementDom-->
    <a-back-top>
      <a-button type="primary" shape="circle">
        <icon-up />
      </a-button>
    </a-back-top>
  </div>
</template>

<style lang="scss" scoped>
.app-layout-contaier {
  position: relative;
  // noise 遮罩层
  &::after {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    content: '';
    pointer-events: none;
    display: none;
    z-index: 200;
    background-image: url(@/assets/img/background/noise.png);
  }
  background-color: var(--main-bgc) !important;
  color: var(--text-color) !important;
}
.paper-feeling {
  &::after {
    display: block;
  }
}
.arco-layout,
.arco-layout-footer {
  background: none;
}
.arco-layout-header {
  height: 58px;
  line-height: 58px;
  width: 100%;
  z-index: 20;
  top: 0px;
  left: 0px;
  position: fixed;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: all 1s;
  background: transparent !important;
  padding: 0 1.5vw;
}
.arco-layout-header__active {
  background-color: var(--nav-color) !important;
  border-color: var(--nav-color) !important;
}
.arco-layout-content {
  min-height: calc(100vh - 48px);
}
.arco-layout-footer {
  padding: 24px 1.5vw;
  text-align: center;
  line-height: 1.7;
  color: var(--text-color2);
}
</style>
<style lang="scss">
.banner-container {
  // position: relative;
  // top: 0;
  // left: 0;
  // width: 100%;
  height: 40vh;
  min-height: 260px;
  // z-index: 10;
  .banner-content {
    position: relative;
    height: 100%;
  }
}
</style>
