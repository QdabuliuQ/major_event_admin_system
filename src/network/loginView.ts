import $http from "./http"

// 登录接口
export function login(phone: string, password: string, type: number) {
  return $http({
    url: '/api/adminLogin',
    method: 'post',
    data: {
      phone,
      password,
      type
    }
  })
}