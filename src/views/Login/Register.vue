<!--注册-->
<template>
  <div class="register-box">
    <div class="form-box">
      <a-form :form="form">
        <a-form-item>
          <a-input
            placeholder="手机号"
            v-decorator="[
              'username',
              {rules: [{required: true, message: '请输入手机号', trigger: 'change'}]}
            ]"
          >
            <icon-font slot="prefix" type="iconphone" style="color: #888; font-size: 14px;" />
          </a-input>
        </a-form-item>
        <!--<a-form-item>-->
        <!--  <a-input-->
        <!--    placeholder="验证码"-->
        <!--    v-decorator="[-->
        <!--          'validNum',-->
        <!--          {rules: [{required: true, message: '请输入验证码', trigger: 'change'}]}-->
        <!--        ]"-->
        <!--  >-->
        <!--    <a-icon slot="prefix" type="mail" style="color: #888; font-size: 14px;"/>-->
        <!--    <a-button type="link" size="small" slot="addonAfter">发送验证码</a-button>-->
        <!--  </a-input>-->
        <!--</a-form-item>-->
        <a-form-item>
          <a-input-password
            placeholder="密码"
            v-decorator="[
              'password',
              {rules: [{required: true, message: '请输入密码', trigger: 'change'}]}
            ]">
            <icon-font slot="prefix" type="iconpassword" style="color: #888; font-size: 14px;" />
          </a-input-password>
        </a-form-item>
        <a-button
          type="danger"
          block
          @click="saveRegister"
        >注册
        </a-button>
      </a-form>
    </div>
  </div>
</template>

<script>
  import { setRegister } from '@/api/login'

  export default {
    name: 'Register',
    data () {
      return {
        form: this.$form.createForm(this, { name: 'login' })
      }
    },
    methods: {
      saveRegister (e) {
        e.preventDefault()
        this.form.validateFields((err, value) => {
          if (!err) {
            setRegister(value).then(res => {
              if (res.data.code === '200') {
                this.$message.success(`注册成功`)
                this.$parent.$data.isRegister = false
              } else {
                this.$message.error(`注册失败，请重新注册`)
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .register-box {

    .form-box {
      max-width: 300px;
      margin: 20px auto;
    }

    .login-slice {
      margin: 0 auto;
      width: 100%;
      max-width: 300px;
      display: flex;
      justify-content: space-between;

      .trigger-login {
        &:hover {
          cursor: pointer;
          color: #56b1fc;
        }
      }
    }
  }
</style>
