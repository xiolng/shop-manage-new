<!--xiolng-->
<!--CreateTenantManage-->
<!--2020/10/23-->
<!--10:02-->
<template>
  <div class="mini-app">
    <a-modal
      :visible="visible"
      :title="form.getFieldValue('appid') ? '编辑小程序信息' : '新建小程序信息'"
      @cancel="$emit('cancel')"
      @ok="saveMiniApp"
    >
      <a-form :form="form" :label-col="{span: 6}" :wrapper-col="{span: 16}">
        <a-form-item label="appId">
          <a-input
            placeholder="请输入appId"
            v-decorator="[
              `appid`,
            ]"
          />
        </a-form-item>
        <a-form-item label="secret">
          <a-input
            placeholder="请输入secret"
            v-decorator="[
              `secret`,
            ]"
          />
        </a-form-item>
        <a-form-item label="aesKey">
          <a-input
            placeholder="请输入aesKey"
            v-decorator="[
              `aesKey`,
            ]"
          />
        </a-form-item>
        <a-form-item label="msgDataFormat">
          <a-input
            placeholder="请输入msgDataFormat"
            v-decorator="[
              `msgDataFormat`,
            ]"
          />
        </a-form-item>
        <a-form-item label="token">
          <a-input
            placeholder="请输入token"
            v-decorator="[
              `token`,
            ]"
          />
        </a-form-item>
        <a-form-item label="wxMiniappId">
          <a-input
            placeholder="请输入wxMiniappId"
            v-decorator="[
              `wxMiniappId`,
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import { getWxMiniappApi, saveWxMiniappApi, updateMiniappApi } from '@/api/TenantManageApi'

  export default {
    name: 'mini-app',
    props: {
      visible: Boolean,
      editId: String
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'form' }),
        isDetail: false
      }
    },
    mounted () {
      this.editId && this.getDetail()
    },
    methods: {
      getDetail () {
        getWxMiniappApi({ tenantId: this.editId }).then(res => {
          const defualtData = ['aesKey', 'appid', 'msgDataFormat', 'secret', 'tenantId', 'token', 'wxMiniappId']
          if (res.data.code === '200') {
            const { data } = res.data
            if (!data) {
              this.isDetail = true
            }
            Object.values(defualtData).map(v => {
              this.form.setFieldsValue({ [v]: data[v] || '' })
            })
          }
        })
      },
      saveMiniApp () {
        this.form.validateFields((err, val) => {
          if (!err) {
            (this.isDetail ? saveWxMiniappApi : updateMiniappApi)({
              ...val,
              tenantId: this.editId
            }).then(res => {
              if (res.data.code === '200') {
                this.isDetail = false
                this.$message.success(`保存成功`)
                this.form.resetFields()
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
  .mini-app {

  }
</style>
