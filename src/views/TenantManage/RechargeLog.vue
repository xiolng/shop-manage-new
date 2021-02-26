<!--xiolng-->
<!--/rechargeLog-->
<!--2020/10/29-->
<!--16:27-->
<template>
  <div class="rechargeLog, main-content">
    <!--筛选、添加-->
    <!--<a-row type="flex" justify="space-between" align="top" class="mb-20">-->
    <!--<a-col span="20">-->
    <!--  <search-c-->
    <!--    @get-list="getSearch"-->
    <!--    :search-list="[-->
    <!--      {name: '用户名', key: 'username'}-->
    <!--      ]"-->
    <!--  />-->
    <!--</a-col>-->
    <!--<a-button-->
    <!--  type="primary"-->
    <!--  @click="visible = true"-->
    <!--&gt;充值-->
    <!--</a-button>-->
    <!--</a-row>-->
    <!--table-list-->
    <a-table
      :columns="column"
      :dataSource="dataSource"
      :pagination="pages"
      rowKey="id"
      @change="pageChange"
    >
      <div slot="rechargeDay" slot-scope="text">
        {{text}} 月
      </div>
      <div slot="rechargePrice" slot-scope="text">
        {{text}} 元
      </div>
      <div slot="operation" slot-scope="text, record">
        <a-row type="flex">
          <a-col>
            <a-button
              type="primary"
              size="small"
              class="mr-10"
              @click="visible = !visible, isEdit = record.id"
            >编辑
            </a-button>
          </a-col>
          <a-col>
            <a-popconfirm
              title="确定要删除吗？"
              @confirm="deleteItem(record.id)"
            >
              <a-button type="danger" size="small">删除</a-button>
            </a-popconfirm>
          </a-col>
        </a-row>
      </div>
    </a-table>
  </div>
</template>

<script>

  // import SearchC from '@/components/SearchC/SearchC'
  import { rechargeLogApi } from '@/api/TenantManageApi'

  const column = [
    {
      title: '充值时长',
      dataIndex: 'rechargeDay',
      scopedSlots: { customRender: 'rechargeDay' }
    },
    {
      title: '充值价格',
      dataIndex: 'rechargePrice',
      scopedSlots: { customRender: 'rechargePrice' }
    },
    {
      title: '充值备注',
      dataIndex: 'rechargeDetail'
    },
    {
      title: '充值人',
      dataIndex: 'createName'
    },
    // {
    //   title: '操作',
    //   dataIndex: 'operation',
    //   width: '20%',
    //   scopedSlots: { customRender: 'operation' }
    // }
  ]
  export default {
    name: 'rechargeLog',
    // components: { SearchC },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'form' }),
        column,
        pages: {
          current: 1,
          pageSize: 10,
          total: 0, // 总条数
          showSizeChanger: true
        }, // 分页
        searchName: {}, // 搜索关键字
        dataSource: [],
        visible: false
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      // 获取列表
      getList () {
        rechargeLogApi({
          ...this.pages,
          // ...this.searchName,
          tenantId: this.$route.query.tenantId
        }).then(res => {
          const { data, code, total } = res.data
          if (code === '200') {
            this.dataSource = data
            console.log(data)
            this.pages.total = total
          }
        })
      },

      /**
       * 删除
       * @param id
       */
      deleteItem (id) {
        userDeleteApi({
          id
        }).then(res => {
          const { code } = res
          if (code === '200') {
            this.$message.success('删除成功')
            this.getList()
          }
        })
      },
      /**
       * 搜索、筛选
       * @param value
       */
      getSearch (value) {
        this.searchName = value
        this.getList()
      },
      /**
       * 分页、跳转
       * @param pagination
       */
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
  .rechargeLog {

  }
</style>
