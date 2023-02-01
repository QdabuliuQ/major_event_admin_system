import $http from "./http";

// 获取文章列表
export function getArticleList(data: {
  offset: number
  cate_id?: string
  state?: string
  startTime?: number
  endTime?: number
  val?: string
}) {
  return $http({
    url: '/art/getArticleList',
    method: 'post',
    data
  })
}

// 修改文章状态
export function updateArticleState(data: {
  id: string
  state: string
}) {
  return $http({
    url: '/art/updateArticleState',
    method: 'post',
    data
  })
}