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
            type="link"
            size="small"
            shape="circle"
            icon="close"
            @click="remove(k)"
          >
          </a-button>
        </div>
        <a-form-item label="人数">
          <a-input-number
            placeholder="请输入人数"
            :min="1"
            v-decorator="[
              `personCount[${k}]`,
              {
                initialValue: personCount[k],
                rules: [{required: true, message: '请输入人数'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="价格">
          <a-input-number
            placeholder="请输入价格"
            :min="1"
            v-decorator="[
              `price[${k}]`,
              {
                initialValue: price[k],
                rules: [{required: true, message: '请输入价格'}]
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
    name: 'ServiceArr',
    props: {
      limitList: [Array, Object]
    },
    data () {
      return {
        price: [],
        personCount: [],
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
          id = 1
          val.length && val.map((v, index) => {
            const keys = form.getFieldValue('keys')
            const nextKeys = index >= 1 ? keys.concat(id++) : keys
            vm.price[index] = v.price
            vm.personCount[index] = v.personCount
            form.setFieldsValue({
              keys: nextKeys,
            })
          })
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
  .service-arr {
    margin-bottom: 20px;

    .ant-input {
      width: 100px;
    }
  }
</style>
