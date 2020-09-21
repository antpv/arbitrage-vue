import Vue from 'vue'
import Vuesax from 'vuesax'
import App from './App.vue'
import Meta from 'vue-meta'
import router from './router'
import store from './store'
import 'vuesax/dist/vuesax.css'
import './assets/main.scss'

Vue.config.productionTip = false

Vue.use(Meta)
Vue.use(Vuesax)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
