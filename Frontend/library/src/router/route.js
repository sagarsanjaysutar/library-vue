import Vue from "vue";
import VueRouter from "vue-router";
import home from "../components/home.vue";
import contact from "../components/contact.vue";
import about from "../components/about.vue";
import searchedResults from "../components/book/searchedResults.vue";
import dashboard from "../components/dashboard";
import error404 from "../components/error404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
  },

  {
    path: "/searchedResults",
    name: "searchedResults",
    component: searchedResults,
  },
  {
    path: "/about",
    name: "about",
    component: about,
  },
  {
    path: "/contact",
    name: "contact",
    component: contact,
  },
  {
    path: "/error404",
    name: "error404",
    component: error404,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
