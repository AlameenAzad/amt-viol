import Vue from "vue";
import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_MAIN_URL,
});
Vue.prototype.$axios = axios;
// ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
//       so you won't necessarily have to import axios in each vue file
Vue.prototype.$api = api;
// ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
//       so you can easily perform requests against your app's API
export default ({ app, store, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
};
export { api, axios };
