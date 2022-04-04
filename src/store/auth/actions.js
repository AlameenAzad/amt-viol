import { api } from "boot/axios";
import { Notify } from "quasar";

export async function login(context, payload) {
  const { identifier } = payload;
  const { password } = payload;
  if (!!identifier && !!password) {
    try {
      const res = await api.post("/api/auth/local", { identifier, password });
      context.commit("setUser", res.data);
      this.$router.push({ path: "/dashboard" });
      return true;
    } catch (error) {
      // console.log("error :>> ", error.response);
      // Notify.create({
      //   type: "negative",
      //   message: error.response.data.error.message
      // });
      return error.response.data.error.message;
    }
  }
}
