import axios from "axios";
import { ElNotification } from 'element-plus'
import glovar from "@/static/globalVar";

export const getToken = (): string => {
  return sessionStorage.getItem('token') ?? ''
}

const $http = axios.create({
  baseURL: glovar.url + '/admin',
  headers: { 
    'content-type': 'application/x-www-form-urlencoded',
    // 'Authorization': getToken() 
  },
  timeout: 5000,
})

// 请求拦截器
$http.interceptors.request.use(function (config: any) {
  // 发送请求的相关逻辑
  // config:对象  与 axios.defaults 相当
  // 借助config配置token
  let token = getToken()
  // 判断token存在再做配置
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
$http.interceptors.response.use((req: any): any => {
  if(req.data.status == -1) {
    ElNotification({
      title: '错误',
      message: req.data.msg,
      type: 'error',
    })
    let path = window.location.href
    window.location.href = path.substr(0, path.lastIndexOf('/')+1)
  } else {
    return req
  }
}, err=>{});


export default $http 