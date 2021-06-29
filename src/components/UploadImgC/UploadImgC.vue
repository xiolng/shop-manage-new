<!--UploadImgC-->
<template>
  <div class="upload-img">
    <a-upload
      action="/file/upload"
      :fileList="fileList"
      list-type="picture-card"
      @preview="handlePreview"
      :beforeUpload="beforeUpload"
      :remove="removeImg"
      v-decorator="[
            `fileList`,
            { rules: [{ required: true, message: '请上传图片' }] }
          ]"
    >
      <div v-if="fileList.length < (imgLength || 6)">
        <a-icon type="plus"/>
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel" title="预览图片">
      <img alt="example" style="width: 100%" :src="previewImage"/>
    </a-modal>
  </div>
</template>

<script>
  // 编译base64
  import { uploadImgApi } from '@/api/commonApi'

  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }
  export default {
    name: 'UploadImgC',
    props: {
      imgLength: {
        default: 1,
        type: [Number, String]
      },
      imgName: String,
      defaultData: [String, Array]
    },
    data () {
      return {
        // 预览图片
        previewVisible: false,
        // 预览图片地址
        previewImage: '',
        // 图片列表
        fileList: [],
      }
    },
    mounted () {
    },
    methods: {
      // 取消预览
      handleCancel () {
        this.previewVisible = false
      },
      // 预览图片
      async handlePreview (file) {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj)
        }
        this.previewImage = file.url || file.preview
        this.previewVisible = true
      },
      // 更新图片数据
      beforeUpload (file) {
        const formData = new FormData()
        formData.append('file', file)
        uploadImgApi(formData).then(res => {
          if (res.data.code === '200') {
            this.fileList.push({
              url: `/files/${res.data.data}`,
              status: 'done',
              uid: (this.fileList.length && Math.max(...this.fileList.map(v => v.uid)) + 1) || 1,
              name: file.name
            })
            this.$emit('imgName', res.data.data)
            // 绑定form表单推送
            this.$emit('change', res.data.data)
          }
        })
        return false
      },
      removeImg (file) {
        this.fileList = this.fileList.filter(v => file.uid !== v.uid)
        this.$emit('imgName', '')
        this.$emit('change', '')
      }
    },
    watch: {
      defaultData: {
        // 监听图片改变
        handler: function (newValue, oldValue) {
          if (!newValue) return
          if (typeof newValue === 'string') {
            this.fileList = [{
              url: '/files/' + newValue,
              status: 'done',
              uid: 1,
              name: newValue
            }]
          } else {
            this.fileList = []
            newValue.map((v, index) => {
              this.fileList.push({
                url: '/files/' + v,
                status: 'done',
                uid: index + 1,
                name: v
              })
            })
          }
        },
        deep: true
      }
    }
  }
</script>

<style scoped>

</style>
