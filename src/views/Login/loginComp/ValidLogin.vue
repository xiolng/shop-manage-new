<!--验证码登录-->
<template>
  <div class="valid-login">
    <div class="form-box">
      <a-form :form="form">
        <a-form-item>
          <a-input
            placeholder="手机号"
            v-decorator="[
                  'phone',
                  {rules: [{required: true, message: '请输入手机号', trigger: 'change'}]}
                ]"
          >
            <icon-font slot="prefix" type="iconphone" style="color: #888; font-size: 14px;"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            placeholder="验证码"
            v-decorator="[
                  'validNum',
                  {rules: [{required: true, message: '请输入验证码', trigger: 'change'}]}
                ]"
          >
            <a-icon slot="prefix" type="mail" style="color: #888; font-size: 14px;"/>
            <a-button type="link" size="small" slot="addonAfter">发送验证码</a-button>
          </a-input>
        </a-form-item>
        <a-button
          type="primary"
          block
          @click="form.validateFields()"
        >登录
        </a-button>
      </a-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ValidLogin',
    data () {
      return {
        form: this.$form.createForm(this, { name: 'login' }),
      }
    }
  }
</script>

<style scoped lang="less">
  .valid-login {
    .form-box {
      max-width: 300px;
      margin: 20px auto;
    }
  }
</style>
