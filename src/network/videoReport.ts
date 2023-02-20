import $http from "./http";

export function getVideoReportList(data: {
  offset: number
  reason: string
  state: string
  startTime: number
  endTime: number
  val: string
}) { 
  return $http({
    url: '/rep/getVideoReportList',
    params: data,
    method: 'get'
  })
}