<!--
 * @Author: 酱
 * @LastEditors: 酱
 * @Date: 2021-11-30 16:22:00
 * @LastEditTime: 2022-01-08 16:25:47
 * @Description: 
 * @FilePath: \blog-home\src\layout\login.vue
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { watch, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { registerUser } from '@/api/user'
import { Message } from '@arco-design/web-vue'
// 定义props属性
const props = defineProps({
  type: {
    type: String,
    default: 'login'
  }
})
// console.log(props, 'props')
// 定义emit事件
const emit = defineEmits({
  onSubmit: null
})

const visible = ref(false)
const handleOk = () => {
  handleClose()
}
const handleOpen = () => {
  visible.value = true
  form.value = { ...defaultForm }
  console.log('handleOpen',visible.value)
}
const handleClose = () => {
  visible.value = false
  type.value = 'login'
}
const store = useStore()
const handleSubmit = async () => {
  console.log(type.value)
  if (type.value === 'login') {
    await store.dispatch('user/login', { ...form.value })
    handleClose()
  } else if (type.value === 'register') {
    const res = await registerUser({ ...form.value })
    type.value = 'login'
    form.value = { ...defaultForm }
    Message.success('注册成功，快来登录吧~')
  }
}
// 暴露一些方法和变量给父组件使用
defineExpose({
  handleOpen
})
const defaultForm = {
  mobile: '',
  nickname: '',
  password: '',
  passwordRepeat: ''
}
const form = ref({ ...defaultForm })
const rules = {
  mobile: [{ required: true, message: '请输入你的手机号码!' }],
  nickname: [{ required: true, message: '请输入你的昵称!' }],
  password: [{ required: true, message: '请输入你的密码!' }],
  passwordRepeat: [{ required: true, message: '请确认你的密码!' }]
}

const type = ref('login')
/* 计算属性 */
const title = computed(() => (type.value === 'login' ? '登录' : '注册'))
// 表单实例
const formRef = ref()
/* 监听 */
watch(
  () => type.value,
  (n: string, o: string) => {
    // console.log('watch', n)
    form.value = { ...defaultForm }
    formRef.value.resetFields()
  }
)
watch(
  () => visible.value,
  (n: boolean, o: boolean) => {
    form.value = { ...defaultForm }
    formRef.value.resetFields()
    console.log(formRef.value)
  }
)
</script>
<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :footer="null"
    @ok="handleOk"
    @cancel="handleClose"
  >
    <a-form
      :model="form"
      ref="formRef"
      :rules="rules"
      :label-col-props="{ span: 5 }"
      :wrapper-col-props="{ span: 17 }"
      @submit="handleSubmit"
    >
      <a-form-item label="手机号码" field="mobile">
        <a-input v-model:value="form.mobile" :maxlength="11" placeholder="请输入你的手机号码" />
      </a-form-item>
      <a-form-item label="昵称" v-if="type === 'register'" field="nickname">
        <a-input v-model:value="form.nickname" placeholder="请输入你的昵称" />
      </a-form-item>
      <a-form-item label="密码" field="password">
        <a-input-password v-model:value="form.password" placeholder="请输入你的密码" />
      </a-form-item>
      <a-form-item label="确认密码" v-if="type === 'register'" field="passwordRepeat">
        <a-input-password v-model:value="form.passwordRepeat" placeholder="请再次输入你的密码" />
      </a-form-item>
      <a-form-item :wrapper-col-props="{ span: 17, offset: 5 }" style="text-align: center">
        <a-button type="primary" html-type="submit" style="width: 100%"> {{ title }} </a-button>
      </a-form-item>
    </a-form>
    <div v-show="type === 'login'">
      还没有账号？快去<span class="register-link" @click="type = 'register'">注册</span>吧!
    </div>
  </a-modal>
</template>

<style lang="scss" scoped>
.register-link {
  color: var(--main-color);
  text-decoration: underline;
  padding: 0 4px;
  cursor: pointer;
}
</style>
