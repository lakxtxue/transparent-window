import Vue from "vue";
import App from "./App.vue";
import Vuebar from "vuebar";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import electron from "./plugins/electron";
import "./components";
import "./plugins";

Vue.config.productionTip = false;
Vue.use(electron);
Vue.use(Vuebar);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
