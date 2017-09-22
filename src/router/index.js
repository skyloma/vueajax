import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import About from '../components/About.vue'
import ProjectList from '../components/ProjectList.vue'
import Msg from '../components/Msg.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    },
    {
      path: '/About',
      name: 'About',
      component: About
    }
    ,
    {
      path: '/ProjectList',
      name: 'ProjectList',
      component: ProjectList
    }
    ,
    {
      path: '/Msg',
      name: 'Msg',
      component: Msg
    }
  ]
})
