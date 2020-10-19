<!--xiolng-->
<!--ServiceArr-->
<!--2020/10/15-->
<!--16:49-->
<template>
  <div class="service-arr">
    <a-form :form="form" layout="inline">
      <a-card
        v-for="(k, index) in form.getFieldValue('keys')"
        :key="k"
        :title="`服务类型-${(index + 1).toString()}`"
        class="mb-10"
      >
        <div slot="extra">
          <a-button
            type="danger"
            size="small"
            shape="circle"
            icon="minus"
            @click="remove(k)"
          >
          </a-button>
        </div>
        <a-form-item label="人数">
          <a-input-number
            placeholder="请输入人数"
            v-decorator="[
              `peopleNum[${k}]`,
              {
                initialValue: peopleNum[k],
                rules: [{required: true, message: '请输入人数'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="服务时长">
          <a-input-number
            placeholder="请输入服务时长"
            v-decorator="[
              `serviceDay[${k}]`,
              {
                initialValue: serviceDay[k],
                rules: [{required: true, message: '请输入服务时长'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="时长描述">
          <a-textarea
            placeholder="请输入时长描述"
            v-decorator="[
              `serviceLimitDetail[${k}]`,
              {
                initialValue: serviceLimitDetail[k],
                rules: [{required: true, message: '请输入时长描述'}]
              }
            ]"
            :auto-size="{minRows: 1, maxRows: 5}"
          />
        </a-form-item>
        <a-form-item label="价格">
          <a-input-number
            placeholder="请输入价格"
            v-decorator="[
              `servicePrice[${k}]`,
              {
                initialValue: servicePrice[k],
                rules: [{required: true, message: '请输入价格'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="系统服务id">
          <a-input
            placeholder="请输入系统服务id"
            v-decorator="[
              `systemServiceId[${k}]`,
              {
                initialValue: systemServiceId[k],
                rules: [{required: true, message: '请输入系统服务id'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="系统服务限制id"
          extra="多个id用逗号分隔（1,2,3）"
        >
          <a-input
            placeholder="请输入系统服务限制id"
            v-decorator="[
              `systemServiceLimitId[${k}]`,
              {
                initialValue: systemServiceLimitId[k],
                rules: [{required: true, message: '请输入系统服务限制id'}]
              }
            ]"
          />
        </a-form-item>
      </a-card>
    </a-form>
    <div class="mt-20 mb-20">
      <a-button
        type="primary"
        @click="add"
      >添加
      </a-button>
    </div>
  </div>
</template>

<script>
  let id = 0
  export default {
    name: 'ServiceArr',
    props: {
      limitList: [Array, Object]
    },
    data () {
      return {
        serviceDay: [],
        peopleNum: [],
        serviceLimitDetail: [],
        servicePrice: [],
        systemServiceId: [],
        systemServiceLimitId: [],
      }
    },
    beforeCreate () {
      this.form = this.$form.createForm(this, { name: 'dynamic_form_item' })
      this.form.getFieldDecorator('keys', {
        initialValue: [],
        preserve: true
      })
    },
    created () {
      !this.limitList && this.add()
    },
    watch: {
      limitList (val, oldVal) {
        const { form } = this
        console.log(val, oldVal)
        val.map((v, index) => {
          const keys = form.getFieldValue('keys')
          const nextKeys = keys.concat(id++)
          this.serviceDay.push(v.serviceDay)
          this.peopleNum.push(v.peopleNum)
          this.serviceLimitDetail.push(v.serviceLimitDetail)
          this.servicePrice.push(v.servicePrice)
          this.systemServiceId.push(v.systemServiceId)
          this.systemServiceLimitId.push(v.systemServiceLimitId)
          form.setFieldsValue({
            keys: nextKeys,
            serviceDay: this.serviceDay,
            peopleNum: this.peopleNum,
            serviceLimitDetail: this.serviceLimitDetail,
            servicePrice: this.servicePrice,
            systemServiceId: this.systemServiceId,
            systemServiceLimitId: this.systemServiceLimitId,
          })
        })
      }
    },
    methods: {
      remove (k) {
        const { form } = this
        // can use data-binding to get
        const keys = form.getFieldValue('keys')
        // We need at least one passenger
        if (keys.length === 1) {
          return
        }

        // can use data-binding to set
        form.setFieldsValue({
          keys: keys.filter(key => key !== k),
        })
      },

      add () {
        const { form } = this
        // can use data-binding to get
        const keys = form.getFieldValue('keys')
        const nextKeys = keys.concat(id++)
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
          keys: nextKeys,
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .service-arr {
    margin-bottom: 20px;

    .ant-input {
      width: 100px;
    }
  }
</style>
