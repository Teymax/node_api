import API from '../api';
import actionTypes from './action-types';

export default {
  async [actionTypes.REGISTER]({ commit }, credentials) {
      try {
          let response = await API.register(credentials);
          return response;
      } catch(e) {
          console.error(e);
      }
  },

  async [actionTypes.LOGIN]({ commit }, credentials) {
    try {
        let response = await API.login(credentials);
        localStorage.setItem("access-token", response.data.access_token)
        return response;
    } catch(e) {
        localStorage.removeItem("access-token");
        console.error(e);
    }
  },

  async [actionTypes.LOGOUT]({ commit }) {
    try {
      localStorage.removeItem("access-token");
    } catch(e) {
        console.error(e);
    }
  }
}