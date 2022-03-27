import { api } from "boot/axios";
import { Notify } from "quasar";

export function login(context, payload) {
  const { identifier } = payload;
  const { password } = payload;
  api.defaults.headers.common["Authorization"] = null;
  api
    .post("/api/auth/local", {
      identifier,
      password
    })
    .then(response => {
      console.log("response :>> ", response);
      context.commit("setUser", response.data);
      this.$router.push({ path: "/dashboard" });
    })
    .catch(error => {
      console.log("error :>> ", error);
      Notify.create({
        position: "top-right",
        type: "negative",
        message: error.response.data.error.message
      });
    });
}
