<!--xiolng-->
<!--RuleArr-->
<!--2020/10/29-->
<!--15:16-->
<template>
  <div class="rule-arr">
    <div class="form-box">
      <a-form :form="form" layout="inline">
        <a-card
          v-for="(k, index) in form.getFieldValue('keys')"
          :key="k"
          :title="`折扣管理-${(index + 1).toString()}`"
          class="mb-10"
          :head-style="{padding: '0 10px', minHeight: '30px'}"
          :body-style="{padding: '10px'}"
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
          <a-form-item label="数量">
            <a-input-number
              placeholder="请输入数量"
              v-decorator="[
              `peopleNum[${k}]`,
              {
                initialValue: peopleNum[k],
                rules: [{required: true, message: '请输入数量'}]
              }
            ]"
            />
          </a-form-item>
          <a-form-item label="折扣比率">
            <a-input-number
              placeholder="请输入折扣比率"
              v-decorator="[
              `servicePrice[${k}]`,
              {
                initialValue: servicePrice[k],
                rules: [{required: true, message: '请输入折扣比率'}]
              }
            ]"
            />
          </a-form-item>
        </a-card>
      </a-form>
    </div>
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
    name: 'RuleArr',
    props: {
      limitList: [Array, Object]
    },
    data () {
      return {
        servicePrice: [],
        peopleNum: [],
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
          if (!vm.limitList.length) {
            console.log(val, oldVal, val.length)
            val.length && val.map((v, index) => {
              const keys = form.getFieldValue('keys')
              const nextKeys = keys.concat(id++)
              vm.servicePrice[index] = v.servicePrice
              vm.peopleNum[index] = v.peopleNum
              form.setFieldsValue({
                keys: nextKeys,
                servicePrice: vm.servicePrice,
                peopleNum: vm.peopleNum,
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
  .rule-arr {
    .form-box {
      max-height: 310px;
      overflow: hidden;
      overflow-y: auto;
    }

    /deep/ .ant-card-head-title {
      padding: 4px;
    }

    /deep/ .ant-card-extra {
      padding: 4px;
    }
  }
</style>
