<script setup lang="ts">
import { getArticleInfo, getArticleList } from '@/api/article'
import { onMounted, ref } from 'vue'
interface FormState {
  id: number
  title: string
  description: string
}
import { useRouter } from 'vue-router'
const router = useRouter()
const articleList = ref([])
onMounted(async () => {
  const obj = { page: 1, pageSize: 20 }
  const res = await getArticleList(obj)
  articleList.value = res.list
})
const clickCardHandle = (item: FormState) => {
  const { id } = item
  router.push({
    path: '/article/info',
    query: {
      id
    }
  })
}
</script>

<template>
  <section class="article-list-container">
    <div v-for="(item: FormState, index: number) in articleList" :key="index" :title="item.title">
      <div @click="clickCardHandle(item)">
        {{ item.description }}
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.article-list-container {
}
</style>
