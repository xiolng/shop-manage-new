<!--xiolng-->
<!--CreateTenantManage-->
<!--2020/10/23-->
<!--10:02-->
<template>
  <div class="CreateTenantManage">
    <a-modal
      :visible="visible"
      :title="editId ? '编辑租户' : '新建租户'"
      @cancel="$emit('cancel')"
      @ok="$emit('create')"
    >
      <a-form :form="form" :label-col="{span: 6}" :wrapper-col="{span: 16}">
        <a-form-item label="租户名称">
          <a-input
            placeholder="请输入租户名称"
            v-decorator="[
              `tenantName`,
              {
                rules: [{required: true, message: '请输入租户名称'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="租户类别">
          <a-radio-group
            v-decorator="[
              `tenantGategory`,
              {
                rules: [
                {required: true, message: '请选择租户类别'}
              ]
              }
            ]"
          >
            <a-radio :value="0">超市</a-radio>
            <a-radio :value="1">外卖</a-radio>
            <a-radio :value="2">饭店</a-radio>
            <a-radio :value="3">电商</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="公众号" extra="是否启用公众号">
          <a-switch
            checked-children="是"
            un-checked-children="否"
            v-decorator="[
              `officialAccount`,
              {
                valuePropName: 'checked',
                rules: [
                {required: true, message: '请选择是否启用公众号'}
              ]
              }
            ]"
          ></a-switch>
        </a-form-item>
        <template v-if="!editId">
          <a-form-item
            label="密码"
            extra="请输入8-32位大小写英文字母+数字"
          >
            <a-input-password
              placeholder="请输入密码"
              v-decorator="[
              `password`,
              {
                rules: [
                  {required: true, message: '请输入密码'},
                  {
                    validator: checkPassword
                  }
                ]
              }
            ]"
            />
          </a-form-item>
        </template>
        <a-form-item label="真实姓名">
          <a-input
            placeholder="请输入真实姓名"
            v-decorator="[
              `realName`,
              {
                rules: [{required: true, message: '请输入真实姓名'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="联系电话">
          <a-input
            placeholder="请输入联系电话"
            v-decorator="[
              `phone`,
              {
                rules: [{required: true, message: '请输入联系电话'}]
              }
            ]"
          />
        </a-form-item>
        <template v-if="!editId">
          <a-form-item label="充值时长">
            <a-input-number
              placeholder="请输入充值时长"
              v-decorator="[
              `rechargeDay`,
              {
                initialValue: undefined,
                rules: [{required: true, message: '请输入充值时长'}]
              }
            ]"
              :min="1"
            /> 月
          </a-form-item>
          <a-form-item label="充值价格">
            <a-input-number
              placeholder="请输入充值价格"
              v-decorator="[
              `rechargePrice`,
              {
                initialValue: undefined,
                rules: [{required: true, message: '请输入充值价格'}]
              }
            ]"
              :min="1"
            /> 元
          </a-form-item>
        </template>
        <!--<a-form-item label="租户编码">-->
        <!--  <a-input-->
        <!--    placeholder="请输入租户编码"-->
        <!--    v-decorator="[-->
        <!--      `tenantCode`,-->
        <!--      {-->
        <!--        rules: [{required: true, message: '请输入租户编码'}]-->
        <!--      }-->
        <!--    ]"-->
        <!--  />-->
        <!--</a-form-item>-->
        <!--<a-form-item label="租户状态">-->
        <!--  <a-switch-->
        <!--    placeholder="请输入租户状态"-->
        <!--    v-decorator="[-->
        <!--      `tenantStatus`,-->
        <!--      {-->
        <!--        initialValue: true,-->
        <!--        valuePropName: 'checked'-->
        <!--      }-->
        <!--    ]"-->
        <!--  />-->
        <!--</a-form-item>-->
        <a-form-item label="租户描述">
          <a-textarea
            min="2"
            max="4"
            placeholder="请输入租户描述"
            v-decorator="[
              `tenantDetail`
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import { tenanteDetailApi } from '@/api/TenantManageApi'

  export default {
    name: 'CreateTenantManage',
    props: {
      visible: Boolean,
      editId: String
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'form' }),
        shopList: [],
        poolList: [],
        showDrawer: false,
        func: null,
        selectList: []
      }
    },
    mounted () {
      this.editId && this.getDetail()
    },
    methods: {
      getDetail () {
        tenanteDetailApi({ tenantId: this.editId }).then(res => {
          const defualtData = ['password', 'phone', 'realName', 'tenantDetail', 'tenantName', 'tenantStatus', 'username', 'rechargeDay', 'rechargePrice', 'officialAccount', 'tenantGategory']
          if (res.data.code === '200') {
            const { data } = res.data
            Object.values(defualtData).map(v => {
              if (v === 'tenantStatus' || v === 'officialAccount') {
                this.form.setFieldsValue({ [v]: !!data[v] })
              } else {
                this.form.setFieldsValue({ [v]: data[v] })
              }
            })
          }
        })
      },
      checkPassword (rule, value, callback) {
        const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/
        if (!value) {
          callback()
          return
        }
        if (value.length < 8 || !passwordReg.test(value)) {
          // eslint-disable-next-line standard/no-callback-literal
          callback('请输入正确格式密码')
          return
        }
        callback()
      },
    },
  }
</script>

<style scoped>
  .CreateTenantManage {

  }
</style>
