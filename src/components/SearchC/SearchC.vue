<!--多功能搜索，暂时不用-->
<template>
  <div class="search-box">
    <a-row type="flex" justify="start" :gutter="10">
      <a-col>
        <!--搜索输入框-->
        <a-input-group style="display: flex;">
          <!--搜索关键字选择-->
          <a-select v-model="selectKey" style="width: 34%;margin-right: 10px">
            <a-select-option
              v-for="item in selectList"
              :key="item.key"
              :value="item.key"
            >
              {{item.name}}
            </a-select-option>
          </a-select>
          <a-input
            style="width: 64%;"
            v-model="searchName"
            :placeholder="placeholder"
            allowClear
            @search="$emit('get-list', searchData())"
            @pressEnter="$emit('get-list', searchData())"
          >
          </a-input>
        </a-input-group>
      </a-col>
      <a-col>
        <!--搜索按钮-->
        <a-button
          type="primary"
          icon="ios-search"
          @click="$emit('get-list', searchData())"
        >
          搜索
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  // 搜索关键字列表
  import searchSelectList from '@/components/SearchC/searchSelectList'

  export default {
    /**
     * @getList 回调
     */
    props: {
      getList: Function,
      searchList: Array
    },
    data () {
      return {
        searchName: '', // 搜索内容
        pageName: '', // 路由搜索关键字
        selectKey: '', // 搜索key
        selectList: '' // 搜索key，列表
      }
    },
    created () {
      this.pageName = this.$route.meta.searchKey
      this.selectKey = this.searchList[0].key
      this.selectList = this.searchList
    },
    methods: {
      // 搜索返回
      searchData () {
        if (!this.searchName) return null
        const data = {}
        data[this.selectKey] = this.searchName
        return data
      }
    },
    computed: {
      // 监听所在页面，返回此页面搜索关键字
      placeholder () {
        let list = 0
        this.searchList.map((v, index) => {
          if (v.key === this.selectKey) {
            list = index
          }
        })
        return `请输入${this.searchList[list].name}搜索`
      }
    }
  }
</script>

<style scoped lang="less">
  .znzheng {
    width: 100%;
  }

</style>
