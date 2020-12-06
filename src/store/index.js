import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import getURL from './utils';
import {
  SET_FORM_IS_VALID,
  SET_FORM_DATA,
  SET_LOADING,
  SET_REQUEST_ERROR,
  SET_REQUEST_RESPONSE,
} from './constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    formIsValid: true,
    formData: {},
    loading: false,
    requestResponse: null,
    requestError: null,
  },
  mutations: {
    [SET_FORM_IS_VALID](state, payload) {
      state.formIsValid = payload;
    },
    [SET_FORM_DATA](state, payload) {
      state.formData = { ...state.formData, ...payload };
    },
    [SET_LOADING](state, payload) {
      state.loading = payload;
    },
    [SET_REQUEST_RESPONSE](state, payload) {
      state.requestError = payload;
    },
    [SET_REQUEST_ERROR](state, payload) {
      state.requestError = payload;
    },
  },
  actions: {
    async fetchFormData({ commit, state }, { action, method }) {
      if (!state.formIsValid) return;

      commit(SET_LOADING, true);

      try {
        const response = await axios.request({
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          method,
          url: getURL(action, method),
          data: state.formData,
        });

        commit(SET_REQUEST_RESPONSE, response);
      } catch (error) {
        commit(SET_REQUEST_ERROR, error);
      } finally {
        commit(SET_LOADING, false);
      }
    },
  },
});
