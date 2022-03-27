import { api } from "boot/axios";
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "src/store/index";

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
let jwt = null;
if (!!store().state.auth.user && store().state.auth.user.jwt) {
  jwt = store().state.auth.user.jwt;
} else if (localStorage.getItem("amt-viol")) {
  let user = JSON.parse(localStorage.getItem("amt-viot"));
  jwt = !!user ? user.auth.user.jwt : null;
}

api.defaults.headers.common["Authorization"] = "Bearer " + jwt;

export default function(/* { store, ssrContext } */) {
  const Router = new VueRouter({
    //TODO scroll is not happening on route change
    scrollBehavior: () => ({ x: 0, y: 0, behavior: "smooth" }),
    // scrollBehavior(to, from) {
    //   return { x: 0, y: 0 };
    // },
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  return Router;
}
