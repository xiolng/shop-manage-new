<!--EditorComp-->
<template>
  <div class="editor-comp">
    <editor
      api-key="gf46svjcnfs4nsmfno7jba0cfl3vqoifgew1opw1xf6ammd4"
      :init="editInit"
      v-model="editData"
      @input="$emit('input', editData)"
    />
  </div>
</template>

<script>

  // tinymce 富文本
  import tinymce from '@/static/tinymce/tinymce.min'
  import '@/static/tinymce/themes/silver/theme.min'
  import '@/static/tinymce/plugins/image/plugin.min'
  import '@/static/tinymce/plugins/media/plugin.min'
  import '@/static/tinymce/langs/zh_CN'
  import '@/static/tinymce/icons/default/icons.min'
  import '@/static/tinymce/skins/ui/oxide/skin.min.css'
  import '@/static/tinymce/skins/ui/oxide/content.min.css'
  import Editor from '@tinymce/tinymce-vue'

  tinymce.init({})
  export default {
    name: 'EditorComp',
    props: {
      detail: String,
      uploadImgUrl: String
    },
    data () {
      return {
        editData: '',
        // 编辑器初始化
        editInit: {
          height: 500,
          menubar: false,
          language: 'zh_CN', // 语言
          menu: {
            insert: {}
          },
          plugins: ['image', 'media'],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image',
          images_upload_handler: this.images_upload_handler,
          statusbar: false
        }
      }
    },
    mounted () {
      this.editData = this.detail
    },
    watch: {
      detail: function (newValue) {
        !this.editData && (this.editData = newValue)
      }
    },
    methods: {
      images_upload_handler (blobInfo, success, failure, progress) {
        const { uploadImgUrl } = this

        const xhr = new XMLHttpRequest()
        xhr.withCredentials = false
        xhr.open('POST', uploadImgUrl)
        xhr.setRequestHeader('Authorization', localStorage.getItem('accessToken'))

        xhr.upload.onprogress = function (e) {
          progress(e.loaded / e.total * 100)
        }

        xhr.onload = function () {
          var json

          if (xhr.status < 200 || xhr.status >= 300) {
            failure('HTTP Error: ' + xhr.status)
            return
          }

          json = JSON.parse(xhr.responseText)

          if (!json || typeof json.data != 'string') {
            failure('Invalid JSON: ' + xhr.responseText)
            return
          }

          success(`/fileLoad/files/${json.data}`)
        }

        xhr.onerror = function () {
          failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status)
        }

        const formData = new FormData()
        formData.append('file', blobInfo.blob(), blobInfo.filename())

        xhr.send(formData)
      }
    },
    components: {
      Editor
    }
  }
</script>

<style scoped>

</style>
