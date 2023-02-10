import $http from "./http";

export function getUserInfoById(data: {
  id: string
}) {
  return $http({
    url: '/my/getUserInfoById',
    params: data,
    method: 'get'
  })
}

export function getArticleById(data: {
  id: string
  offset: number
}) {
  return $http({
    url: '/my/getArticleById',
    params: data,
    method: 'get'
  })
}

export function getCollectArticleById(data: {
  id: string
  offset: number
}) {
  return $http({
    url: '/my/getCollectArticleById',
    params: data,
    method: 'get'
  })
}

export function getBrowseArticleById(data: {
  id: string
  offset: number
}) {
  return $http({
    url: '/my/getBrowseArticleById',
    params: data,
    method: 'get'
  })
}

export function getPraiseArticleById(data: {
  id: string
  offset: number
}) {
  return $http({
    url: '/my/getPraiseArticleById',
    params: data,
    method: 'get'
  })
}

export function getVideoById(data: {
  id: string
  offset: number
}) {
  return $http({
    url: '/my/getVideoById',
    params: data,
    method: 'get'
  })
}

export function getCollectVideoById(data: {
  id: string
  offset: number
}) {
  return $http({
    url: '/my/getCollectVideoById',
    params: data,
    method: 'get'
  })
}

export function getPraiseVideoById(data: {
  id: string
  offset: number
}) {
  return $http({
    url: '/my/getPraiseVideoById',
    params: data,
    method: 'get'
  })
}