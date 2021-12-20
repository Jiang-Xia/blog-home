<script setup lang="ts">
import { ref } from 'vue'
import { defineEmits,defineProps,defineExpose, watch } from 'vue'
// 定义props属性
const props = defineProps({
  value: {
    type: Boolean,
    default: false
  }
})
watch(
  () => props.value,
  (n: boolean, o: boolean) => {
    console.log(props.value, 'value')
  }
)
console.log('props', props)
const visible = ref(false)
console.log(defineEmits)
const handleOk = () => {
//   const emit = <{
//   (e: 'change', id: number): void
// }>()
}
</script>
<template>
  <a-modal v-model:visible="value" title="Basic Modal" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>
<style lang="scss" scoped></style>
