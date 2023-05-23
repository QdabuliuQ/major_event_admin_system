import $http from "./http";

// 获取动态列表
export function getEventList(data: {
  offset: number
  val?: string
  state?: string
  type?: string
  startTime?: number
  endTime?: number
}) {
  return $http({
    url: '/eve/getEventList',
    params: data,
    method: 'get'
  })
}

// 封禁动态
export function deleteEvent(data: {
  ev_id: string
}) {
  return $http({
    url: '/eve/deleteEvent',
    data,
    method: 'post'
  })
}

// 查看动态
export function getEventDetail(data: {
  ev_id: string
}) {
  return $http({
    url: '/eve/getEventDetail',
    params: data,
    method: 'get'
  })
}