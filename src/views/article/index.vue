<script setup lang="ts">
import { getArticleInfo,getArticleList } from '@/api/article'
import { onMounted } from 'vue';
onMounted(() => {
     const obj = {page:1, pageSize:20}
    getArticleList(obj)
})
</script>

<template>

</template>

<style scoped>
</style>
