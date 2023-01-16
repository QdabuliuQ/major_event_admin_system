import $http from './http'

// 获取文章分类
export function getCateList(data: {
  offset: number
  limit: number
  val?: string
  is_delete?: number
  startTime?: BigInt
  endTime?: BigInt
}) {
  return $http({
    url: '/art/getArticleCates',
    method: 'post',
    data 
  })
}

// 添加分类
export function addArticleCate(data: {
  name: string
  alias: string
  desc: string
  password: string
}) {
  return $http({
    url: '/art/addArticleCates',
    method: 'post',
    data
  })
}

// 更新分类信息
export function updateArticleCate(data: {
  id: string
  name: string
  alias: string
  desc: string
  password: string
}) {
  return $http({
    url: '/art/updateCateById',
    method: 'post',
    data
  })
}

// 设置分类状态
export function updateCateStatus(data: {
  id: string
  is_delete: number
}) {
  return $http({
    url: `/art/upDateCateStatus/${data.id}/${data.is_delete}`,
  })
}