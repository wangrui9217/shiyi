import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import Cookie from 'js-cookie'

Vue.use(Vuex)

const state = {
  side_menu_open: !+Cookie.get('sidemenuStatus'),
  store_tree_list: null,
  show_personal_center: false,
  store_id: null
}

const store = new Vuex.Store({
  state,
  getters,
  mutations
})

export default store
