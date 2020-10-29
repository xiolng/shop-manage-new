<!--MenuItem-->
<template>
  <a-sub-menu
    :key="menuInfo.menuUrl"
    v-bind="$props"
    v-on="$listeners"
  >
    <span slot="title">
      <a-icon :type="menuInfo.icon" /> <span> {{menuInfo.menuName}} </span>
    </span>
    <template v-for="item in menuInfo.children">
      <a-menu-item
        v-if="!item.children"
        :key="item.menuUrl"
      >
        <a-icon :type="item.icon" />
        <span>{{item.menuName}}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.menuUrl" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>

<script>
  import { Menu } from 'ant-design-vue'

  export default {
    name: 'SubMenu',
    props: {
      ...Menu.SubMenu.props,
      menuInfo: {
        type: Object,
        default: () => ({})
      }
    },
    isSubMenu: true,
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
