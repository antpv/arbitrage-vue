import Vue from 'vue'
import Router from 'vue-router'
import statistics from '@/pages/statistics/router.js'
import login from '@/pages/login/router.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [statistics, login]
})
