<!--xiolng-->
<!--CreateTimeRule-->
<!--2020/10/22-->
<!--16:39-->
<template>
  <div class="CreateTimeRule">
    <a-modal
      :visible="visible"
      title="新建、编辑"
      @cancel="$emit('cancel'), $refs.ruleArr.form.resetFields()"
      @ok="$emit('create')"
    >
      <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 20}">
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
        <a-form-item label="规则描述">
          <a-textarea
            :auto-size="{minRows: 2, maxRows: 4}"
            placeholder="请输入规则描述"
            v-decorator="[
              `ruleName`,
              {
                rules: [{required: true, message: '请输入规则描述'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="折扣管理"
          extra="最小单位为月，如数量录入2，就是2个月，折扣比率是多少。折扣比率为百分比，例如95%，录入95即可。"
        >
          <rule-arr
            ref="ruleArr"
            :limit-list="limitList"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import { BannerGetByIdApi } from '@/api/BannerApi'
  import RuleArr from '@/views/SystemService/TimeRule/RuleArr'

  export default {
    name: 'CreateTimeRule',
    components: {
      RuleArr
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
        selectList: [],
        limitList: []
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
    },
  }
</script>

<style scoped>
  .CreateTimeRule {

  }
</style>
