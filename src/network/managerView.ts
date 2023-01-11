import $http from "./http"

// 获取普通管理员列表
export function getAdminList(data: {
  offset: number
  val?: string
  status?: string
}) {
  return $http({
    url: '/admin/adminGetAdminList',
    method: 'post',
    data
  })
}

// 添加管理员
export function addAdminInfo(data: {
  rootPwd: string
  name: string
  phone: string
  email: string
  password: string
}) {
  return $http({
    url: '/admin/adminAddAdminInfo',
    method: 'post',
    data
  })
}

// 更新管理员信息
export function updateAdminInfo(data: {
  rootPwd: string
  admin_id: string
  name: string
  phone: string
  email: string
  status: number
}) {
  return $http({
    url: "/admin/adminUpdateAdminInfo",
    method: 'post',
    data
  })
}

// 更新管理员密码
export function updateAdminPwd(data: {
  admin_id: string
  newPwd: string
  rootPwd: string
}) {
  return $http({
    url: '/admin/adminUpdateAdminPwd',
    method: 'post',
    data
  })
}