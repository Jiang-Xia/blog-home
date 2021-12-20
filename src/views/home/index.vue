<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'
import ArticleList from '../article/list.vue'
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
  <div>
    <section class="banner-container">
      <div class="banner-content">
        <img src="@/assets/img/background/girl.jpg" alt="" />
        <div class="text-wrap">
          <h1>{{ date }}</h1>
        </div>
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
      h1 {
        color: #fff;
        font-size: 50px;
        text-shadow: 3px 3px #000;
        text-align: center;
      }
    }
  }
}
// .home-content {
//   position: relative;
//   margin: -40px auto 0;
//   min-height: 150vh;
//   min-width: 40%;
//    @media screen and (max-width: 768px) {
//     width: 90%;
//   }
//   width: 70%;
//   z-index: 0;
//   border-radius: 18px 18px;
//   box-shadow: $box-shadow;
//   background-color: #fff;
//   // background-color: #252d38;
//   padding: 40px 20px 20px;
// }

.home-content {
  position: relative;
  margin: 40px auto 0;
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
</style>
