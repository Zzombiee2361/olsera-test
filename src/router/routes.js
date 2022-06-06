import { getAuthMiddleware } from './middleware/auth'

/** @type {import('vue-router').RouteRecordRaw[]} */
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ],
    meta: {
      middleware: getAuthMiddleware({ checkLogin: true })
    }
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Auth/LoginPage.vue'),
    meta: {
      middleware: getAuthMiddleware({ checkLogin: false })
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
