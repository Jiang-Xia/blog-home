<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-11-20 11:28:42
 * @LastEditTime: 2021-12-09 17:58:02
 * @Description: 
 * @FilePath: \blog-home\src\layout\index.vue
-->
<script setup lang="ts">
import Nav from './nav.vue'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
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
  window.addEventListener('scroll', scrollHandle,true)
})

</script>
<template>
  <div class="app-layout-contaier">
    <!-- <section class="banner-container">
      <a-carousel>
        <div>
          <img src="@/assets/img/background/abstract.jpg" alt="" />
        </div>
        <div>
          <img src="@/assets/img/background/pacific-rim-uprising.jpg" alt="" />
        </div>
      </a-carousel>
    </section> -->

    <a-layout>
      <a-layout-header :class="{ 'ant-layout-header__active': scrollTop > 58 }">
        <Nav />
      </a-layout-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<style lang="scss" scoped>
.app-layout-contaier {
  position: relative;
}
.ant-layout {
}
.ant-layout-header {
  height: 58px;
  line-height: 58px;
  width: 100%;
  z-index: 1;
  top: 0px;
  left: 0px;
  position: fixed;
  background-color: transparent;
  transition: all 0.5s;
}
.ant-layout-header__active {
  background-color: #364d79;
  box-shadow: 0 1px 8px 0 rgba($color: #364d79, $alpha: 0.1);
}
.ant-layout-content {
  height: 1500px;
}
// .banner-container {
//   position: relative;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100vh;
//   z-index: 0;
//   .ant-carousel{
//     height: 100%;
//   }
//   .ant-carousel :deep(.slick-slider) {
//     text-align: center;
//     height: 100%;
//     background-color: #364d79;
//     overflow: hidden;
//   }

//   .ant-carousel :deep(.slick-slide img) {
//     color: #fff;
//     height: 100%;
//     width: 100%;
//   }
// }
</style>
