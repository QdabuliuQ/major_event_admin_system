import $http from "./http";

export function getWebsiteData() {
  return $http({
    url: '/ind/getWebsiteData',
    method: 'get'
  })
}

export function getBackNoticeList() {
  return $http({
    url: '/ind/getBackNoticeList',
    method: 'get'
  })
}

export function getReceNoticeList() {
  return $http({
    url: '/ind/getReceNoticeList',
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