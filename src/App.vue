<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view/>
    </a-config-provider>
  </div>
</template>

<script>
  import zh_CN from 'ant-design-vue/es/locale/zh_CN'

  export default {
    data () {
      return {
        locale: zh_CN
      }
    }
  }
</script>
<style lang="less">
  .main-content {
    background: #fff;
    border: 1px solid #e8e8e8;
    padding: 20px;
    height: 100%;
    flex-grow: 1;
  }
  /*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #F5F5F5;
  }
  /*定义滚动条轨道
   内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }
  /*定义滑块
   内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #555;
  }
</style>
