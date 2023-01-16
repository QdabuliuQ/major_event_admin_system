import $http from './http'

// 添加 前台公告
export function addNotice(data: {
  title: string
  content: string
  is_top?: number
  status?: string
}) {
  return $http({
    url: '/notice/addReceNotice',
    method: 'post',
    data
  })
}

// 获取公告详情
export function getNoticeInfo(data: {
  id: string
}) {
  return $http({
    url: '/notice/getReceNoticeDetail',
    method: 'post',
    data
  })
}

// 更新前台公告
export function updateNoticeInfo(data: {
  id: string
  title: string
  is_top: number
  status: string
  content: string
}) {
  return $http({
    url: '/notice/updateReceNotice',
    method: 'post',
    data
  })
}