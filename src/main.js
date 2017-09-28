// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource';
import VuePreview from 'vue-preview';
import './common/less/index.less'; // 加载全局的css文件
Vue.config.productionTip = false
Vue.use(VueResource);
Vue.use(VuePreview);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
