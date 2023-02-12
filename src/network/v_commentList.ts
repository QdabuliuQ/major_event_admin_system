import $http from "./http";

export function getVideoCommentList(data: {
  offset: number 
  is_delete?: number
  startTime?: number
  endTime?: number
  val?: string
}) {
  return $http({
    url: '/com/getVideoCommentList',
    params: data,
    method: 'get'
  })
}

export function deleteVideoComment(data: {
  comment_id: string
}) {
  return $http({
    url: '/com/deleteVideoComment',
    data,
    method: 'post'
  })
}