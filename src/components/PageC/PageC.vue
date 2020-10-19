<template>
  <div class="page-box">
    <!--分页-->
    <a-pagination
      :total="total"
      show-sizer
      :current="pages.current"
      show-total
      :pageSize="pages.pageSize"
      @change="setCurrent"
      @showSizeChange="setLimit"
    />
  </div>
</template>

<script>
  export default {
    /**
     * @total 分页总数
     * @callback 回调
     */
    props: {
      total: Number,
      callback: Function
    },
    data () {
      return {
        pages: {
          current: 1,
          pageSize: 10
        },
        callData: {
          pageNum: 1,
          pageSize: 10
        }
      }
    },
    methods: {
      // 设置分页
      setCurrent (data) {
        this.pages.current = data
        this.callData.pageNum = data
        this.callback(this.callData)
      },
      // 每页数量
      setLimit (data) {
        this.pages.pageSize = data
        this.callData.pageSize = data
        this.callback(this.callData)
      }
    }
  }
</script>

<style scoped lang="less">

  .znzheng {
    width: 100%;
  }
</style>
