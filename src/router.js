import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import statistics from '@/pages/statistics/router.js'
import applications from '@/pages/applications/router.js'
import templates from '@/pages/templates/router.js'
import login from '@/pages/login/router.js'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [statistics, applications, templates, login]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLoggedIn = store.state.auth.isLoggedIn

    if (isLoggedIn === false) {
      next({
        path: '/login',
        // TODO: Check next url
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
      // const isAdmin = false
      // if (to.matched.some(record => record.meta.isAdmin)) {
      //   if (isAdmin) {
      //     next()
      //   } else {
      //     next({ path: '/statistics' })
      //   }
      // } else {
      //   next()
      // }
    }
  } else {
    next()
  }
})

export default router
