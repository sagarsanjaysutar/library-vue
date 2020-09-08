import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/route";
import { store } from "./store/store";

Vue.config.productionTip = false;

router.beforeEach(({ path }, from, next) => {
  console.log(path);
  const publicPages = ["/", "/searchedResults", "/about", "/contact"];
  const privatePages = ["/dashboard"];
  const isPrivatePage = privatePages.includes(path);
  if (isPrivatePage) {
    const token = store.state.userInfo.token || "";
    if (token === "") {
      return next("/");
    }
  }
  if (!publicPages.includes(path) && !privatePages.includes(path)) {
    return next("/error404");
  }

  next();
});

new Vue({
  store: store,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
