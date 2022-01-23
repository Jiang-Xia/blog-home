<script setup lang="ts">
</script>
<template>
  <div class="archives-container">
    <section class="banner-container">
      <div class="banner-content">
        <img src="@/assets/img/background/uglydolls.jpg" alt="" />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.banner-container {
  height: 40vh;
  @media screen and (max-width: 768px) {
    height: 60vh;
  }
  .banner-content {
    img {
      color: #fff;
      height: 100%;
      width: 100%;
    }
  }
}
.archives-container{
  min-height: 100%;
}
</style>
