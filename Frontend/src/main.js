import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/route";
import { store } from "./store/store";

Vue.config.productionTip = false;

router.beforeEach(({ path }, from, next) => {
  const publicPages = ["/", "/searchedResults"];
  const privatePages = ["/dashboard"];
  const isPrivatePage = privatePages.includes(path);
  const token = store.state.userInfo.accessToken || "";
  (isPrivatePage && token === "") ||
  (!publicPages.includes(path) && !privatePages.includes(path) === "")
    ? next("/")
    : next();
});

new Vue({
  store: store,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
