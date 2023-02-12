import $http from "./http";

export function getCommentReportList(data: {
  state?: string
  reason?: string
  startTime?: number
  endTime?: number
  val?: string
  offset: number
  type?: string
}) {
  return $http({
    url: '/rep/getCommentReportList',
    method: 'get',
    params: data
  })
}

export function updateCommentReportState(data: {
  id: string
  state: string
}) {
  return $http({
    url: '/rep/updateCommentReportState',
    method: 'post',
    data
  })
}