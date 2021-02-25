import Vue from 'vue'
import Vuex from 'vuex'
import { menuLoginApi } from '@/api/systemManage/MenuManageApi'
import { treeMenu } from '@/utils/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuData: []
  },
  mutations: {
    setMenuData (state, data) {
      state.menuData = data
    }
  },
  actions: {
    getMenu ({ commit }) {
      menuLoginApi({}).then(res => {
        if (res.data.code === '200') {
          commit('setMenuData', treeMenu(res.data.data, 'menuId'))
          localStorage.setItem('menuData', JSON.stringify(res.data.data))
        }
      })
    }
  },
  getters: {
    getMenuData (state) {
      return state.menuData
    }
  },
  modules: {}
})
