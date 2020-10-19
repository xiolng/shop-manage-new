<!--xiolng-->
<!--EditService-->
<!--2020/10/15-->
<!--15:19-->
<template>
  <div class="EditService">
    <a-modal
      :visible="visible"
      :title="isEdit ? '编辑': '新建'"
      @cancel="$emit('cancel')"
      @ok="$emit('create')"
    >
      <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 16}">
        <a-form-item label="服务名称">
          <a-input
            placeholder="请输入服务名称"
            v-decorator="[
              `serviceName`,
              {
                rules: [{required: true, message: '请输入服务名称'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="服务详情">
          <service-arr />
          <a-button type="primary">添加</a-button>
        </a-form-item>
        <a-form-item label="服务描述">
          <a-textarea
            placeholder="请输入服务描述"
            :auto-size="{minRows: 3, maxRows: 5}"
            v-decorator="[
              `serviceDetail`,
              {
                rules: [{required: true, message: '请输入服务描述'}]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <select-type-drawer
      v-if="showDrawer"
      :func="func"
      :visible="showDrawer"
      :select-list="selectList"
      @cancel="showDrawer = false"
      @create="setPool"
      check-type="radio"
    />
  </div>
</template>

<script>
  import UploadImgC from '@/components/UploadImgC/UploadImgC'
  import { BannerGetByIdApi } from '@/api/BannerApi'
  import { ComboGetlistIdNameApi } from '@/api/ComboManageApi'
  import { ShopGetlistIdNameApi } from '@/api/ShopManageApi'
  import SelectTypeDrawer from '@/components/SelectTypeDrawer'
  import ServiceArr from '@/views/SystemService/ServiceArr'

  export default {
    name: 'EditService',
    components: {
      ServiceArr,
      SelectTypeDrawer,
      UploadImgC
    },
    props: {
      visible: Boolean,
      isEdit: Boolean
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
      console.log(1212121212, this.isEdit)
      this.isEdit && this.getDetail()
    },
    methods: {
      getDetail () {
        BannerGetByIdApi({ id: this.editId }).then(res => {
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
  .EditService {

  }
</style>
