import $http from "./http";

export function getWebsiteData() {
  return $http({
    url: '/ind/getWebsiteData',
    method: 'get'
  })
}

export function getBackNoticeList(data?: {
  offset: number
  pageSize?: number
}) {
  return $http({
    url: '/ind/getBackNoticeList',
    params: data,
    method: 'get'
  })
}

export function getReceNoticeList(data?: {
  offset: number
  pageSize?: number
}) {
  return $http({
    url: '/ind/getReceNoticeList',
    params: data,
    method: 'get'
  })
}

export function getCateData() {
  return $http({
    url: '/ind/getCateData',
    method: 'get'
  })
}

export function getUserRegion() {
  return $http({
    url: '/ind/getUserRegion',
    method: 'get'
  })
}

export function getRegisterData() {
  return $http({
    url: '/ind/getRegisterData',
    method: 'get'
  })
}