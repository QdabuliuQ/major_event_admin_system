import $http from './http'

// 获取前台公告
export function getReceNotice(data: {
  offset: number
  startTime?: BigInt
  endTime?: BigInt
  is_top?: number
  status?: string
  val?: string
  app_status?: string
}) {
  return $http({
    url: '/notice/getReceNotice',
    method: 'post',
    data
  })
}

// 更新前台公告审核状态
export function updateStatus(data: {
  id: string
  app_status: string
}) {
  return $http({
    url: '/notice/updateNoticeAppStatus',
    method: 'post',
    data
  })
}
