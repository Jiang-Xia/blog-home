<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-11-20 11:28:42
 * @LastEditTime: 2021-12-31 09:59:28
 * @Description: 
 * @FilePath: \blog-home\src\layout\index.vue
-->
<script setup lang="ts">
import Nav from './nav.vue'
import { ref } from 'vue'
import { onMounted, watch } from '@vue/runtime-core'
import { throttle } from '@/utils'
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
  document.body.setAttribute('data-theme', 'theme-default')
})
</script>
<template>
  <div class="app-layout-contaier">
    <a-layout-header :class="{ 'ant-layout-header__active': scrollTop > 58 }">
      <Nav />
    </a-layout-header>
    <a-layout-content>
      <router-view v-slot="{ Component }">
        <transition name="slide">
          <component :is="Component" />
        </transition>
      </router-view>
    </a-layout-content>
    <a-layout-footer></a-layout-footer>
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
    z-index: 0;
    background-image: url(@/assets/img/background/noise.png);
  }
}
.ant-layout,
.ant-layout-footer {
  background: none;
}
.ant-layout-header {
  height: 58px;
  line-height: 58px;
  width: 100%;
  z-index: 2;
  top: 0px;
  left: 0px;
  position: fixed;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  transition: all 0.5s;
  background: transparent !important;
}
.ant-layout-header__active {
  @include themeify {
    background-color: themed('nav-color') !important;
    border-color: themed('nav-color') !important;
  }
}
.ant-layout-content {
  min-height: calc(100vh - 48px);
}
</style>
<style lang="scss">
.banner-container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 40vh;
  min-height: 260px;
  z-index: 0;
  .banner-content {
    position: relative;
    height: 100%;
  }
}
</style>
