import Vue from 'vue';
import Vuex from 'vuex';
import { SET_FORM_IS_VALID, SET_FORM_DATA } from './constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    formIsValid: true,
    formData: {},
    pristine: true,
  },
  mutations: {
    [SET_FORM_IS_VALID](state, payload) {
      state.formIsValid = payload;
    },
    [SET_FORM_DATA](state, payload) {
      const newFormData = { ...state.formData, ...payload };
      const areInputsFilled = Object.keys(newFormData).reduce(
        (acc, key) => Boolean(newFormData[key]) || acc,
        false
      );

      state.pristine = !areInputsFilled;
      state.formData = newFormData;
    },
  },
});
