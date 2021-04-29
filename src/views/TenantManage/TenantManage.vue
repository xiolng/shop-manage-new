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
            {name: '租户名称', key: 'tenantName'},
            {name: '联系人', key: 'realName'},
            {name: '联系电话', key: 'phone'},
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
      rowKey="tenantId"
      @change="pageChange"
    >
      <div slot="serviceManage" slot-scope="text, record">
        <a-button
          type="primary"
          size="small"
          class="mr-10"
          @click="isService = true, editId = record.tenantId"
        >支付配置
        </a-button>
      </div>
      <div slot="miniApp" slot-scope="text, record">
        <a-button
          type="primary"
          size="small"
          class="mr-10"
          @click="showMiniApp = true, editId = record.tenantId"
        >小程序配置
        </a-button>
      </div>
      <div slot="/rechargeLog" slot-scope="text, record">
        <a-row
          type="flex"
          justify="space-between"
        >
          <a-col>
            <a-button
              type="primary"
              size="small"
              class="mr-10"
              @click="visibleRecharge = true, editId = record.tenantId"
            >充值
            </a-button>
          </a-col>
          <a-col>
            <a-button
              size="small"
              class="mr-10"
              @click="$router.push({
          path: `/tenantManage/rechargeLog`,
          query: {
            tenantId: record.tenantId
          }
          })"
            >充值记录
            </a-button>
          </a-col>
        </a-row>
      </div>
      <div slot="tenantStatus" slot-scope="text, record">
        <a-switch
          :checked="!!text"
          :loading="tenantStatusLoading"
          class="mr-10"
          checked-children="是"
          un-checked-children="否"
          @click="setTenantStatus(record)"
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
    <!--// 支付配置-->
    <create-tenant-manage
      v-if="visible"
      ref="createTenantManage"
      :visible="visible"
      :edit-id="editId"
      @cancel="visible = false, editId = '', $refs.createTenantManage.form.resetFields()"
      @create="saveForm"
    />
    <!--服务管理-->
    <service-manage
      v-if="isService"
      ref="serviceManage"
      :edit-id="editId"
      :visible="isService"
      @cancel="isService = false, editId = ''"
      @create="isService = false, editId = ''"
    />
    <recharge-comp
      v-if="visibleRecharge"
      ref="rechargeRef"
      :edit-id="editId"
      :visible="visibleRecharge"
      @cancel="visibleRecharge = false, editId = ''"
      @create="visibleRecharge = false, editId = ''"
    />
    <mini-app
      v-if="showMiniApp"
      ref="miniAppRef"
      :edit-id="editId"
      :visible="showMiniApp"
      @cancel="showMiniApp = false, editId = ''"
      @create="showMiniApp = false, editId = ''"
    />
  </div>
</template>

<script>

  import SearchC from '@/components/SearchC/SearchC'
  import {
    tenantAddApi,
    tenantDeleteApi,
    tenantDisableApi, tenantEditApi,
    tenantEnableApi,
    tenantListApi
  } from '@/api/TenantManageApi'
  import CreateTenantManage from '@/views/TenantManage/CreateTenantManage'
  import ServiceManage from '@/views/TenantManage/ServiceManage'
  import RechargeComp from '@/views/TenantManage/RechargeComp'
  import MiniApp from '@/views/TenantManage/MiniApp'

  const column = [
    {
      title: '租户名称',
      dataIndex: 'tenantName',
      width: '10%'
    },
    {
      title: '租户编码',
      dataIndex: 'tenantCode',
      width: '10%'
    },
    {
      title: '是否启用',
      dataIndex: 'tenantStatus',
      scopedSlots: { customRender: 'tenantStatus' }
    },
    {
      title: '支付配置',
      dataIndex: 'serviceManage',
      scopedSlots: { customRender: 'serviceManage' }
    },
    {
      title: '小程序配置',
      dataIndex: 'miniApp',
      scopedSlots: { customRender: 'miniApp' }
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      ellipsis: true,
      width: '10%'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '充值',
      dataIndex: '/rechargeLog',
      scopedSlots: { customRender: '/rechargeLog' },
      width: 160
    },
    // {
    //   title: '租户描述',
    //   dataIndex: 'mainUser',
    //   width: '10%',
    //   ellipsis: true
    // },
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
      MiniApp,
      RechargeComp,
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
        editId: '',
        // 启用、禁用修改loading
        tenantStatusLoading: false,
        // 充值
        visibleRecharge: false,
        // 绑定小程序
        showMiniApp: false
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
      // 添加租户
      saveForm () {
        const func = this.editId ? tenantEditApi : tenantAddApi
        const editData = {}
        if (this.editId) {
          editData.tenantId = this.editId
        }
        this.$refs.createTenantManage.form.validateFields((err, val) => {
          if (!err) {
            console.log(val)
            func({
              ...val,
              ...editData,
              officialAccount: +val.officialAccount
              // tenantStatus: +val.tenantStatus
            }).then(res => {
              if (res.data.code === '200') {
                this.$message.success(`保存成功`)
                this.$refs.createTenantManage.form.resetFields()
                this.visible = false
                this.getList()
              }
            })
          }
        })
      },
      // 设置状态
      setTenantStatus (item) {
        this.tenantStatusLoading = true
        const func = item.tenantStatus ? tenantDisableApi : tenantEnableApi
        func({
          tenantId: item.tenantId,
        }).then(res => {
          this.tenantStatusLoading = false
          if (res.data.code === '200') {
            this.$message.success(`${item.tenantStatus ? '禁用' : '启用'}成功`)
            this.getList()
          }
        }).catch(() => {
          this.tenantStatusLoading = false
        })
      },
      /**
       * 删除
       * @param tenantId
       */
      deleteItem (tenantId) {
        tenantDeleteApi({
          tenantId
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
  .TenantManage {

  }
</style>
