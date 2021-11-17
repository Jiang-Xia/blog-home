<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>article</h1>
  <h1>vite + vue3 + ts + eslint + prettierrc工程模板</h1>
</template>

<style scoped></style>
