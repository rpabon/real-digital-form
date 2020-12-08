import Vue from 'vue';
import App from './App.vue';

import FormWrapper from './components/FormWrapper/FormWrapper.vue';
import TextField from './components/TextField/TextField.vue';
import SubmitButton from './components/SubmitButton/SubmitButton.vue';

Vue.config.productionTip = false;
Vue.component('real-digital-form', FormWrapper);
Vue.component('real-digital-textfield', TextField);
Vue.component('real-digital-button', SubmitButton);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
