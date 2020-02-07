import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

const moment = require('moment')
require('moment/locale/ru')
Vue.use(require('vue-moment'), {
  moment
})