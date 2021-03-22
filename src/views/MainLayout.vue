<template>
  <div class="main-layout">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        collapsible
        v-model="collapsed"
        style="overflow:auto; position:fixed; height: calc(100vh - 48px); z-index: 9;"
      >
        <div class="logo" />
        <!--菜单-->
        <menu-c v-if="getMenuData && getMenuData.length" :init-active="selectMenu" :menu-data="getMenuData" />
      </a-layout-sider>
      <a-layout
        :style="{marginLeft: collapsed ? '80px':'200px', transition: 'all .2s'}">
        <a-layout-header
          style="
          background: #fff;
          padding: 0;
          position:fixed;
          left: 0;
          right: 0;
          top: 0;
          z-index: 9;"
          :style="{
            left: collapsed ? '80px': '200px',
            transition: 'all .2s'
          }"
        >
          <a-row type="flex" justify="space-between" align="middle">
            <a-col>
              <!--收起菜单，面包屑-->
              <a-row type="flex" justify="start">
                <a-col>
                  <!--trigger--menu-->
                  <a-icon
                    @click="collapsed = !collapsed" :type="collapsed ? 'menu-unfold':'menu-fold'"
                    :style="{margin: '0 20px',fontSize: '24px'}"
                  ></a-icon>
                </a-col>
              </a-row>
            </a-col>
            <a-col>
              <a-row type="flex" justify="end" :gutter="20">
                <a-col>
                  <!--全屏-->
                  <full-screen-c />
                </a-col>
                <a-col>
                  <!--用户-->
                  <user-c />
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-layout-header>
        <a-layout-content style="margin: 64px 16px 0; display: flex; flex-direction: column;">
          <!--面包屑-->
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item
              v-for="(breadItem,idx) in breadList"
              :key="idx"
            >
              {{breadItem.meta.name}}
            </a-breadcrumb-item>
          </a-breadcrumb>
          <div class="layout-content">
            <!--路由-->
            <router-view />
          </div>
        </a-layout-content>
        <!--页脚-->
        <a-layout-footer style="text-align: center">
          Management System ©{{(new Date()).getFullYear()}} Created By ZZN
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
  // 用户
  import UserC from '@/components/UserC/UserC'
  // 全屏
  import FullScreenC from '@/components/FullScreenC/FullScreenC'
  // 菜单
  import MenuC from '@/components/MenuC/MenuC'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'MainLayout',
    components: {
      MenuC,
      FullScreenC,
      UserC
    },
    data () {
      return {
        // 左侧菜单展开、收缩
        collapsed: false,
        // 选中菜单
        selectMenu: '/',
        // 面包屑
        breadList: [
          { meta: { name: `店铺概况` } }
        ],
      }
    },
    created () {
      this.getMenu()
    },
    methods: {
      ...mapActions([
        'getMenu'
      ])
    },
    computed: {
      ...mapGetters([
        'getMenuData'
      ])
    },
    /**
     * 初始化路由状态
     * @param to
     * @param from
     * @param next
     */
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.selectMenu = to.path
        vm.breadList = vm.$route.matched.filter(item => item.meta.name)
      })
    },
    watch: {
      // 监听路由
      $route: function (to, from) {
        this.selectMenu = to.path
        this.breadList = this.$route.matched.filter(item => item.meta.name)
      }
    }
  }
</script>

<style scoped lang="less">

  #components-layout-demo-side .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }

  .layout-content {
    flex-grow: 1;

    div:nth-child(1) {
      height: 100%;
    }
  }

  .ant-layout-footer {
    padding: 20px 50px;
  }
</style>
