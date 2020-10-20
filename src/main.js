import Vue from 'vue'
import Vuesax from 'vuesax'
import App from './App.vue'
import Meta from 'vue-meta'
import moment from 'moment'
import router from './router'
import store from './store'
import 'vuesax/dist/vuesax.css'
import './assets/main.scss'

Vue.config.productionTip = false

Vue.use(Meta)
Vue.use(Vuesax, {
  colors: {
    primary: '#2e5266',
    success: 'rgb(23, 201, 100)',
    danger: 'rgb(242, 19, 93)',
    warning: 'rgb(255, 130, 0)',
    dark: 'rgb(36, 33, 69)'
  }
})

Vue.prototype.$moment = moment

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
