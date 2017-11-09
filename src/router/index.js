import Vue from 'vue'
import Router from 'vue-router'
import App from '../pages/App.vue'
import About from '../pages/About.vue'
import Home from '../pages/home.vue'
import ProjectList from '../pages/project/projectList.vue'
import ProjectInfo from '../pages/project/ProjectInfo.vue'
import ProjectAdd from '../pages/project/ProjectAdd.vue'
import ProjectEdit from '../pages/project/ProjectEdit.vue'
import bugList from '../pages/bugList.vue'
import Msg from '../pages/Msg.vue'
import Login from '../pages/login.vue'
Vue.use(Router)
import auth from "../auth"

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'App',
      component: App,
      children:[
        {
          path: '/about',
          name: 'About',
          component: About
        }
        ,
        {
          path: '/index',
          name: 'Home',
          component: Home
        }
        ,
        {
          path: '/ProjectList',
          name: 'ProjectList',
          component: ProjectList
        },
        {
          path: '/ProjectInfo',
          name: 'ProjectInfo',
          component: ProjectInfo
        },
        {
          path: '/ProjectAdd',
          name: 'ProjectAdd',
          component: ProjectAdd
        },
        {
          path: '/ProjectEdit',
          name: 'ProjectEdit',
          component: ProjectEdit
        }
        ,
        {
          path: '/Msg',
          name: 'Msg',
          component: Msg
        }
        ,
        {
          path: '/bugList',
          name: 'bug',
          component: bugList
        }
      ]
    },

  ]
})
router.beforeEach((route, redirect, next) => {

  if (!auth.loggedIn() && route.path !== '/login') {
    next({
      path: '/login',
      query: {redirect: route.fullPath}
    })
  } else {
    next()
  }
})

export   default  router;
