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
import {Message} from 'element-ui'
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Vuex)

Vue.use(MuseUI)
Vue.config.productionTip = false
Vue.prototype.$http = http;
// Vue.prototype.$util = Util;
Vue.prototype.$message = Message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
