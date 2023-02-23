import $http from "./http"

// 登录接口
export function login(
  account: string, 
  password: string, 
  type: number) {
  return $http({
    url: '/api/adminLogin',
    method: 'post',
    data: {
      account,
      password,
      type
    }
  })
}