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
let iurl = 'http://localhost:9000'


function checkStatus(response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200  )) {

    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  return {
    status: -404,
    msg: '网络异常'

  }

}


export default {
  postForm(url, data) {
    return axios({
      method: 'post',
      baseURL: iurl,
      url,
      data: qs.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  }
  ,
  get(url, params) {
    return axios({
      method: 'get',
      baseURL: iurl,
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
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
  },
  get(url) {
    return axios({
      method: 'get',
      baseURL: iurl,
      url,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    )
      .then(
        (res) => {
          return checkCode(res)
        }
      )

  }


}

function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === 200) {
    return res.data
  } else {
    return {Code: res.status, Msg: '网络异常'}
  }


}
