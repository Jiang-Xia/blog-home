<script setup lang="ts">
import { getArchives } from '@/api/article'
import dayjs from 'dayjs'
import { ref } from 'vue'

const archivesInfo = ref({})

// 默认展开当前年
const activeArr: string[] = [String(dayjs().year())]
const defaultActiveKey = ref(activeArr)
const getArchivesHandle = async () => {
  const res = await getArchives()
  archivesInfo.value = res
  defaultActiveKey.value = Object.keys(res)
  console.log(defaultActiveKey.value)
}
getArchivesHandle()
</script>
<template>
  <div class="archives-container">
    <section class="banner-container">
      <div class="banner-content">
        <img src="@/assets/img/background/archives.jpg" alt="" />
      </div>
    </section>
    <section class="archives-info">
      <a-empty v-if="!Object.keys(archivesInfo).length" />

      <a-collapse
        :default-active-key="defaultActiveKey"
        v-if="Object.keys(archivesInfo).length"
        expand-icon-position="right"
      >
        <a-collapse-item v-for="(value, key) in archivesInfo" :header="key" :key="key">
          <div v-for="(value2, key2) in value" :key="key2">
            <h4 class="month">{{ key2 }}</h4>
            <a-timeline label-position="relative">
              <a-timeline-item
                v-for="(item, index) in value2"
                :key="index"
                :label="item['uTime']"
                dot-color="#00adb5"
                line-type="dashed"
                line-color="#00adb5"
              >
                <router-link :to="'/article/info?id=' + item['id']">
                  <div class="link-title">{{ item['title'] }}</div>
                </router-link>
              </a-timeline-item>
            </a-timeline>
          </div>
        </a-collapse-item>
      </a-collapse>
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
.archives-container {
  min-height: 100%;
  .archives-info {
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
  .month{
    color: var(--text-color);
    font-weight: normal;
    font-size: 16px;
  }
  .link-title {
    cursor: pointer;
    font-weight: 600;
  }
  .link-title:hover {
    color: var(--main-color);
    text-decoration: underline;
  }
}
</style>
