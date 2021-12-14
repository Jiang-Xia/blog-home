<script setup lang="ts">
</script>
<template>
  <section class="banner-container">
    <div class="banner-content">
      <img src="@/assets/img/background/pacific-rim-uprising.jpg" alt="" />
    </div>
  </section>
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
