<!--登录-->
<template>
  <div class="login-box">
    <div class="login-main">
      <!--左侧banner图-->
      <div class="login-left">
        <img src="../../assets/left-img.png" alt="">
      </div>
      <div class="login-right">
        <!--logo-->
        <div class="logo">
          <img src="../../assets/logodx.png" alt="">
        </div>
        <!--名称-->
        <div class="login-title">电信微店管理</div>
        <!--登录-->
        <login-comp v-if="!isRegister"/>
        <!--注册-->
        <register v-if="isRegister"/>
        <!--按钮切换-->
        <!--<div class="register-txt" @click="isRegister = !isRegister">-->
        <!--  {{isRegister ? `立即登录`:`注册新用户`}}-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
  // 登录
  import LoginComp from '@/views/Login/loginComp/LoginComp'
  // 注册
  import Register from '@/views/Login/Register'

  export default {
    name: 'Login',
    components: {
      Register,
      LoginComp
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'login' }),
        // 登录、注册切换
        isRegister: false
      }
    }
  }
</script>

<style scoped lang="less">
  .login-box {
    width: 100vw;
    height: 100vh;
    /*background: #c0daf3;*/
    display: flex;
    justify-content: center;
    align-items: center;

    /*模块*/

    .login-main {
      width: 50vw;
      height: 50vh;
      display: flex;
      box-shadow: 0 0 10px 10px rgba(#bdb4ff, .4);
      border-radius: 10px;

      /*左侧banner*/

      .login-left {
        max-width: 300px;
        background: #e6e4e4;
        flex-grow: 1;
        border-radius: 10px 0 0 10px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      /*表单*/

      .login-right {
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        flex-grow: 1;
        padding: 20px 0 0;
        position: relative;
        border-radius: 0 10px 10px 0;

        .logo {
          text-align: center;
          img{
            height: 80px;
            margin-bottom: 20px;
          }
        }

        .login-title {
          text-align: center;
          font-size: 20px;
        }

        /*注册按钮*/

        .register-txt {
          margin: 30px auto 0;
          width: 100%;
          max-width: 300px;
          text-align: right;
          color: #16c2c2;
          position: absolute;
          right: 40px;
          bottom: 20px;

          &:hover {
            cursor: pointer;
            opacity: .8;
          }
        }
      }
    }

  }
</style>
