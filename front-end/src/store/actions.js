import API from '../api';
import actionTypes from './action-types';

export default {
  async [actionTypes.REGISTER]({ commit }, credentials) {
    try {
      let response = await API.register(credentials);
      
      commit(actionTypes.SAVE_USER_DATA, response.data.user);
      return response;
    } catch (e) {
      console.error(e);
      return e;
    }
  },

  async [actionTypes.LOGIN]({ commit }, credentials) {
    try {
      let response = await API.login(credentials);
      commit(actionTypes.SAVE_USER_DATA, response.data);
      return response;
    } catch (e) {
      localStorage.removeItem("access_token");
      console.error(e);
      return e;
    }
  },

  async [actionTypes.LOGOUT]({ commit }) {
    try {
      commit(actionTypes.LOGOUT);
    } catch (e) {
      console.error(e);
      return e;
    }
  },

  async [actionTypes.GET_VEHICLE_DATA]({ commit }, params) {
    try {
      return API.get_vehicle_data(params);
    } catch (e) {
      console.error(e);
    }
  },

  async [actionTypes.SAVE_USER_SETTINGS]({ commit }, params) {
    try {
      return API.save_user_settings(params);
    } catch (e) {
      console.error(e);
    }
  }
}