// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'

import store from './store.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont.css'
import '@/assets/css/style.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.component('footer-copyright', {
  template: '<p class="footer-msg">©CopyRight 2016-2018 车车科技发展有限公司 版权所有 <a href="http://www.miibeian.gov.cn" target="_blank">粤ICP备******号</a></p>'
});

Vue.filter('formatDateTime', function (value) {
  if (!value) return ''
  let date = new Date(value);
  let y = date.getFullYear() + '/';
  let mon = (date.getMonth() + 1) + '/';
  let d = date.getDate();
  return y + mon + d;
});

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
