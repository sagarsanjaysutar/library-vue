import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/route'
import {
  store
} from "./store/store"


Vue.config.productionTip = false



new Vue({

  store: store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')