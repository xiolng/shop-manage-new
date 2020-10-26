<!--xiolng-->
<!--ServiceManage-->
<!--2020/10/23-->
<!--10:13-->
<template>
  <div class="ServiceManage">
    <a-modal
      :visible="visible"
      title="开通服务"
      @cancel="$emit('cancel')"
      @ok="$emit('create')"
    >
      <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 16}">
        <a-form-item label="服务">
          <a-radio-group
            v-decorator="[
              'serviceName',
              {initialValue: 'b'}
              ]"
          >
            <a-radio-button value="a">
              基础版
            </a-radio-button>
            <a-radio-button value="b">
              升级版
            </a-radio-button>
            <a-radio-button value="c">
              尊贵版
            </a-radio-button>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="人数">
          <a-radio-group
            v-decorator="[
              'servicePerson',
              {initialValue: '5'}
              ]"
          >
            <a-radio value="3">
              3人
            </a-radio>
            <a-radio value="5">
              5人
            </a-radio>
            <a-radio value="10">
              10人
            </a-radio>
            <a-radio value="15">
              15人
            </a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="时长">
          <a-radio-group
            v-decorator="[
              'serviceTime',
              {initialValue: '6'}
              ]"
          >
            <a-radio value="1">
              1个月
            </a-radio>
            <a-radio value="2">
              2个月
            </a-radio>
            <a-radio value="3">
              3个月
            </a-radio>
            <a-radio value="6">
              6个月
            </a-radio>
            <a-radio value="12">
              1年
            </a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="价格">
          <div style="color: #dd4a68">
            ￥4000 元
          </div>
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
    name: 'ServiceManage',
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
  .ServiceManage {

  }
</style>
