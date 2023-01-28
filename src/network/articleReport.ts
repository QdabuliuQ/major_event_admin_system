import $http from './http'

export function getReportList(data: {
  offset: number
  reason?: string
  startTime?: bigint | number
  endTime?: bigint | number
  val?: string
  state?: string
}) {
  return $http({
    url: '/rep/getReportList',
    method: 'get',
    params: data
  })
}

export function updateReportState(data: {
  id: string
  state: string
}) {
  return $http({
    url: '/rep/updateReportState',
    method: 'post',
    data
  })
}

export function getReportReason() {
  return $http({
    url: '/rep/getReportReason',
    method: 'get'
  })
}

export function addReportReason(data: {
  name: string
}) {
  return $http({
    url: '/rep/addReportReason',
    method: 'post',
    data
  })
}

export function deleteReportReason(data: {
  name: string
}) {
  return $http({
    url: '/rep/deleteReportReason',
    method: 'post',
    data
  })
}