<!--xiolng-->
<!--CreateTimeRule-->
<!--2020/10/22-->
<!--16:39-->
<template>
  <div class="CreateTimeRule">
    <a-modal
      :visible="visible"
      title="新建、编辑"
      @cancel="$emit('cancel')"
      @ok="$emit('create')"
    >
      <a-form :form="form" :label-col="{span: 5}" :wrapper-col="{span: 16}">
        <a-form-item label="规则名称">
          <a-input
            placeholder="请输入规则名称"
            v-decorator="[
              `ruleName`,
              {
                rules: [{required: true, message: '请输入规则名称'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="1个月优惠">
          <a-input-number
            placeholder="请输入1个月优惠"
            v-decorator="[
              `ruleSale1`,
              {
                rules: [{required: true, message: '请输入1个月优惠'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="2个月优惠">
          <a-input-number
            placeholder="请输入2个月优惠"
            v-decorator="[
              `ruleSale2`,
              {
                rules: [{required: true, message: '请输入2个月优惠'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="3个月优惠">
          <a-input-number
            placeholder="请输入3个月优惠"
            v-decorator="[
              `ruleSale3`,
              {
                rules: [{required: true, message: '请输入3个月优惠'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="6个月优惠">
          <a-input-number
            placeholder="请输入6个月优惠"
            v-decorator="[
              `ruleSale6`,
              {
                rules: [{required: true, message: '请输入6个月优惠'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="1年优惠">
          <a-input-number
            placeholder="请输入1年优惠"
            v-decorator="[
              `ruleSale12`,
              {
                rules: [{required: true, message: '请输入1年优惠'}]
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

  export default {
    name: 'CreateTimeRule',
    components: {
      SelectTypeDrawer,
      UploadImgC
    },
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
  .CreateTimeRule {

  }
</style>
