<!--xiolng-->
<!--List-->
<!--2021/6/23-->
<!--11:21-->
<template>
  <div class="List">
    <!--筛选、添加-->
    <a-row type="flex" justify="space-between" align="top" class="mb-20">
      <a-col span="20">
        <search-c
          @get-list="getSearch"
          :search-list="[
            {name: '场景名称', key: 'sceneName'}
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
      rowKey="sceneId"
      @change="pageChange"
    >
      <div slot="sceneStyle" slot-scope="text">
        <a-tag color="cyan">{{sceneStyle[text]}}</a-tag>
      </div>
      <div slot="operation" slot-scope="text, record">
        <a-row type="flex">
          <a-col>
            <a-button
              type="primary"
              size="small"
              class="mr-10"
              @click="visible = !visible, editId = record.sceneId"
            >编辑
            </a-button>
          </a-col>
          <a-col>
            <a-popconfirm
              title="确定要删除吗？"
              @confirm="deleteItem(record.sceneId)"
            >
              <a-button type="danger" size="small">删除</a-button>
            </a-popconfirm>
          </a-col>
        </a-row>
      </div>
    </a-table>
    <create-scene
      v-if="visible"
      :visible="visible"
      ref="sceneRef"
      :edit-id="editId"
      @cancel="visible = false, editId = null"
      @create="visible = false, editId = null, getList()"
    />
  </div>
</template>

<script>

  import SearchC from '@/components/SearchC/SearchC'
  import { deleteSceneApi, scenePageApi } from '@/api/SceneManageApi'
  import CreateScene from '@/views/SceneManage/CreateScene'

  const column = [
    {
      title: '场景名称',
      dataIndex: 'sceneName'
    },
    {
      title: '场景编码',
      dataIndex: 'sceneNo'
    },
    {
      title: '场景样式',
      dataIndex: 'sceneStyle',
      scopedSlots: { customRender: 'sceneStyle' }
    },
    {
      title: '创建人',
      dataIndex: 'createBy'
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
      CreateScene,
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
        sceneStyle: ['载入式', '弹出式'],
        visible: false,
        editId: null
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      // 获取列表
      getList () {
        scenePageApi({
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
      /**
       * 删除
       * @param sceneId
       */
      deleteItem (sceneId) {
        deleteSceneApi({
          sceneId
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
