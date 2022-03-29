import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import errorDialog from "./errorDialog";
import auth from "./auth";
import project from "./project";
import general from "./general";

Vue.use(Vuex);
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      errorDialog,
      auth,
      project,
      general
    },
    plugins: [
      createPersistedState({
        key: "amt-viot",
        storage: window.localStorage
      })
    ],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  // add this so that we export store

  return Store;
}
