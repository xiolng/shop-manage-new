<!--xiolng-->
<!--CreateScene-->
<!--2021/6/23-->
<!--11:28-->
<template>
  <div class="CreateScene">
    <a-modal
      :visible="visible"
      title="新建、编辑"
      @cancel="form.resetFields(), $emit('cancel')"
      @ok="saveScene"
    >
      <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 16}">
        <a-form-item label="场景名称">
          <a-input
            placeholder="请输入场景名称"
            v-decorator="[
              `sceneName`,
              {
                rules: [{required: true, message: '请输入场景名称'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="场景编码">
          <a-input
            placeholder="请输入场景编码"
            v-decorator="[
              `sceneNo`,
              {
                rules: [{required: true, message: '请输入场景编码'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="场景样式">
          <a-radio-group
            v-decorator="[
              `sceneStyle`,
              {
                initialValue: 0,
                rules: [{required: true, message: '请选择场景样式'}]
              }
            ]"
            :options="[
              {label: '载入式', value: 0},
              {label: '弹出式', value: 1},
            ]"
          />
        </a-form-item>
        <a-form-item label="场景描述">
          <a-input
            placeholder="请输入场景描述"
            v-decorator="[
              `sceneDetail`,
              {
                rules: [{required: true, message: '请输入场景描述'}]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

  import { getSceneApi, saveSceneApi, updateSceneApi } from '@/api/SceneManageApi'

  export default {
    name: 'CreateScene',
    components: {},
    props: {
      visible: Boolean,
      editId: String
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'form' }),
      }
    },
    mounted () {
      this.editId && this.getDetail()
    },
    methods: {
      getDetail () {
        getSceneApi({ sceneId: this.editId }).then(res => {
          const defualtData = ['sceneName', 'sceneNo', 'sceneStyle', 'sceneDetail']
          if (res.data.code === '200') {
            const { data } = res.data
            Object.keys(defualtData).map(v => {
              this.form.setFieldsValue({ [defualtData[v]]: data[defualtData[v]] })
            })
          }
        })
      },
      saveScene () {
        this.form.validateFields((err, val) => {
          if (!err) {
            const func = this.editId ? updateSceneApi : saveSceneApi
            func({
              sceneId: this.editId || '',
              ...val
            }).then(res => {
              if (res.data.code == '200') {
                this.$message.success('保存成功')
                this.$emit('create')
              } else {
                this.$message.error(res.data.msg)
                this.$emit('cancel')
              }
            })
          }
        })
      }
    },
  }
</script>

<style scoped>
  .CreateScene {

  }
</style>
