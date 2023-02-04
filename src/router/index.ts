import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const loginView = () => import(/* webpackChunkName:"loginView" */ '@/views/loginView/loginView.vue')
const adminView = () => import(/* webpackChunkName:"loginView" */ '@/views/adminView/adminView.vue')
const clientView = () => import(/* webpackChunkName:"loginView" */ '@/views/clientView/clientView.vue')
const managerView = () => import(/* webpackChunkName:"loginView" */ '@/views/managerView/managerView.vue')
const supAdminLog = () => import(/* webpackChunkName:"loginView" */ '@/views/logView/supAdminLog.vue')
const adminLog = () => import(/* webpackChunkName:"loginView" */ '@/views/logView/adminLog.vue')
const backNotice = () => import(/* webpackChunkName:"loginView" */ '@/views/noticeView/backNotice.vue')
const receNotice = () => import(/* webpackChunkName:"loginView" */ '@/views/noticeView/receNotice.vue')
const backNoticeInfo = () => import(/* webpackChunkName:"loginView" */ '@/views/noticeView/backNoticeInfo.vue')
const receNoticeInfo = () => import(/* webpackChunkName:"loginView" */ '@/views/noticeView/receNoticeInfo.vue')
const articleCate = () => import(/* webpackChunkName:"loginView" */ '@/views/articleView/articleCate.vue')
const articleList = () => import(/* webpackChunkName:"loginView" */ '@/views/articleView/articleList.vue')
const articleReport = () => import(/* webpackChunkName:"loginView" */ '@/views/articleView/articleReport.vue')
const commentList = () => import(/* webpackChunkName:"loginView" */ '@/views/commentView/commentList.vue')
const commentReport = () => import(/* webpackChunkName:"loginView" */ '@/views/commentView/commentReport.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'loginView',
    component: loginView
  },
  {
    path: '/admin',
    name: 'admin',
    component: adminView,
    children: [
      {
        path: '/admin',
        redirect: '/client'
      },
      {
        path: '/client',
        name: 'client',
        meta: {
          index: '1-1'
        },
        component: clientView
      },
      {
        path: '/administrator',
        name: 'administrator',
        meta: {
          index: '1-2'
        },
        component: managerView
      },
      {
        path: '/articleCate',
        name: 'articleCate',
        meta: {
          index: '2-1'
        },
        component: articleCate
      },
      {
        path: '/articleList',
        name: 'articleList',
        meta: {
          index: '2-2'
        },
        component: articleList
      },
      {
        path: '/articleReport',
        name: 'articleReport',
        meta: {
          index: '2-3'
        },
        component: articleReport
      },
      {
        path: '/supAdminLog',
        name: 'supAdminLog',
        meta: {
          index: '3-1'
        },
        component: supAdminLog
      },
      {
        path: '/adminLog',
        name: 'adminLog',
        meta: {
          index: '3-2'
        },
        component: adminLog
      },
      {
        path: '/backNotice',
        name: 'backNotice',
        meta: {
          index: '4-1'
        },
        component: backNotice
      },
      {
        path: '/addBackNotice',
        name: 'addBackNotice',
        meta: {
          index: '4-1'
        },
        component: backNoticeInfo
      },
      {
        path: '/updateBackNotice',
        name: 'updateBackNotice',
        meta: {
          index: '4-1'
        },
        component: backNoticeInfo
      },
      {
        path: '/receNotice',
        name: 'receNotice',
        meta: {
          index: '4-2'
        },
        component: receNotice
      },
      {
        path: '/addReceNotice',
        name: 'addReceNotice',
        meta: {
          index: '4-2'
        },
        component: receNoticeInfo
      },
      {
        path: '/updateReceNotice',
        name: 'updateReceNotice',
        meta: {
          index: '4-2'
        },
        component: receNoticeInfo
      },
      {
        path: '/commentList',
        name: 'commentList',
        meta: {
          index: '5-1'
        },
        component: commentList
      },
      {
        path: '/commentReport',
        name: 'commentReport',
        meta: {
          index: '5-2'
        },
        component: commentReport
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
