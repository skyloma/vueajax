import axios from 'axios'
import qs from 'qs'
import env from '../config/env'

let util = {
 // theme: "light",
  date: {}
}

util.title = function (title, sub) {
  sub = sub ? ' - ' + sub : ''
  title = title ? title + sub : '项目开发管理平台'
  window.document.title = title
}

util.date.formatDate = function (date, type) {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date)
  }
  let dateStr = ''
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  dateStr = y + '-' + m + '-' + d
  if (type === 'datetime') {
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let M = date.getMinutes()
    M = M < 10 ? ('0' + M) : M
    let s = date.getSeconds()
    s = s < 10 ? ('0' + s) : s
    dateStr += ' ' + h + ':' + M + ':' + s
  }
  return dateStr
}


util.qs = qs

const ajaxUrl = env === 'development' ?
  'http://localhost:9000' :
  env === 'production' ?
    'https://www.url.com' :
    'https://debug.url.com'

util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000,
})

util.ajax.defaults.headers.common['Authorization'] = "AUTH_TOKEN"
// util.ajax.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
util.ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


//添加一个请求拦截器
util.ajax.interceptors.request.use(function (config) {
  //在请求发出之前进行一些操作
  return config
}, function (err) {
  //Do something with request error
  return Promise.reject(err)
})
//添加一个响应拦截器
util.ajax.interceptors.response.use(function (res) {
  //在这里对返回的数据进行处理

  return res
}, function (err) {
  //Do something with response error
  return Promise.reject(err)
})

export default util
