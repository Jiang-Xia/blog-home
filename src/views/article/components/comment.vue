<script setup lang="ts">
import { PropType, reactive, ref } from 'vue'
import { IconHeart, IconMessage, IconStar } from '@arco-design/web-vue/es/icon'
const props = defineProps({
  comments: {
    type: Array as PropType<any[]>,
    default: () => []
  }
})
</script>
<template>
  <!-- <a-comment
    v-for="item in comments"
    :key="item.id"
    align="right"
    author="Balzac"
    :content="item.content"
  >
    <template #actions>
      <span class="action"> <IconMessage /> Reply </span>
    </template>
  </a-comment> -->
  <div>1111</div>
</template>
<style scoped>
.action {
  display: inline-block;
  padding: 0 4px;
  color: var(--color-text-1);
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
}
.action:hover {
  background: var(--color-fill-3);
}
</style>
