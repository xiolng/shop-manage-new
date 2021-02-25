<!--CreateUser-->
<template>
  <div class="create-user">
    <a-modal
      :visible="visible"
      :title="isEdit ? '编辑用户':'新建用户'"
      @cancel="$emit('cancel')"
      @ok="$emit('create')"
    >
      <a-form
        :form="form"
        :label-col="{span: 4}"
        :wrapper-col="{span: 16}"
      >
        <a-form-item label="用户名">
          <a-input
            placeholder="请输入用户名"
            autocomplete="current-username"
            v-decorator="[
              `username`,
              {
                rules: [{required: true, message: '请输入用户名'}]
              }
            ]"
          />
        </a-form-item>
        <!--<a-form-item label="手机号">-->
        <!--  <a-input-->
        <!--    placeholder="请输入手机号"-->
        <!--    autocomplete="current-username"-->
        <!--    v-decorator="-->
        <!--    [-->
        <!--      `phone`,-->
        <!--      {-->
        <!--        rules: [-->
        <!--          {required: true, message: '请输入手机号'},-->
        <!--          {validator: isPhone, message: '请输入正确手机号码'}-->
        <!--        ]-->
        <!--      }-->
        <!--    ]"-->
        <!--  />-->
        <!--</a-form-item>-->
        <!--<a-form-item label="真实姓名">-->
        <!--  <a-input-->
        <!--    placeholder="请输入真实姓名"-->
        <!--    autocomplete="current-username"-->
        <!--    v-decorator="[-->
        <!--      `realname`,-->
        <!--    ]"-->
        <!--  />-->
        <!--</a-form-item>-->
        <!--<a-form-item label="头像">-->
        <!--  <upload-img-c-->
        <!--    @imgName="value => {formData.avatar = value; form.setFieldsValue({avatar: value})}"-->
        <!--    :default-data="formData.avatar"-->
        <!--    v-decorator="[-->
        <!--      `avatar`,-->
        <!--      {-->
        <!--        initialValue: formData.avatar || ''-->
        <!--      }-->
        <!--    ]"-->
        <!--  />-->
        <!--</a-form-item>-->
        <a-form-item label="密码" v-if="!isEdit">
          <a-input-password
            placeholder="请输入密码"
            autocomplete="current-password"
            v-decorator="[
              `password`,
              {
                rules: [{required: true, message: '请输入密码'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="角色">
          <a-select
            mode="multiple"
            placeholder="请选择角色"
            v-decorator="[
              `roleIds`,
              {
                rules: [{type: 'array', required: true, message: '请选择角色'}]
              }
            ]"
          >
            <template v-if="roleList.length">
              <a-select-option
                v-for="item in roleList"
                :key="item.roleId"
                :value="item.roleId"
              >{{item.roleName}}
              </a-select-option>
            </template>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import { usereDetailApi } from '@/api/systemManage/userManageApi'
  // import UploadImgC from '@/components/UploadImgC/UploadImgC'
  import { roleAllListlApi } from '@/api/systemManage/roleManageApi'
  import { validPhone } from '@/utils'

  export default {
    name: 'CreateUser',
    // components: { UploadImgC },
    props: {
      visible: Boolean,
      isEdit: [Boolean, String, Number]
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'form' }),
        roleList: [],
        formData: {
          phone: '',
          realname: '',
          roleIds: [],
          username: ''
        },
        validPhone
      }
    },
    mounted () {
      this.getRoleList()
      this.isEdit && this.getDetail()
    },
    methods: {
      getRoleList () {
        roleAllListlApi().then(res => {
          if (res.data.code === '200') {
            this.roleList = res.data.data
          }
        })
      },
      getDetail () {
        usereDetailApi({
          userId: this.isEdit
        }).then(res => {
          console.log(res)
          const { data, code } = res.data
          if (code === '200') {
            Object.keys(this.formData).map(v => {
              this.formData[v] = data[v]
            })
            data.roles && (this.formData.roleIds = data.roles.map(v => v.roleId))
            this.form.setFieldsValue(this.formData)
          }
        })
      },
      isPhone () {
        return validPhone(this.form.getFieldValue('phone'))
      }
    }
  }
</script>

<style scoped>

</style>
