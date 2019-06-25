import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home";
import VehicleDelivery from "../views/VehicleDelivery";

Vue.use(Router);

export default new Router({
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
      component: VehicleDelivery
    }
  ]
});
