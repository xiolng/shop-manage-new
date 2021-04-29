<!--xiolng-->
<!--SystemIdea-->
<!--2021/4/19-->
<!--10:06-->
<template>
  <div class="SystemIdea main-content">
    <!--筛选、添加-->
    <!--<a-row type="flex" justify="space-between" align="top" class="mb-20">-->
    <!--  <a-col span="20">-->
    <!--    <search-c-->
    <!--      @get-list="getSearch"-->
    <!--      :search-list="[-->
    <!--        {name: '用户名', key: 'username'}-->
    <!--        ]"-->
    <!--    />-->
    <!--  </a-col>-->
    <!--</a-row>-->
    <!--table-list-->
    <a-table
      :columns="column"
      :dataSource="dataSource"
      :pagination="pages"
      rowKey="systemIdeaId"
      @change="pageChange"
    >
      <div slot="operation" slot-scope="text, record">
        <a-row type="flex">
          <a-col>
            <a-button
              type="primary"
              size="small"
              class="mr-10"
              @click="$router.push(`/systemIdea/ideaDetail?id=${record.systemIdeaId}`)"
            >详情
            </a-button>
          </a-col>
          <a-col>
            <a-popconfirm
              title="确定要删除吗？"
              @confirm="deleteItem(record.systemIdeaId)"
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
  import { deleteSystemIdeaByIdApi, pageSystemIdeaApi } from '@/api/SystemIdeaApi'

  const column = [
    {
      title: '标题',
      dataIndex: 'ideaTitle'
    },
    {
      title: '电话',
      dataIndex: 'ideaTel'
    },
    {
      title: '用户',
      dataIndex: 'ideaBy'
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
    name: 'SystemIdea',
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
        searchName: {}, // 搜索关键字
        dataSource: [],
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      // 获取列表
      getList () {
        pageSystemIdeaApi({
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
      /**
       * 删除
       * @param systemIdeaId
       */
      deleteItem (systemIdeaId) {
        deleteSystemIdeaByIdApi({
          systemIdeaId
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
  .SystemIdea {

  }
</style>
