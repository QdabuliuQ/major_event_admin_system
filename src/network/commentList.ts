import $http from './http'

// 获取评论列表
export function getCommentList(data: {
  offset: number
  val?: string
  is_delete?: number
  startTime?: number
  endTime?: number
}) {
  return $http({
    url: '/com/getCommentList',
    params: data,
    method: 'get'
  })
}

// 获取文章详情
export function getArticleDetail(data: {
  id: string
}) {
  return $http({
    url: '/com/getArticleDetail/'+data.id,
    method: 'get'
  })
}

// 删除文章评论
export function deleteComment(data: {
  comment_id: string
}) {
  return $http({
    url: '/com/deleteComment',
    method: 'post',
    data
  })
}

// 获取楼层评论
export function getCommentFloor(data: {
  comment_id: string
  art_id: string
  offset: number
  limit: number
}) {
  return $http({
    url: '/com/getCommentFloor',
    method: 'get',
    params: data
  })
}

// 获取动态评论
export function getEventCommentList(data: {
  offset: number
  val?: string
  is_delete?: number
  startTime?: number
  endTime?: number
}) {
  return $http({
    url: '/com/getEventCommentList',
    method: 'get',
    params: data
  })
}

// 删除动态评论
export function deleteEventComment(data: {
  comment_id: string
}) {
  return $http({
    url: '/com/deleteEventComment',
    method: 'post',
    data
  })
}