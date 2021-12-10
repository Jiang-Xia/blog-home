<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'
const getTime = () => dayjs().format('YYYY-MM-DD hh:mm:ss')
const date = ref(getTime())
setInterval(() => {
  date.value = getTime()
  console.log(date.value)
}, 1000)
</script>
<template>
  <section class="banner-container">
    <a-carousel>
      <div class="banner-content">
        <img src="@/assets/img/background/abstract.jpg" alt="" />
        <div class="text-wrap">
          <h1>{{ date }}</h1>
        </div>
      </div>
      <div>
        <img src="@/assets/img/background/pacific-rim-uprising.jpg" alt="" />
        <div class="text-wrap">
          <h1>{{ date }}</h1>
        </div>
      </div>
    </a-carousel>
  </section>

  <div>
    <h1>home</h1>
  </div>
</template>

<style lang="scss" scoped>
.banner-container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  .ant-carousel {
    height: 100%;
  }
  .ant-carousel :deep(.slick-slider) {
    text-align: center;
    height: 100%;
    background-color: #364d79;
    overflow: hidden;
  }

  .ant-carousel :deep(.slick-slide img) {
    color: #fff;
    height: 100%;
    width: 100%;
  }
}
.banner-content {
  position: relative;
  .text-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    h1 {
      color: #fff;
      font-size: 22px;
    }
  }
}
</style>
