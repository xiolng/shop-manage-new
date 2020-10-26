<!--xiolng-->
<!--TimeRule-->
<!--2020/10/22-->
<!--16:28-->
<template>
  <div class="time-rule main-content">
    <a-row type="flex" justify="space-between" align="middle">
      <a-col>
        <search-c
          @get-list="clickSearch"
          :search-list="[
            {name: '规则名称', key: 'ruleName'}
            ]"
        />
      </a-col>
      <a-col>
        <a-button type="primary" @click="visible = true, isEdit = false">添加</a-button>
      </a-col>
    </a-row>
    <!--tableList-->
    <div class="table-list">
      <a-table
        :dataSource="dataSource"
        :columns="columns"
        @change="pageChange"
        :pagination="pages"
        rowKey="roleId"
      >
        <!--编辑-->
        <template slot="operation" slot-scope="text, record">
          <a-button
            type="primary"
            size="small"
            style="margin-right: 10px;"
            @click="visible = true, isEdit = true, getDetail(record.roleId)"
          >编辑
          </a-button>
          <!--删除-->
          <a-popconfirm
            v-if="dataSource.length"
            title="确定删除吗？"
            @confirm="() => onDelete(record.roleId)"
          >
            <a-button type="danger" size="small">删除</a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
    <create-time-rule
      ref="createTimeRule"
      :visible="visible"
      @cancel="visible = false, isEdit = false, $refs.createTimeRule.form.resetFields()"
      @create="saveForm"
    />
  </div>
</template>

<script>
  import { roleAddApi, roleDeleteApi, roleeDetailApi, roleEditApi, roleListApi } from '@/api/roleManageApi'
  import SearchC from '@/components/SearchC/SearchC'
  import CreateTimeRule from '@/views/SystemService/TimeRule/CreateTimeRule'

  export default {
    name: 'TimeRule',
    data () {
      return {
        pages: {
          current: 1,
          pageSize: 10,
          total: 0, // 总条数
          showSizeChanger: true
        }, // 分页
        searchName: {}, // 搜索关键字
        formData: {
          roleName: '',
          menuIds: []
        },
        dataSource: [],
        columns: [
          {
            title: '规则名称',
            dataIndex: 'roleName',
          },
          {
            title: '创建人',
            dataIndex: 'createBy',
          },
          {
            title: '更新人',
            dataIndex: 'updateBy',
          },
          {
            title: '更新时间',
            dataIndex: 'updateTime',
          },
          {
            title: '添加时间',
            dataIndex: 'createTime',
          },
          {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: { customRender: 'operation' },
          },
        ],
        visible: false,
        isEdit: false,
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      // 获取列表
      getList () {
        roleListApi({
          pageSize: this.pages.pageSize,
          pageNum: this.pages.current,
          ...this.searchName
        }).then(res => {
          this.dataSource = res.data.data
          this.pages.total = res.data.total
        })
      },
      // 获取详情
      getDetail (key) {
        roleeDetailApi({
          roleId: key
        }).then(res => {
          const data = res.data.data
          // data.menuIdNameOutDTOS = data.menuIdNameOutDTOS.map(v => v.menuId)
          this.isEdit = true
          this.isShowModal = true
          this.formData = data
        })
      },
      saveForm () {
        this.$refs.createTimeRule.form.validateFields((err, val) => {
          if (!err) {
            console.log(JSON.stringify(val))
          }
        })
      },
      // 分页
      pageChange (pagination) {
        this.pages = {
          ...this.pages,
          ...pagination,
          pageNum: pagination.current
        }
        this.getList()
      },
      // 删除
      onDelete (key) {
        roleDeleteApi({
          roleId: key
        }).then(res => {
          if (res.data.code === '200') {
            this.$message.info(`删除成功`)
            this.getList()
          }
        })
      },
      // 保存
      saveUser () {
        const api = this.isEdit ? roleEditApi : roleAddApi
        this.form.validateFields((err, values) => {
          if (!err) {
            api({
              ...values,
              roleId: this.formData.roleId || ''
            }).then(res => {
              if (res.data.code === '200') {
                this.$message.info(`保存成功`)
                this.getList()
                this.form.resetFields()
                this.formData = {}
                this.isEdit = false
                this.isShowModal = false
              }
            })
          }
        })
      },
      /**
       * 搜索关键字
       */
      clickSearch (data) {
        this.searchName = data
        this.pages.current = 1
        this.getList()
      },
    },
    components: {
      CreateTimeRule,
      SearchC,
    }
  }
</script>

<style scoped lang="less">
  .time-rule {
    height: 100%;

    .table-list {
      margin: 20px 0;
    }
  }
</style>
