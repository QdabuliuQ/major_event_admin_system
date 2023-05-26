import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { ElNotification } from 'element-plus'
const loginView = () => import(/* webpackChunkName:"loginView" */ '@/views/loginView/loginView.vue')
const adminView = () => import(/* webpackChunkName:"adminView" */ '@/views/adminView/adminView.vue')
const indexView = () => import(/* webpackChunkName:"indexView" */ '@/views/indexView/indexView.vue')
const clientView = () => import(/* webpackChunkName:"userView" */ '@/views/clientView/clientView.vue')
const managerView = () => import(/* webpackChunkName:"userView" */ '@/views/managerView/managerView.vue')
const supAdminLog = () => import(/* webpackChunkName:"logView" */ '@/views/logView/supAdminLog.vue')
const backNotice = () => import(/* webpackChunkName:"noticeView" */ '@/views/noticeView/backNotice.vue')
const receNotice = () => import(/* webpackChunkName:"noticeView" */ '@/views/noticeView/receNotice.vue')
const backNoticeInfo = () => import(/* webpackChunkName:"noticeView" */ '@/views/noticeView/backNoticeInfo.vue')
const receNoticeInfo = () => import(/* webpackChunkName:"noticeView" */ '@/views/noticeView/receNoticeInfo.vue')
const articleCate = () => import(/* webpackChunkName:"articleView" */ '@/views/articleView/articleCate.vue')
const articleList = () => import(/* webpackChunkName:"articleView" */ '@/views/articleView/articleList.vue')
const articleReport = () => import(/* webpackChunkName:"articleView" */ '@/views/articleView/articleReport.vue')
const commentList = () => import(/* webpackChunkName:"commentView" */ '@/views/commentView/commentList.vue')
const v_commentList = () => import(/* webpackChunkName:"commentView" */ '@/views/commentView/v_commentList.vue')
const e_commentList = () => import(/* webpackChunkName:"commentView" */ '@/views/commentView/e_commentList.vue')
const commentReport = () => import(/* webpackChunkName:"commentView" */ '@/views/commentView/commentReport.vue')
const videoView = () => import(/* webpackChunkName:"videoView" */ '@/views/videoView/videoView.vue')
const videoReport = () => import(/* webpackChunkName:"videoView" */ '@/views/videoView/videoReport.vue')
const userInfoView = () => import(/* webpackChunkName:"infoView" */ '@/views/userInfoView/userInfoView.vue')
const articles = () => import(/* webpackChunkName:"infoView" */ '@/views/userInfoView/articleList.vue')
const videos = () => import(/* webpackChunkName:"infoView" */ '@/views/userInfoView/videoList.vue')
const users = () => import(/* webpackChunkName:"infoView" */ '@/views/userInfoView/userList.vue')
const noticeList = () => import(/* webpackChunkName:"indexView" */ '@/views/noticeList/noticeList.vue')
const eventView = () => import(/* webpackChunkName:"indexView" */ '@/views/eventView/eventView.vue')
const eventReport = () => import(/* webpackChunkName:"indexView" */ '@/views/eventView/eventReport.vue')
const messageView = () => import(/* webpackChunkName:"indexView" */ '@/views/messageView/messageView.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'loginView',
    meta: {
      login: false
    },
    component: loginView
  },
  {
    path: '/admin',
    name: 'admin',
    component: adminView,
    children: [
      {
        path: '/admin',
        redirect: '/index'
      },
      {
        path: '/index',
        name: 'index',
        meta: {
          index: '0-0'
        },
        component: indexView
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
          index: '1-2',
          root: true
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
          index: '3-1',
          root: true
        },
        component: supAdminLog
      },
      {
        path: '/backNotice',
        name: 'backNotice',
        meta: {
          index: '4-1',
          root: true
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
        path: '/v_commentList',
        name: 'v_commentList',
        meta: {
          index: '5-2'
        },
        component: v_commentList
      },
      {
        path: '/e_commentList',
        name: 'e_commentList',
        meta: {
          index: '5-3'
        },
        component: e_commentList
      },
      {
        path: '/commentReport',
        name: 'commentReport',
        meta: {
          index: '5-4'
        },
        component: commentReport
      },
      {
        path: '/videoList',
        name: 'videoList',
        meta: {
          index: '6-1'
        },
        component: videoView
      },
      {
        path: '/videoReport',
        name: 'videoReport',
        meta: {
          index: '6-2'
        },
        component: videoReport
      },
      {
        path: '/eventView',
        name: 'eventView',
        meta: {
          index: '7-1'
        },
        component: eventView
      },
      {
        path: '/eventReport',
        name: 'eventReport',
        meta: {
          index: '7-2'
        },
        component: eventReport
      },
      {
        path: '/messageView',
        name: 'messageView',
        meta: {
          index: '8-1'
        },
        component: messageView
      },
      {
        path: '/noticeList/:type',
        name: 'noticeList',
        component: noticeList
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        children: [
          {
            path: '/userInfo/articles/:id',
            name: 'articles',
            component: articles
          },
          {
            path: '/userInfo/articleCollect/:id',
            name: 'articleCollect',
            component: articles
          },
          {
            path: '/userInfo/articleBrowse/:id',
            name: 'articleBrowse',
            component: articles
          },
          {
            path: '/userInfo/articlePraise/:id',
            name: 'articlePraise',
            component: articles
          },
          {
            path: '/userInfo/videos/:id',
            name: 'videos',
            component: videos
          },
          {
            path: '/userInfo/videoCollect/:id',
            name: 'videoCollect',
            component: videos
          },
          {
            path: '/userInfo/videoPraise/:id',
            name: 'videoPraise',
            component: videos
          },
          {
            path: '/userInfo/userFollow/:id',
            name: 'userFollow',
            component: users
          },
          {
            path: '/userInfo/userFans/:id',
            name: 'userFans',
            component: users
          },
          {
            path: '/userInfo',
            redirect: '/userInfo/articles/:id',
          }
        ],
        component: userInfoView
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to, from);
  const token = sessionStorage.getItem('token');
  if (to.meta.login == false) {
    // 登录或者注册才可以往下进行
    if (token) {
      next('/admin');
    } else {
      next();
    }
  } else {
    // token 不存在
    if (token === null || token === '') {
      ElNotification({
        title: '错误',
        message: '登录失效，请重新登录',
        type: 'error',
      })
      next('/');
    } else {
      console.log(222);
      if(to.meta.root && sessionStorage.getItem('type') == '2') {
        ElNotification({
          title: '错误',
          message: '暂无相关权限',
          type: 'error',
        })
      } else {
        next();
      }
    }
  }
});

export default router
