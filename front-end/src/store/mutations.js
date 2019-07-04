import actionTypes from "./action-types";

export default {
  [actionTypes.SAVE_USER_DATA](state, user_data) {
    const { access_token, refresh_token, email, username } = user_data;

    state.user_data.access_token = access_token;
    state.user_data.refresh_token = refresh_token;
    state.user_data.email = email;
    state.user_data.username = username;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
  },

  [actionTypes.LOGOUT](state) {
    state.user_data = {};    
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
};