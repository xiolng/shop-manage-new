<!--xiolng-->
<!--List-->
<!--2021/6/23-->
<!--10:41-->
<template>
  <div class="List">
    <!--筛选、添加-->
    <a-row type="flex" justify="space-between" align="top" class="mb-20">
      <a-col span="20">
        <search-c
          @get-list="getSearch"
          :search-list="[
            {name: '营销名称', key: 'marketingName'}
            ]"
        />
      </a-col>
      <a-col>
        <a-button type="primary" @click="visible = true, editId = null">新建</a-button>
      </a-col>
    </a-row>
    <!--table-list-->
    <a-table
      :columns="column"
      :dataSource="dataSource"
      :pagination="pages"
      rowKey="marketingId"
      @change="pageChange"
    >
      <div slot="icon" slot-scope="text">
        <a-avatar :src="`/files/${text}`" />
      </div>
      <div slot="setStatus" slot-scope="text, record">
        <a-button type="primary" size="small" :disabled="record.marketingStatus == '3'" @click="setStatus(record)">{{record.marketingStatus == '3' ? '维护中':'设置为维护'}}</a-button>
      </div>
      <div slot="marketingStatus" slot-scope="text, record" style="display: flex; align-items: center;">
        <a-tag :color="text == '2' ? 'cyan':'red'">{{marketingStatus[text]}}</a-tag>
        <a-switch :checked="text == '2' ? true: false" @click="changeStatus(record)" />
      </div>
      <div slot="operation" slot-scope="text, record">
        <a-row type="flex">
          <a-col>
            <a-button
              type="primary"
              size="small"
              class="mr-10"
              @click="visible = !visible, isEdit = record.marketingId"
            >编辑
            </a-button>
          </a-col>
          <a-col>
            <a-popconfirm
              title="确定要删除吗？"
              @confirm="deleteItem(record.marketingId)"
            >
              <a-button type="danger" size="small">删除</a-button>
            </a-popconfirm>
          </a-col>
        </a-row>
      </div>
    </a-table>
    <create-market
      v-if="visible"
      :visible="visible"
      ref="marketingRef"
      :edit-id="editId"
      @cancel="visible = false, editId = null"
      @create="visible = false, editId = null, getList()"
    />
  </div>
</template>

<script>

  import SearchC from '@/components/SearchC/SearchC'
  import {
    disableMarketingApi,
    enableMarketingApi,
    maintainMarketingApi,
    marketingPageApi
  } from '@/api/MarketingManageApi'
  import CreateMarket from '@/views/MarketingManage/CreateMarket'

  const column = [
    {
      title: '图标',
      dataIndex: 'icon',
      scopedSlots: { customRender: 'icon' }
    },
    {
      title: '营销名称',
      dataIndex: 'marketingName'
    },
    {
      title: '营销状态',
      dataIndex: 'marketingStatus', // 0初始，1未启用，2已启用，3维护中
      scopedSlots: { customRender: 'marketingStatus' }
    },
    {
      title: '是否维护',
      dataIndex: 'Status',
      scopedSlots: { customRender: 'setStatus' }
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
      CreateMarket,
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
        editId: null,
        marketingStatus: ['初始', '未启用', '已启用', '维护中']
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      // 获取列表
      getList () {
        marketingPageApi({
          ...this.pages,
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
      setStatus (item) {
        maintainMarketingApi({
          marketingId: item.marketingId
        }).then(res => {
          if (res.data.code == '200') {
            this.$message.success('设置成功')
            this.getList()
          }
        })
      },
      changeStatus (item) {
        const func = item.marketingStatus == '2' ? disableMarketingApi : enableMarketingApi
        func({
          marketingId: item.marketingId
        }).then(res => {
          if (res.data.code == '200') {
            this.$message.success('操作成功')
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
  .List {

  }
</style>
