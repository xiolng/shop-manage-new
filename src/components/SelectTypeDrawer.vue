<!--SelectTypeDrawer-->
<template>
  <div class="select-type-drawwer">
    <a-drawer
      :visible="visible"
      title="选择"
      width="50%"
      placement="left"
      :mask-closable="false"
      @close="$emit('cancel')"
    >
      <div class="search-box">
        <a-input placeholder="请输入关键字搜索" v-model="searchName" @keyup.enter="getList" allow-clear />
        <a-button type="primary" @click="getList">搜索</a-button>
      </div>
      <!--table-list-->
      <a-table
        :columns="column"
        :dataSource="dataSource"
        :pagination="pages"
        rowKey="id"
        :row-selection="{
          onChange: changeCheck,
          selectedRowKeys: selectDataList,
          type: checkType
        }"
        @change="pageChange"
      ></a-table>
      <div class="btn-box">
        <a-button
          type="primary"
          @click="$emit('create', {item: selectData})"
        >提交
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>

  const column = [
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: 'id',
      dataIndex: 'id',
    },
  ]
  export default {
    name: 'SelectTypeDrawer',
    props: {
      visible: Boolean,
      func: Function,
      selectList: Array,
      checkType: {
        type: String,
        default: 'checkbox'
      }
    },
    data () {
      return {
        column,
        dataSource: [],
        searchName: '',
        pages: {
          current: 1,
          pageSize: 10,
          total: 0, // 总条数
          showSizeChanger: true
        }, // 分页
        selectData: [],
        selectDataList: []
      }
    },
    mounted () {
      this.getList()
      this.selectDataList = (this.selectList && JSON.parse(JSON.stringify(this.selectList))) || []
    },
    methods: {
      getList () {
        this.func({
          name: this.searchName,
          pageNum: this.pages.current,
          pageSize: this.pages.pageSize
        }).then(res => {
          if (res.data.code === '200') {
            this.dataSource = res.data.data
            this.pages.total = res.data.total
            this.selectList && this.selectList.map(v => {
              this.dataSource.map(j => {
                if (j.id === v) {
                  this.selectData.push(j)
                }
              })
            })
          }
        })
      },
      changeCheck (value, item) {
        this.selectDataList = value
        this.selectData = item
      },
      pageChange (pagination) {
        this.pages = {
          ...this.pages,
          ...pagination,
          pageNum: pagination.current
        }
        this.getList()
      },
    }
  }
</script>

<style scoped lang="less">
  .search-box {
    display: flex;
    margin-bottom: 20px;

    .ant-btn {
      flex-shrink: 0;
      margin-left: 10px;
    }
  }

  .btn-box {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0;
  }
</style>
