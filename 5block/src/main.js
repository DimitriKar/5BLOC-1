import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { startApp } from "./utils/block";

Vue.config.productionTip = false;

window.addEventListener("load", function() {
  startApp();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
