<!--xiolng-->
<!--RechargeComp-->
<!--2021/2/26-->
<!--10:49-->
<template>
  <div class="RechargeComp">
    <a-modal
      :visible="visible"
      title="充值"
      @cancel="$emit('cancel')"
      @ok="saveRecharge"
    >
      <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 16}">
        <a-form-item label="租户名称" style="margin-bottom: 0;">
          <div>{{detail.tenantName}}</div>
        </a-form-item>
        <a-form-item label="联系人" style="margin-bottom: 0;">
          <div>{{detail.realName}}</div>
        </a-form-item>
        <a-form-item label="联系电话" style="margin-bottom: 0;">
          <div>{{detail.phone}}</div>
        </a-form-item>
        <a-form-item label="租户编码" style="margin-bottom: 0;">
          <div>{{detail.tenantCode}}</div>
        </a-form-item>
        <a-form-item label="充值时长">
          <a-input-number
            placeholder="请输入充值时长"
            v-decorator="[
              `rechargeDay`,
              {
                rules: [{required: true, message: `请输入充值时长`}]
              }
            ]"
          />
          天
        </a-form-item>
        <a-form-item label="充值价格">
          <a-input-number
            placeholder="请输入充值价格"
            v-decorator="[
              `rechargePrice`,
              {
                rules: [{required: true, message: `请输入充值价格`}]
              }
            ]"
          />
          元
        </a-form-item>
        <a-form-item label="充值描述" style="margin-bottom: 0;">
          <a-textarea
            :min="3"
            :max="5"
            placeholder="请输入充值描述"
            v-decorator="[
              `rechargeDetail`
            ]"
          />
        </a-form-item>
        <a-form-item label="租户描述">
          <div>{{detail.tenantDetail}}</div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

  import { rechargeApi, rechargeLogDetailApi } from '@/api/TenantManageApi'

  export default {
    name: 'RechargeComp',
    props: {
      visible: Boolean,
      editId: String
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'form' }),
        detail: {
          phone: '',
          realName: '',
          tenantCode: '',
          tenantDetail: '',
          tenantId: '',
          tenantName: ''
        }
      }
    },
    mounted () {
      this.editId && this.getDetail()
    },
    methods: {
      getDetail () {
        rechargeLogDetailApi({ tenantId: this.editId }).then(res => {
          if (res.data.code === '200') {
            const { data } = res.data
            this.detail = data
          }
        })
      },
      /**
       * 充值
       * @param id
       */
      saveRecharge () {
        this.form.validateFields((err, val) => {
          if (!err) {
            console.log(val)
            rechargeApi({
              ...val,
              tenantId: this.editId
            }).then(res => {
              const { code } = res.data
              if (code === '200') {
                this.$notification.success({
                  message: '充值成功',
                  description: h => {
                    return h('div', {}, [
                      h('div', {}, `租户名称：${this.detail.tenantName}`),
                      h('div', {}, `联系人：${this.detail.realName}`),
                      h('div', {}, `租户编号：${this.detail.tenantCode}`),
                      h('div', {}, `充值时长：${val.rechargeDay} 月`),
                      h('div', {}, `充值价格：${val.rechargePrice} 元`),
                    ])
                  },
                  duration: 2
                })
                this.form.resetFields()
                this.$emit('create')
              }
            })
          }
        })
      },
    },
  }
</script>

<style scoped>
  .RechargeComp {
    .no-bottom{
      margin-bottom: 0;
    }
  }
</style>
