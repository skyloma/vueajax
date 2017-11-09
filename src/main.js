// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import frame from './frame.vue'
import router from './router'
import http  from './http'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import Vuex from 'vuex'
import store from './store'
import {Message} from 'element-ui'
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from "./api";
import   auth from "./auth"
Vue.use(Vuex)

Vue.use(MuseUI)
Vue.config.productionTip = false
Vue.prototype.http = http;
Vue.prototype.api = api;
Vue.prototype.auth = auth;

Vue.prototype.$message = Message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<frame/>',
  components: { frame }
})
