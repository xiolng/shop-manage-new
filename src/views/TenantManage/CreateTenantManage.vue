<!--xiolng-->
<!--CreateTenantManage-->
<!--2020/10/23-->
<!--10:02-->
<template>
  <div class="CreateTenantManage">
    <a-modal
      :visible="visible"
      :title="editId ? '编辑' : '新建'"
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
        <a-form-item label="主用户名称">
          <a-input
            placeholder="请输入主用户名称"
            v-decorator="[
              `mainUser`,
              {
                rules: [{required: true, message: '请输入主用户名称'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="主用户联系电话">
          <a-input
            placeholder="请输入主用户联系电话"
            v-decorator="[
              `mainUserPhone`,
              {
                rules: [{required: true, message: '请输入主用户联系电话'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="租户状态">
          <a-switch
            placeholder="请输入租户状态"
            v-decorator="[
              `tenantStatus`,
              {
                rules: [{required: true, message: '请输入租户状态'}]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import { BannerGetByIdApi } from '@/api/BannerApi'
  import { ComboGetlistIdNameApi } from '@/api/ComboManageApi'
  import { ShopGetlistIdNameApi } from '@/api/ShopManageApi'
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
        tenanteDetailApi({ id: this.editId }).then(res => {
          const defualtData = ['imageUrl', 'type', 'relationId', 'imageOrder']
          if (res.data.code === '200') {
            const { data } = res.data
            Object.keys(defualtData).map(v => {
              this.form.setFieldsValue({ [defualtData[v]]: data[defualtData[v]] })
            })
            this.shopList = [{
              id: data.relationId,
              name: data.relationName
            }]
          }
        })
      },
      // 获取号池
      setSelect () {
        const type = this.form.getFieldValue('type')
        this.showDrawer = true
        this.selectList = [this.form.getFieldValue('relationId') || '']
        this.func = type === '0' ? ComboGetlistIdNameApi : ShopGetlistIdNameApi
      },
      setPool ({ item }) {
        this.shopList = item
        this.form.setFieldsValue({ relationId: item[0].id })
        this.showDrawer = false
        this.$forceUpdate()
      }
    },
  }
</script>

<style scoped>
  .CreateTenantManage {

  }
</style>
