import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const loginView = () => import(/* webpackChunkName:"loginView" */ '@/views/loginView/loginView.vue')
const adminView = () => import(/* webpackChunkName:"loginView" */ '@/views/adminView/adminView.vue')
const clientView = () => import(/* webpackChunkName:"loginView" */ '@/views/clientView/clientView.vue')
const managerView = () => import(/* webpackChunkName:"loginView" */ '@/views/managerView/managerView.vue')
const supAdminLog = () => import(/* webpackChunkName:"loginView" */ '@/views/logView/supAdminLog.vue')
const adminLog = () => import(/* webpackChunkName:"loginView" */ '@/views/logView/adminLog.vue')

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
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
