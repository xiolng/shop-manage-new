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
            {name: ' 折扣名称', key: 'discountName'}
            ]"
        />
      </a-col>
      <a-col>
        <a-button type="primary" @click="visible = true, editId = ''">添加</a-button>
      </a-col>
    </a-row>
    <!--tableList-->
    <div class="table-list">
      <a-table
        :dataSource="dataSource"
        :columns="columns"
        @change="pageChange"
        :pagination="pages"
        rowKey="systemServiceDiscountId"
      >
        <template slot="discountSubList" slot-scope="text">
          <div v-for="item in text">
            {{item.monthCount}}个月：{{item.discountRate}}%折扣
          </div>
        </template>
        <!--编辑-->
        <template slot="operation" slot-scope="text, record">
          <a-button
            type="primary"
            size="small"
            style="margin-right: 10px;"
            @click="visible = true, editId = record.systemServiceDiscountId"
          >编辑
          </a-button>
          <!--删除-->
          <a-popconfirm
            v-if="dataSource.length"
            title="确定删除吗？"
            @confirm="() => onDelete(record.systemServiceDiscountId)"
          >
            <a-button type="danger" size="small">删除</a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
    <create-time-rule
      v-if="visible"
      ref="createTimeRule"
      :visible="visible"
      :edit-id="editId"
      @cancel="visible = false, editId = '', $refs.createTimeRule.form.resetFields()"
      @create="saveForm"
    />
  </div>
</template>

<script>
  import SearchC from '@/components/SearchC/SearchC'
  import CreateTimeRule from '@/views/SystemService/TimeRule/CreateTimeRule'
  import {
    deleteSystemServiceDiscountApi,
    pageSystemServiceDiscountApi,
    saveSystemServiceDiscountApi,
    updateSystemServiceDiscountApi
  } from '@/api/SystemServiceApi'

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
        searchName: {
          discountName: ''
        }, // 搜索关键字
        formData: {
          roleName: '',
          menuIds: []
        },
        dataSource: [],
        columns: [
          {
            title: '折扣名称',
            dataIndex: 'discountName',
          },
          {
            title: '折扣描述',
            dataIndex: 'serviceDiscountDetail',
          },
          {
            title: '折扣比率',
            dataIndex: 'discountSubList',
            scopedSlots: { customRender: 'discountSubList' }
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
            width: 130,
            dataIndex: 'operation',
            scopedSlots: { customRender: 'operation' },
          },
        ],
        visible: false,
        editId: '',
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      // 获取列表
      getList () {
        pageSystemServiceDiscountApi({
          pageSize: this.pages.pageSize,
          pageNum: this.pages.current,
          ...this.searchName
        }).then(res => {
          this.dataSource = res.data.data
          this.pages.total = res.data.total
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
        deleteSystemServiceDiscountApi({
          id: key
        }).then(res => {
          if (res.data.code === '200') {
            this.$message.info(`删除成功`)
            this.getList()
          }
        })
      },
      // 保存
      saveForm () {
        const api = this.editId ? updateSystemServiceDiscountApi : saveSystemServiceDiscountApi
        this.$refs.createTimeRule.form.validateFields((err, values) => {
          if (!err) {
            this.$refs.createTimeRule.$refs.ruleArr.form.validateFields((errChild, valChild) => {
              if (!errChild) {
                console.log(3333, valChild)
                const discountSubList = valChild.keys.map(v => {
                  console.log(444, v)
                  return {
                    discountRate: valChild.discountRate[v],
                    monthCount: valChild.monthCount[v],
                  }
                })
                const isEdit = {}
                if (this.editId) {
                  isEdit.systemServiceDiscountId = this.editId
                }
                api({
                  ...values,
                  discountSubList,
                  ...isEdit
                }).then(res => {
                  if (res.data.code === '200') {
                    this.$message.info(`保存成功`)
                    this.getList()
                    this.$refs.createTimeRule.form.resetFields()
                    this.$refs.createTimeRule.$refs.ruleArr.form.resetFields()
                    this.formData = {}
                    this.editId = ''
                    this.visible = false
                  }
                })
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
