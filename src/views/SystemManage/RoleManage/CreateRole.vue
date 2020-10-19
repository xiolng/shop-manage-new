<!--CreateUser-->
<template>
  <div class="create-user">
    <a-modal
      :visible="visible"
      :title="isEdit ? '编辑角色':'新建角色'"
      @cancel="$emit('cancel')"
      @ok="$emit('create')"
    >
      <a-form
        :form="form"
        :label-col="{span: 4}"
        :wrapper-col="{span: 16}"
      >
        <a-form-item label="角色名">
          <a-input
            placeholder="请输入角色名"
            autocomplete="current-username"
            v-decorator="[
              `roleName`,
              {
                initialValue: '',
                rules: [{required: true, message: '请输入角色名'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="权限">

          <a-tree-select
            :treeData="treeData"
            treeCheckable
            :showCheckedStrategy="showParent"
            placeholder="请选择商品类别"
            v-decorator="[
            `shopType`,
            {rules: [{required: true, message: '请选择商品类别'}]}
          ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import { TreeSelect } from 'ant-design-vue'

  export default {
    name: 'CreateRole',
    props: {
      visible: Boolean,
      isEdit: Boolean
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'form' }),
        treeData: [],
        showParent: TreeSelect.SHOW_ALL,
      }
    }
  }
</script>

<style scoped>

</style>
