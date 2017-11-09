import Vue from "vue";
import Vuex from "vuex";
import types from "./mutation-types";

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,  // process.env.NODE_ENV !== 'production', 直接修改state 抛出异常

  getters: {
    loading: state => state.loading,
    userInfo:state => state.userInfo,
  },
  state: {
    loading: false,
    userInfo:{name:'佚名'},

  },
  mutations: {
    //只能同步的函数


    [types.LOAD_ING] (state, info) {
      state.loading = info;
    },

    [types.SET_USER_INFO] (state, info) {
      state.userInfo = info;
    }

  }, actions: {
    //异步的函数


  },
})

export default store
