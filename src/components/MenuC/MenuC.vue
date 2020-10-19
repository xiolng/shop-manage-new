<template>
  <div class="menu-box">
    <!--菜单-->
    <a-menu
      theme="dark"
      v-model="selectMenu"
      :default-open-keys="openKeys()"
      force-sub-menu-render
      mode="inline"
      @click="clickMenu"
    >
      <template v-for="item in menuData">
        <!--一级菜单-->
        <a-menu-item
          :key="(item.menuUrl.includes('/') && item.menuUrl.replace(/\//, '')) || item.menuUrl"
          v-if="item && !item.children"
        >
          <a-icon :type="item.icon" />
          <span>{{item.menuName}}</span>
        </a-menu-item>
        <!--多级菜单-->
        <sub-menu
          v-if="item.children"
          :menu-info="item"
          :key="(item.menuUrl.includes('/') && item.menuUrl.replace(/\//, '')) || item.menuUrl"
        />
      </template>
    </a-menu>
  </div>
</template>

<script>
  // 路由数据
  // import routes from '@/router/index'
  import SubMenu from './SubMenu'

  export default {
    name: 'MenuC',
    components: {
      SubMenu,
    },
    props: {
      // 初始化选中菜单
      initActive: String,
      menuData: Array
    },
    data () {
      return {
        routes: [],
        // 选中菜单
        selectMenu: '',
      }
    },
    beforeMount () {
      // 设置选中菜单
      this.selectMenu = [this.$route.path.replace(/\//, '')]
    },
    mounted () {
    },
    methods: {
      openKeys () {
        const list = this.$route.path.split('/').filter(v => v && v)
        if (list.length <= 0) return
        let text = list[0]
        const path = [text]
        list.map((v, index) => {
          if (index > 0) {
            path.push(`${text}/${v}`)
            text = `${text}/${v}`
          }
        })
        return path
      },
      // 点击菜单选中
      clickMenu ({ item, key, keyPath }) {
        this.selectMenu = [key]
        const routerData = key.split('/').map(v => v && `/${v}`).join('')
        if (routerData === this.$route.path) return
        this.$router.push({
          path: routerData
        })
      }
    },
    computed: {
      // 监听菜单点击
      activeMenu: function () {
        return this.selectMenu
      }
    },
  }
</script>

<style scoped>

</style>
