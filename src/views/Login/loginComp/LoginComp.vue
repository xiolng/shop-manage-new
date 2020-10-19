<!--密码、验证码登录-->
<template>
  <div class="login-comp">
    <!--密码登录-->
    <pwd-login v-if="!validLogin"/>
    <!--验证码登录-->
    <valid-login v-if="validLogin"/>
    <!--切换登录方式-->
    <div class="login-slice">
      <div class="save-pwd">
        <a-checkbox v-show="!validLogin">记住密码</a-checkbox>
      </div>
      <!--<div class="trigger-login" @click="validLogin = !validLogin">-->
      <!--  {{validLogin ? `密码登录`: `验证码登录`}}-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  // 密码登录
  import PwdLogin from '@/views/Login/loginComp/PwdLogin'
  // 验证码登录
  import ValidLogin from '@/views/Login/loginComp/ValidLogin'

  export default {
    name: 'LoginComp',
    components: {
      ValidLogin,
      PwdLogin
    },
    data () {
      return {
        // 切换登录方式
        validLogin: false
      }
    }
  }
</script>

<style scoped lang="less">
  .login-comp {

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
