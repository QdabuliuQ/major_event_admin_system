import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const loginView = () => import(/* webpackChunkName:"loginView" */ '@/views/loginView/loginView.vue')
const adminView = () => import(/* webpackChunkName:"loginView" */ '@/views/adminView/adminView.vue')
const clientView = () => import(/* webpackChunkName:"loginView" */ '@/views/clientView/clientView.vue')
const managerView = () => import(/* webpackChunkName:"loginView" */ '@/views/managerView/managerView.vue')

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
        component: clientView
      },
      {
        path: '/administrator',
        name: 'administrator',
        component: managerView
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
