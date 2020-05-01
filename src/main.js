import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
new Vue({
  router,
  store,
  render: h => h(App)                     //将APP组件进行渲染
}).$mount('#app');      //将渲染结果挂载到div#app上
