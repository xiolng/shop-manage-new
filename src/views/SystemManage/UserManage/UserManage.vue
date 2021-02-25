<!--UserManage-->
<template>
  <div class="user-manage main-content">
    <a-row type="flex" justify="end" class="mb-20">
      <a-col>
        <a-button type="primary" @click="visible = !visible">新建用户</a-button>
      </a-col>
    </a-row>
    <a-table
      :columns="column"
      :dataSource="tableData"
      :pagination="pages"
      rowKey="userId"
      @change="pageChange"
    >
      <div slot="avatar" slot-scope="text">
        <a-avatar :src="'/fileLoad/files/' + text" />
      </div>
      <div slot="roles" slot-scope="text, record">
        <a-tag
          color="cyan"
          v-for="(item, index) in record.roleIdNameOutDTOS"
          :key="index"
        >{{item.roleName}}
        </a-tag>
      </div>
      <div slot="operation" slot-scope="text, record">
        <a-row type="flex">
          <a-col>
            <a-button
              type="primary"
              size="small"
              class="mr-10"
              @click="visible = !visible, isEdit = record.userId"
            >编辑
            </a-button>
          </a-col>
          <a-col>
            <a-popconfirm
              title="确定要删除吗？"
              @confirm="deleteUser(record.userId)"
            >
              <a-button
                type="danger"
                size="small"
                class="mr-10"
              >删除
              </a-button>
            </a-popconfirm>
          </a-col>
          <a-col>
            <a-button
              size="small"
              type="primary"
              @click="activeId = record.userId, isChangePassword = true"
            >重置密码
            </a-button>
          </a-col>
        </a-row>
      </div>
    </a-table>
    <!--添加用户-->
    <create-user
      v-if="visible"
      ref="createUser"
      :visible="visible"
      :is-edit="isEdit"
      @cancel="modalCancel"
      @create="modalCreate"
    />
    <change-password
      ref="changePassword"
      :visible="isChangePassword"
      @cancel="isChangePassword = false"
      @create="savePassword"
    />
  </div>
</template>

<script>
  import CreateUser from '@/views/SystemManage/UserManage/CreateUser'
  import { resetPasswordApi, userAddApi, userDeleteApi, userEditApi, userListApi } from '@/api/systemManage/userManageApi'
  import ChangePassword from '@/views/SystemManage/UserManage/ChangePassword'

  const column = [
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '姓名',
      dataIndex: 'realname'
    },
    // {
    //   title: '头像',
    //   dataIndex: 'avatar',
    //   scopedSlots: { customRender: 'avatar' }
    // },
    {
      title: '角色',
      dataIndex: 'roleIds',
      scopedSlots: { customRender: 'roles' }
    },
    {
      title: '手机',
      dataIndex: 'phone'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      wuserIdth: '20%',
      scopedSlots: { customRender: 'operation' }
    }
  ]
  export default {
    name: 'UserManage',
    components: {
      ChangePassword,
      CreateUser
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
        tableData: [],
        visible: false,
        isEdit: false,
        isChangePassword: false,
        activeId: ''
      }
    },
    mounted () {
      this.getUser()
    },
    methods: {
      getUser () {
        userListApi({
          pageSize: this.pages.pageSize,
          pageNum: this.pages.current,
          ...this.searchName
        }).then(res => {
          if (res.data.code === '200') {
            this.tableData = res.data.data
            this.pages.total = res.data.total
          }
        })
      },
      modalCancel () {
        this.visible = false
        this.isEdit = false
        this.$refs.createUser.form.resetFields()
      },
      modalCreate () {
        const form = this.$refs.createUser.form
        const saveFun = this.isEdit ? userEditApi : userAddApi
        form.validateFields((err, values) => {
          if (!err) {
            const data = values
            // data.password = ''
            if (this.isEdit) {
              data.userId = this.isEdit
            }
            saveFun(data).then(res => {
              if (res.data.code === '200') {
                this.$message.success(`新建成功`)
                this.getUser()
                form.resetFields()
                this.visible = false
                this.isEdit = false
              }
            })
          }
        })
      },
      savePassword () {
        this.$refs.changePassword.form.validateFields((err, val) => {
          if (!err) {
            resetPasswordApi({
              ...val,
              userId: this.activeId
            }).then(res => {
              if (res.data.code === '200') {
                this.isChangePassword = false
                this.$message.success(`修改成功`)
              }
            })
          }
        })
      },
      deleteUser (userId) {
        userDeleteApi({
          userId
        }).then(res => {
          if (res.data.code === '200') {
            this.$message.error(`删除成功`)
            this.getUser()
          }
        })
      },
      pageChange (pagination) {
        this.pages = {
          ...this.pages,
          ...pagination,
          pageNum: pagination.current
        }
        this.getUser()
      },
    }
  }
</script>

<style scoped>

</style>
