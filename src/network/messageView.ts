import $http from "./http"

// 获取消息列表
export function getMessageList(data: {
  offset: number
}) {
  return $http({
    url: '/msg/getMessageList',
    params: data,
    method: 'get'
  })
}

// 删除消息
export function deleteMessageById(data: {
  msg_id: string
}) {
  return $http({
    url: '/msg/deleteMessageById',
    data,
    method: 'post'
  })
}

// 获取视频消息
export function getVideoUrlById(data: {
  id: string
}) {
  return $http({
    url: '/msg/getVideoUrlById',
    params: data,
    method: 'get'
  })
}

// 获取文章消息
export function getArticleById(data: {
  id: string
}) {
  return $http({
    url: '/msg/getArticleById',
    params: data,
    method: 'get'
  })
}

// 获取房间消息
export function getRoomMessage(data: {
  room_id: string
  offset: number
}) {
  return $http({
    url: '/msg/getRoomMessage',
    params: data,
    method: 'get'
  })
}