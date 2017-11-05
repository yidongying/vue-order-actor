// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from "axios"
import router from './router'
import store from './store/store'
import infiniteScroll from 'vue-infinite-scroll'
// import mock from './server/mock'
/* eslint-disable no-new */
Vue.prototype.$ajax = axios;
Vue.use(infiniteScroll);
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
