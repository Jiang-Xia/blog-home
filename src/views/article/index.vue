<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const text = ref("article")
</script>

<template>
  <h1>{{text}}</h1>
  <h1>vite + vue3 + ts + eslint + prettierrc工程模板</h1>
</template>

<style scoped></style>
