import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import {
  SET_FORM_IS_VALID,
  SET_FORM_DATA,
  SET_LOADING,
  SEND_FORM_DATA,
} from './constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    formData: {},
    formIsValid: true,
    pristine: true,
    loading: false,
  },
  mutations: {
    [SET_FORM_DATA](state, payload) {
      const newFormData = { ...state.formData, ...payload };
      const cleanedFormData = Object.keys(newFormData).reduce((data, key) => {
        if (newFormData[key]) data[key] = newFormData[key];
        return data;
      }, {});
      const areInputsEmpty = Object.keys(cleanedFormData).length === 0;

      state.formData = cleanedFormData;
      state.pristine = areInputsEmpty;
    },
    [SET_FORM_IS_VALID](state, payload) {
      state.formIsValid = payload;
    },
    [SET_LOADING](state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async [SEND_FORM_DATA]({ commit, state }, { url, method }) {
      let response, error;

      if (!state.formIsValid) {
        return { response, error };
      }

      commit(SET_LOADING, true);

      try {
        response = await axios.request({
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          method,
          url,
          data: state.formData,
        });
      } catch (err) {
        error = err;
      } finally {
        commit(SET_LOADING, false);
      }

      return { response, error };
    },
  },
});
