<script setup lang="ts">
import { RuleObject, ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { defineComponent, reactive, ref, UnwrapRef } from 'vue'
interface FormState {
  title: string
  description: string
  content: string 
}

const formRef = ref()
const formState: UnwrapRef<FormState> = reactive({
  title: '',
  description: '',
  content: ''
})
// 自定义校验
let checkTitle = async (rule: RuleObject, value: string) => {
  if (value === '') {
    return Promise.reject('请输入标题！')
  } else {
    return Promise.resolve()
  }
}
const rules = {
  title: [{ required: true, validator: checkTitle, trigger: 'blur' }],
  description: [{ required: true, trigger: 'blur' }],
  content: [{ required: true, trigger: 'blur' }]
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
}
const handleFinish = (values: FormState) => {
  console.log(values, formState)
}
const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
  console.log(errors)
}
const resetForm = () => {
  formRef.value.resetFields()
}
</script>
<template>
  <section class="banner-container">
    <div class="banner-content">新建文章</div>
  </section>
  <section class="add-container">
    <div class="add-content">
      <a-form
        name="custom-validation"
        ref="formRef"
        :model="formState"
        :rules="rules"
        v-bind="layout"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item has-feedback label="标题" name="pass">
          <a-input v-model:value="formState.title" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="描述" name="checkPass">
          <a-input v-model:value="formState.description" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="内容" name="age">
          <a-input rows="80" type="textarea" v-model:value="formState.content" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
        </a-form-item>
      </a-form>
    </div>
  </section>
</template>

<style scoped lang="scss">
.banner-container {
  height: 40vh;
  .banner-content {
    background-image: url(./img/add.webp);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    backdrop-filter: blur(2px);
    font-size: 32px;
    text-shadow: 3px 3px steelblue;
    letter-spacing: 25px;
  }
}
.add-container {
  position: relative;
  margin: -40px auto 0;
  min-height: 100vh;
  min-width: 40%;
  width: 70%;
  z-index: 0;
  border-radius: 18px;
  box-shadow: $box-shadow;
  background-color: #fff;
  padding: 40px 20px 20px 20px;
}
</style>
