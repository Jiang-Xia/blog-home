<script setup lang="ts"></script>
<template>
  <div class="msgboard-container">
    <section class="banner-container">
      <div class="banner-content">
        <img src="@/assets/img/background/msgboard.jpg" alt="" />
      </div>
    </section>
    <section class="msgboard-info">
      <a-empty description="没有啥子留言"/>
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
.msgboard-container {
  min-height: 100%;
  .msgboard-info {
    position: relative;
    margin: 20px auto 0;
    min-height: 100vh;
    min-width: 40%;
    width: 70%;
    z-index: 0;
    border-radius: 18px;
    background-color: var(--minor-bgc);
    padding: 10px 20px 20px 20px;
  }
}
</style>
