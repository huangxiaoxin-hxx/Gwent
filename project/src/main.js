import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Input, Form, FormItem, } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './index.css'

Vue.config.productionTip = false

Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
