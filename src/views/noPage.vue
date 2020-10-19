<!--404-->
<template>
  <div class="404">
    <a-result status="404" title="404" sub-title="对不起，您访问的页面不存在。">
      <template #extra>
        <a-button
          type="primary"
          @click="$router.back()"
        >
          返回上一级
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
  export default {
    name: 'noPage',
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
