<!--xiolng-->
<!--ServiceManage-->
<!--2020/10/23-->
<!--10:13-->
<template>
  <div class="ServiceManage">
    <a-modal
      :visible="visible"
      title="支付配置"
      @cancel="$emit('cancel')"
      @ok="saveForm"
    >
      <a-form :form="form" :label-col="{span: 6}" :wrapper-col="{span: 16}">
        <a-form-item label="微信小程序appid">
          <a-input
            v-decorator="[
              'appId',
              {initialValue: undefined}
              ]"
            placeholder="请输入微信小程序appid"
          />
        </a-form-item>

        <a-form-item label="微信支付商户号">
          <a-input
            v-decorator="[
              'mchId',
              {initialValue: undefined}
              ]"
            placeholder="请输入微信支付商户号"
          />
        </a-form-item>

        <a-form-item label="微信支付商户密钥">
          <a-input
            v-decorator="[
              'mchKey',
              {initialValue: undefined}
              ]"
            placeholder="请输入微信支付商户密钥"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import { paySettingApi, savePaySettingApi } from '@/api/TenantManageApi'

  export default {
    name: 'ServiceManage',
    props: {
      visible: Boolean,
      editId: String
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'form' }),
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      getList () {
        paySettingApi({
          tenantId: this.editId
        }).then(res => {
          const { data, code } = res.data
          const item = ['appId', 'mchId', 'mchKey']
          if (data && code === '200') {
            item.map(v => {
              this.form.setFieldsValue({
                [v]: data[v]
              })
            })
          }
        })
      },
      saveForm () {
        this.form.validateFields((err, val) => {
          if (!err) {
            savePaySettingApi({
              ...val,
              tenantId: this.editId
            }).then(res => {
              if (res.data.code === '200') {
                this.$message.success(`支付配置成功`)
                this.$emit('create')
              }
            })
          }
        })

      }
    },
    computed: {
      allPrice () {
        return this.specData.price * (this.subData.discountRate / 100)
      }
    }
  }
</script>

<style scoped>
  .ServiceManage {

  }
</style>
