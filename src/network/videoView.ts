import $http from "./http";

export function getVideoList(data: {
  offset: number
  state?: string
  is_delete?: string
  startTime?: number
  endTime?: number
  val?: string
}) {
  return $http({
    url: '/vid/getVideoList',
    params: data,
    method: 'get'
  })
}

// 更新审核状态
export function updateVideoState(data: {
  state: string
  id: string
}) {
  return $http({
    url: '/vid/updateVideoState',
    data,
    method: 'post'
  })
}

// 获取点赞列表
export function getVideoPraise(data: {
  id: string
  offset: number
}) {
  return $http({
    url: '/vid/getVideoPraise',
    params: data,
    method: 'get'
  })
}

// 获取收藏列表
export function getVideoCollect(data: {
  id: string
  offset: number
}) {
  return $http({
    url: '/vid/getVideoCollect',
    params: data,
    method: 'get'
  })
}