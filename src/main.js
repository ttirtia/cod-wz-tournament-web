import Vue from 'vue'
import App from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false

new Vue({
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
