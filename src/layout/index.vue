<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-11-20 11:28:42
 * @LastEditTime: 2021-12-14 23:40:04
 * @Description: 
 * @FilePath: \blog-home\src\layout\index.vue
-->
<script setup lang="ts">
import Nav from './nav.vue'
import { ref } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const animation = ref('slide')
watch(route, () => {
  console.log('route', route.name)
  animation.value = route.meta.index == 1 ? 'slide-right' : 'slide-left'
})
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
  window.addEventListener('scroll', scrollHandle, true)
})
</script>
<template>
  <div class="app-layout-contaier">
    <a-layout>
      <a-layout-header :class="{ 'ant-layout-header__active': scrollTop > 58 }">
        <Nav />
      </a-layout-header>
      <a-layout-content>
        <!-- <router-view v-slot="{ Component }">
          <transition :name="animation">
            <component :is="Component" />
          </transition>
        </router-view> -->
        <router-view v-slot="{ Component }">
          <transition name="slide"> 
            <component :is="Component" />
          </transition>
        </router-view>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </div>
</template>

<style lang="scss" scoped>
.app-layout-contaier {
  position: relative;
  background-image: url(@/assets/img/background/stucco.png);
  background-repeat: repeat;
  // background-color: $main-bgc;
}
.ant-layout,
.ant-layout-footer {
  background: none;
}
.ant-layout-header {
  height: 58px;
  line-height: 58px;
  width: 100%;
  z-index: 1;
  top: 0px;
  left: 0px;
  position: fixed;
  background: rgba($color: #000, $alpha: 0.05);
  // box-shadow: 0 2px 8px 0 rgba($color: #000, $alpha: 0.2);
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  transition: all 0.5s;
}
.ant-layout-header__active {
  // backdrop-filter: blur(4px);
  // background-color: #364d79;
  background-color: rgba($color: #364d79, $alpha: 0.72);
}
.ant-layout-content {
  min-height: 100vh;
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
