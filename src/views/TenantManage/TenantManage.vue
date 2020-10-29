<!--xiolng-->
<!--TenantManage-->
<!--2020/10/23-->
<!--9:20-->
<template>
  <div class="TenantManage main-content">
    <!--筛选、添加-->
    <a-row type="flex" justify="space-between" align="top" class="mb-20">
      <a-col span="20">
        <search-c
          @get-list="getSearch"
          :search-list="[
            {name: '租户名', key: 'username'}
            ]"
        />
      </a-col>
      <a-col>
        <a-button
          type="primary"
          @click="visible = true"
        >添加
        </a-button>
      </a-col>
    </a-row>
    <!--table-list-->
    <a-table
      :columns="column"
      :dataSource="dataSource"
      :pagination="pages"
      rowKey="id"
      @change="pageChange"
    >
      <div slot="serviceManage" slot-scope="text">
        <a-button
          type="primary"
          size="small"
          class="mr-10"
          @click="isService = true"
        >服务管理
        </a-button>
      </div>
      <div slot="serviceGet" slot-scope="text">
        <a-button
          type="primary"
          size="small"
          class="mr-10"
          @click="$router.push({
          path: `/tenantManage/serviceGet`
          })"
        >查询服务
        </a-button>
      </div>
      <div slot="serviceUser" slot-scope="text">
        <a-button
          type="primary"
          size="small"
          class="mr-10"
          @click="$router.push({
          path: `/tenantManage/serviceUser`
          })"
        >查询用户
        </a-button>
      </div>
      <div slot="tenantStatus" slot-scope="text">
        <a-switch
          :checked="text"
          class="mr-10"
          checked-children="是"
          un-checked-children="否"
        />
      </div>
      <div slot="operation" slot-scope="text, record">
        <a-row type="flex">
          <a-col>
            <a-button
              type="primary"
              size="small"
              class="mr-10"
              @click="visible = !visible, editId = record.tenantId"
            >编辑
            </a-button>
          </a-col>
          <a-col>
            <a-popconfirm
              title="确定要删除吗？"
              @confirm="deleteItem(record.tenantId)"
            >
              <a-button type="danger" size="small">删除</a-button>
            </a-popconfirm>
          </a-col>
        </a-row>
      </div>
    </a-table>
    <!--// 新建、编辑-->
    <create-tenant-manage
      v-if="visible"
      ref="createTenantManage"
      :visible="visible"
      :edit-id="editId"
      @cancel="visible = false"
      @create="saveForm"
    />
    <!--服务管理-->
    <service-manage
      v-if="isService"
      ref="serviceManage"
      :visible="isService"
      @cancel="isService = false"
    />
  </div>
</template>

<script>

  import SearchC from '@/components/SearchC/SearchC'
  import { tenantAddApi, tenantDeleteApi, tenantListApi } from '@/api/TenantManageApi'
  import CreateTenantManage from '@/views/TenantManage/CreateTenantManage'
  import ServiceManage from '@/views/TenantManage/ServiceManage'

  const column = [
    {
      title: '租户名称',
      dataIndex: 'tenantName'
    },
    {
      title: '租户描述',
      dataIndex: 'mainUser'
    },
    {
      title: '是否启用',
      dataIndex: 'tenantStatus',
      scopedSlots: { customRender: 'tenantStatus' }
    },
    {
      title: '服务管理',
      dataIndex: 'serviceManage',
      scopedSlots: { customRender: 'serviceManage' }
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
      title: '服务',
      dataIndex: 'serviceGet',
      scopedSlots: { customRender: 'serviceGet' }
    },
    {
      title: '用户',
      dataIndex: 'serviceUser',
      scopedSlots: { customRender: 'serviceUser' }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '20%',
      scopedSlots: { customRender: 'operation' }
    }
  ]
  export default {
    name: 'TenantManage',
    components: {
      ServiceManage,
      CreateTenantManage,
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
        searchName: {}, // 搜索关键字
        dataSource: [],
        visible: false,
        // 服务管理
        isService: false,
        editId: ''
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      // 获取列表
      getList () {
        tenantListApi({
          ...this.pages,
          ...this.searchName
        }).then(res => {
          const { data, code, total } = res.data
          if (code === '200') {
            this.dataSource = data
            this.pages.total = total
          }
        })
      },
      saveForm () {
        this.$refs.createTenantManage.form.validateFields((err, val) => {
          if (!err) {
            console.log(val)
            tenantAddApi({
              ...val
            }).then(res => {
              if (res.data.code === '200') {
                this.$message.success(`保存成功`)
                this.getList()
              }
            })
          }
        })
      },
      /**
       * 删除
       * @param id
       */
      deleteItem (id) {
        tenantDeleteApi({
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
  .TenantManage {

  }
</style>
