import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home";
import VehicleDelivery from "../views/VehicleDelivery";
import Login from "../components/Login";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/vehicle-delivery",
      name: "Vehicle Delivery",
      component: VehicleDelivery,
      beforeEnter: function (to, from, next) {
        if(!localStorage.getItem("access-token")) {
          next("/login")
        } else {
          next();
        }
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});

export default router;