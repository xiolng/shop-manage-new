<!--xiolng-->
<!--ChangeMarketing-->
<!--2021/6/23-->
<!--14:06-->
<template>
  <div class="ChangeMarketing">
    <a-modal
      :visible="visible"
      title="关联营销工具"
      @cancel="form.resetFields(), $emit('cancel')"
      @ok="saveMarketing"
    >
      <a-form :form="form" :label-col="{span: 6}" :wrapper-col="{span: 15}">
        <a-form-item label="关联营销工具">
          <a-select
            placeholder="请选择营销工具"
            mode="multiple"
            v-decorator="[
              `marketingIds`,
              {
                rules: [{required: true, message: '请选择营销工具'}]
              }
            ]"
          >
            <template v-if="marketingList.length">
              <a-select-option
                v-for="item in marketingList"
                :key="item.marketingId"
                :value="item.marketingId"
              >
                {{item.marketingName}}
              </a-select-option>
            </template>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

  import { saveTenantMarketingApi, tenantMarketingListApi, updateTenantMarketingApi } from '@/api/TenantManageApi'
  import { marketingListApi } from '@/api/MarketingManageApi'

  export default {
    name: 'ChangeMarketing',
    props: {
      visible: Boolean,
      editId: String
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'form' }),
        marketingList: [],
        defaultData: []
      }
    },
    mounted () {
      this.getMarketing()
      // this.editId && this.getDetail()
    },
    methods: {
      getDetail () {
        tenantMarketingListApi({ tenantId: this.editId }).then(res => {
          const defualtData = ['marketingIds']
          if (res.data.code === '200') {
            const { data } = res.data
            this.defaultData = data
            this.form.setFieldsValue({ marketingIds: data })
            // Object.keys(defualtData).map(v => {
            //   this.form.setFieldsValue({ [defualtData[v]]: data[defualtData[v]] })
            // })
          }
        })
      },
      getMarketing () {
        marketingListApi().then(res => {
          if (res.data.code == '200') {
            this.marketingList = res.data.data
            this.editId && this.getDetail()
          }
        })
      },
      saveMarketing () {
        this.form.validateFields((err, val) => {
          if (!err) {
            const func = this.defaultData && this.defaultData.length ? updateTenantMarketingApi : saveTenantMarketingApi
            func({
              ...val,
              tenantId: this.editId
            }).then(res => {
              if (res.data.code == '200') {
                this.$message.success('设置成功')
                this.$emit('create')
              }
            })
          }
        })
      }
    },
  }
</script>

<style scoped>
  .ChangeMarketing {

  }
</style>
