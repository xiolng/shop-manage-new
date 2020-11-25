<!--xiolng-->
<!--List-->
<!--2020/10/15-->
<!--15:18-->
<template>
  <div class="List main-content">
    <!--筛选、添加-->
    <a-row type="flex" justify="space-between" align="top" class="mb-20">
      <a-col span="20">
        <search-c
          @get-list="getSearch"
          :search-list="[
            {name: '用户名', key: 'username'}
            ]"
        />
      </a-col>
      <a-col>
        <a-button
          type="primary"
          @click="$router.push({
          path: `/systemService/systemServiceEdit`
          })"
        >新建
        </a-button>
      </a-col>
    </a-row>
    <!--table-list-->
    <a-table
      :columns="column"
      :dataSource="dataSource"
      :pagination="pages"
      rowKey="systemServiceId"
      @change="pageChange"
    >
      <div slot="specList" slot-scope="text">
        <div v-for="item in text" :key="item.systemServiceSpecId">
          <a-row type="flex">
            <a-col>
              人数：{{item.personCount}}
            </a-col>
            <a-col>
              价格：{{item.price}}
            </a-col>
          </a-row>
        </div>
      </div>
      <div slot="subList" slot-scope="text">
        <div v-for="item in text" :key="item.systemServiceSpecId">
          <a-row type="flex">
            <a-col>
              月数：{{item.monthCount}}
            </a-col>
            <a-col>
              折扣比率：{{item.discountRate}}%
            </a-col>
          </a-row>
        </div>
      </div>
      <div slot="operation" slot-scope="text, record">
        <a-row type="flex">
          <a-col>
            <a-button
              type="primary"
              size="small"
              class="mr-10"
              @click="$router.push({
              path: `/systemService/systemServiceEdit?id=${record.systemServiceId}`
              })"
            >编辑
            </a-button>
          </a-col>
          <a-col>
            <a-popconfirm
              title="确定要删除吗？"
              @confirm="deleteItem(record.systemServiceId)"
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

  import SearchC from '@/components/SearchC/SearchC'
  import { SystemServiceDeleteApi, SystemServiceListApi } from '@/api/SystemServiceApi'

  const column = [
    {
      title: '服务名称',
      dataIndex: 'serviceName'
    },
    {
      title: '服务描述',
      dataIndex: 'serviceDetail'
    },
    {
      title: '服务规格',
      dataIndex: 'specList',
      scopedSlots: { customRender: 'specList' }
    },
    {
      title: '服务折扣',
      dataIndex: 'subList',
      scopedSlots: { customRender: 'subList' }
    },
    {
      title: '更新人',
      dataIndex: 'updateBy'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime'
    },
    {
      title: '创建人',
      dataIndex: 'createBy'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '20%',
      scopedSlots: { customRender: 'operation' }
    }
  ]
  export default {
    name: 'List',
    components: {
      SearchC
    },
    data () {
      return {
        column,
        pages: {
          current: 1,
          pageSize: 10,
          total: 0, // 总条数
          showSizeChanger: true
        }, // 分页
        searchName: {
          serviceName: ''
        }, // 搜索关键字
        dataSource: [],
        visible: false,
        isEdit: ''
      }
    },
    created () {
      this.getList()
    },
    methods: {
      // 获取列表
      getList () {
        SystemServiceListApi({
          pageSize: this.pages.pageSize,
          pageNum: this.pages.current,
          ...this.searchName
        }).then(res => {
          const { data, code, total } = res.data
          if (code === '200') {
            this.dataSource = data
            this.pages.total = total
          }
        })
      },
      cancelModal () {
        console.log('cancel')
        this.visible = false
      },
      createModal () {
        console.log(this.$refs.editService)
      },
      /**
       * 删除
       * @param id
       */
      deleteItem (id) {
        SystemServiceDeleteApi({
          id
        }).then(res => {
          const { code } = res.data
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
  .List {

  }
</style>
