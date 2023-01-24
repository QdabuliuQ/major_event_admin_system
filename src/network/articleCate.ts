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
    url: `/art/updateCateStatus/${data.id}/${data.is_delete}`,
  })
}

// 获取分类标签
export function getCategoryTarget(data: {
  id: string
  limit: number
  offset: number
}) {
  return $http({
    url: `/art/getCateTarget/${data.id}/${data.limit}/${data.offset}`,
    method: 'get'
  })
} 

// 添加分类标签
export function addCategoryTarget(data: {
  name: string
  cate_id: string
}) {
  return $http({
    url: '/art/addCateTarget',
    method: 'post',
    data
  })
}

// 删除分类标签
export function deleteCategoryTarget(data: {
  id: string
  cate_id: string
}) {
  return $http({
    url: '/art/deleteCateTarget',
    method: 'post',
    data
  })
}