// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
import vueResource from 'vue-resource'
import App from './App'
import router from './router'

Vue.use(vueResource)

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'NoeMZoEgtQcadYq1TtwBxgeeReagIp2U'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
