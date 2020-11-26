<!--xiolng-->
<!--EditService-->
<!--2020/10/15-->
<!--16:58-->
<template>
  <div class="EditService main-content">
    <a-form :form="form" :label-col="{span: 3}" :wrapper-col="{span: 21}">
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
      <a-form-item label="服务折扣">
        <a-select
          v-decorator="[
            `systemServiceDiscountId`,
            {
              initialValue: undefined,
              rules: [{required: true, message: '请选择折扣'}]
            }
          ]"
          placeholder="请选择折扣"
        >
          <a-select-option
            v-for="item in serviceList"
            :value="item.systemServiceDiscountId"
            :key="item.systemServiceDiscountId"
          >
            {{item.discountName}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="服务人数">
        <a-card>
          <service-arr ref="serviceArr" :limit-list="specList" />
        </a-card>
      </a-form-item>
      <!--<a-form-item label="服务描述">-->
      <!--  <a-textarea-->
      <!--    placeholder="请输入服务描述"-->
      <!--    :auto-size="{minRows: 3, maxRows: 5}"-->
      <!--    v-decorator="[-->
      <!--        `serviceDetail`,-->
      <!--        {-->
      <!--          rules: [{required: true, message: '请输入服务描述'}]-->
      <!--        }-->
      <!--      ]"-->
      <!--  />-->
      <!--</a-form-item>-->

      <a-form-item label="权限">

        <a-tree-select
          :treeData="menuData"
          treeCheckable
          :showCheckedStrategy="showParent"
          placeholder="请选择商品类别"
          v-decorator="[
            `menuIds`,
            // {rules: [{required: true, message: '请选择商品类别'}]}
          ]"
        />
      </a-form-item>
      <a-form-item label=" " :colon="false">
        <a-button
          type="primary"
          @click="saveForm"
          style="width: 50%;"
          size="large"
          :disabled="loading"
        >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import { TreeSelect } from 'ant-design-vue'
  import ServiceArr from '@/views/SystemService/ServiceArr'
  import {
    listSystemServiceDiscountApi,
    SystemServiceAddApi,
    SystemServiceeDetailApi,
    SystemServiceEditApi
  } from '@/api/SystemServiceApi'
  import { treeMenu } from '@/utils/menu'
  import { CrmMenuAllListlApi } from '@/api/CrmMenuApi'

  export default {
    name: 'EditService',
    components: {
      ServiceArr
    },
    data () {
      return {
        form: this.$form.createForm(this, {}),
        loading: false,
        specList: [],
        showParent: TreeSelect.SHOW_ALL,
        menuData: [],
        serviceList: []
      }
    },
    mounted () {
      this.getServiceAll()
      this.$route.query.id && this.getDetail()
      this.getMenuData()
    },
    methods: {
      getServiceAll () {
        listSystemServiceDiscountApi().then(res => {
          const { data, code } = res.data
          if (code === '200') {
            this.serviceList = data
          }
        })
      },
      getDetail () {
        SystemServiceeDetailApi({
          id: this.$route.query.id
        }).then(res => {
          if (res.data.code === '200') {
            const { data } = res.data
            this.specList = data.specList || []
            this.form.setFieldsValue({
              serviceName: data.serviceName,
              // serviceDetail: data.serviceDetail,
              systemServiceDiscountId: data.systemServiceDiscountId
            })
          }
        })
      },
      // 获取菜单列表
      getMenuData () {
        CrmMenuAllListlApi({}).then(res => {
          this.menuData = treeMenu(res.data.data, 'systemMenuId')
        })
      },
      saveForm () {
        const id = this.$route.query.id
        const func = id ? SystemServiceEditApi : SystemServiceAddApi
        this.loading = true
        this.form.validateFieldsAndScroll({
          first: true,
          scroll: {
            offsetTop: 100
          }
        }, (errForm, valForm) => {
          console.log(errForm, valForm)
          if (!errForm) {
            this.$refs.serviceArr.form.validateFields((err, val) => {
              console.log(err, val)
              if (!err) {
                const specList = val.keys.map(v => {
                  console.log(v)
                  return {
                    personCount: val.personCount[v],
                    price: val.price[v],
                  }
                })
                func({
                  specList,
                  ...valForm
                }).then(res => {
                  this.loading = false
                  if (res.data.code === '200') {
                    this.$message.success(`添加成功`)
                    this.$router.push({
                      path: `/systemService/systemServiceList`
                    })
                  }
                })
              } else {
                this.loading = false
              }
            })
          } else {
            this.loading = false
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .EditService {
    .item-box {
      display: flex;
      align-items: flex-start;

      .item-label {
        width: 100px;
        flex-shrink: 0;
        margin-bottom: 10px;
      }

      .item-content {
        margin-bottom: 10px;

        .imgs {
          width: 300px;
          height: 200px;
        }
      }
    }

    .btn-box {
      padding: 40px 20px;
      background: #fafafa;
      display: flex;
      width: 50%;
      justify-content: space-around;
    }
  }
</style>
