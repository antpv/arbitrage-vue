import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/router.js'
import Login from '@/pages/login/router.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [Home, Login]
})
