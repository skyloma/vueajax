import Vue from 'vue'
import Router from 'vue-router'
import App from '../pages/App.vue'
import Home from '../pages/home.vue'

import projectList from '../pages/project/projectList.vue'
import   projectAdd from  '../pages/project/projectAdd.vue'
import   projectInfo from  '../pages/project/projectInfo.vue'
import   moudleAdd from '../pages/moudle/moudleAdd.vue'
import   moudleEdit from '../pages/moudle/moudleEdit.vue'
import   res from '../pages/moudle/res.vue'
import   moudleApi from '../pages/moudleApi/moudleApi.vue'
import   moudleApiRead from '../pages/moudleApi/moudleApiRead.vue'
import   coderReprot  from '../pages/moudle/coderReport.vue'
import   bugList  from '../pages/bug/bugList.vue'
import   bugAdd  from '../pages/bug/bugAdd.vue'
import   bugEdit  from '../pages/bug/bugEdit.vue'
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
      children: [

        {path: '/index',   name: 'Home',  component: Home  },
        {path: '/projectList', name: '项目列表', component: projectList},
        {path: '/projectEdit', name: '编辑项目', component: projectAdd},
        {path: '/projectAdd', name: '创建新项目', component: projectAdd},
        {path: '/projectInfo', name: '项目详情', component: projectInfo},
        {path: '/moudleAdd', name: '新增模块', component: moudleAdd},
        {path: '/moudleEdit', name: '模块变更', component: moudleEdit},
        {path: '/coderReprot', name: '工作报告', component: coderReprot},
        {path: '/ui', name: '设计图/切图', component: res},
        {path: '/moudleApi', name: 'API', component: moudleApi},
        {path: '/moudleApiRead', name: 'API', component: moudleApiRead},
        {path: '/bugList', name: 'bug列表', component: bugList},
        {path: '/bugAdd', name: '提交新bug', component: bugAdd},
        {path: '/bugEdit', name: '编辑bug', component: bugEdit}
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

export default router;
