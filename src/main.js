// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Util from './libs/util';
import http  from  './libs/http'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import Vuex from 'vuex'
import store from './store'
Vue.use(Vuex)

Vue.use(MuseUI)
Vue.config.productionTip = false
Vue.prototype.$http = http;
Vue.prototype.$util = Util;

import { Toast} from 'wc-messagebox'
import 'wc-messagebox/style.css'


Vue.use(Toast, 1500)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
