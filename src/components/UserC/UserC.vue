<template>
  <div class="user-box">
    <a-dropdown :trigger="['hover']">
      <div>
        <!--用户头像-->
        <a-avatar size="default" :style="{background: iconBg}">{{'管'.toLocaleUpperCase()}}
        </a-avatar>
        <!--用户名称-->
        <span class="name-txt">管理员</span>
        <a-icon type="caret-down" style="font-size: 18px; vertical-align: middle;"></a-icon>
      </div>
      <!--选择列表-->
      <a-menu slot="overlay">
        <a-menu-item>
          <div @click="outLogin">
            退出
          </div>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
  import { getUserDetail, setOutLogin } from '@/api/login'

  export default {
    name: 'UserC',
    data () {
      return {
        username: '',
        iconBg: ''
      }
    },
    beforeMount () {
      this.setBg()
      // 获取用户详情
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      // 本地没有用户数据，获取
      if (!userInfo || !userInfo.username) {
        this.getUserInfo()
      } else {
        this.username = userInfo.username
      }
    },
    methods: {
      // 获取用户详情
      getUserInfo () {
        getUserDetail().then(res => {
          if (res.data.code === '200') {
            localStorage.setItem('userInfo', JSON.stringify(res.data.data))
            this.username = res.data.data.username
          }
        })
      },
      // 目前没有图片,模拟背景色
      setBg () {
        const r = Math.floor(Math.random() * 255)
        const g = Math.floor(Math.random() * 255)
        const b = Math.floor(Math.random() * 255)
        this.iconBg = `rgb(${r},${g},${b})`
      },
      // 退出登录
      outLogin () {
        localStorage.clear()
        this.$router.push('/signin')
        // setOutLogin().then(res => {
        //   if (res.data.code === '200') {
        //     localStorage.clear()
        //     this.$router.push('/signin')
        //   }
        // })
      }
    }
  }
</script>

<style scoped lang="less">

  .user-box {
    height: 40px;
    line-height: 40px;
    margin: 12px 20px 0 0;
    cursor: default;
    .name-txt {
      margin: 0 10px;
      vertical-align: middle;
    }
  }
</style>
