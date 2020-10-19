import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'
import routes from '@/router'
import store from '@/store'
// ui
import Antd, { Icon } from 'ant-design-vue'
import {
  Tree,
  Form,
  FormItem,
  Row,
  Col,
  Button,
  Modal,
  Tooltip,
  Select,
  Input,
  Option,
  DropdownMenu,
  Dropdown
} from 'view-design'

import '@/styles/index.less'

Vue.config.productionTip = false
/**
 * 自定义icon
 * @type {Icon}
 * @scriptUrl {http://iconfont.cn}
 * 线上icon，上线后可以下载保存到本地打包
 */
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: import('@/static/iconfont')
})

Vue.use(VueRouter)
Vue.use(Antd)
Vue.component('icon-font', IconFont)
// iview
Vue.component('Tree', Tree)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Button', Button)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Modal', Modal)
Vue.component('Tooltip', Tooltip)
Vue.component('Select', Select)
Vue.component('Option', Option)
Vue.component('Input', Input)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('Dropdown', Dropdown)

// 设置路由
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
// 路由拦截
// router.beforeEach((to, from, next) => {
//   const menuData = JSON.parse(localStorage.getItem('menuData'))
//   const noAuth = ['/', '/signin', '/403', '/404']
//   if (!menuData) {
//     next()
//     return
//   }
//   let isAuth = !!noAuth.includes(to.path) || false
//   menuData && menuData.map(v => {
//     if (to.path.includes(v.menuUrl)) {
//       isAuth = true
//     }
//   })
//   isAuth ? next() : router.replace('/403')
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
