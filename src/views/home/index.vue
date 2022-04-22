<script setup lang="ts">
import { dailyImage } from '@/api/article'
import dayjs from 'dayjs'
import { ref } from 'vue'
import ArticleList from '../article/list.vue'
const getTime = () => dayjs().format('YYYY-MM-DD HH:mm:ss')
const date = ref(getTime())
const refreshTime = () => {
  setTimeout(() => {
    date.value = getTime()
    refreshTime()
  }, 1000)
}
refreshTime()
const images = ref([])
dailyImage(7).then((res) => {
  images.value = res.images.map((v: any) => 'https://cn.bing.com' + v.url)
})
</script>
<template>
  <div>
    <section class="banner-container">
      <div class="banner-content">
        <!-- <img :src="bgUrl" alt="背景图片" /> -->
        <div class="text-wrap">
          <h1 class="animate__animated animate__bounce">{{ date }}</h1>
        </div>
        <a-carousel
          :auto-play="{ interval: 60000 }"
          animation-name="fade"
          indicator-position="left"
          indicator-type="line"
          show-arrow="never"
          :style="{
            width: '100%',
            height: '100%'
          }"
        >
          <a-carousel-item v-for="(image, index) in images" :key="index">
            <img
              :src="image"
              :style="{
                width: '100%'
              }"
            />
          </a-carousel-item>
        </a-carousel>
      </div>
    </section>
    <section class="home-content">
      <ArticleList />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.banner-container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh + 100px);
  z-index: 0;
  @media screen and (max-width: 768px) {
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
      z-index: 2;
      h1 {
        color: #fff;
        font-size: 56px;
        text-shadow: 3px 3px #000;
        text-align: center;
        font-weight: 500;
      }
    }
  }
}

.home-content {
  position: relative;
  margin: 20px auto 0;
  width: 70vw;
  min-height: 150vh;
  min-width: 40%;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
  z-index: 0;
  // background-color: #f4f4f4;
  // background-color: #252d38;
  padding: 0 0 20px 0;
}
:deep(.animate__animated) {
  animation-duration: 10s;
  animation-iteration-count: infinite;
}
</style>
