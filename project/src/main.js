import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Input, Form, FormItem, RadioGroup, RadioButton, Dialog, Popover, Carousel, CarouselItem, MessageBox } from 'element-ui';
import GoEasy from 'goeasy';
import 'element-ui/lib/theme-chalk/index.css';
import './index.css'
import './indexDB'

// 建议在main.js里初始化全局的GoEasy对象
Vue.prototype.goEasy = GoEasy.getInstance({
  host:'hangzhou.goeasy.io', //应用所在的区域地址: [hangzhou.goeasy.io |singapore.goeasy.io]
  appkey: "BC-f63dbebf813e4a5091fcfd26a772b9f7", //替换为您的应用appkey
  modules: ['pubsub']
});
console.log(Vue.prototype.goEasy)
export const pubSub = Vue.prototype.goEasy.pubsub
// Vue.config.productionTip = false
Vue.prototype.$confirm = MessageBox.confirm;
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(RadioButton.name, RadioButton);
Vue.component(Dialog.name, Dialog)
Vue.component(Popover.name, Popover)
Vue.component(Carousel.name, Carousel)
Vue.component(CarouselItem.name, CarouselItem)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')