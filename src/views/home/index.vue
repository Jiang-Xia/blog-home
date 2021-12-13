<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from '@vue/reactivity'
const getTime = () => dayjs().format('YYYY-MM-DD hh:mm:ss')
const date = ref(getTime())
const refreshTime = () => {
  setTimeout(() => {
    date.value = getTime()
    refreshTime()
  }, 1000)
}
refreshTime()
</script>
<template>
  <section class="banner-container">
    <div class="banner-content">
      <img src="@/assets/img/background/pacific-rim-uprising.jpg" alt="" />
      <div class="text-wrap">
        <h1>{{ date }}</h1>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.banner-container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  @media screen and (max-width:768px){
    height: 60vh;
  }

  .banner-content {
    position: relative;
    height: 100%;
    img {
      color: #fff;
      height: 100%;
      width: 100%;
    }
    .text-wrap {
      position: absolute;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      h1 {
        color: #fff;
        font-size: 50px;
        text-shadow: 3px 3px #000;
        text-align: center;
      }
    }
  }
}
</style>
