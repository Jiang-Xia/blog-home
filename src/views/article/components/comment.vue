<script setup lang="ts">
import { PropType, reactive, ref } from 'vue'
import { IconHeart, IconMessage, IconStar } from '@arco-design/web-vue/es/icon'
import dayjs from 'dayjs'
import { beforeTimeNow } from '@/utils'
const props = defineProps({
  comments: {
    type: Array as PropType<any[]>,
    default: () => []
  }
})
const formactTime = (item: any) => {
  let time = new Date(item.createTime).getTime()
  return beforeTimeNow(time)
}
</script>
<template>
  <div class="comment-container">
    <h4>评论</h4>
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
      {{ formactTime(item) }}
    </a-comment> -->
    <a-comment
      v-for="item in comments"
      :key="item.id"
      :author="item.userInfo.nickname"
      :content="item.content"
      :datetime="formactTime(item)"
    >
      <template #actions>
        <span key="reply" class="action"> <IconMessage />回复 </span>
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
    margin: 10px 0;
  }
  // padding-left: 10% !important;
  .reply-wrap {
    background-color: var(--main-bgc);
    border-radius: var(--layout-border-radius);
    padding: 16px;
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
  }
}
.action {
  display: inline-block;
  padding: 0 4px;
  color: var(--color-text-1);
  // line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
  font-size: 12px;
  vertical-align: middle;
}
.action:hover {
  background: var(--color-fill-3);
}
</style>
