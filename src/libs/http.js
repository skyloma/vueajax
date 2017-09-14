'use strict'

import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})
let iurl='http://localhost:9000'
export default {
  postForm (url, data) {
    return axios({
      method: 'post',
      baseURL:  iurl,
      url,
      data: qs.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  }
  ,
  get (url, params) {
    return axios({
      method: 'get',
      baseURL: iurl,
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
