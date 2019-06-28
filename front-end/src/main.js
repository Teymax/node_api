import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router/router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VeeValidate from 'vee-validate';
import "@mdi/font/css/materialdesignicons.css";
 
Vue.use(VeeValidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  methods: {
    /**
     * takes function and cals it not earlier than 300ms
     * 
     * @param {function} f - function to be wrapped with debounce functiom
     * returns {function}
     */

    debounce(f) {
      let timer = null;

      return function (...args) {
        const on_complete = () => {
          f.apply(this, args);
          timer = null;
        }

        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(on_complete, 300);
      };
    },
  },
  render: h => h(App)
}).$mount("#app");
