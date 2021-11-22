<script setup lang="ts">

</script>
<template>
  <a-layout >
      <a-layout-header>Header</a-layout-header>
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
  z-index: 1;
  top: 0px;
  left: 0px;
  position: sticky;
  background-color: #fff;
}
.ant-layout-content{
  height: 1000px;
}
</style>
