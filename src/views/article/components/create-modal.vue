<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { ref } from 'vue'
import { watch } from 'vue'
// defineProps之类不用自己导入
// 定义props属性
const props = defineProps({
  value: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: '分类'
  }
})
// const emit = defineEmits<{ (e: 'update:value', id: boolean): void; (e: 'ok', o: Object): void }>()
const emit = defineEmits(['update:value', 'ok'])
watch(
  () => props.value,
  (n: boolean, o: boolean) => {
    if (n) {
      name.value = ''
    }
  }
)
const name = ref('')
// console.log('props', props)
const handleOk = () => {
  if (!name.value) {
    Message.warning('请输入名称')
    return
  }
  if (name.value && name.value.length < 2) {
    Message.warning('字数要两个以上哦！')
    return
  }
  emit('update:value', false)
  emit('ok', { name: name.value, type: props.type })
}
</script>
<template>
  <a-modal
    v-model:visible="value"
    :title="'新增' + type"
    cancelText="取消"
    okText="确认"
    @ok="handleOk"
    @cancel="emit('update:value', false)"
  >
    <a-input v-model="name" :placeholder="'请输入' + type + '名'"></a-input>
  </a-modal>
</template>
<style lang="scss" scoped></style>
