import Vue from 'vue'
import App from './App.vue'
import VueGeolocation from 'vue-browser-geolocation';

import store from './store'

Vue.use(VueGeolocation);

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

const moment = require('moment')
require('moment/locale/ru')
Vue.use(require('vue-moment'), {
  moment
})