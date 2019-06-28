import Vue from "vue";
import Vuex from "vuex";
// import mutations from "./mutations";
import actions from "./actions";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const initialState = {};

export default new Vuex.Store({
  state: initialState,
  plugins: [createPersistedState({ key: "aptonomy" })],
  mutations: {},
  actions
});
