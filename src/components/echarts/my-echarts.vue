<template>
  <div class="echartsBox">
    <div id="my-echarts" class="myEcharts" :style="{width: elWidth, height: elHeight}"></div>
    <slot></slot>
  </div>

</template>

<script>
  import echarts from 'echarts'
  import { debounce } from './utils'

  require('echarts/theme/macarons')
  export default {
    name: 'my-echarts',
    props: {
      ecData: Object, // 数据
      type: String, // 图表类型
      isClick: Boolean, // 是否可以点击
      date: String, // 创建时间
      base: String, // 跳转 路由传参
      elWidth: { // 图表 大小
        type: String,
        default: '100%'
      },
      elHeight: {
        type: String,
        default: '400px'
      },
      getTableList: Function // 回调
    },
    data () {
      return {
        myEchart: null
      }
    },
    mounted () {
      this.initEcharts()
      this.__resizeHandler = debounce(() => {
        if (this.myEchart) {
          this.myEchart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    },
    beforeDestroy () {
      if (!this.myEchart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHandler)
      this.myEchart.dispose()
      this.myEchart = null
    },
    methods: {
      async renderEcharts (myEchart) {
        const option = require('./type')[this.type](this.ecData)
        // option.color = new ColorList(colors, 5)
        await myEchart.setOption(option, true)
      },
      initEcharts () {
        this.myEchart = echarts.init(this.$el.children[0], 'macarons')
        this.renderEcharts(this.myEchart).then(() => {
          if (this.type !== 'pie') {
            this.myEchart.resize()
          }
        })
        this.myEchart.on('click', (params) => {
          if (params.seriesType === 'pie' && this.isClick) {
            this.$router.push(`${this.ecData.detailUrl}/${params.value}/${params.name}/${this.base}`)
          }
          if (params.seriesType !== 'pie' && this.ecData.isDetailUrl) {
            this.getTableList(params.name)
          }
        })
      }
    },
    watch: {
      date () {
        this.myEchart.clear()
        this.renderEcharts(this.myEchart)
      }
    }
  }
</script>

<style scoped lang="less">
  .echartsBox {
    width: 100%;
    height: 100%;
    .myEcharts{
      width: 100%;
      height: 100%;
    }
  }
</style>
