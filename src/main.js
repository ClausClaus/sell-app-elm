import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import fastclick from 'fastclick'
import axios from 'axios'
import "./common/style/index.less"
// import VuePreview from 'vue-preview'
// Vue.use(VuePreview, {
//   hideAnimationDuration:0, showAnimationDuration:0
// })
fastclick.attach(document.body)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: require('common/image/pi-loading.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
