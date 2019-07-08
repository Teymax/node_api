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
      const { data } = await API.save_user_settings(params);
      commit(actionTypes.UPDATE_USER_INFO, {email: data.user.email, user_image: data.user.user_image, username: data.user.username});
      return data;
    } catch (e) {
      console.error(e);
      return e;
    }
  },

  async [actionTypes.GET_REFRESH_TOKEN]({ commit }) {
    try {
      let result = await API.get_refresh_token();
      commit(actionTypes.GET_REFRESH_TOKEN);
      return result;
    } catch (e) {
      console.error(e);
      return e;
    }
  },

  async [actionTypes.GET_ACCESS_TOKEN]({ commit }) {
    try {
      let result = await API.get_access_token();
      commit(actionTypes.GET_ACCESS_TOKEN);
      return result;
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}
