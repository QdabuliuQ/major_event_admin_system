import $http from './http'

// 添加后台公告
export function addNotice(data: {
  title: string
  content: string
  is_top: number
  status: string
}) {
  return $http({
    url: '/notice/addBackNotice',
    method: 'post',
    data
  })
}

// 获取后台公告详情
export function getNoticeInfo(data: {
  id: string
}) {
  return $http({
    url: '/notice/getBackNoticeDetail',
    method: 'post',
    data
  })
}

// 更新公告内容
export function updateNotice(data: {
  id: string
  title: string
  is_top: number
  status: string
  content: string
}) {
  return $http({
    url: '/notice/updateBackNotice',
    method: 'post',
    data
  })
}