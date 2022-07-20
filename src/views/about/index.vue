<script setup lang="ts">
import XMarkdownReader from '@/components/x-markdown-reader'
const contentHtml =
  '<h2 id="spwwn">江夏</h2><blockquote><p><font size="2">一位来自广州的前端程序员 喜欢看电影，玩游戏，学技术。</font><br/></p></blockquote>'
</script>
<template>
  <div class="about-container">
    <section class="banner-container">
      <div class="banner-content">
        <img src="@/assets/img/background/about.jpg" alt="" />
      </div>
    </section>
    <x-markdown-reader class="my-info" :content="contentHtml" />
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
.about-container {
  min-height: 100%;
  .my-info {
    position: relative;
    margin: 20px auto 0;
    min-height: 100vh;
    min-width: 40%;
    width: 70%;
    z-index: 10;
    border-radius: var(--layout-border-radius);
    background-color: var(--minor-bgc);
    padding: 10px 20px 20px 20px;
  }
}
</style>
