import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home";
import VehicleDelivery from "../views/VehicleDelivery";
import Login from "../components/Login";
import SoldInYard from "../components/SoldInYard";
import YardAudit from "../components/YardAudit";

Vue.use(Router);

function guard (to, from, next) {
  if(!localStorage.getItem("access_token")) {
    next("/login")
  } else {
    next();
  }
}

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
      beforeEnter: guard
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/sold-in-yard",
      name: "Sold in Yard",
      component: SoldInYard,
      beforeEnter: guard
    },
    {
      path: "/yard-audit",
      name: "Yard Audit",
      component: YardAudit,
      beforeEnter: guard
    }
  ]
});

export default router;