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
import ElementUI from 'element-ui'
import './assets/element-variables.scss'
import api from "./api";
import   auth from "./auth"
Vue.use(Vuex)
Vue.use(ElementUI,{ size: 'small' })
Vue.use(MuseUI)
import 'muse-ui/dist/theme-light.css' // 使用 carbon 主题
Vue.config.productionTip = false
Vue.prototype.http = http;
Vue.prototype.api = api;
Vue.prototype.auth = auth;

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<frame/>',
  components: { frame }
})
