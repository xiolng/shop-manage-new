<!--403-->
<template>
  <div class="403">
    <a-result status="403" title="403" sub-title="对不起，您没有权限访问此页。">
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
    name: 'noAccess',
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
