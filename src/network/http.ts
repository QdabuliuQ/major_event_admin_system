import axios from "axios";
import { ElNotification } from 'element-plus'

const $http = axios.create({
  baseURL: 'http://127.0.0.1:8080/admin',
  headers: { 
    'content-type': 'application/x-www-form-urlencoded',
    'Authorization': localStorage.getItem('token') ?? '' 
  },
  timeout: 5000,
})

// 响应拦截器
$http.interceptors.response.use((req: any): any => {
  if(req.data.status == -1) {
    ElNotification({
      title: '错误',
      message: req.data.msg,
      type: 'error',
    })
    let backlen=history.length-1;
  } else {
    return req
  }
}, err=>{});


export default $http 