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
      @ok="saveForm"
    >
      <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 16}">
        <a-form-item label="服务">
          <a-radio-group
            v-decorator="[
              'serviceName',
              {initialValue: 'b'}
              ]"
          >
            <a-radio-button
              v-for="item in serviceList"
              :key="item.systemServiceId"
              :value="item.systemServiceId"
              @click="selectService = item"
            >
              {{item.serviceName}}
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
            <a-radio
              v-for="item in selectService.specList"
              :key="item.systemServiceSpecId"
              :value="item.systemServiceSpecId"
              @click="specData = item"
            >
              {{item.personCount}}人
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
            <a-radio
              v-for="item in selectService.subList"
              :key="item.monthCount"
              :value="item.monthCount"
              @click="subData = item"
            >
              {{item.monthCount}}月
            </a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="价格">
          <div style="color: #dd4a68">
            ￥{{allPrice}} 元
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import { getSystemServiceApi, openTenantSystemServiceApi } from '@/api/TenantManageApi'

  export default {
    name: 'ServiceManage',
    props: {
      visible: Boolean,
      editId: String
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'form' }),
        serviceList: [],
        selectService: {
          specList: [],
          subList: []
        },
        specData: {},
        subData: {}
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      getList () {
        getSystemServiceApi().then(res => {
          const { data, code } = res.data
          if (data && code === '200') {
            const serviceData = data[0]
            this.serviceList = res.data.data
            this.selectService = serviceData
            this.specData = serviceData.specList[0]
            this.subData = serviceData.subList[0]
            this.form.setFieldsValue({
              serviceName: this.serviceList[0].systemServiceId,
              servicePerson: serviceData.specList[0].systemServiceSpecId,
              serviceTime: serviceData.subList[0].monthCount
            })
          }
        })
      },
      saveForm () {
        openTenantSystemServiceApi({
          systemServiceDiscountId: this.selectService.systemServiceDiscountId,
          systemServiceDiscountSubId: this.subData.systemServiceDiscountSubId,
          systemServiceId: this.selectService.systemServiceId,
          systemServiceSpecId: this.specData.systemServiceSpecId,
          tenantId: this.editId
        }).then(res => {
          if (res.data.code === '200') {
            this.$message.success(`开通成功`)
            this.$emit('create')
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
