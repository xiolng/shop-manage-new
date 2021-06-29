<!--xiolng-->
<!--CreateMarket-->
<!--2021/6/23-->
<!--10:56-->
<template>
  <div class="CreateMarket">
    <a-modal
      :visible="visible"
      title="新建、编辑"
      @cancel="form.resetFields(),$emit('cancel')"
      @ok="saveMarketing"
    >
      <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 16}">
        </a-form-item>
        <a-form-item label="图标">
          <upload-img-c
            @imgName="value => {form.setFieldsValue({icon: value})}"
            :default-data="form.getFieldValue('icon') || ''"
            v-decorator="[
              `icon`,
              {
                rules: [{required: true, message: '请上传图标'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="营销名称">
          <a-input
            placeholder="请输入营销名称"
            v-decorator="[
              `marketingName`,
              {
                rules: [{required: true, message: '请输入营销名称'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="营销路径">
          <a-input
            placeholder="请输入营销路径"
            v-decorator="[
              `marketingUrl`,
              {
                rules: [{required: true, message: '请输入营销路径'}]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import UploadImgC from '@/components/UploadImgC/UploadImgC'
  import { getMarketingApi, saveMarketingApi, updateMarketingApi } from '@/api/MarketingManageApi'

  export default {
    name: 'CreateMarket',
    components: {
      UploadImgC
    },
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
      this.editId && this.getDetail()
    },
    methods: {
      getDetail () {
        getMarketingApi({ marketingId: this.editId }).then(res => {
          const defualtData = ['icon', 'marketingName', 'marketingUrl', 'marketingStatus']
          if (res.data.code === '200') {
            const { data } = res.data
            Object.keys(defualtData).map(v => {
              this.form.setFieldsValue({ [defualtData[v]]: data[defualtData[v]] })
            })
          }
        })
      },
      saveMarketing () {
        this.form.validateFields((err, val) => {
          if (!err) {
            const func = this.editId ? updateMarketingApi : saveMarketingApi
            func({
              [this.editId && 'marketingId']: this.editId || '',
              ...val
            }).then(res => {
              this.form.resetFields()
              if (res.data.code == '200') {
                this.$message.success(`保存成功`)
                this.$emit('create')
              } else {
                this.$message.error(res.data.msg)
                this.$emit('cancel')
              }
            })
          }
        })
      }
    },
  }
</script>

<style scoped>
  .CreateMarket {

  }
</style>
