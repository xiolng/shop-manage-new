<!--密码登录-->
<template>
  <div class="pwd-login">
    <div class="form-box">
      <a-form :form="form">
        <a-form-item>
          <a-input
            placeholder="手机号/用户名"
            v-decorator="[
                  'username',
                  {rules: [{required: true, message: '请输入手机号或用户名', trigger: 'change'}]}
                ]"
          >
            <icon-font slot="prefix" type="iconphone" style="color: #888; font-size: 14px;" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password
            placeholder="密码"
            v-decorator="[
              'password',
              {rules: [{required: true, message: '请输入密码', trigger: 'change'}]}
            ]"
            @keyup.enter="handleSubmit"
          >
            <icon-font slot="prefix" type="iconpassword" style="color: #888; font-size: 14px;" />
          </a-input-password>
        </a-form-item>
        <a-button
          type="primary"
          block
          @click="handleSubmit"
        >登录
        </a-button>
      </a-form>
    </div>
  </div>
</template>

<script>
  import { setLogin } from '@/api/login'

  export default {
    name: 'PwdLogin',
    data () {
      return {
        form: this.$form.createForm(this, { name: 'login' }),
      }
    },
    methods: {

      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            setLogin(values).then(res => {
              if (res.data.code === '401') {
                this.$message.error(res.data.msg)
                return false
              }
              if (res.data && res.data.accessToken) {
                localStorage.setItem('accessToken', `${res.data.tokenType} ${res.data.accessToken}`)
                this.form.resetFields()
                const link = localStorage.getItem('link')
                if (link && !link.includes('signin')) {
                  this.$router.push(link.split('#')[1])
                  return false
                }
                this.$router.push('/')
              } else {
                this.$message.error('用户名或密码错误')
              }
            }, () => {
              this.$message.error('用户名或密码错误')
            })
          } else {
            this.$message.error('请输入完整信息!')
          }
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .pwd-login {
    .form-box {
      max-width: 300px;
      margin: 20px auto;
    }
  }
</style>
