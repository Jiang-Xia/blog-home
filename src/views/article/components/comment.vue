<script setup lang="ts">
import { computed, PropType, reactive, ref } from 'vue'
import { IconHeart, IconMessage, IconStar } from '@arco-design/web-vue/es/icon'
import dayjs from 'dayjs'
import { beforeTimeNow } from '@/utils'
import { Message } from '@arco-design/web-vue'
import { addComment, addReply, delComment, delReply } from '@/api/article'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import Reply from './reply-box.vue'
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
/* 评论功能 开始*/
const inputContent = ref('')
const addCommentHandle = async () => {
  if (!inputContent.value) {
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
// 当前点击回复的id评论
const currentReplyBoxId = ref('')
// 当前点击评论id（父级）
const currentParentId = ref('')

// 点击回复按钮

/**
 * @description: 点击回复按钮回调
 * @param {*} type 区分评论/回复
 * @param {*} item /当前评论/回复的信息
 * @param {*} pId 当点击回复时才有
 * @return {*}
 */
const clickReplyHandle = (type: string, item: any, pId?: string) => {
  currentReplyBoxId.value = item.id
  if (type === 'comment') {
    currentParentId.value = item.id
    targetUser.value = item.userInfo
  } else {
    currentParentId.value = pId as string // 自己断言一定有且为string
    targetUser.value = item.userInfo
  }
}
/* 评论功能 结束*/

/* 回复功能 开始*/
// 当前回复的目标用户
const targetUser: any = ref({})
const targetUsername = computed(() => {
  const { nickname } = targetUser.value
  return nickname
})
// 回复输入框实例
const commentRefs = ref([])
const replyRefs = ref([])

const addReplytHandle = async (content: string) => {
  console.log(targetUser.value)
  if (inputContent.value) {
    Message.warning('请输入你的评论！')
  }
  const params = {
    parentId: currentParentId.value, // 评论id 所有回复的父级id
    uid: store.state.userInfo.id, // 当前评论人uid
    content, // 评论内容
    replyUid: targetUser.value.id //目标用户uid
  }
  const res = await addReply(params)
  Message.success('评论成功')
  currentReplyBoxId.value = ''
  emits('commented')
}
const delReplytHandle = async (id: string) => {
  const res = await delReply(id)
  Message.success('删除成功')
  emits('commented')
}
// 回复确定按钮回调
const replyedHandle = (content: string) => {
  addReplytHandle(content)
}
/* 回复功能 结束*/
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
      v-for="commentItem in comments"
      :key="commentItem.id"
      :author="commentItem.userInfo && commentItem.userInfo.nickname"
      :content="commentItem.content"
      :datetime="formactTime(commentItem)"
    >
      <template #actions>
        <a-button
          v-show="commentItem.id !== currentReplyBoxId"
          size="mini"
          type="text"
          class="action"
          @click="clickReplyHandle('comment', commentItem)"
        >
          <template #icon>
            <IconMessage />
          </template>
          <template #default>回复</template>
        </a-button>
        <a-button
          v-if="commentItem.id === currentReplyBoxId"
          size="mini"
          type="text"
          class="action"
          @click="currentReplyBoxId = ''"
        >
          取消回复
        </a-button>
        <a-button
          v-if="uid === commentItem.uid"
          size="mini"
          type="text"
          class="action"
          @click="delCommentHandle(commentItem.id)"
        >
          <template #icon>
            <icon-delete />
          </template>
          <template #default>删除</template>
        </a-button>
      </template>
      <!-- 回复输入框  -->
      <Reply
        v-if="commentItem.id === currentReplyBoxId"
        ref="commentRefs"
        :name="targetUsername"
        @replyed="replyedHandle"
      />
      <template #avatar>
        <a-avatar :size="32"> <IconUser /></a-avatar>
      </template>
      <!-- 回复框 -->
      <div v-if="commentItem.replys && commentItem.replys.length" class="reply-wrap">
        <a-comment
          v-for="replyItem in commentItem.replys"
          :key="replyItem.id"
          :content="replyItem.content"
          :datetime="formactTime(replyItem)"
        >
          <template #author>
            {{
              commentItem.userInfo &&
              replyItem.userInfo.nickname + ' @ ' + replyItem.tUserInfo.nickname
            }}
          </template>
          <template #actions>
            <a-button
              v-show="replyItem.id !== currentReplyBoxId"
              size="mini"
              type="text"
              class="action"
              @click="clickReplyHandle('reply', replyItem, commentItem.id)"
            >
              <template #icon>
                <IconMessage />
              </template>
              <template #default>回复</template>
            </a-button>
            <a-button
              v-if="replyItem.id === currentReplyBoxId"
              size="mini"
              type="text"
              class="action"
              @click="currentReplyBoxId = ''"
            >
              取消回复
            </a-button>
            <a-button
              v-if="uid === replyItem.uid"
              size="mini"
              type="text"
              class="action"
              @click="delReplytHandle(replyItem.id)"
            >
              <template #icon>
                <icon-delete />
              </template>
              <template #default>删除</template>
            </a-button>
          </template>
          <!-- 回复输入框  -->
          <Reply
            v-if="replyItem.id === currentReplyBoxId"
            ref="replyRefs"
            :name="targetUsername"
            @replyed="replyedHandle"
          />
        </a-comment>
      </div>
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
    padding: 8px 10px;
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
      .arco-btn {
        color: var(--text-color2);
      }
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
      color: var(--text-color);
    }
    .arco-comment-author {
      color: var(--text-color2);
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
