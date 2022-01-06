<script setup lang='ts'>
import {reactive, ref } from 'vue'
import layout from '@/layout/index.vue'

</script>
<template>
<!-- 根路由中渲染再其他路由(比如渲染文章中有子路由的) -->
  <router-view class="gloabal-view"  name="gView" v-if="$route.path.includes('login')"/>
</template>
<style lang='scss' scoped>
.gloabal-view{
  z-index: 9999;
  background-color: rgba(238, 255, 0, 1);
  // position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>