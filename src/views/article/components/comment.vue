<script setup lang="ts">
import { computed, PropType, reactive, ref } from 'vue'
import { IconHeart, IconMessage, IconStar } from '@arco-design/web-vue/es/icon'
import dayjs from 'dayjs'
import { beforeTimeNow } from '@/utils'
import { Message } from '@arco-design/web-vue'
import { addComment, delComment } from '@/api/article'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

const props = defineProps({
  comments: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  total: {
    type: Number,
    default: 0
  }
})
const emits = defineEmits(['commented'])
const store = useStore()
const route = useRoute()
const formactTime = (item: any) => {
  let time = new Date(item.createTime).getTime()
  return beforeTimeNow(time)
}
const inputContent = ref('')
const addCommentHandle = async () => {
  if (inputContent.value) {
    Message.warning('请输入你的评论！')
  }
  const params = {
    uid: store.state.userInfo.id,
    content: inputContent.value,
    articleId: route.query.id
  }
  const res = await addComment(params)
  Message.success('评论成功')
  emits('commented')
  inputContent.value = ''
}
const delCommentHandle = async (id: string) => {
  const res = await delComment(id)
  Message.success('删除成功')
  emits('commented')
}
const uid = computed(() => {
  const { id } = store.state.userInfo
  return id
})
</script>
<template>
  <div class="comment-container">
    <a-textarea
      v-model="inputContent"
      placeholder="动动你的双手吧~"
      :max-length="100"
      allow-clear
      show-word-limit
      :auto-size="{
        minRows: 4,
        maxRows: 4
      }"
    />
    <div class="tool-bar">
      <h4>全部评论({{ total }})</h4>
      <a-button size="small" :disabled="!inputContent" @click="addCommentHandle">
        <template #icon>
          <icon-send />
        </template>
        <template #default>确认</template>
      </a-button>
    </div>

    <a-comment
      v-for="item in comments"
      :key="item.id"
      :author="item.userInfo.nickname"
      :content="item.content"
      :datetime="formactTime(item)"
    >
      <template #actions>
        <a-button size="mini" type="text" class="action">
          <template #icon>
            <IconMessage />
          </template>
          <template #default>回复</template>
        </a-button>
        <a-button
          v-if="uid === item.uid"
          size="mini"
          type="text"
          class="action"
          @click="delCommentHandle(item.id)"
        >
          <template #icon>
            <icon-delete />
          </template>
          <template #default>删除</template>
        </a-button>
      </template>
      <template #avatar>
        <a-avatar :size="32"> <IconUser /></a-avatar>
      </template>
      <!-- 回复框 -->
      <!-- <div class="reply-wrap">
        <a-comment
          author="Balzac"
          avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp"
          content="Comment body content."
          datetime="1 hour"
        >
          <template #actions>
            <span class="action"> <IconMessage /> 回复 </span>
          </template>
        </a-comment>
        <a-comment
          author="Austen"
          avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp"
          content="Reply content"
          datetime="1 hour"
        >
          <template #actions>
            <span class="action"> <IconMessage /> 回复 </span>
          </template>
        </a-comment>
        <a-comment
          author="Plato"
          avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          content="Reply content"
          datetime="1 hour"
        >
          <template #actions>
            <span class="action"> <IconMessage /> 回复 </span>
          </template>
        </a-comment>
      </div> -->
    </a-comment>
  </div>
</template>
<style scoped lang="scss">
.comment-container {
  h4 {
    text-align: center;
    letter-spacing: 0.5em;
  }
  // padding-left: 10% !important;
  .reply-wrap {
    background-color: var(--main-bgc);
    border-radius: var(--layout-border-radius);
    padding: 16px;
  }
  .tool-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  :deep(.arco-comment) {
    .arco-comment-avatar {
      margin-right: 8px;
    }
    .arco-comment-actions {
      margin-top: 4px;
    }
    .arco-comment-inner-comment {
      margin-top: 8px;
    }

    &:not(:first-of-type),
    .arco-comment-inner-comment {
      margin-top: 12px;
    }
    .arco-comment-author {
      font-size: 12px;
    }
    .arco-comment-content {
    }
  }
}

.action {
  color: var(--text-color);
}
.action:hover {
  background: var(--color-fill-3);
}
</style>
