<!--xiolng-->
<!--ServiceGet-->
<!--2020/10/29-->
<!--16:27-->
<template>
  <div class="ServiceGet main-content">
    <!--筛选、添加-->
    <a-row type="flex" justify="space-between" align="top" class="mb-20">
      <a-col span="20">
        <search-c
          @get-list="getSearch"
          :search-list="[
            {name: '服务名称', key: 'serviceName'}
            ]"
        />
      </a-col>
    </a-row>
    <!--table-list-->
    <a-table
      :columns="column"
      :dataSource="dataSource"
      :pagination="pages"
      rowKey="tenantSystemServiceId"
      @change="pageChange"
    >
      <div slot="operation" slot-scope="text, record">
        <a-row type="flex">
          <a-col>
            <a-switch
              checked-children="开"
              un-checked-children="关"
              :checked="!!text"
              :loading="record.loading"
              @click="clickActive(record)"
            />
          </a-col>
        </a-row>
      </div>
    </a-table>
  </div>
</template>

<script>

  import SearchC from '@/components/SearchC/SearchC'
  import { userDeleteApi } from '@/api/userManageApi'
  import {
    disableTenantSystemServiceApi,
    enableTenantSystemServiceApi,
    pageTenantSystemServiceApi
  } from '@/api/TenantManageApi'

  const column = [
    {
      title: '服务名称',
      dataIndex: 'serviceName'
    },
    // {
    //   title: '服务描述',
    //   dataIndex: 'serviceDetail'
    // },
    {
      title: '人数',
      dataIndex: 'personCount'
    },
    {
      title: '服务状态',
      dataIndex: 'serviceStatus',
      width: '20%',
      scopedSlots: { customRender: 'operation' }
    }
  ]
  export default {
    name: 'ServiceGet',
    components: { SearchC },
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
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      // 获取列表
      getList () {
        pageTenantSystemServiceApi({
          pageSize: this.pages.pageSize,
          pageNum: this.pages.current,
          ...this.searchName,
          tenantId: this.$route.query.id
        }).then(res => {
          const { data, code, total } = res.data
          if (code === '200') {
            this.dataSource = data
            this.pages.total = total
          }
        })
      },
      clickActive (item) {
        item.loading = true
        const func = item.serviceStatus ? disableTenantSystemServiceApi : enableTenantSystemServiceApi
        func({
          tenantSystemServiceId: item.tenantSystemServiceId
        }).then(res => {
          if (res.data.code === '200') {
            item.loading = false
            this.$message.success(`操作成功`)
            this.getList()
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
  .ServiceGet {

  }
</style>
