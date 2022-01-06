import Vue from 'vue'
import App from './App.vue'
import {Select, Button} from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

Vue.component(Select.name, Select);
Vue.component(Button.name, Button);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
