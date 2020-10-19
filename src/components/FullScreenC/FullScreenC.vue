<template>
  <div class="screen-box">
    <a-tooltip :content="isFull ? '退出全屏' : '全屏'" placement="bottom" v-if="showFullScreenBtn"
               @keyup.27="handleFullscreen">
      <a-icon @click="handleFullscreen" :type="isFull ? 'fullscreen-exit' : 'fullscreen'" style="font-size: 25px; vertical-align: middle;"></a-icon>
    </a-tooltip>
  </div>
</template>

<script>
  export default {
    name: 'FullScreenC',
    computed: {
      // 低版本ie不显示全屏按钮
      showFullScreenBtn () {
        return window.navigator.userAgent.indexOf('MSIE') < 0
      }
    },
    data () {
      return {
        isFull: false, // 是否全屏
      }
    },
    beforeMount () {
      const vm = this
      // 监听全屏
      window.onresize = function () {
        if (vm.getFullScreen()) {
          vm.$set(vm, 'isFull', false)
          return false
        }
        vm.$set(vm, 'isFull', true)
      }
    },
    methods: {
      // 设置全屏
      handleFullscreen () {
        if (this.getFullScreen()) {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen()
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
          }
        } else {
          if (document.cancelFullScreen) {
            document.cancelFullScreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          }
        }
      },
      // 获取是否全屏
      getFullScreen () {
        return (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement)
      }
    }
  }
</script>

<style scoped lang="less">

  .screen-box {
    display: inline-block;
  }
</style>
