<script setup lang="ts">
import { computed, ref } from 'vue'
import { Message } from '@arco-design/web-vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['replyed'])
const inputContent = ref('')
const addReplytHandle = async () => {
  if (!inputContent.value) {
    Message.warning('请输入你的回复！')
  }
  emits('replyed', inputContent.value)
}
const placeholder = computed(() => {
  return '@' + props.name
})
const replyClear = async () => {
  inputContent.value = ''
}
// clear
</script>
<template>
  <transition-group name="fade">
    <div key="reply-container" class="reply-container">
      <a-textarea
        v-model="inputContent"
        :placeholder="placeholder"
        :max-length="100"
        allow-clear
        show-word-limit
        :auto-size="{
          minRows: 2,
          maxRows: 2
        }"
      />
      <div class="tool-bar">
        <a-button size="small" :disabled="!inputContent" @click="addReplytHandle">
          <template #icon>
            <icon-send />
          </template>
          <template #default>确认</template>
        </a-button>
      </div>
    </div>
  </transition-group>
</template>
<style scoped lang="scss">
.reply-container {
  .tool-bar {
    text-align: right;
  }
}
</style>
