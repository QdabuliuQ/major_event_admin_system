import $http from "./http";

// 获取超管操作日志
export function getOperationLog(data: {
  offset: number
  startTime?: bigint
  endTime?: bigint
  type?: string
  val?: string
}) {
  return $http({
    url: '/log/getSupAdminLog',
    method: 'post',
    data
  })
}