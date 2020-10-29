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
            `serviceSale`,
            {
              initialValue: undefined,
              rules: [{required: true, message: '请选择折扣'}]
            }
          ]"
          placeholder="请选择折扣"
        >
          <a-select-option value="wef">wef</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="服务人数">
        <a-card>
          <service-arr ref="serviceArr" :limit-list="limitList" />
        </a-card>
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

      <a-form-item label="权限">

        <a-tree-select
          :treeData="menuData"
          treeCheckable
          :showCheckedStrategy="showParent"
          placeholder="请选择商品类别"
          v-decorator="[
            `shopType`,
            {rules: [{required: true, message: '请选择商品类别'}]}
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
  import { SystemServiceAddApi, SystemServiceeDetailApi } from '@/api/SystemServiceApi'
  import { menuAllListlApi } from '@/api/MenuManageApi'
  import { treeMenu } from '@/utils/menu'

  export default {
    name: 'EditService',
    components: { ServiceArr },
    data () {
      return {
        form: this.$form.createForm(this, {}),
        loading: false,
        limitList: [],
        showParent: TreeSelect.SHOW_ALL,
        menuData: []
      }
    },
    mounted () {
      this.$route.query.id && this.getDetail()
      this.getMenuData()
    },
    methods: {
      getDetail () {
        SystemServiceeDetailApi({
          systemServiceId: this.$route.query.id
        }).then(res => {
          if (res.data.code === '200') {
            const { data } = res.data
            this.limitList = data.limitList
          }
        })
      },
      // 获取菜单列表
      getMenuData () {
        menuAllListlApi({}).then(res => {
          this.menuData = treeMenu(res.data.data)
        })
      },
      saveForm () {
        this.loading = true
        this.form.validateFields((errForm, valForm) => {
          console.log(errForm, valForm)
          if (!errForm) {
            this.$refs.serviceArr.form.validateFields((err, val) => {
              console.log(err, val)
              if (!err) {
                console.log(4444)
                const limitList = val.keys.map(v => {
                  console.log(v)
                  return {
                    peopleNum: val.peopleNum[v],
                    servicePrice: val.servicePrice[v],
                  }
                })
                console.log(5555, limitList)
                SystemServiceAddApi({
                  limitList,
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
              }
            })
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
