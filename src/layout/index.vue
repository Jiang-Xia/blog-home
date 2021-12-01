<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-11-20 11:28:42
 * @LastEditTime: 2021-12-01 16:39:26
 * @Description: 
 * @FilePath: \blog-home\src\layout\index.vue
-->
<script setup lang="ts">
import Nav from './nav.vue'
</script>
<template>
  <a-layout>
      <a-layout-header>
        <Nav/>
      </a-layout-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>

<style lang="scss" scoped>
.ant-layout{
  position: relative;
}
.ant-layout-header{
  height: 58px;
  line-height: 58px;
  z-index: 1;
  top: 0px;
  left: 0px;
  position: sticky;
  background-color: #fff;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
}
.ant-layout-content{
  height: 1000px;
}
</style>
