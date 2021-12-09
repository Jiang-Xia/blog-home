
<script setup lang="ts"></script>
<template>
    <section class="banner-container">
    <a-carousel>
      <div>
        <img src="@/assets/img/background/abstract.jpg" alt="" />
      </div>
      <div>
        <img src="@/assets/img/background/pacific-rim-uprising.jpg" alt="" />
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
  .ant-carousel{
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
</style>
