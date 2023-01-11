import $http from "./http"

// 获取用户信息
export function getUserList(data: {
  offset: number
  val?: string
  status?: number
}) {
  return $http({
    url: '/admin/adminGetUserList',
    method: 'post',
    data
  })
}

// 更新用户信息
export function updateUserInfo(data: any) {
  return $http({
    url: '/my/userInfo',
    method: 'post',
    data
  })
}

// 更新用户密码
export function updateUserPwd(data: {
  id: string
  newPwd: string
  rootPwd: string
}) {
  return $http({
    url: '/admin/adminUpdateUserPwd',
    method: 'post',
    data
  })
}