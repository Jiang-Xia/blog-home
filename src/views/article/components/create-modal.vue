<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const handleOk = () => {}
</script>
<template>
  <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>
<style lang="scss" scoped>
</style>
