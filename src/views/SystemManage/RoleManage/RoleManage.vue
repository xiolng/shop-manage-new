<template>
  <!--角色列表-->
  <div class="systemManage main-content">
    <a-row type="flex" justify="space-between" align="middle">
      <a-col>
        <search-c
          @get-list="clickSearch"
          :search-list="[
            {name: '用户名', key: 'username'}
            ]"
        />
      </a-col>
      <a-col>
        <a-button type="primary" @click="isShowModal = true, isEdit = false">添加</a-button>
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
            @click="isEdit = true, getDetail(record.roleId)"
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
    <!--添加弹窗-->
    <a-modal
      title="添加、编辑"
      :visible="isShowModal"
      @ok="saveUser"
      @cancel="isShowModal = false, form.resetFields(),formData = {}"
    >
      <a-form
        layout="horizontal"
        :form="form"
      >
        <a-form-item
          label="角色名"
          :label-col="{span: 4}"
          :wrapper-col="{span: 14}"
        >
          <a-input
            v-decorator="[
              'roleName',
              {
                initialValue: formData.roleName,
                rules: [{ required: true, message: '请输入角色名' }]
              },
            ]"
            placeholder="请输入角色名"
          />
        </a-form-item>
        <a-form-item
          label="权限"
          :label-col="{span: 4}"
          :wrapper-col="{span: 14}"
        >
          <a-tree-select
            treeCheckable
            :showCheckedStrategy="showParent"
            multiple
            :treeData="menuData"
            v-decorator="[
              'menuIds',
              {
                valroleIdateTrigger: ['change'],
                initialValue: formData.menuIds,
                rules: [{ required: true, message: '请选择权限' }]
              },
            ]"
            placeholder="请选择权限"
          >
          </a-tree-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import SearchC from '@/components/SearchC/SearchC'
  import { roleAddApi, roleDeleteApi, roleeDetailApi, roleEditApi, roleListApi } from '@/api/systemManage/roleManageApi'
  import { treeMenu } from '@/utils/menu'
  import { menuAllListlApi } from '@/api/systemManage/MenuManageApi'
  import { TreeSelect } from 'ant-design-vue'

  export default {
    name: 'index',
    data () {
      return {
        form: null,
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
            title: '角色名',
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
        isShowModal: false,
        isEdit: false,
        menuData: [],
        showParent: TreeSelect.SHOW_ALL,
      }
    },
    created () {
      // 初始化form
      this.form = this.$form.createForm(this, { name: 'addSystem' })
    },
    mounted () {
      this.getMenuData()
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
      // 获取菜单列表
      getMenuData () {
        menuAllListlApi({}).then(res => {
          this.menuData = treeMenu(res.data.data, 'menuId')
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
      SearchC,
    }
  }
</script>

<style scoped lang="less">
  .systemManage {
    height: 100%;

    .table-list {
      margin: 20px 0;
    }
  }
</style>
