<!--OperationLog-->
<template>
  <div class="operation-log main-content">
    <a-row class="mb-20">
      <a-col>
        <a-select class="mr-10" style="min-width: 100px;">
          <a-select-option value="wef">wef</a-select-option>
        </a-select>
        <a-input-search placeholder="请输入关键字" style="max-width: 200px;"/>
      </a-col>
    </a-row>
    <a-table
      :columns="column"
      :dataSource="tableData"
      :pagination="pages"
      rowKey="id"
    />
  </div>
</template>

<script>
  const column = [
    {
      title: '操作详情',
      dataIndex: 'detail'
    },
    {
      title: '操作时间',
      dataIndex: 'time'
    },
    {
      title: '操作人',
      dataIndex: 'operator'
    }
  ]
  export default {
    name: 'OperationLog',
    data () {
      return {
        column,
        tableData: [
          {
            id: 1,
            detail: '添加套餐',
            time: '2020-02-02 11:11:22',
            operator: 'xiolng'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
