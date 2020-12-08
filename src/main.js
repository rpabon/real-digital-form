import Vue from 'vue';
import App from './App.vue';
import store from './store'

import FormWrapper from './components/FormWrapper.vue';
import TextField from './components/TextField.vue';
import SubmitButton from './components/SubmitButton.vue';

Vue.config.productionTip = false;
Vue.component('real-digital-form', FormWrapper);
Vue.component('real-digital-textfield', TextField);
Vue.component('real-digital-button', SubmitButton);

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app');
