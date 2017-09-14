import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    departs:[],
    projects:[]

  },
  actions: {
    LOAD_DEPART_LIST: function ({commit}) {

        this.$http.get('department/list').then((response) => {
          commit('SET_DEPARTS', { list: response.data.Content })
        }, (err) => {
          console.log(err)
        })

    },
    LOAD_PROJECT_LIST: function ({commit}) {

      this.$http.get('project/list').then((response) => {
        commit('SET_PROJECT_LIST', { list: response.data.Content })
      }, (err) => {
        console.log(err)
      })

    }



  },
  mutations: {
    SET_DEPARTS: (state, { list }) => {
      state.departs = list
    }
    ,
    SET_PROJECT_LIST: (state, { list }) => {
      state.projects = list
    }

  },
  getters: {},
  modules: {}

})

export default store;

