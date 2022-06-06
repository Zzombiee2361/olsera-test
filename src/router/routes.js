import { getAuthMiddleware } from './middleware/auth'

/** @type {import('vue-router').RouteRecordRaw[]} */
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
        children: [
          { path: '/post/:id', name: 'home.view', component: () => import('src/components/PostView.vue') }
        ]
      },
      {
        path: 'liked',
        name: 'liked-posts',
        component: () => import('pages/LikedPostPage.vue'),
        children: [
          { path: 'post/:id', name: 'liked-posts.view', component: () => import('src/components/PostView.vue') }
        ]
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('pages/IndexPage.vue'),
        children: [
          { path: 'post/:id', name: 'admin.view', component: () => import('src/components/PostView.vue') }
        ]
      }
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
