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
  SEND_FORM_DATA,
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
    async [SEND_FORM_DATA]({ commit, state }, { url, method }) {
      let response, error;

      if (!state.formIsValid) {
        return [response, error];
      }

      commit(SET_LOADING, true);

      try {
        response = await axios.request({
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          method,
          url: getURL(url, method),
          data: state.formData,
        });

        commit(SET_REQUEST_RESPONSE, response);
      } catch (err) {
        error = err;
        commit(SET_REQUEST_ERROR, error);
      } finally {
        commit(SET_LOADING, false);
      }

      return [response, error];
    },
  },
});
