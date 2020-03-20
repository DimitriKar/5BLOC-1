import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Delegate from "../views/Delegate.vue";
import Voter from "../views/Voter.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/delegate",
    name: "Delegate",
    component: Delegate
  },
  {
    path: "/voter",
    name: "Voter",
    component: Voter
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
