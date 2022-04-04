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
    } catch (error) {
      console.log("error :>> ", error);
      Notify.create({
        position: "top-right",
        type: "negative",
        message: error.response.data.error.message
      });
      return false;
    }
  }
}
