import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store";
import "normalize.css/normalize.css";
import Element from "element-ui";
import "./styles/element-variables.scss";
import "@/styles/index.scss"; // global css
import "./icons"; // icon
import "nprogress/nprogress.css"; // progress bar style

import request from "@/api/axios";

Vue.use(Element, {
  size: "medium" // set element-ui default size
});

Vue.config.productionTip = false;

Vue.prototype.$$router = router;

Vue.prototype.$request = request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
