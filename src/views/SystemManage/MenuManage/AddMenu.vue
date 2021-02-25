<template>
  <!--添加菜单-->
  <div class="add-user">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <!--<FormItem label="上级菜单">-->
        <!--<Input :value="menuData.data.menuName" disabled/>-->
      <!--</FormItem>-->
      <FormItem label="地址" prop="menuUrl">
        <Input v-model="formValidate.menuUrl" placeholder="请输入地址名" autofocus/>
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

  import { menuAddApi } from '@/api/systemManage/MenuManageApi'

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
          menuUrl: '',
          sort: 1
        },
        ruleValidate: {
          menuName: [
            { required: true, message: '请输入菜单名', trigger: 'blur' }
          ],
        }
      }
    },
    beforeMount () {
      if (this.activeData && this.activeData.menuName) this.formValidate = this.activeData
    },
    methods: {
      // 保存
      modalOk () {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            menuAddApi({
              parentId: this.menuData.data.menuId,
              ...this.formValidate
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
      // 取消保存
      modalCancel () {
        this.$refs.formValidate.resetFields()
        this.callback()
      }
    },
    computed: {
      isShow () {
        return this.show
      }
    }
  }
</script>

<style scoped lang="less">
  .znzheng {
    width: 100%;
  }

</style>
