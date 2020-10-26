<!--xiolng-->
<!--ChangePassword-->
<!--2020/10/23-->
<!--10:57-->
<template>
  <div class="ChangePassword">
    <a-modal
      :visible="visible"
      title="重置密码"
      @cancel="$emit('cancel')"
      @ok="$emit('create')"
    >
      <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 16}">
        <a-form-item label="新密码">
          <a-input-password
            placeholder="请输入新密码"
            v-decorator="[
              `password`,
              {
                rules: [{required: true, message: '请输入新密码'}]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

  export default {
    name: 'ChangePassword',
    props: {
      visible: Boolean,
      editId: String
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'form' })
      }
    },
  }
</script>

<style scoped>
  .ChangePassword {

  }
</style>
