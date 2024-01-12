import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'AdminLogin' }
  },
  {
    path: '/',
    name: 'emptyLayout',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: 'adminLogin',
        name: 'AdminLogin',
        component: () => import('pages/AdminLogin.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'defaultLayout',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      {
        path: 'myHome',
        name: 'MyHome',
        component: () => import('pages/MyHome.vue')
      },
      {
        path: 'testBar',
        name: 'TestBar',
        component: () => import('components/TestBar.vue')
      }
    ]
  }
]

export default routes
