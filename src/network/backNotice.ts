import $http from './http'

// 获取后台公告
export function getBackNotice(data: {
  offset: number
  startTime?: BigInt
  endTime?: BigInt
  is_top?: number
  status?: string
  val?: string
}) {
  return $http({
    url: '/notice/getBackNotice',
    method: 'post',
    data
  })
}