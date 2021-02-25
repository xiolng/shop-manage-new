<template>
  <!--编辑菜单-->
  <div class="add-user">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <!--<FormItem label="上级菜单">-->
        <!--<Input :value="menuData.parentId.menuName" disabled/>-->
      <!--</FormItem>-->
      <FormItem label="地址" prop="menuUrl">
        <Input v-model="formValidate.menuUrl" placeholder="请输入地址名"/>
      </FormItem>
      <FormItem label="菜单名" prop="menuName">
        <Input v-model="formValidate.menuName" placeholder="请输入菜单名"/>
      </FormItem>
      <FormItem label="icon" prop="icon">
        <Input v-model="formValidate.icon" @on-enter="modalOk" placeholder="请输入icon名"/>
      </FormItem>
    </Form>
    <Row type="flex" justify="end" :gutter="20">
      <Col>
        <Button type="text" @click="modalCancel">取消</Button>
      </Col>
      <Col>
        <Button type="primary" @click="modalOk">确定</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
  import { menueDetailApi, menuEditApi } from '@/api/systemManage/MenuManageApi'

  export default {
    props: {
      callback: Function,
      menuData: Object
    },
    data () {
      return {
        formValidate: {
          menuName: '',
          icon: '',
          menuUrl: ''
        },
        ruleValidate: {
          menuName: [
            { required: true, message: '请输入角色名', trigger: 'blur' }
          ],
        }
      }
    },
    beforeMount () {
      this.getMenuDetils()
    },
    methods: {
      // 获取详情
      getMenuDetils () {
        menueDetailApi({
          menuId: this.menuData.menuId
        }).then(res => {
          this.formValidate = res.data.data
        })
      },
      // 保存
      modalOk () {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            menuEditApi({
              menuId: this.formValidate.menuId,
              parentId: this.formValidate.parentId,
              icon: this.formValidate.icon,
              menuUrl: this.formValidate.menuUrl,
              menuName: this.formValidate.menuName
            }).then(res => {
              if (res.data.code === '200') {
                this.$message.success('编辑成功!')
                this.$store.dispatch('commitMenus')
                this.$refs.formValidate.resetFields()
                this.callback()
              }
            })
          }
        })
      },
      // 取消
      modalCancel () {
        this.$refs.formValidate.resetFields()
        this.callback()
      }
    }
  }
</script>

<style scoped lang="less">
  .znzheng {
    width: 100%;
  }

</style>
