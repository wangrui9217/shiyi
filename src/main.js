// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Icon from 'vue-svg-icon/Icon.vue'
import Authorize from './utils/authorize'
import Cookies from 'js-cookie'
import Components from './components/common/index'

Vue.config.productionTip = false

/* eslint-disable no-new */
// if (process.env.debug) {
//   Axios.defaults.headers.common.token = 'sheng'
// } else {
//   Authorize()
// }
Authorize()

Vue.use(Components)
Vue.use(ElementUI)
Vue.component('icon', Icon)

Vue.prototype.$cookie = Cookies
Vue.prototype.$axios = Axios

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
