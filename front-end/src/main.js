import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router/router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@mdi/font/css/materialdesignicons.css";
// import interceptors from "./api/interceptors";
 

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
