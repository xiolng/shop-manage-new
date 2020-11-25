<!--xiolng-->
<!--ServiceArr-->
<!--2020/10/15-->
<!--16:49-->
<template>
  <div class="service-discounts">
    <a-form :form="form" layout="inline">
      <a-card
        v-for="(k, index) in form.getFieldValue('keys')"
        :key="k"
        :title="`服务折扣-${(index + 1).toString()}`"
        class="mb-10"
      >
        <div slot="extra">
          <a-button
            type="link"
            size="small"
            shape="circle"
            icon="close"
            @click="remove(k)"
          >
          </a-button>
        </div>
        <a-form-item label="月数">
          <a-input-number
            placeholder="请输入月数"
            :min="1"
            v-decorator="[
              `monthCount[${k}]`,
              {
                initialValue: monthCount[k],
                rules: [{required: true, message: '请输入月数'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="折扣比率">
          <a-input-number
            placeholder="请输入折扣比率"
            :min="1"
            v-decorator="[
              `discountRate[${k}]`,
              {
                initialValue: discountRate[k],
                rules: [{required: true, message: '请输入折扣比率'}]
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
  let id = 1
  export default {
    name: 'ServiceDiscounts',
    props: {
      limitList: [Array, Object]
    },
    data () {
      return {
        discountRate: [],
        monthCount: [],
      }
    },
    beforeCreate () {
      this.form = this.$form.createForm(this, { name: 'dynamic_form_item' })
      this.form.getFieldDecorator('keys', {
        initialValue: [0],
        preserve: true
      })
    },
    mounted () {
      const vm = this
      const { form } = this
      this.$watch(
        'limitList', function (val, oldVal) {
          if (!this.limitList.length) {
            console.log(val, oldVal, val.length)
            val.length && val.map((v, index) => {
              const keys = form.getFieldValue('keys')
              const nextKeys = keys.concat(id++)
              vm.discountRate[index] = v.discountRate
              vm.monthCount[index] = v.monthCount
              form.setFieldsValue({
                keys: nextKeys,
                discountRate: vm.discountRate,
                monthCount: vm.monthCount,
              })
            })
          }
        }, {
          deep: true,
          immediate: true
        }
      )
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
  .service-discounts {
    margin-bottom: 20px;

    .ant-input {
      width: 100px;
    }
  }
</style>
